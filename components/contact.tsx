export default function Contact() {
  return (
    <section id="contact" className="relative min-h-[50vh] flex items-center justify-center py-24">
      <div className="text-center space-y-8">
        <h2 className="text-5xl font-bold text-white tracking-tighter">
          Work with us
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Join us in accelerating the next generation of electronic warfare and spectrum research.
        </p>
        <div className="flex items-center justify-center space-x-2 text-lg text-gray-300">
          <span>Contact:</span>
          <a 
            href="mailto:deep@tacticalhive.live"
            className="text-white hover:text-gray-300 transition-colors duration-300 border-b border-white/20 hover:border-white"
          >
            deep@tacticalhive.live
          </a>
        </div>
      </div>
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent -z-10" />
    </section>
  )
}
