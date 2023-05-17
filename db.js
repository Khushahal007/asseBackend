require('dotenv').config();
const mongoose = require("mongoose");


mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo db connect successful");
    })
    .catch((err) => {
        console.log("Mongo db connection failed", err);
    });

const db = mongoose.connection;

db.on("error", (err) => {
    console.log("Mongo db connection failed", err);
});

module.exports = mongoose;

