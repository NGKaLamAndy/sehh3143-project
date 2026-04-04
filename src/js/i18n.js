// ===================================================================
// i18n.js  —  Multi-language Support
// -------------------------------------------------------------------
// Supported languages: zh-HK (Traditional Chinese), en (English), ja (Japanese)
// Language preference stored in localStorage as 'mojima_lang'
// ===================================================================

const TRANSLATIONS = {

  // ─── TRADITIONAL CHINESE (Default) ─────────────────────────────
  'zh-HK': {
    'nav.menu': '菜單', 'nav.trackOrder': '查詢訂單', 'nav.admin': '管理員',
    'store.open': '營業中', 'store.closed': '休息中',
    'phone': '電話',
    'search.placeholder': '搜尋餐點名稱或描述...',
    'category.all': '全部',
    'todaysSpecials': '今日特選',
    'yourActiveOrders': '您的活動訂單',
    'historyOrders': '歷史訂單',
    'addToCart': '加入購物車', 'qty': '數量',
    'specialReq': '特別要求 (選填)',
    'specialReqPlaceholder': '例如：走蔥、少冰、多醬汁...',
    'viewCart': '查看購物車', 'soldOut': '售罄',
    'confirmOrder': '確認訂單', 'yourOrder': '您的訂單',
    'subtotal': '小計', 'deliveryFeeLabel': '外送費',
    'discountLabel': '折扣', 'tipLabel': '小費 (選填)',
    'grandTotal': '合計',
    'contactInfo': '聯絡資料',
    'nameLabel': '姓名 *', 'phoneLabel': '電話 *', 'emailLabel': '電郵 (選填)',
    'buildingLabel': '大廈/街道名稱 *', 'floorUnitLabel': '樓層/單位 *',
    'doorCodeLabel': '門鎖密碼 (選填)',
    'contactNameLabel': '收件人姓名 *', 'contactPhoneLabel': '收件人電話 *',
    'pickupMethod': '取餐方式', 'pickup': '自取', 'delivery': '外送',
    'paymentMethod': '付款方式', 'notesLabel': '備註 (選填)',
    'submitOrder': '提交訂單',
    'discountCode': '折扣碼', 'applyDiscount': '套用',
    'tipNoTip': '不加', 'tipCustom': '自訂',
    'freeDelivery': '免運費', 'clearCart': '清空購物車',
    'pickupTime': '取餐時間', 'estimatedDelivery': '預計送達時間',
    'asap': '盡快', 'min30': '30分鐘後', 'min45': '45分鐘後', 'hour1': '1小時後',
    'onlinePayment': '線上付款',
    'status.pending': '已提交 (等待接單)', 'status.accepted': '已接單',
    'status.cooking': '製作中', 'status.delivering': '送遞中',
    'status.ready': '可取餐', 'status.completed': '已完成',
    'status.cancelled': '已取消', 'status.expired': '已逾時',
    'status.refund_requested': '申請退款中',
    'status.refund_approved': '退款已批准', 'status.refund_rejected': '退款被拒絕',
    'trackOrder': '查詢訂單',
    'enterOrderId': '輸入訂單編號或電話號碼',
    'orderNotFound': '找不到相關訂單，請檢查輸入是否正確。',
    'orderConfirmed': '訂單已確認', 'orderConfirmedSub': '我們已收到您的訂單',
    'cookingStep': '製作中', 'cookingSub': '廚房正在為您準備餐點',
    'readyPickup': '可取餐', 'readyPickupSub': '請前往餐廳取餐',
    'delivering': '送遞中', 'deliveringSub': '外送員正在送達',
    'completed': '已完成', 'completedPickupSub': '餐點已取走', 'completedDeliverySub': '餐點已送達',
    'deliveryInfo': '外送資訊', 'orderContents': '訂單內容', 'totalLabel': '總計',
    'requestRefund': '申請退款', 'refundRequested': '已申請退款',
    'notificationAllow': '允許通知',
    'notesPlaceholder': '例如：對堅果敏感，請注意...',
    'invalidDiscountCode': '無效的折扣碼',
    'discountApplied': '折扣已套用',
    'storeClosedMsg': '目前休息中',
    'storeClosedSub': '抱歉，我們目前暫停接單，請稍後再試。',
    'backToMenu': '返回菜單',
    'emptyCart': '購物車是空的',
    'special': '特選',
  },

  // ─── ENGLISH ────────────────────────────────────────────────────
  'en': {
    'nav.menu': 'Menu', 'nav.trackOrder': 'Track Order', 'nav.admin': 'Admin',
    'store.open': 'Open', 'store.closed': 'Closed',
    'phone': 'Phone',
    'search.placeholder': 'Search dishes by name or description...',
    'category.all': 'All',
    'todaysSpecials': "Today's Specials",
    'yourActiveOrders': 'Your Active Orders',
    'historyOrders': 'Order History',
    'addToCart': 'Add to Cart', 'qty': 'Quantity',
    'specialReq': 'Special Requests (optional)',
    'specialReqPlaceholder': 'e.g., No onions, less ice, extra sauce...',
    'viewCart': 'View Cart', 'soldOut': 'Sold Out',
    'confirmOrder': 'Confirm Order', 'yourOrder': 'Your Order',
    'subtotal': 'Subtotal', 'deliveryFeeLabel': 'Delivery Fee',
    'discountLabel': 'Discount', 'tipLabel': 'Tip (optional)',
    'grandTotal': 'Total',
    'contactInfo': 'Contact Information',
    'nameLabel': 'Name *', 'phoneLabel': 'Phone *', 'emailLabel': 'Email (optional)',
    'buildingLabel': 'Building / Street *', 'floorUnitLabel': 'Floor / Unit *',
    'doorCodeLabel': 'Door Code (optional)',
    'contactNameLabel': 'Recipient Name *', 'contactPhoneLabel': 'Recipient Phone *',
    'pickupMethod': 'Pickup Method', 'pickup': 'Pickup', 'delivery': 'Delivery',
    'paymentMethod': 'Payment Method', 'notesLabel': 'Notes (optional)',
    'submitOrder': 'Place Order',
    'discountCode': 'Discount Code', 'applyDiscount': 'Apply',
    'tipNoTip': 'No Tip', 'tipCustom': 'Custom',
    'freeDelivery': 'Free Delivery', 'clearCart': 'Clear Cart',
    'pickupTime': 'Pickup Time', 'estimatedDelivery': 'Estimated Delivery',
    'asap': 'ASAP', 'min30': 'In 30 min', 'min45': 'In 45 min', 'hour1': 'In 1 hour',
    'onlinePayment': 'Online Payment',
    'status.pending': 'Pending (Awaiting Acceptance)', 'status.accepted': 'Accepted',
    'status.cooking': 'Preparing', 'status.delivering': 'Out for Delivery',
    'status.ready': 'Ready for Pickup', 'status.completed': 'Completed',
    'status.cancelled': 'Cancelled', 'status.expired': 'Timed Out',
    'status.refund_requested': 'Refund Requested',
    'status.refund_approved': 'Refund Approved', 'status.refund_rejected': 'Refund Rejected',
    'trackOrder': 'Track Order',
    'enterOrderId': 'Enter order ID or phone number',
    'orderNotFound': 'Order not found. Please check your input.',
    'orderConfirmed': 'Order Confirmed', 'orderConfirmedSub': 'We have received your order',
    'cookingStep': 'Preparing', 'cookingSub': 'Kitchen is preparing your meal',
    'readyPickup': 'Ready for Pickup', 'readyPickupSub': 'Please come to pick up your order',
    'delivering': 'Out for Delivery', 'deliveringSub': 'Delivery rider is on the way',
    'completed': 'Completed', 'completedPickupSub': 'Order has been picked up', 'completedDeliverySub': 'Order has been delivered',
    'deliveryInfo': 'Delivery Information', 'orderContents': 'Order Contents', 'totalLabel': 'Total',
    'requestRefund': 'Request Refund', 'refundRequested': 'Refund Requested',
    'notificationAllow': 'Allow Notifications',
    'notesPlaceholder': 'e.g., Nut allergy, please note...',
    'invalidDiscountCode': 'Invalid discount code',
    'discountApplied': 'Discount applied',
    'storeClosedMsg': 'Currently Closed',
    'storeClosedSub': 'Sorry, we are not accepting orders right now. Please try again later.',
    'backToMenu': 'Back to Menu',
    'emptyCart': 'Your cart is empty',
    'special': 'Special',
  },

  // ─── JAPANESE ───────────────────────────────────────────────────
  'ja': {
    'nav.menu': 'メニュー', 'nav.trackOrder': '注文照会', 'nav.admin': '管理',
    'store.open': '営業中', 'store.closed': '準備中',
    'phone': '電話',
    'search.placeholder': '料理名や説明で検索...',
    'category.all': 'すべて',
    'todaysSpecials': '本日のおすすめ',
    'yourActiveOrders': '進行中の注文',
    'historyOrders': '注文履歴',
    'addToCart': 'カートに追加', 'qty': '数量',
    'specialReq': 'ご要望（任意）',
    'specialReqPlaceholder': '例：ネギ抜き、氷少なめ...',
    'viewCart': 'カートを見る', 'soldOut': '売り切れ',
    'confirmOrder': '注文確認', 'yourOrder': 'ご注文内容',
    'subtotal': '小計', 'deliveryFeeLabel': '配達料',
    'discountLabel': '割引', 'tipLabel': 'チップ（任意）',
    'grandTotal': '合計',
    'contactInfo': '連絡先情報',
    'nameLabel': 'お名前 *', 'phoneLabel': '電話番号 *', 'emailLabel': 'メールアドレス（任意）',
    'buildingLabel': 'ビル名/通り *', 'floorUnitLabel': '階/部屋番号 *',
    'doorCodeLabel': 'ドアコード（任意）',
    'contactNameLabel': '受取人氏名 *', 'contactPhoneLabel': '受取人電話番号 *',
    'pickupMethod': '受取方法', 'pickup': 'テイクアウト', 'delivery': '配達',
    'paymentMethod': 'お支払い方法', 'notesLabel': '備考（任意）',
    'submitOrder': '注文を確定する',
    'discountCode': '割引コード', 'applyDiscount': '適用',
    'tipNoTip': 'チップなし', 'tipCustom': 'カスタム',
    'freeDelivery': '送料無料', 'clearCart': 'カートを空にする',
    'pickupTime': '受取時間', 'estimatedDelivery': '配達予定時間',
    'asap': 'できるだけ早く', 'min30': '30分後', 'min45': '45分後', 'hour1': '1時間後',
    'onlinePayment': 'オンライン決済',
    'status.pending': '受付待ち', 'status.accepted': '受付済み',
    'status.cooking': '調理中', 'status.delivering': '配達中',
    'status.ready': '受取可能', 'status.completed': '完了',
    'status.cancelled': 'キャンセル', 'status.expired': '時間切れ',
    'status.refund_requested': '返金申請中',
    'status.refund_approved': '返金承認', 'status.refund_rejected': '返金拒否',
    'trackOrder': '注文照会',
    'enterOrderId': '注文番号または電話番号を入力',
    'orderNotFound': '注文が見つかりません。入力を確認してください。',
    'orderConfirmed': '注文確認済み', 'orderConfirmedSub': 'ご注文を受け付けました',
    'cookingStep': '調理中', 'cookingSub': 'キッチンで準備中です',
    'readyPickup': '受取可能', 'readyPickupSub': '店舗にてお受け取りください',
    'delivering': '配達中', 'deliveringSub': '配達員が向かっています',
    'completed': '完了', 'completedPickupSub': 'お受け取りいただきました', 'completedDeliverySub': 'お届けしました',
    'deliveryInfo': '配達情報', 'orderContents': 'ご注文内容', 'totalLabel': '合計',
    'requestRefund': '返金申請', 'refundRequested': '返金申請済み',
    'notificationAllow': '通知を許可',
    'notesPlaceholder': '例：ナッツアレルギーあり...',
    'invalidDiscountCode': '無効な割引コード',
    'discountApplied': '割引が適用されました',
    'storeClosedMsg': '営業時間外',
    'storeClosedSub': '申し訳ありませんが、現在注文を受け付けておりません。',
    'backToMenu': 'メニューに戻る',
    'emptyCart': 'カートは空です',
    'special': 'おすすめ',
  }
};

// Get current language code
function getLang() {
  return localStorage.getItem('mojima_lang') || 'zh-HK';
}

// Set language and reload page
function setLang(lang) {
  localStorage.setItem('mojima_lang', lang);
  location.reload();
}

// Translate a key — falls back to zh-HK, then returns the key itself
function t(key) {
  const lang = getLang();
  const dict = TRANSLATIONS[lang] || TRANSLATIONS['zh-HK'];
  if (dict[key] !== undefined) return dict[key];
  if (TRANSLATIONS['zh-HK'][key] !== undefined) return TRANSLATIONS['zh-HK'][key];
  return key;
}

// Render the language switcher pill (used in header)
function renderLangSwitcher() {
  const current = getLang();
  const langs = [
    { code: 'zh-HK', label: '繁中' },
    { code: 'en',    label: 'EN'   },
    { code: 'ja',    label: '日本語' },
  ];
  return `<div class="flex items-center gap-1 bg-white/10 rounded-full p-1 text-xs">
    ${langs.map(l => `
      <button onclick="setLang('${l.code}')"
        class="px-2 py-1 rounded-full transition-colors ${current === l.code ? 'bg-white text-orange-900 font-bold' : 'text-white/70 hover:text-white'}">
        ${l.label}
      </button>`).join('')}
  </div>`;
}
