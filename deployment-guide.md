# StackIT Global Deployment Guide

## Prerequisites
- GitHub account
- MongoDB Atlas account (free)
- Railway/Render account (for backend)
- Vercel/Netlify account (for frontend)

## Step 1: MongoDB Atlas Setup

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (M0 Free tier)
4. Choose a cloud provider and region

### 2. Configure Database
1. Create a database user with username and password
2. Add your IP address to the IP whitelist (or use 0.0.0.0/0 for all IPs)
3. Get your connection string

### 3. Get Connection String
Your connection string will look like:
```
mongodb+srv://username:password@cluster.mongodb.net/stackit?retryWrites=true&w=majority
```

## Step 2: Backend Deployment (Railway)

### 1. Prepare Backend
1. Create a `Procfile` in the server directory:
```
web: node server.js
```

2. Update package.json scripts:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### 2. Deploy to Railway
1. Go to [Railway](https://railway.app/)
2. Connect your GitHub account
3. Create new project from GitHub repo
4. Select the server directory
5. Add environment variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A strong secret key
   - `NODE_ENV`: production
   - `PORT`: Railway will set this automatically

### 3. Get Backend URL
Railway will provide a URL like: `https://your-app-name.railway.app`

## Step 3: Frontend Deployment (Vercel)

### 1. Prepare Frontend
1. Update environment variables in frontend:
   - Create `.env.production` file:
```
VITE_API_BASE_URL_DEPLOY=https://your-backend-url.railway.app
```

### 2. Deploy to Vercel
1. Go to [Vercel](https://vercel.com/)
2. Connect your GitHub account
3. Import your repository
4. Configure build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Add environment variables:
   - `VITE_API_BASE_URL_DEPLOY`: Your Railway backend URL

### 3. Get Frontend URL
Vercel will provide a URL like: `https://your-app-name.vercel.app`

## Step 4: Update CORS Settings

### Backend CORS Update
Update your server.js to allow your frontend domain:

```javascript
app.use(cors({
  origin: ['https://your-frontend-url.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

## Step 5: Test Deployment

1. Test backend endpoints using Postman or curl
2. Test frontend functionality
3. Verify database connections
4. Test authentication flow

## Environment Variables Summary

### Backend (.env)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/stackit?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=production
```

### Frontend (.env.production)
```
VITE_API_BASE_URL_DEPLOY=https://your-backend-url.railway.app
```

## Alternative Deployment Options

### Backend Alternatives:
- **Render**: Similar to Railway, good free tier
- **Heroku**: Paid service, but very reliable
- **DigitalOcean App Platform**: Good performance

### Frontend Alternatives:
- **Netlify**: Great for static sites, good free tier
- **GitHub Pages**: Free but limited
- **Firebase Hosting**: Google's hosting service

## Troubleshooting

### Common Issues:
1. **CORS errors**: Make sure frontend URL is in backend CORS settings
2. **Database connection**: Verify MongoDB Atlas connection string
3. **Environment variables**: Double-check all variables are set correctly
4. **Build errors**: Check package.json scripts and dependencies

### Debugging:
1. Check deployment logs in your hosting platform
2. Use browser dev tools to check network requests
3. Verify API endpoints are accessible
4. Test database connectivity

## Security Considerations

1. **JWT Secret**: Use a strong, random secret key
2. **MongoDB**: Use strong passwords and restrict IP access
3. **Environment Variables**: Never commit secrets to Git
4. **CORS**: Only allow necessary domains
5. **HTTPS**: Ensure all connections use HTTPS in production

## Monitoring

1. Set up logging for your backend
2. Monitor database performance
3. Set up error tracking (Sentry, etc.)
4. Monitor API response times 