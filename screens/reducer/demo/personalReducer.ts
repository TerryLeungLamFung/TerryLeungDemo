import {createSlice} from '@reduxjs/toolkit';
import {baseInfo} from './info';
import {PersonalInformation} from './infoType';

const initialState: PersonalInformation = baseInfo;

const personalDemoSlice = createSlice({
  name: 'personalDemo',
  initialState: initialState,
  reducers: {
    // changeInfo: ((state, action) = {}),
  },
});

// export const { changeInfo } = personalDemoSlice.actions;
export const personalInfo = (state: any) => state.personalDemo;
export default personalDemoSlice.reducer;
