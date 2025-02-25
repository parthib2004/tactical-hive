"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

export default function Story() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.offsetWidth
        canvas.height = container.offsetHeight
      }
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create nodes for network effect with updated parameters
    const nodes = Array.from({ length: 20 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1,
      radius: Math.random() * 1.5 + 0.5,
      glow: Math.random() * 20 + 10
    }))

    function animate() {
      if (!ctx) return
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      if (canvas) {
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      nodes.forEach((node, i) => {
        // Update position with boundary check
        node.x += node.vx
        node.y += node.vy

        // Bounce with damping
        if (canvas) {
          if (node.x < 0 || node.x > canvas.width) {
            node.vx *= -0.8
            node.x = Math.max(0, Math.min(node.x, canvas.width))
          }
          if (node.y < 0 || node.y > canvas.height) {
            node.vy *= -0.8
            node.y = Math.max(0, Math.min(node.y, canvas.height))
          }
        }

        // Draw glowing node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.fill()

        // Add glow effect
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.glow
        )
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.3)")
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
        ctx.fillStyle = gradient
        ctx.fill()

        // Draw connections with gradient
        nodes.forEach((otherNode, j) => {
          if (i === j) return
          const dx = otherNode.x - node.x
          const dy = otherNode.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 120) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(otherNode.x, otherNode.y)
            
            const gradient = ctx.createLinearGradient(
              node.x, node.y, otherNode.x, otherNode.y
            )
            gradient.addColorStop(0, `rgba(255, 255, 255, ${0.3 - distance / 400})`)
            gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }
    animate()

    return () => window.removeEventListener("resize", resizeCanvas)
  }, [])

  return (
    <section id="our-story" className="relative min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-24">
      {/* Left side - Animation */}
      <div className="relative h-[500px] mx-auto w-full max-w-[500px]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full rounded-lg"
        />
      </div>

      {/* Vertical Divider */}
      <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 w-[1px] h-[70%]">
        <div className="w-full h-full bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
      </div>

      {/* Right side - Story */}
      <div className="p-8">
        <Card className="bg-black/40 border-white/10 backdrop-blur-sm transform transition-all duration-500 hover:scale-105">
          <div className="p-8">
            <h2 className="text-4xl font-bold text-white mb-8 tracking-tighter">
              Our Story
            </h2>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                Tactical Hive is the next generation of defense innovation, bringing 
                cutting-edge technology to the South Asian region and beyond. Born 
                from a deep understanding of modern combat dynamics, our mission is 
                to empower armed forces with tools that make intelligence gathering 
                faster and decision-making smarter.
              </p>
              <p>
                At the heart of Tactical Hive lies an AI-infused consciousness that 
                integrates seamlessly into existing systems.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
