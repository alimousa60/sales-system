import 'package:hive_flutter/hive_flutter.dart';
import '../models/account_model.dart';

class LocalStorageService {
  static const String accountBoxName = 'accounts_box';

  static Future<void> init() async {
    await Hive.initFlutter();

    if (!Hive.isAdapterRegistered(AccountModelAdapter().typeId)) {
      Hive.registerAdapter(AccountModelAdapter());
    }

    await Hive.openBox<AccountModel>(accountBoxName);
  }

  static Box<AccountModel> get accountBox => Hive.box<AccountModel>(accountBoxName);

  static Future<void> saveAccount(AccountModel account) async {
    await accountBox.put(account.id, account);
  }

  static List<AccountModel> getUnsyncedAccounts() {
    return accountBox.values.where((account) => !account.isSynced).toList();
  }

  static List<AccountModel> getAccountsForUser(String userId) {
    return accountBox.values.where((account) => account.userId == userId).toList();
  }

  static Future<void> markAccountsSynced(List<String> ids) async {
    for (final id in ids) {
      final existing = accountBox.get(id);
      if (existing != null) {
        await accountBox.put(id, existing.copyWith(isSynced: true));
      }
    }
  }
}
