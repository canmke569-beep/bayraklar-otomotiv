'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsFading(true), 3000);
    const hideTimer = setTimeout(() => setIsVisible(false), 3500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-opacity duration-500 ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="relative flex items-center justify-center">
        {/* Spinning short arc with dot */}
        <div className="absolute w-[180px] h-[180px] sm:w-[220px] sm:h-[220px]" style={{ animation: 'spin 2s linear infinite' }}>
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="46" 
              fill="none" 
              stroke="#dc2626" 
              strokeWidth="2" 
              strokeLinecap="round"
              strokeDasharray="70 220"
              opacity="0.7"
            />
            <circle cx="96" cy="50" r="4" fill="#dc2626" />
          </svg>
        </div>

        {/* Logo - STATIC in center */}
        <div className="relative w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] flex items-center justify-center">
          <Image
            src="/bayraklaroto.png"
            alt="Bayraklar Otomotiv"
            width={120}
            height={120}
            className="w-full h-full object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
