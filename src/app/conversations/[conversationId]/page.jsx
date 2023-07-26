import EmptyState from "@/app/components/emptyState/EmptyState";
import getConversationById from "../../../../pages/actions/getConversationById";
import getMessage from "../../../../pages/actions/getMessage";
import Header from "@/app/components/header/Header";
import getUser from "../../../../pages/actions/getUsers";
import Body from "@/app/components/conversationBody/Body";
import Form from "@/app/components/conversationForm/Form";
import getCurrentUser from "../../../../pages/actions/getCurrentUser";

const page = async ({ params }) => {
  const Alluser = await getUser();
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessage(params.conversationId);
  const currentUser = await getCurrentUser();
  if (!conversation) {
    return (
      <div className="h-full lg:pl-80">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className=" lg:pl-80 h-full ">
      <div className="h-full flex flex-col">
        <Header conversation={conversation[0]} Alluser={Alluser} />
        <Body />
        <Form currentUser={currentUser} />
      </div>
    </div>
  );
};
export default page;
