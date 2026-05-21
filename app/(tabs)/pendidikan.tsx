import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    Dimensions,
    PanResponder,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Sidebar from "../../components/Sidebar";

const { width } = Dimensions.get("window");

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

const categories = [
  { name: "PPHKWN", count: 1, icon: "school-outline" },
  { name: "Bimtek PUU", count: 3, icon: "gavel" },
  { name: "Bimtek SKLN", count: 5, icon: "scale-balance" },
  { name: "Bimtek PHPU", count: 12, icon: "vote-outline" },
  { name: "Pusat Pengetahuan", count: 8, icon: "library-books" },
];

const allModules = [
  {
    id: 1,
    title: "Peningkatan Pemahaman Hak Konstitusional Warga Negara...",
    category: "PPHKWN",
  },
  { id: 2, title: "Pedoman Pembentukan UU", category: "Bimtek PUU" },
  { id: 3, title: "Tugas dan Kewenangan MK", category: "Bimtek SKLN" },
  { id: 4, title: "Prosedur Sengketa Pilkada", category: "Bimtek PHPU" },
  { id: 5, title: "Sistematika Uji Materi", category: "Bimtek PUU" },
  { id: 6, title: "Konstitusi dan Demokrasi", category: "Pusat Pengetahuan" },
];

export default function Pendidikan() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        gesture.dx > 20 && gesture.moveX < 25,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dx > 50) setOpenSidebar(true);
      },
    }),
  ).current;
  const filteredAndSortedModules = allModules
    .filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase()),
    )
    .sort((a, b) => a.title.localeCompare(b.title));

  const handleCategoryPress = (categoryName: string) => {
    const routes: { [key: string]: string } = {
      PPHKWN: "/screens/modul/pphkwn",
      "Bimtek PUU": "/screens/modul/BimtekPUU",
      "Bimtek SKLN": "/screens/modul/BimtekSKLN",
      "Bimtek PHPU": "/screens/modul/BimtekPHPU",
    };
    router.push(
      routes[categoryName] || (`/modul/category/${categoryName}` as any),
    );
  };

  return (
    <View style={styles.fullScreen} {...panResponder.panHandlers}>
      <Sidebar open={openSidebar} onClose={() => setOpenSidebar(false)} />

      <View style={styles.headerContainer}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.darkPrimary]}
          style={styles.headerGradient}
        >
          <SafeAreaView edges={["top"]} style={styles.safeAreaHeader}>
            <View style={styles.headerContent}>
              <View style={styles.headerTitleGroup}>
                <View style={styles.goldBar} />
                <View>
                  <Text style={styles.headerSubText}>
                    Mahkamah Konstitusi Learning Center
                  </Text>
                  <Text style={styles.headerTitleText}>Pendidikan</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setOpenSidebar(true)}
                style={styles.menuButton}
              >
                <Ionicons name="grid" size={22} color="white" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </LinearGradient>

        <View style={styles.searchWrapper}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color={COLORS.gold} />
            <TextInput
              style={styles.searchInput}
              placeholder="Cari materi atau hukum acara..."
              placeholderTextColor={COLORS.textMuted}
              value={searchText}
              onChangeText={setSearchText}
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText("")}>
                <Ionicons
                  name="close-circle"
                  size={18}
                  color={COLORS.textMuted}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Kategori Pendidikan</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryScrollContent}
        >
          {categories.map((item, index) => {
            const IconComponent = item.icon.includes("outline")
              ? Ionicons
              : MaterialCommunityIcons;
            return (
              <TouchableOpacity
                key={index}
                style={styles.categoryCard}
                onPress={() => handleCategoryPress(item.name)}
              >
                <View style={styles.categoryIconBox}>
                  <IconComponent
                    name={item.icon as any}
                    size={24}
                    color={COLORS.primary}
                  />
                </View>
                <Text style={styles.categoryNameText} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.categoryCountText}>{item.count} Modul</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <Text style={styles.sectionTitleModul}>
          Modul Terbaru ({filteredAndSortedModules.length})
        </Text>
        <View style={styles.moduleListContainer}>
          {filteredAndSortedModules.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.moduleCard}
              onPress={() => handleCategoryPress(item.category)}
            >
              <View style={styles.moduleAccent} />
              <View style={styles.moduleInfo}>
                <Text style={styles.moduleCategoryTag}>{item.category}</Text>
                <Text style={styles.moduleTitleText} numberOfLines={2}>
                  {item.title}
                </Text>
                <View style={styles.moduleMeta}>
                  <Ionicons
                    name="time-outline"
                    size={12}
                    color={COLORS.textMuted}
                  />
                  <Text style={styles.metaText}>
                    Estimasi 45 Menit • Terbaru 2024
                  </Text>
                </View>
              </View>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={COLORS.border}
              />
            </TouchableOpacity>
          ))}
        </View>

        {filteredAndSortedModules.length === 0 && (
          <View style={styles.emptyBox}>
            <Ionicons
              name="document-text-outline"
              size={40}
              color={COLORS.border}
            />
            <Text style={styles.emptyText}>Materi tidak ditemukan</Text>
          </View>
        )}

        <View style={styles.footerBranding}>
          <Text style={styles.footerText}>
            MAHKAMAH KONSTITUSI REPUBLIK INDONESIA
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    marginBottom: 30,
  },
  headerGradient: {
    paddingBottom: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  safeAreaHeader: {
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
  },
  headerTitleGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  goldBar: {
    width: 4,
    height: 35,
    backgroundColor: COLORS.gold,
    marginRight: 12,
    borderRadius: 2,
  },
  headerSubText: {
    fontSize: 10,
    fontWeight: "800",
    color: COLORS.goldLight,
    letterSpacing: 1.5,
  },
  headerTitleText: {
    fontSize: 20,
    fontWeight: "900",
    color: "white",
  },
  menuButton: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 10,
    borderRadius: 12,
  },
  searchWrapper: {
    position: "absolute",
    bottom: -25,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: COLORS.textDark,
    fontWeight: "500",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.primary,
  },
  seeAll: {
    fontSize: 12,
    color: COLORS.gold,
    fontWeight: "700",
  },
  categoryScroll: {
    marginHorizontal: -20,
  },
  categoryScrollContent: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  categoryCard: {
    width: 120,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 15,
    marginRight: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  categoryIconBox: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryNameText: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.textDark,
    textAlign: "center",
  },
  categoryCountText: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  sectionTitleModul: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.primary,
    marginTop: 25,
    marginBottom: 15,
  },
  moduleListContainer: {
    gap: 10,
  },
  moduleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  moduleAccent: {
    width: 5,
    height: "100%",
    backgroundColor: COLORS.gold,
    position: "absolute",
    left: 0,
  },
  moduleInfo: {
    flex: 1,
    paddingLeft: 10,
  },
  moduleCategoryTag: {
    fontSize: 9,
    fontWeight: "800",
    color: COLORS.primary,
    textTransform: "uppercase",
    marginBottom: 5,
  },
  moduleTitleText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textDark,
    lineHeight: 20,
  },
  moduleMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  metaText: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginLeft: 5,
  },
  emptyBox: {
    alignItems: "center",
    marginTop: 30,
    opacity: 0.5,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 13,
    color: COLORS.textMuted,
  },
  footerBranding: {
    alignItems: "center",
    marginTop: 40,
    opacity: 0.4,
  },
  footerText: {
    fontSize: 9,
    fontWeight: "800",
    color: COLORS.primary,
    letterSpacing: 1,
  },
});
