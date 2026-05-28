// стартовый набор тарифов используется при первом открытии сайта,
// пока администратор не изменил данные через панель управления.
const defaultTariffs = [
  {
    id: "start",
    name: "Старт",
    type: "private",
    tag: "для звонков",
    price: 390,
    internet: 8,
    minutes: 300,
    sms: 50,
    description: "Базовый тариф для звонков, мессенджеров и контроля расходов."
  },
  {
    id: "balance",
    name: "Баланс",
    type: "private",
    tag: "популярный",
    price: 690,
    internet: 35,
    minutes: 600,
    sms: 100,
    description: "Оптимальный набор для смартфона, семьи и повседневной работы."
  },
  {
    id: "drive",
    name: "Драйв 5G",
    type: "private",
    tag: "много трафика",
    price: 990,
    internet: 60,
    minutes: 900,
    sms: 200,
    description: "Большой пакет интернета и запас минут для активных пользователей."
  },
  {
    id: "family",
    name: "Семья+",
    type: "private",
    tag: "семейный",
    price: 1290,
    internet: 80,
    minutes: 1200,
    sms: 300,
    description: "Общий пакет для нескольких номеров с прозрачной статистикой."
  },
  {
    id: "business-lite",
    name: "Бизнес Лайт",
    type: "business",
    tag: "для ИП",
    price: 890,
    internet: 40,
    minutes: 1000,
    sms: 200,
    description: "Корпоративная связь для небольших команд и индивидуальных предпринимателей."
  },
  {
    id: "business-pro",
    name: "Бизнес Pro",
    type: "business",
    tag: "АТС",
    price: 1890,
    internet: 70,
    minutes: 2500,
    sms: 500,
    description: "Пакет для отдела продаж с виртуальной АТС и детализацией."
  }
];

// стартовые услуги выводятся на странице услуг, в кабинете и в корзине.
const defaultServices = [
  {
    id: "antispam",
    name: "Антиспам",
    price: 99,
    icon: "shield",
    description: "Фильтрация нежелательных звонков и предупреждения о подозрительных номерах."
  },
  {
    id: "messengers",
    name: "Мессенджеры",
    price: 149,
    icon: "message",
    description: "Безлимитный трафик для популярных мессенджеров."
  },
  {
    id: "roaming",
    name: "Роуминг СНГ",
    price: 220,
    icon: "globe",
    description: "Выгодные звонки и интернет в поездках."
  },
  {
    id: "cloud",
    name: "Облако 100 ГБ",
    price: 179,
    icon: "cloud",
    description: "Хранение документов, фотографий и резервных копий."
  },
  {
    id: "pbx",
    name: "Виртуальная АТС",
    price: 490,
    icon: "phone",
    description: "Многоканальные звонки, запись разговоров и очередь операторов."
  },
  {
    id: "analytics",
    name: "Аналитика расходов",
    price: 290,
    icon: "chart",
    description: "Отчеты по номерам, отделам и периодам для корпоративных клиентов."
  },
  {
    id: "education",
    name: "Обучение",
    price: 120,
    icon: "book",
    description: "Подписка на образовательные сервисы без расхода основного пакета."
  },
  {
    id: "iot",
    name: "IoT SIM",
    price: 160,
    icon: "cpu",
    description: "SIM-карты для терминалов, датчиков и умных устройств."
  }
];

// демонстрационная история операций нужна для наполнения личного кабинета.
const operationsBase = [
  { date: "12.05.2026", title: "Пополнение баланса", amount: 800 },
  { date: "10.05.2026", title: "Тариф «Баланс»", amount: -690 },
  { date: "08.05.2026", title: "Антиспам", amount: -99 },
  { date: "02.05.2026", title: "Роуминг СНГ", amount: -220 }
];

// отзывы по умолчанию показываются на главной и могут редактироваться администратором.
const defaultReviews = [
  { name: "Марина", rating: 5, message: "Перенос номера прошел спокойно, тариф подключили в тот же день.", date: "14.05.2026" },
  { name: "Ильдар", rating: 4, message: "В кабинете удобно смотреть расходы. Хотелось бы больше настроек автоплатежа.", date: "11.05.2026" },
  { name: "ООО «Вектор»", rating: 5, message: "Подключили виртуальную АТС для отдела продаж, заявки теперь не теряются.", date: "07.05.2026" }
];

// учебные данные администратора оставлены прямо в коде для курсового проекта.
const adminCredentials = {
  login: "admin",
  password: "admin123"
};

const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];

// Карта отдельных HTML-страниц. Она нужна после разделения сайта:
// раньше разделы открывались через hash, теперь основные разделы
// живут в самостоятельных файлах.
const pageFiles = {
  home: "index.html",
  promos: "pages/stock.html",
  tariffs: "pages/tariff.html",
  services: "pages/uslugi.html",
  cabinet: "pages/cabinet.html",
  admin: "pages/admin.html"
};

// все изменяемые данные сайта хранятся в localStorage,
// поэтому после перезагрузки сохраняются корзина, аккаунты, заявки и настройки.
let cart = loadState("cart", []);
let tariffs = loadState("tariffs", defaultTariffs);
let services = loadState("services", defaultServices);
let connectedServices = loadState("connectedServices", ["antispam"]);
let accounts = loadState("accounts", []);
let operations = loadState("operations", operationsBase);
let orders = loadState("orders", [
  { id: 1042, title: "Новый номер + тариф «Баланс»", status: "Новая", total: 690 },
  { id: 1041, title: "Корпоративный пакет на 8 SIM", status: "В работе", total: 7120 }
]);
let reviews = loadState("reviews", defaultReviews);
let balance = Number(loadState("balance", 1284));
let compareTariffIds = loadState("compareTariffIds", []);
let currentTariffId = loadState("currentTariffId", "balance");
let autopayEnabled = loadState("autopayEnabled", false);
let reviewRatingFilter = "all";
let adminOrderSearch = "";
let adminOrderStatus = "all";
let visibleTariffs = 4;
let revealObserver;
let navigatorAnchor = null;

cart = Array.isArray(cart) ? cart : [];
tariffs = Array.isArray(tariffs) ? tariffs : [...defaultTariffs];
services = Array.isArray(services) ? services : [...defaultServices];
connectedServices = Array.isArray(connectedServices) ? connectedServices : ["antispam"];
accounts = Array.isArray(accounts) ? accounts : [];
operations = Array.isArray(operations) ? operations : [...operationsBase];
orders = Array.isArray(orders) ? orders : [];
reviews = Array.isArray(reviews) ? reviews : [...defaultReviews];
reviews = reviews.map((review, index) => ({
  id: review.id || `review-${Date.now()}-${index}`,
  avatar: review.avatar || "",
  answer: review.answer || "",
  ...review
}));
balance = Number.isFinite(balance) ? balance : 1284;
compareTariffIds = Array.isArray(compareTariffIds) ? compareTariffIds.slice(0, 3) : [];
currentTariffId = tariffs.some((tariff) => tariff.id === currentTariffId) ? currentTariffId : (tariffs[0]?.id || "");
autopayEnabled = Boolean(autopayEnabled);

function loadState(key, fallback) {
  // безопасно читаем JSON из браузерного хранилища и возвращаем запасное значение при ошибке.
  try {
    const raw = localStorage.getItem(`mobilecom-v2-${key}`);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveState(key, value) {
  // запись тоже обернута в try/catch, потому что хранилище может быть отключено браузером.
  try {
    localStorage.setItem(`mobilecom-v2-${key}`, JSON.stringify(value));
  } catch {
    // Локальное хранилище может быть недоступно в приватном режиме.
  }
}

function saveAll() {
  // единая точка сохранения синхронизирует все основные сущности сайта.
  saveState("cart", cart);
  saveState("tariffs", tariffs);
  saveState("services", services);
  saveState("connectedServices", connectedServices);
  saveState("accounts", accounts);
  saveState("operations", operations);
  saveState("orders", orders);
  saveState("reviews", reviews);
  saveState("balance", balance);
  saveState("compareTariffIds", compareTariffIds);
  saveState("currentTariffId", currentTariffId);
  saveState("autopayEnabled", autopayEnabled);
}

// возвращает активную тему интерфейса, чтобы кнопка переключения знала текущее состояние.
function currentTheme() {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

// синхронизирует цвет системной панели браузера с выбранной темой сайта.
function syncThemeColor(theme) {
  const meta = qs('meta[name="theme-color"]');
  const cssColor = getComputedStyle(document.documentElement).getPropertyValue("--theme-color").trim();
  if (meta) meta.content = cssColor || (theme === "dark" ? "#101316" : "#f5f7f9");
}

function applyTheme(theme) {
  // тема применяется к корневому элементу, а кнопки получают актуальные aria-подписи.
  const nextTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = nextTheme;
  syncThemeColor(nextTheme);
  qsa("[data-theme-toggle]").forEach((button) => {
    const isDark = nextTheme === "dark";
    button.setAttribute("aria-label", isDark ? "Включить светлую тему" : "Включить темную тему");
    button.title = isDark ? "Светлая тема" : "Темная тема";
    button.setAttribute("aria-pressed", String(isDark));
  });
}

// переключает светлую и темную тему, сохраняет выбор и показывает короткое уведомление.
function toggleTheme() {
  const nextTheme = currentTheme() === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  try {
    localStorage.setItem("mobilecom-theme", nextTheme);
  } catch {
    // Theme persistence is optional if local storage is unavailable.
  }
  showToast(nextTheme === "dark" ? "Темная тема включена" : "Светлая тема включена");
}

// проверяет, прошел ли пользователь вход в административную панель в текущей сессии.
function isAdminAuthorized() {
  try {
    return sessionStorage.getItem("mobilecom-admin") === "true";
  } catch {
    return false;
  }
}

// записывает или очищает признак авторизации администратора в sessionStorage.
function setAdminAuthorized(value) {
  try {
    if (value) sessionStorage.setItem("mobilecom-admin", "true");
    else sessionStorage.removeItem("mobilecom-admin");
  } catch {
    // Session storage can be unavailable in some browser modes.
  }
}

// приводит телефон к цифрам, чтобы вход работал независимо от пробелов, скобок и дефисов.
function normalizePhone(value) {
  const digits = String(value || "").replace(/\D/g, "");
  return digits.length === 11 && digits.startsWith("8") ? `7${digits.slice(1)}` : digits;
}

// возвращает красивое отображение телефона или исходный вариант, если формат неизвестен.
function formatPhone(value, fallback = "") {
  const digits = normalizePhone(value);
  if (digits.length === 11 && digits.startsWith("7")) {
    return `+7 ${digits.slice(1, 4)} ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9)}`;
  }
  return fallback || value || "";
}

// формирует инициалы для круглой аватарки личного кабинета.
function accountInitials(name) {
  const parts = String(name || "МК").trim().split(/\s+/).filter(Boolean);
  return parts.slice(0, 2).map((part) => part[0]?.toUpperCase() || "").join("") || "МК";
}

// собирает аватар отзыва: картинка пользователя или текстовая заглушка с первой буквой.
function reviewAvatar(review) {
  const avatar = String(review?.avatar || "").trim();
  if (avatar) {
    return `<img src="${avatar}" alt="" loading="lazy">`;
  }
  return `<span>${accountInitials(review?.name || "МК")}</span>`;
}

// читает id текущего аккаунта из sessionStorage.
function currentAccountId() {
  try {
    return sessionStorage.getItem("mobilecom-account-id") || "";
  } catch {
    return "";
  }
}

// сохраняет выбранный аккаунт или очищает сессию при выходе.
function setCurrentAccount(id) {
  try {
    if (id) sessionStorage.setItem("mobilecom-account-id", id);
    else sessionStorage.removeItem("mobilecom-account-id");
  } catch {
    // Session storage can be unavailable in some browser modes.
  }
}

// находит объект текущего аккаунта среди зарегистрированных пользователей.
function getCurrentAccount() {
  const id = currentAccountId();
  return accounts.find((account) => account.id === id) || null;
}

// возвращает true, если пользователь вошел в личный кабинет.
function isUserAuthorized() {
  return Boolean(getCurrentAccount());
}

// форматирует числа как рубли, чтобы цены выглядели одинаково по всему сайту.
function formatPrice(value) {
  const number = Number(value);
  return `${Number.isFinite(number) ? number.toLocaleString("ru-RU") : "0"} ₽`;
}

// возвращает текущую дату в русском формате для операций, отзывов и заявок.
function today() {
  return new Date().toLocaleDateString("ru-RU");
}

// хранит SVG-иконки услуг в одном месте, чтобы карточки можно было собирать динамически.
function icon(name) {
  const icons = {
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>',
    message: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"></path>',
    globe: '<circle cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path><path d="M12 2a15 15 0 0 1 0 20"></path><path d="M12 2a15 15 0 0 0 0 20"></path>',
    cloud: '<path d="M17.5 19H7a5 5 0 0 1-.8-9.9A7 7 0 0 1 20 10.5 4.5 4.5 0 0 1 17.5 19z"></path>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"></path>',
    chart: '<path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"></path>',
    cpu: '<rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><path d="M9 1v3"></path><path d="M15 1v3"></path><path d="M9 20v3"></path><path d="M15 20v3"></path><path d="M20 9h3"></path><path d="M20 14h3"></path><path d="M1 9h3"></path><path d="M1 14h3"></path>'
  };

  return `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.chart}</svg>`;
}

// создает HTML одной карточки тарифа с кнопками подробностей, сравнения и добавления в корзину.
function tariffCard(tariff) {
  const isInCart = cart.some((item) => item.type === "tariff" && item.id === tariff.id);
  const isCompared = compareTariffIds.includes(tariff.id);

  return `
    <article class="tariff-card">
      <header>
        <div>
          <small>${tariff.type === "business" ? "Корпоративный" : "Частный"}</small>
          <h3>${tariff.name}</h3>
        </div>
        <span class="tag">${tariff.tag}</span>
      </header>
      <div class="price">${formatPrice(tariff.price)} <span>/мес</span></div>
      <p>${tariff.description}</p>
      <div class="tariff-specs">
        <div><strong>${tariff.internet} ГБ</strong><small>интернет</small></div>
        <div><strong>${tariff.minutes}</strong><small>минут</small></div>
        <div><strong>${tariff.sms}</strong><small>SMS</small></div>
      </div>
      <div class="card-actions">
        <button class="ghost-button compact" type="button" data-detail="${tariff.id}">Подробнее</button>
        <button class="secondary-button compact" type="button" data-toggle-compare="${tariff.id}" aria-pressed="${isCompared}">
          ${isCompared ? "В сравнении" : "Сравнить"}
        </button>
        <button class="primary-button compact" type="button" data-add-tariff="${tariff.id}" ${isInCart ? "disabled" : ""}>
          ${isInCart ? "В корзине" : "Подключить"}
        </button>
      </div>
    </article>
  `;
}

// создает карточку услуги с иконкой, ценой и кнопкой подключения.
function serviceCard(service) {
  const isConnected = connectedServices.includes(service.id);
  const isInCart = cart.some((item) => item.type === "service" && item.id === service.id);
  const action = isConnected
    ? `<button class="ghost-button compact" type="button" data-remove-connected="${service.id}">Отключить</button>`
    : `<button class="primary-button compact" type="button" data-add-service="${service.id}" ${isInCart ? "disabled" : ""}>${isInCart ? "В корзине" : "Подключить"}</button>`;

  return `
    <article class="service-card ${isConnected ? "is-connected" : ""}">
      <header>
        <span class="service-icon">${icon(service.icon)}</span>
        <span class="tag">${formatPrice(service.price)}</span>
      </header>
      <div>
        <h3>${service.name}</h3>
        <p>${service.description}</p>
      </div>
      ${action}
    </article>
  `;
}

// отрисовывает подключенную услугу в личном кабинете с кнопкой отключения.
function connectedServiceItem(service) {
  return `
    <div class="connected-item">
      <span class="service-icon">${icon(service.icon)}</span>
      <div>
        <strong>${service.name}</strong>
        <small>${formatPrice(service.price)} /мес</small>
      </div>
      <button class="ghost-button compact" type="button" data-remove-connected="${service.id}">Отключить</button>
    </div>
  `;
}

// применяет фильтры каталога тарифов: тип клиента, поиск, интернет и максимальную цену.
function filteredTariffs() {
  const type = qs("#typeFilter")?.value || "all";
  const minInternet = Number(qs("#internetFilter")?.value || 0);
  const maxPrice = Number(qs("#priceFilter")?.value || 2500);
  const search = (qs("#tariffSearch")?.value || "").trim().toLowerCase();

  return tariffs.filter((tariff) => {
    const typeOk = type === "all" || tariff.type === type;
    const searchOk = !search || `${tariff.name} ${tariff.description} ${tariff.tag}`.toLowerCase().includes(search);
    return typeOk && searchOk && tariff.internet >= minInternet && tariff.price <= maxPrice;
  });
}

function renderHome() {
  // на отдельных HTML-страницах блока главной может не быть, поэтому сначала проверяем DOM.
  if (!qs("#homeTariffs")) return;
  qs("#homeTariffs").innerHTML = tariffs.slice(0, 3).map(tariffCard).join("");
  qs("#homeServices").innerHTML = services.slice(0, 3).map(serviceCard).join("");
}

function renderTariffs() {
  // каталог тарифов отрисовывается только на tariff.html.
  if (!qs("#tariffList")) return;
  const internetInput = qs("#internetFilter");
  const priceInput = qs("#priceFilter");
  if (internetInput) qs("#internetValue").textContent = internetInput.value;
  if (priceInput) qs("#priceValue").textContent = priceInput.value;

  const filtered = filteredTariffs();
  const visible = filtered.slice(0, visibleTariffs);
  qs("#tariffList").innerHTML = visible.length ? visible.map(tariffCard).join("") : '<div class="empty-state">Подходящих тарифов нет</div>';
  qs("#showMoreTariffs").hidden = visible.length >= filtered.length;
  renderComparePanel();
}

// строит панель сравнения тарифов и подсвечивает лучшие значения по цене и пакетам.
function renderComparePanel() {
  const panel = qs("#comparePanel");
  if (!panel) return;

  const selected = compareTariffIds
    .map((id) => tariffs.find((tariff) => tariff.id === id))
    .filter(Boolean);

  if (!selected.length) {
    panel.innerHTML = `
      <div class="compare-empty compare-showcase-empty">
        <span class="compare-empty-icon">${icon("chart")}</span>
        <div>
          <strong>\u0421\u0440\u0430\u0432\u043d\u0435\u043d\u0438\u0435 \u0442\u0430\u0440\u0438\u0444\u043e\u0432</strong>
          <span>\u041e\u0442\u043c\u0435\u0442\u044c\u0442\u0435 \u0434\u043e \u0442\u0440\u0435\u0445 \u0442\u0430\u0440\u0438\u0444\u043e\u0432, \u0438 \u0441\u0430\u0439\u0442 \u0441\u0440\u0430\u0437\u0443 \u043f\u043e\u043a\u0430\u0436\u0435\u0442, \u0433\u0434\u0435 \u0432\u044b\u0433\u043e\u0434\u043d\u0435\u0435 \u0446\u0435\u043d\u0430, \u0431\u043e\u043b\u044c\u0448\u0435 \u0438\u043d\u0442\u0435\u0440\u043d\u0435\u0442\u0430 \u0438 \u043c\u0438\u043d\u0443\u0442.</span>
        </div>
      </div>
    `;
    return;
  }

  const maxInternet = Math.max(...selected.map((tariff) => Number(tariff.internet) || 0), 1);
  const maxMinutes = Math.max(...selected.map((tariff) => Number(tariff.minutes) || 0), 1);
  const maxSms = Math.max(...selected.map((tariff) => Number(tariff.sms) || 0), 1);
  const minPrice = Math.min(...selected.map((tariff) => Number(tariff.price) || 0));
  const bestInternet = Math.max(...selected.map((tariff) => Number(tariff.internet) || 0));
  const bestMinutes = Math.max(...selected.map((tariff) => Number(tariff.minutes) || 0));
  const bestSms = Math.max(...selected.map((tariff) => Number(tariff.sms) || 0));

  const metric = (label, value, max, isBest, unit = "") => `
    <div class="compare-metric ${isBest ? "is-best" : ""}">
      <span>${label}</span>
      <strong>${value}${unit}</strong>
      <div class="compare-meter"><span style="--value: ${Math.max(8, Math.round((Number(value) || 0) / max * 100))}%"></span></div>
    </div>
  `;

  panel.innerHTML = `
    <div class="compare-hero">
      <div>
        <p class="eyebrow">\u0421\u0440\u0430\u0432\u043d\u0435\u043d\u0438\u0435</p>
        <h2>${selected.length === 1 ? "\u041e\u0434\u0438\u043d \u0442\u0430\u0440\u0438\u0444 \u0432 \u0441\u0440\u0430\u0432\u043d\u0435\u043d\u0438\u0438" : `${selected.length} \u0442\u0430\u0440\u0438\u0444\u0430 \u0440\u044f\u0434\u043e\u043c`}</h2>
        <p>\u0412\u0438\u0434\u043d\u043e \u043d\u0435 \u0442\u043e\u043b\u044c\u043a\u043e \u0446\u0435\u043d\u0443, \u043d\u043e \u0438 \u0440\u0435\u0430\u043b\u044c\u043d\u044b\u0439 \u0437\u0430\u043f\u0430\u0441 \u043f\u0430\u043a\u0435\u0442\u0430: \u0438\u043d\u0442\u0435\u0440\u043d\u0435\u0442, \u043c\u0438\u043d\u0443\u0442\u044b, SMS \u0438 \u0442\u0438\u043f \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u044f.</p>
      </div>
      <button class="ghost-button compact" type="button" data-clear-compare>\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u044c</button>
    </div>

    <div class="compare-card-grid" style="--compare-count: ${selected.length}">
      ${selected.map((tariff) => {
        const isPriceBest = Number(tariff.price) === minPrice;
        return `
          <article class="compare-card ${isPriceBest ? "is-price-best" : ""}">
            <header>
              <div>
                <small>${tariff.type === "business" ? "\u0411\u0438\u0437\u043d\u0435\u0441" : "\u0427\u0430\u0441\u0442\u043d\u044b\u0439"}</small>
                <h3>${tariff.name}</h3>
              </div>
              <button class="icon-button compact-icon" type="button" data-toggle-compare="${tariff.id}" aria-label="\u0423\u0431\u0440\u0430\u0442\u044c ${tariff.name} \u0438\u0437 \u0441\u0440\u0430\u0432\u043d\u0435\u043d\u0438\u044f">×</button>
            </header>
            <div class="compare-price">
              <strong>${formatPrice(tariff.price)}</strong>
              <span>/\u043c\u0435\u0441</span>
              ${isPriceBest ? `<em>\u041b\u0443\u0447\u0448\u0430\u044f \u0446\u0435\u043d\u0430</em>` : ""}
            </div>
            <p>${tariff.description}</p>
            <div class="compare-metrics">
              ${metric("\u0418\u043d\u0442\u0435\u0440\u043d\u0435\u0442", tariff.internet, maxInternet, Number(tariff.internet) === bestInternet, " \u0413\u0411")}
              ${metric("\u041c\u0438\u043d\u0443\u0442\u044b", tariff.minutes, maxMinutes, Number(tariff.minutes) === bestMinutes)}
              ${metric("SMS", tariff.sms, maxSms, Number(tariff.sms) === bestSms)}
            </div>
            <button class="primary-button full" type="button" data-add-tariff="${tariff.id}">\u041f\u043e\u0434\u043a\u043b\u044e\u0447\u0438\u0442\u044c</button>
          </article>
        `;
      }).join("")}
    </div>

    <div class="compare-summary">
      <div>
        <span>\u0421\u0430\u043c\u0430\u044f \u043d\u0438\u0437\u043a\u0430\u044f \u0446\u0435\u043d\u0430</span>
        <strong>${formatPrice(minPrice)}</strong>
      </div>
      <div>
        <span>\u041c\u0430\u043a\u0441\u0438\u043c\u0443\u043c \u0438\u043d\u0442\u0435\u0440\u043d\u0435\u0442\u0430</span>
        <strong>${bestInternet} \u0413\u0411</strong>
      </div>
      <div>
        <span>\u041c\u0430\u043a\u0441\u0438\u043c\u0443\u043c \u043c\u0438\u043d\u0443\u0442</span>
        <strong>${bestMinutes}</strong>
      </div>
    </div>
  `;
}
function renderServices() {
  // услуги используются на странице услуг и частично в личном кабинете.
  if (qs("#serviceList")) qs("#serviceList").innerHTML = services.map(serviceCard).join("");
  const connected = services.filter((service) => connectedServices.includes(service.id));
  if (qs("#connectedServicesList")) qs("#connectedServicesList").innerHTML = connected.length
    ? connected.map(connectedServiceItem).join("")
    : '<div class="empty-state">У вас пока нет подключенных услуг</div>';
}

function renderCabinet() {
  // данные кабинета обновляются только если текущий HTML-файл содержит элементы кабинета.
  if (!qs("#accountAvatar")) return;
  const currentTariff = tariffs.find((tariff) => tariff.id === currentTariffId) || tariffs[0];
  const account = getCurrentAccount();
  const accountName = account?.name || "Абонент";

  qs("#accountAvatar").textContent = accountInitials(accountName);
  qs("#cabinetGreeting").textContent = accountName;
  qs("#balanceValue").textContent = formatPrice(balance);
  if (currentTariff) {
    qs("#accountMeta").textContent = `${account ? formatPhone(account.phone, account.displayPhone) : "Нет активной сессии"} · тариф «${currentTariff.name}»`;
    qs("#currentTariffName").textContent = currentTariff.name;
    qs("#currentTariffInfo").textContent = `${currentTariff.internet} ГБ · ${currentTariff.minutes} минут · ${currentTariff.sms} SMS`;
  }
  qs("#autopayStatus").textContent = autopayEnabled ? "Включен" : "Отключен";
  qs("#autopayNote").textContent = autopayEnabled ? `Следующее пополнение: ${formatPrice(700)}` : "Можно включить после пополнения";
  qs("#autopayToggle").textContent = autopayEnabled ? "Отключить" : "Включить";
  qs("#operationsList").innerHTML = operations.map((operation) => `
    <div class="operation-item">
      <span>${operation.date}</span>
      <strong>${operation.title}</strong>
      <em class="${operation.amount > 0 ? "positive" : operation.amount < 0 ? "negative" : ""}">${operation.amount > 0 ? "+" : ""}${formatPrice(operation.amount)}</em>
    </div>
  `).join("");
}

function renderCart() {
  // счетчик и модальная корзина есть на всех страницах, а старая страница корзины может отсутствовать.
  const count = cart.length;
  const total = cart.reduce((sum, item) => sum + Number(item.price || 0), 0);
  const itemsHtml = count
    ? cart.map((item, index) => `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong>
          <span>${item.kind}</span>
        </div>
        <em>${formatPrice(item.price)}</em>
        <button class="remove-button" type="button" data-remove-cart="${index}">Удалить</button>
      </div>
    `).join("")
    : '<div class="empty-state">В корзине пока нет тарифов и услуг</div>';

  if (qs("#cartCount")) qs("#cartCount").textContent = count;
  if (qs("#cartList")) qs("#cartList").innerHTML = itemsHtml;
  if (qs("#cartModalList")) qs("#cartModalList").innerHTML = itemsHtml;
  if (qs("#checkoutCount")) qs("#checkoutCount").textContent = count;
  if (qs("#cartModalCount")) qs("#cartModalCount").textContent = count;
  if (qs("#checkoutTotal")) qs("#checkoutTotal").textContent = formatPrice(total);
  if (qs("#cartModalTotal")) qs("#cartModalTotal").textContent = formatPrice(total);
  if (qs("#checkoutButton")) qs("#checkoutButton").disabled = count === 0;
  if (qs("#cartModalCheckout")) qs("#cartModalCheckout").disabled = count === 0;
}

function renderAdmin() {
  // таблицы администратора строятся только на admin.html.
  if (!qs("#adminTariffList")) return;
  qs("#adminTariffList").innerHTML = tariffs.map((tariff) => `
    <div class="admin-row">
      <strong>${tariff.name}</strong>
      <span>${tariff.type === "business" ? "Бизнес" : "Частный"} · ${tariff.internet} ГБ · ${tariff.minutes} минут · ${formatPrice(tariff.price)}</span>
      <span class="button-row">
        <button class="mini-button" type="button" data-admin-edit-tariff="${tariff.id}">Изменить</button>
        <button class="remove-button" type="button" data-admin-delete-tariff="${tariff.id}">Удалить</button>
      </span>
    </div>
  `).join("");

  qs("#adminServiceList").innerHTML = services.map((service) => `
    <div class="admin-row">
      <strong>${service.name}</strong>
      <span>${service.description} · ${formatPrice(service.price)}</span>
      <span class="button-row">
        <button class="mini-button" type="button" data-admin-edit-service="${service.id}">Изменить</button>
        <button class="remove-button" type="button" data-admin-delete-service="${service.id}">Удалить</button>
      </span>
    </div>
  `).join("");

  const orderQuery = adminOrderSearch.trim().toLowerCase();
  const filteredOrders = orders.filter((order) => {
    const statusOk = adminOrderStatus === "all" || order.status === adminOrderStatus;
    const text = `#${order.id} ${order.title} ${order.status} ${order.details || ""}`.toLowerCase();
    return statusOk && (!orderQuery || text.includes(orderQuery));
  });

  qs("#adminOrderList").innerHTML = filteredOrders.length ? filteredOrders.map((order) => `
    <div class="admin-row">
      <strong>#${order.id}</strong>
      <span>${order.title} · ${formatPrice(order.total)}${order.details ? `<small>${order.details}</small>` : ""}</span>
      <span class="button-row">
        <em class="status-pill">${order.status}</em>
        <button class="mini-button" type="button" data-admin-next-order="${order.id}">Сменить статус</button>
        <button class="remove-button" type="button" data-admin-delete-order="${order.id}">Удалить</button>
      </span>
    </div>
  `).join("") : '<div class="empty-state">Заявок по этим условиям нет</div>';
  qs("#adminReviewList").innerHTML = reviews.length ? reviews.map((review) => `
    <div class="admin-row admin-review-row">
      <span class="review-avatar">${reviewAvatar(review)}</span>
      <span>
        <strong>${review.name}</strong>
        <small>${review.date} \u00b7 ${"\u2605".repeat(Math.min(5, Math.max(1, Number(review.rating) || 5)))}</small>
        <small>${review.message}</small>
        ${review.answer ? `<small><b>\u041e\u0442\u0432\u0435\u0442:</b> ${review.answer}</small>` : ""}
      </span>
      <span class="button-row">
        <button class="mini-button" type="button" data-admin-edit-review="${review.id}">\u0418\u0437\u043c\u0435\u043d\u0438\u0442\u044c</button>
        <button class="remove-button" type="button" data-admin-delete-review="${review.id}">\u0423\u0434\u0430\u043b\u0438\u0442\u044c</button>
      </span>
    </div>
  `).join("") : '<div class="empty-state">\u041e\u0442\u0437\u044b\u0432\u043e\u0432 \u043f\u043e\u043a\u0430 \u043d\u0435\u0442</div>';
}

function renderReviews() {
  // список отзывов находится на главной странице, поэтому на остальных страницах функция завершается.
  if (!qs("#reviewsList")) return;
  const ratings = reviews.map((review) => Number(review.rating) || 0).filter(Boolean);
  const average = ratings.length ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length : 0;
  const minRating = reviewRatingFilter === "all" ? 0 : Number(reviewRatingFilter);
  const visibleReviews = reviews.filter((review) => (Number(review.rating) || 0) >= minRating);

  if (qs("#reviewStats")) {
    qs("#reviewStats").innerHTML = `
      <strong>${average.toFixed(1)}</strong>
      <span>${reviews.length} отзывов · ${ratings.filter((rating) => rating === 5).length} с оценкой 5</span>
    `;
  }

  qs("#reviewsList").innerHTML = visibleReviews.length ? visibleReviews.map((review) => `
    <article class="review-card">
      <header class="review-head">
        <span class="review-avatar">${reviewAvatar(review)}</span>
        <span>
          <strong>${review.name}</strong>
          <small>${review.date}</small>
        </span>
      </header>
      <em>${"\u2605".repeat(Math.min(5, Math.max(1, Number(review.rating) || 5)))}${"\u2606".repeat(5 - Math.min(5, Math.max(1, Number(review.rating) || 5)))}</em>
      <p>${review.message}</p>
      ${review.answer ? `<div class="review-answer"><strong>\u041e\u0442\u0432\u0435\u0442 MobileCom</strong><p>${review.answer}</p></div>` : ""}
    </article>
  `).join("") : '<div class="empty-state">Отзывы с такой оценкой не найдены</div>';
}

function renderAll() {
  // общий рендер вызывается после любого изменения данных и сам пропускает отсутствующие блоки.
  renderHome();
  renderTariffs();
  renderServices();
  renderCabinet();
  renderCart();
  renderAdmin();
  renderReviews();
  saveAll();
  refreshReveal(document);
}

// показывает временное уведомление в правой части экрана и затем удаляет его из DOM.
function showToast(title, text = "") {
  let stack = qs(".toast-stack");
  if (!stack) {
    stack = document.createElement("div");
    stack.className = "toast-stack";
    document.body.append(stack);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<strong>${title}</strong>${text ? `<span>${text}</span>` : ""}`;
  stack.append(toast);

  const removeToast = () => {
    toast.remove();
    if (!stack.children.length) stack.remove();
  };

  window.setTimeout(() => {
    toast.classList.add("is-hiding");
    toast.addEventListener("transitionend", removeToast, { once: true });
    window.setTimeout(removeToast, 250);
  }, 1000);
}

// открывает универсальное модальное окно и вставляет в него переданную HTML-разметку.
function openDialog(html) {
  const dialog = qs("#appDialog");
  qs("#dialogContent").innerHTML = html;
  if (dialog.open) return;
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
}

// закрывает универсальное модальное окно, если оно сейчас открыто.
function closeDialog() {
  const dialog = qs("#appDialog");
  if (dialog.open) dialog.close();
}

// генерирует декоративный QR-код для учебной имитации оплаты через СБП.
function renderSbpQr(orderId, total) {
  const size = 29;
  const seedSource = `mobilecom-sbp-${orderId}-${total}`;
  let seed = 2166136261;
  for (const char of seedSource) {
    seed ^= char.charCodeAt(0);
    seed = Math.imul(seed, 16777619) >>> 0;
  }

  const finder = (x, y, offsetX, offsetY) => {
    const dx = x - offsetX;
    const dy = y - offsetY;
    if (dx < 0 || dx > 6 || dy < 0 || dy > 6) return false;
    return dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4);
  };

  const finderArea = (x, y) => {
    return (x <= 7 && y <= 7) || (x >= size - 8 && y <= 7) || (x <= 7 && y >= size - 8);
  };

  const cells = [];
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const isFinder = finder(x, y, 0, 0) || finder(x, y, size - 7, 0) || finder(x, y, 0, size - 7);
      const isTiming = !finderArea(x, y) && (x === 6 || y === 6) && (x + y) % 2 === 0;
      const noise = (seed + Math.imul(x + 3, 1103515245) + Math.imul(y + 5, 12345) + Math.imul(x * y + 1, 97)) >>> 0;
      const isData = !finderArea(x, y) && noise % 9 < 4;
      if (isFinder || isTiming || isData) cells.push(`<rect x="${x}" y="${y}" width="1" height="1"></rect>`);
    }
  }

  return `
    <svg class="sbp-qr-svg" viewBox="-4 -4 ${size + 8} ${size + 8}" role="img" aria-label="QR-код оплаты СБП">
      <rect x="-4" y="-4" width="${size + 8}" height="${size + 8}" class="sbp-qr-bg"></rect>
      <g class="sbp-qr-cells">${cells.join("")}</g>
    </svg>
  `;
}

// показывает окно оплаты заказа с QR-кодом и суммой.
function showSbpPayment(orderId, total) {
  openDialog(`
    <div class="dialog-body sbp-payment">
      <p class="eyebrow">Оплата СБП</p>
      <h2>Сканируйте QR-код</h2>
      <div class="sbp-payment-layout">
        <div class="sbp-qr">${renderSbpQr(orderId, total)}</div>
        <div class="sbp-payment-info">
          <div class="config-summary">
            <strong>Заказ #${orderId}</strong>
            <span>К оплате: ${formatPrice(total)}</span>
          </div>
          <p>Откройте приложение банка, выберите оплату по QR и подтвердите перевод через СБП.</p>
          <button class="primary-button full" type="button" data-close-dialog>Оплата выполнена</button>
          <button class="ghost-button full" type="button" data-close-dialog>Закрыть</button>
        </div>
      </div>
    </div>
  `);
}

// рассчитывает позицию всплывающего навигатора рядом с нажатой кнопкой.
function positionNavigator(anchor) {
  const popover = qs("#navigatorPopover");
  if (!popover || popover.hidden || !anchor) return;

  const margin = 12;
  const gap = 10;
  const anchorRect = anchor.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();
  const desiredLeft = anchorRect.left + anchorRect.width / 2 - popoverRect.width / 2;
  const left = Math.max(margin, Math.min(desiredLeft, window.innerWidth - popoverRect.width - margin));
  const hasBottomSpace = anchorRect.bottom + gap + popoverRect.height <= window.innerHeight - margin;
  const placement = hasBottomSpace || anchorRect.top < popoverRect.height + gap + margin ? "bottom" : "top";
  const top = placement === "bottom" ? anchorRect.bottom + gap : anchorRect.top - popoverRect.height - gap;
  const arrowLeft = anchorRect.left + anchorRect.width / 2 - left;

  popover.dataset.placement = placement;
  popover.style.left = `${left}px`;
  popover.style.top = `${Math.max(margin, top)}px`;
  popover.style.setProperty("--arrow-left", `${arrowLeft}px`);
}

// закрывает всплывающий навигатор и сбрасывает активные состояния кнопок.
function closeNavigator() {
  const popover = qs("#navigatorPopover");
  if (popover) popover.hidden = true;
  qsa("[data-open-navigator]").forEach((button) => {
    button.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");
  });
  navigatorAnchor = null;
}

// открывает навигатор и запоминает кнопку, относительно которой он расположен.
function openNavigator(anchor) {
  const popover = qs("#navigatorPopover");
  if (!popover) return;
  navigatorAnchor = anchor;
  popover.hidden = false;
  qsa("[data-open-navigator]").forEach((button) => {
    button.classList.toggle("is-open", button === anchor);
    button.setAttribute("aria-expanded", String(button === anchor));
  });
  positionNavigator(anchor);
}

// переключает видимость навигатора при повторном нажатии на кнопку.
function toggleNavigator(anchor) {
  const popover = qs("#navigatorPopover");
  if (!popover) return;
  if (!popover.hidden && navigatorAnchor === anchor) {
    closeNavigator();
    return;
  }
  openNavigator(anchor);
}

// переводит пользователя к якорному разделу главной страницы.
function goToNavigatorTarget(target) {
  closeNavigator();
  navigateToPage("home", `#${target}`);
}

// открывает корзину в модальном окне и предварительно обновляет ее содержимое.
function openCartModal() {
  const dialog = qs("#cartDialog");
  if (!dialog) return;
  renderCart();
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
}

// закрывает модальное окно корзины.
function closeCartModal() {
  const dialog = qs("#cartDialog");
  if (dialog?.open) dialog.close();
}

// собирает форму входа или регистрации для личного кабинета.
function showLogin(mode = "login") {
  const isRegister = mode === "register";

  openDialog(`
    <div class="dialog-body auth-dialog">
      <p class="eyebrow">Личный кабинет</p>
      <h2>${isRegister ? "Регистрация" : "Вход"}</h2>
      <div class="auth-switch" role="tablist" aria-label="Вход или регистрация">
        <button class="${!isRegister ? "is-active" : ""}" type="button" data-auth-mode="login">Войти</button>
        <button class="${isRegister ? "is-active" : ""}" type="button" data-auth-mode="register">Создать аккаунт</button>
      </div>
      ${isRegister ? `
        <form id="registerForm">
          <label>Имя <input required name="name" autocomplete="name" placeholder="Ваше имя"></label>
          <label>Телефон <input required name="phone" type="tel" autocomplete="tel" placeholder="+7 900 000-00-00"></label>
          <label>Пароль <input required name="password" type="password" autocomplete="new-password" minlength="4" placeholder="Минимум 4 символа"></label>
          <label>Повторите пароль <input required name="passwordRepeat" type="password" autocomplete="new-password" placeholder="Еще раз пароль"></label>
          <button class="primary-button full" type="submit">Создать аккаунт</button>
        </form>
      ` : `
        <form id="loginForm">
          <label>Телефон <input required name="phone" type="tel" autocomplete="tel" placeholder="+7 900 000-00-00"></label>
          <label>Пароль <input required name="password" type="password" autocomplete="current-password" placeholder="Введите пароль"></label>
          <button class="primary-button full" type="submit">Войти</button>
        </form>
      `}
    </div>
  `);
}

// показывает форму входа администратора с учебными учетными данными.
function showAdminLogin() {
  openDialog(`
    <div class="dialog-body">
      <p class="eyebrow">Администратор</p>
      <h2>Вход в панель</h2>
      <form id="adminLoginForm">
        <label>Логин <input required name="login" autocomplete="username" placeholder="admin"></label>
        <label>Пароль <input required name="password" type="password" autocomplete="current-password" placeholder="admin123"></label>
        <button class="primary-button full" type="submit">Войти</button>
      </form>
    </div>
  `);
}

// очищает форму тарифа в административной панели и возвращает значения по умолчанию.
function clearAdminTariffForm() {
  qs("#adminTariffId").value = "";
  qs("#adminTariffForm").reset();
  qs("#adminTariffType").value = "private";
}

// очищает форму услуги в административной панели.
function clearAdminServiceForm() {
  qs("#adminServiceId").value = "";
  qs("#adminServiceForm").reset();
  qs("#adminServiceIcon").value = "shield";
}

// заполняет форму администратора данными выбранного тарифа для редактирования.
function fillAdminTariffForm(id) {
  const tariff = tariffs.find((item) => item.id === id);
  if (!tariff) return;
  qs("#adminTariffId").value = tariff.id;
  qs("#adminTariffName").value = tariff.name;
  qs("#adminTariffType").value = tariff.type;
  qs("#adminTariffTag").value = tariff.tag;
  qs("#adminTariffPrice").value = tariff.price;
  qs("#adminTariffInternet").value = tariff.internet;
  qs("#adminTariffMinutes").value = tariff.minutes;
  qs("#adminTariffSms").value = tariff.sms;
  qs("#adminTariffDescription").value = tariff.description;
  qs("#adminTariffName").focus();
}

// заполняет форму администратора данными выбранной услуги.
function fillAdminServiceForm(id) {
  const service = services.find((item) => item.id === id);
  if (!service) return;
  qs("#adminServiceId").value = service.id;
  qs("#adminServiceName").value = service.name;
  qs("#adminServicePrice").value = service.price;
  qs("#adminServiceIcon").value = service.icon;
  qs("#adminServiceDescription").value = service.description;
  qs("#adminServiceName").focus();
}

// очищает форму отзыва и ставит текущую дату.
function clearAdminReviewForm() {
  qs("#adminReviewId").value = "";
  qs("#adminReviewForm").reset();
  qs("#adminReviewRating").value = "5";
  qs("#adminReviewDate").value = today();
}

// переносит выбранный отзыв в форму администратора для изменения.
function fillAdminReviewForm(id) {
  const review = reviews.find((item) => item.id === id);
  if (!review) return;
  qs("#adminReviewId").value = review.id;
  qs("#adminReviewName").value = review.name || "";
  qs("#adminReviewRating").value = String(review.rating || 5);
  qs("#adminReviewDate").value = review.date || today();
  qs("#adminReviewAvatar").value = review.avatar || "";
  qs("#adminReviewMessage").value = review.message || "";
  qs("#adminReviewAnswer").value = review.answer || "";
  qs("#adminReviewName").focus();
}

// открывает форму оформления заказа для выбранных тарифов и услуг.
function showCheckout() {
  if (!cart.length) {
    showToast("Корзина пустая", "Добавьте тариф или услугу перед оформлением");
    return;
  }

  closeCartModal();
  const total = cart.reduce((sum, item) => sum + Number(item.price || 0), 0);
  openDialog(`
    <div class="dialog-body">
      <p class="eyebrow">Оформление</p>
      <h2>Заявка на подключение</h2>
      <form id="checkoutForm">
        <label>Имя <input required name="name" placeholder="Екатерина"></label>
        <label>Телефон <input required name="phone" type="tel" placeholder="+7 900 000-00-00"></label>
        <label>Формат подключения
          <select name="connectionType" required>
            <option value="eSIM">eSIM онлайн</option>
            <option value="SIM с доставкой">SIM с доставкой</option>
            <option value="Самовывоз SIM">Самовывоз из офиса</option>
          </select>
        </label>
        <label>Номер
          <select name="numberAction" required>
            <option value="Перенос номера">Перенести свой номер</option>
            <option value="Новый номер">Получить новый номер</option>
          </select>
        </label>
        <fieldset class="payment-methods">
          <legend>Способ оплаты</legend>
          <div class="payment-options">
            <label class="payment-option">
              <input required name="paymentMethod" type="radio" value="СБП" checked>
              <span>
                <strong>СБП</strong>
                <small>По QR или номеру телефона</small>
              </span>
            </label>
            <label class="payment-option">
              <input required name="paymentMethod" type="radio" value="Банковская карта">
              <span>
                <strong>Банковская карта</strong>
                <small>Карта из личного кабинета</small>
              </span>
            </label>
            <label class="payment-option">
              <input required name="paymentMethod" type="radio" value="Другая карта">
              <span>
                <strong>Другая карта</strong>
                <small>Новая карта для оплаты</small>
              </span>
            </label>
          </div>
        </fieldset>
        <label>Адрес подключения <input required name="address" placeholder="Город, улица, дом"></label>
        <label>Примечание <textarea name="comment" rows="3" placeholder="Удобное время звонка или детали доставки"></textarea></label>
        <div class="config-summary">
          <strong>${cart.length} поз.</strong>
          <span>Ежемесячно: ${formatPrice(total)}</span>
        </div>
        <label class="inline-check"><input required name="agree" type="checkbox"> Согласен на обработку заявки</label>
        <button class="primary-button full" type="submit">Оформить заказ</button>
      </form>
    </div>
  `);
}

// открывает конструктор индивидуального тарифа.
function showConfig() {
  openDialog(`
    <div class="dialog-body">
      <p class="eyebrow">Конфигуратор</p>
      <h2>Собрать тариф</h2>
      <form id="configForm">
        <label>Интернет, ГБ <input name="internet" type="range" min="10" max="100" step="10" value="40"></label>
        <label>Минуты <input name="minutes" type="range" min="200" max="2000" step="100" value="700"></label>
        <label>SMS <input name="sms" type="range" min="0" max="500" step="50" value="100"></label>
        <div class="config-summary" id="configSummary"></div>
        <button class="primary-button full" type="submit">Добавить в корзину</button>
      </form>
    </div>
  `);
  updateConfigSummary();
}

// пересчитывает стоимость индивидуального тарифа при изменении ползунков.
function updateConfigSummary() {
  const form = qs("#configForm");
  const summary = qs("#configSummary");
  if (!form || !summary) return;

  const internet = Number(form.elements.internet.value);
  const minutes = Number(form.elements.minutes.value);
  const sms = Number(form.elements.sms.value);
  const price = Math.round(320 + internet * 9 + minutes * 0.35 + sms * 0.25);

  summary.innerHTML = `
    <strong>${internet} ГБ, ${minutes} минут, ${sms} SMS</strong>
    <span>Стоимость: ${formatPrice(price)} /мес</span>
  `;
}

// показывает короткий опрос, который помогает подобрать подходящий тариф.
function showTariffQuiz() {
  openDialog(`
    <div class="dialog-body">
      <p class="eyebrow">Подбор</p>
      <h2>Найти подходящий тариф</h2>
      <form id="tariffQuizForm">
        <label>Для кого тариф
          <select name="type">
            <option value="private">Для себя или семьи</option>
            <option value="business">Для бизнеса</option>
          </select>
        </label>
        <label>Интернет в месяц
          <select name="internet">
            <option value="15">До 15 ГБ</option>
            <option value="40">Около 40 ГБ</option>
            <option value="70">60 ГБ и больше</option>
          </select>
        </label>
        <label>Звонки
          <select name="minutes">
            <option value="300">Редко</option>
            <option value="700">Каждый день</option>
            <option value="1500">Много рабочих звонков</option>
          </select>
        </label>
        <label>Бюджет до <input name="budget" type="number" min="300" step="50" value="1000"></label>
        <button class="primary-button full" type="submit">Показать рекомендацию</button>
      </form>
      <div class="quiz-result" id="quizResult"></div>
    </div>
  `);
}

// подбирает тариф по ответам пользователя в мини-опросе.
function recommendTariff(form) {
  const type = form.get("type");
  const internet = Number(form.get("internet"));
  const minutes = Number(form.get("minutes"));
  const budget = Number(form.get("budget"));

  const pool = tariffs.filter((tariff) => tariff.type === type);
  const scored = (pool.length ? pool : tariffs).map((tariff) => {
    let score = 0;
    score += Math.max(0, 120 - Math.abs(tariff.internet - internet) * 2);
    score += Math.max(0, 100 - Math.abs(tariff.minutes - minutes) * 0.08);
    score += tariff.price <= budget ? 70 : Math.max(0, 70 - (tariff.price - budget) * 0.18);
    if (tariff.type === type) score += 30;
    return { tariff, score };
  });

  return scored.sort((a, b) => b.score - a.score)[0]?.tariff || tariffs[0];
}

// открывает форму обращения в поддержку и затем создает заявку.
function showSupportRequest() {
  openDialog(`
    <div class="dialog-body">
      <p class="eyebrow">Поддержка</p>
      <h2>Новое обращение</h2>
      <form id="supportRequestForm">
        <label>Имя <input required name="name" placeholder="Ваше имя"></label>
        <label>Контакт <input required name="contact" placeholder="+7 900 000-00-00 или email"></label>
        <label>Тема
          <select name="topic">
            <option value="Подбор тарифа">Подбор тарифа</option>
            <option value="Покрытие">Покрытие</option>
            <option value="Оплата">Оплата</option>
            <option value="Личный кабинет">Личный кабинет</option>
          </select>
        </label>
        <label>Сообщение <textarea required name="message" rows="4" placeholder="Опишите вопрос"></textarea></label>
        <button class="primary-button full" type="submit">Отправить</button>
      </form>
    </div>
  `);
}

// показывает список тарифов для смены текущего тарифа в кабинете.
function showTariffSwitch() {
  const current = tariffs.find((tariff) => tariff.id === currentTariffId);
  openDialog(`
    <div class="dialog-body">
      <p class="eyebrow">Личный кабинет</p>
      <h2>Сменить тариф</h2>
      <form id="switchTariffForm">
        <label>Новый тариф
          <select name="tariff">
            ${tariffs.map((tariff) => `<option value="${tariff.id}" ${tariff.id === currentTariffId ? "selected" : ""}>${tariff.name} - ${formatPrice(tariff.price)} /мес</option>`).join("")}
          </select>
        </label>
        <div class="config-summary">
          <strong>${current ? `Сейчас: ${current.name}` : "Текущий тариф не выбран"}</strong>
          <span>Смена тарифа будет добавлена в историю операций.</span>
        </div>
        <button class="primary-button full" type="submit">Сменить тариф</button>
      </form>
    </div>
  `);
}

// добавляет тариф в сравнение или удаляет его из сравнения.
function toggleCompare(id) {
  const tariff = tariffs.find((item) => item.id === id);
  const wasCompared = compareTariffIds.includes(id);

  if (compareTariffIds.includes(id)) {
    compareTariffIds = compareTariffIds.filter((tariffId) => tariffId !== id);
  } else if (compareTariffIds.length < 3) {
    compareTariffIds.push(id);
  } else {
    showToast("Можно сравнить до трех тарифов", "Уберите один тариф из сравнения");
    return;
  }

  renderAll();
  showToast(wasCompared ? "Убрано из сравнения" : "Добавлено в сравнение", tariff?.name || "");

  if (!wasCompared) {
    if (!qs("#page-tariffs")) navigateToPage("tariffs");
    focusComparePanel();
  }
}

// имитирует проверку покрытия по адресу и типу потребности.
function checkCoverage(address, need) {
  const normalized = address.trim().toLowerCase();
  const strongZone = normalized.includes("казан") || normalized.includes("бауман") || normalized.includes("центр");
  const hash = [...normalized].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const score = strongZone ? 1 : hash % 3;
  const labels = {
    home: "для дома и работы",
    travel: "для поездок по городу",
    business: "для бизнес-точки"
  };

  if (score === 0) {
    return {
      title: "Доступны 4G и стабильные звонки",
      text: `Адрес подходит ${labels[need] || "для подключения"}. Для 5G стоит уточнить этаж и ближайшую базовую станцию.`
    };
  }

  if (score === 1) {
    return {
      title: "Покрытие уверенное, 5G вероятно доступен",
      text: `Можно оформлять eSIM или доставку SIM. Перед подключением оператор подтвердит параметры по адресу.`
    };
  }

  return {
    title: "Нужна дополнительная проверка",
    text: `Сеть рядом есть, но для точного результата лучше оставить обращение в поддержку с комментарием по адресу.`
  };
}

// открывает форму пополнения баланса личного кабинета.
function showPayment() {
  openDialog(`
    <div class="dialog-body">
      <p class="eyebrow">Пополнение</p>
      <h2>Пополнить баланс</h2>
      <form id="paymentForm">
        <label>Сумма <input required name="amount" type="number" min="50" step="50" value="500"></label>
        <button class="primary-button full" type="submit">Пополнить</button>
      </form>
    </div>
  `);
}

// показывает детализацию последних операций пользователя.
function showDetailing() {
  openDialog(`
    <div class="dialog-body">
      <p class="eyebrow">Детализация</p>
      <h2>Последние операции</h2>
      <div class="operations-list">
        ${operations.map((operation) => `
          <div><span>${operation.date}</span><strong>${operation.title}</strong><em class="${operation.amount > 0 ? "positive" : operation.amount < 0 ? "negative" : ""}">${operation.amount > 0 ? "+" : ""}${formatPrice(operation.amount)}</em></div>
        `).join("")}
      </div>
      <button class="ghost-button full" type="button" data-close-dialog>Закрыть</button>
    </div>
  `);
}

// открывает подробное описание выбранного тарифа.
function showTariffDetail(id) {
  const tariff = tariffs.find((item) => item.id === id);
  if (!tariff) return;

  openDialog(`
    <div class="dialog-body">
      <p class="eyebrow">Детали тарифа</p>
      <h2>${tariff.name}</h2>
      <div class="price">${formatPrice(tariff.price)} <span>/мес</span></div>
      <p>${tariff.description}</p>
      <div class="tariff-specs">
        <div><strong>${tariff.internet} ГБ</strong><small>интернет</small></div>
        <div><strong>${tariff.minutes}</strong><small>минут</small></div>
        <div><strong>${tariff.sms}</strong><small>SMS</small></div>
      </div>
      <button class="primary-button full" type="button" data-add-tariff="${tariff.id}">Подключить тариф</button>
    </div>
  `);
}

// добавляет тариф или услугу в корзину и не дает добавить дубликат.
function addToCart(item) {
  const duplicate = cart.some((cartItem) => cartItem.type === item.type && cartItem.id === item.id);
  if (duplicate && item.type !== "custom") return;
  cart.push(item);
  renderAll();
  showToast("Добавлено в корзину", item.name);
}

// отключает услугу в кабинете и записывает это в историю операций.
function removeConnectedService(id) {
  const service = services.find((item) => item.id === id);
  connectedServices = connectedServices.filter((serviceId) => serviceId !== id);
  operations.unshift({ date: today(), title: `Отключение услуги «${service?.name || "Услуга"}»`, amount: 0 });
  renderAll();
  showToast("Услуга отключена", service?.name || "");
}

// добавляет новую операцию в начало истории и ограничивает длину списка.
function addOperation(title, amount) {
  operations.unshift({ date: today(), title, amount });
  operations = operations.slice(0, 8);
}

// прокручивает страницу к панели сравнения и кратко подсвечивает ее.
function focusComparePanel() {
  window.setTimeout(() => {
    const panel = qs("#comparePanel");
    if (!panel) return;
    panel.classList.remove("is-highlighted");
    void panel.offsetWidth;
    panel.classList.add("is-highlighted");
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 80);
}

function currentPageName() {
  // определяем имя текущей страницы по id активного блока page-*.
  const activePage = qs(".page");
  return activePage ? activePage.id.replace("page-", "") : "home";
}

function isNestedPage() {
  // вложенные HTML-файлы лежат в папке pages, поэтому для перехода на главную нужен выход на уровень выше.
  return location.pathname.split("/").includes("pages");
}

function pageHref(name, hash = "") {
  // функция собирает корректный относительный путь для корня и для файлов внутри pages.
  const file = pageFiles[name] || pageFiles.home;
  const nested = isNestedPage();
  const relativeFile = nested
    ? file.replace("pages/", "")
    : file;
  const normalizedFile = nested && name === "home" ? "../index.html" : relativeFile;
  return `${normalizedFile}${hash}`;
}

function navigateToPage(name, hash = "") {
  // переход между основными разделами теперь выполняется через реальные HTML-файлы.
  const file = (pageFiles[name] || pageFiles.home).split("/").pop();
  const target = pageHref(name, hash);
  const currentFile = location.pathname.split("/").pop() || "index.html";
  if (currentFile.toLowerCase() === file.toLowerCase()) {
    location.hash = hash ? hash.replace("#", "") : "";
    route();
    return;
  }
  location.href = target;
}

function route() {
  // маршрутизатор оставлен для якорей главной страницы и служебных hash-состояний.
  const name = (location.hash || `#${currentPageName()}`).replace("#", "");
  const sectionAnchors = {
    coverage: "home",
    support: "home",
    faq: "home",
    feedback: "home",
    reviews: "home"
  };
  const isSectionAnchor = Object.prototype.hasOwnProperty.call(sectionAnchors, name);

  if (isSectionAnchor && !qs("#page-home")) {
    navigateToPage("home", `#${name}`);
    return;
  }

  if (name === "admin" && !isAdminAuthorized()) {
    qsa(".page").forEach((page) => page.classList.remove("is-active"));
    const adminPage = qs("#page-admin");
    adminPage?.classList.add("is-active");
    if (adminPage?.dataset.title) document.title = adminPage.dataset.title;
    showAdminLogin();
    showToast("Нужен вход", "Введите логин и пароль администратора");
    return;
  }

  if (name === "cabinet" && !isUserAuthorized()) {
    qsa(".page").forEach((page) => page.classList.remove("is-active"));
    const cabinetPage = qs("#page-cabinet");
    cabinetPage?.classList.add("is-active");
    if (cabinetPage?.dataset.title) document.title = cabinetPage.dataset.title;
    showLogin("login");
    showToast("Нужен аккаунт", "Войдите или зарегистрируйтесь");
    return;
  }

  if (pageFiles[name] && !qs(`#page-${name}`)) {
    navigateToPage(name);
    return;
  }

  const pageName = isSectionAnchor ? sectionAnchors[name] : qs(`#page-${name}`) ? name : (qs("#page-404") ? "404" : currentPageName());

  qsa(".page").forEach((page) => page.classList.remove("is-active"));
  const activePage = qs(`#page-${pageName}`);
  if (!activePage) return;
  activePage.classList.add("is-active");

  const isNavigatorArea = ["coverage", "support", "feedback", "reviews"].includes(name);

  qsa("[data-route-link]").forEach((link) => {
    const isHeaderNav = Boolean(link.closest(".main-nav, .mobile-nav"));
    link.classList.toggle("is-active", link.dataset.routeLink === pageName && !(isHeaderNav && isNavigatorArea));
  });

  qsa("[data-open-navigator]").forEach((button) => {
    button.classList.toggle("is-active", isNavigatorArea);
  });

  document.title = activePage.dataset.title || "МобайлКом";
  const description = qs('meta[name="description"]');
  const keywords = qs('meta[name="keywords"]');
  if (description) description.setAttribute("content", activePage.dataset.description || "");
  if (keywords) keywords.setAttribute("content", activePage.dataset.keywords || "");

  refreshReveal(activePage);
  if (isSectionAnchor) {
    window.setTimeout(() => qs(`#${name}`)?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  } else {
    window.scrollTo({ top: 0, behavior: "auto" });
  }
}

function initSliders() {
  // инициализация слайдеров безопасно пропускает страницы без промо-слайдера.
  qsa("[data-slider]").forEach((slider) => {
    if (slider.dataset.sliderReady === "true") return;

    const viewport = qs(".slider-viewport", slider);
    const track = qs(".slider-track", slider);
    const slides = track ? Array.from(track.children) : [];
    const prevButton = qs("[data-slider-prev]", slider);
    const nextButton = qs("[data-slider-next]", slider);
    const dotsWrap = qs("[data-slider-dots]", slider);
    if (!viewport || !track || !slides.length) return;

    let activeIndex = 0;
    let timer;

    const update = () => {
      activeIndex = Math.max(0, Math.min(activeIndex, slides.length - 1));
      track.style.transform = `translateX(-${slides[activeIndex].offsetLeft}px)`;
      qsa("[data-slider-dot]", slider).forEach((dot) => {
        dot.classList.toggle("is-active", Number(dot.dataset.sliderDot) === activeIndex);
      });
    };

    const goTo = (index) => {
      activeIndex = index < 0 ? slides.length - 1 : index >= slides.length ? 0 : index;
      update();
    };

    dotsWrap.innerHTML = slides.map((_, index) => (
      `<button class="slider-dot" type="button" data-slider-dot="${index}" aria-label="Показать слайд ${index + 1}"></button>`
    )).join("");

    qsa("[data-slider-dot]", dotsWrap).forEach((dot) => {
      dot.addEventListener("click", () => goTo(Number(dot.dataset.sliderDot)));
    });

    const stop = () => window.clearInterval(timer);
    const start = () => {
      stop();
      timer = window.setInterval(() => goTo(activeIndex + 1), 5600);
    };

    prevButton?.addEventListener("click", () => goTo(activeIndex - 1));
    nextButton?.addEventListener("click", () => goTo(activeIndex + 1));
    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);
    slider.addEventListener("focusin", stop);
    slider.addEventListener("focusout", start);
    window.addEventListener("resize", update);

    slider.dataset.sliderReady = "true";
    update();
    start();
  });
}

// помечает элементы для анимации появления и подключает их к наблюдателю.
function refreshReveal(root = document) {
  const candidates = qsa(
    ".content-band, .catalog-layout, .coverage-layout, .support-grid, .feedback-layout, .review-card, .map-panel, .admin-form, .admin-tools, .cabinet-dashboard, .cabinet-card, .connected-item, .cart-layout, .tariff-card, .service-card, .info-card, .promo-offer, .legal-section, .compare-panel, .coverage-check, .review-stats, .faq-list details, .operations-list div, .cart-item, .admin-table div",
    root
  );

  candidates.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", `${Math.min(index * 30, 180)}ms`);
    if (revealObserver && !element.classList.contains("is-visible")) revealObserver.observe(element);
  });
}

function initReveal() {
  // анимации появления подключаются к найденным блокам и не требуют отдельного кода для каждой страницы.
  if (!("IntersectionObserver" in window)) {
    refreshReveal();
    qsa(".reveal").forEach((element) => element.classList.add("is-visible"));
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -34px 0px" }
  );

  refreshReveal();
}

function bindEvents() {
  // обработчики навешиваются один раз на общий документ и работают через data-атрибуты.
  window.addEventListener("hashchange", route);
  window.addEventListener("resize", () => {
    if (navigatorAnchor) positionNavigator(navigatorAnchor);
  });
  window.addEventListener("scroll", () => {
    if (navigatorAnchor) positionNavigator(navigatorAnchor);
  }, true);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigator();
  });

  ["#typeFilter", "#internetFilter", "#priceFilter", "#tariffSearch"].forEach((selector) => {
    qs(selector)?.addEventListener("input", () => {
      visibleTariffs = 4;
      renderTariffs();
      refreshReveal(qs("#page-tariffs"));
    });
  });

  qs("#resetFilters")?.addEventListener("click", () => {
    qs("#typeFilter").value = "all";
    qs("#internetFilter").value = 0;
    qs("#priceFilter").value = 2500;
    qs("#tariffSearch").value = "";
    visibleTariffs = 4;
    renderTariffs();
    showToast("Фильтры сброшены");
  });

  qs("#showMoreTariffs")?.addEventListener("click", () => {
    visibleTariffs += 4;
    renderTariffs();
    refreshReveal(qs("#page-tariffs"));
  });

  qs("#reviewFilter")?.addEventListener("change", (event) => {
    reviewRatingFilter = event.target.value;
    renderReviews();
    refreshReveal(qs("#reviews"));
  });

  qs("#adminOrderSearch")?.addEventListener("input", (event) => {
    adminOrderSearch = event.target.value;
    renderAdmin();
  });

  qs("#adminOrderStatus")?.addEventListener("change", (event) => {
    adminOrderStatus = event.target.value;
    renderAdmin();
  });

  qs("#checkoutButton")?.addEventListener("click", showCheckout);
  qs("#cartModalCheckout")?.addEventListener("click", showCheckout);
  qs("#clearCartButton")?.addEventListener("click", () => {
    cart = [];
    renderAll();
    showToast("Корзина очищена");
  });
  qs("#cartModalClear")?.addEventListener("click", () => {
    cart = [];
    renderAll();
    showToast("Корзина очищена");
  });
  qs("#resetAdminTariff")?.addEventListener("click", clearAdminTariffForm);
  qs("#resetAdminService")?.addEventListener("click", clearAdminServiceForm);
  qs("#resetAdminReview")?.addEventListener("click", clearAdminReviewForm);

  qsa("[data-admin-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      qsa("[data-admin-tab]").forEach((item) => item.classList.toggle("is-active", item === button));
      qsa("[data-admin-view]").forEach((view) => view.classList.toggle("is-active", view.dataset.adminView === button.dataset.adminTab));
    });
  });

  qs("#appDialog")?.addEventListener("click", (event) => {
    if (event.target.id === "appDialog") closeDialog();
  });

  qs("#cartDialog")?.addEventListener("click", (event) => {
    if (event.target.id === "cartDialog") closeCartModal();
  });

  document.addEventListener("input", (event) => {
    if (event.target.closest("#configForm")) updateConfigSummary();
  });

  document.addEventListener("click", (event) => {
    const openCart = event.target.closest("[data-open-cart]");
    const closeCart = event.target.closest("[data-close-cart]");
    const closeButton = event.target.closest("[data-close-dialog]");
    const navigatorButton = event.target.closest("[data-open-navigator]");
    const navigatorLink = event.target.closest("[data-navigator-target]");
    const themeButton = event.target.closest("[data-theme-toggle]");
    const loginButton = event.target.closest("[data-open-login]");
    const authModeButton = event.target.closest("[data-auth-mode]");
    const configButton = event.target.closest("[data-open-config]");
    const quizButton = event.target.closest("[data-open-quiz]");
    const supportButton = event.target.closest("[data-open-support-request]");
    const payButton = event.target.closest("[data-pay]");
    const detailingButton = event.target.closest("[data-open-detailing]");
    const switchTariffButton = event.target.closest("[data-open-switch-tariff]");
    const detailButton = event.target.closest("[data-detail]");
    const compareButton = event.target.closest("[data-toggle-compare]");
    const clearCompareButton = event.target.closest("[data-clear-compare]");
    const tariffButton = event.target.closest("[data-add-tariff]");
    const serviceButton = event.target.closest("[data-add-service]");
    const removeButton = event.target.closest("[data-remove-cart]");
    const removeConnectedButton = event.target.closest("[data-remove-connected]");
    const autopayButton = event.target.closest("[data-toggle-autopay]");
    const logoutButton = event.target.closest("[data-logout]");
    const adminLogoutButton = event.target.closest("[data-admin-logout]");
    const adminEditTariff = event.target.closest("[data-admin-edit-tariff]");
    const adminDeleteTariff = event.target.closest("[data-admin-delete-tariff]");
    const adminEditService = event.target.closest("[data-admin-edit-service]");
    const adminDeleteService = event.target.closest("[data-admin-delete-service]");
    const adminNextOrder = event.target.closest("[data-admin-next-order]");
    const adminDeleteOrder = event.target.closest("[data-admin-delete-order]");
    const adminEditReview = event.target.closest("[data-admin-edit-review]");
    const adminDeleteReview = event.target.closest("[data-admin-delete-review]");
    const adminAction = adminEditTariff || adminDeleteTariff || adminEditService || adminDeleteService || adminNextOrder || adminDeleteOrder || adminEditReview || adminDeleteReview;

    if (navigatorButton) {
      toggleNavigator(navigatorButton);
      return;
    }

    if (themeButton) {
      toggleTheme();
      return;
    }

    if (openCart) openCartModal();
    if (closeCart) closeCartModal();
    if (closeButton) closeDialog();
    if (navigatorLink) {
      event.preventDefault();
      goToNavigatorTarget(navigatorLink.dataset.navigatorTarget);
      return;
    }

    if (!event.target.closest("#navigatorPopover")) closeNavigator();

    if (authModeButton) {
      showLogin(authModeButton.dataset.authMode);
      return;
    }
    if (loginButton) {
      if (isUserAuthorized()) navigateToPage("cabinet");
      else showLogin("login");
    }
    if (configButton) showConfig();
    if (quizButton) showTariffQuiz();
    if (supportButton) showSupportRequest();
    if (payButton) showPayment();
    if (detailingButton) showDetailing();
    if (switchTariffButton) showTariffSwitch();
    if (detailButton) showTariffDetail(detailButton.dataset.detail);
    if (compareButton) toggleCompare(compareButton.dataset.toggleCompare);
    if (clearCompareButton) {
      compareTariffIds = [];
      renderAll();
      saveAll();
      showToast("Сравнение очищено");
    }
    if (autopayButton) {
      autopayEnabled = !autopayEnabled;
      addOperation(autopayEnabled ? "Автоплатеж включен" : "Автоплатеж отключен", 0);
      renderAll();
      showToast(autopayEnabled ? "Автоплатеж включен" : "Автоплатеж отключен");
    }

    if (logoutButton) {
      setCurrentAccount("");
      navigateToPage("home");
      renderAll();
      showToast("Вы вышли из личного кабинета");
    }

    if (tariffButton) {
      const tariff = tariffs.find((item) => item.id === tariffButton.dataset.addTariff);
      if (tariff) addToCart({ id: tariff.id, type: "tariff", name: `Тариф «${tariff.name}»`, price: tariff.price, kind: "Тариф" });
      closeDialog();
    }

    if (serviceButton) {
      const service = services.find((item) => item.id === serviceButton.dataset.addService);
      if (service) addToCart({ id: service.id, type: "service", name: service.name, price: service.price, kind: "Услуга" });
    }

    if (removeButton) {
      const [removed] = cart.splice(Number(removeButton.dataset.removeCart), 1);
      renderAll();
      showToast("Удалено из корзины", removed?.name || "");
    }

    if (removeConnectedButton) removeConnectedService(removeConnectedButton.dataset.removeConnected);

    if (adminAction && !isAdminAuthorized()) {
      showAdminLogin();
      showToast("Нужен вход", "Введите логин и пароль администратора");
      return;
    }

    if (adminLogoutButton) {
      setAdminAuthorized(false);
      navigateToPage("home");
      showToast("Вы вышли из админ-панели");
    }

    if (adminEditTariff) fillAdminTariffForm(adminEditTariff.dataset.adminEditTariff);

    if (adminDeleteTariff) {
      const id = adminDeleteTariff.dataset.adminDeleteTariff;
      tariffs = tariffs.filter((tariff) => tariff.id !== id);
      cart = cart.filter((item) => item.type !== "tariff" || item.id !== id);
      compareTariffIds = compareTariffIds.filter((tariffId) => tariffId !== id);
      if (currentTariffId === id) currentTariffId = tariffs[0]?.id || "";
      renderAll();
      showToast("Тариф удален");
    }

    if (adminEditService) fillAdminServiceForm(adminEditService.dataset.adminEditService);

    if (adminDeleteService) {
      const id = adminDeleteService.dataset.adminDeleteService;
      services = services.filter((service) => service.id !== id);
      connectedServices = connectedServices.filter((serviceId) => serviceId !== id);
      cart = cart.filter((item) => item.type !== "service" || item.id !== id);
      renderAll();
      showToast("Услуга удалена");
    }

    if (adminNextOrder) {
      const order = orders.find((item) => String(item.id) === adminNextOrder.dataset.adminNextOrder);
      const statuses = ["Новая", "В работе", "Готово", "Отменена"];
      if (order) {
        order.status = statuses[(statuses.indexOf(order.status) + 1) % statuses.length];
        renderAll();
        showToast("Статус заявки изменен", `#${order.id}: ${order.status}`);
      }
    }

    if (adminDeleteOrder) {
      orders = orders.filter((order) => String(order.id) !== adminDeleteOrder.dataset.adminDeleteOrder);
      renderAll();
      showToast("Заявка удалена");
    }
    if (adminEditReview) fillAdminReviewForm(adminEditReview.dataset.adminEditReview);

    if (adminDeleteReview) {
      reviews = reviews.filter((review) => review.id !== adminDeleteReview.dataset.adminDeleteReview);
      clearAdminReviewForm();
      renderAll();
      showToast("\u041e\u0442\u0437\u044b\u0432 \u0443\u0434\u0430\u043b\u0435\u043d");
    }
  });

  document.addEventListener("submit", (event) => {
    if (event.target.id === "coverageCheckForm") {
      event.preventDefault();
      const form = new FormData(event.target);
      const address = String(form.get("address") || "");
      const need = String(form.get("need") || "home");
      const result = checkCoverage(address, need);
      qs("#coverageResult").innerHTML = `
        <strong>${result.title}</strong>
        <span>${result.text}</span>
      `;
      return;
    }

    if (event.target.id === "loginForm") {
      event.preventDefault();
      const form = new FormData(event.target);
      const phone = normalizePhone(form.get("phone"));
      const password = String(form.get("password") || "");
      const account = accounts.find((item) => item.phone === phone && item.password === password);

      if (!account) {
        showToast("Не удалось войти", "Проверьте телефон и пароль");
        return;
      }

      setCurrentAccount(account.id);
      closeDialog();
      renderAll();
      navigateToPage("cabinet");
      showToast("Вход выполнен", "Открыт личный кабинет");
    }

    if (event.target.id === "registerForm") {
      event.preventDefault();
      const form = new FormData(event.target);
      const name = String(form.get("name") || "").trim();
      const displayPhone = String(form.get("phone") || "").trim();
      const phone = normalizePhone(displayPhone);
      const password = String(form.get("password") || "");
      const passwordRepeat = String(form.get("passwordRepeat") || "");

      if (!name || phone.length < 10) {
        showToast("Проверьте данные", "Введите имя и корректный телефон");
        return;
      }

      if (password.length < 4) {
        showToast("Короткий пароль", "Пароль должен быть не короче 4 символов");
        return;
      }

      if (password !== passwordRepeat) {
        showToast("Пароли не совпадают");
        return;
      }

      if (accounts.some((account) => account.phone === phone)) {
        showToast("Аккаунт уже есть", "Войдите по этому телефону");
        showLogin("login");
        return;
      }

      const account = {
        id: `account-${Date.now()}`,
        name,
        phone,
        displayPhone,
        password,
        createdAt: today()
      };

      accounts.push(account);
      saveState("accounts", accounts);
      setCurrentAccount(account.id);
      closeDialog();
      renderAll();
      navigateToPage("cabinet");
      showToast("Аккаунт создан", "Личный кабинет открыт");
    }

    if (event.target.id === "adminLoginForm") {
      event.preventDefault();
      const form = new FormData(event.target);
      const login = String(form.get("login") || "").trim();
      const password = String(form.get("password") || "");

      if (login === adminCredentials.login && password === adminCredentials.password) {
        setAdminAuthorized(true);
        closeDialog();
        navigateToPage("admin");
        showToast("Вход выполнен", "Открыта админ-панель");
        return;
      }

      showToast("Ошибка входа", "Неверный логин или пароль");
    }

    if (event.target.id === "tariffQuizForm") {
      event.preventDefault();
      const recommendation = recommendTariff(new FormData(event.target));
      if (!recommendation) {
        showToast("Тарифы не найдены", "Добавьте тариф в админ-панели");
        return;
      }
      qs("#quizResult").innerHTML = `
        <div class="config-summary">
          <strong>${recommendation.name}</strong>
          <span>${recommendation.internet} ГБ · ${recommendation.minutes} минут · ${formatPrice(recommendation.price)} /мес</span>
          <p>${recommendation.description}</p>
        </div>
        <button class="primary-button full" type="button" data-add-tariff="${recommendation.id}">Добавить в корзину</button>
      `;
    }

    if (event.target.id === "supportRequestForm") {
      event.preventDefault();
      const form = new FormData(event.target);
      const orderId = Math.max(1042, ...orders.map((order) => Number(order.id) || 0)) + 1;
      orders.unshift({
        id: orderId,
        title: `Обращение: ${form.get("topic")} · ${form.get("name")}`,
        status: "Новая",
        total: 0,
        details: `${form.get("contact")} · ${form.get("message")}`
      });
      renderAll();
      closeDialog();
      showToast("Обращение отправлено", `Номер заявки #${orderId}`);
    }

    if (event.target.id === "switchTariffForm") {
      event.preventDefault();
      const id = String(new FormData(event.target).get("tariff") || "");
      const tariff = tariffs.find((item) => item.id === id);
      if (!tariff) return;
      currentTariffId = tariff.id;
      addOperation(`Смена тарифа на «${tariff.name}»`, 0);
      renderAll();
      closeDialog();
      showToast("Тариф изменен", tariff.name);
    }

    if (event.target.id === "checkoutForm") {
      event.preventDefault();
      const form = new FormData(event.target);
      const total = cart.reduce((sum, item) => sum + Number(item.price || 0), 0);
      const orderId = Math.max(1042, ...orders.map((order) => Number(order.id) || 0)) + 1;
      const tariffItem = cart.find((item) => item.type === "tariff");
      const customTariffItem = cart.find((item) => item.type === "custom");
      const paymentMethod = String(form.get("paymentMethod") || "СБП");
      orders.unshift({
        id: orderId,
        title: cart.map((item) => item.name).join(", "),
        status: "Новая",
        total,
        paymentMethod,
        details: `${form.get("connectionType")} · ${form.get("numberAction")} · Оплата: ${paymentMethod} · ${form.get("address")}${form.get("comment") ? ` · ${form.get("comment")}` : ""}`
      });

      cart.filter((item) => item.type === "service").forEach((item) => {
        if (!connectedServices.includes(item.id)) connectedServices.push(item.id);
      });

      if (tariffItem && tariffs.some((tariff) => tariff.id === tariffItem.id)) currentTariffId = tariffItem.id;
      if (customTariffItem) addOperation(`Подключение ${customTariffItem.name}`, 0);
      addOperation(`Заявка #${orderId}: ${form.get("name")}`, -total);
      cart = [];
      renderAll();
      navigateToPage("home", "#thanks");
      if (paymentMethod === "СБП") {
        showSbpPayment(orderId, total);
      } else {
        closeDialog();
      }
      showToast("Заявка оформлена", `Заказ #${orderId} добавлен`);
    }

    if (event.target.id === "paymentForm") {
      event.preventDefault();
      const amount = Number(new FormData(event.target).get("amount"));
      if (!Number.isFinite(amount) || amount <= 0) {
        showToast("Ошибка", "Введите корректную сумму");
        return;
      }
      balance += amount;
      addOperation("Пополнение баланса", amount);
      renderAll();
      closeDialog();
      showToast("Баланс пополнен", `+${formatPrice(amount)}`);
    }

    if (event.target.id === "configForm") {
      event.preventDefault();
      const form = new FormData(event.target);
      const internet = Number(form.get("internet"));
      const minutes = Number(form.get("minutes"));
      const sms = Number(form.get("sms"));
      const price = Math.round(320 + internet * 9 + minutes * 0.35 + sms * 0.25);
      addToCart({
        id: `custom-${Date.now()}`,
        type: "custom",
        name: `Индивидуальный тариф ${internet} ГБ`,
        price,
        kind: `${internet} ГБ, ${minutes} минут, ${sms} SMS`
      });
      closeDialog();
      openCartModal();
    }

    if (event.target.id === "adminTariffForm") {
      event.preventDefault();
      if (!isAdminAuthorized()) {
        showAdminLogin();
        return;
      }

      const id = qs("#adminTariffId").value || `tariff-${Date.now()}`;
      const updated = {
        id,
        name: qs("#adminTariffName").value.trim(),
        type: qs("#adminTariffType").value,
        tag: qs("#adminTariffTag").value.trim(),
        price: Number(qs("#adminTariffPrice").value),
        internet: Number(qs("#adminTariffInternet").value),
        minutes: Number(qs("#adminTariffMinutes").value),
        sms: Number(qs("#adminTariffSms").value),
        description: qs("#adminTariffDescription").value.trim()
      };

      if (!updated.name || !updated.tag || !updated.description || [updated.price, updated.internet, updated.minutes, updated.sms].some((value) => !Number.isFinite(value) || value < 0)) {
        showToast("Ошибка", "Проверьте данные тарифа");
        return;
      }

      const index = tariffs.findIndex((tariff) => tariff.id === id);
      if (index >= 0) tariffs[index] = updated;
      else tariffs.push(updated);
      cart = cart.map((item) => item.type === "tariff" && item.id === id ? { ...item, name: `Тариф «${updated.name}»`, price: updated.price } : item);
      clearAdminTariffForm();
      renderAll();
      showToast(index >= 0 ? "\u0422\u0430\u0440\u0438\u0444 \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d" : "\u0422\u0430\u0440\u0438\u0444 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d", updated.name);
    }

    if (event.target.id === "adminServiceForm") {
      event.preventDefault();
      if (!isAdminAuthorized()) {
        showAdminLogin();
        return;
      }

      const id = qs("#adminServiceId").value || `service-${Date.now()}`;
      const updated = {
        id,
        name: qs("#adminServiceName").value.trim(),
        price: Number(qs("#adminServicePrice").value),
        icon: qs("#adminServiceIcon").value,
        description: qs("#adminServiceDescription").value.trim()
      };

      if (!updated.name || !updated.description || !Number.isFinite(updated.price) || updated.price < 0) {
        showToast("Ошибка", "Проверьте данные услуги");
        return;
      }

      const index = services.findIndex((service) => service.id === id);
      if (index >= 0) services[index] = updated;
      else services.push(updated);
      cart = cart.map((item) => item.type === "service" && item.id === id ? { ...item, name: updated.name, price: updated.price } : item);
      clearAdminServiceForm();
      renderAll();
      showToast(index >= 0 ? "\u0423\u0441\u043b\u0443\u0433\u0430 \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0430" : "\u0423\u0441\u043b\u0443\u0433\u0430 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0430", updated.name);
    }

    if (event.target.id === "adminReviewForm") {
      event.preventDefault();
      if (!isAdminAuthorized()) {
        showAdminLogin();
        return;
      }

      const id = qs("#adminReviewId").value || `review-${Date.now()}`;
      const updated = {
        id,
        name: qs("#adminReviewName").value.trim(),
        rating: Number(qs("#adminReviewRating").value),
        date: qs("#adminReviewDate").value.trim() || today(),
        avatar: qs("#adminReviewAvatar").value.trim(),
        message: qs("#adminReviewMessage").value.trim(),
        answer: qs("#adminReviewAnswer").value.trim()
      };

      if (!updated.name || !updated.message || !Number.isFinite(updated.rating)) {
        showToast("\u041e\u0448\u0438\u0431\u043a\u0430", "\u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u0438\u043c\u044f, \u043e\u0446\u0435\u043d\u043a\u0443 \u0438 \u0442\u0435\u043a\u0441\u0442 \u043e\u0442\u0437\u044b\u0432\u0430");
        return;
      }

      const index = reviews.findIndex((review) => review.id === id);
      if (index >= 0) reviews[index] = updated;
      else reviews.unshift(updated);
      clearAdminReviewForm();
      renderAll();
      showToast(index >= 0 ? "\u041e\u0442\u0437\u044b\u0432 \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d" : "\u041e\u0442\u0437\u044b\u0432 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d", updated.name);
    }

    if (event.target.id === "feedbackForm") {
      event.preventDefault();
      const form = new FormData(event.target);
      reviews.unshift({
        id: `review-${Date.now()}`,
        name: String(form.get("name") || "").trim(),
        rating: Number(form.get("rating") || 5),
        message: String(form.get("message") || "").trim(),
        date: today(),
        avatar: "",
        answer: ""
      });
      reviews = reviews.slice(0, 12);
      event.target.reset();
      renderAll();
      showToast("Спасибо за отзыв", "Сообщение добавлено на страницу");
    }
  });
}

renderAll();
initSliders();
bindEvents();
initReveal();
applyTheme(currentTheme());
route();


