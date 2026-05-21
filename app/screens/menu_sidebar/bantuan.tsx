import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  LayoutAnimation,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const COLORS = {
  primary: "#8B0000",
  gold: "#B8860B",
  background: "#F8F9FA",
  card: "#FFFFFF",
  textDark: "#1A1A1A",
  textMuted: "#666666",
  border: "#E0E0E0",
  whatsapp: "#25D366",
};

const faqData = [
  {
    category: "Akun & Profil",
    icon: "person-circle-outline",
    questions: [
      {
        q: "Apakah pelatihan MKLC bisa diikuti secara online?",
        a: "Pelatihan dapat diikuti secara online dan offline sesuai ketentuan tema pelatihan. Gunakan fitur filter di halaman Pendidikan untuk mencari metode yang spesifik.",
      },
      {
        q: "Bagaimana teknis pembelajaran MKLC?",
        a: "Online: Melalui video modul, bahan ajar, dan kuis.\nOffline: Tatap muka di lokasi yang ditentukan (seperti Pusdik MK) dengan sesi diskusi interaktif.",
      },
    ],
  },
  {
    category: "Jenis Pembelajaran",
    icon: "school-outline",
    questions: [
      {
        q: "Apa perbedaan Bimtek dan PPHKWN?",
        a: "Bimtek berfokus pada prosedur hukum praktis (Hukum Acara MK), sedangkan PPHKWN berfokus pada pemahaman hak konstitusional warga negara.",
      },
    ],
  },
];

const WHATSAPP_NUMBER = "+6288902987642";

const handleWhatsAppPress = () => {
  const url = `whatsapp://send?phone=${WHATSAPP_NUMBER}&text=Halo, saya ingin bertanya tentang layanan MKLC.`;
  Linking.openURL(url).catch(() => {
    Linking.openURL(`https://wa.me/${WHATSAPP_NUMBER}`);
  });
};

const AccordionItem = ({ q, a }: { q: string; a: string }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={accordionStyles.itemContainer}>
      <TouchableOpacity
        onPress={toggleExpansion}
        style={accordionStyles.questionHeader}
        activeOpacity={0.7}
      >
        <Text style={accordionStyles.questionText}>{q}</Text>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={20}
          color={COLORS.primary}
        />
      </TouchableOpacity>
      {expanded && (
        <View style={accordionStyles.answerContent}>
          <Text style={accordionStyles.answerText}>{a}</Text>
        </View>
      )}
    </View>
  );
};

const CategorySection = ({ category, icon, questions }: any) => (
  <View style={styles.faqSection}>
    <View style={styles.sectionTitleContainer}>
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={20} color={COLORS.primary} />
      </View>
      <Text style={styles.sectionTitle}>{category}</Text>
    </View>
    {questions.map((item: any, index: number) => (
      <AccordionItem key={index} {...item} />
    ))}
  </View>
);

export default function Bantuan() {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const filteredFaq = faqData
    .map((cat) => ({
      ...cat,
      questions: cat.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchText.toLowerCase()) ||
          q.a.toLowerCase().includes(searchText.toLowerCase()),
      ),
    }))
    .filter((cat) => cat.questions.length > 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/home")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.mainTitle}>Pusat Bantuan</Text>
          <Text style={styles.subtitle}>
            Temukan jawaban atas pertanyaan Anda
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.searchWrapper}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={COLORS.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Cari bantuan..."
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText("")}>
                <Ionicons name="close-circle" size={20} color="#CCC" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {filteredFaq.length > 0 ? (
          filteredFaq.map((item, index) => (
            <CategorySection key={index} {...item} />
          ))
        ) : (
          <View style={styles.noResultContainer}>
            <Ionicons name="search-outline" size={60} color="#DDD" />
            <Text style={styles.noResultText}>Pencarian tidak ditemukan</Text>
          </View>
        )}
        <View style={styles.contactContainer}>
          <Text style={styles.sectionTitleContact}>
            Butuh Bantuan Lebih Lanjut?
          </Text>
          <View style={contactStyles.card}>
            <View style={contactStyles.infoRow}>
              <Ionicons name="mail-outline" size={20} color={COLORS.primary} />
              <Text style={contactStyles.infoText}>office@mkri.id</Text>
            </View>
            <View style={contactStyles.infoRow}>
              <Ionicons
                name="location-outline"
                size={20}
                color={COLORS.primary}
              />
              <Text style={contactStyles.infoText}>
                Jl. Medan Merdeka Barat No.6, Jakarta
              </Text>
            </View>

            <TouchableOpacity
              style={contactStyles.whatsappButton}
              onPress={handleWhatsAppPress}
            >
              <Ionicons name="logo-whatsapp" size={22} color="#FFF" />
              <Text style={contactStyles.whatsappText}>
                Hubungi Customer Service
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.copyrightContainer}>
          <Text style={styles.copyrightText}>
            © 2026 Mahkamah Konstitusi Learning Center
          </Text>
        </View>
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    marginRight: 15,
  },
  headerTextContainer: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.textDark,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  content: {
    paddingBottom: 40,
  },
  searchWrapper: {
    padding: 20,
    backgroundColor: COLORS.card,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: COLORS.textDark,
  },
  faqSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary + "10",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.textDark,
  },
  sectionTitleContact: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.textDark,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  contactContainer: {
    marginTop: 30,
  },
  copyrightContainer: {
    marginTop: 40,
    alignItems: "center",
    paddingBottom: 20,
  },
  copyrightText: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  noResultContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  noResultText: {
    color: "#999",
    marginTop: 10,
    fontSize: 14,
  },
});

const accordionStyles = StyleSheet.create({
  itemContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  questionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  questionText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textDark,
    lineHeight: 20,
  },
  answerContent: {
    padding: 16,
    paddingTop: 0,
    backgroundColor: "#FCFCFC",
  },
  answerText: {
    fontSize: 13,
    color: COLORS.textMuted,
    lineHeight: 20,
    textAlign: "justify",
  },
});

const contactStyles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    gap: 12,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textDark,
    fontWeight: "500",
  },
  whatsappButton: {
    flexDirection: "row",
    backgroundColor: COLORS.whatsapp,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  whatsappText: {
    color: "#FFF",
    fontWeight: "800",
    fontSize: 14,
    marginLeft: 8,
  },
});
