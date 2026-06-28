
/* ═══════════════════════════════════════════════
   i18n.js
══════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════
   i18n — Internationalization System (AR / EN)
═══════════════════════════════════════════════ */

const I18N_KEY = 'salesSystemLang';

const I18N = {
  ar: {
    _dir: 'rtl', _lang: 'ar', _label: 'EN',
    // ─── App ───
    app_title: 'نظام إدارة المبيعات',
    app_brand: 'نظام المبيعات',
    app_version: 'v3.0 — د.ل',
    // ─── Auth ───
    login_title: 'تسجيل الدخول',
    login_user: 'اسم المستخدم',
    login_pass: 'كلمة المرور',
    login_user_ph: 'أدخل اسم المستخدم',
    login_btn: 'دخول',
    login_err_empty: 'أدخل اسم المستخدم وكلمة المرور',
    login_err_invalid: 'بيانات الدخول غير صحيحة',
    login_err_conn: 'فشل الاتصال بخادم المصادقة',
    login_welcome: 'مرحباً',
    logout_title: 'تسجيل خروج',
    // ─── Sidebar ───
    nav_dashboard: 'لوحة التحكم',
    nav_warehouses: 'المخازن',
    nav_sales: 'المبيعات',
    nav_purchases: 'المشتريات',
    nav_finance: 'الزبائن والمالية',
    nav_dash: 'الرئيسية',
    nav_inventory: 'الأصناف والمخزون',
    nav_sales_inv: 'فواتير البيع',
    nav_returns: 'مرتجع المبيعات',
    nav_purchases_inv: 'فواتير الشراء',
    nav_suppay: 'دفعات الموردين',
    nav_customers: 'الزبائن',
    nav_suppliers: 'الموردون',
    nav_soa: 'كشف الحساب',
    nav_finance_cash: 'الخزينة',
    nav_expenses: 'المصروفات',
    nav_pl: 'الأرباح والخسائر',
    nav_users: 'حسابات المستخدمين',
    nav_companies: 'إدارة الشركات',
    nav_audit: 'سجل التدقيق',
    nav_hrm: 'HRM — الموظفين',
    nav_settings: 'الإعدادات',
    user_admin: 'مدير النظام',
    // ─── Topbar ───
    topbar_menu: 'القائمة',
    install_app: 'تثبيت التطبيق',
    search_quick: 'بحث سريع...',
    clear_search: 'مسح البحث',
    // ─── Page titles ───
    page_dash: 'الرئيسية',
    page_inventory: 'الأصناف والمخزون',
    page_sales: 'فواتير البيع',
    page_returns: 'مرتجع المبيعات',
    page_purchases: 'فواتير الشراء',
    page_suppay: 'دفعات الموردين',
    page_customers: 'الزبائن',
    page_suppliers: 'الموردون',
    page_soa: 'كشف الحساب',
    page_finance: 'الخزينة',
    page_pl: 'الأرباح والخسائر',
    page_users: 'حسابات المستخدمين',
    page_companies: 'إدارة الشركات',
    page_audit: 'سجل التدقيق',
    page_hrm: 'HRM — إدارة الموظفين',
    page_settings: 'الإعدادات',
    // ─── Search placeholders ───
    ph_inventory: 'ابحث عن صنف أو كود أو باركود...',
    ph_sales: 'ابحث عن فاتورة أو زبون أو تاريخ...',
    ph_purchases: 'ابحث عن فاتورة أو مورد أو تاريخ...',
    ph_customers: 'ابحث عن زبون أو هاتف...',
    ph_suppliers: 'ابحث عن مورد أو هاتف...',
    ph_returns: 'ابحث عن مرتجع أو فاتورة أو سبب...',
    ph_users: 'ابحث عن مستخدم أو اسم حساب...',
    ph_suppay: 'ابحث عن دفعة أو مورد أو رقم فاتورة...',
    ph_finance: 'ابحث في الحركات المالية...',
    ph_pl: 'ابحث في الأصناف أو الأرباح...',
    ph_audit: 'ابحث في السجلات...',
    ph_soa: 'ابحث في كشف الحساب...',
    ph_hrm: 'ابحث عن موظف...',
    // ─── Dashboard ───
    dash_pending_invoices: 'فواتير معلقة',
    dash_pending_delivery: 'في انتظار التسليم',
    dash_due_receivables: 'ذمم مستحقة',
    dash_unpaid_invoices: 'فواتير غير مسددة',
    dash_stock_alerts: 'تنبيهات مخزون',
    dash_restock_items: 'أصناف تحتاج تجديد',
    dash_col_no: 'رقم',
    dash_col_customer: 'الزبون',
    dash_col_total: 'الإجمالي',
    dash_col_status: 'الحالة',
    dash_lowstock_item: 'الصنف',
    dash_lowstock_qty: 'الرصيد',
    dash_lowstock_min: 'الحد',
    dash_no_invoices: 'لا فواتير',
    dash_all_stock_ok: 'كل الأصناف بمستويات جيدة',
    dash_trend_title: 'المبيعات والمشتريات — آخر 30 يوم',
    // ─── Common labels ───
    lbl_no_data: 'لا تodata',
    lbl_choose: '-- اختر --',
    lbl_search_results: 'لا توجد نتائج لهذا البحث',
    // ─── Payment methods ───
    pay_cash: 'نقدي',
    pay_check: 'صك',
    pay_credit: 'آجَل',
    pay_transfer: 'تحويل',
    // ─── Invoice status ───
    inv_unpaid: 'غير مسدَّدة',
    inv_paid_full: 'مسدَّدة كاملاً',
    inv_paid_partial: 'جزئي',
    inv_undelivered: 'غير مسلَّم',
    inv_delivered: 'تم التسليم',
    pur_unpaid: 'غير مدفوعة',
    pur_paid: 'مدفوعة',
    pur_partial: 'جزئي',
    // ─── Settings ───
    settings_theme_day: 'نهاري',
    settings_theme_night: 'ليلي',
    // ─── Company ───
    company_name_ph: 'أدخل اسم الشركة',
    company_saved: 'تم حفظ بيانات الشركة',
    company_logo_too_big: 'اللوجو كبير جداً',
    company_add: 'إضافة شركة',
    company_update: 'تحديث بيانات الشركة',
    company_default: 'المؤسسة التجارية',
    company_addr: 'طرابلس، ليبيا',
    // ─── Inventory ───
    inv_empty: 'لا توجد أصناف — أضف صنفاً جديداً',
    inv_new: 'صنف جديد',
    inv_edit: 'تعديل صنف',
    inv_add: 'إضافة صنف',
    inv_delete: 'حذف صنف',
    inv_name_ph: 'أدخل اسم الصنف',
    inv_not_found: 'الصنف غير موجود',
    inv_updated: 'تم تعديل',
    inv_created: 'تم الإضافة',
    inv_fill_required: 'املأ جميع الحقول المطلوبة',
    inv_stock_out: 'نفدت',
    inv_stock_low: 'منخفض',
    inv_stock_ok: 'جيد',
    inv_no_results: 'لا توجد نتائج — اضغط Enter لإضافة صنف جديد',
    inv_choose_item: 'اختر صنفاً',
    inv_enter_qty: 'أدخل كمية صحيحة',
    inv_enter_price: 'أدخل سعراً صالحاً',
    inv_neg_discount: 'الخصم لا يمكن أن يكون سالباً',
    inv_discount_exceeds: 'الخصم أكبر من قيمة السطر',
    inv_add_item: 'أضف صنفاً على الأقل',
    inv_stock_short: 'نقص في المخزون',
    // ─── Sales ───
    sales_new: 'فاتورة بيع جديدة',
    sales_edit: 'تعديل فاتورة بيع',
    sales_not_found: 'الفاتورة غير موجودة',
    sales_updated: 'تم تعديل فاتورة',
    sales_created: 'فاتورة بيع (ذمة مدينة)',
    sales_no_deliver: 'لا يمكن تعديل فاتورة مسلّمة',
    sales_delivered: 'تم التسليم',
    sales_deliver_inv: 'تسليم البضاعة (مخزون-)',
    sales_return: 'مرتجع مبيعات',
    sales_return_logged: 'تم تسجيل المرتجع',
    sales_reverse_settle: 'عكس تسوية',
    sales_reverse_done: 'تم عكس التسوية',
    sales_settle_not_found: 'التسوية غير موجودة',
    sales_customer: 'الزبون',
    sales_choose_customer: 'اختر الزبون',
    sales_enter_receiver: 'أدخل اسم المستلم',
    sales_print_err: 'تعذر فتح نافذة الطباعة',
    // ─── Payments ───
    pay_receive: 'استلام دفعة (خزينة+)',
    pay_delete: 'حذف دفعة',
    pay_customer_label: 'استلام دفعة (زبون)',
    pay_settle: 'تسوية (خصم)',
    pay_enter_amount: 'أدخل مبلغاً صحيحاً',
    pay_received: 'تم استلام الدفعة',
    pay_deleted: 'تم حذف الدفعة',
    pay_no_customers: 'لا يوجد زبائن عليهم رصيد غير مسدد',
    pay_choose_customer: 'اختر زبوناً',
    pay_customer_err: 'خطأ في الزبون',
    pay_enter_reason: 'أدخل سبب التسوية',
    pay_choose_invoice: 'اختر فاتورة واحدة على الأقل',
    pay_no_applied: 'لم يتم تطبيق أي مبلغ',
    pay_applied: 'تم تطبيق التسوية',
    // ─── Purchases ───
    pur_new: 'فاتورة شراء جديدة',
    pur_edit: 'تعديل فاتورة شراء',
    pur_created: 'فاتورة شراء (ذمة دائنة)',
    pur_payment: 'دفعة للمورد (خزينة-)',
    pur_settle: 'تسوية مورد (خصم)',
    pur_not_found: 'الفاتورة غير موجودة',
    pur_updated: 'تم تعديل فاتورة',
    pur_choose_supplier: 'اختر المورد',
    pur_no_invoices: 'لا توجد فواتير شراء.',
    pur_all_paid: 'جميع فواتير هذا المورد مسددة',
    pur_choose_supplier_first: 'اختر مورداً أولاً',
    pur_unpaid_invoices: 'فواتير شراء غير مسددة',
    pur_total_unpaid: 'إجمالي غير مسدد',
    pur_total_discount: 'إجمالي الخصم',
    pur_remaining: 'المتبقي بعد الخصم',
    pur_add_item: 'أضف صنفاً',
    // ─── Customers ───
    cust_new: 'زبون جديد',
    cust_name_ph: 'أدخل اسم الزبون',
    cust_add: 'إضافة زبون',
    // ─── Suppliers ───
    sup_new: 'مورد جديد',
    sup_name_ph: 'أدخل اسم المورد',
    sup_add: 'إضافة مورد',
    // ─── Users ───
    user_new: 'مستخدم جديد',
    user_add: 'إضافة مستخدم',
    user_delete: 'حذف مستخدم',
    user_create_fail: 'فشل إنشاء المستخدم',
    user_conn_fail: 'فشل الاتصال بخادم المستخدمين',
    user_cannot_delete_self: 'لا يمكن حذف المستخدم الحالي',
    user_keep_admin: 'يجب أن يبقى مشرف واحد على الأقل',
    user_deleted: 'تم حذف المستخدم',
    user_empty: 'لا توجد حسابات مستخدمين',
    user_admin_label: 'مشرف',
    user_sales_label: 'مبيعات',
    user_warehouse_label: 'مخازن',
    user_user_label: 'مستخدم',
    user_active: 'نشط',
    user_inactive: 'موقوف',
    user_disabled: 'غير نشط',
    // ─── SOA ───
    soa_choose_supplier: 'اختر مورد',
    soa_choose_customer: 'اختر زبون',
    // ─── Settlement ───
    settle_auto: 'تلقائي (قسمة على الجميع)',
    settle_manual: 'اختياري (تحديد يدوي)',
    // ─── Collection modal ───
    col_title: 'استلام دفعة من الزبون',
    col_total_sales: 'إجمالي مبيعات الزبون',
    col_opening_balance: 'رصيد افتتاحي',
    col_collected: 'محصَّل ككل',
    col_total_due: 'الذمة الإجمالية',
    col_unpaid_invoices: 'فواتير غير مسددة',
    col_all_paid: 'جميع فواتير هذا الزبون مسددة',
    // ─── View invoice ───
    view_inv_title: 'تفاصيل الفاتورة',
    view_inv_info: 'معلومات الفاتورة',
    view_inv_pay_status: 'حالة السداد',
    view_inv_items: 'بنود الفاتورة',
    view_inv_payments: 'سجل الدفعات',
    view_inv_no_payments: 'لا دفعات مسجَّلة بعد',
    // ─── Invoice print ───
    print_invoice_sale: 'فاتورة بيع',
    print_invoice_pur: 'فاتورة شراء',
    print_inv_no: 'رقم الفاتورة',
    print_date: 'التاريخ',
    print_total: 'الإجمالي',
    print_collected: 'محصَّل',
    print_remaining: 'المتبقي',
    print_item: 'الصنف',
    print_qty: 'الكمية',
    print_price: 'السعر',
    print_discount: 'الخصم',
    print_net_total: 'صافي الفاتورة',
    print_notes: 'ملاحظات',
    // ─── Returns ───
    ret_empty: 'لا توجد نتائج لهذا البحث',
    // ─── Finance ───
    finance_empty: 'لا توجد حركات',
    // ─── Audit ───
    audit_empty: 'لا توجد سجلات',
    // ─── Profit & Loss ───
    pl_empty: 'لا توجد بيانات',
    // ─── Users page ───
    users_empty: 'لا توجد حسابات مستخدمين',
    users_admin_only: 'هذه الصفحة متاحة للمشرف فقط',
    // ─── Online/Offline ───
    online_restored: 'الاتصال عاد — جاري المزامنة تلقائياً...',
    offline_lost: 'تم فقدان الاتصال — سيتم العمل محلياً',
    offline_banner: 'وضع عدم الاتصال — البيانات محفوظة محلياً',
    // ─── Sync ───
    sync_cloud_loaded: 'تم تحميل البيانات من السحابة',
    sync_no_connection: 'لا يوجد اتصال بالإنترنت حالياً',
    sync_in_progress: 'جاري المزامنة مع السحابة...',
    sync_success: 'تمت المزامنة بنجاح',
    sync_cloud_fail: 'فشل حفظ البيانات السحابية',
    sync_login_first: 'سجل الدخول أولاً للمزامنة',
    sync_not_connected: 'غير متصل',
    sync_ready: 'جاهز للمزامنة',
    // ─── Backup ───
    backup_exported: 'تم تصدير النسخة الاحتياطية بنجاح',
    backup_invalid_file: 'ملف غير صالح',
    backup_replace_warning: 'سيتم استبدال جميع البيانات الحالية...',
    backup_save_error: 'خطأ في الحفظ',
    backup_label: 'نسخة',
    // ─── Auth guard ───
    auth_required: 'يجب تسجيل الدخول أولاً',
    auth_admin_only: 'هذه الوظيفة متاحة للمشرف فقط',
    // ─── Barcode ───
    barcode_saved: 'تم حفظ إعدادات الباركود',
    barcode_item_not_found: 'الصنف غير موجود',
    barcode_print_err: 'تعذر فتح نافذة الطباعة',
    barcode_no_items: 'لا توجد أصناف',
    // ─── HRM ───
    hrm_draft_empty: 'لا توجد مسودة محفوظة',
    hrm_draft_restored: 'تم استرجاع المسودة',
    hrm_draft_cleared: 'تم مسح المسودة',
    hrm_form_cleared: 'تم مسح النموذج',
    hrm_name_required: 'أدخل اسم الموظف أولاً',
    hrm_name_req: 'الاسم مطلوب',
    hrm_employee_added: 'تم إضافة الموظف بنجاح',
    hrm_employee_updated: 'تم تحديث الموظف بنجاح',
    hrm_contract_ended: 'تم إنهاء العقد',
    hrm_choose_employee: 'اختر موظف',
    hrm_attendance_logged: 'تم تسجيل الحضور بنجاح',
    hrm_record_locked: 'قفل هذا السجل',
    hrm_record_locked_done: 'تم قفل السجل',
    hrm_choose_emp_amount: 'اختر الموظف والمبلغ',
    hrm_enter_installment: 'أدخل القسط الشهري للقرض',
    hrm_advance_issued: 'تم صرف السلفة/القرض بنجاح',
    hrm_invalid_amount: 'مبلغ غير صالح',
    hrm_repayment_done: 'تم التسديد بنجاح',
    hrm_choose_period: 'اختر الفترة',
    hrm_payroll_generated: 'تم توليد رواتب',
    hrm_payroll_approved: 'تم اعتماد الراتب',
    hrm_payroll_confirm: 'تأكيد دفع هذا الراتب',
    hrm_payroll_paid: 'تم الدفع بنجاح',
    hrm_enter_amount_reason: 'أدخل المبلغ والسبب',
    hrm_adjustment_done: 'تم التسوية بنجاح',
    hrm_no_payroll: 'لا توجد رواتب',
    hrm_no_employees: 'لا يوجد موظفون',
    hrm_no_attendance: 'لا توجد سجلات حضور',
    hrm_no_advances: 'لا توجد سلف',
    hrm_no_movements: 'لا توجد حركات',
    // HRM contract types
    hrm_full_time: 'دوام كامل',
    hrm_part_time: 'دوام جزئي',
    hrm_hourly: 'بالساعة',
    hrm_contract: 'عقد',
    // HRM status
    hrm_active: 'نشط',
    hrm_inactive: 'غير نشط',
    hrm_ended: 'منتهي',
    // HRM attendance
    hrm_present: 'حاضر',
    hrm_absent: 'غائب',
    hrm_late: 'متأخر',
    hrm_half_day: 'نصف يوم',
    hrm_leave: 'إجازة',
    // HRM advance status
    hrm_advance_active: 'نشط',
    hrm_advance_completed: 'مسدد',
    hrm_advance_cancelled: 'ملغي',
    // HRM payroll status
    hrm_payroll_draft: 'مسودة',
    hrm_payroll_approved_status: 'معتمدة',
    hrm_payroll_paid_status: 'مدفوعة',
    hrm_payroll_cancelled: 'ملغاة',
    // HRM cash ledger
    hrm_cash_in: 'وارد',
    hrm_cash_out: 'صادر',
    hrm_cash_balance: 'الرصيد الحالي',
    // HRM reports
    hrm_report_emp_count: 'عدد الموظفين',
    hrm_report_gross_salary: 'إجمالي الرواتب الخام',
    hrm_report_deductions: 'إجمالي الخصومات',
    hrm_report_net_salary: 'صافي الرواتب',
    hrm_report_hours: 'إجمالي ساعات العمل',
    hrm_report_overtime: 'إجمالي الأوفرتايم',
    hrm_report_drafts: 'مسودات',
    hrm_report_paid: 'مدفوعة',
    hrm_report_active_advances: 'إجمالي السلف والقروض النشطة',
    // HRM hints
    hrm_hint_fulltime: 'الدوام الكامل: يُنصح بتحديد الراتب الشهري...',
    hrm_hint_hourly: 'الدفعة بالساعة: يُنصح بتحديد أجر الساعة فقط',
    hrm_hint_loan: 'القرض: سيتم خصم القسط الشهري تلقائياً...',
    // ─── FAB ───
    fab_new_sale: 'فاتورة بيع جديدة',
    fab_new_item: 'صنف جديد',
    fab_collect: 'استلام دفعة',
    fab_new_purchase: 'فاتورة شراء',
    // ─── Print ───
    print_company: 'المؤسسة',
    print_invoice: 'فاتورة',
    print_item_no: 'رقم',
    print_unit_price: 'سعر الوحدة',
    print_line_total: 'الإجمالي',
    print_subtotal: 'المجموع',
    print_vat: 'ضريبة القيمة المضافة',
    print_grand_total: 'الإجمالي الكلي',
    print_amount_paid: 'المبلغ المدفوع',
    print_amount_due: 'المبلغ المستحق',
    print_signature: 'توقيع المعتمد',
    print_thank_you: 'شكراً لتعاملكم معنا',
    // ─── Reports ───
    report_title: 'التقارير',
    report_sales_summary: 'ملخص المبيعات',
    report_purchase_summary: 'ملخص المشتريات',
    report_inventory: 'تقرير المخزون',
    report_customers: 'تقرير الزبائن',
    report_suppliers: 'تقرير الموردين',
    report_financial: 'التقرير المالي',
    report_audit: 'تقرير التدقيق',
    report_hr: 'التقرير البشري',
    // ─── Months ───
    month_1: 'يناير', month_2: 'فبراير', month_3: 'مارس', month_4: 'أبريل',
    month_5: 'مايو', month_6: 'يونيو', month_7: 'يوليو', month_8: 'أغسطس',
    month_9: 'سبتمبر', month_10: 'أكتوبر', month_11: 'نوفمبر', month_12: 'ديسمبر',
    // ─── Days ───
    day_sun: 'أحد', day_mon: 'اثنين', day_tue: 'ثلاثاء', day_wed: 'أربعاء',
    day_thu: 'خميس', day_fri: 'جمعة', day_sat: 'سبت',
    // ─── Confirm dialogs ───
    confirm_delete: 'هل أنت متأكد من الحذف؟',
    confirm_action: 'هل أنت متأكد من هذا الإجراء؟',
    // ─── General ───
    save: 'حفظ', cancel: 'إلغاء', delete: 'حذف', edit: 'تعديل', add: 'إضافة',
    close: 'إغلاق', search: 'بحث', export: 'تصدير', print: 'طباعة', refresh: 'تحديث',
    loading: 'جاري التحميل...', no_results: 'لا توجد نتائج', confirm: 'تأكيد',
    yes: 'نعم', no: 'لا', all: 'الكل', none: 'لا شيء',
    dash_shortage: 'نقص',
    dash_good: 'جيد',
    dash_balance: 'الرصيد',
    dash_reorder: 'حد الأمان',
    dash_shortage_label: 'النقص',
    dash_all_stock_ok_cv: 'كل الأصناف بمستويات جيدة',
    theme_light: 'نهاري',
    theme_dark: 'ليلي',
    sync_fail_retry: 'فشل المزامنة، سيتم المحاولة لاحقاً',
    sync_restored: 'اتصال مُستعاد',
    sync_disconnected: 'انقطع الاتصال',
    ptr_refreshed: 'تم التحديث',
    install_done: 'تم تثبيت التطبيق',
    install_cancelled: 'تم إلغاء التثبيت',
    install_success: 'تم تثبيت التطبيق بنجاح',
    login_failed: 'فشل تسجيل الدخول',
    login_success: 'تم تسجيل الدخول',
    backup_confirm_replace: 'سيتم استبدال جميع البيانات الحالية. هل أنت متأكد؟',
    backup_imported: 'تم استيراد البيانات بنجاح',
    backup_read_error: 'خطأ في قراءة الملف',
    backup_copy: 'نسخة',
    backup_download: 'تحميل',
    backup_del_btn: 'حذف',
    user_not_logged: 'غير مسجل',
    user_guest_initial: 'م',
    inv_no_results_add: 'لا توجد نتائج — اضغط Enter لإضافة صنف جديد',
    inv_new_title: 'صنف جديد',
    inv_save_item: 'حفظ الصنف',
    inv_updated_done: 'تم التعديل',
    inv_item_updated: 'تم التعديل الصنف',
    inv_sell_price: 'سعر البيع',
    sales_stock_warning: 'الرصيد الحالي أقل من الكمية المطلوبة',
    sales_edited: 'تم تعديل فاتورة',
    sales_new_invoice: 'فاتورة بيع جديدة',
    sales_invoice_edited: 'تم التعديل',
    pur_edited: 'تم تعديل فاتورة',
    pur_save_edits: 'حفظ التعديلات',
    barcode_settings_saved: 'تم حفظ إعدادات الباركود',
    barcode_error: 'خطأ في إنشاء الباركود',
    barcode_item_not_found_msg: 'الصنف غير موجود',
    barcode_no_items_msg: 'لا توجد أصناف',
    barcode_no_available: 'لا توجد أصناف متوفرة للطباعة',
    customize_not_supported: 'هذه الصفحة لا تدعم التخصيص',
    customize_reset: 'تم إعادة الضبط',
    report_no_data: 'لا توجد بيانات',
    report_no_data_msg: 'اختر شركة لعرض التقارير',
    export_no_records: 'لا توجد سجلات',
    hrm_all_departments: 'كل الأقسام',
    currency_sym: 'د.ل',
    hrm_hint_parttime: 'الدوام الجزئي: يمكن تحديد الراتب أو أجر الساعة',
    hrm_hint_contract: 'عقد: يُحدد حسب اتفاقية العقد',
  },

  en: {
    _dir: 'ltr', _lang: 'en', _label: 'عربي',
    // ─── App ───
    app_title: 'Sales Management System',
    app_brand: 'Sales System',
    app_version: 'v3.0 — LYD',
    // ─── Auth ───
    login_title: 'Login',
    login_user: 'Username',
    login_pass: 'Password',
    login_user_ph: 'Enter username',
    login_btn: 'Login',
    login_err_empty: 'Enter username and password',
    login_err_invalid: 'Invalid credentials',
    login_err_conn: 'Authentication server connection failed',
    login_welcome: 'Welcome',
    logout_title: 'Logout',
    // ─── Sidebar ───
    nav_dashboard: 'Dashboard',
    nav_warehouses: 'Warehouses',
    nav_sales: 'Sales',
    nav_purchases: 'Purchases',
    nav_finance: 'Customers & Finance',
    nav_dash: 'Dashboard',
    nav_inventory: 'Inventory',
    nav_sales_inv: 'Sales Invoices',
    nav_returns: 'Sales Returns',
    nav_purchases_inv: 'Purchase Invoices',
    nav_suppay: 'Supplier Payments',
    nav_customers: 'Customers',
    nav_suppliers: 'Suppliers',
    nav_soa: 'Statement of Account',
    nav_finance_cash: 'Treasury',
    nav_expenses: 'Expenses',
    nav_pl: 'Profit & Loss',
    nav_users: 'User Accounts',
    nav_companies: 'Company Management',
    nav_audit: 'Audit Log',
    nav_hrm: 'HRM — Employees',
    nav_settings: 'Settings',
    user_admin: 'System Admin',
    // ─── Topbar ───
    topbar_menu: 'Menu',
    install_app: 'Install App',
    search_quick: 'Quick search...',
    clear_search: 'Clear search',
    // ─── Page titles ───
    page_dash: 'Dashboard',
    page_inventory: 'Inventory',
    page_sales: 'Sales Invoices',
    page_returns: 'Sales Returns',
    page_purchases: 'Purchase Invoices',
    page_suppay: 'Supplier Payments',
    page_customers: 'Customers',
    page_suppliers: 'Suppliers',
    page_soa: 'Statement of Account',
    page_finance: 'Treasury',
    page_pl: 'Profit & Loss',
    page_users: 'User Accounts',
    page_companies: 'Company Management',
    page_audit: 'Audit Log',
    page_hrm: 'HRM — Employee Management',
    page_settings: 'Settings',
    // ─── Search placeholders ───
    ph_inventory: 'Search item, code or barcode...',
    ph_sales: 'Search invoice, customer or date...',
    ph_purchases: 'Search invoice, supplier or date...',
    ph_customers: 'Search customer or phone...',
    ph_suppliers: 'Search supplier or phone...',
    ph_returns: 'Search return, invoice or reason...',
    ph_users: 'Search user or username...',
    ph_suppay: 'Search payment, supplier or invoice...',
    ph_finance: 'Search financial transactions...',
    ph_pl: 'Search items or profits...',
    ph_audit: 'Search audit logs...',
    ph_soa: 'Search statement of account...',
    ph_hrm: 'Search employee...',
    // ─── Dashboard ───
    dash_pending_invoices: 'Pending Invoices',
    dash_pending_delivery: 'Awaiting Delivery',
    dash_due_receivables: 'Due Receivables',
    dash_unpaid_invoices: 'Unpaid Invoices',
    dash_stock_alerts: 'Stock Alerts',
    dash_restock_items: 'Items Need Restocking',
    dash_col_no: 'No.',
    dash_col_customer: 'Customer',
    dash_col_total: 'Total',
    dash_col_status: 'Status',
    dash_lowstock_item: 'Item',
    dash_lowstock_qty: 'Qty',
    dash_lowstock_min: 'Min',
    dash_no_invoices: 'No invoices',
    dash_all_stock_ok: 'All items at good levels',
    dash_trend_title: 'Sales & Purchases — Last 30 Days',
    // ─── Common labels ───
    lbl_no_data: 'No data',
    lbl_choose: '-- Choose --',
    lbl_search_results: 'No search results',
    // ─── Payment methods ───
    pay_cash: 'Cash',
    pay_check: 'Check',
    pay_credit: 'Credit',
    pay_transfer: 'Transfer',
    // ─── Invoice status ───
    inv_unpaid: 'Unpaid',
    inv_paid_full: 'Paid in Full',
    inv_paid_partial: 'Partial',
    inv_undelivered: 'Not Delivered',
    inv_delivered: 'Delivered',
    pur_unpaid: 'Unpaid',
    pur_paid: 'Paid',
    pur_partial: 'Partial',
    // ─── Settings ───
    settings_theme_day: 'Light',
    settings_theme_night: 'Dark',
    // ─── Company ───
    company_name_ph: 'Enter company name',
    company_saved: 'Company data saved',
    company_logo_too_big: 'Logo too large',
    company_add: 'Add Company',
    company_update: 'Update Company Data',
    company_default: 'Trading Company',
    company_addr: 'Tripoli, Libya',
    // ─── Inventory ───
    inv_empty: 'No items — Add a new item',
    inv_new: 'New Item',
    inv_edit: 'Edit Item',
    inv_add: 'Add Item',
    inv_delete: 'Delete Item',
    inv_name_ph: 'Enter item name',
    inv_not_found: 'Item not found',
    inv_updated: 'Updated',
    inv_created: 'Created',
    inv_fill_required: 'Fill all required fields',
    inv_stock_out: 'Out of Stock',
    inv_stock_low: 'Low Stock',
    inv_stock_ok: 'Good',
    inv_no_results: 'No results — Press Enter to add new item',
    inv_choose_item: 'Choose an item',
    inv_enter_qty: 'Enter valid quantity',
    inv_enter_price: 'Enter valid price',
    inv_neg_discount: 'Discount cannot be negative',
    inv_discount_exceeds: 'Discount exceeds line value',
    inv_add_item: 'Add at least one item',
    inv_stock_short: 'Insufficient stock',
    // ─── Sales ───
    sales_new: 'New Sales Invoice',
    sales_edit: 'Edit Sales Invoice',
    sales_not_found: 'Invoice not found',
    sales_updated: 'Invoice updated',
    sales_created: 'Sales invoice (debit)',
    sales_no_deliver: 'Cannot edit delivered invoice',
    sales_delivered: 'Delivered',
    sales_deliver_inv: 'Deliver goods (inventory-)',
    sales_return: 'Sales Return',
    sales_return_logged: 'Return registered',
    sales_reverse_settle: 'Reverse Settlement',
    sales_reverse_done: 'Settlement reversed',
    sales_settle_not_found: 'Settlement not found',
    sales_customer: 'Customer',
    sales_choose_customer: 'Choose a customer',
    sales_enter_receiver: 'Enter receiver name',
    sales_print_err: 'Failed to open print window',
    // ─── Payments ───
    pay_receive: 'Receive payment (treasury+)',
    pay_delete: 'Delete payment',
    pay_customer_label: 'Receive payment (customer)',
    pay_settle: 'Settlement (discount)',
    pay_enter_amount: 'Enter valid amount',
    pay_received: 'Payment received',
    pay_deleted: 'Payment deleted',
    pay_no_customers: 'No customers with outstanding balance',
    pay_choose_customer: 'Choose a customer',
    pay_customer_err: 'Customer error',
    pay_enter_reason: 'Enter settlement reason',
    pay_choose_invoice: 'Choose at least one invoice',
    pay_no_applied: 'No amount applied',
    pay_applied: 'Settlement applied',
    // ─── Purchases ───
    pur_new: 'New Purchase Invoice',
    pur_edit: 'Edit Purchase Invoice',
    pur_created: 'Purchase invoice (credit)',
    pur_payment: 'Payment to supplier (treasury-)',
    pur_settle: 'Supplier settlement (discount)',
    pur_not_found: 'Invoice not found',
    pur_updated: 'Invoice updated',
    pur_choose_supplier: 'Choose a supplier',
    pur_no_invoices: 'No purchase invoices.',
    pur_all_paid: 'All invoices for this supplier are paid',
    pur_choose_supplier_first: 'Choose a supplier first',
    pur_unpaid_invoices: 'Unpaid purchase invoices',
    pur_total_unpaid: 'Total unpaid',
    pur_total_discount: 'Total discount',
    pur_remaining: 'Remaining after discount',
    pur_add_item: 'Add an item',
    // ─── Customers ───
    cust_new: 'New Customer',
    cust_name_ph: 'Enter customer name',
    cust_add: 'Add Customer',
    // ─── Suppliers ───
    sup_new: 'New Supplier',
    sup_name_ph: 'Enter supplier name',
    sup_add: 'Add Supplier',
    // ─── Users ───
    user_new: 'New User',
    user_add: 'Add User',
    user_delete: 'Delete User',
    user_create_fail: 'Failed to create user',
    user_conn_fail: 'User server connection failed',
    user_cannot_delete_self: 'Cannot delete current user',
    user_keep_admin: 'At least one admin must remain',
    user_deleted: 'User deleted',
    user_empty: 'No user accounts',
    user_admin_label: 'Admin',
    user_sales_label: 'Sales',
    user_warehouse_label: 'Warehouse',
    user_user_label: 'User',
    user_active: 'Active',
    user_inactive: 'Inactive',
    user_disabled: 'Disabled',
    // ─── SOA ───
    soa_choose_supplier: 'Choose a supplier',
    soa_choose_customer: 'Choose a customer',
    // ─── Settlement ───
    settle_auto: 'Auto (split evenly)',
    settle_manual: 'Manual (select)',
    // ─── Collection modal ───
    col_title: 'Collect Payment from Customer',
    col_total_sales: 'Total Customer Sales',
    col_opening_balance: 'Opening Balance',
    col_collected: 'Total Collected',
    col_total_due: 'Total Due',
    col_unpaid_invoices: 'Unpaid Invoices',
    col_all_paid: 'All invoices for this customer are paid',
    // ─── View invoice ───
    view_inv_title: 'Invoice Details',
    view_inv_info: 'Invoice Information',
    view_inv_pay_status: 'Payment Status',
    view_inv_items: 'Invoice Items',
    view_inv_payments: 'Payment History',
    view_inv_no_payments: 'No payments recorded yet',
    // ─── Invoice print ───
    print_invoice_sale: 'Sales Invoice',
    print_invoice_pur: 'Purchase Invoice',
    print_inv_no: 'Invoice No.',
    print_date: 'Date',
    print_total: 'Total',
    print_collected: 'Collected',
    print_remaining: 'Remaining',
    print_item: 'Item',
    print_qty: 'Qty',
    print_price: 'Price',
    print_discount: 'Discount',
    print_net_total: 'Net Total',
    print_notes: 'Notes',
    // ─── Returns ───
    ret_empty: 'No search results',
    // ─── Finance ───
    finance_empty: 'No transactions',
    // ─── Audit ───
    audit_empty: 'No audit records',
    // ─── Profit & Loss ───
    pl_empty: 'No data',
    // ─── Users page ───
    users_empty: 'No user accounts',
    users_admin_only: 'This page is admin only',
    // ─── Online/Offline ───
    online_restored: 'Connection restored — syncing...',
    offline_lost: 'Connection lost — working offline',
    offline_banner: 'Offline mode — data saved locally',
    // ─── Sync ───
    sync_cloud_loaded: 'Data loaded from cloud',
    sync_no_connection: 'No internet connection',
    sync_in_progress: 'Syncing with cloud...',
    sync_success: 'Sync completed successfully',
    sync_cloud_fail: 'Cloud save failed',
    sync_login_first: 'Login first to sync',
    sync_not_connected: 'Offline',
    sync_ready: 'Ready to sync',
    // ─── Backup ───
    backup_exported: 'Backup exported successfully',
    backup_invalid_file: 'Invalid file',
    backup_replace_warning: 'All current data will be replaced...',
    backup_save_error: 'Save error',
    backup_label: 'Backup',
    // ─── Auth guard ───
    auth_required: 'Please login first',
    auth_admin_only: 'This function is admin only',
    // ─── Barcode ───
    barcode_saved: 'Barcode settings saved',
    barcode_item_not_found: 'Item not found',
    barcode_print_err: 'Failed to open print window',
    barcode_no_items: 'No items',
    // ─── HRM ───
    hrm_draft_empty: 'No saved drafts',
    hrm_draft_restored: 'Draft restored',
    hrm_draft_cleared: 'Draft cleared',
    hrm_form_cleared: 'Form cleared',
    hrm_name_required: 'Enter employee name first',
    hrm_name_req: 'Name is required',
    hrm_employee_added: 'Employee added successfully',
    hrm_employee_updated: 'Employee updated successfully',
    hrm_contract_ended: 'Contract terminated',
    hrm_choose_employee: 'Choose an employee',
    hrm_attendance_logged: 'Attendance recorded successfully',
    hrm_record_locked: 'Lock this record',
    hrm_record_locked_done: 'Record locked',
    hrm_choose_emp_amount: 'Choose employee and amount',
    hrm_enter_installment: 'Enter loan monthly installment',
    hrm_advance_issued: 'Advance/Loan issued successfully',
    hrm_invalid_amount: 'Invalid amount',
    hrm_repayment_done: 'Repayment completed',
    hrm_choose_period: 'Choose period',
    hrm_payroll_generated: 'Payroll generated',
    hrm_payroll_approved: 'Payroll approved',
    hrm_payroll_confirm: 'Confirm payment of this salary',
    hrm_payroll_paid: 'Payment completed',
    hrm_enter_amount_reason: 'Enter amount and reason',
    hrm_adjustment_done: 'Adjustment completed',
    hrm_no_payroll: 'No payroll records',
    hrm_no_employees: 'No employees',
    hrm_no_attendance: 'No attendance records',
    hrm_no_advances: 'No advances',
    hrm_no_movements: 'No transactions',
    // HRM contract types
    hrm_full_time: 'Full Time',
    hrm_part_time: 'Part Time',
    hrm_hourly: 'Hourly',
    hrm_contract: 'Contract',
    // HRM status
    hrm_active: 'Active',
    hrm_inactive: 'Inactive',
    hrm_ended: 'Ended',
    // HRM attendance
    hrm_present: 'Present',
    hrm_absent: 'Absent',
    hrm_late: 'Late',
    hrm_half_day: 'Half Day',
    hrm_leave: 'Leave',
    // HRM advance status
    hrm_advance_active: 'Active',
    hrm_advance_completed: 'Completed',
    hrm_advance_cancelled: 'Cancelled',
    // HRM payroll status
    hrm_payroll_draft: 'Draft',
    hrm_payroll_approved_status: 'Approved',
    hrm_payroll_paid_status: 'Paid',
    hrm_payroll_cancelled: 'Cancelled',
    // HRM cash ledger
    hrm_cash_in: 'Income',
    hrm_cash_out: 'Expense',
    hrm_cash_balance: 'Current Balance',
    // HRM reports
    hrm_report_emp_count: 'Employee Count',
    hrm_report_gross_salary: 'Gross Salary',
    hrm_report_deductions: 'Total Deductions',
    hrm_report_net_salary: 'Net Salary',
    hrm_report_hours: 'Total Hours',
    hrm_report_overtime: 'Total Overtime',
    hrm_report_drafts: 'Drafts',
    hrm_report_paid: 'Paid',
    hrm_report_active_advances: 'Active Advances & Loans',
    // HRM hints
    hrm_hint_fulltime: 'Full Time: It is recommended to set the monthly salary...',
    hrm_hint_hourly: 'Hourly: It is recommended to set the hourly rate only',
    hrm_hint_loan: 'Loan: Monthly installment will be deducted automatically...',
    // ─── FAB ───
    fab_new_sale: 'New Sales Invoice',
    fab_new_item: 'New Item',
    fab_collect: 'Collect Payment',
    fab_new_purchase: 'New Purchase Invoice',
    // ─── Print ───
    print_company: 'Company',
    print_invoice: 'Invoice',
    print_item_no: 'No.',
    print_unit_price: 'Unit Price',
    print_line_total: 'Total',
    print_subtotal: 'Subtotal',
    print_vat: 'VAT',
    print_grand_total: 'Grand Total',
    print_amount_paid: 'Amount Paid',
    print_amount_due: 'Amount Due',
    print_signature: 'Authorized Signature',
    print_thank_you: 'Thank you for your business',
    // ─── Reports ───
    report_title: 'Reports',
    report_sales_summary: 'Sales Summary',
    report_purchase_summary: 'Purchase Summary',
    report_inventory: 'Inventory Report',
    report_customers: 'Customer Report',
    report_suppliers: 'Supplier Report',
    report_financial: 'Financial Report',
    report_audit: 'Audit Report',
    report_hr: 'HR Report',
    // ─── Months ───
    month_1: 'January', month_2: 'February', month_3: 'March', month_4: 'April',
    month_5: 'May', month_6: 'June', month_7: 'July', month_8: 'August',
    month_9: 'September', month_10: 'October', month_11: 'November', month_12: 'December',
    // ─── Days ───
    day_sun: 'Sun', day_mon: 'Mon', day_tue: 'Tue', day_wed: 'Wed',
    day_thu: 'Thu', day_fri: 'Fri', day_sat: 'Sat',
    // ─── Confirm dialogs ───
    confirm_delete: 'Are you sure you want to delete?',
    confirm_action: 'Are you sure about this action?',
    // ─── General ───
    save: 'Save', cancel: 'Cancel', delete: 'Delete', edit: 'Edit', add: 'Add',
    close: 'Close', search: 'Search', export: 'Export', print: 'Print', refresh: 'Refresh',
    loading: 'Loading...', no_results: 'No results', confirm: 'Confirm',
    yes: 'Yes', no: 'No', all: 'All', none: 'None',
    dash_shortage: 'Shortage',
    dash_good: 'Good',
    dash_balance: 'Balance',
    dash_reorder: 'Reorder',
    dash_shortage_label: 'Shortage',
    dash_all_stock_ok_cv: 'All items at good levels',
    theme_light: 'Light',
    theme_dark: 'Dark',
    sync_fail_retry: 'Sync failed, will retry later',
    sync_restored: 'Connection restored',
    sync_disconnected: 'Connection lost',
    ptr_refreshed: 'Refreshed',
    install_done: 'App installed',
    install_cancelled: 'Installation cancelled',
    install_success: 'App installed successfully',
    login_failed: 'Login failed',
    login_success: 'Login successful',
    backup_confirm_replace: 'All current data will be replaced. Are you sure?',
    backup_imported: 'Data imported successfully',
    backup_read_error: 'Error reading file',
    backup_copy: 'Copy',
    backup_download: 'Download',
    backup_del_btn: 'Delete',
    user_not_logged: 'Not logged in',
    user_guest_initial: 'M',
    inv_no_results_add: 'No results - Press Enter to add new item',
    inv_new_title: 'New Item',
    inv_save_item: 'Save Item',
    inv_updated_done: 'Updated',
    inv_item_updated: 'Item updated',
    inv_sell_price: 'Sell price',
    sales_stock_warning: 'Current stock is less than required quantity',
    sales_edited: 'Invoice edited',
    sales_new_invoice: 'New Sales Invoice',
    sales_invoice_edited: 'Invoice edited',
    pur_edited: 'Invoice edited',
    pur_save_edits: 'Save Edits',
    barcode_settings_saved: 'Barcode settings saved',
    barcode_error: 'Barcode generation error',
    barcode_item_not_found_msg: 'Item not found',
    barcode_no_items_msg: 'No items',
    barcode_no_available: 'No available items to print',
    customize_not_supported: 'This page does not support customization',
    customize_reset: 'Reset completed',
    report_no_data: 'No data',
    report_no_data_msg: 'Select a company to view reports',
    export_no_records: 'No records',
    hrm_all_departments: 'All Departments',
    currency_sym: 'LYD',
    hrm_hint_parttime: 'Part Time: You can set salary or hourly rate',
    hrm_hint_contract: 'Contract: Set per agreement',
  }
};

let _currentLang = localStorage.getItem(I18N_KEY) || (navigator.language.startsWith('ar') ? 'ar' : 'en');

function t(key) {
  return (I18N[_currentLang] && I18N[_currentLang][key]) || (I18N.ar[key]) || key;
}

function getLang() { return _currentLang; }

function setLang(lang) {
  if (!I18N[lang]) return;
  _currentLang = lang;
  localStorage.setItem(I18N_KEY, lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = I18N[lang]._dir;
  applyTranslations();
  updateLangButton();
  if (typeof renderDash === 'function') renderDash();
}

function toggleLanguage() {
  setLang(_currentLang === 'ar' ? 'en' : 'ar');
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translated = t(key);
    if (translated) el.textContent = translated;
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    const translated = t(key);
    if (translated) el.placeholder = translated;
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    const translated = t(key);
    if (translated) el.title = translated;
  });
  updatePageTitle();
}

function updatePageTitle() {
  const activePage = document.querySelector('.nav-item.active');
  if (activePage) {
    const pg = activePage.dataset.page;
    const titleKey = 'page_' + pg;
    const title = t(titleKey);
    const meta = typeof PAGE_META !== 'undefined' ? PAGE_META[pg] : null;
    const icon = meta ? meta.i : 'ti-circle';
    const el = document.getElementById('pg-title');
    if (el) el.innerHTML = `<i class="ti ${icon}"></i> ${title}`;
  }
}

function updateLangButton() {
  const btn = document.getElementById('lang-toggle');
  if (btn) btn.textContent = t('_label');
}

function i18nLocale() {
  return _currentLang === 'ar' ? 'ar-LY' : 'en-US';
}

function i18nDate(date, opts = {}) {
  return new Date(date).toLocaleDateString(i18nLocale(), opts);
}

function i18nTime(date, opts = {}) {
  return new Date(date).toLocaleTimeString(i18nLocale(), opts);
}

function i18nDateTime(date, opts = {}) {
  return new Date(date).toLocaleString(i18nLocale(), opts);
}

(function initI18n() {
  document.documentElement.lang = _currentLang;
  document.documentElement.dir = I18N[_currentLang]._dir;
})();

/* ═══════════════════════════════════════════════
   db.js
══════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════
   DATABASE
═══════════════════════════════════════════════ */
const STORAGE_KEY='salesSystemDB';
const SESSION_KEY='salesSystemSession';
const AUTH_TOKEN_KEY='salesSystemAuthToken';
const AUTH_USER_KEY='salesSystemAuthUser';
const API_BASE_URL=(window.location.port === '3000' || window.location.port === '' || window.location.port === '443' || window.location.port === '80')
  ? `${window.location.origin}/api/v1`
  : `${window.location.protocol}//${window.location.hostname}:3000/api/v1`;

/* ═══ ERROR TRACKER ═══ */
(function initErrorTracker(){
  window._errorCounts={};
  window._lastErrorTime={};
  window.trackError=function(msg,source,filename,line,col,stack){
    const now=Date.now();
    const key=msg+'|'+filename+'|'+line;
    if(window._lastErrorTime[key]&&now-window._lastErrorTime[key]<5000)return;
    window._lastErrorTime[key]=now;
    window._errorCounts[key]=(window._errorCounts[key]||0)+1;
    try{
      fetch(API_BASE_URL.replace('/api/v1','')+'/api/v1/errors',{
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+(localStorage.getItem(AUTH_TOKEN_KEY)||'')},
        body:JSON.stringify({message:msg,source,filename,lineno:line,colno:col,stack,url:window.location.href,level:'error'})
      }).catch(()=>{});
    }catch(e){}
  };
  window.addEventListener('error',function(e){
    window.trackError(e.message||'Unknown',e.filename?'script':e.type,e.filename,e.lineno,e.colno,e.error?.stack);
  });
  window.addEventListener('unhandledrejection',function(e){
    window.trackError(String(e.reason||'Unhandled rejection'),'promise','','','','');
  });
})();
const CLOUD_STORAGE_KEY='salesSystemCloud';
const CLOUD_ENDPOINT=''; // ضع رابط API السحابة هنا إذا كان متاحاً
const DB={
  users:[],
  stores:{},
  items:[],custs:[],sups:[],
  invs:[],          // sales invoices
  purs:[],          // purchase invoices
  payments:[],      // customer payments (affect cash + SOA)
  supPayments:[],   // supplier payments (affect cash outflow)
  settlements:[],       // customer invoice settlements/discounts
  supSettlements:[],    // supplier invoice settlements/discounts
  rets:[],
  log:[],
  cI:1,cP:1,cRet:1,cPay:1,cSpay:1,cSettle:1,cSupSettle:1
};

let currentUser=null;
let editingCompanyId=null;
// payment methods state
let _siL=[],_piL=[],_colPay='cash',_spPay='cash',_reQC='pending';

const G=id=>document.getElementById(id);
const fmt=(n,d=2)=>parseFloat(n||0).toFixed(d);
const today=()=>new Date().toISOString().split('T')[0];
const THEME_KEY='salesSystemTheme';
let currentSearch='';

function escapeHtml(str){
  if(!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
function normalizeText(value){
  return String(value||'').toLowerCase().trim();
}

function baseCompany(){
  return {id:1,name:'المؤسسة التجارية',address:'طرابلس، ليبيا',phone:'',note:'',logo:'',taxNo:'',items:[],custs:[],sups:[],invs:[],purs:[],payments:[],supPayments:[],rets:[],log:[],pendingSync:[],lastSynced:null,cI:1,cP:1,cRet:1,cPay:1,cSpay:1,cSettle:1,cSupSettle:1};
}
function defaultStore(){
  return {companies:[baseCompany()],companyId:1};
}
function normalizeStore(store){
  const normalized={...store};
  if(!Array.isArray(normalized.companies)){
    const legacyCompany=normalized.company||{name:'المؤسسة التجارية',address:'طرابلس، ليبيا',phone:'',note:''};
    const firstCompany=baseCompany();
    Object.assign(firstCompany,legacyCompany,{items:normalized.items||[],custs:normalized.custs||[],sups:normalized.sups||[],invs:normalized.invs||[],purs:normalized.purs||[],payments:normalized.payments||[],supPayments:normalized.supPayments||[],rets:normalized.rets||[],log:normalized.log||[],pendingSync:normalized.pendingSync||[],lastSynced:normalized.lastSynced||null,cI:normalized.cI||1,cP:normalized.cP||1,cRet:normalized.cRet||1,cPay:normalized.cPay||1,cSpay:normalized.cSpay||1});
    normalized.companies=[firstCompany];
    normalized.companyId=normalized.companyId||firstCompany.id;
  } else {
    normalized.companyId=normalized.companyId||normalized.companies[0]?.id||1;
    normalized.companies=normalized.companies.map(c=>({
      ...baseCompany(),
      ...c,
      id:c.id||Date.now(),
      items:c.items||[],custs:c.custs||[],sups:c.sups||[],invs:c.invs||[],purs:c.purs||[],payments:c.payments||[],supPayments:c.supPayments||[],rets:c.rets||[],log:c.log||[],pendingSync:c.pendingSync||[],lastSynced:c.lastSynced||null,
      cI:c.cI||1,cP:c.cP||1,cRet:c.cRet||1,cPay:c.cPay||1,cSpay:c.cSpay||1,cSettle:c.cSettle||1,cSupSettle:c.cSupSettle||1
    }));
  }
  return normalized;
}
function currentCompanyStore(){
  return DB.companies?.find(c=>c.id===DB.companyId) || DB.companies?.[0] || baseCompany();
}
function companyLogoHtml(company,height){
  height=height||50;
  if(!company||!company.logo)return'';
  return '<img src="'+escapeHtml(company.logo)+'" style="height:'+height+'px;max-width:'+(height*3)+'px;object-fit:contain;border-radius:6px">';
}
function genUniqueBarcode(){
  const used=new Set(DB.items.map(x=>x.barcode).filter(Boolean));
  let num;
  do{num=String(Math.floor(1000000000+Math.random()*9000000000))}while(used.has(num));
  return num;
}
function loadCompanyData(){
  const company=currentCompanyStore();
  Object.assign(DB,{items:company.items,custs:company.custs,sups:company.sups,invs:company.invs,purs:company.purs,payments:company.payments,supPayments:company.supPayments,rets:company.rets,log:company.log,pendingSync:company.pendingSync,lastSynced:company.lastSynced,cI:company.cI,cP:company.cP,cRet:company.cRet,cPay:company.cPay,cSpay:company.cSpay});
}
function saveCompanyData(){
  const company=currentCompanyStore();
  if(!company) return;
  Object.assign(company,{items:DB.items,custs:DB.custs,sups:DB.sups,invs:DB.invs,purs:DB.purs,payments:DB.payments,supPayments:DB.supPayments,rets:DB.rets,log:DB.log,pendingSync:DB.pendingSync,lastSynced:DB.lastSynced,cI:DB.cI,cP:DB.cP,cRet:DB.cRet,cPay:DB.cPay,cSpay:DB.cSpay});
}
function getAuthHeaders(){
  const token=localStorage.getItem(AUTH_TOKEN_KEY);
  return token?{Authorization:`Bearer ${token}`}:{};
}
async function authenticatedFetch(url,options={}){
  const headers={...getAuthHeaders(),'Content-Type':'application/json',...(options.headers||{})};
  const resp=await fetch(url.startsWith('http')?url:`${API_BASE_URL.replace('/api/v1','')}${url}`,{...options,signal:options.signal||AbortSignal.timeout(15000),headers});
  if(!resp.ok){const err=await resp.json().catch(()=>({message:resp.statusText}));throw new Error(err.message||resp.statusText);}
  return resp;
}
function setAuthSession(token,user){
  localStorage.setItem(AUTH_TOKEN_KEY,token);
  localStorage.setItem(AUTH_USER_KEY,JSON.stringify(user));
  currentUser=user;
}
function clearAuthSession(){
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  localStorage.removeItem(SESSION_KEY);
  currentUser=null;
}
async function validateToken(){
  const token=localStorage.getItem(AUTH_TOKEN_KEY);
  if(!token) return false;
  if(!navigator.onLine) return true;
  try{
    const resp=await fetch(`${API_BASE_URL}/auth/profile`,{headers:{...getAuthHeaders(),'Content-Type':'application/json'}});
    if(!resp.ok){ clearAuthSession(); return false; }
    const profile=await resp.json();
    currentUser=profile;
    localStorage.setItem(AUTH_USER_KEY,JSON.stringify(profile));
    return true;
  }catch(e){
    console.warn('validateToken failed',e);
    return false;
  }
}
function loadStore(username){
  const store=DB.stores?.[username]||defaultStore();
  const normalized=normalizeStore(store);
  Object.assign(DB,defaultStore(),{companies:normalized.companies,companyId:normalized.companyId});
  loadCompanyData();
}
function loadCloudSnapshot(){
  if(!CLOUD_ENDPOINT) return null;
  try{ return JSON.parse(localStorage.getItem(CLOUD_STORAGE_KEY)) || null }catch(e){return null}
}
function saveCloudSnapshot(snapshot){
  if(!CLOUD_ENDPOINT) return false;
  try{ localStorage.setItem(CLOUD_STORAGE_KEY,JSON.stringify(snapshot)); return true }catch(e){return false}
}
function cloudOnline(){
  return navigator.onLine;
}
function syncStatusMsg(){
  const status=G('sync-status');
  if(!status) return;
  if(!cloudOnline()){ status.style.display='inline-block'; status.textContent=t('sync_not_connected'); status.style.color='var(--red)'; return; }
  status.style.display='inline-block';
  status.textContent=DB.lastSynced?`${t('sync_ready')} ${DB.lastSynced}`:t('sync_ready');
  status.style.color='var(--green)';
}
function showSyncButton(){
  const btn=G('sync-btn'); if(btn) btn.style.display='inline-flex';
}
function hideSyncButton(){
  const btn=G('sync-btn'); if(btn) btn.style.display='none';
}
function updateSyncUI(){
  if(!currentUser){ hideSyncButton(); return; }
  showSyncButton(); syncStatusMsg();
}
function saveCurrentStore(){
  if(!currentUser) return;
  saveCompanyData();
  DB.stores[currentUser.username]=({companies:DB.companies,companyId:DB.companyId});
}
function queueCloudSync(){
  DB.pendingSync = DB.pendingSync || [];
  DB.pendingSync.push({type:'update',date:new Date().toISOString()});
}
function mergeCloudStore(local, cloud){
  if(!cloud) return local;
  const localTime = local.lastSynced ? new Date(local.lastSynced).getTime() : 0;
  const cloudTime = cloud.lastSynced ? new Date(cloud.lastSynced).getTime() : 0;
  if(cloudTime > localTime) return cloud;
  return local;
}
async function loadCloudStoreForUser(){
  if(!currentUser) return;
  if(CLOUD_ENDPOINT && cloudOnline()){
    try{
      const resp=await fetch(`${CLOUD_ENDPOINT}?user=${encodeURIComponent(currentUser.username)}`);
      if(resp.ok){
        const payload=await resp.json();
        if(payload?.data){
          const merged=mergeCloudStore(DB.stores[currentUser.username]||defaultStore(),payload.data);
          Object.assign(DB,defaultStore(),merged);
          DB.stores[currentUser.username]=merged;
          DB.lastSynced=merged.lastSynced||DB.lastSynced;
          saveState();
          toast(t('sync_cloud_loaded'),'info');
        }
      }
    }catch(e){console.warn('loadCloudStoreForUser failed',e);}
  } else {
    const cloudSnapshot=loadCloudSnapshot();
    if(cloudSnapshot?.user===currentUser.username && cloudSnapshot.data){
      const merged=mergeCloudStore(DB.stores[currentUser.username]||defaultStore(),cloudSnapshot.data);
      Object.assign(DB,defaultStore(),merged);
      DB.stores[currentUser.username]=merged;
      DB.lastSynced=merged.lastSynced||DB.lastSynced;
      saveState();
      toast(t('sync_cloud_loaded'),'info');
    }
  }
}
async function syncCloud(){
  if(!currentUser){toast(t('sync_login_first'),'error');return}
  if(!cloudOnline()){toast(t('sync_no_connection'),'error');syncStatusMsg();return}
  const btn=G('sync-btn');if(btn)setBtnLoading(btn,true);
  try{
    toast(t('sync_in_progress'),'info',{icon:'ti-refresh',sound:false,duration:2000});
    let success=false;
    try{
      const snapshot={
        user:currentUser.username,
        data: DB.stores[currentUser.username],
        timestamp:new Date().toISOString()
      };
      if(CLOUD_ENDPOINT){
        const resp=await fetch(CLOUD_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(snapshot)});
        success=resp.ok;
      } else {
        success=saveCloudSnapshot(snapshot);
      }
      if(success){
        DB.lastSynced=new Date().toLocaleString('ar');
        DB.pendingSync=[];
        saveState();
        toast(t('sync_success'),'success',{icon:'ti-cloud-upload'});
      } else {
        toast(t('sync_cloud_fail'),'error');
      }
    }catch(e){
      console.warn('syncCloud failed',e);
      toast(t('sync_fail_retry'),'error');
    }
  }finally{
    if(btn)setBtnLoading(btn,false);
  }
  updateSyncUI();
}
window.addEventListener('online',()=>{const eb=document.getElementById('offline-banner');if(eb)eb.style.display='none';toast(t('online_restored'),'success',{title:t('sync_restored'),icon:'ti-wifi'});syncCloud();});
window.addEventListener('offline',()=>{const eb=document.getElementById('offline-banner');if(eb)eb.style.display='block';toast(t('offline_lost'),'warning',{title:t('sync_disconnected'),icon:'ti-wifi-off',duration:5000});updateSyncUI();});
function resetStore(){
  Object.assign(DB,defaultStore());
}

function emptyRow(c,m){
  const msg=m||(typeof t==='function'?t('lbl_no_data'):'');
  return`<tr><td colspan="${c}"><div class="empty-st"><i class="ti ti-inbox"></i><span>${escapeHtml(msg)}</span></div></td></tr>`
}
function getCurrentPageName(){
  return document.querySelector('.page.on')?.id.replace('p-','') || '';
}
function updateSearchHint(){
  const input=G('global-search');
  if(!input) return;
  const page=getCurrentPageName();
  const placeholders={
    inventory:'ph_inventory',
    sales:'ph_sales',
    purchases:'ph_purchases',
    customers:'ph_customers',
    suppliers:'ph_suppliers',
    returns:'ph_returns',
    users:'ph_users',
    suppay:'ph_suppay',
    finance:'ph_finance',
    pl:'ph_pl',
    audit:'ph_audit',
    soa:'ph_soa',
    hrm:'ph_hrm'
  };
  input.placeholder = t(placeholders[page] || 'search_quick');
  input.value = currentSearch;
}
function applyQuickSearch(term){
  currentSearch = normalizeText(term);
  const page=getCurrentPageName();
  // Sync global search with local search inputs — clear local if global is used
  const localInputs=['fin-local-search','pl-local-search','audit-local-search'];
  localInputs.forEach(id=>{const e=G(id);if(e&&currentSearch)e.value=''});
  const keyMap={inventory:'inv-tb',sales:'sal-tb',purchases:'pur-tb',customers:'cust-tb',suppliers:'sup-tb',returns:'ret-tb',users:'user-tb',suppay:'suppay-tb'};
  if (keyMap[page]) _pg[keyMap[page]] = 1;
  if(page==='inventory') renderItems(currentSearch);
  else if(page==='sales') renderSales(currentSearch);
  else if(page==='purchases') renderPurs(currentSearch);
  else if(page==='customers') renderCusts(currentSearch);
  else if(page==='suppliers') renderSups(currentSearch);
  else if(page==='returns') renderRets(currentSearch);
  else if(page==='users') renderUsers(currentSearch);
  else if(page==='suppay') renderSupPays(currentSearch);
  else if(page==='finance') renderFin(currentSearch);
  else if(page==='pl') renderPL(currentSearch);
  else if(page==='audit') renderAudit(currentSearch);
  else if(page==='soa') renderSOA();
  updateSearchHint();
}

/* ═══ SEARCH DROPDOWN ═══ */
function showSearchDropdown(term){
  const dd=G('search-dropdown');
  if(!dd||!term||term.length<2){if(dd)dd.style.display='none';return}
  const t2=normalizeText(term);
  let html='';
  const items=DB.items.filter(x=>normalizeText(x.name).includes(t2)||normalizeText(x.barcode).includes(t2)||normalizeText(x.code).includes(t2)).slice(0,5);
  if(items.length){
    html+='<div style="padding:4px 8px;font-size:10px;font-weight:700;color:var(--text-muted)">الأصناف</div>';
    items.forEach(x=>{html+=`<div class="search-dd-item" style="padding:6px 10px;cursor:pointer;border-radius:6px;font-size:12px;display:flex;align-items:center;gap:8px" onmousedown="navigateToPage('inventory')"><i class="ti ti-package" style="color:var(--cyan)"></i>${escapeHtml(x.name)} <span style="color:var(--text-muted);font-family:var(--mono);font-size:10px">${x.code}</span></div>`});
  }
  const custs=DB.custs.filter(x=>normalizeText(x.name).includes(t2)).slice(0,3);
  if(custs.length){
    html+='<div style="padding:4px 8px;font-size:10px;font-weight:700;color:var(--text-muted);margin-top:4px">الزبائن</div>';
    custs.forEach(x=>{html+=`<div class="search-dd-item" style="padding:6px 10px;cursor:pointer;border-radius:6px;font-size:12px;display:flex;align-items:center;gap:8px" onmousedown="navigateToPage('customers')"><i class="ti ti-user-circle" style="color:var(--green)"></i>${escapeHtml(x.name)} <span style="color:var(--text-muted);font-family:var(--mono);font-size:10px">${fmt(x.balance)}</span></div>`});
  }
  const sups=DB.sups.filter(x=>normalizeText(x.name).includes(t2)).slice(0,3);
  if(sups.length){
    html+='<div style="padding:4px 8px;font-size:10px;font-weight:700;color:var(--text-muted);margin-top:4px">الموردون</div>';
    sups.forEach(x=>{html+=`<div class="search-dd-item" style="padding:6px 10px;cursor:pointer;border-radius:6px;font-size:12px;display:flex;align-items:center;gap:8px" onmousedown="navigateToPage('suppliers')"><i class="ti ti-users" style="color:var(--amber)"></i>${escapeHtml(x.name)} <span style="color:var(--text-muted);font-family:var(--mono);font-size:10px">${fmt(x.balance)}</span></div>`});
  }
  const invs=DB.invs.filter(x=>normalizeText(x.num).includes(t2)||normalizeText(x.custName).includes(t2)).slice(0,3);
  if(invs.length){
    html+='<div style="padding:4px 8px;font-size:10px;font-weight:700;color:var(--text-muted);margin-top:4px">فواتير البيع</div>';
    invs.forEach(x=>{html+=`<div class="search-dd-item" style="padding:6px 10px;cursor:pointer;border-radius:6px;font-size:12px;display:flex;align-items:center;gap:8px" onmousedown="navigateToPage('sales')"><i class="ti ti-receipt" style="color:var(--accent)"></i>${escapeHtml(x.num)} — ${escapeHtml(x.custName)} <span style="color:var(--text-muted);font-family:var(--mono);font-size:10px">${fmt(x.total)}</span></div>`});
  }
  if(!html){html='<div style="padding:12px;text-align:center;color:var(--text-muted);font-size:12px">لا توجد نتائج</div>'}
  dd.innerHTML=html;
  dd.style.display='block';
  dd.querySelectorAll('.search-dd-item').forEach(el=>{
    el.addEventListener('mouseenter',()=>el.style.background='var(--bg-hover)');
    el.addEventListener('mouseleave',()=>el.style.background='');
  });
}
function hideSearchDropdown(){const dd=G('search-dropdown');if(dd)dd.style.display='none'}
function navigateToPage(pg){hideSearchDropdown();showPage(pg)}

function loadState(){
  try{
    const stored=localStorage.getItem(STORAGE_KEY);
    const authUser=localStorage.getItem(AUTH_USER_KEY);
    const session=localStorage.getItem(SESSION_KEY);
    if(stored){
      const saved=JSON.parse(stored);
      DB.users=saved.users||DB.users;
      DB.stores=saved.stores||DB.stores;
    }
    if(authUser){
      try{ currentUser=JSON.parse(authUser); }catch(e){ currentUser=null; }
    }
    if(!currentUser && session){
      const sess=JSON.parse(session);
      if(sess.userId){
        currentUser=DB.users.find(u=>u.id===sess.userId) || null;
      }
    }
    if(currentUser){
      loadStore(currentUser.username);
    } else {
      resetStore();
    }
  }catch(e){console.warn('loadState failed',e)}
}
function saveState(){
  try{
    queueCloudSync();
    saveCurrentStore();
    const usersSnapshot=DB.users.map(({password,passwordHash,...u})=>u);
    const snapshot={users:usersSnapshot,stores:DB.stores};
    localStorage.setItem(STORAGE_KEY,JSON.stringify(snapshot));
    localStorage.setItem(SESSION_KEY,JSON.stringify({userId:currentUser?.id||null}));
  }catch(e){console.warn('saveState failed',e)}
}
function setTheme(theme){
  document.body.classList.toggle('light-mode',theme==='light');
  localStorage.setItem(THEME_KEY,theme);
  const btn=G('theme-btn');
  if(!btn) return;
  const icon=theme==='light' ? 'ti-sun' : 'ti-moon';
  const label=theme==='light' ? t('theme_light') : t('theme_dark');
  btn.innerHTML=`<i class="ti ${icon}"></i> ${label}`;
}
function loadTheme(){
  const saved=localStorage.getItem(THEME_KEY) || 'dark';
  setTheme(saved);
}
function toggleTheme(){
  const active=document.body.classList.contains('light-mode') ? 'light' : 'dark';
  setTheme(active==='light' ? 'dark' : 'light');
}

function showLogin(){
  const screen=G('login-screen');
  screen.classList.add('on');
  const u=G('login-user');
  if(u){setTimeout(()=>u.focus(),100)}
  /* Enter key submission */
  const pass=G('login-pass');
  if(pass&&!pass._keyWired){pass._keyWired=true;pass.addEventListener('keydown',e=>{if(e.key==='Enter')handleLogin()});u.addEventListener('keydown',e=>{if(e.key==='Enter')handleLogin()})}
  /* Focus trap */
  if(!screen._focusTrap){
    screen._focusTrap=true;
    const trap=e=>{
      const focusable=screen.querySelectorAll('button,input,select,textarea,[tabindex]:not([tabindex="-1"])');
      if(!focusable.length)return;
      const first=focusable[0],last=focusable[focusable.length-1];
      if(e.key==='Tab'){
        if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
        else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
      }
    };
    screen.addEventListener('keydown',trap);
  }
}
function hideLogin(){
  G('login-screen').classList.remove('on');
}
async function fetchUsersFromApi(){
  if(!currentUser || !['admin','system_admin'].includes(currentUser.role)) return;
  try{
    const resp=await fetch(`${API_BASE_URL}/users`,{
      headers:{...getAuthHeaders(),'Content-Type':'application/json'}
    });
    if(!resp.ok){
      console.warn('fetchUsersFromApi failed', await resp.text());
      return;
    }
    const payload=await resp.json();
    const rawUsers=Array.isArray(payload) ? payload : (payload.data || payload.users || []);
    DB.users=(rawUsers || []).map(u=>({
      ...u,
      id: u.id || u._id,
      role: u.role || u.roleName || 'user'
    }));
    renderUsers();
  }catch(e){
    console.warn('fetchUsersFromApi error',e);
    toast('تعذر تحميل المستخدمين من الخادم','warning');
  }
}
async function handleLogin(){
  const btn=G('login-btn');
  const username=G('login-user').value.trim();
  const password=G('login-pass').value;
  if(!username||!password){toast(t('login_err_empty'),'error');return}
  setBtnLoading(btn,true);
  try{
    const resp=await fetch(`${API_BASE_URL}/auth/login`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({username,password})
    });
    const data=await resp.json();
    if(!resp.ok){
      toast(data?.message||t('login_err_invalid'),'error',{title:t('login_failed')});
      return;
    }
    if(currentUser && currentUser.username!==data.user.username){
      saveCurrentStore();
    }
    setAuthSession(data.token,data.user);
    await fetchUsersFromApi();
    loadStore(currentUser.username);
    await loadCloudStoreForUser();
    saveState();
    renderCurrentUser();
    hideLogin();
    toast(t('login_welcome')+' '+currentUser.name,'success',{title:t('login_success'),icon:'ti-user'});
  }catch(e){
    console.warn('login failed',e);
    toast(t('login_err_conn'),'error');
  }finally{
    setBtnLoading(btn,false);
  }
}
function logout(){
  clearAuthSession();
  saveState();
  resetStore();
  renderCurrentUser();
  showLogin();
}
function renderCurrentUser(){
  const name=G('user-name');
  const role=G('user-role');
  const av=G('user-av');
  if(name && role){
    name.textContent=currentUser?.name||t('user_not_logged');
    role.textContent=currentUser?.role||'guest';
  }
  if(av){
    av.textContent=currentUser?.name?.slice(0,1) || t('user_guest_initial');
  }
  if(typeof updateLangButton==='function') updateLangButton();
  updateSyncUI();
}
function requireAuth(){
  if(currentUser) return true;
  showLogin();
  toast(t('auth_required'),'error');
  return false;
}
function requireAdmin(){
  if(['admin','system_admin'].includes(currentUser?.role))return true;
  toast(t('auth_admin_only'),'error');
  return false;
}

function toggleSidebar(){
  const sb=document.querySelector('.sidebar');
  const bd=document.getElementById('sidebar-backdrop');
  const isOpen=sb.classList.contains('on');
  if(isOpen){
    sb.classList.remove('on');
    if(bd)bd.classList.remove('on');
  }else{
    sb.classList.add('on');
    if(bd)bd.classList.add('on');
  }
}
function closeSidebarIfMobile(){
  if(window.innerWidth<=1050){
    const sb=document.querySelector('.sidebar');
    const bd=document.getElementById('sidebar-backdrop');
    if(sb)sb.classList.remove('on');
    if(bd)bd.classList.remove('on');
  }
}

// Touch swipe for sidebar
(function(){
  let sx=0,sy=0,sw=false;
  document.addEventListener('touchstart',function(e){
    if(e.target.closest('.sidebar')||e.target.closest('.modal-backdrop')||e.target.closest('.modal'))return;
    sx=e.touches[0].clientX;sy=e.touches[0].clientY;sw=true;
  },{passive:true});
  document.addEventListener('touchmove',function(e){
    if(!sw)return;
    const dx=e.touches[0].clientX-sx;
    const dy=Math.abs(e.touches[0].clientY-sy);
    if(dy>40)sw=false;
  },{passive:true});
  document.addEventListener('touchend',function(e){
    if(!sw)return;sw=false;
    const dx=e.changedTouches[0].clientX-sx;
    const sb=document.querySelector('.sidebar');
    if(!sb)return;
    if(window.innerWidth<=1050){
      if(dx>60&&!sb.classList.contains('on'))toggleSidebar();
      else if(dx<-60&&sb.classList.contains('on'))toggleSidebar();
    }
  },{passive:true});
})();

/* ═══ BACKUP / EXPORT / IMPORT ═══ */
function exportLocalBackup(){
  const data={...DB,exportedAt:new Date().toISOString(),version:'3.0'};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download=`sales-backup-${today()}.json`;
  document.body.appendChild(a);a.click();document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast(t('backup_exported'));
}
function importLocalBackup(e){
  const file=e.target.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=async function(ev){
    try{
      const data=JSON.parse(ev.target.result);
      if(!data||typeof data!=='object'){toast(t('backup_invalid_file'),'error');return}
      if(!await confirmWarning(t('backup_confirm_replace'),'تأكيد الاستيراد'))return;
      const keys=['items','invs','purs','custs','sups','payments','supPayments','rets','log','cI','cP','cRet','cPay','cSpay','companyId','companies'];
      keys.forEach(k=>{if(data[k]!==undefined)DB[k]=data[k]});
      saveState();
      toast(t('backup_imported')+' — '+(data.items||[]).length+' '+t('nav_inventory')+', '+(data.invs||[]).length+' '+t('nav_sales_inv'));
      refreshCurrentPage();
    }catch(err){toast(t('backup_read_error')+': '+err.message,'error')}
  };
  reader.readAsText(file);
  e.target.value='';
}
async function saveCloudBackup(){
  if(!currentUser){toast(t('sync_login_first'),'error');return}
  const data={...DB};
  try{
    const token=localStorage.getItem(AUTH_TOKEN_KEY);
    const r=await fetch(API_BASE_URL+'/backups',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},body:JSON.stringify({data,label:t('backup_label')+' '+new Date().toLocaleDateString(i18nLocale())})});
    const j=await r.json();
    if(j.status==='success'){toast(t('sync_success'));loadCloudBackups()}
    else{toast(j.message||t('backup_save_error'),'error')}
  }catch(err){toast(t('backup_save_error')+': '+err.message,'error')}
}
async function loadCloudBackups(){
  if(!currentUser)return;
  try{
    const token=localStorage.getItem(AUTH_TOKEN_KEY);
    const r=await fetch(API_BASE_URL+'/backups',{headers:{'Authorization':'Bearer '+token}});
    const j=await r.json();
    if(j.status==='success'&&j.backups.length){
      const el=G('backup-list');if(el)el.style.display='';
      const items=G('backup-items');if(!items)return;
      items.innerHTML=j.backups.map(b=>{
        const sz=b.size?(b.size/1024).toFixed(1)+' KB':'—';
        const dt=new Date(b.createdAt).toLocaleString(i18nLocale());
        return`<div style="display:flex;justify-content:space-between;align-items:center;padding:8px;border-bottom:1px solid var(--line);font-size:13px">
          <div><strong>${b.label||t('backup_copy')}</strong> <span style="color:var(--muted)">${dt} — ${sz}</span></div>
          <div style="display:flex;gap:4px">
            <button class="btn btn-sm btn-icon" onclick="downloadCloudBackup('${b._id}')" title="${t('backup_download')}"><i class="ti ti-download"></i></button>
            <button class="btn btn-sm btn-danger btn-icon" onclick="deleteCloudBackup('${b._id}')" title="${t('backup_del_btn')}"><i class="ti ti-trash"></i></button>
          </div>
        </div>`
      }).join('');
    }
  }catch(err){/* silent */}
}
async function downloadCloudBackup(id){
  try{
    const token=localStorage.getItem(AUTH_TOKEN_KEY);
    const r=await fetch(API_BASE_URL+'/backups/'+id,{headers:{'Authorization':'Bearer '+token}});
    const j=await r.json();
    if(j.status==='success'&&j.backup?.data){
      const blob=new Blob([JSON.stringify(j.backup.data,null,2)],{type:'application/json'});
      const url=URL.createObjectURL(blob);
      const a=document.createElement('a');
      a.href=url;a.download=`cloud-backup-${j.backup.label||id}.json`;
      document.body.appendChild(a);a.click();document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast(t('backup_exported'));
    }
  }catch(err){toast(t('backup_save_error')+': '+err.message,'error')}
}
async function deleteCloudBackup(id){
  if(!await confirmDanger(t('confirm_delete'),'تأكيد الحذف'))return;
  try{
    const token=localStorage.getItem(AUTH_TOKEN_KEY);
    await fetch(API_BASE_URL+'/backups/'+id,{method:'DELETE',headers:{'Authorization':'Bearer '+token}});
    toast(t('backup_exported'));
    loadCloudBackups();
  }catch(err){toast(t('backup_save_error')+': '+err.message,'error')}
}

/* ═══ SESSION MANAGEMENT ═══ */
async function loadSessions(){
  try{
    const res=await authenticatedFetch('/api/auth/sessions');
    const d=await res.json();
    const tb=G('sessions-tb');
    if(!tb)return;
    const sessions=d.sessions||[];
    if(!sessions.length){tb.innerHTML=emptyRow(5,'لا توجد جلسات نشطة');return}
    tb.innerHTML=sessions.map(s=>{
      const ua=s.userAgent||'غير معروف';
      const device=ua.includes('Chrome')?'Chrome':ua.includes('Firefox')?'Firefox':ua.includes('Safari')?'Safari':ua.includes('Edge')?'Edge':ua.includes('Mobile')?'Mobile':'Browser';
      const isCurrent=s.token&&localStorage.getItem(AUTH_TOKEN_KEY)?.endsWith(s.token);
      return`<tr>
        <td><span class="badge ${isCurrent?'b-green':'b-blue'}">${device}</span></td>
        <td class="td-mono" style="font-size:11px">${s.ip||'—'}</td>
        <td style="font-size:11px">${s.lastActive?new Date(s.lastActive).toLocaleString('ar-LY'):'—'}</td>
        <td style="font-size:11px">${s.loginAt?new Date(s.loginAt).toLocaleString('ar-LY'):'—'}</td>
        <td>${isCurrent?'<span class="badge b-green">الجلسة الحالية</span>':`<button class="btn btn-sm btn-danger btn-icon" onclick="terminateSession('${s._id}')" title="إنهاء"><i class="ti ti-power"></i></button>`}</td>
      </tr>`;
    }).join('');
  }catch(e){console.error('sessions error:',e)}
}
async function terminateSession(sessionId){
  if(!await confirmDanger('إنهاء هذه الجلسة؟','إنهاء الجلسة'))return;
  try{
    await authenticatedFetch('/api/auth/sessions/'+sessionId,{method:'DELETE'});
    toast('تم إنهاء الجلسة','success');
    loadSessions();
  }catch(e){toast(e.message,'error')}
}
async function terminateAllSessions(){
  if(!await confirmDanger('إنهاء جميع الجلسات الأخرى؟','إنهاء الكل'))return;
  try{
    await authenticatedFetch('/api/auth/sessions',{method:'DELETE'});
    toast('تم إنهاء جميع الجلسات','success');
    loadSessions();
  }catch(e){toast(e.message,'error')}
}

/* ═══════════════════════════════════════════════
   realtime.js
══════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════
   REAL-TIME SYNC (WebSocket + Auto-refresh)
═══════════════════════════════════════════════ */
let _ws = null;
let _wsReconnectTimer = null;
let _wsConnected = false;

function connectRealtime() {
  if (_ws && (_ws.readyState === WebSocket.OPEN || _ws.readyState === WebSocket.CONNECTING)) return;
  try {
    const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const url = `${proto}//${window.location.host}`;
    _ws = new WebSocket(url);

    _ws.onopen = () => {
      _wsConnected = true;
      console.log('[Realtime] WebSocket connected');
      if (_wsReconnectTimer) { clearTimeout(_wsReconnectTimer); _wsReconnectTimer = null; }
      const el = G('realtime-status');
      if (el) { el.style.display = 'inline-block'; el.title = 'متصل بالتحديث الفوري'; }
    };

    _ws.onmessage = (evt) => {
      try {
        const msg = JSON.parse(evt.data);
        handleRealtimeMessage(msg);
      } catch (e) { console.warn('[Realtime] parse error', e); }
    };

    _ws.onclose = () => {
      _wsConnected = false;
      console.log('[Realtime] disconnected, reconnecting in 5s...');
      const el = G('realtime-status');
      if (el) { el.style.display = 'inline-block'; el.title = 'غير متصل'; }
      _wsReconnectTimer = setTimeout(connectRealtime, 5000);
    };

    _ws.onerror = (err) => {
      console.warn('[Realtime] error', err);
    };
  } catch (e) {
    console.warn('[Realtime] connect failed', e);
    _wsReconnectTimer = setTimeout(connectRealtime, 5000);
  }
}

function broadcastChange(section, data) {
  if (!currentUser) return;
  authenticatedFetch('/api/v1/sync/broadcast', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'data-change', section, data })
  }).catch(() => {});
}

function handleRealtimeMessage(msg) {
  if (!msg || !msg.section) return;
  // Ignore own messages
  if (msg.userId && currentUser && msg.userId === currentUser.id) return;

  console.log('[Realtime] received:', msg.section, msg.type);

  switch (msg.section) {
    case 'items':
      renderItems(); updateStats();
      break;
    case 'customers':
      renderCusts(); updateStats();
      break;
    case 'suppliers':
      renderSups();
      break;
    case 'sales':
      renderSales(); updateStats(); renderFin();
      break;
    case 'purchases':
      renderPurs(); updateStats(); renderFin();
      break;
    case 'payments':
      renderSales(); updateStats(); renderFin();
      break;
    case 'returns':
      renderRets(); renderItems(); updateStats();
      break;
    case 'settlements':
      renderSales(); renderSettleLog(); updateStats();
      break;
    case 'users':
      renderUsers();
      break;
    case 'company':
      renderCompany();
      break;
    case 'hrm':
      renderHRM();
      break;
    case 'all':
      refreshCurrentPage();
      break;
    default:
      refreshCurrentPage();
  }

  toast('تم تحديث البيانات من خادم آخر', 'sync', {
    title: 'تحديث فوري',
    icon: 'ti-refresh',
    sound: false,
    duration: 2500
  });
}

// refreshCurrentPage() is defined in inventory.js (canonical version)
// Auto-connect on login
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(connectRealtime, 1000);
});

// Page visibility change: reconnect if needed
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && !_wsConnected) {
    setTimeout(connectRealtime, 500);
  }
});

/* ═══════════════════════════════════════════════
   notify.js
══════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════
   NOTIFICATION SYSTEM — Professional & Interactive
═══════════════════════════════════════════════ */

const _notifyContainer = (() => {
  let el = document.getElementById('notify-container');
  if (!el) {
    el = document.createElement('div');
    el.id = 'notify-container';
    document.body.appendChild(el);
  }
  return el;
})();

let _notifyId = 0;
const _notifyQueue = [];
const MAX_VISIBLE = 5;

const NOTIFY_ICONS = {
  success: 'ti-check',
  error: 'ti-x',
  warning: 'ti-alert-triangle',
  info: 'ti-info-circle',
  confirm: 'ti-help-circle',
  sync: 'ti-refresh',
  delete: 'ti-trash',
  edit: 'ti-pencil',
  add: 'ti-plus',
  cash: 'ti-cash',
  printer: 'ti-printer'
};

const NOTIFY_SOUNDS = {
  success: 'data:audio/wav;base64,UklGRl9vT19teleVBmZm10teleIBAAEARBYAACIWAAABAAgATElTdBoBAAAAFA==',
  error: 'data:audio/wav;base64,UklGRl9vT19teleVBmZm10teleIBAAEARBYAACIWAAABAAgATElTdBoBAAAAFA==',
};

function _playNotifSound(type) {
  try {
    if (type === 'error') {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 300;
      gain.gain.value = 0.1;
      osc.start();
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.stop(ctx.currentTime + 0.2);
    } else if (type === 'success') {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = 520;
      gain.gain.value = 0.06;
      osc.start();
      osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.stop(ctx.currentTime + 0.15);
    }
  } catch (e) {}
}

function toast(msg, type = 'success', opts = {}) {
  const {
    title = null,
    duration = type === 'error' ? 6000 : 3500,
    actions = [],
    sound = true,
    closable = true,
    progress = true,
    icon = null,
    onClick = null,
    sticky = false
  } = opts;

  const id = ++_notifyId;

  const el = document.createElement('div');
  el.className = `n-item n-${type}`;
  el.dataset.notifyId = id;

  const iconClass = icon || NOTIFY_ICONS[type] || 'ti-info-circle';

  let actionsHtml = '';
  if (actions.length > 0) {
    actionsHtml = `<div class="n-actions">${actions.map((a, i) =>
      `<button class="n-btn ${a.primary ? 'n-btn-primary' : ''} ${a.danger ? 'n-btn-danger' : ''}" data-action="${i}">${a.label}</button>`
    ).join('')}</div>`;
  }

  el.innerHTML = `
    <div class="n-icon-wrap n-icon-${type}">
      <i class="ti ${iconClass}"></i>
    </div>
    <div class="n-content">
      ${title ? `<div class="n-title">${escapeHtml(title)}</div>` : ''}
      <div class="n-msg">${escapeHtml(msg)}</div>
      ${actionsHtml}
    </div>
    ${closable ? '<button class="n-close"><i class="ti ti-x"></i></button>' : ''}
    ${progress && !sticky ? '<div class="n-progress"><div class="n-progress-bar" style="animation-duration:' + duration + 'ms"></div></div>' : ''}
  `;

  // Insert at top
  _notifyContainer.prepend(el);

  // Animate in
  requestAnimationFrame(() => el.classList.add('n-show'));

  // Sound
  if (sound) _playNotifSound(type);

  // Close button
  if (closable) {
    el.querySelector('.n-close').addEventListener('click', (e) => {
      e.stopPropagation();
      _dismissNotify(el);
    });
  }

  // Click handler
  if (onClick) {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => { onClick(el); _dismissNotify(el); });
  }

  // Action buttons
  el.querySelectorAll('.n-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.action);
      if (actions[idx] && actions[idx].onClick) {
        actions[idx].onClick(el);
      }
      if (actions[idx]?.dismiss !== false) _dismissNotify(el);
    });
  });

  // Auto-dismiss
  let timer;
  if (!sticky) {
    timer = setTimeout(() => _dismissNotify(el), duration);

    // Pause on hover
    el.addEventListener('mouseenter', () => {
      clearTimeout(timer);
      const bar = el.querySelector('.n-progress-bar');
      if (bar) bar.style.animationPlayState = 'paused';
    });

    el.addEventListener('mouseleave', () => {
      const bar = el.querySelector('.n-progress-bar');
      if (bar) bar.style.animationPlayState = 'running';
      timer = setTimeout(() => _dismissNotify(el), 2000);
    });
  }

  // Manage visibility count
  _manageVisible();

  return id;
}

function _dismissNotify(el) {
  if (!el || el._dismissing) return;
  el._dismissing = true;
  el.classList.remove('n-show');
  el.classList.add('n-hide');
  setTimeout(() => el.remove(), 400);
  _manageVisible();
}

function _manageVisible() {
  const items = _notifyContainer.querySelectorAll('.n-item.n-show');
  items.forEach((item, i) => {
    if (i >= MAX_VISIBLE) {
      item.classList.add('n-overflow');
    } else {
      item.classList.remove('n-overflow');
    }
  });
}

function notifySuccess(msg, opts = {}) {
  return toast(msg, 'success', opts);
}

function notifyError(msg, opts = {}) {
  return toast(msg, 'error', opts);
}

function notifyWarning(msg, opts = {}) {
  return toast(msg, 'warning', opts);
}

function notifyInfo(msg, opts = {}) {
  return toast(msg, 'info', opts);
}

function notifySync(msg, opts = {}) {
  return toast(msg, 'sync', { icon: 'ti-refresh', ...opts });
}

function notifyCash(msg, opts = {}) {
  return toast(msg, 'cash', { icon: 'ti-cash', ...opts });
}

function notifyConfirm(msg, opts = {}) {
  return toast(msg, 'confirm', { sticky: true, ...opts });
}

function clearAllNotifications() {
  _notifyContainer.querySelectorAll('.n-item').forEach(el => _dismissNotify(el));
}

function notify(msg, type = 'success', opts = {}) {
  if(typeof type==='object'){opts=type;type='success'}
  return toast(msg, type, opts);
}

/* ═══════════════════════════════════════════════
   ui.js
══════════════════════════════════════════════ */

/* ═══ PAGINATION ═══ */
const PAGE_SIZE = 15;
const _pg = {};

function getPageData(key, arr) {
  if (!_pg[key]) _pg[key] = 1;
  const page = _pg[key];
  const total = arr.length;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if (page > pages) _pg[key] = pages;
  const cur = Math.min(_pg[key], pages);
  const start = (cur - 1) * PAGE_SIZE;
  return { data: arr.slice(start, start + PAGE_SIZE), page: cur, pages, total, start };
}

function goToPage(key, p, renderFn) {
  _pg[key] = p;
  renderFn(currentSearch);
}

function renderPag(key, total, renderFn) {
  const el = G('pag-' + key);
  if (!el) return;
  const cur = _pg[key] || 1;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if (pages <= 1) { el.innerHTML = ''; return; }
  let html = '<div class="pag-inner">';
  html += `<button class="pag-btn" onclick="goToPage('${key}',${cur-1},${renderFn.name})" ${cur<=1?'disabled':''}>&#9654;</button>`;
  for (let i = 1; i <= pages; i++) {
    if (pages > 7 && i > 2 && i < pages - 1 && Math.abs(i - cur) > 1) {
      if (i === 3 || i === pages - 2) html += '<span class="pag-dots">…</span>';
      continue;
    }
    html += `<button class="pag-btn ${i===cur?'pag-active':''}" onclick="goToPage('${key}',${i},${renderFn.name})">${i}</button>`;
  }
  html += `<button class="pag-btn" onclick="goToPage('${key}',${cur+1},${renderFn.name})" ${cur>=pages?'disabled':''}>&#9664;</button>`;
  html += `<span class="pag-info">${total} إجمالي</span>`;
  html += '</div>';
  el.innerHTML = html;
}

/* ═══ TOAST & LOG ═══ */
function _legacyToast(msg,type='success'){
  const t=G('toast');if(!t)return;
  const icon=type==='success'?'ti-check':type==='error'?'ti-alert-triangle':'ti-info-circle';
  t.innerHTML=`<i class="ti ${icon}"></i> ${escapeHtml(msg)}`;
  t.className=`toast on ${type}`;
  setTimeout(()=>t.classList.remove('on'),3400)
}
function addLog(action,detail,color='#4f8ef7'){
  const n=new Date();
  DB.log.unshift({time:n.toLocaleTimeString('ar'),date:n.toLocaleDateString('ar'),action,detail,color,user:currentUser?.name||'مدير النظام'});
  renderAudit();renderDashLog();saveState()
}

/* ═══ HELPERS ═══ */
function selPay(gid,el,m){
  document.querySelectorAll(`#${gid} .pay-chip`).forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  if(gid==='col-pay'){
    _colPay=m;G('col-check-row').style.display=m==='check'?'flex':'none'
  }
  else if(gid==='col2-pay'){
    _col2Pay=m;G('col2-check-row').style.display=m==='check'?'flex':'none'
  }
  else if(gid==='sp-pay'){
    _spPay=m;const r=G('sp-check-row');if(r)r.style.display=m==='check'?'flex':'none'
  }
  else if(gid==='re-qc') _reQC=m;
}
function payLbl(m){
  const map={cash:`<span class="badge b-green">${t('pay_cash')}</span>`,check:`<span class="badge b-blue">${t('pay_check')}</span>`,credit:`<span class="badge b-amber">${t('pay_credit')}</span>`,transfer:`<span class="badge b-cyan">${t('pay_transfer')}</span>`};
  return map[m]||`<span class="badge b-gray">${m}</span>`
}
function popSel(id,arr,vk,lk,def='-- اختر --'){
  const s=G(id);if(!s)return;
  s.innerHTML=`<option value="">${def}</option>`;
  arr.forEach(x=>s.innerHTML+=`<option value="${x[vk]}">${x[lk]}</option>`)
}
function companyById(id){return DB.companies?.find(c=>c.id===Number(id))||DB.companies?.[0]||baseCompany()}
function currentCompany(){return companyById(DB.companyId)}
function renderCompany(){const co=currentCompany();const el=G('company-name');if(el)el.textContent=co.name}
function saveCompany(){
  const btn=G('m-company')?.querySelector('.btn-primary');setBtnLoading(btn,true);
  try{
    const name=G('co-name').value.trim();
    if(!name){toast(t('company_name_ph'),'error');return}
    const address=G('co-address').value.trim();
    const phone=G('co-phone').value.trim();
    const note=G('co-note').value.trim();
    const taxNo=G('co-tax-no')?.value?.trim()||'';
    const logo=window._pendingLogo||'';
    if(editingCompanyId===null){
      const id=Date.now();
      const company={...baseCompany(),id,name,address,phone,note,taxNo,logo};
      DB.companies.push(company);
      DB.companyId=id;
      addLog('إضافة شركة',`"${name}"`,'#2dd17e');
      loadCompanyData();
    } else {
      const company=companyById(editingCompanyId);
      if(company){
        Object.assign(company,{name,address,phone,note,taxNo,logo});
        addLog('تحديث بيانات الشركة',`"${name}"`,'#9b72f7');
        if(company.id===DB.companyId) loadCompanyData();
      }
    }
    window._pendingLogo=null;
    saveState();
    closeModal('m-company');
    renderCompany();
    renderSettings();
    broadcastChange('company', { name });
    toast(t('company_saved'));
  }finally{
    if(btn)setBtnLoading(btn,false);
  }
}

/* Company Logo helpers */
let _logoDataUrl='';
function handleCompanyLogo(input){
  const file=input.files[0];
  if(!file)return;
  if(file.size>512000){toast(t('company_logo_too_big'),'error');return}
  const reader=new FileReader();
  reader.onload=function(e){
    _logoDataUrl=e.target.result;
    window._pendingLogo=_logoDataUrl;
    const preview=G('co-logo-preview');
    if(preview) preview.innerHTML='<img src="'+_logoDataUrl+'" style="width:100%;height:100%;object-fit:contain">';
  };
  reader.readAsDataURL(file);
}
function removeCompanyLogo(){
  _logoDataUrl='';
  window._pendingLogo='';
  const preview=G('co-logo-preview');
  if(preview) preview.innerHTML='<i class="ti ti-photo" style="font-size:24px;color:var(--text-muted)"></i>';
  const input=G('co-logo-input');
  if(input) input.value='';
}
function loadCompanyLogo(){
  const co=currentCompany();
  if(co&&co.logo){
    _logoDataUrl=co.logo;
    const preview=G('co-logo-preview');
    if(preview) preview.innerHTML='<img src="'+co.logo+'" style="width:100%;height:100%;object-fit:contain">';
  }
}
function updateSOASelector(){const type=G('soa-type').value;const label=type==='supplier'?t('soa_choose_supplier'):t('soa_choose_customer');const placeholder=`-- ${type==='supplier'?t('nav_suppliers'):t('nav_customers')} --`;if(G('soa-cust-label'))G('soa-cust-label').textContent=label;popSel('soa-cust',type==='supplier'?DB.sups:DB.custs,'id','name',placeholder);renderSOA()}

/* Invoice paid amount */
function invPaid(inv){
  return DB.payments.filter(p=>p.invId===inv.id).reduce((s,p)=>s+p.amount,0)
}
function invRemaining(inv){return Math.max(0,inv.total-invPaid(inv))}
function invPayStatus(inv){
  const paid=invPaid(inv);
  if(paid<=0)return`<span class="badge b-red">${t('inv_unpaid')}</span>`;
  if(paid>=inv.total-0.001)return`<span class="badge b-green">${t('inv_paid_full')}</span>`;
  return`<span class="badge b-amber">${t('inv_paid_partial')}</span>`
}
function invDlvLabel(s){
  const map={pending:`<span class="badge b-gray">${t('inv_undelivered')}</span>`,delivered:`<span class="badge b-teal">${t('inv_delivered')}</span>`};
  return map[s]||map.pending
}

/* Purchase paid */
function purPaid(pur){return DB.supPayments.filter(p=>p.purId===pur.id).reduce((s,p)=>s+p.amount,0)}
function purRemaining(pur){return Math.max(0,pur.total-purPaid(pur))}
function purPayStatus(pur){
  const paid=purPaid(pur);
  if(paid<=0)return`<span class="badge b-red">${t('pur_unpaid')}</span>`;
  if(paid>=pur.total-0.001)return`<span class="badge b-green">${t('pur_paid')}</span>`;
  return`<span class="badge b-amber">${t('pur_partial')}</span>`
}

/* Supplier balance */
function supBalance(sup){
  const purchased=DB.purs.filter(p=>p.supId===sup.id).reduce((s,p)=>s+p.total,0);
  const paid=DB.supPayments.filter(p=>p.supId===sup.id).reduce((s,p)=>s+p.amount,0);
  return purchased-paid
}
/* Customer balance (receivable) */
function custReceivable(cust){
  const sold=DB.invs.filter(i=>i.custId===cust.id).reduce((s,i)=>s+i.total,0);
  const collected=DB.payments.filter(p=>p.custId===cust.id).reduce((s,p)=>s+p.amount,0);
  const openBal=parseFloat(cust.openBal)||0;
  return sold + openBal - collected;
}

/* ═══ NAVIGATION ═══ */
const PAGE_META={
  dash:{t:()=>t('page_dash'),i:'ti-layout-dashboard'},
  inventory:{t:()=>t('page_inventory'),i:'ti-package'},
  sales:{t:()=>t('page_sales'),i:'ti-receipt'},
  returns:{t:()=>t('page_returns'),i:'ti-receipt-refund'},
  purchases:{t:()=>t('page_purchases'),i:'ti-truck'},
  suppay:{t:()=>t('page_suppay'),i:'ti-wallet'},
  customers:{t:()=>t('page_customers'),i:'ti-user-circle'},
  suppliers:{t:()=>t('page_suppliers'),i:'ti-users'},
  soa:{t:()=>t('page_soa'),i:'ti-file-description'},
  finance:{t:()=>t('page_finance'),i:'ti-cash'},
  pl:{t:()=>t('page_pl'),i:'ti-chart-bar'},
  users:{t:()=>t('page_users'),i:'ti-users-pin'},
  companies:{t:()=>t('page_companies'),i:'ti-building'},
  audit:{t:()=>t('page_audit'),i:'ti-shield-check'},
  hrm:{t:()=>t('page_hrm'),i:'ti-users-group'},
  settings:{t:'الإعدادات',i:'ti-settings'}
};

function showPage(pg){
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.toggle('active',n.dataset.page===pg));
  document.querySelectorAll('.page').forEach(p=>{p.classList.remove('on');p.classList.add('exiting')});
  const page=G('p-'+pg);
  if(!page) return;
  page.classList.remove('exiting');
  page.classList.add('on');
  /* Show skeleton overlay while loading */
  const content=page.querySelector('.card:not(.no-skeleton),.stats-grid:not(.no-skeleton),.tbl-wrap:not(.no-skeleton)');
  let skelOverlay=null;
  if(content&&!content.classList.contains('no-skeleton')){
    skelOverlay=document.createElement('div');
    skelOverlay.className='skeleton-overlay';
    skelOverlay.innerHTML='<div class="skeleton-card" style="margin-bottom:12px"><div class="skeleton-line w-75 h-lg"></div><div class="skeleton-line w-50 h-xl" style="margin-top:8px"></div><div class="skeleton-line w-full"></div><div class="skeleton-line w-full"></div><div class="skeleton-line w-75"></div></div>';
    skelOverlay.style.cssText='position:absolute;top:0;left:0;right:0;bottom:0;background:var(--bg);z-index:10;display:flex;align-items:flex-start;justify-content:center;padding:16px;overflow:auto';
    content.style.position='relative';
    content.appendChild(skelOverlay);
  }
  const m=PAGE_META[pg]||{t:()=>pg,i:'ti-circle'};
  G('pg-title').innerHTML=`<i class="ti ${m.i}"></i> ${typeof m.t==='function'?m.t():m.t}`;
  closeSidebarIfMobile();
  updateSearchHint();
  const pageKeyMap={inventory:'inv-tb',sales:'sal-tb',purchases:'pur-tb',customers:'cust-tb',suppliers:'sup-tb',returns:'ret-tb',users:'user-tb',suppay:'suppay-tb'};
  if (!_pg[pageKeyMap[pg]]) _pg[pageKeyMap[pg]] = 1;
  requestAnimationFrame(()=>{
    try{
      if(pg==='dash')renderDash();
      if(pg==='audit')renderAudit();
      if(pg==='finance')renderFin();
      if(pg==='pl')renderPL();
      if(pg==='users')renderUsers(currentSearch);
      if(pg==='settings')renderSettings();
      if(pg==='soa'){updateSOASelector();G('soa-out').innerHTML=''}
      if(pg==='suppay')renderSupPays(currentSearch);
      if(pg==='suppliers')renderSups(currentSearch);
      if(pg==='customers')renderCusts(currentSearch);
      if(pg==='returns')renderRets(currentSearch);
      if(pg==='sales')renderSales(currentSearch);
      if(pg==='purchases')renderPurs(currentSearch);
      if(pg==='inventory')renderItems(currentSearch);
      if(pg==='hrm'){
        renderHRM();
        loadHRMEmployeeDropdown('hrm-att-emp');
        loadHRMEmployeeDropdown('hrm-adv-emp');
      }
      if(pg==='expenses')renderExpenses();
    }catch(e){
      console.error('showPage render error',e,pg);
      toast('حدث خطأ أثناء عرض الصفحة','error');
    }finally{
      if(skelOverlay&&skelOverlay.parentNode){
        skelOverlay.parentNode.removeChild(skelOverlay);
      }
    }
    const tbls=page.querySelectorAll('table');
    tbls.forEach(tbl=>{if(!tbl._navWired){tbl.setAttribute('tabindex','0');tbl._navWired=true}});
    if(typeof initTooltips==='function')initTooltips();
    page.scrollIntoView({behavior:'smooth',block:'start'});
  });
}

document.querySelectorAll('.nav-item').forEach(el=>{
  el.addEventListener('click',()=>{ showPage(el.dataset.page) })
});

G('global-search')?.addEventListener('input', e=>applyQuickSearch(e.target.value));
G('clear-search')?.addEventListener('click', ()=>{
  currentSearch='';
  applyQuickSearch('');
});

function updateClock(){const c=G('clock');if(c)c.textContent=new Date().toLocaleTimeString('ar',{hour:'2-digit',minute:'2-digit'})}
let _clockInterval=setInterval(updateClock,1000);
document.addEventListener('visibilitychange',()=>{
  if(document.hidden){clearInterval(_clockInterval);_clockInterval=null}
  else if(!_clockInterval){updateClock();_clockInterval=setInterval(updateClock,1000)}
});

/* ═══ MODALS ═══ */
/* ═══ MODAL STACK — professional layered modals ═══ */
let _modalStack=[];
let _modalReturnTo=null; // {id, restoreFn} — reopen this modal after child closes

function _initModalFields(id){
  if(id==='m-invoice'){
    G('si-num').value='INV-'+String(DB.cI).padStart(5,'0');
    G('si-date').value=today();
    popSel('si-cust',DB.custs,'id','name','-- اختر زبون --');
    popSel('si-item-sel',DB.items,'id','name','-- اختر صنف --');
    if(G('si-item-search'))G('si-item-search').value='';
    _siL=[];renderSiL();
    G('si-price').value='';G('si-qty').value='1';G('si-disc').value='0';G('si-ltot').value='';
  }
  if(id==='m-pur'){
    G('pi-num').value='PUR-'+String(DB.cP).padStart(5,'0');
    G('pi-date').value=today();
    popSel('pi-sup',DB.sups,'id','name','-- اختر مورد --');
    popSel('pi-item-sel',DB.items,'id','name','-- اختر صنف --');
    if(G('pi-item-search'))G('pi-item-search').value='';
    _piL=[];renderPiL();
    G('pi-price').value='';G('pi-qty').value='1';G('pi-ltot').value='';
    G('pi-recv').checked=false;
  }
  if(id==='m-suppay'){
    G('sp-date').value=today();G('sp-amt').value='';G('sp-notes').value='';
    popSel('sp-sup',DB.sups,'id','name','-- اختر مورد --');
    popSel('sp-pur',DB.purs,'num','num','غير مرتبط بفاتورة');
    document.querySelectorAll('#sp-pay .pay-chip').forEach((c,i)=>c.classList.toggle('sel',i===0));
    _spPay='cash';
  }
  if(id==='m-cust'){['cu-name','cu-phone','cu-addr'].forEach(x=>G(x).value='');G('cu-bal').value='0'}
  if(id==='m-sup'){['su-name','su-phone','su-addr'].forEach(x=>G(x).value='')}
  if(id==='m-item'){G('fi-code').value='ITM'+String(DB.items.length+1).padStart(3,'0');['fi-name','fi-buy','fi-sell','fi-qty','fi-reorder','fi-unit','fi-cat'].forEach(x=>G(x).value='');G('fi-barcode').value=genUniqueBarcode()}
  if(id==='m-return'){
    G('re-date').value=today();
    const delivered=DB.invs.filter(i=>i.dlvStatus==='delivered');
    popSel('re-inv',delivered,'num','num','اختر فاتورة');
    G('re-amt').value='';G('re-reason').value='';
    document.querySelectorAll('#re-qc .pay-chip').forEach((c,i)=>c.classList.toggle('sel',i===0));
    _reQC='pending';
  }
  if(id==='m-user'){
    if(!requireAdmin())return;
    G('uu-username').value='';G('uu-pass').value='';G('uu-name').value='';G('uu-role').value='sales';
  }
}

/* Which modals are "children" — when opened, their parent closes first, then reopens on child close */
const _childParentMap={
  'm-item':'m-pur',
  'm-cust':'m-pur',
  'm-sup':'m-pur'
};

function openModal(id){
  if(!requireAuth())return;
  const parentId = _childParentMap[id];
  const isChild = !!parentId;

  // If opening a child modal, close parent first and save return info
  if(isChild && _modalStack.includes(parentId)){
    _modalReturnTo={id:parentId};
    const parentEl=G(parentId);
    parentEl.classList.remove('on');
    _modalStack=_modalStack.filter(x=>x!==parentId);
  }

  _initModalFields(id);
  const el=G(id);
  document.body.appendChild(el);
  el.classList.add('on');
  _modalStack.push(id);
  /* Focus trap */
  if(typeof trapFocus==='function')trapFocus(el);
}

function closeModal(id){
  const el=G(id);
  el.classList.remove('on');
  _modalStack=_modalStack.filter(x=>x!==id);

  // If this was a child modal and parent expects return, reopen parent
  if(_modalReturnTo && _modalReturnTo.id){
    const returnId=_modalReturnTo.id;
    _modalReturnTo=null;
    // Reopen parent without triggering child logic again
    const parentEl=G(returnId);
    _initModalFields(returnId);
    document.body.appendChild(parentEl);
    parentEl.classList.add('on');
    _modalStack.push(returnId);
  }
}

/* ═══ UTILITY FUNCTIONS ═══ */
function debounce(fn,ms=300){
  let t;return(...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),ms)}
}

/* ═══ KEYBOARD SHORTCUTS ═══ */
(function(){
  const PAGES=['dash','inventory','sales','returns','purchases','suppay','customers','suppliers','soa','finance','pl','users','companies','audit','hrm','settings'];
  const NEW_MODALS={inventory:'m-item',sales:'m-invoice',purchases:'m-pur',customers:'m-cust',suppliers:'m-sup',users:'m-user',hrm:'m-hrm'};
  function isInput(){const t=document.activeElement;return t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.tagName==='SELECT')}
  function openHelp(){openModal('m-help')}
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){
      if(_modalStack.length>0){
        closeModal(_modalStack[_modalStack.length-1]);
      } else {
        const m=document.querySelector('.modal-backdrop.on');
        if(m) closeModal(m.id);
      }
      e.preventDefault();
      return;
    }
    if(e.ctrlKey&&e.key==='k'){e.preventDefault();G('global-search')?.focus();return}
    if(e.ctrlKey&&e.key==='n'){
      if(isInput())return;
      const pg=getCurrentPageName();
      const m=NEW_MODALS[pg];
      if(m){e.preventDefault();openModal(m)}
      return;
    }
    if(e.ctrlKey&&/^[0-9]$/.test(e.key)){
      if(isInput())return;
      e.preventDefault();
      const idx=parseInt(e.key);
      const page=idx===0?PAGES[PAGES.length-1]:PAGES[idx-1];
      if(page)showPage(page);
      return;
    }
    if(e.key==='?'&&!isInput()){
      const m=G('m-help');
      if(m&&m.classList.contains('on'))closeModal('m-help');
      else openHelp();
      return;
    }
  });
})();

/* ═══════════════════════════════════════════════
   excel-export.js
══════════════════════════════════════════════ */

/* EXCEL EXPORT */

function _downloadExcel(workbook, filename) {
  const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([wbout], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename + ".xlsx";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function _exportTable(headers, rows, sheetName, filename) {
  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  ws["!cols"] = headers.map(() => ({ wch: 18 }));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  _downloadExcel(wb, filename);
}

function exportItems() {
  const h = ["الكود","الباركود","الصنف","الفئة","سعر الشراء","سعر البيع","الرصيد","حد إعادة الطلب","الوحدة","الحالة"];
  const rows = DB.items.map(x => {
    const st = x.qty === 0 ? "نفدت" : x.qty <= x.reorder ? "منخفض" : "جيد";
    return [x.code, x.barcode||"", x.name, x.cat, x.buy, x.sell, x.qty, x.reorder, x.unit, st];
  });
  if (!rows.length) { toast(t('barcode_no_items'), 'info'); return; }
  _exportTable(h, rows, "الأصناف", "items-export");
  toast(t('backup_exported'));
}

function exportSales() {
  const h = ["رقم الفاتورة","الزبون","التاريخ","الإجمالي","المحصَّل","المتبقي","حالة التسليم","حالة الدفع"];
  const rows = DB.invs.map(inv => {
    const paid = invPaid(inv);
    const rem = invRemaining(inv);
    const dlv = inv.dlvStatus === "delivered" ? "مسلَّمة" : "غير مسلَّمة";
    const pay = paid <= 0 ? "غير مسدَّدة" : paid >= inv.total - 0.001 ? "مسددة كاملاً" : "جزئي";
    return [inv.num, inv.custName, inv.date, inv.total, paid, rem, dlv, pay];
  });
  if (!rows.length) { toast(t('dash_no_invoices'), 'info'); return; }
  _exportTable(h, rows, "فواتير البيع", "sales-export");
  toast(t('backup_exported'));
}

function exportPurchases() {
  const h = ["رقم الفاتورة","المورد","التاريخ","الإجمالي","المدفوع","المتبقي","حالة الدفع"];
  const rows = DB.purs.map(p => {
    const paid = purPaid(p);
    const rem = purRemaining(p);
    const status = paid <= 0 ? "غير مدفوعة" : paid >= p.total - 0.001 ? "مدفوعة" : "جزئي";
    return [p.num, p.supName, p.date, p.total, paid, rem, status];
  });
  if (!rows.length) { toast(t('pur_no_invoices'), 'info'); return; }
  _exportTable(h, rows, "فواتير الشراء", "purchases-export");
  toast(t('backup_exported'));
}

function exportCustomers() {
  const h = ["الاسم","الهاتف","العنوان","الرصيد الافتتاحي","إجمالي المبيعات","الذمة المدينة"];
  const rows = DB.custs.map(c => {
    const recv = custReceivable(c);
    const totalSales = DB.invs.filter(i => i.custId === c.id).reduce((s, i) => s + i.total, 0) + (parseFloat(c.openBal) || 0);
    return [c.name, c.phone||"", c.addr||"", c.openBal||0, totalSales, recv];
  });
  if (!rows.length) { toast(t('hrm_no_employees'), 'info'); return; }
  _exportTable(h, rows, "الزبائن", "customers-export");
  toast(t('backup_exported'));
}

function exportSuppliers() {
  const h = ["الاسم","الهاتف","العنوان","إجمالي المشتريات","المدفوع","الذمة الدائنة"];
  const rows = DB.sups.map(s => {
    const totalPur = DB.purs.filter(p => p.supId === s.id).reduce((sum, p) => sum + p.total, 0);
    const paid = DB.supPayments.filter(p => p.supId === s.id).reduce((sum, p) => sum + p.amount, 0);
    return [s.name, s.phone||"", s.addr||"", totalPur, paid, totalPur - paid];
  });
  if (!rows.length) { toast(t('hrm_no_employees'), 'info'); return; }
  _exportTable(h, rows, "الموردون", "suppliers-export");
  toast(t('backup_exported'));
}

function exportPayments() {
  const h = ["رقم الدفعة","الزبون","رقم الفاتورة","المبلغ","طريقة الدفع","التاريخ","ملاحظات"];
  const rows = DB.payments.map(p => {
    const mode = p.mode === "cash" ? "نقدي" : p.mode === "check" ? "صك" : p.mode === "transfer" ? "تحويل" : p.mode;
    return [p.id, p.custName||"", p.invNum||"", p.amount, mode, p.date, p.notes||""];
  });
  if (!rows.length) { toast(t('hrm_no_movements'), 'info'); return; }
  _exportTable(h, rows, "المحصَّلات", "payments-export");
  toast(t('backup_exported'));
}

function exportSupplierPayments() {
  const h = ["رقم الدفعة","المورد","فاتورة الشراء","المبلغ","طريقة الدفع","التاريخ","ملاحظات"];
  const rows = DB.supPayments.map(p => {
    const mode = p.mode === "cash" ? "نقدي" : p.mode === "check" ? "صك" : p.mode === "transfer" ? "تحويل" : p.mode;
    return [p.id, p.supName||"", p.purNum||"", p.amount, mode, p.date, p.notes||""];
  });
  if (!rows.length) { toast(t('hrm_no_movements'), 'info'); return; }
  _exportTable(h, rows, "دفعات الموردين", "supplier-payments-export");
  toast(t('backup_exported'));
}

function exportReturns() {
  const h = ["رقم المرتجع","رقم الفاتورة","الزبون","المبلغ","السبب","فحص الجودة","التاريخ"];
  const rows = DB.rets.map(r => {
    const qc = r.qcStatus === "passed" ? "مقبول" : r.qcStatus === "failed" ? "مرفوض" : "قيد المراجعة";
    return [r.num, r.invNum, r.custName, r.amt, r.reason||"", qc, r.date];
  });
  if (!rows.length) { toast(t('hrm_no_movements'), 'info'); return; }
  _exportTable(h, rows, "المرتجعات", "returns-export");
  toast(t('backup_exported'));
}

function exportUsers() {
  const h = ["الاسم","اسم الحساب","الصلاحية","الحالة"];
  const rows = DB.users.map(u => {
    const role = u.role === "admin" ? "مشرف" : u.role === "sales" ? "مبيعات" : u.role === "inventory" ? "مخازن" : u.role;
    const status = u.status || (u.isActive === false ? "غير نشط" : "نشط");
    return [u.name, u.username, role, status];
  });
  if (!rows.length) { toast(t('users_empty'), 'info'); return; }
  _exportTable(h, rows, "المستخدمون", "users-export");
  toast(t('backup_exported'));
}

/* ═══════════════════════════════════════════════════════════════
   GENERIC PDF / PRINT HELPER — PROFESSIONAL TEMPLATE
   ═══════════════════════════════════════════════════════════════ */
function _printGenericPDF(title, headers, rows, opts) {
  opts = opts || {};
  const company = currentCompany();
  const now = new Date();
  const dateStr = now.toLocaleDateString('ar-LY');
  const timeStr = now.toLocaleTimeString('ar-LY', {hour:'2-digit',minute:'2-digit'});
  const colStyles = opts.colStyles || {};
  const colCount = headers.length;

  // Summary cards
  const summaryHtml = opts.summary ? opts.summary.map(s =>
    `<div class="summary-card ${s.color||''}"><div class="sc-label">${s.label}</div><div class="sc-value">${s.value}</div></div>`
  ).join('') : '';

  // Table header
  const thead = '<tr>' + headers.map((h, i) =>
    `<th style="${colStyles[i] || ''}">${h}</th>`
  ).join('') + '</tr>';

  // Table body with alternating rows
  const tbody = rows.map((r, ri) => {
    const cells = r.map((c, ci) => {
      let style = colStyles[ci] || '';
      // Auto-detect numeric columns and align left
      if (typeof c === 'number' || (typeof c === 'string' && /^[\d,.\-+]+/.test(c))) {
        style += 'direction:ltr;text-align:right;font-family:monospace;';
      }
      return `<td style="${style}">${c}</td>`;
    }).join('');
    return `<tr class="${ri % 2 === 1 ? 'alt' : ''}">${cells}</tr>`;
  }).join('');

  // Table footer
  const total = opts.footer ? `<tfoot><tr>${opts.footer.map((c, i) =>
    `<td style="font-weight:700;${colStyles[i] || ''}">${c}</td>`
  ).join('')}</tr></tfoot>` : '';

  const landscape = opts.landscape ? 'A4 landscape' : 'A4 portrait';

  const html = `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>${title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
  @page{size:${landscape};margin:14mm 16mm 18mm 16mm}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Cairo',Helvetica,Arial,sans-serif;direction:rtl;color:#1e293b;padding:0;font-size:${opts.fontSize||'11'}px;line-height:1.5;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}

  .rpt{position:relative;padding:20px 24px 60px}

  /* Top accent bar */
  .rpt-accent{position:absolute;top:0;left:0;right:0;height:5px;background:linear-gradient(135deg,#4f8ef7 0%,#6c5ce7 50%,#a855f7 100%);border-radius:0 0 4px 4px}

  /* Side accent strip */
  .rpt-side{position:absolute;top:0;right:0;width:4px;height:100%;background:linear-gradient(180deg,#4f8ef7,#6c5ce7,#a855f7);border-radius:0 0 4px 4px;opacity:.3}

  /* Header area */
  .rpt-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;padding-top:12px;gap:20px}
  .rpt-company{flex:1}
  .rpt-company-name{font-size:22px;font-weight:800;color:#4f8ef7;margin-bottom:3px;letter-spacing:-0.3px}
  .rpt-company-sub{font-size:11px;color:#64748b;line-height:1.6}
  .rpt-company-sub span{display:inline-block;margin-left:12px}
  .rpt-title-box{text-align:left;min-width:220px}
  .rpt-report-title{font-size:26px;font-weight:800;color:#1e293b;margin-bottom:4px;position:relative}
  .rpt-report-title::after{content:'';display:block;width:60px;height:3px;background:linear-gradient(90deg,#4f8ef7,#6c5ce7);border-radius:2px;margin-top:6px;margin-left:auto}
  .rpt-report-meta{font-size:10px;color:#94a3b8;line-height:1.8;margin-top:8px}
  .rpt-report-meta strong{color:#475569;font-weight:600}

  /* Count badge */
  .rpt-count{display:inline-flex;align-items:center;gap:5px;background:linear-gradient(135deg,#eff6ff,#dbeafe);color:#4f8ef7;padding:4px 14px;border-radius:20px;font-size:10px;font-weight:700;margin-top:6px;border:1px solid #bfdbfe}
  .rpt-count i{font-size:12px}

  /* Summary cards */
  .rpt-summary{display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap}
  .summary-card{flex:1;min-width:120px;padding:10px 14px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;text-align:center}
  .summary-card.green{border-color:#bbf7d0;background:#f0fdf4}
  .summary-card.red{border-color:#fecaca;background:#fef2f2}
  .summary-card.blue{border-color:#bfdbfe;background:#eff6ff}
  .summary-card.purple{border-color:#e9d5ff;background:#faf5ff}
  .summary-card.amber{border-color:#fde68a;background:#fffbeb}
  .sc-label{font-size:9px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;margin-bottom:2px}
  .sc-value{font-size:16px;font-weight:800;color:#1e293b}
  .summary-card.green .sc-value{color:#16a34a}
  .summary-card.red .sc-value{color:#dc2626}
  .summary-card.blue .sc-value{color:#4f8ef7}
  .summary-card.purple .sc-value{color:#9333ea}
  .summary-card.amber .sc-value{color:#d97706}

  /* Info row */
  .rpt-info{display:flex;gap:16px;margin-bottom:14px;padding:10px 14px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;font-size:11px;color:#64748b;flex-wrap:wrap}
  .rpt-info span{display:flex;align-items:center;gap:4px}
  .rpt-info strong{color:#1e293b}

  /* Table */
  table{width:100%;border-collapse:collapse;margin:0;font-size:${opts.fontSize||'11'}px}
  thead th{background:linear-gradient(135deg,#4f8ef7,#5b9cf7);color:#fff;padding:10px 8px;font-weight:600;text-align:right;font-size:${opts.fontSize||'11'}px;white-space:nowrap;position:sticky;top:0}
  thead th:first-child{border-radius:0 8px 0 0}
  thead th:last-child{border-radius:8px 0 0 0}
  tbody td{padding:8px;border-bottom:1px solid #f1f5f9;vertical-align:middle}
  tbody tr.alt{background:#f8fafc}
  tbody tr:hover{background:#eff6ff}
  tbody tr:last-child td{border-bottom:2px solid #e2e8f0}
  tfoot td{padding:10px 8px;border-top:3px solid #4f8ef7;background:linear-gradient(135deg,#eff6ff,#f0f4ff);font-size:12px;font-weight:700;color:#1e293b}

  /* Footer */
  .rpt-footer{margin-top:20px;padding-top:12px;border-top:2px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;font-size:9px;color:#94a3b8}
  .rpt-footer-brand{font-weight:700;color:#4f8ef7;font-size:11px}
  .rpt-footer-page{font-family:monospace;direction:ltr}

  /* Watermark */
  .rpt-watermark{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-30deg);font-size:60px;font-weight:900;color:rgba(79,142,247,0.03);pointer-events:none;z-index:0;white-space:nowrap;letter-spacing:8px}

  /* Stamp area */
  .rpt-stamps{display:flex;gap:24px;margin-top:16px;justify-content:flex-start}
  .rpt-stamp{width:130px;height:55px;border:1.5px dashed #cbd5e1;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:9px;color:#94a3b8;flex-direction:column;gap:2px;background:#fafbfc}
  .rpt-stamp i{font-size:14px;opacity:.4}

  /* Signature line */
  .rpt-signature{display:flex;justify-content:space-between;margin-top:20px;padding:0 20px}
  .sig-line{text-align:center;width:160px}
  .sig-line .line{border-top:1px solid #94a3b8;margin-top:40px;padding-top:4px;font-size:9px;color:#94a3b8}

  /* Print styles */
  @media print{
    body{padding:0;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
    .rpt{padding:0 4mm 10mm}
    .rpt-watermark{display:none}
    .rpt-accent{height:4px}
    table{page-break-inside:auto}
    tr{page-break-inside:avoid;page-break-after:auto}
    thead{display:table-header-group}
    tfoot{display:table-footer-group}
  }
  </style></head><body>
  <div class="rpt">
    <div class="rpt-accent"></div>
    <div class="rpt-side"></div>
    <div class="rpt-watermark">${title}</div>

    <div class="rpt-header">
      <div class="rpt-company">
        ${company.logo?'<div style="margin-bottom:6px">'+companyLogoHtml(company,45)+'</div>':''}
        <div class="rpt-company-name">${company.name}</div>
        <div class="rpt-company-sub">
          ${company.address ? '<span><i class="ti ti-map-pin" style="font-size:10px"></i> '+company.address+'</span>' : ''}
          ${company.phone ? '<span><i class="ti ti-phone" style="font-size:10px"></i> '+company.phone+'</span>' : ''}
          ${company.email ? '<span><i class="ti ti-mail" style="font-size:10px"></i> '+company.email+'</span>' : ''}
          ${company.taxNo ? '<span><i class="ti ti-id" style="font-size:10px"></i> ض.ق: '+company.taxNo+'</span>' : ''}
        </div>
      </div>
      <div class="rpt-title-box">
        <div class="rpt-report-title">${title}</div>
        <div class="rpt-report-meta">
          <div>تاريخ التقرير: <strong>${dateStr}</strong></div>
          <div>الوقت: <strong>${timeStr}</strong></div>
          ${opts.subtitle ? '<div>'+opts.subtitle+'</div>' : ''}
        </div>
        <div class="rpt-count"><i class="ti ti-database"></i> ${rows.length} سجل</div>
      </div>
    </div>

    ${summaryHtml ? '<div class="rpt-summary">' + summaryHtml + '</div>' : ''}

    <div class="rpt-info">
      <span>الشركة: <strong>${company.name}</strong></span>
      <span>التاريخ: <strong>${dateStr}</strong></span>
      <span>الوقت: <strong>${timeStr}</strong></span>
      ${opts.infoItems ? opts.infoItems.map(i => `<span>${i.label}: <strong>${i.value}</strong></span>`).join('') : ''}
    </div>

    <table><thead>${thead}</thead><tbody>${tbody}</tbody>${total}</table>

    <div class="rpt-stamps">
      <div class="rpt-stamp"><i class="ti ti-stamp"></i>ختم المؤسسة</div>
      <div class="rpt-stamp"><i class="ti ti-signature"></i>توقيع المسؤول</div>
    </div>

    <div class="rpt-footer">
      <span class="rpt-footer-brand">${company.name}</span>
      <span>تاريخ الطباعة: ${dateStr} ${timeStr}</span>
      <span class="rpt-footer-page">صفحة 1 من 1</span>
    </div>
  </div>
  </body></html>`;

  const win = window.open('', '_blank', 'width=1050,height=850');
  if (!win) { toast(t('sales_print_err'), 'error'); return; }
  win.document.write(html);
  win.document.close();
  setTimeout(() => { try { win.print(); } catch(e){} }, 600);
}

/* ═══════════════════════════════════════════════════════════════
   ITEMS — PDF / PRINT
   ═══════════════════════════════════════════════════════════════ */
function printItemsPDF() {
  const h = ['الكود','الصنف','الفئة','سعر الشراء','سعر البيع','الرصيد','الوحدة','الحالة'];
  const rows = DB.items.map(x => {
    const st = x.qty === 0 ? 'نفدت' : x.qty <= x.reorder ? 'منخفض' : 'جيد';
    return [x.code, x.name, x.cat, fmt(x.buy), fmt(x.sell), x.qty, x.unit, st];
  });
  if (!rows.length) { toast(t('barcode_no_items'), 'info'); return; }
  _printGenericPDF('قائمة الأصناف', h, rows, { subtitle: 'المخزون والأصناف' });
}

/* ═══════════════════════════════════════════════════════════════
   CUSTOMERS — PDF / PRINT
   ═══════════════════════════════════════════════════════════════ */
function printCustomersPDF() {
  const h = ['الاسم','الهاتف','العنوان','الرصيد الافتتاحي','المبيعات','الذمة المدينة'];
  const rows = DB.custs.map(c => {
    const recv = custReceivable(c);
    const totalSales = DB.invs.filter(i => i.custId === c.id).reduce((s, i) => s + i.total, 0) + (parseFloat(c.openBal) || 0);
    return [c.name, c.phone || '', c.addr || '', fmt(c.openBal || 0), fmt(totalSales), fmt(recv)];
  });
  if (!rows.length) { toast(t('hrm_no_employees'), 'info'); return; }
  const totalReceivable = DB.custs.reduce((s, c) => s + custReceivable(c), 0);
  const totalSalesAll = DB.custs.reduce((s, c) => s + DB.invs.filter(i => i.custId === c.id).reduce((si, i) => si + i.total, 0), 0);
  _printGenericPDF('قائمة الزبائن', h, rows, {
    subtitle: 'بيانات الزبائن والذمم المدينة',
    summary: [
      { label: 'عدد الزبائن', value: DB.custs.length, color: 'blue' },
      { label: 'إجمالي المبيعات', value: fmt(totalSalesAll) + ' د.ل', color: 'green' },
      { label: 'الذمم المدينة', value: fmt(totalReceivable) + ' د.ل', color: 'red' }
    ]
  });
}

/* ═══════════════════════════════════════════════════════════════
   SUPPLIERS — PDF / PRINT
   ═══════════════════════════════════════════════════════════════ */
function printSuppliersPDF() {
  const h = ['الاسم','الهاتف','العنوان','المشتريات','المدفوع','الذمة الدائنة'];
  const rows = DB.sups.map(s => {
    const totalPur = DB.purs.filter(p => p.supId === s.id).reduce((sum, p) => sum + p.total, 0);
    const paid = DB.supPayments.filter(p => p.supId === s.id).reduce((sum, p) => sum + p.amount, 0);
    return [s.name, s.phone || '', s.addr || '', fmt(totalPur), fmt(paid), fmt(totalPur - paid)];
  });
  if (!rows.length) { toast(t('hrm_no_employees'), 'info'); return; }
  const totalPayable = DB.sups.reduce((s, sup) => {
    const totalPur = DB.purs.filter(p => p.supId === sup.id).reduce((sum, p) => sum + p.total, 0);
    const paid = DB.supPayments.filter(p => p.supId === sup.id).reduce((sum, p) => sum + p.amount, 0);
    return s + (totalPur - paid);
  }, 0);
  _printGenericPDF('قائمة الموردين', h, rows, {
    subtitle: 'بيانات الموردين والذمم الدائنة',
    summary: [
      { label: 'عدد الموردين', value: DB.sups.length, color: 'blue' },
      { label: 'إجمالي المشتريات', value: fmt(DB.purs.reduce((s, p) => s + p.total, 0)) + ' د.ل', color: 'purple' },
      { label: 'الذمم الدائنة', value: fmt(totalPayable) + ' د.ل', color: 'red' }
    ]
  });
}

/* ═══════════════════════════════════════════════════════════════
   SALES — PDF / PRINT
   ═══════════════════════════════════════════════════════════════ */
function printSalesPDF() {
  const h = ['رقم الفاتورة','الزبون','التاريخ','الإجمالي','المحصَّل','المتبقي','حالة الدفع'];
  const rows = DB.invs.map(inv => {
    const paid = invPaid(inv);
    const rem = invRemaining(inv);
    const pay = paid <= 0 ? 'غير مسدَّدة' : paid >= inv.total - 0.001 ? 'مسددة' : 'جزئي';
    return [inv.num, inv.custName, inv.date, fmt(inv.total), fmt(paid), fmt(rem), pay];
  });
  if (!rows.length) { toast(t('dash_no_invoices'), 'info'); return; }
  const totalAll = DB.invs.reduce((s, i) => s + i.total, 0);
  const paidAll = DB.invs.reduce((s, i) => s + invPaid(i), 0);
  const remAll = totalAll - paidAll;
  const delivered = DB.invs.filter(i => i.dlvStatus === 'delivered').length;
  _printGenericPDF('فواتير البيع', h, rows, {
    subtitle: 'سجل فواتير البيع',
    footer: ['الإجمالي', '', '', fmt(totalAll), fmt(paidAll), fmt(remAll), ''],
    summary: [
      { label: 'إجمالي الفواتير', value: fmt(totalAll) + ' د.ل', color: 'blue' },
      { label: 'المحصَّل', value: fmt(paidAll) + ' د.ل', color: 'green' },
      { label: 'المتبقي', value: fmt(remAll) + ' د.ل', color: 'red' },
      { label: 'عدد الفواتير', value: DB.invs.length, color: 'purple' },
      { label: 'مسلَّمة', value: delivered, color: 'amber' }
    ],
    infoItems: [
      { label: 'إجمالي الفواتير', value: DB.invs.length + ' فاتورة' },
      { label: 'الفواتير المسلَّمة', value: delivered },
      { label: 'نسبة التحصيل', value: totalAll > 0 ? ((paidAll / totalAll) * 100).toFixed(1) + '%' : '0%' }
    ]
  });
}

/* ═══════════════════════════════════════════════════════════════
   PURCHASES — PDF / PRINT
   ═══════════════════════════════════════════════════════════════ */
function printPurchasesPDF() {
  const h = ['رقم الفاتورة','المورد','التاريخ','الإجمالي','المدفوع','المتبقي','حالة الدفع'];
  const rows = DB.purs.map(p => {
    const paid = purPaid(p);
    const rem = purRemaining(p);
    const status = paid <= 0 ? 'غير مدفوعة' : paid >= p.total - 0.001 ? 'مدفوعة' : 'جزئي';
    return [p.num, p.supName, p.date, fmt(p.total), fmt(paid), fmt(rem), status];
  });
  if (!rows.length) { toast(t('pur_no_invoices'), 'info'); return; }
  const totalAll = DB.purs.reduce((s, p) => s + p.total, 0);
  const paidAll = DB.purs.reduce((s, p) => s + purPaid(p), 0);
  const remAll = totalAll - paidAll;
  _printGenericPDF('فواتير الشراء', h, rows, {
    subtitle: 'سجل فواتير الشراء',
    footer: ['الإجمالي', '', '', fmt(totalAll), fmt(paidAll), fmt(remAll), ''],
    summary: [
      { label: 'إجمالي المشتريات', value: fmt(totalAll) + ' د.ل', color: 'blue' },
      { label: 'المدفوع', value: fmt(paidAll) + ' د.ل', color: 'green' },
      { label: 'المتبقي', value: fmt(remAll) + ' د.ل', color: 'red' },
      { label: 'عدد الفواتير', value: DB.purs.length, color: 'purple' }
    ],
    infoItems: [
      { label: 'عدد الفواتير', value: DB.purs.length + ' فاتورة' },
      { label: 'نسبة الدفع', value: totalAll > 0 ? ((paidAll / totalAll) * 100).toFixed(1) + '%' : '0%' }
    ]
  });
}

/* ═══════════════════════════════════════════════════════════════
   RETURNS — PDF / PRINT
   ═══════════════════════════════════════════════════════════════ */
function printReturnsPDF() {
  const h = ['رقم المرتجع','رقم الفاتورة','الزبون','المبلغ','السبب','فحص الجودة','التاريخ'];
  const rows = DB.rets.map(r => {
    const qc = r.qcStatus === 'passed' ? 'مقبول' : r.qcStatus === 'failed' ? 'مرفوض' : 'قيد المراجعة';
    return [r.num, r.invNum, r.custName, fmt(r.amt), r.reason || '', qc, r.date];
  });
  if (!rows.length) { toast(t('hrm_no_movements'), 'info'); return; }
  const totalAll = DB.rets.reduce((s, r) => s + r.amt, 0);
  const passed = DB.rets.filter(r => r.qcStatus === 'passed').length;
  const failed = DB.rets.filter(r => r.qcStatus === 'failed').length;
  const pending = DB.rets.filter(r => r.qcStatus !== 'passed' && r.qcStatus !== 'failed').length;
  _printGenericPDF('مرتجعات المبيعات', h, rows, {
    subtitle: 'سجل مرتجعات البيع',
    footer: ['الإجمالي', '', '', fmt(totalAll), '', '', ''],
    summary: [
      { label: 'إجمالي المرتجعات', value: fmt(totalAll) + ' د.ل', color: 'red' },
      { label: 'عدد المرتجعات', value: DB.rets.length, color: 'blue' },
      { label: 'مقبول', value: passed, color: 'green' },
      { label: 'مرفوض', value: failed, color: 'red' },
      { label: 'قيد المراجعة', value: pending, color: 'amber' }
    ]
  });
}

/* ═══════════════════════════════════════════════════════════════
   SUPPLIER PAYMENTS — PDF / PRINT
   ═══════════════════════════════════════════════════════════════ */
function printSupplierPaymentsPDF() {
  const h = ['رقم الدفعة','المورد','فاتورة الشراء','المبلغ','طريقة الدفع','التاريخ','ملاحظات'];
  const rows = DB.supPayments.map(p => {
    const mode = p.mode === 'cash' ? 'نقدي' : p.mode === 'check' ? 'صك' : p.mode === 'transfer' ? 'تحويل' : p.mode;
    return [p.id, p.supName || '', p.purNum || '', fmt(p.amount), mode, p.date, p.notes || ''];
  });
  if (!rows.length) { toast(t('hrm_no_movements'), 'info'); return; }
  const totalAll = DB.supPayments.reduce((s, p) => s + p.amount, 0);
  const cashTotal = DB.supPayments.filter(p => p.mode === 'cash').reduce((s, p) => s + p.amount, 0);
  const checkTotal = DB.supPayments.filter(p => p.mode === 'check').reduce((s, p) => s + p.amount, 0);
  _printGenericPDF('دفعات الموردين', h, rows, {
    subtitle: 'سجل مدفوعات الموردين',
    footer: ['الإجمالي', '', '', fmt(totalAll), '', '', ''],
    summary: [
      { label: 'إجمالي المدفوعات', value: fmt(totalAll) + ' د.ل', color: 'red' },
      { label: 'نقدي', value: fmt(cashTotal) + ' د.ل', color: 'blue' },
      { label: 'صكوك', value: fmt(checkTotal) + ' د.ل', color: 'purple' },
      { label: 'عدد الدفعات', value: DB.supPayments.length, color: 'amber' }
    ]
  });
}

/* ═══════════════════════════════════════════════════════════════
   USERS — PDF / PRINT
   ═══════════════════════════════════════════════════════════════ */
function printUsersPDF() {
  const h = ['الاسم','اسم الحساب','الصلاحية','الحالة'];
  const rows = DB.users.map(u => {
    const role = u.role === 'admin' ? 'مشرف' : u.role === 'sales' ? 'مبيعات' : u.role === 'inventory' ? 'مخازن' : u.role;
    const status = u.status || (u.isActive === false ? 'غير نشط' : 'نشط');
    return [u.name, u.username, role, status];
  });
  if (!rows.length) { toast(t('users_empty'), 'info'); return; }
  const active = DB.users.filter(u => u.status !== 'غير نشط' && u.isActive !== false).length;
  const inactive = DB.users.length - active;
  _printGenericPDF('قائمة المستخدمين', h, rows, {
    subtitle: 'حسابات المستخدمين والصلاحيات',
    summary: [
      { label: 'عدد المستخدمين', value: DB.users.length, color: 'blue' },
      { label: 'نشط', value: active, color: 'green' },
      { label: 'غير نشط', value: inactive, color: 'red' }
    ]
  });
}

/* ═══════════════════════════════════════════════════════════════
   CUSTOMER PAYMENTS (collections) — PDF / PRINT / EXCEL
   ═══════════════════════════════════════════════════════════════ */
function printPaymentsPDF() {
  const h = ['رقم الدفعة','الزبون','رقم الفاتورة','المبلغ','طريقة الدفع','التاريخ','ملاحظات'];
  const rows = DB.payments.map(p => {
    const mode = p.mode === 'cash' ? 'نقدي' : p.mode === 'check' ? 'صك' : p.mode === 'transfer' ? 'تحويل' : p.mode;
    return [p.id, p.custName || '', p.invNum || '', fmt(p.amount), mode, p.date, p.notes || ''];
  });
  if (!rows.length) { toast(t('hrm_no_movements'), 'info'); return; }
  const totalAll = DB.payments.reduce((s, p) => s + p.amount, 0);
  const cashTotal = DB.payments.filter(p => p.mode === 'cash').reduce((s, p) => s + p.amount, 0);
  const checkTotal = DB.payments.filter(p => p.mode === 'check').reduce((s, p) => s + p.amount, 0);
  _printGenericPDF('المحصَّلات من الزبائن', h, rows, {
    subtitle: 'سجل التحصيل من الزبائن',
    footer: ['الإجمالي', '', '', fmt(totalAll), '', '', ''],
    summary: [
      { label: 'إجمالي التحصيل', value: fmt(totalAll) + ' د.ل', color: 'green' },
      { label: 'نقدي', value: fmt(cashTotal) + ' د.ل', color: 'blue' },
      { label: 'صكوك', value: fmt(checkTotal) + ' د.ل', color: 'purple' },
      { label: 'عدد الدفعات', value: DB.payments.length, color: 'amber' }
    ]
  });
}

/* ═══════════════════════════════════════════════════════════════
   FINANCE — EXCEL
   ═══════════════════════════════════════════════════════════════ */
function exportFinance() {
  const h = ['النوع','التاريخ','البيان','المورد/الزبون','المبلغ','طريقة الدفع'];
  const rows = [];
  DB.payments.forEach(p => {
    rows.push(['تحصيل', p.date, p.notes || 'تحصيل من زبون', p.custName || '', p.amount, p.mode === 'cash' ? 'نقدي' : p.mode === 'check' ? 'صك' : p.mode === 'transfer' ? 'تحويل' : p.mode]);
  });
  DB.supPayments.forEach(p => {
    rows.push(['دفعة', p.date, p.notes || 'دفعة لمورد', p.supName || '', -p.amount, p.mode === 'cash' ? 'نقدي' : p.mode === 'check' ? 'صك' : p.mode === 'transfer' ? 'تحويل' : p.mode]);
  });
  if (!rows.length) { toast(t('hrm_no_movements'), 'info'); return; }
  _exportTable(h, rows, 'الحركة المالية', 'finance-export');
  toast(t('backup_exported'));
}

/* ═══════════════════════════════════════════════════════════════
   FINANCE — PDF / PRINT
   ═══════════════════════════════════════════════════════════════ */
function printFinancePDF() {
  const h = ['النوع','التاريخ','البيان','المورد/الزبون','المبلغ','طريقة الدفع'];
  const rows = [];
  DB.payments.forEach(p => {
    rows.push(['تحصيل', p.date, p.notes || 'تحصيل', p.custName || '', '+' + fmt(p.amount), p.mode === 'cash' ? 'نقدي' : p.mode === 'check' ? 'صك' : p.mode === 'transfer' ? 'تحويل' : p.mode]);
  });
  DB.supPayments.forEach(p => {
    rows.push(['دفعة', p.date, p.notes || 'دفعة', p.supName || '', '-' + fmt(p.amount), p.mode === 'cash' ? 'نقدي' : p.mode === 'check' ? 'صك' : p.mode === 'transfer' ? 'تحويل' : p.mode]);
  });
  if (!rows.length) { toast(t('hrm_no_movements'), 'info'); return; }
  const inflow = DB.payments.reduce((s, p) => s + p.amount, 0);
  const outflow = DB.supPayments.reduce((s, p) => s + p.amount, 0);
  const netFlow = inflow - outflow;
  _printGenericPDF('الحركة المالية', h, rows, {
    subtitle: 'التحصيلات والمدفوعات',
    footer: ['صافي الحركة', '', '', '', (netFlow >= 0 ? '+' : '') + fmt(netFlow), ''],
    summary: [
      { label: 'التحصيلات (وارد)', value: '+' + fmt(inflow) + ' د.ل', color: 'green' },
      { label: 'المدفوعات (صادر)', value: '-' + fmt(outflow) + ' د.ل', color: 'red' },
      { label: 'صافي الحركة', value: (netFlow >= 0 ? '+' : '') + fmt(netFlow) + ' د.ل', color: netFlow >= 0 ? 'blue' : 'red' },
      { label: 'عدد الحركات', value: rows.length, color: 'purple' }
    ],
    infoItems: [
      { label: 'الوارد', value: DB.payments.length + ' دفعة' },
      { label: 'الصادر', value: DB.supPayments.length + ' دفعة' },
      { label: 'الصافي', value: (netFlow >= 0 ? '+' : '') + fmt(netFlow) + ' د.ل' }
    ]
  });
}

/* ═══════════════════════════════════════════════════════════════
   P&L — EXCEL
   ═══════════════════════════════════════════════════════════════ */
function exportPL() {
  const totalSales = DB.invs.reduce((s, i) => s + i.total, 0);
  const totalCost = DB.invs.reduce((s, i) => s + i.lines.reduce((ls, l) => ls + (l.cost || 0) * l.qty, 0), 0);
  const gross = totalSales - totalCost;
  const retTotal = DB.rets.reduce((s, r) => s + r.amt, 0);
  const net = gross - retTotal;
  const h = ['البند', 'المبلغ'];
  const rows = [
    ['إجمالي المبيعات', totalSales],
    ['تكلفة البضاعة المباعة (COGS)', totalCost],
    ['إجمالي الربح', gross],
    ['المرتجعات', retTotal],
    ['صافي الربح', net]
  ];
  _exportTable(h, rows, 'قائمة الدخل', 'pl-export');
  toast(t('backup_exported'));
}

/* ═══════════════════════════════════════════════════════════════
   P&L — PDF / PRINT
   ═══════════════════════════════════════════════════════════════ */
function printPLPDF() {
  const totalSales = DB.invs.reduce((s, i) => s + i.total, 0);
  const totalCost = DB.invs.reduce((s, i) => s + i.lines.reduce((ls, l) => ls + (l.buyPrice || l.cost || 0) * l.qty, 0), 0);
  const gross = totalSales - totalCost;
  const retTotal = DB.rets.reduce((s, r) => s + r.amt, 0);
  const net = gross - retTotal;
  const margin = totalSales > 0 ? ((net / totalSales) * 100).toFixed(1) : '0.0';
  const deliveredCount = DB.invs.filter(i => i.dlvStatus === 'delivered').length;
  const h = ['البند', 'المبلغ (د.ل)'];
  const rows = [
    ['إجمالي المبيعات (efore)', fmt(totalSales)],
    ['تكلفة البضاعة المباعة (COGS)', fmt(totalCost)],
    ['الربح الإجمالي (Gross)', fmt(gross)],
    ['المرتجعات', fmt(retTotal)],
    ['صافي الربح (Net)', fmt(net)]
  ];
  _printGenericPDF('قائمة الدخل (P&L)', h, rows, {
    subtitle: 'تقرير الأرباح والخسائر',
    summary: [
      { label: 'إجمالي الإيرادات', value: fmt(totalSales) + ' د.ل', color: 'blue' },
      { label: 'التكلفة', value: fmt(totalCost) + ' د.ل', color: 'red' },
      { label: 'صافي الربح', value: fmt(net) + ' د.ل', color: 'green' },
      { label: 'هامش الربح', value: margin + '%', color: 'purple' }
    ],
    infoItems: [
      { label: 'الفواتير المسلَّمة', value: deliveredCount },
      { label: 'هامش الربح', value: margin + '%' },
      { label: 'المرتجعات', value: fmt(retTotal) + ' د.ل' }
    ]
  });
}

/* ═══════════════════════════════════════════════════════════════
   AUDIT LOG — EXCEL
   ═══════════════════════════════════════════════════════════════ */
function exportAudit() {
  const h = ['التاريخ','المستخدم','الإجراء','النوع','الرقم','التفاصيل'];
  const rows = DB.log.map(a => [a.date, a.user || '', a.action || '', a.entity || '', a.entityId || '', a.details || '']);
  if (!rows.length) { toast(t('export_no_records'), 'info'); return; }
  _exportTable(h, rows, 'سجل التدقيق', 'audit-export');
  toast(t('backup_exported'));
}

/* ═══════════════════════════════════════════════════════════════
   AUDIT LOG — PDF / PRINT
   ═══════════════════════════════════════════════════════════════ */
function printAuditPDF() {
  const h = ['التاريخ','المستخدم','الإجراء','النوع','الرقم','التفاصيل'];
  const rows = DB.log.map(l => [l.date + ' ' + (l.time||''), l.user || '', l.action || '', l.detail || '', '', '']);
  if (!rows.length) { toast(t('export_no_records'), 'info'); return; }
  const users = [...new Set(DB.log.map(l => l.user).filter(Boolean))];
  _printGenericPDF('سجل التدقيق', h, rows, {
    subtitle: 'سجل العمليات والتغييرات',
    landscape: true,
    fontSize: 10,
    summary: [
      { label: 'إجمالي السجلات', value: DB.log.length, color: 'blue' },
      { label: 'المستخدمون', value: users.length, color: 'purple' }
    ]
  });
}
/* ═══════════════════════════════════════════════
   inventory.js
══════════════════════════════════════════════ */

﻿/* ═══ SMART ITEM SEARCH (Filter select) ═══ */
function filterItemSelect(val,prefix){
  const sel=G(prefix+'-item-sel');
  if(!sel)return;
  const term=(val||'').trim().toLowerCase();
  const opts=sel.options;
  for(let i=1;i<opts.length;i++){
    const txt=(opts[i].text||'').toLowerCase();
    const match=!term||txt.includes(term);
    opts[i].hidden=!match;
    opts[i].disabled=!match;
  }
  if(term){
    for(let i=1;i<opts.length;i++){
      if(!opts[i].hidden){sel.selectedIndex=i;break}
    }
  }
  sel.dispatchEvent(new Event('change'));
}
let _itemSearchIdx={}; // prefix -> current highlighted index
let _itemSearchResults={}; // prefix -> filtered results

function itemSearch(val,prefix){
  const term=(val||'').trim().toLowerCase();
  const dd=G(prefix+'-item-dd');
  const hidden=G(prefix+'-item-sel');
  if(!dd)return;
  _itemSearchIdx[prefix]=-1;
  if(!term){
    // Show all items when empty
    _itemSearchResults[prefix]=[...DB.items].slice(0,50);
  } else {
    _itemSearchResults[prefix]=DB.items.filter(x=>{
      const bc=String(x.barcode||'').toLowerCase();
      const nm=String(x.name||'').toLowerCase();
      const cd=String(x.code||'').toLowerCase();
      return nm.includes(term)||bc.includes(term)||cd.includes(term);
    }).slice(0,30);
  }
  const results=_itemSearchResults[prefix];
  if(!results.length){
    dd.innerHTML=`<div class="item-search-empty">${t('inv_no_results_add')}</div>`;
    dd.classList.add('on');
    return;
  }
  const searchTerm=term;
  dd.innerHTML=results.map((x,i)=>{
    let nameHtml=escapeHtml(x.name);
    if(searchTerm){
      const safeName=escapeHtml(x.name);
      const lowerName=safeName.toLowerCase();
      const lowerTerm=searchTerm.toLowerCase();
      const idx=lowerName.indexOf(lowerTerm);
      if(idx>=0) nameHtml=safeName.substring(0,idx)+'<mark>'+safeName.substring(idx,idx+lowerTerm.length)+'</mark>'+safeName.substring(idx+lowerTerm.length);
    }
    const stock=x.qty>0?`<span class="isb-stock">${x.qty} ${escapeHtml(x.unit)||''}</span>`:`<span class="isb-stock out">نفد</span>`;
    return`<div class="item-search-row${i===_itemSearchIdx[prefix]?' active':''}" onmousedown="selectItem(${x.id},'${prefix}')" data-idx="${i}">
      <div class="isb-info">
        <div class="isb-name">${nameHtml}</div>
        <div class="isb-meta">${escapeHtml(x.code||'')} ${x.barcode?'• '+escapeHtml(x.barcode):''} ${x.cat?'• '+escapeHtml(x.cat):''}</div>
      </div>
      <div class="isb-right">
        <div class="isb-price">${fmt(x.sell)} ${t('currency_sym')}</div>
        ${stock}
      </div>
    </div>`;
  }).join('');
  dd.classList.add('on');
  // Position dropdown with fixed positioning to escape modal overflow
  const wrap=G(prefix+'-item-wrap');
  if(wrap){
    const r=wrap.getBoundingClientRect();
    dd.style.position='fixed';
    dd.style.top=(r.bottom+2)+'px';
    dd.style.left=r.left+'px';
    dd.style.width=r.width+'px';
    dd.style.zIndex='99999';
  }
}

function selectItem(id,prefix){
  const item=DB.items.find(x=>x.id===id);
  if(!item)return;
  const hidden=G(prefix+'-item-sel');
  const input=G(prefix+'-item-search');
  hidden.value=id;
  input.value=item.name;
  // Auto-fill price
  if(prefix==='si'){
    G('si-price').value=item.sell;
    calcSiLine();
  } else {
    G('pi-price').value=item.buy;
    calcPiLine();
  }
  closeItemSearch(prefix);
  // Focus qty field
  G(prefix+'-qty').focus();
}

function itemSearchKey(e,prefix){
  const dd=G(prefix+'-item-dd');
  const results=_itemSearchResults[prefix]||[];
  if(e.key==='ArrowDown'){
    e.preventDefault();
    _itemSearchIdx[prefix]=Math.min(_itemSearchIdx[prefix]+1,results.length-1);
    _highlightItem(dd,prefix);
  } else if(e.key==='ArrowUp'){
    e.preventDefault();
    _itemSearchIdx[prefix]=Math.max(_itemSearchIdx[prefix]-1,0);
    _highlightItem(dd,prefix);
  } else if(e.key==='Enter'){
    e.preventDefault();
    if(_itemSearchIdx[prefix]>=0 && results[_itemSearchIdx[prefix]]){
      selectItem(results[_itemSearchIdx[prefix]].id,prefix);
    } else if(results.length===1){
      selectItem(results[0].id,prefix);
    }
  } else if(e.key==='Escape'){
    closeItemSearch(prefix);
  }
}

function _highlightItem(dd,prefix){
  const rows=dd.querySelectorAll('.item-search-row');
  rows.forEach((r,i)=>r.classList.toggle('active',i===_itemSearchIdx[prefix]));
  if(rows[_itemSearchIdx[prefix]]) rows[_itemSearchIdx[prefix]].scrollIntoView({block:'nearest'});
}

function closeItemSearch(prefix){
  const dd=G(prefix+'-item-dd');
  if(dd)dd.classList.remove('on');
}

/* ═══ ITEMS ═══ */
let _editingItemId=null;
function openNewItem(){
  _editingItemId=null;
  G('fi-code').value='';G('fi-barcode').value='';G('fi-name').value='';
  G('fi-buy').value='';G('fi-sell').value='';G('fi-qty').value='';
  G('fi-reorder').value='5';G('fi-unit').value='قطعة';G('fi-cat').value='عام';
  G('m-item-title').textContent=t('inv_new_title');
  G('m-item-save-btn').innerHTML='<i class="ti ti-device-floppy"></i> '+t('inv_save_item');
  openModal('m-item');
}
function saveItem(){
  const btn=G('m-item-save-btn');setBtnLoading(btn,true);
  try{
  const name=G('fi-name').value.trim();
  if(!name){toast(t('inv_name_ph'),'error');return}
  const imgData=G('fi-img-preview')?.querySelector('img')?.src||null;
  if(_editingItemId){
    const item=DB.items.find(x=>x.id===_editingItemId);
    if(!item){toast(t('inv_not_found'),'error');return}
    item.code=G('fi-code').value||item.code;
    item.barcode=G('fi-barcode').value.trim();
    item.name=name;
    item.buy=parseFloat(G('fi-buy').value)||0;
    item.sell=parseFloat(G('fi-sell').value)||0;
    item.qty=parseFloat(G('fi-qty').value)||0;
    item.reorder=parseFloat(G('fi-reorder').value)||5;
    item.unit=G('fi-unit').value||'قطعة';
    item.cat=G('fi-cat').value||'عام';
    if(imgData!==null) item.image=imgData;
    addLog(t('inv_edit'),`"${name}" — '+t('inv_sell_price')+': ${fmt(item.sell)}  ${t('currency_sym')}`,'#4f8ef7');
    toast(t('inv_item_updated')+' "'+name+'"',{icon:'ti-package',title:t('inv_updated_done')});
  } else {
    const item={
      id:Date.now(),
      code:G('fi-code').value||'ITM'+String(DB.items.length+1).padStart(3,'0'),
      barcode:G('fi-barcode').value.trim(),
      name,
      buy:parseFloat(G('fi-buy').value)||0,
      sell:parseFloat(G('fi-sell').value)||0,
      qty:parseFloat(G('fi-qty').value)||0,
      reorder:parseFloat(G('fi-reorder').value)||5,
      unit:G('fi-unit').value||'قطعة',
      cat:G('fi-cat').value||'عام',
      image:imgData
    };
    DB.items.push(item);
    addLog(t('inv_add'),`"${name}" — '+t('inv_sell_price')+': ${fmt(item.sell)}  ${t('currency_sym')}`,'#2dd17e');
    toast(`"${name}" — '+t('inv_sell_price')+': ${fmt(item.sell)}  ${t('currency_sym')}`,{icon:'ti-package',title:t('inv_new_title')})
  }
  _editingItemId=null;
  closeModal('m-item');renderItems();
  updateStats();
  broadcastChange('items', { name });
}finally{
  setBtnLoading(btn,false);
}}
function editItem(id){
  const item=DB.items.find(x=>x.id===id);if(!item)return;
  _editingItemId=id;
  G('fi-code').value=item.code||'';
  G('fi-barcode').value=item.barcode||'';
  G('fi-name').value=item.name||'';
  G('fi-buy').value=item.buy||'';
  G('fi-sell').value=item.sell||'';
  G('fi-qty').value=item.qty||'';
  G('fi-reorder').value=item.reorder||'';
  G('fi-unit').value=item.unit||'قطعة';
  G('fi-cat').value=item.cat||'عام';
  G('m-item-title').textContent=t('inv_edit');
  G('m-item-save-btn').innerHTML='<i class="ti ti-device-floppy"></i> '+t('pur_save_edits');
  const prev=G('fi-img-preview');
  if(prev){
    if(item.image){
      prev.innerHTML=`<img src="${item.image}" style="width:100%;height:100%;object-fit:cover;border-radius:8px">`;
    }else{
      prev.innerHTML=`<i class="ti ti-photo" style="font-size:24px;color:var(--text-muted)"></i>`;
    }
  }
  openModal('m-item');
}
function filterItems(q){renderItems(q)}
function renderItems(q=''){
  const term=normalizeText(q);
  const catFilter=G('inv-cat-filter')?.value||'';
  const stockFilter=G('inv-stock-filter')?.value||'';
  const catSel=G('inv-cat-filter');
  if(catSel&&!catSel._populated){
    const cats=[...new Set(DB.items.map(x=>x.cat).filter(Boolean))].sort();
    catSel.innerHTML='<option value="">'+t('hrm_all_departments')+'</option>'+cats.map(c=>`<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');
    catSel._populated=true;
  }
  let full=DB.items;
  if(term){full=full.filter(x=>normalizeText(x.name).includes(term)||normalizeText(x.barcode).includes(term)||normalizeText(x.code).includes(term)||normalizeText(x.cat).includes(term))}
  if(catFilter){full=full.filter(x=>x.cat===catFilter)}
  if(stockFilter==='out'){full=full.filter(x=>x.qty===0)}
  else if(stockFilter==='low'){full=full.filter(x=>x.qty>0&&x.qty<=x.reorder)}
  else if(stockFilter==='ok'){full=full.filter(x=>x.qty>x.reorder)}
  const {data,pages,page,start}=getPageData('inv-tb', full);
  const tb=G('inv-tb');
  if(!tb) return;
  if(!full.length){tb.innerHTML=emptyRow(10,term?t('lbl_search_results'):t('inv_empty'));renderPag('inv-tb',0,renderItems);return}
  tb.innerHTML=data.map(x=>{
    const low=x.qty<=x.reorder;
    const diff=x.qty - x.reorder;
    const diffLabel = diff >= 0 ? `<span class="text-green">+${fmt(diff)}</span>` : `<span class="text-red">${fmt(diff)}</span>`;
    const st=x.qty===0?'<span class="badge b-red">نفدت</span>':low?'<span class="badge b-amber">منخفض</span>':'<span class="badge b-green">جيد</span>';
    return`<tr>
      <td><input type="checkbox" data-id="${x.id}" onchange="toggleBatchItem(this)" ${_batchSelected.has(x.id)?'checked':''}></td>
      <td class="td-mono">${x.code}</td>
      <td class="td-bold">${x.name}</td>
      <td style="color:var(--text-muted)">${x.cat}</td>
      <td class="td-mono">${fmt(x.buy)}</td>
      <td class="td-mono" style="color:var(--green);font-weight:700">${fmt(x.sell)}</td>
      <td class="td-mono" style="${low?'color:var(--amber);font-weight:700':''}">${x.qty}</td>
      <td class="td-mono">${diffLabel}</td>
      <td style="color:var(--text-muted)">${x.unit}</td>
      <td>${st}</td>
      <td><div class="td-actions"><button class="btn btn-sm btn-icon" data-ctx-edit onclick="editItem(${x.id})" title="تعديل"><i class="ti ti-pencil"></i></button><button class="btn btn-sm btn-secondary btn-icon" onclick="printItemLabel(${x.id})" title="طباعة ملصق"><i class="ti ti-barcode"></i></button><button class="btn btn-sm btn-danger btn-icon" data-ctx-delete onclick="delItem(${x.id})" title="حذف"><i class="ti ti-trash"></i></button></div></td>
    </tr>`
  }).join('');
  renderPag('inv-tb',full.length,renderItems)
}
function delItem(id){
  const it=DB.items.find(x=>x.id===id);
  confirmDanger(`حذف الصنف "${it?.name}"؟`).then(ok=>{
    if(!ok)return;
    addLog(t('inv_delete'),`"${it?.name}"`,'#f05454');
    DB.items=DB.items.filter(x=>x.id!==id);
    saveState();
    renderItems();updateStats();
    broadcastChange('items', { id, deleted: true });
  });
}

function renderUsers(search=''){
  const tb=G('user-tb');
  if(!tb)return;
  if(!requireAdmin()){tb.innerHTML=emptyRow(4,t('users_admin_only'));renderPag('user-tb',0,renderUsers);return}
  const term=normalizeText(search);
  const roleFilter=G('user-role-filter')?.value||'';
  const statusFilter=G('user-status-filter')?.value||'';
  let full=DB.users;
  if(term){full=full.filter(u=>normalizeText(u.name).includes(term)||normalizeText(u.username).includes(term)||normalizeText(u.role).includes(term))}
  if(roleFilter){full=full.filter(u=>u.role===roleFilter)}
  if(statusFilter){full=full.filter(u=>{const st=u.status||(u.isActive===false?'inactive':'active');return st===statusFilter})}
  if(!full.length){tb.innerHTML=emptyRow(4,term?t('lbl_search_results'):t('users_empty'));renderPag('user-tb',0,renderUsers);return}
  const {data}=getPageData('user-tb', full);
  tb.innerHTML=data.map(u=>{
    const status = u.status || (u.isActive === false ? 'inactive' : 'active');
    const roleLabel = u.role==='admin'||u.role==='system_admin'?'مشرف':u.role==='sales'?'مبيعات':u.role==='inventory'?'مخازن':'مستخدم';
    const roleClass = u.role==='admin'||u.role==='system_admin'?'b-purple':u.role==='sales'?'b-blue':u.role==='inventory'?'b-teal':'b-gray';
    const statusClass = status==='active'?'b-green':status==='suspended'?'b-red':'b-amber';
    const statusLabel = status==='active'?'نشط':status==='suspended'?'موقوف':'غير نشط';
    const lastLogin = u.lastLogin ? new Date(u.lastLogin).toLocaleDateString('ar-LY') : '—';
    const loginCount = u.loginAttempts?.count || 0;
    return `<tr>
      <td class="td-bold">${u.name || '-'}</td>
      <td class="td-mono">${u.username || '-'}</td>
      <td><span class="badge ${roleClass}">${roleLabel}</span></td>
      <td><span class="badge ${statusClass}">${statusLabel}</span></td>
      <td style="font-size:11px;color:var(--text-muted)">${lastLogin}</td>
      <td><div class="td-actions">
        <button class="btn btn-sm btn-danger btn-icon" onclick="delUser('${u.id || ''}')" title="حذف"><i class="ti ti-trash"></i></button>
      </div></td>
    </tr>`;
  }).join('');
  renderPag('user-tb',full.length,renderUsers)
}
function renderSettings(){
  const co=currentCompany();
  const el=G('settings-company-name');
  if(el) el.textContent = co?.name || t('company_default');
  const sel=G('settings-company-select');
  if(sel){
    popSel('settings-company-select',DB.companies,'id','name','-- اختر شركة --');
    sel.value=DB.companyId||'';
  }
  loadCloudBackups();
  loadSessions();
}
function openCompanyModal(id){
  if(!requireAdmin()) return;
  editingCompanyId = id===null ? null : id || DB.companyId;
  const title = G('m-company-title');
  const co = editingCompanyId===null ? {name:'',address:'',phone:'',note:'',logo:'',taxNo:''} : currentCompany();
  if(title) title.textContent = editingCompanyId===null ? t('company_add') : t('company_update');
  G('co-name').value=co.name||'';
  G('co-address').value=co.address||'';
  G('co-phone').value=co.phone||'';
  G('co-note').value=co.note||'';
  if(G('co-tax-no'))G('co-tax-no').value=co.taxNo||'';
  window._pendingLogo=co.logo||'';
  const preview=G('co-logo-preview');
  if(preview){
    if(co.logo) preview.innerHTML='<img src="'+co.logo+'" style="width:100%;height:100%;object-fit:contain">';
    else preview.innerHTML='<i class="ti ti-photo" style="font-size:24px;color:var(--text-muted)"></i>';
  }
  const input=G('co-logo-input');
  if(input) input.value='';
  openModal('m-company');
}
function switchCompany(id){
  if(!id || Number(id)===DB.companyId) return;
  saveCompanyData();
  DB.companyId = Number(id);
  loadCompanyData();
  saveState();
  renderCompany();
  renderSettings();
  refreshCurrentPage();
}
function refreshCurrentPage(){
  const active=document.querySelector('.page.on');
  if(!active) return;
  const pg=active.id.replace('p-','');
  if(pg==='dash') renderDash();
  if(pg==='inventory') renderItems();
  if(pg==='sales') renderSales();
  if(pg==='returns') renderRets();
  if(pg==='purchases') renderPurs();
  if(pg==='suppay') renderSupPays(G('spay-search')?.value||'');
  if(pg==='customers') renderCusts();
  if(pg==='suppliers') renderSups();
  if(pg==='soa'){updateSOASelector();G('soa-out').innerHTML=''}
  if(pg==='finance') renderFin();
  if(pg==='pl') renderPL();
  if(pg==='users') renderUsers();
}
function openUsersPage(){
  showPage('users');
}
async function saveUser(){
  const btn=G('m-user')?.querySelector('.btn-primary');setBtnLoading(btn,true);
  try{
  if(!requireAdmin())return;
  const username=G('uu-username').value.trim();
  const password=G('uu-pass').value;
  const name=G('uu-name').value.trim();
  const role=G('uu-role').value;
  if(!username||!password||!name){toast(t('inv_fill_required'),'error');return}
  try{
    const resp=await fetch(`${API_BASE_URL}/users`,{
      method:'POST',
      headers:{...getAuthHeaders(),'Content-Type':'application/json'},
      body:JSON.stringify({username,password,name,role,companyId:currentUser?.companyId})
    });
    const payload=await resp.json();
    if(!resp.ok){
      toast(payload?.message || payload?.status || t('user_create_fail'),'error');
      return;
    }
    const createdUser = payload.user || payload.data || payload;
    if(createdUser){
      DB.users.unshift({
        ...createdUser,
        id: createdUser.id || createdUser._id,
        role: createdUser.role || role
      });
    }
    addLog('إضافة مستخدم',`"${name}" — ${role}`,'#9b72f7');
    closeModal('m-user');
    renderUsers();
    broadcastChange('users', { name, role });
    toast(t('user_add')+' '+name)
  }catch(e){
    console.warn('saveUser failed',e);
    toast(t('user_conn_fail'),'error');
  }
}finally{
  setBtnLoading(btn,false);
}}
async function delUser(id){
  if(!requireAdmin())return;
  if(!id){toast(t('user_conn_fail'),'error');return}
  const user=DB.users.find(u=>String(u.id||u._id)===String(id));
  if(!user)return;
  if(String(user.id||user._id)===String(currentUser?.id || currentUser?._id)){toast(t('user_cannot_delete_self'),'error');return}
  const admins=DB.users.filter(u=>['admin','system_admin'].includes(String(u.role).toLowerCase()));
  if(['admin','system_admin'].includes(String(user.role).toLowerCase()) && admins.length===1){toast(t('user_keep_admin'),'error');return}
  const confirmed=await confirmDanger(`حذف المستخدم "${user.name}"؟`);if(!confirmed)return;
  try{
    const resp=await fetch(`${API_BASE_URL}/admin/users/${id}`,{
      method:'DELETE',
      headers:{...getAuthHeaders(),'Content-Type':'application/json'}
    });
    const payload=await resp.json();
    if(!resp.ok){
      toast(payload?.message || t('user_create_fail'),'error');
      return;
    }
    DB.users=DB.users.filter(u=>String(u.id||u._id)!==String(id));
    addLog('حذف مستخدم',`"${user.name}"`,'#f05454');
    renderUsers();
    broadcastChange('users', { id, deleted: true });
    toast(t('user_deleted')+' '+user.name)
  }catch(e){
    console.warn('delUser failed',e);
    toast(t('user_conn_fail'),'error');
  }
}

/* ═══ CUSTOMERS ═══ */
function saveCust(){
  const btn=G('m-cust')?.querySelector('.btn-primary');setBtnLoading(btn,true);
  try{
  const name=G('cu-name').value.trim();if(!name){toast(t('cust_name_ph'),'error');return}
  const openBal=parseFloat(G('cu-bal').value)||0;
  const id=Date.now();
  DB.custs.push({id,name,phone:G('cu-phone').value,addr:G('cu-addr').value,openBal});
  addLog('إضافة زبون',`"${name}" رصيد افتتاحي: ${fmt(openBal)}  ${t('currency_sym')}`,'#9b72f7');
  closeModal('m-cust');renderCusts();
  broadcastChange('customers', { id, name });
  toast(`"${name}" — ${t('col_opening_balance')}: ${fmt(openBal)}  ${t('currency_sym')}`,{icon:'ti-user',title:t('cust_new')})
}finally{
  setBtnLoading(btn,false);
}}
function renderCusts(search=''){
  const tb=G('cust-tb');
  const term=normalizeText(search);
  const full=term?DB.custs.filter(c=>normalizeText(c.name).includes(term)||normalizeText(c.phone).includes(term)||normalizeText(c.addr).includes(term)):DB.custs;
  if(!full.length){tb.innerHTML=emptyRow(6,term?t('lbl_search_results'):t('nav_customers'));renderPag('cust-tb',0,renderCusts);return}
  const {data}=getPageData('cust-tb', full);
  tb.innerHTML=data.map(c=>{
    const recv=custReceivable(c);
    const totalSales=DB.invs.filter(i=>i.custId===c.id).reduce((s,i)=>s+i.total,0) + (parseFloat(c.openBal)||0);
    return`<tr>
      <td class="td-bold">${c.name}</td>
      <td class="td-mono">${c.phone||'—'}</td>
      <td class="td-mono" style="color:${recv>0?'var(--red)':'var(--green)'};font-weight:700">${fmt(recv)} ${t('currency_sym')}</td>
      <td class="td-mono">${fmt(totalSales)} ${t('currency_sym')}</td>
      <td><span class="badge b-green">نشط</span></td>
      <td><button class="btn btn-sm" onclick="openSOA(${c.id})"><i class="ti ti-file-description"></i> كشف</button></td>
    </tr>`
  }).join('');
  renderPag('cust-tb',full.length,renderCusts)
}
function openSOA(cid){document.querySelector('.nav-item[data-page="soa"]').click();setTimeout(()=>{G('soa-type').value='customer';updateSOASelector();G('soa-cust').value=cid;renderSOA()},60)}

/* ═══ SUPPLIERS ═══ */
function saveSup(){
  const btn=G('m-sup')?.querySelector('.btn-primary');setBtnLoading(btn,true);
  try{
  const name=G('su-name').value.trim();if(!name){toast(t('sup_name_ph'),'error');return}
  DB.sups.push({id:Date.now(),name,phone:G('su-phone').value,addr:G('su-addr').value});
  addLog('إضافة مورد',`"${name}"`,'#22d3ee');
  closeModal('m-sup');renderSups();
  broadcastChange('suppliers', { name });
  toast('"'+name+'"',{icon:'ti-truck',title:t('sup_new')})
}finally{
  setBtnLoading(btn,false);
}}
function renderSups(search=''){
  const tb=G('sup-tb');
  const term=normalizeText(search);
  const full=term?DB.sups.filter(s=>normalizeText(s.name).includes(term)||normalizeText(s.phone).includes(term)||normalizeText(s.addr).includes(term)):DB.sups;
  if(!full.length){tb.innerHTML=emptyRow(6,term?t('lbl_search_results'):t('nav_suppliers'));renderPag('sup-tb',0,renderSups);return}
  const {data}=getPageData('sup-tb', full);
  tb.innerHTML=data.map(s=>{
    const bal=supBalance(s);
    const totalPur=DB.purs.filter(p=>p.supId===s.id).reduce((sum,p)=>sum+p.total,0);
    return`<tr>
      <td class="td-bold">${s.name}</td>
      <td class="td-mono">${s.phone||'—'}</td>
      <td style="color:var(--text-muted)">${s.addr||'—'}</td>
      <td class="td-mono" style="color:${bal>0?'var(--red)':'var(--green)'};font-weight:700">${fmt(bal)} ${t('currency_sym')}</td>
      <td class="td-mono">${fmt(totalPur)} ${t('currency_sym')}</td>
      <td><span class="badge b-green">نشط</span></td>
    </tr>`
  }).join('');
  renderPag('sup-tb',full.length,renderSups)
}

/* ═══ BATCH OPERATIONS ═══ */
const _batchSelected = new Set();

function toggleSelectAll(cb) {
  const checkboxes = document.querySelectorAll('#inv-tb input[type="checkbox"]');
  checkboxes.forEach(ch => {
    ch.checked = cb.checked;
    const id = parseInt(ch.dataset.id);
    if (cb.checked) _batchSelected.add(id); else _batchSelected.delete(id);
  });
  updateBatchBar();
}

function toggleBatchItem(cb) {
  const id = parseInt(cb.dataset.id);
  if (cb.checked) _batchSelected.add(id); else _batchSelected.delete(id);
  const allCh = document.querySelectorAll('#inv-tb input[type="checkbox"]');
  const selAll = G('inv-select-all');
  if (selAll) selAll.checked = allCh.length > 0 && [...allCh].every(c => c.checked);
  updateBatchBar();
}

function updateBatchBar() {
  const bar = G('batch-bar');
  const cnt = G('batch-count');
  if (!bar) return;
  if (_batchSelected.size > 0) {
    bar.style.display = 'flex';
    if (cnt) cnt.textContent = _batchSelected.size + ' محدد';
  } else {
    bar.style.display = 'none';
  }
}

function clearBatchSelection() {
  _batchSelected.clear();
  const checkboxes = document.querySelectorAll('#inv-tb input[type="checkbox"]');
  checkboxes.forEach(ch => ch.checked = false);
  const selAll = G('inv-select-all');
  if (selAll) selAll.checked = false;
  updateBatchBar();
}

async function batchDeleteItems(e) {
  const btn=e.target;setBtnLoading(btn,true);
  try{
  if (_batchSelected.size === 0) return;
  const ok=await confirmDanger(`حذف ${_batchSelected.size} صنف؟`, 'تأكيد الحذف المجمع');if(!ok)return;
  _batchSelected.forEach(id => {
    const it = DB.items.find(x => x.id === id);
    if (it) addLog(t('inv_delete'), `"${it.name}"`, '#f05454');
  });
  DB.items = DB.items.filter(x => !_batchSelected.has(x.id));
  clearBatchSelection();
  saveState();
  renderItems();
  updateStats();
  toast('تم حذف الأصناف المحددة', 'success');
}finally{
  setBtnLoading(btn,false);
}}

function batchUpdateCategory() {
  if (_batchSelected.size === 0) return;
  const newCat = prompt('اسم الفئة الجديدة:');
  if (!newCat || !newCat.trim()) return;
  DB.items.forEach(x => { if (_batchSelected.has(x.id)) x.cat = newCat.trim(); });
  clearBatchSelection();
  saveState();
  renderItems();
  toast('تم تحديث فئة الأصناف المحددة', 'success');
}

function batchUpdatePrice() {
  if (_batchSelected.size === 0) return;
  const factor = prompt('معامل تعديل السعر (مثال: 1.1 لزيادة 10%):');
  const f = parseFloat(factor);
  if (isNaN(f) || f <= 0) return;
  DB.items.forEach(x => { if (_batchSelected.has(x.id)) x.sell = Math.round(x.sell * f * 1000) / 1000; });
  clearBatchSelection();
  saveState();
  renderItems();
  toast('تم تعديل أسعار الأصناف المحددة', 'success');
}

/* ═══ DATA IMPORT ═══ */
function importItemsCSV(){
  const input=G('import-csv-input');
  if(input)input.click();
}
function handleCSVImport(input){
  const file=input.files[0];
  if(!file)return;
  const reader=new FileReader();
  reader.onload=function(e){
    try{
      const text=e.target.result;
      const lines=text.split('\n').filter(l=>l.trim());
      if(lines.length<2){toast('الملف فارغ أو بدون بيانات','error');return}
      const headers=lines[0].split(',').map(h=>h.trim().replace(/"/g,'').toLowerCase());
      const nameIdx=headers.findIndex(h=>h.includes('name')||h.includes('اسم'));
      const codeIdx=headers.findIndex(h=>h.includes('code')||h.includes('كود'));
      const catIdx=headers.findIndex(h=>h.includes('cat')||h.includes('فئ'));
      const buyIdx=headers.findIndex(h=>h.includes('buy')||h.includes('شراء'));
      const sellIdx=headers.findIndex(h=>h.includes('sell')||h.includes('بيع'));
      const qtyIdx=headers.findIndex(h=>h.includes('qty')||h.includes('رصيد'));
      const unitIdx=headers.findIndex(h=>h.includes('unit')||h.includes('وحده'));
      const reorderIdx=headers.findIndex(h=>h.includes('reorder')||h.includes('حد'));
      if(nameIdx===-1){toast('العمود "اسم الصنف" مطلوب','error');return}
      let imported=0;
      for(let i=1;i<lines.length;i++){
        const cols=lines[i].split(',').map(c=>c.trim().replace(/"/g,''));
        const name=cols[nameIdx];
        if(!name)continue;
        DB.items.push({
          id:Date.now()+i,
          code:cols[codeIdx]||genUniqueItemCode(),
          name,
          cat:cols[catIdx]||'',
          buy:parseFloat(cols[buyIdx])||0,
          sell:parseFloat(cols[sellIdx])||0,
          qty:parseFloat(cols[qtyIdx])||0,
          unit:cols[unitIdx]||'',
          reorder:parseFloat(cols[reorderIdx])||0,
          barcode:'',
          image:''
        });
        imported++;
      }
      saveState();renderItems();updateStats();
      toast(`تم استيراد ${imported} صنف بنجاح`,'success');
    }catch(err){toast('خطأ في قراءة الملف: '+err.message,'error')}
  };
  reader.readAsText(file);
  input.value='';
}

function handleItemImage(input){
  const file=input.files[0];
  if(!file)return;
  if(file.size>2*1024*1024){toast('حجم الصورة يتجاوز 2MB','error');return}
  const reader=new FileReader();
  reader.onload=function(e){
    const prev=G('fi-img-preview');
    if(prev) prev.innerHTML=`<img src="${e.target.result}" style="width:100%;height:100%;object-fit:cover;border-radius:8px">`;
  };
  reader.readAsDataURL(file);
}

function clearItemImage(){
  const prev=G('fi-img-preview');
  if(prev) prev.innerHTML=`<i class="ti ti-photo" style="font-size:24px;color:var(--text-muted)"></i>`;
  const input=G('fi-img-input');
  if(input) input.value='';
}



/* ═══════════════════════════════════════════════
   sales.js
══════════════════════════════════════════════ */

﻿/* ═══ SALES INVOICE ═══ */
let _editingInvId=null;
function onSiItemSelect(){autoSellPrice()}
function autoSellPrice(){
  const id=parseInt(G('si-item-sel').value);
  const item=DB.items.find(x=>x.id===id);
  if(item){G('si-price').value=item.sell;calcSiLine()}
}
function calcSiLine(){
  const q=parseFloat(G('si-qty').value)||0,p=parseFloat(G('si-price').value)||0,d=parseFloat(G('si-disc').value)||0;
  G('si-ltot').value=fmt(Math.max(0,q*p-d))
}
function addSiLine(){
  const id=parseInt(G('si-item-sel').value);
  const item=DB.items.find(x=>x.id===id);
  if(!item){toast(t('inv_choose_item'),'error');return}
  const qty=parseFloat(G('si-qty').value)||1;
  const price=parseFloat(G('si-price').value)||item.sell;
  const disc=parseFloat(G('si-disc').value)||0;
  if(qty<=0){toast(t('inv_enter_qty'),'error');return}
  if(price<=0){toast(t('inv_enter_price'),'error');return}
  if(disc<0){toast(t('inv_neg_discount'),'error');return}
  if(disc>qty*price){toast(t('inv_discount_exceeds'),'error');return}
  if(qty>item.qty){toast(t('sales_stock_warning'),'info')}
  _siL.push({itemId:id,name:item.name,qty,price,disc,buyPrice:item.buy,total:Math.max(0,qty*price-disc)});
  renderSiL();
  G('si-qty').value='1';G('si-disc').value='0';G('si-price').value='';G('si-ltot').value='';G('si-item-sel').value='';if(G('si-item-search'))G('si-item-search').value='';filterItemSelect('','si');
}
function renderSiL(){
  const tb=G('si-lines-tb');
  if(!tb) return;
  tb.innerHTML=_siL.length?_siL.map((l,i)=>`<tr>
    <td class="td-bold">${escapeHtml(l.name)}</td>
    <td class="td-mono">${l.qty}</td>
    <td class="td-mono">${fmt(l.price)}</td>
    <td class="td-mono" style="color:var(--red)">${l.disc>0?fmt(l.disc):'—'}</td>
    <td class="td-mono" style="color:var(--green);font-weight:700">${fmt(l.total)}</td>
    <td><button class="btn btn-sm btn-danger btn-icon" onclick="_siL.splice(${i},1);renderSiL()"><i class="ti ti-x"></i></button></td>
  </tr>`).join(''):emptyRow(6,t('inv_add_item'));
  const tot=_siL.reduce((s,l)=>s+l.total,0);
  G('si-tot').textContent=fmt(tot)+' '+t('currency_sym');
  G('si-tafseet').textContent=tot>0?numToWords(tot):'—'
}
function saveInv(){
  const btn=G('si-inv-save-btn');setBtnLoading(btn,true);
  try {
    if(!G('si-cust').value){toast(t('sales_choose_customer'),'error');return}
    if(!_siL.length){toast(t('inv_add_item'),'error');return}
    const total=_siL.reduce((s,l)=>s+l.total,0);
    const custId=parseInt(G('si-cust').value);
    const cust=DB.custs.find(x=>x.id===custId);
    const num=G('si-num').value,date=G('si-date').value;
    if(_editingInvId){
      const inv=DB.invs.find(x=>x.id===_editingInvId);
      if(!inv){toast(t('sales_not_found'),'error');return}
      inv.custId=custId;inv.custName=cust?.name||'—';inv.date=date;
      inv.lines=[..._siL];inv.total=total;
      addLog(t('sales_edit'),`${num} — الزبون "${cust?.name}" — ${fmt(total)} ${t('currency_sym')}`,'#f5a623');
      toast(t('sales_edited')+' '+num,'success',{title:t('inv_updated_done'),icon:'ti-receipt'});
      _editingInvId=null;
    } else {
      DB.invs.push({
        id:DB.cI,num,custId,custName:cust?.name||'—',date,
        lines:[..._siL],total,
        dlvStatus:'pending',
        createdAt:date
      });
      DB.cI++;
      addLog(t('sales_created'),`${num} — الزبون "${cust?.name}" — ${fmt(total)} ${t('currency_sym')} — لا أثر على الخزينة أو المخزون حتى الآن`,'#4f8ef7');
      toast(num,'success',{title:t('sales_new_invoice'),icon:'ti-receipt',duration:4000})
    }
    saveState();
    closeModal('m-invoice');renderSales();updateStats();
    broadcastChange('sales', { num, custName: cust?.name, total });
  } finally {
    setBtnLoading(btn,false);
  }
}
function editInv(invId){
  if(!requireAdmin())return;
  const inv=DB.invs.find(x=>x.id===invId);if(!inv)return;
  if(inv.dlvStatus==='delivered'){toast(t('sales_no_deliver'),'error');return}
  _editingInvId=invId;
  _siL=[...inv.lines];
  G('si-num').value=inv.num;
  G('si-cust').value=inv.custId||'';
  G('si-date').value=inv.date;
  G('si-inv-title').innerHTML='<i class="ti ti-receipt" style="color:var(--accent)"></i> '+t('sales_edit')+' '+escapeHtml(inv.num);
  G('si-inv-save-btn').innerHTML='<i class="ti ti-device-floppy"></i> '+t('pur_save_edits');
  renderSiL();
  openModal('m-invoice');
}
function renderSales(search=''){
  const filter=G('sal-filter')?.value||'';
  const term=normalizeText(search);
  const dateFrom=G('sal-date-from')?.value||'';
  const dateTo=G('sal-date-to')?.value||'';
  let full=[...DB.invs].reverse();
  if(filter==='delivered')full=full.filter(i=>i.dlvStatus==='delivered');
  else if(filter==='pending')full=full.filter(i=>i.dlvStatus==='pending');
  else if(filter==='paid')full=full.filter(i=>invRemaining(i)<=0.001);
  else if(filter==='partial')full=full.filter(i=>{const p=invPaid(i);return p>0&&p<i.total-0.001});
  if(dateFrom){full=full.filter(i=>i.date>=dateFrom)}
  if(dateTo){full=full.filter(i=>i.date<=dateTo)}
  if(term){full=full.filter(i=>normalizeText(i.num).includes(term)||normalizeText(i.custName).includes(term)||normalizeText(i.date).includes(term));}
  const {data}=getPageData('sal-tb', full);
  const tb=G('sal-tb');
  if(!full.length){tb.innerHTML=emptyRow(9,term?t('lbl_search_results'):t('dash_no_invoices'));renderPag('sal-tb',0,renderSales);return}
  tb.innerHTML=data.map(inv=>{
    const paid=invPaid(inv);
    const rem=invRemaining(inv);
    return`<tr>
      <td class="td-bold" style="color:var(--accent)">${escapeHtml(inv.num)}</td>
      <td>${escapeHtml(inv.custName)}</td>
      <td class="td-mono">${inv.date}</td>
      <td class="td-mono" style="font-weight:700">${fmt(inv.total)} ${t('currency_sym')}</td>
      <td class="td-mono" style="color:var(--green)">${fmt(paid)} ${t('currency_sym')}</td>
      <td class="td-mono" style="color:${rem>0?'var(--red)':'var(--text-muted)'}">${rem>0?fmt(rem)+' '+t('currency_sym'):'✓'}</td>
      <td>${invDlvLabel(inv.dlvStatus)}</td>
      <td>${invPayStatus(inv)}</td>
      <td><div class="td-actions">
        <button class="btn btn-sm btn-icon" data-ctx-view onclick="viewInv(${inv.id})" title="عرض"><i class="ti ti-eye"></i></button>
        ${['admin','system_admin'].includes(currentUser?.role)&&inv.dlvStatus==='pending'?`<button class="btn btn-sm btn-icon" data-ctx-edit onclick="editInv(${inv.id})" title="تعديل"><i class="ti ti-pencil"></i></button>`:''}
        ${inv.dlvStatus==='pending'?`<button class="btn btn-sm btn-amber btn-icon" onclick="openDeliver(${inv.id})" title="تسليم"><i class="ti ti-truck-delivery"></i></button>`:''}
        ${rem>0.001?`<button class="btn btn-sm btn-success btn-icon" onclick="openCollect(${inv.id})" title="استلام دفعة"><i class="ti ti-cash"></i></button>`:''}
      </div></td>
    </tr>`
  }).join('');
  renderPag('sal-tb',full.length,renderSales)
}

/* ═══ COLLECT PAYMENT FROM CUSTOMER ═══ */
function openCollect(invId){
  const inv=DB.invs.find(x=>x.id===invId);if(!inv)return;
  const paid=invPaid(inv),rem=invRemaining(inv);
  G('col-inv-id').value=invId;
  G('col-date').value=today();
  G('col-amt').value=fmt(rem);
  G('col-notes').value='';
  G('col-check-row').style.display='none';
  document.querySelectorAll('#col-pay .pay-chip').forEach((c,i)=>c.classList.toggle('sel',i===0));
  _colPay='cash';
  const custTotalSold=DB.invs.filter(i=>i.custId===inv.custId).reduce((s,i)=>s+i.total,0);
  const custOpenBal=parseFloat(DB.custs.find(c=>c.id===inv.custId)?.openBal)||0;
  const custTotalPaid=DB.payments.filter(p=>p.custId===inv.custId).reduce((s,p)=>s+p.amount,0);
  const custBalance=custTotalSold+custOpenBal-custTotalPaid;
  const custInvs=DB.invs.filter(i=>i.custId===inv.custId);
  const unpaidInvs=custInvs.filter(i=>invRemaining(i)>0.001).length;
  G('collect-inv-info').innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px">
      <div><div style="font-size:11px;color:var(--text-muted)">الفاتورة</div><div style="font-weight:700;color:var(--accent)">${inv.num}</div></div>
      <div><div style="font-size:11px;color:var(--text-muted)">الزبون</div><div style="font-weight:600">${inv.custName}</div></div>
      <div><div style="font-size:11px;color:var(--text-muted)">الإجمالي</div><div style="font-weight:700">${fmt(inv.total)} ${t('currency_sym')}</div></div>
      <div><div style="font-size:11px;color:var(--text-muted)">المحصَّل سابقاً</div><div style="font-weight:700;color:var(--green)">${fmt(paid)} ${t('currency_sym')}</div></div>
      <div><div style="font-size:11px;color:var(--text-muted)">المتبقي</div><div style="font-weight:700;color:var(--red)">${fmt(rem)} ${t('currency_sym')}</div></div>
    </div>
    <div class="progress-bar" style="margin-top:8px"><div class="progress-fill" style="width:${Math.min(100,(paid/inv.total)*100).toFixed(1)}%"></div></div>
    <div style="margin-top:10px;padding:8px 10px;background:var(--bg);border-radius:var(--r);font-size:11px;display:flex;gap:16px;flex-wrap:wrap">
      <span>إجمالي مبيعات الزبون: <strong>${fmt(custTotalSold)} ${t('currency_sym')}</strong></span>
      <span>رصيد افتتاحي: <strong>${fmt(custOpenBal)} ${t('currency_sym')}</strong></span>
      <span>محصَّل ككل: <strong style="color:var(--green)">${fmt(custTotalPaid)} ${t('currency_sym')}</strong></span>
      <span>الذمة الإجمالية: <strong style="color:${custBalance>0?'var(--red)':'var(--green)'}">${fmt(custBalance)} ${t('currency_sym')}</strong></span>
      ${unpaidInvs>1?`<span style="color:var(--amber)">⚠ ${unpaidInvs} فواتير غير مسددة</span>`:''}
    </div>`;
  openModal('m-collect')
}
function savePayment(){
  const btn=G('m-collect')?.querySelector('.btn-primary');setBtnLoading(btn,true);
  try {
    const invId=parseInt(G('col-inv-id').value);
    const inv=DB.invs.find(x=>x.id===invId);if(!inv)return;
    const amount=parseFloat(G('col-amt').value)||0;
    if(amount<=0){toast(t('pay_enter_amount'),'error');return}
    const rem=invRemaining(inv);
    if(amount>rem+0.001){toast(t('pay_enter_amount'),'error');return}
    const date=G('col-date').value;
    const checkNum=_colPay==='check'?G('col-check-num').value:'';
    const pId='PAY-'+String(DB.cPay).padStart(5,'0');
    DB.cPay++;
    DB.payments.push({
      id:pId,invId,custId:inv.custId,custName:inv.custName,
      amount,date,mode:_colPay,checkNum,
      notes:G('col-notes').value,invNum:inv.num
    });
    const modeLabel=_colPay==='cash'?'نقدي':_colPay==='check'?`صك (${checkNum})`:'آجَل';
    addLog(t('pay_receive'),`${pId} — ${inv.num} — ${inv.custName} — ${fmt(amount)} ${t('currency_sym')} — ${modeLabel}`,'#2dd17e');
    saveState();
    closeModal('m-collect');renderSales();updateStats();renderFin();
    broadcastChange('payments', { pId, invId, amount });
    toast(`${fmt(amount)} ${t('currency_sym')} — ${inv.custName}`,'success',{title:t('pay_received'),icon:'ti-cash',duration:4000})
  } finally {
    setBtnLoading(btn,false);
  }
}

async function deletePayment(payId){
  const pay=DB.payments.find(p=>p.id===payId);if(!pay)return;
  const ok=await confirmDanger(`حذف الدفعة ${payId} — ${fmt(pay.amount)} ${t('currency_sym')}؟`);if(!ok)return;
  DB.payments=DB.payments.filter(p=>p.id!==payId);
  addLog('حذف دفعة',`${payId} — ${pay.invNum} — ${fmt(pay.amount)} ${t('currency_sym')}`,'#f05454');
  saveState();
  renderSales();updateStats();renderFin();
  broadcastChange('payments', { payId, deleted: true });
  toast(`${payId} — ${fmt(pay.amount)} ${t('currency_sym')}`,'warning',{title:t('pay_deleted'),icon:'ti-trash'})
  const invId=pay.invId;
  if(invId){const inv=DB.invs.find(x=>x.id===invId);if(inv)viewInv(invId)}
}

/* ═══ STANDALONE COLLECT PAYMENT (from customer) ═══ */
let _col2Pay='cash';

function openCollectStandalone(){
  _col2Pay='cash';
  popSel('col2-cust',DB.custs,'id','name','-- اختر زبون --');
  G('col2-cust').value='';
  G('col2-amt').value='';
  G('col2-date').value=today();
  G('col2-notes').value='';
  G('col2-check-row').style.display='none';
  document.querySelectorAll('#col2-pay .pay-chip').forEach((c,i)=>c.classList.toggle('sel',i===0));
  G('col2-cust-summary').style.display='none';
  G('col2-invs').innerHTML='';
  openModal('m-collect2');
}

function renderCollect2Invs(){
  const custId=parseInt(G('col2-cust').value);
  const summaryEl=G('col2-cust-summary');
  const invsEl=G('col2-invs');
  if(!custId){summaryEl.style.display='none';invsEl.innerHTML='';return}
  const cust=DB.custs.find(x=>x.id===custId);if(!cust)return;

  const totalSold=DB.invs.filter(i=>i.custId===custId).reduce((s,i)=>s+i.total,0);
  const openBal=parseFloat(cust.openBal)||0;
  const totalPaid=DB.payments.filter(p=>p.custId===custId).reduce((s,p)=>s+p.amount,0);
  const balance=totalSold+openBal-totalPaid;
  const unpaidInvs=DB.invs.filter(i=>i.custId===custId&&invRemaining(i)>0.001).sort((a,b)=>a.date.localeCompare(b.date));
  const totalUnpaid=unpaidInvs.reduce((s,i)=>s+invRemaining(i),0);

  summaryEl.style.display='';
  summaryEl.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px">
      <div><div style="font-size:11px;color:var(--text-muted)">الزبون</div><div style="font-weight:700;color:var(--accent)">${cust.name}</div></div>
      <div><div style="font-size:11px;color:var(--text-muted)">إجمالي المبيعات</div><div style="font-weight:700">${fmt(totalSold)} ${t('currency_sym')}</div></div>
      <div><div style="font-size:11px;color:var(--text-muted)">الرصيد الافتتاحي</div><div style="font-weight:700">${fmt(openBal)} ${t('currency_sym')}</div></div>
      <div><div style="font-size:11px;color:var(--text-muted)">محصَّل سابقاً</div><div style="font-weight:700;color:var(--green)">${fmt(totalPaid)} ${t('currency_sym')}</div></div>
      <div><div style="font-size:11px;color:var(--text-muted)">المتبقي</div><div style="font-weight:700;color:${balance>0?'var(--red)':'var(--green)'}">${fmt(balance)} ${t('currency_sym')}</div></div>
    </div>`;

  if(!unpaidInvs.length){
    invsEl.innerHTML='<div style="text-align:center;padding:16px;color:var(--text-muted);font-size:13px"><i class="ti ti-check-circle" style="font-size:24px;display:block;margin-bottom:8px;color:var(--green)"></i>'+t('col_all_paid')+'</div>';
    G('col2-amt').value='';
    return;
  }

  invsEl.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;font-size:12px">
      <span>فواتير غير مسددة: <strong style="color:var(--red)">${fmt(totalUnpaid)} ${t('currency_sym')}</strong></span>
      <span>${unpaidInvs.length} فاتورة</span>
    </div>
    <div class="tbl-wrap"><table style="width:100%;font-size:12px;border-collapse:collapse">
      <thead><tr style="border-bottom:2px solid var(--line)">
        <th style="text-align:right;padding:6px"><label style="cursor:pointer"><input type="checkbox" class="col2-select-all" onchange="toggleCollect2All(this)" checked> الكل</label></th>
        <th style="text-align:right;padding:6px">الفاتورة</th><th style="text-align:right;padding:6px">التاريخ</th><th style="text-align:right;padding:6px">${t('print_net_total')}</th><th style="text-align:right;padding:6px">المدفوع</th><th style="text-align:right;padding:6px">المتبقي</th>
      </tr></thead>
      <tbody>${unpaidInvs.map(inv=>{
        const rem=invRemaining(inv);
        return`<tr>
          <td style="padding:6px"><input type="checkbox" class="col2-inv-cb" data-inv-id="${inv.id}" data-rem="${rem}" onchange="recalcCollect2Preview()" checked></td>
          <td style="padding:6px;font-weight:600;color:var(--accent)">${inv.num}</td>
          <td style="padding:6px" class="td-mono">${inv.date}</td>
          <td style="padding:6px" class="td-mono">${fmt(inv.total)} ${t('currency_sym')}</td>
          <td style="padding:6px;color:var(--green)" class="td-mono">${fmt(invPaid(inv))} ${t('currency_sym')}</td>
          <td style="padding:6px;color:var(--red);font-weight:700" class="td-mono">${fmt(rem)} ${t('currency_sym')}</td>
        </tr>`
      }).join('')}</tbody>
    </table></div>
    <div style="margin-top:6px;padding:6px 10px;background:var(--bg);border-radius:var(--r);font-size:12px;display:flex;justify-content:space-between">
      <span>إجمالي المتبقي المحدد: <strong style="color:var(--red)" id="col2-total-unpaid">${fmt(totalUnpaid)} ${t('currency_sym')}</strong></span>
      <span>المتبقي بعد الدفع: <strong id="col2-after-pay" style="color:var(--red)">${fmt(totalUnpaid)} ${t('currency_sym')}</strong></span>
    </div>`;
}

function toggleCollect2All(el){
  document.querySelectorAll('.col2-inv-cb').forEach(cb=>cb.checked=el.checked);
  recalcCollect2Preview();
}

function recalcCollect2Preview(){
  const amt=parseFloat(G('col2-amt').value)||0;
  let totalUnpaid=0;
  document.querySelectorAll('.col2-inv-cb:checked').forEach(cb=>{totalUnpaid+=parseFloat(cb.dataset.rem)||0});
  const el1=G('col2-total-unpaid');if(el1)el1.textContent=fmt(totalUnpaid)+' '+t('currency_sym');
  const el2=G('col2-after-pay');if(el2){
    const after=Math.max(0,totalUnpaid-amt);
    el2.textContent=fmt(after)+' '+t('currency_sym');
    el2.style.color=after>0?'var(--red)':'var(--green)';
  }
}

function saveCollect2(){
  const btn=G('m-collect2')?.querySelector('.btn-primary');setBtnLoading(btn,true);
  try {
    const custId=parseInt(G('col2-cust').value);
    const cust=DB.custs.find(x=>x.id===custId);if(!cust){toast(t('pay_choose_customer'),'error');return}
    const amount=parseFloat(G('col2-amt').value)||0;
    if(amount<=0){toast(t('pay_enter_amount'),'error');return}
    const date=G('col2-date').value;
    const checkNum=_col2Pay==='check'?G('col2-check-num').value:'';
    const notes=G('col2-notes').value;

    const checkedInvs=[];
    document.querySelectorAll('.col2-inv-cb:checked').forEach(cb=>{
      const invId=parseInt(cb.dataset.invId);
      const inv=DB.invs.find(x=>x.id===invId);
      if(inv)checkedInvs.push({inv,rem:invRemaining(inv)});
    });

    // Distribute payment across checked invoices (oldest first)
    let remaining=amount;
    for(const x of checkedInvs){
      if(remaining<=0)break;
      const share=Math.min(remaining,x.rem);
      if(share>0.001){
        const pId='PAY-'+String(DB.cPay).padStart(5,'0');DB.cPay++;
        DB.payments.push({
          id:pId,invId:x.inv.id,invNum:x.inv.num,
          custId,custName:cust.name,
          amount:share,date,mode:_col2Pay,checkNum,notes
        });
        remaining-=share;
      }
    }

    // If no invoices checked or leftover, record as general payment (linked to cust only)
    if(remaining>0.001){
      const pId='PAY-'+String(DB.cPay).padStart(5,'0');DB.cPay++;
      DB.payments.push({
        id:pId,invId:null,invNum:'عام',
        custId,custName:cust.name,
        amount:remaining,date,mode:_col2Pay,checkNum,notes
      });
    }

    const applied=amount-remaining;
    addLog(t('pay_customer_label'),`"${cust.name}" — ${fmt(applied)} ${t('currency_sym')} — ${_col2Pay}${remaining>0.001?` — ${fmt(remaining)} ${t('currency_sym')} لم تُربط`:''}`,'#2d9f6d');
    saveState();
    closeModal('m-collect2');renderSales();updateStats();renderFin();
    broadcastChange('payments', { custId, amount: applied });
    toast(t('pay_received')+' '+fmt(applied)+' '+t('currency_sym')+' — '+cust.name);
  } finally {
    setBtnLoading(btn,false);
  }
}

function openSettleForCustomer(){
  const unpaidCusts=DB.custs.filter(c=>{
    const totalSold=DB.invs.filter(i=>i.custId===c.id).reduce((s,i)=>s+i.total,0);
    const totalPaid=DB.payments.filter(p=>p.custId===c.id).reduce((s,p)=>s+p.amount,0);
    const openBal=parseFloat(c.openBal)||0;
    return(totalSold+openBal-totalPaid)>0.001;
  });
  if(!unpaidCusts.length){toast(t('pay_no_customers'),'info');return}
  const custNames=unpaidCusts.map((c,i)=>{
    const totalSold=DB.invs.filter(inv=>inv.custId===c.id).reduce((s,inv)=>s+inv.total,0);
    const totalPaid=DB.payments.filter(p=>p.custId===c.id).reduce((s,p)=>s+p.amount,0);
    const openBal=parseFloat(c.openBal)||0;
    const bal=totalSold+openBal-totalPaid;
    return`${i+1}. ${c.name} (${fmt(bal)} ${t('currency_sym')})`;
  }).join('\n');
  const choice=prompt('اختر زبوناً (أدخل الرقم):\n'+custNames);
  if(!choice)return;
  const idx=parseInt(choice)-1;
  if(idx>=0&&idx<unpaidCusts.length){openSettlement(unpaidCusts[idx].id)}
}

/* ═══ SETTLEMENT (multi-invoice) ═══ */
let _settleMode='auto'; // 'auto' or 'manual'

function openSettlement(custId){
  if(!custId){
    const invId=G('view-inv-inv-id')?.value;
    if(invId){const inv=DB.invs.find(x=>x.id===parseInt(invId));if(inv)custId=inv.custId}
  }
  if(!custId){toast(t('pay_choose_customer'),'error');return}
  const cust=DB.custs.find(x=>x.id===custId);if(!cust)return;
  _settleMode='auto';
  G('settle-cust-id').value=custId;
  G('settle-amt').value='';
  G('settle-date').value=today();
  G('settle-reason').value='';
  document.querySelectorAll('#settle-mode-btns .settle-mode').forEach((b,i)=>b.classList.toggle('active',i===0));
  renderSettleInvs(custId);
  openModal('m-settle')
}

function renderSettleInvs(custId){
  const unpaidInvs=DB.invs.filter(i=>i.custId===custId&&invRemaining(i)>0.001).sort((a,b)=>a.date.localeCompare(b.date));
  const totalUnpaid=unpaidInvs.reduce((s,i)=>s+invRemaining(i),0);
  const totalOriginal=DB.invs.filter(i=>i.custId===custId).reduce((s,i)=>s+i.total,0);
  const totalPaid=DB.invs.filter(i=>i.custId===custId).reduce((s,i)=>s+invPaid(i),0);
  const totalSettled=(DB.settlements||[]).filter(s=>s.custId===custId).reduce((s,x)=>s+x.amount,0);
  const cust=DB.custs.find(x=>x.id===custId);
  const openBal=parseFloat(cust?.openBal)||0;
  const amt=parseFloat(G('settle-amt').value)||0;
  const el=G('settle-invs');

  // Customer summary
  const summaryEl=G('settle-cust-summary');
  if(summaryEl&&cust){
    summaryEl.style.display='';
    summaryEl.innerHTML=`
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px">
        <div><div style="font-size:11px;color:var(--text-muted)">الزبون</div><div style="font-weight:700;color:var(--accent)">${cust.name}</div></div>
        <div><div style="font-size:11px;color:var(--text-muted)">الرصيد الافتتاحي</div><div style="font-weight:700">${fmt(openBal)} ${t('currency_sym')}</div></div>
        <div><div style="font-size:11px;color:var(--text-muted)">إجمالي المبيعات</div><div style="font-weight:700">${fmt(totalOriginal)} ${t('currency_sym')}</div></div>
        <div><div style="font-size:11px;color:var(--text-muted)">محصَّل (دفعات)</div><div style="font-weight:700;color:var(--green)">${fmt(totalPaid)} ${t('currency_sym')}</div></div>
        <div><div style="font-size:11px;color:var(--text-muted)">تسويات سابقة</div><div style="font-weight:700;color:var(--amber)">${fmt(totalSettled)} ${t('currency_sym')}</div></div>
      </div>`;
  }
  if(!unpaidInvs.length){
    el.innerHTML='<div style="text-align:center;padding:16px;color:var(--text-muted);font-size:13px"><i class="ti ti-check-circle" style="font-size:24px;display:block;margin-bottom:8px;color:var(--green)"></i>'+t('col_all_paid')+'</div>';
    return;
  }
  const invRows=unpaidInvs.map(inv=>{
    const rem=invRemaining(inv);
    let applied=0;
    if(_settleMode==='auto'&&amt>0){
      applied=totalUnpaid>0?(rem/totalUnpaid)*amt:0;
      applied=Math.min(applied,rem);
    }
    return`<tr>
      <td><label style="display:flex;align-items:center;gap:6px;cursor:pointer">
        <input type="checkbox" class="settle-inv-cb" data-inv-id="${inv.id}" data-rem="${rem}" onchange="recalcSettlePreview()" checked>
        <span style="font-weight:600;color:var(--accent)">${inv.num}</span>
      </label></td>
      <td class="td-mono">${inv.date}</td>
      <td class="td-mono">${fmt(inv.total)} ${t('currency_sym')}</td>
      <td class="td-mono" style="color:var(--green)">${fmt(invPaid(inv))} ${t('currency_sym')}</td>
      <td class="td-mono" style="color:var(--red);font-weight:700">${fmt(rem)} ${t('currency_sym')}</td>
      <td class="td-mono settle-applied" data-inv-id="${inv.id}" style="color:var(--amber);font-weight:700">${_settleMode==='auto'?fmt(applied)+' '+t('currency_sym'):'0.000 '+t('currency_sym')}</td>
      <td>${_settleMode==='manual'?`<input type="number" class="settle-manual-amt" data-inv-id="${inv.id}" data-rem="${rem}" step="0.001" min="0" max="${rem}" value="0" onchange="recalcSettlePreview()" style="width:90px;font-size:12px;padding:4px 6px">`:''}</td>
    </tr>`
  });
  el.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;font-size:12px">
      <span>إجمالي غير مسدد: <strong style="color:var(--red)">${fmt(totalUnpaid)} ${t('currency_sym')}</strong></span>
      <span>${unpaidInvs.length} فواتير</span>
    </div>
    <div class="tbl-wrap"><table style="width:100%;font-size:12px;border-collapse:collapse">
      <thead><tr style="border-bottom:2px solid var(--line)"><th style="text-align:right;padding:6px">الفاتورة</th><th style="text-align:right;padding:6px">التاريخ</th><th style="text-align:right;padding:6px">${t('print_net_total')}</th><th style="text-align:right;padding:6px">المدفوع</th><th style="text-align:right;padding:6px">المتبقي</th><th style="text-align:right;padding:6px">يُخصَم</th>${_settleMode==='manual'?'<th style="padding:6px">المبلغ</th>':''}</tr></thead>
      <tbody>${invRows.join('')}</tbody>
    </table></div>
    <div style="margin-top:8px;padding:8px 10px;background:var(--bg);border-radius:var(--r);font-size:12px;display:flex;justify-content:space-between">
      <span>إجمالي الخصم: <strong style="color:var(--amber)" id="settle-total-display">${fmt(amt)} ${t('currency_sym')}</strong></span>
      <span>المتبقي بعد الخصم: <strong id="settle-remaining-display" style="color:${totalUnpaid-amt>0?'var(--red)':'var(--green)'}">${fmt(Math.max(0,totalUnpaid-amt))} ${t('currency_sym')}</strong></span>
    </div>`;
}

function setSettleMode(mode){
  _settleMode=mode;
  document.querySelectorAll('#settle-mode-btns .settle-mode').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));
  const custId=parseInt(G('settle-cust-id').value);
  if(custId)renderSettleInvs(custId);
}

function recalcSettlePreview(){
  const amt=parseFloat(G('settle-amt').value)||0;
  const totalUnpaid=calcSettleTotalUnpaid();
  if(_settleMode==='auto'){
    document.querySelectorAll('.settle-inv-cb:checked').forEach(cb=>{
      const invId=parseInt(cb.dataset.invId);
      const rem=parseFloat(cb.dataset.rem);
      const applied=totalUnpaid>0?(rem/totalUnpaid)*amt:0;
      const el=document.querySelector(`.settle-applied[data-inv-id="${invId}"]`);
      if(el)el.textContent=fmt(Math.min(applied,rem))+' '+t('currency_sym');
    });
  } else {
    let totalManual=0;
    document.querySelectorAll('.settle-manual-amt').forEach(inp=>{
      const max=parseFloat(inp.dataset.rem)||0;
      const val=Math.min(parseFloat(inp.value)||0,max);
      inp.value=val;
      totalManual+=val;
      const el=document.querySelector(`.settle-applied[data-inv-id="${inp.dataset.invId}"]`);
      if(el)el.textContent=fmt(val)+' '+t('currency_sym');
    });
  }
  const displayedTotal=_settleMode==='auto'?amt:calcSettleManualTotal();
  const el1=G('settle-total-display');if(el1)el1.textContent=fmt(displayedTotal)+' '+t('currency_sym');
  const el2=G('settle-remaining-display');if(el2){el2.textContent=fmt(Math.max(0,totalUnpaid-displayedTotal))+' '+t('currency_sym');el2.style.color=totalUnpaid-displayedTotal>0?'var(--red)':'var(--green)'}
}

function calcSettleTotalUnpaid(){
  let total=0;
  document.querySelectorAll('.settle-inv-cb:checked').forEach(cb=>{total+=parseFloat(cb.dataset.rem)||0});
  return total;
}

function calcSettleManualTotal(){
  let total=0;
  document.querySelectorAll('.settle-manual-amt').forEach(inp=>{total+=parseFloat(inp.value)||0});
  return total;
}

function saveSettlement(){
  const btn=G('m-settle')?.querySelector('.btn-primary');setBtnLoading(btn,true);
  try {
    const custId=parseInt(G('settle-cust-id').value);
    const cust=DB.custs.find(x=>x.id===custId);if(!cust){toast(t('pay_customer_err'),'error');return}
    const amt=parseFloat(G('settle-amt').value)||0;
    const reason=G('settle-reason').value.trim();
    const date=G('settle-date').value;
    if(amt<=0){toast(t('pay_enter_amount'),'error');return}
    if(!reason){toast(t('pay_enter_reason'),'error');return}
    const checkedInvs=[];
    document.querySelectorAll('.settle-inv-cb:checked').forEach(cb=>{
      const invId=parseInt(cb.dataset.invId);
      const inv=DB.invs.find(x=>x.id===invId);
      if(inv)checkedInvs.push({inv,rem:invRemaining(inv)});
    });
    if(!checkedInvs.length){toast(t('pay_choose_invoice'),'error');return}
    const totalUnpaid=checkedInvs.reduce((s,x)=>s+x.rem,0);
    const applied=[];
    let remaining=amt;
    for(const x of checkedInvs){
      let share=0;
      if(_settleMode==='auto'){
        share=totalUnpaid>0?(x.rem/totalUnpaid)*amt:0;
        share=Math.min(share,x.rem,remaining);
      } else {
        const inp=document.querySelector(`.settle-manual-amt[data-inv-id="${x.inv.id}"]`);
        share=Math.min(parseFloat(inp?.value)||0,x.rem,remaining);
      }
      if(share>0.001){
        applied.push({invId:x.inv.id,invNum:x.inv.num,amount:share});
        x.inv.discount=(x.inv.discount||0)+share;
        x.inv.total=Math.max(0,x.inv.total-share);
        if(!x.inv.settlements)x.inv.settlements=[];
        x.inv.settlements.push({amount:share,reason,date});
        remaining-=share;
      }
    }
    if(!applied.length){toast(t('pay_no_applied'),'error');return}
    const settlement={
      id:'SETL-'+String(DB.cSettle).padStart(5,'0'),
      custId,custName:cust.name,
      amount:amt,actualApplied:amt-remaining,remaining,
      reason,date,applied,
      mode:_settleMode
    };
    DB.cSettle++;
    DB.settlements.push(settlement);
    addLog(t('pay_settle'),`${settlement.id} — "${cust.name}" — ${fmt(amt)} ${t('currency_sym')} — ${applied.length} فاتورة — ${reason}`,'#f5a623');
    saveState();
    closeModal('m-settle');renderSales();updateStats();
    broadcastChange('settlements', { settlementId: settlement.id, custName: cust.name });
    toast(fmt(amt)+' '+t('currency_sym')+' — '+applied.length,'success',{title:t('pay_applied'),icon:'ti-discount',duration:4000})
  } finally {
    setBtnLoading(btn,false);
  }
}

/* ═══ DELIVER ═══ */
function openDeliver(invId){
  const inv=DB.invs.find(x=>x.id===invId);if(!inv)return;
  G('dlv-inv-id').value=invId;G('dlv-recv').value='';G('dlv-notes').value='';
  const items=inv.lines.map(l=>{
    const item=DB.items.find(x=>x.id===l.itemId);
    const avail=item?item.qty:0;
    const ok=avail>=l.qty;
    return`<tr><td style="padding:6px">${l.name}</td><td style="text-align:center;padding:6px">${l.qty}</td><td style="text-align:center;padding:6px;${ok?'color:var(--green)':'color:var(--red);font-weight:700'}">${avail}</td><td style="text-align:center;padding:6px">${ok?'<i class="ti ti-check" style="color:var(--green)"></i>':'<i class="ti ti-alert-triangle" style="color:var(--red)"></i>'}</td></tr>`
  });
  const allOk=items.every((_,i)=>DB.items.find(x=>x.id===inv.lines[i].itemId)?.qty>=inv.lines[i].qty);
  G('deliver-inv-info').innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <div><div style="font-size:11px;color:var(--text-muted)">الفاتورة</div><div style="font-weight:700;color:var(--accent)">${inv.num}</div></div>
      <div><div style="font-size:11px;color:var(--text-muted)">الزبون</div><div style="font-weight:600">${inv.custName}</div></div>
      <div><div style="font-size:11px;color:var(--text-muted)">التاريخ</div><div>${inv.date}</div></div>
    </div>
    <table style="width:100%;font-size:12px;border-collapse:collapse">
      <thead><tr style="border-bottom:2px solid var(--line)"><th style="text-align:right;padding:6px">${t('print_item')}</th><th style="text-align:center;padding:6px">المطلوب</th><th style="text-align:center;padding:6px">المتوفر</th><th style="text-align:center;padding:6px">الحالة</th></tr></thead>
      <tbody>${items.join('')}</tbody>
    </table>
    ${!allOk?'<div style="margin-top:8px;padding:8px;background:rgba(240,84,84,.1);border-radius:var(--r);color:var(--red);font-size:12px"><i class="ti ti-alert-triangle"></i> بعض الأصناف غير متوفرة بالكمية المطلوبة</div>':''}`;
  openModal('m-deliver')
}
function confirmDeliver(){
  const recv=G('dlv-recv').value.trim();if(!recv){toast(t('sales_enter_receiver'),'error');return}
  const invId=parseInt(G('dlv-inv-id').value);
  const inv=DB.invs.find(x=>x.id===invId);if(!inv)return;
  const failed=[];
  inv.lines.forEach(l=>{
    const item=DB.items.find(x=>x.id===l.itemId);
    if(item){
      if(item.qty<l.qty)failed.push(`${l.name}: المتاح ${item.qty} والمطلوب ${l.qty}`);
    }
  });
  if(failed.length){toast(t('inv_stock_short')+': '+failed.join(' | '),'error');return}
  inv.lines.forEach(l=>{const item=DB.items.find(x=>x.id===l.itemId);if(item)item.qty=Math.max(0,item.qty-l.qty)});
  inv.dlvStatus='delivered';inv.receiver=recv;inv.deliveredAt=today();inv.dlvNotes=G('dlv-notes').value||'';
  addLog(t('sales_deliver_inv'),`${inv.num} — المستلم: "${recv}" — المخزون مُحدَّث فقط، لا أثر على الخزينة`,'#14b8a6');
  saveState();
  closeModal('m-deliver');renderSales();renderItems();updateStats();
  broadcastChange('sales', { invNum: inv.num, delivered: true });
  toast(inv.num+' — '+recv,'success',{title:t('sales_delivered'),icon:'ti-truck-delivery',duration:4000})
}

/* ═══ VIEW INVOICE ═══ */
function viewInv(invId){
  const inv=DB.invs.find(x=>x.id===invId);if(!inv)return;
  const paid=invPaid(inv),rem=invRemaining(inv);
  const paysForInv=DB.payments.filter(p=>p.invId===invId);
  G('view-inv-title').innerHTML=`<i class="ti ti-receipt" style="color:var(--accent)"></i> ${t('print_invoice')} ${inv.num}`;

  // Status pipeline
  const step1Done=true;
  const step2Done=inv.dlvStatus==='delivered';
  const step3Done=paid>=inv.total-0.001;

  G('view-inv-body').innerHTML=`
    <div class="inv-status-bar">
      <div class="isb-step done">
        <div class="isb-dot"><i class="ti ti-check"></i></div>
        <div class="isb-lbl">صدرت الفاتورة</div>
      </div>
      <div class="isb-step ${step2Done?'done':'active'}">
        <div class="isb-dot">${step2Done?'<i class="ti ti-check"></i>':'<i class="ti ti-truck-delivery"></i>'}</div>
        <div class="isb-lbl">تسليم البضاعة</div>
      </div>
      <div class="isb-step ${step3Done?'done':paid>0?'active':''}">
        <div class="isb-dot">${step3Done?'<i class="ti ti-check"></i>':paid>0?'<i class="ti ti-cash"></i>':'<i class="ti ti-cash"></i>'}</div>
        <div class="isb-lbl">السداد الكامل</div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;font-size:12px">
      <div class="card" style="margin:0;padding:10px 12px">
        <div style="font-size:10px;color:var(--text-muted);margin-bottom:6px;text-transform:uppercase;font-weight:700">معلومات الفاتورة</div>
        <div style="display:flex;flex-direction:column;gap:5px">
          <div style="display:flex;justify-content:space-between"><span style="color:var(--text-muted)">الزبون</span><strong>${escapeHtml(inv.custName)}</strong></div>
          <div style="display:flex;justify-content:space-between"><span style="color:var(--text-muted)">التاريخ</span><span>${escapeHtml(inv.date)}</span></div>
          <div style="display:flex;justify-content:space-between"><span style="color:var(--text-muted)">الإجمالي</span><strong style="color:var(--accent)">${fmt(inv.total)} ${t('currency_sym')}</strong></div>
          <div style="display:flex;justify-content:space-between"><span style="color:var(--text-muted)">المستلم</span><span>${escapeHtml(inv.receiver||'—')}</span></div>
          ${inv.deliveredAt?`<div style="display:flex;justify-content:space-between"><span style="color:var(--text-muted)">تاريخ التسليم</span><span>${escapeHtml(inv.deliveredAt)}</span></div>`:''}
          ${inv.dlvNotes?`<div style="display:flex;justify-content:space-between"><span style="color:var(--text-muted)">ملاحظات التسليم</span><span>${escapeHtml(inv.dlvNotes)}</span></div>`:''}
        </div>
      </div>
      <div class="card" style="margin:0;padding:10px 12px">
        <div style="font-size:10px;color:var(--text-muted);margin-bottom:6px;text-transform:uppercase;font-weight:700">حالة السداد</div>
        <div style="display:flex;flex-direction:column;gap:5px">
          <div style="display:flex;justify-content:space-between"><span style="color:var(--text-muted)">المحصَّل</span><strong style="color:var(--green)">${fmt(paid)} ${t('currency_sym')}</strong></div>
          <div style="display:flex;justify-content:space-between"><span style="color:var(--text-muted)">المتبقي</span><strong style="color:${rem>0?'var(--red)':'var(--green)'}">${rem>0?fmt(rem)+' '+t('currency_sym'):'مسدَّد \u2713'}</strong></div>
          <div class="progress-bar"><div class="progress-fill" style="width:${Math.min(100,(paid/inv.total)*100).toFixed(1)}%"></div></div>
        </div>
      </div>
    </div>
    <div class="card" style="margin-bottom:12px">
      <div class="card-hd" style="margin-bottom:8px"><h3><i class="ti ti-list"></i> بنود الفاتورة</h3></div>
      <div class="tbl-wrap"><table><thead><tr><th>${t('print_item')}</th><th>${t('print_qty')}</th><th>${t('print_price')}</th><th>الخصم</th><th>${t('print_net_total')}</th></tr></thead>
      <tbody>${inv.lines.map(l=>`<tr><td class="td-bold">${escapeHtml(l.name)}</td><td class="td-mono">${l.qty}</td><td class="td-mono">${fmt(l.price)}</td><td class="td-mono">${l.disc>0?fmt(l.disc):'—'}</td><td class="td-mono" style="font-weight:700">${fmt(l.total)}</td></tr>`).join('')}</tbody></table></div>
    </div>
    <div class="card" style="margin:0">
      <div class="card-hd" style="margin-bottom:8px"><h3><i class="ti ti-cash" style="color:var(--green)"></i> سجل الدفعات</h3></div>
      ${paysForInv.length?`<div class="pay-history">${paysForInv.map(p=>`<div class="pay-row"><div><span style="font-weight:600;color:var(--text-primary)">${p.id}</span> — ${p.mode==='cash'?'نقدي':p.mode==='check'?`صك ${p.checkNum||''}`:p.mode==='transfer'?'تحويل':p.mode}</div><div class="pr-date">${p.date}</div><div class="pr-amt">+${fmt(p.amount)} ${t('currency_sym')}</div><div><button class="btn btn-sm btn-danger btn-icon" onclick="event.stopPropagation();deletePayment('${p.id}')" title="حذف الدفعة"><i class="ti ti-trash"></i></button></div></div>`).join('')}</div>`:'<div style="font-size:12px;color:var(--text-muted);padding:8px 0">لا دفعات مسجَّلة بعد.</div>'}
    </div>
    ${inv.discount?`<div style="margin-top:10px;padding:8px 12px;background:rgba(245,166,35,.1);border-radius:var(--r);font-size:12px;color:var(--amber)"><i class="ti ti-discount"></i> خصم ${fmt(inv.discount)} ${t('currency_sym')} — ${inv.discountReason||'تسوية'}${(inv.settlements||[]).length>1?` (${inv.settlements.length} تسويات)`:''}</div>`:''}`;
  G('view-inv-footer').innerHTML=`
    <input type="hidden" id="view-inv-inv-id" value="${invId}">
    <button class="btn" onclick="closeModal('m-view-inv')">إغلاق</button>
    ${['admin','system_admin'].includes(currentUser?.role)&&inv.dlvStatus==='pending'?`<button class="btn" onclick="closeModal('m-view-inv');editInv(${inv.id})"><i class="ti ti-pencil"></i> تعديل</button>`:''}
    <button class="btn btn-secondary" onclick="printInvoice('sale',${inv.id})"><i class="ti ti-printer"></i> تصدير PDF</button>
    ${rem>0.001?`<button class="btn btn-secondary" onclick="closeModal('m-view-inv');openSettlement(${inv.custId})"><i class="ti ti-discount"></i> تسوية / خصم</button>`:''}
    ${inv.dlvStatus==='pending'?`<button class="btn btn-amber" onclick="closeModal('m-view-inv');openDeliver(${inv.id})"><i class="ti ti-truck-delivery"></i> تسليم البضاعة</button>`:''}
    ${rem>0.001?`<button class="btn btn-success" onclick="closeModal('m-view-inv');openCollect(${inv.id})"><i class="ti ti-cash"></i> استلام دفعة</button>`:''}`;
  openModal('m-view-inv')
}

function viewPur(purId){
  const pur=DB.purs.find(x=>x.id===purId);if(!pur)return;
  const paid=purPaid(pur),rem=purRemaining(pur);
  const purBalanceClass=rem>0?'text-red':'text-green';
  G('view-pur-title').innerHTML=`<i class="ti ti-truck" style="color:var(--amber)"></i> ${t('print_invoice')} ${escapeHtml(pur.num)}`;
  G('view-pur-body').innerHTML=`<div class="card" style="margin-bottom:12px"><div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--border)"><div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,var(--accent),var(--purple));display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px"><i class="ti ti-building-store"></i></div><div><div style="font-size:15px;font-weight:700">${currentCompany().name}</div><div style="font-size:11px;color:var(--text-muted)">${currentCompany().address}</div></div><div style="margin-right:auto;text-align:left"><div style="font-size:11px;color:var(--text-muted)">${t('pur_new')}</div><div style="font-size:13px;font-weight:700;color:var(--accent)">${pur.supName}</div><div style="font-size:10px;color:var(--text-muted);font-family:var(--mono)">${pur.date}</div></div></div><div class="soa-meta"><div><div class="soa-ml">${t('print_notes')}</div><div class="soa-mv">${pur.supName}</div></div><div><div class="soa-ml">${t('col_total_due')}</div><div class="soa-mv ${purBalanceClass}">${fmt(rem)} ${t('currency_sym')}</div></div><div><div class="soa-ml">${t('sales_enter_receiver')}</div><div class="soa-mv">${pur.receivedStock?`<span class="badge b-green">${t('sales_delivered')}</span>`:`<span class="badge b-amber">${t('inv_undelivered')}</span>`}</div></div></div></div><div class="card" style="margin-bottom:12px"><div class="card-hd"><h3><i class="ti ti-list"></i> ${t('view_inv_items')}</h3></div><div class="tbl-wrap"><table><thead><tr><th>${t('print_item')}</th><th>${t('print_qty')}</th><th>${t('print_price')}</th><th>${t('print_net_total')}</th></tr></thead><tbody>${pur.lines.map(l=>`<tr><td class="td-bold">${escapeHtml(l.name)}</td><td class="td-mono">${l.qty}</td><td class="td-mono">${fmt(l.price)}</td><td class="td-mono" style="font-weight:700">${fmt(l.total)}</td></tr>`).join('')}</tbody></table></div></div><div class="card"><div class="card-hd" style="margin-bottom:8px"><h3><i class="ti ti-calculator" style="color:var(--accent)"></i> ${t('view_inv_title')}</h3></div><div style="display:flex;flex-direction:column;gap:4px"><div style="display:flex;justify-content:space-between"><span>${t('print_grand_total')}</span><strong>${fmt(pur.total)} ${t('currency_sym')}</strong></div><div style="display:flex;justify-content:space-between"><span>${t('print_amount_paid')}</span><strong style="color:var(--green)">${fmt(paid)} ${t('currency_sym')}</strong></div><div style="display:flex;justify-content:space-between"><span>${t('print_amount_due')}</span><strong style="color:${purBalanceClass}">${fmt(rem)} ${t('currency_sym')}</strong></div></div></div></div>`;
  G('view-pur-footer').innerHTML=`<button class="btn" onclick="closeModal('m-view-pur')">${t('close')}</button><button class="btn btn-secondary" onclick="printInvoice('purchase',${pur.id})"><i class="ti ti-printer"></i> ${t('export')} PDF</button>`;
  openModal('m-view-pur');
}

function printInvoice(type,id){
  let title='';let num='';let date='';let name='';let lines=[];let total=0;let paid=0;let rem=0;let notes='';let discount=0;let discountReason='';
  const company=currentCompany();
  if(type==='sale'){
    const inv=DB.invs.find(x=>x.id===id);if(!inv){toast(t('sales_not_found'),'error');return}
    title=t('print_invoice_sale');num=inv.num;date=inv.date;name=inv.custName;lines=inv.lines;total=inv.total;paid=invPaid(inv);rem=invRemaining(inv);notes=company.note||'';discount=inv.discount||0;discountReason=inv.discountReason||'';
  } else {
    const pur=DB.purs.find(x=>x.id===id);if(!pur){toast(t('pur_not_found'),'error');return}
    title=t('print_invoice_pur');num=pur.num;date=pur.date;name=pur.supName;lines=pur.lines;total=pur.total;paid=purPaid(pur);rem=purRemaining(pur);notes=company.note||'';
  }
  const win=window.open('','_blank','width=960,height=1150');
  if(!win){toast(t('sales_print_err'),'error');return}
  const now=new Date();
  const dateStr=now.toLocaleDateString('ar-LY');
  const timeStr=now.toLocaleTimeString('ar-LY',{hour:'2-digit',minute:'2-digit'});
  const payStatus=rem<=0.001?'مسددة بالكامل':paid>0?'جزئي':'غير مدفوعة';
  const payColor=rem<=0.001?'#16a34a':paid>0?'#d97706':'#dc2626';
  const payBg=rem<=0.001?'#f0fdf4':paid>0?'#fffbeb':'#fef2f2';
  const payBorder=rem<=0.001?'#bbf7d0':paid>0?'#fde68a':'#fecaca';

  const qrSvg=`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="#fff"/>
    <rect x="5" y="5" width="28" height="28" rx="3" fill="#1e293b"/>
    <rect x="67" y="5" width="28" height="28" rx="3" fill="#1e293b"/>
    <rect x="5" y="67" width="28" height="28" rx="3" fill="#1e293b"/>
    <rect x="9" y="9" width="20" height="20" rx="2" fill="#fff"/>
    <rect x="71" y="9" width="20" height="20" rx="2" fill="#fff"/>
    <rect x="9" y="71" width="20" height="20" rx="2" fill="#fff"/>
    <rect x="13" y="13" width="12" height="12" fill="#1e293b"/>
    <rect x="75" y="13" width="12" height="12" fill="#1e293b"/>
    <rect x="13" y="75" width="12" height="12" fill="#1e293b"/>
    <rect x="38" y="5" width="6" height="6" fill="#1e293b" opacity=".8"/>
    <rect x="48" y="5" width="6" height="6" fill="#1e293b" opacity=".5"/>
    <rect x="56" y="10" width="6" height="6" fill="#1e293b" opacity=".6"/>
    <rect x="38" y="18" width="6" height="6" fill="#1e293b" opacity=".4"/>
    <rect x="48" y="24" width="6" height="6" fill="#1e293b" opacity=".7"/>
    <rect x="5" y="38" width="6" height="6" fill="#1e293b" opacity=".5"/>
    <rect x="18" y="38" width="6" height="6" fill="#1e293b" opacity=".3"/>
    <rect x="38" y="38" width="24" height="24" rx="4" fill="#1e293b" opacity=".12"/>
    <rect x="44" y="44" width="12" height="12" rx="2" fill="#1e293b" opacity=".5"/>
    <rect x="67" y="38" width="6" height="6" fill="#1e293b" opacity=".4"/>
    <rect x="80" y="38" width="6" height="6" fill="#1e293b" opacity=".6"/>
    <rect x="67" y="50" width="6" height="6" fill="#1e293b" opacity=".5"/>
    <rect x="80" y="50" width="6" height="6" fill="#1e293b" opacity=".3"/>
    <rect x="67" y="67" width="28" height="28" rx="3" fill="#1e293b"/>
    <rect x="71" y="71" width="20" height="20" rx="2" fill="#fff"/>
    <rect x="75" y="75" width="12" height="12" fill="#1e293b"/>
    <rect x="38" y="70" width="6" height="6" fill="#1e293b" opacity=".4"/>
    <rect x="50" y="78" width="6" height="6" fill="#1e293b" opacity=".5"/>
    <rect x="5" y="50" width="6" height="6" fill="#1e293b" opacity=".3"/>
    <rect x="18" y="55" width="6" height="6" fill="#1e293b" opacity=".6"/>
  </svg>`;

  const linesHtml=lines.map((l,i)=>{
    const item=DB.items.find(x=>x.id===l.itemId);
    const barcode=item?.barcode||'';
    const code=item?.code||'';
    const discCell=type==='sale'?`<td>${l.disc>0?fmt(l.disc)+' '+t('currency_sym'):'\u2014'}</td>`:'';

    const bcSettings=getBarcodeSettings();
    let barcodeHtml='';
    if(bcSettings.show!=='none'&&bcSettings.show!=='invoice'&&(barcode||code)){
      const bcValue=barcode||code;
      const bcId='bc-line-'+i+'-'+Math.random().toString(36).slice(2,8);
      const sizeConfig=BC_SIZES[bcSettings.size]||BC_SIZES.medium;
      const barWidth=BC_WIDTHS[bcSettings.width]||1.5;
      setTimeout(()=>{
        const svgEl=document.getElementById(bcId);
        if(svgEl){try{JsBarcode(svgEl,bcValue,{format:bcSettings.type,width:barWidth,height:sizeConfig.height*0.6,margin:1,displayValue:bcSettings.text==='yes',font:'monospace',fontSize:9,textMargin:1,background:'transparent',lineColor:'#475569'})}catch(e){svgEl.innerHTML='<text x="2" y="12" fill="#94a3b8" font-size="9" font-family="monospace">'+bcValue+'</text>'}}
      },0);

      if(bcSettings.position==='under-name'){
        barcodeHtml=`<div style="margin-top:3px"><svg id="${bcId}" style="max-width:120px;height:auto"></svg></div>`;
      } else if(bcSettings.position==='separate-col'){
        barcodeHtml='';
      }
    }

    const nameCell=bcSettings.position==='under-name'
      ?`<td style="font-weight:600;color:#1e293b"><div>${l.name}</div>${barcodeHtml}</td>`
      :`<td style="font-weight:600;color:#1e293b">${l.name}</td>`;

    return`<tr>
      <td style="text-align:center;color:#94a3b8;font-size:10px">${i+1}</td>
      ${nameCell}
      <td style="text-align:center">${l.qty}</td>
      <td style="direction:ltr;text-align:right;font-family:monospace">${fmt(l.price)} ${t('currency_sym')}</td>
      ${discCell}
      <td style="direction:ltr;text-align:right;font-family:monospace;font-weight:700;color:#1e293b">${fmt(l.total)} ${t('currency_sym')}</td>
      ${bcSettings.position==='separate-col'?`<td style="text-align:center"><svg id="${barcode??code?i:''}" style="max-width:80px;height:auto"></svg></td>`:''}
    </tr>`;
  }).join('');

  const html=`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>${title} ${num}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
  @page{size:A4 portrait;margin:14mm 18mm 16mm}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Cairo',Helvetica,Arial,sans-serif;direction:rtl;color:#1e293b;padding:0;font-size:12px;line-height:1.5;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}

  .inv{position:relative;padding:24px 28px 70px;min-height:100vh}

  .inv-accent{position:absolute;top:0;left:0;right:0;height:5px;background:linear-gradient(135deg,#4f8ef7 0%,#6c5ce7 50%,#a855f7 100%)}
  .inv-side{position:absolute;top:0;right:0;width:4px;height:100%;background:linear-gradient(180deg,#4f8ef7,#6c5ce7,#a855f7);opacity:.25}
  .inv-watermark{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-32deg);font-size:56px;font-weight:900;color:rgba(79,142,247,.03);pointer-events:none;z-index:0;white-space:nowrap;letter-spacing:6px}

  /* Header */
  .inv-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;padding-top:12px;gap:20px}
  .inv-company{flex:1}
  .inv-company-name{font-size:24px;font-weight:800;color:#4f8ef7;margin-bottom:3px;letter-spacing:-.3px}
  .inv-company-sub{font-size:11px;color:#64748b;line-height:1.6}
  .inv-company-sub span{display:inline-block;margin-left:12px}
  .inv-title-box{text-align:left;min-width:220px}
  .inv-type{font-size:28px;font-weight:800;color:#1e293b;margin-bottom:4px;letter-spacing:-.5px}
  .inv-type-badge{display:inline-block;width:100%;height:4px;background:linear-gradient(90deg,#4f8ef7,#6c5ce7);border-radius:2px;margin-top:4px}
  .inv-meta{font-size:11px;color:#64748b;line-height:1.8;margin-top:10px}
  .inv-meta strong{color:#1e293b;font-weight:600}
  .inv-status{display:inline-flex;align-items:center;gap:5px;padding:5px 16px;border-radius:20px;font-size:12px;font-weight:700;color:${payColor};background:${payBg};border:1.5px solid ${payBorder};margin-top:6px}
  .inv-status i{font-size:14px}

  /* Info grid */
  .inv-info{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:18px;padding:14px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0}
  .inv-info-box{font-size:12px}
  .inv-info-box label{font-size:10px;color:#94a3b8;display:block;margin-bottom:2px;font-weight:500}
  .inv-info-box span{font-weight:600;color:#1e293b}

  /* Items table */
  .inv-table{width:100%;border-collapse:collapse;margin:0;font-size:11px}
  .inv-table thead th{background:linear-gradient(135deg,#4f8ef7,#5b9cf7);color:#fff;padding:10px 8px;font-weight:600;text-align:right;font-size:11px}
  .inv-table thead th:first-child{border-radius:0 8px 0 0}
  .inv-table thead th:last-child{border-radius:8px 0 0 0}
  .inv-table tbody td{padding:9px 8px;border-bottom:1px solid #f1f5f9}
  .inv-table tbody tr:nth-child(even){background:#f8fafc}
  .inv-table tbody tr:nth-child(odd){background:#fff}
  .inv-table tbody tr:last-child td{border-bottom:2px solid #e2e8f0}

  /* Summary */
  .inv-summary{display:flex;justify-content:space-between;margin-top:22px;gap:20px}
  .inv-qr-section{text-align:center;width:120px;flex-shrink:0}
  .inv-qr-box{width:100px;height:100px;margin:0 auto 6px;border:2px solid #e2e8f0;border-radius:8px;display:flex;align-items:center;justify-content:center;background:#fff;padding:5px}
  .inv-qr-box svg{width:100%;height:100%}
  .inv-qr-label{font-size:9px;color:#94a3b8;font-weight:500}
  .inv-totals{width:300px;background:#f8fafc;border-radius:10px;padding:16px;border:1px solid #e2e8f0}
  .inv-totals-row{display:flex;justify-content:space-between;padding:6px 0;font-size:12px;border-bottom:1px dashed #e2e8f0}
  .inv-totals-row:last-child{border-bottom:none}
  .inv-totals-row.total-final{border-top:2.5px solid #4f8ef7;margin-top:4px;padding-top:10px;font-size:15px;font-weight:800;color:#4f8ef7}
  .inv-totals .paid-val{color:#16a34a;font-weight:700}
  .inv-totals .rem-val{color:${rem>0.001?'#dc2626':'#16a34a'};font-weight:700}

  /* Terms */
  .inv-terms{margin-top:18px;padding:14px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;font-size:10px;color:#64748b;line-height:1.8}
  .inv-terms-title{font-weight:700;color:#1e293b;margin-bottom:6px;font-size:11px;display:flex;align-items:center;gap:4px}
  .inv-terms-title i{font-size:13px;color:#4f8ef7}
  .inv-terms ol{padding-right:16px}
  .inv-terms li{margin-bottom:2px}
  .inv-notes{margin-top:8px;padding:8px 12px;background:#fff;border-radius:6px;border:1px solid #e2e8f0;font-weight:600;color:#1e293b}

  /* Stamps */
  .inv-stamps{display:flex;gap:24px;margin-top:18px}
  .inv-stamp{width:140px;height:60px;border:1.5px dashed #cbd5e1;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:9px;color:#94a3b8;flex-direction:column;gap:3px;background:#fafbfc}
  .inv-stamp i{font-size:15px;opacity:.4}

  /* Footer */
  .inv-footer{margin-top:20px;padding-top:12px;border-top:2px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;font-size:9px;color:#94a3b8}
  .inv-footer-brand{font-weight:700;color:#4f8ef7;font-size:11px}

  @media print{
    body{padding:0;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
    .inv{padding:0 6mm 12mm}
    .inv-watermark{display:none}
    .inv-accent{height:4px}
    .inv-table{page-break-inside:auto}
    .inv-table tr{page-break-inside:avoid;page-break-after:auto}
    .inv-table thead{display:table-header-group}
  }
  </style></head><body>
  <div class="inv">
    <div class="inv-accent"></div>
    <div class="inv-side"></div>
    <div class="inv-watermark">${title} ${num}</div>

    <!-- HEADER -->
    <div class="inv-header">
      <div class="inv-company">
        ${company.logo?'<div style="margin-bottom:6px">'+companyLogoHtml(company,55)+'</div>':''}
        <div class="inv-company-name">${company.name}</div>
        <div class="inv-company-sub">
          ${company.address?'<span>'+company.address+'</span>':''}
          ${company.phone?'<span>'+company.phone+'</span>':''}
          ${company.email?'<span>'+company.email+'</span>':''}
          ${company.taxNo?'<span>الرقم الضريبي: '+company.taxNo+'</span>':''}
        </div>
      </div>
      <div class="inv-title-box">
        <div class="inv-type">${title}</div>
        <div class="inv-type-badge"></div>
        <div class="inv-meta">
          <div>الرقم: <strong>${num}</strong></div>
          <div>التاريخ: <strong>${date}</strong></div>
          <div>${type==='sale'?'الزبون':'المورد'}: <strong>${name}</strong></div>
        </div>
        <div class="inv-status"><i class="ti ti-${rem<=0.001?'circle-check':paid>0?'alert-triangle':'circle-x'}"></i>${payStatus}</div>
      </div>
    </div>

    <!-- INFO -->
    <div class="inv-info">
      <div class="inv-info-box"><label>${type==='sale'?'اسم الزبون':'اسم المورد'}</label><span>${name}</span></div>
      <div class="inv-info-box"><label>رقم الفاتورة</label><span>${num}</span></div>
      <div class="inv-info-box"><label>تاريخ الفاتورة</label><span>${date}</span></div>
      <div class="inv-info-box"><label>تاريخ الطباعة</label><span>${dateStr} ${timeStr}</span></div>
    </div>

    <!-- ITEMS TABLE -->
    <table class="inv-table">
      <thead><tr>
        <th style="width:30px;text-align:center">#</th>
        <th>${t('print_item')}</th>
        <th style="text-align:center;width:50px">${t('print_qty')}</th>
        <th style="width:80px">سعر الوحدة</th>
        ${type==='sale'?'<th style="width:70px">الخصم</th>':''}
        <th style="width:90px">${t('print_net_total')}</th>
      </tr></thead>
      <tbody>${linesHtml}</tbody>
    </table>

    <!-- SUMMARY: QR right + Totals left -->
    <div class="inv-summary">
      <div class="inv-qr-section">
        <div class="inv-qr-box">${qrSvg}</div>
        <div class="inv-qr-label">امسح للتحقق</div>
        ${(getBarcodeSettings().show==='item+invoice'||getBarcodeSettings().show==='invoice')?`<div style="margin-top:12px;text-align:center" id="inv-bc-section">${renderInvoiceBarcode(num.replace(/[^a-zA-Z0-9]/g,''),{size:'small'})}</div><div style="font-size:9px;color:#94a3b8;margin-top:4px;font-family:monospace;direction:ltr;letter-spacing:1px">${num}</div>`:''}
      </div>
      <div class="inv-totals">
        <div class="inv-totals-row"><span>الإجمالي قبل الخصم</span><span>${fmt(total+discount)} ${t('currency_sym')}</span></div>
        ${discount>0?`<div class="inv-totals-row"><span>خصم ${discountReason?'('+discountReason+')':''}</span><span style="color:#d97706">-${fmt(discount)} ${t('currency_sym')}</span></div>`:''}
        <div class="inv-totals-row total-final"><span>الإجمالي النهائي</span><span>${fmt(total)} ${t('currency_sym')}</span></div>
        ${type==='sale'?`<div class="inv-totals-row"><span>المدفوع</span><span class="paid-val">${fmt(paid)} ${t('currency_sym')}</span></div><div class="inv-totals-row"><span>المتبقي</span><span class="rem-val">${rem>0.001?fmt(rem)+' '+t('currency_sym'):'مسدّد بالكامل ✓'}</span></div>`:''}
      </div>
    </div>

    <!-- TERMS -->
    <div class="inv-terms">
      <div class="inv-terms-title"><i class="ti ti-file-text"></i> الشروط والأحكام</div>
      <ol>
        <li>هذه الفاتورة صادرة إلكترونياً ولا تحتاج إلى توقيع أو ختم.</li>
        <li>في حالة عدم الدفع خلال المدة المحددة تُضاف فائدة تأخير بنسبة 2% شهرياً.</li>
        <li>المرتجعات تخضع لسياسة الشركة المعلنة.</li>
        <li>يُرجى الحفاظ على هذه الفاتورة للمراجعة.</li>
      </ol>
      ${notes?`<div class="inv-notes"><i class="ti ti-note" style="font-size:11px;color:#4f8ef7"></i> ملاحظات: ${notes}</div>`:''}
    </div>

    <!-- STAMPS -->
    <div class="inv-stamps">
      <div class="inv-stamp"><i class="ti ti-stamp"></i>ختم المؤسسة</div>
      <div class="inv-stamp"><i class="ti ti-signature"></i>توقيع المسؤول</div>
    </div>

    <!-- FOOTER -->
    <div class="inv-footer">
      <span class="inv-footer-brand">${company.name}</span>
      <span>تاريخ الطباعة: ${dateStr} ${timeStr} • ${num}</span>
      <span>${company.name} © ${now.getFullYear()}</span>
    </div>
  </div>
  <script>window.onload=function(){window.print();window.onafterprint=function(){window.close()}}<\/script>
  </body></html>`;
  win.document.write(html);win.document.close();
}

/* ═══ RETURNS ═══ */
function saveRet(){
  const btn=G('m-return')?.querySelector('.btn-primary');setBtnLoading(btn,true);
  try {
    const invNum=G('re-inv').value,amt=parseFloat(G('re-amt').value)||0;
    if(!invNum||amt<=0){toast(t('pay_enter_amount'),'error');return}
    const inv=DB.invs.find(x=>x.num===invNum);
    const num='RET-'+String(DB.cRet).padStart(5,'0'),date=G('re-date').value;
    // If QC passed: re-add returned items proportionally to inventory
    if(_reQC==='passed'&&inv&&inv.total>0){
      const ratio=Math.min(amt/inv.total,1);
      inv.lines.forEach(l=>{
        const item=DB.items.find(x=>x.id===l.itemId);
        if(item){const retQty=Math.round(l.qty*ratio);if(retQty>0)item.qty+=retQty}
      })
    }
    DB.rets.push({id:DB.cRet++,num,invNum,custName:inv?.custName||'—',amt,reason:G('re-reason').value,qcStatus:_reQC,date});
    addLog('مرتجع مبيعات',`${num} — فاتورة ${invNum} — ${fmt(amt)} ${t('currency_sym')} — QC: ${_reQC}`,'#f05454');
    saveState();
    closeModal('m-return');renderRets();renderItems();updateStats();
    broadcastChange('returns', { num, invNum });
    const qcMsg=_reQC==='passed'?' وأُعيد للمخزون':_reQC==='failed'?' ولن يُعاد للمخزون':' والجودة قيد المراجعة';
    toast(t('sales_return_logged')+' '+num)
  } finally {
    setBtnLoading(btn,false);
  }
}
function renderRets(search=''){
  const tb=G('ret-tb');
  const term=normalizeText(search);
  const qcFilter=G('ret-qc-filter')?.value||'';
  let full=[...DB.rets].reverse();
  if(term){full=full.filter(r=>normalizeText(r.num).includes(term)||normalizeText(r.invNum).includes(term)||normalizeText(r.reason).includes(term));}
  if(qcFilter){full=full.filter(r=>r.qcStatus===qcFilter)}
  if(!full.length){tb.innerHTML=emptyRow(6,term?t('lbl_search_results'):t('ret_empty'));renderPag('ret-tb',0,renderRets);return}
  const {data}=getPageData('ret-tb', full);
  function qcLbl(s){return s==='passed'?'<span class="badge b-green">مقبول</span>':s==='failed'?'<span class="badge b-red">مرفوض</span>':'<span class="badge b-amber">قيد المراجعة</span>'}
  tb.innerHTML=data.map(r=>`<tr>
    <td class="td-bold">${r.num}</td>
    <td class="td-mono">${r.invNum}</td>
    <td>${r.custName}</td>
    <td class="td-mono" style="color:var(--red);font-weight:700">${fmt(r.amt)} ${t('currency_sym')}</td>
    <td style="color:var(--text-muted)">${r.reason||'—'}</td>
    <td>${qcLbl(r.qcStatus)}</td>
    <td class="td-mono">${r.date}</td>
  </tr>`).join('');
  renderPag('ret-tb',full.length,renderRets)
}

/* ═══ REVERSE SETTLEMENT ═══ */
function loadReverseSettlements(){
  const type=document.querySelector('input[name="rev-settle-type"]:checked')?.value||'customer';
  const el=G('rev-settle-list');
  const allSettlements=type==='customer'?(DB.settlements||[]):(DB.supSettlements||[]);
  const reversed=allSettlements.slice().reverse();
  if(!reversed.length){
    el.innerHTML=`<div style="text-align:center;padding:24px;color:var(--text-muted);font-size:13px"><i class="ti ti-check-circle" style="font-size:28px;display:block;margin-bottom:8px;color:var(--green)"></i>${t('hrm_no_movements')}</div>`;
    return;
  }
  el.innerHTML=reversed.map(s=>{
    const isCust=type==='customer';
    const name=isCust?s.custName:s.supName;
    const invoiceInfo=s.applied.map(a=>isCust?a.invNum:a.purNum).join(', ');
    return`<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border:1px solid var(--line);border-radius:var(--r);margin-bottom:6px;font-size:12px;transition:background .15s" onmouseover="this.style.background='var(--bg-elevated)'" onmouseout="this.style.background=''">
      <div style="display:flex;gap:12px;align-items:center;flex:1">
        <span style="font-weight:700;color:var(--amber);min-width:90px">${s.id}</span>
        <span style="min-width:100px">${name}</span>
        <span style="color:var(--red);font-weight:700;min-width:80px">${fmt(s.amount)} ${t('currency_sym')}</span>
        <span style="color:var(--text-muted);flex-shrink:0">${s.applied.length} فاتورة: ${invoiceInfo}</span>
        <span style="color:var(--text-muted)">${s.date}</span>
      </div>
      <button class="btn btn-sm btn-danger" onclick="reverseSettlement('${type}','${s.id}')"><i class="ti ti-undo"></i> عكس</button>
    </div>`
  }).join('');
}

async function reverseSettlement(type,settleId){
  const isCust=type==='customer';
  const arr=isCust?DB.settlements:DB.supSettlements;
  const idx=arr.findIndex(s=>s.id===settleId);
  if(idx===-1){toast(t('sales_settle_not_found'),'error');return}
  const s=arr[idx];
  const name=isCust?s.custName:s.supName;
  const cf=await confirmDanger(`عكس التسوية ${s.id} — ${name} — ${fmt(s.amount)} ${t('currency_sym')}؟`, 'تأكيد عكس التسوية');if(!cf)return;

  // Reverse each applied share
  s.applied.forEach(a=>{
    if(isCust){
      const inv=DB.invs.find(x=>x.id===a.invId);
      if(inv){
        inv.discount=Math.max(0,(inv.discount||0)-a.amount);
        inv.total+=a.amount;
        if(inv.settlements){
          inv.settlements=inv.settlements.filter(x=>!(Math.abs(x.amount-a.amount)<0.001&&x.reason===s.reason&&x.date===s.date));
        }
      }
    } else {
      const pur=DB.purs.find(x=>x.id===a.purId);
      if(pur){
        pur.discount=Math.max(0,(pur.discount||0)-a.amount);
        pur.total+=a.amount;
        if(pur.settlements){
          pur.settlements=pur.settlements.filter(x=>!(Math.abs(x.amount-a.amount)<0.001&&x.reason===s.reason&&x.date===s.date));
        }
      }
    }
  });

  arr.splice(idx,1);
  addLog(`عكس تسوية ${isCust?'زبون':'مورد'}`,`${s.id} — "${name}" — ${fmt(s.amount)} ${t('currency_sym')} — أُعيدت ${s.applied.length} فاتورة`,'#f05454');
  saveState();
  loadReverseSettlements();
  if(isCust){renderSales();}else{renderPurs();renderSups();}
  updateStats();
  broadcastChange('settlements', { settleId, reversed: true });
  toast(t('sales_reverse_done')+' '+fmt(s.amount)+' '+t('currency_sym'));
}

/* ═══ SETTLEMENTS LOG ═══ */
function renderSettleLog(){
  const search=(G('settle-log-search')?.value||'').trim().toLowerCase();
  const dateFrom=G('settle-log-from')?.value||'';
  const dateTo=G('settle-log-to')?.value||'';
  const typeFilter=G('settle-log-type')?.value||'';
  const tb=G('settle-log-tb');

  let customerSett=(DB.settlements||[]).map(s=>({...s,_type:'customer'}));
  let supplierSett=(DB.supSettlements||[]).map(s=>({...s,_type:'supplier'}));
  let all=[...customerSett,...supplierSett].sort((a,b)=>b.date.localeCompare(a.date)||b.id.localeCompare(a.id));

  if(typeFilter)all=all.filter(s=>s._type===typeFilter);
  if(dateFrom)all=all.filter(s=>s.date>=dateFrom);
  if(dateTo)all=all.filter(s=>s.date<=dateTo);
  if(search){
    all=all.filter(s=>{
      const name=s._type==='customer'?s.custName:s.supName;
      return normalizeText(s.id).includes(search)||normalizeText(name).includes(search)||normalizeText(s.reason).includes(search);
    });
  }

  if(!all.length){
    tb.innerHTML=`<tr><td colspan="8" style="text-align:center;padding:24px;color:var(--text-muted);font-size:13px"><i class="ti ti-folder-open" style="font-size:28px;display:block;margin-bottom:8px"></i>${t('hrm_no_movements')}</td></tr>`;
    return;
  }
  tb.innerHTML=all.map(s=>{
    const isCust=s._type==='customer';
    const name=isCust?s.custName:s.supName;
    const invoiceInfo=s.applied.map(a=>isCust?a.invNum:a.purNum).join(', ');
    const typeBadge=isCust?'<span class="badge b-accent">زبون</span>':'<span class="badge b-teal">مورد</span>';
    return`<tr>
      <td class="td-bold" style="color:var(--amber)">${s.id}</td>
      <td>${typeBadge}</td>
      <td>${name}</td>
      <td class="td-mono" style="color:var(--red);font-weight:700">${fmt(s.amount)} ${t('currency_sym')}</td>
      <td style="color:var(--text-muted);font-size:11px">${invoiceInfo}</td>
      <td style="color:var(--text-muted)">${s.reason||'—'}</td>
      <td class="td-mono">${s.date}</td>
      <td><button class="btn btn-sm btn-danger" onclick="reverseSettlement('${s._type}','${s.id}')"><i class="ti ti-undo"></i></button></td>
    </tr>`
  }).join('');
}


/* ═══════════════════════════════════════════════
   purchases.js
══════════════════════════════════════════════ */

﻿/* ═══ PURCHASE INVOICE ═══ */
function onPiItemSelect(){autoBuyPrice()}
function autoBuyPrice(){
  const id=parseInt(G('pi-item-sel').value);
  const item=DB.items.find(x=>x.id===id);
  if(item){G('pi-price').value=item.buy;calcPiLine()}
}
function calcPiLine(){
  const q=parseFloat(G('pi-qty').value)||0,p=parseFloat(G('pi-price').value)||0;
  G('pi-ltot').value=fmt(q*p)
}
function addPiLine(){
  const id=parseInt(G('pi-item-sel').value);
  const item=DB.items.find(x=>x.id===id);
  if(!item){toast(t('inv_choose_item'),'error');return}
  const qty=parseFloat(G('pi-qty').value)||1;
  const price=parseFloat(G('pi-price').value)||item.buy;
  if(qty<=0){toast(t('inv_enter_qty'),'error');return}
  if(price<=0){toast(t('inv_enter_price'),'error');return}
  _piL.push({itemId:id,name:item.name,qty,price,total:qty*price});
  renderPiL();
  G('pi-qty').value='1';G('pi-price').value='';G('pi-ltot').value='';G('pi-item-sel').value='';if(G('pi-item-search'))G('pi-item-search').value='';filterItemSelect('','pi');
}
function renderPiL(){
  const tb=G('pi-lines-tb');
  if(!tb) return;
  tb.innerHTML=_piL.length?_piL.map((l,i)=>`<tr>
    <td class="td-bold">${escapeHtml(l.name)}</td>
    <td class="td-mono">${l.qty}</td>
    <td class="td-mono">${fmt(l.price)}</td>
    <td class="td-mono" style="font-weight:700">${fmt(l.total)}</td>
    <td><button class="btn btn-sm btn-danger btn-icon" onclick="_piL.splice(${i},1);renderPiL()"><i class="ti ti-x"></i></button></td>
  </tr>`).join(''):emptyRow(5,t('inv_add_item'));
  G('pi-tot').textContent=fmt(_piL.reduce((s,l)=>s+l.total,0))+' '+t('currency_sym')
}
/* ═══ PURCHASE INVOICE ═══ */
let _editingPurId=null;
function savePur(){
  const btn=G('pur-save-btn');setBtnLoading(btn,true);
  try {
    if(!_piL.length){toast(t('inv_add_item'),'error');return}
    if(!G('pi-sup').value){toast(t('pur_choose_supplier'),'error');return}
    const supId=parseInt(G('pi-sup').value);
    const sup=DB.sups.find(x=>x.id===supId);
    const num=G('pi-num').value,date=G('pi-date').value;
    const total=_piL.reduce((s,l)=>s+l.total,0);
    const receiveNow=G('pi-recv').checked;
    if(_editingPurId){
      const pur=DB.purs.find(x=>x.id===_editingPurId);
      if(!pur){toast(t('pur_not_found'),'error');return}
      pur.supId=supId;pur.supName=sup?.name||'مورد';pur.date=date;
      pur.lines=[..._piL];pur.total=total;
      addLog(t('pur_edit'),`${num} — "${sup?.name}" — ${fmt(total)} ${t('currency_sym')}`,'#f5a623');
      toast(t('pur_edited')+' '+num,'success',{title:t('pur_updated'),icon:'ti-truck'});
      _editingPurId=null;
    } else {
      _piL.forEach(l=>{const item=DB.items.find(x=>x.id===l.itemId);if(item)item.buy=l.price});
      if(receiveNow){_piL.forEach(l=>{const item=DB.items.find(x=>x.id===l.itemId);if(item)item.qty+=l.qty})}
      DB.purs.push({id:DB.cP,num,supId,supName:sup?.name||'مورد',date,lines:[..._piL],total,receivedStock:receiveNow});
      DB.cP++;
      const note=receiveNow?'مع استلام فوري للمخزون':'ذمة دائنة فقط — المخزون لم يُستلَم بعد';
      addLog(t('pur_created'),`${num} — "${sup?.name}" — ${fmt(total)} ${t('currency_sym')} — ${note}`,'#f5a623');
      toast(`${num} — ${sup?.name} — ${fmt(total)} ${t('currency_sym')}`,{icon:'ti-shopping-cart',title:t('pur_new'),duration:4000})
    }
    saveState();
    closeModal('m-pur');renderPurs();renderItems();updateStats();
    broadcastChange('purchases', { num, supName: sup?.name, total });
  } finally {
    setBtnLoading(btn,false);
  }
}
function editPur(purId){
  if(!requireAdmin())return;
  const pur=DB.purs.find(x=>x.id===purId);if(!pur)return;
  _editingPurId=purId;
  _piL=[...pur.lines];
  G('pi-num').value=pur.num;
  G('pi-sup').value=pur.supId||'';
  G('pi-date').value=pur.date;
  G('pi-recv').checked=false;
  G('pur-title').innerHTML='<i class="ti ti-truck" style="color:var(--amber)"></i> '+t('pur_edit')+' '+escapeHtml(pur.num);
  G('pur-save-btn').innerHTML='<i class="ti ti-device-floppy"></i> '+t('pur_save_edits');
  renderPiL();
  openModal('m-pur');
}
function renderPurs(search=''){
  const tb=G('pur-tb');
  const term=normalizeText(search);
  const dateFrom=G('pur-date-from')?.value||'';
  const dateTo=G('pur-date-to')?.value||'';
  const recvFilter=G('pur-recv-filter')?.value||'';
  let full=[...DB.purs].reverse();
  if(term){full=full.filter(p=>normalizeText(p.num).includes(term)||normalizeText(p.supName).includes(term)||normalizeText(p.date).includes(term));}
  if(dateFrom){full=full.filter(p=>p.date>=dateFrom)}
  if(dateTo){full=full.filter(p=>p.date<=dateTo)}
  if(recvFilter==='yes'){full=full.filter(p=>p.receivedStock)}
  else if(recvFilter==='no'){full=full.filter(p=>!p.receivedStock)}
  if(!full.length){tb.innerHTML=emptyRow(8,term?t('lbl_search_results'):t('pur_no_invoices'));renderPag('pur-tb',0,renderPurs);return}
  const {data}=getPageData('pur-tb', full);
  tb.innerHTML=data.map(p=>{
    const paid=purPaid(p),rem=purRemaining(p);
    return`<tr>
      <td class="td-bold" style="color:var(--amber)">${p.num}</td>
      <td>${p.supName}</td>
      <td class="td-mono">${p.date}</td>
      <td class="td-mono" style="font-weight:700">${fmt(p.total)} ${t('currency_sym')}</td>
      <td class="td-mono" style="color:var(--green)">${fmt(paid)} ${t('currency_sym')}</td>
      <td class="td-mono ${rem>0?'text-red':'text-muted'}">${rem>0?fmt(rem)+' '+t('currency_sym'):'✓'}</td>
      <td>${purPayStatus(p)}</td>
      <td><div class="td-actions">
        <button class="btn btn-sm" data-ctx-view onclick="viewPur(${p.id})"><i class="ti ti-eye"></i></button>
        ${['admin','system_admin'].includes(currentUser?.role)?`<button class="btn btn-sm btn-icon" data-ctx-edit onclick="editPur(${p.id})" title="تعديل"><i class="ti ti-pencil"></i></button>`:''}
      </div></td>
    </tr>`
  }).join('');
  renderPag('pur-tb',full.length,renderPurs)
}

/* ═══ SUPPLIER PAYMENTS ═══ */
function saveSupPay(){
  const btn=G('m-suppay')?.querySelector('.btn-primary');setBtnLoading(btn,true);
  try {
    const supId=parseInt(G('sp-sup').value);
    if(!supId){toast(t('pur_choose_supplier'),'error');return}
    const amount=parseFloat(G('sp-amt').value)||0;
    if(amount<=0){toast(t('pay_enter_amount'),'error');return}
    const sup=DB.sups.find(x=>x.id===supId);
    const date=G('sp-date').value;
    const checkNum=_spPay==='check'?G('sp-check-num')?.value:'';
    const notes=G('sp-notes')?.value||'';

    const checkedPurs=[];
    document.querySelectorAll('.sp-pur-cb:checked').forEach(cb=>{
      const purId=parseInt(cb.dataset.purId);
      const pur=DB.purs.find(x=>x.id===purId);
      if(pur)checkedPurs.push({pur,rem:purRemaining(pur)});
    });

    let remaining=amount;
    for(const x of checkedPurs){
      if(remaining<=0)break;
      const share=Math.min(remaining,x.rem);
      if(share>0.001){
        const pid='SPAY-'+String(DB.cSpay).padStart(5,'0');DB.cSpay++;
        DB.supPayments.push({
          id:pid,supId,supName:sup?.name||'—',
          purId:x.pur.id,purNum:x.pur.num,
          amount:share,date,mode:_spPay,checkNum,notes
        });
        remaining-=share;
      }
    }

    // Leftover → general payment
    if(remaining>0.001){
      const pid='SPAY-'+String(DB.cSpay).padStart(5,'0');DB.cSpay++;
      DB.supPayments.push({
        id:pid,supId,supName:sup?.name||'—',
        purId:null,purNum:'عام',
        amount:remaining,date,mode:_spPay,checkNum,notes
      });
    }

    const applied=amount-remaining;
    addLog(t('pur_payment'),`"${sup?.name}" — ${fmt(applied)} ${t('currency_sym')} — ${_spPay}${remaining>0.001?` — ${fmt(remaining)} ${t('currency_sym')} لم تُربط`:''}`,'#f05454');
    saveState();
    closeModal('m-suppay');renderSupPays();renderPurs();renderSups();updateStats();renderFin();
    broadcastChange('payments', { supId, amount: applied });
    toast(t('pay_received')+' '+fmt(applied)+' '+t('currency_sym')+' — '+sup?.name)
  } finally {
    setBtnLoading(btn,false);
  }
}

function renderSupPays(search=''){
  const tb=G('suppay-tb');
  const term=normalizeText(search);
  const dateFrom=G('spay-date-from')?.value||'';
  const dateTo=G('spay-date-to')?.value||'';
  let full=[...DB.supPayments].reverse();
  if(term){full=full.filter(p=>normalizeText(p.id).includes(term)||normalizeText(p.supName).includes(term)||normalizeText(p.purNum).includes(term))}
  if(dateFrom){full=full.filter(p=>p.date>=dateFrom)}
  if(dateTo){full=full.filter(p=>p.date<=dateTo)}
  if(!full.length){tb.innerHTML=emptyRow(6);renderPag('suppay-tb',0,renderSupPays);return}
  const {data}=getPageData('suppay-tb', full);
  tb.innerHTML=data.map(p=>`<tr>
    <td class="td-bold" style="color:var(--teal)">${p.id}</td>
    <td>${p.supName}</td>
    <td class="td-mono">${p.purNum||'—'}</td>
    <td class="td-mono" style="color:var(--red);font-weight:700">${fmt(p.amount)} ${t('currency_sym')}</td>
    <td>${payLbl(p.mode)}</td>
    <td class="td-mono">${p.date}</td>
  </tr>`).join('');
  renderPag('suppay-tb',full.length,renderSupPays)
}

function updateSupPaySummary(){
  const supId=parseInt(G('sp-sup')?.value);
  const summaryEl=G('spay-summary');
  const pursEl=G('spay-purs');
  if(!supId){if(summaryEl)summaryEl.style.display='none';if(pursEl)pursEl.innerHTML='';return}
  const sup=DB.sups.find(x=>x.id===supId);if(!sup){summaryEl.style.display='none';return}
  const totalPur=DB.purs.filter(p=>p.supId===supId).reduce((s,p)=>s+p.total,0);
  const totalPaid=DB.supPayments.filter(p=>p.supId===supId).reduce((s,p)=>s+p.amount,0);
  const unpaidPurs=DB.purs.filter(p=>p.supId===supId&&purRemaining(p)>0.001).sort((a,b)=>a.date.localeCompare(b.date));
  const totalUnpaid=unpaidPurs.reduce((s,p)=>s+purRemaining(p),0);

  summaryEl.style.display='';
  summaryEl.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px">
      <div><div style="font-size:11px;color:var(--text-muted)">المورد</div><div style="font-weight:700;color:var(--teal)">${sup.name}</div></div>
      <div><div style="font-size:11px;color:var(--text-muted)">إجمالي المشتريات</div><div style="font-weight:700">${fmt(totalPur)} ${t('currency_sym')}</div></div>
      <div><div style="font-size:11px;color:var(--text-muted)">محصَّل سابقاً</div><div style="font-weight:700;color:var(--green)">${fmt(totalPaid)} ${t('currency_sym')}</div></div>
      <div><div style="font-size:11px;color:var(--text-muted)">المتبقي</div><div style="font-weight:700;color:${totalUnpaid>0?'var(--red)':'var(--green)'}">${fmt(totalUnpaid)} ${t('currency_sym')}</div></div>
    </div>`;

  if(!unpaidPurs.length){
    pursEl.innerHTML='<div style="text-align:center;padding:16px;color:var(--text-muted);font-size:13px"><i class="ti ti-check-circle" style="font-size:24px;display:block;margin-bottom:8px;color:var(--green)"></i>'+t('col_all_paid')+'</div>';
    return;
  }

  pursEl.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;font-size:12px">
      <span>فواتير شراء غير مسددة: <strong style="color:var(--red)">${fmt(totalUnpaid)} ${t('currency_sym')}</strong></span>
      <span>${unpaidPurs.length} فاتورة</span>
    </div>
    <div class="tbl-wrap"><table style="width:100%;font-size:12px;border-collapse:collapse">
      <thead><tr style="border-bottom:2px solid var(--line)">
        <th style="text-align:right;padding:6px"><label style="cursor:pointer"><input type="checkbox" class="sp-select-all" onchange="toggleSupPayAll(this)" checked> الكل</label></th>
        <th style="text-align:right;padding:6px">الفاتورة</th><th style="text-align:right;padding:6px">التاريخ</th><th style="text-align:right;padding:6px">الإجمالي</th><th style="text-align:right;padding:6px">المدفوع</th><th style="text-align:right;padding:6px">المتبقي</th>
      </tr></thead>
      <tbody>${unpaidPurs.map(pur=>{
        const rem=purRemaining(pur);
        return`<tr>
          <td style="padding:6px"><input type="checkbox" class="sp-pur-cb" data-pur-id="${pur.id}" data-rem="${rem}" onchange="recalcSupPayPreview()" checked></td>
          <td style="padding:6px;font-weight:600;color:var(--amber)">${pur.num}</td>
          <td style="padding:6px" class="td-mono">${pur.date}</td>
          <td style="padding:6px" class="td-mono">${fmt(pur.total)} ${t('currency_sym')}</td>
          <td style="padding:6px;color:var(--green)" class="td-mono">${fmt(purPaid(pur))} ${t('currency_sym')}</td>
          <td style="padding:6px;color:var(--red);font-weight:700" class="td-mono">${fmt(rem)} ${t('currency_sym')}</td>
        </tr>`
      }).join('')}</tbody>
    </table></div>
    <div style="margin-top:6px;padding:6px 10px;background:var(--bg);border-radius:var(--r);font-size:12px;display:flex;justify-content:space-between">
      <span>إجمالي المتبقي المحدد: <strong style="color:var(--red)" id="sp-total-unpaid">${fmt(totalUnpaid)} ${t('currency_sym')}</strong></span>
      <span>المتبقي بعد الدفع: <strong id="sp-after-pay" style="color:var(--red)">${fmt(totalUnpaid)} ${t('currency_sym')}</strong></span>
    </div>`;
}

function toggleSupPayAll(el){
  document.querySelectorAll('.sp-pur-cb').forEach(cb=>cb.checked=el.checked);
  recalcSupPayPreview();
}

function recalcSupPayPreview(){
  const amt=parseFloat(G('sp-amt')?.value)||0;
  let totalUnpaid=0;
  document.querySelectorAll('.sp-pur-cb:checked').forEach(cb=>{totalUnpaid+=parseFloat(cb.dataset.rem)||0});
  const el1=G('sp-total-unpaid');if(el1)el1.textContent=fmt(totalUnpaid)+' '+t('currency_sym');
  const el2=G('sp-after-pay');if(el2){
    const after=Math.max(0,totalUnpaid-amt);
    el2.textContent=fmt(after)+' '+t('currency_sym');
    el2.style.color=after>0?'var(--red)':'var(--green)';
  }
}

/* ═══ SUPPLIER SETTLEMENT (multi-invoice) ═══ */
let _supSettleMode='auto';

function openSupSettlement(supId){
  if(!supId){
    supId=parseInt(G('sup-settle-sup')?.value)||0;
  }
  if(!supId){_supSettleMode='auto';openModal('m-sup-settle');popSel('sup-settle-sup',DB.sups,'id','name','-- اختر مورد --');return}
  const sup=DB.sups.find(x=>x.id===supId);if(!sup)return;
  _supSettleMode='auto';
  popSel('sup-settle-sup',DB.sups,'id','name','-- اختر مورد --');
  G('sup-settle-sup').value=supId;
  G('sup-settle-amt').value='';
  G('sup-settle-date').value=today();
  G('sup-settle-reason').value='';
  document.querySelectorAll('#sup-settle-mode-btns .settle-mode').forEach((b,i)=>b.classList.toggle('active',i===0));
  renderSupSettlePurs();
  openModal('m-sup-settle');
}

function setSupSettleMode(mode){
  _supSettleMode=mode;
  document.querySelectorAll('#sup-settle-mode-btns .settle-mode').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));
  const supId=parseInt(G('sup-settle-sup').value);
  if(supId)renderSupSettlePurs();
}

function renderSupSettlePurs(){
  const supId=parseInt(G('sup-settle-sup').value);
  if(!supId){
    // Show summary for selected supplier
    const el=G('sup-settle-summary');
    if(el)el.style.display='none';
    G('sup-settle-purs').innerHTML='<div style="text-align:center;padding:16px;color:var(--text-muted);font-size:13px"><i class="ti ti-arrow-left" style="font-size:24px;display:block;margin-bottom:8px"></i>'+t('pur_choose_supplier')+'</div>';
    return;
  }
  const sup=DB.sups.find(x=>x.id===supId);
  const unpaidPurs=DB.purs.filter(p=>p.supId===supId&&purRemaining(p)>0.001).sort((a,b)=>a.date.localeCompare(b.date));
  const totalUnpaid=unpaidPurs.reduce((s,p)=>s+purRemaining(p),0);
  const totalPur=DB.purs.filter(p=>p.supId===supId).reduce((s,p)=>s+p.total,0);
  const totalPaid=DB.supPayments.filter(p=>p.supId===supId).reduce((s,p)=>s+p.amount,0);
  const totalSettled=(DB.supSettlements||[]).filter(s=>s.supId===supId).reduce((s,x)=>s+x.amount,0);

  // Summary card
  const summaryEl=G('sup-settle-summary');
  if(summaryEl){
    summaryEl.style.display='';
    summaryEl.innerHTML=`
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px">
        <div><div style="font-size:11px;color:var(--text-muted)">المورد</div><div style="font-weight:700;color:var(--teal)">${sup.name}</div></div>
        <div><div style="font-size:11px;color:var(--text-muted)">إجمالي المشتريات</div><div style="font-weight:700">${fmt(totalPur)} ${t('currency_sym')}</div></div>
        <div><div style="font-size:11px;color:var(--text-muted)">محصَّل (دفعات)</div><div style="font-weight:700;color:var(--green)">${fmt(totalPaid)} ${t('currency_sym')}</div></div>
        <div><div style="font-size:11px;color:var(--text-muted)">تسويات سابقة</div><div style="font-weight:700;color:var(--amber)">${fmt(totalSettled)} ${t('currency_sym')}</div></div>
        <div><div style="font-size:11px;color:var(--text-muted)">المتبقي</div><div style="font-weight:700;color:${totalUnpaid>0?'var(--red)':'var(--green)'}">${fmt(totalUnpaid)} ${t('currency_sym')}</div></div>
      </div>`;
  }

  const amt=parseFloat(G('sup-settle-amt').value)||0;
  const el=G('sup-settle-purs');
  if(!unpaidPurs.length){
    el.innerHTML='<div style="text-align:center;padding:16px;color:var(--text-muted);font-size:13px"><i class="ti ti-check-circle" style="font-size:24px;display:block;margin-bottom:8px;color:var(--green)"></i>'+t('col_all_paid')+'</div>';
    return;
  }
  const purRows=unpaidPurs.map(pur=>{
    const rem=purRemaining(pur);
    let applied=0;
    if(_supSettleMode==='auto'&&amt>0){
      applied=totalUnpaid>0?(rem/totalUnpaid)*amt:0;
      applied=Math.min(applied,rem);
    }
    return`<tr>
      <td><label style="display:flex;align-items:center;gap:6px;cursor:pointer">
        <input type="checkbox" class="sup-settle-pur-cb" data-pur-id="${pur.id}" data-rem="${rem}" onchange="recalcSupSettlePreview()" checked>
        <span style="font-weight:600;color:var(--amber)">${pur.num}</span>
      </label></td>
      <td class="td-mono">${pur.date}</td>
      <td class="td-mono">${fmt(pur.total)} ${t('currency_sym')}</td>
      <td class="td-mono" style="color:var(--green)">${fmt(purPaid(pur))} ${t('currency_sym')}</td>
      <td class="td-mono" style="color:var(--red);font-weight:700">${fmt(rem)} ${t('currency_sym')}</td>
      <td class="td-mono sup-settle-applied" data-pur-id="${pur.id}" style="color:var(--amber);font-weight:700">${_supSettleMode==='auto'?fmt(applied)+' '+t('currency_sym'):'0.000 '+t('currency_sym')}</td>
      <td>${_supSettleMode==='manual'?`<input type="number" class="sup-settle-manual-amt" data-pur-id="${pur.id}" data-rem="${rem}" step="0.001" min="0" max="${rem}" value="0" onchange="recalcSupSettlePreview()" style="width:90px;font-size:12px;padding:4px 6px">`:''}</td>
    </tr>`
  });
  el.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;font-size:12px">
      <span>إجمالي غير مسدد: <strong style="color:var(--red)">${fmt(totalUnpaid)} ${t('currency_sym')}</strong></span>
      <span>${unpaidPurs.length} فواتير</span>
    </div>
    <div class="tbl-wrap"><table style="width:100%;font-size:12px;border-collapse:collapse">
      <thead><tr style="border-bottom:2px solid var(--line)"><th style="text-align:right;padding:6px">الفاتورة</th><th style="text-align:right;padding:6px">التاريخ</th><th style="text-align:right;padding:6px">الإجمالي</th><th style="text-align:right;padding:6px">المدفوع</th><th style="text-align:right;padding:6px">المتبقي</th><th style="text-align:right;padding:6px">يُخصَم</th>${_supSettleMode==='manual'?'<th style="padding:6px">المبلغ</th>':''}</tr></thead>
      <tbody>${purRows.join('')}</tbody>
    </table></div>
    <div style="margin-top:8px;padding:8px 10px;background:var(--bg);border-radius:var(--r);font-size:12px;display:flex;justify-content:space-between">
      <span>إجمالي الخصم: <strong style="color:var(--amber)" id="sup-settle-total-display">${fmt(amt)} ${t('currency_sym')}</strong></span>
      <span>المتبقي بعد الخصم: <strong id="sup-settle-remaining-display" style="color:${totalUnpaid-amt>0?'var(--red)':'var(--green)'}">${fmt(Math.max(0,totalUnpaid-amt))} ${t('currency_sym')}</strong></span>
    </div>`;
}

function recalcSupSettlePreview(){
  const amt=parseFloat(G('sup-settle-amt').value)||0;
  const totalUnpaid=calcSupSettleTotalUnpaid();
  if(_supSettleMode==='auto'){
    document.querySelectorAll('.sup-settle-pur-cb:checked').forEach(cb=>{
      const purId=parseInt(cb.dataset.purId);
      const rem=parseFloat(cb.dataset.rem);
      const applied=totalUnpaid>0?(rem/totalUnpaid)*amt:0;
      const el=document.querySelector(`.sup-settle-applied[data-pur-id="${purId}"]`);
      if(el)el.textContent=fmt(Math.min(applied,rem))+' '+t('currency_sym');
    });
  } else {
    document.querySelectorAll('.sup-settle-manual-amt').forEach(inp=>{
      const max=parseFloat(inp.dataset.rem)||0;
      const val=Math.min(parseFloat(inp.value)||0,max);
      inp.value=val;
      const el=document.querySelector(`.sup-settle-applied[data-pur-id="${inp.dataset.purId}"]`);
      if(el)el.textContent=fmt(val)+' '+t('currency_sym');
    });
  }
  const displayedTotal=_supSettleMode==='auto'?amt:calcSupSettleManualTotal();
  const el1=G('sup-settle-total-display');if(el1)el1.textContent=fmt(displayedTotal)+' '+t('currency_sym');
  const el2=G('sup-settle-remaining-display');if(el2){el2.textContent=fmt(Math.max(0,totalUnpaid-displayedTotal))+' '+t('currency_sym');el2.style.color=totalUnpaid-displayedTotal>0?'var(--red)':'var(--green)'}
}

function calcSupSettleTotalUnpaid(){
  let total=0;
  document.querySelectorAll('.sup-settle-pur-cb:checked').forEach(cb=>{total+=parseFloat(cb.dataset.rem)||0});
  return total;
}

function calcSupSettleManualTotal(){
  let total=0;
  document.querySelectorAll('.sup-settle-manual-amt').forEach(inp=>{total+=parseFloat(inp.value)||0});
  return total;
}

function saveSupSettlement(){
  const btn=G('m-sup-settle')?.querySelector('.btn-primary');setBtnLoading(btn,true);
  try {
    const supId=parseInt(G('sup-settle-sup').value);
    const sup=DB.sups.find(x=>x.id===supId);if(!sup){toast(t('pay_customer_err'),'error');return}
    const amt=parseFloat(G('sup-settle-amt').value)||0;
    const reason=G('sup-settle-reason').value.trim();
    const date=G('sup-settle-date').value;
    if(amt<=0){toast(t('pay_enter_amount'),'error');return}
    if(!reason){toast(t('pay_enter_reason'),'error');return}
    const checkedPurs=[];
    document.querySelectorAll('.sup-settle-pur-cb:checked').forEach(cb=>{
      const purId=parseInt(cb.dataset.purId);
      const pur=DB.purs.find(x=>x.id===purId);
      if(pur)checkedPurs.push({pur,rem:purRemaining(pur)});
    });
    if(!checkedPurs.length){toast(t('pay_choose_invoice'),'error');return}
    const totalUnpaid=checkedPurs.reduce((s,x)=>s+x.rem,0);
    const applied=[];
    let remaining=amt;
    for(const x of checkedPurs){
      let share=0;
      if(_supSettleMode==='auto'){
        share=totalUnpaid>0?(x.rem/totalUnpaid)*amt:0;
        share=Math.min(share,x.rem,remaining);
      } else {
        const inp=document.querySelector(`.sup-settle-manual-amt[data-pur-id="${x.pur.id}"]`);
        share=Math.min(parseFloat(inp?.value)||0,x.rem,remaining);
      }
      if(share>0.001){
        applied.push({purId:x.pur.id,purNum:x.pur.num,amount:share});
        x.pur.discount=(x.pur.discount||0)+share;
        x.pur.total=Math.max(0,x.pur.total-share);
        if(!x.pur.settlements)x.pur.settlements=[];
        x.pur.settlements.push({amount:share,reason,date});
        remaining-=share;
      }
    }
    if(!applied.length){toast(t('pay_no_applied'),'error');return}
    const settlement={
      id:'SSETL-'+String(DB.cSupSettle).padStart(5,'0'),
      supId,supName:sup.name,
      amount:amt,actualApplied:amt-remaining,remaining,
      reason,date,applied,
      mode:_supSettleMode
    };
    DB.cSupSettle++;
    if(!DB.supSettlements)DB.supSettlements=[];
    DB.supSettlements.push(settlement);
    addLog(t('pur_settle'),`${settlement.id} — "${sup.name}" — ${fmt(amt)} ${t('currency_sym')} — ${applied.length} فاتورة — ${reason}`,'#f5a623');
    saveState();
    closeModal('m-sup-settle');renderPurs();renderSups();updateStats();
    broadcastChange('settlements', { settlementId: settlement.id, supName: sup.name });
    toast(t('pay_applied')+' '+fmt(amt)+' '+t('currency_sym'))
  } finally {
    setBtnLoading(btn,false);
  }
}


/* ═══════════════════════════════════════════════
   reports.js
══════════════════════════════════════════════ */

﻿/* ═══ SOA ═══ */
function renderSOA(){
  const type=G('soa-type')?.value||'customer';
  const id=parseInt(G('soa-cust')?.value);
  const out=G('soa-out');
  const company=currentCompany();
  const from=G('soa-from')?.value,to=G('soa-to')?.value;
  if(type==='supplier'){
    const s=DB.sups.find(x=>x.id===id);
    if(!s){out.innerHTML='<div class="card" style="text-align:center;color:var(--text-muted);padding:40px"><i class="ti ti-users" style="font-size:36px;display:block;margin-bottom:8px;opacity:.3"></i>'+t('soa_choose_supplier')+'</div>';return}
    let txns=[];
    DB.purs.filter(p=>p.supId===id).forEach(p=>{if(from&&p.date<from)return;if(to&&p.date>to)return;txns.push({date:p.date,desc:`فاتورة شراء ${p.num}`,dr:p.total,cr:0,type:'pur'})});
    DB.supPayments.filter(p=>p.supId===id).forEach(p=>{if(from&&p.date<from)return;if(to&&p.date>to)return;txns.push({date:p.date,desc:`دفعة ${p.id}`,dr:0,cr:p.amount,type:'pay'})});
    txns.sort((a,b)=>a.date.localeCompare(b.date));
    let bal=0;
    const rows=txns.map(tx=>{bal+=tx.dr-tx.cr;return`<tr><td>${tx.date}</td><td>${tx.desc}</td><td class="td-mono" style="color:var(--red)">${tx.dr?fmt(tx.dr)+' '+t('currency_sym'):'\u2014'}</td><td class="td-mono" style="color:var(--green)">${tx.cr?fmt(tx.cr)+' '+t('currency_sym'):'\u2014'}</td><td class="td-mono" style="font-weight:700">${fmt(bal)} ${t('currency_sym')}</td></tr>`}).join('');
    out.innerHTML=renderSOATable(company,s.name,rows,bal,txns)
  } else {
    const c=DB.custs.find(x=>x.id===id);
    if(!c){out.innerHTML='<div class="card" style="text-align:center;color:var(--text-muted);padding:40px"><i class="ti ti-user-circle" style="font-size:36px;display:block;margin-bottom:8px;opacity:.3"></i>'+t('soa_choose_customer')+'</div>';return}
    let txns=[];
    const openBal=parseFloat(c.openBal)||0;
    if(openBal>0){txns.push({date:'—',desc:'رصيد افتتاحي (مديونية سابقة)',dr:openBal,cr:0,type:'obal'})}
    DB.invs.filter(i=>i.custId===id).forEach(i=>{if(from&&i.date<from)return;if(to&&i.date>to)return;txns.push({date:i.date,desc:`فاتورة ${i.num}`,dr:i.total,cr:0,type:'inv'})});
    DB.payments.filter(p=>p.custId===id).forEach(p=>{if(from&&p.date<from)return;if(to&&p.date>to)return;txns.push({date:p.date,desc:`دفعة ${p.id || ''}`,dr:0,cr:p.amount,type:'pay'})});
    DB.rets.filter(r=>{const inv=DB.invs.find(i=>i.num===r.invNum);return inv&&inv.custId===id}).forEach(r=>{if(from&&r.date<from)return;if(to&&r.date>to)return;txns.push({date:r.date,desc:`مرتجع ${r.num}`,dr:-r.amt,cr:r.amt,type:'ret'})});
    txns.sort((a,b)=>a.date.localeCompare(b.date));
    let bal=0;
    const rows=txns.map(tx=>{bal+=tx.dr-tx.cr;const drAmount=tx.dr<0?0:tx.dr;return`<tr><td>${tx.date}</td><td>${tx.desc}</td><td class="td-mono" style="color:var(--red)">${drAmount?fmt(drAmount)+' '+t('currency_sym'):'\u2014'}</td><td class="td-mono" style="color:var(--green)">${tx.cr?fmt(tx.cr)+' '+t('currency_sym'):'\u2014'}</td><td class="td-mono" style="font-weight:700">${fmt(bal)} ${t('currency_sym')}</td></tr>`}).join('');
    out.innerHTML=renderSOATable(company,c.name,rows,bal,txns)
  }
}
function renderSOATable(company,name,rows,bal,txns){
  const totalDr=(txns||[]).reduce((s,tx)=>s+(tx.dr>0?tx.dr:0),0);
  const totalCr=(txns||[]).reduce((s,tx)=>s+(tx.cr||0),0);
  return`<div class="card"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px"><div><h2 style="font-size:18px;margin:0">${company.name}</h2><div style="font-size:11px;color:var(--text-muted)">${company.address}</div></div><h3 style="color:var(--accent)">${name}</h3></div><div class="tbl-wrap"><table><thead><tr><th>التاريخ</th><th>البيان</th><th>مدين</th><th>دائن</th><th>الرصيد</th></tr></thead><tbody>${rows||'<tr><td colspan="5"><div class="empty-st">لا توجد حركات.</div></td></tr>'}</tbody></table></div><div style="display:flex;gap:30px;margin-top:12px;padding:10px;border-top:1px solid var(--border)"><span><strong>إجمالي المدين:</strong> ${fmt(totalDr)} ${t('currency_sym')}</span><span><strong>إجمالي الدائن:</strong> ${fmt(totalCr)} ${t('currency_sym')}</span><span style="color:${bal>0?'var(--red)':'var(--green)'}"><strong>الرصيد النهائي:</strong> ${fmt(bal)} ${t('currency_sym')}</span></div></div>`;
}

function printSOA(){
  const type=G('soa-type')?.value||'customer';
  const id=parseInt(G('soa-cust').value);
  const company=currentCompany();
  const from=G('soa-from').value,to=G('soa-to').value;
  let name='';let txns=[];
  if(type==='supplier'){
    const s=DB.sups.find(x=>x.id===id);if(!s){toast(t('pur_choose_supplier_first'),'error');return}
    name=s.name;
    DB.purs.filter(p=>p.supId===id).forEach(p=>{if(from&&p.date<from)return;if(to&&p.date>to)return;txns.push({date:p.date,desc:`فاتورة شراء ${p.num}`,dr:p.total,cr:0})});
    DB.supPayments.filter(p=>p.supId===id).forEach(p=>{if(from&&p.date<from)return;if(to&&p.date>to)return;txns.push({date:p.date,desc:`دفعة ${p.id}`,dr:0,cr:p.amount})});
  } else {
    const c=DB.custs.find(x=>x.id===id);if(!c){toast(t('pay_choose_customer'),'error');return}
    name=c.name;
    const openBal=parseFloat(c.openBal)||0;
    if(openBal>0)txns.push({date:'—',desc:'رصيد افتتاحي',dr:openBal,cr:0});
    DB.invs.filter(i=>i.custId===id).forEach(i=>{if(from&&i.date<from)return;if(to&&i.date>to)return;txns.push({date:i.date,desc:`فاتورة ${i.num}`,dr:i.total,cr:0})});
    DB.payments.filter(p=>p.custId===id).forEach(p=>{if(from&&p.date<from)return;if(to&&p.date>to)return;txns.push({date:p.date,desc:`دفعة ${p.id||''}`,dr:0,cr:p.amount})});
    DB.rets.filter(r=>{const inv=DB.invs.find(i=>i.num===r.invNum);return inv&&inv.custId===id}).forEach(r=>{if(from&&r.date<from)return;if(to&&r.date>to)return;txns.push({date:r.date,desc:`مرتجع ${r.num}`,dr:-r.amt,cr:r.amt})});
  }
  txns.sort((a,b)=>a.date.localeCompare(b.date));
  let bal=0;txns.forEach(t=>{bal+=t.dr-t.cr});
  const totalDr=txns.reduce((s,tx)=>s+(tx.dr>0?tx.dr:0),0);
  const totalCr=txns.reduce((s,tx)=>s+(tx.cr||0),0);
  const win=window.open('','_blank','width=960,height=1150');
  if(!win){toast(t('sales_print_err'),'error');return}
  const now=new Date();
  const dateStr=now.toLocaleDateString('ar-LY');
  const timeStr=now.toLocaleTimeString('ar-LY',{hour:'2-digit',minute:'2-digit'});
  const dateRange=(from||to)?`من ${from||'...'} إلى ${to||'...'}`:'كل الفترة';
  const balColor=bal>0.001?'#dc2626':bal<-0.001?'#16a34a':'#1e293b';
  const balBg=bal>0.001?'#fef2f2':bal<-0.001?'#f0fdf4':'#f8fafc';
  const balBorder=bal>0.001?'#fecaca':bal<-0.001?'#bbf7d0':'#e2e8f0';
  const balLabel=bal>0.001?'(مدين)':bal<-0.001?'(دائن)':'(متساوي)';
  let runningBal=0;
  const rowsHtml=txns.length?txns.map(t=>{
    runningBal+=t.dr-t.cr;
    const drAmt=t.dr<0?0:t.dr;
    const rowBal=runningBal;
    const rowColor=rowBal>0.001?'#dc2626':rowBal<-0.001?'#16a34a':'#1e293b';
    return`<tr>
      <td style="font-family:monospace;direction:ltr;text-align:right">${t.date}</td>
      <td>${t.desc}</td>
      <td style="direction:ltr;text-align:right;font-family:monospace;font-weight:600">${drAmt?fmt(drAmt):'—'}</td>
      <td style="direction:ltr;text-align:right;font-family:monospace;font-weight:600">${t.cr?fmt(t.cr):'—'}</td>
      <td style="font-weight:700;color:${rowColor};direction:ltr;text-align:right;font-family:monospace">${fmt(rowBal)}</td>
    </tr>`
  }).join(''):'<tr><td colspan="5" style="text-align:center;padding:40px;color:#94a3b8"><i class="ti ti-inbox" style="font-size:28px;display:block;margin-bottom:8px;opacity:.3"></i>لا توجد حركات في الفترة المحددة</td></tr>';

  const html=`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>كشف حساب ${name}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
  @page{size:A4 portrait;margin:14mm 18mm 16mm}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Cairo',Helvetica,Arial,sans-serif;direction:rtl;color:#1e293b;padding:0;font-size:12px;line-height:1.5;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}

  .soa{position:relative;padding:20px 24px 60px}

  /* Accent bars */
  .soa-accent{position:absolute;top:0;left:0;right:0;height:5px;background:linear-gradient(135deg,#4f8ef7 0%,#6c5ce7 50%,#a855f7 100%);border-radius:0 0 4px 4px}
  .soa-side{position:absolute;top:0;right:0;width:4px;height:100%;background:linear-gradient(180deg,#4f8ef7,#6c5ce7,#a855f7);border-radius:0 0 4px 4px;opacity:.25}

  /* Watermark */
  .soa-watermark{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-30deg);font-size:52px;font-weight:900;color:rgba(79,142,247,0.03);pointer-events:none;z-index:0;white-space:nowrap;letter-spacing:6px}

  /* Header */
  .soa-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:18px;padding-top:10px;gap:20px}
  .soa-company{flex:1}
  .soa-company-name{font-size:22px;font-weight:800;color:#4f8ef7;margin-bottom:3px;letter-spacing:-0.3px}
  .soa-company-sub{font-size:11px;color:#64748b;line-height:1.6}
  .soa-company-sub span{display:inline-block;margin-left:12px}
  .soa-title-box{text-align:left;min-width:220px}
  .soa-title{font-size:26px;font-weight:800;color:#1e293b;margin-bottom:4px}
  .soa-title::after{content:'';display:block;width:60px;height:3px;background:linear-gradient(90deg,#4f8ef7,#6c5ce7);border-radius:2px;margin-top:6px;margin-left:auto}
  .soa-meta{font-size:11px;color:#64748b;line-height:1.8;margin-top:8px}
  .soa-meta strong{color:#1e293b;font-weight:600}

  /* Summary cards */
  .soa-summary{display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap}
  .soa-sc{flex:1;min-width:140px;padding:12px 16px;background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;text-align:center}
  .soa-sc-label{font-size:9px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;margin-bottom:3px}
  .soa-sc-value{font-size:18px;font-weight:800}
  .soa-sc.red{border-color:#fecaca;background:#fef2f2}
  .soa-sc.red .soa-sc-value{color:#dc2626}
  .soa-sc.green{border-color:#bbf7d0;background:#f0fdf4}
  .soa-sc.green .soa-sc-value{color:#16a34a}
  .soa-sc.blue{border-color:#bfdbfe;background:#eff6ff}
  .soa-sc.blue .soa-sc-value{color:#4f8ef7}

  /* Info grid */
  .soa-info{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:16px;padding:12px;background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;font-size:12px}
  .soa-info label{font-size:9px;color:#94a3b8;display:block;margin-bottom:1px;font-weight:600;text-transform:uppercase}
  .soa-info span{font-weight:600;color:#1e293b}

  /* Table */
  table{width:100%;border-collapse:collapse;margin:0;font-size:11px}
  thead th{background:linear-gradient(135deg,#4f8ef7,#5b9cf7);color:#fff;padding:10px 8px;font-weight:600;text-align:right;font-size:11px}
  thead th:first-child{border-radius:0 8px 0 0}
  thead th:last-child{border-radius:8px 0 0 0}
  tbody td{padding:8px;border-bottom:1px solid #f1f5f9}
  tbody tr.alt{background:#f8fafc}
  tbody tr:hover{background:#eff6ff}
  tbody tr:last-child td{border-bottom:2px solid #e2e8f0}

  /* Footer */
  .soa-footer{margin-top:18px;padding-top:12px;border-top:2px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;font-size:9px;color:#94a3b8}
  .soa-footer-brand{font-weight:700;color:#4f8ef7;font-size:11px}

  @media print{
    body{padding:0;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
    .soa{padding:0 4mm 10mm}
    .soa-watermark{display:none}
    .soa-accent{height:4px}
    table{page-break-inside:auto}
    tr{page-break-inside:avoid;page-break-after:auto}
    thead{display:table-header-group}
  }
  </style></head><body>
  <div class="soa">
    <div class="soa-accent"></div>
    <div class="soa-side"></div>
    <div class="soa-watermark">كشف حساب ${name}</div>

    <div class="soa-header">
      <div class="soa-company">
        ${company.logo?'<div style="margin-bottom:6px">'+companyLogoHtml(company,45)+'</div>':''}
        <div class="soa-company-name">${company.name}</div>
        <div class="soa-company-sub">
          ${company.address ? '<span><i class="ti ti-map-pin" style="font-size:10px"></i> '+company.address+'</span>' : ''}
          ${company.phone ? '<span><i class="ti ti-phone" style="font-size:10px"></i> '+company.phone+'</span>' : ''}
          ${company.email ? '<span><i class="ti ti-mail" style="font-size:10px"></i> '+company.email+'</span>' : ''}
        </div>
      </div>
      <div class="soa-title-box">
        <div class="soa-title">كشف حساب</div>
        <div class="soa-meta">
          <div>${type==='supplier'?'المورد':'الزبون'}: <strong>${name}</strong></div>
          <div>الفترة: <strong>${dateRange}</strong></div>
          <div>تاريخ الطباعة: <strong>${dateStr} ${timeStr}</strong></div>
        </div>
      </div>
    </div>

    <div class="soa-summary">
      <div class="soa-sc red">
        <div class="soa-sc-label">إجمالي المدين</div>
        <div class="soa-sc-value">${fmt(totalDr)} ${t('currency_sym')}</div>
      </div>
      <div class="soa-sc green">
        <div class="soa-sc-label">إجمالي الدائن</div>
        <div class="soa-sc-value">${fmt(totalCr)} ${t('currency_sym')}</div>
      </div>
      <div class="soa-sc blue" style="border-color:${balBorder};background:${balBg}">
        <div class="soa-sc-label">الرصيد النهائي</div>
        <div class="soa-sc-value" style="color:${balColor}">${fmt(Math.abs(bal))} ${t('currency_sym')} ${balLabel}</div>
      </div>
    </div>

    <div class="soa-info">
      <div><label>${type==='supplier'?'اسم المورد':'اسم الزبون'}</label><span>${name}</span></div>
      <div><label>عدد الحركات</label><span>${txns.length} حركة</span></div>
      <div><label>الفترة</label><span>${dateRange}</span></div>
    </div>

    <table>
      <thead><tr>
        <th style="width:80px">التاريخ</th>
        <th>البيان</th>
        <th style="width:90px">مدين (${t('currency_sym')})</th>
        <th style="width:90px">دائن (${t('currency_sym')})</th>
        <th style="width:100px">الرصيد (${t('currency_sym')})</th>
      </tr></thead>
      <tbody>${rowsHtml}</tbody>
    </table>

    <div class="soa-footer">
      <span class="soa-footer-brand">${company.name}</span>
      <span>كشف حساب ${type==='supplier'?'المورد':'الزبون'}: ${name}</span>
      <span>${dateStr} ${timeStr}</span>
    </div>
  </div>
  <script>window.onload=function(){window.print();window.onafterprint=function(){window.close()}}<\/script>
  </body></html>`;
  win.document.write(html);win.document.close();
}

/* ═══ FINANCE ═══ */
function renderFin(search){
  const localTerm=G('fin-local-search')?.value||'';
  const term = normalizeText(localTerm || search || '');
  const from=G('fin-date-from')?.value||'', to=G('fin-date-to')?.value||'';
  const typeFilter=G('fin-type-filter')?.value||'';

  let cashPayments=DB.payments.filter(p=>p.mode==='cash');
  let checkPayments=DB.payments.filter(p=>p.mode==='check');
  let supOutPayments=[...DB.supPayments];

  if(term){
    cashPayments=cashPayments.filter(p=>normalizeText(p.custName||'').includes(term)||normalizeText(p.invNum||'').includes(term)||normalizeText(p.id||'').includes(term)||normalizeText(p.date||'').includes(term));
    checkPayments=checkPayments.filter(p=>normalizeText(p.custName||'').includes(term)||normalizeText(p.invNum||'').includes(term)||normalizeText(p.id||'').includes(term)||normalizeText(p.date||'').includes(term));
    supOutPayments=supOutPayments.filter(p=>normalizeText(p.supName||'').includes(term)||normalizeText(p.purNum||'').includes(term)||normalizeText(p.id||'').includes(term)||normalizeText(p.date||'').includes(term));
  }
  if(from){
    cashPayments=cashPayments.filter(p=>p.date>=from);
    checkPayments=checkPayments.filter(p=>p.date>=from);
    supOutPayments=supOutPayments.filter(p=>p.date>=from);
  }
  if(to){
    cashPayments=cashPayments.filter(p=>p.date<=to);
    checkPayments=checkPayments.filter(p=>p.date<=to);
    supOutPayments=supOutPayments.filter(p=>p.date<=to);
  }

  const totalCash=cashPayments.reduce((s,p)=>s+p.amount,0);
  const totalCheck=checkPayments.reduce((s,p)=>s+p.amount,0);
  const totalSupOut=supOutPayments.reduce((s,p)=>s+p.amount,0);
  const cashEl=G('f-ci');if(cashEl)cashEl.textContent=fmt(totalCash);
  const checkEl=G('f-chv');if(checkEl)checkEl.textContent=fmt(totalCheck);
  const supEl=G('f-sup-out');if(supEl)supEl.textContent=fmt(totalSupOut);
  const cashTb=G('cash-tb');
  if(cashTb){cashTb.innerHTML=cashPayments.length?[...cashPayments].reverse().map(p=>`<tr><td class="td-mono">${p.date}</td><td>${p.id} — ${p.invNum||''}</td><td>${p.custName||''}</td><td class="td-mono" style="font-weight:700;color:var(--green)">+${fmt(p.amount)} ${t('currency_sym')}</td></tr>`).join(''):emptyRow(4,t('hrm_no_movements'))}
  const chkTb=G('chk-tb');
  if(chkTb){chkTb.innerHTML=checkPayments.length?[...checkPayments].reverse().map(p=>`<tr><td>${p.id} — ${p.invNum||''}</td><td class="td-mono">${p.date}</td><td>${p.custName||''}</td><td class="td-mono" style="font-weight:700;color:var(--green)">+${fmt(p.amount)} ${t('currency_sym')}</td><td>${payLbl(p.mode)}</td></tr>`).join(''):emptyRow(5,t('hrm_no_movements'))}
  const supoutTb=G('supout-tb');
  if(supoutTb){supoutTb.innerHTML=supOutPayments.length?[...supOutPayments].reverse().map(p=>`<tr><td class="td-mono">${p.date}</td><td>${p.id} — ${p.purNum||''}</td><td>${p.supName||''}</td><td class="td-mono" style="font-weight:700;color:var(--red)">-${fmt(p.amount)} ${t('currency_sym')}</td><td>${payLbl(p.mode)}</td></tr>`).join(''):emptyRow(5,t('hrm_no_movements'))}
  const crdTb=G('crd-tb');
  if(crdTb){
    let creditInvs=DB.invs.filter(i=>{const rem=invRemaining(i);return rem>0.001});
    if(term) creditInvs=creditInvs.filter(i=>normalizeText(i.num||'').includes(term)||normalizeText(i.custName||'').includes(term)||normalizeText(i.date||'').includes(term));
    if(from) creditInvs=creditInvs.filter(i=>i.date>=from);
    if(to) creditInvs=creditInvs.filter(i=>i.date<=to);
    crdTb.innerHTML=creditInvs.length?creditInvs.map(i=>`<tr><td class="td-bold" style="color:var(--accent)">${i.num}</td><td>${i.custName}</td><td class="td-mono">${fmt(i.total)} ${t('currency_sym')}</td><td class="td-mono" style="color:var(--green)">${fmt(invPaid(i))} ${t('currency_sym')}</td><td class="td-mono" style="color:var(--red);font-weight:700">${fmt(invRemaining(i))} ${t('currency_sym')}</td><td class="td-mono">${i.date}</td></tr>`).join(''):emptyRow(6,t('col_unpaid_invoices'))
  }
  // Type filter: show/hide tabs
  const tabs=document.querySelectorAll('#p-finance .tabs .tab');
  const tabIds=['fin-cash','fin-check','fin-supout','fin-credit'];
  if(typeFilter){
    const map={cash:0,check:1,supplier:2,credit:3};
    tabIds.forEach((id,i)=>{
      const el=G(id);
      if(el) el.style.display = i===map[typeFilter]?'':'none';
      if(tabs[i]) tabs[i].style.display = i===map[typeFilter]?'':'none';
    });
    if(tabs[map[typeFilter]]) tabs[map[typeFilter]].classList.add('on');
  } else {
    tabIds.forEach(id=>{const el=G(id);if(el)el.style.display='none'});
    if(tabs[0]) tabs[0].classList.add('on');
    const fc=G('fin-cash');if(fc)fc.style.display='';
  }
}

function finTab(tab,el){
  document.querySelectorAll('#p-finance .tab').forEach(t=>t.classList.remove('on'));
  if(el)el.classList.add('on');
  ['fin-cash','fin-check','fin-supout','fin-credit'].forEach(id=>{const e=G(id);if(e)e.style.display='none'});
  const target=G('fin-'+tab);
  if(target)target.style.display='';
}

/* ═══ P&L ═══ */
function renderPL(search){
  const localTerm=G('pl-local-search')?.value||'';
  const term = normalizeText(localTerm || search || '');
  const from=G('pl-date-from')?.value||'', to=G('pl-date-to')?.value||'';
  let invs=DB.invs.filter(i=>i.dlvStatus==='delivered');
  if(from) invs=invs.filter(i=>i.date>=from);
  if(to) invs=invs.filter(i=>i.date<=to);
  let totalRev=0,totalCost=0;
  invs.forEach(i=>{
    i.lines.forEach(l=>{totalRev+=l.total;totalCost+=(l.buyPrice||0)*l.qty})
  });
  const profit=totalRev-totalCost;
  const margin=totalRev>0?((profit/totalRev)*100).toFixed(1):0;
  if(G('pl-rev')) G('pl-rev').textContent=fmt(totalRev);
  if(G('pl-cogs')) G('pl-cogs').textContent=fmt(totalCost);
  if(G('pl-gp')) G('pl-gp').textContent=fmt(profit);
  if(G('pl-margin')) G('pl-margin').textContent=margin+'%';
  const itemPL={};
  invs.forEach(i=>{
    i.lines.forEach(l=>{
      const key=l.itemId||l.name;
      if(!itemPL[key])itemPL[key]={name:l.name,qty:0,rev:0,cost:0};
      itemPL[key].qty+=l.qty;
      itemPL[key].rev+=l.total;
      itemPL[key].cost+=(l.buyPrice||0)*l.qty
    })
  });
  let rows=Object.values(itemPL);
  if(term) rows=rows.filter(r=>normalizeText(r.name).includes(term));
  const tb=G('pl-tb');
  if(!rows.length){tb.innerHTML=emptyRow(5,t('report_no_data'));return}
  tb.innerHTML=rows.map(r=>{
    const profit=r.rev-r.cost;
    const m=r.rev>0?((profit/r.rev)*100).toFixed(1):0;
    return`<tr>
      <td class="td-bold">${r.name}</td>
      <td class="td-mono">${r.qty}</td>
      <td class="td-mono">${fmt(r.rev)} ${t('currency_sym')}</td>
      <td class="td-mono">${fmt(r.cost)} ${t('currency_sym')}</td>
      <td class="td-mono ${profit>=0?'text-green':'text-red'}" style="font-weight:700">${fmt(profit)} ${t('currency_sym')}</td>
      <td><span class="badge ${profit>=0?'b-green':'b-red'}">${m}%</span></td>
    </tr>`
  }).join('');
  setTimeout(renderPLChart,50);
}

/* ═══ AUDIT ═══ */
function renderAudit(search){
  const localTerm=G('audit-local-search')?.value||'';
  const term = normalizeText(localTerm || search || '');
  const userFilter=G('audit-user-filter')?.value||'';
  const actionFilter=G('audit-action-filter')?.value||'';
  const userSelect=G('audit-user-filter');
  if(userSelect && userSelect.options.length<=1){
    const users=[...new Set(DB.log.map(l=>l.user).filter(Boolean))];
    users.forEach(u=>{const o=document.createElement('option');o.value=u;o.textContent=u;userSelect.appendChild(o)});
  }
  let logs=[...DB.log];
  if(term) logs=logs.filter(l=>normalizeText(l.action||'').includes(term)||normalizeText(l.detail||'').includes(term)||normalizeText(l.user||'').includes(term)||normalizeText(l.date||'').includes(term));
  if(userFilter) logs=logs.filter(l=>normalizeText(l.user||'').includes(userFilter));
  if(actionFilter) logs=logs.filter(l=>normalizeText(l.action||'').includes(actionFilter));
  const d=G('audit-list');
  if(!logs.length){d.innerHTML='<div class="empty-st" style="padding:40px"><i class="ti ti-shield-check" style="font-size:32px;display:block;margin-bottom:8px;opacity:.2"></i><span>'+t('no_results')+'</span></div>';return}
  d.innerHTML=logs.map(l=>`<div class="log-entry">
    <div class="log-dot" data-color="${l.color}"></div>
    <div class="log-text">
      <div class="log-action">${escapeHtml(l.action)}<span style="font-weight:400;color:var(--text-secondary)"> — ${escapeHtml(l.detail)}</span></div>
      <div class="log-time"><i class="ti ti-user" style="font-size:11px"></i> ${escapeHtml(l.user)} &nbsp;•&nbsp; ${escapeHtml(l.date)} ${escapeHtml(l.time)}</div>
    </div>
  </div>`).join('');
  d.querySelectorAll('.log-dot').forEach(el=>{const c=el.dataset.color;if(c)el.style.background=c})
}
function renderDashLog(){
  const d=G('d-log-list');if(!d)return;
  if(!DB.log.length){d.innerHTML='<div style="font-size:11px;color:var(--text-muted);padding:8px">'+t('lbl_no_data')+'</div>';return}
  d.innerHTML=DB.log.slice(0,8).map(l=>{
    const c=l.color||'#798ef7';
    let dotClass='dot-blue';
    if(c.includes('45,209')||c.includes('green')||c==='#2dd17e') dotClass='dot-green';
    else if(c.includes('245,166')||c.includes('amber')||c==='#f5a623') dotClass='dot-amber';
    else if(c.includes('240,84')||c.includes('red')||c==='#f05454') dotClass='dot-red';
    return `<div class="dash-log-item">
      <div class="dash-log-dot ${dotClass}"></div>
      <div class="dash-log-content">
        <div class="dash-log-title">${escapeHtml(l.action)}</div>
        <div class="dash-log-meta">${escapeHtml(l.detail)}</div>
      </div>
      <div class="dash-log-meta" style="white-space:nowrap">${escapeHtml(l.date)} ${escapeHtml(l.time)}</div>
    </div>`;
  }).join('');
}

/* ═══ SOA — EXCEL EXPORT ═══ */
function exportSOA() {
  const type = G('soa-type')?.value || 'customer';
  const id = parseInt(G('soa-cust').value);
  if (!id) { toast(t('soa_choose_customer'), 'info'); return; }
  const from = G('soa-from')?.value, to = G('soa-to')?.value;
  const h = ['التاريخ', 'البيان', 'مدين', 'دائن', 'الرصيد'];
  const rows = [];
  if (type === 'supplier') {
    const s = DB.sups.find(x => x.id === id);
    if (!s) { toast(t('pur_not_found'), 'info'); return; }
    let txns = [];
    DB.purs.filter(p => p.supId === id).forEach(p => { if (from && p.date < from) return; if (to && p.date > to) return; txns.push({ date: p.date, desc: `فاتورة شراء ${p.num}`, dr: p.total, cr: 0 }); });
    DB.supPayments.filter(p => p.supId === id).forEach(p => { if (from && p.date < from) return; if (to && p.date > to) return; txns.push({ date: p.date, desc: `دفعة ${p.id}`, dr: 0, cr: p.amount }); });
    txns.sort((a, b) => a.date.localeCompare(b.date));
    let bal = 0;
    txns.forEach(t => { bal += t.dr - t.cr; rows.push([t.date, t.desc, t.dr || '', t.cr || '', bal]); });
    if (!rows.length) { toast(t('hrm_no_movements'), 'info'); return; }
    _exportTable(h, rows, `كشف حساب ${s.name}`, `soa-${s.name}`);
  } else {
    const c = DB.custs.find(x => x.id === id);
    if (!c) { toast(t('inv_not_found'), 'info'); return; }
    let txns = [];
    const openBal = parseFloat(c.openBal) || 0;
    if (openBal > 0) txns.push({ date: '—', desc: 'رصيد افتتاحي', dr: openBal, cr: 0 });
    DB.invs.filter(i => i.custId === id).forEach(i => { if (from && i.date < from) return; if (to && i.date > to) return; txns.push({ date: i.date, desc: `فاتورة ${i.num}`, dr: i.total, cr: 0 }); });
    DB.payments.filter(p => p.custId === id).forEach(p => { if (from && p.date < from) return; if (to && p.date > to) return; txns.push({ date: p.date, desc: `دفعة ${p.id || ''}`, dr: 0, cr: p.amount }); });
    DB.rets.filter(r => { const inv = DB.invs.find(i => i.num === r.invNum); return inv && inv.custId === id; }).forEach(r => { if (from && r.date < from) return; if (to && r.date > to) return; txns.push({ date: r.date, desc: `مرتجع ${r.num}`, dr: -r.amt, cr: r.amt }); });
    txns.sort((a, b) => a.date.localeCompare(b.date));
    let bal = 0;
    txns.forEach(t => { bal += t.dr - t.cr; rows.push([t.date, t.desc, t.dr > 0 ? t.dr : '', t.cr || '', bal]); });
    if (!rows.length) { toast(t('hrm_no_movements'), 'info'); return; }
    _exportTable(h, rows, `كشف حساب ${c.name}`, `soa-${c.name}`);
  }
  toast(t('backup_exported'));
}


/* ═══════════════════════════════════════════════
   charts.js
══════════════════════════════════════════════ */

/* ═══ CHARTS ═══ */
let _dashSalesChart=null,_dashPayChart=null,_dashTrendChart=null,_plChart=null;

function getChartColors(){
  return{
    accent:'#4f8ef7',green:'#2dd17e',amber:'#f5a623',red:'#f05454',purple:'#a855f7',cyan:'#22d3ee',teal:'#14b8a6',
    accentA:'rgba(79,142,247,.2)',greenA:'rgba(45,209,126,.2)',amberA:'rgba(245,166,35,.2)',redA:'rgba(240,84,84,.2)'
  };
}

const _chartTooltip={
  backgroundColor:'rgba(16,19,26,.92)',
  titleColor:'#e8edf5',
  bodyColor:'#7a8699',
  borderColor:'rgba(255,255,255,.08)',
  borderWidth:1,
  cornerRadius:10,
  padding:12,
  titleFont:{weight:'700'},
  bodyFont:{size:12},
  displayColors:true,
  boxWidth:10,
  boxHeight:10,
  boxPadding:4,
  usePointStyle:true
};

function renderDashCharts(){
  if(typeof Chart==='undefined')return;
  const c=getChartColors();
  const invs=[...DB.invs].reverse().slice(0,30);
  const days=[];
  for(let i=6;i>=0;i--){
    const d=new Date();d.setDate(d.getDate()-i);
    const key=d.toISOString().slice(0,10);
    const dayLabel=d.toLocaleDateString('ar',{weekday:'short'});
    const sales=invs.filter(inv=>inv.date===key).reduce((s,inv)=>s+inv.total,0);
    days.push({key,label:dayLabel,sales});
  }
  const sCtx=G('dash-sales-chart');
  if(sCtx){
    if(_dashSalesChart)_dashSalesChart.destroy();
    _dashSalesChart=new Chart(sCtx,{type:'bar',data:{labels:days.map(d=>d.label),datasets:[{label:'المبيعات',data:days.map(d=>d.sales),backgroundColor:c.accentA,borderColor:c.accent,borderWidth:2,borderRadius:8,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{..._chartTooltip,callbacks:{label:ctx=>fmt(ctx.parsed.y)+' د.ل'}}},scales:{y:{beginAtZero:true,grid:{color:'rgba(128,128,128,.08)',drawBorder:false},ticks:{callback:v=>fmt(v),font:{size:11}},border:{display:false}},x:{grid:{display:false},ticks:{font:{size:11}}}}}});
  }
  const cashTotal=DB.payments.filter(p=>p.mode==='cash').reduce((s,p)=>s+p.amount,0);
  const checkTotal=DB.payments.filter(p=>p.mode==='check').reduce((s,p)=>s+p.amount,0);
  const transferTotal=DB.payments.filter(p=>p.mode==='transfer').reduce((s,p)=>s+p.amount,0);
  const supTotal=DB.supPayments.reduce((s,p)=>s+p.amount,0);
  const pCtx=G('dash-pay-chart');
  if(pCtx){
    if(_dashPayChart)_dashPayChart.destroy();
    _dashPayChart=new Chart(pCtx,{type:'doughnut',data:{labels:['نقدي وارد','صكوك واردة','تحويلات واردة','مدفوعات للموردين'],datasets:[{data:[cashTotal,checkTotal,transferTotal,supTotal],backgroundColor:[c.green,c.accent,c.cyan,c.red],borderWidth:3,borderColor:c.accent,hoverOffset:8}]},options:{responsive:true,maintainAspectRatio:false,cutout:'68%',plugins:{legend:{position:'bottom',labels:{boxWidth:12,padding:10,font:{size:11},usePointStyle:true,pointStyle:'circle'}},tooltip:{..._chartTooltip,callbacks:{label:ctx=>ctx.label+': '+fmt(ctx.parsed)+' د.ل'}}}}});
  }
  /* Trend Chart — 30-day sales vs purchases */
  const tCtx=G('dash-trend-chart');
  if(tCtx){
    if(_dashTrendChart)_dashTrendChart.destroy();
    const trendDays=[];
    for(let i=29;i>=0;i--){
      const d=new Date();d.setDate(d.getDate()-i);
      const key=d.toISOString().slice(0,10);
      const dayLabel=d.toLocaleDateString('ar',{day:'numeric',month:'short'});
      const sales=invs.filter(inv=>inv.date===key).reduce((s,inv)=>s+inv.total,0);
      const purchases=[...DB.purs].filter(p=>p.date===key).reduce((s,p)=>s+p.total,0);
      trendDays.push({key,label:dayLabel,sales,purchases});
    }
    _dashTrendChart=new Chart(tCtx,{type:'line',data:{labels:trendDays.map(d=>d.label),datasets:[
      {label:'المبيعات',data:trendDays.map(d=>d.sales),borderColor:c.green,backgroundColor:'rgba(45,209,126,.08)',fill:true,tension:.4,pointRadius:0,pointHoverRadius:5,borderWidth:2},
      {label:'المشتريات',data:trendDays.map(d=>d.purchases),borderColor:c.purple,backgroundColor:'rgba(155,114,247,.08)',fill:true,tension:.4,pointRadius:0,pointHoverRadius:5,borderWidth:2}
    ]},options:{responsive:true,maintainAspectRatio:false,interaction:{intersect:false,mode:'index'},plugins:{legend:{position:'bottom',labels:{boxWidth:12,padding:10,font:{size:11},usePointStyle:true,pointStyle:'circle'}},tooltip:{..._chartTooltip,callbacks:{label:ctx=>ctx.dataset.label+': '+fmt(ctx.parsed.y)+' د.ل'}}},scales:{y:{beginAtZero:true,grid:{color:'rgba(128,128,128,.08)',drawBorder:false},ticks:{callback:v=>fmt(v),font:{size:10}},border:{display:false}},x:{grid:{display:false},ticks:{maxTicksLimit:10,font:{size:9}}}}}});
  }
}

function renderPLChart(){
  if(typeof Chart==='undefined')return;
  const c=getChartColors();
  const soldItems={};
  DB.invs.forEach(inv=>(inv.lines||[]).forEach(l=>{
    if(!soldItems[l.name])soldItems[l.name]={qty:0,revenue:0,cost:0};
    soldItems[l.name].qty+=l.qty;
    soldItems[l.name].revenue+=l.total||l.qty*l.price;
    soldItems[l.name].cost+=l.qty*(l.buyPrice||0);
  }));
  const items=Object.entries(soldItems).map(([name,d])=>({name,...d,profit:d.revenue-d.cost})).filter(x=>x.revenue>0).sort((a,b)=>b.profit-a.profit).slice(0,6);
  const ctx=G('pl-chart');
  if(!ctx)return;
  if(_plChart)_plChart.destroy();
  _plChart=new Chart(ctx,{type:'bar',data:{labels:items.map(i=>i.name),datasets:[{label:'الإيراد',data:items.map(i=>i.revenue),backgroundColor:c.greenA,borderColor:c.green,borderWidth:2,borderRadius:8,borderSkipped:false},{label:'التكلفة',data:items.map(i=>i.cost),backgroundColor:c.redA,borderColor:c.red,borderWidth:2,borderRadius:8,borderSkipped:false},{label:'الربح',data:items.map(i=>i.profit),backgroundColor:c.accentA,borderColor:c.accent,borderWidth:2,borderRadius:8,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{boxWidth:12,padding:10,font:{size:11},usePointStyle:true,pointStyle:'circle'}},tooltip:{..._chartTooltip,callbacks:{label:ctx=>ctx.dataset.label+': '+fmt(ctx.parsed.y)+' د.ل'}}},scales:{y:{beginAtZero:true,grid:{color:'rgba(128,128,128,.08)',drawBorder:false},ticks:{callback:v=>fmt(v),font:{size:11}},border:{display:false}},x:{grid:{display:false},ticks:{font:{size:11}}}}}});
}

/* ═══════════════════════════════════════════════
   hrm.js
══════════════════════════════════════════════ */

﻿function renderHRM() {
  renderHRMEmployees();
  renderHRMAttendance();
  renderHRMAdvances();
  renderHRMPayroll();
  renderHRMCashLedger();
  renderHRMReports();
  renderHRMCharts();
  renderPerformanceList();
  checkHRMNotifications();
  requestHRMNotificationPermission();
  startHRMAutoBackup();
  populateHRMDeptFilter();
  initEmployeeForm();
  setTimeout(()=>onAdvTypeChange(),100);
}

function initEmployeeForm() {
  const noEl = G('hrm-emp-no');
  const startEl = G('hrm-emp-start');
  if (noEl && !noEl.value) noEl.value = autoGenerateEmpNo();
  if (startEl && !startEl.value) startEl.value = new Date().toISOString().slice(0, 10);
  const emps = DB._hrmEmployees || [];
  const depts = [...new Set(emps.map(e => e.department).filter(Boolean))].sort();
  const dl = G('hrm-dept-list');
  if (dl) dl.innerHTML = depts.map(d => `<option value="${d}">`).join('');
  if (!localStorage.getItem(EMP_DRAFT_KEY)) {
    const hnt = document.getElementById('hrm-no-tag');
    if (hnt) hnt.style.display = '';
  }
}

function populateHRMDeptFilter() {
  const emps = DB._hrmEmployees || [];
  const depts = [...new Set(emps.map(e => e.department).filter(Boolean))].sort();
  const sel = G('hrm-emp-dept-filter');
  if (!sel) return;
  const current = sel.value;
  sel.innerHTML = '<option value="">'+t('hrm_all_departments')+'</option>' + depts.map(d => `<option value="${d}"${d === current ? ' selected' : ''}>${d}</option>`).join('');
}

function showHRMTab(tabId) {
  document.querySelectorAll('.hrm-tab').forEach(t => t.style.display = 'none');
  const tab = G(tabId);
  if (tab) tab.style.display = '';
  document.querySelectorAll('[data-action="showHRMTab"]').forEach(b => {
    b.classList.toggle('btn-primary', b.dataset.tab === tabId);
    b.classList.toggle('btn', b.dataset.tab !== tabId);
  });
  if (tabId === 'hrm-reports') {
    renderHRMCharts();
    loadHRMEmployeeDropdown('hrm-perf-list-emp');
    renderPerformanceList();
    if (typeof renderERPTemplates === 'function') renderERPTemplates();
    if (typeof erpLoadSavedReports === 'function') erpLoadSavedReports();
  }
}

/* ═══════════════════════════════════════════════════════════════
   EMPLOYEES — ADD / EDIT / DRAFT / PREVIEW
   ═══════════════════════════════════════════════════════════════ */

const EMP_DRAFT_KEY = 'hrm_emp_draft';
const EMP_FIELDS = {
  basic: ['hrm-emp-no', 'hrm-emp-name', 'hrm-emp-namear', 'hrm-emp-natid', 'hrm-emp-phone', 'hrm-emp-email'],
  job: ['hrm-emp-dept', 'hrm-emp-pos', 'hrm-emp-addr', 'hrm-emp-contract', 'hrm-emp-start', 'hrm-emp-bank', 'hrm-emp-bankacc'],
  salary: ['hrm-emp-rate', 'hrm-emp-ot', 'hrm-emp-salary', 'hrm-emp-hours'],
  notes: ['hrm-emp-notes']
};
const ALL_EMP_FIELDS = Object.values(EMP_FIELDS).flat();

function toggleHRMSection(hd) {
  const sec = hd.closest('.hrm-section');
  const open = sec.dataset.open !== 'false';
  sec.dataset.open = open ? 'false' : 'true';
  hd.querySelector('i:last-child').style.transform = open ? 'rotate(-90deg)' : '';
  sec.querySelector('.hrm-section-body').style.display = open ? 'none' : '';
}

function validateEmployeeField(el, rule) {
  if (rule === 'required') {
    if (!el.value.trim()) {
      el.style.borderColor = 'var(--red)';
      return false;
    }
    el.style.borderColor = '';
    return true;
  }
}

function autoGenerateEmpNo() {
  const emps = DB._hrmEmployees || [];
  const maxNo = emps.reduce((max, e) => {
    const match = (e.employeeNo || '').match(/(\d+)$/);
    return match ? Math.max(max, parseInt(match[1])) : max;
  }, 0);
  const next = maxNo + 1;
  return 'EMP-' + String(next).padStart(3, '0');
}

function onContractTypeChange() {
  const type = G('hrm-emp-contract')?.value;
  const salaryEl = G('hrm-emp-salary');
  const rateEl = G('hrm-emp-rate');
  const hintEl = G('hrm-salary-hint');
  const hintText = G('hrm-salary-hint-text');
  if (type === 'full_time') {
    hintText.textContent = t('hrm_hint_fulltime');
    hintEl.style.display = '';
  } else if (type === 'hourly') {
    hintText.textContent = t('hrm_hint_hourly');
    hintEl.style.display = '';
  } else if (type === 'part_time') {
    hintText.textContent = t('hrm_hint_parttime');
    hintEl.style.display = '';
  } else {
    hintText.textContent = t('hrm_hint_contract');
    hintEl.style.display = '';
  }
}

function calcHourlyFromSalary() {
  const salary = parseFloat(G('hrm-emp-salary')?.value) || 0;
  const hours = parseInt(G('hrm-emp-hours')?.value) || 8;
  if (salary > 0) {
    const hourly = salary / (hours * 26);
    G('hrm-emp-rate').value = hourly.toFixed(3);
    const ot = hourly * 1.5;
    G('hrm-emp-ot').value = ot.toFixed(3);
  }
}

function calcSalaryFromHourly() {
  const rate = parseFloat(G('hrm-emp-rate')?.value) || 0;
  const hours = parseInt(G('hrm-emp-hours')?.value) || 8;
  if (rate > 0) {
    const salary = rate * hours * 26;
    G('hrm-emp-salary').value = salary.toFixed(3);
    G('hrm-emp-ot').value = (rate * 1.5).toFixed(3);
  }
}

function saveEmployeeDraft() {
  const data = {};
  ALL_EMP_FIELDS.forEach(id => {
    const el = G(id);
    if (el) data[id] = el.type === 'checkbox' ? el.checked : el.value;
  });
  localStorage.setItem(EMP_DRAFT_KEY, JSON.stringify(data));
}

function loadEmployeeDraft() {
  try {
    const data = JSON.parse(localStorage.getItem(EMP_DRAFT_KEY) || '{}');
    if (!Object.keys(data).length) { toast(t('hrm_draft_empty'), 'info'); return; }
    ALL_EMP_FIELDS.forEach(id => {
      const el = G(id);
      if (el && data[id] !== undefined) {
        el.type === 'checkbox' ? (el.checked = data[id]) : (el.value = data[id]);
      }
    });
    toast(t('hrm_draft_restored'));
  } catch (e) {
    toast(t('hrm_draft_cleared'), 'error');
  }
}

function clearEmployeeDraft() {
  localStorage.removeItem(EMP_DRAFT_KEY);
  toast(t('hrm_draft_cleared'));
}

function clearEmployeeForm() {
  ALL_EMP_FIELDS.forEach(id => {
    const el = G(id);
    if (el) {
      el.type === 'checkbox' ? (el.checked = false) : (el.value = '');
      el.style.borderColor = '';
    }
  });
  G('hrm-emp-start').value = new Date().toISOString().slice(0, 10);
  G('hrm-emp-hours').value = '8';
  clearEmployeeDraft();
  toast(t('hrm_form_cleared'));
}

function previewEmployee() {
  const data = getEmployeeFormData();
  if (!data.name) { toast(t('hrm_name_required'), 'error'); return; }
  const contractLabel = { full_time: 'دوام كامل', part_time: 'دوام جزئي', hourly: 'بالساعة', contract: 'عقد' }[data.contractType] || data.contractType;
  G('hrm-preview-body').innerHTML = `
    <div style="background:var(--bg-elevated);border-radius:var(--r);padding:14px;margin-bottom:10px">
      <div style="font-size:18px;font-weight:700;color:var(--accent);margin-bottom:8px">${data.employeeNo} — ${data.name}</div>
      ${data.nameAr ? `<div style="font-size:13px;color:var(--text-secondary);margin-bottom:4px">${data.nameAr}</div>` : ''}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:13px">
        ${data.phone ? `<div><strong>الهاتف:</strong> ${data.phone}</div>` : ''}
        ${data.email ? `<div><strong>البريد:</strong> ${data.email}</div>` : ''}
        ${data.nationalId ? `<div><strong>الهوية:</strong> ${data.nationalId}</div>` : ''}
        ${data.address ? `<div><strong>العنوان:</strong> ${data.address}</div>` : ''}
      </div>
    </div>
    <div style="background:var(--bg-elevated);border-radius:var(--r);padding:14px;margin-bottom:10px">
      <div style="font-size:14px;font-weight:600;margin-bottom:6px"><i class="ti ti-briefcase" style="color:var(--green)"></i> بيانات الوظيفة</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:13px">
        <div><strong>القسم:</strong> ${data.department || '—'}</div>
        <div><strong>المنصب:</strong> ${data.position || '—'}</div>
        <div><strong>نوع العقد:</strong> ${contractLabel}</div>
        <div><strong>تاريخ الالتحاق:</strong> ${data.startDate || '—'}</div>
        ${data.bank ? `<div><strong>البنك:</strong> ${data.bank}</div>` : ''}
        ${data.bankAccount ? `<div><strong>الحساب:</strong> ${data.bankAccount}</div>` : ''}
      </div>
    </div>
    <div style="background:var(--bg-elevated);border-radius:var(--r);padding:14px">
      <div style="font-size:14px;font-weight:600;margin-bottom:6px"><i class="ti ti-cash" style="color:var(--amber)"></i> الراتب</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:13px">
        <div><strong>الراتب الشهري:</strong> ${fmt(data.monthlySalary)} ${t('currency_sym')}</div>
        <div><strong>أجر الساعة:</strong> ${fmt(data.hourlyRate)} ${t('currency_sym')}</div>
        <div><strong>الأوفرتايم:</strong> ${fmt(data.overtimeRate)} ${t('currency_sym')}</div>
        <div><strong>ساعات العمل:</strong> ${data.workHours} س/يوم</div>
      </div>
    </div>
    ${data.notes ? `<div style="margin-top:10px;font-size:12px;color:var(--text-secondary)"><strong>ملاحظات:</strong> ${data.notes}</div>` : ''}`;
  openModal('hrm-preview-modal');
}

function getEmployeeFormData() {
  return {
    employeeNo: G('hrm-emp-no')?.value?.trim() || '',
    name: G('hrm-emp-name')?.value?.trim() || '',
    nameAr: G('hrm-emp-namear')?.value?.trim() || '',
    nationalId: G('hrm-emp-natid')?.value?.trim() || '',
    phone: G('hrm-emp-phone')?.value?.trim() || '',
    email: G('hrm-emp-email')?.value?.trim() || '',
    department: G('hrm-emp-dept')?.value?.trim() || '',
    position: G('hrm-emp-pos')?.value?.trim() || '',
    address: G('hrm-emp-addr')?.value?.trim() || '',
    contractType: G('hrm-emp-contract')?.value || 'full_time',
    startDate: G('hrm-emp-start')?.value || '',
    bank: G('hrm-emp-bank')?.value?.trim() || '',
    bankAccount: G('hrm-emp-bankacc')?.value?.trim() || '',
    hourlyRate: +(G('hrm-emp-rate')?.value || 0),
    overtimeRate: +(G('hrm-emp-ot')?.value || 0),
    monthlySalary: +(G('hrm-emp-salary')?.value || 0),
    workHours: +(G('hrm-emp-hours')?.value || 8),
    notes: G('hrm-emp-notes')?.value?.trim() || ''
  };
}

async function addEmployee() {
  const d = getEmployeeFormData();
  if (!d.name) { toast(t('hrm_name_req'), 'error'); return; }
  if (!d.employeeNo) {
    d.employeeNo = autoGenerateEmpNo();
    G('hrm-emp-no').value = d.employeeNo;
  }
  if (!d.startDate) {
    d.startDate = new Date().toISOString().slice(0, 10);
    G('hrm-emp-start').value = d.startDate;
  }
  try {
    const res = await authenticatedFetch('/api/hrm/employees', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(d)
    });
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    if(typeof notify==='function') notify('تم إضافة الموظف: ' + d.name + ' (' + d.employeeNo + ')', 'success', {icon:'ti-user-plus'});
    else toast(t('hrm_employee_added')+' — ' + d.employeeNo, 'success');
    clearEmployeeForm();
    renderHRMEmployees();
    populateHRMDeptFilter();
    broadcastChange('hrm', { section: 'employees', action: 'add' });
  } catch (err) {
    if(typeof notify==='function') notify(err.message, 'error', {icon:'ti-alert-triangle'});
    else toast(err.message, 'error');
  }
}

async function renderHRMEmployees() {
  const search = G('hrm-emp-search')?.value || '';
  const status = G('hrm-emp-status')?.value || '';
  const dept = G('hrm-emp-dept-filter')?.value || '';
  const contract = G('hrm-emp-contract-filter')?.value || '';
  let url = `/api/hrm/employees?`;
  if (search) url += `search=${encodeURIComponent(search)}&`;
  if (status) url += `status=${status}&`;
  if (dept) url += `department=${encodeURIComponent(dept)}&`;
  if (contract) url += `contractType=${contract}&`;
  try {
    const res = await authenticatedFetch(url);
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    const employees = data.employees || [];
    DB._hrmEmployees = employees;
    const tbody = G('hrm-emp-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!employees.length) { tbody.innerHTML = '<tr><td colspan="8" class="text-center p-3 text-muted">'+t('hrm_no_employees')+'</td></tr>'; return; }
    employees.forEach(e => {
      const statusBadge = e.status === 'active'
        ? '<span class="badge bg-success">نشط</span>'
        : `<span class="badge bg-secondary">${e.status === 'inactive' ? 'غير نشط' : 'منتهي'}</span>`;
      const contractBadge = {
        full_time: 'دوام كامل', part_time: 'دوام جزئي', hourly: 'بالساعة', contract: 'عقد'
      }[e.contractType] || e.contractType;
      tbody.innerHTML += `<tr>
        <td>${e.employeeNo}</td>
        <td>${e.name}</td>
        <td>${contractBadge}</td>
        <td>${e.department || '—'}</td>
        <td>${e.position || '—'}</td>
        <td>${fmt(e.hourlyRate || 0)}</td>
        <td>${statusBadge}</td>
        <td>
          <button class="btn btn-sm btn-outline" onclick="editEmployee('${e._id}')">تعديل</button>
          <button class="btn btn-sm btn-outline" onclick="openEmployeeArchive('${e._id}')" title="أرشيف">أرشيف</button>
          ${e.status === 'active' ? `<button class="btn btn-sm btn-outline-danger" onclick="deactivateEmployee('${e._id}','${e.name}')">إنهاء</button>` : ''}
        </td>
      </tr>`;
    });
  } catch (err) {
    console.error('خطأ في تحميل الموظفين:', err);
  }
}

async function editEmployee(id) {
  try {
    const res = await authenticatedFetch(`/api/hrm/employees/${id}`);
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    const e = data.employee;
    openModal('hrm-edit-modal');
    G('hrm-edit-id').value = e._id;
    G('hrm-edit-no').value = e.employeeNo;
    G('hrm-edit-name').value = e.name;
    G('hrm-edit-phone').value = e.phone || '';
    G('hrm-edit-dept').value = e.department || '';
    G('hrm-edit-pos').value = e.position || '';
    G('hrm-edit-contract').value = e.contractType || 'full_time';
    G('hrm-edit-rate').value = e.hourlyRate || 0;
    G('hrm-edit-ot').value = e.overtimeRate || 0;
    G('hrm-edit-salary').value = e.monthlySalary || 0;
    G('hrm-edit-notes').value = e.notes || '';
  } catch (err) {
    toast(err.message, 'error');
  }
}

async function saveEmployeeEdit() {
  const id = G('hrm-edit-id')?.value;
  const payload = {
    name: G('hrm-edit-name')?.value?.trim(),
    phone: G('hrm-edit-phone')?.value?.trim(),
    department: G('hrm-edit-dept')?.value?.trim(),
    position: G('hrm-edit-pos')?.value?.trim(),
    contractType: G('hrm-edit-contract')?.value,
    hourlyRate: +(G('hrm-edit-rate')?.value || 0),
    overtimeRate: +(G('hrm-edit-ot')?.value || 0),
    monthlySalary: +(G('hrm-edit-salary')?.value || 0),
    notes: G('hrm-edit-notes')?.value?.trim()
  };
  if (!payload.name) { toast(t('hrm_name_req'), 'error'); return; }
  try {
    const res = await authenticatedFetch(`/api/hrm/employees/${id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    toast(t('hrm_employee_updated'));
    closeModal('hrm-edit-modal');
    renderHRMEmployees();
    broadcastChange('hrm', { section: 'employees', action: 'edit' });
  } catch (err) {
    toast(err.message, 'error');
  }
}

async function deactivateEmployee(id, name) {
  const ok1 = await confirmDanger(`إنهاء عقد ${name}؟`, 'إنهاء عقد'); if (!ok1) return;
  try {
    const res = await authenticatedFetch(`/api/hrm/employees/${id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'inactive', endDate: new Date().toISOString().slice(0, 10) })
    });
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    toast(t('hrm_contract_ended'));
    renderHRMEmployees();
    broadcastChange('hrm', { section: 'employees', action: 'deactivate' });
  } catch (err) {
    toast(err.message, 'error');
  }
}

/* ═══════════════════════════════════════════════════════════════
   ATTENDANCE
   ═══════════════════════════════════════════════════════════════ */
async function renderHRMAttendance() {
  const date = G('hrm-att-date')?.value || new Date().toISOString().slice(0, 10);
  const search = G('hrm-att-search')?.value || '';
  try {
    const res = await authenticatedFetch(`/api/hrm/attendance?date=${date}&search=${encodeURIComponent(search)}`);
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    const records = data.records || [];
    DB._hrmAttendance = records;
    const tbody = G('hrm-att-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!records.length) {
      tbody.innerHTML = '<tr><td colspan="7" class="text-center p-3 text-muted">'+t('hrm_no_attendance')+'</td></tr>';
      return;
    }
    records.forEach(r => {
      const statusBadge = { present: 'حاضر', absent: 'غائب', late: 'متأخر', half_day: 'نصف يوم', leave: 'إجازة' }[r.status] || r.status;
      tbody.innerHTML += `<tr>
        <td>${r.employeeNo}</td>
        <td>${r.employeeName}</td>
        <td>${r.checkIn || '—'}</td>
        <td>${r.checkOut || '—'}</td>
        <td>${r.totalHours.toFixed(1)}</td>
        <td>${statusBadge}</td>
        <td>${r.isLocked ? '<span class="badge bg-secondary">مقفل</span>' : `<button class="btn btn-sm btn-outline" onclick="lockAttendance('${r._id}')">قفل</button>`}</td>
      </tr>`;
    });
  } catch (err) {
    console.error('خطأ في تحميل الحضور:', err);
  }
}

let _attStatus='present';
function setAttStatus(status){
  _attStatus=status;
  const el=G('hrm-att-status');if(el)el.value=status;
  document.querySelectorAll('#hrm-att-chips .hrm-att-chip').forEach(c=>{
    c.classList.toggle('sel',c.dataset.status===status);
  });
  const ci=G('hrm-att-checkin'),co=G('hrm-att-checkout');
  if(status==='absent'||status==='leave'){
    if(ci)ci.value='';if(co)co.value='';
    if(ci)ci.disabled=true;if(co)co.disabled=true;
  }else{
    if(ci)ci.disabled=false;if(co)co.disabled=false;
  }
}

async function saveAttendance() {
  const empId = G('hrm-att-emp')?.value;
  const date = G('hrm-att-date-add')?.value || new Date().toISOString().slice(0, 10);
  const checkIn = G('hrm-att-checkin')?.value || '';
  const checkOut = G('hrm-att-checkout')?.value || '';
  const status = G('hrm-att-status')?.value || 'present';
  const notes = G('hrm-att-notes')?.value?.trim() || '';
  if (!empId) { toast(t('hrm_choose_employee'), 'error'); return; }
  try {
    const res = await authenticatedFetch('/api/hrm/attendance', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ employeeId: empId, date, checkIn, checkOut, status, notes })
    });
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    toast(t('hrm_attendance_logged'));
    G('hrm-att-checkin').value = '';
    G('hrm-att-checkout').value = '';
    G('hrm-att-notes').value = '';
    renderHRMAttendance();
    broadcastChange('hrm', { section: 'attendance', action: 'add' });
  } catch (err) {
    toast(err.message, 'error');
  }
}

async function lockAttendance(id) {
  const ok2=await confirmDanger('قفل هذا السجل؟ لن يمكن تعديله بعد القفل','تأكيد القفل');if(!ok2)return;
  try {
    const res = await authenticatedFetch(`/api/hrm/attendance/${id}/lock`, { method: 'PATCH' });
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    toast(t('hrm_record_locked_done'));
    renderHRMAttendance();
    broadcastChange('hrm', { section: 'attendance', action: 'lock' });
  } catch (err) {
    toast(err.message, 'error');
  }
}

/* ═══════════════════════════════════════════════════════════════
   ADVANCES & LOANS
   ═══════════════════════════════════════════════════════════════ */
async function renderHRMAdvances() {
  const search = G('hrm-adv-search')?.value || '';
  const status = G('hrm-adv-status')?.value || '';
  let url = `/api/hrm/advances?`;
  if (search) url += `search=${encodeURIComponent(search)}&`;
  if (status) url += `status=${status}&`;
  try {
    const res = await authenticatedFetch(url);
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    const advances = data.advances || [];
    DB._hrmAdvances = advances;
    const tbody = G('hrm-adv-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!advances.length) { tbody.innerHTML = '<tr><td colspan="8" class="text-center p-3 text-muted">'+t('hrm_no_advances')+'</td></tr>'; return; }
    advances.forEach(a => {
      const typeLabel = a.type === 'advance' ? 'سلفة' : 'قرض';
      const statusBadge = { active: 'نشط', completed: 'مسدد', cancelled: 'ملغي' }[a.status] || a.status;
      tbody.innerHTML += `<tr>
        <td>${a.date}</td>
        <td>${a.employeeName}</td>
        <td>${typeLabel}</td>
        <td>${fmt(a.amount)}</td>
        <td>${fmt(a.remainingBalance)}</td>
        <td>${a.installmentsPaid}/${a.installmentsTotal}</td>
        <td><span class="badge bg-${a.status === 'active' ? 'warning' : a.status === 'completed' ? 'success' : 'secondary'}">${statusBadge}</span></td>
        <td>${a.status === 'active' ? `<button class="btn btn-sm btn-outline-primary" onclick="repayAdvance('${a._id}',${a.remainingBalance})">تسديد</button>` : '—'}</td>
      </tr>`;
    });
  } catch (err) {
    console.error('خطأ في تحميل السلف:', err);
  }
}

function onAdvTypeChange(){
  const type=G('hrm-adv-type')?.value;
  const wrap=G('hrm-adv-monthly-wrap');
  const hint=G('hrm-adv-hint');
  const hintTxt=G('hrm-adv-hint-text');
  if(type==='advance'){
    if(wrap){wrap.classList.add('hidden');wrap.classList.remove('visible')}
    if(hint){hint.style.display='none'}
    G('hrm-adv-total').value='1';
  }else{
    if(wrap){wrap.classList.remove('hidden');wrap.classList.add('visible')}
    if(hint&&hintTxt){hint.style.display='flex';hintTxt.textContent=t('hrm_hint_loan')}
    if(!G('hrm-adv-total').value||G('hrm-adv-total').value==='1')G('hrm-adv-total').value='12';
  }
}

async function addAdvance() {
  const empId = G('hrm-adv-emp')?.value;
  const type = G('hrm-adv-type')?.value;
  const amount = +(G('hrm-adv-amount')?.value || 0);
  const monthly = +(G('hrm-adv-monthly')?.value || 0);
  const total = +(G('hrm-adv-total')?.value || 1);
  const purpose = G('hrm-adv-purpose')?.value?.trim() || '';
  const date = G('hrm-adv-date')?.value || new Date().toISOString().slice(0, 10);
  if (!empId || !amount || amount <= 0) { toast(t('hrm_choose_emp_amount'), 'error'); return; }
  if (type === 'loan' && (!monthly || monthly <= 0)) { toast(t('hrm_enter_installment'), 'error'); return; }
  try {
    const res = await authenticatedFetch('/api/hrm/advances', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ employeeId: empId, type, amount, monthlyInstallment: monthly, installmentsTotal: total, purpose, date })
    });
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    toast(t('hrm_advance_issued')+' — '+t('hrm_cash_balance')+': '+fmt(data.cashBalance));
    G('hrm-adv-amount').value = '';
    G('hrm-adv-purpose').value = '';
    renderHRMAdvances();
    broadcastChange('hrm', { section: 'advances', action: 'add' });
  } catch (err) {
    toast(err.message, 'error');
  }
}

async function repayAdvance(id, remaining) {
  const amountStr = prompt(`المبلغ المتبقي: ${fmt(remaining)}\nأدخل مبلغ التسديد:`);
  if (!amountStr) return;
  const amount = +amountStr;
  if (!amount || amount <= 0) { toast(t('hrm_invalid_amount'), 'error'); return; }
  try {
    const res = await authenticatedFetch(`/api/hrm/advances/${id}/repay`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, date: new Date().toISOString().slice(0, 10) })
    });
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    toast(t('hrm_repayment_done')+' — '+t('hrm_cash_balance')+': '+fmt(data.cashBalance));
    renderHRMAdvances();
    broadcastChange('hrm', { section: 'advances', action: 'repay' });
  } catch (err) {
    toast(err.message, 'error');
  }
}

/* ═══════════════════════════════════════════════════════════════
   PAYROLL
   ═══════════════════════════════════════════════════════════════ */
async function renderHRMPayroll() {
  const period = G('hrm-pay-period')?.value || '';
  const status = G('hrm-pay-status')?.value || '';
  let url = `/api/hrm/payroll?`;
  if (period) url += `period=${period}&`;
  if (status) url += `status=${status}&`;
  try {
    const res = await authenticatedFetch(url);
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    const payrolls = data.payrolls || [];
    DB._hrmPayrows = payrolls;
    const tbody = G('hrm-pay-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!payrolls.length) { tbody.innerHTML = '<tr><td colspan="10" class="text-center p-3 text-muted">'+t('hrm_no_payroll')+'</td></tr>'; return; }
    payrolls.forEach(p => {
      const statusBadge = { draft: 'مسودة', approved: 'معتمدة', paid: 'مدفوعة', cancelled: 'ملغاة' }[p.status] || p.status;
      tbody.innerHTML += `<tr>
        <td>${p.period}</td>
        <td>${p.employeeNo}</td>
        <td>${p.employeeName}</td>
        <td>${p.totalWorkedHours.toFixed(1)}</td>
        <td>${fmt(p.grossSalary)}</td>
        <td>${fmt(p.totalDeductions)}</td>
        <td><strong>${fmt(p.netSalary)}</strong></td>
        <td><span class="badge bg-${p.status === 'paid' ? 'success' : p.status === 'approved' ? 'primary' : 'secondary'}">${statusBadge}</span></td>
        <td>
          ${p.status === 'draft' ? `<button class="btn btn-sm btn-outline-primary" onclick="approvePayroll('${p._id}')">اعتماد</button>` : ''}
          ${p.status === 'approved' ? `<button class="btn btn-sm btn-success" onclick="payPayroll('${p._id}')">دفع</button>` : ''}
          ${p.status === 'paid' ? `<span class="text-muted">${p.paidDate}</span>` : ''}
        </td>
      </tr>`;
    });
  } catch (err) {
    console.error('خطأ في تحميل الرواتب:', err);
  }
}

async function generatePayroll() {
  const period = G('hrm-pay-gen-period')?.value;
  if (!period) { toast(t('hrm_choose_period'), 'error'); return; }
  const ok3=await confirmWarning(`توليد رواتب لشهر ${period}؟`, 'تأكيد توليد الرواتب');if(!ok3)return;
  try {
    const res = await authenticatedFetch('/api/hrm/payroll/generate', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ period })
    });
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    toast(t('hrm_payroll_generated')+' '+data.count);
    renderHRMPayroll();
    broadcastChange('hrm', { section: 'payroll', action: 'generate' });
  } catch (err) {
    toast(err.message, 'error');
  }
}

async function approvePayroll(id) {
  const ok4=await confirmWarning('اعتماد هذا الراتب؟','تأكيد الاعتماد');if(!ok4)return;
  try {
    const res = await authenticatedFetch(`/api/hrm/payroll/${id}/approve`, { method: 'POST' });
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    toast(t('hrm_payroll_approved'));
    renderHRMPayroll();
    broadcastChange('hrm', { section: 'payroll', action: 'approve' });
  } catch (err) {
    toast(err.message, 'error');
  }
}

async function payPayroll(id) {
  const ok5=await confirmWarning('تأكيد دفع هذا الراتب؟','تأكيد الدفع');if(!ok5)return;
  try {
    const res = await authenticatedFetch(`/api/hrm/payroll/${id}/pay`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: new Date().toISOString().slice(0, 10) })
    });
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    toast(t('hrm_payroll_paid')+' — '+t('hrm_cash_balance')+': '+fmt(data.cashBalance));
    renderHRMPayroll();
    broadcastChange('hrm', { section: 'payroll', action: 'pay' });
  } catch (err) {
    toast(err.message, 'error');
  }
}

/* ═══════════════════════════════════════════════════════════════
   CASH LEDGER
   ═══════════════════════════════════════════════════════════════ */
async function renderHRMCashLedger() {
  const from = G('hrm-cl-from')?.value || '';
  const to = G('hrm-cl-to')?.value || '';
  const cat = G('hrm-cl-cat')?.value || '';
  let url = `/api/hrm/cash-ledger?`;
  if (from) url += `from=${from}&`;
  if (to) url += `to=${to}&`;
  if (cat) url += `category=${cat}&`;
  try {
    const res = await authenticatedFetch(url);
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    const entries = data.entries || [];
    DB._hrmCashLedger = entries;
    const tbody = G('hrm-cl-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!entries.length) { tbody.innerHTML = '<tr><td colspan="6" class="text-center p-3 text-muted">'+t('hrm_no_movements')+'</td></tr>'; return; }
    entries.forEach(e => {
      const typeBadge = e.type === 'in'
        ? `<span class="text-success fw-bold">وارد +${fmt(e.amount)}</span>`
        : `<span class="text-danger fw-bold">صادر -${fmt(e.amount)}</span>`;
      tbody.innerHTML += `<tr>
        <td>${e.date}</td>
        <td>${typeBadge}</td>
        <td>${fmt(e.balanceAfter)}</td>
        <td>${e.category}</td>
        <td>${e.description}</td>
        <td>${e.employeeName || '—'}</td>
      </tr>`;
    });
    G('hrm-cl-balance').textContent = t('hrm_cash_balance')+': '+fmt(data.currentBalance)+' '+t('currency_sym');
  } catch (err) {
    console.error('خطأ في تحميل سجل الخزينة:', err);
  }
}

async function adjustCashLedger() {
  const amount = +(G('hrm-cl-adj-amount')?.value || 0);
  const reason = G('hrm-cl-adj-reason')?.value?.trim() || '';
  if (!amount || !reason) { toast(t('hrm_enter_amount_reason'), 'error'); return; }
  try {
    const res = await authenticatedFetch('/api/hrm/cash-ledger/adjust', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, reason, date: new Date().toISOString().slice(0, 10) })
    });
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    toast(t('hrm_adjustment_done'));
    G('hrm-cl-adj-amount').value = '';
    G('hrm-cl-adj-reason').value = '';
    renderHRMCashLedger();
    broadcastChange('hrm', { section: 'cash-ledger', action: 'adjust' });
  } catch (err) {
    toast(err.message, 'error');
  }
}

/* ═══════════════════════════════════════════════════════════════
   EMPLOYEE DROPDOWN LOADER
   ═══════════════════════════════════════════════════════════════ */
async function loadHRMEmployeeDropdown(selectId) {
  try {
    const res = await authenticatedFetch('/api/hrm/employees?status=active');
    const data = await res.json();
    if (data.status !== 'success') return;
    const sel = G(selectId);
    if (!sel) return;
    sel.innerHTML = '<option value="">'+t('hrm_choose_employee')+'</option>';
    (data.employees || []).forEach(e => {
      sel.innerHTML += `<option value="${e._id}">${e.employeeNo} — ${e.name}</option>`;
    });
  } catch (err) {
    console.error('خطأ في تحميل قائمة الموظفين:', err);
  }
}

/* ═══════════════════════════════════════════════════════════════
   PRINT PAYROLL
   ═══════════════════════════════════════════════════════════════ */
function printPayroll(period) {
  const payrows = DB._hrmPayrows || [];
  if (!payrows.length) { toast(t('hrm_no_payroll'), 'error'); return; }
  const company = currentCompany();
  const win = window.open('', '_blank', 'width=900,height=1100');
  if (!win) { toast(t('barcode_print_err'), 'error'); return; }
  const now = new Date().toLocaleString('ar');
  const totalGross = payrows.reduce((s, p) => s + p.grossSalary, 0);
  const totalDeductions = payrows.reduce((s, p) => s + p.totalDeductions, 0);
  const totalNet = payrows.reduce((s, p) => s + p.netSalary, 0);
  const rowsHtml = payrows.map((p, i) => `<tr>
    <td>${i + 1}</td><td>${p.employeeNo}</td><td>${p.employeeName}</td>
    <td>${p.totalWorkedHours.toFixed(1)}</td><td>${p.totalOvertimeHours.toFixed(1)}</td>
    <td>${fmt(p.hourlyRate)}</td><td>${fmt(p.grossSalary)}</td>
    <td>${fmt(p.loanDeduction + p.advanceDeduction)}</td><td style="font-weight:700;color:#4f8ef7">${fmt(p.netSalary)}</td>
  </tr>`).join('');
  const html = `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>كشف رواتب ${period}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
  @page{size:A4 landscape;margin:12mm 15mm}*{box-sizing:border-box}
  body{font-family:'Cairo',Helvetica,Arial,sans-serif;direction:rtl;color:#1a1a1a;margin:0;padding:20px;font-size:12px;line-height:1.5}
  h1,h2,h3{margin:0}
  .header{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;margin-bottom:16px;padding-bottom:12px;border-bottom:3px solid #4f8ef7}
  .company h1{font-size:20px;color:#4f8ef7;margin-bottom:4px}
  .company p{margin:2px 0;font-size:11px;color:#555}
  .info{text-align:left;font-size:11px}
  .info div{margin-bottom:3px}
  table{width:100%;border-collapse:collapse;margin-top:12px;font-size:11px}
  th{background:#4f8ef7;color:#fff;padding:8px 6px;font-weight:600;text-align:right}
  td{padding:7px 6px;border-bottom:1px solid #e5e5e5}
  tr:nth-child(even){background:#f8f9fa}
  .totals{margin-top:14px;width:320px;margin-left:0;margin-right:auto;font-size:12px}
  .totals div{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #eee}
  .totals .total-row{border-bottom:2px solid #4f8ef7;font-weight:700;font-size:13px;color:#4f8ef7}
  .footer{margin-top:20px;padding-top:10px;border-top:1px solid #ddd;font-size:10px;color:#888;display:flex;justify-content:space-between}
  @media print{body{padding:0}}
  </style></head><body>
  <div class="header">
    <div class="company"><h1>${company.name}</h1><p>${company.address || ''}</p><p>${company.phone || ''}</p></div>
    <div class="info">
      <div style="font-size:15px;font-weight:700;color:#4f8ef7">كشف رواتب</div>
      <div>الفترة: <strong>${period}</strong></div>
      <div>عدد الموظفين: <strong>${payrows.length}</strong></div>
      <div>تاريخ الطباعة: ${now}</div>
    </div>
  </div>
  <table><thead><tr><th>#</th><th>رقم</th><th>الموظف</th><th>ساعات العمل</th><th>أوفرتايم</th><th>أجر الساعة</th><th>الإجمالي</th><th>الخصومات</th><th>الصافي</th></tr></thead>
  <tbody>${rowsHtml}</tbody></table>
  <div class="totals">
    <div>الإجمالي الخام: <span>${fmt(totalGross)}</span></div>
    <div>إجمالي الخصومات: <span style="color:#f05454">${fmt(totalDeductions)}</span></div>
    <div class="total-row">صافي الرواتب: <span>${fmt(totalNet)}</span></div>
  </div>
  <div class="footer"><span>${company.name}</span><span>طباعة: ${now}</span></div>
  </body></html>`;
  win.document.write(html);
  win.document.close();
  setTimeout(() => win.print(), 600);
}

function printEmployeeList() {
  const emps = DB._hrmEmployees || [];
  if (!emps.length) { toast(t('hrm_no_employees'), 'error'); return; }
  const company = currentCompany();
  const win = window.open('', '_blank', 'width=900,height=1100');
  if (!win) { toast(t('barcode_print_err'), 'error'); return; }
  const now = new Date().toLocaleString('ar');
  const rowsHtml = emps.map((e, i) => {
    const statusLabel = e.status === 'active' ? 'نشط' : e.status === 'inactive' ? 'غير نشط' : 'منتهي';
    const contractLabel = { full_time: 'دوام كامل', part_time: 'دوام جزئي', hourly: 'بالساعة', contract: 'عقد' }[e.contractType] || e.contractType;
    return `<tr><td>${i + 1}</td><td>${e.employeeNo}</td><td>${e.name}</td><td>${e.phone || '—'}</td><td>${contractLabel}</td><td>${e.department || '—'}</td><td>${e.position || '—'}</td><td>${fmt(e.hourlyRate || 0)}</td><td>${statusLabel}</td></tr>`;
  }).join('');
  const html = `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>قائمة الموظفين</title>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
  @page{size:A4 landscape;margin:12mm 15mm}*{box-sizing:border-box}
  body{font-family:'Cairo',Helvetica,Arial,sans-serif;direction:rtl;color:#1a1a1a;margin:0;padding:20px;font-size:12px;line-height:1.5}
  h1{margin:0;font-size:20px;color:#4f8ef7}
  .header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;padding-bottom:12px;border-bottom:3px solid #4f8ef7}
  table{width:100%;border-collapse:collapse;margin-top:12px;font-size:11px}
  th{background:#4f8ef7;color:#fff;padding:8px 6px;font-weight:600;text-align:right}
  td{padding:7px 6px;border-bottom:1px solid #e5e5e5}
  tr:nth-child(even){background:#f8f9fa}
  .footer{margin-top:20px;padding-top:10px;border-top:1px solid #ddd;font-size:10px;color:#888;display:flex;justify-content:space-between}
  @media print{body{padding:0}}
  </style></head><body>
  <div class="header"><h1>قائمة الموظفين</h1><div style="font-size:11px">العدد: ${emps.length} — ${now}</div></div>
  <table><thead><tr><th>#</th><th>رقم</th><th>الاسم</th><th>الهاتف</th><th>العقد</th><th>القسم</th><th>المنصب</th><th>أجر الساعة</th><th>الحالة</th></tr></thead>
  <tbody>${rowsHtml}</tbody></table>
  <div class="footer"><span>${company.name}</span><span>طباعة: ${now}</span></div>
  </body></html>`;
  win.document.write(html);
  win.document.close();
  setTimeout(() => win.print(), 600);
}

/* ═══════════════════════════════════════════════════════════════
   HRM REPORTS
   ═══════════════════════════════════════════════════════════════ */
async function renderHRMReports() {
  const period = G('hrm-rpt-period')?.value || '';
  try {
    const res = await authenticatedFetch(`/api/hrm/payroll/summary/${period || 'all'}`);
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    const s = data.summary || {};
    const el = G('hrm-rpt-summary');
    if (!el) return;
    el.innerHTML = `
      <div class="hrm-rpt-grid">
        <div class="hrm-rpt-card blue"><div class="rpt-icon"><i class="ti ti-users"></i></div><div class="rpt-val">${s.totalEmployees || 0}</div><div class="rpt-lbl">عدد الموظفين</div></div>
        <div class="hrm-rpt-card green"><div class="rpt-icon"><i class="ti ti-cash"></i></div><div class="rpt-val">${fmt(s.totalGross || 0)}</div><div class="rpt-lbl">إجمالي الرواتب الخام</div></div>
        <div class="hrm-rpt-card amber"><div class="rpt-icon"><i class="ti ti-discount"></i></div><div class="rpt-val">${fmt(s.totalDeductions || 0)}</div><div class="rpt-lbl">إجمالي الخصومات</div></div>
        <div class="hrm-rpt-card red"><div class="rpt-icon"><i class="ti ti-wallet"></i></div><div class="rpt-val">${fmt(s.totalNet || 0)}</div><div class="rpt-lbl">صافي الرواتب</div></div>
      </div>
      <div class="hrm-rpt-grid">
        <div class="hrm-rpt-card cyan"><div class="rpt-icon"><i class="ti ti-clock"></i></div><div class="rpt-val">${(s.totalHours || 0).toFixed(1)}</div><div class="rpt-lbl">إجمالي ساعات العمل</div></div>
        <div class="hrm-rpt-card purple"><div class="rpt-icon"><i class="ti ti-clock-hour-4"></i></div><div class="rpt-val">${(s.totalOT || 0).toFixed(1)}</div><div class="rpt-lbl">إجمالي الأوفرتايم</div></div>
        <div class="hrm-rpt-card amber"><div class="rpt-icon"><i class="ti ti-file"></i></div><div class="rpt-val">${s.draft || 0}</div><div class="rpt-lbl">مسودات</div></div>
        <div class="hrm-rpt-card green"><div class="rpt-icon"><i class="ti ti-check"></i></div><div class="rpt-val">${s.paid || 0}</div><div class="rpt-lbl">مدفوعة</div></div>
      </div>`;
  } catch (err) {
    console.error('خطأ في تقرير الرواتب:', err);
  }
  try {
    const res2 = await authenticatedFetch('/api/hrm/advances?status=active');
    const data2 = await res2.json();
    if (data2.status !== 'success') throw new Error(data2.message);
    const advances = data2.advances || [];
    const totalActive = advances.reduce((s, a) => s + a.remainingBalance, 0);
    const el2 = G('hrm-rpt-advances');
    if (el2) {
      el2.innerHTML = `<div class="accounting-note acn-blue">
        <i class="ti ti-info-circle" style="font-size:14px;flex-shrink:0;margin-top:1px"></i>
        <span>إجمالي السلف والقروض النشطة: <strong>${fmt(totalActive)}</strong> ${t('currency_sym')} — عدد: <strong>${advances.length}</strong></span>
      </div>`;
    }
  } catch (err) {
    console.error('خطأ في تقرير السلف:', err);
  }
  renderCustomAlerts();
  renderComparativeReports();
  checkCustomAlerts();
}

/* ═══════════════════════════════════════════════════════════════
   EXCEL EXPORT
   ═══════════════════════════════════════════════════════════════ */
function exportHRMEmployees() {
  const emps = DB._hrmEmployees || [];
  if (!emps.length) { toast(t('hrm_no_employees'), 'error'); return; }
  const headers = ['رقم', t('hrm_name_req'), 'الهاتف', 'نوع العقد', 'القسم', 'المنصب', 'أجر الساعة', 'أجر الأوفرتايم', 'الراتب الشهري', 'تاريخ الالتحاق', 'الحالة'];
  const rows = emps.map(e => {
    const statusLabel = e.status === 'active' ? 'نشط' : e.status === 'inactive' ? 'غير نشط' : 'منتهي';
    const contractLabel = { full_time: 'دوام كامل', part_time: 'دوام جزئي', hourly: 'بالساعة', contract: 'عقد' }[e.contractType] || e.contractType;
    return [e.employeeNo, e.name, e.phone || '', contractLabel, e.department || '', e.position || '', e.hourlyRate || 0, e.overtimeRate || 0, e.monthlySalary || 0, e.startDate || '', statusLabel];
  });
  _exportTable(headers, rows, 'الموظفين', 'hrm-employees');
}

function exportHRMAttendance() {
  const recs = DB._hrmAttendance || [];
  if (!recs.length) { toast(t('hrm_no_attendance'), 'error'); return; }
  const headers = ['التاريخ', 'رقم الموظف', 'الموظف', 'وقت الدخول', 'وقت الخروج', 'الساعات', 'أوفرتايم', 'الحالة'];
  const rows = recs.map(r => {
    const statusLabel = { present: 'حاضر', absent: 'غائب', late: 'متأخر', half_day: 'نصف يوم', leave: 'إجازة' }[r.status] || r.status;
    return [r.date, r.employeeNo, r.employeeName, r.checkIn || '', r.checkOut || '', r.totalHours, r.overtimeHours, statusLabel];
  });
  _exportTable(headers, rows, 'الحضور', 'hrm-attendance');
}

function exportHRMPayroll() {
  const payrows = DB._hrmPayrows || [];
  if (!payrows.length) { toast(t('hrm_no_payroll'), 'error'); return; }
  const headers = ['الفترة', 'رقم', 'الموظف', 'ساعات العمل', 'أوفرتايم', 'أجر الساعة', 'الإجمالي الخام', 'خصم السلف', 'خصم القروض', 'إجمالي الخصومات', 'الصافي', 'الحالة'];
  const rows = payrows.map(p => {
    const statusLabel = { draft: 'مسودة', approved: 'معتمدة', paid: 'مدفوعة', cancelled: 'ملغاة' }[p.status] || p.status;
    return [p.period, p.employeeNo, p.employeeName, p.totalWorkedHours, p.totalOvertimeHours, p.hourlyRate, p.grossSalary, p.advanceDeduction, p.loanDeduction, p.totalDeductions, p.netSalary, statusLabel];
  });
  _exportTable(headers, rows, 'الرواتب', 'hrm-payroll');
}

function exportHRMAdvances() {
  const advances = DB._hrmAdvances || [];
  if (!advances.length) { toast(t('hrm_no_advances'), 'error'); return; }
  const headers = ['التاريخ', 'الموظف', 'النوع', 'المبلغ', 'المتبقي', 'القسط الشهري', 'عدد الأقساط', 'المدفوع', 'الحالة', 'السبب'];
  const rows = advances.map(a => {
    const typeLabel = a.type === 'advance' ? 'سلفة' : 'قرض';
    const statusLabel = { active: 'نشط', completed: 'مسدد', cancelled: 'ملغي' }[a.status] || a.status;
    return [a.date, a.employeeName, typeLabel, a.amount, a.remainingBalance, a.monthlyInstallment, a.installmentsTotal, a.installmentsPaid, statusLabel, a.purpose || ''];
  });
  _exportTable(headers, rows, 'السلف', 'hrm-advances');
}

function exportHRMCashLedger() {
  const entries = DB._hrmCashLedger || [];
  if (!entries.length) { toast(t('hrm_no_movements'), 'error'); return; }
  const headers = ['التاريخ', 'النوع', 'المبلغ', 'الرصيد', 'الفئة', 'الوصف', 'الموظف'];
  const rows = entries.map(e => [e.date, e.type === 'in' ? 'وارد' : 'صادر', e.amount, e.balanceAfter, e.category, e.description, e.employeeName || '']);
  _exportTable(headers, rows, 'سجل-الخزينة', 'hrm-cash-ledger');
}

/* ═══════════════════════════════════════════════════════════════
   HRM NOTIFICATIONS
   ═══════════════════════════════════════════════════════════════ */
async function checkHRMNotifications() {
  const notifications = [];
  try {
    const res = await authenticatedFetch('/api/hrm/employees?status=active');
    const data = await res.json();
    if (data.status === 'success') {
      const employees = data.employees || [];
      const today = new Date().toISOString().slice(0, 10);
      employees.forEach(e => {
        if (e.endDate && e.endDate <= today) {
          notifications.push({ type: 'warning', msg: `الموظف ${e.name} (${e.employeeNo}) — العقد انتهى أو ينتهي قريباً`, icon: 'ti ti-alert-triangle' });
        } else if (e.endDate) {
          const diff = Math.ceil((new Date(e.endDate) - new Date(today)) / (1000 * 60 * 60 * 24));
          if (diff <= 30) {
            notifications.push({ type: 'info', msg: `الموظف ${e.name} — العقد ينتهي خلال ${diff} يوم`, icon: 'ti ti-clock' });
          }
        }
      });
    }
  } catch (err) {}
  try {
    const res2 = await authenticatedFetch('/api/hrm/attendance?date=' + new Date().toISOString().slice(0, 10));
    const data2 = await res2.json();
    if (data2.status === 'success') {
      const records = data2.records || [];
      const absents = records.filter(r => r.status === 'absent');
      const lates = records.filter(r => r.status === 'late');
      if (absents.length) {
        notifications.push({ type: 'danger', msg: `${absents.length} موظف غائب اليوم`, icon: 'ti ti-user-off' });
      }
      if (lates.length) {
        notifications.push({ type: 'warning', msg: `${lates.length} موظف متأخر اليوم`, icon: 'ti ti-clock' });
      }
    }
  } catch (err) {}
  try {
    const res3 = await authenticatedFetch('/api/hrm/advances?status=active');
    const data3 = await res3.json();
    if (data3.status === 'success') {
      const advances = data3.advances || [];
      const highBalance = advances.filter(a => a.remainingBalance > a.amount * 0.5);
      if (highBalance.length) {
        notifications.push({ type: 'info', msg: `${highBalance.length} سلف/قرض برصيد مرتفع (أكثر من 50%)`, icon: 'ti ti-wallet' });
      }
    }
  } catch (err) {}
  renderHRMNotifications(notifications);
}

function renderHRMNotifications(notifications) {
  const el = G('hrm-notifications');
  if (!el) return;
  if (!notifications.length) { el.innerHTML = ''; return; }
  const colorMap = { danger: '#f05454', warning: '#f5a623', info: '#4f8ef7', success: '#2dd17e' };
  el.innerHTML = notifications.map(n => `<div class="hrm-notif ${n.type}">
    <i class="${n.icon}" style="font-size:16px;flex-shrink:0"></i>
    <span>${n.msg}</span>
  </div>`).join('');
  if ('Notification' in window && Notification.permission === 'granted') {
    const critical = notifications.filter(n => n.type === 'danger' || n.type === 'warning');
    if (critical.length) {
      try { new Notification('HRM — تنبيه', { body: critical.map(n => n.msg).join('\n'), icon: 'icon.svg' }); } catch (e) {}
    }
  }
}

/* ═══════════════════════════════════════════════════════════════
   PUSH NOTIFICATIONS PERMISSION
   ═══════════════════════════════════════════════════════════════ */
function requestHRMNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

/* ═══════════════════════════════════════════════════════════════
   ADVANCED HRM CHARTS
   ═══════════════════════════════════════════════════════════════ */
function renderHRMCharts() {
  const payrows = DB._hrmPayrows || [];
  const attendance = DB._hrmAttendance || [];
  const advances = DB._hrmAdvances || [];
  renderHRMPayrollChart(payrows);
  renderHRMAttendanceChart(attendance);
  renderHRMAdvancesChart(advances);
}

function renderHRMPayrollChart(payrows) {
  const el = G('hrm-chart-payroll');
  if (!el || !payrows.length) return;
  const labels = payrows.map(p => p.employeeName);
  const gross = payrows.map(p => p.grossSalary);
  const deductions = payrows.map(p => p.totalDeductions);
  const net = payrows.map(p => p.netSalary);
  if (el._chart) el._chart.destroy();
  el._chart = new Chart(el, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'الإجمالي الخام', data: gross, backgroundColor: 'rgba(79,142,247,0.7)' },
        { label: 'الخصومات', data: deductions, backgroundColor: 'rgba(240,84,84,0.7)' },
        { label: 'الصافي', data: net, backgroundColor: 'rgba(45,209,126,0.7)' }
      ]
    },
    options: { responsive: true, plugins: { legend: { position: 'bottom' } }, scales: { y: { beginAtZero: true } } }
  });
}

function renderHRMAttendanceChart(records) {
  const el = G('hrm-chart-attendance');
  if (!el || !records.length) return;
  const statusCounts = {};
  records.forEach(r => { statusCounts[r.status] = (statusCounts[r.status] || 0) + 1; });
  const labels = Object.keys(statusCounts).map(k => ({ present: 'حاضر', absent: 'غائب', late: 'متأخر', half_day: 'نصف يوم', leave: 'إجازة' }[k] || k));
  const data = Object.values(statusCounts);
  const colors = ['#2dd17e', '#f05454', '#f5a623', '#4f8ef7', '#9b59b6'];
  if (el._chart) el._chart.destroy();
  el._chart = new Chart(el, {
    type: 'doughnut',
    data: { labels, datasets: [{ data, backgroundColor: colors.slice(0, data.length) }] },
    options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
  });
}

function renderHRMAdvancesChart(advances) {
  const el = G('hrm-chart-advances');
  if (!el || !advances.length) return;
  const byType = { advance: 0, loan: 0 };
  advances.forEach(a => { byType[a.type] = (byType[a.type] || 0) + a.remainingBalance; });
  if (el._chart) el._chart.destroy();
  el._chart = new Chart(el, {
    type: 'pie',
    data: { labels: ['سلف', 'قروض'], datasets: [{ data: [byType.advance, byType.loan], backgroundColor: ['#f5a623', '#4f8ef7'] }] },
    options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
  });
}

/* ═══════════════════════════════════════════════════════════════
   PDF EXPORT — PAYROLL SHEET
   ═══════════════════════════════════════════════════════════════ */
function exportPayrollPDF() {
  const payrows = DB._hrmPayrows || [];
  if (!payrows.length) { toast(t('hrm_no_payroll'), 'error'); return; }
  const period = G('hrm-pay-period')?.value || '';
  const totalGross = payrows.reduce((s, p) => s + p.grossSalary, 0);
  const totalDeductions = payrows.reduce((s, p) => s + p.totalDeductions, 0);
  const totalNet = payrows.reduce((s, p) => s + p.netSalary, 0);
  const h = ['#','رقم','الموظف','ساعات العمل','أوفرتايم','أجر الساعة','الإجمالي','الخصومات','الصافي'];
  const rows = payrows.map((p, i) => [
    i + 1, p.employeeNo, p.employeeName,
    p.totalWorkedHours.toFixed(1), p.totalOvertimeHours.toFixed(1),
    fmt(p.hourlyRate), fmt(p.grossSalary),
    fmt(p.totalDeductions), fmt(p.netSalary)
  ]);
  _printGenericPDF('كشف رواتب — ' + period, h, rows, {
    subtitle: 'كشف رواتب الموظفين للفترة: ' + period,
    landscape: true,
    summary: [
      { label: 'الإجمالي الخام', value: fmt(totalGross) + ' '+t('currency_sym'), color: 'blue' },
      { label: 'إجمالي الخصومات', value: fmt(totalDeductions) + ' '+t('currency_sym'), color: 'red' },
      { label: 'صافي الرواتب', value: fmt(totalNet) + ' '+t('currency_sym'), color: 'green' },
      { label: 'عدد الموظفين', value: payrows.length, color: 'purple' }
    ],
    infoItems: [
      { label: 'الفترة', value: period },
      { label: 'عدد الموظفين', value: payrows.length }
    ]
  });
}

/* ═══════════════════════════════════════════════════════════════
   PERFORMANCE TRACKING
   ═══════════════════════════════════════════════════════════════ */
function openPerformanceEval(empId) {
  const emps = DB._hrmEmployees || [];
  const emp = emps.find(e => e._id === empId);
  if (!emp) { toast(t('hrm_choose_employee'), 'error'); return; }
  openModal('hrm-perf-modal');
  G('hrm-perf-emp-id').value = empId;
  G('hrm-perf-emp-name').textContent = `${emp.employeeNo} — ${emp.name}`;
  G('hrm-perf-date').value = new Date().toISOString().slice(0, 10);
}

async function savePerformanceEval() {
  const empId = G('hrm-perf-emp-id')?.value;
  const date = G('hrm-perf-date')?.value || new Date().toISOString().slice(0, 10);
  const quality = +(G('hrm-perf-quality')?.value || 3);
  const productivity = +(G('hrm-perf-productivity')?.value || 3);
  const teamwork = +(G('hrm-perf-teamwork')?.value || 3);
  const attendance = +(G('hrm-perf-attendance')?.value || 3);
  const notes = G('hrm-perf-notes')?.value?.trim() || '';
  if (!empId) { toast(t('hrm_name_required'), 'error'); return; }
  const avg = ((quality + productivity + teamwork + attendance) / 4).toFixed(1);
  const grade = avg >= 4.5 ? 'ممتاز' : avg >= 3.5 ? 'جيد جداً' : avg >= 2.5 ? 'جيد' : avg >= 1.5 ? 'مقبول' : 'ضعيف';
  try {
    const res = await authenticatedFetch('/api/hrm/performance', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ employeeId: empId, date, quality, productivity, teamwork, attendance, average: +avg, grade, notes })
    });
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    toast(t('hrm_adjustment_done'));
    closeModal('hrm-perf-modal');
    broadcastChange('hrm', { section: 'performance', action: 'add' });
  } catch (err) {
    toast(err.message, 'error');
  }
}

async function renderPerformanceList() {
  const empId = G('hrm-perf-list-emp')?.value || '';
  if (!empId) { G('hrm-perf-list-tbody').innerHTML = '<tr><td colspan="6" class="text-center p-3 text-muted">'+t('hrm_choose_employee')+'</td></tr>'; return; }
  try {
    const res = await authenticatedFetch(`/api/hrm/performance?employeeId=${empId}`);
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    const evals = data.evaluations || [];
    const tbody = G('hrm-perf-list-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!evals.length) { tbody.innerHTML = '<tr><td colspan="6" class="text-center p-3 text-muted">'+t('hrm_no_movements')+'</td></tr>'; return; }
    evals.forEach(e => {
      const gradeColor = { 'ممتاز': 'success', 'جيد جداً': 'primary', 'جيد': 'warning', 'مقبول': 'secondary', 'ضعيف': 'danger' }[e.grade] || 'secondary';
      tbody.innerHTML += `<tr>
        <td>${e.date}</td><td>${e.quality}</td><td>${e.productivity}</td><td>${e.teamwork}</td>
        <td><strong>${e.average}</strong></td>
        <td><span class="badge bg-${gradeColor}">${e.grade}</span></td>
      </tr>`;
    });
  } catch (err) {
    console.error('خطأ في تحميل التقييمات:', err);
  }
}

/* ═══════════════════════════════════════════════════════════════
   AUTO BACKUP (periodic HRM data snapshot)
   ═══════════════════════════════════════════════════════════════ */
let _hrmAutoBackupTimer = null;

function startHRMAutoBackup() {
  if (_hrmAutoBackupTimer) return;
  _hrmAutoBackupTimer = setInterval(async () => {
    try {
      const emps = DB._hrmEmployees || [];
      const payrows = DB._hrmPayrows || [];
      const advances = DB._hrmAdvances || [];
      const attendance = DB._hrmAttendance || [];
      const snapshot = {
        date: new Date().toISOString(),
        employees: emps.length,
        activePayrolls: payrows.filter(p => p.status === 'paid').length,
        activeAdvances: advances.filter(a => a.status === 'active').length,
        todayAttendance: attendance.length
      };
      console.log('[HRM Auto-Backup]', JSON.stringify(snapshot));
    } catch (e) {}
  }, 30 * 60 * 1000);
}

function stopHRMAutoBackup() {
  if (_hrmAutoBackupTimer) { clearInterval(_hrmAutoBackupTimer); _hrmAutoBackupTimer = null; }
}

/* ═══════════════════════════════════════════════════════════════
   PERFORMANCE EXPORT — EXCEL & PDF
   ═══════════════════════════════════════════════════════════════ */
async function exportPerformanceExcel() {
  const empId = G('hrm-perf-list-emp')?.value || '';
  if (!empId) { toast(t('hrm_choose_employee'), 'error'); return; }
  try {
    const res = await authenticatedFetch(`/api/hrm/performance?employeeId=${empId}`);
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    const evals = data.evaluations || [];
    if (!evals.length) { toast(t('hrm_no_movements'), 'error'); return; }
    const headers = ['التاريخ', 'جودة', 'إنتاجية', 'فريق', 'حضور', 'المتوسط', 'التقدير', 'ملاحظات'];
    const rows = evals.map(e => [e.date, e.quality, e.productivity, e.teamwork, e.attendance, e.average, e.grade, e.notes || '']);
    _exportTable(headers, rows, 'تقييمات-' + empId, 'hrm-performance');
  } catch (err) {
    toast(err.message, 'error');
  }
}

function exportPerformancePDF() {
  const empId = G('hrm-perf-list-emp')?.value || '';
  if (!empId) { toast(t('hrm_choose_employee'), 'error'); return; }
  const emps = DB._hrmEmployees || [];
  const emp = emps.find(e => e._id === empId);
  if (!emp) { toast(t('hrm_choose_employee'), 'error'); return; }
  const tbody = G('hrm-perf-list-tbody');
  if (!tbody || !tbody.rows.length) { toast(t('hrm_no_movements'), 'error'); return; }
  const h = ['التاريخ','جودة','إنتاجية','فريق','حضور','المتوسط','التقدير','ملاحظات'];
  const rows = Array.from(tbody.rows).map(r => Array.from(r.cells).map(c => c.textContent));
  const scores = Array.from(tbody.rows).map(r => parseFloat(r.cells[5]?.textContent) || 0);
  const avgScore = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : '0.0';
  _printGenericPDF('تقييمات الأداء — ' + emp.name, h, rows, {
    subtitle: 'تقييمات أداء الموظف: ' + emp.employeeNo + ' — ' + emp.name,
    summary: [
      { label: 'عدد التقييمات', value: rows.length, color: 'blue' },
      { label: 'متوسط الدرجات', value: avgScore, color: 'purple' }
    ],
    infoItems: [
      { label: 'الموظف', value: emp.employeeNo + ' — ' + emp.name },
      { label: 'عدد التقييمات', value: rows.length }
    ]
  });
}

/* ═══════════════════════════════════════════════════════════════
   CUSTOM ALERTS SETTINGS
   ═══════════════════════════════════════════════════════════════ */
const HRM_ALERTS_KEY = 'hrm_custom_alerts';
function getHRMCustomAlerts() {
  try { return JSON.parse(localStorage.getItem(HRM_ALERTS_KEY) || '[]'); } catch (e) { return []; }
}
function saveHRMCustomAlerts(alerts) {
  localStorage.setItem(HRM_ALERTS_KEY, JSON.stringify(alerts));
}
function addCustomAlert() {
  const type = G('hrm-alert-type')?.value || 'absence';
  const threshold = +(G('hrm-alert-threshold')?.value || 3);
  const enabled = G('hrm-alert-enabled')?.checked !== false;
  const alerts = getHRMCustomAlerts();
  alerts.push({ id: Date.now(), type, threshold, enabled, createdAt: new Date().toISOString() });
  saveHRMCustomAlerts(alerts);
  renderCustomAlerts();
  toast(t('hrm_employee_added'));
}
function removeCustomAlert(id) {
  const alerts = getHRMCustomAlerts().filter(a => a.id !== id);
  saveHRMCustomAlerts(alerts);
  renderCustomAlerts();
}
function renderCustomAlerts() {
  const el = G('hrm-custom-alerts-list');
  if (!el) return;
  const alerts = getHRMCustomAlerts();
  const typeLabels = { absence: 'غياب متتالي', late: 'تأخر متكرر', high_advance: 'رصيد مرتفع', no_checkout: 'بدون خروج' };
  el.innerHTML = alerts.length ? alerts.map(a => `<div style="display:flex;align-items:center;gap:8px;padding:8px;border-bottom:1px solid var(--line)">
    <span style="flex:1">${typeLabels[a.type] || a.type} — ${a.threshold} مرات ${a.enabled ? '(مفعّل)' : '(معطّل)'}</span>
    <button class="btn btn-sm btn-outline-danger" onclick="removeCustomAlert(${a.id})">حذف</button>
  </div>`).join('') : '<div class="text-center text-muted p-3">لا توجد تنبيهات مخصصة</div>';
}
async function checkCustomAlerts() {
  const alerts = getHRMCustomAlerts().filter(a => a.enabled);
  if (!alerts.length) return;
  const notifications = [];
  try {
    const res = await authenticatedFetch('/api/hrm/attendance?from=' + getRecentDate(7));
    const data = await res.json();
    if (data.status === 'success') {
      const records = data.records || [];
      const empDays = {};
      records.forEach(r => {
        if (!empDays[r.employeeId]) empDays[r.employeeId] = { name: r.employeeName, absences: 0, lates: 0, noCheckout: 0 };
        if (r.status === 'absent') empDays[r.employeeId].absences++;
        if (r.status === 'late') empDays[r.employeeId].lates++;
        if (r.checkIn && !r.checkOut) empDays[r.employeeId].noCheckout++;
      });
      alerts.forEach(a => {
        Object.values(empDays).forEach(emp => {
          const count = a.type === 'absence' ? emp.absences : a.type === 'late' ? emp.lates : emp.noCheckout;
          if (count >= a.threshold) {
            notifications.push({ type: 'danger', msg: `${emp.name} — ${a.threshold}+ ${a.type === 'absence' ? 'غياب' : a.type === 'late' ? 'تأخر' : 'خروج'} في آخر 7 أيام`, icon: 'ti ti-alert-triangle' });
          }
        });
      });
    }
  } catch (e) {}
  if (notifications.length) renderHRMNotifications(notifications);
}
function getRecentDate(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

/* ═══════════════════════════════════════════════════════════════
   EMPLOYEE ARCHIVE
   ═══════════════════════════════════════════════════════════════ */
async function openEmployeeArchive(empId) {
  const emps = DB._hrmEmployees || [];
  const emp = emps.find(e => e._id === empId);
  if (!emp) { toast(t('hrm_choose_employee'), 'error'); return; }
  openModal('hrm-archive-modal');
  G('hrm-archive-name').textContent = `${emp.employeeNo} — ${emp.name}`;
  const sections = G('hrm-archive-sections');
  if (!sections) return;
  sections.innerHTML = '<div class="text-center p-3">'+t('loading')+'</div>';
  try {
    const [attRes, advRes, perfRes, payRes] = await Promise.all([
      authenticatedFetch(`/api/hrm/attendance?employeeId=${empId}&from=2020-01-01`),
      authenticatedFetch(`/api/hrm/advances?employeeId=${empId}`),
      authenticatedFetch(`/api/hrm/performance?employeeId=${empId}`),
      authenticatedFetch(`/api/hrm/payroll?employeeId=${empId}`)
    ]);
    const attData = await attRes.json();
    const advData = await advRes.json();
    const perfData = await perfRes.json();
    const payData = await payRes.json();
    const att = attData.records || [];
    const adv = advData.advances || [];
    const perf = perfData.evaluations || [];
    const pay = payData.payrolls || [];
    const totalHours = att.reduce((s, r) => s + r.totalHours, 0);
    const totalOT = att.reduce((s, r) => s + r.overtimeHours, 0);
    const absences = att.filter(r => r.status === 'absent').length;
    const totalPay = pay.reduce((s, p) => s + p.netSalary, 0);
    const activeAdv = adv.filter(a => a.status === 'active').reduce((s, a) => s + a.remainingBalance, 0);
    const avgPerf = perf.length ? (perf.reduce((s, p) => s + p.average, 0) / perf.length).toFixed(1) : '—';
    sections.innerHTML = `
      <div class="stats-grid" style="margin-bottom:14px">
        <div class="stat-card blue"><div class="stat-lbl">إجمالي أيام العمل</div><div class="stat-val">${att.length}</div></div>
        <div class="stat-card green"><div class="stat-lbl">ساعات العمل</div><div class="stat-val">${totalHours.toFixed(1)}</div></div>
        <div class="stat-card amber"><div class="stat-lbl">أوفرتايم</div><div class="stat-val">${totalOT.toFixed(1)}</div></div>
        <div class="stat-card red"><div class="stat-lbl">أيام الغياب</div><div class="stat-val">${absences}</div></div>
      </div>
      <div class="stats-grid" style="margin-bottom:14px">
        <div class="stat-card blue"><div class="stat-lbl">إجمالي الرواتب</div><div class="stat-val">${fmt(totalPay)}</div></div>
        <div class="stat-card green"><div class="stat-lbl">سلف نشطة</div><div class="stat-val">${adv.filter(a=>a.status==='active').length}</div></div>
        <div class="stat-card amber"><div class="stat-lbl">مبلغ السلف المتبقي</div><div class="stat-val">${fmt(activeAdv)}</div></div>
        <div class="stat-card green"><div class="stat-lbl">متوسط التقييم</div><div class="stat-val">${avgPerf}</div></div>
      </div>
      <div class="accounting-note acn-blue">
        <i class="ti ti-info-circle" style="font-size:14px;flex-shrink:0"></i>
        <span>نوع العقد: <strong>${{ full_time: 'دوام كامل', part_time: 'دوام جزئي', hourly: 'بالساعة', contract: 'عقد' }[emp.contractType] || emp.contractType}</strong>
        — القسم: <strong>${emp.department || '—'}</strong> — المنصب: <strong>${emp.position || '—'}</strong>
        — تاريخ الالتحاق: <strong>${emp.startDate || '—'}</strong></span>
      </div>`;
  } catch (err) {
    sections.innerHTML = `<div class="text-center text-danger p-3">${t('barcode_error')}: ${err.message}</div>`;
  }
}

/* ═══════════════════════════════════════════════════════════════
   COMPARATIVE REPORTS — BY DEPARTMENT
   ═══════════════════════════════════════════════════════════════ */
async function renderComparativeReports() {
  const el = G('hrm-comparative');
  if (!el) return;
  try {
    const res = await authenticatedFetch('/api/hrm/employees?status=active');
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    const employees = data.employees || [];
    const deptMap = {};
    employees.forEach(e => {
      const dept = e.department || 'غير محدد';
      if (!deptMap[dept]) deptMap[dept] = { count: 0, totalRate: 0, totalSalary: 0, contracts: {} };
      deptMap[dept].count++;
      deptMap[dept].totalRate += e.hourlyRate || 0;
      deptMap[dept].totalSalary += e.monthlySalary || 0;
      deptMap[dept].contracts[e.contractType] = (deptMap[dept].contracts[e.contractType] || 0) + 1;
    });
    const rows = Object.entries(deptMap).map(([dept, d]) => {
      const avgRate = d.count ? (d.totalRate / d.count).toFixed(2) : 0;
      const contracts = Object.entries(d.contracts).map(([k, v]) => `${k}:${v}`).join(' / ');
      return `<tr><td><strong>${dept}</strong></td><td>${d.count}</td><td>${fmt(avgRate)}</td><td>${fmt(d.totalSalary)}</td><td>${contracts}</td></tr>`;
    }).join('');
    el.innerHTML = `
      <div class="card">
        <div class="card-hd"><h3><i class="ti ti-building-community" style="color:var(--accent)"></i> مقارنة أقسام الموظفين</h3></div>
        <div class="tbl-wrap"><table class="table"><thead><tr><th>القسم</th><th>العدد</th><th>متوسط أجر الساعة</th><th>إجمالي الرواتب</th><th>أنواع العقود</th></tr></thead><tbody>${rows || '<tr><td colspan="5" class="text-center p-3 text-muted">لا توجد بيانات</td></tr>'}</tbody></table></div>
      </div>`;
    renderComparativeChart(deptMap);
  } catch (err) {
    el.innerHTML = `<div class="text-center text-danger p-3">${t('barcode_error')}: ${err.message}</div>`;
  }
}

function renderComparativeChart(deptMap) {
  const el = G('hrm-chart-comparative');
  if (!el) return;
  const labels = Object.keys(deptMap);
  const counts = labels.map(d => deptMap[d].count);
  const salaries = labels.map(d => deptMap[d].totalSalary);
  if (el._chart) el._chart.destroy();
  el._chart = new Chart(el, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'عدد الموظفين', data: counts, backgroundColor: 'rgba(79,142,247,0.7)', yAxisID: 'y' },
        { label: 'إجمالي الرواتب', data: salaries, backgroundColor: 'rgba(45,209,126,0.7)', yAxisID: 'y1' }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom' } },
      scales: {
        y: { type: 'linear', position: 'left', beginAtZero: true, title: { display: true, text: 'العدد' } },
        y1: { type: 'linear', position: 'right', beginAtZero: true, title: { display: true, text: 'الرواتب' }, grid: { drawOnChartArea: false } }
      }
    }
  });
}

/* ═══════════════════════════════════════════════════════════════
   PWA SERVICE WORKER REGISTRATION
   ═══════════════════════════════════════════════════════════════ */
function registerHRMSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
}

/* ═══════════════════════════════════════════════════════════════
   PDF EXPORT — ATTENDANCE SHEET
   ═══════════════════════════════════════════════════════════════ */
function exportAttendancePDF() {
  const records = DB._hrmAttendance || [];
  if (!records.length) { toast(t('hrm_no_attendance'), 'error'); return; }
  const date = G('hrm-att-date')?.value || new Date().toISOString().slice(0, 10);
  const h = ['#','رقم الموظف','الموظف','دخول','خروج','الساعات','الحالة'];
  const rows = records.map((r, i) => {
    const statusLabel = { present: 'حاضر', absent: 'غائب', late: 'متأخر', half_day: 'نصف يوم', leave: 'إجازة' }[r.status] || r.status;
    return [i + 1, r.employeeNo, r.employeeName, r.checkIn || '—', r.checkOut || '—', r.totalHours.toFixed(1), statusLabel];
  });
  const present = records.filter(r => r.status === 'present').length;
  const absent = records.filter(r => r.status === 'absent').length;
  const late = records.filter(r => r.status === 'late').length;
  _printGenericPDF('سجل الحضور — ' + date, h, rows, {
    subtitle: 'سجل حضور وانصراف الموظفين',
    landscape: true,
    summary: [
      { label: 'العدد الإجمالي', value: records.length, color: 'blue' },
      { label: 'حاضرون', value: present, color: 'green' },
      { label: 'غائبون', value: absent, color: 'red' },
      { label: 'متأخرون', value: late, color: 'amber' }
    ],
    infoItems: [
      { label: 'التاريخ', value: date },
      { label: 'العدد', value: records.length + ' سجل' }
    ]
  });
}

/* ═══════════════════════════════════════════════════════════════
   PDF EXPORT — CASH LEDGER SHEET
   ═══════════════════════════════════════════════════════════════ */
function exportCashLedgerPDF() {
  const entries = DB._hrmCashLedger || [];
  if (!entries.length) { toast(t('hrm_no_movements'), 'error'); return; }
  const h = ['التاريخ','النوع','المبلغ','الرصيد','الفئة','الوصف','الموظف'];
  const rows = entries.map(e => {
    const typeLabel = e.type === 'in' ? 'وارد' : 'صادر';
    return [e.date, typeLabel, fmt(e.amount), fmt(e.balanceAfter), e.category, e.description, e.employeeName || '—'];
  });
  const totalIn = entries.filter(e => e.type === 'in').reduce((s, e) => s + e.amount, 0);
  const totalOut = entries.filter(e => e.type === 'out').reduce((s, e) => s + e.amount, 0);
  _printGenericPDF('سجل الخزينة', h, rows, {
    subtitle: 'سجل الحركات النقدية',
    landscape: true,
    summary: [
      { label: 'الوارد', value: fmt(totalIn) + ' '+t('currency_sym'), color: 'green' },
      { label: 'الصادر', value: fmt(totalOut) + ' '+t('currency_sym'), color: 'red' },
      { label: 'الصافي', value: fmt(totalIn - totalOut) + ' '+t('currency_sym'), color: 'blue' },
      { label: 'عدد الحركات', value: entries.length, color: 'purple' }
    ]
  });
}

/* ═══════════════════════════════════════════════════════════════
   PDF EXPORT — ADVANCES SHEET
   ═══════════════════════════════════════════════════════════════ */
function exportAdvancesPDF() {
  const advances = DB._hrmAdvances || [];
  if (!advances.length) { toast(t('hrm_no_advances'), 'error'); return; }
  const h = ['#','التاريخ','الموظف','النوع','المبلغ','المتبقي','الأقساط','الحالة'];
  const rows = advances.map((a, i) => {
    const typeLabel = a.type === 'advance' ? 'سلفة' : 'قرض';
    const statusLabel = { active: 'نشط', completed: 'مسدد', cancelled: 'ملغي' }[a.status] || a.status;
    return [i + 1, a.date, a.employeeName, typeLabel, fmt(a.amount), fmt(a.remainingBalance), a.installmentsPaid + '/' + a.installmentsTotal, statusLabel];
  });
  const totalAdvance = advances.filter(a => a.type === 'advance').reduce((s, a) => s + a.amount, 0);
  const totalLoan = advances.filter(a => a.type === 'loan').reduce((s, a) => s + a.amount, 0);
  const totalRemaining = advances.reduce((s, a) => s + a.remainingBalance, 0);
  _printGenericPDF('السلف والقروض', h, rows, {
    subtitle: 'سجل سلف وقروض الموظفين',
    landscape: true,
    summary: [
      { label: 'إجمالي السلف', value: fmt(totalAdvance) + ' '+t('currency_sym'), color: 'blue' },
      { label: 'إجمالي القروض', value: fmt(totalLoan) + ' '+t('currency_sym'), color: 'purple' },
      { label: 'المتبقي', value: fmt(totalRemaining) + ' '+t('currency_sym'), color: 'red' },
      { label: 'العدد', value: advances.length, color: 'amber' }
    ]
  });
}


/* ═══════════════════════════════════════════════
   reports-erp.js
══════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════
   ERP REPORT ENGINE — نظام التقارير المتقدم
   ═══════════════════════════════════════════════════════════════ */

const ERP = {
  _currentTemplate: null,
  _filters: {},
  _sortCol: null,
  _sortDir: 'asc',
  _groupCol: null,
  _visibleCols: [],
  _rawData: [],
  _filteredData: [],
  _savedReports: [],
  _activeQuickDate: '',
  _charts: {},
  _TEMPLATES: {}
};

const ERP_COL_KEY = 'erp_visible_cols';
const ERP_SAVED_KEY = 'erp_saved_reports';

function erpInit() {
  try { ERP._visibleCols = JSON.parse(localStorage.getItem(ERP_COL_KEY) || '[]'); } catch (e) { ERP._visibleCols = []; }
  try { ERP._savedReports = JSON.parse(localStorage.getItem(ERP_SAVED_KEY) || '[]'); } catch (e) { ERP._savedReports = []; }
  erpRegisterTemplates();
}

/* ═══════════════════════════════════════════════════════════════
   TEMPLATE REGISTRY — 8 قوالب تقارير جاهزة
   ═══════════════════════════════════════════════════════════════ */
function erpRegisterTemplates() {
  ERP._TEMPLATES = {
    'payroll-summary': {
      name: 'ملخص الرواتب', icon: 'ti ti-cash', color: 'blue',
      desc: 'ملخص شامل للرواتب مع الخصومات والصافي',
      defaultCols: ['period', 'employeeNo', 'employeeName', 'totalWorkedHours', 'grossSalary', 'totalDeductions', 'netSalary', 'status'],
      allCols: [
        { key: 'period', label: 'الفترة' }, { key: 'employeeNo', label: 'رقم الموظف' },
        { key: 'employeeName', label: 'الموظف' }, { key: 'department', label: 'القسم' },
        { key: 'totalWorkedHours', label: 'الساعات', num: true },
        { key: 'totalOvertimeHours', label: 'أوفرتايم', num: true },
        { key: 'hourlyRate', label: 'أجر الساعة', num: true, fmt: true },
        { key: 'grossSalary', label: 'الإجمالي الخام', num: true, fmt: true },
        { key: 'advanceDeduction', label: 'خصم السلف', num: true, fmt: true },
        { key: 'loanDeduction', label: 'خصم القروض', num: true, fmt: true },
        { key: 'totalDeductions', label: 'إجمالي الخصومات', num: true, fmt: true },
        { key: 'netSalary', label: 'الصافي', num: true, fmt: true },
        { key: 'status', label: 'الحالة', badge: { draft: 'مسودة', approved: 'معتمدة', paid: 'مدفوعة', cancelled: 'ملغاة' } }
      ],
      groupBy: ['none', 'status', 'department', 'period'],
      groupLabels: { none: 'بدون', status: 'الحالة', department: 'القسم', period: 'الفترة' },
      fetchData: async () => {
        const all = [];
        const months = erpGetRecentMonths(6);
        for (const m of months) {
          try {
            const r = await authenticatedFetch('/api/hrm/payroll/summary/' + m);
            const d = await r.json();
            if (d.status === 'success') (d.payrolls || []).forEach(p => all.push(p));
          } catch (e) {}
        }
        return all;
      },
      kpiBuilder: (data) => {
        const total = data.length;
        const paid = data.filter(r => r.status === 'paid').length;
        const totalGross = data.reduce((s, r) => s + (r.grossSalary || 0), 0);
        const totalNet = data.reduce((s, r) => s + (r.netSalary || 0), 0);
        const totalDed = data.reduce((s, r) => s + (r.totalDeductions || 0), 0);
        const avgSalary = total ? totalNet / total : 0;
        return [
          { label: 'عدد سجلات الرواتب', value: total, icon: 'ti ti-file-invoice', color: 'blue' },
          { label: 'إجمالي الخام', value: fmt(totalGross), icon: 'ti ti-cash', color: 'green' },
          { label: 'إجمالي الخصومات', value: fmt(totalDed), icon: 'ti ti-discount', color: 'amber' },
          { label: 'صافي الرواتب', value: fmt(totalNet), icon: 'ti ti-wallet', color: 'purple' },
          { label: 'متوسط الراتب', value: fmt(avgSalary), icon: 'ti ti-calculator', color: 'cyan' },
          { label: 'مدفوعة', value: paid + ' / ' + total, icon: 'ti ti-check', color: 'green' }
        ];
      },
      chartBuilder: (data) => {
        const byMonth = {};
        data.forEach(r => {
          const m = r.period || 'غير محدد';
          if (!byMonth[m]) byMonth[m] = { gross: 0, net: 0, deductions: 0 };
          byMonth[m].gross += r.grossSalary || 0;
          byMonth[m].net += r.netSalary || 0;
          byMonth[m].deductions += r.totalDeductions || 0;
        });
        const labels = Object.keys(byMonth);
        return [
          { type: 'bar', title: 'الرواتب حسب الشهر', labels, series: [
            { label: 'ال الخام', data: labels.map(l => byMonth[l].gross), color: '79,142,247' },
            { label: 'الصافي', data: labels.map(l => byMonth[l].net), color: '45,209,126' },
            { label: 'الخصومات', data: labels.map(l => byMonth[l].deductions), color: '240,84,84' }
          ]}
        ];
      }
    },

    'attendance-detail': {
      name: 'تقرير الحضور التفصيلي', icon: 'ti ti-clock', color: 'cyan',
      desc: 'سجل حضور وانصراف يومي تفصيلي',
      defaultCols: ['date', 'employeeNo', 'employeeName', 'department', 'checkIn', 'checkOut', 'totalHours', 'overtimeHours', 'status'],
      allCols: [
        { key: 'date', label: 'التاريخ' }, { key: 'employeeNo', label: 'رقم الموظف' },
        { key: 'employeeName', label: 'الموظف' }, { key: 'department', label: 'القسم' },
        { key: 'checkIn', label: 'الدخول' }, { key: 'checkOut', label: 'الخروج' },
        { key: 'totalHours', label: 'الساعات', num: true, dec: 1 },
        { key: 'overtimeHours', label: 'أوفرتايم', num: true, dec: 1 },
        { key: 'status', label: 'الحالة', badge: { present: 'حاضر', absent: 'غائب', late: 'متأخر', half_day: 'نصف يوم', leave: 'إجازة' } }
      ],
      groupBy: ['none', 'status', 'department', 'date'],
      groupLabels: { none: 'بدون', status: 'الحالة', department: 'القسم', date: 'التاريخ' },
      fetchData: async () => {
        const from = ERP._filters.dateFrom || erpGetRecentDate(30);
        const to = ERP._filters.dateTo || erpGetToday();
        try {
          const r = await authenticatedFetch(`/api/hrm/attendance?from=${from}&to=${to}`);
          const d = await r.json();
          return d.status === 'success' ? (d.records || []) : [];
        } catch (e) { return []; }
      },
      kpiBuilder: (data) => {
        const total = data.length;
        const present = data.filter(r => r.status === 'present').length;
        const absent = data.filter(r => r.status === 'absent').length;
        const late = data.filter(r => r.status === 'late').length;
        const hours = data.reduce((s, r) => s + (r.totalHours || 0), 0);
        const ot = data.reduce((s, r) => s + (r.overtimeHours || 0), 0);
        const rate = total ? ((present / total) * 100).toFixed(1) : 0;
        return [
          { label: 'إجمالي السجلات', value: total, icon: 'ti ti-list', color: 'blue' },
          { label: 'حاضرون', value: present, icon: 'ti ti-user-check', color: 'green' },
          { label: 'غائبون', value: absent, icon: 'ti ti-user-x', color: 'red' },
          { label: 'متأخرون', value: late, icon: 'ti ti-clock', color: 'amber' },
          { label: 'إجمالي الساعات', value: hours.toFixed(1), icon: 'ti ti-clock-hour-4', color: 'cyan' },
          { label: 'نسبة الحضور', value: rate + '%', icon: 'ti ti-chart-donut', color: 'purple' }
        ];
      },
      chartBuilder: (data) => {
        const byDate = {};
        data.forEach(r => {
          const d = r.date || 'غير محدد';
          if (!byDate[d]) byDate[d] = { present: 0, absent: 0, late: 0 };
          if (r.status === 'present') byDate[d].present++;
          else if (r.status === 'absent') byDate[d].absent++;
          else if (r.status === 'late') byDate[d].late++;
        });
        const labels = Object.keys(byDate).sort();
        return [
          { type: 'line', title: 'الحضور اليومي', labels, series: [
            { label: 'حاضر', data: labels.map(l => byDate[l].present), color: '45,209,126' },
            { label: 'متأخر', data: labels.map(l => byDate[l].late), color: '245,166,35' },
            { label: 'غائب', data: labels.map(l => byDate[l].absent), color: '240,84,84' }
          ]}
        ];
      }
    },

    'advances-report': {
      name: 'تقرير السلف والقروض', icon: 'ti ti-coins', color: 'amber',
      desc: 'ملخص السلف والقروض النشطة والمدفوعة',
      defaultCols: ['date', 'employeeName', 'department', 'type', 'amount', 'monthlyInstallment', 'remainingBalance', 'installmentsPaid', 'installmentsTotal', 'status'],
      allCols: [
        { key: 'date', label: 'التاريخ' }, { key: 'employeeNo', label: 'رقم الموظف' },
        { key: 'employeeName', label: 'الموظف' }, { key: 'department', label: 'القسم' },
        { key: 'type', label: 'النوع', badge: { advance: 'سلفة', loan: 'قرض' } },
        { key: 'amount', label: 'المبلغ', num: true, fmt: true },
        { key: 'monthlyInstallment', label: 'القسط الشهري', num: true, fmt: true },
        { key: 'remainingBalance', label: 'المتبقي', num: true, fmt: true },
        { key: 'installmentsPaid', label: 'الأقساط المدفوعة', num: true },
        { key: 'installmentsTotal', label: 'عدد الأقساط', num: true },
        { key: 'status', label: 'الحالة', badge: { active: 'نشط', completed: 'مسدد', cancelled: 'ملغي' } },
        { key: 'purpose', label: 'السبب' }
      ],
      groupBy: ['none', 'type', 'status', 'department'],
      groupLabels: { none: 'بدون', type: 'النوع', status: 'الحالة', department: 'القسم' },
      fetchData: async () => {
        try {
          const r = await authenticatedFetch('/api/hrm/advances');
          const d = await r.json();
          return d.status === 'success' ? (d.advances || []) : [];
        } catch (e) { return []; }
      },
      kpiBuilder: (data) => {
        const total = data.length;
        const active = data.filter(r => r.status === 'active').length;
        const totalAmt = data.reduce((s, r) => s + (r.amount || 0), 0);
        const totalRemaining = data.reduce((s, r) => s + (r.remainingBalance || 0), 0);
        const advs = data.filter(r => r.type === 'advance').reduce((s, r) => s + (r.amount || 0), 0);
        const loans = data.filter(r => r.type === 'loan').reduce((s, r) => s + (r.amount || 0), 0);
        return [
          { label: 'إجمالي السلف والقروض', value: total, icon: 'ti ti-coins', color: 'amber' },
          { label: 'نشطة', value: active, icon: 'ti ti-player-play', color: 'green' },
          { label: 'إجمالي المبالغ', value: fmt(totalAmt), icon: 'ti ti-cash', color: 'blue' },
          { label: 'المتبقي', value: fmt(totalRemaining), icon: 'ti ti-wallet', color: 'red' },
          { label: 'السلف', value: fmt(advs), icon: 'ti ti-hand-click', color: 'purple' },
          { label: 'القروض', value: fmt(loans), icon: 'ti ti-building-bank', color: 'cyan' }
        ];
      },
      chartBuilder: (data) => {
        const byEmp = {};
        data.forEach(r => {
          const name = r.employeeName || 'غير محدد';
          if (!byEmp[name]) byEmp[name] = { advance: 0, loan: 0 };
          if (r.type === 'advance') byEmp[name].advance += r.amount || 0;
          else byEmp[name].loan += r.amount || 0;
        });
        const labels = Object.keys(byEmp);
        return [
          { type: 'bar', title: 'السلف حسب الموظف', labels, series: [
            { label: 'سلف', data: labels.map(l => byEmp[l].advance), color: '79,142,247' },
            { label: 'قروض', data: labels.map(l => byEmp[l].loan), color: '155,114,247' }
          ]}
        ];
      }
    },

    'performance-report': {
      name: 'تقرير الأداء', icon: 'ti ti-star', color: 'purple',
      desc: 'تقييمات الأداء مع المقارنات',
      defaultCols: ['employeeName', 'department', 'quality', 'productivity', 'teamwork', 'attendance', 'average', 'grade'],
      allCols: [
        { key: 'employeeNo', label: 'رقم الموظف' }, { key: 'employeeName', label: 'الموظف' },
        { key: 'department', label: 'القسم' }, { key: 'date', label: 'التاريخ' },
        { key: 'quality', label: 'جودة العمل', num: true },
        { key: 'productivity', label: 'الإنتاجية', num: true },
        { key: 'teamwork', label: 'العمل الجماعي', num: true },
        { key: 'attendance', label: 'الحضور', num: true },
        { key: 'average', label: 'المتوسط', num: true, dec: 1 },
        { key: 'grade', label: 'التقدير', badge: { excellent: 'ممتاز', good: 'جيد جداً', acceptable: 'جيد', poor: 'ضعيف' } }
      ],
      groupBy: ['none', 'grade', 'department'],
      groupLabels: { none: 'بدون', grade: 'التقدير', department: 'القسم' },
      fetchData: async () => {
        try {
          const r = await authenticatedFetch('/api/hrm/performance');
          const d = await r.json();
          return d.status === 'success' ? (d.evaluations || []) : [];
        } catch (e) { return []; }
      },
      kpiBuilder: (data) => {
        const total = data.length;
        const avgAll = total ? (data.reduce((s, r) => s + (r.average || 0), 0) / total).toFixed(1) : '0';
        const excellent = data.filter(r => r.average >= 4.5).length;
        const good = data.filter(r => r.average >= 3.5 && r.average < 4.5).length;
        const poor = data.filter(r => r.average < 3).length;
        return [
          { label: 'عدد التقييمات', value: total, icon: 'ti ti-star', color: 'purple' },
          { label: 'متوسط الأداء العام', value: avgAll, icon: 'ti ti-chart-bar', color: 'blue' },
          { label: 'ممتاز', value: excellent, icon: 'ti ti-trophy', color: 'green' },
          { label: 'جيد جداً', value: good, icon: 'ti ti-thumb-up', color: 'cyan' },
          { label: 'ضعيف', value: poor, icon: 'ti ti-alert-triangle', color: 'red' },
          { label: 'نسبة التميز', value: total ? ((excellent / total) * 100).toFixed(0) + '%' : '0%', icon: 'ti ti-percentage', color: 'amber' }
        ];
      },
      chartBuilder: (data) => {
        const byDept = {};
        data.forEach(r => {
          const dept = r.department || 'غير محدد';
          if (!byDept[dept]) byDept[dept] = { total: 0, count: 0 };
          byDept[dept].total += r.average || 0;
          byDept[dept].count++;
        });
        const labels = Object.keys(byDept);
        return [
          { type: 'radar', title: 'مقارنة أداء الأقسام', labels, series: [
            { label: 'متوسط الأداء', data: labels.map(l => +(byDept[l].total / byDept[l].count).toFixed(1)), color: '155,114,247' }
          ]}
        ];
      }
    },

    'cash-ledger': {
      name: 'سجل الخزينة', icon: 'ti ti-wallet', color: 'green',
      desc: 'حركات الخزينة الواردة والصادرة',
      defaultCols: ['date', 'type', 'amount', 'balanceAfter', 'category', 'description', 'employeeName'],
      allCols: [
        { key: 'date', label: 'التاريخ' },
        { key: 'type', label: 'النوع', badge: { in: 'وارد', out: 'صادر' } },
        { key: 'amount', label: 'المبلغ', num: true, fmt: true },
        { key: 'balanceAfter', label: 'الرصيد', num: true, fmt: true },
        { key: 'category', label: 'الفئة' },
        { key: 'description', label: 'الوصف' },
        { key: 'employeeName', label: 'الموظف' }
      ],
      groupBy: ['none', 'type', 'category'],
      groupLabels: { none: 'بدون', type: 'النوع', category: 'الفئة' },
      fetchData: async () => {
        try {
          const r = await authenticatedFetch('/api/hrm/cash-ledger');
          const d = await r.json();
          return d.status === 'success' ? (d.entries || []) : [];
        } catch (e) { return []; }
      },
      kpiBuilder: (data) => {
        const totalIn = data.filter(e => e.type === 'in').reduce((s, e) => s + (e.amount || 0), 0);
        const totalOut = data.filter(e => e.type === 'out').reduce((s, e) => s + (e.amount || 0), 0);
        const net = totalIn - totalOut;
        return [
          { label: 'إجمالي الوارد', value: fmt(totalIn), icon: 'ti ti-arrow-down', color: 'green' },
          { label: 'إجمالي الصادر', value: fmt(totalOut), icon: 'ti ti-arrow-up', color: 'red' },
          { label: 'الصافي', value: fmt(net), icon: 'ti ti-scale', color: net >= 0 ? 'blue' : 'red' },
          { label: 'عدد الحركات', value: data.length, icon: 'ti ti-list', color: 'purple' }
        ];
      },
      chartBuilder: (data) => {
        const byDate = {};
        data.forEach(e => {
          const d = e.date || 'غير محدد';
          if (!byDate[d]) byDate[d] = { in: 0, out: 0 };
          if (e.type === 'in') byDate[d].in += e.amount || 0;
          else byDate[d].out += e.amount || 0;
        });
        const labels = Object.keys(byDate).sort();
        return [
          { type: 'bar', title: 'الحركات اليومية', labels, series: [
            { label: 'وارد', data: labels.map(l => byDate[l].in), color: '45,209,126' },
            { label: 'صادر', data: labels.map(l => byDate[l].out), color: '240,84,84' }
          ]}
        ];
      }
    },

    'department-comparison': {
      name: 'مقارنة الأقسام', icon: 'ti ti-building-community', color: 'cyan',
      desc: 'مقارنة شاملة بين أقسام الموظفين',
      defaultCols: ['department', 'count', 'avgRate', 'totalSalary', 'totalHours', 'avgPerformance', 'contracts'],
      allCols: [
        { key: 'department', label: 'القسم' }, { key: 'count', label: 'العدد', num: true },
        { key: 'avgRate', label: 'متوسط أجر الساعة', num: true, fmt: true },
        { key: 'totalSalary', label: 'إجمالي الرواتب', num: true, fmt: true },
        { key: 'totalHours', label: 'إجمالي الساعات', num: true },
        { key: 'avgPerformance', label: 'متوسط الأداء', num: true, dec: 1 },
        { key: 'contracts', label: 'أنواع العقود' }
      ],
      groupBy: ['none'],
      groupLabels: { none: 'تجميع تلقائي حسب القسم' },
      fetchData: async () => {
        const emps = DB._hrmEmployees || [];
        const deptMap = {};
        emps.forEach(e => {
          const dept = e.department || 'غير محدد';
          if (!deptMap[dept]) deptMap[dept] = { count: 0, totalRate: 0, totalSalary: 0, totalHours: 0, performances: [], contracts: {} };
          deptMap[dept].count++;
          deptMap[dept].totalRate += e.hourlyRate || 0;
          deptMap[dept].totalSalary += e.monthlySalary || 0;
          deptMap[dept].contracts[e.contractType] = (deptMap[dept].contracts[e.contractType] || 0) + 1;
        });
        try {
          const attRes = await authenticatedFetch('/api/hrm/attendance?from=' + erpGetRecentDate(30));
          const attData = await attRes.json();
          if (attData.status === 'success') {
            (attData.records || []).forEach(r => {
              const emp = emps.find(e => e._id === r.employeeId);
              if (emp && deptMap[emp.department]) deptMap[emp.department].totalHours += r.totalHours || 0;
            });
          }
        } catch (e) {}
        try {
          const perfRes = await authenticatedFetch('/api/hrm/performance');
          const perfData = await perfRes.json();
          if (perfData.status === 'success') {
            (perfData.evaluations || []).forEach(p => {
              const emp = emps.find(e => e._id === p.employeeId);
              if (emp && deptMap[emp.department]) deptMap[emp.department].performances.push(p.average || 0);
            });
          }
        } catch (e) {}
        return Object.entries(deptMap).map(([dept, d]) => ({
          department: dept, count: d.count, avgRate: d.count ? +(d.totalRate / d.count).toFixed(2) : 0,
          totalSalary: d.totalSalary, totalHours: +d.totalHours.toFixed(1),
          avgPerformance: d.performances.length ? +(d.performances.reduce((a, b) => a + b, 0) / d.performances.length).toFixed(1) : 0,
          contracts: Object.entries(d.contracts).map(([k, v]) => `${k}:${v}`).join(' / ')
        }));
      },
      kpiBuilder: (data) => {
        const totalEmp = data.reduce((s, d) => s + d.count, 0);
        const totalSalary = data.reduce((s, d) => s + d.totalSalary, 0);
        const avgPerf = data.filter(d => d.avgPerformance).length ? (data.reduce((s, d) => s + d.avgPerformance, 0) / data.filter(d => d.avgPerformance).length).toFixed(1) : '0';
        return [
          { label: 'عدد الأقسام', value: data.length, icon: 'ti ti-building', color: 'blue' },
          { label: 'إجمالي الموظفين', value: totalEmp, icon: 'ti ti-users', color: 'green' },
          { label: 'إجمالي الرواتب', value: fmt(totalSalary), icon: 'ti ti-cash', color: 'amber' },
          { label: 'متوسط الأداء', value: avgPerf, icon: 'ti ti-star', color: 'purple' }
        ];
      },
      chartBuilder: (data) => {
        const labels = data.map(d => d.department);
        return [
          { type: 'bar', title: 'مقارنة الأقسام', labels, series: [
            { label: 'عدد الموظفين', data: data.map(d => d.count), color: '79,142,247' },
            { label: 'إجمالي الرواتب', data: data.map(d => d.totalSalary), color: '45,209,126' }
          ]},
          { type: 'doughnut', title: 'توزيع الموظفين', labels, series: [
            { label: 'الموظفين', data: data.map(d => d.count), color: '79,142,247' }
          ]}
        ];
      }
    },

    'monthly-comparison': {
      name: 'مقارنة الأشهر', icon: 'ti ti-calendar', color: 'amber',
      desc: 'مقارنة أداء الأشهر المختلفة',
      defaultCols: ['month', 'totalGross', 'totalNet', 'totalDeductions', 'attendanceRate', 'totalOT'],
      allCols: [
        { key: 'month', label: 'الشهر' },
        { key: 'totalGross', label: 'إجمالي الخام', num: true, fmt: true },
        { key: 'totalNet', label: 'الصافي', num: true, fmt: true },
        { key: 'totalDeductions', label: 'الخصومات', num: true, fmt: true },
        { key: 'attendanceRate', label: 'نسبة الحضور', num: true, suffix: '%' },
        { key: 'totalOT', label: 'أوفرتايم', num: true, dec: 1 },
        { key: 'empCount', label: 'عدد الموظفين', num: true }
      ],
      groupBy: ['none'],
      groupLabels: { none: 'تجميع تلقائي حسب الشهر' },
      fetchData: async () => {
        const months = erpGetRecentMonths(6);
        const results = [];
        for (const m of months) {
          const row = { month: m, totalGross: 0, totalNet: 0, totalDeductions: 0, attendanceRate: 0, totalOT: 0, empCount: 0 };
          try {
            const r = await authenticatedFetch('/api/hrm/payroll/summary/' + m);
            const d = await r.json();
            if (d.status === 'success' && d.payrolls) {
              row.totalGross = d.payrolls.reduce((s, p) => s + (p.grossSalary || 0), 0);
              row.totalNet = d.payrolls.reduce((s, p) => s + (p.netSalary || 0), 0);
              row.totalDeductions = d.payrolls.reduce((s, p) => s + (p.totalDeductions || 0), 0);
              row.empCount = d.payrolls.length;
            }
          } catch (e) {}
          try {
            const from = m + '-01';
            const to = m + '-31';
            const r2 = await authenticatedFetch(`/api/hrm/attendance?from=${from}&to=${to}`);
            const d2 = await r2.json();
            if (d2.status === 'success' && d2.records) {
              const total = d2.records.length;
              const present = d2.records.filter(r => r.status === 'present').length;
              row.attendanceRate = total ? +((present / total) * 100).toFixed(1) : 0;
              row.totalOT = d2.records.reduce((s, r) => s + (r.overtimeHours || 0), 0);
            }
          } catch (e) {}
          results.push(row);
        }
        return results;
      },
      kpiBuilder: (data) => {
        if (!data.length) return [];
        const latest = data[data.length - 1];
        const prev = data.length > 1 ? data[data.length - 2] : null;
        const grossDelta = prev ? latest.totalGross - prev.totalGross : 0;
        const netDelta = prev ? latest.totalNet - prev.totalNet : 0;
        return [
          { label: 'آخر شهر — الخام', value: fmt(latest.totalGross), icon: 'ti ti-cash', color: 'blue' },
          { label: 'آخر شهر — الصافي', value: fmt(latest.totalNet), icon: 'ti ti-wallet', color: 'green' },
          { label: 'الخصومات', value: fmt(latest.totalDeductions), icon: 'ti ti-discount', color: 'amber' },
          { label: 'نسبة الحضور', value: latest.attendanceRate + '%', icon: 'ti ti-chart-donut', color: 'cyan' },
          { label: 'الفرق — الخام', value: (grossDelta >= 0 ? '+' : '') + fmt(grossDelta), icon: grossDelta >= 0 ? 'ti ti-trending-up' : 'ti ti-trending-down', color: grossDelta >= 0 ? 'green' : 'red' },
          { label: 'الفرق — الصافي', value: (netDelta >= 0 ? '+' : '') + fmt(netDelta), icon: netDelta >= 0 ? 'ti ti-trending-up' : 'ti ti-trending-down', color: netDelta >= 0 ? 'green' : 'red' }
        ];
      },
      chartBuilder: (data) => {
        const labels = data.map(d => d.month);
        return [
          { type: 'line', title: 'تطور الرواتب', labels, series: [
            { label: 'الخام', data: data.map(d => d.totalGross), color: '79,142,247' },
            { label: 'الصافي', data: data.map(d => d.totalNet), color: '45,209,126' },
            { label: 'الخصومات', data: data.map(d => d.totalDeductions), color: '240,84,84' }
          ]},
          { type: 'line', title: 'نسبة الحضور والأوفرتايم', labels, series: [
            { label: 'نسبة الحضور %', data: data.map(d => d.attendanceRate), color: '45,209,126' },
            { label: 'أوفرتايم', data: data.map(d => d.totalOT), color: '245,166,35' }
          ]}
        ];
      }
    },

    'executive-summary': {
      name: 'الملخص التنفيذي', icon: 'ti ti-dashboard', color: 'blue',
      desc: 'نظرة شاملة على جميع مكونات HRM',
      defaultCols: ['metric', 'currentMonth', 'previousMonth', 'change'],
      allCols: [
        { key: 'metric', label: 'المقياس' },
        { key: 'currentMonth', label: 'الشهر الحالي', num: true, fmt: true },
        { key: 'previousMonth', label: 'الشهر السابق', num: true, fmt: true },
        { key: 'change', label: 'التغيير %', num: true, suffix: '%', dec: 1 }
      ],
      groupBy: ['none'],
      groupLabels: { none: 'تجميع تلقائي' },
      fetchData: async () => {
        const thisMonth = erpGetCurrentMonth();
        const lastMonth = erpGetLastMonth();
        const metrics = [];
        let currentPay = { gross: 0, net: 0, deductions: 0, count: 0 };
        let prevPay = { gross: 0, net: 0, deductions: 0, count: 0 };
        let currentAtt = { total: 0, present: 0, ot: 0 };
        let prevAtt = { total: 0, present: 0, ot: 0 };
        let currentAdv = { active: 0, totalBalance: 0 };
        let prevAdv = { active: 0, totalBalance: 0 };

        try {
          const r = await authenticatedFetch('/api/hrm/payroll/summary/' + thisMonth);
          const d = await r.json();
          if (d.status === 'success' && d.payrolls) {
            currentPay.count = d.payrolls.length;
            currentPay.gross = d.payrolls.reduce((s, p) => s + (p.grossSalary || 0), 0);
            currentPay.net = d.payrolls.reduce((s, p) => s + (p.netSalary || 0), 0);
            currentPay.deductions = d.payrolls.reduce((s, p) => s + (p.totalDeductions || 0), 0);
          }
        } catch (e) {}
        try {
          const r2 = await authenticatedFetch('/api/hrm/payroll/summary/' + lastMonth);
          const d2 = await r2.json();
          if (d2.status === 'success' && d2.payrolls) {
            prevPay.count = d2.payrolls.length;
            prevPay.gross = d2.payrolls.reduce((s, p) => s + (p.grossSalary || 0), 0);
            prevPay.net = d2.payrolls.reduce((s, p) => s + (p.netSalary || 0), 0);
            prevPay.deductions = d2.payrolls.reduce((s, p) => s + (p.totalDeductions || 0), 0);
          }
        } catch (e) {}

        try {
          const from = thisMonth + '-01', to = thisMonth + '-31';
          const r3 = await authenticatedFetch(`/api/hrm/attendance?from=${from}&to=${to}`);
          const d3 = await r3.json();
          if (d3.status === 'success' && d3.records) {
            currentAtt.total = d3.records.length;
            currentAtt.present = d3.records.filter(r => r.status === 'present' || r.status === 'late').length;
            currentAtt.ot = d3.records.reduce((s, r) => s + (r.overtimeHours || 0), 0);
          }
        } catch (e) {}
        try {
          const from2 = lastMonth + '-01', to2 = lastMonth + '-31';
          const r4 = await authenticatedFetch(`/api/hrm/attendance?from=${from2}&to=${to2}`);
          const d4 = await r4.json();
          if (d4.status === 'success' && d4.records) {
            prevAtt.total = d4.records.length;
            prevAtt.present = d4.records.filter(r => r.status === 'present' || r.status === 'late').length;
            prevAtt.ot = d4.records.reduce((s, r) => s + (r.overtimeHours || 0), 0);
          }
        } catch (e) {}

        try {
          const r5 = await authenticatedFetch('/api/hrm/advances?status=active');
          const d5 = await r5.json();
          if (d5.status === 'success') {
            currentAdv.active = (d5.advances || []).length;
            currentAdv.totalBalance = (d5.advances || []).reduce((s, a) => s + (a.remainingBalance || 0), 0);
          }
        } catch (e) {}

        const pct = (curr, prev) => prev ? +(((curr - prev) / prev) * 100).toFixed(1) : (curr ? 100 : 0);
        metrics.push(
          { metric: 'عدد الموظفين', currentMonth: currentPay.count, previousMonth: prevPay.count, change: pct(currentPay.count, prevPay.count) },
          { metric: 'إجمالي الرواتب الخام', currentMonth: currentPay.gross, previousMonth: prevPay.gross, change: pct(currentPay.gross, prevPay.gross) },
          { metric: 'صافي الرواتب', currentMonth: currentPay.net, previousMonth: prevPay.net, change: pct(currentPay.net, prevPay.net) },
          { metric: 'الخصومات', currentMonth: currentPay.deductions, previousMonth: prevPay.deductions, change: pct(currentPay.deductions, prevPay.deductions) },
          { metric: 'نسبة الحضور', currentMonth: currentAtt.total ? +((currentAtt.present / currentAtt.total) * 100).toFixed(1) : 0, previousMonth: prevAtt.total ? +((prevAtt.present / prevAtt.total) * 100).toFixed(1) : 0, change: 0 },
          { metric: 'ساعات الأوفرتايم', currentMonth: currentAtt.ot, previousMonth: prevAtt.ot, change: pct(currentAtt.ot, prevAtt.ot) },
          { metric: 'السلف النشطة', currentMonth: currentAdv.active, previousMonth: prevAdv.active, change: pct(currentAdv.active, prevAdv.active) },
          { metric: 'أرصدة السلف', currentMonth: currentAdv.totalBalance, previousMonth: prevAdv.totalBalance, change: pct(currentAdv.totalBalance, prevAdv.totalBalance) }
        );
        return metrics;
      },
      kpiBuilder: (data) => {
        if (!data.length) return [];
        const grossChange = data.find(d => d.metric === 'إجمالي الرواتب الخام');
        const netChange = data.find(d => d.metric === 'صافي الرواتب');
        const attRow = data.find(d => d.metric === 'نسبة الحضور');
        const otRow = data.find(d => d.metric === 'ساعات الأوفرتايم');
        return [
          { label: 'الرواتب الخام', value: fmt(grossChange?.currentMonth || 0), icon: 'ti ti-cash', color: 'blue' },
          { label: 'الرواتب الصافية', value: fmt(netChange?.currentMonth || 0), icon: 'ti ti-wallet', color: 'green' },
          { label: 'نسبة الحضور', value: (attRow?.currentMonth || 0) + '%', icon: 'ti ti-chart-donut', color: 'cyan' },
          { label: 'أوفرتايم', value: (otRow?.currentMonth || 0).toFixed(1) + ' س', icon: 'ti ti-clock', color: 'amber' }
        ];
      },
      chartBuilder: (data) => {
        const labels = data.map(d => d.metric);
        return [
          { type: 'bar', title: 'المقارنة الشهرية', labels, series: [
            { label: 'الشهر الحالي', data: data.map(d => d.currentMonth), color: '79,142,247' },
            { label: 'الشهر السابق', data: data.map(d => d.previousMonth), color: '155,114,247' }
          ]}
        ];
      }
    }
  };
}

/* ═══════════════════════════════════════════════════════════════
   DATE HELPERS
   ═══════════════════════════════════════════════════════════════ */
function erpGetToday() { return new Date().toISOString().slice(0, 10); }
function erpGetRecentDate(days) { const d = new Date(); d.setDate(d.getDate() - days); return d.toISOString().slice(0, 10); }
function erpGetCurrentMonth() { return new Date().toISOString().slice(0, 7); }
function erpGetLastMonth() { const d = new Date(); d.setMonth(d.getMonth() - 1); return d.toISOString().slice(0, 7); }
function erpGetRecentMonths(n) {
  const months = [];
  const d = new Date();
  for (let i = 0; i < n; i++) {
    months.unshift(d.toISOString().slice(0, 7));
    d.setMonth(d.getMonth() - 1);
  }
  return months;
}

/* ═══════════════════════════════════════════════════════════════
   RENDER ENGINE — الواجهة الرئيسية
   ═══════════════════════════════════════════════════════════════ */
function renderERPTemplates(containerId) {
  const el = G(containerId || 'erp-templates');
  if (!el) return;
  const templates = Object.entries(ERP._TEMPLATES);
  el.innerHTML = templates.map(([id, t]) => `
    <div class="rpt-template${ERP._currentTemplate === id ? ' active' : ''}" onclick="erpSelectTemplate('${id}')">
      <div class="rpt-template-icon" style="background:rgba(var(--${t.color}-rgb,79,142,247),.12);color:var(--${t.color})"><i class="${t.icon}"></i></div>
      <div class="rpt-template-name">${t.name}</div>
      <div class="rpt-template-desc">${t.desc}</div>
    </div>
  `).join('');
}

async function erpSelectTemplate(id) {
  ERP._currentTemplate = id;
  ERP._sortCol = null;
  ERP._sortDir = 'asc';
  ERP._groupCol = 'none';
  ERP._rawData = [];
  ERP._filteredData = [];
  const tpl = ERP._TEMPLATES[id];
  if (!tpl) return;
  ERP._visibleCols = [...tpl.defaultCols];
  renderERPTemplates();
  erpRenderToolbar();
  erpShowLoading();
  try {
    ERP._rawData = await tpl.fetchData();
    erpApplyFiltersAndRender();
  } catch (e) {
    console.error('ERP fetch error:', e);
    erpRenderEmpty('خطأ في تحميل البيانات');
  }
}

function erpShowLoading() {
  const tableEl = G('erp-table-container');
  if (tableEl) tableEl.innerHTML = '<div class="rpt-loading"><i class="ti ti-loader"></i> جاري تحميل البيانات...</div>';
  const kpiEl = G('erp-kpi-container');
  if (kpiEl) kpiEl.innerHTML = '';
  const chartEl = G('erp-charts-container');
  if (chartEl) chartEl.innerHTML = '';
}

function erpRenderEmpty(msg) {
  const tableEl = G('erp-table-container');
  if (tableEl) tableEl.innerHTML = `<div class="rpt-empty"><i class="ti ti-file-search"></i><h4>${msg || 'اختر تقريراً من القائمة'}</h4><p>اختر نوع التقرير أعلاه لبدء عرض البيانات</p></div>`;
}

/* ═══════════════════════════════════════════════════════════════
   TOOLBAR — شريط الأدوات
   ═══════════════════════════════════════════════════════════════ */
function erpRenderToolbar() {
  const el = G('erp-toolbar');
  if (!el) return;
  const tpl = ERP._TEMPLATES[ERP._currentTemplate];
  if (!tpl) { el.innerHTML = ''; return; }

  const groupOpts = (tpl.groupBy || []).map(g => `<option value="${g}"${ERP._groupCol === g ? ' selected' : ''}>${(tpl.groupLabels || {})[g] || g}</option>`).join('');
  el.innerHTML = `
    <span class="rpt-label"><i class="ti ti-filter"></i> تجميع</span>
    <select onchange="erpSetGroupBy(this.value)" style="min-width:130px">${groupOpts}</select>
    <div class="rpt-sep"></div>
    <button class="btn btn-sm" onclick="erpExportPDF()" title="تصدير PDF"><i class="ti ti-file-code"></i> PDF</button>
    <button class="btn btn-sm" onclick="erpExportExcel()" title="تصدير Excel"><i class="ti ti-file-spreadsheet"></i> Excel</button>
    <button class="btn btn-sm" onclick="erpExportCSV()" title="تصدير CSV"><i class="ti ti-file"></i> CSV</button>
    <button class="btn btn-sm" onclick="erpPrintReport()" title="طباعة"><i class="ti ti-printer"></i></button>
    <div class="rpt-sep"></div>
    <button class="btn btn-sm" onclick="erpSaveReport()" title="حفظ كقالب"><i class="ti ti-bookmark"></i></button>
    <button class="btn btn-sm" onclick="erpOpenColumnSelector()" title="اختيار الأعمدة"><i class="ti ti-columns"></i></button>
  `;
}

/* ═══════════════════════════════════════════════════════════════
   COLUMN SELECTOR — اختيار الأعمدة
   ═══════════════════════════════════════════════════════════════ */
function erpOpenColumnSelector() {
  const tpl = ERP._TEMPLATES[ERP._currentTemplate];
  if (!tpl) return;
  const el = G('erp-col-selector');
  if (!el) return;
  el.style.display = el.style.display === 'none' ? '' : 'none';
  el.innerHTML = tpl.allCols.map(c => `
    <div class="rpt-col-chip${ERP._visibleCols.includes(c.key) ? ' active' : ''}" onclick="erpToggleCol('${c.key}')">
      <i class="ti ti-${ERP._visibleCols.includes(c.key) ? 'eye' : 'eye-off'}"></i> ${c.label}
    </div>
  `).join('');
}

function erpToggleCol(key) {
  const idx = ERP._visibleCols.indexOf(key);
  if (idx >= 0) ERP._visibleCols.splice(idx, 1);
  else ERP._visibleCols.push(key);
  try { localStorage.setItem(ERP_COL_KEY, JSON.stringify(ERP._visibleCols)); } catch (e) {}
  erpOpenColumnSelector();
  erpRenderTable();
}

/* ═══════════════════════════════════════════════════════════════
   FILTERS & SORT
   ═══════════════════════════════════════════════════════════════ */
function erpApplyFiltersAndRender() {
  let data = [...ERP._rawData];

  if (ERP._sortCol) {
    const tpl = ERP._TEMPLATES[ERP._currentTemplate];
    const colDef = tpl?.allCols.find(c => c.key === ERP._sortCol);
    data.sort((a, b) => {
      let va = a[ERP._sortCol], vb = b[ERP._sortCol];
      if (colDef?.num) { va = parseFloat(va) || 0; vb = parseFloat(vb) || 0; }
      else { va = (va || '').toString(); vb = (vb || '').toString(); }
      if (va < vb) return ERP._sortDir === 'asc' ? -1 : 1;
      if (va > vb) return ERP._sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }

  ERP._filteredData = data;
  erpRenderKPIs();
  erpRenderCharts();
  erpRenderTable();
  erpRenderSummary();
}

function erpSort(colKey) {
  if (ERP._sortCol === colKey) {
    ERP._sortDir = ERP._sortDir === 'asc' ? 'desc' : 'asc';
  } else {
    ERP._sortCol = colKey;
    ERP._sortDir = 'asc';
  }
  erpApplyFiltersAndRender();
}

function erpSetGroupBy(val) {
  ERP._groupCol = val;
  erpApplyFiltersAndRender();
}

/* ═══════════════════════════════════════════════════════════════
   KPI RENDERING
   ═══════════════════════════════════════════════════════════════ */
function erpRenderKPIs() {
  const el = G('erp-kpi-container');
  if (!el) return;
  const tpl = ERP._TEMPLATES[ERP._currentTemplate];
  if (!tpl?.kpiBuilder) { el.innerHTML = ''; return; }
  const kpis = tpl.kpiBuilder(ERP._filteredData);
  el.innerHTML = '<div class="rpt-kpi-grid">' + kpis.map(k => `
    <div class="rpt-kpi ${k.color}">
      <div class="rpt-kpi-icon"><i class="${k.icon}"></i></div>
      <div class="rpt-kpi-val">${k.value}</div>
      <div class="rpt-kpi-lbl">${k.label}</div>
    </div>
  `).join('') + '</div>';
}

/* ═══════════════════════════════════════════════════════════════
   CHART RENDERING
   ═══════════════════════════════════════════════════════════════ */
function erpRenderCharts() {
  const el = G('erp-charts-container');
  if (!el) return;
  const tpl = ERP._TEMPLATES[ERP._currentTemplate];
  if (!tpl?.chartBuilder) { el.innerHTML = ''; return; }
  const charts = tpl.chartBuilder(ERP._filteredData);
  el.innerHTML = '<div class="rpt-charts-grid">' + charts.map((c, i) => `
    <div class="rpt-chart-card">
      <div class="card-hd"><h3 style="font-size:12px;font-weight:700">${c.title}</h3></div>
      <div class="card-body" style="height:260px"><canvas id="erp-chart-${i}"></canvas></div>
    </div>
  `).join('') + '</div>';

  charts.forEach((c, i) => {
    const canvas = document.getElementById('erp-chart-' + i);
    if (!canvas) return;
    if (canvas._chart) canvas._chart.destroy();
    const datasets = c.series.map(s => ({
      label: s.label, data: s.data,
      backgroundColor: c.type === 'line' ? `rgba(${s.color},.15)` : (c.type === 'doughnut' ? s.data.map(() => `rgba(${s.color},.7)`) : `rgba(${s.color},.7)`),
      borderColor: c.type === 'line' ? `rgba(${s.color},1)` : (c.type === 'radar' ? `rgba(${s.color},.7)` : 'transparent'),
      borderWidth: c.type === 'line' ? 2 : (c.type === 'radar' ? 2 : 1),
      tension: 0.3, fill: c.type === 'line', pointRadius: 3,
      pointBackgroundColor: `rgba(${s.color},1)`
    }));
    canvas._chart = new Chart(canvas, {
      type: c.type === 'radar' ? 'radar' : (c.type === 'doughnut' ? 'doughnut' : c.type),
      data: { labels: c.labels, datasets },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 10 } },
          tooltip: { backgroundColor: 'rgba(15,23,42,.92)', titleFont: { size: 12, weight: 'bold' }, bodyFont: { size: 11 }, padding: 10, cornerRadius: 8 }
        },
        scales: (c.type === 'bar' || c.type === 'line') ? {
          y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,.04)' }, ticks: { font: { size: 10 } } },
          x: { grid: { display: false }, ticks: { font: { size: 10 } } }
        } : (c.type === 'radar' ? {
          r: { beginAtZero: true, grid: { color: 'rgba(255,255,255,.08)' }, pointLabels: { font: { size: 10 } } }
        } : undefined)
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════════
   TABLE RENDERING — الجدول الرئيسي
   ═══════════════════════════════════════════════════════════════ */
function erpRenderTable() {
  const el = G('erp-table-container');
  if (!el) return;
  const tpl = ERP._TEMPLATES[ERP._currentTemplate];
  if (!tpl) { erpRenderEmpty(); return; }

  const visibleCols = ERP._visibleCols.map(key => tpl.allCols.find(c => c.key === key)).filter(Boolean);
  if (!visibleCols.length) {
    el.innerHTML = '<div class="rpt-empty"><i class="ti ti-columns-off"></i><h4>لم يتم اختيار أي عمود</h4><p>اضغط على أيقونة الأعمدة لاختيار الأعمدة المطلوبة</p></div>';
    return;
  }

  const data = ERP._filteredData;
  if (!data.length) {
    el.innerHTML = '<div class="rpt-empty"><i class="ti ti-database-search"></i><h4>لا توجد بيانات</h4><p>لا توجد سجلات تطابق الفلاتر المحددة</p></div>';
    return;
  }

  let rowsHtml = '';
  if (ERP._groupCol && ERP._groupCol !== 'none') {
    const groups = {};
    data.forEach(row => {
      const gKey = row[ERP._groupCol] || 'غير محدد';
      if (!groups[gKey]) groups[gKey] = [];
      groups[gKey].push(row);
    });
    Object.entries(groups).sort((a, b) => a[0] < b[0] ? -1 : 1).forEach(([gKey, gRows]) => {
      rowsHtml += `<tr class="group-row"><td colspan="${visibleCols.length}"><i class="ti ti-folder" style="margin-left:6px"></i> ${ERP._groupCol}: ${gKey} <span style="opacity:.5;margin-right:6px">(${gRows.length})</span></td></tr>`;
      gRows.forEach(row => { rowsHtml += erpBuildRow(row, visibleCols); });
    });
  } else {
    data.forEach(row => { rowsHtml += erpBuildRow(row, visibleCols); });
  }

  const headers = visibleCols.map(c => {
    const isSorted = ERP._sortCol === c.key;
    const arrow = isSorted ? (ERP._sortDir === 'asc' ? 'ti ti-arrow-up' : 'ti ti-arrow-down') : 'ti ti-selector';
    return `<th class="${isSorted ? 'sorted' : ''}" onclick="erpSort('${c.key}')"><i class="${arrow}"></i>${c.label}</th>`;
  }).join('');

  el.innerHTML = `
    <div class="rpt-table-wrap">
      <table class="rpt-table">
        <thead><tr>${headers}</tr></thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </div>`;
}

function erpBuildRow(row, cols) {
  const cells = cols.map(c => {
    let val = row[c.key];
    if (val === undefined || val === null) val = '—';
    else if (c.fmt) val = fmt(val);
    else if (c.dec !== undefined) val = parseFloat(val || 0).toFixed(c.dec);
    else if (c.suffix) val = val + c.suffix;
    else if (c.badge) {
      const badgeClass = { present: 'green', paid: 'green', completed: 'green', active: 'green', approved: 'green', excellent: 'green', good: 'cyan', acceptable: 'amber', in: 'green', draft: 'amber', late: 'amber', part_time: 'amber', half_day: 'amber', loan: 'purple', absent: 'red', cancelled: 'red', poor: 'red', out: 'red', leave: 'purple', full_time: 'blue', contract: 'cyan', hourly: 'amber' }[val] || 'blue';
      val = `<span class="badge badge-${badgeClass}">${c.badge[val] || val}</span>`;
    }
    else if (c.num) val = `<span class="rpt-col-num">${val}</span>`;
    return `<td>${val}</td>`;
  }).join('');
  return `<tr>${cells}</tr>`;
}

/* ═══════════════════════════════════════════════════════════════
   SUMMARY ROW — صف الإجمالي
   ═══════════════════════════════════════════════════════════════ */
function erpRenderSummary() {
  const el = G('erp-summary');
  if (!el) return;
  const tpl = ERP._TEMPLATES[ERP._currentTemplate];
  if (!tpl) { el.innerHTML = ''; return; }
  const data = ERP._filteredData;
  const numCols = tpl.allCols.filter(c => c.num && c.fmt);
  if (!numCols.length || !data.length) { el.innerHTML = ''; return; }
  const items = numCols.map(c => {
    const total = data.reduce((s, r) => s + (parseFloat(r[c.key]) || 0), 0);
    return `<div class="rpt-summary-item"><span class="rpt-s-label">${c.label}:</span><span class="rpt-s-val">${fmt(total)}</span></div>`;
  }).join('');
  el.innerHTML = `<div class="rpt-summary">${items}</div>`;
}

/* ═══════════════════════════════════════════════════════════════
   EXPORT — تصدير التقارير
   ═══════════════════════════════════════════════════════════════ */
function erpExportPDF() {
  const tpl = ERP._TEMPLATES[ERP._currentTemplate];
  if (!tpl || !ERP._filteredData.length) { toast('لا توجد بيانات للتصدير', 'error'); return; }
  const cols = ERP._visibleCols.map(key => tpl.allCols.find(c => c.key === key)).filter(Boolean);
  const headers = cols.map(c => c.label);
  const rows = ERP._filteredData.map(row => cols.map(c => {
    let val = row[c.key];
    if (val === undefined || val === null) val = '—';
    else if (c.fmt) val = fmt(val);
    else if (c.dec !== undefined) val = parseFloat(val || 0).toFixed(c.dec);
    else if (c.suffix) val = val + c.suffix;
    else if (c.badge) val = c.badge[val] || val;
    return val;
  }));
  _printGenericPDF(tpl.name, headers, rows, {
    subtitle: new Date().toLocaleDateString('ar-LY'),
    landscape: cols.length > 5
  });
}

function erpExportExcel() {
  const tpl = ERP._TEMPLATES[ERP._currentTemplate];
  if (!tpl || !ERP._filteredData.length) { toast('لا توجد بيانات للتصدير', 'error'); return; }
  const cols = ERP._visibleCols.map(key => tpl.allCols.find(c => c.key === key)).filter(Boolean);
  const headers = cols.map(c => c.label);
  const rows = ERP._filteredData.map(row => cols.map(c => {
    let val = row[c.key];
    if (val === undefined || val === null) val = '';
    else if (c.badge) val = c.badge[val] || val;
    return val;
  }));
  _exportTable(headers, rows, tpl.name, 'erp-report');
}

function erpExportCSV() {
  const tpl = ERP._TEMPLATES[ERP._currentTemplate];
  if (!tpl || !ERP._filteredData.length) { toast('لا توجد بيانات للتصدير', 'error'); return; }
  const cols = ERP._visibleCols.map(key => tpl.allCols.find(c => c.key === key)).filter(Boolean);
  const headers = cols.map(c => c.label);
  const rows = ERP._filteredData.map(row => cols.map(c => {
    let val = row[c.key];
    if (val === undefined || val === null) val = '';
    else if (c.badge) val = c.badge[val] || val;
    return '"' + String(val).replace(/"/g, '""') + '"';
  }));
  const csv = '\uFEFF' + headers.join(',') + '\n' + rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `${tpl.name}-${erpGetToday()}.csv`;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast('تم التصدير بنجاح');
}

function erpPrintReport() {
  const tpl = ERP._TEMPLATES[ERP._currentTemplate];
  if (!tpl || !ERP._filteredData.length) { toast('لا توجد بيانات للطباعة', 'error'); return; }
  erpExportPDF();
}

/* ═══════════════════════════════════════════════════════════════
   SAVE / LOAD REPORTS
   ═══════════════════════════════════════════════════════════════ */
function erpSaveReport() {
  if (!ERP._currentTemplate) { toast('اختر تقريراً أولاً', 'error'); return; }
  const name = prompt('اسم التقرير المحفوظ:');
  if (!name) return;
  ERP._savedReports.push({
    id: Date.now(), name, template: ERP._currentTemplate,
    cols: [...ERP._visibleCols], groupCol: ERP._groupCol,
    filters: { ...ERP._filters }, createdAt: new Date().toISOString()
  });
  try { localStorage.setItem(ERP_SAVED_KEY, JSON.stringify(ERP._savedReports)); } catch (e) {}
  toast('تم حفظ التقرير: ' + name);
}

function erpLoadSavedReports() {
  const el = G('erp-saved-reports');
  if (!el) return;
  if (!ERP._savedReports.length) { el.innerHTML = ''; return; }
  el.innerHTML = '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px">' + ERP._savedReports.map(r => `
    <div class="rpt-filter-chip" onclick="erpApplySavedReport(${r.id})">
      <i class="ti ti-bookmark"></i> ${r.name}
      <i class="ti ti-x" style="opacity:.5;margin-right:4px" onclick="event.stopPropagation();erpDeleteSavedReport(${r.id})"></i>
    </div>
  `).join('') + '</div>';
}

function erpApplySavedReport(id) {
  const saved = ERP._savedReports.find(r => r.id === id);
  if (!saved) return;
  ERP._visibleCols = saved.cols || [];
  ERP._groupCol = saved.groupCol || 'none';
  ERP._filters = saved.filters || {};
  erpSelectTemplate(saved.template);
}

function erpDeleteSavedReport(id) {
  ERP._savedReports = ERP._savedReports.filter(r => r.id !== id);
  try { localStorage.setItem(ERP_SAVED_KEY, JSON.stringify(ERP._savedReports)); } catch (e) {}
  erpLoadSavedReports();
}

/* ═══════════════════════════════════════════════════════════════
   INIT — بدء النظام
   ═══════════════════════════════════════════════════════════════ */
erpInit();

/* ═══════════════════════════════════════════════
   barcode-settings.js
══════════════════════════════════════════════ */

﻿/* ═══════════════════════════════════════════════════════════════
   BARCODE SETTINGS & RENDERING — إعدادات وعرض الباركود
   ═══════════════════════════════════════════════════════════════ */

const BARCODE_STORAGE_KEY = 'barcode_settings';

const BC_DEFAULTS = {
  show: 'item+invoice',
  type: 'CODE128',
  size: 'medium',
  text: 'yes',
  position: 'under-name',
  width: 'normal'
};

const BC_SIZES = {
  small:  { height: 25, width: 1, margin: 2 },
  medium: { height: 40, width: 1.5, margin: 4 },
  large:  { height: 60, width: 2, margin: 6 }
};

const BC_WIDTHS = {
  thin:   0.8,
  normal: 1.5,
  thick:  2.5
};

function getBarcodeSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(BARCODE_STORAGE_KEY) || '{}');
    return { ...BC_DEFAULTS, ...saved };
  } catch (e) {
    return { ...BC_DEFAULTS };
  }
}

function saveBarcodeSettings() {
  const settings = {
    show: G('bc-show')?.value || 'item+invoice',
    type: G('bc-type')?.value || 'CODE128',
    size: G('bc-size')?.value || 'medium',
    text: G('bc-text')?.value || 'yes',
    position: G('bc-position')?.value || 'under-name',
    width: G('bc-width')?.value || 'normal'
  };
  localStorage.setItem(BARCODE_STORAGE_KEY, JSON.stringify(settings));
  toast(t('barcode_settings_saved'));
}

function loadBarcodeSettingsUI() {
  const s = getBarcodeSettings();
  const fields = ['bc-show', 'bc-type', 'bc-size', 'bc-text', 'bc-position', 'bc-width'];
  const keys = ['show', 'type', 'size', 'text', 'position', 'width'];
  fields.forEach((id, i) => {
    const el = G(id);
    if (el) el.value = s[keys[i]] || BC_DEFAULTS[keys[i]];
  });
}

function previewBarcode() {
  const s = getBarcodeSettings();
  const container = G('bc-preview');
  const svg = G('bc-preview-svg');
  if (!container || !svg) return;
  container.style.display = container.style.display === 'none' ? '' : 'none';
  if (container.style.display === 'none') return;
  try {
    JsBarcode(svg, 'INV-00001', {
      format: s.type,
      width: BC_WIDTHS[s.width] || 1.5,
      height: BC_SIZES[s.size]?.height || 40,
      margin: BC_SIZES[s.size]?.margin || 4,
      displayValue: s.text === 'yes',
      font: 'monospace',
      fontSize: 12,
      textMargin: 2,
      background: 'transparent',
      lineColor: '#1e293b'
    });
  } catch (e) {
    svg.innerHTML = '<text x="10" y="20" fill="var(--red)" font-size="11">'+t('barcode_error')+'</text>';
  }
}

/* ═══════════════════════════════════════════════════════════════
   BARCODE SVG GENERATOR — مولّد SVG للباركود
   ═══════════════════════════════════════════════════════════════ */
function generateBarcodeSVG(value, opts = {}) {
  const s = getBarcodeSettings();
  const type = opts.type || s.type;
  const showText = opts.text !== undefined ? opts.text : (s.text === 'yes');
  const size = opts.size || s.size;
  const bw = opts.width || s.width;

  const sizeConfig = BC_SIZES[size] || BC_SIZES.medium;
  const barWidth = BC_WIDTHS[bw] || 1.5;

  const container = document.createElement('div');
  container.style.cssText = 'display:inline-block;line-height:0';
  const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  container.appendChild(svgEl);

  try {
    JsBarcode(svgEl, value || 'N/A', {
      format: type,
      width: barWidth,
      height: sizeConfig.height,
      margin: sizeConfig.margin,
      displayValue: showText,
      font: 'monospace',
      fontSize: size === 'small' ? 10 : size === 'large' ? 14 : 12,
      textMargin: 2,
      background: 'transparent',
      lineColor: opts.color || '#1e293b'
    });
    return container.innerHTML;
  } catch (e) {
    return `<svg viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg"><text x="2" y="14" fill="#94a3b8" font-size="10" font-family="monospace">${value || 'N/A'}</text></svg>`;
  }
}

/* ═══════════════════════════════════════════════════════════════
   INVOICE BARCODE RENDERING — عرض الباركود في الفاتورة
   ═══════════════════════════════════════════════════════════════ */
function renderInvoiceBarcode(value, opts = {}) {
  if (!value) return '';
  const s = getBarcodeSettings();
  if (s.show === 'none') return '';

  const type = opts.type || s.type;
  const size = opts.size || s.size;
  const bw = opts.width || s.width;
  const showText = opts.text !== undefined ? opts.text : (s.text === 'yes');

  const sizeConfig = BC_SIZES[size] || BC_SIZES.medium;
  const barWidth = BC_WIDTHS[bw] || 1.5;

  const svgId = 'bc-' + Math.random().toString(36).slice(2, 8);

  setTimeout(() => {
    const svgEl = document.getElementById(svgId);
    if (!svgEl) return;
    try {
      JsBarcode(svgEl, value, {
        format: type,
        width: barWidth,
        height: sizeConfig.height,
        margin: sizeConfig.margin,
        displayValue: showText,
        font: 'monospace',
        fontSize: size === 'small' ? 10 : size === 'large' ? 14 : 12,
        textMargin: 2,
        background: 'transparent',
        lineColor: opts.color || '#1e293b'
      });
    } catch (e) {
      svgEl.innerHTML = `<text x="2" y="14" fill="#94a3b8" font-size="9" font-family="monospace">${value}</text>`;
    }
  }, 0);

  return `<svg id="${svgId}" style="max-width:100%"></svg>`;
}

/* ═══════════════════════════════════════════════════════════════
   PRINT LABEL — طباعة ملصق صنف
   ═══════════════════════════════════════════════════════════════ */
function printItemLabel(itemId) {
  const item = DB.items.find(x => x.id === itemId);
  if (!item) { toast(t('barcode_item_not_found_msg'), 'error'); return; }
  const s = getBarcodeSettings();
  const company = currentCompany();

  const sizeConfig = BC_SIZES[s.size] || BC_SIZES.medium;
  const barWidth = BC_WIDTHS[s.width] || 1.5;

  const html = `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>ملصق — ${item.name}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
  @page{size:${s.size==='large'?'80mm 50mm':'62mm 38mm'};margin:2mm}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Cairo',sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .label{width:100%;max-width:58mm;padding:3mm;text-align:center;border:1px dashed #ccc;border-radius:3mm;position:relative;overflow:hidden}
  .label-brand{font-size:8px;color:#64748b;font-weight:600;margin-bottom:1mm;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .label-name{font-size:${s.size==='large'?'13px':'11px'};font-weight:700;color:#1e293b;margin-bottom:1.5mm;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .label-barcode{margin:1mm 0;display:flex;justify-content:center}
  .label-barcode svg{max-width:48mm}
  .label-price{font-size:${s.size==='large'?'14px':'12px'};font-weight:700;color:#4f8ef7;margin-top:1mm}
  .label-price small{font-size:9px;color:#94a3b8;font-weight:400}
  .label-code{font-size:8px;color:#94a3b8;font-family:monospace;margin-top:0.5mm;direction:ltr}
  </style></head><body>
  <div class="label">
    ${company.name ? `<div class="label-brand">${company.name}</div>` : ''}
    <div class="label-name">${item.name}</div>
    <div class="label-barcode">
      <svg id="lbl-bc"></svg>
    </div>
    <div class="label-price">${fmt(item.sell)} <small>t('currency_sym')</small></div>
    ${item.barcode ? `<div class="label-code">${item.barcode}</div>` : `<div class="label-code">${item.code}</div>`}
  </div>
  <script>
    JsBarcode('#lbl-bc', '${item.barcode || item.code}', {
      format: '${s.type}',
      width: ${barWidth},
      height: ${sizeConfig.height * 0.7},
      margin: 2,
      displayValue: true,
      font: 'monospace',
      fontSize: ${s.size === 'large' ? 12 : 10},
      textMargin: 1,
      background: 'transparent',
      lineColor: '#1e293b'
    });
    window.onload = function(){ setTimeout(function(){ window.print(); window.close(); }, 200); };
  <\/script></body></html>`;

  const win = window.open('', '_blank', 'width=400,height=300');
  if (!win) { toast(t('barcode_print_err'), 'error'); return; }
  win.document.write(html);
  win.document.close();
}

/* ═══════════════════════════════════════════════════════════════
   PRINT MULTIPLE LABELS — طباعة عدة ملصقات
   ═══════════════════════════════════════════════════════════════ */
function printMultipleLabels(itemIds) {
  const items = itemIds.map(id => DB.items.find(x => x.id === id)).filter(Boolean);
  if (!items.length) { toast(t('barcode_no_items_msg'), 'error'); return; }
  const s = getBarcodeSettings();
  const company = currentCompany();
  const sizeConfig = BC_SIZES[s.size] || BC_SIZES.medium;
  const barWidth = BC_WIDTHS[s.width] || 1.5;

  const labelsHtml = items.map(item => `
    <div class="label">
      ${company.name ? `<div class="label-brand">${company.name}</div>` : ''}
      <div class="label-name">${item.name}</div>
      <div class="label-barcode">
        <svg class="lbl-bc" data-value="${item.barcode || item.code}"></svg>
      </div>
    <div class="label-price">${fmt(item.sell)} <small>${t('currency_sym')}</small></div>
      <div class="label-code">${item.barcode || item.code}</div>
    </div>
  `).join('');

  const html = `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>ملصقات — ${items.length} أصناف</title>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
  @page{size:62mm 38mm;margin:2mm}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Cairo',sans-serif;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .labels{display:flex;flex-wrap:wrap;gap:2mm;justify-content:center;padding:2mm}
  .label{width:58mm;min-height:34mm;padding:3mm;text-align:center;border:1px dashed #ccc;border-radius:3mm;page-break-inside:avoid;margin-bottom:2mm}
  .label-brand{font-size:8px;color:#64748b;font-weight:600;margin-bottom:1mm;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .label-name{font-size:11px;font-weight:700;color:#1e293b;margin-bottom:1.5mm;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .label-barcode{margin:1mm 0;display:flex;justify-content:center}
  .label-barcode svg{max-width:48mm}
  .label-price{font-size:12px;font-weight:700;color:#4f8ef7;margin-top:1mm}
  .label-price small{font-size:9px;color:#94a3b8;font-weight:400}
  .label-code{font-size:8px;color:#94a3b8;font-family:monospace;margin-top:0.5mm;direction:ltr}
  </style></head><body>
  <div class="labels">${labelsHtml}</div>
  <script>
    document.querySelectorAll('.lbl-bc').forEach(function(svg) {
      JsBarcode(svg, svg.dataset.value || 'N/A', {
        format: '${s.type}',
        width: ${barWidth},
        height: ${sizeConfig.height * 0.7},
        margin: 2,
        displayValue: true,
        font: 'monospace',
        fontSize: 10,
        textMargin: 1,
        background: 'transparent',
        lineColor: '#1e293b'
      });
    });
    window.onload = function(){ setTimeout(function(){ window.print(); window.close(); }, 300); };
  <\/script></body></html>`;

  const win = window.open('', '_blank', 'width=800,height=600');
  if (!win) { toast(t('barcode_print_err'), 'error'); return; }
  win.document.write(html);
  win.document.close();
}

/* ═══════════════════════════════════════════════════════════════
   PRINT ALL LABELS — طباعة ملصقات جميع الأصناف
   ═══════════════════════════════════════════════════════════════ */
function printAllItemLabels() {
  const items = DB.items.filter(x => x.qty > 0);
  if (!items.length) { toast(t('barcode_no_available'), 'error'); return; }
  printMultipleLabels(items.map(x => x.id));
}
if (typeof initApp === 'function') {
  const _origInit = initApp;
  initApp = function() {
    _origInit.apply(this, arguments);
    loadBarcodeSettingsUI();
  };
} else {
  document.addEventListener('DOMContentLoaded', () => loadBarcodeSettingsUI());
}


/* ═══════════════════════════════════════════════
   customize-page.js
══════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════
   PAGE CUSTOMIZATION ENGINE — محرك تخصيص الصفحات
   ERPNext-style page customization
   ═══════════════════════════════════════════════════════════════ */

const CUSTOMIZE_KEY = 'page_customizations';
let _custPanel = null;
let _custPageId = null;

/* ═══════════════════════════════════════════════════════════════
   PAGE REGISTRY — سجل الصفحات وعناصرها القابلة للتخصيص
   ═══════════════════════════════════════════════════════════════ */
const PAGE_REGISTRY = {
  dash: {
    name: 'الرئيسية',
    sections: [
      { id: 'cust-quick-nav', label: 'التنقل السريع', icon: 'ti ti-layout-grid', default: true },
      { id: 'cust-stat-cards', label: 'بطاقات الإحصائيات', icon: 'ti ti-chart-bar', default: true },
      { id: 'cust-insights', label: 'التنبيهات الذكية', icon: 'ti ti-lightbulb', default: true },
      { id: 'cust-charts', label: 'الرسوم البيانية', icon: 'ti ti-chart-line', default: true },
      { id: 'cust-inv-table', label: 'جدول آخر الفواتير', icon: 'ti ti-table', default: true },
      { id: 'cust-low-stock', label: 'أصناف منخفضة', icon: 'ti ti-alert-triangle', default: true },
      { id: 'cust-activity-log', label: 'آخر العمليات', icon: 'ti ti-activity', default: true },
      { id: 'cust-search', label: 'شريط البحث', icon: 'ti ti-search', default: true },
    ]
  },
  inventory: {
    name: 'الأصناف والمخزون',
    sections: [
      { id: 'cust-inv-search', label: 'شريط البحث', icon: 'ti ti-search', default: true },
      { id: 'cust-inv-filters', label: 'الفلاتر (الفئة + الحالة)', icon: 'ti ti-filter', default: true },
      { id: 'cust-inv-actions', label: 'أزرار التصدير والطباعة', icon: 'ti ti-file-spreadsheet', default: true },
      { id: 'cust-inv-table', label: 'جدول الأصناف', icon: 'ti ti-table', default: true },
      { id: 'cust-inv-pagination', label: 'ترقيم الصفحات', icon: 'ti ti-chevrons-right', default: true },
    ],
    columns: [
      { id: 'col-code', label: 'الكود', default: true },
      { id: 'col-name', label: 'الصنف', default: true },
      { id: 'col-cat', label: 'الفئة', default: true },
      { id: 'col-buy', label: 'سعر الشراء', default: true },
      { id: 'col-sell', label: 'سعر البيع', default: true },
      { id: 'col-qty', label: 'الرصيد', default: true },
      { id: 'col-unit', label: 'الوحدة', default: true },
      { id: 'col-status', label: 'الحالة', default: true },
    ]
  },
  sales: {
    name: 'فواتير البيع',
    sections: [
      { id: 'cust-sal-filters', label: 'الفلاتر (الحالة + التاريخ)', icon: 'ti ti-filter', default: true },
      { id: 'cust-sal-actions', label: 'أزرار التصدير والطباعة والتسوية', icon: 'ti ti-file-spreadsheet', default: true },
      { id: 'cust-sal-table', label: 'جدول الفواتير', icon: 'ti ti-table', default: true },
      { id: 'cust-sal-pagination', label: 'ترقيم الصفحات', icon: 'ti ti-chevrons-right', default: true },
    ],
    columns: [
      { id: 'col-sal-num', label: 'رقم الفاتورة', default: true },
      { id: 'col-sal-cust', label: 'الزبون', default: true },
      { id: 'col-sal-date', label: 'التاريخ', default: true },
      { id: 'col-sal-total', label: 'الإجمالي', default: true },
      { id: 'col-sal-paid', label: 'المحصَّل', default: true },
      { id: 'col-sal-rem', label: 'المتبقي', default: true },
      { id: 'col-sal-dlv', label: 'حالة التسليم', default: true },
      { id: 'col-sal-pay', label: 'حالة الدفع', default: true },
    ]
  },
  purchases: {
    name: 'فواتير الشراء',
    sections: [
      { id: 'cust-pur-filters', label: 'الفلاتر', icon: 'ti ti-filter', default: true },
      { id: 'cust-pur-actions', label: 'أزرار التصدير والطباعة', icon: 'ti ti-file-spreadsheet', default: true },
      { id: 'cust-pur-table', label: 'جدول فواتير الشراء', icon: 'ti ti-table', default: true },
      { id: 'cust-pur-pagination', label: 'ترقيم الصفحات', icon: 'ti ti-chevrons-right', default: true },
    ],
    columns: [
      { id: 'col-pur-num', label: 'رقم الفاتورة', default: true },
      { id: 'col-pur-sup', label: 'المورد', default: true },
      { id: 'col-pur-date', label: 'التاريخ', default: true },
      { id: 'col-pur-total', label: 'الإجمالي', default: true },
      { id: 'col-pur-paid', label: 'المدفوع', default: true },
      { id: 'col-pur-rem', label: 'المتبقي', default: true },
      { id: 'col-pur-status', label: 'الحالة', default: true },
    ]
  },
  customers: {
    name: 'الزبائن',
    sections: [
      { id: 'cust-cust-search', label: 'شريط البحث', icon: 'ti ti-search', default: true },
      { id: 'cust-cust-table', label: 'جدول الزبائن', icon: 'ti ti-table', default: true },
      { id: 'cust-cust-pagination', label: 'ترقيم الصفحات', icon: 'ti ti-chevrons-right', default: true },
    ],
    columns: [
      { id: 'col-cust-id', label: 'الرقم', default: true },
      { id: 'col-cust-name', label: 'الاسم', default: true },
      { id: 'col-cust-phone', label: 'الهاتف', default: true },
      { id: 'col-cust-bal', label: 'الرصيد', default: true },
      { id: 'col-cust-company', label: 'الشركة', default: true },
    ]
  },
  suppliers: {
    name: 'الموردون',
    sections: [
      { id: 'cust-sup-search', label: 'شريط البحث', icon: 'ti ti-search', default: true },
      { id: 'cust-sup-table', label: 'جدول الموردين', icon: 'ti ti-table', default: true },
      { id: 'cust-sup-pagination', label: 'ترقيم الصفحات', icon: 'ti ti-chevrons-right', default: true },
    ],
    columns: [
      { id: 'col-sup-id', label: 'الرقم', default: true },
      { id: 'col-sup-name', label: 'الاسم', default: true },
      { id: 'col-sup-phone', label: 'الهاتف', default: true },
      { id: 'col-sup-bal', label: 'الرصيد', default: true },
      { id: 'col-sup-company', label: 'الشركة', default: true },
    ]
  },
  finance: {
    name: 'الخزينة',
    sections: [
      { id: 'cust-fin-stats', label: 'بطاقات الإحصائيات', icon: 'ti ti-chart-bar', default: true },
      { id: 'cust-fin-actions', label: 'أزرار الإضافة والتصدير', icon: 'ti ti-plus', default: true },
      { id: 'cust-fin-table', label: 'جدول الحركات', icon: 'ti ti-table', default: true },
      { id: 'cust-fin-pagination', label: 'ترقيم الصفحات', icon: 'ti ti-chevrons-right', default: true },
    ],
    columns: [
      { id: 'col-fin-date', label: 'التاريخ', default: true },
      { id: 'col-fin-type', label: 'النوع', default: true },
      { id: 'col-fin-amt', label: 'المبلغ', default: true },
      { id: 'col-fin-desc', label: 'البيان', default: true },
      { id: 'col-fin-ref', label: 'المرجع', default: true },
    ]
  },
  hrm: {
    name: 'HRM — الموظفين',
    sections: [
      { id: 'cust-hrm-tabs', label: 'تبويبات HRM', icon: 'ti ti-layout-tabs', default: true },
      { id: 'cust-hrm-stats', label: 'الإحصائيات', icon: 'ti ti-chart-bar', default: true },
      { id: 'cust-hrm-table', label: 'جدول الموظفين', icon: 'ti ti-table', default: true },
    ],
    columns: [
      { id: 'col-hrm-no', label: 'رقم الموظف', default: true },
      { id: 'col-hrm-name', label: 'الاسم', default: true },
      { id: 'col-hrm-phone', label: 'الهاتف', default: true },
      { id: 'col-hrm-dept', label: 'القسم', default: true },
      { id: 'col-hrm-pos', label: 'المنصب', default: true },
      { id: 'col-hrm-salary', label: 'الراتب', default: true },
      { id: 'col-hrm-status', label: 'الحالة', default: true },
    ]
  },
  pl: {
    name: 'الأرباح والخسائر',
    sections: [
      { id: 'cust-pl-stats', label: 'ملخص الأرباح', icon: 'ti ti-chart-bar', default: true },
      { id: 'cust-pl-charts', label: 'الرسوم البيانية', icon: 'ti ti-chart-line', default: true },
      { id: 'cust-pl-table', label: 'جدول التفاصيل', icon: 'ti ti-table', default: true },
    ]
  },
  settings: {
    name: 'الإعدادات',
    sections: [
      { id: 'cust-set-theme', label: 'وضع التطبيق', icon: 'ti ti-moon', default: true },
      { id: 'cust-set-company', label: 'بيانات المؤسسة', icon: 'ti ti-building', default: true },
      { id: 'cust-set-sync', label: 'المزامنة', icon: 'ti ti-refresh', default: true },
      { id: 'cust-set-users', label: 'حسابات المستخدمين', icon: 'ti ti-users-pin', default: true },
      { id: 'cust-set-backup', label: 'النسخ الاحتياطي', icon: 'ti ti-download', default: true },
      { id: 'cust-set-barcode', label: 'إعدادات الباركود', icon: 'ti ti-barcode', default: true },
    ]
  }
};

/* ═══════════════════════════════════════════════════════════════
   LOAD / SAVE — حمّل / احفظ إعدادات الصفحة
   ═══════════════════════════════════════════════════════════════ */
function loadPageCustomization(pageId) {
  try {
    const all = JSON.parse(localStorage.getItem(CUSTOMIZE_KEY) || '{}');
    return all[pageId] || {};
  } catch (e) { return {}; }
}

function savePageCustomization(pageId, settings) {
  try {
    const all = JSON.parse(localStorage.getItem(CUSTOMIZE_KEY) || '{}');
    all[pageId] = settings;
    localStorage.setItem(CUSTOMIZE_KEY, JSON.stringify(all));
  } catch (e) {}
}

function getPageSectionsVisibility(pageId) {
  const reg = PAGE_REGISTRY[pageId];
  if (!reg) return {};
  const saved = loadPageCustomization(pageId);
  const visibility = {};
  reg.sections.forEach(s => {
    visibility[s.id] = saved[s.id] !== undefined ? saved[s.id] : s.default;
  });
  return visibility;
}

function getPageColumnsVisibility(pageId) {
  const reg = PAGE_REGISTRY[pageId];
  if (!reg || !reg.columns) return {};
  const saved = loadPageCustomization(pageId);
  const visibility = {};
  reg.columns.forEach(c => {
    visibility[c.id] = saved[c.id] !== undefined ? saved[c.id] : c.default;
  });
  return visibility;
}

/* ═══════════════════════════════════════════════════════════════
   APPLY VISIBILITY — تطبيق الإعدادات على الصفحة
   ═══════════════════════════════════════════════════════════════ */
function applyPageCustomization(pageId) {
  const sectionVis = getPageSectionsVisibility(pageId);
  Object.entries(sectionVis).forEach(([id, visible]) => {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = visible ? '' : 'none';
      el.classList.toggle('cust-hidden', !visible);
    }
  });

  const colVis = getPageColumnsVisibility(pageId);
  Object.entries(colVis).forEach(([id, visible]) => {
    document.querySelectorAll(`[data-cust-col="${id}"]`).forEach(el => {
      el.style.display = visible ? '' : 'none';
    });
  });
}

/* ═══════════════════════════════════════════════════════════════
   OPEN PANEL — فتح لوحة التخصيص
   ═══════════════════════════════════════════════════════════════ */
function openCustomizePanel(pageId) {
  _custPageId = pageId;
  const reg = PAGE_REGISTRY[pageId];
  if (!reg) { toast(t('customize_not_supported'), 'info'); return; }

  const saved = loadPageCustomization(pageId);
  let panel = G('cust-panel');

  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'cust-panel';
    panel.className = 'cust-panel';
    document.body.appendChild(panel);
  }

  const sectionsHtml = reg.sections.map(s => {
    const checked = saved[s.id] !== undefined ? saved[s.id] : s.default;
    return `<div class="cust-row">
      <div class="cust-row-info">
        <i class="${s.icon}"></i>
        <span>${s.label}</span>
      </div>
      <label class="cust-toggle">
        <input type="checkbox" data-cust-section="${s.id}" ${checked ? 'checked' : ''} onchange="onCustToggle('${s.id}', this.checked)">
        <span class="cust-toggle-slider"></span>
      </label>
    </div>`;
  }).join('');

  const columnsHtml = reg.columns ? `
    <div class="cust-sect-title"><i class="ti ti-columns"></i> الأعمدة</div>
    ${reg.columns.map(c => {
      const checked = saved[c.id] !== undefined ? saved[c.id] : c.default;
      return `<div class="cust-row">
        <div class="cust-row-info">
          <i class="ti ti-table-column"></i>
          <span>${c.label}</span>
        </div>
        <label class="cust-toggle">
          <input type="checkbox" data-cust-col-toggle="${c.id}" ${checked ? 'checked' : ''} onchange="onCustColToggle('${c.id}', this.checked)">
          <span class="cust-toggle-slider"></span>
        </label>
      </div>`;
    }).join('')}
  ` : '';

  panel.innerHTML = `
    <div class="cust-backdrop" onclick="closeCustomizePanel()"></div>
    <div class="cust-drawer">
      <div class="cust-drawer-hd">
        <div class="cust-drawer-title"><i class="ti ti-settings"></i> تخصيص — ${reg.name}</div>
        <button class="btn btn-icon btn-sm" onclick="closeCustomizePanel()"><i class="ti ti-x"></i></button>
      </div>
      <div class="cust-drawer-body">
        <div class="cust-sect-title"><i class="ti ti-layout-list"></i> الأقسام</div>
        ${sectionsHtml}
        ${columnsHtml}
      </div>
      <div class="cust-drawer-footer">
        <button class="btn btn-sm btn-secondary" onclick="resetPageCustomization('${pageId}')"><i class="ti ti-rotate"></i> إعادة ضبط</button>
        <button class="btn btn-sm btn-primary" onclick="closeCustomizePanel()"><i class="ti ti-check"></i> تطبيق</button>
      </div>
    </div>`;

  requestAnimationFrame(() => {
    panel.classList.add('open');
    applyPageCustomization(pageId);
  });
}

function closeCustomizePanel() {
  const panel = G('cust-panel');
  if (panel) {
    panel.classList.remove('open');
    setTimeout(() => { if (panel) panel.innerHTML = ''; }, 300);
  }
}

function onCustToggle(sectionId, visible) {
  if (!_custPageId) return;
  const settings = loadPageCustomization(_custPageId);
  settings[sectionId] = visible;
  savePageCustomization(_custPageId, settings);
  const el = document.getElementById(sectionId);
  if (el) {
    el.style.display = visible ? '' : 'none';
    el.classList.toggle('cust-hidden', !visible);
  }
}

function onCustColToggle(colId, visible) {
  if (!_custPageId) return;
  const settings = loadPageCustomization(_custPageId);
  settings[colId] = visible;
  savePageCustomization(_custPageId, settings);
  document.querySelectorAll(`[data-cust-col="${colId}"]`).forEach(el => {
    el.style.display = visible ? '' : 'none';
  });
}

function resetPageCustomization(pageId) {
  const reg = PAGE_REGISTRY[pageId];
  if (!reg) return;
  const settings = {};
  reg.sections.forEach(s => { settings[s.id] = s.default; });
  if (reg.columns) reg.columns.forEach(c => { settings[c.id] = c.default; });
  savePageCustomization(pageId, settings);
  applyPageCustomization(pageId);
  openCustomizePanel(pageId);
  toast(t('customize_reset'));
}

/* ═══════════════════════════════════════════════════════════════
   MENU BUTTON — زر ⋮ لكل صفحة
   ═══════════════════════════════════════════════════════════════ */
function injectCustMenu(pageId) {
  const topbar = G('pg-act');
  if (!topbar) return;
  if (topbar.querySelector('.cust-menu-btn')) return;

  const reg = PAGE_REGISTRY[pageId];
  if (!reg) return;

  const btn = document.createElement('button');
  btn.className = 'btn btn-icon btn-sm cust-menu-btn';
  btn.title = 'خيارات الصفحة';
  btn.innerHTML = '<i class="ti ti-dots-vertical"></i>';
  btn.onclick = function(e) {
    e.stopPropagation();
    const existing = topbar.querySelector('.cust-dropdown');
    if (existing) { existing.remove(); return; }

    const dd = document.createElement('div');
    dd.className = 'cust-dropdown';
    dd.innerHTML = `
      <div class="cust-dd-item" onclick="this.parentElement.remove();openCustomizePanel('${pageId}')">
        <i class="ti ti-settings"></i> تخصيص الصفحة
      </div>
      <div class="cust-dd-item" onclick="this.parentElement.remove();location.reload()">
        <i class="ti ti-refresh"></i> تحديث الصفحة
      </div>
      <div class="cust-dd-item" onclick="this.parentElement.remove();window.scrollTo({top:0,behavior:'smooth'})">
        <i class="ti ti-arrow-up"></i> العلو
      </div>`;
    topbar.style.position = 'relative';
    topbar.appendChild(dd);

    const close = (ev) => { if (!dd.contains(ev.target)) { dd.remove(); document.removeEventListener('click', close); } };
    setTimeout(() => document.addEventListener('click', close), 10);
  };

  topbar.insertBefore(btn, topbar.firstChild);
}

/* ═══════════════════════════════════════════════════════════════
   HOOK INTO showPage — ربط بنظام الصفحات
   ═══════════════════════════════════════════════════════════════ */
(function() {
  const origShowPage = typeof showPage === 'function' ? showPage : null;
  if (origShowPage) {
    window.showPage = function(pg) {
      origShowPage(pg);
      setTimeout(() => {
        injectCustMenu(pg);
        applyPageCustomization(pg);
      }, 50);
    };
  }
})();

/* ═══════════════════════════════════════════════
   ux.js
══════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════
   UX IMPROVEMENTS — تحسينات تجربة المستخدم
═══════════════════════════════════════════════ */

/* 1. BUTTON LOADING STATES */
function setBtnLoading(btn, loading) {
  if (!btn) return;
  if (loading) {
    btn.classList.add('loading');
    btn.setAttribute('aria-busy', 'true');
    btn._origHTML = btn.innerHTML;
    const text = btn.textContent.trim();
    btn.innerHTML = `<i class="ti ti-loader-2"></i> <span class="btn-text">${text}</span>`;
  } else {
    btn.classList.remove('loading');
    btn.removeAttribute('aria-busy');
    if (btn._origHTML) btn.innerHTML = btn._origHTML;
  }
}
function withBtnLoading(fn) {
  return async function(...args) {
    const btn = this || args[0];
    const btnEl = btn?.tagName ? btn : btn?.target?.closest?.('.btn');
    if (btnEl) setBtnLoading(btnEl, true);
    try {
      const result = await fn.apply(this, args);
      return result;
    } finally {
      if (btnEl) setBtnLoading(btnEl, false);
    }
  };
}

/* Helper: find primary save button within a modal */
function _findModalBtn(modalEl){
  if(!modalEl)return null;
  return modalEl.querySelector('.btn-primary:not(.btn-ghost):not(.btn-close)')||modalEl.querySelector('[data-action="save"]');
}
/* Wraps an async function with button loading, auto-detecting the modal save button */
async function withModalSave(modalId, fn){
  const modal=typeof modalId==='string'?G(modalId):modalId;
  const btn=_findModalBtn(modal);
  if(btn)setBtnLoading(btn,true);
  try{return await fn()}
  finally{if(btn)setBtnLoading(btn,false)}
}

/* 2. CUSTOM CONFIRMATION DIALOG */
function confirmAction(opts) {
  return new Promise(resolve => {
    const { title = 'تأكيد', message = 'هل أنت متأكد؟', confirmText = 'تأكيد', cancelText = 'إلغاء', type = 'danger', icon = 'ti-alert-triangle' } = opts;
    const overlay = document.createElement('div');
    overlay.className = 'confirm-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML = `
      <div class="confirm-dialog">
        <div class="confirm-hd">
          <div class="confirm-icon ${type}"><i class="ti ${icon}"></i></div>
          <div class="confirm-title">${title}</div>
        </div>
        <div class="confirm-body">${message}</div>
        <div class="confirm-footer">
          <button class="btn" id="confirm-cancel">${cancelText}</button>
          <button class="btn btn-${type === 'danger' ? 'danger' : type === 'warning' ? '' : 'primary'}" id="confirm-ok">${confirmText}</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.style.opacity = '1');
    const okBtn = overlay.querySelector('#confirm-ok');
    const cancelBtn = overlay.querySelector('#confirm-cancel');
    const close = (val) => { overlay.remove(); resolve(val); };
    okBtn.onclick = () => close(true);
    cancelBtn.onclick = () => close(false);
    overlay.onclick = (e) => { if (e.target === overlay) close(false); };
    document.addEventListener('keydown', function handler(e) {
      if (e.key === 'Escape') { close(false); document.removeEventListener('keydown', handler); }
      if (e.key === 'Enter') { close(true); document.removeEventListener('keydown', handler); }
    });
    okBtn.focus();
  });
}
function confirmDanger(msg, title) {
  return confirmAction({ title: title || 'تأكيد الحذف', message: msg, confirmText: 'حذف', type: 'danger', icon: 'ti-trash' });
}
function confirmWarning(msg, title) {
  return confirmAction({ title: title || 'تنبيه', message: msg, confirmText: 'موافق', type: 'warning', icon: 'ti-alert-triangle' });
}
function confirmInfo(msg, title) {
  return confirmAction({ title: title || 'معلومات', message: msg, confirmText: 'موافق', type: 'info', icon: 'ti-info-circle' });
}

/* 3. INLINE FORM VALIDATION */
function validateField(input, rules = {}) {
  const fg = input?.closest('.fg');
  if (!fg) return true;
  const msgEl = fg.querySelector('.field-msg');
  const val = input.value?.trim();
  let error = '';
  if (rules.required && !val) error = rules.requiredMsg || 'هذا الحقل مطلوب';
  else if (rules.minLength && val && val.length < rules.minLength) error = `الحد الأدنى ${rules.minLength} أحرف`;
  else if (rules.min !== undefined && val && parseFloat(val) < rules.min) error = `القيمة الدنيا ${rules.min}`;
  else if (rules.max !== undefined && val && parseFloat(val) > rules.max) error = `القيمة القصوى ${rules.max}`;
  else if (rules.pattern && val && !rules.pattern.test(val)) error = rules.patternMsg || 'صيغة غير صحيحة';
  else if (rules.custom) error = rules.custom(val);
  if (error) {
    fg.classList.add('field-error');
    fg.classList.remove('field-success');
    if (msgEl) { msgEl.innerHTML = `<i class="ti ti-alert-circle"></i> ${error}`; msgEl.style.display = 'flex'; }
    input.classList.add('shake');
    setTimeout(() => input.classList.remove('shake'), 400);
    return false;
  } else {
    fg.classList.remove('field-error');
    if (val) fg.classList.add('field-success');
    else fg.classList.remove('field-success');
    if (msgEl) { msgEl.style.display = 'none'; }
    return true;
  }
}
function clearValidation(form) {
  form?.querySelectorAll('.fg').forEach(fg => {
    fg.classList.remove('field-error', 'field-success');
    const msg = fg.querySelector('.field-msg');
    if (msg) msg.style.display = 'none';
  });
}
function validateForm(form, rulesMap) {
  let valid = true;
  for (const [selector, rules] of Object.entries(rulesMap)) {
    const input = form.querySelector(selector);
    if (input && !validateField(input, rules)) valid = false;
  }
  return valid;
}

/* 4. FOCUS TRAPPING IN MODALS */
const _focusTrapStack = [];
function trapFocus(modalBackdrop) {
  const focusable = modalBackdrop.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  function handler(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }
  modalBackdrop.addEventListener('keydown', handler);
  first.focus();
  _focusTrapStack.push({ el: modalBackdrop, handler, prevFocus: document.activeElement });
}
function releaseFocus() {
  const trap = _focusTrapStack.pop();
  if (trap) {
    trap.el.removeEventListener('keydown', trap.handler);
    if (trap.prevFocus?.focus) trap.prevFocus.focus();
  }
}

/* 5. UNDO/REDO SYSTEM */
const _undoStack = [];
const _redoStack = [];
function pushUndo(action) {
  _undoStack.push(action);
  if (_undoStack.length > 50) _undoStack.shift();
  _redoStack.length = 0;
}
function undo() {
  if (!_undoStack.length) return;
  const action = _undoStack.pop();
  if (action.undo) action.undo();
  _redoStack.push(action);
  showUndoToast('تم التراجع');
}
function redo() {
  if (!_redoStack.length) return;
  const action = _redoStack.pop();
  if (action.redo) action.redo();
  _undoStack.push(action);
  showUndoToast('تم الإعادة');
}
function showUndoToast(msg) {
  document.querySelectorAll('.undo-toast').forEach(t => t.remove());
  const toast = document.createElement('div');
  toast.className = 'undo-toast';
  toast.innerHTML = `<i class="ti ti-check" style="color:var(--green);font-size:16px"></i> <span class="undo-toast-msg">${msg}</span> <span class="btn-close-undo" onclick="this.closest('.undo-toast').remove()"><i class="ti ti-x"></i></span>`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
function showUndoableToast(msg, undoAction) {
  document.querySelectorAll('.undo-toast').forEach(t => t.remove());
  const toast = document.createElement('div');
  toast.className = 'undo-toast';
  toast.innerHTML = `<i class="ti ti-check" style="color:var(--green);font-size:16px"></i> <span class="undo-toast-msg">${msg}</span> <span class="btn-undo">تراجع</span> <span class="btn-close-undo" onclick="this.closest('.undo-toast').remove()"><i class="ti ti-x"></i></span>`;
  document.body.appendChild(toast);
  toast.querySelector('.btn-undo').onclick = () => { if (undoAction) undoAction(); toast.remove(); };
  setTimeout(() => toast.remove(), 5000);
}

/* 6. DRAG-AND-DROP FOR TABLE ROWS */
function enableDragSort(container, handleSelector, onReorder) {
  const handles = container.querySelectorAll(handleSelector);
  handles.forEach(h => {
    h.setAttribute('draggable', 'true');
    h.addEventListener('dragstart', e => {
      const row = h.closest('tr');
      row.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', '');
    });
    h.addEventListener('dragend', () => {
      container.querySelectorAll('tr').forEach(r => r.classList.remove('dragging', 'drag-over'));
    });
  });
  container.addEventListener('dragover', e => {
    const row = e.target.closest('tr');
    if (!row || row.classList.contains('dragging')) return;
    e.preventDefault();
    container.querySelectorAll('tr').forEach(r => r.classList.remove('drag-over'));
    row.classList.add('drag-over');
  });
  container.addEventListener('drop', e => {
    e.preventDefault();
    const target = e.target.closest('tr');
    const dragging = container.querySelector('.dragging');
    if (!target || !dragging || target === dragging) return;
    const rows = [...container.querySelectorAll('tr:not(.dragging)')];
    const targetIdx = rows.indexOf(target);
    const draggingIdx = rows.indexOf(dragging);
    if (draggingIdx < targetIdx) target.after(dragging);
    else target.before(dragging);
    if (onReorder) onReorder([...container.querySelectorAll('tr')]);
  });
}

/* 7. KEYBOARD NAVIGATION FOR TABLES */
function enableTableNav(tableEl, opts = {}) {
  if (!tableEl) return;
  const { onSelect, onEdit, className = 'row-focused' } = opts;
  let focusedIdx = -1;
  const getRows = () => [...tableEl.querySelectorAll('tbody tr')];
  tableEl.addEventListener('keydown', e => {
    const rows = getRows();
    if (!rows.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); focusedIdx = Math.min(focusedIdx + 1, rows.length - 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); focusedIdx = Math.max(focusedIdx - 1, 0); }
    else if (e.key === 'Enter' && focusedIdx >= 0) { if (onSelect) onSelect(rows[focusedIdx], focusedIdx); return; }
    else if (e.key === 'F2' && focusedIdx >= 0) { if (onEdit) onEdit(rows[focusedIdx], focusedIdx); return; }
    else return;
    rows.forEach(r => r.classList.remove(className));
    if (focusedIdx >= 0) {
      rows[focusedIdx].classList.add(className);
      rows[focusedIdx].scrollIntoView({ block: 'nearest' });
    }
  });
  tableEl.setAttribute('tabindex', '0');
  tableEl.style.outline = 'none';
}

/* 8. PROGRESS BAR */
function showProgress(container, percent, label) {
  let bar = container.querySelector('.progress-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.className = 'progress-bar';
    bar.innerHTML = '<div class="progress-bar-fill"></div><div class="progress-label"></div>';
    container.appendChild(bar);
  }
  const fill = bar.querySelector('.progress-bar-fill');
  const lbl = bar.querySelector('.progress-label');
  fill.style.width = Math.min(100, Math.max(0, percent)) + '%';
  if (label) lbl.textContent = label;
  bar.style.display = 'block';
  if (percent >= 100) fill.classList.add('success');
}
function hideProgress(container) {
  const bar = container.querySelector('.progress-bar');
  if (bar) bar.style.display = 'none';
}

/* 9. EMPTY STATE GENERATOR */
function emptyState(icon, title, desc, btnText, btnAction) {
  let html = `<div class="empty-state">
    <div class="empty-state-icon blue"><i class="ti ti-${icon}"></i></div>
    <div class="empty-state-title">${title}</div>
    <div class="empty-state-desc">${desc}</div>`;
  if (btnText && btnAction) {
    html += `<button class="btn btn-primary btn-sm" onclick="${btnAction}"><i class="ti ti-plus"></i> ${btnText}</button>`;
  }
  html += '</div>';
  return html;
}

/* 10. ENHANCED OPENMODAL/CLOSEMODAL with focus trap */
const _origOpenModal = typeof openModal === 'function' ? openModal : null;
const _origCloseModal = typeof closeModal === 'function' ? closeModal : null;

function enhancedOpenModal(id) {
  if (_origOpenModal) _origOpenModal(id);
  const backdrop = document.getElementById(id);
  if (backdrop) trapFocus(backdrop);
}
function enhancedCloseModal(id) {
  releaseFocus();
  if (_origCloseModal) _origCloseModal(id);
}

/* Override if originals exist */
if (typeof window !== 'undefined') {
  window.openModal = enhancedOpenModal;
  window.closeModal = enhancedCloseModal;
}

/* 11. GLOBAL KEYBOARD SHORTCUTS */
document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key === 'z' && !e.target.matches('input,textarea,select')) { e.preventDefault(); undo(); }
  if (e.ctrlKey && e.key === 'y' && !e.target.matches('input,textarea,select')) { e.preventDefault(); redo(); }
});

/* 12. GLOBAL EXPORTS */
if (typeof window !== 'undefined') {
  Object.assign(window, {
    setBtnLoading, withBtnLoading,
    confirmAction, confirmDanger, confirmWarning, confirmInfo,
    validateField, clearValidation, validateForm,
    pushUndo, undo, redo, showUndoableToast,
    enableDragSort, enableTableNav,
    showProgress, hideProgress, emptyState
  });
}

/* 13. AUTO-CONVERT title TO data-tooltip */
function initTooltips(){
  document.querySelectorAll('[title]').forEach(el=>{
    if(!el.hasAttribute('data-tooltip')){
      el.setAttribute('data-tooltip', el.getAttribute('title'));
    }
  });
}
/* Run on load and after AJAX content updates */
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded', initTooltips);
}else{initTooltips()}

/* 14. ENHANCE EMPTY ROWS WITH CTA */
(function patchEmptyRow(){
  const _origEmptyRow = typeof emptyRow === 'function' ? emptyRow : null;
  if(_origEmptyRow){
    window.emptyRow = function(cols, msg){
      if(!msg) return _origEmptyRow(cols, '');
      return `<tr><td colspan="${cols}"><div class="empty-state" style="padding:24px 10px">
        <div class="empty-state-icon blue"><i class="ti ti-inbox"></i></div>
        <div class="empty-state-title">${msg}</div>
      </div></td></tr>`;
    };
  }
})();

/* 15. MONITOR FOR DYNAMIC CONTENT — handled by showPage in ui.js */

/* ═══ 16. CONTEXT MENU ON TABLE ROWS ═══ */
(function initContextMenu(){
  document.addEventListener('contextmenu', function(e){
    const row = e.target.closest('tbody tr');
    if(!row || row.closest('.no-context')) return;
    const tbl = row.closest('table');
    if(!tbl) return;
    e.preventDefault();
    /* Remove existing menus */
    document.querySelectorAll('.ctx-menu').forEach(m=>m.remove());
    /* Build actions from data attributes */
    const menu = document.createElement('div');
    menu.className = 'ctx-menu';
    menu.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;z-index:10000;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,.4);padding:6px;min-width:180px;animation:fadeIn .12s ease`;
    const actions = row.getAttribute('data-ctx-actions');
    if(actions){
      try{
        JSON.parse(actions).forEach(a=>{
          const item = document.createElement('div');
          item.className = 'ctx-item';
          item.style.cssText = `display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;font-size:12px;cursor:pointer;transition:background .1s;color:${a.color||'var(--text-secondary)'}`;
          item.innerHTML = `<i class="ti ti-${a.icon||'circle'}" style="font-size:15px;width:20px;text-align:center"></i> ${a.label}`;
          item.onmouseenter = function(){this.style.background = 'var(--bg-hover)'};
          item.onmouseleave = function(){this.style.background = 'transparent'};
          item.onclick = function(){ eval(a.action); menu.remove(); };
          menu.appendChild(item);
        });
      }catch(e){}
    }
    /* Default actions */
    if(!menu.children.length){
      const editBtn = row.querySelector('[data-ctx-edit]');
      const delBtn = row.querySelector('[data-ctx-delete]');
      if(editBtn){
        const item = document.createElement('div');
        item.className = 'ctx-item';
        item.style.cssText = `display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;font-size:12px;cursor:pointer;transition:background .1s;color:var(--accent)`;
        item.innerHTML = '<i class="ti ti-pencil" style="font-size:15px;width:20px;text-align:center"></i> تعديل';
        item.onmouseenter = function(){this.style.background = 'var(--bg-hover)'};
        item.onmouseleave = function(){this.style.background = 'transparent'};
        item.onclick = function(){ editBtn.click(); menu.remove(); };
        menu.appendChild(item);
      }
      if(delBtn){
        const item = document.createElement('div');
        item.className = 'ctx-item';
        item.style.cssText = `display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;font-size:12px;cursor:pointer;transition:background .1s;color:var(--red)`;
        item.innerHTML = '<i class="ti ti-trash" style="font-size:15px;width:20px;text-align:center"></i> حذف';
        item.onmouseenter = function(){this.style.background = 'var(--bg-hover)'};
        item.onmouseleave = function(){this.style.background = 'transparent'};
        item.onclick = function(){ delBtn.click(); menu.remove(); };
        menu.appendChild(item);
      }
      const viewBtn = row.querySelector('[data-ctx-view]');
      if(viewBtn){
        const item = document.createElement('div');
        item.innerHTML = '<i class="ti ti-eye" style="font-size:15px;width:20px;text-align:center"></i> عرض';
        item.onclick = function(){ viewBtn.click(); menu.remove(); };
        if(!menu.children.length) menu.prepend(item);
        else menu.insertBefore(item, menu.children[0]);
      }
    }
    if(menu.children.length){
      document.body.appendChild(menu);
      /* Close on click outside */
      setTimeout(()=>document.addEventListener('click', function handler(e2){
        if(!menu.contains(e2.target)){ menu.remove(); document.removeEventListener('click', handler); }
      }), 10);
    }
  });
})();

/* ═══ 17. SWIPE GESTURES FOR MOBILE ═══ */
(function initSwipe(){
  let startX=0, startY=0, startTime=0;
  document.addEventListener('touchstart', function(e){
    const target = e.target.closest('tr, .dash-cv-item, .card');
    if(!target) return;
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    startTime = Date.now();
    target._swipeData = {startX, startY, startTime};
  }, {passive: true});

  document.addEventListener('touchend', function(e){
    const target = e.target.closest('tr, .dash-cv-item, .card');
    if(!target || !target._swipeData) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - target._swipeData.startX;
    const dy = touch.clientY - target._swipeData.startY;
    const dt = Date.now() - target._swipeData.startTime;
    delete target._swipeData;
    if(dt > 500 || Math.abs(dx) < 60) return;
    if(Math.abs(dx) < Math.abs(dy) * 0.7) return;
    /* Swipe right -> edit, Swipe left -> delete */
    if(dx > 0){
      const editBtn = target.querySelector('[data-ctx-edit]') || target.querySelector('.btn-icon:first-child');
      if(editBtn) { editBtn.style.background = 'var(--accent-dim)'; setTimeout(()=>editBtn.style.background='',300); editBtn.click(); }
    } else {
      const delBtn = target.querySelector('[data-ctx-delete]') || target.querySelector('.btn-danger');
      if(delBtn) { delBtn.style.background = 'var(--red-dim)'; setTimeout(()=>delBtn.style.background='',300); delBtn.click(); }
    }
    /* Haptic */
    try{if(navigator.vibrate) navigator.vibrate(30);}catch(ex){}
  }, {passive: true});
})();

/* ═══ 18. SOUND EFFECTS ═══ */
function playSound(type){
  try{
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.value = 0.08;
    if(type === 'success'){
      osc.frequency.setValueAtTime(523, ctx.currentTime);
      osc.frequency.setValueAtTime(659, ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    }else if(type === 'error'){
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.setValueAtTime(200, ctx.currentTime + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    }else if(type === 'delete'){
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    }else if(type === 'notify'){
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.setValueAtTime(1100, ctx.currentTime + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    }else{
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    }
  }catch(ex){}
}

/* ═══ 19. WIRE CONFIRM SOUNDS ═══ */
(function wireSounds(){
  const _origConfirmDanger = window.confirmDanger;
  if(_origConfirmDanger){
    window.confirmDanger = async function(msg,title){
      playSound('delete');
      return _origConfirmDanger(msg,title);
    };
  }
})();

/* ═══ 20. FORM VALIDATION WIRING ═══ */
(function wireFormValidation(){
  /* Validate name field in item modal on input */
  const nameInput = G('fi-name');
  if(nameInput){
    nameInput.addEventListener('blur', function(){
      validateField(this, {required: true, requiredMsg: 'اسم الصنف مطلوب'});
    });
    nameInput.addEventListener('input', function(){
      const fg = this.closest('.fg');
      if(fg) fg.classList.remove('field-error');
    });
  }
  /* Validate amount in expense modal */
  const amountInput = G('exp-amount');
  if(amountInput){
    amountInput.addEventListener('blur', function(){
      validateField(this, {required: true, min: 0.001, requiredMsg: 'المبلغ مطلوب'});
    });
  }
  /* Validate description in expense modal */
  const descInput = G('exp-desc');
  if(descInput){
    descInput.addEventListener('blur', function(){
      validateField(this, {required: true, requiredMsg: 'البيان مطلوب'});
    });
  }
})();

/* ═══ EVENT DELEGATION — استبدال onclick بـ data-action ═══ */
(function(){
  const _actionMap={
    toggleSidebar:()=>{const s=G('sidebar-backdrop');if(s)s.click();toggleSidebar()},
    toggleLanguage, handleLogin, logout, toggleTheme, toggleFab,
    toggleNotifPanel, installApp, toggleCart, syncCloud,
    exportLocalBackup, saveCloudBackup, importLocalBackup,
    saveItem, saveCust, saveSup, saveInv, savePur, savePayment,
    saveCollect2, saveSettlement, saveSupPay, saveSupSettlement,
    saveRet, saveUser, saveCompany, saveExpense, saveEmployeeEdit,
    saveAttendance, addAdvance, savePerformanceEval, saveBarcodeSettings,
    addEmployee, printEmployeeList, printPayroll, removeCompanyLogo,
    addCustomAlert, addSiLine, addPiLine, savePageCustomization,
    exportItems, exportSales, exportReturns, exportPurchases,
    exportCustomers, exportSuppliers, exportUsers, exportSupplierPayments,
    exportFinance, exportPL, exportAudit, exportExpenses,
    exportHRMEmployees, exportHRMAttendance, exportHRMPayroll,
    exportHRMAdvances, exportHRMCashLedger, exportPerformanceExcel,
    exportSOA, exportLocalBackup,
    printItemsPDF, printSalesPDF, printReturnsPDF, printPurchasesPDF,
    printCustomersPDF, printSuppliersPDF, printUsersPDF,
    printSupplierPaymentsPDF, printFinancePDF, printPLPDF, printAuditPDF,
    printSOA, printInvoice, printAllItemLabels,
    printHRMAttendancePDF:()=>exportAttendancePDF(),
    printHRMAdvancesPDF:()=>exportAdvancesPDF(),
    printHRMCashLedgerPDF:()=>exportCashLedgerPDF(),
    printPerformancePDF:()=>exportPerformancePDF(),
    printPayrollPDF:()=>exportPayrollPDF(),
    startBarcodeScanner,
    batchDeleteItems:e=>batchDeleteItems(e),
    batchUpdateCategory, batchUpdatePrice,
    openNewItem, openNewSale:()=>openNewSale(),
    loadReverseSettlements,
    clearItemImage, handleCSVImport:()=>document.getElementById('import-csv-input')?.click(),
    showPage:el=>showPage(el.dataset.pg),
    navigateTo:el=>navigateTo(el.dataset.pg),
    openModal:el=>openModal(el.dataset.modal),
    closeModal:el=>closeModal(el.dataset.modal),
    goToPage:el=>goToPage(el.dataset.key,parseInt(el.dataset.page)||1,window[el.dataset.render]),
    openReverseSettle:()=>{openModal('m-reverse-settle');loadReverseSettlements()},
    openSettleLog:()=>{openModal('m-settle-log');renderSettleLog()},
    clickImport:()=>document.getElementById('import-file')?.click(),
    showHRMTab:el=>showHRMTab(el.dataset.tab),
    finTab:el=>finTab(el.dataset.tab,el),
    openCompanyModal:()=>openCompanyModal(null),
    generatePayroll, adjustCashLedger,
    setSettleMode:el=>setSettleMode(el.dataset.mode),
    setSupSettleMode:el=>setSupSettleMode(el.dataset.mode),
    toggleHRMSection:el=>toggleHRMSection(el),
    confirmDeliver,
    saveEmployeeEdit, savePerformanceEval,
    clickLogoInput:()=>document.getElementById('co-logo-input')?.click(),
    closeModalAndReset:el=>{const map={invoice:()=>{closeModal('m-invoice');_editingInvId=null;G('si-inv-title').innerHTML='<i class="ti ti-receipt"></i> فاتورة بيع جديدة'},pur:()=>{closeModal('m-pur');_editingPurId=null;G('pur-title').innerHTML='<i class="ti ti-truck"></i> فاتورة شراء جديدة'},hrmPreview:()=>{closeModal('hrm-preview-modal');addEmployee()}};const fn=map[el.dataset.reset];if(fn)fn()},
    openInvoiceViaFab:()=>{toggleFab();openModal('m-invoice')},
    openNewItemViaFab:()=>{toggleFab();openNewItem()},
    openCollectViaFab:()=>{toggleFab();openCollectStandalone()},
    importItemsCSV:()=>handleCSVImport(),
    printPayroll:el=>{const v=G('hrm-pay-period')?.value||'';if(v)printPayroll(v)},
    toggleFabAndOpenInv:()=>{toggleFab();openModal('m-inv')},
    clickFinanceImage:()=>{const fi=G('fi-img-input');if(fi)fi.click()},
    closeInvoiceX:()=>{closeModal('m-invoice');_editingInvId=null},
    closePurX:()=>{closeModal('m-pur');_editingPurId=null},
    closeInvoiceCancel:()=>{closeModal('m-invoice');_editingInvId=null;G('si-inv-title').innerHTML='<i class=ti ti-receipt icon-accent></i> فاتورة بيع جديدة'},
    closePurCancel:()=>{closeModal('m-pur');_editingPurId=null;G('pur-title').innerHTML='<i class=ti ti-truck icon-amber></i> فاتورة شراء جديدة'},
    savePur,
    selPay:el=>selPay(el.dataset.prefix,el,el.dataset.mode),
  };
  document.addEventListener('click',e=>{
    const el=e.target.closest('[data-action]');
    if(!el)return;
    const action=_actionMap[el.dataset.action];
    if(!action){
      if(typeof window[el.dataset.action]==='function')window[el.dataset.action]();
      else console.warn('Unknown action:',el.dataset.action);
      return;
    }
    if(typeof action==='function')action(el);
  });
})();

/* ═══════════════════════════════════════════════
   expenses.js
══════════════════════════════════════════════ */

/* ═══ EXPENSE TRACKING ═══ */
const EXP_CATS={rent:'إيجار',utilities:'مرافق',salaries:'رواتب',supplies:'لوازم',marketing:'تسويق',transport:'نقل',maintenance:'صيانة',insurance:'تأمين',taxes:'ضرائب',office:'مكتبية',travel:'سفر',other:'أخرى'};
const EXP_PAY={cash:'نقداً',check:'صك',bank_transfer:'تحويل بنكي',card:'بطاقة'};
const EXP_STATUSES={pending:'قيد المراجعة',approved:'معتمد',rejected:'مرفوض'};
let _expEditingId=null;

function openExpenseModal(id){
  _expEditingId=id||null;
  const title=G('m-exp-title');
  if(title) title.textContent=id?'تعديل المصروف':'مصروف جديد';
  if(id){
    apiFetch('/api/v1/expenses').then(r=>r.json()).then(d=>{
      const exp=d.expenses?.find(e=>e._id===id);
      if(exp){
        G('exp-category').value=exp.category;
        G('exp-amount').value=exp.amount;
        G('exp-desc').value=exp.description;
        G('exp-date').value=exp.date;
        G('exp-payment').value=exp.paymentMethod;
        G('exp-notes').value=exp.notes||'';
      }
    });
  }else{
    G('exp-category').value='other';
    G('exp-amount').value='';
    G('exp-desc').value='';
    G('exp-date').value=new Date().toISOString().slice(0,10);
    G('exp-payment').value='cash';
    G('exp-notes').value='';
  }
  openModal('m-expense');
}

async function saveExpense(){
  const btn=G('m-expense')?.querySelector('.btn-primary')||document.querySelector('[onclick*="saveExpense"]')?.closest('.btn-primary');setBtnLoading(btn,true);
  try{
    const data={
      category:G('exp-category').value,
      amount:parseFloat(G('exp-amount').value),
      description:G('exp-desc').value.trim(),
      date:G('exp-date').value,
      paymentMethod:G('exp-payment').value,
      notes:G('exp-notes').value.trim()
    };
    if(!data.description){toast(t('pay_enter_amount'),'error');return}
    if(!data.amount||data.amount<=0){toast(t('pay_enter_amount'),'error');return}
    try{
      if(_expEditingId){
        await apiFetch('/api/v1/expenses/'+_expEditingId,{method:'PATCH',body:JSON.stringify(data)});
      }else{
        await apiFetch('/api/v1/expenses',{method:'POST',body:JSON.stringify(data)});
      }
      closeModal('m-expense');
      renderExpenses();
      toast(_expEditingId?'تم تحديث المصروف':'تم إضافة المصروف','success');
    }catch(e){toast(e.message,'error')}
  }finally{
    if(btn)setBtnLoading(btn,false);
  }
}

function apiFetch(url,opts={}){
  const token=localStorage.getItem('salesSystemAuthToken')||'';
  return fetch(url,{...opts,headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json',...(opts.headers||{})}});
}

async function renderExpenses(){
  const catFilter=G('exp-cat-filter')?.value||'';
  const from=G('exp-date-from')?.value||'';
  const to=G('exp-date-to')?.value||'';
  let url='/api/v1/expenses?limit=100';
  if(catFilter)url+='&category='+catFilter;
  if(from)url+='&from='+from;
  if(to)url+='&to='+to;
  try{
    const res=await apiFetch(url);
    const d=await res.json();
    const exps=d.expenses||[];
    const tb=G('exp-tb');
    if(!tb)return;
    if(!exps.length){tb.innerHTML=emptyRow(7,'لا توجد مصروفات');renderPag('exp-tb',0,renderExpenses);return}
    tb.innerHTML=exps.map(e=>{
      const catLabel=EXP_CATS[e.category]||e.category;
      const catColors={rent:'blue',utilities:'cyan',salaries:'purple',supplies:'amber',marketing:'green',transport:'teal',maintenance:'amber',insurance:'blue',taxes:'red',office:'gray',travel:'cyan',other:'gray'};
      const cc=catColors[e.category]||'gray';
      const payLabel=EXP_PAY[e.paymentMethod]||e.paymentMethod;
      const stLabel=EXP_STATUSES[e.status]||e.status;
      const stClass=e.status==='approved'?'b-green':e.status==='rejected'?'b-red':'b-amber';
      return`<tr>
        <td class="td-mono" style="font-size:11px">${e.date}</td>
        <td><span class="badge b-${cc}">${catLabel}</span></td>
        <td style="font-weight:600">${escapeHtml(e.description)}</td>
        <td class="td-mono" style="color:var(--red);font-weight:700">${fmt(e.amount)} ${t('currency_sym')}</td>
        <td style="font-size:11px;color:var(--text-muted)">${payLabel}</td>
        <td><span class="badge ${stClass}">${stLabel}</span></td>
        <td><div class="td-actions">
          <button class="btn btn-sm btn-icon" onclick="openExpenseModal('${e._id}')" title="تعديل"><i class="ti ti-pencil"></i></button>
          <button class="btn btn-sm btn-danger btn-icon" onclick="deleteExpense('${e._id}')" title="حذف"><i class="ti ti-trash"></i></button>
        </div></td>
      </tr>`;
    }).join('');
    renderPag('exp-tb',exps.length,renderExpenses);
    renderExpStats(d.summary||[],d.total||0,d.count||0);
  }catch(e){console.error(e)}
}

async function deleteExpense(id){
  const ok=await confirmDanger('حذف هذا المصروف؟');if(!ok)return;
  try{
    await apiFetch('/api/v1/expenses/'+id,{method:'DELETE'});
    renderExpenses();
    toast('تم حذف المصروف','success');
  }catch(e){toast(e.message,'error')}
}

function renderExpStats(summary,total,count){
  const el=G('exp-stats');
  if(!el)return;
  const catIcons={rent:'ti ti-home',utilities:'ti ti-bolt',salaries:'ti ti-users',supplies:'ti ti-package',marketing:'ti ti-speakerphone',transport:'ti ti-truck',maintenance:'ti ti-tools',insurance:'ti ti-shield',taxes:'ti ti-file-invoice',office:'ti ti-building',travel:'ti ti-plane',other:'ti ti-dots'};
  el.innerHTML=`
    <div class="stat-card red"><div class="stat-lbl">إجمالي المصروفات</div><div class="stat-val">${fmt(total)}</div><div class="stat-sub">${count} مصروف</div></div>
    ${summary.slice(0,3).map(s=>`<div class="stat-card blue"><div class="stat-lbl">${EXP_CATS[s._id]||s._id}</div><div class="stat-val">${fmt(s.total)}</div><div class="stat-sub">${s.count} مصروف</div></div>`).join('')}
  `;
}

function exportExpenses(){
  toast('جاري التصدير...','info');
  apiFetch('/api/v1/expenses').then(r=>r.json()).then(d=>{
    const exps=d.expenses||[];
    const headers=['التاريخ','الفئة','البيان','المبلغ','طريقة الدفع','ملاحظات'];
    const rows=exps.map(e=>[e.date,EXP_CATS[e.category]||e.category,e.description,fmt(e.amount),EXP_PAY[e.paymentMethod]||e.paymentMethod,e.notes||'']);
    _exportTable(headers,rows,'المصروفات','expenses');
  });
}

/* ═══════════════════════════════════════════════
   barcode-scanner.js
══════════════════════════════════════════════ */

/* ═══ BARCODE SCANNER ═══ */
let _html5QrCode=null;
let _scannerRunning=false;

function startBarcodeScanner(){
  openModal('m-barcode-scanner');
  const resultEl=G('barcode-result');
  const statusEl=G('scanner-status');
  if(resultEl)resultEl.style.display='none';
  if(statusEl)statusEl.textContent='وجّه الكاميرا نحو الباركود';
  initScanner();
}

function initScanner(){
  if(typeof Html5Qrcode==='undefined'){
    loadScript('https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js').then(()=>setupScanner());
  }else{
    setupScanner();
  }
}

function setupScanner(){
  try{
    _html5QrCode=new Html5Qrcode('barcode-reader');
    _scannerRunning=true;
    _html5QrCode.start(
      {facingMode:'environment'},
      {fps:10,qrbox:{width:250,height:150},aspectRatio:1.5},
      onScanSuccess,
      ()=>{}
    ).catch(err=>{
      const statusEl=G('scanner-status');
      if(statusEl)statusEl.textContent='خطأ في تشغيل الكاميرا: '+err;
    });
  }catch(e){
    const statusEl=G('scanner-status');
    if(statusEl)statusEl.textContent='خطأ: '+e.message;
  }
}

function onScanSuccess(decodedText){
  if(!_scannerRunning)return;
  _scannerRunning=false;
  try{_html5QrCode.pause();}catch(e){}
  const resultEl=G('barcode-result');
  const valueEl=G('barcode-value');
  const statusEl=G('scanner-status');
  if(resultEl)resultEl.style.display='block';
  if(valueEl)valueEl.textContent=decodedText;
  if(statusEl)statusEl.textContent='تم المسح بنجاح!';
  try{if(navigator.vibrate)navigator.vibrate(100);}catch(e){}
  const item=DB.items.find(x=>x.barcode===decodedText);
  if(item){
    showPage('inventory');
    setTimeout(()=>{
      const searchEl=G('inv-search');
      if(searchEl){searchEl.value=item.name;filterItems(item.name);}
      toast('تم العثور على: '+item.name,'success',{icon:'ti-barcode'});
    },300);
  }else{
    showPage('inventory');
    setTimeout(()=>{
      const searchEl=G('inv-search');
      if(searchEl){searchEl.value=decodedText;filterItems(decodedText);}
      toast('لم يتم العثور على صنف بالباركود: '+decodedText,'info');
    },300);
  }
  setTimeout(()=>stopBarcodeScanner(),800);
}

function stopBarcodeScanner(){
  _scannerRunning=false;
  if(_html5QrCode){
    try{_html5QrCode.stop().then(()=>{_html5QrCode.clear();});}catch(e){try{_html5QrCode.clear();}catch(e2){}}
    _html5QrCode=null;
  }
  closeModal('m-barcode-scanner');
  const readerEl=G('barcode-reader');
  if(readerEl)readerEl.innerHTML='';
}

function loadScript(src){
  return new Promise((resolve,reject)=>{
    if(document.querySelector(`script[src="${src}"]`)){resolve();return;}
    const s=document.createElement('script');
    s.src=src;s.onload=resolve;s.onerror=reject;
    document.head.appendChild(s);
  });
}

/* ═══════════════════════════════════════════════
   main.js
══════════════════════════════════════════════ */

/* ═══ DASHBOARD ═══ */

function showDashSkeleton(){
  const areas=['stats-grid','insight-grid','dash-charts','#p-dash .card'];
  areas.forEach(sel=>{
    document.querySelectorAll(sel).forEach(el=>{
      el._origHTML=el.innerHTML;
      el.style.minHeight='100px';
      el.innerHTML=`<div class="skeleton-card"><div class="skeleton-line w-75 h-lg"></div><div class="skeleton-line w-50 h-xl" style="margin-top:12px"></div><div class="skeleton-line w-25"></div></div>`;
    });
  });
}
function hideDashSkeleton(){
  document.querySelectorAll('[style*="min-height"]').forEach(el=>{
    if(el._origHTML){el.innerHTML=el._origHTML;delete el._origHTML;el.style.minHeight=''}
  });
}

function animateCounter(el, target, isFloat){
  const start=parseFloat(el.textContent.replace(/[^0-9.-]/g,''))||0;
  if(start===target){return}
  const dur=600;const st=performance.now();
  function tick(now){
    const p=Math.min((now-st)/dur,1);
    const ease=1-Math.pow(1-p,3);
    const v=start+(target-start)*ease;
    el.textContent=isFloat?v.toFixed(3):Math.round(v);
    if(p<1)requestAnimationFrame(tick);
  }
  el.classList.add('count-anim');
  requestAnimationFrame(tick);
}

function updateStats(){
  const totalSales=DB.invs.reduce((s,x)=>s+x.total,0);
  const openBal=DB.custs.reduce((s,c)=>s+(parseFloat(c.openBal)||0),0);
  const collected=DB.payments.reduce((s,p)=>s+p.amount,0);
  const uncollected=totalSales + openBal - collected;
  const alerts=DB.items.filter(x=>x.qty<=x.reorder);
  const pendingDeliveries=DB.invs.filter(i=>i.dlvStatus!=='delivered').length;
  const overdueInvoices=DB.invs.filter(i=>invRemaining(i)>0.001 && i.dlvStatus==='delivered').length;

  const elSales=G('ds-s'), elCol=G('ds-collected'), elRecv=G('ds-recv'), elA=G('ds-a');
  if(elSales)animateCounter(elSales,totalSales,true);
  if(elCol)animateCounter(elCol,collected,true);
  if(elRecv)animateCounter(elRecv,uncollected,true);
  if(elA)animateCounter(elA,alerts.length,false);

  const ad=G('dash-alerts');
  if(ad) ad.innerHTML=`<div class="insight-grid">
    <div class="insight-card blue"><span>${t('dash_pending_invoices')}</span><strong>${pendingDeliveries}</strong><small>${t('dash_pending_delivery')}</small></div>
    <div class="insight-card amber"><span>${t('dash_due_receivables')}</span><strong>${overdueInvoices}</strong><small>${t('dash_unpaid_invoices')}</small></div>
    <div class="insight-card red"><span>${t('dash_stock_alerts')}</span><strong>${alerts.length}</strong><small>${t('dash_restock_items')}</small></div>
  </div>
  ${alerts.slice(0,3).map(x=>`<div class="alert-strip"><i class="ti ti-alert-triangle"></i> ${escapeHtml(x.name)} — ${x.qty} ${escapeHtml(x.unit)} (${x.reorder})</div>`).join('')}`;
  renderDash()
}

function renderDash(){
  const it=G('d-inv-tb');
  const cvInv=G('d-inv-cv');
  const recent=[...DB.invs].slice(-5).reverse();

  /* Table view */
  if(it) it.innerHTML=recent.length?recent.map(inv=>`<tr>
    <td style="color:var(--accent);font-weight:600">${escapeHtml(inv.num)}</td>
    <td>${escapeHtml(inv.custName)}</td>
    <td class="td-mono" style="font-weight:700">${fmt(inv.total)} ${t('currency_sym')}</td>
    <td>${invPayStatus(inv)}</td>
  </tr>`).join(''):emptyRow(4,t('dash_no_invoices'));

  /* Card view — mobile */
  if(cvInv){
    cvInv.innerHTML=recent.length?recent.map(inv=>{
      const payLabel=inv.payStatus==='paid'?'cv-green':inv.payStatus==='partial'?'cv-amber':'cv-blue';
      return `<div class="dash-cv-item ${payLabel}">
        <div class="dash-cv-header">
          <div class="dash-cv-title">${escapeHtml(inv.num)}</div>
          <div class="dash-cv-badge badge badge-${inv.payStatus==='paid'?'green':inv.payStatus==='partial'?'amber':'blue'}">${invPayStatus(inv)}</div>
        </div>
        <div class="dash-cv-body">
          <div class="dash-cv-field"><div class="dash-cv-field-label">${t('dash_col_customer')}</div><div class="dash-cv-field-value">${escapeHtml(inv.custName)}</div></div>
          <div class="dash-cv-field"><div class="dash-cv-field-label">${t('dash_col_total')}</div><div class="dash-cv-field-value mono">${fmt(inv.total)} ${t('currency_sym')}</div></div>
        </div>
      </div>`;
    }).join(''):`<div class="dash-cv-item"><div class="dash-cv-body"><div class="dash-cv-field"><div class="dash-cv-field-value" style="text-align:center;color:var(--text-muted)">${t('dash_no_invoices')}</div></div></div></div>`;
  }

  const lt=G('d-low-tb');
  const cvLow=G('d-low-cv');
  const low=DB.items.filter(x=>x.qty<=x.reorder);

  /* Table view */
  if(lt) lt.innerHTML=low.length?low.map(x=>{
    const shortage = x.reorder - x.qty;
    const shortageLabel = shortage > 0 ? `<span class="text-red">${fmt(shortage)}</span>` : `<span class="text-green">0</span>`;
    return `<tr>
      <td>${escapeHtml(x.name)}</td>
      <td class="td-mono" style="color:var(--amber);font-weight:700">${x.qty}</td>
      <td class="td-mono">${x.reorder}</td>
      <td class="td-mono">${shortageLabel}</td>
    </tr>`
  }).join(''):`<tr><td colspan="4"><div class="empty-st" style="padding:18px"><i class="ti ti-check"></i><span>${t('dash_all_stock_ok')}</span></div></td></tr>`;

  /* Card view — mobile */
  if(cvLow){
    cvLow.innerHTML=low.length?low.map(x=>{
      const shortage=x.reorder-x.qty;
      const colorClass=shortage>0?'cv-red':'cv-green';
      return `<div class="dash-cv-item ${colorClass}">
        <div class="dash-cv-header">
          <div class="dash-cv-title">${escapeHtml(x.name)}</div>
          <div class="dash-cv-badge badge badge-${shortage>0?'red':'green'}">${shortage>0?t('dash_shortage'):t('dash_good')}</div>
        </div>
        <div class="dash-cv-body">
          <div class="dash-cv-field"><div class="dash-cv-field-label">${t('dash_balance')}</div><div class="dash-cv-field-value mono" style="color:var(--amber)">${x.qty} ${escapeHtml(x.unit)}</div></div>
          <div class="dash-cv-field"><div class="dash-cv-field-label">${t('dash_reorder')}</div><div class="dash-cv-field-value mono">${x.reorder}</div></div>
          <div class="dash-cv-field"><div class="dash-cv-field-label">${t('dash_shortage_label')}</div><div class="dash-cv-field-value mono" style="color:var(--red)">${shortage>0?shortage:'-'}</div></div>
        </div>
      </div>`;
    }).join(''):'<div class="dash-cv-item cv-green"><div class="dash-cv-body"><div class="dash-cv-field"><div class="dash-cv-field-value" style="text-align:center;color:var(--green)"><i class="ti ti-check"></i> '+t('dash_all_stock_ok_cv')+'</div></div></div></div>';
  }

  renderDashLog();
  setTimeout(renderDashCharts,50);
}

/* ═══ NAVIGATION — الانتقال السريع ═══ */
function navigateTo(page){
  const navItem=document.querySelector(`.nav-item[data-page="${page}"]`);
  if(navItem)navItem.click();
}

/* ═══ FAB — الزر العائم ═══ */
let fabOpen=false;
function toggleFab(){
  fabOpen=!fabOpen;
  const menu=G('fab-menu');
  const backdrop=G('fab-backdrop');
  const btn=G('fab-btn');
  if(menu)menu.classList.toggle('open',fabOpen);
  if(backdrop)backdrop.classList.toggle('on',fabOpen);
  if(btn)btn.style.transform=fabOpen?'rotate(45deg)':'rotate(0)';
  document.body.style.overflow=fabOpen?'hidden':'';
}

/* ═══ PULL TO REFRESH ═══ */
(function initPTR(){
  if(!('ontouchstart' in window))return;
  let startY=0,pulling=false,canPull=false;
  const ptr=G('ptr-indicator');
  if(!ptr)return;
  document.addEventListener('touchstart',e=>{
    const content=document.querySelector('.content');
    if(content&&content.scrollTop<=0){canPull=true;startY=e.touches[0].clientY}
  },{passive:true});
  document.addEventListener('touchmove',e=>{
    if(!canPull)return;
    const dy=e.touches[0].clientY-startY;
    if(dy>30&&dy<150){
      pulling=true;
      ptr.classList.add('on');
      ptr.querySelector('.ti').style.transform=`rotate(${dy*2}deg)`;
    }
  },{passive:true});
  document.addEventListener('touchend',()=>{
    if(pulling){
      ptr.classList.add('loading');
      setTimeout(()=>{
        updateStats();
        renderDash();
        ptr.classList.remove('loading','on');
        ptr.querySelector('.ti').style.transform='';
        toast(t('ptr_refreshed'),'success');
      },800);
    }
    pulling=false;canPull=false;
  });
})();

let deferredInstallPrompt=null;
window.addEventListener('beforeinstallprompt', e=>{
  e.preventDefault();
  deferredInstallPrompt=e;
  const btn=G('install-btn');
  if(btn) btn.style.display='inline-flex';
});
async function installApp(){
  if(!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  const choice=await deferredInstallPrompt.userChoice;
  if(choice.outcome==='accepted'){
    toast(t('install_done'),'success');
  } else {
    toast(t('install_cancelled'),'info');
  }
  deferredInstallPrompt=null;
  const btn=G('install-btn');
  if(btn) btn.style.display='none';
}
window.addEventListener('appinstalled', ()=>{toast(t('install_success'),'success')});
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register('service-worker.js')
      .then(reg=>{console.log('Service worker registered');
        navigator.serviceWorker.addEventListener('message',e=>{
          if(e.data?.type==='synced'){toast('تمت مزامنة البيانات المحفوظة offline','success',{icon:'ti-cloud-upload'});renderCurrentPage();}
        });
      })
      .catch(err=>console.warn('SW registration failed',err));
  });
  window.addEventListener('online',()=>{
    if(navigator.serviceWorker.controller){navigator.serviceWorker.controller.postMessage('replay-queue');}
    const banner=G('offline-banner');if(banner)banner.style.display='none';
  });
  window.addEventListener('offline',()=>{
    const banner=G('offline-banner');if(banner){banner.style.display='flex';banner.innerHTML='<i class="ti ti-wifi-off"></i> <span>أنت offline — سيتم حفظ التغييرات تلقائياً</span>';}
  });
}

/* ═══ NUMBER TO ARABIC ═══ */
function numToWords(n){
  n=Math.round(parseFloat(n||0)*1000)/1000;
  if(n===0)return'صفر دينار ليبي لا غير';
  const ones=['','واحد','اثنان','ثلاثة','أربعة','خمسة','ستة','سبعة','ثمانية','تسعة','عشرة','أحد عشر','اثنا عشر','ثلاثة عشر','أربعة عشر','خمسة عشر','ستة عشر','سبعة عشر','ثمانية عشر','تسعة عشر'];
  const tens=['','','عشرون','ثلاثون','أربعون','خمسون','ستون','سبعون','ثمانون','تسعون'];
  const int_=Math.floor(n);const dec=Math.round((n-int_)*1000);let res='';
  if(int_>=1000){const t=Math.floor(int_/1000);res+=(t===1?'ألف':(t<=10?ones[t]+' آلاف':ones[t]+' ألف'))+' '}
  const rem=int_%1000;if(rem>=100){res+=ones[Math.floor(rem/100)]+' مئة '}
  const last=rem%100;if(last>=20){res+=tens[Math.floor(last/10)];if(last%10)res+=' و'+ones[last%10]}
  else if(last>0)res+=ones[last];
  res+=' دينار ليبي';if(dec>0)res+=` و ${dec} درهم`;
  return'فقط '+res.trim()+' لا غير'
}

/* ═══ CDN DEPENDENCY CHECK ═══ */
function checkDependencies(){
  const missing=[];
  if(typeof Chart==='undefined')missing.push('Chart.js');
  if(typeof XLSX==='undefined')missing.push('XLSX');
  if(typeof JsBarcode==='undefined')missing.push('JsBarcode');
  if(missing.length){
    const msg='فشل تحميل: '+missing.join(', ')+'. بعض الوظائف قد لا تعمل.';
    console.warn(msg);
    setTimeout(()=>toast(msg,'warning',{duration:8000}),3000);
  }
}

/* ═══ INIT ═══ */
async function initApp(){
  try {
    checkDependencies();
    loadTheme();
    loadState();
    if(localStorage.getItem(AUTH_TOKEN_KEY)){
      await validateToken();
      await fetchUsersFromApi();
    }
    renderCurrentUser();
    renderCompany();
    if(!currentUser){
      showLogin();
    } else {
      hideLogin();
      updateStats();renderDash();
    }
    G('clock').textContent=new Date().toLocaleTimeString('ar',{hour:'2-digit',minute:'2-digit'});
    renderNotifications();
  } catch(e){
    console.error('initApp error',e);
    toast('حدث خطأ أثناء تهيئة التطبيق','error');
  } finally {
    const splash=G('app-loading');
    if(splash){splash.style.opacity='0';setTimeout(()=>splash.remove(),350)}
  }
}
initApp();

/* ═══ NOTIFICATION CENTER ═══ */
function renderNotifications(){
  const alerts=[];
  DB.items.filter(x=>x.qty<=x.reorder).forEach(x=>{
    alerts.push({icon:'ti ti-alert-triangle',color:'var(--amber)',text:`${x.name}: رصيد منخفض (${x.qty})`,page:'inventory'});
  });
  DB.invs.filter(x=>invRemaining(x)>0.001).slice(0,3).forEach(x=>{
    alerts.push({icon:'ti ti-clock',color:'var(--red)',text:`فاتورة ${x.num}: متبقي ${fmt(invRemaining(x))}`,page:'sales'});
  });
  const badge=G('notif-badge');
  if(badge){
    if(alerts.length>0){badge.style.display='flex';badge.textContent=alerts.length}
    else{badge.style.display='none'}
  }
  const panel=G('notif-panel');
  if(!panel)return;
  if(!alerts.length){panel.innerHTML='<div style="padding:20px;text-align:center;color:var(--text-muted);font-size:12px"><i class="ti ti-bell" style="font-size:24px;display:block;margin-bottom:6px;color:var(--text-muted)"></i>لا توجد إشعارات</div>';return}
  panel.innerHTML=`<div style="padding:8px 12px;font-size:11px;font-weight:700;color:var(--text-muted);border-bottom:1px solid var(--border)">الإشعارات (${alerts.length})</div>`+alerts.map(a=>`<div style="padding:8px 12px;cursor:pointer;border-bottom:1px solid var(--border);font-size:12px;display:flex;align-items:center;gap:8px" onmouseenter="this.style.background='var(--bg-hover)'" onmouseleave="this.style.background=''" onclick="showPage('${a.page}');toggleNotifPanel()"><i class="${a.icon}" style="color:${a.color};font-size:14px;flex-shrink:0"></i>${a.text}</div>`).join('');
}
function toggleNotifPanel(){
  const panel=G('notif-panel');
  if(!panel)return;
  panel.style.display=panel.style.display==='none'?'block':'none';
  if(panel.style.display==='block')renderNotifications();
}
