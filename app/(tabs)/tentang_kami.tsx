import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
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
};

const whyMklcList = [
  {
    title: "Wawasan Komprehensif",
    description:
      "Meningkatkan pemahaman mendalam mengenai konstitusi Indonesia.",
    icon: "bulb-outline",
  },
  {
    title: "Belajar Mandiri",
    description: "Akses materi kapan saja dan di mana saja sesuai ritme Anda.",
    icon: "time-outline",
  },
  {
    title: "Materi Terakreditasi",
    description:
      "Kurikulum dirancang langsung oleh Ahli Konstitusi Mahkamah Konstitusi.",
    icon: "shield-checkmark-outline",
  },
  {
    title: "Sertifikat Digital",
    description:
      "Sertifikat resmi yang dapat diunduh langsung setelah menyelesaikan kelas.",
    icon: "ribbon-outline",
  },
];

export default function TentangKami() {
  const [openSidebar, setOpenSidebar] = useState(false);

  function WhyMklcCard({ title, description, icon }: (typeof whyMklcList)[0]) {
    return (
      <TouchableOpacity style={styles.benefitCard} activeOpacity={0.8}>
        <View style={styles.benefitIconBox}>
          <Ionicons name={icon as any} size={24} color={COLORS.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.benefitTitle}>{title}</Text>
          <Text style={styles.benefitDescription}>{description}</Text>
        </View>
        <View style={styles.miniGoldDot} />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.fullScreen}>
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
                  <Text style={styles.headerSubText}>PROFIL LEMBAGA</Text>
                  <Text style={styles.headerTitleText}>Tentang Kami</Text>
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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.heroCard}>
          <Text style={styles.heroSubtitle}>
            Mahkamah Konstitusi Learning Center
          </Text>
          <Text style={styles.heroTitle}>
            Pusat Inovasi dan Edukasi Konstitusi
          </Text>
          <View style={styles.goldDivider} />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>LATAR BELAKANG</Text>
        </View>
        <View style={styles.historyContainer}>
          <ScrollView
            style={styles.historyScrollView}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.historyTextPadding}
          >
            <Text style={styles.sectionText}>
              Penyebarluasan atau diseminasi hak-hak konstitusional warga negara
              (HKWN) sangat penting untuk memastikan setiap individu memahami
              dan dapat menuntut serta mempertahankan hak-hak mereka yang
              dijamin oleh konstitusi.
            </Text>
            <Text style={styles.sectionText}>
              Sebagaimana tertuang dalam salah satu misi Mahkamah Konstitusi
              adalah Meningkatkan kesadaran berkonstitusi warga negara dan
              penyelenggara negara. Mahkamah Konstitusi memiliki komitmen untuk
              membangun kesadaran berkonstitusi warga negara serta penyelenggara
              negara dalam kehidupan berbangsa dan bernegara.
            </Text>
            <Text style={styles.sectionText}>
              Melalui E-Learning yang telah dikembangkan diharapkan dapat
              memberikan kemudahan akses bagi warga negara dalam meningkatkan
              pemahaman terkait hak-hak warga negara yang tertuang dalam
              konstitusi secara komprehensif.
            </Text>
          </ScrollView>
        </View>

        <View style={[styles.sectionHeader, { marginTop: 10 }]}>
          <Text style={styles.sectionTitle}>KEUNGGULAN BELAJAR</Text>
        </View>
        <View style={styles.whyMklcContainer}>
          {whyMklcList.map((item, index) => (
            <WhyMklcCard key={index} {...item} />
          ))}
        </View>
        <View style={styles.footerBranding}>
          <Text style={styles.footerText}>MAHKAMAH KONSTITUSI</Text>
          <Text style={styles.footerSubText}>REPUBLIK INDONESIA</Text>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 10,
  },
  headerGradient: {
    paddingBottom: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
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
  heroCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  heroSubtitle: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.textDark,
    marginTop: 8,
    lineHeight: 30,
  },
  goldDivider: {
    width: 50,
    height: 4,
    backgroundColor: COLORS.gold,
    marginTop: 15,
    borderRadius: 2,
  },
  sectionHeader: {
    marginBottom: 15,
    paddingLeft: 5,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "900",
    color: COLORS.primary,
    letterSpacing: 1.2,
  },
  historyContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    height: 280,
    overflow: "hidden",
    borderLeftWidth: 5,
    borderLeftColor: COLORS.gold,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    marginBottom: 25,
  },
  historyScrollView: {
    flex: 1,
  },
  historyTextPadding: {
    padding: 20,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 24,
    color: COLORS.textDark,
    marginBottom: 16,
    textAlign: "justify",
    opacity: 0.8,
  },
  whyMklcContainer: {
    gap: 12,
  },
  benefitCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  benefitIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  benefitTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.textDark,
  },
  benefitDescription: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 4,
    lineHeight: 18,
  },
  miniGoldDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.gold,
    marginLeft: 10,
  },
  footerBranding: {
    alignItems: "center",
    marginTop: 40,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 20,
  },
  footerText: {
    fontSize: 16,
    fontWeight: "900",
    color: COLORS.primary,
    letterSpacing: 1,
  },
  footerSubText: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: "600",
    marginTop: 4,
  },
});
