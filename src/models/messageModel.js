const mongoose = require("mongoose");




const messageModel = mongoose.Schema(
  {
    isGroupChat: { type: Boolean, default: false },
    sender: {
      type: mongoose.Schema.Types.ObjectId, required: true},
    reciever: {
      type: mongoose.Schema.Types.ObjectId, required: true },
    message: { 
        type: String},
  },
  {
    timeStamps: true,
  }
);

// const messageModel = mongoose.Schema({
//         users: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User',
//         },
//         content: {
//             type: mongoose.Schema.Types.ObjectId,
//             trim: true,
//         },
//         chat: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Chat',
//         },
//     },
//     {
//         timeStamps:true,
//     }

// );

const Message = mongoose.model("Message", messageModel);
module.exports = Message;
