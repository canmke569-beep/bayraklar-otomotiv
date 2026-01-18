'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Send, Mail, Clock, Navigation } from 'lucide-react';
import { useState } from 'react';

export default function Iletisim() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mesajınız başarıyla gönderildi!');
    setFormData({ name: '', phone: '', message: '' });
  };

  return (
    <section id="iletisim" className="py-12 md:py-24 bg-gradient-to-b from-gray-100 via-gray-50 to-white relative w-full max-w-full">
      {/* Static Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-red-500/10 to-orange-500/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-500/10 to-purple-500/5 rounded-full blur-[100px] translate-x-1/3" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-6 py-2 bg-gray-900 text-white text-sm font-bold rounded-full mb-4 tracking-wider"
          >
            İLETİŞİM
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Bize Ulaşın
          </h2>
          <p className="text-gray-700 text-lg font-medium max-w-2xl mx-auto">
            Sorularınız için 7/24 yanınızdayız. Hemen iletişime geçin!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Company Title Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden"
            >
              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"/>
              </div>
              
              <div className="relative">
                <h3 className="text-3xl font-black text-white mb-2">
                  BAYRAKLAR OTOMOTİV
                </h3>
                <p className="text-gray-300 text-lg">
                  52 yıllık tecrübemizle hizmetinizdeyiz
                </p>
              </div>
            </motion.div>

            {/* Contact Cards */}
            <div className="grid gap-4">
              {/* Address Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative bg-white rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-100 transition-all duration-500 overflow-hidden"
              >
                {/* Top Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#dc2626] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"/>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 mb-1">Adres</h4>
                    <p className="text-gray-700 font-semibold leading-relaxed">
                      İvedik OSB MAH. Melik Gökçek Bulvarı No:6/22
                      <br />
                      <span className="text-gray-900 font-semibold">Yenimahalle / ANKARA</span>
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Phone Card */}
              <motion.a
                href="tel:+905322629925"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative bg-white rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-100 transition-all duration-500 overflow-hidden block"
              >
                {/* Top Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#dc2626] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"/>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 mb-1">Telefon</h4>
                    <p className="text-2xl font-black text-gray-900 group-hover:text-[#dc2626] transition-colors">
                      0 (532) 262 99 25
                    </p>
                  </div>
                </div>
              </motion.a>

              {/* Working Hours Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative bg-white rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-100 transition-all duration-500 overflow-hidden"
              >
                {/* Top Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#dc2626] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"/>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 mb-1">Çalışma Saatleri</h4>
                    <p className="text-gray-700 font-semibold">
                      Pazartesi - Cumartesi: <span className="text-gray-900 font-bold">09:00 - 19:00</span>
                      <br />
                      Pazar: <span className="text-gray-900 font-bold">10:00 - 17:00</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white"
            >
              <div className="relative w-full" style={{ paddingBottom: '56.25%', minHeight: '200px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d764.1!2d32.7285!3d39.9975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d3490f91d64b33%3A0x8f6c1e0b9c8a7d6e!2zxLB2ZWRpayBPU0IsIE1lbGloIEfDtmvDp2VrIEJsdiwgWWVuaW1haGFsbGUvQW5rYXJh!5e0!3m2!1str!2str!4v1705520000000"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative bg-white rounded-3xl p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-gray-100 to-transparent rounded-bl-full"/>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-gray-50 to-transparent rounded-tr-full"/>
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center shadow-md">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900">
                    Mesaj Gönderin
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-0 focus:border-[#dc2626] transition-all text-gray-900 font-medium placeholder-gray-400"
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-0 focus:border-[#dc2626] transition-all text-gray-900 font-medium placeholder-gray-400"
                      placeholder="05XX XXX XX XX"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                      Mesajınız
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-0 focus:border-[#dc2626] transition-all resize-none text-gray-900 font-medium placeholder-gray-400"
                      placeholder="Size nasıl yardımcı olabiliriz?"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(220,38,38,0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white font-bold text-lg rounded-xl shadow-[0_10px_30px_rgba(220,38,38,0.3)] transition-all duration-300 overflow-hidden"
                  >
                    {/* Shine Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"/>
                    </div>
                    
                    <Send className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Mesaj Gönder</span>
                  </motion.button>
                </form>

                <p className="mt-6 text-sm text-gray-500 text-center font-medium">
                  🔒 Bilgileriniz gizli tutulacak ve sadece iletişim amacıyla kullanılacaktır.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
