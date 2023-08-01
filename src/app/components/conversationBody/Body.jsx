"use client";
import useConversation from "@/hooks/useConversation";
import { useEffect, useRef, useState } from "react";
import MessagesBox from "../messagesBox/MessageBox";
import axios from "axios";

const Body = ({ initialMessages, currentUser }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef(null);
  const { conversationId } = useConversation();
  useEffect(() => {
    axios
      .post(`/api/conversation/${conversationId}/seen`, {
        currentUser: JSON.parse(currentUser),
        conversationId: conversationId,
      })
      .then((data) => console.log(data));
  }, [conversationId]);
  return (
    <div className=" flex-1 overflow-y-auto">
      {messages.map((message, i) => {
        return (
          <MessagesBox
            key={i}
            isLast={i === messages.length - 1}
            data={message}
          />
        );
      })}
      <div ref={bottomRef} className=" pt-24" />
    </div>
  );
};
export default Body;
