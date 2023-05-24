import {RouteProp, useIsFocused, useRoute} from '@react-navigation/native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../screens/common-ui/hooks';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import AppBar from '../../screens/common-ui/AppBar';
import AppBarButton from '../../screens/common-ui/AppBarButton';
import {friendListInfo} from '../../screens/reducer/demo/friendLocatorReducer';
import {FriendLocatorList} from './FriendLocatorComponent/FriendList';
import {FriendListMap} from './FriendLocatorComponent/FriendListMap';

type ParamList = {
  Param: {
    callApi(): () => void;
  };
};
export type Location = {
  latitude: number;
  longitude: number;
};

export const FriendLocatorScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'Param'>>();
  const dispatch = useAppDispatch();
  const [switchViewBtnState, setSwitchBtnState] = useState<boolean | undefined>(
    true,
  );
  const mapRef = useRef(null);
  const childRef = useRef(null);
  const [showFilter, setShowFilter] = useState(false);
  const [userPosition, setUserPosition] = useState<Location>();
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [filteredStoreCount, setFilteredStoreCount] = useState<number>();
  const [showSearchResult, setShowSearchResult] = useState<string>();
  const [selectedFriend, setSelectedFriend] = useState();
  const storeLocatorListViewCurrentPage = useRef<number>(0);
  const geolocationSuccessCallBack = (position: GeoPosition) => {
    setUserPosition({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    setSwitchBtnState(true);
  };
  const geolocationFailCallBack = () => {
    setSwitchBtnState(false);
  };

  const closeBottomSheet = () => {
    childRef?.current?.dialogAnimControl(false);
    setTimeout(() => {
      setShowFilter(false);
    }, 250);
  };

  function fetchStoreList(param: StoreLocatorSearchAndFilterParam) {
    // dispatch(filteredStoreList(param));
  }

  const storeList = {};
  const friendlist = useAppSelector(friendListInfo);
  const townAndDsitrict = {};
  const serviceList = {};

  const googleMapUseMemo = useMemo(
    () => (
      <FriendListMap
        friendList={friendlist.friends}
        userLocation={userPosition}
        onRegionChangeComplete={location => {
          fetchStoreList({position: location});
        }}
        ref={mapRef}
      />
    ),
    [storeList, userPosition],
  );

  const listPress = (item: any) => {
    //mapRef?.current?.markerPress(item);
  };

  return (
    <View style={styles.container}>
      <AppBar
        showBack
        title="Friends Locators"
        rightButton={
          <>
            <AppBarButton
              style={styles.appBarIcon}
              onPress={() => {
                setSwitchBtnState(!switchViewBtnState);
              }}
              icon={require('../../assets/images/demo/map.png')}
              testId={undefined}
            />
          </>
        }
      />
      {switchViewBtnState ? (
        googleMapUseMemo
      ) : (
        <FriendLocatorList friendList={friendlist} listPress={listPress} />
      )}
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
  appBarIcon: {marginLeft: 12},
});
