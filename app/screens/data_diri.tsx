import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const COLORS = {
  primary: "#8B0000",
  backgroundLight: "#F5F6FA",
  card: "#FFFFFF",
  textDark: "#222222",
  textMuted: "#666666",
  border: "#E0E0E0",
};

const GENDER_OPTIONS = ["Laki-Laki", "Perempuan"];
const EDUCATION_OPTIONS = ["SD", "SMP", "SMA", "D3", "D4", "S1", "S2", "S3"];
const JOB_OPTIONS = [
  "BELUM/TIDAK BEKERJA",
  "PEGAWAI NEGERI SIPIL",
  "TENTARA NASIONAL INDONESIA",
  "KEPOLISIAN RI",
  "KARYAWAN BUMN",
  "KARYAWAN SWASTA",
  "WIRASWASTA",
  "LAINNYA",
];

const LOCATION_OPTIONS = {
  PROVINCES: [
    { label: "31 - DKI JAKARTA" },
    { label: "32 - JAWA BARAT" },
    { label: "33 - JAWA TENGAH" },
    { label: "34 - DI YOGYAKARTA" },
    { label: "35 - JAWA TIMUR" },
    { label: "36 - BANTEN" },
    { label: "37 - BALI" },
    { label: "38 - NUSA TENGGARA BARAT" },
    { label: "39 - NUSA TENGGARA TIMUR" },
    { label: "40 - KALIMANTAN BARAT" },
    { label: "41 - KALIMANTAN TENGAH" },
    { label: "42 - KALIMANTAN SELATAN" },
  ],
  CITIES: [
    { label: "33.74 - KOTA SEMARANG" },
    { label: "33.02 - KOTA PURWOKERTO" },
    { label: "33.02 - KAB. BANYUMAS" },
    { label: "33.15 - KAB. JEPARA" },
    { label: "33.16 - KAB. KARANGANYAR" },
    { label: "33.17 - KAB. KEBUMEN" },
    { label: "33.18 - KAB. KENDAL" },
    { label: "33.19 - KAB. KLATEN" },
    { label: "33.20 - KAB. KUDUS" },
  ],
  DISTRICTS: [
    { label: "33.02.26 - Purwokerto Timur" },
    { label: "33.02.27 - Purwokerto Barat" },
    { label: "33.02.03 - Sumpiuh" },
    { label: "33.02.04 - Banyumas" },
    { label: "33.02.05 - Karanganyar" },
    { label: "33.02.06 - Purwokerto Selatan" },
    { label: "33.02.07 - Purwokerto Utara" },
    { label: "33.02.08 - Pabuaran" },
    { label: "33.02.09 - Sokaraja " },
  ],

  VILLAGES: [
    { label: "33.02.03.2001 - Gunung Wetan" },
    { label: "33.02.03.2002 - Karang Klesem" },
    { label: "33.02.03.2003 - Kedung Banteng" },
    { label: "33.02.03.2004 - Kebakalan" },
    { label: "33.02.03.2005 - Kebon Dalem" },
    { label: "33.02.03.2006 - Kedungbenda" },
    { label: "33.02.03.2007 - Karangmangu" },
    { label: "33.02.03.2008 - Karanganyar" },
    { label: "33.02.03.2009 - Kepanjen" },
  ],
};

export default function DataDiri() {
  const router = useRouter();

  const [nik] = useState("3302xxxxxxxxxxxx");
  const [namaLengkap, setNamaLengkap] = useState("Mahkamah Konstitusi");
  const [gelarDepan, setGelarDepan] = useState("");
  const [gelarBelakang, setGelarBelakang] = useState("");
  const [tempatLahir, setTempatLahir] = useState("Jakarta");
  const [tanggalLahir, setTanggalLahir] = useState("16/08/1945");
  const [jenisKelamin, setJenisKelamin] = useState("Laki-Laki");
  const [pendidikan, setPendidikan] = useState("S3");
  const [pekerjaan, setPekerjaan] = useState("PEGAWAI NEGERI SIPIL");
  const [instansi, setInstansi] = useState("Pusat Pendidikan Pancasila");
  const [noHp, setNoHp] = useState("081234567890");
  const [alamatLengkap, setAlamatLengkap] = useState(
    "Jl. Medan Merdeka Barat No. 6",
  );
  const [provinsi, setProvinsi] = useState(LOCATION_OPTIONS.PROVINCES[0].label);
  const [kabKota, setKabKota] = useState(LOCATION_OPTIONS.CITIES[0].label);
  const [kecamatan, setKecamatan] = useState(
    LOCATION_OPTIONS.DISTRICTS[0].label,
  );
  const [desaKelurahan, setDesaKelurahan] = useState(
    LOCATION_OPTIONS.VILLAGES[0].label,
  );
  const [email] = useState("mahkamahkonstitusi@gmail.com");

  const [modalVisible, setModalVisible] = useState(false);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [currentField, setCurrentField] = useState("");

  const openDropdown = (field, options) => {
    const list = options.map((opt) =>
      typeof opt === "string" ? opt : opt.label,
    );
    setCurrentField(field);
    setCurrentOptions(list);
    setModalVisible(true);
  };

  const handleSelect = (item) => {
    if (currentField === "Jenis Kelamin") setJenisKelamin(item);
    else if (currentField === "Pendidikan Terakhir") setPendidikan(item);
    else if (currentField === "Pekerjaan") setPekerjaan(item);
    else if (currentField === "Provinsi") setProvinsi(item);
    else if (currentField === "Kabupaten/Kota") setKabKota(item);
    else if (currentField === "Kecamatan") setKecamatan(item);
    else if (currentField === "Desa/Kelurahan") setDesaKelurahan(item);
    setModalVisible(false);
  };

  const CustomInput = ({ label, value, onChangeText, editable = true }) => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[styles.input, !editable && styles.inputDisabled]}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        placeholderTextColor={COLORS.textMuted}
      />
    </View>
  );

  const CustomSelect = ({ label, value, onPress }) => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TouchableOpacity style={styles.selectBox} onPress={onPress}>
        <Text style={styles.selectText}>{value}</Text>
        <Ionicons name="chevron-down" size={18} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/akun")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Ubah Data Diri</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Data Kependudukan</Text>
        <View style={styles.card}>
          <CustomInput label="NIK" value={nik} editable={false} />
          <CustomInput
            label="Nama Lengkap"
            value={namaLengkap}
            onChangeText={setNamaLengkap}
          />
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <CustomInput
                label="Gelar Depan"
                value={gelarDepan}
                onChangeText={setGelarDepan}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <CustomInput
                label="Gelar Belakang"
                value={gelarBelakang}
                onChangeText={setGelarBelakang}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <CustomInput
                label="Tempat Lahir"
                value={tempatLahir}
                onChangeText={setTempatLahir}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <CustomInput
                label="Tgl Lahir"
                value={tanggalLahir}
                onChangeText={setTanggalLahir}
              />
            </View>
          </View>
          <CustomSelect
            label="Jenis Kelamin"
            value={jenisKelamin}
            onPress={() => openDropdown("Jenis Kelamin", GENDER_OPTIONS)}
          />
        </View>

        <Text style={styles.sectionTitle}>Pendidikan & Pekerjaan</Text>
        <View style={styles.card}>
          <CustomSelect
            label="Pendidikan Terakhir"
            value={pendidikan}
            onPress={() =>
              openDropdown("Pendidikan Terakhir", EDUCATION_OPTIONS)
            }
          />
          <CustomSelect
            label="Pekerjaan"
            value={pekerjaan}
            onPress={() => openDropdown("Pekerjaan", JOB_OPTIONS)}
          />
          <CustomInput
            label="Instansi"
            value={instansi}
            onChangeText={setInstansi}
          />
        </View>

        <Text style={styles.sectionTitle}>Kontak & Alamat</Text>
        <View style={styles.card}>
          <CustomInput
            label="No Handphone"
            value={noHp}
            onChangeText={setNoHp}
          />
          <CustomInput label="Email" value={email} editable={false} />
          <CustomInput
            label="Alamat Lengkap"
            value={alamatLengkap}
            onChangeText={setAlamatLengkap}
          />
          <CustomSelect
            label="Provinsi"
            value={provinsi}
            onPress={() => openDropdown("Provinsi", LOCATION_OPTIONS.PROVINCES)}
          />
          <CustomSelect
            label="Kabupaten/Kota"
            value={kabKota}
            onPress={() =>
              openDropdown("Kabupaten/Kota", LOCATION_OPTIONS.CITIES)
            }
          />
          <CustomSelect
            label="Kecamatan"
            value={kecamatan}
            onPress={() =>
              openDropdown("Kecamatan", LOCATION_OPTIONS.DISTRICTS)
            }
          />
          <CustomSelect
            label="Desa/Kelurahan"
            value={desaKelurahan}
            onPress={() =>
              openDropdown("Desa/Kelurahan", LOCATION_OPTIONS.VILLAGES)
            }
          />
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => Alert.alert("Sukses", "Data berhasil disimpan")}
        >
          <Text style={styles.saveButtonText}>UPDATE DATA DIRI</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>

      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Pilih {currentField}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={COLORS.textDark} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={currentOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textDark,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.primary,
    marginBottom: 8,
    marginTop: 10,
    textTransform: "uppercase",
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#F9F9F9",
    padding: 12,
    borderRadius: 8,
    fontSize: 15,
    color: COLORS.textDark,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputDisabled: {
    backgroundColor: "#ECECEC",
    color: COLORS.textMuted,
  },
  selectBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectText: {
    fontSize: 15,
    color: COLORS.textDark,
  },
  row: {
    flexDirection: "row",
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#FFF",
    fontWeight: "800",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 30,
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  optionItem: {
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  optionText: {
    fontSize: 15,
  },
});
