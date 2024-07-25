
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
      console.log("check has been passed. it has been fetched");
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const profilePic = gender === 'male'
      ? 'https://avatar.iran.liara.run/public/boy'
      : 'https://avatar.iran.liara.run/public/girl';

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic
    });

    if(newUser){
      // generate new AWT token here
      generateTokenAndSetCookie(newUser._id,res);
      await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic
    });
    }
    else{
      res.status(400).json({error:"invalid user data"});
    }
  } catch (error) {
    console.error('Error in signup controller ::', error.message);
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Username already does  exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  try {
    const {username, password}= req.body;
    const user= await User.findOne({username});
    const isPasswordCorrect= await bcrypt.compare(password,user?.password || "");

    if(!user || !isPasswordCorrect){
      return res.status(400).json({error:"invalid username or password"});
    }

    generateTokenAndSetCookie(user._id,res);
    res.status(200).json({
      _id:user._id,
      fullName:user.fullName,
      username:user.username,
      profilePic:user.profilePic,
    });
  } catch (error) {
    console.error('Error in login controller ::', error.message);
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Username already does not  exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
  
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"logged out successfully"});
    
  } catch (error) {
    console.error('Error in logout controller ::', error.message);
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Username already does not  exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  
  }
 
};
