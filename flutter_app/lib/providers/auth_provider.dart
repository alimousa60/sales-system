import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureStorageService {
  static const _tokenKey = 'sales_system_jwt';
  static const _userIdKey = 'sales_system_user_id';
  static const _roleKey = 'sales_system_role';
  static const _usernameKey = 'sales_system_username';

  static final FlutterSecureStorage _secureStorage = const FlutterSecureStorage();

  static Future<void> write(String key, String value) async {
    if (kIsWeb) {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(key, value);
    } else {
      await _secureStorage.write(key: key, value: value);
    }
  }

  static Future<String?> read(String key) async {
    if (kIsWeb) {
      final prefs = await SharedPreferences.getInstance();
      return prefs.getString(key);
    }
    return _secureStorage.read(key: key);
  }

  static Future<void> delete(String key) async {
    if (kIsWeb) {
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove(key);
    } else {
      await _secureStorage.delete(key: key);
    }
  }
}

class AuthProvider extends ChangeNotifier {
  static const _baseUrl = 'http://localhost:3000';

  String? token;
  String? userId;
  String? role;
  String? username;

  bool get isAuthenticated => token != null && userId != null;

  Future<void> loadSession() async {
    token = await SecureStorageService.read(SecureStorageService._tokenKey);
    userId = await SecureStorageService.read(SecureStorageService._userIdKey);
    role = await SecureStorageService.read(SecureStorageService._roleKey);
    username = await SecureStorageService.read(SecureStorageService._usernameKey);
    notifyListeners();
  }

  Future<void> saveSession({required String authToken, required String userIdValue, required String roleValue, required String usernameValue}) async {
    token = authToken;
    userId = userIdValue;
    role = roleValue;
    username = usernameValue;

    await SecureStorageService.write(SecureStorageService._tokenKey, authToken);
    await SecureStorageService.write(SecureStorageService._userIdKey, userIdValue);
    await SecureStorageService.write(SecureStorageService._roleKey, roleValue);
    await SecureStorageService.write(SecureStorageService._usernameKey, usernameValue);

    notifyListeners();
  }

  Future<void> clearSession() async {
    token = null;
    userId = null;
    role = null;
    username = null;

    await SecureStorageService.delete(SecureStorageService._tokenKey);
    await SecureStorageService.delete(SecureStorageService._userIdKey);
    await SecureStorageService.delete(SecureStorageService._roleKey);
    await SecureStorageService.delete(SecureStorageService._usernameKey);

    notifyListeners();
  }

  Future<void> login(String usernameInput, String password) async {
    final uri = Uri.parse('$_baseUrl/api/v1/auth/login');
    final response = await http.post(
      uri,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'username': usernameInput,
        'password': password,
      }),
    );

    if (response.statusCode != 200) {
      final responseBody = jsonDecode(response.body);
      throw Exception(responseBody['message'] ?? 'Failed to authenticate.');
    }

    final payload = jsonDecode(response.body) as Map<String, dynamic>;
    final tokenValue = payload['token'] as String;
    final user = payload['user'] as Map<String, dynamic>;

    await saveSession(
      authToken: tokenValue,
      userIdValue: user['id'].toString(),
      roleValue: user['role'] as String,
      usernameValue: user['username'] as String,
    );
  }
}
