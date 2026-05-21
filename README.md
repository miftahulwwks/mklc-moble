# Selamat Datang di Aplikasi MKLC Mobile 👋

Ini adalah proyek aplikasi mobile yang dibuat dengan [Expo](https://expo.dev) menggunakan [`create-expo-app`](https://www.npmjs.com/package/create-expo-app). Aplikasi ini dirancang untuk platform mobile (Android dan iOS) dengan menggunakan React Native dan Expo.

## Prasyarat Sistem

Sebelum memulai, pastikan Anda telah menginstall perangkat lunak berikut:

- **Node.js** (versi 18 atau lebih tinggi): [Download Node.js](https://nodejs.org/)
- **npm** atau **yarn**: Biasanya sudah terinstall bersama Node.js
- **Expo CLI**: Bisa diinstall secara global dengan `npm install -g @expo/cli`, atau gunakan `npx` untuk menjalankan tanpa install global

### Untuk Pengembangan Android:

- **Android Studio** (versi terbaru): [Download Android Studio](https://developer.android.com/studio)
- **Java Development Kit (JDK)** (versi 11 atau lebih tinggi)
- **Android SDK** dan emulator (disediakan oleh Android Studio)

### Untuk Pengembangan iOS (hanya di macOS):

- **Xcode** (versi 14 atau lebih tinggi): [Download dari Mac App Store](https://apps.apple.com/us/app/xcode/id497799835)
- **iOS Simulator** (tersedia di Xcode)

### Aplikasi untuk Testing:

- **Expo Go**: Install di perangkat Android/iOS Anda dari [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) atau [App Store](https://apps.apple.com/app/expo-go/id982107779)

## Instalasi

1. **Clone atau download repositori ini** ke komputer Anda.

2. **Buka terminal** dan navigasi ke folder proyek:

   ```bash
   cd path/to/mklc-mobile
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```
   Atau jika menggunakan yarn:
   ```bash
   yarn install
   ```

## Menjalankan Aplikasi

1. **Jalankan server pengembangan**:

   ```bash
   npx expo start
   ```

   Atau jika Expo CLI sudah terinstall global:

   ```bash
   expo start
   ```

2. **Pilih opsi untuk menjalankan aplikasi**:
   - **Development Build**: Untuk build kustom dengan fitur tambahan.
   - **Android Emulator**: Jalankan di emulator Android (pastikan Android Studio sudah dikonfigurasi).
   - **iOS Simulator**: Jalankan di simulator iOS (hanya di macOS).
   - **Expo Go**: Pindai QR code dengan aplikasi Expo Go di perangkat fisik Anda.

3. **Edit kode**: Anda dapat mulai mengedit file di dalam folder **app**. Proyek ini menggunakan [file-based routing](https://docs.expo.dev/router/introduction) dari Expo Router.

## Build untuk Produksi

Untuk membuat build produksi:

- **Android APK/AAB**:

  ```bash
  npx expo build:android
  ```

- **iOS IPA**:
  ```bash
  npx expo build:ios
  ```

Pastikan Anda memiliki akun Expo dan telah mengkonfigurasi EAS Build untuk build produksi.

## Troubleshooting

- Jika ada masalah dengan dependencies, coba hapus folder `node_modules` dan file `package-lock.json`, lalu jalankan `npm install` lagi.
- Pastikan versi Node.js dan Expo sesuai dengan prasyarat.
- Untuk masalah spesifik Android/iOS, periksa dokumentasi resmi Expo.

## Reset Proyek

Jika Anda ingin memulai dari awal:

```bash
npm run reset-project
```

Perintah ini akan memindahkan kode starter ke folder **app-example** dan membuat folder **app** kosong.

## Pelajari Lebih Lanjut

- [Dokumentasi Expo](https://docs.expo.dev/): Pelajari dasar-dasar atau topik lanjutan.
- [Tutorial Learn Expo](https://docs.expo.dev/tutorial/introduction/): Ikuti tutorial langkah demi langkah untuk membuat aplikasi yang berjalan di Android, iOS, dan web.

## Bergabung dengan Komunitas

Bergabunglah dengan komunitas developer yang membuat aplikasi universal.

- [Expo di GitHub](https://github.com/expo/expo): Lihat platform open source kami dan berkontribusi.
- [Komunitas Discord](https://chat.expo.dev): Ngobrol dengan pengguna Expo dan ajukan pertanyaan.
