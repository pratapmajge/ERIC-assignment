import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, AlertTriangle, Clock, Server, Database } from 'lucide-react'

const StatusPanel = () => {
  const [systems, setSystems] = useState([
    { name: 'Camera', status: 'online', lastUpdate: '2s ago' },
    { name: 'LiDAR', status: 'online', lastUpdate: '1s ago' },
    { name: 'GPS', status: 'online', lastUpdate: '3s ago' },
    { name: 'IMU', status: 'warning', lastUpdate: '5s ago' },
    { name: 'Battery', status: 'online', lastUpdate: '10s ago' },
    { name: 'Motor Controller', status: 'online', lastUpdate: '2s ago' }
  ])

  useEffect(() => {
    // Simulate status updates
    const interval = setInterval(() => {
      setSystems(prev => prev.map(system => ({
        ...system,
        lastUpdate: `${Math.floor(Math.random() * 10) + 1}s ago`,
        status: Math.random() > 0.95 ? 'warning' : system.status
      })))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-4 h-4 text-robotics-success" />
      case 'offline':
        return <XCircle className="w-4 h-4 text-robotics-danger" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-robotics-warning" />
      default:
        return <CheckCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'text-robotics-success'
      case 'offline':
        return 'text-robotics-danger'
      case 'warning':
        return 'text-robotics-warning'
      default:
        return 'text-gray-500'
    }
  }

  const SystemCard = ({ icon: Icon, label, value, subtext }) => (
    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-5 h-5 text-robotics-accent" />
        <span className="text-sm text-gray-400">{label}</span>
      </div>
      <div className="text-xl font-bold text-white">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{subtext}</div>
    </div>
  )

  return (
    <div className="bg-robotics-panel rounded-lg border border-gray-800 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Server className="w-5 h-5 text-robotics-accent" />
          <h2 className="text-lg font-semibold text-white">System Status</h2>
        </div>
        <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">DEMO MODE</span>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <SystemCard
            icon={Clock}
            label="Uptime"
            value="02:34:56"
            subtext="Since last restart"
          />
          <SystemCard
            icon={Database}
            label="Data Rate"
            value="125 MB/s"
            subtext="Average throughput"
          />
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Component Status</h3>
          <div className="space-y-2">
            {systems.map((system, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 px-3 bg-gray-900/50 rounded"
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(system.status)}
                  <span className="text-sm text-white">{system.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-semibold ${getStatusColor(system.status)}`}>
                    {system.status.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500">{system.lastUpdate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Recent Alerts</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-3 py-2 px-3 bg-yellow-900/20 border border-yellow-800/30 rounded">
              <AlertTriangle className="w-4 h-4 text-robotics-warning mt-0.5" />
              <div>
                <p className="text-sm text-white">IMU signal degradation detected</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 py-2 px-3 bg-gray-900/50 rounded">
              <CheckCircle className="w-4 h-4 text-robotics-success mt-0.5" />
              <div>
                <p className="text-sm text-white">Camera feed stabilized</p>
                <p className="text-xs text-gray-500">15 minutes ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatusPanel
