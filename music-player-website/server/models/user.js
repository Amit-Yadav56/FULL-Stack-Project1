const { default: mongoose } = require("mongoose");

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

},
    // mongodb automatically provides timestamps
    { timestamps: true }
)
//collection name is user
module.exports = mongoose.model("user", userSchema)