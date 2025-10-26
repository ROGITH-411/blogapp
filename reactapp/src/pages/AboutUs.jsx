import React from 'react'

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-current mb-6">
            About <span className="text-green-600 dark:text-red-500">InkFlow</span>
          </h1>
          <p className="text-xl text-current opacity-80 max-w-2xl mx-auto">
            Empowering voices, connecting minds, and fostering creativity through the art of storytelling.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-transparent border-2 border-current/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-current mb-4">Our Mission</h2>
            <p className="text-current opacity-80 leading-relaxed">
              At InkFlow, we believe every story matters. Our mission is to create a vibrant community where writers can share their thoughts, experiences, and creativity while readers discover compelling content that inspires and informs.
            </p>
          </div>
          
          <div className="bg-transparent border-2 border-current/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-current mb-4">Our Vision</h2>
            <p className="text-current opacity-80 leading-relaxed">
              We envision a world where knowledge flows freely, where diverse perspectives are celebrated, and where the power of words brings people together across boundaries and cultures.
            </p>
          </div>
        </div>

        <div className="bg-transparent border-2 border-current/20 rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-current mb-6 text-center">Why InkFlow?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 dark:bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-current mb-2">Community Driven</h3>
              <p className="text-current opacity-70 text-sm">Built by writers, for writers and readers who value authentic storytelling.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 dark:bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-current mb-2">Secure & Private</h3>
              <p className="text-current opacity-70 text-sm">Your content and data are protected with industry-standard security measures.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 dark:bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-current mb-2">Easy to Use</h3>
              <p className="text-current opacity-70 text-sm">Intuitive interface designed to let you focus on what matters most - your content.</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-current mb-6">Join Our Community</h2>
          <p className="text-current opacity-80 mb-8 max-w-2xl mx-auto">
            Whether you're a seasoned writer or just starting your journey, InkFlow provides the perfect platform to share your voice with the world.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="/register" className="bg-transparent border-2 border-current text-current px-8 py-3 rounded-full font-semibold hover:bg-green-500/20 dark:hover:bg-red-500/20 transition-colors">
              Get Started
            </a>
            <a href="/contact" className="bg-transparent border-2 border-current text-current px-8 py-3 rounded-full font-semibold hover:bg-green-500/20 dark:hover:bg-red-500/20 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}