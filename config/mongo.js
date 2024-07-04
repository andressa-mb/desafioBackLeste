const mongoose = require('mongoose');
require("dotenv/config");

let conn;
const dbUrl = process.env.DB_KEY;

const connection = () => {
    if(conn){
        return conn;
    }

    conn = mongoose.connect(dbUrl);
    console.log("MongoDB on");
}


module.exports = connection;