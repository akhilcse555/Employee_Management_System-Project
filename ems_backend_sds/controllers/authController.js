import User from "../models/User_u.js";

export const createUser = async(req,res) => {
   try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
  
    const user = await User.findOne({ email });
    if (!user){
        return res.status(401).json({ message: "Invalid credentials" });
    }
    else if(user.password !== password) {
      return res.status(401).json({ message: "Invalid Password" });
    }
  
    res.status(200).json({ message: "Login successful", user }); 
   } catch (error) {
        res.status(500).json({errormessage: error.message});
   } 
}

export const getAllusers = async(req,res) => {
    try {
        const userData = await User.find();
        if(!userData || userData.length === 0){
            return res.status(400).json({message: "user data not found"});
        }

        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({errormessage: error.message});
    }
}