/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeDemoScreen} from './screens/Demo/HomeDemoScreen';
import {WeatherScreen} from './screens/Demo/WeatherScreen';
import {NewsScreen} from './screens/Demo/NewsScreen';
import {FriendLocatorScreen} from './screens/Demo/FriendLocatorScreen';
import PersonalInfoScreen from './screens/Demo/PersonalInfoScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Provider} from 'react-redux';
import {persistor, store} from './store/store';
import {navigationRef} from './navigation/RootNavigation';
import {WebviewScreen} from './screens/Demo/WebviewScreen';
import {LogBox} from 'react-native';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const Stack = createNativeStackNavigator();

function App() {
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer ref={navigationRef} onReady={() => {}}>
            <Stack.Navigator screenOptions={() => ({})}>
              <Stack.Screen name="HomeDemoScreen" component={HomeDemoScreen} />
              <Stack.Screen
                name="WeatherScreen"
                component={WeatherScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="NewsScreen"
                component={NewsScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="FriendLocatorScreen"
                component={FriendLocatorScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="PersonalInfoScreen"
                component={PersonalInfoScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="WebviewScreen"
                component={WebviewScreen}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
