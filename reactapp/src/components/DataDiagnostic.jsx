import React, { useState, useEffect } from 'react'

const DataDiagnostic = () => {
  const [diagnostics, setDiagnostics] = useState({})
  const [loading, setLoading] = useState(false)

  const runDiagnostic = async () => {
    setLoading(true)
    const auth = localStorage.getItem('basicAuth') || btoa('admin:adminpass')
    const results = {}

    try {
      // Test blogs API
      const blogsResponse = await fetch('http://localhost:8081/api/blogs?page=0&size=10000', {
        headers: { 'Authorization': `Basic ${auth}` }
      })
      
      if (blogsResponse.ok) {
        const blogsData = await blogsResponse.json()
        const blogs = blogsData.content || blogsData || []
        results.blogs = {
          status: 'success',
          count: blogs.length,
          totalElements: blogsData.totalElements,
          data: blogs.map(b => ({ id: b.id, title: b.title, author: b.author }))
        }

        // Test comments for each blog
        let totalComments = 0
        const commentsByBlog = {}
        
        for (const blog of blogs) {
          try {
            const commentsResponse = await fetch(`http://localhost:8081/api/blogs/${blog.id}/comments`, {
              headers: { 'Authorization': `Basic ${auth}` }
            })
            
            if (commentsResponse.ok) {
              const comments = await commentsResponse.json() || []
              commentsByBlog[blog.id] = comments.length
              totalComments += comments.length
            }
          } catch (error) {
            commentsByBlog[blog.id] = 'error'
          }
        }
        
        results.comments = {
          status: 'success',
          totalComments,
          commentsByBlog
        }
      } else {
        results.blogs = {
          status: 'error',
          message: `HTTP ${blogsResponse.status}: ${blogsResponse.statusText}`
        }
      }

      // Test reports API
      try {
        const reportsResponse = await fetch('http://localhost:8081/api/reports', {
          headers: { 'Authorization': `Basic ${auth}` }
        })
        
        if (reportsResponse.ok) {
          const reports = await reportsResponse.json() || []
          results.reports = {
            status: 'success',
            count: reports.length,
            data: reports
          }
        } else {
          results.reports = {
            status: 'error',
            message: `HTTP ${reportsResponse.status}`
          }
        }
      } catch (error) {
        results.reports = {
          status: 'error',
          message: error.message
        }
      }

    } catch (error) {
      results.error = error.message
    }

    setDiagnostics(results)
    setLoading(false)
  }

  useEffect(() => {
    runDiagnostic()
  }, [])

  return (
    <div className="fixed bottom-4 right-4 max-w-md bg-white dark:bg-gray-800 border rounded-lg shadow-lg p-4 z-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-sm">API Diagnostic</h3>
        <button 
          onClick={runDiagnostic}
          disabled={loading}
          className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
        >
          {loading ? '...' : '🔄'}
        </button>
      </div>
      
      <div className="text-xs space-y-2">
        {diagnostics.blogs && (
          <div>
            <strong>Blogs:</strong> {diagnostics.blogs.status === 'success' 
              ? `✅ ${diagnostics.blogs.count} found (Total: ${diagnostics.blogs.totalElements || 'N/A'})`
              : `❌ ${diagnostics.blogs.message}`
            }
          </div>
        )}
        
        {diagnostics.comments && (
          <div>
            <strong>Comments:</strong> {diagnostics.comments.status === 'success' 
              ? `✅ ${diagnostics.comments.totalComments} total`
              : `❌ Failed`
            }
          </div>
        )}
        
        {diagnostics.reports && (
          <div>
            <strong>Reports:</strong> {diagnostics.reports.status === 'success' 
              ? `✅ ${diagnostics.reports.count} found`
              : `❌ ${diagnostics.reports.message}`
            }
          </div>
        )}
        
        {diagnostics.blogs?.data && (
          <details className="mt-2">
            <summary className="cursor-pointer text-blue-600">View Blog Details</summary>
            <div className="mt-1 text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded max-h-32 overflow-y-auto">
              {diagnostics.blogs.data.map(blog => (
                <div key={blog.id}>
                  {blog.id}: {blog.title} by {blog.author}
                  {diagnostics.comments?.commentsByBlog?.[blog.id] !== undefined && 
                    ` (${diagnostics.comments.commentsByBlog[blog.id]} comments)`
                  }
                </div>
              ))}
            </div>
          </details>
        )}
      </div>
    </div>
  )
}

export default DataDiagnostic