import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
import { useCallback, useState } from "react";
import {
  Dimensions,
  Linking,
  Modal,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import YoutubePlayer from "react-native-youtube-iframe";

// --- TEMA WARNA MAHKAMAH KONSTITUSI ---
const MK_THEME = {
  maroon: "#8B0000",
  gold: "#B8860B",
  goldLight: "#FAF3E0",
  white: "#FFFFFF",
  bg: "#F4F5F7",
  textMain: "#1A1A1A",
  textSub: "#666666",
  success: "#2E7D32",
  border: "#EAEAEA",
};

const courseData = {
  title:
    "Peningkatan Pemahaman Hak Konstitusional Warga Negara bagi Pegawai Pemerintah dengan Perjanjian Kerja (PPPK) Mahkamah Konstitusi",
  subtitle:
    "bagi Pegawai Pemerintah dengan Perjanjian Kerja (PPPK) Mahkamah Konstitusi",
  stats: [
    { count: 18, label: "Materi", icon: "folder-open" },
    { count: 14, label: "Jam Pelajaran", icon: "time" },
    { count: 500, label: "Peserta", icon: "people" },
  ],
  schedule: "04 Desember 2025 - 12 Desember 2025",
  organizer: "Pusdik MK",
};

// --- DATA SILABUS LENGKAP (10 MODUL) ---
const syllabusData = [
  {
    title: "Pre Test",
    isTest: true,
    items: [
      { text: "Pre Test", status: "Belum Selesai", icon: "create-outline" },
    ],
  },
  {
    title: "Reaktualisasi Implementasi Nilai-nilai Pancasila",
    subMaterialCount: 5,
    jp: 2,
    items: [
      {
        text: "Konsep, Prinsip, dan Nilai dalam Pancasila",
        status: "Selesai",
        type: "Video",
        url: "https://youtu.be/6txkQIoVUGQ?si=1T_g9Ur14PrIe0GQ",
      },
      {
        text: "Konsep, Prinsip, dan Nilai dalam Pancasila (Power Point)",
        status: "Selesai",
        type: "Power Point",
        url: "https://docs.google.com/presentation/d/1neoMHV7e9kjAjo2xzFOKBL56vau-b5MD/preview",
      },
      {
        text: "Fungsi Pancasila dan Perwujudannya",
        status: "Selesai",
        type: "Video",
        url: "https://youtu.be/eZMuLqbzQBI?si=wnkJU7AM9eSyKg5H",
      },
      {
        text: "Fungsi Pancasila dan Perwujudannya (Power Point)",
        status: "Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_file_id_2/view",
      },
      {
        text: "Tantangan Implementasi Pancasila di Era Digital",
        status: "Selesai",
        type: "Video",
        url: "https://youtu.be/s4E-VJ61YvI?si=FJw7ndG268r4g7uP",
      },
      {
        text: "Tantangan Implementasi Pancasila di Era Digital (Power Point)",
        status: "Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_file_id_3/view",
      },
      {
        text: "Bentuk-Bentuk Penerapan Pancasila",
        status: "Selesai",
        type: "Video",
        url: "https://youtu.be/GzMRizAUflI",
      },
      {
        text: "Bentuk-Bentuk Penerapan Pancasila (Power Point)",
        status: "Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_file_id_4/view",
      },
      {
        text: "Review Reaktualisasi Implementasi Nilai-nilai Pancasila",
        status: "Selesai",
        icon: "search-outline",
      },
    ],
  },
  {
    title: "Sistem Penyelenggaraan Negara menurut UUD NRI Tahun 1945",
    subMaterialCount: 6,
    jp: 2,
    items: [
      {
        text: "Pokok-Pokok Pikiran Pembukaan UUD NRI Tahun 1945",
        status: "Selesai",
        type: "Video",
        url: "https://youtu.be/PngS9tQIVxI",
      },
      {
        text: "Pokok-Pokok Pikiran Pembukaan UUD NRI Tahun 1945 (Power Point)",
        status: "Selesai",
        type: "Power Point",
      },
      {
        text: "Dasar-dasar Penyelenggaran Negara",
        status: "Selesai",
        type: "Video",
        url: "https://youtu.be/0zmHTktFNb0",
      },
      {
        text: "Dasar-dasar Penyelenggaran Negara (Power Point)",
        status: "Selesai",
        type: "Power Point",
      },
      {
        text: "Sistem Pemerintahan",
        status: "Selesai",
        type: "Video",
        url: "https://youtu.be/zGmL55bW8K0",
      },
      {
        text: "Sistem Pemerintahan (Power Point)",
        status: "Selesai",
        type: "Power Point",
      },
      {
        text: "Lembaga-Lembaga Negara dan Hubungan antar Lembaga",
        status: "Selesai",
        type: "Video",
        url: "https://youtu.be/tYc1a3eAwAY",
      },
      {
        text: "Lembaga-Lembaga Negara (Power Point)",
        status: "Selesai",
        type: "Power Point",
      },
      { text: "Otonomi Daerah (Video)", status: "Selesai", type: "Video" },
      {
        text: "Otonomi Daerah (Power Point)",
        status: "Selesai",
        type: "Power Point",
      },
      {
        text: "Review Sistem Penyelenggaraan Negara",
        status: "Selesai",
        icon: "search-outline",
      },
    ],
  },
  {
    title: "Konstitusi dan Konstitusionalisme Indonesia",
    subMaterialCount: 7,
    jp: 2,
    items: [
      {
        text: "Pengertian Konstitusi dan Konstitusialisme (Power Point)",
        status: "Selesai",
        type: "Power Point",
      },
      {
        text: "Pengertian Konstitusi dan Konstitusialisme (Video)",
        status: "Selesai",
        type: "Video",
      },
      {
        text: "Supremasi Konstitusi (Power Point)",
        status: "Selesai",
        type: "Power Point",
      },
      {
        text: "Supremasi Konstitusi (Video)",
        status: "Selesai",
        type: "Video",
      },
      {
        text: "Konstitusi di Era Digital (Power Point)",
        status: "Selesai",
        type: "Power Point",
      },
      {
        text: "Review Konstitusi dan Konstitusionalisme",
        status: "Selesai",
        icon: "search-outline",
      },
    ],
  },
  {
    title: "Jaminan Hak Konstitusional Warga Negara dalam UUD NRI 1945",
    subMaterialCount: 6,
    jp: 2,
    items: [
      {
        text: "Konsep dan Prinsip-Prinsip HAM",
        status: "Selesai",
        type: "Video",
        url: "https://youtu.be/zGmL55bW8K0",
      },
      {
        text: "Konsep dan Prinsip-Prinsip HAM",
        status: "Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_2/view",
      },
      {
        text: "Perkembangan HAM dan sebagai Tata Nilai Pergaulan Masyarakat Internasional",
        status: "Selesai",
        type: "Video",
        url: "https://youtu.be/zGmL55bW8K0",
      },
      {
        text: "Perkembangan HAM dan sebagai Tata Nilai Pergaulan Masyarakat Internasional",
        status: "Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_2/view",
      },
      {
        text: "Jaminan Hak Konstitusional Warga Negara dalam UUD NRI Tahun 1945",
        status: "Selesai",
        type: "Video",
        url: "https://youtu.be/zGmL55bW8K0",
      },
      {
        text: "Jaminan Hak Konstitusional Warga Negara dalam UUD NRI Tahun 1945",
        status: "Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_2/view",
      },
      {
        text: "Kewajiban dan Tanggung Jawab Negara terhadap HAM",
        status: "Selesai",
        type: "Video",
        url: "https://youtu.be/zGmL55bW8K0",
      },
      {
        text: "Kewajiban dan Tanggung Jawab Negara terhadap HAM",
        status: "Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_2/view",
      },
      {
        text: "Terminologi dan Klasifikasi Pelanggaran HAM",
        status: "Selesai",
        type: "Video",
        url: "https://youtu.be/zGmL55bW8K0",
      },
      {
        text: "Terminologi dan Klasifikasi Pelanggaran HAM",
        status: "Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_2/view",
      },
      {
        text: "Review Konstitusi dan Konstitusionalisme Indonesia",
        status: "Selesai",
        icon: "search-outline",
      },
    ],
  },
  {
    title: "Mahkamah Konstitusi dan Hukum Acara Pengujian UU",
    subMaterialCount: 6,
    jp: 2,
    items: [
      {
        text: "Mahkamah Konstitusi",
        status: "Selesai",
        type: "Video",
        url: "https://youtu.be/zGmL55bW8K0",
      },
      {
        text: "Mahkamah Konstitusi",
        status: "Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_2/view",
      },
      {
        text: "Sistem Pengujian Peraturan Perundang-Undangan Indonesia dan Ruang lingkup pengertian undang-undang yang diuji",
        status: "Selesai",
        type: "Video",
        url: "https://youtu.be/zGmL55bW8K0",
      },
      {
        text: "Sistem Pengujian Peraturan Perundang-Undangan Indonesia dan Ruang lingkup pengertian undang-undang yang diuji",
        status: "Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_2/view",
      },
      {
        text: "Ruang lingkup pengertian undang-undang yang diuji",
        status: "Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_2/view",
      },
      {
        text: "Pengujian Formil dan Materiil ",
        status: "Selesai",
        type: "Video",
        url: "https://youtu.be/zGmL55bW8K0",
      },
      {
        text: "Pengujian Formil dan Materiil ",
        status: "Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_2/view",
      },
      {
        text: "Aspek umum dan khusus Hukum acara MK serta Tata cara sidang dan Tata tertib Persidangan",
        status: "Selesai",
        type: "Video",
        url: "https://youtu.be/zGmL55bW8K0",
      },
      {
        text: "Aspek umum dan khusus Hukum acara MK",
        status: "Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_2/view",
      },
      {
        text: "Putusan",
        status: "Selesai",
        type: "Video",
        url: "https://youtu.be/zGmL55bW8K0",
      },
      {
        text: "Putusan",
        status: "Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_2/view",
      },
      {
        text: "Proses Pengambilan Putusan",
        status: "Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_2/view",
      },
      {
        text: "Kekuatan Hukum Putusan",
        status: "Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_2/view",
      },
      {
        text: "Review Mahkamah Konstitusi dan Hukum Acara Pengujian Undang-Undang terhadap Undang-Undang Dasar NRI Tahun 1945",
        status: "Selesai",
        icon: "search-outline",
      },
    ],
  },
  {
    title: "Sistem Informasi Perkara Elektronik",
    subMaterialCount: 1,
    jp: 1,
    items: [
      {
        text: "Sistem Informasi Penanganan Perkara (PPT)",
        status: "Selesai",
        type: "Power Point",
      },
    ],
  },
  {
    title: "Teknik Penyusunan Permohonan Pengujian UU",
    subMaterialCount: 1,
    jp: 1,
    items: [
      {
        text: "Teknik Penyusunan Permohonan (PPT)",
        status: "Selesai",
        type: "Power Point",
      },
    ],
  },
  {
    title: "Praktik Penyusunan Permohonan Pengujian UU",
    subMaterialCount: 2,
    jp: 2,
    items: [
      { text: "Praktik Penyusunan (Video)", status: "Selesai", type: "Video" },
      {
        text: "Soal Praktik (Power Point)",
        status: "Selesai",
        type: "Power Point",
      },
      {
        text: "Review Praktik Penyusunan",
        status: "Selesai",
        icon: "search-outline",
      },
    ],
  },
  {
    title: "Post Test",
    isTest: true,
    items: [
      { text: "Post Test", status: "Belum Selesai", icon: "create-outline" },
    ],
  },
];
const getYoutubeId = (url: any) => {
  // --- PAGAR PENGAMAN: Jika url kosong atau bukan tulisan, langsung stop ---
  if (!url || typeof url !== "string") {
    return null;
  }

  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?\s*v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};
const handleDownload = async (url: string, title: string) => {
  try {
    // Ubah link preview Drive jadi link download PDF agar bisa disimpan langsung
    const downloadUrl = url.replace("/preview", "/export?format=pdf");
    const fileUri =
      FileSystem.documentDirectory + title.replace(/\s+/g, "_") + ".pdf";

    alert("Mengunduh materi...");
    const result = await FileSystem.downloadAsync(downloadUrl, fileUri);

    if (result.status === 200) {
      await Sharing.shareAsync(result.uri); // Munculkan pilihan simpan ke file
    } else {
      alert("Gagal mengunduh file.");
    }
  } catch (error) {
    console.error(error);
    alert("Terjadi kesalahan saat mengunduh.");
  }
};

// --- KOMPONEN BANTUAN ---

function CourseStat({
  count,
  label,
  icon,
}: {
  count: number;
  label: string;
  icon: any;
}) {
  return (
    <View style={statStyles.statItem}>
      <View style={statStyles.iconCircle}>
        <Ionicons name={icon} size={18} color={MK_THEME.maroon} />
      </View>
      <Text style={statStyles.statCount}>{count}</Text>
      <Text style={statStyles.statLabel}>{label}</Text>
    </View>
  );
}

function SilabusItem({
  text,
  status,
  icon,
  type,
  isTest,
  url,
  onStartTest,
}: any) {
  const isCompleted = status === "Selesai";
  const displayIcon =
    icon ||
    (type === "Video"
      ? "play-circle"
      : type === "Power Point"
        ? "document-text"
        : "reader");
  const isTestActive = isTest && !isCompleted;
  const isClickable = isTestActive || !!url;

  const handlePress = () => {
    if (isTestActive) onStartTest("/screens/modul/pretest_pphkwn");
    else if (url) onStartTest(url, text);
  };

  return (
    <TouchableOpacity
      style={[
        silabusStyles.itemContainer,
        isClickable && silabusStyles.itemActive,
      ]}
      disabled={!isClickable}
      onPress={handlePress}
    >
      <Ionicons
        name={displayIcon}
        size={18}
        color={
          isCompleted
            ? MK_THEME.success
            : isClickable
              ? MK_THEME.maroon
              : MK_THEME.textSub
        }
      />
      <Text
        style={[
          silabusStyles.itemText,
          isCompleted && !isClickable && silabusStyles.itemTextCompleted,
          isClickable && { fontWeight: "600", color: MK_THEME.maroon },
        ]}
      >
        {text}{" "}
        {type && (
          <Text style={{ fontSize: 10, color: MK_THEME.gold }}> ({type})</Text>
        )}
      </Text>

      {isTestActive ? (
        <View style={silabusStyles.testButton}>
          <Text style={silabusStyles.testButtonText}>MULAI</Text>
        </View>
      ) : (
        isCompleted && (
          <Ionicons
            name="checkmark-circle"
            size={18}
            color={MK_THEME.success}
          />
        )
      )}
    </TouchableOpacity>
  );
}

function SilabusModule({
  index,
  title,
  subMaterialCount,
  jp,
  items,
  isTest,
  onStartTest,
}: any) {
  const [isExpanded, setIsExpanded] = useState(index <= 2);
  const completedItems = items.filter(
    (item: any) => item.status === "Selesai",
  ).length;
  const isModuleCompleted = completedItems === items.length;

  return (
    <View style={silabusStyles.moduleContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          silabusStyles.moduleHeader,
          isModuleCompleted && silabusStyles.moduleHeaderCompleted,
        ]}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View style={silabusStyles.headerLeft}>
          <Text
            style={[
              silabusStyles.headerTitle,
              isModuleCompleted && { color: "#fff" },
            ]}
          >
            {index}. {title}
          </Text>
          {subMaterialCount ? (
            <Text
              style={[
                silabusStyles.headerDetails,
                isModuleCompleted && { color: "#EEE" },
              ]}
            >
              {subMaterialCount} Materi • {jp} JP
            </Text>
          ) : null}
        </View>
        <Ionicons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={18}
          color={isModuleCompleted ? "#fff" : MK_THEME.maroon}
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={silabusStyles.moduleContent}>
          {items.map((item: any, i: number) => (
            <SilabusItem
              key={i}
              {...item}
              isTest={isTest}
              onStartTest={onStartTest}
            />
          ))}
        </View>
      )}
    </View>
  );
}

export default function PPHKWN1() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }, []);
  const [activeUrl, setActiveUrl] = useState<string | null>(null); // Tambahkan state baru
  const [modalType, setModalType] = useState<"Video" | "PPT" | null>(null); // State tipe modal
  const handleItemPress = (pathOrUrl: string, materialTitle?: string) => {
    if (!pathOrUrl) return;

    if (pathOrUrl.startsWith("http")) {
      const vidId = getYoutubeId(pathOrUrl);

      if (vidId) {
        setActiveVideoId(vidId);
        setModalType("Video");
        setModalVisible(true);
      } else if (
        pathOrUrl.includes("drive.google.com") ||
        pathOrUrl.includes("docs.google.com")
      ) {
        setActiveUrl(pathOrUrl); // Simpan URL PPT
        setModalType("PPT");
        setModalVisible(true);
      } else {
        Linking.openURL(pathOrUrl).catch((err) => console.error(err));
      }
    } else {
      router.push(pathOrUrl as any);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* STICKY CUSTOM HEADER */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          onPress={() => router.push("/screens/modul/pphkwn")}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back-outline" size={28} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerLabel}>Pendidikan & Pelatihan</Text>
          <Text style={styles.headerTitleSmall}>PPHKWN MK</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[MK_THEME.maroon]}
          />
        }
      >
        {/* HERO SECTION */}
        <View style={styles.heroSection}>
          <Text style={styles.mainTitle}>{courseData.title}</Text>
          <View style={styles.infoRow}>
            <View style={styles.tag}>
              <Ionicons name="business" size={12} color={MK_THEME.gold} />
              <Text style={styles.tagText}>{courseData.organizer}</Text>
            </View>
            <View style={[styles.tag, { backgroundColor: "#F0F0F0" }]}>
              <Ionicons name="calendar" size={12} color={MK_THEME.maroon} />
              <Text style={[styles.tagText, { color: "#555" }]}>
                {courseData.schedule}
              </Text>
            </View>
          </View>
        </View>

        {/* STATS */}
        <View style={styles.statsRow}>
          {courseData.stats.map((stat, index) => (
            <CourseStat key={index} {...stat} />
          ))}
        </View>

        {/* SYLLABUS LIST */}
        <View style={styles.sectionHeader}>
          <View style={styles.indicator} />
          <Text style={styles.sectionTitleText}>Silabus Pembelajaran</Text>
        </View>

        <View style={styles.syllabusList}>
          {syllabusData.map((module, index) => (
            <SilabusModule
              key={index}
              index={index + 1}
              {...module}
              onStartTest={handleItemPress}
            />
          ))}
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={videoStyles.overlay}>
          <View
            style={[
              videoStyles.container,
              modalType === "PPT" && { height: "80%" },
            ]}
          >
            <View style={videoStyles.header}>
              <Text style={videoStyles.title} numberOfLines={1}>
                {modalType === "Video" ? "Materi Video" : "Materi PPT"}
              </Text>

              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
              >
                {/* TOMBOL DOWNLOAD (Hanya muncul jika PPT) */}
                {modalType === "PPT" && (
                  <TouchableOpacity
                    onPress={() => Linking.openURL(activeUrl || "")}
                  >
                    <Ionicons name="download-outline" size={24} color="white" />
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    setActiveVideoId(null);
                    setActiveUrl(null);
                  }}
                >
                  <Ionicons name="close-circle" size={32} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            {modalType === "Video" ? (
              <YoutubePlayer
                height={Dimensions.get("window").width * 0.56}
                play={true}
                videoId={activeVideoId || ""}
              />
            ) : (
              /* TAMPILAN PPT DI DALAM MODAL */
              <View style={{ flex: 1, backgroundColor: "white" }}>
                <WebView
                  source={{ uri: activeUrl || "" }}
                  style={{ flex: 1 }}
                  scalesPageToFit={true}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const statStyles = StyleSheet.create({
  statItem: {
    flex: 1,
    backgroundColor: MK_THEME.white,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: MK_THEME.goldLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  statCount: { fontSize: 15, fontWeight: "800", color: MK_THEME.maroon },
  statLabel: {
    fontSize: 9,
    color: MK_THEME.textSub,
    textTransform: "uppercase",
    fontWeight: "600",
  },
});

const silabusStyles = StyleSheet.create({
  moduleContainer: {
    marginBottom: 10,
    backgroundColor: MK_THEME.white,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: MK_THEME.border,
  },
  moduleHeader: {
    flexDirection: "row",
    padding: 14,
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  moduleHeaderCompleted: { backgroundColor: MK_THEME.success },
  headerLeft: { flex: 1, paddingRight: 8 },
  headerTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: MK_THEME.textMain,
    lineHeight: 18,
  },
  headerDetails: { fontSize: 11, color: MK_THEME.textSub, marginTop: 4 },
  moduleContent: { padding: 8 },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    marginVertical: 2,
  },
  itemActive: { backgroundColor: "#F8F8F8" },
  itemText: {
    flex: 1,
    fontSize: 12,
    color: MK_THEME.textMain,
    marginLeft: 10,
    lineHeight: 16,
  },
  itemTextCompleted: {
    color: MK_THEME.textSub,
    textDecorationLine: "line-through",
  },
  testButton: {
    backgroundColor: MK_THEME.gold,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  testButtonText: { color: "#fff", fontWeight: "800", fontSize: 10 },
});

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: MK_THEME.bg },
  topHeader: {
    flexDirection: "row",
    height: 56,
    backgroundColor: MK_THEME.white,
    alignItems: "center",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: MK_THEME.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerInfo: { flex: 1, alignItems: "center" },
  headerLabel: {
    fontSize: 10,
    color: MK_THEME.gold,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  headerTitleSmall: { fontSize: 14, fontWeight: "800", color: MK_THEME.maroon },
  scrollContent: { padding: 16, paddingBottom: 40 },
  heroSection: {
    backgroundColor: MK_THEME.white,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderLeftWidth: 5,
    borderLeftColor: MK_THEME.maroon,
    elevation: 3,
  },
  mainTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: MK_THEME.maroon,
    lineHeight: 24,
    marginBottom: 12,
  },
  infoRow: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: MK_THEME.goldLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 11,
    fontWeight: "700",
    color: MK_THEME.gold,
    marginLeft: 4,
  },
  statsRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  indicator: {
    width: 4,
    height: 16,
    backgroundColor: MK_THEME.gold,
    borderRadius: 2,
    marginRight: 8,
  },
  sectionTitleText: { fontSize: 16, fontWeight: "800", color: MK_THEME.maroon },
  syllabusList: { gap: 2 },
});
const videoStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    padding: 15,
  },
  container: {
    backgroundColor: "#1A1A1A",
    borderRadius: 20,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: MK_THEME.maroon,
  },
  title: { color: "white", fontWeight: "800", fontSize: 14, flex: 1 },
});
