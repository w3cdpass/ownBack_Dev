const mongoose = require('mongoose');

/**
 * 
 * @param {*} dbUrl 
 * @returns to connect the dataBase 
 */
async function DatabaseConnection(dbUrl) {
    return await mongoose.connect(dbUrl)
        .then(() => console.log("Database Connected",))
        .catch(() => console.log("Error to while connecting to Database",))
}

module.exports = { DatabaseConnection };