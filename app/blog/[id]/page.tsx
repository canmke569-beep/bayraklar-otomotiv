'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const blogPosts = [
  {
    id: 1,
    title: 'Araç Alırken Dikkat Edilmesi Gereken Önemli Noktalar',
    excerpt: 'İkinci el araç alırken nelere dikkat etmelisiniz? Uzman görüşleriyle hazırladığımız bu rehber ile doğru kararlar verin.',
    content: `İkinci el araç satın almak, doğru yapıldığında büyük tasarruf sağlayabilir. Ancak dikkatli olunmadığında ciddi sorunlarla karşılaşılabilir. İşte ikinci el araç alırken dikkat etmeniz gereken önemli noktalar:

**1. Ekspertiz Raporu**
Aracı satın almadan önce mutlaka profesyonel bir ekspertiz yaptırın. Ekspertiz raporu, aracın geçmişte yaşadığı kazaları, boya durumunu ve mekanik sorunları ortaya koyar.

**2. Kilometre Kontrolü**
Kilometre sahteciliği ikinci el piyasasının en büyük sorunlarından biridir. Aracın servis kayıtlarını kontrol ederek gerçek kilometreyi öğrenebilirsiniz.

**3. Servis Geçmişi**
Düzenli bakım yapılmış araçlar daha uzun ömürlü olur. Servis defterini ve faturalarını mutlaka inceleyin.

**4. Hasar Kaydı Sorgulama**
Tramer kaydı sorgulayarak aracın geçmişte sigorta şirketlerine bildirilmiş hasarlarını öğrenebilirsiniz.

**5. Test Sürüşü**
Aracı mutlaka test edin. Motor sesi, vites geçişleri, fren performansı ve süspansiyon sistemini kontrol edin.

Bayraklar Otomotiv olarak 52 yıllık tecrübemizle tüm araçlarımız detaylı ekspertizden geçirilir ve güvenle satışa sunulur.`,
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop',
    readTime: '5 dk',
  },
  {
    id: 2,
    title: 'Premium Araçlarda Bakım ve Servis Önerileri',
    excerpt: 'Lüks araçlarınızın performansını korumak için düzenli bakım ve servis tavsiyeleri.',
    content: `Premium segment araçlar, üstün performans ve konfor sunar ancak bu özelliklerin korunması için özel bakım gerektirir. Mercedes, BMW, Audi gibi lüks markalarda dikkat edilmesi gerekenler:

**1. Orijinal Yedek Parça Kullanımı**
Premium araçlarda mutlaka orijinal veya OEM kalitesinde yedek parça kullanılmalıdır. Ucuz parçalar aracınızın performansını düşürebilir.

**2. Periyodik Bakım Takibi**
Üretici tarafından belirlenen bakım aralıklarına sadık kalın. Yağ değişimi, filtre değişimi ve fren bakımı düzenli yapılmalıdır.

**3. Yazılım Güncellemeleri**
Modern premium araçlar yazılım güncellemeleri gerektirebilir. Yetkili servislerde bu güncellemeleri yaptırın.

**4. Lastik Bakımı**
Run-flat lastikler ve performans lastikleri özel bakım gerektirir. Hava basıncı ve aşınma kontrolü düzenli yapılmalıdır.

**5. Klima ve Kabin Filtreleri**
Premium araçlarda kabin konforu önemlidir. Klima bakımı ve polen filtresi değişimi ihmal edilmemelidir.`,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
    readTime: '4 dk',
  },
  {
    id: 3,
    title: 'Otomotiv Sektöründe 2026 Trendleri',
    excerpt: 'Elektrikli araçlar, hibrit teknolojiler ve otonom sürüş sistemleri hakkında güncel bilgiler.',
    content: `Otomotiv sektörü hızla dönüşüyor. 2026 yılında öne çıkan trendler:

**1. Elektrikli Araç Devrimi**
Elektrikli araç satışları her yıl artıyor. Şarj altyapısının gelişmesiyle birlikte EV'ler daha cazip hale geliyor.

**2. Hibrit Teknolojiler**
Tam elektrikli araçlara geçiş sürecinde hibrit modeller köprü görevi görüyor. Plug-in hibrit araçlar popülerliğini koruyor.

**3. Otonom Sürüş**
Level 2 ve Level 3 otonom sürüş sistemleri yaygınlaşıyor. Şerit takibi, adaptif hız sabitleyici gibi özellikler standart hale geliyor.

**4. Bağlantılı Araçlar**
5G teknolojisi ile araçlar daha akıllı hale geliyor. Over-the-air güncellemeler ve uzaktan teşhis özellikleri artıyor.

**5. Sürdürülebilirlik**
Üreticiler karbon ayak izini azaltmak için çalışıyor. Geri dönüştürülmüş malzemeler ve çevre dostu üretim süreçleri önem kazanıyor.`,
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1200&auto=format&fit=crop',
    readTime: '6 dk',
  },
  {
    id: 4,
    title: 'İkinci El Araç Değerleme Rehberi',
    excerpt: 'Aracınızın gerçek değerini nasıl öğrenirsiniz? Detaylı değerleme rehberi.',
    content: `Aracınızı satarken veya takas ederken gerçek değerini bilmek önemlidir. İşte araç değerlemesinde dikkat edilmesi gerekenler:

**1. Kilometre Faktörü**
Düşük kilometreli araçlar daha değerlidir. Yıllık ortalama 15.000-20.000 km normal kabul edilir.

**2. Yaş ve Model Yılı**
Araç yaşı değeri doğrudan etkiler. İlk 3 yılda değer kaybı en yüksektir.

**3. Bakım Geçmişi**
Düzenli bakım yapılmış ve belgelenen araçlar daha değerlidir.

**4. Hasar Durumu**
Kazasız araçlar premium fiyatla satılır. Hasar geçmişi değeri önemli ölçüde düşürür.

**5. Marka ve Model Popülerliği**
Talep gören markalar değerini daha iyi korur. Toyota, Mercedes gibi markalar yüksek ikinci el değerine sahiptir.`,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1200&auto=format&fit=crop',
    readTime: '5 dk',
  },
  {
    id: 5,
    title: 'Araç Sigortası Seçerken Dikkat Edilecekler',
    excerpt: 'Kasko mu, trafik sigortası mı? Sigorta seçim rehberi.',
    content: `Doğru araç sigortası seçimi hem güvenliğiniz hem de bütçeniz için önemlidir:

**1. Zorunlu Trafik Sigortası**
Yasal zorunluluktur ve üçüncü şahıslara verilen zararları karşılar.

**2. Kasko Sigortası**
Kendi aracınızdaki hasarları karşılar. Çalınma, doğal afet, kaza gibi riskleri kapsar.

**3. Teminat Kapsamı**
Hangi risklerin kapsandığını detaylı inceleyin. Muafiyet tutarlarına dikkat edin.

**4. Fiyat Karşılaştırması**
Farklı sigorta şirketlerinden teklif alın. En ucuz her zaman en iyi değildir.

**5. Anlaşmalı Servisler**
Kasko poliçenizin anlaşmalı servis ağını kontrol edin.`,
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1200&auto=format&fit=crop',
    readTime: '4 dk',
  },
  {
    id: 6,
    title: 'Kış Aylarında Araç Bakımı İpuçları',
    excerpt: 'Soğuk havalarda aracınızı nasıl korumalısınız?',
    content: `Kış ayları araçlar için zorlu bir dönemdir. İşte kış bakımı için öneriler:

**1. Kış Lastikleri**
7°C altında kış lastiği kullanın. Diş derinliği en az 4mm olmalıdır.

**2. Akü Kontrolü**
Soğuk havada akü performansı düşer. 3 yaşını geçmiş aküleri kontrol ettirin.

**3. Antifriz Seviyesi**
Antifriz seviyesini ve yoğunluğunu kontrol edin. -35°C'ye kadar koruma sağlamalıdır.

**4. Cam Suyu**
Donmaya karşı dayanıklı cam suyu kullanın.

**5. Motor Yağı**
Kış aylarında daha düşük viskoziteli yağ tercih edilebilir.`,
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1200&auto=format&fit=crop',
    readTime: '5 dk',
  },
  {
    id: 7,
    title: 'Araç Kredisi mi, Takas mı? Hangisi Avantajlı?',
    excerpt: 'Finansman seçeneklerini değerlendirin.',
    content: `Yeni araç alırken finansman seçimi önemlidir:

**1. Araç Kredisi**
Banka kredisi ile araç alımında faiz oranları, vade ve toplam maliyet önemlidir.

**2. Takas**
Eski aracınızı takas vererek yeni araç alabilirsiniz. Pratik ve hızlı bir yöntemdir.

**3. Peşin Alım**
Peşin alımda pazarlık avantajı vardır. İndirim talep edebilirsiniz.

**4. Leasing**
Uzun vadeli kiralama seçeneği de değerlendirilebilir.

Bayraklar Otomotiv olarak tüm finansman seçeneklerinde size yardımcı oluyoruz.`,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop',
    readTime: '6 dk',
  },
  {
    id: 8,
    title: 'Bayraklar Otomotiv\'de Güvenli Alışveriş',
    excerpt: '52 yıllık tecrübemizle müşteri memnuniyetini ön planda tutuyoruz.',
    content: `Bayraklar Otomotiv olarak 1972'den bu yana otomotiv sektöründe hizmet veriyoruz:

**1. Ekspertiz Garantisi**
Tüm araçlarımız profesyonel ekspertizden geçirilir.

**2. Şeffaf Fiyatlandırma**
Gizli maliyet yoktur. Fiyatlarımız nettir.

**3. Geniş Araç Seçeneği**
Premium segmentten ekonomik modellere kadar geniş stok.

**4. Satış Sonrası Destek**
Satış sonrasında da yanınızdayız. Sorularınız için her zaman ulaşabilirsiniz.

**5. Takas İmkanı**
Eski aracınızı değerinde takas alıyoruz.

52 yıllık güven ve tecrübeyle Bayraklar Otomotiv'e bekliyoruz.`,
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
    readTime: '3 dk',
  },
];

export default function BlogDetailPage() {
  const params = useParams();
  const postId = parseInt(params.id as string);
  const post = blogPosts.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Blog Yazısı Bulunamadı</h1>
          <Link href="/#blog" className="text-[#dc2626] font-semibold hover:underline">
            ← Blog'a Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"/>
        
        {/* Back Button */}
        <Link 
          href="/#blog"
          className="absolute top-8 left-8 flex items-center gap-2 text-white bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-black/50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Geri Dön</span>
        </Link>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden"
        >
          <div className="p-8 md:p-12">
            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} okuma</span>
              </div>
              <span className="text-[#dc2626] font-medium">Bayraklar Otomotiv Blog</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed border-l-4 border-[#dc2626] pl-6">
              {post.excerpt}
            </p>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 font-medium">Paylaş:</span>
                  <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </button>
                </div>
                
                <Link 
                  href="/#blog"
                  className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-[#dc2626] transition-colors"
                >
                  ← Diğer Yazılar
                </Link>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Related Posts */}
        <div className="mt-16 mb-20">
          <h2 className="text-2xl font-black text-gray-900 mb-8">Diğer Blog Yazıları</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts
              .filter(p => p.id !== postId)
              .slice(0, 3)
              .map((relatedPost) => (
                <Link href={`/blog/${relatedPost.id}`} key={relatedPost.id}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                  >
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 line-clamp-2 hover:text-[#dc2626] transition-colors">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </motion.div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
