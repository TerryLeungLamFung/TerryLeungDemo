import {MMKVLoader} from 'react-native-mmkv-storage';

const reduxStorage = new MMKVLoader()
  .withInstanceID('redux-persist')
  .withEncryption()
  .initialize();

const persistConfig = {
  key: 'TerryLeungDemo',
  storage: reduxStorage,
  whitelist: [],
};

export default persistConfig;
