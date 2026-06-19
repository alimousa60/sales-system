import 'dart:async';
import 'dart:convert';

import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:http/http.dart' as http;

import '../providers/auth_provider.dart';
import 'local_storage_service.dart';

class SyncService {
  // للـ Emulator استخدم: 'http://10.0.2.2:3000'
  // للـ Web أو السيرفر السحابي استخدم الرابط الفعلي أو الدومين
  static const String _apiBaseUrl = 'http://10.0.2.2:3000';

  final AuthProvider authProvider;
  StreamSubscription<ConnectivityResult>? _connectivitySubscription;

  SyncService({required this.authProvider});

  Future<void> start() async {
    // العودة للاستماع الفردي بناءً على الإصدار الحالي لديك لحل الأخطاء
    _connectivitySubscription = Connectivity()
        .onConnectivityChanged
        .listen((ConnectivityResult result) async {
      if (result != ConnectivityResult.none) {
        await syncLocalDataToCloud();
      }
    });

    final currentResult = await Connectivity().checkConnectivity();
    if (currentResult != ConnectivityResult.none) {
      await syncLocalDataToCloud();
    }
  }

  Future<void> syncLocalDataToCloud() async {
    if (!authProvider.isAuthenticated || authProvider.token == null) {
      return;
    }

    final unsyncedAccounts = LocalStorageService.getUnsyncedAccounts();
    if (unsyncedAccounts.isEmpty) {
      return;
    }

    // تجهيز البيانات بالشكل المتوقع في سيرفر Node.js الخاص بك: {"accounts": [...]}
    final List<Map<String, dynamic>> accountsPayload =
        unsyncedAccounts.map((account) => account.toJson()).toList();

    final Map<String, dynamic> rootPayload = {"accounts": accountsPayload};

    final url = Uri.parse('$_apiBaseUrl/api/v1/sync/push');

    try {
      final response = await http
          .post(
            url,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ${authProvider.token}',
            },
            body: jsonEncode(rootPayload),
          )
          .timeout(const Duration(seconds: 15));

      if (response.statusCode == 200) {
        final ids = unsyncedAccounts.map((account) => account.id).toList();
        await LocalStorageService.markAccountsSynced(ids);
      } else {
        print('فشلت المزامنة: ${response.statusCode} - ${response.body}');
      }
    } catch (e) {
      print('خطأ في الاتصال بالشبكة: $e');
    }
  }

  void dispose() {
    _connectivitySubscription?.cancel();
  }
}
