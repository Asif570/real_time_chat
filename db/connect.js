import mongoose from "mongoose";
const URI = process.env.MONGODB_URI;
const ConnectDb = async () => {
  console.log("Db Connectng");
  await mongoose.connect(URI);
  console.log("Db Connected");
};
export default ConnectDb;
