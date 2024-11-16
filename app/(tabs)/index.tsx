import { View, Text, StyleSheet, useColorScheme } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const darkMode = useColorScheme() === 'dark'
  return (
    <View style={{flex: 1}}>
      <Text style={[darkMode ? styles.whiteText : styles.darkText, styles.header]}>
        Flat Cards
      </Text>
      <View style={styles.container}>
        <View style={[styles.whiteText, styles.card, styles.card1]}>
          <Text>Card 1</Text>
        </View>
        <View style={[styles.whiteText, styles.card, styles.card2]}>
          <Text>Card 2</Text>
        </View>
        <View style={[styles.whiteText, styles.card, styles.card3]}>
          <Text>Card 3</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 8
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 50,
    paddingStart: 30,
  },
  whiteText: {
    paddingTop: 50,
    color: '#FFFFFF'
  },
  darkText: {
    paddingTop: 50,
    color: '#000000'
  },
  card: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 4,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card1: {
    backgroundColor: '#EF5354'
  },
  card2: {
    backgroundColor: '#50DBB4'
  },
  card3: {
    backgroundColor: '#5DA3FA'
  },
});
