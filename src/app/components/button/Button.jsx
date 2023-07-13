import PropsType from "prop-types";
import clsx from "clsx";
const Button = ({
  type,
  onClick,
  disabled,
  children,
  secondery,
  danger,
  fullWidth,
}) => {
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        `flex justify-center rounded-md px-3 py-2 text-sm font-semibold  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`,
        disabled && " opacity-50 cursor-default",
        danger &&
          " bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600 ",
        secondery
          ? "bg-gray-500 hover:bg-gray-600 focus-visible:outline-gray-600"
          : " text-white",
        fullWidth && "w-full",
        !danger &&
          !secondery &&
          "bg-sky-500 hover:bg-sky-600 focus-visible:bg-sky-600 "
      )}
    >
      {children}
    </button>
  );
};

// props Type
Button.PropsType = {
  type: PropsType.oneOf(["button", "submit", "reset"]),
  disabled: PropsType.bool,
  onClick: PropsType.func,
  children: PropsType.oneOfType([PropsType.string, PropsType.element]),
  secondery: PropsType.bool,
  danger: PropsType.bool,
  fullWidth: PropsType.bool,
};
export default Button;
