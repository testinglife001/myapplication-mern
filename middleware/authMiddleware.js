
const jwt = require('jsonwebtoken');
module.exports.admin_middleware = async (req, res, next) => {
    // console.log(req);
    const {blog_token} = req.cookies;
    // console.log(blog_token);
    if(!blog_token){
        res.status(409).json({errorMessage: {error: 'Please login first'}});
    } else {
        const decodeToken = await jwt.verify(blog_token, process.env.SECRET);
        // console.log(decodeToken);
        req.adminId = decodeToken.id;
        req.adminName = decodeToken.name;
        req.role = decodeToken.role;
        next();
    }
}

module.exports.user = async (req,res,next) => {
    const {blog_token} = req.cookies;
    // console.log(blog_token);
    if(!blog_token){
        req.userId = "";
        req.userName = "";
        req.role = "";
        next();
    } else {
        const decodeToken = await jwt.verify(blog_token, process.env.SECRET);
        // console.log(decodeToken);
        req.userId = decodeToken.id;
        req.userName = decodeToken.name;
        req.role = decodeToken.role;
        next();
    }
}

module.exports.auth_user = async (req,res,next) => {
    const {blog_token} = req.cookies;
    // console.log(blog_token);
    if(!blog_token){
        res.status(409).json({errorMessage: {error: 'Please login first'}});
    } else {
        const decodeToken = await jwt.verify(blog_token, process.env.SECRET);
        // console.log(decodeToken);
        if(decodeToken.role === 'user' && decodeToken.accessStatus === 'unblock'){
            req.userId = decodeToken.id;
            req.userName = decodeToken.name;
            req.role = decodeToken.role;
            next();
        }else{
            res.status(404).json({
                errorMessage: {
                    error: 'you can not access'
                }
            })
        }
    }
}

module.exports.auth_sub_admin = async (req,res,next) => {
    const {blog_token} = req.cookies;
    // console.log(blog_token);
    if(!blog_token){
        res.status(409).json({errorMessage: {error: 'Please login first'}});
    } else {
        const decodeToken = await jwt.verify(blog_token, process.env.SECRET);
        // console.log(decodeToken);
        if(decodeToken.role === 'subadmin' && decodeToken.accessStatus === 'unblock'){
            req.adminId = decodeToken.id;
            req.adminName = decodeToken.name;
            req.role = decodeToken.role;
            next();
        }
        else if (decodeToken.role === 'admin'){
            req.adminId = decodeToken.id;
            req.adminName = decodeToken.name;
            req.role = decodeToken.role;
            next();
        }
        else if (decodeToken.role === 'superadmin'){
            req.adminId = decodeToken.id;
            req.adminName = decodeToken.name;
            req.role = decodeToken.role;
            next();
        }
        else{
            res.status(404).json({
                errorMessage: {
                    error: 'you can not access'
                }
            })
        }
    }
}

