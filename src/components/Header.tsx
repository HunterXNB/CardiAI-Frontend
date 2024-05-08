import { Link } from "react-router-dom";

import ProfilePopover from "./ProfilePopover";

function Header() {
  return (
    <header className=" bg-primary-blue sticky top-0 z-50 w-screen">
      <div className="container py-2 flex items-center justify-between">
        <Link to={"/"}>
          <img src="/Logo.svg" className="brightness-0 invert" alt="Logo" />
        </Link>
        {/* User Box */}
        {/* <div className="size-7 cursor-pointer hover:bg-white/40 transition duration-500 rounded-full bg-white/15 backdrop-blur-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]" /> */}

        <ProfilePopover />
      </div>
    </header>
  );
}

export default Header;
