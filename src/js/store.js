// ===================================================================
// store.js  —  State Management via localStorage
// -------------------------------------------------------------------
// PURPOSE:
//   In the original React app, shared state lived in "Context" objects
//   (CartContext, OrderContext, MenuContext). Here, we replace that
//   with localStorage so state is shared across all HTML pages.
//
// STORAGE KEYS:
//   mojima_cart              → current cart items []
//   mojima_orders            → all placed orders []
//   mojima_menu              → menu items + categories
//   mojima_settings          → store open/closed + business hours
//   mojima_delivery_settings → delivery zones, fees, geo config
// ===================================================================

const Store = {

  // -----------------------------------------------------------------
  // CART  (equivalent to CartContext.tsx)
  // -----------------------------------------------------------------

  getCart: function () {
    return JSON.parse(localStorage.getItem('mojima_cart') || '[]');
  },

  _saveCart: function (cart) {
    localStorage.setItem('mojima_cart', JSON.stringify(cart));
  },

  addToCart: function (menuItem, quantity, customizations, specialInstructions) {
    let extraPrice = 0;
    (menuItem.customizations || []).forEach(cust => {
      const choiceId = customizations[cust.id];
      if (choiceId) {
        const choice = cust.choices.find(c => c.id === choiceId);
        if (choice) extraPrice += choice.price;
      }
    });

    const unitPrice = menuItem.price + extraPrice;
    const cartItemId = menuItem.id + '-' + JSON.stringify(customizations) + '-' + (specialInstructions || '');

    const cart = this.getCart();
    const existingIndex = cart.findIndex(i => i.id === cartItemId);

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += quantity;
      cart[existingIndex].totalPrice = cart[existingIndex].quantity * unitPrice;
    } else {
      cart.push({
        id: cartItemId,
        menuItem: menuItem,
        quantity: quantity,
        selectedCustomizations: customizations,
        totalPrice: quantity * unitPrice,
        specialInstructions: specialInstructions || ''
      });
    }
    this._saveCart(cart);
  },

  removeFromCart: function (cartItemId) {
    const cart = this.getCart().filter(i => i.id !== cartItemId);
    this._saveCart(cart);
  },

  updateCartQuantity: function (cartItemId, quantity) {
    if (quantity <= 0) { this.removeFromCart(cartItemId); return; }
    const cart = this.getCart().map(item => {
      if (item.id === cartItemId) {
        const unitPrice = item.totalPrice / item.quantity;
        return { ...item, quantity, totalPrice: quantity * unitPrice };
      }
      return item;
    });
    this._saveCart(cart);
  },

  clearCart: function () {
    this._saveCart([]);
  },

  getCartTotal: function () {
    return this.getCart().reduce((sum, item) => sum + item.totalPrice, 0);
  },

  getCartCount: function () {
    return this.getCart().reduce((sum, item) => sum + item.quantity, 0);
  },

  // -----------------------------------------------------------------
  // ORDERS  (equivalent to OrderContext.tsx)
  // -----------------------------------------------------------------

  getOrders: function () {
    return JSON.parse(localStorage.getItem('mojima_orders') || '[]');
  },

  _saveOrders: function (orders) {
    localStorage.setItem('mojima_orders', JSON.stringify(orders));
  },

  addOrder: function (orderData) {
    const orders = this.getOrders();
    const newOrder = Object.assign({}, orderData, {
      id: 'MJ' + Date.now().toString().slice(-8),
      status: 'pending',
      createdAt: new Date().toISOString(),
    });
    orders.unshift(newOrder);
    this._saveOrders(orders);
    return newOrder;
  },

  updateOrderStatus: function (orderId, newStatus) {
    const orders = this.getOrders().map(o =>
      o.id === orderId ? Object.assign({}, o, { status: newStatus }) : o
    );
    this._saveOrders(orders);
  },

  getOrderById: function (orderId) {
    return this.getOrders().find(o => o.id === orderId) || null;
  },

  // -----------------------------------------------------------------
  // MENU  (equivalent to MenuContext.tsx)
  // -----------------------------------------------------------------

  getMenuData: function () {
    const MENU_VERSION = '2';
    const savedVersion = localStorage.getItem('mojima_menu_version');
    if (savedVersion !== MENU_VERSION) {
      const defaults = { categories: DEFAULT_CATEGORIES, menuItems: DEFAULT_MENU_ITEMS };
      localStorage.setItem('mojima_menu', JSON.stringify(defaults));
      localStorage.setItem('mojima_menu_version', MENU_VERSION);
      return defaults;
    }
    const saved = localStorage.getItem('mojima_menu');
    if (saved) return JSON.parse(saved);
    const defaults = { categories: DEFAULT_CATEGORIES, menuItems: DEFAULT_MENU_ITEMS };
    localStorage.setItem('mojima_menu', JSON.stringify(defaults));
    return defaults;
  },

  _saveMenuData: function (data) {
    localStorage.setItem('mojima_menu', JSON.stringify(data));
  },

  getCategories: function () { return this.getMenuData().categories; },
  getMenuItems:  function () { return this.getMenuData().menuItems; },

  addCategory: function (name) {
    const data = this.getMenuData();
    data.categories.push({ id: 'c' + Date.now(), name: name });
    this._saveMenuData(data);
  },

  updateCategory: function (id, name) {
    const data = this.getMenuData();
    data.categories = data.categories.map(c => c.id === id ? { ...c, name } : c);
    this._saveMenuData(data);
  },

  deleteCategory: function (id) {
    const data = this.getMenuData();
    data.categories = data.categories.filter(c => c.id !== id);
    data.menuItems  = data.menuItems.filter(i => i.categoryId !== id);
    this._saveMenuData(data);
  },

  addMenuItem: function (item) {
    const data = this.getMenuData();
    data.menuItems.push(Object.assign({ id: 'm' + Date.now(), isAvailable: true, tags: [], customizations: [] }, item));
    this._saveMenuData(data);
  },

  updateMenuItem: function (id, updates) {
    const data = this.getMenuData();
    data.menuItems = data.menuItems.map(i => i.id === id ? Object.assign({}, i, updates) : i);
    this._saveMenuData(data);
  },

  deleteMenuItem: function (id) {
    const data = this.getMenuData();
    data.menuItems = data.menuItems.filter(i => i.id !== id);
    this._saveMenuData(data);
  },

  // -----------------------------------------------------------------
  // STORE SETTINGS  (equivalent to MenuContext storeSettings)
  // -----------------------------------------------------------------

  getSettings: function () {
    const saved = localStorage.getItem('mojima_settings');
    if (saved) return JSON.parse(saved);
    localStorage.setItem('mojima_settings', JSON.stringify(DEFAULT_SETTINGS));
    return DEFAULT_SETTINGS;
  },

  saveSettings: function (settings) {
    localStorage.setItem('mojima_settings', JSON.stringify(settings));
  },

  isStoreOpen: function () { return this.getSettings().isOpen; },

  // -----------------------------------------------------------------
  // DELIVERY SETTINGS
  // -----------------------------------------------------------------

  getDeliverySettings: function () {
    const saved = localStorage.getItem('mojima_delivery_settings');
    if (saved) return JSON.parse(saved);
    localStorage.setItem('mojima_delivery_settings', JSON.stringify(DEFAULT_DELIVERY_SETTINGS));
    return DEFAULT_DELIVERY_SETTINGS;
  },

  saveDeliverySettings: function (settings) {
    localStorage.setItem('mojima_delivery_settings', JSON.stringify(settings));
  },

  // -----------------------------------------------------------------
  // TODAY'S SPECIALS  — array of menu item IDs flagged as specials
  // -----------------------------------------------------------------

  getSpecials: function () {
    const saved = localStorage.getItem('mojima_specials');
    if (saved) return JSON.parse(saved);
    // Default: 沖繩豬肉塔可飯 (辣) = m1
    const defaults = ['m1'];
    localStorage.setItem('mojima_specials', JSON.stringify(defaults));
    return defaults;
  },

  saveSpecials: function (ids) {
    localStorage.setItem('mojima_specials', JSON.stringify(ids));
  },

  isSpecial: function (itemId) {
    return this.getSpecials().includes(itemId);
  },

  toggleSpecial: function (itemId) {
    let specials = this.getSpecials();
    if (specials.includes(itemId)) {
      specials = specials.filter(id => id !== itemId);
    } else {
      specials.push(itemId);
    }
    this.saveSpecials(specials);
    return specials.includes(itemId);
  },

  // -----------------------------------------------------------------
  // DISCOUNT CODES
  // -----------------------------------------------------------------

  getDiscountCodes: function () {
    const saved = localStorage.getItem('mojima_discounts');
    if (saved) return JSON.parse(saved);
    return [];
  },

  saveDiscountCodes: function (codes) {
    localStorage.setItem('mojima_discounts', JSON.stringify(codes));
  },

  // Returns { valid, discount, label } or { valid: false }
  applyDiscountCode: function (code, subtotal) {
    const codes = this.getDiscountCodes();
    const entry = codes.find(c => c.code.toUpperCase() === (code || '').toUpperCase() && c.active !== false);
    if (!entry) return { valid: false };
    let discount = 0;
    if (entry.type === 'percent') {
      discount = Math.round(subtotal * entry.value / 100);
    } else if (entry.type === 'fixed') {
      discount = Math.min(entry.value, subtotal);
    }
    return { valid: true, discount, label: entry.label || code };
  },

  // -----------------------------------------------------------------
  // ORDER ACCEPT TIMEOUT (minutes)
  // -----------------------------------------------------------------

  getOrderTimeout: function () {
    return this.getSettings().orderAcceptTimeoutMins || 10;
  },

  // Returns remaining seconds for a pending order; negative = expired
  getOrderSecondsLeft: function (order) {
    if (order.status !== 'pending') return null;
    const timeoutMs = this.getOrderTimeout() * 60 * 1000;
    const elapsed = Date.now() - new Date(order.createdAt).getTime();
    return Math.floor((timeoutMs - elapsed) / 1000);
  },
};

// -----------------------------------------------------------------
// BROWSER NOTIFICATION HELPERS
// -----------------------------------------------------------------

function requestNotificationPermission(callback) {
  if (!('Notification' in window)) {
    if (callback) callback(false);
    return;
  }
  if (Notification.permission === 'granted') {
    if (callback) callback(true);
    return;
  }
  Notification.requestPermission().then(function(result) {
    if (callback) callback(result === 'granted');
  });
}

function showNotification(title, body, tag) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  try {
    new Notification(title, {
      body: body || '',
      tag:  tag  || 'mojima-' + Date.now(),
      icon: 'picture/沖繩豬肉塔可飯 (辣).png',
    });
  } catch(e) { /* Safari may throw */ }
}

// -----------------------------------------------------------------
// DELIVERY / GEO UTILITIES
// -----------------------------------------------------------------

// Haversine formula — calculate distance between two lat/lng points in km
function calcDistanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Determine which delivery zone a coordinate falls into.
// Returns { zone, fee, distance } or { error, distance } if out of range.
function getDeliveryZone(lat, lng) {
  const ds = Store.getDeliverySettings();
  if (!ds.deliveryEnabled) {
    return { error: '外送服務暫時停止', distance: null };
  }

  const dist = calcDistanceKm(ds.restaurantLat, ds.restaurantLng, lat, lng);
  const distRounded = Math.round(dist * 10) / 10; // 1 decimal

  // Find the smallest zone that contains this distance
  const sortedZones = [...ds.zones].sort((a, b) => a.maxKm - b.maxKm);
  for (const zone of sortedZones) {
    if (dist <= zone.maxKm) {
      return { zone: zone, fee: zone.fee, distance: distRounded };
    }
  }

  // Beyond all zones
  return {
    error: '抱歉，您的地址超出我們的外送範圍 (' + ds.maxDeliveryKm + 'km內)。距離約 ' + distRounded + 'km。',
    distance: distRounded
  };
}

// Text-based fallback: check if an address string contains a known district.
// Returns { allowed: true, district, fee } or { allowed: false, reason }.
function checkAddressDistrict(addressText) {
  const ds = Store.getDeliverySettings();
  if (!ds.deliveryEnabled) {
    return { allowed: false, reason: '外送服務暫時停止' };
  }

  const addr = addressText.trim();
  if (!addr) return { allowed: false, reason: '請輸入地址' };

  // Check blocked districts first
  for (const d of ds.blockedDistricts) {
    if (addr.includes(d)) {
      return { allowed: false, reason: '抱歉，「' + d + '」超出我們的外送範圍（僅限大角咀附近 ' + ds.maxDeliveryKm + 'km 內）' };
    }
  }

  // Check allowed districts — return a fee estimate based on rough zone mapping
  // Districts roughly within 1km
  const zone1 = ['大角咀', '奧運', '西九龍', '九龍站'];
  const zone2 = ['旺角', '太子', '南昌', '油麻地', '柯士甸'];
  const zone3 = ['深水埗', '長沙灣', '荔枝角', '佐敦', '尖沙咀', '何文田', '紅磡', '黃埔', '石硤尾', '又一村', '美孚'];

  for (const d of zone1) {
    if (addr.includes(d)) {
      const z = ds.zones.find(z => z.id === 'z1') || ds.zones[0];
      return { allowed: true, district: d, fee: z ? z.fee : 0, zoneName: z ? z.name : '' };
    }
  }
  for (const d of zone2) {
    if (addr.includes(d)) {
      const z = ds.zones.find(z => z.id === 'z2') || ds.zones[1];
      return { allowed: true, district: d, fee: z ? z.fee : 15, zoneName: z ? z.name : '' };
    }
  }
  for (const d of zone3) {
    if (addr.includes(d)) {
      const z = ds.zones.find(z => z.id === 'z3') || ds.zones[2];
      return { allowed: true, district: d, fee: z ? z.fee : 25, zoneName: z ? z.name : '' };
    }
  }

  // No district matched — unknown area
  return { allowed: false, reason: '無法識別地址所在區域，請確認地址包含區域名稱（如：大角咀、旺角、油麻地等），或使用定位功能。' };
}

// -----------------------------------------------------------------
// HELPER UTILITIES
// -----------------------------------------------------------------

function htmlEscape(str) {
  if (str === undefined || str === null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getStatusText(status) {
  const key = 'status.' + status;
  return t(key) !== key ? t(key) : (status || '');
}

// Render the public-facing header HTML
function renderHeader() {
  const settings = Store.getSettings();

  return `
  <header class="bg-orange-900 text-white py-5 px-8 relative overflow-hidden">
    <div class="max-w-7xl mx-auto flex justify-between items-start">
      <div>
        <h1 class="text-3xl font-bold tracking-wider mb-1">小島料理</h1>
        <p class="text-sm tracking-[0.2em] text-gray-400 mb-3">KOJIMA</p>
        <p class="text-sm text-gray-300 mb-3">慢煮牛肉・精選午餐</p>
        <div class="flex flex-wrap items-center gap-4 text-xs text-gray-400">
          <div class="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>大角咀</span>
          </div>
          <div class="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.4a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <a href="tel:64790063" class="hover:text-white transition-colors">64790063</a>
          </div>
          <div class="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span>${htmlEscape(settings.operatingHours)}</span>
            <span class="ml-1 px-2 py-0.5 rounded text-[10px] font-bold ${settings.isOpen ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}">
              ${settings.isOpen ? t('store.open') : t('store.closed')}
            </span>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-end gap-3 z-10">
        <div class="text-[120px] leading-none font-bold text-white/5 absolute right-8 top-4 select-none pointer-events-none">島</div>
        ${renderLangSwitcher()}
        <nav class="flex gap-4">
          <a href="menu.html" class="text-sm hover:text-gray-300">${t('nav.menu')}</a>
          <a href="order-tracking.html" class="text-sm hover:text-gray-300">${t('nav.trackOrder')}</a>
          <a href="admin-orders.html" class="text-sm hover:text-gray-300">${t('nav.admin')}</a>
        </nav>
      </div>
    </div>
  </header>`;
}

// Render the floating cart button (shown only when cart has items)
function renderCartButton() {
  const count = Store.getCartCount();
  const total = Store.getCartTotal();
  if (count === 0) return '';
  return `
  <div class="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-200 z-50 flex justify-center">
    <a href="checkout.html"
       class="bg-orange-500 text-white px-6 py-4 rounded-xl flex items-center justify-between w-full max-w-2xl shadow-lg hover:bg-orange-600 transition-colors no-underline">
      <div class="flex items-center gap-3">
        <div class="relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          <span class="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">${count}</span>
        </div>
        <span class="font-medium">查看購物車</span>
      </div>
      <span class="font-bold">$${total}</span>
    </a>
  </div>`;
}

// Render the admin header/nav
function renderAdminHeader(activePage) {
  const pages = [
    { path: 'admin-orders.html', label: '訂單管理' },
    { path: 'admin-menu.html',   label: '菜單管理' },
    { path: 'admin-reports.html',label: '營業報告' },
  ];
  const navLinks = pages.map(p => `
    <a href="${p.path}" class="text-sm font-medium pb-4 -mb-4 border-b-2 transition-colors no-underline ${activePage === p.path ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-orange-600'}">${p.label}</a>
  `).join('');

  return `
  <header class="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
    <div class="flex items-center gap-8">
      <h1 class="text-xl font-bold tracking-wider">小島料理 管理後台</h1>
      <nav class="flex gap-6">${navLinks}</nav>
    </div>
    <a href="menu.html" class="text-sm text-gray-500 hover:text-black no-underline">返回前台</a>
  </header>`;
}
