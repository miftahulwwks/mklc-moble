import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const PRIMARY_MAROON = "#8B0000";
const SECONDARY_DARK = "#333333";
const LIGHT_BACKGROUND = "#FFFFFF";
const GOLD_ACCENT = "#FFD700";
const INPUT_BACKGROUND = "#F8F8F8";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const logoAnim = useRef(new Animated.Value(0)).current;
  const formAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(formAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = () => {
    router.replace("/(tabs)/home");
  };

  const handleRegisterNavigate = () => {
    router.push("/screens/register");
  };

  const handleForgotPasswordNavigate = () => {
    router.push("/screens/lupa_password");
  };

  return (
    <ImageBackground
      source={require("../../assets/mkbg.jpg")}
      style={styles.background}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.overlay}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            bounces={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <SafeAreaView style={styles.headerSafe}>
              <Animated.View
                style={[
                  styles.topHeader,
                  {
                    opacity: logoAnim,
                    transform: [
                      {
                        translateY: logoAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-20, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Text style={styles.appName}>MAHKAMAH KONSTITUSI</Text>
                <Text style={styles.appSubtitle}>LEARNING CENTER</Text>
              </Animated.View>
            </SafeAreaView>

            <Animated.View
              style={[
                styles.formWrapper,
                {
                  opacity: formAnim,
                  transform: [
                    {
                      translateY: formAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [40, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <View style={styles.formContent}>
                <Text style={styles.welcomeText}>Selamat Datang</Text>
                <Text style={styles.loginInstruction}>
                  Silakan masuk untuk melanjutkan pembelajaran.
                </Text>

                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color={PRIMARY_MAROON}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#A0A0A0"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color={PRIMARY_MAROON}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#A0A0A0"
                    secureTextEntry={!isPasswordVisible}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={
                        isPasswordVisible ? "eye-outline" : "eye-off-outline"
                      }
                      size={20}
                      color="#A0A0A0"
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.optionsRow}>
                  <TouchableOpacity
                    style={styles.rememberMeContainer}
                    onPress={() => setRememberMe(!rememberMe)}
                  >
                    <Ionicons
                      name={rememberMe ? "checkbox" : "square-outline"}
                      size={18}
                      color={rememberMe ? PRIMARY_MAROON : "#A0A0A0"}
                    />
                    <Text style={styles.rememberMeText}>Ingat Saya</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={handleForgotPasswordNavigate}>
                    <Text style={styles.forgotPasswordText}>
                      Lupa Password?
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.signInButton}
                  onPress={handleLogin}
                  activeOpacity={0.8}
                >
                  <Text style={styles.signInButtonText}>MASUK</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleRegisterNavigate}
                  style={styles.signUpLinkContainer}
                >
                  <Text style={styles.signUpPromptText}>
                    Belum punya akun?
                    <Text style={styles.signUpLinkTextMaroon}>
                      {" "}
                      Daftar di sini
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  headerSafe: {
    alignItems: "center",
  },
  topHeader: {
    marginTop: height * 0.12,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  appName: {
    fontSize: 26,
    fontWeight: "700",
    color: LIGHT_BACKGROUND,
    letterSpacing: 2,
    textAlign: "center",
  },
  appSubtitle: {
    fontSize: 16,
    color: GOLD_ACCENT,
    letterSpacing: 5,
    fontWeight: "600",
    marginTop: 5,
    textAlign: "center",
  },
  formWrapper: {
    backgroundColor: LIGHT_BACKGROUND,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    minHeight: height * 0.2,
    width: width,
    marginTop: 40,
  },
  formContent: {
    paddingHorizontal: 35,
    paddingTop: 45,
    paddingBottom: 60,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "800",
    color: PRIMARY_MAROON,
    marginBottom: 5,
  },
  loginInstruction: {
    fontSize: 14,
    color: "#666",
    marginBottom: 35,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: INPUT_BACKGROUND,
    borderRadius: 12,
    marginBottom: 20,
    height: 55,
    borderWidth: 1,
    borderColor: "#EFEFEF",
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: SECONDARY_DARK,
  },
  eyeIcon: {
    paddingHorizontal: 5,
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 35,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberMeText: {
    fontSize: 14,
    color: SECONDARY_DARK,
    marginLeft: 8,
    fontWeight: "500",
  },
  forgotPasswordText: {
    fontSize: 14,
    color: PRIMARY_MAROON,
    fontWeight: "bold",
  },
  signInButton: {
    backgroundColor: PRIMARY_MAROON,
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: PRIMARY_MAROON,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 10,
  },
  signInButtonText: {
    color: LIGHT_BACKGROUND,
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 1,
  },
  signUpLinkContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  signUpPromptText: {
    fontSize: 14,
    color: SECONDARY_DARK,
  },
  signUpLinkTextMaroon: {
    fontWeight: "800",
    color: PRIMARY_MAROON,
  },
});
