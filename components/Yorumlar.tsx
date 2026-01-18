'use client';

import { Star, User } from 'lucide-react';

const testimonials = [
  { id: 1, name: 'Ahmet Yılmaz', location: 'İstanbul', text: 'Bayraklar Otomotiv ile mükemmel deneyim!', vehicle: 'Mercedes' },
  { id: 2, name: 'Fatma Demir', location: 'Ankara', text: '52 yıllık tecrübe hissediliyor. Harika!', vehicle: 'BMW' },
  { id: 3, name: 'Mehmet Kaya', location: 'İzmir', text: 'Ekspertiz garantisi çok rahatlattı.', vehicle: 'Audi' },
  { id: 4, name: 'Ayşe Şahin', location: 'Bursa', text: 'Fiyat konusunda çok yardımcı oldular.', vehicle: 'Volvo' },
  { id: 5, name: 'Mustafa Öztürk', location: 'Antalya', text: 'Profesyonellik ve güven bir arada!', vehicle: 'Porsche' },
  { id: 6, name: 'Zeynep Arslan', location: 'Konya', text: 'Saygılı ve bilgilendirici ekip.', vehicle: 'Range Rover' },
];

export default function Yorumlar() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-gray-100 via-white to-gray-50 w-full">
      <style jsx>{`
        @keyframes scrollMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollMarqueeReverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-row {
          display: flex;
          width: max-content;
        }
        .marquee-animate {
          animation: scrollMarquee 20s linear infinite;
        }
        .marquee-animate-reverse {
          animation: scrollMarqueeReverse 25s linear infinite;
        }
      `}</style>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 px-4">
          <span className="inline-block px-4 py-1.5 bg-gray-900 text-white text-xs sm:text-sm font-bold rounded-full mb-3">
            MÜŞTERİ YORUMLARI
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-gray-900 mb-2">
            Mutlu Müşterilerimiz
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            10.000+ müşterimizin güvenini kazandık
          </p>
          <p className="text-gray-500 text-xs sm:text-sm mt-2 italic">
            Satın alınan araçlarımız sonrasında yapılan anket sonuçlarımızdan bu yorumlar sistemimize çekilmiştir.
          </p>
        </div>

        {/* Row 1 - Animated */}
        <div className="relative mb-4 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-100 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="marquee-row marquee-animate">
            {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="flex-shrink-0 w-[280px] mx-3">
                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 h-full">
                  <div className="h-1 bg-gradient-to-r from-red-500 to-red-400 rounded-full mb-3" />
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm mb-3">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                      <p className="text-gray-500 text-xs">{t.location} • {t.vehicle}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Animated Reverse */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="marquee-row marquee-animate-reverse">
            {[...testimonials.slice().reverse(), ...testimonials.slice().reverse(), ...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((t, i) => (
              <div key={i} className="flex-shrink-0 w-[280px] mx-3">
                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 h-full">
                  <div className="h-1 bg-gradient-to-r from-red-500 to-red-400 rounded-full mb-3" />
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm mb-3">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                      <p className="text-gray-500 text-xs">{t.location} • {t.vehicle}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-10 sm:mt-14 max-w-3xl mx-auto px-4">
          <div className="text-center p-3 sm:p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="text-xl sm:text-2xl md:text-4xl font-black text-[#dc2626]">10.000+</div>
            <p className="text-[10px] sm:text-xs text-gray-600 mt-1">Mutlu Müşteri</p>
          </div>
          <div className="text-center p-3 sm:p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="text-xl sm:text-2xl md:text-4xl font-black text-[#dc2626]">4.9/5</div>
            <p className="text-[10px] sm:text-xs text-gray-600 mt-1">Ortalama Puan</p>
          </div>
          <div className="text-center p-3 sm:p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="text-xl sm:text-2xl md:text-4xl font-black text-[#dc2626]">%98</div>
            <p className="text-[10px] sm:text-xs text-gray-600 mt-1">Memnuniyet</p>
          </div>
        </div>
      </div>
    </section>
  );
}
