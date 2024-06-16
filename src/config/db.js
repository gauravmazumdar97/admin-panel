require('dotenv').config()
const mongoose = require('mongoose');


const connectDB = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const conn = await mongoose.connect(process.env.DB_URL);
            resolve(conn);
        } catch (error) {
            reject(error);
            process.exit();
        }
    });
};


module.exports = connectDB