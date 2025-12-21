import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, LogOut, BarChart3, Car, CreditCard, MapPin, BookOpen, User } from 'lucide-react'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    navigate('/auth')
  }

  const isActive = (path: string) => location.pathname === path

  const links = [
    { to: '/', label: 'Dashboard', icon: MapPin },
    { to: '/vehicles', label: 'Vehicles', icon: Car },
    { to: '/bookings', label: 'Bookings', icon: BookOpen },
    { to: '/payment', label: 'Payment', icon: CreditCard },
    { to: '/stats', label: 'Statistics', icon: BarChart3 },
    { to: '/profile', label: 'Profile', icon: User },
  ]

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center gap-2">
              <span className="text-3xl animate-pulse">⚡</span>
              <span>EVParking</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(to)
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 ml-2"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {links.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition ${
                  isActive(to)
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </div>
              </Link>
            ))}
            <button
              onClick={() => {
                handleLogout()
                setIsOpen(false)
              }}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 transition"
            >
              <div className="flex items-center">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </div>
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar