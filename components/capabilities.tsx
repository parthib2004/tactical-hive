"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

export default function Capabilities() {
  const titleRef = useRef<HTMLDivElement>(null)
  const canvasRef1 = useRef<HTMLCanvasElement>(null)
  const canvasRef2 = useRef<HTMLCanvasElement>(null)
  const canvasRef3 = useRef<HTMLCanvasElement>(null)  // New canvas ref

  // First animation for Spatial Awareness
  useEffect(() => {
    const canvas = canvasRef1.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.offsetWidth
        canvas.height = container.offsetHeight
      }
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create floating orbs with data streams
    const orbs = Array.from({ length: 15 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 2,
      speed: Math.random() * 0.5 + 0.2,
      angle: Math.random() * Math.PI * 2,
      pulseOffset: Math.random() * Math.PI * 2,
      dataStreams: Array.from({ length: 3 }, () => ({
        length: Math.random() * 50 + 30,
        speed: Math.random() * 0.02 + 0.01,
        offset: Math.random() * Math.PI * 2
      }))
    }))

    function animate() {
      if (!ctx) return;
      if (!ctx) return;
      if (!ctx) return;
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      if (canvas) {
        if (ctx && canvas) {
          if (canvas) {
            if (canvas) {
              if (canvas) {
                if (canvas) {
                  ctx.fillRect(0, 0, canvas.width, canvas.height)
                }
              }
            }
          }
        }
      }

      orbs.forEach(orb => {
        // Update position in a circular motion
        orb.angle += orb.speed * 0.02
        if (!canvas) return;
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const radius = canvas.height / 4
        orb.x = centerX + Math.cos(orb.angle) * radius
        orb.y = centerY + Math.sin(orb.angle) * radius

        // Draw data streams
        orb.dataStreams.forEach(stream => {
          stream.offset += stream.speed
          if (!ctx) return;
          ctx.beginPath()
          for (let i = 0; i < stream.length; i++) {
            const angle = orb.angle + stream.offset + (i * Math.PI / 40)
            const x = orb.x + Math.cos(angle) * i
            const y = orb.y + Math.sin(angle) * i
            ctx.lineTo(x, y)
          }
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 + Math.sin(stream.offset) * 0.1})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        })

        // Draw orb with pulse effect
        const pulse = Math.sin(orb.pulseOffset += 0.02) * 0.5 + 0.5
        const gradient = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, orb.radius * (1 + pulse)
        )
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)')
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.radius * (1 + pulse), 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }
    animate()

    return () => window.removeEventListener("resize", resizeCanvas)
  }, [])

  // Second animation for Intelligent Teaming
  useEffect(() => {
    const canvas = canvasRef2.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size with null checks
    const resizeCanvas = () => {
      if (!canvas || !ctx) return
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.offsetWidth
        canvas.height = container.offsetHeight
      }
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create AI nodes and connections
    const aiNodes = Array.from({ length: 8 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 0.5 + 0.2,
      connections: [] as number[],
      pulseOffset: Math.random() * Math.PI * 2,
      dataPath: Array.from({ length: 20 }, () => ({ x: 0, y: 0 }))
    }))

    // Create connections between nodes
    aiNodes.forEach((node, i) => {
      const numConnections = Math.floor(Math.random() * 3) + 1
      for (let j = 0; j < numConnections; j++) {
        let target = Math.floor(Math.random() * aiNodes.length)
        if (target !== i && !node.connections.includes(target)) {
          node.connections.push(target)
        }
      }
    })

    function animate() {
      if (!canvas || !ctx) return
      
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      aiNodes.forEach((node, i) => {
        // Update node position in a controlled area
        node.x += Math.cos(node.pulseOffset) * node.speed
        node.y += Math.sin(node.pulseOffset) * node.speed
        node.pulseOffset += 0.02

        // Keep nodes within bounds
        if (node.x < 0 || node.x > canvas.width) node.x = canvas.width / 2
        if (node.y < 0 || node.y > canvas.height) node.y = canvas.height / 2

        // Update data path
        node.dataPath.push({ x: node.x, y: node.y })
        if (node.dataPath.length > 20) node.dataPath.shift()

        // Draw connections with data flow
        node.connections.forEach(targetIndex => {
          if (!ctx) return
          const target = aiNodes[targetIndex]
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(target.x, target.y)
          ctx.strokeStyle = `rgba(255, 255, 255, 0.2)`
          ctx.stroke()

          // Draw moving data particles
          const dx = target.x - node.x
          const dy = target.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const particlePos = (Date.now() / 1000) % 1
          const px = node.x + dx * particlePos
          const py = node.y + dy * particlePos

          ctx.beginPath()
          ctx.arc(px, py, 2, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
          ctx.fill()
        })

        // Draw node with pulse effect
        if (!ctx) return
        const pulse = Math.sin(node.pulseOffset) * 0.5 + 1
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.size * pulse
        )
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)")
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
        
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size * pulse, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }
    animate()

    return () => window.removeEventListener("resize", resizeCanvas)
  }, [])

  // Third animation for Enhanced Vision Integration
  useEffect(() => {
    const canvas = canvasRef3.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.offsetWidth
        canvas.height = container.offsetHeight
      }
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create enhanced vision nodes
    const visionNodes = Array.from({ length: 12 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 2,
      speed: Math.random() * 0.3 + 0.1,
      angle: Math.random() * Math.PI * 2,
      pulseOffset: Math.random() * Math.PI * 2,
      trails: Array.from({ length: 5 }, () => ({
        offset: Math.random() * Math.PI * 2,
        length: Math.random() * 40 + 20,
        speed: Math.random() * 0.02 + 0.01
      }))
    }))

    function animate() {
      if (!canvas || !ctx) return
      
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      visionNodes.forEach((node, i) => {
        // Update node position in an orbital pattern
        node.angle += node.speed * 0.02
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const radius = canvas.height / 3
        node.x = centerX + Math.cos(node.angle) * radius * (0.8 + Math.sin(node.pulseOffset) * 0.2)
        node.y = centerY + Math.sin(node.angle) * radius * (0.8 + Math.cos(node.pulseOffset) * 0.2)
        node.pulseOffset += 0.01

        // Draw trailing effects
        node.trails.forEach(trail => {
          if (!ctx) return
          trail.offset += trail.speed
          ctx.beginPath()
          for (let t = 0; t < trail.length; t++) {
            const trailAngle = node.angle - (t * 0.1) + trail.offset
            const x = node.x + Math.cos(trailAngle) * t
            const y = node.y + Math.sin(trailAngle) * t
            ctx.lineTo(x, y)
          }
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 - trail.length * 0.1})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        })

        // Connect nodes with dynamic lines
        visionNodes.forEach((other, j) => {
          if (i === j || !ctx) return
          const dx = other.x - node.x
          const dy = other.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
            const gradient = ctx.createLinearGradient(node.x, node.y, other.x, other.y)
            gradient.addColorStop(0, `rgba(255, 255, 255, ${0.4 - distance / 400})`)
            gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })

        // Draw glowing node
        if (!ctx) return
        const glow = Math.sin(node.pulseOffset) * 0.5 + 1.5
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.size * glow
        )
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)")
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
        
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size * glow, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }
    animate()

    return () => window.removeEventListener("resize", resizeCanvas)
  }, [])

  // Update scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      if (!titleRef.current) return
      const titleElement = titleRef.current
      const section = document.getElementById('capabilities')
      if (!section) return
      
      const sectionTop = section.offsetTop
      const sectionBottom = sectionTop + section.offsetHeight - window.innerHeight
      const scrollPosition = window.scrollY - sectionTop

      if (scrollPosition >= 0 && window.scrollY < sectionBottom) {
        titleElement.classList.add(
          'fixed',
          'top-24',
          'left-8',
          'z-40',
          'drop-shadow-[0_0_25px_rgba(0,0,0,0.8)]'
        )
      } else {
        titleElement.classList.remove(
          'fixed',
          'top-24',
          'left-8',
          'z-40',
          'drop-shadow-[0_0_25px_rgba(0,0,0,0.8)]'
        )
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="capabilities" className="relative pt-24">
      {/* Title that will stick while scrolling */}
      <div ref={titleRef} className="transition-all duration-300">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2">
          <div className="flex items-center justify-center md:justify-start pl-12">
            <h2 className="text-6xl md:text-6xl font-bold text-white tracking-tighter drop-shadow-[0_0_25px_rgba(0,0,0,0.8)]">
              Capabilities
            </h2>
          </div>
        </div>
      </div>

      {/* Capabilities Cards with Dividers */}
      <div className="relative">
        {/* First capability - Spatial Awareness */}
        <div className="min-h-screen sticky top-0 flex items-center">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 relative">
            <div className="relative h-[600px]">
              <canvas ref={canvasRef1} className="absolute inset-0 w-full h-full rounded-lg" />
            </div>
            
            {/* Vertical Divider */}
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 w-[1px] h-[70%]">
              <div className="w-full h-full bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
            </div>

            <div className="p-8">
              <Card className="bg-black/40 border-white/10 backdrop-blur-sm transform transition-all duration-500 hover:scale-105">
                <div className="p-8">
                  <h3 className="text-4xl font-bold text-white mb-8 tracking-tighter">
                    Spatial Awareness
                  </h3>
                  <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                    <p>
                      Tactical Hive provides unparalleled visibility by mapping terrains 
                      and tracking assets in real time. Our technology ensures a 360-degree 
                      perspective, enabling rapid identification and response to threats 
                      across diverse and challenging environments.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Second capability - Intelligent Teaming */}
        <div className="min-h-screen sticky top-0 flex items-center">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 relative">
            <div className="relative h-[600px]">
              <canvas ref={canvasRef2} className="absolute inset-0 w-full h-full rounded-lg" />
            </div>
            
            {/* Vertical Divider */}
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 w-[1px] h-[70%]">
              <div className="w-full h-full bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
            </div>

            <div className="p-8">
              <Card className="bg-black/40 border-white/10 backdrop-blur-sm transform transition-all duration-500 hover:scale-105">
                <div className="p-8">
                  <h3 className="text-4xl font-bold text-white mb-8 tracking-tighter">
                    Intelligent Teaming
                  </h3>
                  <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                    <p>
                      Our AI-powered system optimizes coordination between UAVs, ground 
                      vehicles, and human operatives. This intelligent collaboration 
                      enhances mission efficiency, enabling seamless communication and 
                      execution across multi-domain operations.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Third capability - Enhanced Vision Integration */}
        <div className="min-h-screen sticky top-0 flex items-center">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 relative">
            <div className="relative h-[600px]">
              <canvas ref={canvasRef3} className="absolute inset-0 w-full h-full rounded-lg" />
            </div>
            
            {/* Vertical Divider */}
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 w-[1px] h-[70%]">
              <div className="w-full h-full bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
            </div>

            <div className="p-8">
              <Card className="bg-black/40 border-white/10 backdrop-blur-sm transform transition-all duration-500 hover:scale-105">
                <div className="p-8">
                  <h3 className="text-4xl font-bold text-white mb-8 tracking-tighter">
                    Enhanced Vision Integration
                  </h3>
                  <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                    <p>
                      Tactical Hive can be seamlessly integrated with existing systems 
                      that feature vision capabilities. By upgrading these systems with 
                      AI-driven precision, we transform them into powerful tools for 
                      reconnaissance, targeting, and situational awareness.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}