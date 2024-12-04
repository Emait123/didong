import { View, Text, ScrollView, StyleSheet, useColorScheme, Pressable } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { Image } from 'expo-image';
import { useFocusEffect, useRouter, useLocalSearchParams, useGlobalSearchParams } from 'expo-router';

import { SafeAreaView } from 'react-native-safe-area-context';


export default function ArticleScreen() {
  const darkMode = useColorScheme() !== 'dark'
  const router = useRouter();
  const [article, setArticle] = useState({title:'', description:'', content:'', img: []});
  const [url, setURL] = useState('');
  let { id } = useGlobalSearchParams<{ id: string }>();
  // const params = useGlobalSearchParams();

  useFocusEffect(
    useCallback(() => {
        console.log(id);
        let formData = new FormData();
        formData.append('url', decodeURIComponent(id));
        // Fetch data when the component mounts
        fetch('https://emait.click/public/crawl', {
            method: 'POST',
            body: formData,
        })
          .then((response) => response.json()) // Parse JSON response
          .then((res) => {
            if (res.result) {
              let data = {
                  title: res.title,
                  description: res.description,
                  content: res.content,
                  img: res.img
              };
              setArticle(data);
            }
          })
          .catch((error) => {
            console.error(error);
          });

        // Return function is invoked whenever the route gets out of focus.
        return () => {
            setArticle({title:'', description:'', content:'', img:[]});
        };
    }, [])
  );

  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <Text style={[darkMode ? styles.whiteText : styles.darkText, styles.header]}>
          {article.title}
        </Text>

        <Text style={[darkMode ? styles.whiteText : styles.darkText]}>
          {article.description}
        </Text>

        {article.img.length > 0 ? (
          article.img.map(r => <Image key={r} source={{ uri: r }} style={styles.image} />)
          ) : <Text></Text>}

        <Text style={[darkMode ? styles.whiteText : styles.darkText]}>
          {article.content}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // flexDirection: 'row',
    // padding: 8
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
    // width: 100,
    // height: 500,
    margin: 10,
    borderRadius: 4,
    flex: 1,
    alignSelf: 'stretch', 
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  card_header: {

  },
  image: {
    flex: 1,
    alignSelf: 'stretch',
    height: 200,
    // aspectRatio: 1,
    // width: '100%',
  },
});
