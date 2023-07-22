import ConnectDb from "../db/connect";
import User from "@/models/User";
const FindUserById = (ids) => {
  let Alluser;
  ConnectDb()
    .then(() => {
      return User.find();
    })
    .then((items) => {
      Alluser = items; // Handle the retrieved users here
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      // Handle any errors that occurred during the process
    });
  console.log(Alluser);
};
export default FindUserById;
