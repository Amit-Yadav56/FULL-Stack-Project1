const { default: mongoose } = require("mongoose");


const likedSongSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    songUrl: {
        type: String,
        required: true
    },
    album: String,
    artist: String,
    language: String,
    category: String,
    _id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
});
//make structure of the database
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    email_verified: {
        type: Boolean,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    auth_time: {
        type: String,
        required: true
    },
    liked_songs: [likedSongSchema]


},
    // mongodb automatically provides timestamps
    { timestamps: true }
)
// // Export the schemas

module.exports = mongoose.model('user', userSchema); 