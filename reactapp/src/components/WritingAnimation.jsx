import React from 'react'

export default function WritingAnimation() {
  return (
    <div className="relative w-96 h-80 mx-auto">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blogger-orange/20 via-blue-500/20 to-green-500/20 rounded-full blur-3xl animate-pulse"></div>
      
      {/* Laptop */}
      <div className="absolute left-8 top-12 w-20 h-16 bg-gradient-to-b from-gray-700 to-gray-900 rounded-lg shadow-2xl transform rotate-3 animate-float">
        <div className="w-full h-2 bg-gradient-to-r from-gray-500 to-gray-600 rounded-t-lg"></div>
        <div className="p-2 bg-gradient-to-b from-gray-800 to-black rounded-b-lg">
          <div className="w-16 h-10 bg-gradient-to-b from-blue-900 to-black rounded border border-gray-600 relative overflow-hidden">
            <div className="absolute inset-1 bg-black rounded">
              <div className="h-1 bg-green-400 rounded animate-cursor-blink mt-1 ml-1"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating paper with gradient */}
      <div className="absolute left-32 top-8 w-40 h-48 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-lg shadow-2xl overflow-hidden transform -rotate-2 animate-float-paper">
        <div className="p-4 space-y-2">
          <div className="h-2 bg-gradient-to-r from-blogger-orange to-orange-600 rounded animate-type-1 shadow-sm"></div>
          <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded animate-type-2 shadow-sm"></div>
          <div className="h-2 bg-gradient-to-r from-green-500 to-green-700 rounded animate-type-3 shadow-sm"></div>
          <div className="h-1 bg-gradient-to-r from-purple-500 to-purple-700 rounded animate-type-4 shadow-sm"></div>
          <div className="h-1 bg-gradient-to-r from-pink-500 to-pink-700 rounded animate-type-5 shadow-sm"></div>
        </div>
        <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
      </div>
      
      {/* Enhanced floating words with glow */}
      <div className="absolute top-16 right-12 text-2xl font-bold text-blogger-orange animate-float-word-1 drop-shadow-lg" style={{textShadow: '0 0 20px rgba(255,165,0,0.8)'}}>✍️ Write</div>
      <div className="absolute top-28 right-20 text-xl font-bold text-blue-400 animate-float-word-2 drop-shadow-lg" style={{textShadow: '0 0 20px rgba(59,130,246,0.8)'}}>📖 Read</div>
      <div className="absolute top-40 right-8 text-lg font-bold text-green-400 animate-float-word-3 drop-shadow-lg" style={{textShadow: '0 0 20px rgba(34,197,94,0.8)'}}>💡 Share</div>
      <div className="absolute top-52 right-16 text-md font-bold text-purple-400 animate-float-word-1 drop-shadow-lg" style={{textShadow: '0 0 20px rgba(168,85,247,0.8)'}}>🌟 Inspire</div>
      
      {/* Particle effects */}
      <div className="absolute top-20 left-20 w-1 h-1 bg-yellow-400 rounded-full animate-particle-1"></div>
      <div className="absolute top-32 left-40 w-1 h-1 bg-pink-400 rounded-full animate-particle-2"></div>
      <div className="absolute top-44 left-24 w-1 h-1 bg-cyan-400 rounded-full animate-particle-3"></div>
      
      {/* Enhanced reading avatars */}
      <div className="absolute bottom-12 left-20 w-16 h-16 bg-gradient-to-br from-blogger-orange to-orange-600 rounded-full flex items-center justify-center animate-bounce-slow shadow-2xl">
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
        </svg>
      </div>
      
      <div className="absolute bottom-8 right-20 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center animate-bounce-slow shadow-2xl" style={{animationDelay: '0.5s'}}>
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
        </svg>
      </div>
      
      {/* Enhanced connection lines with glow */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <path d="M 120 100 Q 240 80 320 160" stroke="url(#gradient1)" strokeWidth="3" fill="none" className="animate-draw-line" filter="url(#glow)" />
        <path d="M 180 220 Q 280 180 320 160" stroke="url(#gradient2)" strokeWidth="3" fill="none" className="animate-draw-line delay-1000" filter="url(#glow)" />
        
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,165,0,0.9)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0.9)" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(34,197,94,0.9)" />
            <stop offset="100%" stopColor="rgba(168,85,247,0.9)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}