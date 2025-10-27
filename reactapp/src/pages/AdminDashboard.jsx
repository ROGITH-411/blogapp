import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axiosClient'
import BlogModal from '../components/BlogModal'
import Pagination from '../components/Pagination'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('blogs')
  const [comments, setComments] = useState([])
  const [reports, setReports] = useState([])
  const [blogs, setBlogs] = useState([])
  const [blogComments, setBlogComments] = useState({})
  const [blogReports, setBlogReports] = useState({})
  const [loading, setLoading] = useState(true)
  const [expandedBlog, setExpandedBlog] = useState(null)
  const [expandedSection, setExpandedSection] = useState(null)
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [showBlogModal, setShowBlogModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [pageSize] = useState(5)
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('desc')


  const handlePageChange = (page) => {
    fetchData(page)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async (page = 0, sort = sortBy, order = sortOrder) => {
    try {
      setLoading(true)
      const auth = localStorage.getItem('basicAuth') || btoa('admin:adminpass')
      const userType = localStorage.getItem('userType')
      
      // Get current user's email for filtering (users only see their own blogs)
      let authorFilter = ''
      if (auth) {
        const credentials = atob(auth).split(':')
        const userEmail = credentials[0]
        authorFilter = `&author=${encodeURIComponent(userEmail)}`
      }
      
      // Fetch blogs with pagination and sorting
      const blogsResponse = await fetch(`https://blogapp-production-66d9.up.railway.app/api/blogs?page=${page}&size=${pageSize}&sort=${sort},${order}${authorFilter}`, {
        headers: { 'Authorization': `Basic ${auth}` }
      })
      
      if (!blogsResponse.ok) {
        throw new Error(`Failed to fetch blogs: ${blogsResponse.status}`)
      }
      
      const blogsData = await blogsResponse.json()
      const blogsList = blogsData.content || []
      setBlogs([...blogsList])
      setTotalPages(blogsData.totalPages || 0)
      setCurrentPage(page)
      
      // Fetch all reports
      let allReports = []
      try {
        const reportsResponse = await fetch('https://blogapp-production-66d9.up.railway.app/api/reports', {
          headers: { 'Authorization': `Basic ${auth}` }
        })
        if (reportsResponse.ok) {
          allReports = await reportsResponse.json() || []
        }
      } catch (error) {
        console.error('Failed to fetch reports:', error)
      }
      setReports(allReports)
      
      // Fetch comments for each blog
      const allComments = []
      const blogCommentsMap = {}
      const blogReportsMap = {}
      
      for (const blog of blogsList) {
        try {
          const commentsResponse = await fetch(`https://blogapp-production-66d9.up.railway.app/api/blogs/${blog.id}/comments`, {
            headers: { 'Authorization': `Basic ${auth}` }
          })
          
          let blogComments = []
          if (commentsResponse.ok) {
            blogComments = await commentsResponse.json() || []
            console.log(`Comments for blog ${blog.id}:`, blogComments)
            if (blogComments.length > 0) {
              console.log('First comment structure:', blogComments[0])
              console.log('Comment keys:', Object.keys(blogComments[0]))
            }
          }
          
          blogCommentsMap[blog.id] = blogComments
          
          // Add to all comments with blog info
          const commentsWithBlogInfo = blogComments.map(comment => ({
            ...comment,
            blogTitle: blog.title,
            blogId: blog.id
          }))
          allComments.push(...commentsWithBlogInfo)
          
          // Filter reports for this blog
          blogReportsMap[blog.id] = allReports.filter(report => report.blogId === blog.id)
          
        } catch (error) {
          console.error(`Failed to fetch comments for blog ${blog.id}:`, error)
          blogCommentsMap[blog.id] = []
          blogReportsMap[blog.id] = []
        }
      }
      
      console.log('All comments:', allComments.length)
      console.log('Blog comments map:', blogCommentsMap)
      
      setComments([...allComments]) // Force new array reference
      setBlogComments({...blogCommentsMap}) // Force new object reference
      setBlogReports({...blogReportsMap}) // Force new object reference
      
    } catch (error) {
      console.error('Failed to fetch data:', error)
      setBlogs([])
      setComments([])
      setReports([])
    } finally {
      setLoading(false)
    }
  }

  const deleteBlog = async (blogId, blogTitle) => {
    if (!confirm(`Are you sure you want to delete "${blogTitle}"? This action cannot be undone.`)) {
      return
    }
    
    try {
      // Remove blog from UI state (client-side delete)
      setBlogs(blogs.filter(blog => blog.id !== blogId))
      setComments(comments.filter(comment => comment.blogId !== blogId))
      setBlogComments(prev => {
        const updated = { ...prev }
        delete updated[blogId]
        return updated
      })
      
      alert('Blog removed from dashboard!')
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to remove blog.')
    }
  }

  const TabButton = ({ id, label, count }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-6 py-3 rounded-full font-medium transition-all ${
        activeTab === id
          ? 'bg-green-600 dark:bg-red-600 text-white border-2 border-green-600 dark:border-red-600 shadow-[0_0_20px_rgba(0,0,0,0.5)] dark:shadow-[0_0_20px_rgba(255,255,255,0.5)]'
          : 'bg-transparent text-current border-2 border-current/30 hover:border-current/50'
      }`}
    >
      {label} ({count})
    </button>
  )

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-current text-xl">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-current mb-2">Writer Dashboard</h1>
          <p className="text-current opacity-70">Manage your blogs, comments, and reports</p>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <TabButton id="comments" label="Comments" count={comments.length} />
          <TabButton id="reports" label="Reports" count={reports.length} />
          <TabButton id="blogs" label="All Blogs" count={blogs.length} />
        </div>

        <div className="bg-transparent border-2 border-current/20 rounded-xl p-6">
          {activeTab === 'comments' && (
            <div>
              <h2 className="text-xl font-semibold text-current mb-6">All Comments</h2>
              {comments.length === 0 ? (
                <p className="text-current opacity-70 text-center py-8">No comments found</p>
              ) : (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-current/5 rounded-lg p-4 border border-current/20">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-current">{comment.author}</h4>
                          <Link 
                            to={`/blogs/${comment.blogId}`}
                            className="text-sm text-current opacity-70 hover:opacity-100 transition-colors"
                          >
                            on "{comment.blogTitle}"
                          </Link>
                        </div>
                        <span className="text-xs text-current opacity-50">
                          {comment.createdAt ? 
                            new Date(comment.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            }) : 'Recent'
                          }
                        </span>
                      </div>
                      <p className="text-current opacity-80">{comment.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'reports' && (
            <div>
              <h2 className="text-xl font-semibold text-current mb-6">Content Reports</h2>
              {reports.length === 0 ? (
                <p className="text-current opacity-70 text-center py-8">No reports found</p>
              ) : (
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={report.id} className="bg-current/5 rounded-lg p-4 border border-current/20">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-current">Report by {report.reporter}</h4>
                          <p className="text-sm text-current opacity-70">Reason: {report.reason}</p>
                        </div>
                        <span className="text-xs text-current opacity-50">
                          {report.createdAt ? 
                            new Date(report.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            }) : 'Recent'
                          }
                        </span>
                      </div>
                      <Link 
                        to={`/blogs/${report.blogId}`}
                        className="text-green-600 dark:text-red-500 hover:opacity-80 transition-colors text-sm"
                      >
                        View reported content →
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'blogs' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-current">Your Blog Posts</h2>
                  <p className="text-current opacity-70 text-sm">Showing {blogs.length} blog(s) | Comments: {comments.length} | Reports: {reports.length}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <label className="text-current text-sm">Sort by:</label>
                    <select 
                      value={`${sortBy}-${sortOrder}`}
                      onChange={(e) => {
                        const [field, order] = e.target.value.split('-')
                        setSortBy(field)
                        setSortOrder(order)
                        setCurrentPage(0)
                        fetchData(0, field, order)
                      }}
                      className="bg-transparent border-2 border-current/30 text-current px-3 py-1 rounded text-sm"
                    >
                      <option value="createdAt-desc">Newest First</option>
                      <option value="createdAt-asc">Oldest First</option>
                      <option value="title-asc">Title A-Z</option>
                      <option value="title-desc">Title Z-A</option>
                      <option value="author-asc">Author A-Z</option>
                      <option value="author-desc">Author Z-A</option>
                    </select>
                  </div>
                  <button
                    onClick={() => fetchData(currentPage)}
                    className="bg-transparent border-2 border-current text-current hover:bg-green-500/20 dark:hover:bg-red-500/20 px-4 py-2 rounded-full font-medium transition-colors"
                  >
                    🔄 Refresh
                  </button>
                  <Link 
                    to="/create"
                    className="bg-transparent border-2 border-current text-current hover:bg-green-500/20 dark:hover:bg-red-500/20 px-4 py-2 rounded-full font-medium transition-colors"
                  >
                    Create New Post
                  </Link>
                </div>
              </div>
              {blogs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-current opacity-70 mb-4">No blog posts found</p>
                  <p className="text-current opacity-50 text-sm mb-4">Create your first blog post to get started.</p>
                  <Link 
                    to="/create"
                    className="bg-transparent border-2 border-current text-current hover:bg-green-500/20 dark:hover:bg-red-500/20 px-6 py-3 rounded-full font-medium inline-block transition-colors"
                  >
                    Create Your First Post
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {blogs.map((blog) => {
                    const blogCommentsCount = blogComments[blog.id]?.length || 0
                    const isExpanded = expandedBlog === blog.id
                    return (
                      <div key={blog.id} className="bg-current/5 rounded-lg border border-current/20">
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <button
                                onClick={() => {
                                  setSelectedBlog(blog)
                                  setShowBlogModal(true)
                                }}
                                className="text-lg font-medium text-current hover:opacity-80 transition-colors text-left"
                              >
                                {blog.title}
                              </button>
                              <p className="text-sm text-current opacity-70 mt-1">
                                by {blog.author} • {blog.createdAt ? 
                                  new Date(blog.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  }) : 'Recent'
                                }
                              </p>
                              <p className="text-current opacity-80 mt-2">
                                {blog.contentMarkdown?.substring(0, 150)}...
                              </p>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                              <button
                                onClick={() => {
                                  if (isExpanded && expandedSection === 'comments') {
                                    setExpandedBlog(null)
                                    setExpandedSection(null)
                                  } else {
                                    setExpandedBlog(blog.id)
                                    setExpandedSection('comments')
                                  }
                                }}
                                className={`px-3 py-1 text-current text-sm rounded-full border-2 transition-colors ${
                                  isExpanded && expandedSection === 'comments' 
                                    ? 'bg-green-600 dark:bg-red-600 border-green-600 dark:border-red-600 text-white' 
                                    : 'border-current/30 hover:border-current/50'
                                }`}
                              >
                                💬 {blogCommentsCount} {isExpanded && expandedSection === 'comments' ? '▲' : '▼'}
                              </button>
                              <button
                                onClick={() => {
                                  const reportsCount = blogReports[blog.id]?.length || 0
                                  if (reportsCount > 0) {
                                    if (isExpanded && expandedSection === 'reports') {
                                      setExpandedBlog(null)
                                      setExpandedSection(null)
                                    } else {
                                      setExpandedBlog(blog.id)
                                      setExpandedSection('reports')
                                    }
                                  }
                                }}
                                className={`px-3 py-1 text-current text-sm rounded-full border-2 transition-colors ${
                                  (blogReports[blog.id]?.length || 0) > 0 
                                    ? 'border-orange-500 bg-orange-500/20 hover:bg-orange-500/30 cursor-pointer' 
                                    : 'border-current/20 opacity-50 cursor-not-allowed'
                                }`}
                              >
                                ⚠️ {blogReports[blog.id]?.length || 0}
                              </button>
                              <Link
                                to={`/blogs/${blog.id}`}
                                className="px-3 py-1 bg-green-600 dark:bg-red-600 hover:opacity-80 text-white text-sm rounded-full transition-colors"
                              >
                                View
                              </Link>
                              <button
                                onClick={() => deleteBlog(blog.id, blog.title)}
                                className="px-3 py-1 bg-red-600 hover:opacity-80 text-white text-sm rounded-full transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {isExpanded && expandedSection === 'comments' && (
                          <div className="border-t border-current/20 p-4 bg-current/5">
                            <div className="flex justify-between items-center mb-3">
                              <h4 className="text-current font-medium flex items-center">
                                💬 Comments for "{blog.title}"
                              </h4>
                              <span className="text-current opacity-70 text-sm">{blogCommentsCount} total</span>
                            </div>
                            {!blogComments[blog.id] ? (
                              <div className="text-center py-4">
                                <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                                <p className="text-gray-400 text-sm">Loading comments...</p>
                              </div>
                            ) : blogComments[blog.id].length === 0 ? (
                              <div className="text-center py-8">
                                <p className="text-current opacity-70 text-sm mb-2">No comments yet</p>
                                <p className="text-current opacity-50 text-xs">Be the first to comment on this blog post!</p>
                              </div>
                            ) : (
                              <div className="space-y-3 max-h-80 overflow-y-auto">
                                {blogComments[blog.id].map((comment, index) => (
                                  <div key={comment.id || index} className="bg-current/10 rounded-lg p-4 border border-current/30 hover:bg-current/15 transition-colors">
                                    <div className="flex justify-between items-start mb-3">
                                      <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-green-600 dark:bg-red-600 rounded-full flex items-center justify-center">
                                          <span className="text-white font-medium text-xs">
                                            {(comment.author || 'A').charAt(0).toUpperCase()}
                                          </span>
                                        </div>
                                        <span className="text-current font-medium text-sm">
                                          {comment.author || 'Anonymous'}
                                        </span>
                                      </div>
                                      <span className="text-current opacity-70 text-xs">
                                        {comment.createdAt ? 
                                          new Date(comment.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                          }) : 'Recent'
                                        }
                                      </span>
                                    </div>
                                    <p className="text-current opacity-80 text-sm leading-relaxed pl-10">
                                      {comment.content || 'No content available'}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                        
                        {isExpanded && expandedSection === 'reports' && blogReports[blog.id] && (
                          <div className="border-t border-current/20 p-4 bg-red-900/10">
                            <h4 className="text-current font-medium mb-3 flex items-center">
                              ⚠️ Reports ({blogReports[blog.id].length})
                            </h4>
                            {blogReports[blog.id].length === 0 ? (
                              <p className="text-current opacity-70 text-sm">No reports</p>
                            ) : (
                              <div className="space-y-3 max-h-60 overflow-y-auto">
                                {blogReports[blog.id].map((report) => (
                                  <div key={report.id} className="bg-red-900/20 rounded p-3 border border-red-600/30">
                                    <div className="flex justify-between items-start mb-1">
                                      <span className="text-red-300 font-medium text-sm">Reported by: {report.reporter}</span>
                                      <span className="text-current opacity-50 text-xs">
                                        {report.createdAt ? 
                                          new Date(report.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                          }) : 'Recent'
                                        }
                                      </span>
                                    </div>
                                    <p className="text-red-200 text-sm"><strong>Reason:</strong> {report.reason}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
      
      <BlogModal 
        blog={selectedBlog}
        isOpen={showBlogModal}
        onClose={() => {
          setShowBlogModal(false)
          setSelectedBlog(null)
        }}
      />
    </div>
  )
}