import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PRIMARY_COLOR = "#8B0000";
const ACCENT_COLOR = "#007AFF";
const BACKGROUND_LIGHT = "#F5F6FA";
const CARD_COLOR = "#FFFFFF";
const TEXT_DARK = "#222222";
const TEXT_MUTED = "#666666";
const PROGRESS_COLOR = "#00CC66";

const LEARNING_HISTORY = [
  {
    id: "1",
    title:
      "Peningkatan Pemahaman Hak Konstitusional Warga Negara bagi Pegawai Pemerintah dengan Perjanjian Kerja (PPPK) Mahkamah Konstitusi",
    progress: 100,
    status: "Selesai",
    durationHours: 5,
    modules: 10,
    newest: "2023-11-20T10:00:00Z",
    isBookmarked: false,
  },
  {
    id: "2",
    title: "Teknik Dasar Penulisan Hukum Konstitusi",
    progress: 50,
    status: "Berlangsung",
    durationHours: 3,
    modules: 6,
    newest: "2023-10-15T15:30:00Z",
    isBookmarked: true,
  },
  {
    id: "3",
    title: "Pengantar Filsafat Hukum",
    progress: 0,
    status: "Semua",
    durationHours: 2,
    modules: 4,
    newest: "2023-09-01T08:00:00Z",
    isBookmarked: true,
  },
  {
    id: "4",
    title: "Modul Analisis Perkara Konstitusi",
    progress: 20,
    status: "Berlangsung",
    durationHours: 1,
    modules: 2,
    newest: "2023-12-05T12:00:00Z",
    isBookmarked: true,
  },
];

function LearningCard({ item, onPress, onBookmarkToggle }) {
  const isCompleted = item.progress === 100;
  const progressColor = isCompleted ? PROGRESS_COLOR : ACCENT_COLOR;

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item.id)}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Text style={styles.cardHeader}>{item.title}</Text>
        <TouchableOpacity
          onPress={() => onBookmarkToggle(item.id)}
          style={styles.bookmarkIcon}
        >
          <Ionicons
            name={item.isBookmarked ? "bookmark" : "bookmark-outline"}
            size={24}
            color={item.isBookmarked ? PRIMARY_COLOR : TEXT_MUTED}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressBar,
            { width: `${item.progress}%`, backgroundColor: progressColor },
          ]}
        />
      </View>
      <Text style={styles.progressText}>Progres: **{item.progress}%**</Text>

      <View style={styles.infoRow}>
        <Ionicons
          name="book-outline"
          size={14}
          color={TEXT_MUTED}
          style={{ marginRight: 4 }}
        />
        <Text style={styles.infoText}>{item.modules} Materi</Text>
        <Ionicons
          name="time-outline"
          size={14}
          color={TEXT_MUTED}
          style={{ marginLeft: 15, marginRight: 4 }}
        />
        <Text style={styles.infoText}>{item.durationHours} Jam Pelajaran</Text>
      </View>

      {isCompleted && (
        <TouchableOpacity style={styles.downloadButton}>
          <Ionicons
            name="download-outline"
            size={16}
            color={ACCENT_COLOR}
            style={{ marginRight: 5 }}
          />
          <Text style={styles.downloadButtonText}>Unduh E-Certificate</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

export default function Bookmark() {
  const router = useRouter();
  const [sortBy, setSortBy] = useState("Newest");
  const [historyData, setHistoryData] = useState(LEARNING_HISTORY);

  const handleBookmarkToggle = (id) => {
    setHistoryData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item,
      ),
    );
  };

  const filteredBookmarks = useMemo(() => {
    let data = historyData.filter((item) => item.isBookmarked);

    return data.sort((a, b) => {
      const dateA = new Date(a.newest).getTime();
      const dateB = new Date(b.newest).getTime();
      return sortBy === "Newest" ? dateB - dateA : dateA - dateB;
    });
  }, [historyData, sortBy]);

  const handleCardPress = (id) => {
    router.push(`/riwayat/${id}`);
  };

  const HeaderComponent = (
    <View style={styles.topContent}>
      <View style={styles.sortByContainer}>
        <Text style={styles.sortByLabel}>Urutkan Berdasarkan:</Text>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => setSortBy(sortBy === "Newest" ? "Oldest" : "Newest")}
        >
          <Text style={styles.sortText}>
            {sortBy === "Newest" ? "Newest" : "Oldest"}
          </Text>
          <Ionicons
            name="chevron-down-outline"
            size={16}
            color={TEXT_DARK}
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.listTitle}>
        Daftar Bookmark ({filteredBookmarks.length})
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/akun")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back-outline" size={28} color={TEXT_DARK} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Bookmark</Text>
      </View>

      <FlatList
        data={filteredBookmarks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LearningCard
            item={item}
            onPress={handleCardPress}
            onBookmarkToggle={handleBookmarkToggle}
          />
        )}
        ListHeaderComponent={HeaderComponent}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons name="bookmark-outline" size={50} color="#ccc" />
            <Text style={styles.emptyText}>
              Tidak ada materi yang ditandai (Bookmark).
            </Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND_LIGHT,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: CARD_COLOR,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: PRIMARY_COLOR,
    marginLeft: 10,
  },
  backButton: {
    padding: 5,
  },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: 15,
  },

  topContent: {
    marginBottom: 15,
  },

  sortByContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: CARD_COLOR,
    padding: 10,
    borderRadius: 8,
    justifyContent: "flex-start",
  },
  sortByLabel: {
    fontSize: 14,
    color: TEXT_MUTED,
    marginRight: 10,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: BACKGROUND_LIGHT,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  sortText: {
    fontSize: 14,
    fontWeight: "600",
    color: TEXT_DARK,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: TEXT_DARK,
    marginBottom: 10,
  },

  card: {
    backgroundColor: CARD_COLOR,
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    borderLeftWidth: 5,
    borderLeftColor: PRIMARY_COLOR,
  },
  cardHeader: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: TEXT_DARK,
    marginBottom: 10,
    marginRight: 10,
  },
  bookmarkIcon: {
    padding: 5,
  },
  progressContainer: {
    height: 6,
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    marginBottom: 5,
  },
  progressBar: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: TEXT_MUTED,
    marginBottom: 10,
    fontWeight: "600",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 12,
    color: TEXT_MUTED,
  },
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: "#E6F0FF",
    borderWidth: 1,
    borderColor: ACCENT_COLOR,
  },
  downloadButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: ACCENT_COLOR,
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
    padding: 20,
    backgroundColor: CARD_COLOR,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: TEXT_MUTED,
  },
});
