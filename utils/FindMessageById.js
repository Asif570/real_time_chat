import Message from "@/models/Message";
import ConnectDb from "../db/connect";

const FindMessageById = async (ids) => {
  await ConnectDb();
  const AllMessage = await Message.find();
  // const Messages = useMemo(() => {
  //   const messageIds = ids;
  //   const filteredMessage = [];
  //   for (const id of messageIds) {
  //     for (const message of AllMessage) {
  //       if (message._id === id) {
  //         filteredMessage.push(message);
  //       }
  //     }
  //   }
  //   return filteredUsers;
  // }, [ids]);
  return AllMessage;
};
export default FindMessageById;
