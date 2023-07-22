"use client";

import useRoutes from "@/hooks/useRoutes";
import DesktopItem from "../desktopIcon/DesktopItem";
import { useState } from "react";
import Avatar from "../avatar/Avatar";

const DesktopSidebar = ({ currentUser }) => {
  const routers = useRoutes();

  const [isOpen, setIsOpen] = useState();
  const user = JSON.parse(currentUser);
  return (
    <div className=" hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20  xl:px-6 lg:overflow-y-auto lg:bg-white lg:boredr-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
      <nav className=" flex flex-col justify-between mt-4">
        <ul role="list" className=" flex flex-col items-center space-y-1">
          {routers.map((item, i) => {
            return (
              <DesktopItem
                key={i}
                label={item.lable}
                href={item.href}
                icon={item.icon}
                active={item.active}
                onClick={item.onClick}
              />
            );
          })}
        </ul>
      </nav>

      <nav className=" mt-4 flex flex-col justify-center items-center">
        <div
          className=" cursor-pointer hover:opacity-75 transition"
          onClick={() => setIsOpen(true)}
        >
          <Avatar user={user} />
        </div>
      </nav>
    </div>
  );
};
export default DesktopSidebar;
