#!/bin/bash
# Sales System - Setup Script
# Run: chmod +x setup.sh && ./setup.sh

echo "=========================================="
echo "🚀 نظام المبيعات - سكريبت الإعداد"
echo "=========================================="
echo ""

# Check Node.js
echo "📋 التحقق من المتطلبات..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js غير مثبت. يرجى تثبيت Node.js 18+ من: https://nodejs.org"
    exit 1
fi
echo "✓ Node.js: $(node -v)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm غير مثبت"
    exit 1
fi
echo "✓ npm: $(npm -v)"

# Install dependencies
echo ""
echo "📦 تثبيت المكتبات..."
npm install

# Setup environment
echo ""
echo "⚙️  إعداد متغيرات البيئة..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✓ تم إنشاء ملف .env"
    echo "  ⚠️  عدّل .env حسب إعداداتك"
else
    echo "✓ ملف .env موجود بالفعل"
fi

echo ""
echo "=========================================="
echo "✅ اكتمل الإعداد!"
echo ""
echo "الخطوات التالية:"
echo "1. عدّل ملف .env حسب إعداداتك"
echo "2. تأكد من تشغيل MongoDB"
echo "3. شغّل: node init-db.js"
echo "4. شغّل: npm run dev"
echo ""
echo "الخادم سيعمل على: http://localhost:3000"
echo "=========================================="
