const validator = require('validator');
const adminModel = require('../models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const formidable = require('formidable');
const fs = require('fs').promises;
const path = require('path');
// const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const nodeMailer = require('nodemailer');
const crypto = require("crypto");
// const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config(); // ✅ load env first


module.exports.admin_login = async (req, res) => {
    
    // console.log(req.body);
    
    const {email, password} = req.body;

    const error = {

    }

    if (email && !validator.isEmail(email)) {
        error.email = "please provide your valid email"
    }

    if (!email) {
        error.email = "please provide your email";
    }

    if (!password) {
        error.password = "please provide your password"
    }

    if(Object.keys(error).length > 0){
        return res.status(400).json({ errorMessage: error });
    } else {
        try {
            //const getAdmin = await adminModel.findOne({ email });
             const getAdmin = await adminModel.findOne({ email }).select('+password');
            // console.log(getAdmin);
            if(getAdmin){
                const matchPassword = await bcrypt.compare(password, getAdmin.password);
                // console.log(matchPassword);
                if(matchPassword){
                    const token = jwt.sign({
                        id: getAdmin._id,
                        name: getAdmin.adminName,
                        role: getAdmin.role,
                        image: getAdmin.image
                    }, process.env.SECRET, { expiresIn: '7d' });
                    res.status(200).cookie('blog_token', token, {
                        expires: new Date(
                            Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000
                        ),
                        httpOnly: true
                    }).json({
                        successMessage: 'login successfull',
                        token
                    });
                } else {
                    return res.status(400).json({ errorMessage: { error: "Passwod does not match" } });
                }
            } else {
                return res.status(400).json({ errorMessage: { error: "Email does not exits" } });
            }

        } catch (error) {
            // console.log(error.message);
            return res.status(500).json({ errorMessage: { error: "Internal server error" } });
        }
    }


}


// user registration with otp and email verification

module.exports.user_register = async (req, res) => {
    // const formData = formidable();

    const formData = new formidable.IncomingForm({ multiples: true })

    formData.parse(req, async (err, fields, files) => {
    if (err) {
        return res.status(500).json({ errorMessage: { error: "Form data parse failed" } });
    } else {
        console.log(fields);
        console.log(files);

        const name = fields.name?.[0] || fields.name;
        const email = fields.email?.[0] || fields.email;
        const password = fields.password?.[0] || fields.password;

        const errorData = {};

        if (!name) errorData.name = "please provide your name";
        if (!email) errorData.email = "please provide your email";
        if (!password) errorData.password = "please provide your password";
        if (Object.keys(files).length === 0) errorData.image = "Please upload profile image";

        if (Object.keys(errorData).length === 0) {
            try {
                const existingUser = await userModel.findOne({ email });
                if (existingUser) {
                    return res.status(400).json({ errorMessage: "Email already in use" });
                }

                // Generate OTP
                const otp = Math.floor(100000 + Math.random() * 900000);

                // Send email
                const transporter = nodeMailer.createTransport({
                    service: "gmail",
                    auth: {
                    user: process.env.USER_EMAIL,
                    pass: process.env.USER_PASSWORD,
                    },
                 });

                const mailOption = {
                    from: process.env.USER_EMAIL,
                    to: email,
                    subject: "Verify your email",
                    html: `<div style="padding:10px"><h3>Your OTP code: <b>${otp}</b></h3></div>`,
                };

                transporter.sendMail(mailOption, (error) => {
                    if (error) {
                    console.error("Email send failed:", error);
                    return res.status(500).json({ errorMessage: "Failed to send OTP email" });
                    }

                    // Create JWT with OTP + user data (password un-hashed, will hash later)
                    const verifyEmailToken = jwt.sign(
                    {
                        name,
                        email,
                        password,
                        imageInfo: files,
                        otpCode: otp,
                    },
                    process.env.SECRET,
                    { 
                        // expiresIn: "15m" 
                        expiresIn: process.env.TOKEN_EXP
                    }
                    );

                    const option = {
                        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
                    }

                    res
                    .cookie("emailVerifyToken", verifyEmailToken, option, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        sameSite: "strict",
                        // maxAge: 15 * 60 * 1000, // 15 minutes
                    })
                    .status(201)
                    .json({ successMessage: "OTP sent. Please verify your email." });
                });


            } catch (error) {
            console.error("Register error:", error);
            return res.status(500).json({ errorMessage: "Internal server error" });
            }
        } else {
        return res.status(400).json({ errorMessage: errorData });
        }
    }
    });

}


module.exports.verify_email = async (req, res) => {
    console.log("verify_email body:", req.body);
    console.log("verify_email cookies:", req.cookies);
  
    try {
        const { otp } = req.body;
        const { emailVerifyToken } = req.cookies;

        if (!otp) {
        return res.status(400).json({ errorMessage: "Please provide your OTP" });
        }
        if (!emailVerifyToken) {
        return res.status(400).json({ errorMessage: "Verification expired, please register again" });
        }

        let payload;
        try {
        payload = jwt.verify(emailVerifyToken, process.env.SECRET);
        } catch (err) {
        return res.status(401).json({ errorMessage: "Invalid or expired OTP session" });
        }

        const { name, email, password, otpCode, imageInfo } = payload;

        if (String(otp) !== String(otpCode)) {
        return res.status(400).json({ errorMessage: "Invalid OTP" });
        }

        // Handle image
        let imageUrl = `http://localhost:5173/userImage/default.png`; // fallback
        try {
        if (imageInfo?.image?.[0]) {
            const file = imageInfo.image[0];
            // const imageName = Date.now() + "_" + file.originalFilename;
            //const destPath = path.join(__dirname, "../../../frontend/public/userImage", imageName);
            
            // const userImageDir = path.join(__dirname, "../../../frontend/public/userImage");
            const userImageDir = path.join(__dirname, "../frontend/public/userImage");
            console.log(userImageDir)
            //myapplication superapp deploy\myapplication
            // Create directory if it doesn't exist
            await fs.mkdir(userImageDir, { recursive: true });

            const imageName = Date.now() + "_" + file.originalFilename;
            const destPath = path.join(userImageDir, imageName);

            await fs.copyFile(file.filepath, destPath);


            await fs.copyFile(file.filepath, destPath);
            imageUrl = `http://localhost:5173/userImage/${imageName}`;

        }
        } catch (err) {
        console.error("Image save failed:", err);
        }

        // Create user (password hashed by pre-save hook)
        const newUser = await userModel.create({
        userName: name,
        email,
        password,
        loginMethod: "manually",
        image: imageUrl,
        });

        // Clear verify token cookie
        res.clearCookie("emailVerifyToken");

        // Issue app JWT
        const token = jwt.sign(
        {
            id: newUser._id,
            email: newUser.email,
            name: newUser.userName,
            role: newUser.role,
        },
        process.env.SECRET,
       { 
            // expiresIn: "15m" 
            expiresIn: process.env.TOKEN_EXP
        }
        );

        const option = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
        }

        res
        .cookie("blog_token", token, option, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            // maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
        })
        .status(201)
        .json({ successMessage: "Registration successful", token });
    } catch (error) {
        console.error("Verify email error:", error);
        res.status(500).json({ errorMessage: "Internal server error" });
    }
};




/*
module.exports.user_register = async (req, res) => {
    // const formData = formidable();
    // console.log(req.body);

    /*
    const formData = new formidable.IncomingForm({ multiples: true })
    
    formData.parse(req, async (err, fields, files) => {
        if(err){
            return res.status(500).json({ errorMessage: {  error: 'Form data parse failed' }  });
        }else{
            // console.log(fields);
            // console.log(files);

            const { name, email, password } = fields;
            const errorData = { }

            if (!name) {
                errorData.name = "please provide your name";
            }
            
            if (!email) {
                errorData.email = "please provide your email";
            }

            // if (email && !validator.isEmail(email)) {
            //    errorData.email = "please provide your valid email";
            // }

           
        
            if (!password) {
                errorData.password = "please provide your password";
            }

            if(Object.keys(files).length === 0){
                errorData.image = 'Please upload profile image';
            }

            if(Object.keys(errorData).length  === 0){
                
                
            try {
                const getUser = await userModel.findOne({ email });
                if (getUser) {
                    return res.status(500).json({ errorMessage: { error: "Your email already use" } });
                } else {

                    // files.image[0].originalFilename = Date.now() + files.image[0].originalFilename;
                    const imageName = Date.now() + files.image[0].originalFilename;

            
                   // const uploadPath = __dirname + `../../../../frontend/public/articalImage/${files.image[0].originalFilename}`;
                   const disPath = __dirname + `../../../frontend/public/userImage/${imageName}`

                   fs.copyFile(files.image[0].filepath, disPath, async (error) => {
                        if(!error){
                            const createUser = await userModel.create({
                                userName: name,
                                email,
                                loginMethod: 'manually',
                                // password: await bcrypt.hash(password,10),
                                 password,
                                image: `http://localhost:3000/userImage/${imageName}`
                            })
                             console.log(createUser); 
                        }
                   })
                    

                }
            } catch (error) {
                
            }
                

            } else {
                // console.log(errorData);
                return res.status(400).json({ errorMessage: errorData });
            }
        }
    })
    

}
*/


module.exports.user_login = async (req, res) => {
    // console.log(req.body);
    
    const {email, password} = req.body;
    const error = {}
    if (email && !validator.isEmail(email)) {
        error.email = "please provide your valid email"
    }
    if (!email) {
        error.email = "please provide your email";
    }
    if (!password) {
        error.password = "please provide your password"
    }
    if(Object.keys(error).length > 0){
        return res.status(400).json({ errorMessage: error });
    } else {
        try {
            //const getAdmin = await adminModel.findOne({ email });
             const getUser = await userModel.findOne({ email }).select('+password');
            // console.log(getUser);
            if(getUser){              
                const matchPassword =  await bcrypt.compare(password, getUser.password);
                // console.log(matchPassword);
                if(matchPassword){
                    const token = jwt.sign({
                        id: getUser._id,
                        email: getUser.email,
                        name: getUser.userName,
                        image: getUser.image,
                        role: getUser.role,
                        loginMethod: getUser.loginMethod,
                        accessStatus: getUser.accessStatus,
                        createdAt: getUser.createdAt
                    }, process.env.SECRET, {
                        expiresIn: process.env.TOKEN_EXP
                    })

                    const option = {
                        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
                    }

                    
                    res.status(201).cookie('blog_token', token, option).json({
                        successMessage:  'login successfull',
                        token
                    })

            
                } else {
                    return res.status(400).json({ errorMessage: { error: "Passwod does not match" } });
                }
            
                
            } else {
                return res.status(400).json({ errorMessage: { error: "Email does not exits" } });
            }

        } catch (error) {
            // console.log(error.message);
            return res.status(500).json({ errorMessage: { error: "Internal server error" } });
        }
    }
    


}

module.exports.user_logout = async (req, res) => {
    const option = {
        expires: new Date(Date.now())
    }
    res.cookie('blog_token', null, option)
    res.status(200).json({
        message: 'success'
    })
    // console.log('res');
}


module.exports.registerUser = async (req, res) => {
    // console.log('registerUser');
    
    try {
        
        const { name, email, password, isAdmin,  role,  title  } = req.body;

        const userExist = await userModel.findOne({ email });

        if (userExist) {
            return res.status(400).json({
                status: false,
                message: "User already exists",
            });
        }

        const user = await userModel.create({
            userName: name,
            email,
            password,
             isAdmin,
            role,
             title,
            loginMethod: 'manually',
             image: "http://localhost:3000/articalImage/image6.jpeg"
        });

        /*
        const token = jwt.sign({
            id: user._id,
            email: user.email,
            name: user.userName,
            image: user.image,
            role: user.role,
            loginMethod: user.loginMethod,
            accessStatus: user.accessStatus,
            createdAt: user.createdAt
        }, process.env.SECRET, {
            expiresIn: process.env.TOKEN_EXP
        })
        const option = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        }
        */

         if(user){

            /*
            const option = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
            }
            isAdmin ? 
            //createJWT(res, user._id) 
            
             jwt.sign({
                id: user._id,
                email: user.email,
                name: user.userName,
                image: user.image,
                role: user.role,
                loginMethod: user.loginMethod,
                accessStatus: user.accessStatus,
                createdAt: user.createdAt,
                isAdmin: user.isAdmin
            }, process.env.SECRET, {
                expiresIn: process.env.TOKEN_EXP
            })   
            
            : null;
            */

            user.password = undefined;

            res.status(201).json(user);
         }
         else{
            return res
            .status(400)
            .json({ status: false, message: "Invalid user data" });
          }
            

     } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
     }

}

