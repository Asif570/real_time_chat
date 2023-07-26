import Message from "@/models/Message";

const getMessage = async (conversationId) => {
  try {
    const messages = await Message.find({
      conversationId: conversationId,
    }).sort({ createdAt: "asc" });
    return messages;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export default getMessage;
