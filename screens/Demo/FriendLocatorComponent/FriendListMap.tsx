import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Dimensions} from 'react-native';
import {
  FlatList,
  Image,
  ImageRequireSource,
  ImageSourcePropType,
  Linking,
  ListRenderItemInfo,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import {Colors} from '../../../theme/colors';
import {Regular, RegularTightRegular} from '../../../theme/typography';
import {Location} from '../FriendLocatorScreen';
import {Friends} from '../../reducer/demo/friendLocatorType';
import LocatorBottomSheet from '../../common-ui/LocatorBottomSheet';
import {ppIcon} from '../../reducer/demo/firendLocator';
const defaultLatitude = 43.65107;
const defaultLongitude = -79.347015;

const pin =
  require('../../../assets/images/demo/mappin.png') as ImageSourcePropType;

type IconItem = {
  img: ImageRequireSource;
  onPress: () => void;
};

type Param = {
  friendList: any;
  userLocation?: Location;
  onRegionChangeComplete: (location: Location) => void;
  ref: any;
};

const screenWidth = Dimensions.get('window').width;

export function useStateCallback<T>(
  initialState: T,
): [T, (state: T, cb?: (state: T) => void) => void] {
  const [state, setState] = useState(initialState);
  const cbRef = useRef<((state: T) => void) | undefined>(undefined);

  const setStateCallback = useCallback((state: T, cb?: (state: T) => void) => {
    cbRef.current = cb;
    setState(state);
  }, []);

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = undefined;
    }
  }, [state]);

  return [state, setStateCallback];
}

export type refType = {
  markerPress: (item: any) => void;
};

export const FriendListMap = (param: Param) => {
  const navigation = useNavigation();
  const mapViewRef = React.useRef<MapView>(null);
  const [selectedMarker, setSelectMarker] = useStateCallback(undefined);
  const storeDetailRef = useRef(null);
  const techLifeRef = useRef(null);
  const [state1Height, setState1Height] = useState<number>(undefined);
  const [state2Height, setState2Height] = useState<number>(undefined);
  const [openTechLifeBottomSheet, setOpenTechLifeBottomSheet] =
    useStateCallback(false);
  const selectedMarkerCache = useRef();

  const directTolocationAnimate = (item: Friends) => {
    if (item) {
      if (item.geoLocation !== undefined && mapViewRef !== null) {
        const position: Region = {
          latitude: item.geoLocation?.latitude ?? defaultLatitude,
          longitude: item.geoLocation?.longitude ?? defaultLongitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        };
        mapViewRef.current.animateToRegion(position, 600);
      }
    }
  };

  const markerPress = (item: any) => {
    console.log('pressed!');
    directTolocationAnimate(item);
    setSelectMarker(item);
  };

  function renderIconList(item: ListRenderItemInfo<IconItem>) {
    return (
      <TouchableOpacity
        onPress={() => item.item.onPress()}
        key={`storeDetailIconList${item.index}`}>
        <FastImage source={item.item.img} style={styles.iconListItem} />
      </TouchableOpacity>
    );
  }

  function getGoogleMapUrl() {
    let latitude = defaultLatitude;
    let longitude = defaultLongitude;
    if (
      selectedMarker?.geoPoint?.latitude &&
      selectedMarker?.geoPoint?.longitude
    ) {
      latitude = selectedMarker.geoPoint?.latitude;
      longitude = selectedMarker.geoPoint?.longitude;
    }
    return `https://www.google.com/maps/search/?api=1&query=${latitude}%2C${longitude}`;
  }
  function animateWithParams(position: GeoPosition) {
    const r = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    };
    if (mapViewRef?.current !== null) {
      mapViewRef.current!.animateToRegion(r, 20);
    }
  }

  function geolocationFailCallBack() {}

  function getUserLocation() {
    Geolocation.getCurrentPosition(animateWithParams, geolocationFailCallBack, {
      maximumAge: 300000,
      timeout: 6000,
      enableHighAccuracy: false,
    });
  }
  function navigateToStoreDetailPage() {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'StoreLocatorStoreDetailScreen',
        params: {
          store: selectedMarker,
        },
      }),
    );
  }

  function friendDetail(item: Friends) {
    return (
      <View style={styles.bottomSheetContentContainer}>
        {selectedMarker !== undefined ? bottomRightBtnGrp() : <></>}
        <View onLayout={e => setState1Height(e.nativeEvent.layout.height)}>
          <View style={{flexDirection: 'row'}}>
            <FastImage
              source={ppIcon(item.name)}
              style={{height: 100, width: 100}}
            />
            <View style={styles.bottomSheetContentTitleContainer}>
              <Text style={styles.bottomSheetContent}>{item.name}</Text>
              <View style={styles.addressAndOpenScheduleContainer}>
                <FastImage
                  source={require('../../../assets/images/demo/location.png')}
                  style={styles.locationAndOpeningIcon}
                />
                <Text style={styles.addressAndOpenSchedule} numberOfLines={2}>
                  {item.address}
                </Text>
              </View>
              <View style={styles.addressAndOpenScheduleContainer}>
                <FastImage
                  source={require('../../../assets/images/demo/msgInbox.png')}
                  style={styles.locationAndOpeningIcon}
                />
                <Text style={styles.addressAndOpenSchedule}>{item.email}</Text>
              </View>
            </View>
          </View>

          <View style={styles.phoneAndChatGrpContainer}>
            <TouchableOpacity
              style={styles.phoneContainer}
              onPress={() => {
                if (item.tel.length > 0) {
                  Linking.openURL(`tel://${item.tel}`);
                }
              }}>
              <FastImage
                source={require('../../../assets/images/demo/phone.png')}
                style={styles.phoneIcon}
              />
              <Text style={[Regular, styles.iphoneText]}>
                {item.tel !== undefined ? item.tel : '   N/A    '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View onLayout={e => setState2Height(e.nativeEvent.layout.height)}>
          <View style={styles.iconView}>
            <View style={{flexDirection: 'row', paddingTop: 5}}>
              <FastImage
                source={require('../../../assets/images/demo/icon_fb.png')}
                style={styles.locationAndOpeningIcon}
              />
              <Text style={[RegularTightRegular, styles.iconView]}>
                {item.facebook}
              </Text>
            </View>
            <View style={{flexDirection: 'row', paddingTop: 5}}>
              <FastImage
                source={require('../../../assets/images/demo/icon_ig.png')}
                style={styles.locationAndOpeningIcon}
              />
              <Text style={[RegularTightRegular, styles.iconView]}>
                {item.facebook}
              </Text>
            </View>
            <View style={{flexDirection: 'row', paddingTop: 5}}>
              <FastImage
                source={require('../../../assets/images/demo/linkedin.png')}
                style={styles.locationAndOpeningIcon}
              />
              <Text style={styles.addressAndOpenSchedule}>{item.linkedin}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  const openFriendDetail = (item: Friends) => {
    return (
      <LocatorBottomSheet
        enableGesture
        subject={friendDetail(item)}
        ref={storeDetailRef}
        state1Height={state1Height}
        state2Height={state2Height}
        closeBottomSheetCallBack={() => {
          setTimeout(() => {
            setSelectMarker(undefined);
          }, 350);
        }}
        backbroundColor={undefined}
      />
    );
  };

  const showMarker = () => {
    return param.friendList.map((item, index) => {
      if (index < 20) {
        return (
          <Marker
            key={
              selectedMarker?.address?.id === item?.address?.id
                ? `selected${index}`
                : `notselected${index}`
            }
            coordinate={{
              latitude: item.geoLocation.latitude,
              longitude: item.geoLocation.longitude,
            }}
            tracksViewChanges={true}
            tracksInfoWindowChanges={true}
            identifier={item.name}
            onPress={e => {
              directTolocationAnimate(item);
              setSelectMarker(item);
            }}>
            <Image
              style={
                selectedMarker?.address?.id === item?.address?.id
                  ? styles.markerOnpress
                  : styles.marker
              }
              source={pin}
            />
          </Marker>
        );
      }
    });
  };

  function bottomRightBtnGrp() {
    return (
      <View
        style={
          selectedMarker !== undefined
            ? styles.bottomBtnGrpInsideBottomSheet
            : styles.bottomBtnGrp
        }
        pointerEvents="box-none">
        <TouchableOpacity
          onPress={() => {
            getUserLocation();
          }}>
          <FastImage
            source={require('../../../assets/images/demo/current_location.png')}
            style={styles.bottomBtnIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(getGoogleMapUrl());
          }}>
          <FastImage
            source={require('../../../assets/images/demo/go_google_map.png')}
            style={styles.bottomBtnIcon}
          />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container} key={'friendLocatorMapView'}>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: defaultLatitude,
          longitude: defaultLongitude,
          latitudeDelta: 0.165,
          longitudeDelta: 0.281,
        }}
        onRegionChangeComplete={e =>
          param.onRegionChangeComplete({
            latitude: e.latitude,
            longitude: e.longitude,
          })
        }
        ref={mapViewRef}
        showsUserLocation
        style={styles.mapView}>
        {param.friendList !== undefined ? showMarker() : <></>}
      </MapView>
      {selectedMarker === undefined ? bottomRightBtnGrp() : <></>}
      {selectedMarker !== undefined ? openFriendDetail(selectedMarker) : <></>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  mapView: {
    flex: 1,
  },
  marker: {
    width: 15,
    height: 15,
  },
  markerOnpress: {
    width: 35,
    height: 35,
  },
  bottomSheetContentContainer: {
    flexDirection: 'column',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 20,
  },
  bottomSheetContent: {
    color: '#4A4A4A',
    paddingTop: 5,
    fontSize: 24,
    fontWeight: '600',
  },
  bottomSheetContentTitleContainer: {
    paddingLeft: 5,
  },
  distance: {
    color: '#878787',
    fontSize: 12,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    alignItems: 'center',
  },
  infoIcon: {width: 24, height: 24},
  iconListItem: {
    width: 18,
    height: 18,
    marginStart: 1,
  },
  addressAndOpenScheduleContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  locationAndOpeningIcon: {
    width: 16,
    height: 16,
    top: 4,
  },
  addressAndOpenSchedule: {
    marginStart: 7,
    color: Colors.Body_Text,
    width: '85%',
    lineHeight: 22,
  },
  phoneAndChatGrpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingEnd: 45,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E6E7E8',
    borderWidth: 1,
    borderRadius: 100,
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  phoneIcon: {width: 16, height: 16},
  iphoneText: {
    color: '#042B60',
    marginStart: 10,
  },
  bottomBtnGrp: {
    flexDirection: 'column',
    position: 'absolute',
    right: 6,
    width: screenWidth,
    bottom: 140,
    alignItems: 'flex-end',
  },
  bottomBtnGrpInsideBottomSheet: {position: 'absolute', top: -100, right: 6},
  bottomBtnIcon: {
    width: 52,
    height: 52,
  },
  techLifeContainer: {
    marginTop: 25,
    marginHorizontal: 16,
    marginBottom: 34,
    flexDirection: 'column',
  },
  techLifeTitleContainer: {
    flexDirection: 'row',
    paddingBottom: 12,
    alignItems: 'center',
  },
  techLifeIcon: {
    width: 18,
    height: 18,
    marginStart: 25,
    marginEnd: 12,
  },
  techLifeTitle: {
    color: '#4A4A4A',
    fontSize: 12,
    fontWeight: '700',
  },
  techLifeContent: {
    color: '#4A4A4A',
    fontSize: 12,
    fontWeight: '400',
    marginStart: 25,
    marginEnd: 22,
    marginBottom: 19,
  },
  techLifeGotItBtnContainer: {
    backgroundColor: '#F36E21',
    width: '100%',
    height: 48,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  techLifeGotItBtnText: {
    color: 'white',
  },
  storeDetailBtnContainer: {
    width: '100%',
    paddingStart: 14,
    paddingEnd: 24,
    marginVertical: 18,
    borderColor: '#E0E0E0',
    borderRadius: 30,
    borderWidth: 1,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeDetailBtn: {fontSize: 14, color: '#042A60', fontWeight: '400'},
  iconView: {
    paddingTop: 4,
    paddingLeft: 8,
  },
});
