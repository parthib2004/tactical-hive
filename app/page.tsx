import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Story from "@/components/story"
import Capabilities from "@/components/capabilities"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen pt-16">
      <Navbar />
      <Hero />
      <Story />
      <Capabilities />
      <Contact />
      <Footer />
    </main>
  )
}

