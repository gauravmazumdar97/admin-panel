const mongoose = require("mongoose");
const User = require("./userModel");
const Message = require("./messageModel");
const { timeStamp } = require("console");

const participantsModel = mongoose.Schema(
  {
    participants: [{
      type: mongoose.Schema.Types.ObjectId,required: true,
    }],
    messages: [{
      type: mongoose.Schema.Types.ObjectId,required: true,
    }]
  },
  {
    timeStamps:true
  }
);







const Chat = mongoose.model("Participants", participantsModel);
module.exports = Chat;
