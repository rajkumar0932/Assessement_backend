import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    ProductID :{
        type :String ,
        unique : true,
        required: true


    },
    Name : {
        type: String,
        required: true
    },
      Price : {
        type: Number,
        required: true
    },
       Featured: {
        type: Boolean,
        required: true
    },
    Rating :{
        type: Number,
        min: 0,
        max: 5
    },
    Company:{
        type : String,
        required: true
    }
    


},{ timestamps: true })
export const Product =  mongoose.model('Product',productSchema);