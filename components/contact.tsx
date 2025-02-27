"use client"

import { useEffect, useRef } from "react"

export default function Contact() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Animation setup
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particle settings
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2
    }))

    function animate() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }
    animate()

    return () => window.removeEventListener("resize", resizeCanvas)
  }, [])

  return (
    <section id="contact" className="relative min-h-[50vh] flex items-center justify-center py-24 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 text-center space-y-8">
        {/* Fixed spacing between words */}
        <h2 className="text-5xl font-black tracking-tighter flex items-center justify-center gap-4">
          <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            WORK
          </span>
          <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            WITH
          </span>
          <span className="bg-gradient-to-l from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            US
          </span>
        </h2>

        {/* Animated content */}
        <div className="transform transition-all duration-700 hover:scale-105">
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 opacity-90">
            Join us in accelerating the next generation of electronic warfare and spectrum research.
          </p>

          <div className="flex items-center justify-center space-x-2 text-lg">
            <span className="text-gray-400">Contact:</span>
            <a 
              href="mailto:deep@tacticalhive.live"
              className="text-white hover:text-purple-400 transition-colors duration-300 border-b border-white/20 hover:border-purple-400"
            >
              deep@tacticalhive.live
            </a>
          </div>
        </div>
      </div>
      
      {/* Enhanced background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/50 to-black -z-10" />
    </section>
  )
}
