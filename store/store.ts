import {combineReducers, configureStore} from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import persistConfig from './redux-persist';
import personalReducer from '../screens/reducer/demo/personalReducer';
import friendlistReducer from '../screens/reducer/demo/friendLocatorReducer';
import appReducer from '../screens/reducer/appReducer';

const rootReducer = combineReducers({
  app: appReducer,
  personalDemo: personalReducer,
  friendList: friendlistReducer,
});

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer,
) as typeof rootReducer;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({serializableCheck: false});
    return middlewares;
  },
  devTools: {latency: 0},
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
