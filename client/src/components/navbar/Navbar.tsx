import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/images/logo.png';


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-gray-800 text-white">
      <nav className="px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
        
        
        <div className="flex items-center justify-between">
          <div className="w-20">
            <img src={logo} alt="Logo" className="w-full" />
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        
        <ul
          className={`flex flex-col md:flex-row gap-4 mt-4 md:mt-0 transition-all duration-300 ${
            menuOpen ? 'block' : 'hidden'
          } md:flex`}
        >
          <li className="hover:bg-gray-600 px-4 py-2 rounded transition">
            <a href="/home">Home</a>
          </li>
          <li className="hover:bg-gray-600 px-4 py-2 rounded transition">
            <a href="/about">About</a>
          </li>
          <li className="hover:bg-gray-600 px-4 py-2 rounded transition">
            <a href="/services">Services</a>
          </li>
          <li className="hover:bg-gray-600 px-4 py-2 rounded transition">
            <a href="/contact">Contact</a>
          </li>
          <li className="hover:bg-gray-600 px-4 py-2 rounded transition">
            <a
              href="/login"
              className="bg-blue-600 text-white block px-4 py-2 rounded transition"
            >
              Login
            </a>
          </li>
          <li className="hover:bg-gray-600 px-4 py-2 rounded transition">
            <a
              href="/register"
              className="bg-blue-600 text-white block px-4 py-2 rounded transition"
            >
              Register
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
