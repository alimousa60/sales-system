import 'package:hive/hive.dart';

class AccountModel {
  final String id;
  final String name;
  final double balance;
  final String userId;
  final bool isSynced;

  AccountModel({
    required this.id,
    required this.name,
    required this.balance,
    required this.userId,
    required this.isSynced,
  });

  factory AccountModel.fromJson(Map<String, dynamic> json) {
    return AccountModel(
      id: json['id'] as String,
      name: json['name'] as String,
      balance: (json['balance'] as num).toDouble(),
      userId: json['userId'] as String,
      isSynced: json['isSynced'] as bool,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'balance': balance,
      'userId': userId,
      'isSynced': isSynced,
    };
  }

  Map<String, dynamic> toCloudJson() {
    return {
      'id': id,
      'name': name,
      'balance': balance,
      'userId': userId,
    };
  }

  factory AccountModel.fromCloudJson(Map<String, dynamic> json) {
    return AccountModel(
      id: json['id'] as String,
      name: (json['name'] ?? '') as String,
      balance: (json['balance'] as num).toDouble(),
      userId: (json['user_id'] ?? json['userId'] ?? '') as String,
      isSynced: true,
    );
  }

  AccountModel copyWith({
    String? id,
    String? name,
    double? balance,
    String? userId,
    bool? isSynced,
  }) {
    return AccountModel(
      id: id ?? this.id,
      name: name ?? this.name,
      balance: balance ?? this.balance,
      userId: userId ?? this.userId,
      isSynced: isSynced ?? this.isSynced,
    );
  }
}

class AccountModelAdapter extends TypeAdapter<AccountModel> {
  @override
  final int typeId = 0;

  @override
  AccountModel read(BinaryReader reader) {
    return AccountModel(
      id: reader.readString(),
      name: reader.readString(),
      balance: reader.readDouble(),
      userId: reader.readString(),
      isSynced: reader.readBool(),
    );
  }

  @override
  void write(BinaryWriter writer, AccountModel obj) {
    writer.writeString(obj.id);
    writer.writeString(obj.name);
    writer.writeDouble(obj.balance);
    writer.writeString(obj.userId);
    writer.writeBool(obj.isSynced);
  }
}
