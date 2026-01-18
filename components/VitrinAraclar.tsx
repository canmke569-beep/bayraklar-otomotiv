'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Vehicle {
  id: number;
  title: string;
  subtitle: string;
  images: string[];
}

export default function VitrinAraclar() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    fetch('/api/admin/data')
      .then(res => res.json())
      .then(data => {
        if (data.vehicles) {
          setVehicles(data.vehicles.slice(0, 6));
        }
      })
      .catch(() => {
        // Fallback data
        setVehicles([
          { id: 1, title: "2024 SKODA SUPERB 1.5 TSi PREMIUM", subtitle: "BOYASIZ", images: ['/RESİM1.png'] },
          { id: 2, title: "2024 FORD FOCUS 1.5 ECOBLUE", subtitle: "TİTANİUM STİL", images: ['/RESİM2.png'] },
          { id: 3, title: "2025 MERCEDES GLC 180 AMG", subtitle: "FULL PAKET", images: ['/RESİM3.png'] },
          { id: 4, title: "2024 HYUNDAİ STARİA 2.2 CRDİ", subtitle: "ELİTE TAM DOLU", images: ['/RESİM4.png'] },
          { id: 5, title: "2023 AUDİ E-TRON GT QUATTRO", subtitle: "BAYİ HATASIZ", images: ['/RESİM5.png'] },
          { id: 6, title: "2024 FIAT EGEA 1.6 MULTIJET", subtitle: "LOUNGE DCT", images: ['/RESİM6.png'] },
        ]);
      });
  }, []);
  return (
    <section id="vitrin" className="py-16 md:py-24 bg-gradient-to-b from-gray-100 via-gray-50 to-white relative w-full max-w-full">
      {/* Stunning Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-gradient-to-br from-red-500/10 to-orange-500/5 rounded-full blur-[140px] -translate-x-1/3 -translate-y-1/4 animate-pulse"/>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-blue-500/10 to-purple-500/5 rounded-full blur-[120px] translate-x-1/4 translate-y-1/4"/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-gray-300/20 to-transparent rounded-full"/>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-full mb-4">
            VİTRİN
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Öne Çıkan Araçlarımız</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Bayraklar Otomotiv güvencesiyle, özenle seçilmiş premium araçlar
          </p>
        </motion.div>

        {/* 6 Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {vehicles.map((vehicle, index) => (
            <motion.a
              key={vehicle.id}
              href="https://bayraklarotomotiv.sahibinden.com/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-gray-300 hover:-translate-y-1"
            >
              {/* Image Area - Logo Only */}
              <div className="relative h-48 overflow-hidden select-none bg-gradient-to-br from-gray-100 via-gray-50 to-white">
                {/* Professional Dark Logo - FILLS ENTIRE AREA */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
                  className="absolute inset-0 flex items-center justify-center p-3"
                >
                  {/* Glow Background */}
                  <div className="absolute inset-0 bg-gradient-radial from-white via-gray-50/50 to-transparent" />
                  
                  {/* Shine Animation on Hover */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                  </div>
                  
                  {/* Logo - MAXIMUM SIZE */}
                  <img 
                    src="/bayraklar-dark.png" 
                    alt="Bayraklar" 
                    className="relative w-full h-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.15)] group-hover:drop-shadow-[0_15px_40px_rgba(0,0,0,0.25)] transition-all duration-500 group-hover:scale-[1.02]" 
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                  />
                </motion.div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <span className="text-white font-semibold text-sm bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                    Detayları Gör
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-[#dc2626] transition-colors">
                  {vehicle.title}
                </h3>
                <p className="text-gray-500 text-sm">{vehicle.subtitle}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="https://bayraklarotomotiv.sahibinden.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#dc2626] text-white font-bold rounded-xl hover:bg-[#b91c1c] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ExternalLink className="w-5 h-5" />
            Tüm Araçları Sahibinden'de Gör
          </a>
        </motion.div>
      </div>
    </section>
  );
}
