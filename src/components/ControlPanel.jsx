import { useState } from 'react'
import { Play, Pause, Square, Download, RefreshCw, Settings } from 'lucide-react'

const ControlPanel = ({ isRecording, onToggleRecording }) => {
  const [isPlaying, setIsPlaying] = useState(true)

  const handlePlayPause = () => {
    const video = document.querySelector('video')
    if (video) {
      if (video.paused) {
        video.play()
        setIsPlaying(true)
      } else {
        video.pause()
        setIsPlaying(false)
      }
    }
  }

  const handleStop = () => {
    const video = document.querySelector('video')
    if (video) {
      video.pause()
      video.currentTime = 0
      setIsPlaying(false)
    }
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  const handleDownload = (type) => {
    alert(`${type} download is a placeholder for demo purposes`)
  }

  const handleQuickAction = (action) => {
    alert(`${action} is a placeholder for demo purposes`)
  }

  const ControlButton = ({ icon: Icon, label, onClick, variant = 'primary', disabled = false }) => {
    const baseClasses = "flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200"
    const variants = {
      primary: "bg-robotics-accent hover:bg-blue-600 text-white",
      danger: "bg-robotics-danger hover:bg-red-600 text-white",
      secondary: "bg-gray-700 hover:bg-gray-600 text-white",
      success: "bg-robotics-success hover:bg-green-600 text-white"
    }

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Icon className="w-5 h-5" />
        <span>{label}</span>
      </button>
    )
  }

  return (
    <div className="bg-robotics-panel rounded-lg border border-gray-800 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-robotics-accent" />
          <h2 className="text-lg font-semibold text-white">Controls</h2>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Playback Controls */}
        <div>
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Playback</h3>
          <div className="grid grid-cols-3 gap-3">
            <ControlButton
              icon={isPlaying ? Pause : Play}
              label={isPlaying ? 'Pause' : 'Play'}
              onClick={handlePlayPause}
              variant="primary"
            />
            <ControlButton
              icon={Square}
              label="Stop"
              onClick={handleStop}
              variant="danger"
            />
            <ControlButton
              icon={RefreshCw}
              label="Refresh"
              onClick={handleRefresh}
              variant="secondary"
            />
          </div>
        </div>

        {/* Recording Controls */}
        <div>
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Recording</h3>
          <ControlButton
            icon={isRecording ? Square : Play}
            label={isRecording ? 'Stop Recording' : 'Start Recording'}
            onClick={onToggleRecording}
            variant={isRecording ? 'danger' : 'success'}
          />
          {isRecording && (
            <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>Recording in progress...</span>
            </div>
          )}
        </div>

        {/* Data Export */}
        <div>
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Data Export</h3>
          <div className="grid grid-cols-2 gap-3">
            <ControlButton
              icon={Download}
              label="Export PCD"
              onClick={() => handleDownload('PCD')}
              variant="secondary"
            />
            <ControlButton
              icon={Download}
              label="Export Log"
              onClick={() => handleDownload('Log')}
              variant="secondary"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button onClick={() => handleQuickAction('Reset Camera View')} className="w-full text-left px-3 py-2 bg-gray-900/50 hover:bg-gray-700 rounded text-sm text-gray-300 transition-colors">
              Reset Camera View
            </button>
            <button onClick={() => handleQuickAction('Clear Point Cloud')} className="w-full text-left px-3 py-2 bg-gray-900/50 hover:bg-gray-700 rounded text-sm text-gray-300 transition-colors">
              Clear Point Cloud
            </button>
            <button onClick={() => handleQuickAction('Calibrate Sensors')} className="w-full text-left px-3 py-2 bg-gray-900/50 hover:bg-gray-700 rounded text-sm text-gray-300 transition-colors">
              Calibrate Sensors
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ControlPanel
