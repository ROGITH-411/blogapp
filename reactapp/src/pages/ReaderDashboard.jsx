import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axiosClient'
import Pagination from '../components/Pagination'

const BlogCard = ({ blog }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getExcerpt = (content) => {
    if (!content) return 'No content available...'
    const plainText = content.replace(/[#*`]/g, '').trim()
    return plainText.length > 200 ? plainText.slice(0, 200) + '...' : plainText
  }

  return (
    <article className="bg-transparent rounded-xl p-6 mb-6 animate-fade-in card-hover">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-green-600 dark:bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-semibold text-sm">
            {blog.author?.charAt(0)?.toUpperCase() || 'A'}
          </span>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-medium text-current">{blog.author}</span>
            <span className="text-current opacity-50 text-sm">·</span>
            <time className="text-current opacity-50 text-sm" dateTime={blog.createdAt}>
              {formatDate(blog.createdAt)}
            </time>
          </div>
          
          <Link to={`/blogs/${blog.id}`} className="block group">
            <h2 className="text-xl font-semibold text-current group-hover:text-green-600 dark:group-hover:text-red-500 transition-colors duration-200 mb-3 line-clamp-2">
              {blog.title}
            </h2>
          </Link>
          
          <p className="text-current opacity-70 leading-relaxed mb-4">
            {getExcerpt(blog.contentMarkdown)}
          </p>
          
          <div className="flex items-center justify-between">
            <Link 
              to={`/blogs/${blog.id}`}
              className="bg-transparent border-2 border-current text-current px-6 py-2 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 dark:hover:bg-red-500/20 hover:bg-green-500/20 shadow-[0_0_15px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(0,0,0,0.6)] dark:shadow-[0_0_15px_rgba(255,255,255,0.4)] dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.6)]"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function ReaderDashboard() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [pageSize] = useState(5)
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('desc')

  const fetchBlogs = async (page = 0, sort = sortBy, order = sortOrder) => {
    try {
      setLoading(true)
      const response = await api.get(`/api/blogs?page=${page}&size=${pageSize}&sort=${sort},${order}`)
      const data = response.data
      setBlogs(data.content || [])
      setTotalPages(data.totalPages || 0)
      setCurrentPage(page)
    } catch (err) {
      console.error('Failed to fetch blogs:', err)
      setBlogs([])
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page) => {
    fetchBlogs(page)
  }

  useEffect(() => {
    fetchBlogs(0, sortBy, sortOrder)
  }, [sortBy, sortOrder])

  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-current mb-4">
              Start <span className="text-green-600 dark:text-red-500">Reading</span>
            </h1>
            <p className="text-current opacity-80 text-lg">
              Discover amazing stories and insights from our community of writers
            </p>
          </div>
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              <label className="text-current text-sm font-medium">Sort by:</label>
              <select 
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-')
                  setSortBy(field)
                  setSortOrder(order)
                  setCurrentPage(0)
                  fetchBlogs(0, field, order)
                }}
                className="bg-transparent border border-current text-current px-3 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-red-500"
              >
                <option value="createdAt-desc" className="bg-white dark:bg-black text-black dark:text-white">Newest First</option>
                <option value="createdAt-asc" className="bg-white dark:bg-black text-black dark:text-white">Oldest First</option>
                <option value="title-asc" className="bg-white dark:bg-black text-black dark:text-white">Title A-Z</option>
                <option value="title-desc" className="bg-white dark:bg-black text-black dark:text-white">Title Z-A</option>
                <option value="author-asc" className="bg-white dark:bg-black text-black dark:text-white">Author A-Z</option>
                <option value="author-desc" className="bg-white dark:bg-black text-black dark:text-white">Author Z-A</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex space-x-4">
                  <div className="w-12 h-12 bg-current opacity-20 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-current opacity-20 rounded w-1/4"></div>
                    <div className="h-6 bg-current opacity-20 rounded w-3/4"></div>
                    <div className="h-4 bg-current opacity-20 rounded w-full"></div>
                    <div className="h-4 bg-current opacity-20 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : blogs.length > 0 ? (
          <>
            <div className="space-y-6">
              {blogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-600 dark:bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-current mb-2">No posts available</h3>
            <p className="text-current opacity-70 mb-6">Check back later for new content from our writers.</p>
          </div>
        )}
      </div>
    </div>
  )
}