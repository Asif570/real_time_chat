import Conversation from "@/models/Conversation";
import ConnectDb from "../../db/connect";
import getCurrentUser from "./getCurrentUser";

const getConversation = async () => {
  await ConnectDb();
  const currentUserstr = await getCurrentUser();

  const currentUser = JSON.parse(currentUserstr);

  if (!currentUser._id) {
    return [];
  }
  try {
    const conversations = await Conversation.find({
      userIds: currentUser._id,
    })
      .populate([
        { path: "messegesIds", options: { lean: true } },
        { path: "userIds", options: { lean: true } },
      ])
      .sort({ lastMessageAt: "desc" });
    const conversationsStr = JSON.stringify(conversations);
    return conversationsStr;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export default getConversation;
