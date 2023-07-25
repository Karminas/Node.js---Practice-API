const mongoose = require ('mongoose');

const connectDb = async () => {
    try {
        const dbConnection = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log('DB connected: ', dbConnection.connection.host, dbConnection.connection.name);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDb;