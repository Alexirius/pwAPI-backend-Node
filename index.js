require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const models = require('./models/models.js');
const router = require('./routes');
const errorHandler = require('./middleware/ErrorHandlerMW')

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors({allowedHeaders: ['Content-Type', 'Authorization']}));
app.use(express.json());
app.use('/', router);

app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {console.log(`Server started on port ${PORT}`);});
    } catch (error) {
        console.log(error);
        errorHandler();
    }
}

start();