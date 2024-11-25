import mongoose from "mongoose";



const userSchema = mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },

    isVerfied: {
        type: Boolean,
        default: false
    },
    resetPassowrdToken: String,
    resetPasswordExpire: Date,
    verificationToken: String,
    verificationTokenExpireAt: Date,
    
}, {
    timestamps: true
});


const User = mongoose.model('User', userSchema)

export default User