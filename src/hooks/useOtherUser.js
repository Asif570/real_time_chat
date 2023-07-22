import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUser = (conversation, Alluser) => {
  const session = useSession();
  const currentUserEmail = session?.data?.user.email;
  const otherUser = useMemo(() => {
    const otherUserId = conversation?.userIds.filter(
      (user) => user.email !== currentUserEmail
    );
    const filteredUsers = [];
    for (const id of otherUserId) {
      for (const user of Alluser) {
        if (user._id === id) {
          filteredUsers.push(user);
        }
      }
    }
    return filteredUsers;
  }, [currentUserEmail, conversation.users]);

  return otherUser[0];
};
export default useOtherUser;
