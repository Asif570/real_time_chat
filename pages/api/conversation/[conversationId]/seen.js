import Conversation from "@/models/Conversation";
import Message from "@/models/Message";
import User from "@/models/User";
import ConnectDb from "../../../../db/connect";

const post = async (req, res) => {
  try {
    await ConnectDb();
    const { currentUser, conversationId } = req.body;

    if (!currentUser?._id || !currentUser?.email) {
      res.status(401).send("Unauthorized");
      return;
    }

    // find existing conversation

    const conversation = await Conversation.findOne({
      _id: conversationId,
    })
      .populate({ path: "userIds", model: User })
      .select("messegesIds")
      .lean();

    console.log(conversation);
    if (!conversation) {
      res.status(400).send("Invalid ID");
      return;
    }
    // find last message
    const lastMessage =
      conversation.messegesIds[conversation.messegesIds.length - 1];

    if (!lastMessage) {
      res.json(lastMessage);
      return;
    }
    // update last message

    const updatedMessage = await Message.findOneAndUpdate(
      { _id: lastMessage._id },
      { seenIds: currentUser._id }
    ).populate([
      { path: "seenIds", options: { lean: true } },
      { path: "senderId", options: { lean: true } },
    ]);
    res.json(updatedMessage);
  } catch (error) {
    console.log("Seen messages Error ===>>", error);
    res.status(500).send("Server Error");
  }
};
export default post;
