import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  UtensilsCrossed,
  LayoutGrid,
  Wallet,
  Users,
  BarChart3,
  Video,
  Globe,
  Mic,
  MicOff,
  Send,
  Printer,
  Plus,
  Minus,
  Trash2,
  FileText,
  Camera,
  CheckCircle2,
  Search,
  Upload,
  Volume2,
  Copy,
  Sparkles,
  ScanBarcode,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  X,
} from 'lucide-react';
import {
  LEGAL_ENTITY,
  MENU_CATEGORIES,
  INITIAL_MENU,
  INITIAL_TABLES,
  INITIAL_FINANCIALS,
  INITIAL_STAFF,
  INITIAL_CUSTOMERS,
  INITIAL_CAMERAS,
  SUPPLY_BARCODE_CATALOG,
  Lang,
  MenuItem,
  FloorTable,
  FinancialRecord,
  StaffMember,
  CustomerProfile,
  CameraFeed,
  SupplyBarcodeItem,
} from './data/groznyData';

type ActiveModule =
  | 'pos'
  | 'floor'
  | 'financials'
  | 'hr'
  | 'analytics'
  | 'cctv'
  | 'integrations';

interface CartItem {
  item: MenuItem;
  qty: number;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

// Complete 100% Trilingual Dictionary for every label, header, button, and status
const DICT = {
  ar: {
    brandTitle: 'غروزني سيرف كلاود | GROZNY ERP',
    pos: 'نقطة البيع والمنيو',
    floor: 'الصالة والطاولات',
    financials: 'الصادر والوارد (P&L)',
    hr: 'الرواتب والموظفين',
    analytics: 'إحصائيات الزبائن والأطعمة',
    cctv: 'كاميرات المراقبة',
    integrations: 'الربط السحابي والدومين',
    searchDishPlaceholder: 'ابحث باسم الطبق أو امسح الباركود (مثال: 6291001100018)...',
    barcodeQuickScan: 'إدخال / مسح باركود سريع',
    scanAddBtn: 'إضافة بالباركود',
    totalItems: 'عدد الأصناف',
    detRule14: 'ممتثل للبند 14 و 16 (5% VAT)',
    frozen1kgBadge: 'عبوة مجمدة 1 كغ',
    costLabel: 'التكلفة',
    marginLabel: 'الربح',
    stockLabel: 'المخزون',
    recipeBtn: 'بطاقة التكلفة (Recipe)',
    addToOrderBtn: 'إضافة للطلب',
    techCardTitle: 'بطاقة التصنيع والتكلفة المعيارية (Syrve Tech Card)',
    salePriceIncVat: 'سعر البيع شامل الضريبة',
    rawFoodCost: 'تكلفة المواد الخام',
    prepTime: 'زمن التحضير',
    minutes: 'دقيقة',
    closeBtn: 'إغلاق',
    qtyLabel: 'الكمية',
    orderTicket: 'فاتورة الطلب الضريبية (5% VAT)',
    selectTable: 'الطاولة / نوع الطلب',
    paymentMethodLabel: 'طريقة الدفع',
    payCard: 'بطاقة Card',
    payCash: 'نقدي Cash',
    emptyCartMsg: 'لا توجد أصناف في الفاتورة الحالية. اضغط على أي طبق أو امسح الباركود لإضافته.',
    subtotalExVat: 'المجموع قبل الضريبة',
    vat5: 'ضريبة القيمة المضافة (5% VAT)',
    totalIncVat: 'الإجمالي شامل الضريبة (AED)',
    foodCostLabel: 'تكلفة المواد (Food Cost)',
    grossMargin: 'هامش الربح التشغيلي',
    completeOrder: 'اعتماد الفاتورة وترحيل للوارد',
    printReceipt: 'طباعة فاتورة ضريبية',
    // Floor module
    floorTitle: 'خريطة صالة مطعم غروزني والطاولات الحية (DAMAC Park Central - Business Bay)',
    floorSubtitle: 'اضغط على أي طاولة لفتح طلب جديد عليها في الكاشير أو لتغيير حالتها أو إغلاق حسابها.',
    occupiedCount: 'الطاولات المشغولة',
    openBillsTotal: 'إجمالي الفواتير المفتوحة',
    statusLabel: 'الحالة',
    statusOccupied: 'مشغولة الآن',
    statusReserved: 'محجوزة',
    statusAvailable: 'متاحة',
    seatsLabel: 'المقاعد',
    waiterLabel: 'المسؤول',
    guestLabel: 'الضيف',
    openedAtLabel: 'وقت الفتح',
    currentBalance: 'الرصيد الحالي',
    openInPosBtn: 'فتح في الكاشير',
    clearTableBtn: 'إخلاء الطاولة',
    // Financials module
    incomeTotal: 'إجمالي الوارد (المبيعات)',
    incomeSub: 'مبيعات الصالة + التوصيل + موقع groznyrest.com',
    expensesTotal: 'إجمالي الصادر (المشتريات والمصاريف)',
    expensesSub: 'مشتريات اللحوم والأجبان + فواتير DEWA والتشغيل',
    netProfit: 'صافي الربح التشغيلي',
    netProfitSub: 'الربح الصافي بعد خصم المصاريف التشغيلية',
    vatPayable: 'حصيلة ضريبة 5% المستحقة',
    addRecordTitle: 'إدخال حركة مالية أو مورد (بالباركود أو يدوياً)',
    scanInvoiceAi: 'مسح فاتورة بالذكاء الاصطناعي',
    scanning: 'جاري المسح...',
    recordExpenseBtn: 'تسجيل صادر (Expense)',
    recordIncomeBtn: 'تسجيل وارد (Income)',
    barcodeSupplyLabel: 'مسح أو اختيار باركود المورد / الصنف السريع',
    barcodeInputPlaceholder: 'امسح الباركود هنا (مثال: 6297000901121)...',
    finCategoryLabel: 'البند / التصنيف',
    catMeat: 'توريد لحوم ودواجن طازجة',
    catDairy: 'أجبان قوقازية وألبان وسميتانا',
    catGroceries: 'خضروات ومواد غذائية جافة',
    catUtilities: 'فواتير ديوا والغاز والبلدية',
    catPackaging: 'عبوات تغليف المجمدات والسفري',
    catCatering: 'إيراد حفلات وطلبات خاصة',
    descLabel: 'البيان والتفاصيل',
    descPlaceholder: 'مثال: شراء 20 كغ لحم بقري طازج للغالوشكي...',
    amountLabel: 'المبلغ بالدرهم (AED)',
    supplierStaffLabel: 'المورد / المسؤول',
    supplierPlaceholder: 'اسم المورد أو الموظف',
    saveLedgerBtn: 'حفظ وترحيل في الدفتر المالي',
    ledgerTableTitle: 'دفتر الأستاذ العام لحركة الصادر والوارد (Syrve Financial Ledger)',
    filterAll: 'الكل',
    filterIncome: 'الوارد (+)',
    filterExpense: 'الصادر (-)',
    colRefDate: 'المرجع والتاريخ',
    colTypeCat: 'النوع والتصنيف',
    colDesc: 'البيان',
    colPartyPay: 'الجهة / الدفع',
    colVat: 'الضريبة 5%',
    colAmount: 'المبلغ (AED)',
    inflowTag: 'وارد (+)',
    outflowTag: 'صادر (-)',
    // HR module
    payrollTitle: 'مسير الرواتب، الإجازات، السلف والخصومات',
    payrollSub: 'إدارة الرواتب الأساسية، الإضافي، الإكراميات، السلف، الخصومات، ورصيد الإجازات السنوية.',
    totalNetPayrollLabel: 'إجمالي مسير الرواتب الصافي المستحق هذا الشهر',
    staffAdjustFormTitle: 'تسجيل خصم / سلفة / مكافأة / إجازة لموظف',
    selectStaffLabel: 'اختر الموظف',
    actionTypeLabel: 'نوع الإجراء',
    actDeduction: 'خصم / جزاء (-)',
    actAdvance: 'سلفة راتب (-)',
    actBonus: 'مكافأة / إضافي (+)',
    actLeave: 'تسجيل أيام إجازة',
    leaveDaysLabel: 'عدد أيام الإجازة',
    reasonLabel: 'السبب / الملاحظة الإدارية',
    reasonPlaceholder: 'مثال: تأخر صباحي أو سلفة نقدية...',
    applyPayrollBtn: 'اعتماد وتحديث مسير الرواتب',
    colStaffRole: 'الموظف والوظيفة',
    colAttendanceLeave: 'الحضور والإجازات',
    colBaseSalary: 'الأساسي',
    colBonusOvertime: 'الإضافي والمكافآت',
    colAdvancesDeduct: 'السلف والخصومات',
    colNetSalary: 'صافي الراتب المستحق',
    leavesCountLabel: 'الإجازات',
    daysUnit: 'يوم',
    statusOnShift: 'على رأس العمل',
    statusOnLeave: 'في إجازة',
    statusOffDuty: 'خارج الوردية',
    statusLate: 'متأخر',
    // Analytics module
    menuMatrixTitle: 'تحليل هندسة المنيو وربحية الأطباق (Syrve Menu Engineering Matrix)',
    menuMatrixSub: 'ترتيب أطباق مطعم غروزني حسب عدد الطلبات، تكلفة الوجبة (Food Cost)، وصافي الربح المحقق.',
    colDish: 'الطبق',
    colOrders: 'الطلبات',
    colPrice: 'السعر',
    colCost: 'التكلفة',
    colTotalProfit: 'إجمالي الربح',
    colClass: 'التصنيف',
    starDish: '★ طبق نجم (Star)',
    coreDish: 'طبق أساسي (Core)',
    crmTitle: 'إحصائيات الزبائن الدائمين وكبار العملاء (VIP Guests CRM)',
    crmSub: 'سجل ولاء العملاء، عدد الزيارات، والأطباق القوقازية المفضلة لكل عميل.',
    favDishLabel: 'الطبق المفضل',
    visitsLabel: 'الزيارات',
    tierLabel: 'الفئة',
    lastVisitLabel: 'آخر زيارة',
    // CCTV module
    liveCctvTitle: 'مركز المراقبة الذكي المرتبط بالكاشير (Syrve CCTV)',
    liveCctvSub: 'ربط فوري بدون تعقيد مع كاميرات المطعم (RTSP / HLS / IP) أو تشغيل كاميرا الجهاز الحية مباشرة.',
    activateLocalCam: 'تشغيل الكاميرا الحية المباشرة',
    stopLocalCam: 'إيقاف البث الحي للكاميرا',
    aiVisionReportLabel: 'تقرير الفحص الذكي (AI Vision):',
    aiInspectCam: 'فحص الجودة بالذكاء الاصطناعي',
    analyzing: 'جاري التحليل...',
    addCamera: 'ربط كاميرا جديدة (بخطوة واحدة)',
    camNameLabel: 'اسم الكاميرا ومكانها',
    camNamePlaceholder: 'مثال: كاميرا 05 — ركن الشوي القوقازي',
    camUrlLabel: 'رابط البث المباشر (RTSP / HLS m3u8 / HTTP)',
    camZoneLabel: 'ربط بمنطقة الكاشير / المطبخ',
    linkCameraNowBtn: 'ربط الكاميرا وعرضها فوراً',
    posSecurityLogTitle: 'سجل أحداث الكاشير المرتبط بتوقيت الكاميرات (POS Video Tagging)',
    logEvent1: 'فتح درج النقدية — فاتورة #8840',
    logSub1: 'CAM 01 · الكاشير: رسلان',
    logEvent2: 'تسليم طلب توصيل ويب #0419',
    logSub2: 'CAM 04 · بوابة التوصيل',
    logEvent3: 'استلام توريد لحوم طازجة (1,420 AED)',
    logSub3: 'CAM 03 · باب المستودع',
    // Integrations module
    integrationsTitle: 'بوابة الربط السحابي الشامل والدومين الرسمي (groznyrest.com & Google Cloud)',
    integrationsSub: 'نقاط الربط الجاهزة في جميع الاتجاهات (دومين الزبون الحالي، Google Cloud Run، وWebhook الطلبات).',
    subdomainTitle: '1. ربط الدومين الحالي للمطعم (Subdomain Mapping: erp.groznyrest.com)',
    subdomainDesc: 'بما أن العميل يملك النطاق groznyrest.com، يمكن ربط هذا النظام مجاناً دون شراء دومين جديد عبر إضافة سجل CNAME:',
    webhookTitle: '2. نقطة ربط طلبات الموقع الإلكتروني (groznyrest.com Live Webhook)',
    webhookDesc: 'يستقبل هذا المسار الطلبات الأونلاين من موقع المطعم ويدرجها تلقائياً في الكاشير وسجل الوارد:',
    copyApiBtn: 'نسخ رابط الـ API',
    copiedText: 'تم النسخ!',
    cloudLayersTitle: '3. طبقات سحابة جوجل المفعلة (Google Cloud Architecture Layers)',
    layer1Title: 'طبقة العرض (Frontend SPA)',
    layer2Title: 'طبقة الخادم (Cloud Run API)',
    layer3Title: 'طبقة الذكاء (Gemini AI Layer)',
    layer4Title: 'طبقة البيانات السحابية',
    licenseCardTitle: 'بيانات الرخصة التجارية الرسمية (دائرة الاقتصاد والسياحة - دبي)',
    licenseCardSub: 'وثيقة الرخصة المعتمدة رقم 1166167 المدمجة في النظام',
    openPdfBtn: 'فتح PDF الرخصة',
    tradeNameLabel: 'الاسم التجاري:',
    licenseRegLabel: 'رقم الرخصة / السجل التجاري:',
    ownerManagerLabel: 'المالك والمدير (100%):',
    expiryDateLabel: 'تاريخ الانتهاء:',
    activeStatus: 'فعالة (Active)',
    locationLabel: 'الموقع:',
    // Compact Chat Box
    aiWidgetHeader: 'مساعد غروزني الذكي (صوتي / كتابي)',
    aiPlaceholder: 'اكتب أو تحدث بأمرك (عربي / EN / RU)...',
    aiWelcome: 'مرحباً! يمكنك كتابة أي أمر أو الضغط على الميكروفون للتحدث مباشرة (مثل: سجل مصروف 300 درهم لحوم، أو افتح كاميرا المطبخ).',
  },
  en: {
    brandTitle: 'GROZNY SYRVE CLOUD ERP',
    pos: 'Smart POS & Menu',
    floor: 'Floor & Tables',
    financials: 'Income & Expenses',
    hr: 'HR & Payroll',
    analytics: 'CRM & Menu Matrix',
    cctv: 'Live CCTV Hub',
    integrations: 'Domain & Cloud Sync',
    searchDishPlaceholder: 'Search dish name or scan barcode (e.g. 6291001100018)...',
    barcodeQuickScan: 'Fast Barcode Scan / SKU Input',
    scanAddBtn: 'Scan & Add',
    totalItems: 'Total Items',
    detRule14: 'DET Rule #14 & #16 Compliant (5% VAT)',
    frozen1kgBadge: '1kg Frozen Pack',
    costLabel: 'Cost',
    marginLabel: 'Margin',
    stockLabel: 'Stock',
    recipeBtn: 'Tech Card (Recipe)',
    addToOrderBtn: 'Add to Order',
    techCardTitle: 'Standard Recipe & Food Cost Tech Card (Syrve)',
    salePriceIncVat: 'Sale Price (Incl. VAT)',
    rawFoodCost: 'Raw Food Cost',
    prepTime: 'Prep Time',
    minutes: 'min',
    closeBtn: 'Close',
    qtyLabel: 'Qty',
    orderTicket: 'Active Tax Invoice (UAE 5% VAT)',
    selectTable: 'Table / Order Mode',
    paymentMethodLabel: 'Payment Method',
    payCard: 'Card (Network)',
    payCash: 'Cash',
    emptyCartMsg: 'No items in current ticket. Click any dish or scan a barcode to add.',
    subtotalExVat: 'Subtotal (Excl. VAT)',
    vat5: 'UAE VAT (5% Inclusive)',
    totalIncVat: 'Total Payable (AED)',
    foodCostLabel: 'Recipe Food Cost',
    grossMargin: 'Operating Margin',
    completeOrder: 'Settle & Post to Ledger',
    printReceipt: 'Print Tax Invoice',
    // Floor module
    floorTitle: 'Grozny Restaurant Live Floor Plan & Tables (DAMAC Park Central - Business Bay)',
    floorSubtitle: 'Select any table to open a POS order, inspect active bill, or clear table status.',
    occupiedCount: 'Occupied Tables',
    openBillsTotal: 'Open Table Bills',
    statusLabel: 'Status',
    statusOccupied: 'Occupied',
    statusReserved: 'Reserved',
    statusAvailable: 'Available',
    seatsLabel: 'Seats',
    waiterLabel: 'Waiter',
    guestLabel: 'Guest',
    openedAtLabel: 'Opened At',
    currentBalance: 'Current Bill',
    openInPosBtn: 'Open in POS',
    clearTableBtn: 'Clear Table',
    // Financials module
    incomeTotal: 'Total Income (Inflow)',
    incomeSub: 'Dine-In POS + Delivery + groznyrest.com Online',
    expensesTotal: 'Total Expenses (Outflow)',
    expensesSub: 'Halal Meat & Dairy Supplies + DEWA & Operations',
    netProfit: 'Net Operating Profit',
    netProfitSub: 'Net profit after operating expenses',
    vatPayable: '5% UAE VAT Collected',
    addRecordTitle: 'Log Financial Entry or Supply (via Barcode or Manual)',
    scanInvoiceAi: 'AI Invoice OCR Scan',
    scanning: 'Scanning...',
    recordExpenseBtn: 'Log Expense (Outflow)',
    recordIncomeBtn: 'Log Income (Inflow)',
    barcodeSupplyLabel: 'Fast Supply Barcode Scan / Preset Select',
    barcodeInputPlaceholder: 'Scan or enter supply barcode (e.g. 6297000901121)...',
    finCategoryLabel: 'Category / Account',
    catMeat: 'Raw Meat & Poultry Supply',
    catDairy: 'Dairy, Caucasian Cheese & Smetana',
    catGroceries: 'Vegetables & Dry Groceries',
    catUtilities: 'DEWA Utilities, Gas & Municipality',
    catPackaging: 'Vacuum Freezer Bags & Takeaway Packaging',
    catCatering: 'Special Events & Catering Income',
    descLabel: 'Description & Details',
    descPlaceholder: 'e.g. 20kg Fresh Halal Angus Beef for Galushki...',
    amountLabel: 'Amount (AED)',
    supplierStaffLabel: 'Supplier / Staff',
    supplierPlaceholder: 'Supplier company or staff name',
    saveLedgerBtn: 'Save & Post to Financial Ledger',
    ledgerTableTitle: 'General Income & Expense Ledger (Syrve P&L)',
    filterAll: 'All Entries',
    filterIncome: 'Income (+)',
    filterExpense: 'Expenses (-)',
    colRefDate: 'Ref & Date',
    colTypeCat: 'Type & Category',
    colDesc: 'Description',
    colPartyPay: 'Counterparty / Payment',
    colVat: '5% VAT',
    colAmount: 'Amount (AED)',
    inflowTag: 'INFLOW (+)',
    outflowTag: 'OUTFLOW (-)',
    // HR module
    payrollTitle: 'Staff Payroll, Leaves, Advances & Deductions',
    payrollSub: 'Manage base salaries, overtime, tips, advances, penalties, and annual leave balances.',
    totalNetPayrollLabel: 'Total Net Payable Payroll This Month',
    staffAdjustFormTitle: 'Log Staff Deduction / Advance / Bonus / Leave',
    selectStaffLabel: 'Select Staff Member',
    actionTypeLabel: 'Adjustment Type',
    actDeduction: 'Deduction / Fine (-)',
    actAdvance: 'Salary Advance (-)',
    actBonus: 'Bonus / Overtime (+)',
    actLeave: 'Log Leave Days',
    leaveDaysLabel: 'Number of Leave Days',
    reasonLabel: 'Reason / Managerial Note',
    reasonPlaceholder: 'e.g. Morning delay or cash advance...',
    applyPayrollBtn: 'Apply & Update Payroll Sheet',
    colStaffRole: 'Employee & Role',
    colAttendanceLeave: 'Attendance & Leaves',
    colBaseSalary: 'Base Salary',
    colBonusOvertime: 'Overtime & Tips',
    colAdvancesDeduct: 'Advances & Deductions',
    colNetSalary: 'Net Payable Salary',
    leavesCountLabel: 'Annual Leave',
    daysUnit: 'days',
    statusOnShift: 'On Shift',
    statusOnLeave: 'On Leave',
    statusOffDuty: 'Off Duty',
    statusLate: 'Late',
    // Analytics module
    menuMatrixTitle: 'Syrve Menu Engineering & Dish Profitability Matrix',
    menuMatrixSub: 'Grozny dishes ranked by order volume, recipe food cost, and total net contribution.',
    colDish: 'Dish Name',
    colOrders: 'Orders',
    colPrice: 'Price',
    colCost: 'Food Cost',
    colTotalProfit: 'Total Profit',
    colClass: 'Class',
    starDish: '★ Star Dish',
    coreDish: 'Core Item',
    crmTitle: 'VIP Guests & Loyalty Analytics (CRM)',
    crmSub: 'Customer retention, visit frequency, total spend, and favorite Caucasian dishes.',
    favDishLabel: 'Favorite Dish',
    visitsLabel: 'Visits',
    tierLabel: 'Tier',
    lastVisitLabel: 'Last Visit',
    // CCTV module
    liveCctvTitle: 'Smart Live CCTV & POS Event Surveillance Hub',
    liveCctvSub: 'Zero-headache camera linking (RTSP / HLS / IP) or instant live device WebRTC camera stream.',
    activateLocalCam: 'Start Live WebRTC Camera',
    stopLocalCam: 'Stop Live WebRTC Stream',
    aiVisionReportLabel: 'AI Vision Audit:',
    aiInspectCam: 'Run AI Hygiene & Occupancy Audit',
    analyzing: 'Analyzing...',
    addCamera: 'Link New Camera (1-Step Setup)',
    camNameLabel: 'Camera Name & Location',
    camNamePlaceholder: 'e.g. CAM 05 — Caucasian Grill Station',
    camUrlLabel: 'Live Stream URL (RTSP / HLS m3u8 / HTTP)',
    camZoneLabel: 'Link to POS / Kitchen Zone',
    linkCameraNowBtn: 'Link & Display Camera Immediately',
    posSecurityLogTitle: 'POS Event-Linked Security Timestamps',
    logEvent1: 'Cash Drawer Opened — Invoice #8840',
    logSub1: 'CAM 01 · Cashier: Ruslan M.',
    logEvent2: 'Web Order #0419 Handed to Courier',
    logSub2: 'CAM 04 · Delivery Pickup Gate',
    logEvent3: 'Fresh Halal Meat Supply Received (1,420 AED)',
    logSub3: 'CAM 03 · Storage Receiving Door',
    // Integrations module
    integrationsTitle: 'Multi-Directional Cloud & Official Domain Hub (groznyrest.com)',
    integrationsSub: 'Open connectors for client domain, Google Cloud Run, Firebase, and online order webhooks.',
    subdomainTitle: '1. Client Subdomain Mapping (erp.groznyrest.com)',
    subdomainDesc: 'Since the client owns groznyrest.com, connect this ERP for free via a single DNS CNAME record:',
    webhookTitle: '2. Live Website Order Webhook (groznyrest.com Sync)',
    webhookDesc: 'Receives online orders from groznyrest.com and posts them directly to POS and Income Ledger:',
    copyApiBtn: 'Copy Webhook URL',
    copiedText: 'Copied!',
    cloudLayersTitle: '3. Active Google Cloud Architecture Layers',
    layer1Title: 'Presentation Layer (SPA)',
    layer2Title: 'Backend API Layer (Cloud Run)',
    layer3Title: 'Intelligence Layer (Gemini AI)',
    layer4Title: 'Cloud Persistence Layer',
    licenseCardTitle: 'Official Dubai DET Commercial License (#1166167)',
    licenseCardSub: 'Verified legal entity metadata embedded in all receipts and reports',
    openPdfBtn: 'View Official License PDF',
    tradeNameLabel: 'Business Name:',
    licenseRegLabel: 'License / Register No:',
    ownerManagerLabel: 'Owner & Manager (100%):',
    expiryDateLabel: 'Expiry Date:',
    activeStatus: 'Active',
    locationLabel: 'Registered Address:',
    // Compact Chat Box
    aiWidgetHeader: 'Grozny AI Assistant (Voice & Text)',
    aiPlaceholder: 'Type or speak a command (AR / EN / RU)...',
    aiWelcome: 'Welcome! Type any command or click the mic to speak (e.g. "Log expense 300 AED beef" or "Open kitchen camera").',
  },
  ru: {
    brandTitle: 'GROZNY SYRVE ОБЛАКО ERP',
    pos: 'Касса POS и Меню',
    floor: 'Зал и Столы',
    financials: 'Доходы и Расходы',
    hr: 'Зарплата и Кадры',
    analytics: 'Аналитика и Гости',
    cctv: 'Камеры CCTV',
    integrations: 'Интеграция и Домен',
    searchDishPlaceholder: 'Поиск блюда или сканирование штрих-кода (напр. 6291001100018)...',
    barcodeQuickScan: 'Сканер штрих-кода / Быстрый ввод SKU',
    scanAddBtn: 'По штрих-коду',
    totalItems: 'Всего позиций',
    detRule14: 'Стандарт DET Дубай №14 и №16 (НДС 5%)',
    frozen1kgBadge: 'Заморозка 1 кг',
    costLabel: 'Себест.',
    marginLabel: 'Маржа',
    stockLabel: 'Остаток',
    recipeBtn: 'Техкарта (Recipe)',
    addToOrderBtn: 'В заказ',
    techCardTitle: 'Технологическая карта и себестоимость блюда (Syrve Tech Card)',
    salePriceIncVat: 'Цена продажи (с НДС 5%)',
    rawFoodCost: 'Себестоимость продуктов',
    prepTime: 'Время подачи',
    minutes: 'мин',
    closeBtn: 'Закрыть',
    qtyLabel: 'Кол-во',
    orderTicket: 'Налоговый чек заказа (НДС ОАЭ 5%)',
    selectTable: 'Стол / Тип заказа',
    paymentMethodLabel: 'Способ оплаты',
    payCard: 'Карта (Network)',
    payCash: 'Наличные (Cash)',
    emptyCartMsg: 'В чеке нет позиций. Нажмите на блюдо или отсканируйте штрих-код.',
    subtotalExVat: 'Сумма без НДС',
    vat5: 'НДС ОАЭ 5% (включен)',
    totalIncVat: 'Итого к оплате (AED)',
    foodCostLabel: 'Себестоимость (Food Cost)',
    grossMargin: 'Операционная маржа',
    completeOrder: 'Оплатить и провести в учет',
    printReceipt: 'Печать налогового чека',
    // Floor module
    floorTitle: 'Интерактивная карта зала ресторана «Грозный» (DAMAC Park Central - Business Bay)',
    floorSubtitle: 'Выберите стол для открытия заказа на кассе, проверки счета или освобождения стола.',
    occupiedCount: 'Занятые столы',
    openBillsTotal: 'Открытые счета',
    statusLabel: 'Статус',
    statusOccupied: 'Занят',
    statusReserved: 'Бронь',
    statusAvailable: 'Свободен',
    seatsLabel: 'Мест',
    waiterLabel: 'Официант',
    guestLabel: 'Гость',
    openedAtLabel: 'Открыт в',
    currentBalance: 'Текущий счет',
    openInPosBtn: 'Открыть в кассе',
    clearTableBtn: 'Освободить стол',
    // Financials module
    incomeTotal: 'Всего Доходов (Приход)',
    incomeSub: 'Продажи зала + Доставка + Сайт groznyrest.com',
    expensesTotal: 'Всего Расходов (Расход)',
    expensesSub: 'Закупка мяса Халяль и сыра + Счета DEWA',
    netProfit: 'Чистая Операционная Прибыль',
    netProfitSub: 'Чистая прибыль за вычетом расходов',
    vatPayable: 'НДС 5% к уплате',
    addRecordTitle: 'Ввод финансовой операции или прихода (Штрих-код / Вручную)',
    scanInvoiceAi: 'ИИ Сканер накладных',
    scanning: 'Сканирование...',
    recordExpenseBtn: 'Записать расход (-)',
    recordIncomeBtn: 'Записать доход (+)',
    barcodeSupplyLabel: 'Быстрое сканирование штрих-кода товара / поставщика',
    barcodeInputPlaceholder: 'Отсканируйте штрих-код поставки (напр. 6297000901121)...',
    finCategoryLabel: 'Категория / Статья учета',
    catMeat: 'Закупка свежего мяса и птицы Халяль',
    catDairy: 'Кавказский сыр, творог и сметана',
    catGroceries: 'Овощи, мука, рис и бакалея',
    catUtilities: 'Коммунальные услуги DEWA и муниципалитет',
    catPackaging: 'Вакуумная упаковка для заморозки и доставки',
    catCatering: 'Доход от банкетов и спецзаказов',
    descLabel: 'Описание операции',
    descPlaceholder: 'Напр.: Закупка 20 кг говядины Ангус для галушек...',
    amountLabel: 'Сумма в дирхамах (AED)',
    supplierStaffLabel: 'Поставщик / Сотрудник',
    supplierPlaceholder: 'Название поставщика или имя сотрудника',
    saveLedgerBtn: 'Сохранить и провести в книге учета',
    ledgerTableTitle: 'Главная книга учета доходов и расходов (Syrve P&L)',
    filterAll: 'Все записи',
    filterIncome: 'Доходы (+)',
    filterExpense: 'Расходы (-)',
    colRefDate: 'Номер и Дата',
    colTypeCat: 'Тип и Категория',
    colDesc: 'Описание',
    colPartyPay: 'Контрагент / Оплата',
    colVat: 'НДС 5%',
    colAmount: 'Сумма (AED)',
    inflowTag: 'ПРИХОД (+)',
    outflowTag: 'РАСХОД (-)',
    // HR module
    payrollTitle: 'Ведомость зарплаты, отпуска, авансы и штрафы сотрудников',
    payrollSub: 'Управление окладами, переработками, чаевыми, авансами, удержаниями и днями отпуска.',
    totalNetPayrollLabel: 'Итого к выплате персоналу за текущий месяц',
    staffAdjustFormTitle: 'Оформить удержание / аванс / премию / отпуск',
    selectStaffLabel: 'Выберите сотрудника',
    actionTypeLabel: 'Тип операции',
    actDeduction: 'Штраф / Удержание (-)',
    actAdvance: 'Аванс (-)',
    actBonus: 'Премия / Бонус (+)',
    actLeave: 'Оформить дни отпуска',
    leaveDaysLabel: 'Количество дней отпуска',
    reasonLabel: 'Причина / Примечание руководителя',
    reasonPlaceholder: 'Напр.: Опоздание на смену или выдача аванса...',
    applyPayrollBtn: 'Применить и обновить ведомость',
    colStaffRole: 'Сотрудник и Должность',
    colAttendanceLeave: 'Смена и Отпуск',
    colBaseSalary: 'Оклад',
    colBonusOvertime: 'Бонусы и Чаевые',
    colAdvancesDeduct: 'Авансы и Штрафы',
    colNetSalary: 'К выплате (Net)',
    leavesCountLabel: 'Отпуск',
    daysUnit: 'дн.',
    statusOnShift: 'На смене',
    statusOnLeave: 'В отпуске',
    statusOffDuty: 'Выходной',
    statusLate: 'Опоздание',
    // Analytics module
    menuMatrixTitle: 'Матрица маржинальности и популярности блюд (Syrve Menu Engineering)',
    menuMatrixSub: 'Рейтинг блюд ресторана «Грозный» по количеству заказов, себестоимости и чистой прибыли.',
    colDish: 'Блюдо',
    colOrders: 'Заказы',
    colPrice: 'Цена',
    colCost: 'Себест.',
    colTotalProfit: 'Общая прибыль',
    colClass: 'Категория',
    starDish: '★ Звезда меню (Star)',
    coreDish: 'Базовое блюдо (Core)',
    crmTitle: 'Аналитика постоянных и VIP гостей (CRM)',
    crmSub: 'История посещений, общая сумма чеков и любимые блюда кавказской кухни.',
    favDishLabel: 'Любимое блюдо',
    visitsLabel: 'Визитов',
    tierLabel: 'Статус',
    lastVisitLabel: 'Последний визит',
    // CCTV module
    liveCctvTitle: 'Центр видеонаблюдения и контроля кассовых операций (Syrve CCTV)',
    liveCctvSub: 'Быстрое подключение камер ресторана (RTSP / HLS / IP) или прямая трансляция с веб-камеры.',
    activateLocalCam: 'Включить живую веб-камеру',
    stopLocalCam: 'Остановить веб-камеру',
    aiVisionReportLabel: 'ИИ Аудит камеры (AI Vision):',
    aiInspectCam: 'ИИ Проверка чистоты и зала',
    analyzing: 'Анализ...',
    addCamera: 'Подключить новую камеру (в 1 шаг)',
    camNameLabel: 'Название и зона камеры',
    camNamePlaceholder: 'Напр.: КАМЕРА 05 — Мангал и гриль',
    camUrlLabel: 'Ссылка на поток (RTSP / HLS m3u8 / HTTP)',
    camZoneLabel: 'Привязка к зоне кассы / кухни',
    linkCameraNowBtn: 'Подключить и показать камеру',
    posSecurityLogTitle: 'Журнал событий кассы с привязкой к видео (POS Video Tagging)',
    logEvent1: 'Открытие денежного ящика — Чек #8840',
    logSub1: 'КАМЕРА 01 · Кассир: Руслан М.',
    logEvent2: 'Выдача веб-заказа #0419 курьеру',
    logSub2: 'КАМЕРА 04 · Зона выдачи доставки',
    logEvent3: 'Приемка поставки свежего мяса (1,420 AED)',
    logSub3: 'КАМЕРА 03 · Склад и морозильная камера',
    // Integrations module
    integrationsTitle: 'Центр облачной интеграции и домена (groznyrest.com & Google Cloud)',
    integrationsSub: 'Открытые шлюзы для домена клиента, Google Cloud Run, Firebase и вебхуков заказов.',
    subdomainTitle: '1. Подключение поддомена ресторана (erp.groznyrest.com)',
    subdomainDesc: 'Поскольку домен groznyrest.com принадлежит клиенту, система подключается бесплатно через запись CNAME:',
    webhookTitle: '2. Вебхук онлайн-заказов с сайта (groznyrest.com Live Webhook)',
    webhookDesc: 'Принимает заказы с сайта ресторана и автоматически передает их на кассу и в учет доходов:',
    copyApiBtn: 'Скопировать API URL',
    copiedText: 'Скопировано!',
    cloudLayersTitle: '3. Активные уровни облачной архитектуры Google Cloud',
    layer1Title: 'Уровень интерфейса (Frontend SPA)',
    layer2Title: 'Серверный уровень (Cloud Run API)',
    layer3Title: 'Интеллектуальный уровень (Gemini AI)',
    layer4Title: 'Облачная база данных',
    licenseCardTitle: 'Торговая лицензия Дубая DET (№ 1166167)',
    licenseCardSub: 'Официальные реквизиты компании, встроенные во все чеки и отчеты',
    openPdfBtn: 'Открыть PDF лицензии',
    tradeNameLabel: 'Название компании:',
    licenseRegLabel: 'Лицензия / Реестр №:',
    ownerManagerLabel: 'Владелец и Директор (100%):',
    expiryDateLabel: 'Срок действия до:',
    activeStatus: 'Активна (Active)',
    locationLabel: 'Юридический адрес:',
    // Compact Chat Box
    aiWidgetHeader: 'ИИ Ассистент Грозный (Голос / Чат)',
    aiPlaceholder: 'Введите или скажите команду (RU / EN / AR)...',
    aiWelcome: 'Здравствуйте! Напишите команду или нажмите на микрофон (например: «Запиши расход 300 дирхам на мясо» или «Открой камеру кухни»).',
  },
};

export default function App() {
  const [lang, setLang] = useState<Lang>('ar');
  const [activeTab, setActiveTab] = useState<ActiveModule>('pos');

  // Core Operational State
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [posSearch, setPosSearch] = useState('');
  const [posBarcodeInput, setPosBarcodeInput] = useState('');
  const [selectedTableId, setSelectedTableId] = useState<string>('t-1');
  const [paymentMethod, setPaymentMethod] = useState<'Card' | 'Cash'>('Card');
  const [cart, setCart] = useState<CartItem[]>([
    { item: INITIAL_MENU[0], qty: 2 },
    { item: INITIAL_MENU[4], qty: 2 },
    { item: INITIAL_MENU[10], qty: 1 },
  ]);
  const [inspectRecipeItem, setInspectRecipeItem] = useState<MenuItem | null>(null);

  // Tables State
  const [tables, setTables] = useState<FloorTable[]>(INITIAL_TABLES);

  // Financials State + Barcode Supply Scanner
  const [financials, setFinancials] = useState<FinancialRecord[]>(INITIAL_FINANCIALS);
  const [finFilter, setFinFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [newFinType, setNewFinType] = useState<'income' | 'expense'>('expense');
  const [newFinCategoryKey, setNewFinCategoryKey] = useState('meat');
  const [newFinBarcode, setNewFinBarcode] = useState('');
  const [newFinDesc, setNewFinDesc] = useState('');
  const [newFinAmount, setNewFinAmount] = useState('');
  const [newFinSupplier, setNewFinSupplier] = useState('');
  const [isScanningInvoice, setIsScanningInvoice] = useState(false);

  // HR & Payroll State
  const [staffList, setStaffList] = useState<StaffMember[]>(INITIAL_STAFF);
  const [selectedStaffId, setSelectedStaffId] = useState<string>(INITIAL_STAFF[1].id);
  const [adjustType, setAdjustType] = useState<'advance' | 'deduction' | 'bonus' | 'leave'>(
    'deduction'
  );
  const [adjustAmount, setAdjustAmount] = useState('');
  const [adjustReason, setAdjustReason] = useState('');

  // Customers State
  const [customers] = useState<CustomerProfile[]>(INITIAL_CUSTOMERS);

  // CCTV State
  const [cameras, setCameras] = useState<CameraFeed[]>(INITIAL_CAMERAS);
  const [focusedCamId, setFocusedCamId] = useState<string>('cam-1');
  const [newCamName, setNewCamName] = useState('');
  const [newCamUrl, setNewCamUrl] = useState('');
  const [newCamZoneKey, setNewCamZoneKey] = useState<'main' | 'kitchen' | 'storage' | 'terrace'>(
    'main'
  );
  const [isLiveWebcamActive, setIsLiveWebcamActive] = useState(false);
  const [isAuditingCam, setIsAuditingCam] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Compact Chat-Like AI Voice & Text Box State
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [lastNotification, setLastNotification] = useState<string | null>(null);
  const [copiedWebhook, setCopiedWebhook] = useState(false);

  const t = DICT[lang];
  const isRtl = lang === 'ar';

  const notify = (msg: string) => {
    setLastNotification(msg);
    setTimeout(() => {
      setLastNotification((prev) => (prev === msg ? null : prev));
    }, 5000);
  };

  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'ru' ? 'ru-RU' : lang === 'en' ? 'en-US' : 'ar-AE';
      utterance.rate = 1.02;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore speech synthesis errors on restricted browsers
    }
  };

  // Financial Metrics Calculations
  const finSummary = useMemo(() => {
    const totalIncome = financials
      .filter((f) => f.type === 'income')
      .reduce((acc, r) => acc + r.amountAED, 0);
    const totalExpense = financials
      .filter((f) => f.type === 'expense')
      .reduce((acc, r) => acc + r.amountAED, 0);
    const vatCollected = financials
      .filter((f) => f.type === 'income')
      .reduce((acc, r) => acc + r.vatAED, 0);
    const vatPaid = financials
      .filter((f) => f.type === 'expense')
      .reduce((acc, r) => acc + r.vatAED, 0);

    const totalPayrollNet = staffList.reduce(
      (acc, s) =>
        acc +
        (s.baseSalaryAED + s.overtimeAED + s.tipsBonusAED - s.advancesAED - s.deductionsAED),
      0
    );

    return {
      totalIncome,
      totalExpense,
      netOperatingProfit: totalIncome - totalExpense,
      netVatPayable: Math.max(0, vatCollected - vatPaid),
      totalPayrollNet,
    };
  }, [financials, staffList]);

  // Cart Calculations
  const cartSummary = useMemo(() => {
    const totalIncVat = cart.reduce((sum, c) => sum + c.item.price * c.qty, 0);
    const subtotalExVat = totalIncVat / (1 + LEGAL_ENTITY.vatRate);
    const vatAmount = totalIncVat - subtotalExVat;
    const totalFoodCost = cart.reduce((sum, c) => sum + c.item.foodCost * c.qty, 0);
    const grossMarginAED = subtotalExVat - totalFoodCost;
    const marginPercent = totalIncVat > 0 ? Math.round((grossMarginAED / totalIncVat) * 100) : 0;

    return {
      totalIncVat,
      subtotalExVat,
      vatAmount,
      totalFoodCost,
      grossMarginAED,
      marginPercent,
    };
  }, [cart]);

  // Filtered Menu (by category, name in any language, or barcode)
  const filteredMenu = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
      const q = posSearch.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.barcode.includes(q) ||
        item.name.ar.toLowerCase().includes(q) ||
        item.name.en.toLowerCase().includes(q) ||
        item.name.ru.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [menuItems, selectedCategory, posSearch]);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) => (c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c));
      }
      return [...prev, { item, qty: 1 }];
    });
  };

  // Fast POS Barcode Scan Handler
  const handlePosBarcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = posBarcodeInput.trim();
    if (!code) return;
    const found = menuItems.find(
      (m) => m.barcode === code || m.barcode.endsWith(code) || m.id === code
    );
    if (found) {
      addToCart(found);
      setPosBarcodeInput('');
      notify(
        lang === 'ar'
          ? `تم مسح الباركود (${found.barcode}) وإضافة: ${found.name.ar}`
          : lang === 'ru'
          ? `Штрих-код (${found.barcode}) отсканирован: добавлено ${found.name.ru}`
          : `Barcode (${found.barcode}) scanned: added ${found.name.en}`
      );
    } else {
      notify(
        lang === 'ar'
          ? 'لم يتم العثور على صنف بهذا الباركود، جرب 6291001100018'
          : lang === 'ru'
          ? 'Товар с таким штрих-кодом не найден (пример: 6291001100018)'
          : 'No dish found with this barcode (try 6291001100018)'
      );
    }
  };

  // Fast Supply Barcode Selection in Financials
  const handleSelectSupplyBarcode = (supplyItem: SupplyBarcodeItem) => {
    setNewFinType('expense');
    setNewFinBarcode(supplyItem.barcode);
    setNewFinCategoryKey(supplyItem.categoryKey);
    setNewFinDesc(supplyItem.name[lang]);
    setNewFinAmount(String(supplyItem.defaultCostAED));
    setNewFinSupplier(supplyItem.supplier[lang]);
    notify(
      lang === 'ar'
        ? `تم قراءة باركود المورد (${supplyItem.barcode}) وتعبئة بيانات الصنف تلقائياً!`
        : lang === 'ru'
        ? `Штрих-код (${supplyItem.barcode}) считан, поля заполнены автоматически!`
        : `Supply Barcode (${supplyItem.barcode}) scanned & fields auto-filled!`
    );
  };

  const handleManualBarcodeLookup = (code: string) => {
    setNewFinBarcode(code);
    const match = SUPPLY_BARCODE_CATALOG.find(
      (s) => s.barcode === code.trim() || s.barcode.endsWith(code.trim())
    );
    if (match) {
      handleSelectSupplyBarcode(match);
    }
  };

  const updateCartQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.item.id === id ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0)
    );
  };

  // Settle POS Order -> Trilingual Financial Record
  const handleSettleOrder = () => {
    if (cart.length === 0) return;
    const tableObj = tables.find((tb) => tb.id === selectedTableId);
    const now = new Date();
    const timeStr = now.toTimeString().slice(0, 5);

    const itemsAr = cart.map((c) => `${c.item.name.ar} ×${c.qty}`).join('، ');
    const itemsEn = cart.map((c) => `${c.item.name.en} x${c.qty}`).join(', ');
    const itemsRu = cart.map((c) => `${c.item.name.ru} x${c.qty}`).join(', ');

    const newRecord: FinancialRecord = {
      id: `fin-${Date.now()}`,
      barcode: cart[0]?.item.barcode || '6291001100018',
      date: now.toISOString().slice(0, 10),
      time: timeStr,
      type: 'income',
      category: {
        ar: 'مبيعات الصالة (POS)',
        en: 'Dine-In POS Sales',
        ru: 'Продажи в зале (POS)',
      },
      description: {
        ar: `${tableObj?.number || 'POS'}: ${itemsAr}`,
        en: `${tableObj?.number || 'POS'}: ${itemsEn}`,
        ru: `${tableObj?.number || 'POS'}: ${itemsRu}`,
      },
      paymentMethod:
        paymentMethod === 'Cash'
          ? { ar: 'نقدي (Cash)', en: 'Cash', ru: 'Наличные (Cash)' }
          : {
              ar: 'بطاقة بنكية (Network)',
              en: 'Card (Network)',
              ru: 'Банковская карта (Network)',
            },
      amountAED: Number(cartSummary.totalIncVat.toFixed(2)),
      vatAED: Number(cartSummary.vatAmount.toFixed(2)),
      staffOrSupplier: tableObj?.waiter || {
        ar: 'رسلان م.',
        en: 'Ruslan M.',
        ru: 'Руслан М.',
      },
      invoiceRef: `INV-GRZ-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    setFinancials((prev) => [newRecord, ...prev]);

    setMenuItems((prev) =>
      prev.map((m) => {
        const inCart = cart.find((c) => c.item.id === m.id);
        if (!inCart) return m;
        return {
          ...m,
          ordersCount: m.ordersCount + inCart.qty,
          stockPortions: Math.max(0, m.stockPortions - inCart.qty),
        };
      })
    );

    setTables((prev) =>
      prev.map((tb) =>
        tb.id === selectedTableId
          ? {
              ...tb,
              status: 'occupied',
              openedAt: tb.openedAt || timeStr,
              currentTotalAED: tb.currentTotalAED + cartSummary.totalIncVat,
            }
          : tb
      )
    );

    setCart([]);
    notify(
      lang === 'ar'
        ? `تم اعتماد الفاتورة (${newRecord.invoiceRef}) بمبلغ ${newRecord.amountAED} درهم وترحيلها للوارد.`
        : lang === 'ru'
        ? `Чек ${newRecord.invoiceRef} (${newRecord.amountAED} AED) оплачен и проведен в систему.`
        : `Invoice ${newRecord.invoiceRef} (${newRecord.amountAED} AED) settled and posted to Ledger.`
    );
  };

  // Manual / Barcode Financial Entry Handler (Trilingual)
  const handleAddFinancialRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(newFinAmount);
    if (!amount || amount <= 0 || !newFinDesc.trim()) return;

    const categoryMap: Record<string, Record<Lang, string>> = {
      meat: {
        ar: DICT.ar.catMeat,
        en: DICT.en.catMeat,
        ru: DICT.ru.catMeat,
      },
      dairy: {
        ar: DICT.ar.catDairy,
        en: DICT.en.catDairy,
        ru: DICT.ru.catDairy,
      },
      groceries: {
        ar: DICT.ar.catGroceries,
        en: DICT.en.catGroceries,
        ru: DICT.ru.catGroceries,
      },
      utilities: {
        ar: DICT.ar.catUtilities,
        en: DICT.en.catUtilities,
        ru: DICT.ru.catUtilities,
      },
      packaging: {
        ar: DICT.ar.catPackaging,
        en: DICT.en.catPackaging,
        ru: DICT.ru.catPackaging,
      },
      catering: {
        ar: DICT.ar.catCatering,
        en: DICT.en.catCatering,
        ru: DICT.ru.catCatering,
      },
    };

    const vat = Number((amount - amount / (1 + LEGAL_ENTITY.vatRate)).toFixed(2));
    const now = new Date();
    const textVal = newFinDesc.trim();
    const supVal = newFinSupplier.trim() || 'Grozny ERP';

    const record: FinancialRecord = {
      id: `fin-${Date.now()}`,
      barcode: newFinBarcode.trim() || `629700${Math.floor(100000 + Math.random() * 899999)}`,
      date: now.toISOString().slice(0, 10),
      time: now.toTimeString().slice(0, 5),
      type: newFinType,
      category: categoryMap[newFinCategoryKey] || categoryMap.meat,
      description: { ar: textVal, en: textVal, ru: textVal },
      paymentMethod: {
        ar: 'نقدي / تحويل',
        en: 'Cash / Transfer',
        ru: 'Наличные / Перевод',
      },
      amountAED: amount,
      vatAED: vat,
      staffOrSupplier: { ar: supVal, en: supVal, ru: supVal },
      invoiceRef: `${newFinType === 'income' ? 'INC' : 'EXP'}-${Math.floor(
        1000 + Math.random() * 9000
      )}`,
    };

    setFinancials((prev) => [record, ...prev]);
    setNewFinBarcode('');
    setNewFinDesc('');
    setNewFinAmount('');
    setNewFinSupplier('');
    notify(
      lang === 'ar'
        ? `تم حفظ العملية (${record.invoiceRef}) بقيمة ${amount} درهم.`
        : lang === 'ru'
        ? `Запись (${record.invoiceRef}) на сумму ${amount} AED сохранена.`
        : `Entry (${record.invoiceRef}) for ${amount} AED saved.`
    );
  };

  // AI Supplier Invoice OCR Upload
  const handleInvoiceImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsScanningInvoice(true);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = (reader.result as string).split(',')[1];
        const response = await fetch('/api/ai/vision-audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mode: 'invoice',
            imageBase64: base64Data,
            mimeType: file.type || 'image/jpeg',
            contextNote: file.name,
          }),
        });
        const data = await response.json();
        if (data && data.totalAmountAED) {
          const now = new Date();
          const descStr = data.description || `OCR Invoice (${file.name})`;
          const supStr = data.supplier || 'Dubai Supplier LLC';
          const newRec: FinancialRecord = {
            id: `fin-${Date.now()}`,
            barcode: '6297009998881',
            date: now.toISOString().slice(0, 10),
            time: now.toTimeString().slice(0, 5),
            type: 'expense',
            category: {
              ar: 'فاتورة مشتريات ممسوحة ذكياً (AI OCR)',
              en: 'AI Scanned Supply Invoice',
              ru: 'Накладная (ИИ Сканер)',
            },
            description: { ar: descStr, en: descStr, ru: descStr },
            paymentMethod: {
              ar: 'تحويل بنكي',
              en: 'Bank Transfer',
              ru: 'Банковский перевод',
            },
            amountAED: Number(data.totalAmountAED),
            vatAED: Number(data.vatAmountAED || (data.totalAmountAED * 0.05).toFixed(2)),
            staffOrSupplier: { ar: supStr, en: supStr, ru: supStr },
            invoiceRef: `OCR-${Math.floor(1000 + Math.random() * 9000)}`,
          };
          setFinancials((prev) => [newRec, ...prev]);
          notify(
            lang === 'ar'
              ? `تم قراءة الفاتورة بالذكاء الاصطناعي وإضافة ${newRec.amountAED} درهم إلى الصادر!`
              : lang === 'ru'
              ? `Накладная распознана ИИ: расход ${newRec.amountAED} AED добавлен!`
              : `Invoice scanned via AI: ${newRec.amountAED} AED added to Expenses!`
          );
        }
        setIsScanningInvoice(false);
      };
      reader.readAsDataURL(file);
    } catch {
      setIsScanningInvoice(false);
    }
  };

  // HR Payroll & Leave Adjustment
  const handleApplyStaffAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(adjustAmount);
    if (!val || val <= 0) return;

    const noteText = adjustReason.trim();

    setStaffList((prev) =>
      prev.map((s) => {
        if (s.id !== selectedStaffId) return s;
        if (adjustType === 'advance') {
          return { ...s, advancesAED: s.advancesAED + val };
        }
        if (adjustType === 'deduction') {
          return {
            ...s,
            deductionsAED: s.deductionsAED + val,
            deductionReason: noteText
              ? { ar: noteText, en: noteText, ru: noteText }
              : s.deductionReason || {
                  ar: 'خصم إداري',
                  en: 'Administrative deduction',
                  ru: 'Административное удержание',
                },
          };
        }
        if (adjustType === 'bonus') {
          return { ...s, tipsBonusAED: s.tipsBonusAED + val };
        }
        if (adjustType === 'leave') {
          return {
            ...s,
            annualLeaveUsed: Math.min(s.annualLeaveTotal, s.annualLeaveUsed + Math.round(val)),
            attendanceStatus: 'On Leave',
          };
        }
        return s;
      })
    );

    setAdjustAmount('');
    setAdjustReason('');
    notify(
      lang === 'ar'
        ? 'تم تحديث ملف الموظف ومسير الرواتب بنجاح.'
        : lang === 'ru'
        ? 'Данные сотрудника и зарплатная ведомость обновлены.'
        : 'Staff record and payroll sheet updated.'
    );
  };

  // Live WebRTC Camera Toggle
  const toggleLocalWebcam = async () => {
    if (isLiveWebcamActive) {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((tr) => tr.stop());
        mediaStreamRef.current = null;
      }
      setIsLiveWebcamActive(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: false,
      });
      mediaStreamRef.current = stream;
      setIsLiveWebcamActive(true);
      setFocusedCamId('cam-4');
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 150);
    } catch {
      notify(
        lang === 'ar'
          ? 'يرجى السماح بصلاحية الكاميرا في المتصفح لعرض البث المباشر.'
          : lang === 'ru'
          ? 'Разрешите доступ к камере в браузере.'
          : 'Please allow camera permission in your browser.'
      );
    }
  };

  useEffect(() => {
    if (isLiveWebcamActive && videoRef.current && mediaStreamRef.current) {
      videoRef.current.srcObject = mediaStreamRef.current;
    }
  }, [isLiveWebcamActive, focusedCamId, activeTab]);

  // Add New Camera Link
  const handleAddCamera = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCamName.trim() || !newCamUrl.trim()) return;

    const zoneLabels: Record<typeof newCamZoneKey, Record<Lang, string>> = {
      main: { ar: 'الصالة والكاشير', en: 'Main Hall & POS', ru: 'Главный зал и Касса' },
      kitchen: { ar: 'المطبخ الساخن', en: 'Hot Kitchen Line', ru: 'Горячий цех кухни' },
      storage: { ar: 'المستودع والمجمدات', en: 'Storage & Freezers', ru: 'Склад и Заморозка' },
      terrace: { ar: 'التراس الخارجي', en: 'Business Bay Terrace', ru: 'Терраса Business Bay' },
    };

    const nameVal = newCamName.trim();
    const newCam: CameraFeed = {
      id: `cam-${Date.now()}`,
      name: { ar: nameVal, en: nameVal, ru: nameVal },
      zone: zoneLabels[newCamZoneKey],
      protocol: newCamUrl.startsWith('rtsp') ? 'HLS / RTSP Cloud' : 'HTTP Snapshot / Embed',
      streamUrl: newCamUrl.trim(),
      status: 'recording',
      posLinkedZone: zoneLabels[newCamZoneKey],
      lastAiAudit: {
        ar: 'تم ربط الكاميرا بنجاح — البث مستقر وجاهز للفحص الذكي',
        en: 'Camera linked successfully — Stream stable & ready for AI inspection',
        ru: 'Камера успешно подключена — Поток стабилен',
      },
      previewImage:
        'https://npnomtfwmlodmlikkkrs.supabase.co/storage/v1/object/public/menu-images/homepage/1784666666813-grozny.jpg',
    };

    setCameras((prev) => [...prev, newCam]);
    setFocusedCamId(newCam.id);
    setNewCamName('');
    setNewCamUrl('');
  };

  // AI Vision Audit on Focused Camera
  const handleAiAuditCamera = async (cam: CameraFeed) => {
    setIsAuditingCam(true);
    try {
      const response = await fetch('/api/ai/vision-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'camera',
          contextNote: `${cam.name[lang]} (${cam.zone[lang]}) at Grozny Restaurant Dubai`,
        }),
      });
      const data = await response.json();
      if (data?.auditReport) {
        const rep = data.auditReport;
        setCameras((prev) =>
          prev.map((c) =>
            c.id === cam.id ? { ...c, lastAiAudit: { ar: rep, en: rep, ru: rep } } : c
          )
        );
      }
    } finally {
      setIsAuditingCam(false);
    }
  };

  // Execute Live AI Command from the Compact Chat Box
  const executeAiCommand = async (commandText?: string) => {
    const query = (commandText ?? aiInput).trim();
    if (!query) return;

    const nowTime = new Date().toTimeString().slice(0, 5);
    setChatHistory((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, sender: 'user', text: query, time: nowTime },
    ]);
    setAiInput('');
    setAiLoading(true);
    setIsChatOpen(true);

    try {
      const response = await fetch('/api/ai/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          lang,
          contextSummary: {
            totalIncomeAED: finSummary.totalIncome,
            totalExpenseAED: finSummary.totalExpense,
            netProfitAED: finSummary.netOperatingProfit,
            vatPayableAED: finSummary.netVatPayable,
            occupiedTables: tables.filter((tb) => tb.status === 'occupied').length,
            topDish: 'Zhizhig-Galnash (Beef Galushki) - 108 AED',
            staffCount: staffList.length,
          },
        }),
      });

      const result = await response.json();
      const replyText =
        result.reply ||
        (lang === 'ar'
          ? 'تم تنفيذ أمرك بنجاح.'
          : lang === 'ru'
          ? 'Команда выполнена.'
          : 'Command executed.');

      setChatHistory((prev) => [
        ...prev,
        { id: `ai-${Date.now()}`, sender: 'ai', text: replyText, time: nowTime },
      ]);
      speakText(replyText);

      // Direct System Actions
      if (result.actionType === 'NAVIGATE' && result.targetTab) {
        const validTabs: ActiveModule[] = [
          'pos',
          'floor',
          'financials',
          'hr',
          'analytics',
          'cctv',
          'integrations',
        ];
        if (validTabs.includes(result.targetTab as ActiveModule)) {
          setActiveTab(result.targetTab as ActiveModule);
        }
      } else if (
        (result.actionType === 'ADD_EXPENSE' || result.actionType === 'ADD_INCOME') &&
        result.amountAED
      ) {
        const amt = Number(result.amountAED);
        const vat = Number((amt - amt / 1.05).toFixed(2));
        const now = new Date();
        const isInc = result.actionType === 'ADD_INCOME';
        const desc = result.descriptionText || query;
        const rec: FinancialRecord = {
          id: `fin-${Date.now()}`,
          barcode: '6297005551119',
          date: now.toISOString().slice(0, 10),
          time: nowTime,
          type: isInc ? 'income' : 'expense',
          category: isInc
            ? { ar: 'وارد عبر المساعد الذكي', en: 'AI Command Income', ru: 'Доход (ИИ команда)' }
            : { ar: 'مصروف عبر المساعد الذكي', en: 'AI Command Expense', ru: 'Расход (ИИ команда)' },
          description: { ar: desc, en: desc, ru: desc },
          paymentMethod: { ar: 'نقدي (Cash)', en: 'Cash', ru: 'Наличные (Cash)' },
          amountAED: amt,
          vatAED: vat,
          staffOrSupplier: {
            ar: 'أمر صوتي / ذكي',
            en: 'AI Voice Commander',
            ru: 'Голосовой ИИ',
          },
          invoiceRef: `AI-${Math.floor(1000 + Math.random() * 9000)}`,
        };
        setFinancials((prev) => [rec, ...prev]);
        setActiveTab('financials');
      } else if (result.actionType === 'FOCUS_CAMERA') {
        setActiveTab('cctv');
        const idx = (result.cameraIndex || 1) - 1;
        if (cameras[idx]) {
          setFocusedCamId(cameras[idx].id);
        }
      } else if (result.actionType === 'STAFF_ADJUSTMENT' && result.amountAED) {
        setActiveTab('hr');
        const qName = (result.staffNameQuery || '').toLowerCase();
        const note = result.descriptionText || query;
        setStaffList((prev) =>
          prev.map((st, idx) => {
            if (
              (qName &&
                (st.name.ar.toLowerCase().includes(qName) ||
                  st.name.en.toLowerCase().includes(qName) ||
                  st.name.ru.toLowerCase().includes(qName))) ||
              (!qName && idx === 1)
            ) {
              return {
                ...st,
                deductionsAED: st.deductionsAED + Number(result.amountAED),
                deductionReason: { ar: note, en: note, ru: note },
              };
            }
            return st;
          })
        );
      }
    } catch {
      const fallbackMsg =
        lang === 'ar'
          ? `صافي الربح الحالي هو ${finSummary.netOperatingProfit.toFixed(0)} درهم إماراتي.`
          : lang === 'ru'
          ? `Текущая чистая прибыль составляет ${finSummary.netOperatingProfit.toFixed(0)} AED.`
          : `Current net operating profit is ${finSummary.netOperatingProfit.toFixed(0)} AED.`;
      setChatHistory((prev) => [
        ...prev,
        { id: `ai-${Date.now()}`, sender: 'ai', text: fallbackMsg, time: nowTime },
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  // Web Speech API Voice Recognition
  const handleToggleVoiceCommand = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      notify(
        lang === 'ar'
          ? 'المتصفح الحالي لا يدعم الإملاء الصوتي المباشر، يمكنك الكتابة في الصندوق.'
          : lang === 'ru'
          ? 'Браузер не поддерживает голосовой ввод, введите команду текстом.'
          : 'Browser voice recognition unavailable; please type your command.'
      );
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'ru' ? 'ru-RU' : lang === 'en' ? 'en-US' : 'ar-AE';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript;
      if (transcript) {
        executeAiCommand(transcript);
      }
    };

    recognition.start();
  };

  const focusedCamera = useMemo(
    () => cameras.find((c) => c.id === focusedCamId) || cameras[0],
    [cameras, focusedCamId]
  );

  const translateAttendance = (status: StaffMember['attendanceStatus']) => {
    if (status === 'On Shift') return t.statusOnShift;
    if (status === 'On Leave') return t.statusOnLeave;
    if (status === 'Late') return t.statusLate;
    return t.statusOffDuty;
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#F7F5F0] text-[#111C17] flex flex-col pb-20"
    >
      {/* Top Bar Contract: Zone 1 Brand Wordmark — Zone 2 Navigation — Zone 3 Language Switcher */}
      <header className="bg-[#11261D] text-[#F7F5F0] border-b border-[#C9A24D]/25 px-6 py-3.5 flex items-center justify-between gap-8 no-print">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('pos');
          }}
          className="text-lg font-bold tracking-tight text-[#F7F5F0] whitespace-nowrap shrink-0"
        >
          {t.brandTitle}
        </a>

        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-[#F7F5F0]/80">
          <button
            onClick={() => setActiveTab('pos')}
            className={`hover:text-[#C9A24D] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              activeTab === 'pos' ? 'border-[#C9A24D] text-[#C9A24D]' : 'border-transparent'
            }`}
          >
            {t.pos}
          </button>
          <button
            onClick={() => setActiveTab('floor')}
            className={`hover:text-[#C9A24D] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              activeTab === 'floor' ? 'border-[#C9A24D] text-[#C9A24D]' : 'border-transparent'
            }`}
          >
            {t.floor}
          </button>
          <button
            onClick={() => setActiveTab('financials')}
            className={`hover:text-[#C9A24D] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              activeTab === 'financials'
                ? 'border-[#C9A24D] text-[#C9A24D]'
                : 'border-transparent'
            }`}
          >
            {t.financials}
          </button>
          <button
            onClick={() => setActiveTab('hr')}
            className={`hover:text-[#C9A24D] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              activeTab === 'hr' ? 'border-[#C9A24D] text-[#C9A24D]' : 'border-transparent'
            }`}
          >
            {t.hr}
          </button>
          <button
            onClick={() => setActiveTab('cctv')}
            className={`hover:text-[#C9A24D] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              activeTab === 'cctv' ? 'border-[#C9A24D] text-[#C9A24D]' : 'border-transparent'
            }`}
          >
            {t.cctv}
          </button>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center bg-[#0D1E16] p-1 rounded-lg border border-[#C9A24D]/30">
            {(['ar', 'en', 'ru'] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 text-xs font-bold uppercase rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  lang === l
                    ? 'bg-[#C9A24D] text-[#11261D]'
                    : 'text-[#F7F5F0]/75 hover:text-white'
                }`}
              >
                {l === 'ar' ? 'العربية' : l === 'en' ? 'EN' : 'РУС'}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Clean Secondary Module Switcher Bar (Without the bulky top AI box) */}
      <div className="bg-[#163024] text-[#F7F5F0] border-b border-[#C9A24D]/20 px-6 py-2.5 no-print">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {(
              [
                { id: 'pos', label: t.pos, icon: UtensilsCrossed },
                { id: 'floor', label: t.floor, icon: LayoutGrid },
                { id: 'financials', label: t.financials, icon: Wallet },
                { id: 'hr', label: t.hr, icon: Users },
                { id: 'analytics', label: t.analytics, icon: BarChart3 },
                { id: 'cctv', label: t.cctv, icon: Video },
                { id: 'integrations', label: t.integrations, icon: Globe },
              ] as { id: ActiveModule; label: string; icon: any }[]
            ).map((mod) => {
              const Icon = mod.icon;
              const active = activeTab === mod.id;
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveTab(mod.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#C9A24D] text-[#11261D] font-semibold'
                      : 'text-[#F7F5F0]/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{mod.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs text-[#F7F5F0]/70 font-mono-num">
            <span>{LEGAL_ENTITY.companyName[lang]}</span>
            <span aria-hidden="true">·</span>
            <span>DET #{LEGAL_ENTITY.licenseNo}</span>
            <span aria-hidden="true">·</span>
            <span>{LEGAL_ENTITY.ownerName[lang]}</span>
          </div>
        </div>
      </div>

      {/* Instant Feedback Toast */}
      {lastNotification && (
        <div className="bg-[#16A34A] text-white text-xs font-medium px-6 py-2.5 text-center no-print">
          {lastNotification}
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-6 py-6">
        {/* ===================================================================
            MODULE 1: SYRVE SMART POS, BARCODE SCANNER & MENU TECH CARDS
           =================================================================== */}
        {activeTab === 'pos' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 space-y-5 no-print">
              {/* Search + Fast Barcode Scanner Bar */}
              <div className="bg-white border border-[#11261D]/10 rounded-xl p-4 space-y-3.5">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  {/* Text Search */}
                  <div className="md:col-span-7 relative">
                    <Search className="w-4 h-4 text-[#111C17]/40 absolute top-1/2 -translate-y-1/2 start-3" />
                    <input
                      type="text"
                      value={posSearch}
                      onChange={(e) => setPosSearch(e.target.value)}
                      placeholder={t.searchDishPlaceholder}
                      className="w-full ps-9 pe-4 py-2 text-xs bg-[#F7F5F0] border border-[#11261D]/15 rounded-lg focus:outline-none focus:border-[#11261D]"
                    />
                  </div>

                  {/* Fast Barcode Scanner Input */}
                  <form
                    onSubmit={handlePosBarcodeSubmit}
                    className="md:col-span-5 flex items-center gap-1.5"
                  >
                    <div className="relative flex-1">
                      <ScanBarcode className="w-4 h-4 text-[#11261D] absolute top-1/2 -translate-y-1/2 start-2.5" />
                      <input
                        type="text"
                        value={posBarcodeInput}
                        onChange={(e) => setPosBarcodeInput(e.target.value)}
                        placeholder={t.barcodeQuickScan}
                        className="w-full ps-8 pe-2 py-2 text-xs font-mono-num bg-[#F7F5F0] border border-[#C9A24D]/60 rounded-lg focus:outline-none focus:border-[#11261D]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-2 bg-[#11261D] text-[#C9A24D] text-xs font-semibold rounded-lg hover:bg-[#1a3a2c] transition-colors whitespace-nowrap shrink-0"
                    >
                      {t.scanAddBtn}
                    </button>
                  </form>
                </div>

                {/* Category Filter Buttons */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {MENU_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                        selectedCategory === cat.id
                          ? 'bg-[#11261D] text-[#C9A24D]'
                          : 'bg-[#F7F5F0] text-[#111C17]/75 hover:bg-[#11261D]/10'
                      }`}
                    >
                      {cat.label[lang]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dishes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredMenu.map((dish) => {
                  const marginPct = Math.round(
                    ((dish.price / 1.05 - dish.foodCost) / dish.price) * 100
                  );
                  const catLabel =
                    MENU_CATEGORIES.find((c) => c.id === dish.category)?.label[lang] ||
                    dish.category;
                  return (
                    <div
                      key={dish.id}
                      className="bg-white border border-[#11261D]/10 rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#C9A24D] transition-colors"
                    >
                      <div>
                        <div className="relative h-40 bg-[#11261D] overflow-hidden">
                          <img
                            src={dish.image}
                            alt={dish.name[lang]}
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.display = 'none';
                            }}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <div className="absolute top-2.5 end-2.5 bg-black/65 text-white/90 px-2 py-0.5 rounded text-[11px] font-mono-num flex items-center gap-1">
                            <ScanBarcode className="w-3 h-3 text-[#C9A24D]" />
                            <span>{dish.barcode}</span>
                          </div>
                          <div className="absolute bottom-2.5 start-3 end-3 flex items-end justify-between text-white">
                            <span className="text-xs font-medium text-[#C9A24D]">
                              {dish.isFrozenPack ? t.frozen1kgBadge : catLabel}
                            </span>
                            <span className="text-base font-bold font-mono-num">
                              {dish.price} AED
                            </span>
                          </div>
                        </div>

                        <div className="p-4">
                          <h3 className="text-sm font-bold text-[#111C17] leading-snug mb-1">
                            {dish.name[lang]}
                          </h3>
                          <p className="text-xs text-[#111C17]/65 line-clamp-2 mb-3">
                            {dish.description[lang]}
                          </p>

                          <div className="flex items-center gap-2 text-xs text-[#111C17]/60 font-mono-num">
                            <span>
                              {t.costLabel}: {dish.foodCost} AED
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>
                              {t.marginLabel}: {marginPct}%
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>
                              {t.stockLabel}: {dish.stockPortions}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="px-4 pb-4 pt-2 border-t border-[#11261D]/5 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => setInspectRecipeItem(dish)}
                          className="px-2.5 py-1.5 text-xs font-medium text-[#11261D] bg-[#F7F5F0] hover:bg-[#11261D]/10 rounded-lg transition-colors whitespace-nowrap shrink-0"
                        >
                          {t.recipeBtn}
                        </button>
                        <button
                          type="button"
                          onClick={() => addToCart(dish)}
                          className="px-3.5 py-1.5 text-xs font-semibold bg-[#11261D] text-[#C9A24D] hover:bg-[#1a3a2c] rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap shrink-0"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{t.addToOrderBtn}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Recipe & Tech Card Inspector */}
              {inspectRecipeItem && (
                <div className="bg-white border border-[#11261D]/20 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#11261D]/10 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-[#11261D]">
                        {t.techCardTitle}: {inspectRecipeItem.name[lang]}
                      </h4>
                      <p className="text-xs text-[#111C17]/60 font-mono-num">
                        {t.salePriceIncVat}: {inspectRecipeItem.price} AED · {t.rawFoodCost}:{' '}
                        {inspectRecipeItem.foodCost} AED · {t.prepTime}:{' '}
                        {inspectRecipeItem.prepTimeMin} {t.minutes} · SKU:{' '}
                        {inspectRecipeItem.barcode}
                      </p>
                    </div>
                    <button
                      onClick={() => setInspectRecipeItem(null)}
                      className="px-3 py-1 text-xs font-semibold bg-[#F7F5F0] hover:bg-[#11261D]/10 rounded-md"
                    >
                      {t.closeBtn}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {inspectRecipeItem.recipe.map((ing, i) => (
                      <div
                        key={i}
                        className="p-3 bg-[#F7F5F0] rounded-lg flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-semibold text-[#111C17]">{ing.ingredient[lang]}</div>
                          <div className="text-[#111C17]/60">
                            {t.qtyLabel}: {ing.qty[lang]}
                          </div>
                        </div>
                        <div className="font-mono-num font-bold text-[#11261D]">
                          {ing.cost.toFixed(2)} AED
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Official DET 5% VAT Tax Invoice & POS Ticket */}
            <div className="lg:col-span-4 bg-white border border-[#11261D]/15 rounded-xl p-5 space-y-4 sticky top-4">
              <div className="border-b border-[#11261D]/15 pb-3 text-center space-y-1">
                <div className="text-sm font-bold text-[#11261D]">
                  {LEGAL_ENTITY.companyName[lang]}
                </div>
                <div className="text-xs text-[#111C17]/70">{LEGAL_ENTITY.address[lang]}</div>
                <div className="text-xs text-[#111C17]/60 font-mono-num">
                  License: {LEGAL_ENTITY.licenseNo} · TRN: {LEGAL_ENTITY.trnNumber}
                </div>
                <div className="text-xs font-semibold text-[#11261D] pt-1">{t.orderTicket}</div>
              </div>

              <div className="grid grid-cols-2 gap-3 no-print">
                <div>
                  <label className="block text-xs font-medium text-[#111C17]/70 mb-1">
                    {t.selectTable}
                  </label>
                  <select
                    value={selectedTableId}
                    onChange={(e) => setSelectedTableId(e.target.value)}
                    className="w-full text-xs bg-[#F7F5F0] border border-[#11261D]/15 rounded-lg px-2.5 py-2 font-medium"
                  >
                    {tables.map((tb) => (
                      <option key={tb.id} value={tb.id}>
                        {tb.number} ({tb.zone[lang]})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#111C17]/70 mb-1">
                    {t.paymentMethodLabel}
                  </label>
                  <div className="flex bg-[#F7F5F0] p-1 rounded-lg border border-[#11261D]/10">
                    {(['Card', 'Cash'] as const).map((pm) => (
                      <button
                        key={pm}
                        type="button"
                        onClick={() => setPaymentMethod(pm)}
                        className={`flex-1 py-1 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                          paymentMethod === pm
                            ? 'bg-[#11261D] text-[#C9A24D]'
                            : 'text-[#111C17]/70'
                        }`}
                      >
                        {pm === 'Cash' ? t.payCash : t.payCard}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="divide-y divide-[#11261D]/10 max-h-72 overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="py-10 text-center text-xs text-[#111C17]/50">{t.emptyCartMsg}</div>
                ) : (
                  cart.map((c) => (
                    <div
                      key={c.item.id}
                      className="py-2.5 flex items-center justify-between gap-2 text-xs"
                    >
                      <div className="flex-1">
                        <div className="font-semibold text-[#111C17]">{c.item.name[lang]}</div>
                        <div className="text-[#111C17]/60 font-mono-num">
                          {c.item.price} AED × {c.qty}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 no-print">
                        <button
                          type="button"
                          onClick={() => updateCartQty(c.item.id, -1)}
                          className="p-1 bg-[#F7F5F0] hover:bg-[#11261D]/10 rounded"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center font-mono-num font-bold">{c.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateCartQty(c.item.id, 1)}
                          className="p-1 bg-[#F7F5F0] hover:bg-[#11261D]/10 rounded"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="w-16 text-end font-mono-num font-bold text-[#11261D]">
                        {(c.item.price * c.qty).toFixed(2)}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-[#11261D]/15 pt-3 space-y-2 text-xs">
                <div className="flex justify-between text-[#111C17]/75">
                  <span>{t.subtotalExVat}</span>
                  <span className="font-mono-num">{cartSummary.subtotalExVat.toFixed(2)} AED</span>
                </div>
                <div className="flex justify-between text-[#111C17]/75">
                  <span>{t.vat5}</span>
                  <span className="font-mono-num">{cartSummary.vatAmount.toFixed(2)} AED</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#11261D] pt-1 border-t border-[#11261D]/10">
                  <span>{t.totalIncVat}</span>
                  <span className="font-mono-num">{cartSummary.totalIncVat.toFixed(2)} AED</span>
                </div>

                <div className="bg-[#F7F5F0] p-2.5 rounded-lg mt-2 space-y-1 no-print">
                  <div className="flex justify-between text-[#111C17]/70">
                    <span>{t.foodCostLabel}:</span>
                    <span className="font-mono-num font-semibold">
                      {cartSummary.totalFoodCost.toFixed(2)} AED
                    </span>
                  </div>
                  <div className="flex justify-between text-[#16A34A] font-semibold">
                    <span>{t.grossMargin}:</span>
                    <span className="font-mono-num">
                      +{cartSummary.grossMarginAED.toFixed(2)} AED ({cartSummary.marginPercent}%)
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 no-print">
                <button
                  type="button"
                  onClick={handleSettleOrder}
                  disabled={cart.length === 0}
                  className="w-full py-2.5 px-4 bg-[#11261D] text-[#C9A24D] font-bold text-xs rounded-lg hover:bg-[#1a3a2c] disabled:opacity-40 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.completeOrder}</span>
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="flex-1 py-2 px-3 bg-[#F7F5F0] hover:bg-[#11261D]/10 text-[#11261D] font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>{t.printReceipt}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCart([])}
                    className="py-2 px-3 bg-[#F7F5F0] hover:bg-[#DC2626]/10 text-[#DC2626] font-semibold text-xs rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            MODULE 2: INTERACTIVE FLOOR PLAN & TABLE MANAGEMENT
           =================================================================== */}
        {activeTab === 'floor' && (
          <div className="space-y-6">
            <div className="bg-white border border-[#11261D]/10 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#11261D]">{t.floorTitle}</h2>
                <p className="text-xs text-[#111C17]/65">{t.floorSubtitle}</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono-num">
                <span>
                  {t.occupiedCount}: {tables.filter((tb) => tb.status === 'occupied').length} /{' '}
                  {tables.length}
                </span>
                <span>·</span>
                <span>
                  {t.openBillsTotal}:{' '}
                  {tables.reduce((acc, tb) => acc + tb.currentTotalAED, 0).toFixed(2)} AED
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tables.map((tb) => {
                const isOccupied = tb.status === 'occupied';
                const isReserved = tb.status === 'reserved';
                return (
                  <div
                    key={tb.id}
                    className={`bg-white rounded-xl p-5 border transition-colors flex flex-col justify-between ${
                      isOccupied
                        ? 'border-[#11261D]'
                        : isReserved
                        ? 'border-[#D97706]'
                        : 'border-[#11261D]/15'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold font-mono-num text-[#11261D]">
                          {tb.number}
                        </span>
                        <span className="text-xs font-semibold text-[#111C17]/70">
                          {tb.zone[lang]}
                        </span>
                      </div>

                      <div className="text-xs text-[#111C17]/70 space-y-1">
                        <div>
                          {t.statusLabel}:{' '}
                          <strong
                            className={
                              isOccupied
                                ? 'text-[#16A34A]'
                                : isReserved
                                ? 'text-[#D97706]'
                                : 'text-[#111C17]/60'
                            }
                          >
                            {isOccupied
                              ? t.statusOccupied
                              : isReserved
                              ? t.statusReserved
                              : t.statusAvailable}
                          </strong>
                        </div>
                        <div>
                          {t.seatsLabel}: {tb.seats} · {t.waiterLabel}: {tb.waiter[lang]}
                        </div>
                        {tb.guestName && (
                          <div>
                            {t.guestLabel}: {tb.guestName[lang]}
                          </div>
                        )}
                        {tb.openedAt && (
                          <div>
                            {t.openedAtLabel}: {tb.openedAt}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-[#11261D]/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#111C17]/60">{t.currentBalance}:</span>
                        <span className="text-base font-bold font-mono-num text-[#11261D]">
                          {tb.currentTotalAED.toFixed(2)} AED
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedTableId(tb.id);
                            setActiveTab('pos');
                          }}
                          className="flex-1 py-2 px-3 bg-[#11261D] text-[#C9A24D] text-xs font-semibold rounded-lg hover:bg-[#1a3a2c] transition-colors whitespace-nowrap"
                        >
                          {t.openInPosBtn}
                        </button>
                        {tb.currentTotalAED > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              setTables((prev) =>
                                prev.map((x) =>
                                  x.id === tb.id
                                    ? {
                                        ...x,
                                        status: 'available',
                                        currentTotalAED: 0,
                                        guestName: undefined,
                                        openedAt: undefined,
                                      }
                                    : x
                                )
                              );
                            }}
                            className="py-2 px-3 bg-[#F7F5F0] hover:bg-[#16A34A]/15 text-[#16A34A] text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                          >
                            {t.clearTableBtn}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================================================================
            MODULE 3: INCOME & EXPENSES P&L + BARCODE SUPPLY SCANNER + AI OCR
           =================================================================== */}
        {activeTab === 'financials' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-[#11261D]/10 rounded-xl p-5">
                <div className="text-xs text-[#111C17]/65 mb-1">{t.incomeTotal}</div>
                <div className="text-2xl font-bold font-mono-num text-[#16A34A]">
                  {finSummary.totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })} AED
                </div>
                <div className="text-xs text-[#111C17]/55 mt-1">{t.incomeSub}</div>
              </div>

              <div className="bg-white border border-[#11261D]/10 rounded-xl p-5">
                <div className="text-xs text-[#111C17]/65 mb-1">{t.expensesTotal}</div>
                <div className="text-2xl font-bold font-mono-num text-[#DC2626]">
                  {finSummary.totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })} AED
                </div>
                <div className="text-xs text-[#111C17]/55 mt-1">{t.expensesSub}</div>
              </div>

              <div className="bg-white border border-[#11261D]/10 rounded-xl p-5">
                <div className="text-xs text-[#111C17]/65 mb-1">{t.netProfit}</div>
                <div className="text-2xl font-bold font-mono-num text-[#11261D]">
                  {finSummary.netOperatingProfit.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                  })}{' '}
                  AED
                </div>
                <div className="text-xs text-[#111C17]/55 mt-1">{t.netProfitSub}</div>
              </div>

              <div className="bg-white border border-[#11261D]/10 rounded-xl p-5">
                <div className="text-xs text-[#111C17]/65 mb-1">{t.vatPayable}</div>
                <div className="text-2xl font-bold font-mono-num text-[#D97706]">
                  {finSummary.netVatPayable.toLocaleString('en-US', { minimumFractionDigits: 2 })}{' '}
                  AED
                </div>
                <div className="text-xs text-[#111C17]/55 mt-1">TRN: {LEGAL_ENTITY.trnNumber}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Form: Barcode Scanner + Manual Entry + AI Invoice OCR */}
              <div className="lg:col-span-5 bg-white border border-[#11261D]/10 rounded-xl p-5 space-y-4">
                <div className="border-b border-[#11261D]/10 pb-3 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-[#11261D]">{t.addRecordTitle}</h3>
                  <label className="cursor-pointer px-3 py-1.5 bg-[#C9A24D]/25 hover:bg-[#C9A24D]/40 text-[#11261D] text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isScanningInvoice ? t.scanning : t.scanInvoiceAi}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleInvoiceImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Barcode Scanner & Quick Supply Presets Box */}
                <div className="p-3.5 bg-[#F7F5F0] border border-[#C9A24D]/40 rounded-xl space-y-2.5 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-[#11261D]">
                    <ScanBarcode className="w-4 h-4 text-[#11261D]" />
                    <span>{t.barcodeSupplyLabel}</span>
                  </div>
                  <input
                    type="text"
                    value={newFinBarcode}
                    onChange={(e) => handleManualBarcodeLookup(e.target.value)}
                    placeholder={t.barcodeInputPlaceholder}
                    className="w-full bg-white border border-[#11261D]/20 rounded-lg px-3 py-2 font-mono-num text-xs"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                    {SUPPLY_BARCODE_CATALOG.map((sup) => (
                      <button
                        key={sup.barcode}
                        type="button"
                        onClick={() => handleSelectSupplyBarcode(sup)}
                        className="text-start p-2 bg-white hover:bg-[#11261D] hover:text-white border border-[#11261D]/10 rounded-lg transition-colors group"
                      >
                        <div className="font-mono-num text-[11px] text-[#C9A24D] font-bold">
                          |{sup.barcode}| — {sup.defaultCostAED} AED
                        </div>
                        <div className="truncate font-medium text-[11px]">{sup.name[lang]}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleAddFinancialRecord} className="space-y-3 text-xs">
                  <div className="flex bg-[#F7F5F0] p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setNewFinType('expense')}
                      className={`flex-1 py-1.5 font-semibold rounded-md transition-colors ${
                        newFinType === 'expense'
                          ? 'bg-[#DC2626] text-white'
                          : 'text-[#111C17]/70'
                      }`}
                    >
                      {t.recordExpenseBtn}
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewFinType('income')}
                      className={`flex-1 py-1.5 font-semibold rounded-md transition-colors ${
                        newFinType === 'income'
                          ? 'bg-[#16A34A] text-white'
                          : 'text-[#111C17]/70'
                      }`}
                    >
                      {t.recordIncomeBtn}
                    </button>
                  </div>

                  <div>
                    <label className="block text-[#111C17]/70 mb-1">{t.finCategoryLabel}</label>
                    <select
                      value={newFinCategoryKey}
                      onChange={(e) => setNewFinCategoryKey(e.target.value)}
                      className="w-full bg-[#F7F5F0] border border-[#11261D]/15 rounded-lg px-3 py-2"
                    >
                      <option value="meat">{t.catMeat}</option>
                      <option value="dairy">{t.catDairy}</option>
                      <option value="groceries">{t.catGroceries}</option>
                      <option value="utilities">{t.catUtilities}</option>
                      <option value="packaging">{t.catPackaging}</option>
                      <option value="catering">{t.catCatering}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#111C17]/70 mb-1">{t.descLabel}</label>
                    <input
                      type="text"
                      required
                      value={newFinDesc}
                      onChange={(e) => setNewFinDesc(e.target.value)}
                      placeholder={t.descPlaceholder}
                      className="w-full bg-[#F7F5F0] border border-[#11261D]/15 rounded-lg px-3 py-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#111C17]/70 mb-1">{t.amountLabel}</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={newFinAmount}
                        onChange={(e) => setNewFinAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-[#F7F5F0] border border-[#11261D]/15 rounded-lg px-3 py-2 font-mono-num"
                      />
                    </div>
                    <div>
                      <label className="block text-[#111C17]/70 mb-1">{t.supplierStaffLabel}</label>
                      <input
                        type="text"
                        value={newFinSupplier}
                        onChange={(e) => setNewFinSupplier(e.target.value)}
                        placeholder={t.supplierPlaceholder}
                        className="w-full bg-[#F7F5F0] border border-[#11261D]/15 rounded-lg px-3 py-2"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#11261D] text-[#C9A24D] font-bold rounded-lg hover:bg-[#1a3a2c] transition-colors"
                  >
                    {t.saveLedgerBtn}
                  </button>
                </form>
              </div>

              {/* Right Table: Trilingual Income & Expense Ledger */}
              <div className="lg:col-span-7 bg-white border border-[#11261D]/10 rounded-xl p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-sm font-bold text-[#11261D]">{t.ledgerTableTitle}</h3>
                  <div className="flex items-center gap-1 bg-[#F7F5F0] p-1 rounded-lg">
                    {(
                      [
                        { id: 'all', label: t.filterAll },
                        { id: 'income', label: t.filterIncome },
                        { id: 'expense', label: t.filterExpense },
                      ] as const
                    ).map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setFinFilter(f.id)}
                        className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                          finFilter === f.id
                            ? 'bg-[#11261D] text-[#C9A24D]'
                            : 'text-[#111C17]/70'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-start border-collapse">
                    <thead>
                      <tr className="border-b border-[#11261D]/15 text-[#111C17]/60">
                        <th className="py-2.5 px-2 text-start">{t.colRefDate}</th>
                        <th className="py-2.5 px-2 text-start">{t.colTypeCat}</th>
                        <th className="py-2.5 px-2 text-start">{t.colDesc}</th>
                        <th className="py-2.5 px-2 text-start">{t.colPartyPay}</th>
                        <th className="py-2.5 px-2 text-end">{t.colVat}</th>
                        <th className="py-2.5 px-2 text-end">{t.colAmount}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#11261D]/10">
                      {financials
                        .filter((r) => finFilter === 'all' || r.type === finFilter)
                        .map((rec) => (
                          <tr key={rec.id} className="hover:bg-[#F7F5F0]/60">
                            <td className="py-3 px-2 font-mono-num">
                              <div className="font-semibold text-[#11261D]">{rec.invoiceRef}</div>
                              {rec.barcode && (
                                <div className="text-[11px] text-[#C9A24D] font-bold">
                                  |{rec.barcode}|
                                </div>
                              )}
                              <div className="text-[#111C17]/55">
                                {rec.date} · {rec.time}
                              </div>
                            </td>
                            <td className="py-3 px-2">
                              <div
                                className={`font-bold ${
                                  rec.type === 'income' ? 'text-[#16A34A]' : 'text-[#DC2626]'
                                }`}
                              >
                                {rec.type === 'income' ? t.inflowTag : t.outflowTag}
                              </div>
                              <div className="text-[#111C17]/65">{rec.category[lang]}</div>
                            </td>
                            <td className="py-3 px-2 max-w-xs">{rec.description[lang]}</td>
                            <td className="py-3 px-2">
                              <div className="font-medium">{rec.staffOrSupplier[lang]}</div>
                              <div className="text-[#111C17]/55">{rec.paymentMethod[lang]}</div>
                            </td>
                            <td className="py-3 px-2 text-end font-mono-num text-[#111C17]/70">
                              {rec.vatAED.toFixed(2)}
                            </td>
                            <td
                              className={`py-3 px-2 text-end font-mono-num font-bold ${
                                rec.type === 'income' ? 'text-[#16A34A]' : 'text-[#DC2626]'
                              }`}
                            >
                              {rec.type === 'income' ? '+' : '-'}
                              {rec.amountAED.toFixed(2)} AED
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            MODULE 4: HR, STAFF PAYROLL, LEAVES, ADVANCES & DEDUCTIONS
           =================================================================== */}
        {activeTab === 'hr' && (
          <div className="space-y-6">
            <div className="bg-white border border-[#11261D]/10 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#11261D]">{t.payrollTitle}</h2>
                <p className="text-xs text-[#111C17]/65">{t.payrollSub}</p>
              </div>
              <div className="text-end font-mono-num">
                <div className="text-xs text-[#111C17]/60">{t.totalNetPayrollLabel}</div>
                <div className="text-xl font-bold text-[#11261D]">
                  {finSummary.totalPayrollNet.toLocaleString('en-US')} AED
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-4 bg-white border border-[#11261D]/10 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-bold text-[#11261D] border-b border-[#11261D]/10 pb-2.5">
                  {t.staffAdjustFormTitle}
                </h3>
                <form onSubmit={handleApplyStaffAdjustment} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[#111C17]/70 mb-1">{t.selectStaffLabel}</label>
                    <select
                      value={selectedStaffId}
                      onChange={(e) => setSelectedStaffId(e.target.value)}
                      className="w-full bg-[#F7F5F0] border border-[#11261D]/15 rounded-lg px-3 py-2 font-medium"
                    >
                      {staffList.map((st) => (
                        <option key={st.id} value={st.id}>
                          {st.name[lang]} — {st.role[lang]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#111C17]/70 mb-1">{t.actionTypeLabel}</label>
                    <div className="grid grid-cols-2 gap-1.5 bg-[#F7F5F0] p-1 rounded-lg">
                      {(
                        [
                          { id: 'deduction', label: t.actDeduction },
                          { id: 'advance', label: t.actAdvance },
                          { id: 'bonus', label: t.actBonus },
                          { id: 'leave', label: t.actLeave },
                        ] as const
                      ).map((tp) => (
                        <button
                          key={tp.id}
                          type="button"
                          onClick={() => setAdjustType(tp.id)}
                          className={`py-1.5 px-2 font-semibold rounded transition-colors ${
                            adjustType === tp.id
                              ? 'bg-[#11261D] text-[#C9A24D]'
                              : 'text-[#111C17]/70'
                          }`}
                        >
                          {tp.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#111C17]/70 mb-1">
                      {adjustType === 'leave' ? t.leaveDaysLabel : t.amountLabel}
                    </label>
                    <input
                      type="number"
                      required
                      value={adjustAmount}
                      onChange={(e) => setAdjustAmount(e.target.value)}
                      placeholder={adjustType === 'leave' ? '3' : '150'}
                      className="w-full bg-[#F7F5F0] border border-[#11261D]/15 rounded-lg px-3 py-2 font-mono-num"
                    />
                  </div>

                  <div>
                    <label className="block text-[#111C17]/70 mb-1">{t.reasonLabel}</label>
                    <input
                      type="text"
                      value={adjustReason}
                      onChange={(e) => setAdjustReason(e.target.value)}
                      placeholder={t.reasonPlaceholder}
                      className="w-full bg-[#F7F5F0] border border-[#11261D]/15 rounded-lg px-3 py-2"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#11261D] text-[#C9A24D] font-bold rounded-lg hover:bg-[#1a3a2c] transition-colors"
                  >
                    {t.applyPayrollBtn}
                  </button>
                </form>
              </div>

              <div className="lg:col-span-8 bg-white border border-[#11261D]/10 rounded-xl p-5 overflow-x-auto">
                <table className="w-full text-xs text-start border-collapse">
                  <thead>
                    <tr className="border-b border-[#11261D]/15 text-[#111C17]/60">
                      <th className="py-2.5 px-2 text-start">{t.colStaffRole}</th>
                      <th className="py-2.5 px-2 text-start">{t.colAttendanceLeave}</th>
                      <th className="py-2.5 px-2 text-end">{t.colBaseSalary}</th>
                      <th className="py-2.5 px-2 text-end">{t.colBonusOvertime}</th>
                      <th className="py-2.5 px-2 text-end">{t.colAdvancesDeduct}</th>
                      <th className="py-2.5 px-2 text-end">{t.colNetSalary}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#11261D]/10">
                    {staffList.map((st) => {
                      const net =
                        st.baseSalaryAED +
                        st.overtimeAED +
                        st.tipsBonusAED -
                        st.advancesAED -
                        st.deductionsAED;
                      return (
                        <tr key={st.id} className="hover:bg-[#F7F5F0]/60">
                          <td className="py-3 px-2">
                            <div className="font-bold text-[#11261D]">{st.name[lang]}</div>
                            <div className="text-[#111C17]/65">
                              {st.role[lang]} · {st.nationality[lang]}
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <div className="font-semibold text-[#16A34A]">
                              {translateAttendance(st.attendanceStatus)}{' '}
                              {st.checkInTime ? `(${st.checkInTime})` : ''}
                            </div>
                            <div className="text-[#111C17]/60 font-mono-num">
                              {t.leavesCountLabel}: {st.annualLeaveUsed} / {st.annualLeaveTotal}{' '}
                              {t.daysUnit}
                            </div>
                          </td>
                          <td className="py-3 px-2 text-end font-mono-num">
                            {st.baseSalaryAED.toLocaleString('en-US')}
                          </td>
                          <td className="py-3 px-2 text-end font-mono-num text-[#16A34A]">
                            +{(st.overtimeAED + st.tipsBonusAED).toLocaleString('en-US')}
                          </td>
                          <td className="py-3 px-2 text-end font-mono-num text-[#DC2626]">
                            <div>-{(st.advancesAED + st.deductionsAED).toLocaleString('en-US')}</div>
                            {st.deductionReason && (
                              <div className="text-[11px] text-[#111C17]/60">
                                {st.deductionReason[lang]}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-2 text-end font-mono-num font-bold text-sm text-[#11261D]">
                            {net.toLocaleString('en-US')} AED
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            MODULE 5: CUSTOMER CRM & MENU ENGINEERING ANALYTICS
           =================================================================== */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 bg-white border border-[#11261D]/10 rounded-xl p-5 space-y-4">
              <div>
                <h3 className="text-base font-bold text-[#11261D]">{t.menuMatrixTitle}</h3>
                <p className="text-xs text-[#111C17]/65">{t.menuMatrixSub}</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-start border-collapse">
                  <thead>
                    <tr className="border-b border-[#11261D]/15 text-[#111C17]/60">
                      <th className="py-2.5 px-2 text-start">{t.colDish}</th>
                      <th className="py-2.5 px-2 text-end">{t.colOrders}</th>
                      <th className="py-2.5 px-2 text-end">{t.colPrice}</th>
                      <th className="py-2.5 px-2 text-end">{t.colCost}</th>
                      <th className="py-2.5 px-2 text-end">{t.colTotalProfit}</th>
                      <th className="py-2.5 px-2 text-start">{t.colClass}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#11261D]/10">
                    {[...menuItems]
                      .sort(
                        (a, b) =>
                          b.ordersCount * (b.price - b.foodCost) -
                          a.ordersCount * (a.price - a.foodCost)
                      )
                      .slice(0, 10)
                      .map((dish) => {
                        const unitProfit = dish.price / 1.05 - dish.foodCost;
                        const totalProfit = unitProfit * dish.ordersCount;
                        const isStar = dish.ordersCount >= 250 && unitProfit >= 15;
                        return (
                          <tr key={dish.id} className="hover:bg-[#F7F5F0]/60">
                            <td className="py-2.5 px-2">
                              <div className="font-semibold text-[#11261D]">{dish.name[lang]}</div>
                              <div className="text-[11px] font-mono-num text-[#111C17]/50">
                                SKU: {dish.barcode}
                              </div>
                            </td>
                            <td className="py-2.5 px-2 text-end font-mono-num font-bold">
                              {dish.ordersCount}
                            </td>
                            <td className="py-2.5 px-2 text-end font-mono-num">{dish.price} AED</td>
                            <td className="py-2.5 px-2 text-end font-mono-num text-[#111C17]/65">
                              {dish.foodCost} AED
                            </td>
                            <td className="py-2.5 px-2 text-end font-mono-num font-bold text-[#16A34A]">
                              +{Math.round(totalProfit).toLocaleString('en-US')} AED
                            </td>
                            <td className="py-2.5 px-2 font-semibold">
                              {isStar ? t.starDish : t.coreDish}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white border border-[#11261D]/10 rounded-xl p-5 space-y-4">
              <div>
                <h3 className="text-base font-bold text-[#11261D]">{t.crmTitle}</h3>
                <p className="text-xs text-[#111C17]/65">{t.crmSub}</p>
              </div>

              <div className="divide-y divide-[#11261D]/10">
                {customers.map((cust) => (
                  <div key={cust.id} className="py-3.5 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#11261D] text-sm">{cust.name[lang]}</span>
                      <span className="font-mono-num font-bold text-[#16A34A]">
                        {cust.totalSpentAED.toLocaleString('en-US')} AED
                      </span>
                    </div>
                    <div className="text-[#111C17]/70">
                      {t.favDishLabel}: <strong>{cust.favoriteDish[lang]}</strong>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[#111C17]/60 font-mono-num">
                      <span>{cust.phone}</span>
                      <span aria-hidden="true">·</span>
                      <span>
                        {t.visitsLabel}: {cust.visitsCount}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>
                        {t.tierLabel}: {cust.tier[lang]}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>
                        {t.lastVisitLabel}: {cust.lastVisit[lang]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            MODULE 6: SMART LIVE CCTV SURVEILLANCE HUB
           =================================================================== */}
        {activeTab === 'cctv' && (
          <div className="space-y-6">
            <div className="bg-white border border-[#11261D]/10 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#11261D]">{t.liveCctvTitle}</h2>
                <p className="text-xs text-[#111C17]/65">{t.liveCctvSub}</p>
              </div>
              <button
                type="button"
                onClick={toggleLocalWebcam}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 ${
                  isLiveWebcamActive
                    ? 'bg-[#DC2626] text-white'
                    : 'bg-[#11261D] text-[#C9A24D] hover:bg-[#1a3a2c]'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>{isLiveWebcamActive ? t.stopLocalCam : t.activateLocalCam}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-8 space-y-4">
                <div className="bg-[#0B1712] text-white rounded-xl overflow-hidden border border-[#C9A24D]/30">
                  <div className="px-4 py-2.5 bg-[#11261D] flex items-center justify-between text-xs">
                    <div className="font-bold text-[#C9A24D]">{focusedCamera.name[lang]}</div>
                    <div className="font-mono-num text-white/75">
                      {focusedCamera.protocol} · {focusedCamera.posLinkedZone[lang]}
                    </div>
                  </div>

                  <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
                    {isLiveWebcamActive && focusedCamera.id === 'cam-4' ? (
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={focusedCamera.previewImage}
                        alt={focusedCamera.name[lang]}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-90"
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

                    <div className="absolute top-3 start-4 end-4 flex items-center justify-between text-xs font-mono-num text-white/90">
                      <span>REC · GROZNY-CCTV · DET #1166167</span>
                      <span>{new Date().toISOString().slice(0, 19).replace('T', ' ')} GST</span>
                    </div>

                    <div className="absolute bottom-3 start-4 end-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs text-white/90 max-w-xl">
                        <span className="text-[#C9A24D] font-bold">{t.aiVisionReportLabel} </span>
                        <span>{focusedCamera.lastAiAudit[lang]}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAiAuditCamera(focusedCamera)}
                        disabled={isAuditingCam}
                        className="px-3 py-1.5 bg-[#C9A24D] text-[#11261D] text-xs font-bold rounded-lg hover:bg-[#d8b463] transition-colors flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{isAuditingCam ? t.analyzing : t.aiInspectCam}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {cameras.map((cam) => (
                    <button
                      key={cam.id}
                      type="button"
                      onClick={() => setFocusedCamId(cam.id)}
                      className={`text-start bg-white rounded-xl overflow-hidden border transition-colors ${
                        focusedCamera.id === cam.id
                          ? 'border-[#C9A24D] ring-2 ring-[#C9A24D]/40'
                          : 'border-[#11261D]/15'
                      }`}
                    >
                      <div className="h-24 bg-[#11261D] relative">
                        <img
                          src={cam.previewImage}
                          alt={cam.name[lang]}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30" />
                        <span className="absolute bottom-1.5 start-2 text-[11px] font-bold text-white">
                          {cam.zone[lang]}
                        </span>
                      </div>
                      <div className="p-2.5">
                        <div className="text-xs font-bold text-[#11261D] truncate">
                          {cam.name[lang]}
                        </div>
                        <div className="text-[11px] text-[#111C17]/60 font-mono-num truncate">
                          {cam.streamUrl}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 space-y-5">
                <div className="bg-white border border-[#11261D]/10 rounded-xl p-5 space-y-4">
                  <h3 className="text-sm font-bold text-[#11261D] border-b border-[#11261D]/10 pb-2.5">
                    {t.addCamera}
                  </h3>
                  <form onSubmit={handleAddCamera} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-[#111C17]/70 mb-1">{t.camNameLabel}</label>
                      <input
                        type="text"
                        required
                        value={newCamName}
                        onChange={(e) => setNewCamName(e.target.value)}
                        placeholder={t.camNamePlaceholder}
                        className="w-full bg-[#F7F5F0] border border-[#11261D]/15 rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-[#111C17]/70 mb-1">{t.camUrlLabel}</label>
                      <input
                        type="text"
                        required
                        value={newCamUrl}
                        onChange={(e) => setNewCamUrl(e.target.value)}
                        placeholder="rtsp://192.168.1.105:554/stream1"
                        className="w-full bg-[#F7F5F0] border border-[#11261D]/15 rounded-lg px-3 py-2 font-mono-num"
                      />
                    </div>
                    <div>
                      <label className="block text-[#111C17]/70 mb-1">{t.camZoneLabel}</label>
                      <select
                        value={newCamZoneKey}
                        onChange={(e) => setNewCamZoneKey(e.target.value as any)}
                        className="w-full bg-[#F7F5F0] border border-[#11261D]/15 rounded-lg px-3 py-2"
                      >
                        <option value="main">{cameras[0]?.zone[lang]}</option>
                        <option value="kitchen">{cameras[1]?.zone[lang]}</option>
                        <option value="storage">{cameras[2]?.zone[lang]}</option>
                        <option value="terrace">{cameras[3]?.zone[lang]}</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#11261D] text-[#C9A24D] font-bold rounded-lg hover:bg-[#1a3a2c] transition-colors"
                    >
                      {t.linkCameraNowBtn}
                    </button>
                  </form>
                </div>

                <div className="bg-white border border-[#11261D]/10 rounded-xl p-5 space-y-3 text-xs">
                  <h4 className="font-bold text-[#11261D]">{t.posSecurityLogTitle}</h4>
                  <div className="divide-y divide-[#11261D]/10">
                    <div className="py-2.5 flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{t.logEvent1}</div>
                        <div className="text-[#111C17]/60">{t.logSub1}</div>
                      </div>
                      <span className="font-mono-num text-[#16A34A] font-bold">13:20:14</span>
                    </div>
                    <div className="py-2.5 flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{t.logEvent2}</div>
                        <div className="text-[#111C17]/60">{t.logSub2}</div>
                      </div>
                      <span className="font-mono-num text-[#16A34A] font-bold">13:52:40</span>
                    </div>
                    <div className="py-2.5 flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{t.logEvent3}</div>
                        <div className="text-[#111C17]/60">{t.logSub3}</div>
                      </div>
                      <span className="font-mono-num text-[#D97706] font-bold">11:30:05</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            MODULE 7: MULTI-DIRECTIONAL DOMAIN, CLOUD & TRADE LICENSE HUB
           =================================================================== */}
        {activeTab === 'integrations' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 bg-white border border-[#11261D]/10 rounded-xl p-6 space-y-5">
              <div>
                <h2 className="text-lg font-bold text-[#11261D]">{t.integrationsTitle}</h2>
                <p className="text-xs text-[#111C17]/65">{t.integrationsSub}</p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 bg-[#F7F5F0] rounded-xl space-y-2 border border-[#11261D]/10">
                  <div className="font-bold text-[#11261D] text-sm">{t.subdomainTitle}</div>
                  <p className="text-[#111C17]/70">{t.subdomainDesc}</p>
                  <div className="bg-[#11261D] text-[#C9A24D] p-3 rounded-lg font-mono-num text-xs">
                    Type: CNAME | Host: erp.groznyrest.com | Target: ghs.googlehosted.com
                  </div>
                </div>

                <div className="p-4 bg-[#F7F5F0] rounded-xl space-y-2 border border-[#11261D]/10">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#11261D] text-sm">{t.webhookTitle}</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${window.location.origin}/api/webhook/groznyrest`
                        );
                        setCopiedWebhook(true);
                        setTimeout(() => setCopiedWebhook(false), 3000);
                      }}
                      className="px-3 py-1 bg-[#11261D] text-[#C9A24D] rounded-md font-semibold flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedWebhook ? t.copiedText : t.copyApiBtn}</span>
                    </button>
                  </div>
                  <p className="text-[#111C17]/70">{t.webhookDesc}</p>
                  <div className="bg-white border border-[#11261D]/15 p-2.5 rounded font-mono-num text-[#11261D]">
                    POST /api/webhook/groznyrest
                  </div>
                </div>

                <div className="p-4 bg-[#F7F5F0] rounded-xl space-y-2 border border-[#11261D]/10">
                  <div className="font-bold text-[#11261D] text-sm">{t.cloudLayersTitle}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <div className="p-3 bg-white rounded-lg border border-[#11261D]/10">
                      <div className="font-bold text-[#11261D]">{t.layer1Title}</div>
                      <div className="text-[#111C17]/65">React 19 + Tailwind CSS + Vite</div>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-[#11261D]/10">
                      <div className="font-bold text-[#11261D]">{t.layer2Title}</div>
                      <div className="text-[#111C17]/65">Node.js + Express (/server.ts)</div>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-[#11261D]/10">
                      <div className="font-bold text-[#11261D]">{t.layer3Title}</div>
                      <div className="text-[#111C17]/65">Gemini 3.8 Flash Voice & Vision OCR</div>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-[#11261D]/10">
                      <div className="font-bold text-[#11261D]">{t.layer4Title}</div>
                      <div className="text-[#111C17]/65">Firebase Firestore / Supabase Ready</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white border border-[#11261D]/10 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#11261D]/10 pb-3">
                <div>
                  <h3 className="text-base font-bold text-[#11261D]">{t.licenseCardTitle}</h3>
                  <p className="text-xs text-[#111C17]/60">{t.licenseCardSub}</p>
                </div>
                <a
                  href={LEGAL_ENTITY.licensePdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#11261D] text-[#C9A24D] text-xs font-semibold rounded-lg flex items-center gap-1 whitespace-nowrap"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{t.openPdfBtn}</span>
                </a>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-[#11261D]/10">
                  <span className="text-[#111C17]/65">{t.tradeNameLabel}</span>
                  <span className="font-bold">{LEGAL_ENTITY.companyName[lang]}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#11261D]/10">
                  <span className="text-[#111C17]/65">{t.licenseRegLabel}</span>
                  <span className="font-mono-num font-bold">
                    {LEGAL_ENTITY.licenseNo} / {LEGAL_ENTITY.registerNo}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#11261D]/10">
                  <span className="text-[#111C17]/65">{t.ownerManagerLabel}</span>
                  <span className="font-bold">{LEGAL_ENTITY.ownerName[lang]}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#11261D]/10">
                  <span className="text-[#111C17]/65">{t.expiryDateLabel}</span>
                  <span className="font-mono-num font-semibold text-[#16A34A]">
                    {LEGAL_ENTITY.expiryDate} ({t.activeStatus})
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#111C17]/65">{t.locationLabel}</span>
                  <span className="text-end">{LEGAL_ENTITY.address[lang]}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ===================================================================
          COMPACT FLOATING CHAT & VOICE COMMAND BOX (Simple Chat Input Style)
         =================================================================== */}
      <div className="fixed bottom-4 end-6 z-50 w-full max-w-md px-4 sm:px-0 no-print">
        <div className="bg-white border-2 border-[#11261D] rounded-2xl shadow-lg overflow-hidden">
          {/* Compact Header */}
          <div
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="bg-[#11261D] text-[#F7F5F0] px-4 py-2.5 flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-[#C9A24D]">
              <MessageSquare className="w-4 h-4" />
              <span>{t.aiWidgetHeader}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono-num text-[#F7F5F0]/70 uppercase">{lang}</span>
              {isChatOpen ? (
                <ChevronDown className="w-4 h-4 text-[#C9A24D]" />
              ) : (
                <ChevronUp className="w-4 h-4 text-[#C9A24D]" />
              )}
            </div>
          </div>

          {/* Collapsible Chat Messages & Input Box */}
          {isChatOpen && (
            <div className="p-3 space-y-2.5 bg-[#F7F5F0]">
              {/* Compact Message Thread */}
              <div className="max-h-40 overflow-y-auto space-y-2 px-1 text-xs">
                {chatHistory.length === 0 ? (
                  <div className="bg-white border border-[#11261D]/10 rounded-xl p-2.5 text-[#111C17]/75 leading-relaxed">
                    {t.aiWelcome}
                  </div>
                ) : (
                  chatHistory.slice(-4).map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-2.5 rounded-xl flex items-start justify-between gap-2 ${
                        msg.sender === 'user'
                          ? 'bg-[#11261D] text-white ms-6'
                          : 'bg-white border border-[#11261D]/15 text-[#111C17] me-6'
                      }`}
                    >
                      <span className="leading-snug">{msg.text}</span>
                      {msg.sender === 'ai' && (
                        <button
                          type="button"
                          onClick={() => speakText(msg.text)}
                          className="text-[#11261D] hover:text-[#C9A24D] shrink-0"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Clean Chat-Style Input Bar (Voice Mic + Text Input + Send) */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  executeAiCommand();
                }}
                className="flex items-center gap-1.5 bg-white border border-[#11261D]/20 rounded-xl p-1.5"
              >
                <button
                  type="button"
                  onClick={handleToggleVoiceCommand}
                  title="Voice Command"
                  className={`p-2 rounded-lg transition-colors shrink-0 ${
                    isListening
                      ? 'bg-[#DC2626] text-white'
                      : 'bg-[#F7F5F0] text-[#11261D] hover:bg-[#C9A24D]/30'
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                <input
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder={t.aiPlaceholder}
                  className="flex-1 bg-transparent text-xs text-[#111C17] placeholder-[#111C17]/45 px-2 py-1 focus:outline-none"
                />

                <button
                  type="submit"
                  disabled={aiLoading}
                  className="p-2 bg-[#11261D] text-[#C9A24D] rounded-lg hover:bg-[#1a3a2c] disabled:opacity-40 transition-colors shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Clean Quiet Footer */}
      <footer className="bg-white border-t border-[#11261D]/10 px-6 py-4 mt-auto no-print">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-[#111C17]/60">
          <div>
            © {new Date().getFullYear()} {LEGAL_ENTITY.companyName[lang]} —{' '}
            {LEGAL_ENTITY.address[lang]}
          </div>
          <div className="flex items-center gap-4">
            <a
              href={LEGAL_ENTITY.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#11261D] underline"
            >
              groznyrest.com
            </a>
            <span>·</span>
            <span>{LEGAL_ENTITY.phone}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
