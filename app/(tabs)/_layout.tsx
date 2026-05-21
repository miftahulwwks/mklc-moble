import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import CustomTabBar from "../../components/CustomTabBar";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tentang_kami"
        options={{
          title: "Tentang Kami",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="info-circle" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="pendidikan"
        options={{
          title: "Pendidikan",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="university" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="akun"
        options={{
          title: "Akun",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
