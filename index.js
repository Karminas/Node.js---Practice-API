const express = require ('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const dotenv = require ('dotenv').config();

const app = express();
const PORT = process.env.PORT;

connectDb();
app.use(express.json());
app.use('/api/v1/', require('./routers/contactsRouter'));
app.use('/api/v1/', require('./routers/userRouter'));
app.use(errorHandler);

app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${PORT}`);
});