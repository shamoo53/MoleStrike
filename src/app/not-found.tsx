'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const astronautRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create a timeline for smooth animations
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Animate the stars in the background
    gsap.set('.star', {
      x: () => Math.random() * window.innerWidth,
      y: () => Math.random() * window.innerHeight,
      scale: () => Math.random() * 0.5 + 0.5,
      opacity: 0
    });
    
    gsap.to('.star', {
      opacity: () => Math.random() * 0.8 + 0.2,
      stagger: 0.003,
      duration: 3
    });
    
    // Twinkling stars effect
    gsap.to('.star', {
      opacity: () => Math.random() * 0.5 + 0.3,
      scale: () => Math.random() * 0.3 + 0.7,
      repeat: -1,
      yoyo: true,
      duration: () => Math.random() * 3 + 2,
      ease: 'sine.inOut',
      stagger: {
        each: 0.2,
        from: 'random'
      }
    });
    
    // Animate planets
    gsap.to('.planet', {
      rotation: 360,
      transformOrigin: 'center center',
      duration: 120,
      repeat: -1,
      ease: 'none'
    });
    
    // Main animation sequence
    tl.from(numberRef.current, {
      y: -100,
      opacity: 0,
      duration: 1.2,
      scale: 0.5
    })
    .from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8
    }, '-=0.5')
    .from(textRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8
    }, '-=0.3')
    .from(buttonRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8
    }, '-=0.3')
    .from(astronautRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 1
    }, '-=0.5');
    
    // Floating astronaut animation
    gsap.to(astronautRef.current, {
      y: '-=20',
      x: '+=10',
      rotation: '-=5',
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    
    // Subtle rotation of the astronaut
    gsap.to('.astronaut-svg', {
      rotation: '+=5',
      transformOrigin: 'center center',
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    
    return () => {
      // Clean up animations
      tl.kill();
      gsap.killTweensOf('.star');
      gsap.killTweensOf('.planet');
      gsap.killTweensOf(astronautRef.current);
      gsap.killTweensOf('.astronaut-svg');
    };
  }, []);

  return (
    <div 
      className="min-h-screen bg-[#0a0a1f] flex flex-col items-center justify-center relative overflow-hidden" 
      ref={containerRef}
    >
      {/* Stars background */}
      <div className="absolute inset-0" ref={starsRef}>
        {[...Array(150)].map((_, i) => (
          <div 
            key={i} 
            className="star absolute w-1 h-1 rounded-full bg-white"
          />
        ))}
        
        {/* Distant planets */}
        <div className="planet absolute top-[15%] right-[10%] w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-900 opacity-70"></div>
        <div className="planet absolute bottom-[20%] left-[15%] w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-800 opacity-50"></div>
      </div>
      
      <div className="z-10 text-center px-4 max-w-3xl">
        <div className="mb-8" ref={numberRef}>
          <div className="text-[180px] font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-blue-500 bg-clip-text text-transparent leading-none">
            404
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white" ref={titleRef}>
          Houston, We Have a Problem
        </h1>
        
        <p className="text-xl text-gray-300 mb-10" ref={textRef}>
          The page you're looking for has drifted off into deep space. 
          Our astronaut is searching for it, but in the meantime, let's get you back to familiar territory.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center" ref={buttonRef}>
          <Link href="/" className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <Home size={20} />
            Return to Earth
          </Link>
          
          <button 
            onClick={() => window.history.back()} 
            className="px-8 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white font-medium flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft size={20} />
            Previous Coordinates
          </button>
        </div>
      </div>
      
      {/* Animated astronaut */}
      <div 
        className="mt-16 relative" 
        style={{ width: '200px', height: '200px' }}
        ref={astronautRef}
      >
        <div className="astronaut-svg w-full h-full">
          <img 
            src="/astronaut.svg" 
            alt="Lost Astronaut" 
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Tether/rope effect */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-40 bg-gradient-to-b from-white to-transparent opacity-50"></div>
      </div>
    </div>
  );
}