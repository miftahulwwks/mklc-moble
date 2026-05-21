import React, { useEffect, useRef } from "react";
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabItem = ({ route, index, state, descriptors, navigation }) => {
  const { options } = descriptors[route.key];
  const label = options.title ?? route.name;
  const isFocused = state.index === index;

  const scaleValue = useRef(new Animated.Value(isFocused ? 1.1 : 1)).current;
  const translateValue = useRef(new Animated.Value(isFocused ? -2 : 0)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: isFocused ? 1.1 : 1,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(translateValue, {
        toValue: isFocused ? -2 : 0,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isFocused]);

  const onPress = () => {
    Animated.sequence([
      Animated.timing(opacityValue, {
        toValue: 0.7,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  const activeColor = "#800000";
  const inactiveColor = "#8E8E93";

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.tabItem}
      activeOpacity={1}
    >
      <Animated.View
        style={{
          opacity: opacityValue,
          transform: [{ scale: scaleValue }, { translateY: translateValue }],
        }}
      >
        {options.tabBarIcon &&
          options.tabBarIcon({
            color: isFocused ? activeColor : inactiveColor,
            size: 22,
          })}
      </Animated.View>

      <Text
        style={[
          styles.label,
          {
            color: isFocused ? activeColor : inactiveColor,
            fontWeight: isFocused ? "700" : "500",
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.tabBarWrapper,
        {
          paddingBottom: insets.bottom > 0 ? insets.bottom - 5 : 8,
        },
      ]}
    >
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => (
          <TabItem
            key={route.key}
            route={route}
            index={index}
            state={state}
            descriptors={descriptors}
            navigation={navigation}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: {
        elevation: 15,
        borderTopWidth: 1,
        borderTopColor: "#F0F0F0",
      },
    }),
  },
  tabContainer: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    justifyContent: "space-around",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 10,
    marginTop: 2,
  },
});

export default CustomTabBar;
