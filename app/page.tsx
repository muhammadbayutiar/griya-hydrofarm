'use client';

import { useState } from 'react';
import { Menu, X, Phone, MapPin, Clock, Leaf, Droplets, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    address: '',
    quantity: 1,
  });
  const [phoneError, setPhoneError] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const whatsappNumber = '6289699412320';

  // Validate Indonesian phone number format
  const validatePhoneNumber = (phone: string): boolean => {
    // Remove all non-numeric characters
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Check if it's a valid Indonesian mobile number
    // Should start with 08 or 628 and have 10-13 digits total
    const indonesianMobileRegex = /^(08|628)\d{8,11}$/;
    
    return indonesianMobileRegex.test(cleanPhone);
  };

  // Format phone number for WhatsApp API
  const formatPhoneForWhatsApp = (phone: string): string => {
    let cleanPhone = phone.replace(/\D/g, '');
    
    // Convert 08xxx to 628xxx
    if (cleanPhone.startsWith('08')) {
      cleanPhone = '62' + cleanPhone.substring(1);
    }
    
    return cleanPhone;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOrderForm({...orderForm, phone: value});
    
    // Clear error when user types
    if (phoneError) {
      setPhoneError('');
    }
  };

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone number
    if (!validatePhoneNumber(orderForm.phone)) {
      setPhoneError('Nomor WhatsApp tidak valid. Gunakan format: 08xxxxxxxxxx atau 628xxxxxxxxxx');
      return;
    }
    
    setIsValidating(true);
    setPhoneError('');
    
    // Format customer phone for display
    const customerPhone = formatPhoneForWhatsApp(orderForm.phone);
    
    // Create WhatsApp message
    const message = `Halo Griya Hydrofarm! Saya ingin memesan:

Nama: ${orderForm.name}
No. WhatsApp: ${orderForm.phone}
Detail Pesanan: ${orderForm.address}
Produk: Selada Hijau Hidroponik
Jumlah: ${orderForm.quantity} pack

Mohon konfirmasi ketersediaan dan total harga. Terima kasih!`;
    
    // Send to business WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form after short delay
    setTimeout(() => {
      setOrderForm({
        name: '',
        phone: '',
        address: '',
        quantity: 1,
      });
      setIsValidating(false);
    }, 1000);
  };

  const quickOrder = () => {
    const message = `Halo Griya Hydrofarm! Saya ingin bertanya tentang Selada Hijau Hidroponik.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-transparent z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Griya Hydrofarm</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-white hover:text-primary-300 transition font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Beranda</a>
              <a href="#about" className="text-white hover:text-primary-300 transition font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Tentang</a>
              <a href="#products" className="text-white hover:text-primary-300 transition font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Produk</a>
              <a href="#order" className="text-white hover:text-primary-300 transition font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Pesan</a>
              <a href="#contact" className="text-white hover:text-primary-300 transition font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Kontak</a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#home" className="block px-3 py-2 text-white hover:bg-white/10 rounded font-medium">Beranda</a>
              <a href="#about" className="block px-3 py-2 text-white hover:bg-white/10 rounded font-medium">Tentang</a>
              <a href="#products" className="block px-3 py-2 text-white hover:bg-white/10 rounded font-medium">Produk</a>
              <a href="#order" className="block px-3 py-2 text-white hover:bg-white/10 rounded font-medium">Pesan</a>
              <a href="#contact" className="block px-3 py-2 text-white hover:bg-white/10 rounded font-medium">Kontak</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-16 min-h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/produk/herofarm.png"
            alt="Griya Hydrofarm"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Left Side - Company Info */}
            <div className="pt-8">
              {/* Company Name */}
              <div className="mb-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 tracking-tight">
                  Griya Hydrofarm
                </h1>
                <div className="h-1 w-24 bg-primary-500 rounded-full"></div>
              </div>

              {/* Tagline */}
              <h2 className="text-2xl md:text-3xl font-semibold text-primary-300 mb-6">
                Solusi Sayuran Hidroponik Berkualitas Premium
              </h2>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-200 mb-4 leading-relaxed">
                Kami adalah pelopor pertanian hidroponik modern di Lampung Selatan yang menghadirkan 
                sayuran segar, sehat, dan bebas pestisida langsung dari kebun ke meja makan Anda.
              </p>
              
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                Dengan teknologi hidroponik terkini dan kontrol kualitas ketat, setiap helai sayuran 
                kami tumbuh dalam lingkungan optimal untuk menghasilkan nutrisi maksimal dan rasa yang 
                luar biasa. Dipercaya oleh ribuan keluarga untuk gaya hidup sehat mereka.
              </p>
            </div>

            {/* Right Side - Features & CTA */}
            <div className="space-y-6 pt-8 lg:pl-8">
              {/* Features Cards */}
              <div className="space-y-4 max-w-md ml-auto">
                <div className="flex items-center space-x-4 px-5 py-4 hover:bg-white/5 rounded-xl transition-all duration-300">
                  <div className="bg-primary-500/30 p-2.5 rounded-lg backdrop-blur-sm flex-shrink-0">
                    <Droplets className="h-6 w-6 text-white drop-shadow-lg" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base drop-shadow-lg">Teknologi Modern</h3>
                    <p className="text-gray-100 text-xs drop-shadow-md">Sistem hidroponik terkini</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 px-5 py-4 hover:bg-white/5 rounded-xl transition-all duration-300">
                  <div className="bg-primary-500/30 p-2.5 rounded-lg backdrop-blur-sm flex-shrink-0">
                    <Leaf className="h-6 w-6 text-white drop-shadow-lg" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base drop-shadow-lg">100% Organik</h3>
                    <p className="text-gray-100 text-xs drop-shadow-md">Bebas pestisida & bahan kimia</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 px-5 py-4 hover:bg-white/5 rounded-xl transition-all duration-300">
                  <div className="bg-primary-500/30 p-2.5 rounded-lg backdrop-blur-sm flex-shrink-0">
                    <Clock className="h-6 w-6 text-white drop-shadow-lg" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base drop-shadow-lg">Layanan 24/7</h3>
                    <p className="text-gray-100 text-xs drop-shadow-md">Siap melayani kapan saja</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 max-w-md ml-auto">
                <a
                  href="#order"
                  className="group backdrop-blur-sm border-2 border-primary-400 text-white px-8 py-4 rounded-xl hover:bg-primary-600 hover:border-primary-600 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg transform hover:-translate-y-0.5"
                >
                  <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Pesan Sekarang</span>
                </a>
                <a 
                  href="#products"
                  className="backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-primary-600 transition-all duration-300 text-center font-semibold"
                >
                  Jelajahi Produk
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/produk/section2.png"
            alt="Hidroponik Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-lg">
              Mengapa Memilih Sayuran Hidroponik Kami?
            </h2>
            <p className="text-base md:text-lg text-gray-200 max-w-3xl mx-auto drop-shadow-md">
              Solusi sayuran premium untuk keluarga, restoran, kafe, catering, dan supermarket
            </p>
          </div>

          {/* Marketing Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {/* Benefit 1 */}
            <div className="group px-5 py-4 hover:bg-white/5 rounded-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-primary-400/30 to-primary-600/30 backdrop-blur-sm w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 drop-shadow-lg">Bebas Pestisida</h3>
              <p className="text-gray-200 text-sm leading-relaxed drop-shadow-md">
                100% organik tanpa bahan kimia berbahaya. Aman dikonsumsi langsung, ideal untuk menu sehat restoran dan keluarga.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="group px-5 py-4 hover:bg-white/5 rounded-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-blue-400/30 to-blue-600/30 backdrop-blur-sm w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Droplets className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 drop-shadow-lg">Nutrisi Optimal</h3>
              <p className="text-gray-200 text-sm leading-relaxed drop-shadow-md">
                Kandungan vitamin 30% lebih tinggi dengan nutrisi terkontrol. Sempurna untuk menu premium dan health-conscious customers.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="group px-5 py-4 hover:bg-white/5 rounded-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-emerald-400/30 to-emerald-600/30 backdrop-blur-sm w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 drop-shadow-lg">Kesegaran Terjamin</h3>
              <p className="text-gray-200 text-sm leading-relaxed drop-shadow-md">
                Dipanen fresh sesuai pesanan. Kesegaran maksimal untuk display supermarket dan penyajian restoran yang menarik.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="group px-5 py-4 hover:bg-white/5 rounded-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-purple-400/30 to-purple-600/30 backdrop-blur-sm w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 drop-shadow-lg">Ramah Lingkungan</h3>
              <p className="text-gray-200 text-sm leading-relaxed drop-shadow-md">
                Hemat air 90% dan tidak mencemari tanah. Dukung sustainability program bisnis kuliner Anda.
              </p>
            </div>

            {/* Benefit 5 */}
            <div className="group px-5 py-4 hover:bg-white/5 rounded-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-orange-400/30 to-orange-600/30 backdrop-blur-sm w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 drop-shadow-lg">Kualitas Konsisten</h3>
              <p className="text-gray-200 text-sm leading-relaxed drop-shadow-md">
                Tidak terpengaruh cuaca atau musim. Stok stabil untuk kebutuhan bisnis kuliner dan retail sepanjang tahun.
              </p>
            </div>

            {/* Benefit 6 */}
            <div className="group px-5 py-4 hover:bg-white/5 rounded-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-teal-400/30 to-teal-600/30 backdrop-blur-sm w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 drop-shadow-lg">Harga Kompetitif</h3>
              <p className="text-gray-200 text-sm leading-relaxed drop-shadow-md">
                Harga grosir untuk pembelian bulk. Cocok untuk supplier restoran, hotel, dan supermarket dengan margin optimal.
              </p>
            </div>
          </div>

          {/* Educational Section - How It Works */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-10">
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 drop-shadow-lg">
                Bagaimana Sistem Hidroponik Bekerja?
              </h3>
              <p className="text-gray-200 text-sm md:text-base drop-shadow-md max-w-3xl mx-auto">
                Proses perawatan sederhana yang menghasilkan sayuran berkualitas untuk kebutuhan keluarga dan bisnis kuliner
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Step 1 */}
              <div className="text-center group">
                <div className="relative mb-5">
                  <div className="bg-gradient-to-br from-primary-500/40 to-primary-700/40 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform border border-white/20">
                    <span className="text-2xl font-bold text-white drop-shadow-lg">1</span>
                  </div>
                </div>
                <h4 className="text-base font-bold text-white mb-2 drop-shadow-lg">Persiapan Bibit</h4>
                <p className="text-gray-200 text-xs leading-relaxed drop-shadow-md">
                  Bibit sayuran disemai dalam rockwool atau spons. Disiram air bersih setiap hari hingga tumbuh daun 3-4 helai, siap dipindah ke sistem hidroponik.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center group">
                <div className="relative mb-5">
                  <div className="bg-gradient-to-br from-blue-500/40 to-blue-700/40 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform border border-white/20">
                    <span className="text-2xl font-bold text-white drop-shadow-lg">2</span>
                  </div>
                </div>
                <h4 className="text-base font-bold text-white mb-2 drop-shadow-lg">Pemberian Nutrisi</h4>
                <p className="text-gray-200 text-xs leading-relaxed drop-shadow-md">
                  Nutrisi AB Mix dicampur dengan air bersih sesuai takaran. Larutan nutrisi dialirkan ke tanaman menggunakan pompa air sederhana atau sistem gravitasi.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center group">
                <div className="relative mb-5">
                  <div className="bg-gradient-to-br from-emerald-500/40 to-emerald-700/40 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform border border-white/20">
                    <span className="text-2xl font-bold text-white drop-shadow-lg">3</span>
                  </div>
                </div>
                <h4 className="text-base font-bold text-white mb-2 drop-shadow-lg">Perawatan Rutin</h4>
                <p className="text-gray-200 text-xs leading-relaxed drop-shadow-md">
                  Cek air nutrisi setiap hari, pastikan tidak keruh. Bersihkan pipa dari lumut seminggu sekali. Buang daun kuning dan cek hama secara manual.
                </p>
              </div>

              {/* Step 4 */}
              <div className="text-center group">
                <div className="relative mb-5">
                  <div className="bg-gradient-to-br from-orange-500/40 to-orange-700/40 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform border border-white/20">
                    <span className="text-2xl font-bold text-white drop-shadow-lg">4</span>
                  </div>
                </div>
                <h4 className="text-base font-bold text-white mb-2 drop-shadow-lg">Panen & Packing</h4>
                <p className="text-gray-200 text-xs leading-relaxed drop-shadow-md">
                  Panen saat pagi hari umur 30-40 hari. Cuci bersih dengan air mengalir, tiriskan, lalu kemas dalam plastik atau box. Simpan di tempat sejuk.
                </p>
              </div>
            </div>

            {/* Target Market Info */}
            <div className="bg-white/5 rounded-xl p-5 mb-6 border border-white/10">
              <h4 className="text-lg font-bold text-white mb-3 text-center drop-shadow-lg">Melayani Berbagai Segmen</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="group hover:bg-white/5 p-3 rounded-lg transition">
                  <div className="bg-primary-500/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <p className="text-white text-xs font-semibold drop-shadow-md">Keluarga</p>
                </div>
                <div className="group hover:bg-white/5 p-3 rounded-lg transition">
                  <div className="bg-orange-500/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <p className="text-white text-xs font-semibold drop-shadow-md">Restoran & Kafe</p>
                </div>
                <div className="group hover:bg-white/5 p-3 rounded-lg transition">
                  <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <p className="text-white text-xs font-semibold drop-shadow-md">Supermarket</p>
                </div>
                <div className="group hover:bg-white/5 p-3 rounded-lg transition">
                  <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <p className="text-white text-xs font-semibold drop-shadow-md">Catering & Hotel</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <a
                href="#order"
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 font-semibold"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Pesan Sekarang - Grosir & Eceran</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=1920&q=80"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-lg">
              Produk Kami
            </h2>
            <p className="text-gray-200 text-base md:text-lg drop-shadow-md">
              Sayuran hidroponik segar berkualitas premium
            </p>
          </div>

          {/* Main Product Layout */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            
            {/* Left Side - Video */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
                <video
                  className="w-full h-auto"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  poster="/produk/hydrofarm.png"
                >
                  <source src="https://wdvzpaguujpgsf1u.public.blob.vercel-storage.com/video_farm.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              
              {/* Video Description */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
                <h3 className="text-base md:text-lg font-bold text-white mb-2 drop-shadow-lg flex items-center">
                  <svg className="h-5 w-5 mr-2 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Lihat Proses Penanaman Kami
                </h3>
                <p className="text-gray-200 text-sm drop-shadow-md">
                  Saksikan langsung bagaimana kami merawat setiap tanaman dengan penuh perhatian untuk menghasilkan sayuran berkualitas terbaik.
                </p>
              </div>
            </div>

            {/* Right Side - Product Details */}
            <div className="space-y-6">
              {/* Product Image */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/produk/hydrofarm.png"
                  alt="Selada Hijau Hidroponik"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Product Info Card */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 md:p-6 shadow-xl">
                <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 drop-shadow-lg">Selada Hijau Hidroponik</h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-400 fill-yellow-400" />
                        <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-400 fill-yellow-400" />
                        <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-400 fill-yellow-400" />
                        <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-400 fill-yellow-400" />
                        <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-400 fill-yellow-400" />
                      </div>
                      <span className="text-white font-semibold drop-shadow-md text-sm md:text-base">5.0</span>
                    </div>
                  </div>
                  <div className="bg-primary-500 px-3 py-1.5 md:px-4 md:py-2 rounded-lg">
                    <span className="text-white font-bold text-xs md:text-sm">FRESH</span>
                  </div>
                </div>

                <p className="text-gray-200 text-sm leading-relaxed mb-6 drop-shadow-md">
                  Selada hijau segar hasil hidroponik dengan tekstur renyah dan rasa manis alami. 
                  Kaya akan vitamin A, C, K, dan serat. Sempurna untuk salad, burger, sandwich, 
                  atau garnish hidangan premium Anda.
                </p>

                {/* Product Features */}
                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="flex items-center space-x-2 mb-1">
                      <svg className="h-4 w-4 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                      <span className="text-white text-xs font-semibold drop-shadow-md">Berat</span>
                    </div>
                    <p className="text-white font-bold drop-shadow-lg text-sm md:text-base">250 gram</p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="flex items-center space-x-2 mb-1">
                      <svg className="h-4 w-4 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-white text-xs font-semibold drop-shadow-md">Kesegaran</span>
                    </div>
                    <p className="text-white font-bold drop-shadow-lg text-sm md:text-base">7-10 hari</p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="flex items-center space-x-2 mb-1">
                      <Leaf className="h-4 w-4 text-primary-400 flex-shrink-0" />
                      <span className="text-white text-xs font-semibold drop-shadow-md">Status</span>
                    </div>
                    <p className="text-white font-bold drop-shadow-lg text-sm md:text-base">100% Organik</p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="flex items-center space-x-2 mb-1">
                      <svg className="h-4 w-4 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-white text-xs font-semibold drop-shadow-md">Pestisida</span>
                    </div>
                    <p className="text-white font-bold drop-shadow-lg text-sm md:text-base">Bebas</p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="#order"
                    className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg font-semibold text-sm md:text-base"
                  >
                    <ShoppingCart className="h-5 w-5 flex-shrink-0" />
                    <span>Pesan Sekarang</span>
                  </a>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Halo, saya ingin bertanya tentang produk Selada Hijau Hidroponik')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-6 py-3 rounded-xl hover:bg-white hover:text-primary-600 transition-all duration-300 flex items-center justify-center space-x-2 font-semibold text-sm md:text-base"
                  >
                    <Phone className="h-5 w-5 flex-shrink-0" />
                    <span>Tanya Produk</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Product Benefits */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 md:p-6 hover:bg-white/10 transition-all">
              <div className="bg-primary-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-base md:text-lg font-bold text-white mb-2 drop-shadow-lg">Harga Terjangkau</h4>
              <p className="text-gray-200 text-sm drop-shadow-md">
                Harga kompetitif dengan kualitas premium. Tersedia paket grosir untuk pembelian dalam jumlah besar.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 md:p-6 hover:bg-white/10 transition-all">
              <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-base md:text-lg font-bold text-white mb-2 drop-shadow-lg">Higienis & Bersih</h4>
              <p className="text-gray-200 text-sm drop-shadow-md">
                Proses produksi yang higienis dan terkontrol. Dicuci bersih sebelum dikemas untuk menjamin kebersihan produk.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 md:p-6 hover:bg-white/10 transition-all">
              <div className="bg-emerald-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-base md:text-lg font-bold text-white mb-2 drop-shadow-lg">Pengiriman Cepat</h4>
              <p className="text-gray-200 text-sm drop-shadow-md">
                Pengiriman same day untuk area Lampung Selatan. Produk dijamin sampai dalam kondisi segar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section id="order" className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/produk/section-pesan.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-lg">
              Pesan Sekarang
            </h2>
            <p className="text-gray-200 text-base md:text-lg drop-shadow-md max-w-2xl mx-auto">
              Pilih cara pemesanan yang paling mudah untuk Anda
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            
            {/* Left Side - Quick WhatsApp Order */}
            <div className="space-y-6">
              {/* WhatsApp Direct Card */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-all duration-300 group">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-green-500/20 p-4 rounded-xl group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">Pesan via WhatsApp</h3>
                    <p className="text-gray-300 text-sm drop-shadow-md">Respon cepat & langsung</p>
                  </div>
                </div>

                <p className="text-gray-200 text-sm mb-6 drop-shadow-md">
                  Hubungi kami langsung melalui WhatsApp untuk pemesanan cepat, konsultasi produk, atau pertanyaan lainnya. Tim kami siap membantu Anda 24/7.
                </p>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Halo Griya Hydrofarm! Saya ingin memesan sayuran hidroponik.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold text-base group"
                >
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>Chat WhatsApp Sekarang</span>
                </a>
              </div>

              {/* Benefits */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-white">
                  <div className="bg-primary-500/20 p-2 rounded-lg">
                    <svg className="h-5 w-5 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm drop-shadow-md">Respon cepat dalam hitungan menit</span>
                </div>
                <div className="flex items-center space-x-3 text-white">
                  <div className="bg-primary-500/20 p-2 rounded-lg">
                    <svg className="h-5 w-5 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm drop-shadow-md">Konsultasi gratis sebelum pesan</span>
                </div>
                <div className="flex items-center space-x-3 text-white">
                  <div className="bg-primary-500/20 p-2 rounded-lg">
                    <svg className="h-5 w-5 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm drop-shadow-md">Proses pemesanan mudah & cepat</span>
                </div>
              </div>
            </div>

            {/* Right Side - Order Form */}
            <div className="space-y-6">
              <div className="px-6 py-4 rounded-xl border border-white/10">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-primary-500/20 p-3 rounded-lg">
                    <svg className="h-6 w-6 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white drop-shadow-lg">Form Pemesanan</h3>
                    <p className="text-gray-300 text-xs drop-shadow-md">Isi data untuk pemesanan</p>
                  </div>
                </div>

                <form onSubmit={handleOrder} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2 drop-shadow-md">
                      Nama Lengkap / Nama Usaha
                    </label>
                    <input
                      type="text"
                      required
                      value={orderForm.name}
                      onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm transition-all"
                      placeholder="Contoh: John Doe / Restoran Sehat"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2 drop-shadow-md">
                      Nomor WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      value={orderForm.phone}
                      onChange={handlePhoneChange}
                      className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${phoneError ? 'border-red-400' : 'border-white/20'} text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm transition-all`}
                      placeholder="08xx xxxx xxxx atau 628xx xxxx xxxx"
                    />
                    {phoneError && (
                      <p className="text-red-400 text-xs mt-1 drop-shadow-md">{phoneError}</p>
                    )}
                    <p className="text-gray-300 text-xs mt-1 drop-shadow-md">
                      Pastikan nomor WhatsApp aktif dan terdaftar
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2 drop-shadow-md">
                      Detail Pesanan
                    </label>
                    <textarea
                      required
                      value={orderForm.address}
                      onChange={(e) => setOrderForm({...orderForm, address: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm transition-all resize-none"
                      placeholder="Alamat lengkap pengiriman:&#10;Jl. Contoh No. 123, Kec. Natar, Lampung Selatan&#10;&#10;Catatan pesanan (opsional):&#10;Contoh: Kirim pagi hari, sayuran untuk acara"
                    />
                    <p className="text-xs text-gray-300 mt-1 drop-shadow-md">
                      Masukkan alamat lengkap pengiriman dan catatan pesanan jika ada
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2 drop-shadow-md">
                      Jumlah (pack)
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={orderForm.quantity}
                      onChange={(e) => setOrderForm({...orderForm, quantity: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isValidating}
                    className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-4 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span>{isValidating ? 'Memproses...' : 'Kirim Pesanan'}</span>
                  </button>
                </form>
              </div>

              {/* Info Note */}
              <div className="bg-blue-500/10 border border-blue-400/20 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-start space-x-3">
                  <svg className="h-5 w-5 text-blue-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-blue-200 text-xs drop-shadow-md">
                    Setelah submit, pesanan Anda akan otomatis dikirim ke WhatsApp kami untuk konfirmasi dan pembayaran.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative overflow-hidden pt-16 pb-24">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/produk/section-kontak.png"
            alt="Background"
            className="w-full h-full object-cover object-[center_10%]"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/60 to-black/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="flex justify-end">
            <div className="max-w-lg w-full space-y-5">
              
              {/* Header */}
              <div className="mb-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                  Hubungi Kami
                </h2>
                <p className="text-gray-200 text-sm drop-shadow-md">
                  Kami siap melayani Anda 24 jam setiap hari. Hubungi kami melalui channel yang tersedia.
                </p>
              </div>

              {/* Contact Cards - Vertical Stack */}
              <div className="space-y-3">
                
                {/* Instagram Card */}
                <a
                  href="https://www.instagram.com/griyahydrofarm?igsh=MXBlbWkyMHFmNTI1bQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-all duration-300 group"
                >
                  <div className="bg-gradient-to-br from-pink-500/30 to-purple-500/30 p-2 rounded-lg backdrop-blur-sm flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="h-5 w-5 text-pink-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm drop-shadow-lg">Instagram</h3>
                    <p className="text-gray-100 text-xs drop-shadow-md">@griyahydrofarm</p>
                    <p className="text-primary-300 text-xs drop-shadow-md">Follow kami →</p>
                  </div>
                </a>

                {/* Location Card */}
                <a
                  href="https://maps.app.goo.gl/A6UsgeaSFE9iT3xg8?g_st=aw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-all duration-300 group"
                >
                  <div className="bg-gradient-to-br from-red-500/30 to-orange-500/30 p-2 rounded-lg backdrop-blur-sm flex-shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin className="h-5 w-5 text-red-300" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm drop-shadow-lg">Alamat</h3>
                    <p className="text-gray-100 text-xs drop-shadow-md">
                      Natar, Kec. Natar, Kabupaten Lampung Selatan, Lampung 35362
                    </p>
                    <p className="text-primary-300 text-xs drop-shadow-md">Lihat di Maps →</p>
                  </div>
                </a>

                {/* Operating Hours Card */}
                <div className="flex items-center space-x-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-all duration-300">
                  <div className="bg-gradient-to-br from-primary-500/30 to-emerald-500/30 p-2 rounded-lg backdrop-blur-sm flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary-300" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm drop-shadow-lg">Jam Operasional</h3>
                    <p className="text-gray-100 text-xs drop-shadow-md">
                      Buka 24 Jam Setiap Hari
                    </p>
                    <div className="inline-flex items-center text-green-300 text-xs font-medium">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                      Buka Sekarang
                    </div>
                  </div>
                </div>

              </div>

              {/* Additional Info - Horizontal Layout */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <div className="grid md:grid-cols-2 gap-5">
                  
                  {/* Quick Contact */}
                  <div>
                    <h3 className="text-sm font-bold text-white mb-2 drop-shadow-lg flex items-center">
                      <svg className="h-4 w-4 mr-2 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Kontak Cepat
                    </h3>
                    <div className="flex items-center space-x-2 text-white">
                      <div className="bg-primary-500/20 p-1.5 rounded-lg flex-shrink-0">
                        <Phone className="h-4 w-4 text-primary-300" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Telepon / WhatsApp</p>
                        <p className="text-sm font-medium drop-shadow-md">0896-9941-2320</p>
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div>
                    <h3 className="text-sm font-bold text-white mb-2 drop-shadow-lg flex items-center">
                      <svg className="h-4 w-4 mr-2 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                      Ikuti Kami
                    </h3>
                    <a
                      href="https://www.instagram.com/griyahydrofarm?igsh=MXBlbWkyMHFmNTI1bQ=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1.5 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium text-xs"
                    >
                      <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <span>Follow Instagram</span>
                    </a>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative text-white py-8 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/produk/footer.png"
            alt="Hydroponic Background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <div className="bg-primary-500/30 p-2 rounded-lg backdrop-blur-sm">
              <Leaf className="h-6 w-6 text-white drop-shadow-lg" />
            </div>
            <span className="text-xl font-bold drop-shadow-lg">Griya Hydrofarm</span>
          </div>
          <p className="text-white/90 mb-3 text-sm font-medium drop-shadow-md">
            Fresh & Quality Hydroponic Vegetables
          </p>
          <div className="h-px w-24 bg-white/30 mx-auto mb-3"></div>
          <p className="text-white/80 text-sm mb-2 drop-shadow-md">
            © 2026 Griya Hydrofarm. All rights reserved.
          </p>
          <p className="text-white/70 text-xs drop-shadow-md">
            Crafted with care by <span className="font-semibold text-white/90">Bayu Tieree</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
