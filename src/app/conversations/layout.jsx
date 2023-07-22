import getConversation from "../../../pages/actions/getConversation";
import getUser from "../../../pages/actions/getUsers";
import ConversationList from "../components/conversationList/ConversationList";
import Sidebar from "../components/sidebar/Sidebar";

const layout = async ({ children }) => {
  const conversations = await getConversation();
  const Alluser = await getUser();
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} Alluser={Alluser} />
        {children}
      </div>
    </Sidebar>
  );
};
export default layout;
