const mongoose = require('mongoose');
const JWTHelper = require('../config/jwt-Token');

const userModel = mongoose.Schema(
    {
        name: { type: String, trim: true },
        email: { type: String, trim: true, unique: true },
        password: { type: String, trim: true },
        pic: {
            type:String,
            required: true,
            default:
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        isActive: { type: Number, default: 1 }, 
        isDeleted: { type: Number, default: 0 }, 
    },
    {
        timeStamps: true,
    }

);


// Pre-save hook to encrypt the password before saving
userModel.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const encryptedPassword = await JWTHelper.aesEncrypt(this.password);
        this.password = encryptedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

// Method to compare password
userModel.methods.comparePassword = async function (inputPassword) {
    try {
        const decryptedPassword = await JWTHelper.aesDecrypt(this.password);
        return decryptedPassword === inputPassword;
    } catch (error) {
        console.error('Password comparison error =>', error);
        return false;
    }
};






const User = mongoose.model('User', userModel);

module.exports = User;