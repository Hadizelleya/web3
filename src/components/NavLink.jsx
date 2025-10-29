import React from "react";
import { Link } from "react-router-dom";

export default function NavLink({
  link,
  location,
  isMobileLink = false,
  setIsOpen,
}) {
  return (
    <Link
      to={link.path}
      onClick={() => {
        isMobileLink ? setIsOpen(false) : null;
      }}
      className={`hover:text-(--color-primary) transition-colors duration-300 ease-in text-xl ${
        location.pathname === link.path
          ? "text-(--color-secondary)"
          : "text-(--color-white)"
      }`}
    >
      {link.name}
    </Link>
  );
}
