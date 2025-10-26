import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function UserLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const auth = localStorage.getItem('basicAuth')
    if (auth) {
      navigate('/')
    }
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!username.trim() || !password.trim()) {
      setError('Please enter both email and password')
      return
    }

    setIsSubmitting(true)
    
    try {
      const response = await fetch('https://blogapp-production-66d9.up.railway.app/api/blogs?page=0&size=1', {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + btoa(`${username.trim()}:${password.trim()}`),
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        localStorage.setItem('basicAuth', btoa(`${username.trim()}:${password.trim()}`))
        localStorage.setItem('userType', 'user')
        navigate('/')
      } else if (response.status === 401) {
        setError('Invalid email or password')
      } else {
        setError('Login failed. Server error: ' + response.status)
      }
    } catch (err) {
      console.error('Login failed:', err)
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 animate-float">
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-current mb-2">Sign In</h1>
          <p className="text-current opacity-70">Welcome back to InkFlow</p>
        </div>

        <div className="bg-transparent rounded-3xl p-8 border border-current/10 dark:border-white/10">
          <form onSubmit={submit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-current mb-2">
                Email
              </label>
              <input
                type="email"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  if (error) setError('')
                }}
                className="w-full px-4 py-3 bg-transparent border border-current/20 dark:border-white/20 rounded-xl focus:ring-2 focus:ring-green-500 dark:focus:ring-red-500 focus:border-green-500 dark:focus:border-red-500 transition-all text-current placeholder-current/50 backdrop-blur-sm hover:border-current/40 dark:hover:border-white/40"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-current mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (error) setError('')
                }}
                className="w-full px-4 py-3 bg-transparent border border-current/20 dark:border-white/20 rounded-xl focus:ring-2 focus:ring-green-500 dark:focus:ring-red-500 focus:border-green-500 dark:focus:border-red-500 transition-all text-current placeholder-current/50 backdrop-blur-sm hover:border-current/40 dark:hover:border-white/40"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4">
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-transparent border border-current/30 dark:border-white/30 text-current hover:border-green-500 dark:hover:border-red-500 hover:bg-green-500/10 dark:hover:bg-red-500/10 py-4 px-6 rounded-full font-semibold disabled:opacity-50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-current/5 border border-current/10 dark:border-white/10 rounded-lg">
            <p className="text-sm text-current opacity-70 text-center">
              Use the credentials you created during registration
            </p>
          </div>

          <div className="mt-6 text-center space-y-4">

            <p className="text-current opacity-70 text-sm">
              Don't have an account? 
              <Link to="/register" className="text-current hover:underline ml-1 font-medium">
                Register here
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}