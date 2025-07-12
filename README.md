# StackIT 💬

StackIT is a full-stack Q&A web platform inspired by Stack Overflow. It allows users to ask and answer programming questions, upvote/downvote, and receive admin announcements.

## 🗂️ Project Structure

```
stackIT/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── messageController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Message.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── messageRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   └── StackIT_frontend/
│       ├── src/
│       │   ├── assets/
│       │   ├── components/
│       │   │   ├── Navbar.tsx
│       │   │   ├── ScrollTracker.tsx
│       │   │   └── ...
│       │   ├── pages/
│       │   │   ├── HomePage.tsx
│       │   │   ├── AskQuestion.tsx
│       │   │   ├── QuestionView.tsx
│       │   │   └── NotFound.tsx
│       │   ├── App.tsx
│       │   ├── main.tsx
│       │   └── api/
│       │       └── axios.ts
│       ├── public/
│       ├── tailwind.config.js
│       ├── postcss.config.js
│       ├── package.json
│       └── vite.config.ts
│
├── .gitignore
└── README.md
```

## 🚀 Features

- 🔐 User Authentication with JWT
- 🙋‍♂️ Ask and answer questions
- 🔔 Admin announcements
- 📥 Voting system (upvotes/downvotes)
- 🌐 Fully responsive frontend built with React + Vite + TailwindCSS
- 🛠️ Backend powered by Express + MongoDB

## 🔧 Setup Instructions

### Backend

1. Navigate to backend:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file:
   ```
   MONGO_URI=<your-mongodb-connection-uri>
   JWT_SECRET=<your-jwt-secret>
   PORT=5000
   ```
4. Run the server:
   ```bash
   node server.js
   ```

### Frontend

1. Navigate to frontend:
   ```bash
   cd frontend/StackIT_frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_PUBLIC_POSTHOG_KEY=your_posthog_key
   VITE_PUBLIC_POSTHOG_HOST=https://app.posthog.com
   ```
4. Run the frontend:
   ```bash
   npm run dev
   ```

## 🧪 API Routes

### `/api/auth`
- `POST /register`
- `POST /login`

### `/api/messages`
- `GET /` — Get all messages
- `POST /send` — Admin sends message


## 🙌 Contributing

Feel free to fork and submit PRs. Suggestions and improvements are always welcome!

## 📄 License

This project is open-source and available under the MIT License.
