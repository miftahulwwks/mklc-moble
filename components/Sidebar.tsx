import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const Z_INDEX_SIDEBAR = 9999;

export default function Sidebar({
  open,
  onClose,
  onOpenSwipe,
}: {
  open: boolean;
  onClose: () => void;
  onOpenSwipe: () => void;
}) {
  const router = useRouter();
  const slide = useRef(new Animated.Value(-width * 0.7)).current;

  const sidebarWidth = width * 0.7;

  useEffect(() => {
    Animated.timing(slide, {
      toValue: open ? 0 : -sidebarWidth,
      duration: 260,
      useNativeDriver: true,
    }).start();
  }, [open, slide, sidebarWidth]);

  const swipeOpen = PanResponder.create({
    onMoveShouldSetPanResponder: (_, g) => g.dx > 15 && g.moveX < 25 && !open,
    onPanResponderMove: () => {
      onOpenSwipe();
    },
  });

  const swipeClose = PanResponder.create({
    onStartShouldSetPanResponder: () => open,

    onMoveShouldSetPanResponder: (_, g) => open && g.dx < -15,

    onPanResponderRelease: (e, g) => {
      if (g.dx < -50) {
        onClose();
      }
    },

    onPanResponderTerminate: () => {},
  });

  const menus = [
    { name: "Pengaturan", icon: "cog", path: "/settings" },
    {
      name: "Bantuan & FAQ",
      icon: "question-circle",
      path: "/screens/menu_sidebar/bantuan",
    },
    {
      name: "Kebijakan Privasi",
      icon: "lock",
      path: "/screens/menu_sidebar/kebijakan",
    },
    { name: "Keluar", icon: "sign-out", path: "/logout", isLogout: true },
  ];

  const handleMenuPress = (item: (typeof menus)[0]) => {
    onClose();
    if (item.isLogout) {
      console.log("Melakukan proses Logout...");
      router.replace("../login");
    } else {
      router.push(item.path);
    }
  };

  return (
    <>
      {!open && <View {...swipeOpen.panHandlers} style={styles.swipeEdge} />}
      {open && <TouchableOpacity style={styles.backdrop} onPress={onClose} />}

      <Animated.View
        {...swipeClose.panHandlers}
        style={[
          styles.sidebar,
          { width: sidebarWidth, transform: [{ translateX: slide }] },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Selamat Datang,</Text>
          <Text style={styles.userName}>Pengguna MKLC</Text>
        </View>
        <View style={styles.menuWrapper}>
          {menus.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.item}
              onPress={() => handleMenuPress(item)}
            >
              <FontAwesome
                name={item.icon as any}
                size={20}
                color={item.isLogout ? "red" : "#555"}
                style={styles.itemIcon}
              />
              <Text
                style={[
                  styles.itemText,
                  { color: item.isLogout ? "red" : "#333" },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    backgroundColor: "#fff",
    borderRightWidth: 1,
    borderRightColor: "#eee",
    elevation: 8,
    zIndex: Z_INDEX_SIDEBAR,
  },

  header: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
  },
  headerText: {
    fontSize: 16,
    color: "#777",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },

  menuWrapper: {
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
  },
  itemIcon: {
    width: 30,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "500",
  },

  backdrop: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: Z_INDEX_SIDEBAR - 1,
  },

  swipeEdge: {
    position: "absolute",
    width: 20,
    height: "100%",
    left: 0,
    top: 0,
    zIndex: 10,
  },
});
