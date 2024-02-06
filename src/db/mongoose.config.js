const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_CONNECTION_LOCAL);
        console.log("Database Connected");
    } catch (err) {
        console.error("Database Connection Error:", err);
    }
};

module.exports = dbConnection;
