const router = require("express").Router();
//importing admin prevalages
const admin = require("../config/firebase.config");
const { default: mongoose } = require("mongoose");

//importing database models
const user = require("../models/user")
// const LikedSong = require("../models/user")

const song = require("../models/song")


router.get("/login", async (req, res) => {
    //check if token is not present
    if (!req.headers.authorization) {
        return res.status(500).send({ message: "Invalid Token" })
    }
    //so token is present
    const token = req.headers.authorization.split(" ")[1];
    try {
        //verify by token is valid and then decode it
        const decodeValue = await admin.auth().verifyIdToken(token);
        if (!decodeValue) {
            return res.status(505).json({ message: "UN authorized" })

        } else {
            //checking user exists or not in the database
            const userExists = await user.findOne({ "user_id": decodeValue.user_id })
            if (!userExists) {
                newUserData(decodeValue, req, res)

            } else {
                updateNewUserData(decodeValue, req, res);
            }

        }
    } catch (error) {
        return res.status(505).json({ message: error })
    }
})


//save a new user data
const newUserData = async (decodeValue, req, res) => {
    const newUser = new user({
        name: decodeValue.name,
        email: decodeValue.email,
        imageUrl: decodeValue.picture,
        user_id: decodeValue.user_id,
        email_verified: decodeValue.email_verified,
        role: "member",
        auth_time: decodeValue.auth_time,

    })
    //check if data is saved
    try {
        const savedUser = await newUser.save()
        res.status(200).send({ user: savedUser })
    } catch (error) {
        res.status(400).send({ sucess: false, msg: error })
    }
}
//new liked song
router.post('/:userId/liked-songs/saveNew/:songId', async (req, res) => {
    try {

        // const { userId, songId } = req.params;
        const filter_user = { _id: req.params.userId };
        const filter_song = { _id: req.params.songId };

        const options = {
            upsert: true,
            new: true,
        };


        // Fetch the user document
        const User = await user.findOne(filter_user)
        if (!User) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch the song information based on songId
        const Song = await song.findOne(filter_song);
        if (!Song) {
            return res.status(404).json({ error: 'Song not found' });
        }

        // Add the song to the user's liked songs array
        User.liked_songs.push({
            name: Song.name,
            imageUrl: Song.imageUrl,
            songUrl: Song.songUrl,
            album: Song.album,
            artist: Song.artist,
            language: Song.language,
            category: Song.category,
            _id: new mongoose.Types.ObjectId(),
        });

        // Save the updated user document
        await User.save();

        return res.status(200).json({ message: 'Song added to liked songs' });
    } catch (error) {
        console.error('Error adding song to liked songs:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

//remove from liked songs
router.delete('/:userId/liked-songs/delete/:songId', async (req, res) => {
    try {

        const songId = req.params.songId;
        const filter_user = { _id: req.params.userId };
        const filter_song = { _id: req.params.songId };

        const options = {
            upsert: true,
            new: true,
        };


        // Fetch the user document
        const User = await user.findOne(filter_user)
        if (!User) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch the song information based on songId

        const index = User.liked_songs.findIndex(songs => songs._id.toString() === songId);
        if (index === -1) {
            return res.status(404).json({ error: 'Song not found in liked songs', indexis: index });
        }

        // Remove the song from the liked_songs array
        User.liked_songs.splice(index, 1);

        //Save the updated user document
        await User.save();

        return res.status(200).json({ message: 'Song removed from liked songs' });
    } catch (error) {
        console.error('Error removing song from liked songs:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

//update the data already present in database
const updateNewUserData = async (decodeValue, req, res) => {
    const filter = { user_id: decodeValue.user_id };
    const options = {
        upsert: true,
        new: true
    };
    try {
        const result = await user.findOneAndUpdate(
            filter,
            { auth_time: decodeValue.auth_time },
            options
        );
        //here user is tempravary variable
        res.status(200).send({ user: result })
    } catch (error) {
        return res.status(505).json({ message: error })
    }
}
//get all the user info
router.get('/getAllUsers', async (req, res) => {

    const data = await user.find().sort({ createdAt: 1 })
    if (data) {
        return res.status(200).send({ sucess: true, data: data })
    } else {
        return res.status(400).send({ sucess: false, msg: "song not found" })
    }
})

//updating the role data 
router.put("/updateRole/:userId", async (req, res) => {
    const filter = { _id: req.params.userId };
    const role = req.body.data.role;

    const options = {
        upsert: true,
        new: true,
    };

    const data = await user.findOneAndUpdate(filter, { role: role }, options);
    if (data) {
        return res.status(200).send({ sucess: true, data: data })
    } else {
        return res.status(400).send({ sucess: false, msg: "song not found" })
    }

});
router.delete('/deleteUser/:id', async (req, res) => {
    const filter = { _id: req.params.id };
    const data = await user.deleteOne(filter)
    if (data) {
        res.status(200).send({ success: true, msg: "user removed" });
    } else {
        res.status(400).send({ success: false, msg: "user not removed sucessfully" });
    }

})



module.exports = router;
