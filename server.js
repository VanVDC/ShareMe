import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app = express();

//connect database
connectDB();

//init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

//define routes
app.use('/api/users', userRoutes);
// app.use('/api/auth', auth);
// app.use('/api/profile', profile);
// app.use('/api/posts', posts);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
