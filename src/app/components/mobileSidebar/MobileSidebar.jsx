"use client";

import useRoutes from "@/hooks/useRoutes";
import MobileSideberItem from "../mobileSideberItem/MobileSideberItem";

const MobileSidebar = () => {
  const routes = useRoutes();
  return (
    <div className=" fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
      {routes.map((route, i) => (
        <MobileSideberItem
          key={i}
          lable={route.lable}
          active={route.active}
          onClick={route.onClick}
          href={route.href}
          icon={route.icon}
        />
      ))}
    </div>
  );
};
export default MobileSidebar;
