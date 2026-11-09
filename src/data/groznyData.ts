export type Lang = 'ar' | 'en' | 'ru';

export const LEGAL_ENTITY = {
  companyName: {
    ar: 'مطعم غروزني ش.ذ.م.م',
    en: 'GROZNY RESTAURANT L.L.C',
    ru: 'GROZNY RESTAURANT L.L.C (Ресторан «Грозный»)',
  },
  companyNameAr: 'مطعم غروزني ش.ذ.م.م',
  companyNameEn: 'GROZNY RESTAURANT L.L.C',
  companyNameRu: 'GROZNY RESTAURANT L.L.C (Ресторан Грозный)',
  licenseNo: '1166167',
  registerNo: '2559166',
  dcciNo: '452389',
  ownerName: {
    ar: 'لاليتا بازايفا (LALITA BAZHAEVA)',
    en: 'LALITA BAZHAEVA',
    ru: 'ЛАЛИТА БАЖАЕВА (LALITA BAZHAEVA)',
  },
  nationality: {
    ar: 'روسيا (Russia)',
    en: 'Russia',
    ru: 'Россия (Russia)',
  },
  address: {
    ar: 'محل 5 - داماك بارك سنترال، شارع الأصايل، الخليج التجاري، دبي',
    en: 'Shop 5, DAMAC Park Central, Al Asayel St, Business Bay, Dubai',
    ru: 'Магазин 5, DAMAC Park Central, ул. Аль-Асайель, Business Bay, Дубай',
  },
  phone: '+971 50 131 9454',
  landline: '+971 52 369 6006',
  email: 'bajaeva21@mail.ru',
  website: 'https://groznyrest.com',
  instagram: '@grozny_uae',
  openingHours: {
    ar: 'يومياً · 10:00 صباحاً – 10:00 مساءً',
    en: 'Daily · 10:00 AM – 10:00 PM',
    ru: 'Ежедневно · 10:00 – 22:00',
  },
  vatRate: 0.05, // 5% UAE VAT Mandatory per DET Rule #16 & #17
  trnNumber: '100492817400003',
  expiryDate: '28/03/2027',
  capitalAED: 100000,
  coordinates: { lat: 25.178917, lng: 55.270972 },
  licensePdfPath: '/assets/aistudio/trade_license_grozny_e9f5771d.pdf',
};

export interface RecipeIngredient {
  ingredient: Record<Lang, string>;
  qty: Record<Lang, string>;
  cost: number;
}

export interface MenuItem {
  id: string;
  barcode: string;
  category:
    | 'Caucasian Cuisine'
    | 'Main Courses'
    | 'Soups'
    | 'Salads'
    | 'Pasta'
    | 'Breakfasts'
    | 'Frozen Food'
    | 'Drinks';
  name: Record<Lang, string>;
  description: Record<Lang, string>;
  price: number; // AED (Inclusive of 5% VAT)
  foodCost: number; // AED (Tech Card Cost)
  prepTimeMin: number;
  stockPortions: number;
  ordersCount: number;
  image: string;
  isFrozenPack?: boolean;
  recipe: RecipeIngredient[];
}

export const MENU_CATEGORIES: {
  id: MenuItem['category'] | 'ALL';
  label: Record<Lang, string>;
}[] = [
  { id: 'ALL', label: { ar: 'كل الأصناف', en: 'All Menu', ru: 'Все меню' } },
  {
    id: 'Caucasian Cuisine',
    label: { ar: 'المطبخ القوقازي الشيشاني', en: 'Caucasian Cuisine', ru: 'Кавказская кухня' },
  },
  {
    id: 'Main Courses',
    label: { ar: 'الأطباق الرئيسية', en: 'Main Courses', ru: 'Основные блюда' },
  },
  { id: 'Soups', label: { ar: 'الشوربات', en: 'Soups', ru: 'Супы' } },
  { id: 'Salads', label: { ar: 'السلطات', en: 'Salads', ru: 'Салаты' } },
  { id: 'Pasta', label: { ar: 'الباستا والنودلز', en: 'Pasta & Udon', ru: 'Паста и Удон' } },
  { id: 'Breakfasts', label: { ar: 'الإفطار والبليني', en: 'Breakfasts', ru: 'Завтраки' } },
  {
    id: 'Frozen Food',
    label: { ar: 'المجمدات (بالكيلو)', en: 'Frozen Packs (1kg)', ru: 'Полуфабрикаты (1кг)' },
  },
  { id: 'Drinks', label: { ar: 'المشروبات', en: 'Drinks', ru: 'Напитки' } },
];

export const INITIAL_MENU: MenuItem[] = [
  {
    id: 'm-1',
    barcode: '6291001100018',
    category: 'Caucasian Cuisine',
    name: {
      ar: 'جيجيغ-غالناش (لحم بقري مع غالوشكي)',
      en: 'Zhizhig-Galnash (Beef Galushki)',
      ru: 'Жижиг-Галнаш (с говядиной)',
    },
    description: {
      ar: 'الطبق الشيشاني التقليدي الأشهر: لحم بقري طري مسلوق مع عجينة غالوشكي اليدوية، صلصة الثوم الغنية والمرق العطري.',
      en: 'Traditional Chechen dish served with tender boiled meat, handmade dumplings, rich garlic sauce, and aromatic broth.',
      ru: 'Традиционное чеченское блюдо с нежной отварной говядиной, галушками ручной работы, чесночным соусом и бульоном.',
    },
    price: 108,
    foodCost: 34,
    prepTimeMin: 22,
    stockPortions: 42,
    ordersCount: 385,
    image: 'https://npnomtfwmlodmlikkkrs.supabase.co/storage/v1/object/public/menu-images/gallery/1786200346589-img-1508.jpg',
    recipe: [
      {
        ingredient: {
          ar: 'لحم بقري أنغوس طازج',
          en: 'Angus Beef Chuck',
          ru: 'Свежая говядина Ангус',
        },
        qty: { ar: '380 غرام', en: '380g', ru: '380 г' },
        cost: 24.5,
      },
      {
        ingredient: {
          ar: 'عجينة غالوشكي يدوية',
          en: 'Handmade Galushki Dough',
          ru: 'Тесто для галушек ручной работы',
        },
        qty: { ar: '250 غرام', en: '250g', ru: '250 г' },
        cost: 4.5,
      },
      {
        ingredient: {
          ar: 'مرق وصلصة الثوم القوقازية',
          en: 'Caucasian Garlic Broth Sauce',
          ru: 'Кавказский чесночный соус и бульон',
        },
        qty: { ar: '150 مل', en: '150ml', ru: '150 мл' },
        cost: 5.0,
      },
    ],
  },
  {
    id: 'm-2',
    barcode: '6291001100025',
    category: 'Caucasian Cuisine',
    name: {
      ar: 'كوتام-غالناش (دجاج مع غالوشكي)',
      en: 'Kotam Galnash (Chicken Galushki)',
      ru: 'Котам-Галнаш (с курицей)',
    },
    description: {
      ar: 'طبق شيشاني أصيل يقدم مع الدجاج الطري، عجينة الغالوشكي اليدوية، صلصة الثوم والمرق.',
      en: 'Traditional Chechen dish served with chicken, handmade dumplings, garlic sauce, and broth.',
      ru: 'Традиционное чеченское блюдо с курицей, галушками ручной работы, чесночным соусом и бульоном.',
    },
    price: 100,
    foodCost: 28,
    prepTimeMin: 20,
    stockPortions: 35,
    ordersCount: 240,
    image: 'https://npnomtfwmlodmlikkkrs.supabase.co/storage/v1/object/public/menu-images/gallery/1786200384037-img-1582.jpg',
    recipe: [
      {
        ingredient: {
          ar: 'دجاج مزارع طازج',
          en: 'Fresh Farm Chicken',
          ru: 'Свежая фермерская курица',
        },
        qty: { ar: '450 غرام', en: '450g', ru: '450 г' },
        cost: 19.0,
      },
      {
        ingredient: {
          ar: 'عجينة غالوشكي يدوية',
          en: 'Handmade Galushki Dough',
          ru: 'Домашние галушки',
        },
        qty: { ar: '250 غرام', en: '250g', ru: '250 г' },
        cost: 4.5,
      },
      {
        ingredient: {
          ar: 'صلصة الثوم والأعشاب',
          en: 'Garlic Sauce & Herbs',
          ru: 'Чесночный соус и зелень',
        },
        qty: { ar: '120 مل', en: '120ml', ru: '120 мл' },
        cost: 4.5,
      },
    ],
  },
  {
    id: 'm-3',
    barcode: '6291001100032',
    category: 'Caucasian Cuisine',
    name: {
      ar: 'بار غالوشكي (طبق شيشاني تقليدي فاخر)',
      en: 'Baar Galushki',
      ru: 'Баар-Галнаш',
    },
    description: {
      ar: 'طبق قوقازي فاخر تقليدي يقدم مع الغالوشكي اليدوية والمرق المركز.',
      en: 'Authentic Chechen specialty served warm with handmade galushki dumplings and garlic sauce.',
      ru: 'Традиционное чеченское блюдо Баар с домашними галушками и чесночным соусом.',
    },
    price: 113,
    foodCost: 37,
    prepTimeMin: 25,
    stockPortions: 18,
    ordersCount: 165,
    image: 'https://npnomtfwmlodmlikkkrs.supabase.co/storage/v1/object/public/menu-images/gallery/1786200397729-img-1425.jpg',
    recipe: [
      {
        ingredient: {
          ar: 'حشوة بار الشيشانية التقليدية',
          en: 'Traditional Baar Stuffed Mince',
          ru: 'Традиционный чеченский Баар',
        },
        qty: { ar: '350 غرام', en: '350g', ru: '350 г' },
        cost: 28.0,
      },
      {
        ingredient: {
          ar: 'عجينة غالوشكي يدوية',
          en: 'Galushki Dumplings',
          ru: 'Галушки ручной лепки',
        },
        qty: { ar: '220 غرام', en: '220g', ru: '220 г' },
        cost: 4.5,
      },
      {
        ingredient: {
          ar: 'مرق متبل وصلصة ثوم',
          en: 'Spiced Broth & Garlic',
          ru: 'Пряный бульон и чеснок',
        },
        qty: { ar: '150 مل', en: '150ml', ru: '150 мл' },
        cost: 4.5,
      },
    ],
  },
  {
    id: 'm-4',
    barcode: '6291001100049',
    category: 'Caucasian Cuisine',
    name: {
      ar: 'مانتي قوقازي باللحم (12 قطعة)',
      en: 'Manti 12 pcs',
      ru: 'Манты 12 шт.',
    },
    description: {
      ar: 'زلابية قوقازية محشوة باللحم المتبل والبصل، مطهوة على البخار وتقدم مع القشطة الحامضة (سميتانا).',
      en: 'Traditional Caucasian dumplings filled with spiced meat and onions, steamed to perfection with sour cream.',
      ru: 'Традиционные кавказские манты с рубленым мясом и луком на пару со сметаной.',
    },
    price: 45,
    foodCost: 13.5,
    prepTimeMin: 18,
    stockPortions: 60,
    ordersCount: 310,
    image: 'https://npnomtfwmlodmlikkkrs.supabase.co/storage/v1/object/public/menu-images/products/1794149186211-manti-frozen.jpg',
    recipe: [
      {
        ingredient: {
          ar: 'لحم بقري وضأن مفروم متبل',
          en: 'Spiced Minced Beef & Lamb',
          ru: 'Рубленая говядина и баранина со специями',
        },
        qty: { ar: '240 غرام', en: '240g', ru: '240 г' },
        cost: 9.5,
      },
      {
        ingredient: {
          ar: 'عجينة مانتي رقيقة على البخار',
          en: 'Thin Steamed Dough',
          ru: 'Тонкое тесто на пару',
        },
        qty: { ar: '120 غرام', en: '120g', ru: '120 г' },
        cost: 2.0,
      },
      {
        ingredient: {
          ar: 'قشطة سميتانا طازجة',
          en: 'Smetana (Sour Cream)',
          ru: 'Домашняя сметана',
        },
        qty: { ar: '50 غرام', en: '50g', ru: '50 г' },
        cost: 2.0,
      },
    ],
  },
  {
    id: 'm-5',
    barcode: '6291001100056',
    category: 'Caucasian Cuisine',
    name: {
      ar: 'تشيبالغاش بالجبن القوقازي',
      en: 'Chepalgash with Cheese',
      ru: 'Чепалгаш с творогом',
    },
    description: {
      ar: 'فطيرة شيشانية تقليدية محشوة بالجبن القريش ومدهونة بالزبدة الذائبة.',
      en: 'Traditional Chechen flatbread filled with cottage cheese, pan-fried and brushed with melted butter.',
      ru: 'Традиционная чеченская лепешка с домашним творогом и топленым маслом.',
    },
    price: 25,
    foodCost: 7.0,
    prepTimeMin: 12,
    stockPortions: 80,
    ordersCount: 420,
    image: 'https://npnomtfwmlodmlikkkrs.supabase.co/storage/v1/object/public/menu-images/products/1794148686618-4.jpg',
    recipe: [
      {
        ingredient: {
          ar: 'جبن قريش قوقازي طبيعي',
          en: 'Caucasus Cottage Cheese',
          ru: 'Домашний кавказский творог',
        },
        qty: { ar: '150 غرام', en: '150g', ru: '150 г' },
        cost: 4.5,
      },
      {
        ingredient: {
          ar: 'عجينة كفير طرية وزبدة بلدية',
          en: 'Soft Kefir Dough & Clarified Butter',
          ru: 'Тесто на кефире и топленое масло',
        },
        qty: { ar: '180 غرام', en: '180g', ru: '180 г' },
        cost: 2.5,
      },
    ],
  },
  {
    id: 'm-6',
    barcode: '6291001100063',
    category: 'Caucasian Cuisine',
    name: {
      ar: 'هينغالش باليقطين',
      en: 'Hingalsh with Pumpkin',
      ru: 'Хингалш с тыквой',
    },
    description: {
      ar: 'فطيرة شيشانية تقليدية رقيقة محشوة باليقطين المتبل ومدهونة بالزبدة.',
      en: 'Traditional Chechen flatbread filled with sweet spiced pumpkin, pan-fried and served warm.',
      ru: 'Традиционная чеченская лепешка с нежной тыквой и топленым маслом.',
    },
    price: 25,
    foodCost: 6.5,
    prepTimeMin: 12,
    stockPortions: 75,
    ordersCount: 390,
    image: 'https://npnomtfwmlodmlikkkrs.supabase.co/storage/v1/object/public/menu-images/products/1794148631278-5.jpg',
    recipe: [
      {
        ingredient: {
          ar: 'يقطين حلو مشوي ومهروس',
          en: 'Roasted Sweet Pumpkin Mash',
          ru: 'Запеченная сладкая тыква',
        },
        qty: { ar: '160 غرام', en: '160g', ru: '160 г' },
        cost: 4.0,
      },
      {
        ingredient: {
          ar: 'عجينة فطير شيشاني وزبدة ذائبة',
          en: 'Flatbread Dough & Melted Butter',
          ru: 'Тонкое тесто и топленое масло',
        },
        qty: { ar: '180 غرام', en: '180g', ru: '180 г' },
        cost: 2.5,
      },
    ],
  },
  {
    id: 'm-7',
    barcode: '6291001100070',
    category: 'Caucasian Cuisine',
    name: {
      ar: 'تشيبوريك باللحم البقري المقرمش',
      en: 'Cheburek Beef (1 pcs)',
      ru: 'Чебурек с говядиной (1 шт.)',
    },
    description: {
      ar: 'فطيرة تشيبوريك ذهبية مقرمشة محشوة باللحم البقري المفروم المتبل والعصاري.',
      en: 'Savory beef cheburek with a golden crispy pastry shell filled with seasoned ground beef.',
      ru: 'Хрустящий золотистый чебурек с сочной начинкой из говядины и специй.',
    },
    price: 20,
    foodCost: 5.5,
    prepTimeMin: 10,
    stockPortions: 90,
    ordersCount: 295,
    image: 'https://npnomtfwmlodmlikkkrs.supabase.co/storage/v1/object/public/menu-images/products/1794149119299-chebureki-frozen.jpg',
    recipe: [
      {
        ingredient: {
          ar: 'لحم بقري مفروم مع البصل',
          en: 'Minced Beef & Onion Filling',
          ru: 'Фарш из говядины с луком',
        },
        qty: { ar: '110 غرام', en: '110g', ru: '110 г' },
        cost: 4.0,
      },
      {
        ingredient: {
          ar: 'عجينة تشيبوريك مقرمشة',
          en: 'Crispy Pastry Shell',
          ru: 'Хрустящее тесто',
        },
        qty: { ar: '90 غرام', en: '90g', ru: '90 г' },
        cost: 1.5,
      },
    ],
  },
  {
    id: 'm-8',
    barcode: '6291001100087',
    category: 'Main Courses',
    name: {
      ar: 'أوزبك بيلوف بلحم الضأن وأرز ليزر',
      en: 'Uzbek Plov with Lamb',
      ru: 'Узбекский плов с бараниной',
    },
    description: {
      ar: 'بيلوف أوزبكي أصيل مطهو بلحم الضأن مع أرز ليزر الفاخر والجزر الأصفر والبيض والسلطة.',
      en: 'Uzbek plov with lamb cooked with laser rice, carrots, eggs and fresh salad.',
      ru: 'Настоящий узбекский плов с бараниной, рисом Лазер, желтой морковью, яйцом и салатом.',
    },
    price: 40,
    foodCost: 13.0,
    prepTimeMin: 15,
    stockPortions: 50,
    ordersCount: 340,
    image: 'https://npnomtfwmlodmlikkkrs.supabase.co/storage/v1/object/public/menu-images/products/1794148896363-9.jpg',
    recipe: [
      {
        ingredient: {
          ar: 'قطع لحم ضأن طازج',
          en: 'Fresh Lamb Chunks',
          ru: 'Свежая баранина кусочками',
        },
        qty: { ar: '180 غرام', en: '180g', ru: '180 г' },
        cost: 8.5,
      },
      {
        ingredient: {
          ar: 'أرز ليزر أوزبكي وجزر أصفر',
          en: 'Uzbek Laser Rice & Yellow Carrots',
          ru: 'Узбекский рис Лазер и желтая морковь',
        },
        qty: { ar: '250 غرام', en: '250g', ru: '250 г' },
        cost: 4.5,
      },
    ],
  },
  {
    id: 'm-9',
    barcode: '6291001100094',
    category: 'Main Courses',
    name: {
      ar: 'كفتة لحم بقري مع البطاطا المهروسة',
      en: 'Beef Cutlets with Mashed Potatoes',
      ru: 'Котлеты говяжьи с пюре',
    },
    description: {
      ar: 'قطع كفتة لحم بقري مقلية بالزبدة تقدم مع بطاطا مهروسة كريمية.',
      en: 'Pan-fried minced beef patties served with creamy mashed potatoes.',
      ru: 'Домашние говяжьи котлеты со сливочным картофельным пюре.',
    },
    price: 45,
    foodCost: 14.0,
    prepTimeMin: 16,
    stockPortions: 40,
    ordersCount: 190,
    image: 'https://npnomtfwmlodmlikkkrs.supabase.co/storage/v1/object/public/menu-images/products/1794148909826-7.jpg',
    recipe: [
      {
        ingredient: {
          ar: 'كفتة لحم بقري (قطعتان)',
          en: 'Minced Beef Patties (2 pcs)',
          ru: 'Говяжьи котлеты (2 шт.)',
        },
        qty: { ar: '220 غرام', en: '220g', ru: '220 г' },
        cost: 10.0,
      },
      {
        ingredient: {
          ar: 'بطاطا مهروسة بالزبدة',
          en: 'Butter Mashed Potatoes',
          ru: 'Картофельное пюре на сливочном масле',
        },
        qty: { ar: '200 غرام', en: '200g', ru: '200 г' },
        cost: 4.0,
      },
    ],
  },
  {
    id: 'm-10',
    barcode: '6291001100100',
    category: 'Main Courses',
    name: {
      ar: 'بيلميني روسي تقليدي باللحم',
      en: 'Dumplings (Pelmeni)',
      ru: 'Пельмени домашние',
    },
    description: {
      ar: 'زلابية بيلميني روسية تقليدية محشوة باللحم المتبل تقدم ساخنة مع الزبدة والسميتانا.',
      en: 'Traditional bite-sized dumplings filled with seasoned meat, served hot and comforting.',
      ru: 'Домашние пельмени ручной лепки с сочной мясной начинкой и сметаной.',
    },
    price: 39,
    foodCost: 11.0,
    prepTimeMin: 14,
    stockPortions: 65,
    ordersCount: 230,
    image: 'https://npnomtfwmlodmlikkkrs.supabase.co/storage/v1/object/public/menu-images/products/1794149174437-pelmeni-frozen.jpg',
    recipe: [
      {
        ingredient: {
          ar: 'بيلميني لحم يدوي الصنع',
          en: 'Handmade Beef Pelmeni',
          ru: 'Домашние пельмени с говядиной',
        },
        qty: { ar: '280 غرام', en: '280g', ru: '280 г' },
        cost: 9.0,
      },
      {
        ingredient: {
          ar: 'زبدة وقشطة سميتانا',
          en: 'Butter & Sour Cream',
          ru: 'Сливочное масло и сметана',
        },
        qty: { ar: '50 غرام', en: '50g', ru: '50 г' },
        cost: 2.0,
      },
    ],
  },
  {
    id: 'm-11',
    barcode: '6291001100117',
    category: 'Soups',
    name: {
      ar: 'شوربة فايناخ الشيشانية باللحم',
      en: 'Vainakh Soup',
      ru: 'Суп Вайнахский',
    },
    description: {
      ar: 'شوربة مرق تقليدية غنية مع قطع اللحم البقري والبطاطا والتوابل القوقازية.',
      en: 'Traditional broth-based soup with beef, potatoes, and simple Caucasian spices.',
      ru: 'Традиционный наваристый суп с говядиной, картофелем и кавказскими специями.',
    },
    price: 35,
    foodCost: 10.0,
    prepTimeMin: 12,
    stockPortions: 45,
    ordersCount: 215,
    image: 'https://npnomtfwmlodmlikkkrs.supabase.co/storage/v1/object/public/menu-images/products/1794148725465-12.jpg',
    recipe: [
      {
        ingredient: {
          ar: 'مرق عظم بقري وقطع لحم',
          en: 'Beef Bone Broth & Meat',
          ru: 'Говяжий бульон с мясом',
        },
        qty: { ar: '350 مل', en: '350ml', ru: '350 мл' },
        cost: 8.0,
      },
      {
        ingredient: {
          ar: 'بطاطا وبصل وأعشاب جبلية',
          en: 'Potatoes, Onion & Herbs',
          ru: 'Картофель, лук и зелень',
        },
        qty: { ar: '150 غرام', en: '150g', ru: '150 г' },
        cost: 2.0,
      },
    ],
  },
  {
    id: 'm-12',
    barcode: '6291001100124',
    category: 'Soups',
    name: {
      ar: 'شوربة بورش بالشمندر واللحم البقري',
      en: 'Borscht Soup',
      ru: 'Борщ с говядиной',
    },
    description: {
      ar: 'شوربة الشمندر الشهيرة مع اللحم البقري والملفوف والبطاطا وتقدم ساخنة مع القشطة.',
      en: 'Beetroot soup with beef, cabbage, and potatoes, served hot with sour cream.',
      ru: 'Классический красный борщ с говядиной, свеклой, капустой и сметаной.',
    },
    price: 35,
    foodCost: 9.5,
    prepTimeMin: 12,
    stockPortions: 50,
    ordersCount: 260,
    image: 'https://npnomtfwmlodmlikkkrs.supabase.co/storage/v1/object/public/menu-images/products/1794148773431-11.jpg',
    recipe: [
      {
        ingredient: {
          ar: 'لحم بقري ومرق الشمندر الأحمر',
          en: 'Beef Brisket & Beetroot Broth',
          ru: 'Говяжья грудинка и свекольный бульон',
        },
        qty: { ar: '350 مل', en: '350ml', ru: '350 мл' },
        cost: 7.5,
      },
      {
        ingredient: {
          ar: 'ملفوف، سميتانا وشبت طازج',
          en: 'Cabbage, Sour Cream & Dill',
          ru: 'Капуста, сметана и укроп',
        },
        qty: { ar: '120 غرام', en: '120g', ru: '120 г' },
        cost: 2.0,
      },
    ],
  },
  {
    id: 'm-13',
    barcode: '6291001100131',
    category: 'Salads',
    name: {
      ar: 'سلطة ستيك اللحم المشوي الفاخرة',
      en: 'Steak Salad',
      ru: 'Тёплый салат со стейком',
    },
    description: {
      ar: 'شرائح ستيك مشوية طرية تقدم فوق الخضروات المقرمشة والطماطم الكرزية والصلصة الخاصة.',
      en: 'Tender grilled steak sliced over crisp mixed greens, cherry tomatoes, and savory dressing.',
      ru: 'Нежные ломтики стейка на подушке из свежей зелени, томатов черри и фирменной заправки.',
    },
    price: 129,
    foodCost: 42.0,
    prepTimeMin: 15,
    stockPortions: 25,
    ordersCount: 145,
    image: 'https://npnomtfwmlodmlikkkrs.supabase.co/storage/v1/object/public/menu-images/products/1785938970332-steak-salad.jpg',
    recipe: [
      {
        ingredient: {
          ar: 'ستيك تندرلوين بقري فاخر',
          en: 'Prime Tenderloin Steak',
          ru: 'Мраморный стейк из говядины',
        },
        qty: { ar: '220 غرام', en: '220g', ru: '220 г' },
        cost: 35.0,
      },
      {
        ingredient: {
          ar: 'خضروات طازجة وطماطم كرزية وصلصة',
          en: 'Mixed Greens, Cherry Tomatoes & Dressing',
          ru: 'Микс салата, черри и фирменный соус',
        },
        qty: { ar: '180 غرام', en: '180g', ru: '180 г' },
        cost: 7.0,
      },
    ],
  },
  {
    id: 'm-14',
    barcode: '6291001100148',
    category: 'Salads',
    name: {
      ar: 'سلطة الباذنجان المقرمش بالجبن الكريمي',
      en: 'Crispy Eggplant Salad',
      ru: 'Салат с хрустящими баклажанами',
    },
    description: {
      ar: 'باذنجان مقرمش ذهبي مع الجبن الكريمي والطماطم الطازجة وصلصة غروزني الخاصة.',
      en: 'Crispy eggplants with cream cheese and fresh tomatoes with house dressing.',
      ru: 'Хрустящие баклажаны со сливочным сыром, спелыми томатами и соусом.',
    },
    price: 29,
    foodCost: 8.0,
    prepTimeMin: 10,
    stockPortions: 55,
    ordersCount: 275,
    image: 'https://npnomtfwmlodmlikkkrs.supabase.co/storage/v1/object/public/menu-images/products/1794148999420-23.jpg',
    recipe: [
      {
        ingredient: {
          ar: 'باذنجان مقرمش وطماطم حمراء',
          en: 'Crispy Eggplant & Tomatoes',
          ru: 'Хрустящие баклажаны и томаты',
        },
        qty: { ar: '220 غرام', en: '220g', ru: '220 г' },
        cost: 5.0,
      },
      {
        ingredient: {
          ar: 'جبن كريمي وصلصة سويت تشيلي',
          en: 'Cream Cheese & Sweet Chili Glaze',
          ru: 'Сливочный сыр и соус свит-чили',
        },
        qty: { ar: '60 غرام', en: '60g', ru: '60 г' },
        cost: 3.0,
      },
    ],
  },
  {
    id: 'm-15',
    barcode: '6291001100155',
    category: 'Pasta',
    name: {
      ar: 'باستا مع شرائح البيف ستيك والبارميزان',
      en: 'Pasta with Beef Steak',
      ru: 'Паста со стейком из говядины',
    },
    description: {
      ar: 'شرائح ستيك بقري طرية مع الباستا في صلصة غنية بالأعشاب الطازجة وجبن البارميزان.',
      en: 'Tender beef steak slices tossed with pasta in a rich sauce, fresh herbs and Parmesan cheese.',
      ru: 'Паста с ломтиками говяжьего стейка в сливочном соусе с пармезаном.',
    },
    price: 129,
    foodCost: 39.0,
    prepTimeMin: 18,
    stockPortions: 30,
    ordersCount: 160,
    image: 'https://npnomtfwmlodmlikkkrs.supabase.co/storage/v1/object/public/menu-images/products/1794148740333-22.jpg',
    recipe: [
      {
        ingredient: {
          ar: 'شرائح ستيك بقري ستريب لوين',
          en: 'Beef Striploin Steak',
          ru: 'Стейк Стриплойн из говядины',
        },
        qty: { ar: '200 غرام', en: '200g', ru: '200 г' },
        cost: 31.0,
      },
      {
        ingredient: {
          ar: 'باستا إيطالية وكريمة وبارميزان',
          en: 'Italian Pasta, Cream & Parmigiano',
          ru: 'Итальянская паста, сливки и пармезан',
        },
        qty: { ar: '220 غرام', en: '220g', ru: '220 г' },
        cost: 8.0,
      },
    ],
  },
  {
    id: 'm-16',
    barcode: '6291001100162',
    category: 'Breakfasts',
    name: {
      ar: 'بليني بالنوتيلا والفراولة والتوت',
      en: 'Blini With Nutella & Berries',
      ru: 'Блины с Нутеллой и ягодами',
    },
    description: {
      ar: 'فطائر بليني رقيقة تقدم مع شوكولاتة نوتيلا والفراولة الطازجة والتوت الأزرق.',
      en: 'Delicate thin pancakes served with Nutella spread, fresh strawberries and plump blueberries.',
      ru: 'Тонкие ажурные блинчики с пастой Nutella, свежей клубникой и голубикой.',
    },
    price: 20,
    foodCost: 6.0,
    prepTimeMin: 10,
    stockPortions: 60,
    ordersCount: 210,
    image: 'https://npnomtfwmlodmlikkkrs.supabase.co/storage/v1/object/public/menu-images/products/1794148760576-blini.jpg',
    recipe: [
      {
        ingredient: {
          ar: 'فطائر بليني رقيقة (3 قطع)',
          en: 'Crepe Blini Batter (3 pcs)',
          ru: 'Тонкие блинчики (3 шт.)',
        },
        qty: { ar: '150 غرام', en: '150g', ru: '150 г' },
        cost: 2.0,
      },
      {
        ingredient: {
          ar: 'شوكولاتة نوتيلا وتوت طازج',
          en: 'Nutella & Fresh Berries',
          ru: 'Паста Nutella и свежие ягоды',
        },
        qty: { ar: '80 غرام', en: '80g', ru: '80 г' },
        cost: 4.0,
      },
    ],
  },
  {
    id: 'm-17',
    barcode: '6291001100179',
    category: 'Frozen Food',
    name: {
      ar: 'ملفوف محشي مجمد (عبوة 1 كغ للمنزل)',
      en: 'Cabbage Rolls 1kg (Frozen)',
      ru: 'Голубцы домашние 1кг (Заморозка)',
    },
    description: {
      ar: 'أوراق ملفوف محشوة باللحم والأرز المتبل جاهزة للطبخ المنزلي السريع (1 كغ).',
      en: 'Cabbage leaves filled with delicious meat and rice stuffing (1kg frozen pack).',
      ru: 'Домашние голубцы ручной работы с мясной начинкой (упаковка 1 кг).',
    },
    price: 130,
    foodCost: 44.0,
    prepTimeMin: 3,
    stockPortions: 28,
    ordersCount: 125,
    isFrozenPack: true,
    image: 'https://npnomtfwmlodmlikkkrs.supabase.co/storage/v1/object/public/menu-images/products/1794148602142-golubtsi-frozen.jpg',
    recipe: [
      {
        ingredient: {
          ar: 'حشوة لحم بقري مفروم وأرز',
          en: 'Minced Beef & Rice Filling',
          ru: 'Начинка из говяжьего фарша и риса',
        },
        qty: { ar: '750 غرام', en: '750g', ru: '750 г' },
        cost: 36.0,
      },
      {
        ingredient: {
          ar: 'أوراق ملفوف وتغليف مفرغ من الهواء',
          en: 'Cabbage Leaves & Vacuum Pack',
          ru: 'Капустный лист и вакуумная упаковка',
        },
        qty: { ar: '250 غرام', en: '250g', ru: '250 г' },
        cost: 8.0,
      },
    ],
  },
  {
    id: 'm-18',
    barcode: '6291001100186',
    category: 'Frozen Food',
    name: {
      ar: 'فارينيكي بالجبن القريش (عبوة 1 كغ مجمد)',
      en: 'Vareniki with Cottage Cheese 1kg',
      ru: 'Вареники с творогом 1кг (Заморозка)',
    },
    description: {
      ar: 'عبوة 1 كيلو من الفارينيكي اليدوي المحشو بالجبن القريش الطبيعي.',
      en: 'Handmade dumplings filled with farm cottage cheese (1kg frozen pack).',
      ru: 'Домашние вареники ручной лепки с натуральным творогом (1 кг).',
    },
    price: 70,
    foodCost: 22.0,
    prepTimeMin: 3,
    stockPortions: 34,
    ordersCount: 140,
    isFrozenPack: true,
    image: 'https://npnomtfwmlodmlikkkrs.supabase.co/storage/v1/object/public/menu-images/products/1794148947873-ch-vareniki-frozen.jpg',
    recipe: [
      {
        ingredient: {
          ar: 'حشوة جبن قريش قوقازي',
          en: 'Cottage Cheese Filling',
          ru: 'Начинка из фермерского творога',
        },
        qty: { ar: '600 غرام', en: '600g', ru: '600 г' },
        cost: 16.0,
      },
      {
        ingredient: {
          ar: 'عجينة فارينيكي يدوية وتغليف',
          en: 'Handmade Dough & Packaging',
          ru: 'Домашнее тесто и упаковка',
        },
        qty: { ar: '400 غرام', en: '400g', ru: '400 г' },
        cost: 6.0,
      },
    ],
  },
  {
    id: 'm-19',
    barcode: '5449000000996',
    category: 'Drinks',
    name: {
      ar: 'كوكاكولا كلاسيك / ماونتن ديو بارد',
      en: 'Coca-Cola Classic / Soft Drink',
      ru: 'Кока-Кола Классик / Напитки',
    },
    description: {
      ar: 'مشروب غازي بارد منعش 299 مل.',
      en: 'Chilled refreshing soft drink 299ml.',
      ru: 'Охлажденный прохладительный напиток 299 мл.',
    },
    price: 10,
    foodCost: 2.5,
    prepTimeMin: 1,
    stockPortions: 180,
    ordersCount: 510,
    image: 'https://npnomtfwmlodmlikkkrs.supabase.co/storage/v1/object/public/menu-images/products/1794149019332-17.jpg',
    recipe: [
      {
        ingredient: {
          ar: 'عبوة مشروب غازي 299 مل',
          en: 'Chilled Can 299ml',
          ru: 'Банка 299 мл',
        },
        qty: { ar: '1 عبوة', en: '1 unit', ru: '1 шт.' },
        cost: 2.5,
      },
    ],
  },
];

// Supply & Inventory Barcode Catalog for Fast Scanning / Manual Entry in Financials & Inventory
export interface SupplyBarcodeItem {
  barcode: string;
  name: Record<Lang, string>;
  categoryKey: string;
  defaultCostAED: number;
  supplier: Record<Lang, string>;
}

export const SUPPLY_BARCODE_CATALOG: SupplyBarcodeItem[] = [
  {
    barcode: '6297000901121',
    name: {
      ar: 'كرتون لحم بقري أنغوس حلال طازج (20 كغ)',
      en: 'Fresh Halal Angus Beef Chuck Box (20kg)',
      ru: 'Коробка свежей говядины Халяль Ангус (20 кг)',
    },
    categoryKey: 'meat',
    defaultCostAED: 780,
    supplier: {
      ar: 'شركة الإمارات للحوم الحلال ش.ذ.م.م',
      en: 'Emirates Halal Meats LLC',
      ru: 'Emirates Halal Meats LLC',
    },
  },
  {
    barcode: '6297000902241',
    name: {
      ar: 'دفعة جبن قوقازي وقشطة سميتانا طازجة (15 كغ)',
      en: 'Caucasian Cottage Cheese & Smetana Batch (15kg)',
      ru: 'Партия кавказского творога и сметаны (15 кг)',
    },
    categoryKey: 'dairy',
    defaultCostAED: 480,
    supplier: {
      ar: 'مزارع القوقاز للألبان - دبي',
      en: 'Caucasus Dairy Supply Dubai',
      ru: 'Caucasus Dairy Supply Дубай',
    },
  },
  {
    barcode: '6297000903385',
    name: {
      ar: 'أكياس دقيق قمح فاخر وأرز ليزر أوزبكي (50 كغ)',
      en: 'Premium Wheat Flour & Uzbek Laser Rice (50kg)',
      ru: 'Мука высшего сорта и узбекский рис Лазер (50 кг)',
    },
    categoryKey: 'groceries',
    defaultCostAED: 340,
    supplier: {
      ar: 'العوير لتوريد المواد الغذائية',
      en: 'Al Aweer Foodstuff Trading',
      ru: 'Al Aweer Foodstuff Trading',
    },
  },
  {
    barcode: '6297000904498',
    name: {
      ar: 'عبوات تغليف مفرغة من الهواء للمجمدات 1 كغ (500 كيس)',
      en: 'Vacuum Freezer Bags 1kg Packs (500 pcs)',
      ru: 'Вакуумные пакеты для заморозки 1кг (500 шт.)',
    },
    categoryKey: 'packaging',
    defaultCostAED: 210,
    supplier: {
      ar: 'دبي باك للتغليف الحراري',
      en: 'Dubai Pack Thermal Solutions',
      ru: 'Dubai Pack Thermal Solutions',
    },
  },
];

export interface FloorTable {
  id: string;
  number: string;
  zone: Record<Lang, string>;
  zoneKey: 'Main Hall' | 'Caucasus VIP' | 'Business Bay Terrace' | 'Takeaway & Frozen';
  seats: number;
  status: 'available' | 'occupied' | 'reserved';
  waiter: Record<Lang, string>;
  guestName?: Record<Lang, string>;
  openedAt?: string;
  currentTotalAED: number;
}

export const INITIAL_TABLES: FloorTable[] = [
  {
    id: 't-1',
    number: 'T-01',
    zoneKey: 'Main Hall',
    zone: { ar: 'الصالة الرئيسية', en: 'Main Hall', ru: 'Главный зал' },
    seats: 4,
    status: 'occupied',
    waiter: { ar: 'رسلان م.', en: 'Ruslan M.', ru: 'Руслан М.' },
    guestName: {
      ar: 'مجموعة الشيخ منصور',
      en: 'Sheikh Mansour Group',
      ru: 'Группа Шейха Мансура',
    },
    openedAt: '13:15',
    currentTotalAED: 283,
  },
  {
    id: 't-2',
    number: 'T-02',
    zoneKey: 'Main Hall',
    zone: { ar: 'الصالة الرئيسية', en: 'Main Hall', ru: 'Главный зал' },
    seats: 2,
    status: 'available',
    waiter: { ar: 'رسلان م.', en: 'Ruslan M.', ru: 'Руслан М.' },
    currentTotalAED: 0,
  },
  {
    id: 't-3',
    number: 'T-03',
    zoneKey: 'Main Hall',
    zone: { ar: 'الصالة الرئيسية', en: 'Main Hall', ru: 'Главный зал' },
    seats: 6,
    status: 'occupied',
    waiter: { ar: 'أمينة ك.', en: 'Amina K.', ru: 'Амина К.' },
    guestName: {
      ar: 'تيمور وعائلته',
      en: 'Timur & Family',
      ru: 'Тимур и семья',
    },
    openedAt: '13:40',
    currentTotalAED: 412,
  },
  {
    id: 't-4',
    number: 'VIP-1',
    zoneKey: 'Caucasus VIP',
    zone: { ar: 'قاعة القوقاز VIP', en: 'Caucasus VIP', ru: 'VIP Зал Кавказ' },
    seats: 8,
    status: 'reserved',
    waiter: { ar: 'أمينة ك.', en: 'Amina K.', ru: 'Амина К.' },
    guestName: {
      ar: 'وفد القنصلية (15:00)',
      en: 'Embassy Delegation (15:00)',
      ru: 'Делегация консульства (15:00)',
    },
    currentTotalAED: 0,
  },
  {
    id: 't-5',
    number: 'VIP-2',
    zoneKey: 'Caucasus VIP',
    zone: { ar: 'قاعة القوقاز VIP', en: 'Caucasus VIP', ru: 'VIP Зал Кавказ' },
    seats: 6,
    status: 'occupied',
    waiter: { ar: 'زاور ب.', en: 'Zaur B.', ru: 'Заур Б.' },
    guestName: {
      ar: 'خالد الفلاسي',
      en: 'Khalid Al Falasi',
      ru: 'Халид Аль-Фаласи',
    },
    openedAt: '12:50',
    currentTotalAED: 545,
  },
  {
    id: 't-6',
    number: 'TR-01',
    zoneKey: 'Business Bay Terrace',
    zone: { ar: 'تراس الخليج التجاري', en: 'Business Bay Terrace', ru: 'Терраса Business Bay' },
    seats: 4,
    status: 'available',
    waiter: { ar: 'زاور ب.', en: 'Zaur B.', ru: 'Заур Б.' },
    currentTotalAED: 0,
  },
  {
    id: 't-7',
    number: 'TR-02',
    zoneKey: 'Business Bay Terrace',
    zone: { ar: 'تراس الخليج التجاري', en: 'Business Bay Terrace', ru: 'Терраса Business Bay' },
    seats: 4,
    status: 'occupied',
    waiter: { ar: 'رسلان م.', en: 'Ruslan M.', ru: 'Руслан М.' },
    guestName: {
      ar: 'إيلينا فولكوفا',
      en: 'Elena Volkova',
      ru: 'Елена Волкова',
    },
    openedAt: '14:05',
    currentTotalAED: 158,
  },
  {
    id: 't-8',
    number: 'FZ-01',
    zoneKey: 'Takeaway & Frozen',
    zone: { ar: 'طلبات السفري والمجمدات', en: 'Takeaway & Frozen', ru: 'Навынос и Заморозка' },
    seats: 1,
    status: 'available',
    waiter: { ar: 'كاشير الاستقبال', en: 'Cashier Desk', ru: 'Касса' },
    currentTotalAED: 0,
  },
];

export interface FinancialRecord {
  id: string;
  barcode?: string;
  date: string;
  time: string;
  type: 'income' | 'expense';
  category: Record<Lang, string>;
  description: Record<Lang, string>;
  paymentMethod: Record<Lang, string>;
  amountAED: number;
  vatAED: number;
  staffOrSupplier: Record<Lang, string>;
  invoiceRef: string;
}

export const INITIAL_FINANCIALS: FinancialRecord[] = [
  {
    id: 'fin-1',
    barcode: '6291001100018',
    date: '2026-11-09',
    time: '14:10',
    type: 'income',
    category: {
      ar: 'مبيعات الصالة (POS)',
      en: 'Dine-In POS Sales',
      ru: 'Продажи в зале (POS)',
    },
    description: {
      ar: 'إغلاق فاتورة طاولة VIP-2 (جيجيغ-غالناش ×2، سلطة ستيك، مانتي، مشروبات)',
      en: 'Table VIP-2 Settlement (Zhizhig-Galnash x2, Steak Salad, Manti, Drinks)',
      ru: 'Оплата стола VIP-2 (Жижиг-Галнаш x2, Салат со стейком, Манты, Напитки)',
    },
    paymentMethod: {
      ar: 'بطاقة بنكية (Network)',
      en: 'Card (Network)',
      ru: 'Банковская карта (Network)',
    },
    amountAED: 545.0,
    vatAED: 25.95,
    staffOrSupplier: { ar: 'زاور ب.', en: 'Zaur B.', ru: 'Заур Б.' },
    invoiceRef: 'INV-GRZ-8841',
  },
  {
    id: 'fin-2',
    barcode: '6291001100179',
    date: '2026-11-09',
    time: '13:52',
    type: 'income',
    category: {
      ar: 'طلب أونلاين (groznyrest.com)',
      en: 'Online Order (groznyrest.com)',
      ru: 'Онлайн-заказ (groznyrest.com)',
    },
    description: {
      ar: 'طلب ويب #419: ملفوف محشي مجمد 1 كغ + فارينيكي 1 كغ + هينغالش ×2',
      en: 'Web Order #419: Frozen Cabbage Rolls 1kg + Vareniki 1kg + Hingalsh x2',
      ru: 'Веб-заказ #419: Голубцы 1кг + Вареники 1кг + Хингалш x2',
    },
    paymentMethod: {
      ar: 'دفع إلكتروني (groznyrest.com)',
      en: 'Online (groznyrest.com)',
      ru: 'Онлайн (groznyrest.com)',
    },
    amountAED: 250.0,
    vatAED: 11.9,
    staffOrSupplier: {
      ar: 'الربط التلقائي للموقع',
      en: 'Web Webhook Sync',
      ru: 'Синхронизация сайта',
    },
    invoiceRef: 'WEB-GRZ-0419',
  },
  {
    id: 'fin-3',
    barcode: '6291001100025',
    date: '2026-11-09',
    time: '13:20',
    type: 'income',
    category: {
      ar: 'مبيعات الصالة (POS)',
      en: 'Dine-In POS Sales',
      ru: 'Продажи в зале (POS)',
    },
    description: {
      ar: 'فاتورة طاولة T-01 (كوتام غالناش، أوزبك بيلوف، شوربة بورش، تشيبالغاش)',
      en: 'Table T-01 Bill (Kotam Galnash, Uzbek Plov, Borscht, Chepalgash)',
      ru: 'Счет стола T-01 (Котам-Галнаш, Узбекский плов, Борщ, Чепалгаш)',
    },
    paymentMethod: {
      ar: 'نقدي (Cash)',
      en: 'Cash',
      ru: 'Наличные (Cash)',
    },
    amountAED: 283.0,
    vatAED: 13.48,
    staffOrSupplier: { ar: 'رسلان م.', en: 'Ruslan M.', ru: 'Руслан М.' },
    invoiceRef: 'INV-GRZ-8840',
  },
  {
    id: 'fin-4',
    barcode: '6297000901121',
    date: '2026-11-09',
    time: '11:30',
    type: 'expense',
    category: {
      ar: 'توريد لحوم ودواجن طازجة',
      en: 'Raw Meat & Poultry Supply',
      ru: 'Закупка свежего мяса и птицы',
    },
    description: {
      ar: 'توريد لحم بقري أنغوس ولحم ضأن حلال طازج للمطبخ القوقازي',
      en: 'Daily Fresh Halal Beef Chuck & Lamb Delivery',
      ru: 'Ежедневная поставка свежей говядины и баранины Халяль',
    },
    paymentMethod: {
      ar: 'تحويل بنكي',
      en: 'Bank Transfer',
      ru: 'Банковский перевод',
    },
    amountAED: 1420.0,
    vatAED: 67.62,
    staffOrSupplier: {
      ar: 'شركة الإمارات للحوم الحلال ش.ذ.م.م',
      en: 'Emirates Halal Meats LLC',
      ru: 'Emirates Halal Meats LLC',
    },
    invoiceRef: 'SUP-90214',
  },
  {
    id: 'fin-5',
    barcode: '6297000902241',
    date: '2026-11-09',
    time: '10:15',
    type: 'expense',
    category: {
      ar: 'أجبان قوقازية وألبان وسميتانا',
      en: 'Dairy & Caucasian Cheese',
      ru: 'Молочные продукты и кавказский сыр',
    },
    description: {
      ar: 'شحنة جبن قريش طازج وقشطة سميتانا وزبدة بلدية للفطائر',
      en: 'Fresh Cottage Cheese, Smetana & Clarified Butter Batch',
      ru: 'Партия свежего творога, сметаны и топленого масла',
    },
    paymentMethod: {
      ar: 'نقدي (Cash)',
      en: 'Cash',
      ru: 'Наличные (Cash)',
    },
    amountAED: 480.0,
    vatAED: 22.86,
    staffOrSupplier: {
      ar: 'مزارع القوقاز للألبان - دبي',
      en: 'Caucasus Dairy Supply Dubai',
      ru: 'Caucasus Dairy Supply Дубай',
    },
    invoiceRef: 'SUP-90198',
  },
  {
    id: 'fin-6',
    barcode: '6291001100999',
    date: '2026-11-08',
    time: '21:45',
    type: 'income',
    category: {
      ar: 'إغلاق وردية المساء (Z-Report)',
      en: 'Evening Shift POS Closing',
      ru: 'Закрытие вечерней смены (Z-Отчет)',
    },
    description: {
      ar: 'إجمالي مبيعات الوردية المسائية للصالة والتوصيل (38 طلب)',
      en: 'Consolidated Evening Shift Dine-In & Delivery Sales (38 Orders)',
      ru: 'Сводная выручка вечерней смены зала и доставки (38 заказов)',
    },
    paymentMethod: {
      ar: 'بطاقة بنكية (Network)',
      en: 'Card (Network)',
      ru: 'Банковская карта (Network)',
    },
    amountAED: 6840.0,
    vatAED: 325.71,
    staffOrSupplier: { ar: 'أمينة ك.', en: 'Amina K.', ru: 'Амина К.' },
    invoiceRef: 'Z-REP-1108',
  },
  {
    id: 'fin-7',
    barcode: '6297000909901',
    date: '2026-11-08',
    time: '16:00',
    type: 'expense',
    category: {
      ar: 'فواتير ديوا والغاز والبلدية',
      en: 'Utilities & Municipality',
      ru: 'Коммунальные услуги DEWA и муниципалитет',
    },
    description: {
      ar: 'فاتورة كهرباء ومياه وتبريد ديوا (محل 5 داماك بارك سنترال)',
      en: 'DEWA Electricity, Chiller & Gas Commercial Bill (Shop 5 DAMAC Park Central)',
      ru: 'Счет DEWA за электричество, охлаждение и газ (Магазин 5 DAMAC Park Central)',
    },
    paymentMethod: {
      ar: 'تحويل بنكي',
      en: 'Bank Transfer',
      ru: 'Банковский перевод',
    },
    amountAED: 1150.0,
    vatAED: 54.76,
    staffOrSupplier: {
      ar: 'هيئة كهرباء ومياه دبي (DEWA)',
      en: 'DEWA Dubai',
      ru: 'DEWA Дубай',
    },
    invoiceRef: 'DEWA-2026-11',
  },
];

export interface StaffMember {
  id: string;
  name: Record<Lang, string>;
  role: Record<Lang, string>;
  nationality: Record<Lang, string>;
  baseSalaryAED: number;
  overtimeAED: number;
  tipsBonusAED: number;
  advancesAED: number;
  deductionsAED: number;
  deductionReason?: Record<Lang, string>;
  annualLeaveTotal: number;
  annualLeaveUsed: number;
  attendanceStatus: 'On Shift' | 'Off Duty' | 'On Leave' | 'Late';
  checkInTime?: string;
}

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'st-1',
    name: {
      ar: 'لاليتا بازايفا (Lalita Bazhaeva)',
      en: 'Lalita Bazhaeva',
      ru: 'Лалита Бажаева',
    },
    role: {
      ar: 'المالك والمدير العام',
      en: 'Owner & General Manager',
      ru: 'Владелец и Генеральный директор',
    },
    nationality: { ar: 'روسيا', en: 'Russia', ru: 'Россия' },
    baseSalaryAED: 18000,
    overtimeAED: 0,
    tipsBonusAED: 0,
    advancesAED: 0,
    deductionsAED: 0,
    annualLeaveTotal: 30,
    annualLeaveUsed: 4,
    attendanceStatus: 'On Shift',
    checkInTime: '09:45',
  },
  {
    id: 'st-2',
    name: {
      ar: 'أصلان بيك دوداييف (Aslanbek Dudaev)',
      en: 'Aslanbek Dudaev',
      ru: 'Асланбек Дудаев',
    },
    role: {
      ar: 'كبير طهاة المطبخ القوقازي',
      en: 'Head Caucasian Chef',
      ru: 'Шеф-повар кавказской кухни',
    },
    nationality: { ar: 'روسيا (الشيشان)', en: 'Russia (Chechnya)', ru: 'Россия (Чечня)' },
    baseSalaryAED: 8500,
    overtimeAED: 650,
    tipsBonusAED: 400,
    advancesAED: 500,
    deductionsAED: 0,
    annualLeaveTotal: 30,
    annualLeaveUsed: 10,
    attendanceStatus: 'On Shift',
    checkInTime: '09:30',
  },
  {
    id: 'st-3',
    name: {
      ar: 'مادينا ماغومادوفا (Madina Magomadova)',
      en: 'Madina Magomadova',
      ru: 'Мадина Магомадова',
    },
    role: {
      ar: 'شيف المعجنات والغالوشكي اليدوية',
      en: 'Pastry & Galushki Master',
      ru: 'Мастер выпечки и галушек',
    },
    nationality: { ar: 'روسيا', en: 'Russia', ru: 'Россия' },
    baseSalaryAED: 6200,
    overtimeAED: 420,
    tipsBonusAED: 300,
    advancesAED: 0,
    deductionsAED: 150,
    deductionReason: {
      ar: 'تأخر صباحي 45 دقيقة (05/11)',
      en: 'Morning delay 45 min (05/11)',
      ru: 'Опоздание на 45 мин (05/11)',
    },
    annualLeaveTotal: 30,
    annualLeaveUsed: 6,
    attendanceStatus: 'On Shift',
    checkInTime: '09:50',
  },
  {
    id: 'st-4',
    name: {
      ar: 'رسلان ماميدوف (Ruslan Mamedov)',
      en: 'Ruslan Mamedov',
      ru: 'Руслан Мамедов',
    },
    role: {
      ar: 'كاشير نقاط البيع ومقدم طعام أول',
      en: 'Senior Waiter & POS Cashier',
      ru: 'Старший официант и кассир POS',
    },
    nationality: { ar: 'أذربيجان', en: 'Azerbaijan', ru: 'Азербайджан' },
    baseSalaryAED: 4800,
    overtimeAED: 310,
    tipsBonusAED: 550,
    advancesAED: 300,
    deductionsAED: 100,
    deductionReason: {
      ar: 'خطأ في إغلاق فاتورة رقم 8792',
      en: 'Receipt closing discrepancy #8792',
      ru: 'Ошибка при закрытии чека #8792',
    },
    annualLeaveTotal: 30,
    annualLeaveUsed: 12,
    attendanceStatus: 'On Shift',
    checkInTime: '10:00',
  },
  {
    id: 'st-5',
    name: {
      ar: 'أمينة كريموفا (Amina Karimova)',
      en: 'Amina Karimova',
      ru: 'Амина Каримова',
    },
    role: {
      ar: 'مشرفة الصالة والاستقبال',
      en: 'Hostess & Floor Supervisor',
      ru: 'Хостес и менеджер зала',
    },
    nationality: { ar: 'أوزبكستان', en: 'Uzbekistan', ru: 'Узбекистан' },
    baseSalaryAED: 5200,
    overtimeAED: 250,
    tipsBonusAED: 480,
    advancesAED: 0,
    deductionsAED: 0,
    annualLeaveTotal: 30,
    annualLeaveUsed: 8,
    attendanceStatus: 'On Shift',
    checkInTime: '09:55',
  },
  {
    id: 'st-6',
    name: {
      ar: 'زاور بيك علييف (Zaurbek Aliev)',
      en: 'Zaurbek Aliev',
      ru: 'Заурбек Алиев',
    },
    role: {
      ar: 'منسق قاعة VIP وطلبات التوصيل',
      en: 'VIP Hall & Delivery Coordinator',
      ru: 'Координатор VIP-зала и доставки',
    },
    nationality: { ar: 'روسيا', en: 'Russia', ru: 'Россия' },
    baseSalaryAED: 4500,
    overtimeAED: 180,
    tipsBonusAED: 320,
    advancesAED: 400,
    deductionsAED: 200,
    deductionReason: {
      ar: 'غياب بدون إشعار مسبق (02/11)',
      en: 'Unnotified absence (02/11)',
      ru: 'Отсутствие без предупреждения (02/11)',
    },
    annualLeaveTotal: 30,
    annualLeaveUsed: 19,
    attendanceStatus: 'On Leave',
  },
];

export interface CustomerProfile {
  id: string;
  name: Record<Lang, string>;
  phone: string;
  tier: Record<Lang, string>;
  visitsCount: number;
  totalSpentAED: number;
  favoriteDish: Record<Lang, string>;
  lastVisit: Record<Lang, string>;
}

export const INITIAL_CUSTOMERS: CustomerProfile[] = [
  {
    id: 'c-1',
    name: {
      ar: 'راشد السويدي',
      en: 'Rashid Al Suwaidi',
      ru: 'Рашид Аль-Сувайди',
    },
    phone: '+971 50 492 8810',
    tier: { ar: 'عضوية ذهبية ملكية', en: 'Royal Gold VIP', ru: 'Золотой VIP Гость' },
    visitsCount: 28,
    totalSpentAED: 8420,
    favoriteDish: {
      ar: 'جيجيغ-غالناش باللحم البقري',
      en: 'Zhizhig-Galnash (Beef Galushki)',
      ru: 'Жижиг-Галнаш (с говядиной)',
    },
    lastVisit: { ar: 'اليوم 13:15', en: 'Today 13:15', ru: 'Сегодня 13:15' },
  },
  {
    id: 'c-2',
    name: {
      ar: 'تيمور خاسانوف',
      en: 'Timur Khasanov',
      ru: 'Тимур Хасанов',
    },
    phone: '+971 58 910 3341',
    tier: { ar: 'عضوية ذهبية ملكية', en: 'Royal Gold VIP', ru: 'Золотой VIP Гость' },
    visitsCount: 34,
    totalSpentAED: 11250,
    favoriteDish: {
      ar: 'بار غالوشكي وتشيبالغاش بالجبن',
      en: 'Baar Galushki & Chepalgash',
      ru: 'Баар-Галнаш и Чепалгаш',
    },
    lastVisit: { ar: 'اليوم 13:40', en: 'Today 13:40', ru: 'Сегодня 13:40' },
  },
  {
    id: 'c-3',
    name: {
      ar: 'إيلينا فولكوفا',
      en: 'Elena Volkova',
      ru: 'Елена Волкова',
    },
    phone: '+971 52 771 0942',
    tier: { ar: 'عميل متجر المجمدات والأونلاين', en: 'Online & Frozen VIP', ru: 'Покупатель полуфабрикатов' },
    visitsCount: 16,
    totalSpentAED: 3890,
    favoriteDish: {
      ar: 'ملفوف محشي مجمد 1 كغ وفارينيكي',
      en: 'Frozen Cabbage Rolls 1kg & Vareniki',
      ru: 'Голубцы 1кг и Вареники с творогом',
    },
    lastVisit: { ar: 'اليوم 14:05', en: 'Today 14:05', ru: 'Сегодня 14:05' },
  },
  {
    id: 'c-4',
    name: {
      ar: 'خالد الفلاسي',
      en: 'Khalid Al Falasi',
      ru: 'Халид Аль-Фаласи',
    },
    phone: '+971 55 301 9920',
    tier: { ar: 'عميل دائم VIP', en: 'Regular VIP', ru: 'Постоянный VIP Гость' },
    visitsCount: 12,
    totalSpentAED: 4180,
    favoriteDish: {
      ar: 'سلطة ستيك وأوزبك بيلوف',
      en: 'Steak Salad & Uzbek Plov',
      ru: 'Салат со стейком и Узбекский плов',
    },
    lastVisit: { ar: 'اليوم 12:50', en: 'Today 12:50', ru: 'Сегодня 12:50' },
  },
];

export interface CameraFeed {
  id: string;
  name: Record<Lang, string>;
  zone: Record<Lang, string>;
  protocol: 'HLS / RTSP Cloud' | 'WebRTC / Browser Cam' | 'HTTP Snapshot / Embed';
  streamUrl: string;
  status: 'online' | 'recording' | 'standby';
  posLinkedZone: Record<Lang, string>;
  lastAiAudit: Record<Lang, string>;
  previewImage: string;
}

export const INITIAL_CAMERAS: CameraFeed[] = [
  {
    id: 'cam-1',
    name: {
      ar: 'كاميرا 01 — الصالة الرئيسية والكاشير (POS Sync)',
      en: 'CAM 01 — Main Dining Hall & POS Desk',
      ru: 'КАМЕРА 01 — Главный зал и Касса POS',
    },
    zone: {
      ar: 'الصالة الرئيسية / الكاشير',
      en: 'Main Hall / Cashier',
      ru: 'Главный зал / Касса',
    },
    protocol: 'HLS / RTSP Cloud',
    streamUrl: 'rtsp://192.168.1.101:554/Streaming/Channels/101',
    status: 'recording',
    posLinkedZone: {
      ar: 'نقطة كاشير الصالة #1',
      en: 'Cashier Terminal #1',
      ru: 'Терминал кассы #1',
    },
    lastAiAudit: {
      ar: 'إشغال الطاولات 72% — طابور الكاشير: 0 انتظار — الانضباط: ممتاز',
      en: 'Table Occupancy 72% — Cashier Queue: 0 wait — Staff compliance: Optimal',
      ru: 'Заполняемость зала 72% — Очередь на кассе: 0 — Порядок в зале: Отлично',
    },
    previewImage: 'https://npnomtfwmlodmlikkkrs.supabase.co/storage/v1/object/public/menu-images/homepage/1784666666813-grozny.jpg',
  },
  {
    id: 'cam-2',
    name: {
      ar: 'كاميرا 02 — المطبخ القوقازي الساخن وركن الغالوشكي',
      en: 'CAM 02 — Hot Caucasian Kitchen & Dough Line',
      ru: 'КАМЕРА 02 — Горячий цех и лепка галушек',
    },
    zone: {
      ar: 'خط المطبخ الساخن',
      en: 'Hot Kitchen Line',
      ru: 'Горячий цех кухни',
    },
    protocol: 'HLS / RTSP Cloud',
    streamUrl: 'rtsp://192.168.1.102:554/Streaming/Channels/101',
    status: 'recording',
    posLinkedZone: {
      ar: 'شاشة المطبخ KDS #1',
      en: 'KDS Kitchen Screen #1',
      ru: 'Экран кухни KDS #1',
    },
    lastAiAudit: {
      ar: 'جميع الطهاة يرتدون القفازات والزي الرسمي — نظافة الأسطح 98%',
      en: 'All chefs wearing gloves & uniforms — Surface hygiene score: 98%',
      ru: 'Все повара в перчатках и форме — Чистота поверхностей: 98%',
    },
    previewImage: 'https://npnomtfwmlodmlikkkrs.supabase.co/storage/v1/object/public/menu-images/gallery/1786200346589-img-1508.jpg',
  },
  {
    id: 'cam-3',
    name: {
      ar: 'كاميرا 03 — قسم التبريد والمجمدات والمخزون',
      en: 'CAM 03 — Cold Storage & Frozen 1kg Packs',
      ru: 'КАМЕРА 03 — Склад и морозильная камера',
    },
    zone: {
      ar: 'المستودع والمجمدات',
      en: 'Storage & Freezers',
      ru: 'Склад и Заморозка',
    },
    protocol: 'HLS / RTSP Cloud',
    streamUrl: 'rtsp://192.168.1.103:554/Streaming/Channels/101',
    status: 'online',
    posLinkedZone: {
      ar: 'مخزون عبوات المجمدات 1 كغ',
      en: 'Inventory Freezer Zone',
      ru: 'Зона заморозки (упаковки 1 кг)',
    },
    lastAiAudit: {
      ar: 'درجة حرارة الفريزر -18°C مستقرة — باب المستودع مغلق بإحكام',
      en: 'Freezer temperature stable at -18°C — Storage door sealed properly',
      ru: 'Температура морозильной камеры -18°C в норме — Дверь склада закрыта',
    },
    previewImage: 'https://npnomtfwmlodmlikkkrs.supabase.co/storage/v1/object/public/menu-images/products/1794148602142-golubtsi-frozen.jpg',
  },
  {
    id: 'cam-4',
    name: {
      ar: 'كاميرا 04 — مدخل داماك بارك سنترال والتراس',
      en: 'CAM 04 — DAMAC Park Central Entrance & Terrace',
      ru: 'КАМЕРА 04 — Вход и Терраса Business Bay',
    },
    zone: {
      ar: 'التراس وبوابة التوصيل',
      en: 'Terrace & Delivery Pickup',
      ru: 'Терраса и зона выдачи доставки',
    },
    protocol: 'WebRTC / Browser Cam',
    streamUrl: 'local-webcam',
    status: 'online',
    posLinkedZone: {
      ar: 'مكتب تسليم الطلبات والتوصيل',
      en: 'Delivery Handover Desk',
      ru: 'Стойка выдачи заказов',
    },
    lastAiAudit: {
      ar: 'حركة استلام طلبات التوصيل سلسة — اللافتة مطابقة لاشتراطات DET',
      en: 'Delivery pickup flow smooth — Signboard compliant with Dubai DET rules',
      ru: 'Выдача заказов идет без задержек — Вывеска соответствует нормам DET Дубая',
    },
    previewImage: 'https://npnomtfwmlodmlikkkrs.supabase.co/storage/v1/object/public/menu-images/gallery/1786200384037-img-1582.jpg',
  },
];
