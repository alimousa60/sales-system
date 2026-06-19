import 'package:flutter/foundation.dart';
import 'package:uuid/uuid.dart';

import '../models/account_model.dart';
import '../providers/auth_provider.dart';
import '../services/account_service.dart';
import '../services/local_storage_service.dart';
import '../services/sync_service.dart';

class AccountProvider extends ChangeNotifier {
  final AuthProvider authProvider;
  final SyncService _syncService;

  List<AccountModel> accounts = [];
  bool isLoading = false;
  bool isSyncing = false;
  String? error;

  // نقوم بإنشاء الـ Service ديناميكياً بناءً على الـ Token الحالي لتجنب تجمد الجلسة
  AccountService get _accountService =>
      AccountService(authToken: authProvider.token ?? '');

  AccountProvider(
      {required this.authProvider, required SyncService syncService})
      : _syncService = syncService {
    // تحميل الحسابات المحلية فوراً عند إنشاء الـ Provider
    _loadLocalAccounts();
  }

  // دالة تحديث الحسابات عند تغيير حالة المستخدم (مثلاً عند عمل ريفريش يدوي أو تبديل الحساب)
  Future<void> updateAccountsContext() async {
    await _loadLocalAccounts();
  }

  Future<void> _loadLocalAccounts() async {
    if (authProvider.userId == null) {
      accounts = [];
      notifyListeners();
      return;
    }

    // جلب الحسابات المفصولة والمخصصة لهذا المستخدم فقط من التخزين المحلي
    accounts = LocalStorageService.getAccountsForUser(authProvider.userId!);
    notifyListeners();
  }

  Future<void> addAccount(String name, double balance) async {
    if (authProvider.userId == null) {
      throw Exception('جلسة المستخدم غير متاحة، يرجى إعادة تسجيل الدخول');
    }

    final newAccount = AccountModel(
      id: const Uuid().v4(), // توليد معرف فريد محلياً
      name: name,
      balance: balance,
      userId:
          authProvider.userId!, // ربط الحساب بمعرف المستخدم الحالي لضمان العزل
      isSynced: false,
    );

    // الحفظ محلياً أولاً لضمان عمل التطبيق بدون إنترنت Offline-First
    await LocalStorageService.saveAccount(newAccount);
    await _loadLocalAccounts();

    // [تحسين اختياري]: محاولة مزامنة الحساب فوراً مع السيرفر إذا كان الجهاز متصلاً بالإنترنت
    syncPendingAccounts();
  }

  Future<void> refreshAccountsFromCloud() async {
    if (!authProvider.isAuthenticated || authProvider.token == null) {
      return;
    }

    isLoading = true;
    error = null;
    notifyListeners();

    try {
      // جلب البيانات السحابية المفلترة والمحمية للمستخدم الحالي فقط
      final remoteAccounts = await _accountService.pullAccountsFromCloud();

      for (final remoteAccount in remoteAccounts) {
        // حفظ النسخة السحابية محلياً وتحديث علامة المزامنة إلى true
        await LocalStorageService.saveAccount(
            remoteAccount.copyWith(isSynced: true));
      }
      await _loadLocalAccounts();
    } catch (err) {
      error = err.toString();
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }

  Future<void> syncPendingAccounts() async {
    if (!authProvider.isAuthenticated) {
      return;
    }

    isSyncing = true;
    error = null;
    notifyListeners();

    try {
      // استدعاء محرك المزامنة لرفع كافة الحركات غير المتزامنة (isSynced == false)
      await _syncService.syncLocalDataToCloud();
      await _loadLocalAccounts(); // إعادة تحميل البيانات محلياً بعد تعديل حالة الحسابات إلى متزامنة
    } catch (err) {
      error = err.toString();
    } finally {
      isSyncing = false;
      notifyListeners();
    }
  }
}
