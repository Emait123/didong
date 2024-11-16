import { View, Text, StyleSheet, useColorScheme } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const darkMode = useColorScheme() === 'dark'
  return (
    <View style={styles.container}>
      <Text style={darkMode ? styles.whiteText : styles.darkText}>
        Text duoc style bang Stylesheet abc
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  whiteText: {
    paddingTop: 50,
    color: '#FFFFFF'
  },
  darkText: {
    paddingTop: 50,
    color: '#000000'
  }
});
