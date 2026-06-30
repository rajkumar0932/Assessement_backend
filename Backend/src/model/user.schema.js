import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        Username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        Email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            trim: true
        },
        Password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// hash the password before saving a new/changed user
userSchema.pre("save", async function () {
    if (this.isModified("Password")) {
        this.Password = await bcrypt.hash(this.Password, 10);
    }
});

// helper to check a plain password against the stored hash at login
userSchema.methods.comparePassword = function (plain) {
    return bcrypt.compare(plain, this.Password);
};
userSchema.methods.getAccessToken = function (){
    return jwt.sign({ id :this._id, username :this.Username},process.env.ACCESS_TOKEN_SECRET,{expiresIn: process.env.ACCESS_TOKEN_EXPIRY})
}
userSchema.methods.getRefreshToken = function (){
    return jwt.sign({ id :this._id, username :this.Username},process.env.REFRESH_TOKEN_SECRET,{expiresIn: process.env.REFRESH_TOKEN_EXPIRY})
}

export const User = mongoose.model("User", userSchema);
