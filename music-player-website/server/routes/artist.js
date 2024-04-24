
const router = require("express").Router()
// The arist schema database model
const artist = require("../models/artist")

//to add a new artist
router.post("/saveNew/", async (req, res) => {
  const newArtist = artist(
    {
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      twitter: req.body.twitter,
      instagram: req.body.instagram

    }
  );

  try {
    //save is a method comming from mongoose provided by specific model i.e(artist)
    const saveArtist = await newArtist.save();
    return res.status(200).send({ sucess: true, artist: saveArtist })
  }
  catch (error) {
    return res.status(400).send({ sucess: false, msg: error })
  }
});

//write a get request to get single artist information
//: is used to give parameter like id to route
router.get("/getOne/:id/", async (req, res) => {

  const filter = { _id: req.params.id }

  const data = await artist.findOne(filter)
  if (data) {
    return res.status(200).send({ sucess: true, artist: data })
  } else {
    return res.status(400).send({ sucess: false, msg: "Artist not found" })
  }
})

//get all the artist info
router.get('/getAll', async (req, res) => {

  const data = await artist.find().sort({ createdAt: 1 })
  if (data) {
    return res.status(200).send({ sucess: true, artist: data })
  } else {
    return res.status(400).send({ sucess: false, msg: "Artist not found" })
  }
})

//updating the artist data 
router.put("/update/:id", async (req, res) => {
  const filter = { _id: req.params.id }
  const options = {
    // upsert creates data if it not exists
    upsert: true,
    new: true
  }
  try {
    const result = await artist.findOneAndUpdate(filter, {
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      twitter: req.body.twitter,
      instagram: req.body.instagram
    },
      options)

    return res.status(200).send({ sucess: true, msg: "data updated sucessfully", data: result })

  }
  catch (error) {
    return res.status(400).send({ sucess: false, msg: "data not found" })

  }
})


//deleting the artist in delete route
router.delete("/delete/:id", async (req, res) => {
  const filter = { _id: req.params.id }
  const result = await artist.deleteOne(filter)

  if (result) {
    return res.status(200).send({ sucess: true, msg: "data deleted sucessfully", data: result })
  } else {
    return res.status(400).send({ sucess: false, msg: "data not found" })
  }
})

module.exports = router