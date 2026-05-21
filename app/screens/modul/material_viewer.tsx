import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview";

const MAROON = "#8B0000";

export default function MaterialViewer({
  materialUrl,
  materialTitle,
}: {
  materialUrl: string;
  materialTitle: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const getEmbedUrl = (url: string) => {
    const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (fileIdMatch) {
      return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(materialUrl);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={MAROON} barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {materialTitle}
          </Text>
        </View>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.viewerContainer}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={MAROON} />
            <Text style={styles.loadingText}>Memuat materi...</Text>
          </View>
        )}
        <WebView
          source={{ uri: embedUrl }}
          style={styles.webview}
          onLoadEnd={() => setLoading(false)}
          onLoadStart={() => setLoading(true)}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    backgroundColor: MAROON,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  backButton: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
  viewerContainer: {
    flex: 1,
    position: "relative",
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    zIndex: 999,
  },
  loadingText: {
    marginTop: 12,
    color: MAROON,
    fontSize: 14,
    fontWeight: "600",
  },
});
