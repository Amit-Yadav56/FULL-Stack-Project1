const { default: mongoose } = require("mongoose");
//make structure of the database
const songSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  songUrl: {
    type: String,
    required: true
  },
  album: {
    type: String,
  },
  artist: {
    type: String,
  },
  language: {
    type: String,
  },
  category: {
    type: String,
  },

},
  // mongodb automatically provides timestamps
  { timestamps: true }
)
//collection name is user
module.exports = mongoose.model("song", songSchema)