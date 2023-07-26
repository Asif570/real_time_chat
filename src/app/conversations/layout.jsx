import { useMemo } from "react";
import getConversation from "../../../pages/actions/getConversation";

import getUser from "../../../pages/actions/getUsers";
import ConversationList from "../components/conversationList/ConversationList";
import Sidebar from "../components/sidebar/Sidebar";
import getAllMessages from "../../../pages/actions/getAllMessages";

const layout = async ({ children }) => {
  const conversations = JSON.parse(await getConversation());

  const AllMessage = JSON.parse(await getAllMessages());

  const Alluser = await getUser();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList
          initialItems={conversations}
          Alluser={Alluser}
          AllMessage={AllMessage}
        />
        {children}
      </div>
    </Sidebar>
  );
};
export default layout;
