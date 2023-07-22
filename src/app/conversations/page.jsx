"use client";

import useConversation from "@/hooks/useConversation";
import clsx from "clsx";
import EmptyState from "../components/emptyState/EmptyState";

const conversations = () => {
  const { isOpen } = useConversation();
  return (
    <div
      className={clsx("lg:pl-80 h-full  lg:block", isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
};
export default conversations;
