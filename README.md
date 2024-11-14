# Panduan Lengkap Instalasi dan Menjalankan Aplikasi Expo

## Prasyarat
Sebelum memulai, pastikan sistem Anda memenuhi persyaratan berikut:
1. Node.js versi 16.0.0 atau lebih tinggi
   ```bash
   # Cek versi Node.js
   node --version
   ```
2. npm (Node Package Manager) atau yarn
   ```bash
   # Cek versi npm
   npm --version
   ```
3. Git untuk cloning project
   ```bash
   # Cek versi Git
   git --version
   ```
4. Expo Go terinstal di smartphone Anda (tersedia di Play Store/App Store)

## Langkah-langkah Instalasi

### 1. Clone Project dari Git
```bash
# Clone repository
git clone <url-repository-anda>

# Masuk ke direktori project
cd nama-project
```

### 2. Instalasi Dependencies
```bash
# Menggunakan npm
npm install

# ATAU menggunakan yarn
yarn install
```

## Menjalankan Aplikasi

### 1. Memulai Development Server
```bash
npx expo start
```
Setelah menjalankan perintah ini, Anda akan melihat QR code di terminal.

### 2. Menjalankan di Expo Go
1. **Untuk Pengguna Android:**
   - Buka aplikasi Expo Go
   - Pilih "Scan QR Code"
   - Scan QR code yang muncul di terminal
   - Pastikan smartphone Anda terhubung ke jaringan WiFi yang sama dengan komputer

2. **Untuk Pengguna iOS:**
   - Buka aplikasi Camera bawaan
   - Arahkan ke QR code yang muncul di terminal
   - Tap notifikasi yang muncul untuk membuka di Expo Go
   - Pastikan smartphone Anda terhubung ke jaringan WiFi yang sama dengan komputer

### 3. Opsi Development Mode
Setelah aplikasi terbuka, Anda bisa:
- Shake device untuk membuka developer menu
- Tekan `r` di terminal untuk reload aplikasi
- Tekan `m` untuk membuka developer menu
- Tekan `j` untuk membuka debugger

## Struktur Project
```
nama-project/
├── app/                   # Direktori utama aplikasi
├── assets/               # Gambar, font, dan assets lainnya
├── package.json         # Daftar dependencies
├── app.json             # Konfigurasi aplikasi Expo
└── babel.config.js      # Konfigurasi Babel
```

## Troubleshooting

### 1. Masalah Koneksi
- Pastikan smartphone dan komputer terhubung ke jaringan WiFi yang sama
- Coba matikan firewall atau antivirus sementara
- Gunakan tunnel mode dengan mengetik `w` di terminal setelah menjalankan expo start

### 2. Metro Bundler Error
```bash
# Clear cache Metro Bundler
npx expo start --clear
```

### 3. Dependencies Error
```bash
# Hapus node_modules dan install ulang
rm -rf node_modules
npm install

# Clear cache npm
npm cache clean --force
```

## Tips Development
1. Aktifkan "Fast Refresh" di developer menu untuk melihat perubahan secara real-time
2. Gunakan Expo Go untuk development awal dan testing cepat
3. Manfaatkan developer menu untuk debugging
4. Periksa console log di terminal atau browser untuk debugging

## Perintah Berguna
```bash
# Menjalankan di mode tunnel (jika ada masalah koneksi)
npx expo start --tunnel

# Menjalankan di platform spesifik
npx expo start --android
npx expo start --ios
npx expo start --web

# Clear cache
npx expo start -c
```

## Bantuan dan Dukungan
- **Error Message**: Jika menemui error, baca pesan error di terminal dengan teliti
- **Expo Documentation**: Kunjungi [docs.expo.dev](https://docs.expo.dev)
- **GitHub Issues**: Cek issues yang sudah ada di repository
- **Expo Forums**: Kunjungi [forums.expo.dev](https://forums.expo.dev)




# Panduan Build Aplikasi Menggunakan EAS Build

## Prasyarat
- Node.js versi 14.0 atau lebih tinggi
- npm atau yarn sebagai package manager
- Akun Expo (expo.dev)
- EAS CLI terinstal secara global

## Langkah-langkah Setup

### 1. Instalasi EAS CLI
```bash
npm install -g eas-cli
```

### 2. Login ke Akun Expo
```bash
eas login
```

### 3. Inisialisasi EAS Build dalam Project
```bash
eas build:configure
```
Perintah ini akan membuat file `eas.json` di root project Anda dengan konfigurasi default.

### 4. Konfigurasi EAS Build
Buka file `eas.json` dan sesuaikan konfigurasi:
```json
{
  "cli": {
    "version": ">= 3.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  }
}
```

### 5. Konfigurasi app.json
```json
{
  "expo": {
    "name": "Nama Aplikasi Anda",
    "slug": "nama-aplikasi-anda",
    "version": "1.0.0",
    "android": {
      "package": "com.namaperusahaan.aplikasi"
    },
    "ios": {
      "bundleIdentifier": "com.namaperusahaan.aplikasi"
    }
  }
}
```

## Proses Build

### Build Development
```bash
# Build untuk Android dan iOS
eas build --profile development --platform all

# Build untuk Android saja
eas build --profile development --platform android

# Build untuk iOS saja
eas build --profile development --platform ios
```

### Build Preview
```bash
eas build --profile preview --platform all
```

### Build Production
```bash
eas build --profile production --platform all
```

## Tipe Build Profile

### 1. Development
- Untuk pengembangan dan testing
- Includes developer tools
- Dapat diinstal di device development

### 2. Preview
- Untuk internal testing
- Mirip production build
- Distribusi internal

### 3. Production
- Build final untuk Play Store/App Store
- Optimized dan minified
- Production-ready

## Monitoring Build
1. Melalui CLI:
   - Build progress ditampilkan di terminal
   - URL build akan diberikan

2. Melalui Expo Website:
   - Kunjungi https://expo.dev
   - Buka bagian "Builds"
   - Pantau status dan download hasil build

## Tips Penting
1. Gunakan Git untuk version control
2. Simpan credentials dengan aman:
   ```bash
   eas credentials
   ```
3. Update EAS CLI secara berkala:
   ```bash
   npm install -g eas-cli@latest
   ```
4. Backup konfigurasi eas.json dan app.json

## Troubleshooting
1. Build Error:
   ```bash
   eas build:list
   ```
   Untuk melihat history build dan status

2. Credential Issues:
   ```bash
   eas credentials
   ```
   Untuk mengatur ulang credentials

3. Clean Build:
   ```bash
   eas build --clear-cache
   ```
   Untuk membersihkan cache build

## Perintah EAS Build Berguna Lainnya
```bash
# Melihat daftar build
eas build:list

# Membatalkan build yang sedang berjalan
eas build:cancel

# Mengatur credentials
eas credentials

# Melihat status build
eas build:status
```
