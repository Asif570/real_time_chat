import ConnectDb from "../../db/connect";
import UserModel from "../../models/User";

export default async function handler(req, res) {
  await ConnectDb();

  res.status(200).json({ name: "John Doe" });
}
