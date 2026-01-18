'use client';

const brands = [
  { name: 'Mercedes-Benz', logo: 'https://www.carlogos.org/car-logos/mercedes-benz-logo.png' },
  { name: 'BMW', logo: 'https://www.carlogos.org/car-logos/bmw-logo.png' },
  { name: 'Audi', logo: 'https://www.carlogos.org/car-logos/audi-logo.png' },
  { name: 'Volkswagen', logo: 'https://www.carlogos.org/car-logos/volkswagen-logo.png' },
  { name: 'Volvo', logo: 'https://www.carlogos.org/car-logos/volvo-logo.png' },
  { name: 'Land Rover', logo: 'https://www.carlogos.org/car-logos/land-rover-logo.png' },
  { name: 'Porsche', logo: 'https://www.carlogos.org/car-logos/porsche-logo.png' },
];

export default function Marquee() {
  return (
    <section className="py-6 bg-gradient-to-r from-gray-50 via-white to-gray-50 w-full">
      <style jsx>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .brand-marquee {
          display: flex;
          width: max-content;
          animation: marqueeScroll 15s linear infinite;
        }
      `}</style>
      
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

        <div className="brand-marquee">
          {[...brands, ...brands, ...brands, ...brands, ...brands, ...brands].map((brand, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center w-28 sm:w-36 h-16 sm:h-20 bg-white rounded-xl shadow-sm mx-2"
            >
              <img 
                src={brand.logo} 
                alt={brand.name}
                className="h-8 sm:h-12 w-auto object-contain pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
