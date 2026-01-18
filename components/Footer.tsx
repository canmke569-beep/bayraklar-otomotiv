'use client';

import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, Linkedin, Twitter } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface SocialLink {
  id: number;
  platform: string;
  url: string;
}

const menuLinks = [
  { name: 'Araclarimiz', href: '#vitrin' },
  { name: 'Kurumsal', href: '#hakkimizda' },
  { name: 'Blog', href: '#blog' },
  { name: 'Iletisim', href: '#iletisim' },
];

const brands = ['Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Volvo', 'Land Rover', 'Porsche'];

export default function Footer() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    fetch('/api/admin/data')
      .then(res => res.json())
      .then(data => {
        if (data.socialMedia && data.socialMedia.length > 0) {
          setSocialLinks(data.socialMedia);
        }
      })
      .catch(() => {});
  }, []);

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram': return <Instagram size={16} />;
      case 'Facebook': return <Facebook size={16} />;
      case 'Youtube': return <Youtube size={16} />;
      case 'Linkedin': return <Linkedin size={16} />;
      case 'Twitter': return <Twitter size={16} />;
      case 'TikTok': return <span className="text-xs font-bold">TT</span>;
      case 'WhatsApp': return <span className="text-xs font-bold">WA</span>;
      case 'Telegram': return <span className="text-xs font-bold">TG</span>;
      default: return <span className="text-xs font-bold">{platform.charAt(0)}</span>;
    }
  };

  const getSocialColor = (platform: string) => {
    switch (platform) {
      case 'Instagram': return 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400';
      case 'Facebook': return 'bg-blue-600';
      case 'Youtube': return 'bg-red-600';
      case 'Linkedin': return 'bg-blue-700';
      case 'Twitter': return 'bg-black';
      case 'TikTok': return 'bg-black';
      case 'WhatsApp': return 'bg-green-500';
      case 'Telegram': return 'bg-sky-500';
      default: return 'bg-gray-600';
    }
  };

  return (
    <footer className="bg-[#1a1a1a] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <img 
                src="/bayraklar-dark.png" 
                alt="Bayraklar Otomotiv" 
                className="h-28 sm:h-32 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm mb-6">
              52 yillik deneyim ve guvenilirlik ile otomotiv sektorunde hizmet vermeye devam ediyoruz.
            </p>
            <div className="flex gap-3 flex-wrap">
              {socialLinks.length > 0 ? (
                socialLinks.map((social) => (
                  <a 
                    key={social.id}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`w-9 h-9 ${getSocialColor(social.platform)} rounded flex items-center justify-center text-white hover:opacity-80 transition-opacity`}
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                ))
              ) : (
                <a 
                  href="https://www.instagram.com/bayraklarotomotivankara/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                >
                  <Instagram size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Brands */}
          <div>
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#334155]"></span>
              ONE CIKAN MARKALAR
            </h4>
            <ul className="space-y-2 text-sm">
              {brands.map((brand) => (
                <li key={brand}>
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    {brand}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu */}
          <div>
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#334155]"></span>
              MENU
            </h4>
            <ul className="space-y-2 text-sm">
              {menuLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#334155]"></span>
              ILETISIM
            </h4>
            <div className="space-y-3 text-sm">
              <a href="tel:+905322629925" className="flex items-center gap-2 text-gray-400 hover:text-[#334155] transition-colors">
                <Phone size={14} />
                0 (532) 262 99 25
              </a>
              <a href="mailto:bayraklarotomotiv@gmail.com" className="flex items-center gap-2 text-gray-400 hover:text-[#334155] transition-colors">
                <Mail size={14} />
                bayraklarotomotiv@gmail.com
              </a>
              <div className="flex items-start gap-2 text-gray-400">
                <MapPin size={14} className="mt-1 flex-shrink-0" />
                <span>Ivedik OSB MAH. Melik Gokcek Bulvari No:6/22 Yenimahalle / ANKARA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2026 Bayraklar Otomotiv. Tum haklari saklidir.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Gizlilik Politikasi</a>
            <a href="#" className="hover:text-white transition-colors">KVKK</a>
          </div>
        </div>

        {/* Developer Credit */}
        <div className="pt-4 mt-4 border-t border-white/5 flex justify-center">
          <p className="text-xs text-gray-600">
            Designed & Developed by <a href="https://www.cansoftware.com.tr/" target="_blank" rel="noopener noreferrer" className="text-gray-400 font-medium hover:text-white transition-colors">cansoftware</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
