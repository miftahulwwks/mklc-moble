import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
  Image,
  PanResponder,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Sidebar from "../../components/Sidebar";

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
  danger: "#D32F2F",
};

export default function Akun() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const router = useRouter();
  const [profileImage, setProfileImage] = useState(
    require("../../assets/logo.png"),
  );

  const handleImagePick = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Izin Dibutuhkan", "Aplikasi memerlukan akses galeri.");
        return;
      }
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets) {
      setProfileImage({ uri: result.assets[0].uri });
    }
  };

  const handleLogout = () => {
    Alert.alert("Konfirmasi", "Apakah Anda yakin ingin keluar?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Keluar",
        onPress: () => router.replace("/screens/login"),
        style: "destructive",
      },
    ]);
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        gesture.dx > 20 && gesture.moveX < 25,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dx > 50) setOpenSidebar(true);
      },
    }),
  ).current;

  const MenuSection = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <View style={styles.menuGroup}>
      <View style={styles.sectionHeaderRow}>
        <View style={styles.miniGoldBar} />
        <Text style={styles.menuGroupTitle}>{title.toUpperCase()}</Text>
      </View>
      <View style={styles.menuListContainer}>{children}</View>
    </View>
  );

  const MenuItem = ({ title, icon, path, isLast, isLogout }: any) => (
    <TouchableOpacity
      style={[styles.menuItem, isLast && { borderBottomWidth: 0 }]}
      onPress={() => (isLogout ? handleLogout() : path && router.push(path))}
    >
      <View style={styles.itemContent}>
        <View
          style={[
            styles.iconWrapper,
            isLogout && { backgroundColor: "#FFF5F5" },
          ]}
        >
          <Ionicons
            name={icon}
            size={20}
            color={isLogout ? COLORS.danger : COLORS.primary}
          />
        </View>
        <Text
          style={[
            styles.menuText,
            isLogout && { color: COLORS.danger, fontWeight: "700" },
          ]}
        >
          {title}
        </Text>
      </View>
      {!isLogout && (
        <Ionicons name="chevron-forward" size={16} color={COLORS.border} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.fullScreen} {...panResponder.panHandlers}>
      <StatusBar barStyle="light-content" />
      <Sidebar open={openSidebar} onClose={() => setOpenSidebar(false)} />

      <View style={styles.headerContainer}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.darkPrimary]}
          style={styles.headerGradient}
        >
          <SafeAreaView edges={["top"]} style={styles.safeAreaHeader}>
            <View style={styles.headerContent}>
              <View style={styles.headerTitleGroup}>
                <View style={styles.goldBarHeader} />
                <View>
                  <Text style={styles.headerSubText}>PROFIL PENGGUNA</Text>
                  <Text style={styles.headerTitleText}>Akun Saya</Text>
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
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <TouchableOpacity
            onPress={handleImagePick}
            style={styles.avatarWrapper}
          >
            <Image source={profileImage} style={styles.avatar} />
            <View style={styles.editBadge}>
              <Ionicons name="camera" size={14} color="white" />
            </View>
          </TouchableOpacity>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>Mahkamah Konstitusi</Text>
            <Text style={styles.userEmail}>user.konstitusi@mkri.id</Text>
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={12} color={COLORS.gold} />
              <Text style={styles.verifiedText}>Akun Terverifikasi</Text>
            </View>
          </View>
        </View>

        <MenuSection title="Aktivitas Belajar">
          <MenuItem
            title="Riwayat Pembelajaran"
            icon="school-outline"
            path="/screens/riwayat_pembelajaran"
          />
          <MenuItem
            title="Bookmark Materi"
            icon="bookmark-outline"
            path="/screens/bookmark"
            isLast
          />
        </MenuSection>

        <MenuSection title="Pengaturan Keamanan">
          <MenuItem
            title="Ubah Data Diri"
            icon="person-outline"
            path="/screens/data_diri"
          />
          <MenuItem
            title="Ubah Password"
            icon="key-outline"
            path="/screens/reset_password"
          />
          <MenuItem
            title="Ubah Email"
            icon="at-outline"
            path="/screens/reset_email"
            isLast
          />
        </MenuSection>

        <MenuSection title="Dukungan">
          <MenuItem
            title="Kebijakan Privasi"
            icon="shield-checkmark-outline"
            path="/screens/menu_sidebar/kebijakan"
            isLast
          />
        </MenuSection>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.logoutButtonContainer}
          onPress={handleLogout}
        >
          <LinearGradient
            colors={["#FFF5F5", "#FFF0F0"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoutGradient}
          >
            <View style={styles.logoutContent}>
              <View style={styles.dangerIconWrapper}>
                <Ionicons name="log-out" size={20} color={COLORS.danger} />
              </View>
              <Text style={styles.logoutText}>Keluar dari Aplikasi</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#FED7D7" />
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.versionText}>
          Versi 2.0.4 • MKRI Learning Center
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  headerContainer: {
    marginBottom: 20,
  },
  headerGradient: {
    paddingBottom: 30,
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
  goldBarHeader: {
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

  profileCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginTop: -15,
    elevation: 10,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.1,
    shadowRadius: 15,
    marginBottom: 25,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: COLORS.background,
  },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.card,
  },
  profileInfo: {
    marginLeft: 20,
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.textDark,
  },
  userEmail: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: "#F0F9FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.gold,
    marginLeft: 4,
  },
  menuGroup: {
    marginBottom: 25,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingLeft: 5,
  },
  miniGoldBar: {
    width: 3,
    height: 14,
    backgroundColor: COLORS.gold,
    marginRight: 8,
    borderRadius: 10,
  },
  menuGroupTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: COLORS.primary,
    letterSpacing: 1,
  },
  menuListContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  menuText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  logoutButtonContainer: {
    marginTop: 5,
    borderRadius: 20,
    elevation: 4,
    shadowColor: COLORS.danger,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    backgroundColor: "white",
  },
  logoutGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#FED7D7",
  },
  logoutContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  dangerIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#FFE5E5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  logoutText: {
    color: COLORS.danger,
    fontWeight: "800",
    fontSize: 15,
    letterSpacing: 0.3,
  },
  versionText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: "600",
    letterSpacing: 0.5,
    opacity: 0.7,
  },
});
