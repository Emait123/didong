import { View, Text, FlatList, StyleSheet, useColorScheme, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
import {Picker} from '@react-native-picker/picker';

import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {
  const darkMode = useColorScheme() !== 'dark'
  const [dsTin, setDsTin] = useState([]);
  const [loaiTin, setLoaiTin] = useState('');

  const theLoaiAPI: { [key: string]: string } = {
    'trangChu': 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fvnexpress.net%2Frss%2Ftin-moi-nhat.rss',
    'theGioi': 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fvnexpress.net%2Frss%2Fthe-gioi.rss',
    'thoiSu': 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fvnexpress.net%2Frss%2Fthoi-su.rss',
    'giaiTri': 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fvnexpress.net%2Frss%2Fgiai-tri.rss',
  };

  function getDS(theLoai:string) {
    let link = theLoaiAPI[theLoai];
    fetch(link)
      .then((response) => response.json()) // Parse JSON response
      .then((res) => {
        // console.log(res);
        const news = res.items.map( (data) => ({ 
          id: encodeURIComponent(data['guid']), 
          title: data['title'], 
          pubDate: data['pubDate'], 
          description: data['description'].replace(/<[^>]*>/g, ''), //bỏ các tag html
          img: data.enclosure.link.replace(/amp;/g, '')
        }));
        setDsTin(news);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    // Fetch data when the component mounts
    getDS('trangChu');
  }, []);

  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  const renderItem = ({ item }) => (
    <View style={[styles.whiteText, styles.card]}>
      {/* <Link key={item.id} asChild href={`/(tabs)/article/${item.id}`}> */}
      <Link key={item.id} asChild href={{
        pathname: '/(tabs)/article/[id]',
        params: { id: item.id }
      }}>
        <Pressable >
          <Text>{item.title}</Text>
          <Text>{item.pubDate}</Text>
          <Text>{item.description}</Text>
          <Image
            style={styles.image}
            source={item.img}
            // placeholder={{ blurhash }}
            // contentFit='cover'
            // transition={1000}
          />
        </Pressable>
      </Link>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={[darkMode ? styles.whiteText : styles.darkText, styles.header]}>
        Tin tức
      </Text>
      <Picker
        selectedValue={loaiTin}
        onValueChange={(itemValue, itemIndex) => {
          setLoaiTin(itemValue);
          getDS(itemValue);
        }
        }>
        <Picker.Item label="Trang chủ" value="trangChu" />
        <Picker.Item label="Thế giới" value="theGioi" />
        <Picker.Item label="Thời sự" value="thoiSu" />
        <Picker.Item label="Giải trí" value="giaiTri" />
      </Picker>
      <View style={styles.container}>
        <FlatList
          data={dsTin}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
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
