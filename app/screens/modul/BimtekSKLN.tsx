import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PRIMARY_COLOR = "#8B0000";
const ACCENT_COLOR = "#007AFF";
const BACKGROUND_LIGHT = "#F8F8F8";
const CARD_COLOR = "#FFFFFF";
const TEXT_DARK = "#222222";
const TEXT_MUTED = "#666666";

const BIMTEK_SKLN_DATA = [
  {
    id: 1,
    title:
      "Bimbingan Teknis Hukum Acara Sengketa Kewenangan Lembaga Negara Angkatan 1",
    organizer: "PUSDIK MKRI",
    modules: 7,
    hours: 16,
    detailPath: "/screens/modul/detailSKLN/SKLN1",
  },
  {
    id: 2,
    title:
      "Bimbingan Teknis Hukum Acara Sengketa Kewenangan Lembaga Negara Angkatan 2",
    organizer: "PUSDIK MKRI",
    modules: 7,
    hours: 16,
    detailPath: "/screens/modul/detailSKLN/SKLN2",
  },
  {
    id: 3,
    title:
      "Bimbingan Teknis Hukum Acara Sengketa Kewenangan Lembaga Negara Angkatan 3",
    organizer: "PUSDIK MKRI",
    modules: 7,
    hours: 16,
    detailPath: "/screens/modul/detailSKLN/SKLN3",
  },
];

type Course = {
  id: number;
  title: string;
  organizer: string;
  modules: number;
  hours: number;
  detailPath: string;
};

export default function BimtekSKLN() {
  const router = useRouter();
  const [selectedSort, setSelectedSort] = useState("Default");
  const [courses, setCourses] = useState<Course[]>(BIMTEK_SKLN_DATA);
  const [showSortOptions, setShowSortOptions] = useState(false);

  useEffect(() => {
    if (selectedSort === "Default") {
      setCourses([...BIMTEK_SKLN_DATA]);
      return;
    }

    const sorted = [...BIMTEK_SKLN_DATA].sort((a, b) => {
      if (selectedSort === "Title (A-Z)") return a.title.localeCompare(b.title);
      if (selectedSort === "Title (Z-A)") return b.title.localeCompare(a.title);
      return 0;
    });

    setCourses(sorted);
  }, [selectedSort]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/pendidikan")}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={TEXT_DARK} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Bimbingan Teknis SKLN</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.pageSubtitle}>
            {" "}
            Sengketa Kewenangan Lembaga Negara
          </Text>
          <Text style={styles.pageDescription}>
            Bimbingan teknis tentang penyelesaian sengketa kewenangan lembaga
            negara sesuai dengan ketentuan Undang-Undang Dasar 1945 dan
            peraturan perundang-undangan yang berlaku.
          </Text>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.filterRow}>
            <Text style={styles.resultCount}>
              Menampilkan 1 - {courses.length} dari {BIMTEK_SKLN_DATA.length}{" "}
              pendidikan
            </Text>

            <View style={{ position: "relative" }}>
              <TouchableOpacity
                style={styles.sortDropdown}
                onPress={() => setShowSortOptions(!showSortOptions)}
              >
                <Text style={styles.sortText}>{selectedSort}</Text>
                <Ionicons
                  name={showSortOptions ? "chevron-up" : "chevron-down"}
                  size={16}
                  color={TEXT_DARK}
                />
              </TouchableOpacity>

              {showSortOptions && (
                <View style={styles.sortOptionsContainer}>
                  {["Default", "Title (A-Z)", "Title (Z-A)"].map((opt) => (
                    <TouchableOpacity
                      key={opt}
                      style={[
                        styles.sortOption,
                        opt === selectedSort && styles.sortOptionSelected,
                      ]}
                      onPress={() => {
                        setSelectedSort(opt);
                        setShowSortOptions(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.sortOptionText,
                          opt === selectedSort && styles.sortOptionTextSelected,
                        ]}
                      >
                        {opt}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>

          <FlatList
            data={courses}
            renderItem={({ item }) => <BimtekCard course={item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={1}
            scrollEnabled={false}
            contentContainerStyle={styles.listContainer}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Mahkamah Konstitusi</Text>
          <Text style={styles.footerTitle}>Republik Indonesia</Text>

          <View style={styles.contactSection}>
            <Text style={styles.contactHeader}>Kontak Kami</Text>
            <Text style={styles.contactItem}>
              <Ionicons name="call-outline" size={14} color={CARD_COLOR} /> 021
              23529000
            </Text>
            <Text style={styles.contactItem}>
              <Ionicons name="mail-outline" size={14} color={CARD_COLOR} />{" "}
              office@mkri.id
            </Text>
            <Text style={styles.contactItem}>
              <Ionicons name="location-outline" size={14} color={CARD_COLOR} />{" "}
              Jl. Medan Merdeka Barat No.6. Jakarta Pusat 10110 DKI Jakarta
            </Text>
          </View>

          <View style={styles.footerLinks}>
            <Text style={styles.linkHeader}>Pendidikan</Text>
            <Text style={styles.linkItem}>
              Peningkatan Pemahaman Hak Konstitusional Warga Negara
            </Text>
            <Text style={styles.linkItem}>Bimtek Pengujian Undang-Undang</Text>
            <Text style={styles.linkItem}>
              Bimtek Sengketa Kewenangan Lembaga Negara
            </Text>
            <Text style={styles.linkItem}>
              Bimtek Perselisihan Hasil Pemilihan Umum
            </Text>
          </View>

          <View style={styles.footerLinks}>
            <Text style={styles.linkHeader}>Pranala</Text>
            <Text style={styles.linkItem}>Tentang Kami</Text>
            <Text style={styles.linkItem}>Pendidikan</Text>
            <Text style={styles.linkItem}>Statistik</Text>
            <Text style={styles.linkItem}>Pengumuman</Text>
            <Text style={styles.linkItem}>Bantuan</Text>
          </View>
        </View>

        <View style={styles.footerBottom}>
          <Text style={styles.footerBottomText}>
            Bimbingan Teknis || Mahkamah Konstitusi Learning Center
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function BimtekCard({ course }: { course: Course }) {
  const router = useRouter();

  const handleDetailPress = () => {
    const detailRoutes: Record<number, string> = {
      1: "screens/modul/detailSKLN/SKLN1",
      2: "screens/modul/detailSKLN/SKLN2",
      3: "screens/modul/detailSKLN/SKLN3",
    };

    const route =
      detailRoutes[course.id] || course.detailPath || `/course/${course.id}`;
    router.push(route as any);
  };

  const handleCertificatePress = () => {
    router.push("screens/sertifikat" as any);
  };

  return (
    <View style={[styles.cardContainer, styles.cardRow]}>
      <Image
        source={require("../../../assets/pphkwnA6.jpg")}
        style={styles.cardImageLeft}
        resizeMode="cover"
      />
      <View style={styles.cardContentRow}>
        <View style={styles.statsRowCompact}>
          <View style={styles.statItemCompact}>
            <Ionicons name="book-outline" size={14} color={PRIMARY_COLOR} />
            <Text style={styles.statTextCompact}>{course.modules} Modul</Text>
          </View>
          <View style={styles.statItemCompact}>
            <Ionicons name="time-outline" size={14} color={PRIMARY_COLOR} />
            <Text style={styles.statTextCompact}>{course.hours} Jam</Text>
          </View>
        </View>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {course.title}
        </Text>
        <View style={styles.organizerRow}>
          <Ionicons name="business-outline" size={14} color="#666" />
          <Text style={styles.organizerText}>{course.organizer}</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.detailButtonPrimary, { flex: 1 }]}
            onPress={handleDetailPress}
            activeOpacity={0.85}
          >
            <Text style={styles.detailButtonText}>Detail</Text>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={CARD_COLOR}
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.certificateButton}
            onPress={handleCertificatePress}
            activeOpacity={0.85}
          >
            <Ionicons
              name="download-outline"
              size={16}
              color={CARD_COLOR}
              style={{ marginRight: 6 }}
            />
            <Text style={styles.certificateButtonText}>Sertifikat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND_LIGHT,
  },
  headerTop: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: CARD_COLOR,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: PRIMARY_COLOR,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: CARD_COLOR,
    borderBottomWidth: 1,
    borderBottomColor: PRIMARY_COLOR + "20",
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: PRIMARY_COLOR,
    marginBottom: 5,
  },
  pageSubtitle: {
    fontSize: 18,
    fontWeight: "700",
    color: TEXT_DARK,
    marginBottom: 10,
  },
  pageDescription: {
    fontSize: 14,
    color: TEXT_MUTED,
    lineHeight: 20,
  },
  contentContainer: {
    padding: 20,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 15,
  },
  resultCount: {
    fontSize: 13,
    color: TEXT_DARK,
    fontWeight: "500",
    flex: 1,
  },
  sortDropdown: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: CARD_COLOR,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR + "30",
    minWidth: 140,
  },
  sortText: {
    fontSize: 13,
    fontWeight: "600",
    marginRight: 8,
    color: TEXT_DARK,
  },
  sortOptionsContainer: {
    position: "absolute",
    top: 45,
    right: 0,
    backgroundColor: CARD_COLOR,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR + "30",
    borderRadius: 6,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 1000,
    minWidth: 160,
  },
  sortOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  sortOptionSelected: {
    backgroundColor: PRIMARY_COLOR + "15",
  },
  sortOptionText: {
    fontSize: 13,
    color: TEXT_DARK,
    fontWeight: "500",
  },
  sortOptionTextSelected: {
    color: PRIMARY_COLOR,
    fontWeight: "700",
  },
  listContainer: {
    paddingBottom: 20,
  },
  cardContainer: {
    backgroundColor: CARD_COLOR,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    flexDirection: "row",
    alignItems: "center",
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardImageLeft: {
    width: 120,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: "#EEE",
  },
  cardContentRow: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    justifyContent: "space-between",
  },
  statsRowCompact: {
    flexDirection: "row",
    gap: 12,
    marginTop: 6,
    alignItems: "center",
  },
  statItemCompact: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statTextCompact: {
    fontSize: 12,
    color: "#4B5563",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: TEXT_DARK,
    marginBottom: 6,
  },
  cardOrganizer: {
    fontSize: 13,
    color: TEXT_MUTED,
    marginBottom: 8,
  },
  organizerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  organizerText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 5,
  },
  buttonRowSKLN: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  detailButtonPrimary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    minWidth: 90,
    flex: 1,
  },
  detailButtonText: {
    color: CARD_COLOR,
    fontSize: 14,
    fontWeight: "700",
  },
  certificateButtonSKLN: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ACCENT_COLOR,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    minWidth: 120,
  },
  certificateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ACCENT_COLOR,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    minWidth: 120,
  },
  certificateButtonText: {
    color: CARD_COLOR,
    fontSize: 14,
    fontWeight: "700",
  },
  footer: {
    backgroundColor: PRIMARY_COLOR,
    padding: 20,
  },
  footerTitle: {
    color: CARD_COLOR,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  contactSection: {
    marginTop: 15,
    marginBottom: 20,
  },
  contactHeader: {
    color: CARD_COLOR,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: CARD_COLOR + "50",
    paddingBottom: 5,
  },
  contactItem: {
    color: CARD_COLOR,
    fontSize: 14,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  footerLinks: {
    marginBottom: 20,
  },
  linkHeader: {
    color: CARD_COLOR,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: CARD_COLOR + "50",
    paddingBottom: 5,
  },
  linkItem: {
    color: CARD_COLOR,
    fontSize: 14,
    marginBottom: 3,
  },
  footerBottom: {
    backgroundColor: TEXT_DARK,
    paddingVertical: 10,
    alignItems: "center",
  },
  footerBottomText: {
    color: CARD_COLOR,
    fontSize: 12,
  },
});
