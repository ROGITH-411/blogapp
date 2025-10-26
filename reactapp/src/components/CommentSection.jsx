import React, { useState, useEffect } from 'react'
import api from '../api/axiosClient'

const CommentSection = ({ blogId, blogAuthor, blogTitle }) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState({ author: '', content: '' })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const fetchComments = async () => {
    try {
      console.log('Fetching comments for blog:', blogId)
      const response = await api.get(`/api/blogs/${blogId}/comments`)
      console.log('Comments response:', response.data)
      setComments(response.data || [])
    } catch (err) {
      console.error('Failed to fetch comments:', err)
      setComments([])
    } finally {
      setLoading(false)
    }
  }

  const submitComment = async (e) => {
    e.preventDefault()
    if (!newComment.author.trim() || !newComment.content.trim()) return

    setSubmitting(true)
    try {
      console.log('Submitting comment:', newComment)
      const response = await api.post(`/api/blogs/${blogId}/comments`, newComment)
      console.log('Comment submitted:', response.data)
      setComments([...comments, response.data])
      setNewComment({ author: '', content: '' })
      
      // Send notification to blog author
      try {
        await api.post('/api/notifications', {
          recipient: blogAuthor,
          type: 'COMMENT',
          message: `New comment on your blog "${blogTitle}" by ${newComment.author}`,
          blogId: blogId
        })
      } catch (error) {
        console.error('Failed to send notification:', error)
      }
    } catch (err) {
      console.error('Failed to submit comment:', err)
      alert('Failed to post comment. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const deleteComment = async (commentId) => {
    if (!confirm('Are you sure you want to delete this comment?')) return
    
    try {
      const auth = localStorage.getItem('basicAuth') || btoa('admin:adminpass')
      const response = await fetch(`http://localhost:8081/api/blogs/${blogId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Basic ${auth}` }
      })
      
      if (response.ok) {
        setComments(comments.filter(comment => comment.id !== commentId))
      } else {
        throw new Error(`Delete failed: ${response.status}`)
      }
    } catch (err) {
      console.error('Failed to delete comment:', err)
      alert('Failed to delete comment. The backend may not support comment deletion yet.')
    }
  }

  useEffect(() => {
    fetchComments()
  }, [blogId])

  return (
    <div className="mt-12 bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8">
      <h3 className="text-2xl font-bold text-white mb-6">Comments ({comments.length})</h3>
      
      <form onSubmit={submitComment} className="mb-8 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="email"
            placeholder="Your email"
            value={newComment.author}
            onChange={(e) => setNewComment({...newComment, author: e.target.value})}
            className="px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
        <textarea
          placeholder="Write your comment..."
          value={newComment.content}
          onChange={(e) => setNewComment({...newComment, content: e.target.value})}
          rows={3}
          className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
        />
        <button
          type="submit"
          disabled={submitting}
          className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
        >
          {submitting ? 'Posting...' : 'Post Comment'}
        </button>
      </form>

      <div className="space-y-4">
        {loading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-slate-700/30 rounded-xl p-4">
                <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : comments.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="bg-slate-700/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold text-xs">
                      {comment.author?.charAt(0)?.toUpperCase() || 'A'}
                    </span>
                  </div>
                  <span className="font-medium text-white">{comment.author}</span>
                  <span className="text-gray-400 text-sm ml-2">
                    {comment.createdAt ? 
                      new Date(comment.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }) : 'Just now'
                    }
                  </span>
                </div>
                <button
                  onClick={() => deleteComment(comment.id)}
                  className="text-red-400 hover:text-red-300 transition-colors p-1"
                  title="Delete comment"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-300 ml-11">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default CommentSection