import Conversation from "@/models/Conversation";
import getCurrentUser from "./getCurrentUser";

const getConversationById = async (conversationId = "") => {
  try {
    const currentUserstr = await getCurrentUser();
    const currentUser = JSON.parse(currentUserstr);

    if (!currentUser?.email) {
      return null;
    }

    const conversation = await Conversation.find({
      _id: conversationId,
    }).populate([
      { path: "messegesIds", options: { lean: true } },
      { path: "userIds", options: { lean: true } },
    ]);

    return conversation;
  } catch (error) {
    console.log(error);
    return {};
  }
};
export default getConversationById;
