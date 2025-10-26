import React from 'react'

export default function GlobeAnimation() {
  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Globe */}
      <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-spin-slow">
        {/* Globe grid lines */}
        <div className="absolute inset-4 rounded-full border border-white/20"></div>
        <div className="absolute inset-8 rounded-full border border-white/15"></div>
        
        {/* Vertical lines */}
        <div className="absolute top-0 left-1/2 w-px h-full bg-white/20 transform -translate-x-1/2"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-white/20 transform -translate-y-1/2"></div>
        
        {/* Writing nodes (pen icons) */}
        <div className="absolute top-8 left-12 w-6 h-6 bg-blogger-orange rounded-full flex items-center justify-center animate-pulse">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </div>
        <div className="absolute bottom-12 left-8 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center animate-pulse delay-500">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </div>
        <div className="absolute top-1/2 left-4 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse delay-1000">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </div>
        
        {/* Reading nodes (book icons) */}
        <div className="absolute top-16 right-8 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center animate-pulse delay-300">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
        </div>
        <div className="absolute bottom-8 right-12 w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center animate-pulse delay-700">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
        </div>
        <div className="absolute top-1/2 right-4 w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center animate-pulse delay-1200">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
        </div>
      </div>
      
      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full animate-pulse">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="50%" stopColor="rgba(255,165,0,0.8)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
          </linearGradient>
        </defs>
        
        <line x1="80" y1="64" x2="200" y2="80" stroke="url(#lineGradient)" strokeWidth="1" className="animate-dash" />
        <line x1="200" y1="80" x2="72" y2="192" stroke="url(#lineGradient)" strokeWidth="1" className="animate-dash delay-300" />
        <line x1="72" y1="192" x2="200" y2="208" stroke="url(#lineGradient)" strokeWidth="1" className="animate-dash delay-500" />
        <line x1="36" y1="128" x2="228" y2="128" stroke="url(#lineGradient)" strokeWidth="1" className="animate-dash delay-700" />
        <line x1="80" y1="64" x2="36" y2="128" stroke="url(#lineGradient)" strokeWidth="1" className="animate-dash delay-1000" />
        <line x1="228" y1="128" x2="200" y2="208" stroke="url(#lineGradient)" strokeWidth="1" className="animate-dash delay-1200" />
      </svg>
      
      {/* Orbiting satellites */}
      <div className="absolute inset-0 animate-spin-reverse">
        <div className="absolute -top-2 left-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2"></div>
        <div className="absolute -bottom-2 left-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2"></div>
      </div>
      
      <div className="absolute inset-0 animate-spin-slow-reverse">
        <div className="absolute top-1/2 -left-2 w-1 h-1 bg-white rounded-full transform -translate-y-1/2"></div>
        <div className="absolute top-1/2 -right-2 w-1 h-1 bg-white rounded-full transform -translate-y-1/2"></div>
      </div>
    </div>
  )
}