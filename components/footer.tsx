export default function Footer() {
  return (
    <footer className="bg-black/50 backdrop-blur-sm border-t border-white/10">
      <div className="container mx-auto py-16 px-4">
        {/* Logo */}
        <div className="flex flex-col items-center mb-12">
          <div className="text-4xl font-black tracking-tighter mb-2">
            <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
              TECH
            </span>
            <span className="text-white ml-2">HIVE</span>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm text-gray-400">
          <a href="/careers" className="hover:text-white transition-colors">
            Careers
          </a>
          <a href="/company" className="hover:text-white transition-colors">
            Company
          </a>
          <a href="/newsroom" className="hover:text-white transition-colors">
            Newsroom
          </a>
          <a href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Tactical Hive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
