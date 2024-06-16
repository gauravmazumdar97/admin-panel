const mongoose = require("mongoose");

// const chatModel = mongoose.Schema(
//   {
//     isGroupChat: { type: Boolean, default: false },
//     sender: {
//       type: mongoose.Schema.Types.ObjectId,required: true,
//     },
//     reciever: {
//       type: mongoose.Schema.Types.ObjectId,required: true,
//     },
//     message: {              
//       type: String, ref: "User"},
//   },
//   {
//     isActive: { type: Number, default: 1 },
//     isDeleted: { type: Number, default: 0 },
//   }
// );

const chatModel = mongoose.Schema(
    {
        chatName: { type: String, trim: true },
        isGroupChat: { type: Boolean, default: false },
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timeStamps:true,
    }

);

const Chat = mongoose.model("Chat", chatModel);
module.exports = Chat;
