const router = require("express").Router()

const song = require("../models/song")

//to add a new song
router.post("/saveNew/", async (req, res) => {
  const newSong = song(
    {
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      songUrl: req.body.songUrl,
      album: req.body.album,
      artist: req.body.artist,
      language: req.body.language,
      category: req.body.category,
    }
  );

  try {
    //save is a method comming from mongoose provided by specific model i.e(song)
    const saveSong = await newSong.save();
    return res.status(200).send({ sucess: true, song: saveSong })
  }
  catch (error) {
    return res.status(400).send({ sucess: false, msg: error })
  }
});


//write a get request to get single song information
//: is used to give parameter like id to route
router.get("/getOne/:id/", async (req, res) => {

  const filter = { _id: req.params.id }

  const data = await song.findOne(filter)
  if (data) {
    return res.status(200).send({ sucess: true, song: data })
  } else {
    return res.status(400).send({ sucess: false, msg: "song not found" })
  }
})

//get all the song info
router.get('/getAll', async (req, res) => {

  const data = await song.find().sort({ createdAt: 1 })
  if (data) {
    return res.status(200).send({ sucess: true, data: data })
  } else {
    return res.status(400).send({ sucess: false, msg: "song not found" })
  }
})

//updating the song data 
router.put("/update/:id", async (req, res) => {
  const filter = { _id: req.params.id }
  const options = {
    // upsert creates data if it not exists
    upsert: true,
    new: true
  }
  try {
    const result = await song.findOneAndUpdate(filter, {
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      songUrl: req.body.songUrl,
      album: req.body.album,
      artist: req.body.artist,
      language: req.body.language,
      category: req.body.category,
    },
      options)

    return res.status(200).send({ sucess: true, msg: "song updated sucessfully", data: result })

  }
  catch (error) {
    return res.status(400).send({ sucess: false, msg: "song not found" })

  }
})


//deleting the song in delete route
router.delete("/deleteSong/:id", async (req, res) => {
  const filter = { _id: req.params.id }
  const result = await song.deleteOne(filter)

  if (result) {
    return res.status(200).send({ sucess: true, msg: "Data Deleted", data: result })
  } else {
    return res.status(400).send({ sucess: false, msg: "Data Not Found" })
  }
})

module.exports = router