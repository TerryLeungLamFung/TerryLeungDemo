import {useRoute} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';
import AppBar from '../common-ui/AppBar';

type Param = {
  source?: string;
  try: boolean;
};

export const WebviewScreen = (param: Param) => {
  const route = useRoute();

  return (
    <View style={{flex: 1}}>
      <AppBar showBack hiddenBottomLine={true} />
      <View style={{flex: 1}}>
        <WebView source={{uri: route.params.source}} originWhitelist={['*']} />
      </View>
    </View>
  );
};
