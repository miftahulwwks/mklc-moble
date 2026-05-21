import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PPHKWN6 from "../screens/jadwal_selengkapnya/pphkwn6";

const MK_MAROON = "#8B0000";
const MK_MAROON_LIGHT = "#A52A2A";
const MK_GOLD = "#D4AF37";
const BACKGROUND_LIGHT = "#FCFCFC";
const TEXT_DARK = "#1A1A1A";
const TEXT_MUTED = "#6B7280";

interface Kegiatan {
  id: string;
  judul: string;
  tanggalWaktu: string;
  penulis: string;
  deskripsi: string;
  tipe?: "pendaftaran" | "pengumuman" | "ujian" | "sertifikat";
}

const getKegiatanTipe = (
  judul: string,
): "pendaftaran" | "pengumuman" | "ujian" | "sertifikat" => {
  if (judul.includes("Pendaftaran")) return "pendaftaran";
  if (judul.includes("Pengumuman")) return "pengumuman";
  if (judul.includes("Ujian")) return "ujian";
  if (judul.includes("Sertifikat")) return "sertifikat";
  return "pengumuman";
};

const dataKegiatan: Kegiatan[] = [
  {
    id: "angkatan-9",
    judul: "Pembukaan Pendaftaran PPHKWN Angkatan 9 (Tahun 2025)",
    tanggalWaktu: "25 Jun 2025 17:36 WIB",
    penulis: "Developer E-learning",
    deskripsi:
      "Pusat Pendidikan Pancasila dan Konstitusi Mahkamah Konstitusi Republik Indonesia membuka pendaftaran untuk Angkatan ke-9...",
  },
  {
    id: "angkatan-8",
    judul: "Pembukaan Pendaftaran PPHKWN Angkatan 8 (Tahun 2025)",
    tanggalWaktu: "15 Mei 2025 10:00 WIB",
    penulis: "Developer E-learning",
    deskripsi:
      "Kegiatan Peningkatan Pemahaman Hak Konstitusional Warga Negara Angkatan 8 akan dimulai pada bulan Mei 2025.",
  },
  {
    id: "angkatan-7",
    judul: "Pengumuman Kelulusan Kegiatan PPHKWN Angkatan 7",
    tanggalWaktu: "20 Apr 2025 15:00 WIB",
    penulis: "Admin PPMK",
    deskripsi:
      "Hasil kelulusan untuk seluruh peserta Angkatan 7 telah diumumkan. Silakan cek dashboard masing-masing.",
  },
  {
    id: "angkatan-6",
    judul: "Pembukaan Pendaftaran PPHKWN Angkatan 6 (Tahun 2025)",
    tanggalWaktu: "25 Jan 2025 17:33 WIB",
    penulis: "Developer E-learning",
    deskripsi:
      "Pusat Pendidikan Pancasila dan Konstitusi Mahkamah Konstitusi Republik Indonesia membuka pendaftaran untuk Angkatan ke-6...",
  },
  {
    id: "angkatan-2",
    judul: "Sertifikat Tersedia: Angkatan 2 Tahun 2024",
    tanggalWaktu: "15 Mar 2024 17:36 WIB",
    penulis: "Admin PPMK",
    deskripsi:
      "Sertifikat elektronik bagi peserta Angkatan 2 yang lulus kini sudah bisa diunduh.",
  },
];

const KegiatanItem: React.FC<{
  kegiatan: Kegiatan;
  onSelect: (kegiatan: Kegiatan) => void;
}> = ({ kegiatan, onSelect }) => {
  const tipe = kegiatan.tipe || getKegiatanTipe(kegiatan.judul);

  const getIcon = (tipe: string) => {
    switch (tipe) {
      case "pendaftaran":
        return "clipboard-edit-outline";
      case "pengumuman":
        return "bell-ring-outline";
      case "ujian":
        return "file-certificate-outline";
      case "sertifikat":
        return "medal-outline";
      default:
        return "calendar-blank-outline";
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onSelect(kegiatan)}
      activeOpacity={0.8}
    >
      <View style={styles.cardTopRow}>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons
            name={getIcon(tipe)}
            size={22}
            color={MK_MAROON}
          />
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.judulText} numberOfLines={2}>
            {kegiatan.judul}
          </Text>
          <View style={styles.timeWrapper}>
            <Ionicons name="time-outline" size={12} color={MK_GOLD} />
            <Text style={styles.timeText}>{kegiatan.tanggalWaktu}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.descText} numberOfLines={2}>
        {kegiatan.deskripsi}
      </Text>

      <View style={styles.cardAction}>
        <Text style={styles.actionText}>Lihat Selengkapnya</Text>
        <Ionicons name="arrow-forward-circle" size={20} color={MK_MAROON} />
      </View>
    </TouchableOpacity>
  );
};

const Jadwal: React.FC = () => {
  const router = useRouter();
  const [selectedKegiatan, setSelectedKegiatan] = useState<Kegiatan | null>(
    null,
  );

  const handleBackToHome = () => router.replace("/(tabs)/home");

  if (selectedKegiatan && selectedKegiatan.id === "angkatan-6") {
    return <PPHKWN6 onBack={() => setSelectedKegiatan(null)} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.headerContainer}>
        <SafeAreaView edges={["top"]}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={handleBackToHome} style={styles.backBtn}>
              <Ionicons name="chevron-back" size={28} color="white" />
            </TouchableOpacity>
            <View style={styles.headerTitleBox}>
              <Text style={styles.headerTitle}>JADWAL KEGIATAN</Text>
              <Text style={styles.headerSub}>
                PUSDIK MAHKAMAH KONSTITUSI RI
              </Text>
            </View>
            <View style={{ width: 40 }} />
          </View>
        </SafeAreaView>
        <View style={styles.goldLine} />
      </View>

      <ScrollView
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.welcomeBox}>
          <Text style={styles.welcomeTitle}>Informasi Terkini</Text>
          <View style={styles.welcomeLine} />
        </View>

        {dataKegiatan.map((item) => (
          <KegiatanItem
            key={item.id}
            kegiatan={item}
            onSelect={setSelectedKegiatan}
          />
        ))}
        <View style={styles.pagination}>
          <TouchableOpacity style={styles.pageBtnActive}>
            <Text style={styles.pageTextActive}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pageBtn}>
            <Text style={styles.pageText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pageBtn}>
            <Text style={styles.pageText}>3</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_LIGHT,
  },

  headerContainer: {
    backgroundColor: MK_MAROON,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },

  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 10,
  },

  backBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },

  headerTitleBox: {
    flex: 1,
    alignItems: "center",
  },

  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  headerSub: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 10,
    fontWeight: "600",
    marginTop: 2,
  },

  goldLine: {
    height: 4,
    backgroundColor: MK_GOLD,
    width: "30%",
    alignSelf: "center",
    borderRadius: 2,
    marginBottom: -2,
  },

  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 50,
  },

  welcomeBox: {
    marginBottom: 20,
  },

  welcomeTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: MK_MAROON,
  },

  welcomeLine: {
    height: 3,
    width: 30,
    backgroundColor: MK_GOLD,
    marginTop: 4,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    elevation: 4,
    shadowColor: MK_MAROON,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },

  cardTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },

  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFF5F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    borderWidth: 1,
    borderColor: "#FFE0E0",
  },

  titleWrapper: {
    flex: 1,
  },

  judulText: {
    fontSize: 15,
    fontWeight: "800",
    color: TEXT_DARK,
    lineHeight: 21,
  },

  timeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 4,
  },

  timeText: {
    fontSize: 11,
    color: TEXT_MUTED,
    fontWeight: "600",
  },

  descText: {
    fontSize: 13,
    color: "#4B5563",
    lineHeight: 19,
    marginBottom: 15,
  },

  cardAction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },

  actionText: {
    fontSize: 12,
    fontWeight: "700",
    color: MK_MAROON,
  },

  // Pagination
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    gap: 12,
  },

  pageBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEE",
  },

  pageBtnActive: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: MK_MAROON,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },

  pageText: {
    color: TEXT_MUTED,
    fontWeight: "700",
  },

  pageTextActive: {
    color: "white",
    fontWeight: "700",
  },
});

export default Jadwal;
