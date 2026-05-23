import { Link } from "react-router-dom"
import { useState } from "react"
import { Menu, X } from "lucide-react"

function Navbar() {

  const [open, setOpen] = useState(false)

  return (

    <nav className="sticky top-4 z-50 px-4 md:px-6">

      <div className="flex justify-between items-center px-6 py-4 border border-cyan-400/10 bg-white/5 backdrop-blur-md rounded-full">

        {/* Logo */}
        <h1 className="text-xl md:text-2xl font-bold text-cyan-400 tracking-widest">
          NeuroSphere
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-gray-300">

          <Link to="/">
            <li className="hover:text-cyan-400 cursor-pointer transition">
              Home
            </li>
          </Link>

          <Link to="/dashboard">
            <li className="hover:text-cyan-400 cursor-pointer transition">
              Dashboard
            </li>
          </Link>

          <Link to="/chat">
            <li className="hover:text-cyan-400 cursor-pointer transition">
              AI Chat
            </li>
          </Link>

        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-cyan-400"
        >
          {open ? <X /> : <Menu />}
        </button>

      </div>

      {/* Mobile Menu */}
      {open && (

        <div className="md:hidden mt-4 bg-black/80 border border-cyan-400/10 rounded-3xl p-6 backdrop-blur-xl">

          <ul className="flex flex-col gap-6 text-gray-300">

            <Link to="/" onClick={() => setOpen(false)}>
              <li className="hover:text-cyan-400">
                Home
              </li>
            </Link>

            <Link to="/dashboard" onClick={() => setOpen(false)}>
              <li className="hover:text-cyan-400">
                Dashboard
              </li>
            </Link>

            <Link to="/chat" onClick={() => setOpen(false)}>
              <li className="hover:text-cyan-400">
                AI Chat
              </li>
            </Link>

          </ul>

        </div>

      )}

    </nav>
  )
}

export default Navbar