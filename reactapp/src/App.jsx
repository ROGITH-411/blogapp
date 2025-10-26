import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useTheme } from './contexts/ThemeContext'
import Home from './pages/Home'
import BlogView from './pages/BlogView'
import CreateBlog from './pages/CreateBlog'
import UserLogin from './pages/UserLogin'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import ReaderDashboard from './pages/ReaderDashboard'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'

export default function App() {
  const [user, setUser] = useState(null)
  const location = useLocation()
  const { isDark, toggleTheme } = useTheme()

  useEffect(() => {
    const auth = localStorage.getItem('basicAuth')
    const userType = localStorage.getItem('userType')
    if (auth && userType) {
      const credentials = atob(auth).split(':')
      const email = credentials[0]
      const firstName = email.split('@')[0].split('.')[0]
      setUser({ type: userType, email, firstName })
    }
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem('basicAuth')
    localStorage.removeItem('userType')
    setUser(null)
  }

  return (
    <div className="min-h-screen blogger-bg">
      <nav className="glass-effect sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-blogger-orange rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <span className="font-bold text-xl text-blogger-primary dark:text-white">InkFlow</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <label className="flex items-center cursor-pointer" title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
                <input
                  type="checkbox"
                  checked={isDark}
                  onChange={toggleTheme}
                  className="sr-only"
                />
                <div className="relative">
                  <div className={`block w-10 h-6 rounded-full transition-colors ${isDark ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                  <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isDark ? 'transform translate-x-4' : ''}`}></div>
                </div>
                <span className="ml-2 text-blogger-secondary text-sm">{isDark ? '🌙' : '☀️'}</span>
              </label>
              <Link 
                to="/" 
                className="text-blogger-secondary hover:text-blogger-primary dark:text-white dark:hover:text-gray-300 transition-colors duration-200 font-medium"
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-blogger-secondary hover:text-blogger-primary dark:text-white dark:hover:text-gray-300 transition-colors duration-200 font-medium"
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="text-blogger-secondary hover:text-blogger-primary dark:text-white dark:hover:text-gray-300 transition-colors duration-200 font-medium"
              >
                Contact Us
              </Link>
              

              
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-600 dark:bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.firstName?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <span className="text-sm text-current dark:text-white">
                      {user.firstName}
                    </span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="text-blogger-secondary hover:text-red-600 dark:text-white dark:hover:text-red-400 transition-colors duration-200 font-medium"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link 
                    to="/user-login" 
                    className="bg-transparent border-2 border-current text-current dark:text-white dark:border-white px-4 py-2 rounded-full font-semibold transition-all shadow-[0_0_15px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(0,0,0,0.6)] dark:shadow-[0_0_15px_rgba(255,255,255,0.4)] dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] hover:scale-105"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>



      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs/:id" element={<BlogView />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/reader-dashboard" element={<ReaderDashboard />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </main>

      <footer className="mt-16 bg-transparent animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4 animate-slide-in">
              <div className="w-8 h-8 bg-green-600 dark:bg-red-500 rounded-xl flex items-center justify-center animate-float hover:animate-spin">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <span className="font-bold text-current hover:text-green-600 dark:hover:text-red-500 transition-colors duration-300">InkFlow</span>
            </div>
            <p className="text-current opacity-60 text-sm hover:opacity-100 transition-opacity duration-300 animate-pulse">Where stories come to life.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
