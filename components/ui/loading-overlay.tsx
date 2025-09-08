"use client"

interface LoadingOverlayProps {
  isVisible: boolean
  message: string
}

export default function LoadingOverlay({ isVisible, message }: LoadingOverlayProps) {
  if (!isVisible) return null

  return (
    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-20 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          {/* Pulsing outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-purple-200 animate-ping opacity-75" />
          <div className="absolute inset-0 rounded-full border-4 border-purple-300 animate-ping opacity-50" style={{ animationDelay: '0.5s' }} />
          
          {/* Main spinning circle */}
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-purple-500 to-orange-500 animate-spin"
            style={{
              background: "conic-gradient(from 0deg, #a855f7, #f97316, #a855f7)",
              mask: "radial-gradient(circle at center, transparent 60%, black 60%)",
              WebkitMask: "radial-gradient(circle at center, transparent 60%, black 60%)",
            }}
          />
          <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
            <div className="w-8 h-8 flex items-center justify-center animate-pulse">
              <img 
                src="/Cheerful_bot_icon3 1.svg" 
                alt="Cheerful Bot" 
                className="w-8 h-8"
              />
            </div>
          </div>
        </div>
        <p className="text-lg font-medium bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent mb-2">
          {message}
        </p>
        <div className="flex justify-center space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
