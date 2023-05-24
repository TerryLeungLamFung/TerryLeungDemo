import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, FlatList, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import AppBar from '../../screens/common-ui/AppBar';
import {deviceWidth} from '../../theme/colors';
import * as RootNavigation from '../../navigation/RootNavigation';

type Param = {};

type ArticleResponse = {
  status: string;
  totalResults: number;
  articles: Articles[];
};

type Articles = {
  source: object;
  author: string;
  title: string;
  description: string;
  url: URL;
  urlToImage: URL;
  publishedAt: string;
  content: string;
};

const url =
  'https://newsapi.org/v2/top-headlines?' +
  'country=ca&' +
  'sortBy=popularity&' +
  'apiKey=79fa99fd7a754f2a8ccf672d16ab8bca';

export const NewsScreen = (param: Param) => {
  const navigation = useNavigation();
  const [data, setData] = useState<any>();
  const req = new Request(url);

  useEffect(() => {
    fetch(req)
      .then(response => response.json())
      .then(json => {
        // const arry = json.articles.filter(e => {
        //   return e.urlToImage !== null;
        // });
        setData(json.articles);
      });
  }, []);

  const _renderItem = ({item}) => {
    return (
      <Pressable
        onPress={() => {
          RootNavigation.navigate('WebviewScreen', {
            source: item.url,
          });
        }}>
        <View style={styles.articleView}>
          {item.urlToImage ? (
            <FastImage
              source={
                item?.urlToImage
                  ? {uri: item.urlToImage}
                  : require('../../assets/images/demo/human.png')
              }
              resizeMode={'contain'}
              style={styles.image}
            />
          ) : (
            <View
              style={[
                styles.image,
                {
                  backgroundColor: '#bbbbbb',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <Text>No Image</Text>
            </View>
          )}
          <View style={{paddingHorizontal: 5}}>
            <Text style={styles.titleText}>{item.title}</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.dateText}>
                {moment(item?.publishedAt).format('YYY-MM-DD')}
              </Text>
              <Text style={styles.dateText}>{item.author}</Text>
            </View>

            <Text style={styles.desText} numberOfLines={3}>
              {item?.description}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <AppBar title="News" showBack />
      <FlatList data={data} renderItem={_renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    flex: 1,
  },
  articleView: {
    height: 350,
    borderColor: '#888888',
    borderWidth: 2,
    marginHorizontal: 5,
    marginTop: 8,
    alignItems: 'center',
    paddingTop: 5,
  },
  image: {
    height: (deviceWidth - 20) * 0.55,
    width: deviceWidth - 20,
  },
  titleText: {
    fontFamily: 'Times',
    fontSize: 18,
    fontWeight: '700',
  },
  dateText: {
    fontSize: 12,
    paddingTop: 5,
  },
  desText: {
    fontFamily: 'Times',
    fontSize: 16,
    paddingTop: 5,
    color: '#333333',
  },
});
