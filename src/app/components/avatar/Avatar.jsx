import Image from "next/image";

const Avatar = ({ user }) => {
  return (
    <div className=" relative">
      <div className="h-9 w-9 md:h-11 md:w-11 relative rounded-full overflow-clip inline-block">
        <Image
          alt="avatar"
          src={user?.image || "/image_placeholder.jpg"}
          fill
          sizes="full "
        />
      </div>
      <span className=" absolute block rounded-full  bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3" />
    </div>
  );
};
export default Avatar;
