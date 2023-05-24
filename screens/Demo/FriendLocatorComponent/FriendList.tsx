import {CommonActions, useNavigation} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors} from '../../../theme/colors';
import {FriendList, Friends} from '../../reducer/demo/friendLocatorType';
import {ppIcon} from '../../reducer/demo/firendLocator';
type Param = {
  friendList: FriendList;
  userLocation?: Location;
  onListEndReached?: () => void;
  listPress: (item: any) => void;
};

const screenWidth = Dimensions.get('window').width;

export const FriendLocatorList = (param: Param) => {
  const navigation = useNavigation();

  function renderItem({item, index}: {item: Friends; index: number}) {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          param.listPress('a');
        }}>
        <View style={styles.cellView}>
          <FastImage
            source={ppIcon(item.name)}
            style={{height: 100, width: 100}}
          />
          <View style={{paddingLeft: 5}}>
            <Text style={styles.nameText}>{item.name}</Text>
            <View style={styles.infoTextView}>
              <Text style={styles.basicText}>Mobile Phone:</Text>
              <Text style={styles.basicInfoText}>{item.tel}</Text>
            </View>
            <View style={styles.infoTextView}>
              <Text style={styles.basicText}>Email Address:</Text>
              <Text style={styles.basicInfoText}>{item.email}</Text>
            </View>
            <View style={styles.infoTextView}>
              <Text style={styles.basicText}>Address:</Text>
              <Text style={styles.basicInfoText} numberOfLines={2}>
                {item.address}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.devider} />
      {param.friendList.friends !== undefined ? (
        <FlatList
          data={param.friendList.friends}
          renderItem={item => renderItem(item)}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  devider: {
    borderBottomColor: '#ECEAE6',
    width: screenWidth,
    height: 0,
    borderBottomWidth: 1,
  },
  itemContainer: {
    flexDirection: 'column',
    paddingHorizontal: 5,
    paddingTop: 15,
    paddingBottom: 20,
    borderBottomColor: '#ECEAE6',
    borderBottomWidth: 1,
  },
  itemTitle: {
    color: '#042B60',
  },
  itemAddressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemAddress: {
    color: Colors.Body_Text,
    marginTop: 15,
    width: '88%',
  },
  itemTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  distance: {
    color: '#878787',
    fontSize: 12,
  },
  cellView: {
    flexDirection: 'row',
  },
  nameText: {
    fontSize: 24,
    fontWeight: '700',
  },
  infoTextView: {
    flexDirection: 'row',
    flex: 1,
  },
  basicText: {
    lineHeight: 20,
    width: 100,
  },
  basicInfoText: {
    lineHeight: 20,
    width: 180,
  },
});
