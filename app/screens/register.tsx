import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { height, width } = Dimensions.get("window");
const MK_MAROON = "#8B0000";

export default function Register() {
  const router = useRouter();
  const BACKGROUND_IMAGE = require("../../assets/mkbg.jpg");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  return (
    <ImageBackground source={BACKGROUND_IMAGE} style={styles.background}>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.flex1}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              bounces={false}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.headerArea}>
                <Text style={styles.appName}>Mahkamah Konstitusi</Text>
                <Text style={styles.appSubtitle}>LEARNING CENTER</Text>
              </View>

              <View style={styles.formCard}>
                <Text style={styles.welcomeText}>Daftar Akun</Text>
                <Text style={styles.subWelcome}>
                  Lengkapi data diri untuk akses penuh
                </Text>

                <View style={styles.inputGroup}>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color="#666"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Nama Lengkap"
                    placeholderTextColor="#A0A0A0"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color="#666"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#A0A0A0"
                    keyboardType="email-address"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#666"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#A0A0A0"
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color="#666"
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.inputGroup}>
                  <Ionicons
                    name="shield-checkmark-outline"
                    size={20}
                    color="#666"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Konfirmasi Password"
                    placeholderTextColor="#A0A0A0"
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={
                        showConfirmPassword ? "eye-outline" : "eye-off-outline"
                      }
                      size={20}
                      color="#666"
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.signUpButton}
                  onPress={() => router.push("/screens/login")}
                >
                  <Text style={styles.signUpButtonText}>DAFTAR SEKARANG</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push("/screens/login")}>
                  <Text style={styles.signInLinkText}>
                    Sudah punya akun?{" "}
                    <Text style={styles.loginBold}>Login</Text>
                  </Text>
                </TouchableOpacity>

                <View style={styles.footerSpace} />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  container: {
    flex: 1,
  },
  flex1: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  headerArea: {
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 40,
    flex: 1,
    justifyContent: "center",
  },
  appName: {
    fontSize: 26,
    fontWeight: "900",
    color: "#FFF",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: {
      width: -1,
      height: 1,
    },
    textShadowRadius: 10,
  },
  appSubtitle: {
    fontSize: 11,
    color: "#EEE",
    letterSpacing: 4,
    fontWeight: "600",
  },
  formCard: {
    backgroundColor: "white",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 30,
    paddingTop: 35,
    paddingBottom: 30,
    width: width,
    elevation: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  subWelcome: {
    fontSize: 13,
    color: "#666",
    marginBottom: 25,
    marginTop: 5,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 15,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 55,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },
  eyeIcon: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpButton: {
    backgroundColor: MK_MAROON,
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: MK_MAROON,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 1,
  },
  signInLinkText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 14,
    color: "#666",
  },
  loginBold: {
    color: MK_MAROON,
    fontWeight: "800",
  },
  footerSpace: {
    height: 20,
  },
});
