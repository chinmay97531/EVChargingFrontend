import React from 'react'
import Navbar from './Navbar'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      <Navbar />
      <main className="flex-1 animate-fade-in">
        {children}
      </main>
      <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-indigo-900 text-gray-300 py-12 mt-16 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-indigo-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <h3 className="text-xl font-bold text-white mb-4">⚡ EVParking</h3>
              <p className="text-gray-400 mb-4">
                Revolutionizing electric vehicle charging with smart, sustainable solutions for a greener future.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  📘
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  🐦
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  💼
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="/vehicles" className="text-gray-400 hover:text-white transition-colors">Vehicles</a></li>
                <li><a href="/bookings" className="text-gray-400 hover:text-white transition-colors">Bookings</a></li>
                <li><a href="/stats" className="text-gray-400 hover:text-white transition-colors">Statistics</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700/50 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2025 EVParking. All rights reserved. Built with <span className="text-pink-400 animate-pulse">❤️</span> for sustainable mobility.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
