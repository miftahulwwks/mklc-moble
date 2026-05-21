import React, { useEffect, useState } from 'react';
import { AccessibilityInfo, Text } from 'react-native';
import Animated from 'react-native-reanimated';

export function HelloWave() {
  const [reduceMotionEnabled, setReduceMotionEnabled] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      setReduceMotionEnabled(enabled);
    });

    // subscribe to changes (API differs across RN versions)
    const subscription: any = AccessibilityInfo.addEventListener
      ? AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotionEnabled)
      : AccessibilityInfo.addEventListener && AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotionEnabled);

    return () => {
      if (subscription && typeof subscription.remove === 'function') {
        subscription.remove();
      }
    };
  }, []);

  if (reduceMotionEnabled) {
    return (
      <Text style={{ fontSize: 28, lineHeight: 32, marginTop: -6 }}>
        👋
      </Text>
    );
  }

  return (
    <Animated.Text
      style={{
        fontSize: 28,
        lineHeight: 32,
        marginTop: -6,
        animationName: {
          '50%': { transform: [{ rotate: '25deg' }] },
        },
        animationIterationCount: 4,
        animationDuration: '300ms',
      }}>
      👋
    </Animated.Text>
  );
}
