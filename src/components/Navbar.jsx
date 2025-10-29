import React, { useEffect, useState } from "react";
import logo from "../assets/video-editing-app.png";
import { Link, useLocation } from "react-router-dom";
import NavLink from "./NavLink";
import { IoMdCloseCircle } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import Button from "./Button";
import { IoLogIn } from "react-icons/io5";

const links = [
  {
    name: "Movies",
    path: "/",
  },
  {
    name: "Genres",
    path: "/genres",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className=" relative flex items-center justify-between p-4 px-10 gap-10 bg-(--color-bg)">
      <Link to={"/"} className="flex gap-4 items-center">
        <img src={logo} alt="logo" className="w-[40px] invert-100" />
        <h2 className="text-2xl text-(--color-primary) font-bold">Netlify</h2>
      </Link>

      {/* search bar */}
      <div className="w-full md:flex hidden items-center">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search By Movie Name..."
          className="bg-(--color-white) w-full max-w-xl mx-auto text-xl p-2 border-none outline-0 rounded-md"
        />
      </div>

      {/* desktop navigation */}
      <div className="md:flex hidden gap-3 items-center">
        <nav className="flex items-center justify-center gap-5 list-none">
          {links.map((link) => (
            <NavLink key={link.name} link={link} location={location} />
          ))}
        </nav>

        <Button text={"Login"} icon={<IoLogIn />} styles={" border-4"} />
      </div>

      {/* mobile buttons */}
      <button
        className="md:hidden cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? (
          <IoMdCloseCircle className="text-3xl text-(--color-white)" />
        ) : (
          <GiHamburgerMenu className="text-3xl text-(--color-white)" />
        )}
      </button>

      {/* mobile navigation menu */}
      <nav
        className={`absolute invisible opacity-0 top-[100%] p-2 bg-(--color-bg) -right-[100%] w-full z-20 flex flex-col items-center justify-center gap-5 transition-all duration-200 ease-in ${
          isOpen ? "visible opacity-100 right-0" : ""
        }`}
      >
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Movie By Name..."
          className="bg-(--color-white) w-full max-w-xl mx-auto p-2 rounded-md border-none outline-0 text-xl px-4"
        />

        {links.map((link) => (
          <NavLink
            key={link.name}
            link={link}
            location={location}
            isMobileLink
            setIsOpen={setIsOpen}
          />
        ))}
      </nav>
    </div>
  );
}
