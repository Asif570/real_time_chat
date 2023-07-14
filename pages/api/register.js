import bcrypt from "bcrypt";
import ConnectDb from "../../db/connect";
import User from "@/models/User";

const POST = async (req, res) => {
  try {
    await ConnectDb();
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send("Missing info");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name,
      email,
      hashedPassword,
    });

    return await res.json(newUser);
  } catch (error) {
    console.log(error, "===>From Register");

    return await res.status(500).send("Internal server error");
  }
};

module.exports = POST;
