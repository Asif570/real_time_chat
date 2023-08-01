"use client";

import useOtherUser from "@/hooks/useOtherUser";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import Avatar from "../avatar/Avatar";
import ProfileDrower from "../profileDrower/ProfileDrower";

const Header = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [isOpenDrower, setIsOpenDrower] = useState(false);
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.userId.length} members`;
    }

    return "Active now";
  }, [conversation]);
  return (
    <>
      <ProfileDrower
        isOpen={isOpenDrower}
        data={conversation}
        onClose={() => setIsOpenDrower(false)}
      />
      <div className="bg-white w-full flex border-b-[1px] px-4 py-3 lg:px-6 justify-between items-center shadow-sm">
        <div className="flex gap-3 items-center">
          <Link
            href={"/conversations"}
            className=" lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
          >
            <HiChevronLeft size={32} />
          </Link>
          <Avatar user={otherUser} />
          <div className="flex flex-col">
            <div className="">{conversation?.name || otherUser?.name}</div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          onClick={() => setIsOpenDrower(true)}
          className=" text-sky-500 cursor-pointer hover:text-sky-600 transition"
        />
      </div>
    </>
  );
};
export default Header;
