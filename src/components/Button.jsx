import { SendKeyEvents } from "@components/utils/SendKeyEvents";

function Button({
  href,
  children,
  onClick,
  eventName,
  category,
  label,
  value = 1,
  ...props
}) {
  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (eventName && category && label) {
      SendKeyEvents({ eventName, category, label, value });
    }
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

export default Button;
