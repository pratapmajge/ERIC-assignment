import { useState, useEffect } from 'react'
import { Gauge, Navigation, Thermometer, Cpu } from 'lucide-react'

const TelemetryPanel = () => {
  const [telemetry, setTelemetry] = useState({
    speed: 0,
    battery: 87,
    temperature: 42,
    cpu: 35,
    latitude: 37.7749,
    longitude: -122.4194,
    altitude: 15.5
  })

  useEffect(() => {
    // Simulate real-time telemetry updates
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        ...prev,
        speed: Math.max(0, Math.min(50, prev.speed + (Math.random() - 0.5) * 5)),
        battery: Math.max(0, Math.min(100, prev.battery - 0.01)),
        temperature: Math.max(30, Math.min(60, prev.temperature + (Math.random() - 0.5) * 2)),
        cpu: Math.max(20, Math.min(80, prev.cpu + (Math.random() - 0.5) * 10)),
        latitude: prev.latitude + (Math.random() - 0.5) * 0.0001,
        longitude: prev.longitude + (Math.random() - 0.5) * 0.0001,
        altitude: Math.max(0, prev.altitude + (Math.random() - 0.5) * 0.5)
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const TelemetryCard = ({ icon: Icon, label, value, unit, color }) => (
    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
      <div className="flex items-center gap-3 mb-2">
        <Icon className={`w-5 h-5 ${color}`} />
        <span className="text-sm text-gray-400">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-white">{value.toFixed(1)}</span>
        <span className="text-sm text-gray-500">{unit}</span>
      </div>
    </div>
  )

  return (
    <div className="bg-robotics-panel rounded-lg border border-gray-800 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gauge className="w-5 h-5 text-robotics-accent" />
          <h2 className="text-lg font-semibold text-white">Telemetry</h2>
        </div>
        <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">SIMULATED</span>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <TelemetryCard
            icon={Navigation}
            label="Speed"
            value={telemetry.speed}
            unit="km/h"
            color="text-robotics-accent"
          />
          <TelemetryCard
            icon={Thermometer}
            label="Temperature"
            value={telemetry.temperature}
            unit="°C"
            color="text-robotics-warning"
          />
          <TelemetryCard
            icon={Cpu}
            label="CPU Usage"
            value={telemetry.cpu}
            unit="%"
            color="text-robotics-success"
          />
          <TelemetryCard
            icon={Gauge}
            label="Battery"
            value={telemetry.battery}
            unit="%"
            color="text-robotics-success"
          />
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <Navigation className="w-5 h-5 text-robotics-accent" />
            <span className="text-sm text-gray-400">GPS Coordinates</span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Lat:</span>
              <span className="ml-2 text-white font-mono">{telemetry.latitude.toFixed(6)}</span>
            </div>
            <div>
              <span className="text-gray-500">Lon:</span>
              <span className="ml-2 text-white font-mono">{telemetry.longitude.toFixed(6)}</span>
            </div>
            <div>
              <span className="text-gray-500">Alt:</span>
              <span className="ml-2 text-white font-mono">{telemetry.altitude.toFixed(1)}m</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Battery Level</span>
            <span className="text-sm text-white font-semibold">{telemetry.battery.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-robotics-success h-2 rounded-full transition-all duration-300"
              style={{ width: `${telemetry.battery}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">CPU Usage</span>
            <span className="text-sm text-white font-semibold">{telemetry.cpu.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-robotics-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${telemetry.cpu}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TelemetryPanel
