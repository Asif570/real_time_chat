import ConnectDb from "../../db/connect";
import getSession from "./getSession";
import User from "@/models/User";
const getUser = async () => {
  const session = await getSession();
  if (!session?.user?.email) {
    console.log("No session");
    return [];
  }
  try {
    await ConnectDb();
    const users = await User.aggregate([
      {
        $match: {
          email: { $ne: session.user.email },
        },
      },
      {
        $sort: {
          createAt: -1,
        },
      },
    ]);

    return users;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default getUser;
