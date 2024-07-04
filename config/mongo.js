const mongoose = require('mongoose');
require("dotenv/config");

let conn;
const dbUrl = process.env.DB_KEY;

const connection = () => {
    if(conn){
        return conn;
        
    }


    conn = mongoose.connect(dbUrl).then(() => console.log("MongoDB conectado")).catch((error) => console.log("Erro ao conectar", error));
}


module.exports = connection;