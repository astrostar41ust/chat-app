import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";


// Controller to Signup
export const signup = async (req, res) => {
  const { fullName, email, password, bio } = req.body;

  try {
    if (!fullName || !email || !password || !bio) {
      return res.json({ success: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email });

    if (user) {
      return res.json({ success: false, message: "Account already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      bio,
    });

    const token = generateToken(newUser._id);

    res.json({
      success: true,
      userData: newUser,
      token,
      message: "Account created successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


// Controller to login a user

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email });

    const isPasswordCorrect = await bcrypt.compare(password, userData.password);

    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(userData._id);

    res.json({ success: true, userData, token, message: "Login successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


// Controller to check if user is authenticate
export const checkAuth = (req, res) => {
  try {
    res.json({success: true, user: req.user, message: "Auth check successful" })
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
   
}

export const updateProfile = async (req, res) => {
    try{
        const {profilePic, bio, fullName} = req.body
        
        const userId = req.user._id
        let updateUser;

        if(!profilePic) {
            updateUser = await User.findByIdAndUpdate(userId, {bio, fullName}, {new: true})

        }
        else {
          
            const upload = await cloudinary.uploader.upload(profilePic)


            updateUser = await User.findByIdAndUpdate(userId, {picture: upload.secure_url , bio, fullName}, {new: true})
        }

        res.json({success: true, user: updateUser, message: "Profile updated successfully"})
    }
    catch(error){
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}