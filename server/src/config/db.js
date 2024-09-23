const mongoose = require('mongoose');
const Url = process.env.MONGODB_URL;

mongoose.connect(Url, {
    useNewUrlParser :true,
    useUnifiedTopology:true,
    dbName:"E-Cart"

});

const db = mongoose.connection;

db.on("error", (error)=>{
    console.error   ( "Mongo Connection error:",error)}
);
db.once("open", () => {
    console.log("Connected to MongoDB")}
);

module.exports = db;