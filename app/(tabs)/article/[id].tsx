import { View, Text, ScrollView, StyleSheet, useColorScheme, Button, Share, Alert } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { Image } from 'expo-image';
import { useFocusEffect, useRouter, useGlobalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SafeAreaView } from 'react-native-safe-area-context';


export default function ArticleScreen() {
  const darkMode = useColorScheme() === 'dark'
  const router = useRouter();
  const [article, setArticle] = useState({title:'', description:'', content:'', img: []});
  const [url, setURL] = useState('');
  let { id } = useGlobalSearchParams<{ id: string }>();

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
              console.log(res)
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
          // const params = {...useGlobalSearchParams()};
          // delete params.id;
          // let {params} = useGlobalSearchParams();
          // console.log(params)
          // router.setParams({id : undefined});
          // console.log('called');
          // setArticle({title:'', description:'', content:'', img:[]});
        };
    }, [])
  );

  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  // const shareArticle = () => {
  //   Share.share({
  //     message: article.title
  //   });
  // }

  const shareArticle = async () => {
    try {
      const result = await Share.share({
        message: article.title,
      });
  
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const saveArticle = async () => {
    if (id.trim() === '') {
      Alert.alert('Error', 'Ghi chú không được rỗng!');
      return;
    }

    const note = {
      id: Date.now().toString(),
      url: id,
    };
    console.log(note)

    try {
      await AsyncStorage.setItem(note.id, JSON.stringify(note));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <Text style={[styles.darkText, styles.header]}>
          {article.title}
        </Text>

        <Text style={[styles.darkText, styles.contentText]}>
          {article.description}
        </Text>

        {article.img.length > 0 ? (
          article.img.map(r => <Image key={r} source={{ uri: r }} style={styles.image} />)
          ) : <Text></Text>}

        <Text style={[styles.darkText, styles.contentText]}>
          {article.content}
        </Text>
        <View style={styles.shareButton}>
          <Button onPress={shareArticle} title="Chia sẻ" />
        </View>
        <View style={styles.shareButton}>
          <Button onPress={saveArticle} title="Lưu" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8
  },
  shareButton : {
    backgroundColor: 'blue', 
    borderRadius: 8,       
    paddingVertical: 10,  
    paddingHorizontal: 20, 
    elevation: 5,
    margin: 10,
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
  contentText : {
    fontFamily: 'Georgia',
    // lineHeight: 2,
    fontSize: 20,
  },
  image: {
    flex: 1,
    alignSelf: 'stretch',
    height: 200,
    // aspectRatio: 1,
    // width: '100%',
  },
});
