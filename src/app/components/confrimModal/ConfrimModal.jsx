"use client";
import useConversation from "@/hooks/useConversation";
import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "../modal/Modal";
import { useRouter } from "next/navigation";
import { FiAlertTriangle } from "react-icons/fi";
import { Dialog } from "@headlessui/react";
import Button from "../button/Button";
const ConfrimModal = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsloading] = useState(false);
  const onDelete = useCallback(() => {
    setIsloading(true);
    axios
      .post(`/api/conversation/${conversationId}/delete`, { conversationId })
      .then((data) => {
        onClose();
        router.push("/conversations");
        router.refresh();
      })
      .catch((error) => {
        console.log(error);
        toast.error("something went wrong");
      })
      .finally(() => {
        setIsloading(false);
      });
  }, [conversationId, router]);
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className="sm:flex sm:items-start">
        <div className="flex mx-auto h-12 w-12 flex-shrink-0 items-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <FiAlertTriangle className="w-6 h-6 text-red-600" />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as={"h3"}
            className={" text-base font-semibold leading-6 text-gray-900"}
          >
            Delete Conversation
          </Dialog.Title>
          <div className="mt-2">
            <p className=" text-sm text-gray-500">
              Are you sure you want to delete this Conversation ? This action
              Cannot be undone
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-2">
        <Button disabled={isLoading} danger onClick={onDelete}>
          Delete
        </Button>
        <Button disabled={isLoading} secondery onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};
export default ConfrimModal;
