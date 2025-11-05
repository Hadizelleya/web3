import React from "react";
import { Link } from "react-router-dom";

function Button({
  text,
  icon,
  onClick,
  styles,
  isLink = false,
  url,
  isBlank = true,
}) {
  return (
    <div>
      {isLink && url !== "" ? (
        <Link
          to={url}
          target={isBlank ? "_blank" : "_self"}
          className={`flex items-center justify-center cursor-pointer gap-2 border-(--color-primary)/50 border p-2 rounded-md ${styles}`}
        >
          <button className="text-(--color-primary) cursor-pointer">
            {text}
          </button>
          {icon && <i className="text-(--color-primary) text-xl">{icon}</i>}
        </Link>
      ) : (
        <div
          onClick={onClick}
          className={`flex items-center justify-center cursor-pointer gap-2 border-(--color-primary)/50 border p-2 rounded-md ${styles}`}
        >
          <button className="text-(--color-primary) cursor-pointer">
            {text}
          </button>
          {icon && <i className="text-(--color-primary) text-xl">{icon}</i>}
        </div>
      )}
    </div>
  );
}

export default Button;
