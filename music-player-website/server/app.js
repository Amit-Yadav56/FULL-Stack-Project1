const express = require('express');
const mongoose = require('mongoose')
require("dotenv/config")
const app = express();
// cross origin resource sharing
const cors = require('cors');

app.use(cors({ origin: true }));
app.use(express.json())


app.get('/', (req, res) => {
    return res.json("Hey there");
})

//user authentication route
const userRoute = require('./routes/auth.js')
//if anything comes to this route navigate to // userroute
app.use("/api/users/", userRoute);

//Artist Routes
const artistRoute = require('./routes/artist.js')
app.use("/api/artists/", artistRoute);

//Album Routes
const albumRoute = require('./routes/album.js')
app.use("/api/albums/", albumRoute);

//Songs Routes
const songRoute = require('./routes/songs.js')
app.use("/api/songs/", songRoute);

mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true })
mongoose.connection.once("open", () => {
    console.log("Connected")
}).on("error", (error) => {
    console.log(`Error: ${error}`)
})


app.listen(4000, () => {
    console.log("listening to port 4000")
})
