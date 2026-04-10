# Setup Instructions

## Langkah-langkah Setup

### 1. Simpan Gambar
Simpan gambar selada hijau hidroponik Anda dengan nama `selada-hijau.jpg` di folder `public/`

Struktur folder:
```
project/
├── public/
│   └── selada-hijau.jpg  <-- Simpan gambar di sini
├── app/
├── package.json
└── ...
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Jalankan Development Server
```bash
npm run dev
```

Buka http://localhost:3000 di browser

### 4. Deploy ke Vercel

#### Opsi A: Via Vercel Dashboard
1. Push code ke GitHub
2. Buka https://vercel.com
3. Login dan klik "Add New Project"
4. Import repository GitHub Anda
5. Vercel akan otomatis detect Next.js
6. Klik "Deploy"
7. Selesai! Website Anda live

#### Opsi B: Via Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
```

### 5. Custom Domain (Opsional)
Setelah deploy, Anda bisa menambahkan custom domain di Vercel dashboard:
- Settings → Domains → Add Domain

## Catatan Penting

- Pastikan gambar `selada-hijau.jpg` sudah ada di folder `public/` sebelum deploy
- Gambar akan digunakan di Hero Section dan Product Section
- Format gambar yang didukung: JPG, PNG, WebP
- Ukuran gambar yang direkomendasikan: minimal 800x600px untuk kualitas terbaik

## Troubleshooting

Jika gambar tidak muncul:
1. Pastikan nama file exact: `selada-hijau.jpg` (huruf kecil semua)
2. Pastikan file ada di folder `public/` bukan di subfolder
3. Restart development server setelah menambahkan gambar
4. Clear browser cache (Ctrl+Shift+R atau Cmd+Shift+R)
