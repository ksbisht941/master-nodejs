const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path: './config.env'});
const app = require("./app");

mongoose.connect(process.dotenv.DATABASE, {
    useNewUrlParser: true,
})
.then(() => console.log("DB connection successfully!"));

app.listen(process.dotenv.PORT, () => {
    console.log(`App running on port ${port}...`);
});