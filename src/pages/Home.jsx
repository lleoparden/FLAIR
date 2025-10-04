import { useState, useEffect } from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import tee1 from "../assets/tee1.png";
import tee2 from "../assets/tee2.webp";
import tee3 from "../assets/tee3.webp";

function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-white">
      {/* Animated subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
        <div className={`transform transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="mb-6 overflow-hidden">
            <div className={`transform transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
              <span className="text-sm font-medium tracking-[0.3em] uppercase text-gray-600">New Collection</span>
            </div>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black text-black mb-8 tracking-tighter leading-none">
            <div className="overflow-hidden">
              <div className={`transform transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
                DEFINE
              </div>
            </div>
            <div className="overflow-hidden">
              <div className={`transform transition-all duration-700 delay-700 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
                YOUR FORM
              </div>
            </div>
          </h1>
          
          <div className={`transform transition-all duration-700 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-light">
              Where minimalism meets bold expression
            </p>
          </div>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transform transition-all duration-700 delay-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <button className="group relative px-10 py-4 bg-black text-white font-medium overflow-hidden transition-all duration-300 hover:scale-105">
              <span className="relative z-10 flex items-center gap-2 justify-center">
                Shop Collection
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-12 transform transition-all duration-1000 delay-1400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-col items-center gap-3">
            <div className="w-px h-16 bg-black animate-expand-down"></div>
            <span className="text-xs tracking-wider uppercase text-gray-600">Scroll</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ id, image, title, price, oldPrice, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const handleClick = () => {
    window.location.href = `/product/${id}`;
  };

  return (
    <div 
      className={`group relative transform transition-all duration-700 cursor-pointer ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="relative overflow-hidden bg-white transition-all duration-500">
        {/* Sale badge */}
        {oldPrice && (
          <div className="absolute top-4 left-4 z-20 bg-black text-white px-3 py-1 text-xs font-medium tracking-wider uppercase">
            Sale
          </div>
        )}

        {/* Image container */}
        <div className="relative h-[500px] overflow-hidden bg-gray-50">
          <img 
            src={image} 
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}
          />
          
          {/* Quick action button */}
          <button 
            className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 px-8 py-3 bg-white text-black text-sm font-medium uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-lg ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} hover:bg-black hover:text-white`}
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            <ShoppingBag className="w-4 h-4" />
            Quick Add
          </button>
        </div>

        {/* Content */}
        <div className="p-6 bg-white">
          <h3 className="text-black text-sm font-medium mb-3 line-clamp-2 tracking-wide transition-colors duration-300">
            {title.replace(/"/g, '')}
          </h3>
          
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-black">
              {price}
            </span>
            {oldPrice && (
              <span className="text-gray-400 line-through text-sm">
                {oldPrice}
              </span>
            )}
          </div>
        </div>

        {/* Border animation on hover */}
        <div className={`absolute inset-0 border-2 border-black transition-all duration-300 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
      </div>
    </div>
  );
}

function StorySection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('story-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <div id="story-section" className="relative py-32 overflow-hidden bg-black">
      <div className="relative max-w-6xl mx-auto px-8">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="text-center mb-16">
            <div className="mb-8">
              <span className="text-xs tracking-[0.3em] uppercase text-gray-400">About</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black text-white mb-12 tracking-tighter leading-tight">
              More Than Just<br />Clothing
            </h2>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
              FLAIR is born from the belief that what you wear should empower you. 
              Each piece is designed to help you express your unique identity while 
              experiencing unmatched comfort and quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-800 mt-20 border border-gray-800">
            {[
              { title: 'Premium Quality', desc: 'Carefully crafted materials for lasting wear' },
              { title: 'Bold Designs', desc: 'Stand out with confidence and style' },
              { title: 'Comfort First', desc: 'Feel good in everything you wear' }
            ].map((item, i) => (
              <div 
                key={i}
                className={`p-12 bg-black transform transition-all duration-700 hover:bg-white group ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                style={{transitionDelay: `${i * 150}ms`}}
              >
                <div className="text-6xl font-black text-white mb-6 group-hover:text-black transition-colors">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-black transition-colors tracking-wide">
                  {item.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-600 transition-colors font-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      
      {/* Add top padding to account for fixed navbar */}
      <div className="pt-20">
        <Hero />
        
        <section className="py-24 px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="mb-6">
                <span className="text-xs tracking-[0.3em] uppercase text-gray-600">Featured</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-black tracking-tighter">
                Latest Drops
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ProductCard
                id="1"
                image={tee1}
                title="FLAIR 'DEFINE YOUR FORM' Oversized Tee – White"
                price="LE 420.00"
                oldPrice="LE 600.00"
                delay={0}
              />
              <ProductCard
                id="2"
                image={tee2}
                title="FLAIR 'FLUID' Oversized Tee – White"
                price="LE 420.00"
                oldPrice="LE 600.00"
                delay={200}
              />
              <ProductCard
                id="3"
                image={tee3}
                title="Snake's Wind Shorts"
                price="LE 550.00"
                delay={400}
              />
            </div>
          </div>
        </section>
        
        <StorySection />
      </div>

      

      <style>{`
        @keyframes expand-down {
          0% {
            height: 0;
          }
          100% {
            height: 4rem;
          }
        }

        .animate-expand-down {
          animation: expand-down 1.5s ease-out infinite;
        }
      `}</style>
    </div>
  );
}