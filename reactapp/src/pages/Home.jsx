import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axiosClient'
import Pagination from '../components/Pagination'
import WritingAnimation from '../components/WritingAnimation'
import BloggingBackground from '../components/BloggingBackground'

const HeroSection = () => {
  const isLoggedIn = localStorage.getItem('basicAuth')
  
  return (
  <div className="relative overflow-hidden bg-transparent rounded-xl mb-16 animate-fade-in">
    <BloggingBackground />
    <div className="relative px-8 py-16 z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-left animate-slide-in-left">
        <div className="inline-flex items-center space-x-4 mb-8">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg animate-float">
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
          <h1 className="text-6xl font-bold text-current mb-6 leading-tight">
            Welcome to <span className="dark:text-red-500 text-green-600">InkFlow</span>
          </h1>
          <p className="text-xl text-current opacity-80 mb-10 leading-relaxed">
        Where creativity meets community. Share your stories, discover amazing content, and connect with writers and readers from around the world.
      </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link to={isLoggedIn ? "/reader-dashboard" : "/user-login"} className="bg-transparent border-2 border-current text-current dark:border-white dark:text-white px-8 py-4 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 dark:hover:bg-red-500/20 hover:bg-green-500/20 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(0,0,0,0.8)] dark:shadow-[0_0_20px_rgba(255,255,255,0.5)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.8)]">
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Start Reading</span>
              </span>
        </Link>
            <Link to={isLoggedIn ? "/create" : "/user-login"} className="bg-transparent border-2 border-current text-current dark:border-white dark:text-white px-8 py-4 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 dark:hover:bg-red-500/20 hover:bg-green-500/20 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(0,0,0,0.8)] dark:shadow-[0_0_20px_rgba(255,255,255,0.5)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.8)]">
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <span>Start Writing</span>
              </span>
        </Link>
          </div>
          <div className="mt-8">
            {isLoggedIn ? (
              <Link to="/dashboard" className="inline-flex items-center space-x-2 text-current hover:text-green-600 dark:hover:text-red-500 transition-colors duration-300 font-medium text-lg group relative">
                <div className="w-8 h-8 bg-green-600 dark:bg-red-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                </div>
                <span className="group-hover:underline">Go to Dashboard</span>
              </Link>
            ) : (
              <Link to="/register" className="text-current opacity-60 hover:opacity-100 transition-colors font-medium">
                New to InkFlow? Create an account
              </Link>
            )}
          </div>
        </div>
        <div className="flex justify-end animate-slide-in-right">
          <WritingAnimation />
        </div>
      </div>
    </div>
  </div>
  )
}

const FeatureCard = ({ icon, title, description }) => (
  <div className="group bg-transparent rounded-xl p-6 card-hover animate-fade-in hover:animate-pulse">
    <div className="text-center">
      <div className="w-12 h-12 bg-green-600 dark:bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 animate-bounce-slow">
        <div className="text-white">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold text-current mb-3 group-hover:text-green-600 dark:group-hover:text-red-500 transition-colors duration-300">{title}</h3>
      <p className="text-current opacity-70 leading-relaxed group-hover:opacity-100 transition-opacity duration-300">{description}</p>
    </div>
  </div>
)

const WhatIsBlogSection = () => (
  <div className="mb-16">
    <div className="text-center mb-12 animate-fade-in">
      <h2 className="text-3xl font-bold text-current mb-4 animate-slide-in hover:text-green-600 dark:hover:text-red-500 transition-colors duration-300">What is a Blog?</h2>
      <p className="text-lg text-current opacity-80 max-w-3xl mx-auto leading-relaxed hover:opacity-100 transition-opacity duration-300">
        A blog is your digital canvas for sharing thoughts, experiences, and expertise with the world. 
        It's where ideas transform into conversations and knowledge becomes accessible to everyone.
      </p>
    </div>
    
    <div className="grid md:grid-cols-3 gap-8">
      <FeatureCard 
        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>}
        title="Express Yourself"
        description="Share your unique perspective, stories, and insights with a global audience. Your voice matters."
      />
      <FeatureCard 
        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
        title="Build Community"
        description="Connect with like-minded individuals, engage in meaningful discussions, and build lasting relationships."
      />
      <FeatureCard 
        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
        title="Instant Impact"
        description="Publish your thoughts instantly and watch them reach readers around the world in real-time."
      />
    </div>
  </div>
)

const WhyChooseUsSection = () => (
  <div className="mb-16">
    <div className="text-center mb-12 animate-fade-in">
      <h2 className="text-3xl font-bold text-current mb-4 animate-slide-in hover:text-green-600 dark:hover:text-red-500 transition-colors duration-300">Why Choose InkFlow?</h2>
      <p className="text-lg text-current opacity-80 max-w-3xl mx-auto leading-relaxed hover:opacity-100 transition-opacity duration-300">
        We've created the perfect platform for both writers and readers, with powerful features and an intuitive interface.
      </p>
    </div>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <FeatureCard 
        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
        title="Secure Platform"
        description="Your content is safe with our robust security measures and user authentication."
      />
      <FeatureCard 
        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>}
        title="Interactive Comments"
        description="Engage with your audience through our seamless commenting system."
      />
      <FeatureCard 
        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
        title="Content Moderation"
        description="Report inappropriate content to maintain a healthy community environment."
      />
      <FeatureCard 
        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
        title="Lightning Fast"
        description="Experience blazing-fast performance with our optimized platform."
      />
    </div>
  </div>
)

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
    <article className="blogger-card p-6 mb-6 animate-fade-in">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-blogger-orange rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-semibold text-sm">
            {blog.author?.charAt(0)?.toUpperCase() || 'A'}
          </span>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-medium text-blogger-primary">{blog.author}</span>
            <span className="text-blogger-secondary text-sm">·</span>
            <time className="text-blogger-secondary text-sm" dateTime={blog.createdAt}>
              {formatDate(blog.createdAt)}
            </time>
          </div>
          
          <Link to={`/blogs/${blog.id}`} className="block group">
            <h2 className="text-xl font-semibold text-blogger-primary group-hover:text-blogger-orange transition-colors duration-200 mb-3 line-clamp-2">
              {blog.title}
            </h2>
          </Link>
          
          <p className="text-blogger-secondary leading-relaxed mb-4">
            {getExcerpt(blog.contentMarkdown)}
          </p>
          
          <div className="flex items-center justify-between">
            <Link 
              to={`/blogs/${blog.id}`}
              className="text-blogger-orange hover:text-orange-600 font-medium text-sm transition-colors duration-200"
            >
              Read more
            </Link>
            
            <div className="flex items-center space-x-4 text-blogger-secondary">
              <button className="hover:text-blogger-primary transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button className="hover:text-blogger-primary transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
              <button className="hover:text-blogger-primary transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Home() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/api/blogs?page=0&size=2&sort=createdAt,desc`)
      const data = response.data
      setBlogs(data.content || [])
    } catch (err) {
      console.error('Failed to fetch blogs:', err)
      if (err.response?.status === 401) {
        console.log('Authentication required - showing empty state')
        setBlogs([])
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <div className="space-y-8">
      <HeroSection />
      <WhatIsBlogSection />
      <WhyChooseUsSection />
      
      <div className="bg-transparent rounded-xl p-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-current mb-6 animate-slide-in">Latest Posts</h2>
        
        {loading ? (
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
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
            <div className="text-center mt-8">
              <Link 
                to="/reader-dashboard" 
                className="group inline-flex items-center space-x-3 text-current hover:text-green-600 dark:hover:text-red-500 transition-all duration-500 font-medium text-lg relative overflow-hidden"
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-2">Read More Stories</span>
                <div className="w-8 h-8 bg-green-600 dark:bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <svg className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent dark:from-red-500/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></div>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-600 dark:bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-current mb-2">Sign in to read amazing stories</h3>
            <p className="text-current opacity-70 mb-6">Join our community to discover and share incredible content.</p>
            <Link to="/user-login" className="inline-block bg-green-600 dark:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity duration-300">
              Sign In to Read
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}