const  {UserModel} = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "12345@abcd12";
const jwt = require("jsonwebtoken");
const userController = {};

userController.userRegistration = async (req, res) => {
    try {
        const { name, email, password, stream, year,role } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            name,
      email,
      password: hashedPassword,
      stream,
      year,
      role
        });
// console.log(user);
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

userController.login = async (req,res)=>{

    try {
        const {email,password} = req.body;
        console.log(req.body);
        // const email="abc@gmail.com";
        // const password="123";
        const user = await UserModel.findOne({ email });
        console.log(user);
        // console.log("print")
        // console.log(user);
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
          }
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
          }
          const payload = {
            id: user._id,
            email: user.email,
            name: user.name,
          };
          const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
          res.json({ message: "Login successful", token, user: { name: user.name, email: user.email, role: user.role } });
        //   res.json({ message: "Login successful"});
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

userController.getUsers = async (req,res) => {
    try {
    const user = await UserModel.find({},"-password");
    const totalUser = user.length;
    res.status(200).json({error:false,message:"users fetched successfully",user,totalUser});        
    } catch (error) {
        res.status(500).json({error:false,message:"internal server error",error:error.message})
    }
}

module.exports = {userController}