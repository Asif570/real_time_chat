import getCurrentUser from "../../../../pages/actions/getCurrentUser";
import DesktopSidebar from "../desktopSidebar/DesktopSidebar";
import MobileSidebar from "../mobileSidebar/MobileSidebar";

const Sidebar = async ({ children }) => {
  const currentUser = await getCurrentUser();

  return (
    <div className=" h-full">
      <DesktopSidebar currentUser={currentUser} />
      <MobileSidebar />
      <main className=" lg:pl-20 h-full">{children}</main>
    </div>
  );
};
export default Sidebar;
