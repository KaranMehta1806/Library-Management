const  {UserModel} = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "12345@abcd12";
const jwt = require("jsonwebtoken");
const adminController = {};

adminController.addLibrarian = async (req, res) => {
    try {
        const { name, email, password,role } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            name,
      email,
      password: hashedPassword,
      role
        });
// console.log(user);
        await user.save();

        res.status(201).json({ message: "Librarian Added Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

adminController.login = async (req,res)=>{

    try {
        const {email,password} = req.body;
        // console.log("email,password");
        console.log(email,password);
        // const email="abc@gmail.com";
        // const password="123";
        const user = await UserModel.findOne({ email });
        // console.log("user");
        // console.log(user);
        // console.log("print")
        // console.log(user);
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
          }
          if (user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
          }
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
          }
          const payload = {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
          const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
          res.json({ message: "Login successful", token, user: { name: user.name, email: user.email, role: user.role } });
        //   res.json({ message: "Login successful"});
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


module.exports = {adminController};