import 'dart:convert';

import 'package:http/http.dart' as http;

import '../models/account_model.dart';

class AccountService {
  static const String _baseUrl = 'http://localhost:3000';

  final String authToken;

  AccountService({required this.authToken});

  Future<List<AccountModel>> pullAccountsFromCloud() async {
    final uri = Uri.parse('$_baseUrl/api/v1/sync/pull');
    final response = await http.get(
      uri,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $authToken',
      },
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to fetch cloud accounts');
    }

    final body = jsonDecode(response.body) as Map<String, dynamic>;
    final records = body['records'] as List<dynamic>;
    return records
        .whereType<Map<String, dynamic>>()
        .map((json) => AccountModel.fromCloudJson(json))
        .toList();
  }
}
