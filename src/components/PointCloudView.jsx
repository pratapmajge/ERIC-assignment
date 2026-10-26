import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Box, RotateCw, AlertCircle } from 'lucide-react'

const PointCloudView = () => {
  const containerRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [pointCount, setPointCount] = useState(0)
  const [isRotating, setIsRotating] = useState(false)
  const controlsRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x111827)

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.set(5, 5, 5)

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.autoRotate = false
    controlsRef.current = controls

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 10, 10)
    scene.add(directionalLight)

    // Grid helper
    const gridHelper = new THREE.GridHelper(20, 20, 0x444444, 0x222222)
    scene.add(gridHelper)

    // Load PCD file
    const loader = new PCDLoader()
    loader.load(
      '/pointcloud.pcd',
      (points) => {
        points.geometry.center()
        points.material.size = 0.05
        points.material.color.setHex(0x3b82f6)
        scene.add(points)
        setPointCount(points.geometry.attributes.position.count)
        setIsLoading(false)
      },
      (progress) => {
        // Progress callback
      },
      (error) => {
        console.error('Error loading PCD file:', error)
        setIsLoading(false)
        setHasError(true)
      }
    )

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      controls.dispose()
    }
  }, [])

  const toggleRotation = () => {
    setIsRotating(prev => {
      const newState = !prev
      if (controlsRef.current) {
        controlsRef.current.autoRotate = newState
      }
      return newState
    })
  }

  return (
    <div className="bg-robotics-panel rounded-lg border border-gray-800 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Box className="w-5 h-5 text-robotics-accent" />
          <h2 className="text-lg font-semibold text-white">3D Point Cloud</h2>
        </div>
        <button
          onClick={toggleRotation}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <RotateCw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} />
          Auto Rotate
        </button>
      </div>
      
      <div 
        ref={containerRef} 
        className="relative aspect-square bg-gray-900"
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-robotics-accent mx-auto mb-4"></div>
              <p className="text-gray-400">Loading point cloud...</p>
            </div>
          </div>
        )}
        
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="text-center">
              <AlertCircle className="w-16 h-16 text-robotics-danger mx-auto mb-4" />
              <p className="text-gray-400 mb-2">Point cloud unavailable</p>
              <p className="text-sm text-gray-500">PCD file not found or format not supported</p>
            </div>
          </div>
        )}
      </div>

      <div className="px-4 py-3 border-t border-gray-800 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className="text-gray-400">Points: <span className="text-white">{pointCount.toLocaleString()}</span></span>
          <span className="text-gray-400">Format: <span className="text-white">PCD</span></span>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <span>Drag to rotate • Scroll to zoom</span>
        </div>
      </div>
    </div>
  )
}

export default PointCloudView
