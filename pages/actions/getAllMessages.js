import Message from "@/models/Message";

const getAllMessages = async () => {
  const data = await Message.find();
  return JSON.stringify(data);
};
export default getAllMessages;
