export default function Footer() {
  return (
    <footer className="bg-charcoal text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-brown text-white flex items-center justify-center rotate-45">
                <span className="-rotate-45 font-display font-bold">dc</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-2xl leading-none text-white">Meni</span>
                <span className="text-[10px] tracking-[0.2em] text-sand uppercase">Derma Clinic</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Expert dermatological care focused on enhancing your natural beauty. We provide advanced treatments for all skin, hair, and nail conditions.
            </p>
          </div>
          <div>
            <h4 className="font-display text-xl mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="/" className="hover:text-brown transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-brown transition-colors">About Us</a></li>
              <li><a href="/services" className="hover:text-brown transition-colors">Treatments & Services</a></li>
              <li><a href="/faq" className="hover:text-brown transition-colors">FAQs</a></li>
              <li><a href="/contact" className="hover:text-brown transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-xl mb-6">Treatments</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="/treatments/cosmetic" className="hover:text-brown transition-colors">Cosmetic Dermatology</a></li>
              <li><a href="/treatments/medical" className="hover:text-brown transition-colors">Medical Dermatology</a></li>
              <li><a href="/treatments/laser" className="hover:text-brown transition-colors">Laser Therapy</a></li>
              <li><a href="/treatments/anti-aging" className="hover:text-brown transition-colors">Anti-Aging</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-xl mb-6">Contact Info</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex gap-3">
                <span className="text-brown mt-1">📍</span>
                <span>123 Clinic Street, Indiranagar, Bengaluru, Karnataka 560038</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brown mt-1">📞</span>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brown mt-1">✉️</span>
                <span>info@meniclinic.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Meni Derma Clinic. All Rights Reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-brown transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brown transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}