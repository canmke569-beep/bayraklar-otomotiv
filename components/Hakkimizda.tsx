'use client';

import { motion } from 'framer-motion';
import { Shield, Award, Users, Clock, Check } from 'lucide-react';

const features = [
  { icon: Shield, title: 'Güvenilirlik', desc: '52 yıllık köklü geçmiş' },
  { icon: Award, title: 'Kalite', desc: 'Premium araç standartları' },
  { icon: Users, title: 'Müşteri Odaklı', desc: '10.000+ mutlu müşteri' },
  { icon: Clock, title: '7/24 Destek', desc: 'Her zaman yanınızda' },
];

const achievements = [
  '52 yıllık köklü geçmişimiz',
  'Ekspertiz garantili tüm araçlar',
  'Şeffaf ve dürüst fiyatlandırma',
  'Satış sonrası destek hizmeti',
];

export default function Hakkimizda() {
  return (
    <section id="hakkimizda" className="pt-4 md:pt-10 pb-12 md:pb-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative w-full max-w-full">
      
      {/* Static Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-gray-200/40 to-gray-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-gray-300/30 to-gray-100/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-6 py-2 bg-gray-900 text-white text-sm font-bold rounded-full mb-6 tracking-wider"
          >
            HAKKIMIZDA
          </motion.span>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            whileHover={{ scale: 1.08, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-48 h-48 mx-auto mb-8 cursor-pointer"
          >
            {/* Static Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-400/30 via-white/20 to-gray-400/30 rounded-3xl blur-2xl" />
            
            {/* Static Border Ring */}
            <div className="absolute -inset-2 rounded-3xl border-2 border-dashed border-gray-300/50" />
            
            {/* Image Container */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-gray-900/20 border border-gray-200/50 bg-white/5 backdrop-blur-sm">
              <img 
                src="/bayraklar-dark.png" 
                alt="Bayraklar Logo" 
                className="w-full h-full object-contain p-2"
              />
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight"
          >
            <span className="inline-block">
              Güvenin Adresi
            </span>
            <motion.span 
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.05em' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="block text-red-600 mt-2"
            >
              BAYRAKLAR OTOMOTİV
            </motion.span>
          </motion.h2>
          
          <p className="text-gray-700 text-lg font-medium max-w-2xl mx-auto">
            Yarım asrı aşkın deneyimimizle otomotiv sektörünün öncü kuruluşlarından biriyiz
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left - Quote Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            {/* Static Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-10 border border-gray-200/80 shadow-2xl shadow-gray-200/50 overflow-hidden">
              {/* Inner Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-100 to-transparent rounded-bl-full"/>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gray-50 to-transparent rounded-tr-full"/>
              
              <div className="relative">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-2xl md:text-3xl font-bold text-gray-900 leading-relaxed mb-6"
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    Aldatılmış her müşteri,
                  </motion.span>
                  <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-red-600 font-bold"
                  >
                    {' '}kaybedilmiş servettir.
                  </motion.span>
                </motion.p>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-gray-600 text-lg leading-relaxed mb-8"
                >
                  Bu düsturla yola çıktık ve 52 yıldır doğru adımlarla ilerlemeye devam ediyoruz. 
                  Müşteri memnuniyeti bizim için her şeyden önce gelir.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex items-center gap-4"
                >
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    src="/bayraklaroto.png" 
                    alt="Bayraklar Otomotiv" 
                    className="w-28 h-28 object-contain"
                  />
                  <div>
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="text-gray-900 font-bold text-lg"
                    >
                      Bayraklar Ailesi
                    </motion.p>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="text-gray-500 text-sm"
                    >
                      Kurucu Aile • 1972
                    </motion.p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right - Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group relative p-8 bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.18)] transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Background Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#dc2626] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"/>
                
                <div className="relative">
                  {/* Icon Container */}
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                    <feature.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-gray-900 font-bold text-xl mb-2 group-hover:text-[#dc2626] transition-colors duration-300">{feature.title}</h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm font-medium leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Light Card Matching Page Style */}
          <div className="relative bg-white rounded-3xl p-10 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden">
            
            {/* Achievement Items - Horizontal Layout */}
            <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex items-start gap-4 cursor-pointer"
                >
                  {/* Check Icon */}
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 shadow-md group-hover:bg-[#dc2626] transition-colors duration-300"
                  >
                    <Check className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </motion.div>
                  
                  {/* Text */}
                  <p className="text-gray-700 font-medium leading-relaxed group-hover:text-gray-900 transition-colors pt-2">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
