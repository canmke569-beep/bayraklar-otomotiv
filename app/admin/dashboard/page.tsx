'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Car, Users, LogOut, Plus, Trash2, Edit2, Save, X, 
  Home, Image as ImageIcon, Share2, Menu, Instagram, Facebook, Twitter, Youtube, Linkedin, Settings, Lock, Eye, EyeOff
} from 'lucide-react';

interface Vehicle {
  id: number;
  title: string;
  subtitle: string;
  images: string[];
}

interface TeamMember {
  id: number;
  name: string;
  title: string;
  phone: string;
}

interface SocialMedia {
  id: number;
  platform: string;
  url: string;
}

interface HeroImage {
  id: number;
  image: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'vehicles' | 'team' | 'social' | 'hero' | 'settings'>('vehicles');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const [changingPassword, setChangingPassword] = useState(false);
  const [securityCode, setSecurityCode] = useState('');
  const [newSecurityCode, setNewSecurityCode] = useState('');
  const [savingCode, setSavingCode] = useState(false);
  const [codeMessage, setCodeMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([]);
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [editingSocial, setEditingSocial] = useState<SocialMedia | null>(null);
  const [editingHero, setEditingHero] = useState<HeroImage | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }
    fetchData();
    fetchSecurityCode();
  }, [router]);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin/data');
      const data = await res.json();
      setVehicles(data.vehicles || []);
      setTeam(data.team || []);
      setSocialMedia(data.socialMedia || []);
      setHeroImages(data.heroImages || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSecurityCode = async () => {
    try {
      const res = await fetch('/api/admin/2fa');
      const data = await res.json();
      setSecurityCode(data.code || '');
    } catch (error) {
      console.error('Error fetching code:', error);
    }
  };

  const updateSecurityCode = async () => {
    if (!newSecurityCode || newSecurityCode.length < 4) {
      setCodeMessage({ type: 'error', text: 'Kod en az 4 karakter olmalı!' });
      return;
    }
    
    setSavingCode(true);
    try {
      const res = await fetch('/api/admin/2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update', newCode: newSecurityCode.toUpperCase() }),
      });
      const data = await res.json();
      if (data.success) {
        setSecurityCode(newSecurityCode.toUpperCase());
        setNewSecurityCode('');
        setCodeMessage({ type: 'success', text: 'Güvenlik kodu güncellendi!' });
      }
    } catch (error) {
      setCodeMessage({ type: 'error', text: 'Bir hata oluştu!' });
    } finally {
      setSavingCode(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin');
  };

  const saveVehicles = async (newVehicles: Vehicle[]) => {
    setSaveStatus('saving');
    try {
      const res = await fetch('/api/admin/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vehicles: newVehicles }),
      });
      if (res.ok) {
        setVehicles(newVehicles);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      } else {
        setSaveStatus('error');
      }
    } catch {
      setSaveStatus('error');
    }
  };

  const saveTeam = async (newTeam: TeamMember[]) => {
    setSaveStatus('saving');
    try {
      const res = await fetch('/api/admin/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ team: newTeam }),
      });
      if (res.ok) {
        setTeam(newTeam);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      } else {
        setSaveStatus('error');
      }
    } catch {
      setSaveStatus('error');
    }
  };

  const updateVehicle = (vehicle: Vehicle) => {
    const newVehicles = vehicles.map(v => v.id === vehicle.id ? vehicle : v);
    saveVehicles(newVehicles);
    setEditingVehicle(null);
  };

  const deleteVehicle = (id: number) => {
    if (confirm('Bu aracı silmek istediğinize emin misiniz?')) {
      const newVehicles = vehicles.filter(v => v.id !== id);
      saveVehicles(newVehicles);
    }
  };

  const addVehicle = () => {
    const newId = Math.max(...vehicles.map(v => v.id), 0) + 1;
    const newVehicle: Vehicle = {
      id: newId,
      title: 'Yeni Araç',
      subtitle: 'Açıklama',
      images: ['/RESİM1.png'],
    };
    saveVehicles([...vehicles, newVehicle]);
  };

  const [vehicleImageIndex, setVehicleImageIndex] = useState<{[key: number]: number}>({});
  const [uploadingVehicle, setUploadingVehicle] = useState<number | null>(null);
  const [uploadingHero, setUploadingHero] = useState<number | null>(null);

  const handleImageUpload = async (vehicleId: number, file: File) => {
    setUploadingVehicle(vehicleId);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        const vehicle = vehicles.find(v => v.id === vehicleId);
        if (vehicle) {
          const newImages = [...vehicle.images, data.url];
          const updatedVehicle = { ...vehicle, images: newImages };
          const newVehicles = vehicles.map(v => v.id === vehicleId ? updatedVehicle : v);
          saveVehicles(newVehicles);
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploadingVehicle(null);
    }
  };

  const removeVehicleImage = (vehicleId: number, imageIndex: number) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (vehicle && vehicle.images.length > 1) {
      const newImages = vehicle.images.filter((_, i) => i !== imageIndex);
      const updatedVehicle = { ...vehicle, images: newImages };
      const newVehicles = vehicles.map(v => v.id === vehicleId ? updatedVehicle : v);
      saveVehicles(newVehicles);
      // Reset image index if needed
      if (vehicleImageIndex[vehicleId] >= newImages.length) {
        setVehicleImageIndex(prev => ({ ...prev, [vehicleId]: 0 }));
      }
    }
  };

  const nextVehicleImage = (vehicleId: number, totalImages: number) => {
    setVehicleImageIndex(prev => ({
      ...prev,
      [vehicleId]: ((prev[vehicleId] || 0) + 1) % totalImages
    }));
  };

  const prevVehicleImage = (vehicleId: number, totalImages: number) => {
    setVehicleImageIndex(prev => ({
      ...prev,
      [vehicleId]: ((prev[vehicleId] || 0) - 1 + totalImages) % totalImages
    }));
  };

  const updateMember = (member: TeamMember) => {
    const newTeam = team.map(t => t.id === member.id ? member : t);
    saveTeam(newTeam);
    setEditingMember(null);
  };

  const deleteMember = (id: number) => {
    if (confirm('Bu ekip üyesini silmek istediğinize emin misiniz?')) {
      const newTeam = team.filter(t => t.id !== id);
      saveTeam(newTeam);
    }
  };

  const addMember = () => {
    const newId = Math.max(...team.map(t => t.id), 0) + 1;
    const newMember: TeamMember = {
      id: newId,
      name: 'Yeni Üye',
      title: 'Danışman',
      phone: '0 (5XX) XXX XX XX',
    };
    saveTeam([...team, newMember]);
  };

  // Social Media Functions
  const saveSocialMedia = async (newSocial: SocialMedia[]) => {
    setSaveStatus('saving');
    try {
      const res = await fetch('/api/admin/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ socialMedia: newSocial }),
      });
      if (res.ok) {
        setSocialMedia(newSocial);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      } else {
        setSaveStatus('error');
      }
    } catch {
      setSaveStatus('error');
    }
  };

  const addSocial = (platform: string = 'Instagram') => {
    const newId = Math.max(...socialMedia.map(s => s.id), 0) + 1;
    const urlMap: { [key: string]: string } = {
      'Instagram': 'https://instagram.com/',
      'Facebook': 'https://facebook.com/',
      'Twitter': 'https://twitter.com/',
      'Youtube': 'https://youtube.com/',
      'Linkedin': 'https://linkedin.com/',
      'TikTok': 'https://tiktok.com/',
      'WhatsApp': 'https://wa.me/',
      'Telegram': 'https://t.me/',
    };
    const newSocial: SocialMedia = {
      id: newId,
      platform: platform,
      url: urlMap[platform] || 'https://',
    };
    saveSocialMedia([...socialMedia, newSocial]);
  };

  const updateSocial = (social: SocialMedia) => {
    const newSocial = socialMedia.map(s => s.id === social.id ? social : s);
    saveSocialMedia(newSocial);
    setEditingSocial(null);
  };

  const deleteSocial = (id: number) => {
    if (confirm('Bu sosyal medya linkini silmek istediğinize emin misiniz?')) {
      const newSocial = socialMedia.filter(s => s.id !== id);
      saveSocialMedia(newSocial);
    }
  };

  // Hero Images Functions
  const saveHeroImages = async (newHero: HeroImage[]) => {
    setSaveStatus('saving');
    try {
      const res = await fetch('/api/admin/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ heroImages: newHero }),
      });
      if (res.ok) {
        setHeroImages(newHero);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      } else {
        setSaveStatus('error');
      }
    } catch {
      setSaveStatus('error');
    }
  };

  const addHeroImage = () => {
    const newId = Math.max(...heroImages.map(h => h.id), 0) + 1;
    const newHero: HeroImage = {
      id: newId,
      image: '/hero.webp',
    };
    saveHeroImages([...heroImages, newHero]);
  };

  const updateHeroImage = (hero: HeroImage) => {
    const newHero = heroImages.map(h => h.id === hero.id ? hero : h);
    saveHeroImages(newHero);
    setEditingHero(null);
  };

  const deleteHeroImage = (id: number) => {
    if (confirm('Bu görseli silmek istediğinize emin misiniz?')) {
      const newHero = heroImages.filter(h => h.id !== id);
      saveHeroImages(newHero);
    }
  };

  const handleHeroImageUpload = async (heroId: number, file: File) => {
    setUploadingHero(heroId);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        const hero = heroImages.find(h => h.id === heroId);
        if (hero) {
          const updatedHero = { ...hero, image: data.url };
          const newHero = heroImages.map(h => h.id === heroId ? updatedHero : h);
          saveHeroImages(newHero);
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploadingHero(null);
    }
  };

  const addHeroImageFromUpload = async (file: File) => {
    setUploadingHero(-1);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        const newId = Math.max(...heroImages.map(h => h.id), 0) + 1;
        const newHero: HeroImage = {
          id: newId,
          image: data.url,
        };
        saveHeroImages([...heroImages, newHero]);
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploadingHero(null);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage(null);

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Yeni şifreler eşleşmiyor!' });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'Şifre en az 6 karakter olmalı!' });
      return;
    }

    setChangingPassword(true);
    try {
      const res = await fetch('/api/admin/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      
      if (data.success) {
        setPasswordMessage({ type: 'success', text: 'Şifre başarıyla değiştirildi!' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordMessage({ type: 'error', text: data.message || 'Bir hata oluştu' });
      }
    } catch {
      setPasswordMessage({ type: 'error', text: 'Bir hata oluştu' });
    } finally {
      setChangingPassword(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#dc2626] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-red-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-blue-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-purple-500/3 to-transparent rounded-full blur-3xl" />
      </div>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white p-4 flex items-center justify-between z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg p-1 flex-shrink-0">
            <img src="/bayraklaroto.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-bold text-sm">Yönetim Paneli</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 bottom-0 w-64 bg-gray-900 text-white p-6 flex flex-col z-50 transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-14 h-14 bg-white rounded-xl p-1 flex-shrink-0">
            <img src="/bayraklaroto.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="font-bold text-sm">BAYRAKLAR</h1>
            <p className="text-xs text-gray-400">Yönetim Paneli</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          <button
            onClick={() => { setActiveTab('vehicles'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'vehicles' 
                ? 'bg-[#dc2626] text-white' 
                : 'text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Car className="w-5 h-5" />
            Vitrin Araçları
          </button>
          <button
            onClick={() => { setActiveTab('team'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'team' 
                ? 'bg-[#dc2626] text-white' 
                : 'text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Users className="w-5 h-5" />
            Ekip Yönetimi
          </button>
          <button
            onClick={() => { setActiveTab('hero'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'hero' 
                ? 'bg-[#dc2626] text-white' 
                : 'text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <ImageIcon className="w-5 h-5" />
            Ana Sayfa Görselleri
          </button>
          <button
            onClick={() => { setActiveTab('social'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'social' 
                ? 'bg-[#dc2626] text-white' 
                : 'text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Share2 className="w-5 h-5" />
            Sosyal Medya
          </button>
          <button
            onClick={() => { setActiveTab('settings'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'settings' 
                ? 'bg-[#dc2626] text-white' 
                : 'text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Settings className="w-5 h-5" />
            Ayarlar
          </button>
        </nav>

        {/* Footer */}
        <div className="space-y-2">
          <a
            href="/"
            target="_blank"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/10 hover:text-white transition-all"
          >
            <Home className="w-5 h-5" />
            Siteyi Görüntüle
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-4 lg:p-8 pt-20 lg:pt-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-black text-gray-900">
              {activeTab === 'vehicles' && 'Vitrin Araçları'}
              {activeTab === 'team' && 'Ekip Yönetimi'}
              {activeTab === 'hero' && 'Ana Sayfa Görselleri'}
              {activeTab === 'social' && 'Sosyal Medya'}
              {activeTab === 'settings' && 'Ayarlar'}
            </h1>
            <p className="text-gray-500 text-sm lg:text-base">
              {activeTab === 'vehicles' && 'Sitede görüntülenen araçları yönetin'}
              {activeTab === 'team' && 'Ekip üyelerini ekleyin veya düzenleyin'}
              {activeTab === 'hero' && 'Ana sayfadaki slider görsellerini yönetin'}
              {activeTab === 'social' && 'Sosyal medya linklerini yönetin'}
              {activeTab === 'settings' && 'Şifre ve hesap ayarlarını yönetin'}
            </p>
          </div>
          {activeTab !== 'settings' && <div className="flex items-center gap-3">
            {saveStatus === 'saving' && (
              <span className="text-gray-500 text-sm flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                Kaydediliyor...
              </span>
            )}
            {saveStatus === 'saved' && (
              <span className="text-green-600 text-sm">✓ Kaydedildi</span>
            )}
            {activeTab === 'hero' ? (
              <label className="flex items-center gap-2 px-4 py-2.5 lg:px-5 lg:py-3 bg-[#dc2626] text-white font-semibold rounded-xl hover:bg-[#b91c1c] transition-colors cursor-pointer text-sm lg:text-base">
                <Plus className="w-5 h-5" />
                {uploadingHero === -1 ? 'Yükleniyor...' : 'Görsel Ekle'}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) addHeroImageFromUpload(file);
                  }}
                  disabled={uploadingHero === -1}
                />
              </label>
            ) : (
              <button
                onClick={() => {
                  if (activeTab === 'vehicles') addVehicle();
                  else if (activeTab === 'team') addMember();
                  else if (activeTab === 'social') addSocial();
                }}
                disabled={activeTab === 'vehicles' && vehicles.length >= 6}
                className="flex items-center gap-2 px-4 py-2.5 lg:px-5 lg:py-3 bg-[#dc2626] text-white font-semibold rounded-xl hover:bg-[#b91c1c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base"
              >
                <Plus className="w-5 h-5" />
                {activeTab === 'vehicles' && 'Araç Ekle'}
                {activeTab === 'team' && 'Üye Ekle'}
                {activeTab === 'social' && 'Link Ekle'}
              </button>
            )}
          </div>}
        </div>

        {/* Content */}
        {activeTab === 'vehicles' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <motion.div
                key={vehicle.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200"
              >
                {editingVehicle?.id === vehicle.id ? (
                  <div className="p-5 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
                      <input
                        type="text"
                        value={editingVehicle.title}
                        onChange={(e) => setEditingVehicle({...editingVehicle, title: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Alt Başlık</label>
                      <input
                        type="text"
                        value={editingVehicle.subtitle}
                        onChange={(e) => setEditingVehicle({...editingVehicle, subtitle: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateVehicle(editingVehicle)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        <Save className="w-4 h-4" /> Kaydet
                      </button>
                      <button
                        onClick={() => setEditingVehicle(null)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                      >
                        <X className="w-4 h-4" /> İptal
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="h-40 bg-gray-100 relative">
                      <img 
                        src={vehicle.images[vehicleImageIndex[vehicle.id] || 0]} 
                        alt={vehicle.title} 
                        className="w-full h-full object-cover" 
                      />
                      {/* Image Navigation */}
                      {vehicle.images.length > 1 && (
                        <>
                          <button
                            onClick={() => prevVehicleImage(vehicle.id, vehicle.images.length)}
                            className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center text-gray-700 hover:bg-white"
                          >
                            ‹
                          </button>
                          <button
                            onClick={() => nextVehicleImage(vehicle.id, vehicle.images.length)}
                            className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center text-gray-700 hover:bg-white"
                          >
                            ›
                          </button>
                          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-0.5 rounded">
                            {(vehicleImageIndex[vehicle.id] || 0) + 1} / {vehicle.images.length}
                          </div>
                        </>
                      )}
                      <div className="absolute top-2 right-2 flex gap-1">
                        <button
                          onClick={() => setEditingVehicle(vehicle)}
                          className="p-2 bg-white rounded-lg shadow hover:bg-gray-100"
                        >
                          <Edit2 className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => deleteVehicle(vehicle.id)}
                          className="p-2 bg-white rounded-lg shadow hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 line-clamp-1">{vehicle.title}</h3>
                      <p className="text-gray-500 text-sm">{vehicle.subtitle}</p>
                      {/* Image Upload */}
                      <div className="mt-3 flex gap-2">
                        <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer text-xs">
                          <ImageIcon className="w-4 h-4" />
                          {uploadingVehicle === vehicle.id ? 'Yükleniyor...' : 'Resim Ekle'}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageUpload(vehicle.id, file);
                            }}
                            disabled={uploadingVehicle === vehicle.id}
                          />
                        </label>
                        {vehicle.images.length > 1 && (
                          <button
                            onClick={() => removeVehicleImage(vehicle.id, vehicleImageIndex[vehicle.id] || 0)}
                            className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 text-xs"
                          >
                            Sil
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        ) : activeTab === 'team' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200"
              >
                {editingMember?.id === member.id ? (
                  <div className="p-5 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">İsim</label>
                      <input
                        type="text"
                        value={editingMember.name}
                        onChange={(e) => setEditingMember({...editingMember, name: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pozisyon</label>
                      <input
                        type="text"
                        value={editingMember.title}
                        onChange={(e) => setEditingMember({...editingMember, title: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                      <input
                        type="text"
                        value={editingMember.phone}
                        onChange={(e) => setEditingMember({...editingMember, phone: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateMember(editingMember)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        <Save className="w-4 h-4" /> Kaydet
                      </button>
                      <button
                        onClick={() => setEditingMember(null)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                      >
                        <X className="w-4 h-4" /> İptal
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 relative flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
                        <Users className="w-10 h-10 text-gray-500" />
                      </div>
                      <div className="absolute top-2 right-2 flex gap-1">
                        <button
                          onClick={() => setEditingMember(member)}
                          className="p-2 bg-white rounded-lg shadow hover:bg-gray-100"
                        >
                          <Edit2 className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => deleteMember(member.id)}
                          className="p-2 bg-white rounded-lg shadow hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-bold text-gray-900">{member.name}</h3>
                      <p className="text-gray-500 text-sm">{member.title}</p>
                      <p className="text-[#dc2626] text-sm font-medium mt-1">{member.phone}</p>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        ) : activeTab === 'hero' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {heroImages.map((hero) => (
              <motion.div
                key={hero.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200"
              >
                {editingHero?.id === hero.id ? (
                  <div className="p-5 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Görsel URL</label>
                      <input
                        type="text"
                        value={editingHero.image}
                        onChange={(e) => setEditingHero({...editingHero, image: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
                        placeholder="/hero.webp veya https://..."
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateHeroImage(editingHero)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        <Save className="w-4 h-4" /> Kaydet
                      </button>
                      <button
                        onClick={() => setEditingHero(null)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                      >
                        <X className="w-4 h-4" /> İptal
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="h-40 bg-gray-100 relative">
                      <img src={hero.image} alt={`Hero ${hero.id}`} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 flex gap-1">
                        <button
                          onClick={() => setEditingHero(hero)}
                          className="p-2 bg-white rounded-lg shadow hover:bg-gray-100"
                        >
                          <Edit2 className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => deleteHeroImage(hero.id)}
                          className="p-2 bg-white rounded-lg shadow hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 text-sm truncate mb-3">{hero.image}</p>
                      <label className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer text-sm">
                        <ImageIcon className="w-4 h-4" />
                        {uploadingHero === hero.id ? 'Yükleniyor...' : 'Görsel Değiştir'}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleHeroImageUpload(hero.id, file);
                          }}
                          disabled={uploadingHero === hero.id}
                        />
                      </label>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        ) : activeTab === 'social' ? (
          <div className="space-y-6">
            {/* Quick Add Buttons */}
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200">
              <p className="text-sm font-medium text-gray-600 mb-3">Hızlı Ekle:</p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => addSocial('Instagram')} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
                  <Instagram className="w-4 h-4" /> Instagram
                </button>
                <button onClick={() => addSocial('Facebook')} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  <Facebook className="w-4 h-4" /> Facebook
                </button>
                <button onClick={() => addSocial('Twitter')} className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                  <Twitter className="w-4 h-4" /> X / Twitter
                </button>
                <button onClick={() => addSocial('Youtube')} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                  <Youtube className="w-4 h-4" /> YouTube
                </button>
                <button onClick={() => addSocial('Linkedin')} className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm font-medium">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </button>
                <button onClick={() => addSocial('TikTok')} className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                  <span className="font-bold">TT</span> TikTok
                </button>
                <button onClick={() => addSocial('WhatsApp')} className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium">
                  <span className="font-bold">WA</span> WhatsApp
                </button>
                <button onClick={() => addSocial('Telegram')} className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm font-medium">
                  <span className="font-bold">TG</span> Telegram
                </button>
              </div>
            </div>

            {/* Social Media Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialMedia.map((social) => (
              <motion.div
                key={social.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200"
              >
                {editingSocial?.id === social.id ? (
                  <div className="p-5 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                      <select
                        value={editingSocial.platform}
                        onChange={(e) => setEditingSocial({...editingSocial, platform: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
                      >
                        <option value="Instagram">Instagram</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Twitter">Twitter / X</option>
                        <option value="Youtube">Youtube</option>
                        <option value="Linkedin">Linkedin</option>
                        <option value="TikTok">TikTok</option>
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="Telegram">Telegram</option>
                        <option value="Pinterest">Pinterest</option>
                        <option value="Snapchat">Snapchat</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Link URL</label>
                      <input
                        type="text"
                        value={editingSocial.url}
                        onChange={(e) => setEditingSocial({...editingSocial, url: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
                        placeholder="https://instagram.com/..."
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateSocial(editingSocial)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        <Save className="w-4 h-4" /> Kaydet
                      </button>
                      <button
                        onClick={() => setEditingSocial(null)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                      >
                        <X className="w-4 h-4" /> İptal
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 relative flex items-center justify-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white ${
                        social.platform === 'Instagram' ? 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400' :
                        social.platform === 'Facebook' ? 'bg-blue-600' :
                        social.platform === 'Twitter' ? 'bg-black' :
                        social.platform === 'Youtube' ? 'bg-red-600' :
                        social.platform === 'Linkedin' ? 'bg-blue-700' :
                        social.platform === 'TikTok' ? 'bg-black' :
                        social.platform === 'WhatsApp' ? 'bg-green-500' :
                        social.platform === 'Telegram' ? 'bg-sky-500' :
                        social.platform === 'Pinterest' ? 'bg-red-500' :
                        social.platform === 'Snapchat' ? 'bg-yellow-400' :
                        'bg-gray-600'
                      }`}>
                        {social.platform === 'Instagram' && <Instagram className="w-8 h-8" />}
                        {social.platform === 'Facebook' && <Facebook className="w-8 h-8" />}
                        {social.platform === 'Twitter' && <Twitter className="w-8 h-8" />}
                        {social.platform === 'Youtube' && <Youtube className="w-8 h-8" />}
                        {social.platform === 'Linkedin' && <Linkedin className="w-8 h-8" />}
                        {social.platform === 'TikTok' && <span className="text-xl font-bold">TT</span>}
                        {social.platform === 'WhatsApp' && <span className="text-xl font-bold">WA</span>}
                        {social.platform === 'Telegram' && <span className="text-xl font-bold">TG</span>}
                        {social.platform === 'Pinterest' && <span className="text-xl font-bold">P</span>}
                        {social.platform === 'Snapchat' && <span className="text-xl font-bold text-black">👻</span>}
                      </div>
                      <div className="absolute top-2 right-2 flex gap-1">
                        <button
                          onClick={() => setEditingSocial(social)}
                          className="p-2 bg-white rounded-lg shadow hover:bg-gray-100"
                        >
                          <Edit2 className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => deleteSocial(social.id)}
                          className="p-2 bg-white rounded-lg shadow hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-bold text-gray-900">{social.platform}</h3>
                      <p className="text-gray-500 text-xs truncate">{social.url}</p>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
            </div>
          </div>
        ) : activeTab === 'settings' ? (
          <div className="max-w-md">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Lock className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Şifre Değiştir</h3>
                  <p className="text-gray-500 text-sm">Hesap şifrenizi güncelleyin</p>
                </div>
              </div>

              {passwordMessage && (
                <div className={`p-3 rounded-lg mb-4 ${
                  passwordMessage.type === 'success' 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}>
                  {passwordMessage.text}
                </div>
              )}

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mevcut Şifre</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#dc2626] focus:border-transparent"
                      placeholder="Mevcut şifrenizi girin"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Yeni Şifre</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#dc2626] focus:border-transparent"
                      placeholder="Yeni şifrenizi girin"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Yeni Şifre Tekrar</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#dc2626] focus:border-transparent"
                    placeholder="Yeni şifrenizi tekrar girin"
                    required
                    minLength={6}
                  />
                </div>

                <button
                  type="submit"
                  disabled={changingPassword}
                  className="w-full py-3 bg-[#dc2626] text-white font-semibold rounded-xl hover:bg-[#b91c1c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {changingPassword ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Değiştiriliyor...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Şifreyi Değiştir
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Security Code Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mt-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Settings className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">2FA Güvenlik Kodu</h3>
                  <p className="text-gray-500 text-sm">Giriş için kullanılan güvenlik kodu</p>
                </div>
              </div>

              {codeMessage && (
                <div className={`p-3 rounded-lg mb-4 ${
                  codeMessage.type === 'success' 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}>
                  {codeMessage.text}
                </div>
              )}

              {/* Current Code Display */}
              <div className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Mevcut Güvenlik Kodu:</p>
                <p className="text-2xl font-mono font-bold text-gray-900 tracking-wider">{securityCode}</p>
              </div>

              {/* New Code Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Yeni Güvenlik Kodu</label>
                <input
                  type="text"
                  value={newSecurityCode}
                  onChange={(e) => setNewSecurityCode(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#dc2626] font-mono text-lg tracking-wider uppercase"
                  placeholder="Yeni kod girin..."
                />
              </div>

              <button
                onClick={updateSecurityCode}
                disabled={savingCode || newSecurityCode.length < 4}
                className="w-full py-3 bg-[#dc2626] text-white font-semibold rounded-xl hover:bg-[#b91c1c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {savingCode ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Kaydediliyor...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Kodu Güncelle
                  </>
                )}
              </button>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
