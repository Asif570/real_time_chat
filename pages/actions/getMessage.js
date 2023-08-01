import Message from "@/models/Message";

const getMessage = async (conversationId) => {
  try {
    const messages = await Message.find({
      conversationId: conversationId,
    })
      .populate([
        { path: "seenIds", options: { lean: true } },
        { path: "senderId", options: { lean: true } },
      ])
      .sort({ createdAt: "asc" });
    return messages;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export default getMessage;
