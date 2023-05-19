import User from '../models/user.model.js';

export const signupUser = async (req, res, next) => {
    try {
        const userInfo = req.body;
        
        const newUser = new User(userInfo);
        console.log("new user is: ", newUser);
        await newUser.save();
        return res.status(200).json({msg: 'signup successful'});
    } catch (error) {
        console.log("ERROR IS: ", error);
        return res.status(500).json({msg: 'Error while creating new user'});
    }
}