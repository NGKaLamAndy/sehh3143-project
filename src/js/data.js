// ===================================================================
// data.js  —  小島料理 (Mojima) Menu Data
// -------------------------------------------------------------------
// PURPOSE:
//   Holds all the default menu items, categories, and store settings.
//   When the app first runs, this data is loaded into localStorage so
//   the admin can edit it live without touching this file.
// ===================================================================

const DEFAULT_CATEGORIES = [
  { id: 'c1', name: '丼飯' },
  { id: 'c2', name: '飲品' },
];

// Each menu item has: id, categoryId, name, description, price,
// image URL, tags (badges), isAvailable flag, and optional customizations.
const DEFAULT_MENU_ITEMS = [
  {
    id: 'm1', categoryId: 'c1',
    name: '沖繩豬肉塔可飯 (辣)', description: '辣｜內有生番茄粒、生洋蔥粒、生菜絲、乳酪醬；包含湯、前菜',
    price: 58, image: 'picture/沖繩豬肉塔可飯 (辣).png',
    tags: ['辣'], isAvailable: true,
    customizations: [{ id: 'cust1', name: '加配餐飲', required: true, choices: [
      { id: 'opt1', name: '前菜+湯', price: 0 },
      { id: 'opt2', name: '前菜+薏米水', price: 8 },
      { id: 'opt3', name: '前菜+黑豆水', price: 8 },
    ]}]
  },
  {
    id: 'm2', categoryId: 'c1',
    name: '奶油咖喱雞飯 (辣)', description: '辣｜香濃奶油咖喱燴嫩雞，配熱飯；包含湯、前菜',
    price: 65, image: 'picture/奶油咖喱雞飯.jpg',
    tags: ['辣'], isAvailable: true,
    customizations: [{ id: 'cust1', name: '加配餐飲', required: true, choices: [
      { id: 'opt1', name: '前菜+湯', price: 0 },
      { id: 'opt2', name: '前菜+薏米水', price: 8 },
      { id: 'opt3', name: '前菜+黑豆水', price: 8 },
    ]}]
  },
  {
    id: 'm3', categoryId: 'c1',
    name: '豚肉西京燒丼', description: '味噌醃製豚肉，內有洋蔥絲；包含湯、前菜',
    price: 58, image: 'picture/豚肉西京燒丼.jpg',
    tags: [], isAvailable: true,
    customizations: [{ id: 'cust1', name: '加配餐飲', required: true, choices: [
      { id: 'opt1', name: '前菜+湯', price: 0 },
      { id: 'opt2', name: '前菜+薏米水', price: 8 },
      { id: 'opt3', name: '前菜+黑豆水', price: 8 },
    ]}]
  },
  {
    id: 'm4', categoryId: 'c1',
    name: '牛腹心牛丼（並盛）', description: '內有雜菜、生菜絲、日本生蛋、乳酪醬；包含湯、前菜',
    price: 105, image: 'picture/牛腹心牛丼.png',
    tags: [], isAvailable: true,
    customizations: [{ id: 'cust1', name: '加配餐飲', required: true, choices: [
      { id: 'opt1', name: '前菜+湯', price: 0 },
      { id: 'opt2', name: '前菜+薏米水', price: 8 },
      { id: 'opt3', name: '前菜+黑豆水', price: 8 },
    ]}]
  },
  {
    id: 'm5', categoryId: 'c1',
    name: '牛腹心牛丼（大盛）', description: '內有雜菜、生菜絲、日本生蛋、乳酪醬；包含湯、前菜',
    price: 132, image: 'picture/牛腹心牛丼.jpg',
    tags: ['大盛'], isAvailable: true,
    customizations: [{ id: 'cust1', name: '加配餐飲', required: true, choices: [
      { id: 'opt1', name: '前菜+湯', price: 0 },
      { id: 'opt2', name: '前菜+薏米水', price: 8 },
      { id: 'opt3', name: '前菜+黑豆水', price: 8 },
    ]}]
  },
  {
    id: 'm6', categoryId: 'c1',
    name: 'M4和牛肉眼牛丼（並盛）', description: '內有雜菜、生菜絲、日本生蛋、乳酪醬；包含湯、前菜',
    price: 110, image: "picture/a.png",
    tags: ['和牛'], isAvailable: true,
    customizations: [{ id: 'cust1', name: '加配餐飲', required: true, choices: [
      { id: 'opt1', name: '前菜+湯', price: 0 },
      { id: 'opt2', name: '前菜+薏米水', price: 8 },
      { id: 'opt3', name: '前菜+黑豆水', price: 8 },
    ]}]
  },
  {
    id: 'm7', categoryId: 'c1',
    name: 'M5腹心牛丼（並盛）', description: '內有雜菜、生菜絲、日本生蛋、乳酪醬；包含湯、前菜',
    price: 125, image: 'picture/Prime牛臀蓋牛丼.jpg',
    tags: ['和牛'], isAvailable: true,
    customizations: [{ id: 'cust1', name: '加配餐飲', required: true, choices: [
      { id: 'opt1', name: '前菜+湯', price: 0 },
      { id: 'opt2', name: '前菜+薏米水', price: 8 },
      { id: 'opt3', name: '前菜+黑豆水', price: 8 },
    ]}]
  },
  {
    id: 'm8', categoryId: 'c1',
    name: 'Prime 級牛臀蓋牛丼（並盛）', description: '內有雜菜、生菜絲、日本生蛋、乳酪醬；包含湯、前菜',
    price: 95, image: 'picture/Prime牛臀蓋牛丼.jpg',
    tags: ['Prime'], isAvailable: true,
    customizations: [{ id: 'cust1', name: '加配餐飲', required: true, choices: [
      { id: 'opt1', name: '前菜+湯', price: 0 },
      { id: 'opt2', name: '前菜+薏米水', price: 8 },
      { id: 'opt3', name: '前菜+黑豆水', price: 8 },
    ]}]
  },
  {
    id: 'm9', categoryId: 'c2',
    name: '可樂', description: '罐裝可口可樂',
    price: 6, image: 'picture/可樂.jpg',
    tags: [], isAvailable: true, customizations: []
  },
  {
    id: 'm10', categoryId: 'c2',
    name: '豆乳飲品', description: '日式豆乳飲品',
    price: 12, image: 'picture/豆乳飲品.jpg',
    tags: [], isAvailable: true, customizations: []
  },
  {
    id: 'm11', categoryId: 'c2',
    name: '波子汽水', description: '日式彈珠汽水',
    price: 12, image: 'picture/波子汽水.jpg',
    tags: [], isAvailable: true, customizations: []
  },
];

const DEFAULT_SETTINGS = {
  isOpen: true,
  operatingHours: '11:00 AM - 10:00 PM',
  orderAcceptTimeoutMins: 10,
};

// -----------------------------------------------------------------
// DELIVERY ZONE CONFIGURATION
// -----------------------------------------------------------------
// Restaurant location: 大角咀 (Tai Kok Tsui), Hong Kong
// Lat/Lng approximate center of Tai Kok Tsui
const DEFAULT_DELIVERY_SETTINGS = {
  // Restaurant coordinates (大角咀)
  restaurantLat: 22.3230,
  restaurantLng: 114.1590,
  restaurantAddress: '大角咀',

  // Whether delivery service is enabled at all
  deliveryEnabled: true,

  // Delivery zones — ordered from nearest to farthest.
  // Each zone has a max radius in km and a delivery fee.
  zones: [
    { id: 'z1', name: '步行範圍 (1km內)',   maxKm: 1.0, fee: 0,  label: '免運費' },
    { id: 'z2', name: '鄰近地區 (1-2km)',    maxKm: 2.0, fee: 15, label: '+$15' },
    { id: 'z3', name: '較遠地區 (2-3.5km)',  maxKm: 3.5, fee: 25, label: '+$25' },
  ],

  // Maximum delivery radius in km (anything beyond = out of range)
  maxDeliveryKm: 3.5,

  // Minimum order amount for delivery
  minDeliveryAmount: 50,

  // Known districts within delivery range (for text-based validation fallback)
  // These are Hong Kong districts near Tai Kok Tsui
  allowedDistricts: [
    '大角咀', '旺角', '太子', '奧運', '南昌', '深水埗',
    '長沙灣', '荔枝角', '油麻地', '佐敦', '尖沙咀',
    '何文田', '紅磡', '黃埔', '石硤尾', '又一村',
    '美孚', '西九龍', '九龍站', '柯士甸'
  ],

  // Blocked / out-of-range districts (explicitly too far)
  blockedDistricts: [
    '港島', '中環', '灣仔', '銅鑼灣', '北角', '鰂魚涌',
    '筲箕灣', '柴灣', '香港仔', '赤柱', '淺水灣',
    '沙田', '大埔', '粉嶺', '上水', '元朗', '天水圍',
    '屯門', '荃灣', '葵涌', '青衣', '將軍澳', '西貢',
    '馬鞍山', '火炭', '大學', '九龍塘', '鑽石山',
    '黃大仙', '彩虹', '觀塘', '九龍灣', '牛頭角',
    '藍田', '油塘', '調景嶺', '坑口', '東涌', '機場'
  ],
};
