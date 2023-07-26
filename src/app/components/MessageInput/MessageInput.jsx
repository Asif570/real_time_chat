"use client";
const MessageInput = ({
  id,
  required,
  errors,
  type = "text",
  register,
  placeholder,
}) => {
  return (
    <div className=" relative w-full">
      <input
        className=" text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
};
export default MessageInput;
