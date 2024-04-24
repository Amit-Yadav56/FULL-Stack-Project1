const router = require("express").Router()
const album = require("../models/albums")

//to add a new album
router.post("/saveNew/", async (req, res) => {
  const newAlbum = album(
    {
      name: req.body.name,
      imageUrl: req.body.imageUrl,
    }
  );

  try {
    //save is a method comming from mongoose provided by specific model i.e(album)
    const saveAlbum = await newAlbum.save();
    return res.status(200).send({ sucess: true, album: saveAlbum })
  }
  catch (error) {
    return res.status(400).send({ sucess: false, msg: error })
  }
});


//write a get request to get single album information
//: is used to give parameter like id to route
router.get("/getOne/:id/", async (req, res) => {

  const filter = { _id: req.params.id }

  const data = await album.findOne(filter)
  if (data) {
    return res.status(200).send({ sucess: true, album: data })
  } else {
    return res.status(400).send({ sucess: false, msg: "Album not found" })
  }
})

//get all the album info
router.get('/getAll', async (req, res) => {

  const data = await album.find().sort({ createdAt: 1 })
  if (data) {
    return res.status(200).send({ sucess: true, album: data })
  } else {
    return res.status(400).send({ sucess: false, msg: "Album not found" })
  }
})

//updating the album data 
router.put("/update/:id", async (req, res) => {
  const filter = { _id: req.params.id }
  const options = {
    // upsert creates data if it not exists
    upsert: true,
    new: true
  }
  try {
    const result = await album.findOneAndUpdate(filter, {
      name: req.body.name,
      imageUrl: req.body.imageUrl,
    },
      options)

    return res.status(200).send({ sucess: true, msg: "Album updated sucessfully", data: result })

  }
  catch (error) {
    return res.status(400).send({ sucess: false, msg: "Album not found" })

  }
})


//deleting the album in delete route
router.delete("/delete/:id", async (req, res) => {
  const filter = { _id: req.params.id }
  const result = await album.deleteOne(filter)

  if (result) {
    return res.status(200).send({ sucess: true, msg: "Album deleted sucessfully", data: result })
  } else {
    return res.status(400).send({ sucess: false, msg: "Album not found" })
  }
})


module.exports = router