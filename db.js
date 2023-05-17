
const mongoose = require("mongoose");

const MONGO_URL = 'mongodb+srv://khushahal:123456789%40Aa@cluster0.uh5aegt.mongodb.net/Backend_Users';
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
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

