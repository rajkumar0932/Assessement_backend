import "dotenv/config";
import express from "express";
const app = express();
app.listen(process.env.port || 2200 ,()=>{
    console.log(`the server is active on port ${2200} `)
})