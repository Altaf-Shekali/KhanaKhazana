import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

export const signup=async (req,res)=>{
    try{
        const {fullname,email,password,plan}=req.body;
        const user= await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already esists" });

        }
        const hashPassword= await bcryptjs.hash(password,10);

        const createdUser=new User({
            fullname:fullname,
            email:email,
            password:hashPassword,
            plan:plan
        });

        await createdUser.save();
        res.status(201).json({message:"user created successfully",user:{
            _id:createdUser._id,
            fullname:createdUser.fullname,
            email:createdUser.email,
        }

        });
    }
    catch(error){
        console.log("Error:"+ error.message);
        res.status(500).json({message:"Internal server error"});

    }
};
export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid username or password" });
      }
  
      // Compare the password
      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid username or password" });
      }
  
      // Login successful
      res.status(200).json({
        message: "Login successful",
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          plan: user.plan,
        },
      });
    } catch (error) {
      console.log("Error: " + error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  