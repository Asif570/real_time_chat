"use client";

import clsx from "clsx";
import { useSession } from "next-auth/react";
import Avatar from "../avatar/Avatar";
import { format } from "date-fns";
import Image from "next/image";

const MessageBox = ({ data, isLast }) => {
  const session = useSession();
  const isWon = session?.data?.user?.email === data?.senderId?.email;

  const seenList = (data.seenIds || [])
    .filter((user) => {
      return user.email !== data.senderId?.email;
    })
    .map((user) => {
      if (user) {
        return user.name;
      }
      return null;
    })
    .join(", ");
  return (
    <div className={clsx("flex gap-3 p-4", isWon && "justify-end")}>
      <div className={clsx(isWon && " order-2")}>
        <Avatar user={data.senderId} />
      </div>
      <div className={clsx("flex flex-col gap-2 ", isWon && " items-end")}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{data.senderId.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>

        <div
          className={clsx(
            " text-xs w-fit overflow-hidden",
            isWon ? "bg-sky-500 text-white" : "bg-gray-100",
            data?.image ? " rounded-md p-0" : " rounded-full py-2 px-3"
          )}
        >
          {data?.image ? (
            <Image
              alt=" Image"
              height={"288"}
              width={"288"}
              src={data?.image}
              className=" object-cover cursor-pointer hover:scale-110 transition"
            />
          ) : (
            <div className="">{data?.body}</div>
          )}
        </div>
        {isLast && isWon && seenList.length >= 1 && (
          <div className="text-xs font-light text-gray-500">
            seen by {seenList}
          </div>
        )}
      </div>
    </div>
  );
};
export default MessageBox;
