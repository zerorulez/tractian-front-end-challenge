import { clsx } from "clsx";

function Button({
  className,
  variant,
  selected,
  label,
  Icon,
  handleClick,
}: {
  className?: string;
  variant: "nav" | "outline";
  selected?: boolean;
  label: string;
  Icon?: () => JSX.Element;
  handleClick?: () => void;
}) {
  return (
    <button
      className={clsx(
        variant === "nav" &&
          `bg-blue-900 py-1 px-2 rounded-sm flex items-center gap-2 font-semibold text-xs hover:bg-blue-500`,
        variant === "outline" &&
          `font-semibold text-gray-600 text-sm bg-[#ffffff] border border-gray-200 rounded-[3px] flex items-center py-[6px] px-4 gap-[6px] hover:bg-blue-500 hover:text-[#ffffff] group`,
        selected && "!bg-blue-500 !text-[#ffffff]",
        className
      )}
      onClick={() => {
        if (handleClick) {
          handleClick();
        }
      }}
    >
      {Icon && (
        <div
          className={clsx(
            variant === "outline" && "text-blue-500 group-hover:text-[#ffffff]",
            selected && "!text-[#ffffff]"
          )}
        >
          <Icon />
        </div>
      )}
      {label}
    </button>
  );
}

export default Button;
