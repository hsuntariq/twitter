const User = require('../models/userModel')
const AsyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt')

const registerUser = AsyncHandler(async (req, res) => {
    const { name, email, dob, password } = req.body;

    // check if email/user already exists

    const checkUser = await User.findOne({ email })

    if (checkUser) {
        res.status(400)
        throw new Error('Email Already registered')
    }

    if (!name || !email || !dob || !password) {
        res.status(400);
        throw new Error('Please enter the relevant fields!')
    } else {

        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(password, salt)
            const newUser = await User.create({
                name, email, dob, password: hashedPass
            })

            res.send(newUser)
        }
        catch (error) {
            console.log(error)
        }


    }
})


const loginUser = AsyncHandler(async (req, res) => {

    // get data from the user
    const { email, password } = req.body;
    // check if user has entered all the fields
    if (!email || !password) {
        res.status(400);
        throw new Error('please enter the relevant fields')
    }

    // check if email/user exists
    const findUser = await User.findOne({ email })

    // throw an error,if email is wrong
    if (!findUser) {
        res.status(404);
        throw new Error('Invalid Email');
    } else {
        // if user exists,compare the password
        const matchPass = await bcrypt.compare(password, findUser.password);
        // if password doesn't match, throw an error
        if (!matchPass) {
            res.status(401);
            throw new Error('Invalid Password')
        } else {
            res.send(findUser)
        }
    }



})


const findMyProfile = AsyncHandler(async (req, res) => {
    // get the id from the url bar
    const user_id = req.params.id;
    // go to the database through model and fing the user against the id provided
    const foundUser = await User.findOne({ _id: user_id });
    // if user is not found
    if (!foundUser) {
        res.status(404);
        throw new Error('User not found')
    } else {
        res.send(foundUser)
    }
})




module.exports = {
    registerUser,
    loginUser,
    findMyProfile
}