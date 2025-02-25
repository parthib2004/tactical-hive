"use client"

import { useEffect, useRef } from "react"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Network nodes
    const nodes: { x: number; y: number; vx: number; vy: number }[] = []
    for (let i = 0; i < 50; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      })
    }

    // Animation
    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx
        node.y += node.vy

        // Bounce off walls
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
        ctx.fill()

        // Draw connections
        nodes.forEach((otherNode, j) => {
          if (i === j) return
          const dx = otherNode.x - node.x
          const dy = otherNode.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(otherNode.x, otherNode.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 150})`
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <div className="relative min-h-screen">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      {/* Text container without background box */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="mb-8 text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-300">
              Dominating Intelligence with Hive Mind
            </span>
          </h1>
          <p className="mx-auto max-w-[800px] text-lg md:text-xl text-gray-100 font-medium leading-relaxed drop-shadow-lg">
            Making the world's best Hive mind to make Intelligence gathering
            <span className="text-white font-bold"> 10 times </span> 
            faster and prepare defenses with Consciousness of data in the
            <span className="text-white font-bold"> South Asian region</span>.
          </p>
        </div>
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-[5]" />
    </div>
  )
}

