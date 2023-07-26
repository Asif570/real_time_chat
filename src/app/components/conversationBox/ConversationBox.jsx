"use client";

import useOtherUser from "@/hooks/useOtherUser";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import Avatar from "../avatar/Avatar";

const ConversationBox = ({ data, selected, Alluser, AllMessage }) => {
  const otherUser = useOtherUser(data, Alluser);

  const session = useSession();
  const router = useRouter();
  const hundleClick = useCallback(() => {
    router.push(`/conversations/${data._id}`);
  }, [router, data._id]);
  const lastMessage = useMemo(() => {
    const messagesIds = data?.messegesIds;

    const lastMessageId = messagesIds[messagesIds.length - 1];

    return AllMessage.filter((item) => item._id === lastMessageId)[0];
  }, [data?.messegesIds]);
  const userEmail = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }
    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "sent an image";
    }
    if (lastMessage?.body) {
      return lastMessage?.body;
    }

    return "Started a Conversation";
  }, [lastMessage]);
  return (
    <div
      onClick={hundleClick}
      className={clsx(
        `w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer`,
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      <Avatar user={otherUser} />
      <div className="flex-1 min-w-0">
        <div className=" focus:outline-none ">
          <div className="flex justify-between items-center mb-1">
            <p className=" text-md font-medium text-gray-900">
              {data?.name || otherUser?.name}
            </p>
            {lastMessage?.createdAt && (
              <p
                className="
              text-xs text-gray-400 font-light"
              >
                {format(new Date(lastMessage?.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              ` truncate text-xs`,
              hasSeen ? "text-gray-500" : "text-gray-900 font-medium"
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ConversationBox;
