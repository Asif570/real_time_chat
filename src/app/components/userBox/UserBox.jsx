"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Avatar from "../avatar/Avatar";

const UserBox = ({ data }) => {
  const user = JSON.parse(data);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const hundleClick = useCallback(() => {
    setLoading(true);
    axios
      .post("/api/conversations", {
        userId: user._id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data._id}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, router]);
  return (
    <div
      onClick={hundleClick}
      className=" w-full relative flex items-center  space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer"
    >
      <Avatar user={user} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1  ">
            <p className="text-sm font-semibold text-gray-900 capitalize">
              {user.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserBox;
