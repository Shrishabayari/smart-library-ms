require('dotenv').config();
const express = require('express');
const RunServer = require('./database/connection');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const authorRoutes = require('./routes/authorRoutes');
const bookRoutes = require('./routes/bookRoutes');
const issueBookRoutes = require('./routes/issueBookRoutes');
const cors = require('cors'); //used to connect frontnd and backnd
const helmet = require('helmet'); //used for security
const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

const port = 3000;

RunServer();
//data in json format
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1', contactRoutes);
app.use('/api/v1/authors', authorRoutes);
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/issueBook', issueBookRoutes);

app.listen(port, () => {
  console.log(`server is run on ${port}`);
});
