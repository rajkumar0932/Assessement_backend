import mongoose from "mongoose";
export  const dbConnect =async()=>{
    try{
         await mongoose.connect(process.env.DATABASE_URL);
         console.log("database connected");

    }
    catch(e){
        throw new Error(e.Error);

    }

}