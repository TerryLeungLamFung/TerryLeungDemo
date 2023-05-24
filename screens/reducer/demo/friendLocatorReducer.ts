import {createSlice} from '@reduxjs/toolkit';
import {friendList} from './firendLocator';
import {FriendList} from './friendLocatorType';
import {baseInfo} from './info';
import {PersonalInformation} from './infoType';

const initialState: FriendList = friendList;

const friendLocatorSlice = createSlice({
  name: 'friendList',
  initialState: initialState,
  reducers: {
    // changeInfo: ((state, action) = {}),
  },
});

export const friendListInfo = (state: any) => state.friendList;
export default friendLocatorSlice.reducer;
