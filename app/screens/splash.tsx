import { Redirect } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

const LOGO_SOURCE = require("../../assets/logo.png");

const PRIMARY_MAROON = "#8B0000";
const DARKER_MAROON = "#5C0000";
const GOLD_ACCENT = "#FFD700";
const LIGHT_TEXT = "#FFFFFF";

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1100,
      useNativeDriver: true,
    }).start();

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.0,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();

    const timer = setTimeout(() => {
      pulse.stop();
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setIsLoading(false));
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim]);

  if (isLoading) {
    return (
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: fadeAnim }]}>
        <LinearGradient
          colors={[DARKER_MAROON, PRIMARY_MAROON, DARKER_MAROON]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.container}
        >
          <Animated.Image
            source={LOGO_SOURCE}
            style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
            resizeMode="contain"
          />

          <View style={styles.textContainer}>
            <Text style={styles.appName}>MAHKAMAH KONSTITUSI</Text>
            <Text style={styles.appSubtitle}>LEARNING CENTER</Text>
            <Text style={styles.appShortName}>MKLC</Text>
          </View>

          <ActivityIndicator
            size="large"
            color={GOLD_ACCENT}
            style={styles.indicator}
          />
        </LinearGradient>
      </Animated.View>
    );
  }

  return <Redirect href="/screens/login" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 30,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  appName: {
    fontSize: 22,
    fontWeight: "700",
    color: LIGHT_TEXT,
    letterSpacing: 3,
    marginBottom: 5,
  },
  appSubtitle: {
    fontSize: 14,
    color: GOLD_ACCENT,
    letterSpacing: 6,
    fontWeight: "600",
    marginBottom: 10,
  },
  appShortName: {
    fontSize: 38,
    fontWeight: "900",
    color: LIGHT_TEXT,
    letterSpacing: 5,
    marginTop: 10,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  indicator: {
    marginTop: 50,
    transform: [{ scale: 1.2 }],
  },
});
