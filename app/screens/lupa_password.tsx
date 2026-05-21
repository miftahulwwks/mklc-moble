import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { height, width } = Dimensions.get("window");

const PRIMARY_TEXT_COLOR = "#FFFFFF";
const SECONDARY_TEXT_COLOR = "#E0E0E0";
const ACCENT_COLOR = "#000000";

export default function lupapassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Silakan masukkan alamat email Anda.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://192.168.1.XX:8000/api/forgot-password",
        {
          email: email,
        },
      );

      Alert.alert(
        "Berhasil",
        "Link reset password telah dikirim ke email Anda.",
      );
      router.push("/screens/login");
    } catch (error: any) {
      const msg = error.response?.data?.message || "Terjadi kesalahan sistem.";
      Alert.alert("Gagal", msg);
    } finally {
      setLoading(false);
    }
  };

  const BACKGROUND_IMAGE = require("../../assets/mkbg.jpg");

  return (
    <ImageBackground source={BACKGROUND_IMAGE} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topHeader}>
          <Text style={styles.appName}>Mahkamah Konstitusi</Text>
          <Text style={styles.appSubtitle}>LEARNING CENTER</Text>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.curveArea} />

          <View style={styles.formArea}>
            <Text style={styles.welcomeText}>Lupa Password</Text>
            <Text style={styles.instructionText}>
              Masukan email yang Anda telah daftarkan untuk mendapatkan link
              reset password
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#A0A0A0"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <TouchableOpacity
              style={[styles.resetButton, loading && { opacity: 0.7 }]}
              onPress={handleResetPassword}
              disabled={loading}
            >
              <Text style={styles.resetButtonText}>
                {loading ? "Mengirim..." : "Lupa Password"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.backLinkText}>
                Kembali ke <Text style={{ fontWeight: "bold" }}>Login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  topHeader: {
    position: "absolute",
    top: Platform.OS === "android" ? 30 : 50,
    left: 25,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: PRIMARY_TEXT_COLOR,
  },
  appSubtitle: {
    fontSize: 10,
    color: SECONDARY_TEXT_COLOR,
    letterSpacing: 2,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  curveArea: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: width,
    height: height * 0.6,
    backgroundColor: "white",
    borderTopRightRadius: width * 0.7,
  },
  formArea: {
    position: "absolute",
    bottom: 0,
    width: width,
    paddingHorizontal: 30,
    paddingTop: 50,
    paddingBottom: height * 0.15,
    backgroundColor: "transparent",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: ACCENT_COLOR,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 30,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    marginBottom: 25,
    paddingHorizontal: 15,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
    fontSize: 16,
    color: ACCENT_COLOR,
  },
  resetButton: {
    width: "100%",
    backgroundColor: "maroon",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backLinkText: {
    marginTop: 10,
    fontSize: 14,
    color: ACCENT_COLOR,
  },
});
