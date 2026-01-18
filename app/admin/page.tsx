'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff, LogIn, Shield, ArrowLeft } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'login' | '2fa'>('login');
  const [backupCode, setBackupCode] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        // Go to 2FA step
        setStep('2fa');
        setError('');
      } else {
        setError('Kullanıcı adı veya şifre hatalı!');
      }
    } catch {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', code: backupCode }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('adminToken', 'verified-' + Date.now());
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Geçersiz kod!');
      }
    } catch {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-animated bg-mesh bg-orbs flex items-center justify-center p-4 relative overflow-hidden vignette">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#dc2626]/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#dc2626]/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-[0_30px_80px_rgba(0,0,0,0.5)] border border-white/10">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-2xl p-2 shadow-lg">
              <img src="/bayraklaroto.png" alt="Bayraklar" className="w-full h-full object-contain" />
            </div>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="text-4xl font-black mb-2 relative"
            >
              {/* Animated Background Glow */}
              <motion.div
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 blur-3xl bg-gradient-to-r from-red-500/30 via-white/20 to-red-500/30 -z-10"
              />
              
              <motion.span 
                initial={{ x: -100, opacity: 0, rotateX: 90 }}
                animate={{ x: 0, opacity: 1, rotateX: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                className="block relative"
              >
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent blur-sm">
                    BAYRAKLAR
                  </span>
                  <span className="relative bg-gradient-to-b from-white via-gray-100 to-gray-400 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
                    BAYRAKLAR
                  </span>
                </span>
              </motion.span>
              
              <motion.span 
                initial={{ x: 100, opacity: 0, rotateX: -90 }}
                animate={{ x: 0, opacity: 1, rotateX: 0 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                className="block relative mt-1"
              >
                <span className="relative inline-block">
                  {/* Shimmer effect */}
                  <motion.span
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                    className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                  />
                  <span className="relative bg-gradient-to-r from-[#dc2626] via-[#ef4444] to-[#dc2626] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] filter brightness-110">
                    OTOMOTİV
                  </span>
                </span>
              </motion.span>
            </motion.h1>
            <p className="text-gray-400 text-sm mt-2">Yönetim Paneli</p>
          </motion.div>

          {/* Form */}
          {step === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Username */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Kullanıcı Adı
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#dc2626] focus:bg-white/10 transition-all"
                    placeholder="Kullanıcı adınızı girin"
                    required
                  />
                </div>
              </motion.div>

              {/* Password */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Şifre
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#dc2626] focus:bg-white/10 transition-all"
                    placeholder="Şifrenizi girin"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm text-center"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white font-bold rounded-xl hover:from-[#b91c1c] hover:to-[#991b1b] transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_rgba(220,38,38,0.3)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Giriş Yap
                  </>
                )}
              </motion.button>
            </form>
          ) : (
            <form onSubmit={handleVerify2FA} className="space-y-5">
              {/* Back Button */}
              <button
                type="button"
                onClick={() => { setStep('login'); setError(''); setBackupCode(''); }}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Geri Dön
              </button>

              {/* 2FA Info */}
              <div className="text-center py-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#dc2626]/20 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-[#dc2626]" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">2 Faktörlü Doğrulama</h3>
                <p className="text-gray-400 text-sm">
                  Güvenlik kodunuzu girin
                </p>
              </div>

              {/* Backup Code Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Güvenlik Kodu
                </label>
                <div className="relative">
                  <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={backupCode}
                    onChange={(e) => setBackupCode(e.target.value.toUpperCase())}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#dc2626] focus:bg-white/10 transition-all text-center text-xl tracking-widest font-mono font-bold uppercase"
                    placeholder="Güvenlik Kodu"
                    maxLength={20}
                    required
                  />
                </div>
              </motion.div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm text-center"
                >
                  {error}
                </motion.div>
              )}

              {/* Verify Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                type="submit"
                disabled={isLoading || backupCode.length < 4}
                className="w-full py-4 bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white font-bold rounded-xl hover:from-[#b91c1c] hover:to-[#991b1b] transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_rgba(220,38,38,0.3)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Doğrula
                  </>
                )}
              </motion.button>
            </form>
          )}

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-gray-500 text-xs mt-6"
          >
            © 2024 Bayraklar Otomotiv. Tüm hakları saklıdır.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
