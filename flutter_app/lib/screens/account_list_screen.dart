import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/account_provider.dart';
import '../widgets/app_drawer.dart';

class AccountListScreen extends StatefulWidget {
  const AccountListScreen({super.key});

  @override
  State<AccountListScreen> createState() => _AccountListScreenState();
}

class _AccountListScreenState extends State<AccountListScreen> {
  final _nameController = TextEditingController();
  final _balanceController = TextEditingController();

  Future<void> _showAddAccountDialog(AccountProvider provider) async {
    _nameController.clear();
    _balanceController.clear();

    await showDialog<void>(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Create Account'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: _nameController,
                decoration: const InputDecoration(labelText: 'Account Name'),
              ),
              TextField(
                controller: _balanceController,
                decoration: const InputDecoration(labelText: 'Balance'),
                keyboardType: TextInputType.number,
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () async {
                final name = _nameController.text.trim();
                final balance =
                    double.tryParse(_balanceController.text.trim()) ?? 0.0;
                if (name.isEmpty) {
                  return;
                }
                await provider.addAccount(name, balance);
                Navigator.of(context).pop();
              },
              child: const Text('Save'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<AccountProvider>(
      builder: (context, provider, child) {
        return Scaffold(
          appBar: AppBar(
            title: const Text('Accounts'),
            actions: [
              IconButton(
                icon: const Icon(Icons.sync),
                onPressed:
                    provider.isSyncing ? null : provider.syncPendingAccounts,
                tooltip: 'Sync pending accounts',
              ),
              IconButton(
                icon: const Icon(Icons.refresh),
                onPressed: provider.isLoading
                    ? null
                    : provider.refreshAccountsFromCloud,
                tooltip: 'Refresh from cloud',
              ),
            ],
          ),
          drawer: const AppDrawer(),
          body: provider.isLoading
              ? const Center(child: CircularProgressIndicator())
              : Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    children: [
                      if (provider.error != null)
                        Padding(
                          padding: const EdgeInsets.only(bottom: 12.0),
                          child: Text(provider.error!,
                              style: const TextStyle(color: Colors.red)),
                        ),
                      Row(
                        children: [
                          Expanded(
                            child: Text(
                              'Local accounts (${provider.accounts.length})',
                              style: const TextStyle(
                                  fontSize: 16, fontWeight: FontWeight.bold),
                            ),
                          ),
                          if (provider.isSyncing)
                            const Padding(
                              padding: EdgeInsets.only(left: 8.0),
                              child:
                                  CircularProgressIndicator(strokeWidth: 2.5),
                            ),
                        ],
                      ),
                      const SizedBox(height: 12),
                      Expanded(
                        child: provider.accounts.isEmpty
                            ? const Center(
                                child: Text(
                                    'No accounts found. Create one to begin.'))
                            : ListView.separated(
                                itemCount: provider.accounts.length,
                                separatorBuilder: (_, __) =>
                                    const Divider(height: 1),
                                itemBuilder: (context, index) {
                                  final account = provider.accounts[index];
                                  return ListTile(
                                    title: Text(account.name),
                                    subtitle: Text(
                                        'Balance: ${account.balance.toStringAsFixed(2)}'),
                                    trailing: Chip(
                                      label: Text(account.isSynced
                                          ? 'Synced'
                                          : 'Pending'),
                                      backgroundColor: account.isSynced
                                          ? Colors.green[100]
                                          : Colors.orange[100],
                                    ),
                                  );
                                },
                              ),
                      ),
                    ],
                  ),
                ),
          floatingActionButton: FloatingActionButton(
            onPressed: () => _showAddAccountDialog(provider),
            child: const Icon(Icons.add),
          ),
        );
      },
    );
  }
}
