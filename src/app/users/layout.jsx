import getUser from "@/actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import UserList from "../components/userList/UserList";

const layout = async ({ children }) => {
  const users = await getUser();
  return (
    <Sidebar>
      <div className=" h-full">
        <UserList items={users} />
        {children}
      </div>
      ;
    </Sidebar>
  );
};
export default layout;
