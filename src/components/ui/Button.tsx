import { clsx } from "clsx";
import { ButtonProps } from "@/types";

const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  selected = false,
  label,
  Icon,
  handleClick = () => {},
}) => {
  const baseClasses = clsx(
    "flex items-center gap-2 font-semibold", // Common styling for all buttons
    variant === "nav" &&
      "bg-blue-900 py-1 px-2 rounded-sm text-xs hover:bg-blue-500", // Styles for 'nav' variant
    variant === "outline" &&
      "bg-[#ffffff] text-gray-600 border border-gray-200 rounded-[3px] py-[6px] px-4 text-sm hover:bg-blue-500 hover:text-[#ffffff] group", // Styles for 'outline' variant
    selected && "!bg-blue-500 !text-[#ffffff]", // Styles when button is selected
    className
  );

  const iconClasses = clsx(
    variant === "outline" && "text-blue-500 group-hover:text-[#ffffff]", // Icon color for 'outline' variant
    selected && "!text-[#ffffff]" // Icon color when button is selected
  );

  return (
    <button className={baseClasses} onClick={handleClick}>
      {Icon && (
        <div className={iconClasses}>
          <Icon />
        </div>
      )}
      {label}
    </button>
  );
};

export default Button;
