import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import * as response from './helpers/response.helper.js';

import connectDb from './config/db.js';
import adminRouter from './routers/admin.router.js';
import userRouter from './routers/user.router.js';
import uploadRouter from './routers/upload.router.js';
import publicRouter from './routers/public.router.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDb();

// Initialize app
const app = express();
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Routes
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter); // includes login, sendOTP, verifyOTP, etc.
app.use('/api/user/upload', uploadRouter);
app.use('/uploads', express.static('uploads'));
app.use('/api/public', publicRouter);

// JSON error handler
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return response.error(res, { message: 'Invalid JSON data!' });
  }
  next();
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`✅ Server started on port ${port}`);
});
