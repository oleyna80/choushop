**полное ТЗ для MVP-сайта Mystery Box**
---

## 1. Цель проекта

Сделать интернет-магазин для продажи Mystery Box во Франции:

* несколько типов товаров
* онлайн-оплата
* выбор доставки
* современный визуал
* простое управление заказами
* архитектура, готовая к дальнейшему подключению агентов, ботов и автоматизаций

Главная цель MVP: **запустить продажи быстро**, не строя тяжелую e-commerce систему с лишней сложностью.

---

## 2. Рекомендуемое решение

### Основной стек

* **TypeScript**
* **Next.js** на **App Router**
* **React**
* **Tailwind CSS**
* UI-компоненты: **shadcn/ui**
* ORM: **Prisma**
* База данных: **PostgreSQL**
* Аутентификация админки: **NextAuth** или clerk-like решение, но для MVP лучше **NextAuth**
* Оплата: **Stripe Checkout**
* Webhooks: **Stripe Webhooks**
* Хранилище медиа: **Cloudinary** или **S3-compatible storage**
* Хостинг: **Vercel**
* Логи и мониторинг: **Sentry**
* Аналитика: **GA4 + Meta Pixel + TikTok Pixel**

### Почему это решение

* Next.js App Router подходит для full-stack структуры: страницы, серверные компоненты, route handlers, server actions. Это удобно для e-commerce MVP и внутреннего API. ([Next.js][1])
* Stripe Checkout уже закрывает безопасную оплату, а webhook-подход нужен, чтобы синхронно обновлять заказы, статусы и триггерить автоматизации. ([Документация Stripe][2])
* Tailwind хорошо подходит для быстрого построения современного адаптивного UI без тяжелой дизайн-системы на старте. ([Tailwind CSS][3])

---

## 3. Формат MVP

### Что делаем сейчас

Полноценный магазин с:

* каталогом
* карточками товаров
* корзиной
* checkout
* оплатой
* доставкой
* админкой для товаров и заказов
* базовой аналитикой
* API/событиями для будущих агентов

### Что не делаем в MVP

* маркетплейс
* конструктор коробки пользователем
* сложная CRM
* сложная система складов
* мультивалютность
* мультиязычность кроме FR-first
* полнофункциональный customer account area
* рекомендательная система AI на сайте
* продвинутый OMS/WMS

---

## 4. Бизнес-модель сайта

### Типы товаров

Нужно поддержать минимум 3 типа:

1. **Fixed Mystery Box**

   * заранее определенный продукт
   * пример: Mini Box / Classic Box / Premium Box

2. **Theme-based Box**

   * box по теме: cute, pink, jewelry, kawaii, school accessories и т.д.

3. **Limited / Seasonal Box**

   * лимитированные коллекции
   * Valentine, Summer, Back to School, Birthday

### В будущем

4. Add-ons

   * подарочная упаковка
   * открытка
   * экспресс-обработка

---

## 5. Основные пользовательские сценарии

### Сценарий 1. Покупка товара

1. Пользователь заходит на главную
2. Видит ассортимент
3. Открывает карточку товара
4. Выбирает опции
5. Добавляет в корзину
6. Переходит к оплате
7. Заполняет данные доставки
8. Переходит в Stripe Checkout
9. Успешно оплачивает
10. Возвращается на страницу успеха
11. Заказ фиксируется в системе
12. Админ видит заказ в панели

### Сценарий 2. Заказ с доставкой

1. Пользователь вводит адрес
2. Сайт рассчитывает/показывает доступные способы доставки
3. Пользователь выбирает способ
4. Стоимость доставки добавляется к заказу
5. После оплаты заказ получает статус `paid`
6. Админ меняет статус на `packed` / `shipped`
7. Пользователю отправляется email со статусом

### Сценарий 3. Админ управляет товарами

1. Входит в админку
2. Создает товар
3. Загружает фото
4. Указывает цену, описание, наличие, тип box
5. Публикует товар

### Сценарий 4. Будущий агент

1. Получает событие `order.created` или `order.paid`
2. Читает структурированные данные
3. Создает документ, FAQ-ответ, внутреннюю карточку заказа или автоматическое сообщение клиенту

---

## 6. Структура сайта

### Публичная часть

* `/` — главная
* `/shop` — каталог
* `/product/[slug]` — карточка товара
* `/cart` — корзина
* `/checkout` — подготовка к оплате
* `/success` — успешная оплата
* `/cancel` — отмена оплаты
* `/about` — о бренде
* `/faq` — FAQ
* `/contact` — контакты
* `/legal` — legal pages
* `/privacy`
* `/shipping-returns`
* `/terms`

### Админка

* `/admin`
* `/admin/products`
* `/admin/orders`
* `/admin/customers`
* `/admin/content`
* `/admin/discounts`
* `/admin/analytics`
* `/admin/settings`
* `/admin/integrations`
* `/admin/events` — журнал событий для агентов и автоматизаций

---

## 7. Функциональные требования

## 7.1 Каталог

Сайт должен:

* показывать товары списком
* поддерживать категории
* фильтровать по:

  * типу box
  * цене
  * теме
  * наличию
* сортировать по:

  * newest
  * price asc
  * price desc
  * featured

## 7.2 Карточка товара

На карточке товара:

* название
* цена
* старая цена при скидке
* изображения
* короткое описание
* подробное описание
* “что может быть внутри”
* уровень сюрприза / theme vibe
* наличие
* сроки обработки
* условия доставки
* CTA “Ajouter au panier”

Опционально:

* возрастная рекомендация
* not suitable warning для мелких предметов
* gift note add-on

## 7.3 Корзина

Функции:

* добавить / удалить товар
* изменить количество
* показать subtotal
* показать доставку
* показать total
* применить промокод
* сохранить корзину в session/local storage

## 7.4 Оплата

Рекомендация: **Stripe Checkout**.

Нужно:

* создание checkout session на сервере
* передача line items
* передача shipping option
* передача metadata
* возврат на success/cancel page
* обработка webhook после оплаты

Важно:

* статус заказа нельзя считать финальным только по redirect на success page
* статус должен подтверждаться webhook-событием Stripe ([Документация Stripe][2])

## 7.5 Доставка

Для MVP рекомендую 2 режима:

### MVP сейчас

* фиксированные способы доставки:

  * France standard
  * France tracked
  * EU standard
* тарифы задаются в админке вручную
* label создается вручную вне системы

### Следующий этап

* интеграция с Sendcloud/Boxtal
* автогенерация shipping label
* tracking number sync
* email/notification клиенту

Так быстрее выйти в продажи и не зависеть от интеграций на старте.

## 7.6 Заказы

Система должна:

* создавать заказ до оплаты в статусе `pending`
* после webhook менять статус на `paid`
* хранить адрес, товары, сумму, доставку, налоги, промокод
* поддерживать статусы:

  * `pending`
  * `awaiting_payment`
  * `paid`
  * `processing`
  * `packed`
  * `shipped`
  * `delivered`
  * `cancelled`
  * `refunded`

## 7.7 Email-уведомления

Нужно:

* подтверждение заказа
* подтверждение оплаты
* отправка заказа
* отмена
* возврат

Провайдер: **Resend** или Postmark.
Для MVP лучше **Resend**.

## 7.8 Админка

Админ должен мочь:

* создавать и редактировать товары
* включать/выключать товар
* управлять остатком
* видеть заказы
* менять статусы
* добавлять tracking number
* управлять контентом главной
* управлять промокодами
* смотреть базовую аналитику

---

## 8. Архитектура данных

## 8.1 Основные сущности

### Product

* id
* slug
* title
* shortDescription
* description
* type
* theme
* price
* compareAtPrice
* currency
* status
* featured
* stock
* sku
* weight
* seoTitle
* seoDescription
* createdAt
* updatedAt

### ProductImage

* id
* productId
* url
* alt
* sortOrder

### ProductVariant

Нужна только если реально есть варианты.
Для MVP можно без variant engine, если boxes продаются как отдельные продукты.

### Cart

* id
* sessionId
* items
* subtotal
* shippingAmount
* discountAmount
* totalAmount
* currency

### Order

* id
* orderNumber
* customerEmail
* customerName
* phone
* shippingAddress
* billingAddress
* status
* paymentStatus
* fulfillmentStatus
* currency
* subtotal
* shippingAmount
* discountAmount
* totalAmount
* stripeCheckoutSessionId
* stripePaymentIntentId
* notes
* createdAt
* updatedAt

### OrderItem

* id
* orderId
* productId
* productTitleSnapshot
* unitPrice
* quantity
* totalPrice

### DiscountCode

* id
* code
* type
* value
* active
* startAt
* endAt
* usageLimit

### Shipment

* id
* orderId
* carrier
* method
* trackingNumber
* trackingUrl
* shippedAt
* deliveredAt

### EventLog

Ключевая сущность для будущих агентов.

* id
* eventType
* entityType
* entityId
* payloadJson
* source
* status
* createdAt

### AdminUser

* id
* email
* role
* lastLoginAt

---

## 9. Правила для будущих агентов

Вот это важно заложить сразу.

### Система должна быть agent-ready

Нужно, чтобы боты и агенты потом могли:

* читать заказы
* читать товары
* видеть статусы
* получать события
* создавать документы/ответы/сводки
* дополнять внутренние заметки
* не ломать боевую логику магазина

### Что закладываем сразу

1. **Четкие доменные сущности**
2. **Event log**
3. **Внутренний API**
4. **webhook/event architecture**
5. **audit trail**
6. **metadata fields**
7. **role-based access**

### Принцип

Агенты не должны напрямую менять всё подряд в БД.
Они должны работать через:

* внутренние API endpoints
* action handlers
* event consumers
* admin tools

### Какие события нужны

* `product.created`
* `product.updated`
* `cart.updated`
* `checkout.started`
* `order.created`
* `order.paid`
* `order.status_changed`
* `shipment.created`
* `shipment.updated`
* `discount.created`
* `customer.message_received` — позже
* `customer.reply_generated` — позже

---

## 10. Backend-архитектура

## 10.1 Рекомендуемая структура

### Frontend

* Next.js App Router
* Server Components для каталога и SEO-страниц
* Client Components для корзины, фильтров, интерактива

### Backend внутри Next.js

* Route Handlers для API
* Server Actions для мутаций форм там, где это удобно
* Prisma для работы с БД
* Stripe webhook endpoint
* Internal admin API
* Event service

Route Handlers в App Router позволяют держать API рядом с приложением, а Server Actions подходят для серверных мутаций форм и админских действий. ([Next.js][1])

## 10.2 Почему не отдельный backend сейчас

Для MVP отдельный backend не нужен.
Он даст больше сложности, чем пользы.

**Правильное решение сейчас:**
**modular monolith на Next.js**.

То есть:

* один репозиторий
* одна кодовая база
* четко разделенные модули:

  * catalog
  * cart
  * checkout
  * orders
  * shipping
  * discounts
  * admin
  * events
  * integrations

### Когда выносить backend отдельно

Только когда появится:

* много внутренних сервисов
* отдельная команда backend
* высокая нагрузка
* несколько каналов продаж
* OMS / CRM / bot-layer / warehouse integration в объеме выше MVP

---

## 11. Предлагаемая структура проекта

```txt
src/
  app/
    (public)/
      page.tsx
      shop/
      product/[slug]/
      cart/
      checkout/
      success/
      faq/
    admin/
      products/
      orders/
      analytics/
      settings/
    api/
      checkout/
      webhooks/
      internal/
  components/
    ui/
    shop/
    layout/
    admin/
  features/
    catalog/
    cart/
    checkout/
    orders/
    shipping/
    discounts/
    customers/
    events/
    analytics/
  lib/
    db/
    stripe/
    auth/
    email/
    validation/
    utils/
  server/
    services/
    repositories/
    events/
    workflows/
  prisma/
    schema.prisma
```

---

## 12. API-слой

## 12.1 Публичные endpoints

* `GET /api/products`
* `GET /api/products/:slug`
* `POST /api/cart`
* `PATCH /api/cart`
* `POST /api/checkout/session`
* `POST /api/discount/validate`
* `POST /api/webhooks/stripe`

## 12.2 Внутренние endpoints для админки и агентов

* `GET /api/internal/orders`
* `GET /api/internal/orders/:id`
* `PATCH /api/internal/orders/:id/status`
* `GET /api/internal/products`
* `POST /api/internal/products`
* `PATCH /api/internal/products/:id`
* `GET /api/internal/events`
* `POST /api/internal/notes`

### Требование

Все internal endpoints:

* только server-side
* только по auth
* с RBAC
* с audit log

---

## 13. Дизайн-требования

## 13.1 Общий стиль

Нужен **современный premium-cute visual style**, не детский, а именно:

* clean
* glossy
* soft luxury
* girly but tasteful
* mobile-first
* high-conversion

### Визуальные признаки

* светлый фон
* мягкие тени
* rounded cards
* крупные фото
* нежные акцентные цвета
* хороший whitespace
* микроанимации
* сильные CTA-кнопки
* акцент на “surprise / gift / cute / limited”

## 13.2 UX-принципы

* мобильная версия приоритетна
* быстрый путь к покупке
* минимум шагов до checkout
* доверие через микро-копирайтинг
* понятная доставка и возвраты
* отсутствие перегруза текстом

Tailwind хорошо подходит под responsive utility-based UI, а responsive variants позволяют быстро собирать mobile-first адаптивный интерфейс. ([Tailwind CSS][3])

## 13.3 Компоненты

* hero section
* product grid
* product card
* product gallery
* sticky add-to-cart
* cart drawer
* trust badges
* FAQ accordion
* reviews block
* countdown / limited stock badge
* promo banner
* admin data cards

---

## 14. Контентные блоки на сайте

### Главная

* Hero
* Top boxes
* Why choose us
* What’s inside
* Best sellers
* Limited edition
* Reviews / social proof
* FAQ
* CTA

### Карточка товара

* изображения
* цена
* краткое promise value
* CTA
* состав/пример наполнения
* shipping info
* FAQ
* cross-sell

### Footer

* delivery
* returns
* legal
* privacy
* contact
* social links

---

## 15. SEO и контент

Для MVP:

* человекочитаемые slug
* meta title / description
* Open Graph
* sitemap
* robots.txt
* schema.org Product markup позже, но желательно
* indexable category/product pages
* быстрый рендер

Next.js App Router поддерживает layouts, metadata, image/font optimization и удобен для SEO-oriented storefront. ([Next.js][4])

---

## 16. Аналитика

Обязательно:

* page view
* product view
* add to cart
* begin checkout
* purchase
* promo code used
* shipping selected

Интеграции:

* GA4
* Meta Pixel
* TikTok Pixel

### События, которые должны трекаться

* `view_home`
* `view_collection`
* `view_product`
* `add_to_cart`
* `remove_from_cart`
* `begin_checkout`
* `payment_success`
* `payment_failed`
* `order_completed`

---

## 17. Безопасность

Нужно:

* server-side validation
* zod schemas
* rate limiting на чувствительных endpoint
* webhook signature verification
* admin auth
* role-based access
* защита env variables
* CSRF-safe patterns там, где нужно
* не доверять client-side price calculation

Stripe рекомендует обрабатывать платежные события через webhook endpoint и верифицировать входящие события. ([Документация Stripe][5])

---

## 18. Производительность

Требования:

* хорошая mobile performance
* оптимизация изображений
* lazy loading где нужно
* CDN delivery
* минимальный JS на storefront
* server rendering там, где это выгодно

Важно: если использовать GET Route Handlers или data fetching, поведение кэширования в Next.js нужно контролировать явно, а не полагаться на неявные дефолты. ([Next.js][6])

---

## 19. Локализация и юр. требования

### Язык MVP

* основной язык сайта: **французский**
* админка можно оставить на английском

### Нужно подготовить

* CGV / Terms
* Privacy Policy
* Returns / Refund Policy
* Shipping Policy
* Cookies banner, если подключаются маркетинговые пиксели

---

## 20. Роли пользователей

### Public user

* смотрит товары
* покупает
* получает письма

### Admin

* управляет товарами
* управляет заказами
* смотрит аналитику
* меняет контент

### Agent / Bot

* читает события
* читает сущности по правам
* создает внутренние заметки/документы
* предлагает тексты клиентских ответов
* не имеет прямого unrestricted DB access

---

## 21. Acceptance criteria MVP

MVP считается готовым, если:

1. Можно создать и опубликовать товар
2. Пользователь может открыть карточку товара
3. Может добавить товар в корзину
4. Может перейти к оплате
5. Stripe Checkout работает
6. После успешной оплаты заказ создается/обновляется корректно
7. Заказ виден в админке
8. Админ может менять статус заказа
9. Email-подтверждение отправляется
10. На сайте есть базовые legal pages
11. Настроена базовая аналитика
12. Есть event log для будущих автоматизаций и агентов

---

## 22. Рекомендуемый roadmap

## Этап 1 — MVP launch

* storefront
* каталог
* product pages
* cart
* stripe checkout
* manual shipping setup
* admin products/orders
* email notifications
* analytics
* event log

## Этап 2 — operations

* promo codes
* inventory improvements
* shipment tracking
* customer notes
* FAQ CMS
* review block
* limited editions

## Этап 3 — agent layer

* internal action endpoints
* AI-generated customer replies
* auto-order summaries
* auto-documentation
* AI ops assistant
* agent dashboard

## Этап 4 — scale

* real shipping integrations
* CRM sync
* warehouse logic
* customer accounts
* personalization
* recommendation engine

---

## 23. Главное архитектурное решение

Моя рекомендация:

### Делать так

* **Next.js monolith**
* **PostgreSQL + Prisma**
* **Stripe Checkout**
* **manual shipping rates на MVP**
* **internal event layer для агентов**
* **admin panel inside same app**
* **FR-first storefront**

### Не делать сейчас

* отдельный backend
* microservices
* headless CMS как core
* сложный OMS
* кастомный payment flow вместо Stripe Checkout
* тяжелую агентную orchestration внутри storefront

---

## 24. Итоговый технический вердикт

Для твоей задачи лучший вариант сейчас — это:

**современный storefront на Next.js + TypeScript + Tailwind, с Stripe-оплатой, простой логикой доставки, встроенной админкой и внутренним event/API-слоем, чтобы потом поверх него подключать агентов и ботов без переделки базы проекта.**

Это даст:

* быстрый запуск продаж
* понятную поддержку заказов
* нормальную SEO-основу
* минимальную сложность
* хороший фундамент под AI-операции потом

Дальше логичный следующий шаг: я могу сразу превратить это в **структурированное ТЗ для команды разработки** в формате:

1. **бизнес-ТЗ**,
2. **техническая архитектура**,
3. **список страниц и компонентов**,
4. **schema БД и API contract**.

[1]: https://nextjs.org/docs/app/getting-started/route-handlers?utm_source=chatgpt.com "Getting Started: Route Handlers"
[2]: https://docs.stripe.com/api/checkout/sessions?utm_source=chatgpt.com "Checkout Sessions | Stripe API Reference"
[3]: https://tailwindcss.com/docs/responsive-design?utm_source=chatgpt.com "Responsive design - Core concepts"
[4]: https://nextjs.org/docs/app/getting-started?utm_source=chatgpt.com "App Router: Getting Started"
[5]: https://docs.stripe.com/webhooks?utm_source=chatgpt.com "Receive Stripe events in your webhook endpoint"
[6]: https://nextjs.org/blog/next-15?utm_source=chatgpt.com "Next.js 15"
