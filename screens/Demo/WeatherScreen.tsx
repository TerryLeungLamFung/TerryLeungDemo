import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import AppBar from '../../screens/common-ui/AppBar';
import {deviceWidth, Colors} from '../../theme/colors';
import * as WeatherHelper from './WeatherComponent/weatherHelper';
import {cityName, sample} from './WeatherComponent/sample';
//import {CommonPicker} from '@yz1311/react-native-wheel-picker';
import {useDispatch} from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  closeBottomSheet,
  setBottomSheet,
} from '../../screens/reducer/appReducer';
import {NativeViewGestureHandler} from 'react-native-gesture-handler';
import {isNull} from '../common-ui/helper';

type Param = {};

const currentWeather =
  'https://api.openweathermap.org/data/2.5/weather?id={citycode}&appid=d22f57ffe7bd1873721e6b2331f9f38c&units=metric';

const futureWeather =
  'https://api.openweathermap.org/data/2.5/forecast?appid=d22f57ffe7bd1873721e6b2331f9f38c&units=metric&id={citycode}';

export const WeatherScreen = (param: Param) => {
  const dispatch = useDispatch();

  const [selectedCity, setSeletedCity] = useState(0);
  const [currWeather, setCurrWeather] = useState();
  const [furtureWeather, setFutureWeather] = useState();
  const [openDropDown, setOpenDropDown] = useState(false);

  useEffect(() => {
    const code = cityName[selectedCity].code;
    console.log('code', code);
    //const code = cityList['Toronto'];
    const currReq = new Request(currentWeather.replace('{citycode}', code));
    const futureReq = new Request(futureWeather.replace('{citycode}', code));
    fetch(currReq)
      .then(response => response.json())
      .then(json => {
        setCurrWeather(json);
      });
    fetch(futureReq)
      .then(response => response.json())
      .then(json => {
        setFutureWeather(json);
      });
  }, [selectedCity]);
  WeatherHelper.weatherIcon('01');

  const _renderItem = (item: any) => {
    return (
      <View
        style={{
          width: 70,
          height: 100,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
          marginLeft: 10,
        }}>
        <Text style={styles.smallText}>{`${item.item.main.temp}°C`}</Text>
        <FastImage
          source={WeatherHelper.weatherIcon(item.item.weather[0].icon)}
          style={styles.smallWeatherIcon}
        />
        <Text style={styles.smallText}>{`${moment(
          new Date(item.item.dt * 1000),
        ).format('LT')}`}</Text>
        <Text style={styles.smallText}>{`${moment(
          new Date(item.item.dt * 1000),
        ).format('MM/DD')}`}</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <AppBar title="Weather" showBack />
      <ImageBackground
        source={require('../../assets/images/demo/weatherBG.jpeg')}
        style={{flex: 1}}>
        {!isNull(currWeather) && !isNull(furtureWeather) && (
          <View style={styles.contentView}>
            <DropDownPicker
              open={openDropDown}
              setOpen={setOpenDropDown}
              value={selectedCity}
              setValue={setSeletedCity}
              items={cityName}
            />

            <Text style={styles.smallTextTime}>
              {moment().format('YYYY-MM-DD hh:mm')}
            </Text>
            <FastImage
              source={WeatherHelper.weatherIcon(currWeather.weather[0].icon)}
              style={styles.weatherIcon}
            />
            <Text style={styles.tempText}>{`${currWeather.main.temp}°C`}</Text>
            <Text
              style={
                styles.smallTextDesc
              }>{`${currWeather.weather[0].description}`}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: deviceWidth,
                paddingTop: 40,
              }}>
              <View style={{alignItems: 'center'}}>
                <FastImage
                  source={require('../../assets/images/demo/waterdrop.png')}
                  style={styles.littleIcon}
                />
                <Text
                  style={[
                    styles.littleText,
                    {paddingTop: 15},
                  ]}>{`${currWeather.main.humidity}%`}</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <FastImage
                  source={require('../../assets/images/demo/Bigger/weather_icon_bigger-13.png')}
                  style={styles.littleIcon1}
                />
                <Text
                  style={
                    styles.littleText
                  }>{`${currWeather.wind.speed} m/s`}</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <FastImage
                  source={require('../../assets/images/demo/Bigger/weather_icon_bigger-11.png')}
                  style={styles.littleIcon1}
                />
                <Text style={styles.littleText}>{`${moment(
                  new Date(currWeather.sys.sunrise * 1000),
                ).format('LT')}`}</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <FastImage
                  source={require('../../assets/images/demo/Bigger/weather_icon_bigger-12.png')}
                  style={styles.littleIcon1}
                />
                <Text style={styles.littleText}>{`${moment(
                  new Date(currWeather.sys.sunset * 1000),
                ).format('LT')}`}</Text>
              </View>
            </View>
            <View style={styles.weatherList}>
              <FlatList
                data={furtureWeather.list}
                renderItem={_renderItem}
                horizontal
              />
            </View>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: '#00ff00',
  },
  cityName: {
    fontSize: 65,
    color: Colors.White,
    fontFamily: 'Gill Sans',
    paddingTop: 30,
  },
  contentView: {
    alignItems: 'center',
  },
  weatherIcon: {
    height: 180,
    width: 180,
  },
  tempText: {
    fontSize: 50,
    color: Colors.White,
    fontFamily: 'Gill Sans',
  },
  littleIcon: {
    height: 35,
    width: 35,
    marginTop: 8,
  },
  littleIcon1: {
    height: 50,
    width: 50,
  },
  littleText: {
    fontSize: 16,
    color: Colors.White,
    fontFamily: 'Gill Sans',
    paddingTop: 5,
  },
  smallWeatherIcon: {
    height: 80,
    width: 80,
  },
  smallText: {
    fontSize: 16,
    color: Colors.White,
    fontFamily: 'Gill Sans',
  },
  smallTextDesc: {
    fontSize: 25,
    color: Colors.White,
    fontFamily: 'Gill Sans',
  },
  smallTextTime: {
    fontSize: 16,
    color: Colors.White,
    fontFamily: 'Gill Sans',
    paddingTop: 30,
  },
  weatherList: {
    marginTop: 25,
  },
});
