import { User } from "../model/user.schema.js";

const generateTokens = (UserInstance) => {
    const AccessToken = UserInstance.getAccessToken();
    const RefreshToken = UserInstance.getRefreshToken();
    return { AccessToken, RefreshToken };
};

const UserRegister = async (req, res)=>{
    try{
        const {username, email, password} = req.body;
        if(!username || !email || !password){
          return res.status(400).json({message : "enter all details"});
        }
        const checkExistingUser = await User.findOne({Email: email});
        if(checkExistingUser){
           return res.status(400).json({message : "userEmail already exist"});
        }
        // save into mongodb
        
        const savingUser=await User.create({Username : username,Email : email,Password:password});
        if(!savingUser){
             return res.status(500).json({message : "something went wrong while saving user details in database"});
        }

    }
    catch(e){
       return res.status(500).json("something went wrong while registering user");

    }
}

const UserLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Fill both credentials" });
        }

        const checkExistence = await User.findOne({ Email: email });
        if (!checkExistence) {
            return res.status(400).json({ message: "Enter valid credentials" });
        }

        const matchPassword = await checkExistence.comparePassword(password);
        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const { AccessToken, RefreshToken } = generateTokens(checkExistence);
        if (!AccessToken || !RefreshToken) {
            return res
                .status(500)
                .json({ message: "Something went wrong while generating tokens" });
        }

        return res
            .status(200)
            .cookie("AccessToken", AccessToken, { httpOnly: true })
            .cookie("RefreshToken", RefreshToken, { httpOnly: true })
            .json({ message: "user logged in", AccessToken });
    } catch (e) {
        return res
            .status(500)
            .json({ message: "Something went wrong while logging in user", error: e.message });
    }
};
const userForgetPassword = async( req, res)=>{
    try{
         const {email, password}= req.body;
    const checkEmail = await User.findOne({Email:email});
    if(!checkEmail){
        return res.status(400).json({message : "Enter correct email"});
    }
    checkEmail.Password= password;
    await checkEmail.save();
     return res.status(200).json({ message: "Password updated successfully" });


    }
    catch(e){
        return res.status(500).json({message: "something went wrong while updating password"});

    }
   


}
export { UserLoginController,UserRegister,userForgetPassword  };
