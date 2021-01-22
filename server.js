import express from 'express';
import connectDB from './config/db.js';
import users from './routes/api/users.js';

const app = express();

//connect database
connectDB();

//init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

//define routes
app.use('/api/users', users);
// app.use('/api/auth', auth);
// app.use('/api/profile', profile);
// app.use('/api/posts', posts);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
