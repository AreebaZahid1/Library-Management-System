const bcrypt = require('bcrypt'); // Encrypts (hashes) passwords so they are stored safely
const jwt = require('jsonwebtoken'); // Creates a token after login so the user stays logged in

const UserModel = require('../models/UserModel');

const { uploadToCloudinary } = require('../config/cloudinaryConfig');

const nodemailer = require("nodemailer"); // forget password


// REGISTER
const register =async (req, res) => {
    try 
    {
        const {name, email, password, number} = req.body;

        // Check if the user uploaded an image
        if (!req.file) 
        {
          return res.status(400).json({
          message: "Profile picture is required",
         });
       }
  
      //  upload image
      const uploadPicture = await uploadToCloudinary(req.file.buffer)
      console.log('up', uploadPicture)
      // encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);
       
      // create user
        const user = await UserModel.create({name, email, password: hashedPassword, number, profilePicture:uploadPicture.secure_url});
      // data is stored in newUser and password is kept hidden
        const newUser = 
        {
            name: user.name,
            email: user.email,
            number: user.number,
            profilePicture: user.profilePicture
        }
        res.status(201).json({message: 'User registered successfully', newUser});
    }
    catch(error)
    {
        console.log(error); 
        res.status(500).json({message: error.message});
    }
};


// LOGIN
const login = async(req, res) => {
  try 
  {
    // get the data from body
    const {email, password} = req.body;
    // finds user on basis of email
    const user = await UserModel.findOne({email})

   if(!user) // user nhi hai
   {
    return res.status(401).json({message: 'Invalid email or password'});
   }
  //  user hai tou password match kiya returns boolean
   const isPasswordCorrect = await bcrypt.compare(password, user.password);
   console.log(isPasswordCorrect);

   if(!isPasswordCorrect)
    {
    return res.status(401).json({message: 'Invalid email or password'});
    }

  // agr password sahi hai tou token generate hota hai
   const token = jwt.sign({id: user._id, name: user.name}, process.env.JWT_SECRET, {expiresIn: '1h'});
   res.status(200).json({message: 'Login successful', token});
  }
  catch(error)
  {
    console.log(error); 
    res.status(500).json({message: error.message});
  }
};

// Get Users
const getUsers = async (req, res) => {
  try 
  {
    const users = await UserModel.find().select("name");

    res.status(200).json({ users });
  } 
  catch (error) 
  {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Forget Password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user using email
    const user = await UserModel.findOne({ email });

    if (!user) 
    {
      return res.status(404).json({message: "Email not found",});
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP in MongoDB
    user.resetOTP = otp;

    // OTP expires after 5 minutes
    user.resetOTPExpire = Date.now() + 5 * 60 * 1000;
    await user.save();

    // Configure email
    const transporter = nodemailer.createTransport({

        service: "gmail",

        auth: 
        {
          user: process.env.EMAIL_USER,

          pass: process.env.EMAIL_PASSWORD,
        },
      });

    // Send OTP
    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: email,

      subject: "Password Reset OTP",

      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    });

    res.status(200).json({message: "OTP sent to your email",});

  } 
  catch (error) 
  {
    console.log(error);
    res.status(500).json({message: "Something went wrong",});
  }
};

// Reset password
const resetPassword = async (req, res) => {
  try {
    const {
      email,
      otp,
      newPassword,
    } = req.body;

    // Find user using email
    const user =
      await UserModel.findOne({
        email: email,
      });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check OTP
    if (user.resetOTP !== otp) {
      return res.status(400).json({
        message: "Incorrect OTP",
      });
    }

    // Check OTP expiry
    if (
      user.resetOTPExpire <
      Date.now()
    ) {
      return res.status(400).json({
        message: "OTP has expired",
      });
    }

    // Hash new password
    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    // Update password
    user.password =
      hashedPassword;

    // Remove OTP after use
    user.resetOTP =
      undefined;

    user.resetOTPExpire =
      undefined;

    await user.save();

    res.status(200).json({
      message:
        "Password changed successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
    });

  }
};
module.exports = { register, login, getUsers, forgotPassword, resetPassword};


