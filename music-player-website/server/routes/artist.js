
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

module.exports = router