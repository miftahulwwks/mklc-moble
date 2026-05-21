// app/profile/change_password.tsx

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
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

function PasswordInput({ label, value, onChangeText, placeholder }) {
  const [isSecure, setIsSecure] = useState(true);

  return (
    <View style={formStyles.inputGroup}>
      <Text style={formStyles.label}>{label}</Text>
      <View style={formStyles.passwordContainer}>
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color={COLORS.primary}
          style={formStyles.inputIcon}
        />
        <TextInput
          style={formStyles.textInput}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#AAA"
          secureTextEntry={isSecure}
        />
        <TouchableOpacity
          onPress={() => setIsSecure(!isSecure)}
          style={formStyles.toggleButton}
        >
          <Ionicons
            name={isSecure ? "eye-off-outline" : "eye-outline"}
            size={20}
            color={COLORS.textMuted}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function ChangePassword() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdatePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Perhatian", "Semua kolom harus diisi!");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Gagal", "Password Baru dan Konfirmasi tidak cocok!");
      return;
    }

    Alert.alert("Berhasil", "Password Anda telah diperbarui.", [
      { text: "OK", onPress: () => router.back() },
    ]);
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
        <Text style={styles.pageTitle}>Ubah Password</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.infoBox}>
          <Ionicons
            name="shield-checkmark-outline"
            size={20}
            color={COLORS.gold}
          />
          <Text style={styles.infoText}>
            Gunakan minimal 8 karakter dengan kombinasi huruf dan angka untuk
            keamanan maksimal.
          </Text>
        </View>
        <View style={styles.card}>
          <PasswordInput
            label="Password Saat Ini"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Masukkan password lama"
          />

          <View style={styles.divider} />

          <PasswordInput
            label="Password Baru"
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Masukkan password baru"
          />

          <PasswordInput
            label="Ulangi Password Baru"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Ketik ulang password baru"
          />
        </View>

        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdatePassword}
          activeOpacity={0.8}
        >
          <Text style={styles.updateButtonText}>Perbarui Password</Text>
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBg,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textDark,
    fontWeight: "500",
  },
  toggleButton: {
    padding: 5,
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
    padding: 20,
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
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 20,
    marginTop: 5,
    opacity: 0.5,
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
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textMuted,
  },
});
