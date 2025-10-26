import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.email.trim() || !formData.password.trim() || !formData.confirmPassword.trim()) {
      setError('Please fill in all fields')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('https://blogapp-production-66d9.up.railway.app/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password.trim(),
          userType: 'user'
        })
      })
      
      if (response.ok) {
        alert('Registration successful! Please login with your email and password.')
        navigate('/user-login')
      } else {
        const data = await response.json()
        setError(data.error || 'Registration failed')
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 animate-float">
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-current mb-2">Create Account</h1>
          <p className="text-current opacity-70">Join InkFlow community</p>
        </div>

        <div className="bg-transparent rounded-3xl p-8 border border-current/10 dark:border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-current mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-transparent border border-current/20 dark:border-white/20 rounded-xl focus:ring-2 focus:ring-green-500 dark:focus:ring-red-500 focus:border-green-500 dark:focus:border-red-500 transition-all text-current placeholder-current/50 backdrop-blur-sm hover:border-current/40 dark:hover:border-white/40"
                placeholder="Create a password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-current mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-transparent border border-current/20 dark:border-white/20 rounded-xl focus:ring-2 focus:ring-green-500 dark:focus:ring-red-500 focus:border-green-500 dark:focus:border-red-500 transition-all text-current placeholder-current/50 backdrop-blur-sm hover:border-current/40 dark:hover:border-white/40"
                placeholder="Confirm your password"
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
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-current opacity-70 text-sm">
              Already have an account? 
              <Link to="/user-login" className="text-current hover:underline ml-1 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}