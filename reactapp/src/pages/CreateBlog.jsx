import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axiosClient'

export default function CreateBlog() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {}
    
    if (!title.trim()) {
      newErrors.title = 'Title is required'
    } else if (title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters long'
    }
    

    
    if (!content.trim()) {
      newErrors.content = 'Content is required'
    } else if (content.length < 50) {
      newErrors.content = 'Content must be at least 50 characters long'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      const response = await api.post('/api/blogs', {
        title: title.trim(),
        contentMarkdown: content.trim()
      })
      
      navigate(`/blogs/${response.data.id}`)
    } catch (err) {
      console.error('Failed to create blog:', err)
      if (err.response?.status === 401) {
        setErrors({ submit: 'Authentication failed. Please log in as admin.' })
      } else {
        setErrors({ submit: 'Failed to create blog post. Please try again.' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatPreview = (content) => {
    if (!content) return ''
    return content
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-3">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mb-2">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mb-2">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(/\n\n/g, '</p><p class="mb-3">')
      .replace(/\n/g, '<br>')
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <nav className="mb-4">
          <Link 
            to="/" 
            className="text-blogger-orange hover:text-orange-600 transition-colors duration-200 flex items-center font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to posts
          </Link>
        </nav>
        
        <h1 className="text-2xl font-semibold text-blogger-primary mb-2">Create post</h1>
      </div>

      <div className="blogger-card p-6">
        <form onSubmit={submit} className="space-y-6">

          {/* Title */}
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                if (errors.title) setErrors(prev => ({ ...prev, title: null }))
              }}
              className={`w-full px-0 py-3 text-3xl font-semibold border-0 border-b-2 bg-transparent focus:ring-0 focus:outline-none text-blogger-primary placeholder-gray-400 ${
                errors.title ? 'border-red-500' : 'border-gray-200 focus:border-blogger-orange'
              }`}
              placeholder="Title"
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.title}
              </p>
            )}
          </div>



          {/* Content */}
          <div>
            <textarea
              value={content}
              onChange={(e) => {
                setContent(e.target.value)
                if (errors.content) setErrors(prev => ({ ...prev, content: null }))
              }}
              rows={15}
              className={`w-full px-0 py-3 border-0 bg-transparent focus:ring-0 focus:outline-none text-blogger-primary placeholder-gray-400 resize-none ${
                errors.content ? 'border-red-500' : ''
              }`}
              placeholder="Tell your story..."
            />
            {errors.content && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.content}
              </p>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded p-4">
              <p className="text-sm text-red-700 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.submit}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-6 border-t">
            <div className="text-sm text-blogger-secondary">
              {content.length} characters
            </div>
            <div className="flex items-center space-x-3">
              <Link
                to="/"
                className="text-blogger-secondary hover:text-blogger-primary transition-colors duration-200 font-medium"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-orange px-6 py-2 rounded font-medium flex items-center disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publishing...
                  </>
                ) : (
                  'Publish'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>


    </div>
  )
}
