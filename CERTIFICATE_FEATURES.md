# Fitur Halaman Sertifikat (Certificate Page Features)

## Deskripsi Umum
Halaman sertifikat telah diperbarui dengan desain profesional yang terlihat seperti sertifikat resmi dan dilengkapi dengan fitur unduh untuk perangkat Android dan iOS.

## Fitur Utama

### 1. **Desain Sertifikat Profesional**
- **Header Lembaga**: Logo dan nama institusi penerbit (Mahkamah Konstitusi) dengan desain elegan
- **Judul Sertifikat**: Teks "SERTIFIKAT" dengan styling bold dan warna maroon yang profesional
- **Nomor Sertifikat**: Identifikasi unik setiap sertifikat
- **Nama Penerima**: Ditampilkan dengan font besar dan menonjol
- **Detail Aktivitas**: Deskripsi kegiatan pelatihan dan periode pelaksanaan
- **Bagian Tanda Tangan**: 
  - Tanggal dan tempat penerbitan
  - Garis tanda tangan
  - Nama dan jabatan penandatangan
- **QR Code**: Positioned di pojok kanan bawah untuk verifikasi

### 2. **Fitur Unduh (Download)**
- **Tombol Download**: Icon unduh di header yang mudah diakses
- **Format Output**: Sertifikat diunduh dalam format **PNG** berkualitas tinggi (0.95 quality)
- **Naming Convention**: File disimpan dengan format `Sertifikat_[NAMA_PESERTA]_[TIMESTAMP].png`
- **Cross-Platform Support**: 
  - **Android**: Otomatis menyimpan ke Downloads folder
  - **iOS**: Menggunakan share sheet untuk save/AirDrop
- **Loading State**: Menampilkan loading indicator saat proses capture

### 3. **Tab Navigation**
Dua tab untuk menampilkan informasi berbeda:

#### Tab 1: Detail Kegiatan
- Lembaga penyelenggara
- Nama dan jabatan penandatangan
- Tanggal terbit dokumen
- Catatan tentang penandatanganan elektronik

#### Tab 2: Materi Pelatihan
- Tabel daftar materi yang diikuti
- Jumlah jam pelajaran (JP) per materi
- Total JP yang diselesaikan
- Styling profesional dengan header yang jelas

### 4. **Desain & Warna**
- **Primary Color**: Maroon (#900C3F) - warna aksen utama
- **Secondary Color**: Merah (#AA1A21) - highlight
- **Accent Color**: Gold (#D4AF37) - detail premium
- **Background**: Putih untuk sertifikat, abu-abu terang untuk background
- **Text Color**: Hitam gelap (#1A1A1A) untuk readability

### 5. **Responsivitas**
- Layout responsive untuk berbagai ukuran layar smartphone
- Scroll content yang smooth dengan ScrollView
- Proportional sizing untuk elemen-elemen
- QR code dengan border untuk visual hierarchy

## Dependencies

Fitur ini menggunakan library berikut:

```json
{
  "react-native-view-shot": "Untuk capture/screenshot komponen React Native",
  "expo-file-system": "Untuk manajemen file di device storage",
  "expo-sharing": "Untuk share dan save file ke device"
}
```

## Cara Menggunakan

### Untuk Pengguna
1. Buka halaman Sertifikat
2. Lihat desain sertifikat profesional
3. Navigasi antara tab "Detail Kegiatan" dan "Materi Pelatihan"
4. Tekan tombol **Download** (icon unduh) di header kanan
5. File sertifikat akan diunduh ke perangkat Anda

### Untuk Developer

#### Mengubah Data Sertifikat
Data sertifikat tersimpan dalam object `certificateData`:

```tsx
const certificateData: CertificateData = {
    no: "123.123-MK/12/2025",
    name: "Nama Peserta",
    status: "Peserta",
    activity: "Deskripsi Kegiatan",
    dateRange: "Tanggal Mulai s.d. Tanggal Akhir",
    locationDate: "Tempat, Tanggal",
    signerName: "Nama Penandatangan",
    signerTitle: "Jabatan Penandatangan",
    materi: [ /* array materi */ ],
    totalJp: 16
};
```

#### Mengubah Asset/Logo
- Ganti path di line 129-130 dengan file yang sesuai:
```tsx
const LogoMK = require('../../assets/logo.png');
const QRCodeSource = require('../../assets/qrcode.png');
```

#### Custom Styling
Semua styles tersimpan dalam object `mobileStyles` di akhir file. Anda bisa mengubah:
- Ukuran font
- Warna
- Padding/Margin
- Border radius
- Shadow effects

## Browser & Platform Support

| Platform | Support | Fitur Download |
|----------|---------|----------------|
| Android  | ✅      | Save to Downloads |
| iOS      | ✅      | Share Sheet + Save |
| Web      | ⚠️      | Limited (no download) |

## Error Handling

Aplikasi sudah menangani error pada:
- Proses capture/screenshot gagal
- File system error
- Permission denied

Pesan error akan ditampilkan dalam Alert dialog untuk informasi user.

## Future Improvements

Fitur potensial untuk ditambahkan:
1. **PDF Export**: Export langsung ke format PDF
2. **Email Integration**: Kirim sertifikat via email
3. **Cloud Storage**: Simpan ke Google Drive/OneDrive
4. **Certificate Verification**: QR code yang berfungsi untuk verifikasi online
5. **Print Function**: Cetak langsung dari app
6. **Certificate Gallery**: Histori sertifikat yang pernah diunduh

## Troubleshooting

### Download tidak berfungsi
- Pastikan permission sudah diberikan di settings
- Cek koneksi internet
- Restart aplikasi

### Logo/QR Code tidak tampil
- Verifikasi path file asset sudah benar
- Pastikan file sudah di folder `assets/`

### Kualitas gambar kurang
- Ubah quality di parameter `captureRef` (0.95 = 95%)
- Ubah format menjadi 'jpg' jika file terlalu besar

## License & Attribution

File ini menggunakan:
- Expo Vector Icons
- React Native built-in components
- Expo File System & Sharing APIs
