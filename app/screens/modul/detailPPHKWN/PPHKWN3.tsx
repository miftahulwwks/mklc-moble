import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Linking,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

const { width } = Dimensions.get("window");

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

// --- SEMUA DATA ASLI DIPERTAHANKAN ---
const courseData = {
  title:
    "Peningkatan Pemahaman Hak Konstitusional Warga Negara bagi Pegawai Pemerintah dengan Perjanjian Kerja (PPPK) Mahkamah Konstitusi",
  stats: [
    { count: 18, label: "Materi", icon: "folder-open" },
    { count: 14, label: "Jam Pelajaran", icon: "time" },
    { count: 500, label: "Peserta", icon: "people" },
  ],
  schedule: "04 Desember 2025 - 12 Desember 2025",
  organizer: "Pusdik MK",
};

const syllabusData = [
  {
    title: "Pre Test",
    isTest: true,
    items: [
      {
        text: "Pre Test",
        status: "Belum Selesai",
        icon: "create-outline",
        url: "/screens/modul/pretest_pphkwn",
      },
    ],
  },
  {
    title: "Reaktualisasi Implementasi Nilai-nilai Pancasila",
    subMaterialCount: 5,
    jp: 2,
    items: [
      {
        text: "2.1 Konsep, Prinsip, dan Nilai dalam Pancasila",
        status: "Selesai",
        type: "Video",
        url: "https://youtu.be/6txkQIoVUGQ",
      },
      {
        text: "2.1 Konsep, Prinsip, dan Nilai dalam Pancasila",
        status: "Selesai",
        type: "Power Point",
        url: "https://docs.google.com/presentation/d/1neoMHV7e9kjAjo2xzFOKBL56vau-b5MD/edit",
      },
      {
        text: "2.2 Fungsi Pancasila dan Perwujudannya",
        status: "Selesai",
        type: "Video",
        url: "https://youtu.be/eZMuLqbzQBI",
      },
      {
        text: "2.2 Fungsi Pancasila dan Perwujudannya",
        status: "Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_1/view",
      },
      {
        text: "2.3 Tantangan Implementasi Pancasila di Era Digital",
        status: "Selesai",
        type: "Video",
        url: "https://youtu.be/eZMuLqbzQBI",
      },
      {
        text: "2.3 Tantangan Implementasi Pancasila di Era Digital",
        status: "Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_1/view",
      },
      {
        text: "2.4 Bentuk-Bentuk Penerapan Pancasila",
        status: "Selesai",
        type: "Video",
        url: "https://youtu.be/eZMuLqbzQBI",
      },
      {
        text: "2.4 Bentuk-Bentuk Penerapan Pancasila",
        status: "Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_1/view",
      },
      {
        text: "2.5 Review Reaktualisasi Implementasi Nilai-nilai Pancasila",
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
        text: "Pokok-Pokok Pikiran Pembukaan UUD NRI Tahun 1945",
        status: "Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_1/view",
      },
      {
        text: "Dasar-dasar Penyelenggaran Negara",
        status: "Selesai",
        type: "Video",
        url: "https://youtu.be/0zmHTktFNb0",
      },
      {
        text: "Dasar-dasar Penyelenggaran Negara",
        status: "Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_1/view",
      },
      {
        text: "Siatem Pemerintahan",
        status: "Selesai",
        type: "Video",
        url: "https://youtu.be/0zmHTktFNb0",
      },
      {
        text: "Sistem Pemerintahan",
        status: "Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_1/view",
      },
      {
        text: "Lembaga-lembaga Negara dan Hubungan Antar Lembaga Negara",
        status: "Selesai",
        type: "Video",
        url: "https://youtu.be/0zmHTktFNb0",
      },
      {
        text: "Lembaga-lembaga Negara dan Hubungan Antar Lembaga Negara",
        status: "Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_1/view",
      },
      {
        text: "Otonomi Daerah",
        status: "Selesai",
        type: "Video",
        url: "https://youtu.be/0zmHTktFNb0",
      },
      {
        text: "Otonomi Daerah",
        status: "Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_1/view",
      },
      {
        text: "Review Sistem Penyelenggaraan Negara menurut UUD NRI Tahun 1945",
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
        text: "Pengertian Konstitusi dan Konstitusialisme, serta Hubungan Konstitusi dan Konstitusionalisme",
        type: "Video",
        url: "https://youtu.be/zGmL55bW8K0",
      },
      {
        text: "Pengertian Konstitusi dan Konstitusialisme, serta Hubungan Konstitusi dan Konstitusionalisme",
        status: "Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_1/view",
      },
      {
        text: "Supremasi Konstitusi dalam Negara Demokrasi Konstitusional ",
        type: "Video",
        url: "https://youtu.be/zGmL55bW8K0",
      },
      {
        text: "Supremasi Konstitusi dalam Negara Demokrasi Konstitusional",
        status: "Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_1/view",
      },
      {
        text: "Konstitusi dan Peraturan Perundang-Undangan di Bawah Konstitusi ",
        status: "Selesai",
        type: "Video",
        url: "https://youtu.be/zGmL55bW8K0",
      },
      {
        text: "Konstitusi dan Peraturan Perundang-Undangan di Bawah Konstitusi",
        status: "Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_1/view",
      },
      {
        text: "Living Constitution",
        status: "Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_1/view",
      },
      {
        text: "Perubahan Konstitusi",
        status: "Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_1/view",
      },
      {
        text: "Perubahan Konstitusi dan Living Constitution",
        status: "Selesai",
        type: "Video",
        url: "https://youtu.be/zGmL55bW8K0",
      },
      {
        text: "Konstitusi di Era Digital",
        status: "Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_1/view",
      },
      {
        text: "Review Konstitusi dan Konstitusionalisme Indonesia",
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
    title:
      "Mahkamah Konstitusi dan Hukum Acara Pengujian Undang-Undang terhadap Undang-Undang Dasar NRI Tahun 1945",
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
        text: "Pemanfaatan Teknologi, Informasi, dan Komunikasi di Mahkamah Konstitusi",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_3/view",
      },
    ],
  },
  {
    title: "Teknik Penyusunan Permohonan Pengujian Undang-Undang",
    subMaterialCount: 1,
    jp: 1,
    items: [
      {
        text: "Teknik Permohonan Pengujian Undang-Undang",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_4/view",
      },
    ],
  },
  {
    title: "Praktik Penyusunan Permohonan Pengujian Undang-Undang",
    subMaterialCount: 2,
    jp: 2,
    items: [
      {
        text: "Praktik Penyusunan Permohonan Pengujian Undang-Undang",
        type: "Video",
        url: "https://youtu.be/s4E-VJ61YvI",
      },
      {
        text: "Soal Praktik Penyusunan Permohonan Pengujian Undang-Undang",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_4/view",
      },
      {
        text: "Review Praktik Penyusunan Permohonan Pengujian Undang-Undang",
        status: "Selesai",
        icon: "search-outline",
      },
    ],
  },
  {
    title: "Post Test",
    isTest: true,
    items: [
      {
        text: "Post Test",
        status: "Belum Selesai",
        icon: "create-outline",
        url: "/screens/modul/posttest_pphkwn",
      },
    ],
  },
];

// --- KOMPONEN STATISTIK ---
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

// --- KOMPONEN ITEM SILABUS ---
function SilabusItem({
  text,
  status,
  icon,
  type,
  url,
  activeId,
  itemId,
  onToggle,
  isTest,
}: any) {
  const router = useRouter();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isActive = activeId === itemId;
  const isWebMaterial =
    !!url && (type === "Video" || type === "Power Point" || !isTest);

  let finalUrl = url;
  let downloadUrl = url;
  if (url?.includes("drive.google.com") || url?.includes("docs.google.com")) {
    const fileId =
      url.match(/\/d\/([^/]+)/)?.[1] || url.match(/id=([^&]+)/)?.[1];
    finalUrl = fileId
      ? `https://drive.google.com/file/d/${fileId}/preview`
      : url;
    downloadUrl = fileId
      ? `https://drive.google.com/uc?export=download&id=${fileId}`
      : url;
  } else if (url?.includes("youtu.be") || url?.includes("youtube.com")) {
    const videoId = url.includes("youtu.be")
      ? url.split("/").pop()?.split("?")[0]
      : url.split("v=")[1]?.split("&")[0];
    finalUrl = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&controls=1`;
  }

  const renderWebView = () => (
    <WebView
      source={{ uri: finalUrl }}
      style={{ flex: 1, backgroundColor: "#000" }}
      scalesPageToFit={true}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      allowsInlineMediaPlayback={true}
      allowsFullscreenVideo={true}
    />
  );

  return (
    <View style={silabusStyles.itemWrapper}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          silabusStyles.itemContainer,
          isActive && silabusStyles.itemActive,
        ]}
        onPress={() => {
          if (isTest && url) {
            router.push(url);
            return;
          }
          onToggle(itemId, url, isWebMaterial);
        }}
      >
        <Ionicons
          name={icon || (type === "Video" ? "play-circle" : "document-text")}
          size={18}
          color={
            isActive
              ? MK_THEME.maroon
              : status === "Selesai"
                ? MK_THEME.success
                : MK_THEME.textSub
          }
        />
        <Text
          style={[
            silabusStyles.itemText,
            isActive && { fontWeight: "700", color: MK_THEME.maroon },
          ]}
        >
          {text}{" "}
          {type && (
            <Text style={{ fontSize: 10, color: MK_THEME.gold }}>
              {" "}
              ({type})
            </Text>
          )}
        </Text>
        {isWebMaterial && (
          <Ionicons
            name={isActive ? "chevron-up" : "chevron-down"}
            size={18}
            color={MK_THEME.maroon}
          />
        )}
      </TouchableOpacity>

      {isActive && isWebMaterial && (
        <View style={silabusStyles.dropdownContent}>
          <View
            style={[
              silabusStyles.webviewContainer,
              type === "Power Point"
                ? { aspectRatio: 1 / 1 }
                : { aspectRatio: 16 / 9 },
            ]}
          >
            {renderWebView()}
            <View style={silabusStyles.overlayControls}>
              <TouchableOpacity
                style={silabusStyles.iconBtn}
                onPress={() => setIsFullscreen(true)}
              >
                <Ionicons name="expand" size={14} color="#FFF" />
                <Text style={silabusStyles.iconBtnText}>Perbesar & Zoom</Text>
              </TouchableOpacity>
              {type === "Power Point" && (
                <TouchableOpacity
                  style={silabusStyles.iconBtn}
                  onPress={() => Linking.openURL(downloadUrl)}
                >
                  <Ionicons name="download" size={14} color="#FFF" />
                  <Text style={silabusStyles.iconBtnText}>Unduh</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      )}

      <Modal visible={isFullscreen} animationType="slide">
        <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
          <View style={silabusStyles.modalHeader}>
            <TouchableOpacity
              onPress={() => setIsFullscreen(false)}
              style={silabusStyles.modalBackBtn}
            >
              <Ionicons name="arrow-back" size={24} color="#FFF" />
              <Text style={silabusStyles.modalTitle}>Kembali ke Materi</Text>
            </TouchableOpacity>
            {type === "Power Point" && (
              <TouchableOpacity onPress={() => Linking.openURL(downloadUrl)}>
                <Ionicons name="download-outline" size={24} color="#FFF" />
              </TouchableOpacity>
            )}
          </View>
          {renderWebView()}
          <View style={silabusStyles.zoomToast}>
            <Text style={silabusStyles.zoomToastText}>
              Gunakan 2 jari untuk Zoom In/Out
            </Text>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

// --- KOMPONEN MODUL ---
function SilabusModule({
  index,
  title,
  subMaterialCount,
  jp,
  items,
  isTest,
  activeId,
  onToggle,
}: any) {
  const [isExpanded, setIsExpanded] = useState(index === 2);
  return (
    <View style={silabusStyles.moduleContainer}>
      <TouchableOpacity
        style={silabusStyles.moduleHeader}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View style={silabusStyles.headerLeft}>
          <Text style={silabusStyles.headerTitle}>
            {index}. {title}
          </Text>
          {subMaterialCount && (
            <Text style={silabusStyles.headerDetails}>
              {subMaterialCount} Materi • {jp} JP
            </Text>
          )}
        </View>
        <Ionicons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={18}
          color={MK_THEME.maroon}
        />
      </TouchableOpacity>
      {isExpanded && (
        <View style={silabusStyles.moduleContent}>
          {items.map((item: any, i: number) => (
            <SilabusItem
              key={i}
              itemId={`${index}-${i}`}
              activeId={activeId}
              onToggle={onToggle}
              isTest={isTest}
              {...item}
            />
          ))}
        </View>
      )}
    </View>
  );
}

// --- LAYAR UTAMA ---
export default function PPHKWN_LMS_FULL() {
  const router = useRouter();
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
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
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <Text style={styles.mainTitle}>{courseData.title}</Text>
          <View style={styles.infoRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{courseData.organizer}</Text>
            </View>
            <View style={[styles.tag, { backgroundColor: "#F0F0F0" }]}>
              <Text style={[styles.tagText, { color: "#555" }]}>
                {courseData.schedule}
              </Text>
            </View>
          </View>
        </View>

        {/* STATISTIK YANG SEMPAT HILANG */}
        <View style={styles.statsRow}>
          {courseData.stats.map((stat, index) => (
            <CourseStat key={index} {...stat} />
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <View style={styles.indicator} />
          <Text style={styles.sectionTitleText}>Silabus Pembelajaran</Text>
        </View>

        <View style={styles.syllabusList}>
          {syllabusData.map((module, index) => (
            <SilabusModule
              key={index}
              index={index + 1}
              activeId={activeId}
              onToggle={(id: any) => setActiveId(activeId === id ? null : id)}
              {...module}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- SEMUA STYLE SHEET VERTIKAL & LENGKAP ---
const statStyles = StyleSheet.create({
  statItem: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
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
  statCount: {
    fontSize: 15,
    fontWeight: "800",
    color: MK_THEME.maroon,
  },
  statLabel: {
    fontSize: 9,
    color: MK_THEME.textSub,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});

const silabusStyles = StyleSheet.create({
  moduleContainer: {
    marginBottom: 12,
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: MK_THEME.border,
    overflow: "hidden",
  },
  moduleHeader: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    backgroundColor: "  #FAFAFA",
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
  },
  headerDetails: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  moduleContent: {
    padding: 8,
  },
  itemWrapper: {
    marginBottom: 4,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
  },
  itemActive: {
    backgroundColor: MK_THEME.goldLight,
  },
  itemText: {
    flex: 1,
    fontSize: 13,
    marginLeft: 10,
    color: "#333",
  },
  dropdownContent: {
    marginTop: 4,
    borderRadius: 12,
    backgroundColor: "#000",
    overflow: "hidden",
  },
  webviewContainer: {
    width: "100%",
  },
  overlayControls: {
    position: "absolute",
    bottom: 10,
    right: 10,
    flexDirection: "row",
    gap: 8,
  },
  iconBtn: {
    backgroundColor: "rgba(0,0,0,0.8)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  iconBtnText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "700",
    marginLeft: 4,
  },
  modalHeader: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: "#1A1A1A",
  },
  modalBackBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalTitle: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 10,
  },
  zoomToast: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  zoomToastText: {
    color: "#FFF",
    fontSize: 11,
  },
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: MK_THEME.bg,
  },
  topHeader: {
    flexDirection: "row",
    height: 56,
    backgroundColor: "#FFF",
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
  headerInfo: {
    flex: 1,
    alignItems: "center",
  },
  headerLabel: {
    fontSize: 10,
    color: MK_THEME.gold,
    fontWeight: "700",
  },
  headerTitleSmall: {
    fontSize: 14,
    fontWeight: "800",
    color: MK_THEME.maroon,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  heroSection: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderLeftWidth: 5,
    borderLeftColor: MK_THEME.maroon,
    elevation: 3,
  },
  mainTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: MK_THEME.maroon,
    lineHeight: 22,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    gap: 8,
  },
  tag: {
    backgroundColor: MK_THEME.goldLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 11,
    color: MK_THEME.gold,
    fontWeight: "700",
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
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
  sectionTitleText: {
    fontSize: 16,
    fontWeight: "800",
    color: MK_THEME.maroon,
  },
  syllabusList: {
    gap: 2,
  },
});
