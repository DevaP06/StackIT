# StackIT Frontend-Backend Integration Setup

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Environment Setup

### Backend Environment Variables
Create a `.env` file in the `server` directory with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/stackit
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

### Frontend Environment Variables
Create a `.env.local` file in the `frontend/StackIT_frontend` directory with:

```env
VITE_API_BASE_URL_LOCAL=http://localhost:5000
VITE_API_BASE_URL_DEPLOY=https://your-production-api.com
```

## Installation & Running

### 1. Install Backend Dependencies
```bash
cd server
npm install
```

### 2. Install Frontend Dependencies
```bash
cd frontend/StackIT_frontend
npm install
```

### 3. Start MongoDB
Make sure MongoDB is running on your system or use MongoDB Atlas.

### 4. Start the Backend Server
```bash
cd server
npm start
```
The server will start on http://localhost:5000

### 5. Start the Frontend Development Server
```bash
cd frontend/StackIT_frontend
npm run dev
```
The frontend will start on http://localhost:5173

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Questions
- `GET /api/questions` - Get all questions (with filtering and search)
- `GET /api/questions/:id` - Get single question
- `POST /api/questions` - Create new question (protected)
- `PUT /api/questions/:id` - Update question (protected)
- `DELETE /api/questions/:id` - Delete question (protected)
- `POST /api/questions/:id/vote` - Vote on question (protected)

### Answers
- `GET /api/questions/:questionId/answers` - Get answers for a question (protected)
- `POST /api/questions/:questionId/answers` - Create answer (protected)
- `PUT /api/answers/:id` - Update answer (protected)
- `DELETE /api/answers/:id` - Delete answer (protected)
- `POST /api/answers/:id/vote` - Vote on answer (protected)
- `POST /api/answers/:id/accept` - Accept answer (protected)

### Messages (Admin)
- `GET /api/messages` - Get all messages (protected)
- `GET /api/messages/:id` - Get single message (protected)
- `POST /api/messages/send` - Send message (admin only)

## Features Implemented

### Frontend
- ✅ Authentication (Login/Register)
- ✅ Question listing with filtering and search
- ✅ Question creation
- ✅ User authentication context
- ✅ Protected routes
- ✅ Toast notifications
- ✅ Responsive design

### Backend
- ✅ User authentication with JWT
- ✅ Question CRUD operations
- ✅ Answer CRUD operations
- ✅ Voting system
- ✅ Search functionality
- ✅ Pagination
- ✅ Authorization middleware
- ✅ MongoDB integration

## Next Steps
1. Test the authentication flow
2. Create and view questions
3. Add answers to questions
4. Test voting functionality
5. Implement answer acceptance
6. Add more features like user profiles, tags, etc.

## Troubleshooting

### Common Issues
1. **CORS errors**: Make sure the backend CORS is properly configured
2. **MongoDB connection**: Ensure MongoDB is running and the connection string is correct
3. **JWT errors**: Check that the JWT_SECRET is set in the environment
4. **Port conflicts**: Make sure ports 5000 and 5173 are available

### Development Tips
- Use browser dev tools to check network requests
- Check the backend console for server logs
- Use MongoDB Compass to view database data
- Test API endpoints with Postman or similar tools 