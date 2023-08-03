import Conversation from "@/models/Conversation";
import ConnectDb from "../../../../db/connect";

const Delete = async (req, res) => {
  const { conversationId } = req.body;
  try {
    await ConnectDb();

    const existingConversation = await Conversation.findOne({
      _id: conversationId,
    }).populate([{ path: "userIds", options: { lean: true } }]);
    if (!existingConversation) {
      res.status(401).send("Invalid Id");
      return;
    }

    const deleteConversation = await Conversation.deleteOne({
      _id: conversationId,
    });
    res.status(200).send(deleteConversation);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal erroe");
  }
};
export default Delete;
