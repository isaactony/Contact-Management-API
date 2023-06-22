const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv').config();
const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require("./middleware/errorHandler");
const connectDB = require('./config/dbConnnection');

connectDB()
//middleware
app.use(express.json());
app.use('/api/contacts', contactRoutes);
app.use('/api/users', userRoutes);
app.use(errorHandler);

//server listening
app.listen(PORT, () =>{`Server is listening on port ${PORT}`});