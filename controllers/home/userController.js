const userModel = require("../../models/userModel");

module.exports.registerUser = async (req,res) => {

}

module.exports.getTeamList = async (req, res) => {
    try {
      const users = await userModel.find().select("userName title role email isActive");
  
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: false, message: error.message });
    }
};
  


