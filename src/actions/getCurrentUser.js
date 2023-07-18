import ConnectDb from "../../db/connect";
import getSession from "./getSession";
import User from "@/models/User";
const getCurrentUser = async () => {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      console.log("no session found");
      return null;
    }
    await ConnectDb();
    const currentUser = await User.findOne({ email: session.user.email });
    if (!currentUser) {
      return null;
    }

    return JSON.stringify(currentUser);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getCurrentUser;
