import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axiosClient'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
        localStorage.setItem('userType', 'admin')
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
          <div className="w-16 h-16 bg-blogger-orange rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-current mb-2">Welcome to InkFlow</h1>
          <p className="text-current opacity-70">Sign in as Writer</p>
        </div>

        <div className="bg-transparent rounded-3xl p-8 border-2 border-current/20">
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
                className="w-full px-4 py-3 bg-transparent border-2 border-current/30 rounded-xl focus:ring-2 focus:ring-current focus:border-current transition-all text-current placeholder-current/50 backdrop-blur-sm hover:border-current/50"
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
                className="w-full px-4 py-3 bg-transparent border-2 border-current/30 rounded-xl focus:ring-2 focus:ring-current focus:border-current transition-all text-current placeholder-current/50 backdrop-blur-sm hover:border-current/50"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-transparent border-2 border-current text-current dark:hover:bg-red-500/20 hover:bg-green-500/20 py-4 px-6 rounded-full font-semibold disabled:opacity-50 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(0,0,0,0.8)] dark:shadow-[0_0_20px_rgba(255,255,255,0.5)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.8)] transition-all duration-300"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <p className="text-current opacity-70 text-sm">
              Just want to read? 
              <Link to="/user-login" className="text-current hover:underline ml-1 font-medium">
                Sign in as Reader
              </Link>
            </p>
            <p className="text-current opacity-70 text-sm">
              Don't have an account? 
              <Link to="/register" className="text-current hover:underline ml-1 font-medium">
                Create Account
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}
