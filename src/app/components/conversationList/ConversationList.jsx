"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useConversation from "@/hooks/useConversation";
import { MdOutlineGroupAdd } from "react-icons/md";
import clsx from "clsx";
import ConversationBox from "../conversationBox/ConversationBox";

const ConversationList = ({ initialItems, Alluser }) => {
  const [items, setItems] = useState(JSON.parse(initialItems));
  const router = useRouter();
  const { isOpen, conversationId } = useConversation();
  return (
    <aside
      className={clsx(
        `fixed inset-y-0 pb-20 lg:pb-20 lg:left-20 gl:w-20 lg:block overflow-y-auto border-r border-gray-200`,
        isOpen ? " hidden" : "block w-full left-0"
      )}
    >
      <div className="px-5">
        <div className="flex justify-between mt-4 pt-4">
          <div className="text-2xl font-bold text-neutral-800">Message</div>
          <div className="rounded-full bg-gray-100 cursor-pointer hover:opacity-75 transition">
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        <div className=" flex flex-col gap-5 mt-5">
          {items.map((item, i) => {
            return (
              <ConversationBox
                key={i}
                data={item}
                Alluser={Alluser}
                selected={conversationId === item._id}
              />
            );
          })}
        </div>
      </div>
    </aside>
  );
};
export default ConversationList;
