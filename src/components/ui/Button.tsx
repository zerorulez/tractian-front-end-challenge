import { clsx } from "clsx";

function Button({
  className,
  variant,
  size,
  selected,
  label,
  icon,
  handleClick,
}: {
  className?: string;
  variant?: string;
  size?: string;
  selected?: boolean;
  label: string;
  icon?: string;
  handleClick?: () => void;
}) {
  return (
    <button
      className={clsx(
        selected ? "bg-primary" : "bg-secondary",
        "py-1 px-2 rounded-sm flex items-center gap-2 font-semibold text-xs hover:bg-primary",
        className
      )}
      onClick={() => {
        if (handleClick) {
          handleClick();
        }
      }}
    >
      {icon && <img src={icon} alt={`Ícone ${label}`} />}
      {label}
    </button>
  );
}

export default Button;
