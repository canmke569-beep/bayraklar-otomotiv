'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: 'Araç Alırken Dikkat Edilmesi Gereken Önemli Noktalar',
    excerpt: 'İkinci el araç alırken nelere dikkat etmelisiniz? Uzman görüşleriyle hazırladığımız bu rehber ile doğru kararlar verin. Ekspertiz raporu, kilometre kontrolü ve daha fazlası...',
    content: 'İkinci el araç alırken dikkat edilmesi gereken en önemli noktalar arasında ekspertiz raporu, kilometre sayacı kontrolü, servis geçmişi ve hasar kaydı bulunmaktadır. Bayraklar Otomotiv olarak 52 yıllık tecrübemizle sizlere en güvenilir araçları sunuyoruz.',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800&auto=format&fit=crop',
    date: '15 Ocak 2026',
    readTime: '5 dk',
  },
  {
    id: 2,
    title: 'Premium Araçlarda Bakım ve Servis Önerileri',
    excerpt: 'Lüks araçlarınızın performansını korumak için düzenli bakım ve servis tavsiyeleri. Mercedes, BMW, Audi gibi premium markalarda nelere dikkat etmelisiniz?',
    content: 'Premium segment araçlar özel bakım gerektirir. Yağ değişimi, fren kontrolü, lastik rotasyonu gibi periyodik bakımlar aracınızın ömrünü uzatır.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop',
    date: '12 Ocak 2026',
    readTime: '4 dk',
  },
  {
    id: 3,
    title: 'Otomotiv Sektöründe 2026 Trendleri',
    excerpt: 'Elektrikli araçlar, hibrit teknolojiler ve otonom sürüş sistemleri - 2026 yılında otomotiv sektöründe neler bekleniyor?',
    content: 'Elektrikli araç satışları artmaya devam ederken, hibrit modeller de popülerliğini koruyor. Otonom sürüş teknolojileri her geçen gün gelişiyor.',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=800&auto=format&fit=crop',
    date: '10 Ocak 2026',
    readTime: '6 dk',
  },
  {
    id: 4,
    title: 'İkinci El Araç Değerleme Rehberi',
    excerpt: 'Aracınızın gerçek değerini nasıl öğrenirsiniz? Kilometre, yaş, hasar durumu ve marka faktörlerinin fiyata etkisi hakkında detaylı bilgi.',
    content: 'Araç değerlemesinde kilometre, yaş, hasar geçmişi ve bakım durumu en önemli faktörlerdir. Profesyonel ekspertiz hizmeti alarak doğru fiyatı belirleyin.',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop',
    date: '8 Ocak 2026',
    readTime: '5 dk',
  },
  {
    id: 5,
    title: 'Araç Sigortası Seçerken Dikkat Edilecekler',
    excerpt: 'Kasko mu, trafik sigortası mı? Hangi sigorta türü sizin için uygun? Sigorta seçerken bilmeniz gereken tüm detaylar bu yazıda.',
    content: 'Araç sigortası seçerken teminat kapsamı, muafiyet tutarları ve prim fiyatlarını karşılaştırmanız önemlidir. Aracınızın değerine uygun sigorta seçin.',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=800&auto=format&fit=crop',
    date: '5 Ocak 2026',
    readTime: '4 dk',
  },
  {
    id: 6,
    title: 'Kış Aylarında Araç Bakımı İpuçları',
    excerpt: 'Soğuk havalarda aracınızı nasıl korumalısınız? Akü, antifriz, lastik ve motor bakımı hakkında uzman tavsiyeleri.',
    content: 'Kış aylarında akü performansı düşer, antifriz seviyesi kontrol edilmeli ve kış lastikleri takılmalıdır. Motor yağı viskozitesi de önemlidir.',
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800&auto=format&fit=crop',
    date: '2 Ocak 2026',
    readTime: '5 dk',
  },
  {
    id: 7,
    title: 'Araç Kredisi mi, Takas mı? Hangisi Avantajlı?',
    excerpt: 'Yeni araç alırken finansman seçeneklerini değerlendirin. Kredi faiz oranları, takas avantajları ve peşin alım karşılaştırması.',
    content: 'Araç kredisi alırken faiz oranlarını, vade süresini ve toplam maliyeti hesaplayın. Takas yaparak eski aracınızı değerlendirebilirsiniz.',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800&auto=format&fit=crop',
    date: '28 Aralık 2025',
    readTime: '6 dk',
  },
  {
    id: 8,
    title: 'Bayraklar Otomotiv\'de Güvenli Alışveriş',
    excerpt: '52 yıllık tecrübemizle müşteri memnuniyetini ön planda tutuyoruz. Ekspertiz garantisi, şeffaf fiyatlandırma ve satış sonrası destek.',
    content: 'Bayraklar Otomotiv olarak tüm araçlarımız detaylı ekspertizden geçirilir. Şeffaf fiyatlandırma politikamız ve satış sonrası destek hizmetimizle yanınızdayız.',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop',
    date: '25 Aralık 2025',
    readTime: '3 dk',
  },
];

export { blogPosts };

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 3;
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentPosts = blogPosts.slice(
    currentPage * postsPerPage,
    (currentPage + 1) * postsPerPage
  );

  return (
    <section id="blog" className="py-12 md:py-20 bg-gradient-to-b from-gray-100 via-gray-50 to-white relative w-full max-w-full">
      {/* Static Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-purple-500/10 to-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-red-500/10 to-orange-500/5 rounded-full blur-[100px]" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-full mb-4">
            BLOG
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Otomotiv Dünyasından
          </h2>
          <p className="text-gray-700 text-lg font-medium max-w-2xl mx-auto">
            Araç alım-satım, bakım önerileri ve sektör haberleri hakkında en güncel içerikler
          </p>
        </motion.div>

        {/* Blog Grid with Animation */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {currentPosts.map((post, index) => (
                <Link href={`/blog/${post.id}`} key={post.id}>
                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)] transition-all duration-500 cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime} okuma</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#dc2626] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-700 text-sm font-medium leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-2 text-[#dc2626] font-semibold group-hover:gap-4 transition-all duration-300">
                      <span>Devamını Oku</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.article>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <motion.button
            onClick={prevPage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#dc2626] transition-colors duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          
          {/* Page Indicators */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  currentPage === index ? 'w-10 bg-[#dc2626]' : 'w-3 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
          
          <motion.button
            onClick={nextPage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#dc2626] transition-colors duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
