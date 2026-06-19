import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'providers/auth_provider.dart';
import 'services/local_storage_service.dart';
import 'services/sync_service.dart';
import 'screens/admin_panel_screen.dart';
import 'screens/dashboard_screen.dart';
import 'screens/login_screen.dart';
import 'screens/unauthorized_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await LocalStorageService.init();

  final authProvider = AuthProvider();
  await authProvider.loadSession();

  final syncService = SyncService(authProvider: authProvider);
  await syncService.start();

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider<AuthProvider>.value(value: authProvider),
      ],
      child: SalesSystemApp(syncService: syncService),
    ),
  );
}

class SalesSystemApp extends StatelessWidget {
  final SyncService syncService;

  const SalesSystemApp({required this.syncService, super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sales System',
      theme: ThemeData(primarySwatch: Colors.blue),
      initialRoute: '/',
      routes: {
        '/': (context) {
          final authProvider = Provider.of<AuthProvider>(context);
          return authProvider.isAuthenticated
              ? const DashboardScreen()
              : const LoginScreen();
        },
        '/admin': (context) {
          final authProvider = Provider.of<AuthProvider>(context);
          if (authProvider.role != 'admin') {
            return const UnauthorizedScreen();
          }
          return const AdminPanelScreen();
        },
        '/unauthorized': (context) => const UnauthorizedScreen(),
      },
    );
  }
}
