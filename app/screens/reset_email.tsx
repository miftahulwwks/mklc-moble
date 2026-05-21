// app/profile/change_email.tsx

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  primary: "#8B0000",
  gold: "#B8860B",
  background: "#F8F9FA",
  card: "#FFFFFF",
  textDark: "#1A1A1A",
  textMuted: "#666666",
  border: "#E0E0E0",
  inputBg: "#FDFDFD",
};

function EmailInput({
  label,
  value,
  onChangeText,
  placeholder,
  isReadOnly = false,
}) {
  return (
    <View style={formStyles.inputGroup}>
      <Text style={formStyles.label}>{label}</Text>
      <View
        style={[
          formStyles.inputWrapper,
          isReadOnly && formStyles.readOnlyWrapper,
        ]}
      >
        <Ionicons
          name="mail-outline"
          size={20}
          color={isReadOnly ? "#999" : COLORS.primary}
          style={formStyles.inputIcon}
        />
        <TextInput
          style={[formStyles.textInput, isReadOnly && formStyles.readOnlyInput]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#AAA"
          keyboardType="email-address"
          autoCapitalize="none"
          readOnly={isReadOnly}
        />
      </View>
    </View>
  );
}

export default function ChangeEmail() {
  const router = useRouter();
  const [currentEmail] = useState("user.aktif@mklc.id");
  const [newEmail, setNewEmail] = useState("");

  const handleUpdateEmail = () => {
    if (!newEmail) {
      alert("Email Baru harus diisi!");
      return;
    }
    alert(
      `Permintaan perubahan email ke ${newEmail} berhasil! Silakan cek kotak masuk email baru Anda.`,
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/akun")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Ubah Email Akun</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={20}
            color={COLORS.gold}
          />
          <Text style={styles.infoText}>
            Perubahan email memerlukan verifikasi ulang pada alamat email baru
            Anda.
          </Text>
        </View>

        <View style={styles.card}>
          <EmailInput
            label="Email Saat Ini"
            value={currentEmail}
            isReadOnly={true}
          />

          <EmailInput
            label="Email Baru"
            value={newEmail}
            onChangeText={setNewEmail}
            placeholder="Contoh: user@baru.com"
          />
        </View>

        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdateEmail}
          activeOpacity={0.8}
        >
          <Text style={styles.updateButtonText}>Simpan Perubahan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.push("/(tabs)/akun")}
        >
          <Text style={styles.cancelButtonText}>Batalkan</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const formStyles = StyleSheet.create({
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBg,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
  },
  readOnlyWrapper: {
    backgroundColor: "#F0F0F0",
    borderColor: "#E5E5E5",
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textDark,
    fontWeight: "500",
  },
  readOnlyInput: {
    color: COLORS.textMuted,
  },
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 65,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 5,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.textDark,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#FFF9E6",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#FFEBB0",
    alignItems: "center",
    gap: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: "#856404",
    lineHeight: 18,
  },
  card: {
    backgroundColor: COLORS.card,
    padding: 24,
    borderRadius: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  updateButton: {
    backgroundColor: COLORS.primary,
    height: 55,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  cancelButton: {
    marginTop: 15,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textMuted,
  },
});
