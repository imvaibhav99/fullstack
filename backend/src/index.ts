// import express from 'express';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import authRoutes from './routes/auth';
// import noteRoutes from './routes/notes';
// import cors from 'cors';

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// mongoose.connect(process.env.MONGO_URI as string)
//   .then(() => console.log('DB connected'))
//   .catch(err => console.log('DB error:', err));

// app.use('/api/auth', authRoutes);
// app.use('/api/notes', noteRoutes);
// const PORT=5001

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import noteRoutes from './routes/notes';
import cors from 'cors';
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('DB connected'))
  .catch(err => console.log('DB error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// Serve frontend build
const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, 'frontend/dist')));

// Any unknown route should return frontend's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname1, 'frontend/dist', 'index.html'));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
