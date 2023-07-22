import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

const getSession = async () => {
  return await getServerSession(authOptions);
};

export default getSession;
