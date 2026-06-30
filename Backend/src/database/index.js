import mongoose from "mongoose";
export  const dbConnect =async()=>{
    try{
         await mongoose.connect(process.env.DATABASE_URL);
         console.log("database connected");

    }
    catch(e){
        console.log("DB connection failed:", e.message);
        process.exit(1);
    }

}