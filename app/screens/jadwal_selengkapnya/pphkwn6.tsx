import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Alert,
    Linking,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MK_MAROON = "#8B0000";
const MK_GOLD = "#D4AF37";
const MK_NAVY = "#002855";
const BACKGROUND_LIGHT = "#F8F9FA";
const TEXT_DARK = "#1A1A1A";
const TEXT_MUTED = "#6B7280";

const PPHKWN6: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const router = useRouter();

  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Tidak dapat membuka tautan.");
    });
  };

  const handleGoBack = () => {
    if (onBack) onBack();
    else router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerContainer}>
        <SafeAreaView edges={["top"]}>
          <View style={styles.navBar}>
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.navTitle}>DETAIL PENGUMUMAN</Text>
            <View style={{ width: 40 }} />
          </View>
        </SafeAreaView>
        <View style={styles.goldLineHeader} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.heroSection}>
          <View style={styles.badgeAngkatan}>
            <Text style={styles.badgeText}>ANGKATAN VI • TAHUN 2025</Text>
          </View>
          <Text style={styles.mainTitle}>
            Peningkatan Pemahaman Hak Konstitusional Warga Negara
          </Text>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={16} color={MK_GOLD} />
              <Text style={styles.metaText}>25 Juni 2025</Text>
            </View>
            <View style={styles.dividerMeta} />
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={16} color={MK_GOLD} />
              <Text style={styles.metaText}>17:33 WIB</Text>
            </View>
          </View>
        </View>
        <View style={styles.contentBody}>
          <View style={styles.highlightCard}>
            <View style={styles.iconCircleMaroon}>
              <MaterialCommunityIcons
                name="bank-outline"
                size={24}
                color={MK_MAROON}
              />
            </View>
            <Text style={styles.highlightText}>
              Pusat Pendidikan Pancasila dan Konstitusi{" "}
              <Text style={{ fontWeight: "800", color: MK_MAROON }}>
                Mahkamah Konstitusi RI
              </Text>{" "}
              resmi membuka pendaftaran bagi warga negara yang ingin mendalami
              hukum konstitusi.
            </Text>
          </View>
          <View style={styles.sectionBox}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionLine} />
              <Text style={styles.sectionTitle}>JADWAL PELAKSANAAN</Text>
            </View>
            <View style={styles.scheduleCard}>
              <Ionicons
                name="calendar"
                size={32}
                color={MK_GOLD}
                style={styles.scheduleIcon}
              />
              <View>
                <Text style={styles.dateRangeText}>01 – 31 Maret 2025</Text>
                <Text style={styles.dateSubText}>
                  Metode Pelaksanaan: Hybrid (Daring & Luring)
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.gridRow}>
            <View style={styles.gridItem}>
              <View style={styles.gridIconBox}>
                <Ionicons name="people-outline" size={22} color={MK_MAROON} />
              </View>
              <Text style={styles.gridLabel}>Target Peserta</Text>
              <Text style={styles.gridValue}>Mahasiswa, Praktisi & ASN</Text>
            </View>
            <View style={styles.gridItem}>
              <View style={styles.gridIconBox}>
                <Ionicons name="ribbon-outline" size={22} color={MK_MAROON} />
              </View>
              <Text style={styles.gridLabel}>Fasilitas</Text>
              <Text style={styles.gridValue}>Sertifikat Resmi & Modul</Text>
            </View>
          </View>
          <View style={styles.ctaContainer}>
            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={() =>
                Alert.alert(
                  "Informasi",
                  "Pendaftaran akan segera dibuka melalui portal resmi.",
                )
              }
            >
              <Text style={styles.btnText}>CEK LINK PENDAFTARAN</Text>
              <Ionicons name="chevron-forward" size={18} color="white" />
            </TouchableOpacity>
            <Text style={styles.noteText}>
              * Pastikan dokumen administrasi telah disiapkan.
            </Text>
          </View>
          <View style={styles.contactSection}>
            <Text style={styles.contactTitle}>Bantuan Informasi</Text>
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() =>
                handleLinkPress("mailto:pustik@mahkamahkonstitusi.go.id")
              }
            >
              <View style={styles.contactIconCircle}>
                <Ionicons name="mail" size={16} color="white" />
              </View>
              <Text style={styles.contactLink}>
                pustik@mahkamahkonstitusi.go.id
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() =>
                handleLinkPress("https://instagram.com/pustikmkri")
              }
            >
              <View
                style={[
                  styles.contactIconCircle,
                  { backgroundColor: "#E1306C" },
                ]}
              >
                <Ionicons name="logo-instagram" size={16} color="white" />
              </View>
              <Text style={styles.contactLink}>@pustikmkri</Text>
            </TouchableOpacity>
          </View>
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

  // Header
  headerContainer: {
    backgroundColor: MK_MAROON,
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  navTitle: {
    color: "white",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  goldLineHeader: {
    height: 4,
    backgroundColor: MK_GOLD,
  },

  scrollContent: {
    paddingBottom: 50,
  },
  heroSection: {
    backgroundColor: MK_MAROON,
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 45,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  badgeAngkatan: {
    backgroundColor: MK_GOLD,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginBottom: 15,
  },
  badgeText: {
    color: MK_MAROON,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },
  mainTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 32,
    marginBottom: 20,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  metaText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
    fontWeight: "500",
  },
  dividerMeta: {
    width: 1,
    height: 15,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  contentBody: {
    paddingHorizontal: 20,
    marginTop: -25,
  },

  highlightCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    elevation: 8,
    shadowColor: MK_MAROON,
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  iconCircleMaroon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFF0F0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFE0E0",
  },
  highlightText: {
    flex: 1,
    fontSize: 14,
    color: TEXT_DARK,
    lineHeight: 22,
  },

  sectionBox: {
    marginTop: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },
  sectionLine: {
    width: 4,
    height: 20,
    backgroundColor: MK_GOLD,
    borderRadius: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: MK_NAVY,
    letterSpacing: 1,
  },

  scheduleCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  scheduleIcon: {
    opacity: 0.9,
  },
  dateRangeText: {
    fontSize: 18,
    fontWeight: "800",
    color: MK_MAROON,
  },
  dateSubText: {
    fontSize: 12,
    color: TEXT_MUTED,
    marginTop: 2,
  },

  gridRow: {
    flexDirection: "row",
    gap: 15,
    marginTop: 20,
  },
  gridItem: {
    flex: 1,
    backgroundColor: "white",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  gridIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  gridLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: TEXT_MUTED,
    marginBottom: 4,
  },
  gridValue: {
    fontSize: 12,
    fontWeight: "800",
    color: MK_NAVY,
    textAlign: "center",
  },
  ctaContainer: {
    marginTop: 35,
    alignItems: "center",
  },
  btnPrimary: {
    backgroundColor: MK_MAROON,
    width: "100%",
    paddingVertical: 18,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    elevation: 5,
    shadowColor: MK_MAROON,
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  btnText: {
    color: "white",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1,
  },
  noteText: {
    fontSize: 11,
    color: MK_MAROON,
    fontStyle: "italic",
    marginTop: 12,
    fontWeight: "600",
  },
  contactSection: {
    marginTop: 40,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingTop: 25,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: MK_NAVY,
    marginBottom: 15,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 15,
  },
  contactIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: MK_NAVY,
    justifyContent: "center",
    alignItems: "center",
  },
  contactLink: {
    fontSize: 14,
    color: TEXT_DARK,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});

export default PPHKWN6;
