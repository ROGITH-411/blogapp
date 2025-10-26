import React from 'react'

const BlogModal = ({ blog, isOpen, onClose }) => {
  if (!isOpen || !blog) return null

  const formatContent = (content) => {
    if (!content) return ''
    return content
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4 mt-8">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-3 mt-6">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mb-2 mt-4">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono">$1</code>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, '<br>')
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="blogger-card max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex-1 pr-4">
            <h1 className="text-2xl font-bold text-blogger-primary mb-2">{blog.title}</h1>
            <div className="flex items-center text-blogger-secondary text-sm">
              <span>by {blog.author}</span>
              <span className="mx-2">•</span>
              <span>{formatDate(blog.createdAt)}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-blogger-secondary hover:text-blogger-primary transition-colors p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div 
            className="prose prose-lg max-w-none text-blogger-primary leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: `<p class="mb-4">${formatContent(blog.contentMarkdown || '')}</p>`
            }} 
          />
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-blogger-secondary hover:text-blogger-primary transition-colors"
          >
            Close
          </button>
          <a
            href={`/blogs/${blog.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-orange px-4 py-2 rounded font-medium"
          >
            Open Full Page
          </a>
        </div>
      </div>
    </div>
  )
}

export default BlogModal