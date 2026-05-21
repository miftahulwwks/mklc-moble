import { Drawer } from "expo-router/drawer";

export default function RootLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        swipeEnabled: true,
        drawerType: "slide",
      }}
    >
      <Drawer.Screen name="home" options={{ title: "Home" }} />
      <Drawer.Screen name="berita" options={{ title: "Berita" }} />
      <Drawer.Screen name="jadwal" options={{ title: "Jadwal" }} />
      <Drawer.Screen name="akun" options={{ title: "Akun" }} />
    </Drawer>
  );
}
