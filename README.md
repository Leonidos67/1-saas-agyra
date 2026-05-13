# MNOONX - Alpha Space

Социальная платформа для крипто-комьюнити, предпринимателей и Web3 энтузиастов. Аналог Twitter/X с функциями постов, подписок, лайков, репостов и прямых сообщений.

## 🚀 Технологии

### Frontend
- **React 18** с TypeScript
- **React Router v6** для навигации
- **Tailwind CSS** для стилей (neutral color palette)
- **Lucide React** для иконок
- **Context API** для управления авторизацией

### Backend
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose ODM**
- **JWT** для аутентификации
- **bcryptjs** для хеширования паролей

## 📦 Установка и запуск

### Требования
- Node.js 16+
- MongoDB (локально или Atlas)

### Установка

```bash
# Клонируем репозиторий
git clone <repo-url>
cd alpha-space

# Устанавливаем зависимости фронтенда
cd client
npm install

# Устанавливаем зависимости бэкенда
cd ../server
npm install