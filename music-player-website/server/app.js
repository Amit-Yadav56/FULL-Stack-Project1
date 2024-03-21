const express = require('express');
const mongoose = require('mongoose')
require("dotenv/config")
const app = express();
// cross origin resource sharing
const cors = require('cors');

app.use(cors());
app.get('/', (req, res) => {
    return res.json("Hey there");
})


mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true })
mongoose.connection.once("open", () => {
    console.log("Connected")
}).on("error", (error) => {
    console.log(`Error: ${error}`)
})


app.listen(4000, () => {
    console.log("listening to port 4000")
})
