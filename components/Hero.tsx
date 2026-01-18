'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const defaultHeroImages = ['/hero.webp', '/hero2.webp', '/hero3.webp'];

function useCountUp(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true);
    }
  }, [startOnView]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasStarted]);

  return { count, ref };
}

function StatCounter({ value, label, suffix = '', delay = 0 }: { value: number; label: string; suffix?: string; delay?: number }) {
  const { count, ref } = useCountUp(value, 4000);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-center hover:bg-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-300"
    >
      <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
        {count}{suffix}
      </div>
      <div className="text-white/70 text-xs">{label}</div>
    </motion.div>
  );
}

function HeroStatBox({ value, label, suffix = '', delay = 0 }: { value: number; label: string; suffix?: string; delay?: number }) {
  const { count, ref } = useCountUp(value, 3000);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, boxShadow: "0 25px 50px rgba(0,0,0,0.18)" }}
      whileTap={{ scale: 0.98 }}
      style={{ transformStyle: "preserve-3d" }}
      className="group relative bg-white rounded-xl px-4 py-4 sm:px-6 sm:py-5 shadow-[0_15px_35px_rgba(0,0,0,0.12)] border border-gray-200 hover:border-gray-300 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* 3D Bottom Shadow */}
      <div className="absolute -bottom-2 left-2 right-2 h-4 bg-gray-300/50 rounded-xl blur-md -z-10"/>
      {/* Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#dc2626] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"/>
      
      <div className="relative flex flex-col sm:flex-row sm:items-baseline sm:gap-1">
        <span className="text-xl sm:text-2xl font-black text-gray-900">{count}{suffix}</span>
        <span className="text-xs sm:text-sm font-bold text-gray-700">{label}</span>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [heroImages, setHeroImages] = useState<string[]>(defaultHeroImages);

  useEffect(() => {
    fetch('/api/admin/data')
      .then(res => res.json())
      .then(data => {
        if (data.heroImages && data.heroImages.length > 0) {
          setHeroImages(data.heroImages.map((h: { image: string }) => h.image));
        }
      })
      .catch(() => {});
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white">
      {/* Professional Shadow Effects Background */}
      <div className="absolute inset-0">
        {/* Large visible shadow blobs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gray-300/80 rounded-full blur-[120px]"/>
        <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-gray-400/60 rounded-full blur-[100px]"/>
        <div className="absolute bottom-0 left-1/4 w-[700px] h-[500px] bg-gray-300/70 rounded-full blur-[150px]"/>
        <div className="absolute bottom-20 right-20 w-[400px] h-[400px] bg-gray-400/50 rounded-full blur-[80px]"/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gray-200/60 rounded-full blur-[100px]"/>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #666 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}/>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[650px]">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-tight"
            >
              BAYRAKLAR
              <span className="block text-gray-900">OTOMOTİV</span>
            </motion.h1>

            {/* Slogan */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
              className="relative py-2"
            >
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black italic text-[#dc2626] drop-shadow-sm">
                "Hayallerinden yola çık."
              </span>
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -bottom-1 left-0 w-48 h-1 bg-gradient-to-r from-[#dc2626] to-transparent rounded-full origin-left"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-600 max-w-md leading-relaxed"
            >
              52 yıllık deneyimimizle lüks, güven ve tecrübe ile otomotiv sektöründe hizmet veriyoruz.
            </motion.p>

            {/* Buttons with Amazing Effects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#vitrin"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(220,38,38,0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white font-semibold rounded-xl shadow-[0_10px_30px_rgba(220,38,38,0.3)] transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Araçları İncele →</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#b91c1c] to-[#991b1b] opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"/>
                </div>
              </motion.a>
              <motion.a
                href="#iletisim"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">İletişime Geç</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"/>
                </div>
              </motion.a>
            </motion.div>

            {/* Stats in 2x2 Grid - Below Buttons with 3D Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 gap-3 sm:gap-4 pt-8 max-w-md"
            >
              <HeroStatBox value={52} label="Yıl Tecrübe" suffix="+" delay={0.7} />
              <HeroStatBox value={10} label="Mutlu Müşteri" suffix="K+" delay={0.8} />
              <HeroStatBox value={500} label="Satılan Araç" suffix="+" delay={0.9} />
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                whileHover={{ y: -5, boxShadow: "0 25px 50px rgba(0,0,0,0.18)" }}
                whileTap={{ scale: 0.98 }}
                style={{ transformStyle: "preserve-3d" }}
                className="group relative bg-white rounded-xl px-4 py-4 sm:px-6 sm:py-5 shadow-[0_15px_35px_rgba(0,0,0,0.12)] border border-gray-200 hover:border-gray-300 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#dc2626] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"/>
                <div className="relative flex flex-col sm:flex-row sm:items-baseline sm:gap-1">
                  <span className="text-xl sm:text-2xl font-black text-gray-900">7/24</span>
                  <span className="text-xs sm:text-sm font-bold text-gray-700">Destek</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right - Image Carousel - Clean & Big */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Clean Image Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
              {/* Image */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage}
                  src={heroImages[currentImage]}
                  alt="Bayraklar Otomotiv"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-[500px] object-cover"
                />
              </AnimatePresence>

              {/* Navigation Arrows - Minimal */}
              <div className="absolute top-1/2 -translate-y-1/2 left-3 right-3 flex justify-between z-20 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <motion.button
                  onClick={prevImage}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/90 transition-all"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </motion.button>
                <motion.button
                  onClick={nextImage}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/90 transition-all"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </motion.button>
              </div>

              {/* Dots Indicator */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`h-3 rounded-full transition-all duration-300 shadow-lg ${
                      currentImage === index ? 'bg-white w-10' : 'bg-white/50 w-3 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
