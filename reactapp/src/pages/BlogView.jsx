import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import api from '../api/axiosClient'
import CommentSection from '../components/CommentSection'
import ReportModal from '../components/ReportModal'

const LoadingSkeleton = () => (
  <div className="max-w-4xl mx-auto animate-pulse">
    <div className="mb-6">
      <div className="h-4 bg-gray-700 rounded w-24 mb-4"></div>
      <div className="h-10 bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
        <div>
          <div className="h-4 bg-gray-700 rounded w-32 mb-2"></div>
          <div className="h-3 bg-gray-700 rounded w-24"></div>
        </div>
      </div>
    </div>
    <div className="space-y-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="h-4 bg-gray-700 rounded" style={{width: `${Math.random() * 40 + 60}%`}}></div>
      ))}
    </div>
  </div>
)

const ErrorMessage = ({ message, onRetry }) => (
  <div className="max-w-4xl mx-auto">
    <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-8 text-center backdrop-blur-sm">
      <div className="text-red-400 mb-4">
        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Post Not Found</h2>
      <p className="text-red-300 mb-6">{message}</p>
      <div className="space-x-4">
        <button 
          onClick={onRetry}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
        >
          Try Again
        </button>
        <Link 
          to="/"
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
        >
          Back to Home
        </Link>
      </div>
    </div>
  </div>
)

export default function BlogView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showReportModal, setShowReportModal] = useState(false)

  const fetchBlog = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.get(`/api/blogs/${id}`)
      setBlog(response.data)
    } catch (err) {
      console.error('Failed to fetch blog:', err)
      if (err.response?.status === 404) {
        setError('This blog post could not be found. It may have been deleted or moved.')
      } else {
        setError('Failed to load the blog post. Please check your connection and try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlog()
  }, [id])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatContent = (content) => {
    if (!content) return ''
    // Simple markdown-like formatting
    return content
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4 mt-8">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-3 mt-6">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mb-2 mt-4">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-800 px-2 py-1 rounded text-sm font-mono text-cyan-400">$1</code>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, '<br>')
  }

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchBlog} />
  }

  if (!blog) {
    return <ErrorMessage message="Blog post not found" onRetry={fetchBlog} />
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link 
          to="/" 
          className="text-cyan-400 hover:text-purple-400 transition-colors duration-200 flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all posts
        </Link>
      </nav>

      <article className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl shadow-2xl shadow-purple-500/10 overflow-hidden">
        {/* Header */}
        <div className="px-8 py-8 border-b border-purple-500/20">
          <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
            {blog.title}
          </h1>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mr-4 shadow-lg shadow-purple-500/30">
                <span className="text-white font-bold text-lg">
                  {blog.author?.charAt(0)?.toUpperCase() || 'A'}
                </span>
              </div>
              <div>
                <p className="font-semibold text-white">{blog.author}</p>
                <p className="text-sm text-gray-400">
                  Published on {formatDate(blog.createdAt)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-cyan-400 transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
              <button 
                onClick={() => setShowReportModal(true)}
                className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-200"
                title="Report this post"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-8">
          <div 
            className="prose prose-lg max-w-none text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: `<p class="mb-4">${formatContent(blog.contentMarkdown || blog.contentHtml || '')}</p>`
            }} 
          />
        </div>
      </article>

      <CommentSection blogId={id} blogAuthor={blog.author} blogTitle={blog.title} />

      {/* Actions */}
      <div className="mt-8 flex justify-center">
        <Link 
          to="/"
          className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl transition-all duration-300 font-medium transform hover:scale-105 shadow-lg shadow-cyan-500/25"
        >
          Read More Posts
        </Link>
      </div>

      <ReportModal 
        blogId={id} 
        isOpen={showReportModal} 
        onClose={() => setShowReportModal(false)} 
      />
    </div>
  )
}
