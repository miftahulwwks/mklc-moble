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
        text: "Konsep, Prinsip, dan Nilai dalam Pancasila",
        status: " Belum Selesai",
        type: "Video",
        url: "https://youtu.be/6txkQIoVUGQ?si=1T_g9Ur14PrIe0GQ",
      },
      {
        text: "Konsep, Prinsip, dan Nilai dalam Pancasila (Power Point)",
        status: "Belum Selesai",
        type: "Power Point",
        url: "https://docs.google.com/presentation/d/1c9bpHMmZSSBY7z_gTgca0xa8FYGEWQZ71xDnKYxeAEI/preview",
      },
      {
        text: "Fungsi Pancasila dan Perwujudannya",
        status: "Belum Selesai",
        type: "Video",
        url: "https://youtu.be/eZMuLqbzQBI?si=wnkJU7AM9eSyKg5H",
      },
      {
        text: "Fungsi Pancasila dan Perwujudannya (Power Point)",
        status: "Belum Selesai",
        type: "Power Point",
        url: "https://docs.google.com/presentation/d/1wAZ2f8VwXgPD8edyBL60lm4I29HqUP-VFCqFUVcBYwA/preview",
      },
      {
        text: "Tantangan Implementasi Pancasila di Era Digital",
        status: "Belum Selesai",
        type: "Video",
        url: "https://youtu.be/s4E-VJ61YvI?si=FJw7ndG268r4g7uP",
      },
      {
        text: "Tantangan Implementasi Pancasila di Era Digital (Power Point)",
        status: "Belum Selesai",
        type: "Power Point",
        url: "https://docs.google.com/presentation/d/15wSKuFC8K-7ZpaVqvDoJbfD0jICD5pWcvErkq2bN5Sw/preview",
      },
      {
        text: "Bentuk-Bentuk Penerapan Pancasila",
        status: "Belum Selesai",
        type: "Video",
        url: "https://youtu.be/GzMRizAUflI",
      },
      {
        text: "Bentuk-Bentuk Penerapan Pancasila (Power Point)",
        status: "Belum Selesai",
        type: "Power Point",
        url: "https://docs.google.com/presentation/d/19ylcL7Ezdot2ziSKCrg1IXlcLrBXGLtgAyj3-TjcZaQ/preview",
      },
      {
        text: "Review Reaktualisasi Implementasi Nilai-nilai Pancasila",
        status: "Belum Selesai",
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
        status: "Belum Selesai",
        type: "Video",
        url: "https://youtu.be/PngS9tQIVxI",
      },
      {
        text: "Pokok-Pokok Pikiran Pembukaan UUD NRI Tahun 1945 (Power Point)",
        status: "Belum Selesai",
        type: "Power Point",
      },
      {
        text: "Dasar-dasar Penyelenggaran Negara",
        status: "Belum Selesai",
        type: "Video",
        url: "https://youtu.be/0zmHTktFNb0",
      },
      {
        text: "Dasar-dasar Penyelenggaran Negara (Power Point)",
        status: "Belum Selesai",
        type: "Power Point",
      },
      {
        text: "Sistem Pemerintahan",
        status: "Belum Selesai",
        type: "Video",
        url: "https://youtu.be/zGmL55bW8K0",
      },
      {
        text: "Sistem Pemerintahan (Power Point)",
        status: "Belum Selesai",
        type: "Power Point",
      },
      {
        text: "Lembaga-Lembaga Negara dan Hubungan antar Lembaga",
        status: "Belum Selesai",
        type: "Video",
        url: "https://youtu.be/tYc1a3eAwAY",
      },
      {
        text: "Lembaga-Lembaga Negara (Power Point)",
        status: "Belum Selesai",
        type: "Power Point",
      },
      {
        text: "Otonomi Daerah (Video)",
        status: "Belum Selesai",
        type: "Video",
      },
      {
        text: "Otonomi Daerah (Power Point)",
        status: "Belum Selesai",
        type: "Power Point",
      },
      {
        text: "Review Sistem Penyelenggaraan Negara",
        status: "Belum Selesai",
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
        status: "Belum Selesai",
        type: "Power Point",
      },
      {
        text: "Pengertian Konstitusi dan Konstitusialisme (Video)",
        status: "Belum Selesai",
        type: "Video",
      },
      {
        text: "Supremasi Konstitusi (Power Point)",
        status: "Belum Selesai",
        type: "Power Point",
      },
      {
        text: "Supremasi Konstitusi (Video)",
        status: "Belum Selesai",
        type: "Video",
      },
      {
        text: "Konstitusi di Era Digital (Power Point)",
        status: "Belum Selesai",
        type: "Power Point",
      },
      {
        text: "Review Konstitusi dan Konstitusionalisme",
        status: "Belum Selesai",
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
        status: "Belum Selesai",
        type: "Video",
        url: "https://youtu.be/zGmL55bW8K0",
      },
      {
        text: "Konsep dan Prinsip-Prinsip HAM",
        status: "Belum Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_2/view",
      },
      {
        text: "Perkembangan HAM dan sebagai Tata Nilai Pergaulan Masyarakat Internasional",
        status: "Belum Selesai",
        type: "Video",
        url: "https://youtu.be/zGmL55bW8K0",
      },
      {
        text: "Perkembangan HAM dan sebagai Tata Nilai Pergaulan Masyarakat Internasional",
        status: "Belum Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_2/view",
      },
      {
        text: "Jaminan Hak Konstitusional Warga Negara dalam UUD NRI Tahun 1945",
        status: "Belum Selesai",
        type: "Video",
        url: "https://youtu.be/zGmL55bW8K0",
      },
      {
        text: "Jaminan Hak Konstitusional Warga Negara dalam UUD NRI Tahun 1945",
        status: "Belum Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_2/view",
      },
      {
        text: "Kewajiban dan Tanggung Jawab Negara terhadap HAM",
        status: "Belum Selesai",
        type: "Video",
        url: "https://youtu.be/zGmL55bW8K0",
      },
      {
        text: "Kewajiban dan Tanggung Jawab Negara terhadap HAM",
        status: "Belum Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_2/view",
      },
      {
        text: "Terminologi dan Klasifikasi Pelanggaran HAM",
        status: "Belum Selesai",
        type: "Video",
        url: "https://youtu.be/zGmL55bW8K0",
      },
      {
        text: "Terminologi dan Klasifikasi Pelanggaran HAM",
        status: "Belum Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_2/view",
      },
      {
        text: "Review Konstitusi dan Konstitusionalisme Indonesia",
        status: "Belum Selesai",
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
        status: "Belum Selesai",
        type: "Video",
        url: "https://youtu.be/zGmL55bW8K0",
      },
      {
        text: "Mahkamah Konstitusi",
        status: "Belum Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_2/view",
      },
      {
        text: "Sistem Pengujian Peraturan Perundang-Undangan Indonesia dan Ruang lingkup pengertian undang-undang yang diuji",
        status: "Belum Selesai",
        type: "Video",
        url: "https://youtu.be/zGmL55bW8K0",
      },
      {
        text: "Sistem Pengujian Peraturan Perundang-Undangan Indonesia dan Ruang lingkup pengertian undang-undang yang diuji",
        status: "Belum Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_2/view",
      },
      {
        text: "Ruang lingkup pengertian undang-undang yang diuji",
        status: "Belum Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_2/view",
      },
      {
        text: "Pengujian Formil dan Materiil ",
        status: "Belum Selesai",
        type: "Video",
        url: "https://youtu.be/zGmL55bW8K0",
      },
      {
        text: "Pengujian Formil dan Materiil ",
        status: "Belum Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_2/view",
      },
      {
        text: "Aspek umum dan khusus Hukum acara MK serta Tata cara sidang dan Tata tertib Persidangan",
        status: "Belum Selesai",
        type: "Video",
        url: "https://youtu.be/zGmL55bW8K0",
      },
      {
        text: "Aspek umum dan khusus Hukum acara MK",
        status: "Belum Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_2/view",
      },
      {
        text: "Putusan",
        status: "Belum Selesai",
        type: "Video",
        url: "https://youtu.be/zGmL55bW8K0",
      },
      {
        text: "Putusan",
        status: "Belum Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_2/view",
      },
      {
        text: "Proses Pengambilan Putusan",
        status: "Belum Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_2/view",
      },
      {
        text: "Kekuatan Hukum Putusan",
        status: "Belum Selesai",
        type: "Power Point",
        url: "https://drive.google.com/file/d/1sample_2/view",
      },
      {
        text: "Review Mahkamah Konstitusi dan Hukum Acara Pengujian Undang-Undang terhadap Undang-Undang Dasar NRI Tahun 1945",
        status: "Belum Selesai",
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
        status: "Belum Selesai",
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
        status: "Belum Selesai",
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
        status: "Belum Selesai",
        type: "Power Point",
      },
      {
        text: "Review Praktik Penyusunan",
        status: "Belum Selesai",
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
    const downloadUrl = url.replace("/preview", "/export?format=pdf");
    const fileUri =
      FileSystem.documentDirectory + title.replace(/\s+/g, "_") + ".pdf";

    alert("Mengunduh materi...");
    const result = await FileSystem.downloadAsync(downloadUrl, fileUri);

    if (result.status === 200) {
      await Sharing.shareAsync(result.uri);
    } else {
      alert("Gagal mengunduh file.");
    }
  } catch (error) {
    console.error(error);
    alert("Terjadi kesalahan saat mengunduh.");
  }
};

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
  url,
  isLocked,
  onStartTest,
}: any) {
  const isCompleted = status === "Selesai";

  const displayIcon = isLocked
    ? "lock-closed"
    : icon ||
      (type === "Video"
        ? "play-circle"
        : type === "Power Point"
          ? "document-text"
          : "reader");

  return (
    <TouchableOpacity
      style={[
        silabusStyles.itemContainer,
        !isLocked && silabusStyles.itemActive,
        isLocked && { opacity: 0.5 },
      ]}
      disabled={isLocked}
      onPress={() => onStartTest(url, text)}
    >
      <Ionicons
        name={displayIcon}
        size={18}
        color={
          isLocked ? "#999" : isCompleted ? MK_THEME.success : MK_THEME.maroon
        }
      />
      <Text
        style={[
          silabusStyles.itemText,
          isCompleted && silabusStyles.itemTextCompleted,
          !isLocked && { fontWeight: "600", color: MK_THEME.maroon },
          isLocked && { color: "#999" },
        ]}
      >
        {text}
        {type && (
          <Text style={{ fontSize: 10, color: MK_THEME.gold }}> ({type})</Text>
        )}
      </Text>

      {isLocked ? (
        <Ionicons name="lock-closed-outline" size={14} color="#999" />
      ) : isCompleted ? (
        <Ionicons name="checkmark-circle" size={18} color={MK_THEME.success} />
      ) : (
        <View style={silabusStyles.testButton}>
          <Text style={silabusStyles.testButtonText}>BUKA</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

function SilabusModule({
  mIdx,
  title,
  subMaterialCount,
  jp,
  items,
  allSyllabusData,
  onStartTest,
}: any) {
  const [isExpanded, setIsExpanded] = useState(mIdx === 0);

  const isModuleCompleted = items.every(
    (item: any) => item.status === "Selesai",
  );

  return (
    <View style={silabusStyles.moduleContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          silabusStyles.moduleHeader,
          isModuleCompleted && { backgroundColor: MK_THEME.success },
        ]}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View style={silabusStyles.headerLeft}>
          <Text
            style={[
              silabusStyles.headerTitle,
              isModuleCompleted && { color: "#FFF" },
            ]}
          >
            {mIdx + 1}. {title}
          </Text>
          {subMaterialCount && (
            <Text
              style={[
                silabusStyles.headerDetails,
                isModuleCompleted && { color: "rgba(255,255,255,0.8)" },
              ]}
            >
              {subMaterialCount} Materi • {jp} JP
            </Text>
          )}
        </View>
        <Ionicons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={18}
          color={isModuleCompleted ? "#FFF" : MK_THEME.maroon}
        />
      </TouchableOpacity>
      {isExpanded && (
        <View style={silabusStyles.moduleContent}>
          {items.map((item: any, iIdx: number) => {
            let isLocked = false;
            if (mIdx === 0 && iIdx === 0) isLocked = false;
            else if (iIdx > 0) isLocked = items[iIdx - 1].status !== "Selesai";
            else {
              const prevModule = allSyllabusData[mIdx - 1];
              isLocked =
                prevModule.items[prevModule.items.length - 1].status !==
                "Selesai";
            }

            return (
              <SilabusItem
                key={iIdx}
                {...item}
                isLocked={isLocked}
                onStartTest={(url: string, title: string) =>
                  onStartTest(url, title, iIdx)
                }
              />
            );
          })}
        </View>
      )}
    </View>
  );
}

export default function PPHKWN2() {
  const router = useRouter();
  const [syllabusState, setSyllabusState] = useState(syllabusData);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }, []);
  const [activeUrl, setActiveUrl] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"Video" | "PPT" | null>(null);
  const handleItemPress = (mIdx: number, iIdx: number, pathOrUrl: string) => {
    const newState = [...syllabusState];
    newState[mIdx].items[iIdx].status = "Selesai";
    setSyllabusState(newState);

    if (!pathOrUrl) {
      return;
    }

    if (pathOrUrl.startsWith("http")) {
      const vidId = getYoutubeId(pathOrUrl);
      if (vidId) {
        setActiveVideoId(vidId);
        setModalType("Video");
        setModalVisible(true);
      } else {
        setActiveUrl(pathOrUrl);
        setModalType("PPT");
        setModalVisible(true);
      }
    } else {
      router.push(pathOrUrl as any);
    }
  };
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

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
        <View style={styles.heroSection}>
          <Text style={styles.mainTitle}>{courseData.title}</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressTextRow}>
              <Text style={styles.progressLabel}>Progres Belajar </Text>
              <Text style={styles.progressValue}>65%</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: "65%" }]} />
            </View>
          </View>
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

        <View style={styles.statsRow}>
          {courseData.stats.map((stat, index) => (
            <CourseStat key={index} {...stat} />
          ))}
        </View>
        <View style={styles.descriptionCard}>
          <Text style={styles.contentTitle}>Deskripsi</Text>
          <Text
            style={styles.contentText}
            numberOfLines={isDescExpanded ? undefined : 4}
          >
            Program Peningkatan Pemahaman Hak Konstitusional Warga Negara
            dirancang untuk memberikan wawasan mendalam mengenai hak-hak
            konstitusional yang dijamin oleh negara bagi setiap warga negara
            sebagaimana tertuang dalam konstitusi, serta bagaimana hak-hak
            tersebut dapat dioptimalkan untuk menciptakan kehidupan yang lebih
            adil.{"\n\n"}
            Pendidikan ini bertujuan untuk memperkuat kesadaran hukum di
            kalangan masyarakat, sehingga masyarakat dapat lebih aktif, kritis,
            dan bertanggung jawab dalam menjalani kehidupan berbangsa dan
            bernegara.{"\n\n"}
            Silahkan dapat melihat pedoman pembelajaran Mahkamah Konstitusi
            Learning Center melalui video yang terdapat dalam thumbnail
            pembelajaran.
          </Text>

          <TouchableOpacity
            onPress={() => setIsDescExpanded(!isDescExpanded)}
            style={styles.readMoreBtn}
          >
            <Text style={styles.readMoreLabel}>
              {isDescExpanded ? "Sembunyikan" : "Baca Selengkapnya"}
            </Text>
            <Ionicons
              name={isDescExpanded ? "chevron-up" : "chevron-down"}
              size={14}
              color={MK_THEME.maroon}
            />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Persyaratan Pendidikan */}
          <View style={styles.requirementSection}>
            <View style={styles.subHeaderRow}>
              <Ionicons
                name="person-circle-outline"
                size={18}
                color={MK_THEME.gold}
              />
              <Text style={styles.subTitle}>Persyaratan Pendidikan</Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.dot} />
              <Text style={styles.bulletText}>
                Warga Negara Indonesia (Kartu Identitas Kependudukan)
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.dot} />
              <Text style={styles.bulletText}>Berusia minimal 17 Tahun</Text>
            </View>
          </View>

          {/* Sarana Prasarana */}
          <View style={styles.requirementSection}>
            <View style={styles.subHeaderRow}>
              <Ionicons
                name="desktop-outline"
                size={18}
                color={MK_THEME.gold}
              />
              <Text style={styles.subTitle}>Sarana Prasarana</Text>
            </View>
            <Text style={styles.miniLabel}>Hardware & Koneksi:</Text>
            <Text style={styles.bulletTextSmall}>
              • Laptop/PC (RAM 4GB) atau Ponsel Android/iOS
            </Text>
            <Text style={styles.bulletTextSmall}>
              • Internet stabil minimal 5-10 Mbps
            </Text>

            <Text style={[styles.miniLabel, { marginTop: 8 }]}>Software:</Text>
            <Text style={styles.bulletTextSmall}>
              • Browser terbaru (Chrome/Firefox/Safari)
            </Text>
            <Text style={styles.bulletTextSmall}>
              • Adobe Acrobat Reader (PDF)
            </Text>
          </View>
        </View>
        <View style={styles.sectionHeader}>
          <View style={styles.indicator} />
          <Text style={styles.sectionTitleText}>Silabus Pembelajaran</Text>
        </View>

        <View style={styles.syllabusList}>
          {syllabusState.map((module, index) => (
            <SilabusModule
              key={index}
              mIdx={index}
              {...module}
              allSyllabusData={syllabusState}
              onStartTest={(url: string, title: string, itemIdx: number) =>
                handleItemPress(index, itemIdx, url)
              }
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
    padding: 8,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: MK_THEME.goldLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  statCount: {
    fontSize: 13,
    fontWeight: "800",
    color: MK_THEME.maroon,
  },
  statLabel: {
    fontSize: 8,
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
  moduleHeaderCompleted: {
    backgroundColor: MK_THEME.success,
  },
  headerLeft: {
    flex: 1,
    paddingRight: 8,
  },
  headerTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: MK_THEME.textMain,
    lineHeight: 18,
  },
  headerDetails: {
    fontSize: 11,
    color: MK_THEME.textSub,
    marginTop: 4,
  },
  moduleContent: {
    padding: 8,
  },
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
  },
  testButton: {
    backgroundColor: MK_THEME.gold,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  testButtonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 10,
  },
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
  progressContainer: {
    marginBottom: 15,
    width: "100%",
  },
  progressTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: MK_THEME.textSub,
  },
  progressValue: {
    fontSize: 12,
    fontWeight: "800",
    color: MK_THEME.maroon,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: "#EEE",
    borderRadius: 3,
    width: "100%",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: MK_THEME.gold,
    borderRadius: 3,
  },
  statsRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  descriptionCard: {
    backgroundColor: MK_THEME.white,
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: MK_THEME.border,
  },
  contentTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: MK_THEME.maroon,
    marginBottom: 8,
  },
  contentText: {
    fontSize: 13,
    lineHeight: 20,
    color: MK_THEME.textSub,
    textAlign: "justify",
  },
  readMoreBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  readMoreLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: MK_THEME.maroon,
    marginRight: 4,
  },
  divider: {
    height: 1,
    backgroundColor: MK_THEME.border,
    marginVertical: 15,
  },
  requirementSection: {
    marginBottom: 15,
  },
  subHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: MK_THEME.textMain,
    marginLeft: 6,
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    paddingLeft: 4,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: MK_THEME.gold,
    marginRight: 8,
  },
  bulletText: {
    fontSize: 12,
    color: MK_THEME.textSub,
    flex: 1,
  },
  miniLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: MK_THEME.textMain,
    marginBottom: 2,
  },
  bulletTextSmall: {
    fontSize: 12,
    color: MK_THEME.textSub,
    lineHeight: 18,
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
