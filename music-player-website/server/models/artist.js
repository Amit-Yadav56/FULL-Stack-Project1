const { default: mongoose } = require("mongoose");
//make structure of the database
const artistSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  twitter: {
    type: String,
    required: true
  },
  instagram: {
    type: String,
    required: true
  },

},
  // mongodb automatically provides timestamps
  { timestamps: true }
)
//collection name is user
module.exports = mongoose.model("artist", artistSchema)