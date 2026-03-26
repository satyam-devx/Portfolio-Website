import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function FloatingObjects() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    )

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    camera.position.z = 5

    const objects = []

    // Sphere
    const sphere = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.2, 1),
      new THREE.MeshBasicMaterial({
        color: 0x00f5ff,
        wireframe: true,
        opacity: 0.15,
        transparent: true
      })
    )
    sphere.position.set(-3, 1, -2)
    scene.add(sphere)
    objects.push({ mesh: sphere, rx: 0.003, ry: 0.005 })

    // Torus
    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(0.8, 0.2, 8, 24),
      new THREE.MeshBasicMaterial({
        color: 0x9b5de5,
        wireframe: true,
        opacity: 0.12,
        transparent: true
      })
    )
    torus.position.set(3.5, -1, -1)
    scene.add(torus)
    objects.push({ mesh: torus, rx: 0.007, ry: 0.003 })

    // Octahedron
    const octa = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.6, 0),
      new THREE.MeshBasicMaterial({
        color: 0x4361ee,
        wireframe: true,
        opacity: 0.2,
        transparent: true
      })
    )
    octa.position.set(2, 2.5, -1.5)
    scene.add(octa)
    objects.push({ mesh: octa, rx: 0.004, ry: 0.008 })

    // Particles
    const dotGeo = new THREE.BufferGeometry()
    const positions = []

    for (let i = 0; i < 50; i++) {
      positions.push(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5 - 2
      )
    }

    dotGeo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    )

    const dots = new THREE.Points(
      dotGeo,
      new THREE.PointsMaterial({
        color: 0x00f5ff,
        size: 0.04,
        opacity: 0.4,
        transparent: true
      })
    )

    scene.add(dots)

    let mouseX = 0,
      mouseY = 0

    const onMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5
    }

    window.addEventListener('mousemove', onMouse)

    let animId

    const animate = () => {
      animId = requestAnimationFrame(animate)

      objects.forEach(({ mesh, rx, ry }) => {
        mesh.rotation.x += rx
        mesh.rotation.y += ry
      })

      camera.position.x += (mouseX - camera.position.x) * 0.02
      camera.position.y += (-mouseY - camera.position.y) * 0.02

      camera.lookAt(scene.position)
      dots.rotation.y += 0.0005

      renderer.render(scene, camera)
    }

    animate()

    const onResize = () => {
      if (!mount) return

      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()

      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }

    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-[1] pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  )
}
