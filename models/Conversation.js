const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  name: String,
  createAt: { type: Date, default: Date.now },
  lastMessegeAt: { type: Date, default: Date.now },
  isGroup: Boolean,
  messegesIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  userIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
