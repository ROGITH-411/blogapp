import React from 'react'

const BloggingBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Blog Icons */}
      <div className="absolute top-10 left-10 animate-float-slow opacity-60">
        <svg className="w-8 h-8 text-green-600 dark:text-red-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
        </svg>
      </div>
      
      <div className="absolute top-32 right-20 animate-float-medium opacity-50">
        <svg className="w-12 h-12 text-green-600 dark:text-red-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.5,12C18,12 20,14 20,16.5C20,17.38 19.75,18.21 19.31,18.9L22.39,22L21,23.39L17.88,20.32C17.19,20.75 16.37,21 15.5,21C13,21 11,19 11,16.5C11,14 13,12 15.5,12M15.5,14A2.5,2.5 0 0,0 13,16.5A2.5,2.5 0 0,0 15.5,19A2.5,2.5 0 0,0 18,16.5A2.5,2.5 0 0,0 15.5,14M6.5,2C7.3,2 8,2.7 8,3.5V5H16V3.5C16,2.7 16.7,2 17.5,2C18.3,2 19,2.7 19,3.5V5C20.1,5 21,5.9 21,7V9C21,10.1 20.1,11 19,11H5C3.9,11 3,10.1 3,9V7C3,5.9 3.9,5 5,5V3.5C5,2.7 5.7,2 6.5,2Z" />
        </svg>
      </div>

      <div className="absolute bottom-20 left-32 animate-float-fast opacity-40">
        <svg className="w-10 h-10 text-green-600 dark:text-red-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17,7H22V17H17V19A1,1 0 0,0 18,20H20V22H17.5C16.95,22 16,21.55 16,21C16,21.55 15.05,22 14.5,22H12V20H14A1,1 0 0,0 15,19V5A1,1 0 0,0 14,4H12V2H14.5C15.05,2 16,2.45 16,3C16,2.45 16.95,2 17.5,2H20V4H18A1,1 0 0,0 17,5V7M2,7H13V9H4V15H13V17H2V7M20,9H17V15H20V9M6,11H11V13H6V11Z" />
        </svg>
      </div>

      {/* Animated Writing Lines */}
      <div className="absolute top-1/4 left-1/4 opacity-30">
        <div className="w-32 h-0.5 bg-green-600 dark:bg-red-500 animate-write-line"></div>
        <div className="w-24 h-0.5 bg-green-600 dark:bg-red-500 mt-2 animate-write-line-delay-1"></div>
        <div className="w-28 h-0.5 bg-green-600 dark:bg-red-500 mt-2 animate-write-line-delay-2"></div>
      </div>

      <div className="absolute bottom-1/3 right-1/4 opacity-30">
        <div className="w-20 h-0.5 bg-green-600 dark:bg-red-500 animate-write-line-delay-3"></div>
        <div className="w-36 h-0.5 bg-green-600 dark:bg-red-500 mt-2 animate-write-line"></div>
        <div className="w-16 h-0.5 bg-green-600 dark:bg-red-500 mt-2 animate-write-line-delay-1"></div>
      </div>

      {/* Floating Words */}
      <div className="absolute top-16 right-1/3 animate-float-word opacity-50">
        <span className="text-green-600 dark:text-red-500 font-serif text-lg font-bold">Blog</span>
      </div>
      
      <div className="absolute bottom-1/4 left-1/5 animate-float-word-delay opacity-40">
        <span className="text-green-600 dark:text-red-500 font-serif text-sm font-bold">Write</span>
      </div>

      <div className="absolute top-1/3 right-1/5 animate-float-word-delay-2 opacity-45">
        <span className="text-green-600 dark:text-red-500 font-serif text-base font-bold">Story</span>
      </div>

      {/* More Floating Words */}
      <div className="absolute top-1/2 left-1/3 animate-float-word opacity-35">
        <span className="text-green-600 dark:text-red-500 font-serif text-sm font-bold">Create</span>
      </div>
      
      <div className="absolute bottom-1/5 right-1/3 animate-float-word-delay opacity-40">
        <span className="text-green-600 dark:text-red-500 font-serif text-lg font-bold">Share</span>
      </div>

      <div className="absolute top-1/5 left-1/2 animate-float-word-delay-2 opacity-30">
        <span className="text-green-600 dark:text-red-500 font-serif text-xs font-bold">Inspire</span>
      </div>

      {/* Floating Symbols */}
      <div className="absolute top-1/4 right-1/2 animate-float-slow opacity-25">
        <span className="text-green-600 dark:text-red-500 text-2xl">✍️</span>
      </div>

      <div className="absolute bottom-1/3 left-1/6 animate-float-medium opacity-30">
        <span className="text-green-600 dark:text-red-500 text-xl">📝</span>
      </div>

      <div className="absolute top-2/3 right-1/6 animate-float-fast opacity-20">
        <span className="text-green-600 dark:text-red-500 text-lg">💭</span>
      </div>

      {/* Additional Blog Icons */}
      <div className="absolute top-1/2 left-1/6 animate-float-medium opacity-35">
        <svg className="w-6 h-6 text-green-600 dark:text-red-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" />
        </svg>
      </div>

      <div className="absolute bottom-1/6 right-2/3 animate-float-slow opacity-40">
        <svg className="w-7 h-7 text-green-600 dark:text-red-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,19H5V5H19V19Z" />
        </svg>
      </div>

      {/* Particle Effects */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-green-600 dark:bg-red-500 rounded-full opacity-60 animate-particle-${i % 4}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>

      {/* Floating Dots */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={`dot-${i}`}
            className="absolute w-1 h-1 bg-green-600 dark:bg-red-500 rounded-full opacity-40 animate-float-slow"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${i * 0.8}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default BloggingBackground