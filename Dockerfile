# استخدام صورة Node.js الرسمية
FROM node:20-alpine

# تعيين مجلد العمل
WORKDIR /app

# نسخ ملفات package
COPY package*.json ./

# تثبيت المكتبات
RUN npm ci --only=production

# نسخ بقية الملفات
COPY . .

# الكشف عن المنفذ
EXPOSE 3000

# متغيرات البيئة الافتراضية
ENV NODE_ENV=production
ENV PORT=3000

# تشغيل التطبيق
CMD ["node", "server.js"]
