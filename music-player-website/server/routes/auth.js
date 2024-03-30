const router = require("express").Router();
//importing admin prevalages
const admin = require("../config/firebase.config");

//importing database models
const user = require("../models/user")


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
module.exports = router;