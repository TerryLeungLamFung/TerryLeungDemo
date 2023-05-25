import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Colors, deviceWidth} from '../../theme/colors';
import * as RootNavigation from '../../navigation/RootNavigation';

export const HomeDemoScreen = () => {
  return (
    <View style={styles.root}>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.cellSep}
          onPress={() => {
            RootNavigation.navigate('WeatherScreen');
          }}>
          <ImageBackground
            source={require('../../assets/images/demo/Bigger/weatherBG.jpeg')}
            style={styles.cellView}
            imageStyle={{borderRadius: 20}}>
            <Text style={styles.text}>Canada Weather</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cellSep}
          onPress={() => {
            RootNavigation.navigate('NewsScreen');
          }}>
          <ImageBackground
            source={require('../../assets/images/demo/Bigger/newsBG.jpeg')}
            style={styles.cellView}
            imageStyle={{borderRadius: 20}}>
            <Text style={styles.text}>Worldwide News</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cellSep}
          onPress={() => {
            RootNavigation.navigate('FriendLocatorScreen');
          }}>
          <ImageBackground
            source={require('../../assets/images/demo/Bigger/friendBG.jpeg')}
            style={styles.cellView}
            imageStyle={{borderRadius: 20}}>
            <Text style={styles.text}>Friends Locator</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cellSep}
          onPress={() => {
            RootNavigation.navigate('PersonalInfoScreen');
          }}>
          <ImageBackground
            source={require('../../assets/images/demo/Bigger/profileBG.jpeg')}
            style={styles.cellView}
            imageStyle={{borderRadius: 20}}>
            <Text style={styles.text}>Terry's Profile</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  cellView: {
    width: deviceWidth * 0.95,
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: Colors.White,
    fontFamily: 'Gill Sans',
    fontWeight: '800',
  },
  cellSep: {
    paddingVertical: 10,
  },
});
