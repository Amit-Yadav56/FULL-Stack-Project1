const { default: mongoose } = require("mongoose");
//make structure of the database
const albumSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
},
  // mongodb automatically provides timestamps
  { timestamps: true }
)
//collection name is user
module.exports = mongoose.model("album", albumSchema)