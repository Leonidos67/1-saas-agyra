
## AGENTS.md

```markdown
# MNOONX Alpha Space - Документация для AI агентов

## 📌 Краткое описание

MNOONX — это социальная платформа (Twitter/X клон) для Web3 комьюнити. Пользователи создают посты, подписываются друг на друга, лайкают и репостят контент. Есть система сообщений и настройки профиля.

## 🏗️ Архитектура

- **Фронтенд**: React 18 + TypeScript + Tailwind CSS
- **Бэкенд**: Node.js + Express + MongoDB (Mongoose)
- **Аутентификация**: JWT (jsonwebtoken + bcryptjs)
- **Стиль кода**: Компоненты с `React.FC<>`, хуки, useCallback, useRef

## 📂 Ключевые файлы

### Фронтенд (client/src)

| Файл | Назначение |
|------|-----------|
| `App.tsx` | Роутинг, модалки логина/регистрации |
| `context/AuthContext.tsx` | Авторизация, хранение user/token |
| `pages/UserProfile.tsx` | Профиль, посты, лайки, follow, меню поста |
| `pages/Settings.tsx` | Настройки профиля с сайдбаром |
| `pages/Messenger.tsx` | Чат с поддержкой |
| `components/Layout/Sidebar.tsx` | Боковая панель навигации |

### Бэкенд (server)

| Файл | Назначение |
|------|-----------|
| `index.js` | Точка входа, CORS, маршруты |
| `routes/auth.js` | Регистрация, логин, JWT |
| `routes/users.js` | Профили, подписки, фолловеры |
| `routes/posts.js` | CRUD постов, лайки, репосты |
| `models/User.js` | Схема пользователя |
| `models/Post.js` | Схема поста |
| `models/Follow.js` | Схема подписок |
| `middleware/auth.js` | JWT проверка |

## 🔑 Важные детали реализации

### 1. Follow System
- **ID хранятся как строки** в модели Follow (не ObjectId)
- При подписке обновляются счетчики `followersCount` и `followingCount` в User
- Поиск подписок: `Follow.findOne({ follower: userId.toString(), following: profileId.toString() })`
- В GET /:username используется `auth` middleware для проверки `isFollowing`

### 2. Посты
- `post.author` - строка (ID пользователя)
- При получении постов автор заполняется вручную через `User.findById()`, а не `.populate()`
- `isLiked` и `isReposted` вычисляются на сервере проверкой `req.userId` в массивах `likes`/`reposts`
- Фронтенд использует `Set<string>` для отслеживания лайкнутых/репостнутых постов

### 3. Лайки
- `POST /api/posts/:id/like` - тоггл (добавить/удалить)
- Метод `post.toggleLike(userId)` обновляет массив и счетчик
- Фронтенд обновляет `likedPosts` (Set) и `posts` (состояние)

### 4. Роутинг
- `/` - Home
- `/discover` - Discover
- `/@:username` - Профиль пользователя
- `/post/:id` - Отдельный пост
- `/settings` - Настройки
- `/messenger` - Сообщения

### 5. Меню поста (троеточие)
- Появляется при наведении на пост (`group-hover/article:opacity-100`)
- У своих постов: Copy link + Edit + Delete
- У чужих: только Copy link
- `isPostOwner()` сравнивает `user.username === post.author.username`

## 🐛 Типичные проблемы и решения

1. **`author` пустой после обновления** → использовать ручное заполнение вместо populate
2. **Лайки сбрасываются** → загружать `isLiked`/`isReposted` с сервера в `fetchProfile`
3. **Follow не определяется** → добавить `auth` middleware в GET /:username
4. **Двойной `res.json()`** → удалить дублирующийся вызов
5. **`Link` конфликт** → переименовать `Link as RouterLink` из react-router-dom и `Link as LinkIcon` из lucide

## 🛠️ Команды для разработки

```bash
# Бэкенд
cd server && npm run dev    # Запуск с nodemon

# Фронтенд
cd client && npm start      # Запуск React

# MongoDB
# Проверить подписки:
db.follows.find().pretty()
# Посты пользователя:
db.posts.find({ author: "user_id" }).pretty()