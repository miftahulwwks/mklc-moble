import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const MK_MAROON = "#8B0000";
const MK_GOLD = "#D4AF37";
const MK_NAVY = "#002855";
const BACKGROUND_LIGHT = "#F4F6F8";
const TEXT_DARK = "#1A1A1A";
const TEXT_MUTED = "#6B7280";

const Statistik: React.FC = () => {
  const router = useRouter();

  const statsSummary = [
    {
      id: 1,
      label: "Total Peserta",
      value: "45,280",
      icon: "people",
      color: MK_MAROON,
    },
    {
      id: 2,
      label: "Alumni PPHKWN",
      value: "38,150",
      icon: "school",
      color: MK_NAVY,
    },
    {
      id: 3,
      label: "Kegiatan Selesai",
      value: "1,240",
      icon: "checkmark-circle",
      color: "#2E7D32",
    },
  ];

  const sebaranWilayah = [
    { provinsi: "DKI Jakarta", jumlah: "8,420", percentage: 0.85 },
    { provinsi: "Jawa Barat", jumlah: "7,150", percentage: 0.72 },
    { provinsi: "Jawa Timur", jumlah: "6,890", percentage: 0.68 },
    { provinsi: "Sulawesi Selatan", jumlah: "3,200", percentage: 0.35 },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <SafeAreaView edges={["top"]}>
          <View style={styles.navBar}>
            <TouchableOpacity
              onPress={() => router.replace("/(tabs)/home")}
              style={styles.backBtn}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.navTitle}>STATISTIK PUSDIK MK</Text>
            <View style={{ width: 40 }} />
          </View>
        </SafeAreaView>
        <View style={styles.goldLine} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Ringkasan Data</Text>
          <Text style={styles.sectionSub}>Update terakhir: Januari 2026</Text>
        </View>

        <View style={styles.statsGrid}>
          {statsSummary.map((item) => (
            <View key={item.id} style={styles.statCard}>
              <View
                style={[styles.iconBox, { backgroundColor: item.color + "15" }]}
              >
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color={item.color}
                />
              </View>
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.mainCard}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons
              name="chart-pie"
              size={20}
              color={MK_MAROON}
            />
            <Text style={styles.cardTitle}>Komposisi Peserta</Text>
          </View>

          <Text style={styles.groupLabel}>Berdasarkan Jenis Kelamin</Text>
          <View style={styles.progressRow}>
            <View style={styles.progressInfo}>
              <Text style={styles.progressText}>Laki-laki (58%)</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: "58%", backgroundColor: MK_MAROON },
                ]}
              />
            </View>
          </View>
          <View style={styles.progressRow}>
            <View style={styles.progressInfo}>
              <Text style={styles.progressText}>Perempuan (42%)</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: "42%", backgroundColor: MK_GOLD },
                ]}
              />
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.groupLabel}>Tingkat Pendidikan</Text>
          {["S1 Hukum", "S2/S3", "Mahasiswa", "Umum"].map((edu, idx) => (
            <View key={idx} style={styles.eduRow}>
              <Text style={styles.eduText}>{edu}</Text>
              <View style={styles.eduBarContainer}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${80 - idx * 15}%`, backgroundColor: MK_NAVY },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>

        <View style={[styles.mainCard, { marginBottom: 30 }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="map" size={20} color={MK_MAROON} />
            <Text style={styles.cardTitle}>Sebaran Wilayah Terbanyak</Text>
          </View>

          {sebaranWilayah.map((item, index) => (
            <View key={index} style={styles.regionItem}>
              <View style={styles.regionInfo}>
                <Text style={styles.regionName}>{item.provinsi}</Text>
                <Text style={styles.regionCount}>{item.jumlah} Orang</Text>
              </View>
              <View style={styles.progressBarBg}>
                <View
                  style={[
                    styles.progressBarFill,
                    {
                      width: `${item.percentage * 100}%`,
                      backgroundColor: MK_GOLD,
                    },
                  ]}
                />
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.viewMoreBtn}>
            <Text style={styles.viewMoreText}>Lihat Seluruh Provinsi</Text>
            <Ionicons name="chevron-down" size={16} color={MK_MAROON} />
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

  header: {
    backgroundColor: MK_MAROON,
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  navTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  goldLine: {
    height: 4,
    backgroundColor: MK_GOLD,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 25,
  },

  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: MK_NAVY,
  },
  sectionSub: {
    fontSize: 12,
    color: TEXT_MUTED,
    marginTop: 2,
  },

  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  statCard: {
    backgroundColor: "white",
    width: (width - 60) / 3,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  iconBox: {
    padding: 8,
    borderRadius: 10,
    marginBottom: 10,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "900",
    color: TEXT_DARK,
  },
  statLabel: {
    fontSize: 10,
    color: TEXT_MUTED,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 2,
  },

  mainCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: MK_MAROON,
    shadowOpacity: 0.1,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: MK_MAROON,
    letterSpacing: 0.5,
  },

  groupLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: TEXT_DARK,
    marginBottom: 12,
  },
  progressRow: {
    marginBottom: 15,
  },
  progressInfo: {
    marginBottom: 6,
  },
  progressText: {
    fontSize: 12,
    color: TEXT_DARK,
    fontWeight: "500",
  },
  progressBarBg: {
    height: 8,
    backgroundColor: "#E9ECEF",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },

  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginVertical: 20,
  },

  eduRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  eduText: {
    width: 80,
    fontSize: 11,
    color: TEXT_MUTED,
    fontWeight: "600",
  },
  eduBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: "#F0F0F0",
    borderRadius: 3,
    overflow: "hidden",
  },

  regionItem: {
    marginBottom: 18,
  },
  regionInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  regionName: {
    fontSize: 13,
    fontWeight: "700",
    color: MK_NAVY,
  },
  regionCount: {
    fontSize: 12,
    color: MK_MAROON,
    fontWeight: "800",
  },

  viewMoreBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  viewMoreText: {
    fontSize: 12,
    color: MK_MAROON,
    fontWeight: "700",
  },
});

export default Statistik;
