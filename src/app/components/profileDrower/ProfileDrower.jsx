import useOtherUser from "@/hooks/useOtherUser";
import { Dialog, Transition } from "@headlessui/react";
import { format } from "date-fns";
import { Fragment, useMemo, useState } from "react";
import { IoClose, IoTrash } from "react-icons/io5";
import Avatar from "../avatar/Avatar";
import ConfrimModal from "../confrimModal/ConfrimModal";
const ProfileDrower = ({ onClose, data, isOpen = false }) => {
  const otherUser = useOtherUser(data);
  const [confrimModalOpen, setconfrimModalOpen] = useState(false);
  const joinDate = useMemo(() => {
    return format(new Date(otherUser.createAt), "PP");
  }, [otherUser.createAt]);
  const title = data.name || otherUser.name;

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return ` ${data.userIds.length} members`;
    }
    return "Active";
  }, []);
  return (
    <>
      <ConfrimModal
        isOpen={confrimModalOpen}
        onClose={() => setconfrimModalOpen(false)}
      />

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as={"div"} className={" relative z-50"} onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter=" ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave=" ease-in duration-500 "
            leaveFrom=" opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="fixed pointer-events-none inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter=" transform transition ease-in-out duration-500"
                  leave=" transform transition ease-in-out duration-500"
                  enterFrom=" translate-x-full"
                  leaveTo=" translate-x-full"
                  enterTo="translate-x-0"
                >
                  <Dialog.Panel
                    className={" pointer-events-auto w-screen max-w-md"}
                  >
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6  ">
                        <div className="flex items-center justify-end">
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              onClick={onClose}
                              type="button"
                              className=" rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                            >
                              <span className=" sr-only">Close Pnal</span>
                              <IoClose size={24} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 mt-6 relative px-4 sm:px-6">
                        <div className="flex flex-col items-center gap-3">
                          <div className="mb-2">
                            <Avatar user={otherUser} />
                          </div>
                          <div className="">{title}</div>
                          <div className=" text-gray-500 text-sm mb-2">
                            {statusText}
                          </div>
                          <div
                            onClick={() => setconfrimModalOpen(true)}
                            className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75"
                          >
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                              <IoTrash size={24} />
                            </div>
                            <div className="text-sm font-light text-gray-500">
                              Delete
                            </div>
                          </div>
                        </div>
                        <div className="pt-5 pb-5 w-full sm:px-0 sm:pt-0">
                          <dl className=" space-y-8 sm:space-y-6 px-4 sm:px-6">
                            {!data?.isGroup && (
                              <div>
                                <dt className=" text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                  Email
                                </dt>
                                <dd className=" mt-1 text-sm text-gray-900 sm:col-span-2">
                                  {otherUser?.email}
                                </dd>
                              </div>
                            )}{" "}
                            {!data?.isGroup && (
                              <div>
                                <dt className=" text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                  Joined
                                </dt>
                                <dd className=" mt-1 text-sm text-gray-900 sm:col-span-2">
                                  <time dateTime={joinDate}>{joinDate}</time>
                                </dd>
                              </div>
                            )}
                          </dl>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
export default ProfileDrower;
