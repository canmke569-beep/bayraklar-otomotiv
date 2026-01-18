'use client';

import { motion } from 'framer-motion';
import { Phone, User, PhoneCall } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TeamMember {
  id: number;
  name: string;
  title: string;
  phone: string;
}

const defaultTeam: TeamMember[] = [
  { id: 1, name: 'Mehmet Bayrak', title: 'Galeri Sahibi', phone: '0 (532) 262 99 25' },
  { id: 2, name: 'Burak Yılmaz', title: 'Danışman', phone: '0 (532) 359 11 78' },
  { id: 3, name: 'Fırat Çam', title: 'Danışman', phone: '0 (532) 302 57 96' },
  { id: 4, name: 'İbrahim Yeşil', title: 'Danışman', phone: '0 (554) 551 38 87' },
  { id: 5, name: 'Ali Aydoğan', title: 'Danışman', phone: '0 (546) 957 91 58' },
  { id: 6, name: 'Ahmet Bayrak', title: 'Danışman', phone: '0 (554) 184 96 25' },
  { id: 7, name: 'İsmet Bayrak', title: 'Danışman', phone: '0 (532) 459 72 76' },
];

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const [showPhone, setShowPhone] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)] transition-all duration-500"
    >
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#dc2626] to-[#f87171] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"/>
      
      <div className="p-6">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <motion.div 
            whileHover={{ rotate: 5 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-inner"
          >
            <User className="w-8 h-8 text-gray-500" />
          </motion.div>
          
          {/* Info */}
          <div className="flex-1">
            <h3 className="font-bold text-xl text-gray-900 group-hover:text-[#dc2626] transition-colors duration-300">
              {member.name}
            </h3>
            <p className="text-gray-600 text-sm font-semibold">{member.title}</p>
          </div>
        </div>
      </div>
      
      {/* Phone Button */}
      <motion.button
        onClick={() => setShowPhone(!showPhone)}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-4 font-semibold flex items-center justify-center gap-3 transition-all duration-300 ${
          showPhone 
            ? 'bg-[#dc2626] text-white' 
            : 'bg-gray-900 text-white hover:bg-[#dc2626]'
        }`}
      >
        {showPhone ? (
          <>
            <PhoneCall className="w-5 h-5 animate-pulse" />
            <span className="text-lg tracking-wide">{member.phone}</span>
          </>
        ) : (
          <>
            <Phone className="w-5 h-5" />
            <span>Telefonu Göster</span>
          </>
        )}
      </motion.button>
    </motion.div>
  );
}

export default function Ekibimiz() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(defaultTeam);

  useEffect(() => {
    fetch('/api/admin/data')
      .then(res => res.json())
      .then(data => {
        if (data.team && data.team.length > 0) {
          setTeamMembers(data.team);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="ekibimiz" className="py-12 md:py-20 bg-gradient-to-b from-white via-gray-50 to-gray-100 relative w-full max-w-full">
      {/* Static Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-green-500/10 to-teal-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-red-500/10 to-pink-500/5 rounded-full blur-[100px]" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-full mb-4">
            EKİBİMİZ
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Uzman Kadromuz
          </h2>
          <p className="text-gray-700 text-lg font-medium max-w-2xl mx-auto">
            52 yıllık tecrübemizle sizlere en iyi hizmeti sunmak için buradayız
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
