import clsx from "clsx";
import Link from "next/link";

const MobileSideberItem = ({ onClick, icon: Icon, active, href }) => {
  const ClickHundler = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <Link
      href={href}
      onClick={ClickHundler}
      className={clsx(
        `  group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100`,
        active && "bg-gray-100 text-gray-900"
      )}
    >
      <Icon className=" w-6 h-6" />
    </Link>
  );
};
export default MobileSideberItem;
