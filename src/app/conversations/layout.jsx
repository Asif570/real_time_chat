import getConversation from "../../../pages/actions/getConversation";

import getUser from "../../../pages/actions/getUsers";
import ConversationList from "../components/conversationList/ConversationList";
import Sidebar from "../components/sidebar/Sidebar";
import getAllMessages from "../../../pages/actions/getAllMessages";
import getCurrentUser from "../../../pages/actions/getCurrentUser";

const layout = async ({ children }) => {
  const conversations = JSON.parse(await getConversation());

  const AllMessage = JSON.parse(await getAllMessages());

  const currentUser = await getCurrentUser();
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList
          currentUser={currentUser}
          initialItems={conversations}
          AllMessage={AllMessage}
        />
        {children}
      </div>
    </Sidebar>
  );
};
export default layout;
