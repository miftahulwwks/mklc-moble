import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Sidebar from "../../components/Sidebar";

const { width } = Dimensions.get("window");

const COLORS = {
  primary: "#8B0000",
  secondary: "#FDF0F0",
  background: "#F4F6F8",
  white: "#FFFFFF",
  textDark: "#1A1A1A",
  textMuted: "#757575",
};

const latestModules = [
  { id: 1, title: "Dasar Hukum Acara MK", progress: 60, icon: "analytics" },
  {
    id: 2,
    title: "Prosedur Sengketa Pilkada",
    progress: 20,
    icon: "shield-checkmark",
  },
];

const quickActions = [
  {
    title: "Mulai Belajar",
    icon: "book",
    color: COLORS.primary,
    path: "/pendidikan",
  },
  { title: "Lihat Akun", icon: "person", color: COLORS.primary, path: "/akun" },
  {
    title: "Sertifikat",
    icon: "ribbon",
    color: "#FF9500",
    path: "../../screens/sertifikat",
  },
  {
    title: "Jadwal Bimtek",
    icon: "megaphone",
    color: "#007AFF",
    path: "../../screens/jadwal",
  },
  {
    title: "Statistik",
    icon: "bar-chart",
    color: "#34C759",
    path: "../../screens/Statistik",
  },
  {
    title: "Bantuan",
    icon: "chatbubble-ellipses-outline",
    color: "#125827",
    path: "../../screens/menu_sidebar/bantuan",
  },
];

export default function Home() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(30)).current;

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    console.log("Halaman direfresh...");

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <Sidebar open={openSidebar} onClose={() => setOpenSidebar(false)} />

      <View style={styles.fixedWrapper}>
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2070",
          }}
          style={styles.headerImage}
        >
          <View style={styles.overlay}>
            <SafeAreaView style={styles.headerContent}>
              <View style={styles.headerTopRow}>
                <View>
                  <Text style={styles.greetingText}>Selamat Datang,</Text>
                  <Text style={styles.userNameText}>Nama Pengguna MKLC</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setOpenSidebar(true)}
                  style={styles.notifCircle}
                >
                  <Ionicons
                    name="menu-outline"
                    size={26}
                    color={COLORS.white}
                  />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </View>
        </ImageBackground>

        <Animated.View
          style={[
            styles.heroCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }],
            },
          ]}
        >
          <View style={styles.heroHeader}>
            <Text style={styles.heroLabel}>Progres Belajar Aktif</Text>
            <TouchableOpacity
              style={styles.btnLihat}
              onPress={() => router.push("/screens/modul/BimtekPUU")}
            >
              <Text style={styles.btnLihatText}>Lihat Semua</Text>
              <Ionicons
                name="chevron-forward"
                size={12}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.heroModuleTitle} numberOfLines={1}>
            {latestModules[0].title}
          </Text>
          <View style={styles.progressSection}>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${latestModules[0].progress}%` },
                ]}
              />
            </View>
            <Text style={styles.progressPercent}>
              {latestModules[0].progress}%
            </Text>
          </View>
        </Animated.View>
      </View>

      <ScrollView
        style={styles.scrollView}
        bounces={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["transparent"]}
            tintColor={"transparent"}
            progressBackgroundColor="transparent"
          />
        }
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.gridContainer}>
            {quickActions.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.gridItem}
                onPress={() => router.push(item.path as any)}
              >
                <View
                  style={[
                    styles.gridIconBg,
                    { backgroundColor: item.color + "10" },
                  ]}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={24}
                    color={item.color}
                  />
                </View>
                <Text style={styles.gridText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Modul Untuk Anda</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            {latestModules.map((item) => (
              <TouchableOpacity key={item.id} style={styles.moduleCard}>
                <View style={styles.moduleCardHeader}>
                  <Ionicons
                    name={item.icon as any}
                    size={20}
                    color={COLORS.primary}
                  />
                  <Text style={styles.moduleProgressText}>
                    {item.progress}%
                  </Text>
                </View>
                <Text style={styles.moduleTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <View style={styles.miniProgressBar}>
                  <View
                    style={[
                      styles.miniProgressBarFill,
                      { width: `${item.progress}%` },
                    ]}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pemberitahuan</Text>
          </View>
          <View style={styles.notifCard}>
            <View style={styles.notifAccent} />
            <View style={styles.notifContent}>
              <View style={styles.notifHeaderRow}>
                <Ionicons
                  name="alert-circle"
                  size={18}
                  color={COLORS.primary}
                />
                <Text style={styles.notifTag}>PENTING</Text>
              </View>
              <Text style={styles.notifTitle}>
                Bimtek Konstitusi 2026 Segera Dibuka!
              </Text>
              <Text style={styles.notifBody}>
                Segera siapkan berkas pendaftaran Anda untuk mengikuti Bimbingan
                Teknis Hukum Acara Konstitusi angkatan terbaru.
              </Text>
              <TouchableOpacity
                style={styles.notifActionBtn}
                onPress={() => router.push("/screens/jadwal")}
              >
                <Text style={styles.notifActionText}>Lihat Detail Jadwal</Text>
                <Ionicons name="arrow-forward" size={14} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  fixedWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: COLORS.background,
  },
  headerImage: {
    width: "100%",
    height: 240,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(74, 0, 0, 0.5)",
    paddingHorizontal: 20,
  },
  headerContent: {
    marginTop: 10,
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greetingText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
  },
  userNameText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 2,
  },
  notifCircle: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 12,
  },
  heroCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginTop: -60,
    marginBottom: 15,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  heroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  heroLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  btnLihat: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  btnLihatText: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: "bold",
    marginRight: 4,
  },
  heroModuleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 20,
  },
  progressSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    marginRight: 15,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingTop: 325,
    paddingBottom: 100,
    paddingHorizontal: 16,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingVertical: 10,
  },
  gridItem: {
    width: "33.3%",
    alignItems: "center",
    marginVertical: 15,
  },
  gridIconBg: {
    width: 52,
    height: 52,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  gridText: {
    fontSize: 11,
    color: COLORS.textDark,
    fontWeight: "600",
  },
  sectionHeader: {
    marginTop: 25,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.textDark,
  },
  horizontalScroll: {
    marginHorizontal: -16,
    paddingLeft: 16,
  },
  moduleCard: {
    width: 220,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    elevation: 2,
  },
  moduleCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  moduleProgressText: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  moduleTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.textDark,
    height: 40,
  },
  miniProgressBar: {
    height: 4,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    marginTop: 10,
  },
  miniProgressBarFill: {
    height: 4,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  notifCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    flexDirection: "row",
    overflow: "hidden",
    elevation: 3,
    marginBottom: 20,
  },
  notifAccent: {
    width: 6,
    backgroundColor: COLORS.primary,
  },
  notifContent: {
    flex: 1,
    padding: 20,
  },
  notifHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  notifTag: {
    fontSize: 10,
    fontWeight: "bold",
    color: COLORS.primary,
    marginLeft: 6,
    letterSpacing: 1,
  },
  notifTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 8,
  },
  notifBody: {
    fontSize: 13,
    color: COLORS.textMuted,
    lineHeight: 20,
    marginBottom: 15,
  },
  notifActionBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  notifActionText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 8,
  },
});
