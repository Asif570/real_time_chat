import getCurrentUser from "@/actions/getCurrentUser";
import DesktopSidebar from "../desktopSidebar/DesktopSidebar";
import MobileSidebar from "../mobileSidebar/MobileSidebar";

const Sidebar = async ({ children }) => {
  const currentUserJson = await getCurrentUser();
  const currentUser = JSON.parse(currentUserJson);
  return (
    <div className=" h-full">
      <DesktopSidebar currentUser={currentUser} />
      <MobileSidebar />
      <main className=" lg:pl-20 h-full">{children}</main>
    </div>
  );
};
export default Sidebar;
