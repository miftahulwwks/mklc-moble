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

const COLORS = {
  primary: "#8B0000",
  accent: "#B8860B",
  background: "#F8F9FA",
  card: "#FFFFFF",
  textDark: "#1A1A1A",
  textMuted: "#6D6D6D",
  border: "#E0E0E0",
  success: "#2E7D32",
  warning: "#FFA000",
};

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
  },
  {
    id: "2",
    title: "Teknik Dasar Penulisan Hukum Konstitusi",
    progress: 50,
    status: "Berlangsung",
    durationHours: 3,
    modules: 6,
    newest: "2023-10-15T15:30:00Z",
  },
  {
    id: "3",
    title: "Pengantar Filsafat Hukum",
    progress: 0,
    status: "Berlangsung",
    durationHours: 2,
    modules: 4,
    newest: "2023-09-01T08:00:00Z",
  },
];

function LearningCard({ item, onPress }) {
  const isCompleted = item.progress === 100;
  const progressColor = isCompleted ? COLORS.success : COLORS.warning;

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item.id)}>
      <View style={styles.cardHeaderRow}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        {isCompleted && (
          <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
        )}
      </View>

      <View style={styles.progressWrapper}>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressBar,
              { width: `${item.progress}%`, backgroundColor: progressColor },
            ]}
          />
        </View>
        <Text style={styles.progressPercent}>{item.progress}% Selesai</Text>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Ionicons name="book" size={14} color={COLORS.primary} />
          <Text style={styles.infoText}>{item.modules} Materi</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="time" size={14} color={COLORS.primary} />
          <Text style={styles.infoText}>{item.durationHours} Jam</Text>
        </View>
      </View>

      {isCompleted && (
        <TouchableOpacity style={styles.certButton}>
          <Ionicons name="ribbon-outline" size={16} color={COLORS.accent} />
          <Text style={styles.certButtonText}>Unduh E-Sertifikat</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

export default function RiwayatPembelajaran() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [sortBy, setSortBy] = useState("Newest");

  const filteredHistory = useMemo(() => {
    let data = [...LEARNING_HISTORY];
    if (activeFilter === "Berlangsung") {
      data = data.filter((item) => item.progress > 0 && item.progress < 100);
    } else if (activeFilter === "Selesai") {
      data = data.filter((item) => item.progress === 100);
    }
    return data.sort((a, b) => {
      const dateA = new Date(a.newest).getTime();
      const dateB = new Date(b.newest).getTime();
      return sortBy === "Newest" ? dateB - dateA : dateA - dateB;
    });
  }, [activeFilter, sortBy]);

  const stats = useMemo(
    () => ({
      modules: filteredHistory.reduce((sum, item) => sum + item.modules, 0),
      hours: filteredHistory.reduce((sum, item) => sum + item.durationHours, 0),
    }),
    [filteredHistory],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/akun")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Riwayat Pembelajaran</Text>
      </View>

      <FlatList
        data={filteredHistory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <LearningCard
            item={item}
            onPress={(id) => router.push(`/riwayat/${id}`)}
          />
        )}
        ListHeaderComponent={
          <View style={styles.topSection}>
            <View style={styles.statsCard}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{stats.modules}</Text>
                <Text style={styles.statLabel}>Total Materi</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{stats.hours}</Text>
                <Text style={styles.statLabel}>Total Jam</Text>
              </View>
            </View>

            <View style={styles.tabContainer}>
              {["Semua", "Berlangsung", "Selesai"].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveFilter(tab)}
                  style={[styles.tab, activeFilter === tab && styles.activeTab]}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeFilter === tab && styles.activeTabText,
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.sortRow}>
              <Text style={styles.listCount}>
                Daftar Riwayat ({filteredHistory.length})
              </Text>
              <TouchableOpacity
                style={styles.sortToggle}
                onPress={() =>
                  setSortBy(sortBy === "Newest" ? "Oldest" : "Newest")
                }
              >
                <Text style={styles.sortToggleText}>
                  {sortBy === "Newest" ? "Terbaru" : "Terlama"}
                </Text>
                <Ionicons
                  name="swap-vertical"
                  size={14}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
  },
  listContent: {
    padding: 16,
  },
  topSection: {
    marginBottom: 10,
  },
  statsCard: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginHorizontal: 10,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFF",
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    padding: 3,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: COLORS.card,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textMuted,
  },
  activeTabText: {
    color: COLORS.primary,
  },
  sortRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  listCount: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textDark,
  },
  sortToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  sortToggleText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.primary,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.primary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  cardTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textDark,
    lineHeight: 20,
    marginRight: 8,
  },
  progressWrapper: {
    marginBottom: 15,
  },
  progressTrack: {
    height: 8,
    backgroundColor: "#F0F0F0",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 6,
  },
  progressBar: {
    height: "100%",
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textMuted,
  },
  infoRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  certButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.accent,
    backgroundColor: "#FFFBF0",
    gap: 8,
  },
  certButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.accent,
  },
});
