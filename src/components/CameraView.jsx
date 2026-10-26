import { useState, useRef, useEffect } from 'react'
import { Video, VideoOff, AlertCircle } from 'lucide-react'

const CameraView = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const videoRef = useRef(null)

  const handleLoadedData = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  return (
    <div className="bg-robotics-panel rounded-lg border border-gray-800 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Video className="w-5 h-5 text-robotics-accent" />
          <h2 className="text-lg font-semibold text-white">Camera Feed</h2>
        </div>
        <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">DEMO MODE</span>
      </div>
      
      <div className="relative aspect-video bg-black">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-robotics-accent mx-auto mb-4"></div>
              <p className="text-gray-400">Loading camera feed...</p>
            </div>
          </div>
        )}
        
        {hasError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="text-center">
              <VideoOff className="w-16 h-16 text-robotics-danger mx-auto mb-4" />
              <p className="text-gray-400 mb-2">Camera feed unavailable</p>
              <p className="text-sm text-gray-500">Video file not found or format not supported</p>
            </div>
          </div>
        ) : (
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            controls
            autoPlay
            loop
            onLoadedData={handleLoadedData}
            onError={handleError}
          >
            <source src="/camera.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      <div className="px-4 py-3 border-t border-gray-800 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className="text-gray-400">Resolution: <span className="text-white">1920x1080</span></span>
          <span className="text-gray-400">FPS: <span className="text-white">25</span></span>
        </div>
        <div className="flex items-center gap-2 text-robotics-warning">
          <div className="w-2 h-2 bg-robotics-warning rounded-full animate-pulse"></div>
          <span>DEMO MODE</span>
        </div>
      </div>
    </div>
  )
}

export default CameraView
