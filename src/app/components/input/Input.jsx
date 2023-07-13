"use client";

import clsx from "clsx";

const Input = ({
  id,
  title,
  type = "text",
  placeholder = "",
  disabled = false,
  required = false,
  errors = [],
  register,
}) => {
  return (
    <div className=" w-full relative">
      <label htmlFor={id} className=" font-semibold text-gray-900 ">
        {title}
      </label>
      <input
        {...register(id)}
        type={type}
        placeholder={placeholder}
        className={clsx(
          `mt-2 w-full rounded-md p-1.5  border-0  ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 outline-none `,
          errors[id] && "focus:ring-rose-500",
          disabled && " opacity-50"
        )}
        disabled={disabled}
        required={required}
        autoComplete={id}
      />
    </div>
  );
};
export default Input;
