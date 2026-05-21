import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const COLORS = {
  primary: "#8B0000",
  textDark: "#1A1A1A",
  textMuted: "#666666",
  background: "#F8F9FA",
  card: "#FFFFFF",
  border: "#F0F0F0",
};

const SubHeading: React.FC<{ text: string }> = ({ text }) => (
  <Text style={styles.subHeading}>{text}</Text>
);

const Paragraph: React.FC<{ text: string }> = ({ text }) => (
  <Text style={styles.paragraph}>{text}</Text>
);

const ListItem: React.FC<{ number: string; text: string }> = ({
  number,
  text,
}) => (
  <View style={styles.listItem}>
    <View style={styles.listBullet}>
      <Text style={styles.listNumber}>{number}</Text>
    </View>
    <Text style={styles.listText}>{text}</Text>
  </View>
);

export default function Kebijakan() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/akun")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kebijakan Privasi</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.topInfo}>
          <Ionicons
            name="shield-checkmark-outline"
            size={40}
            color={COLORS.primary}
          />
          <Text style={styles.lastUpdate}>
            Terakhir diperbarui: 9 Desember 2025
          </Text>
        </View>

        <Paragraph text="Kebijakan Privasi ini menjelaskan bagaimana Mahkamah Konstitusi (MK) RI mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda yang dikumpulkan melalui Aplikasi Mobile MKLC. Kami berkomitmen penuh untuk menjaga kerahasiaan dan keamanan data pribadi Anda." />

        <View style={styles.divider} />

        <SubHeading text="1. Pengumpulan Informasi Pribadi" />
        <Paragraph text="Kami mengumpulkan dua jenis informasi mengenai Anda: (A) Informasi yang Anda berikan secara sukarela, dan (B) Informasi yang kami kumpulkan secara otomatis saat Anda menggunakan Aplikasi." />

        <Text style={styles.sectionTitle}>
          A. Informasi yang Disediakan Pengguna
        </Text>
        <ListItem
          number="1"
          text="Data Identitas (Nama Lengkap, NIK, Tempat/Tanggal Lahir) untuk verifikasi akun dan sertifikasi."
        />
        <ListItem
          number="2"
          text="Data Kontak (Alamat Email, Nomor Telepon, Alamat Rumah/Kantor) untuk komunikasi terkait pelatihan."
        />
        <ListItem
          number="3"
          text="Data Profil (Organisasi/Instansi, Jabatan, Foto Profil) untuk administrasi."
        />
        <ListItem
          number="4"
          text="Data Pembayaran untuk memproses transaksi. Kami tidak menyimpan detail kartu kredit/debit Anda."
        />

        <Text style={styles.sectionTitle}>
          B. Informasi yang Dikumpulkan Secara Otomatis
        </Text>
        <ListItem
          number="1"
          text="Informasi Perangkat: Jenis perangkat, sistem operasi, ID Perangkat Unik, dan pengaturan jaringan."
        />
        <ListItem
          number="2"
          text="Informasi Penggunaan Aplikasi: Modul yang dilihat, durasi kunjungan, dan fitur yang diakses."
        />
        <ListItem
          number="3"
          text="Data Teknis: Alamat IP (Internet Protocol) dan zona waktu."
        />

        <SubHeading text="2. Tujuan Penggunaan Data Anda" />
        <ListItem
          number="1"
          text="Memenuhi Perjanjian: Mengelola akun dan verifikasi identitas."
        />
        <ListItem
          number="2"
          text="Peningkatan Layanan: Menganalisis statistik penggunaan dan kualitas materi."
        />
        <ListItem
          number="3"
          text="Komunikasi: Menanggapi pertanyaan dan notifikasi jadwal."
        />
        <ListItem
          number="4"
          text="Keamanan dan Hukum: Mencegah penipuan dan mematuhi kewajiban hukum."
        />

        <SubHeading text="3. Keamanan Informasi" />
        <Paragraph text="Kami menerapkan pengamanan administratif, teknis, dan fisik yang wajar untuk melindungi data pribadi Anda. Namun, perlu diketahui bahwa tidak ada metode transmisi data yang 100% aman." />

        <SubHeading text="7. Informasi Kontak" />
        <View style={styles.contactCard}>
          <View style={styles.contactRow}>
            <Ionicons name="mail-outline" size={18} color={COLORS.primary} />
            <Text style={styles.contactText}>office@mkri.id</Text>
          </View>
          <View style={styles.contactRow}>
            <Ionicons name="call-outline" size={18} color={COLORS.primary} />
            <Text style={styles.contactText}>021 23529000</Text>
          </View>
          <View style={styles.contactRow}>
            <Ionicons
              name="location-outline"
              size={18}
              color={COLORS.primary}
            />
            <Text style={styles.contactText}>
              Jl. Medan Merdeka Barat No.6, Jakarta Pusat 10110
            </Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.card,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.textDark,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  topInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  lastUpdate: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 10,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.primary,
    marginTop: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textDark,
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: COLORS.background,
    padding: 8,
    borderRadius: 8,
  },
  paragraph: {
    fontSize: 14,
    color: COLORS.textMuted,
    lineHeight: 22,
    marginBottom: 10,
    textAlign: "justify",
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-start",
  },
  listBullet: {
    backgroundColor: COLORS.primary + "10",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  listNumber: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.primary,
  },
  listText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textMuted,
    lineHeight: 22,
  },
  contactCard: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 16,
    marginTop: 5,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  contactText: {
    fontSize: 14,
    color: COLORS.textDark,
    fontWeight: "500",
    flex: 1,
  },
});
