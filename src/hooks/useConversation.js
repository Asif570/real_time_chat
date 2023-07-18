"use client";
import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
  const perams = useParams();

  const conversationId = useMemo(() => {
    if (!perams?.conversationId) {
      return false;
    }

    return perams.conversationId;
  }, [perams?.conversationId]);

  const isOpen = useMemo(() => {
    return !!conversationId;
  }, [conversationId]);

  return {
    isOpen,
    conversationId,
  };
};
export default useConversation;
