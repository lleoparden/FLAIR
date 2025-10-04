import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl font-black tracking-tighter">FLAIR.</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md font-light leading-relaxed">
              Define your form. Express your identity. Experience the perfect blend of comfort and bold design.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition-all group">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition-all group">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition-all group">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 tracking-wide">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors font-light">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors font-light">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors font-light">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors font-light">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4 tracking-wide">Stay Updated</h3>
            <p className="text-gray-400 mb-4 text-sm font-light">
              Subscribe to get special offers and updates
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-transparent border border-gray-700 focus:border-white focus:outline-none text-sm"
              />
              <button className="px-4 py-2 bg-white text-black hover:bg-gray-200 transition-colors">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm font-light">
              © 2025 FLAIR. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors font-light">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors font-light">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors font-light">
                Shipping Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}