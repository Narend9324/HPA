import { MenuOutlined, BellOutlined } from "@ant-design/icons";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#0C1F3D] px-4 py-3 md:px-8 md:py-4 flex items-center justify-between">
      {/* Left Section: Logo */}
      <div className="flex items-center space-x-8">
        <img
          src="/TransparentLogo.svg"
          alt="HPA Logo"
          className="h-10 md:h-12"
        />
        {/* <span className="text-white text-xl font-bold ml-2">HPA</span> */}

        {/* Middle Section: Links (Hidden on small screens) */}
        <div className="hidden md:flex space-x-8 text-white font-semibold">
          <a href="/dashboard" className="hover:text-gray-300">
            Dashboard
          </a>
          <a href="/portal" className="hover:text-gray-300">
            Portal
          </a>
          <a href="/nado-ai" className="hover:text-gray-300">
            Nado AI
          </a>
          <a href="/courses" className="hover:text-gray-300">
            Courses
          </a>
          <a href="/staff-members" className="hover:text-gray-300">
            Staff Members
          </a>
          <a href="/subscription" className="hover:text-gray-300">
            Subscription
          </a>
        </div>
      </div>

      {/* Right Section: Notification and Profile */}
      <div className="flex items-center space-x-4">
        <button className="text-white">
          <BellOutlined className="text-xl" />
        </button>
        <div className="flex items-center">
          <img
            src="/path/to/profile-picture.jpg"
            alt="Profile"
            className="h-8 w-8 rounded-full object-cover"
          />
        </div>
        {/* Menu Icon for small screens */}
        <button
          className="text-white md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <MenuOutlined className="text-xl" />
        </button>
      </div>

      {/* Mobile Menu (Visible on small screens) */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[#0C1F3D] text-white flex flex-col space-y-4 px-4 py-4 md:hidden">
          <a href="/dashboard" className="hover:text-gray-300">
            Dashboard
          </a>
          <a href="/portal" className="hover:text-gray-300">
            Portal
          </a>
          <a href="/nado-ai" className="hover:text-gray-300">
            Nado AI
          </a>
          <a href="/courses" className="hover:text-gray-300">
            Courses
          </a>
          <a href="/staff-members" className="hover:text-gray-300">
            Staff Members
          </a>
          <a href="/subscription" className="hover:text-gray-300">
            Subscription
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
