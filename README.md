# 1. Panduan Lengkap Instalasi dan Menjalankan Aplikasi Expo

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
git clone https://github.com/brillianodhiya/absensi.git

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




# 2. Panduan Build Aplikasi Menggunakan EAS Build

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


# 3. Panduan Lengkap EAS Update untuk Expo (Jika terjadi perubahan kecil)

## Pengenalan EAS Update
EAS Update memungkinkan Anda untuk memperbarui aplikasi JavaScript, TypeScript, dan aset secara over-the-air (OTA) tanpa perlu mengirimkan build baru ke App Store atau Play Store.

## Prasyarat
1. Node.js versi 16.0.0 atau lebih tinggi
2. Akun Expo yang sudah terverifikasi
3. EAS CLI terinstal secara global
   ```bash
   npm install -g eas-cli
   ```
4. Project Expo yang sudah dikonfigurasi dengan EAS Build

## Langkah-langkah Setup

### 1. Login ke Akun Expo
```bash
eas login
```

### 2. Konfigurasi EAS Update
Tambahkan konfigurasi berikut di `app.json`:
```json
{
  "expo": {
    "updates": {
      "enabled": true,
      "fallbackToCacheTimeout": 0
    },
    "runtimeVersion": {
      "policy": "sdkVersion"
    }
  }
}
```

### 3. Konfigurasi eas.json
```json
{
  "cli": {
    "version": ">= 3.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "channel": "development"
    },
    "preview": {
      "distribution": "internal",
      "channel": "preview"
    },
    "production": {
      "channel": "production"
    }
  },
  "submit": {
    "production": {}
  }
}
```

## Cara Menggunakan EAS Update

### 1. Membuat Update
```bash
# Update untuk channel development
eas update --branch development

# Update untuk channel preview
eas update --branch preview

# Update untuk channel production
eas update --branch production
```

### 2. Menentukan Branch dan Channel
```bash
# Update spesifik branch dengan message
eas update --branch [nama-branch] --message "Deskripsi update"

# Update dengan platform spesifik
eas update --branch [nama-branch] --platform android
eas update --branch [nama-branch] --platform ios
```

### 3. Manajemen Update
```bash
# Melihat daftar update
eas update:list

# Melihat detail update spesifik
eas update:view [UPDATE_ID]

# Membatalkan rollout update
eas update:rollback
```

## Strategi Update

### 1. Development Updates
- Gunakan untuk testing fitur baru
- Update lebih sering
- Terbatas pada pengguna internal
```bash
eas update --branch development --message "Testing fitur baru"
```

### 2. Preview Updates
- Untuk testing pre-release
- Distribusi terbatas
- QA dan beta testing
```bash
eas update --branch preview --message "Beta testing v1.2.0"
```

### 3. Production Updates
- Update untuk pengguna akhir
- Perlu testing menyeluruh
- Rollout bertahap
```bash
eas update --branch production --message "Perbaikan bug dan peningkatan performa"
```

## Konfigurasi Lanjutan

### 1. Runtime Version
Di `app.json`:
```json
{
  "expo": {
    "runtimeVersion": {
      "policy": "appVersion"
    }
  }
}
```

### 2. Update Kebijakan
```json
{
  "expo": {
    "updates": {
      "fallbackToCacheTimeout": 0,
      "checkAutomatically": "ON_LOAD"
    }
  }
}
```

## Troubleshooting

### 1. Masalah Update Gagal
```bash
# Cek status update
eas update:list

# Verifikasi konfigurasi
eas update:configure
```

### 2. Masalah Runtime Version
- Pastikan runtime version sesuai di app.json
- Cek compatibility dengan SDK Expo

### 3. Cache Issues
```bash
# Clear update cache
expo-updates clearUpdateCacheAsync()
```

## Tips dan Best Practices

1. **Testing Update**
   - Selalu test update di development/preview channel
   - Gunakan berbagai device untuk testing
   - Verifikasi backward compatibility

2. **Version Control**
   - Gunakan git tags untuk tracking updates
   - Dokumentasikan perubahan di commit message
   - Simpan backup sebelum update besar

3. **Monitoring**
   - Pantau metrics di Expo dashboard
   - Cek error reports
   - Monitor user feedback

4. **Rollout Strategy**
   - Mulai dengan rollout terbatas
   - Tingkatkan secara bertahap
   - Siapkan rollback plan

## Perintah Penting
```bash
# Cek status update
eas update:list

# Rollback ke versi sebelumnya
eas update:rollback

# Konfigurasi ulang update
eas update:configure

# View update detail
eas update:view [UPDATE_ID]
```

## Sumber Daya Tambahan
- [Dokumentasi EAS Update](https://docs.expo.dev/eas-update/introduction/)
- [Expo Forums](https://forums.expo.dev)
- [GitHub Issues](https://github.com/expo/expo/issues)
