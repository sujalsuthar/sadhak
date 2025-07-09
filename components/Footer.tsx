
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-deep-maroon text-saffron py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-saffron/30">
        <div>
          <div className="flex items-center mb-2">
            <span className="text-3xl mr-2">🌼</span>
            <span className="font-bold text-2xl">Sanatana Dharma</span>
          </div>
          <div className="font-semibold mb-1">Knowledge Hub</div>
          <p className="text-saffron/90 text-sm">Preserving and sharing the eternal wisdom of our sacred scriptures for the spiritual upliftment of humanity.</p>
        </div>
        <div>
          <div className="font-bold text-lg mb-2">Quick Links</div>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Sacred Mantras</a></li>
            <li><a href="#" className="hover:underline">Divine Personalities</a></li>
            <li><a href="#" className="hover:underline">Dharma Concepts</a></li>
            <li><a href="#" className="hover:underline">Mahakavya Tour</a></li>
          </ul>
        </div>
        <div>
          <div className="font-bold text-lg mb-2">Resources</div>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Scripture Library</a></li>
            <li><a href="#" className="hover:underline">Audio Recordings</a></li>
            <li><a href="#" className="hover:underline">Study Materials</a></li>
            <li><a href="#" className="hover:underline">Community Forum</a></li>
          </ul>
        </div>
        <div>
          <div className="font-bold text-lg mb-2">Connect</div>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Newsletter</a></li>
            <li><a href="#" className="hover:underline">Events</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">Support</a></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center text-center md:text-left text-saffron/80 text-sm py-4 border-t border-saffron/20 mt-8">
        <div>
          © 2024 Sanatana Dharma Knowledge Hub. Spreading divine wisdom with devotion and authenticity.
        </div>
        <div className="mt-4 md:mt-0 bg-white/95 rounded-xl px-6 py-3 shadow-lg inline-block border border-saffron/40">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <span className="font-extrabold text-lg text-deep-maroon flex items-center">
              <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 mr-2 text-saffron' fill='none' viewBox='0 0 24 24' stroke='currentColor'><circle cx='12' cy='12' r='10' strokeWidth='2' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l3 3' /></svg>
              About Us
            </span>
            <span className="font-semibold text-deep-maroon">Contact:</span>
            <a href="mailto:sadhak.dharma@gmail.com" className="underline text-deep-maroon hover:text-saffron font-medium">sadhak.dharma@gmail.com</a>
            <span className="text-deep-maroon">|</span>
            <a href="mailto:mail@sadhak.co" className="underline text-deep-maroon hover:text-saffron font-medium">mail@sadhak.co</a>
            <span className="text-deep-maroon">|</span>
            <span className="text-deep-maroon font-medium">A7 Nilkanth, behind Vishramnagar Gurukul, Ahmedabad 380052</span>
            <span className="text-deep-maroon">|</span>
            <a href="tel:+919909948117" className="underline text-deep-maroon hover:text-saffron font-medium">+91-9909948117</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
