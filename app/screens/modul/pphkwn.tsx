import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  primary: "#8B0000",
  darkPrimary: "#5A0000",
  gold: "#C5A059",
  goldLight: "#E5C992",
  background: "#F4F6F9",
  card: "#FFFFFF",
  textDark: "#1F2937",
  textMuted: "#6B7280",
  border: "#E2E8F0",
};

const PPHKWN_COURSE_LIST = [
  {
    id: 1,
    title: "PPHKWN Angkatan 1",
    organizer: "PUSDIK MKRI",
    modules: 7,
    hours: 16,
    detailPath: "screens/modul/detailPPHKWN/PPHKWN1",
  },
  {
    id: 2,
    title: "PPHKWN Angkatan 2",
    organizer: "PUSDIK MKRI",
    modules: 7,
    hours: 16,
    detailPath: "screens/modul/detailPPHKWN/PPHKWN2",
  },
  {
    id: 3,
    title: "PPHKWN Angkatan 3",
    organizer: "PUSDIK MKRI",
    modules: 7,
    hours: 16,
    detailPath: "screens/modul/detailPPHKWN/PPHKWN3",
  },
  {
    id: 4,
    title: "PPHKWN Angkatan 4",
    organizer: "PUSDIK MKRI",
    modules: 7,
    hours: 16,
    detailPath: "screens/modul/detailPPHKWN/PPHKWN1-3",
  },
  {
    id: 5,
    title: "PPHKWN Angkatan 5",
    organizer: "PUSDIK MKRI",
    modules: 7,
    hours: 16,
    detailPath: "screens/modul/detailPPHKWN/PPHKWN1-3",
  },
  {
    id: 6,
    title: "PPHKWN Angkatan 6",
    organizer: "PUSDIK MKRI",
    modules: 7,
    hours: 16,
    detailPath: "screens/modul/detailPPHKWN/PPHKWN1-3",
  },
  {
    id: 7,
    title: "PPHKWN Angkatan 7",
    organizer: "PUSDIK MKRI",
    modules: 7,
    hours: 16,
    detailPath: "screens/modul/detailPPHKWN/PPHKWN1-3",
  },
  {
    id: 8,
    title: "PPHKWN Angkatan 8",
    organizer: "PUSDIK MKRI",
    modules: 7,
    hours: 16,
    detailPath: "screens/modul/detailPPHKWN/PPHKWN1-3",
  },
  {
    id: 9,
    title: "PPHKWN Angkatan 9",
    organizer: "PUSDIK MKRI",
    modules: 7,
    hours: 16,
    detailPath: "screens/modul/detailPPHKWN/PPHKWN1-3",
  },
  {
    id: 10,
    title: "PPHKWN Angkatan 10",
    organizer: "PUSDIK MKRI",
    modules: 7,
    hours: 16,
    detailPath: "screens/modul/detailPPHKWN/PPHKWN1-3",
  },
];

const ITEMS_PER_PAGE = 5;

const CourseCard = ({ course }: { course: any }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => router.push(course.detailPath as any)}
    >
      <Image
        source={require("../../../assets/pphkwnA6.jpg")}
        style={styles.cardImage}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {course.title}
        </Text>
        <Text style={styles.cardOrganizer}>{course.organizer}</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="book" size={12} color={COLORS.primary} />
            <Text style={styles.statText}>{course.modules} Modul</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="time" size={12} color={COLORS.primary} />
            <Text style={styles.statText}>{course.hours} Jam</Text>
          </View>
        </View>
        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.btnDetail}
            onPress={() => router.push(course.detailPath as any)}
          >
            <Text style={styles.btnDetailText}>Detail Materi</Text>
            <Ionicons name="chevron-forward" size={14} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSertifikat}
            onPress={() => router.push("/screens/sertifikat" as any)}
          >
            <Ionicons name="ribbon" size={16} color={COLORS.gold} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function PPHKWNIndex() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState("Default");
  const [courses, setCourses] = useState(PPHKWN_COURSE_LIST);
  const [showSortOptions, setShowSortOptions] = useState(false);

  useEffect(() => {
    let sorted = [...PPHKWN_COURSE_LIST];
    if (selectedSort === "Title (A-Z)")
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    if (selectedSort === "Title (Z-A)")
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    setCourses(sorted);
    setCurrentPage(1);
  }, [selectedSort]);

  const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);
  const visibleData = courses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.customHeader}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.darkPrimary]}
          style={styles.headerGradient}
        >
          <SafeAreaView edges={["top"]}>
            <View style={styles.topRow}>
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/pendidikan")}
                style={styles.backCircle}
              >
                <Ionicons name="arrow-back" size={22} color="white" />
              </TouchableOpacity>
              <View style={styles.headerInfoText}>
                <Text style={styles.headerMainTitle}>PPHKWN</Text>
                <Text style={styles.headerTagline}>
                  Pusdik Mahkamah Konstitusi
                </Text>
              </View>
              <View style={styles.headerIconBox}>
                <Ionicons
                  name="school-outline"
                  size={24}
                  color={COLORS.goldLight}
                />
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.infoSection}>
          <Text style={styles.pageSubtitle}>
            Peningkatan Pemahaman Hak Konstitusional Warga Negara
          </Text>
          <Text style={styles.pageDescription}>
            Peningkatan pemahaman tentang hak konstitusional warga negara adalah
            isu penting yang berkaitan dengan penguatan demokrasi, penghormatan
            terhadap hukum, dan pemberdayaan masyarakat.
          </Text>
        </View>

        <View style={styles.filterBar}>
          <Text style={styles.resultText}>Daftar Program Angkatan</Text>
          <TouchableOpacity
            style={styles.sortBtn}
            onPress={() => setShowSortOptions(!showSortOptions)}
          >
            <Text style={styles.sortBtnText}>{selectedSort}</Text>
            <Ionicons name="filter" size={14} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {visibleData.map((item) => (
            <CourseCard key={item.id} course={item} />
          ))}
        </View>

        <View style={styles.paginationRow}>
          <TouchableOpacity
            style={[styles.pagBtn, currentPage === 1 && { opacity: 0.4 }]}
            onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <Ionicons name="chevron-back" size={20} color={COLORS.primary} />
            <Text style={styles.pagBtnText}>Kembali</Text>
          </TouchableOpacity>

          <View style={styles.pageDots}>
            {[...Array(totalPages)].map((_, i) => (
              <View
                key={i}
                style={[styles.dot, currentPage === i + 1 && styles.dotActive]}
              />
            ))}
          </View>

          <TouchableOpacity
            style={[
              styles.pagBtn,
              currentPage === totalPages && { opacity: 0.4 },
            ]}
            onPress={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <Text style={styles.pagBtnText}>Lanjut</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.footerBranding}>
          <View style={styles.footerLine} />
          <Text style={styles.footerMainText}>MAHKAMAH KONSTITUSI</Text>
          <Text style={styles.footerSubText}>REPUBLIK INDONESIA</Text>
          <Text style={styles.footerCopyright}>
            Bimbingan Teknis || MK Learning Center
          </Text>
        </View>
      </ScrollView>

      {showSortOptions && (
        <View style={styles.sortModal}>
          {["Default", "Title (A-Z)", "Title (Z-A)"].map((opt) => (
            <TouchableOpacity
              key={opt}
              style={styles.sortOption}
              onPress={() => {
                setSelectedSort(opt);
                setShowSortOptions(false);
              }}
            >
              <Text
                style={[
                  styles.sortOptionText,
                  opt === selectedSort && {
                    color: COLORS.primary,
                    fontWeight: "800",
                  },
                ]}
              >
                {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  customHeader: { overflow: "hidden" },
  headerGradient: {
    paddingBottom: 25,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  backCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerInfoText: { flex: 1, marginLeft: 15 },
  headerMainTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  headerTagline: { color: COLORS.goldLight, fontSize: 11, fontWeight: "600" },
  headerIconBox: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  infoSection: { padding: 20 },
  pageSubtitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.textDark,
    marginBottom: 8,
  },
  pageDescription: {
    fontSize: 13,
    color: COLORS.textMuted,
    lineHeight: 20,
    textAlign: "justify",
  },
  filterBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  resultText: { fontSize: 13, fontWeight: "700", color: COLORS.textDark },
  sortBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sortBtnText: {
    fontSize: 11,
    fontWeight: "700",
    marginRight: 6,
    color: COLORS.textDark,
  },
  listContainer: { paddingHorizontal: 20 },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardImage: {
    width: 90,
    height: 110,
    borderRadius: 15,
  },
  cardContent: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "space-between",
  },
  cardTitle: { fontSize: 15, fontWeight: "800", color: COLORS.textDark },
  cardOrganizer: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  statsRow: { flexDirection: "row", gap: 12, marginTop: 8 },
  statItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  statText: { fontSize: 11, color: COLORS.textDark, fontWeight: "600" },
  cardActions: { flexDirection: "row", gap: 8, marginTop: 10 },
  btnDetail: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  btnDetailText: { color: "white", fontSize: 12, fontWeight: "700" },
  btnSertifikat: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.gold,
    justifyContent: "center",
    alignItems: "center",
  },
  paginationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 25,
  },
  pagBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pagBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.primary,
    marginHorizontal: 4,
  },
  pageDots: { flexDirection: "row", gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#DDD" },
  dotActive: { width: 18, backgroundColor: COLORS.gold },
  footerBranding: {
    alignItems: "center",
    marginTop: 10,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  footerLine: {
    width: 40,
    height: 3,
    backgroundColor: COLORS.gold,
    marginBottom: 15,
    borderRadius: 2,
  },
  footerMainText: { fontSize: 15, fontWeight: "900", color: COLORS.primary },
  footerSubText: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: "700",
    marginTop: 2,
  },
  footerCopyright: { fontSize: 10, color: "#A0A0A0", marginTop: 10 },
  sortModal: {
    position: "absolute",
    top: 220,
    right: 20,
    backgroundColor: "white",
    borderRadius: 12,
    elevation: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: COLORS.border,
    zIndex: 999,
  },
  sortOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  sortOptionText: { fontSize: 12, color: COLORS.textDark },
});
