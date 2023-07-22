import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(authOptions);
  res.status(200).send(JSON.stringify(session));
}
