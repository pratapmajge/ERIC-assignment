import { useState, useEffect } from 'react'
import CameraView from './components/CameraView'
import PointCloudView from './components/PointCloudView'
import TelemetryPanel from './components/TelemetryPanel'
import StatusPanel from './components/StatusPanel'
import ControlPanel from './components/ControlPanel'
import { Activity, Wifi, Battery, Settings } from 'lucide-react'

function App() {
  const [isConnected, setIsConnected] = useState(true)
  const [isRecording, setIsRecording] = useState(false)

  useEffect(() => {
    // Simulate connection status changes
    const interval = setInterval(() => {
      setIsConnected(prev => prev)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-robotics-dark">
      {/* Header */}
      <header className="bg-robotics-panel border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-robotics-accent" />
            <div>
              <h1 className="text-2xl font-bold text-white">Insight.IO</h1>
              <p className="text-sm text-gray-400">ERIC Robotics Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Wifi className={`w-5 h-5 ${isConnected ? 'text-robotics-success' : 'text-robotics-danger'}`} />
              <span className="text-sm text-gray-300">{isConnected ? 'Connected' : 'Disconnected'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Battery className="w-5 h-5 text-robotics-success" />
              <span className="text-sm text-gray-300">87%</span>
            </div>
            <Settings className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Camera View */}
          <div className="lg:col-span-2">
            <CameraView />
          </div>

          {/* Point Cloud View */}
          <div className="lg:col-span-1">
            <PointCloudView />
          </div>

          {/* Telemetry Panel */}
          <div className="lg:col-span-1">
            <TelemetryPanel />
          </div>

          {/* Status Panel */}
          <div className="lg:col-span-1">
            <StatusPanel />
          </div>

          {/* Control Panel */}
          <div className="lg:col-span-1">
            <ControlPanel 
              isRecording={isRecording}
              onToggleRecording={() => setIsRecording(!isRecording)}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-robotics-panel border-t border-gray-800 px-6 py-4 mt-6">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>© 2024 ERIC Robotics. All rights reserved.</span>
          <span>v1.0.0 | SIMULATED DATA</span>
        </div>
      </footer>
    </div>
  )
}

export default App
