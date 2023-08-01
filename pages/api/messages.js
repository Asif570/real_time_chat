import Message from "@/models/Message";
import getCurrentUser from "../actions/getCurrentUser";
import Conversation from "@/models/Conversation";
import ConnectDb from "../../db/connect";

const messages = async (req, res) => {
  await ConnectDb();
  try {
    const {
      message,
      image,
      conversationId,
      currentUser: currentUserStr,
    } = req.body;
    const currentUser = JSON.parse(currentUserStr);
    if (!currentUser?._id || !currentUser?.email) {
      res.status(201).send(currentUser);
    }
    const newMessage = await Message.create({
      body: message,
      image: image,
      conversationId: conversationId,
      senderId: currentUser._id,
      seenIds: currentUser._id,
    });
    const updateConversation = await Conversation.findOneAndUpdate(
      { _id: conversationId },
      {
        lastMessegeAt: new Date(),
        $push: { messegesIds: newMessage._id },
      },
      { new: true }
    );

    res.status(201).send(newMessage);
  } catch (error) {
    console.log(error);
    res.status(500).send("Message Error");
  }
};
export default messages;
