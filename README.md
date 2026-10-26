# ERIC Robotics Insight.IO Dashboard

<img width="1917" height="1027" alt="image" src="https://github.com/user-attachments/assets/ac4c5804-a0db-4da8-b6fc-32932c05b54c" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a2980f6b-5427-4fa9-aa3f-d88d5bfb68b0" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3b2a4725-c756-4f3f-b837-b6b46ee9ceb6" />



A modern, responsive robotics dashboard built with React + Vite for visualizing camera feeds, 3D point clouds, and real-time telemetry data.

## 🚀 Features

- **Camera Feed View**: Displays camera video with playback controls (DEMO MODE)
- **3D Point Cloud Visualization**: Interactive 3D point cloud viewer using Three.js with PCDLoader and OrbitControls
- **Real-time Telemetry**: Simulated sensor data including speed, battery, temperature, CPU usage, and GPS coordinates
- **System Status Monitoring**: Component status with health indicators (DEMO MODE)
- **Control Panel**: Playback controls, recording toggle, and data export options
- **Responsive Design**: Mobile-friendly grid layout using TailwindCSS
- **Error Handling**: Graceful degradation when media files are unavailable

## 📋 Requirements

- Node.js (v16 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone or download this repository**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   The application will automatically open at `http://localhost:3000`

## 📸 Capturing Demo Screenshots/Video

To capture screenshots or video of the dashboard for submission:

1. **Screenshot**:
   - Use your OS screenshot tool (Windows: Win+Shift+S, Mac: Cmd+Shift+4)
   - Or use browser DevTools (F12) → Device Toolbar to capture specific sizes

2. **Screen Recording**:
   - Windows: Use Xbox Game Bar (Win+G) or OBS Studio
   - Mac: Use QuickTime Player (File → New Screen Recording)
   - Or use browser extensions like Loom or Screencastify

3. **Recommended capture areas**:
   - Full dashboard layout showing all panels
   - Camera feed with video playing
   - 3D point cloud view with rotation/zoom interaction
   - Telemetry panel showing real-time updates

## 🏗️ Build for Production

To create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

To preview the production build:

```bash
npm run preview
```

## 📁 Project Structure

```
eric-insight-dashboard/
├── public/
│   ├── camera.mp4          # Camera video file
│   └── pointcloud.pcd      # Point cloud data file
├── src/
│   ├── components/
│   │   ├── CameraView.jsx       # Camera feed component
│   │   ├── PointCloudView.jsx   # 3D point cloud viewer
│   │   ├── TelemetryPanel.jsx   # Telemetry data display
│   │   ├── StatusPanel.jsx      # System status monitoring
│   │   └── ControlPanel.jsx     # Control buttons and actions
│   ├── App.jsx               # Main application layout
│   ├── main.jsx              # Application entry point
│   └── index.css             # Global styles
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # TailwindCSS configuration
└── postcss.config.js         # PostCSS configuration
```

## 🎨 Architecture

### Tech Stack

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **Three.js**: 3D rendering engine
- **TailwindCSS**: Utility-first CSS framework
- **Lucide React**: Icon library

### Component Architecture

The application follows a modular component-based architecture:

1. **App.jsx**: Main container that orchestrates all panels
2. **CameraView.jsx**: Handles video playback with error states
3. **PointCloudView.jsx**: Manages Three.js scene, PCD loading, and OrbitControls
4. **TelemetryPanel.jsx**: Displays simulated sensor data with real-time updates
5. **StatusPanel.jsx**: Shows system health and component status
6. **ControlPanel.jsx**: Provides user controls for playback and recording

### Data Flow

- **Telemetry Data**: Simulated using React state with `setInterval` for real-time updates
- **Point Cloud**: Loaded from local PCD file using Three.js PCDLoader
- **Camera Feed**: Loaded from local MP4 file using HTML5 video element
- **Status Updates**: Simulated with periodic state updates

## 📦 Assets

### Included Assets

- **camera.mp4**: Sample camera feed video (1920x1080, 25fps)
- **pointcloud.pcd**: Sample point cloud data file

### Asset Requirements

- **Video**: MP4 format (H.264 codec recommended)
- **Point Cloud**: PCD format (Point Cloud Data)

### Missing Assets

If assets are missing, the dashboard will display:
- Camera view: Error message with fallback UI
- Point cloud view: Error message with fallback UI

## ⚙️ Configuration

### TailwindCSS Custom Colors

The dashboard uses custom color scheme defined in `tailwind.config.js`:

```javascript
colors: {
  robotics: {
    dark: '#0a0e17',      // Main background
    panel: '#111827',     // Panel background
    accent: '#3b82f6',     // Primary accent (blue)
    success: '#10b981',   // Success (green)
    warning: '#f59e0b',   // Warning (orange)
    danger: '#ef4444'     // Danger (red)
  }
}
```

### Vite Configuration

- Dev server port: 3000
- Auto-open browser on start
- React plugin enabled

## 🎯 Key Features Explained

### Camera View

- Supports MP4 video playback
- Built-in HTML5 video controls
- Loading and error states
- Resolution and FPS display
- Live status indicator

### 3D Point Cloud View

- Three.js rendering with WebGL
- PCD file loading via PCDLoader
- OrbitControls for:
  - Rotation (drag)
  - Zoom (scroll)
  - Pan (right-click drag)
- Grid helper for spatial reference
- Point count display
- Auto-rotate toggle

### Telemetry Panel

- Real-time simulated data updates
- Metrics displayed:
  - Speed (km/h)
  - Temperature (°C)
  - CPU Usage (%)
  - Battery Level (%)
  - GPS Coordinates (Lat, Lon, Alt)
- Progress bars for battery and CPU
- Clearly labeled as "SIMULATED"

### Status Panel

- Component health monitoring
- Real-time status updates
- Recent alerts display
- Uptime and data rate metrics
- Color-coded status indicators

### Control Panel

- Playback controls (Play/Pause/Stop) - Actually controls video playback
- Recording toggle with visual indicator (demo only)
- Data export buttons (PCD/Log) - Placeholder alerts
- Quick action buttons - Placeholder alerts

## ⚠️ Limitations

### Data Simulation

- **Telemetry data is simulated**: All sensor data (speed, GPS, battery, etc.) is generated locally and not connected to real sensors
- **Status updates are simulated**: Component status changes are randomly generated for demonstration
- **No ROS integration**: This implementation uses local files instead of live ROS data streams

### Asset Dependencies

- Requires local MP4 and PCD files in the `public/` directory
- No fallback to online resources
- Video and point cloud formats must be browser-compatible

### Browser Compatibility

- Requires modern browser with WebGL support
- Tested on Chrome, Firefox, Edge, Safari (latest versions)
- May not work on older browsers

### Performance

- Large PCD files may cause loading delays
- Video playback depends on file size and system resources
- Real-time updates use `setInterval` which may not be optimal for production

### UI Limitations

- **DEMO MODE indicators**: Camera and Status panels show "DEMO MODE" to indicate simulated data
- **Placeholder buttons**: Export and Quick Action buttons show alerts instead of actual functionality
- **Recording toggle**: Visual only - does not actually record data
- **Auto-rotate**: Toggle button works but rotation speed is not configurable

## 🔧 Troubleshooting

### Video not loading

- Ensure `camera.mp4` exists in the `public/` directory
- Check browser console for format errors
- Verify video codec compatibility (H.264 recommended)

### Point cloud not loading

- Ensure `pointcloud.pcd` exists in the `public/` directory
- Check browser console for PCD parsing errors
- Verify PCD file format is valid

### TailwindCSS not working

- Ensure dependencies are installed: `npm install`
- Check that `postcss.config.js` and `tailwind.config.js` are present
- Verify `@tailwind` directives in `index.css`

### Build errors

- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Ensure Node.js version is 16 or higher

## 🚀 Future Enhancements

Potential improvements for production use:

- **ROS Integration**: Connect to live ROS2 topics using roslibjs
- **Real Sensor Data**: Replace simulated data with actual sensor readings
- **Data Recording**: Implement actual recording functionality
- **Multiple Cameras**: Support for multiple camera feeds
- **Advanced Visualization**: Add more 3D visualization options
- **Configuration Panel**: Allow users to customize dashboard layout
- **Alert System**: Implement real-time alert notifications
- **Data Export**: Add actual export functionality for logs and data

## 📝 Submission Notes

This implementation fulfills the ERIC Robotics assignment requirements:

- ✅ Responsive dashboard UI
- ✅ Camera view with local MP4 file
- ✅ Interactive 3D point cloud view with Three.js
- ✅ Modular React components
- ✅ Clean CSS with TailwindCSS
- ✅ Realistic simulated telemetry (clearly labeled)
- ✅ Graceful handling of missing media files
- ✅ Complete README with setup instructions

### Design Decisions

1. **React + Vite**: Chosen for fast development and modern tooling
2. **Three.js**: Industry standard for WebGL 3D visualization
3. **TailwindCSS**: Rapid UI development with consistent styling
4. **Component Architecture**: Modular design for maintainability
5. **Simulated Data**: Clearly labeled to distinguish from real sensor data

### Known Issues

- PCD auto-rotate toggle is UI-only (not connected to OrbitControls)
- Export buttons are placeholders (no actual export functionality)
- Recording toggle is visual only (no actual recording)

## 📄 License

This project is submitted as part of the ERIC Robotics assignment.

## 👥 Contact

For questions or feedback regarding this implementation, please refer to the assignment guidelines.

---

**Version**: 1.0.0  
**Last Updated**: October 2024  
**Framework**: React 18 + Vite 5
