import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import User from '../models/user.model.js';
import Token from '../models/token.model.js';

export const signupUser = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const userInfo = {
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword
        };
        
        const newUser = new User(userInfo);
        console.log("new user is: ", newUser);
        await newUser.save();
        return res.status(200).json({msg: 'signup successful'});
    } catch (error) {
        console.log("ERROR IS: ", error);
        return res.status(500).json({msg: 'Error while creating new user'});
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) {
            return res.status(401).json({msg: 'Username does not exist'});
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).json({msg: 'Invalid password'});
        }

        const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m'});
        const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

        const newToken = new Token({token: refreshToken});
        await newToken.save();

        return res.status(200).json({msg: 'login successful', accessToken, refreshToken, name: user.name, username: user.username});
    } catch (error) {
        console.log("ERROR IS: ", error);
        return res.status(500).json({msg: 'Error while logging in'});
    }
}