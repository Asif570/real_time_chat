import Conversation from "@/models/Conversation";
import getCurrentUser from "./getCurrentUser";

const getConversationById = async (conversationId = "") => {
  try {
    const currentUserstr = await getCurrentUser();
    const currentUser = JSON.parse(currentUserstr);

    if (!currentUser?.email) {
      return null;
    }

    const conversation = await Conversation.find({ _id: conversationId });

    return conversation;
  } catch (error) {
    console.log(error);
    return {};
  }
};
export default getConversationById;
