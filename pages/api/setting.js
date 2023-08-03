import User from "@/models/User";
import ConnectDb from "../../db/connect";
const Post = async (req, res) => {
  try {
    await ConnectDb();
    const { currentUser, image, name } = req.body;
    if (!currentUser?._id) {
      res.status(401).send("Unauthorized");
    }
    const updateUser = await User.findOneAndUpdate(
      { _id: currentUser._id },
      {
        name: name,
        image: image,
      }
    );
    res.status(201).json(updateUser);
  } catch (error) {
    res.status(500).send(error);
  }
};
export default Post;
