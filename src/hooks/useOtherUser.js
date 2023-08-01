import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUser = (conversation) => {
  const session = useSession();
  const currentUserEmail = session?.data?.user.email;
  const otherUser = useMemo(() => {
    const otherUserId = conversation?.userIds.filter(
      (user) => user.email !== currentUserEmail
    );

    return otherUserId;
  }, [currentUserEmail, conversation.users]);

  return otherUser[0];
};
export default useOtherUser;
