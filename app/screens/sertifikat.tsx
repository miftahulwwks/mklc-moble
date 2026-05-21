import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system/legacy";
import { useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { captureRef } from "react-native-view-shot";

const { width } = Dimensions.get("window");

const COLORS = {
  MK_MAROON: "#800000",
  MK_GOLD: "#B8860B",
  BG_LIGHT: "#F2F2F2",
  TEXT_DARK: "#333",
  WHITE: "#FFF",
};

export default function CertificateScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("detail");
  const [isDownloading, setIsDownloading] = useState(false);
  const certRef = useRef<View>(null);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const uri = await captureRef(certRef, {
        format: "png",
        quality: 1,
        height: 1400, // High Res
      });

      const fileUri = `${FileSystem.documentDirectory}Sertifikat_MK.png`;
      await FileSystem.copyAsync({ from: uri, to: fileUri });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      }
    } catch (error) {
      Alert.alert("Error", "Gagal mengunduh sertifikat.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.replace("/(tabs)/home")}>
          <Ionicons name="arrow-back" size={24} color={COLORS.WHITE} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDownload} disabled={isDownloading}>
          {isDownloading ? (
            <ActivityIndicator color={COLORS.WHITE} />
          ) : (
            <Ionicons name="download" size={24} color={COLORS.WHITE} />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View ref={certRef} collapsable={false} style={styles.certCanvas}>
          <View style={styles.certBorder}>
            <View
              style={[
                styles.corner,
                { top: 5, left: 5, borderTopWidth: 2, borderLeftWidth: 2 },
              ]}
            />
            <View
              style={[
                styles.corner,
                { top: 5, right: 5, borderTopWidth: 2, borderRightWidth: 2 },
              ]}
            />
            <View
              style={[
                styles.corner,
                {
                  bottom: 5,
                  left: 5,
                  borderBottomWidth: 2,
                  borderLeftWidth: 2,
                },
              ]}
            />
            <View
              style={[
                styles.corner,
                {
                  bottom: 5,
                  right: 5,
                  borderBottomWidth: 2,
                  borderRightWidth: 2,
                },
              ]}
            />

            <View style={styles.certHeader}>
              <Image
                source={require("../../assets/logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.instansiName}>MAHKAMAH KONSTITUSI</Text>
              <Text style={styles.negaraName}>REPUBLIK INDONESIA</Text>
            </View>

            <Text style={styles.titleSertifikat}>SERTIFIKAT</Text>
            <Text style={styles.nomorSertifikat}>No. 123.123-MK/12/2025</Text>

            <Text style={styles.labelSebagai}>sebagai Peserta</Text>
            <Text style={styles.namaPenerima}>
              PUSAT PENDIDIKAN PANCASILA DAN KONSTITUSI
            </Text>

            <Text style={styles.descSertifikat}>
              Atas partisipasinya dalam kegiatan Peningkatan Pemahaman Hak
              Konstitusional Warga Negara.
            </Text>

            <View style={styles.footerSertifikat}>
              <View>
                <Text style={styles.signerName}>
                  Dr. Heru Setiawan, S.E., M.Si.
                </Text>
                <View style={styles.line} />
                <Text style={styles.signerTitle}>Sekretaris Jenderal</Text>
              </View>
              <Image
                source={require("../../assets/qrcode.png")}
                style={styles.qr}
              />
            </View>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === "detail" && styles.tabActive]}
            onPress={() => setActiveTab("detail")}
          >
            <Text
              style={[
                styles.tabLabel,
                activeTab === "detail" && { color: COLORS.WHITE },
              ]}
            >
              Detail Kegiatan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === "materi" && styles.tabActive]}
            onPress={() => setActiveTab("materi")}
          >
            <Text
              style={[
                styles.tabLabel,
                activeTab === "materi" && { color: COLORS.WHITE },
              ]}
            >
              Materi Pelatihan
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentArea}>
          {activeTab === "detail" ? (
            <>
              <InfoCard
                label="Lembaga Penyelenggara"
                value="Mahkamah Konstitusi Republik Indonesia"
              />
              <InfoCard
                label="Penandatangan"
                value="Sekretaris Jenderal Mahkamah Konstitusi"
                valueBold="Dr. Heru Setiawan, S.E., M.Si."
              />
              <InfoCard
                label="Tanggal Terbit"
                value="Jakarta, 10 Desember 2025"
              />
            </>
          ) : (
            <View style={styles.card}>
              <Text
                style={{
                  fontWeight: "700",
                  color: COLORS.MK_MAROON,
                  marginBottom: 10,
                }}
              >
                Kurikulum Pembelajaran
              </Text>
              <MateriRow no="1" title="Hukum Acara MK" jp="2 JP" />
              <MateriRow no="2" title="Konstitusionalisme" jp="4 JP" />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const InfoCard = ({ label, value, valueBold }: any) => (
  <View style={styles.card}>
    <View style={styles.cardAccent} />
    <View style={{ flex: 1 }}>
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={styles.cardValue}>{value}</Text>
      {valueBold && <Text style={styles.cardValueBold}>{valueBold}</Text>}
    </View>
  </View>
);

const MateriRow = ({ no, title, jp }: any) => (
  <View style={styles.materiRow}>
    <Text style={styles.materiNo}>{no}</Text>
    <Text style={styles.materiTitle}>{title}</Text>
    <Text style={styles.materiJp}>{jp}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG_LIGHT,
  },

  navBar: {
    height: 100,
    backgroundColor: COLORS.MK_MAROON,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  certCanvas: {
    backgroundColor: COLORS.WHITE,
    margin: 15,
    padding: 15,
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },

  certBorder: {
    borderWidth: 1,
    borderColor: COLORS.MK_GOLD,
    padding: 20,
    alignItems: "center",
  },

  corner: {
    position: "absolute",
    width: 25,
    height: 25,
    borderColor: COLORS.MK_GOLD,
  },

  certHeader: {
    alignItems: "center",
    marginBottom: 15,
  },

  logo: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },

  instansiName: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.MK_MAROON,
  },

  negaraName: {
    fontSize: 10,
    fontWeight: "600",
  },

  titleSertifikat: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.TEXT_DARK,
    marginTop: 10,
    letterSpacing: 2,
  },

  nomorSertifikat: {
    fontSize: 10,
    color: "red",
    marginBottom: 15,
  },

  labelSebagai: {
    fontSize: 11,
    fontStyle: "italic",
    color: COLORS.MUTED,
  },

  namaPenerima: {
    fontSize: 18,
    fontWeight: "800",
    marginVertical: 8,
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },

  descSertifikat: {
    fontSize: 10,
    textAlign: "center",
    lineHeight: 16,
    paddingHorizontal: 10,
  },

  footerSertifikat: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 25,
    alignItems: "flex-end",
  },

  signerName: {
    fontSize: 11,
    fontWeight: "700",
  },

  line: {
    height: 1,
    backgroundColor: "#000",
    marginVertical: 3,
  },

  signerTitle: {
    fontSize: 9,
  },

  qr: {
    width: 45,
    height: 45,
  },

  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 15,
    backgroundColor: "#DDD",
    borderRadius: 8,
    padding: 4,
  },

  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 6,
  },

  tabActive: {
    backgroundColor: COLORS.MK_MAROON,
  },

  tabLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.TEXT_DARK,
  },

  contentArea: {
    padding: 15,
  },

  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  cardAccent: {
    width: 4,
    height: "100%",
    backgroundColor: COLORS.MK_MAROON,
    borderRadius: 2,
    marginRight: 15,
  },

  cardLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.MK_MAROON,
    marginBottom: 2,
  },

  cardValue: {
    fontSize: 13,
    color: COLORS.TEXT_DARK,
  },

  cardValueBold: {
    fontSize: 14,
    fontWeight: "800",
    marginTop: 3,
  },

  materiRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    paddingVertical: 8,
  },

  materiNo: {
    width: 25,
    fontWeight: "700",
  },

  materiTitle: {
    flex: 1,
    fontSize: 12,
  },

  materiJp: {
    fontWeight: "700",
    color: COLORS.MK_GOLD,
  },
});
