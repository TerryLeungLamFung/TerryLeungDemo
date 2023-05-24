import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppState, BottomSheetType, MsgType} from '../../screens/type/app';

const initialState: AppState = {
  loading: false,
  error: null,
  bottomSheet: {
    title: '',
    screenName: 'Root',
    isShowBottomSheet: false,
    hideTitle: false,
    disableDrag: false,
    disableBackgroundClick: false,
    hideBackground: false,
    bottomSheetContent: null,
    bottomSheetProps: null,
  },
  snackbar: {
    msgType: MsgType.error,
    toastMsg: '',
    btnTxt: '',
    withCloseBtn: false,
    isShowSnackbar: false,
    msgFunc: () => {},
  },
};

const appsSlice = createSlice({
  name: 'apps',
  initialState: initialState,
  reducers: {
    closeBottomSheet: state => {
      state.bottomSheet = {
        title: '',
        isShowBottomSheet: false,
        bottomSheetContent: null,
      };
    },
    setLoading: (state, action: PayloadAction<{loading: boolean}>) => {
      state.loading = action.payload.loading;
    },
    setError: (state, action: PayloadAction<{message: string}>) => {
      state.snackbar = {
        msgType: MsgType.error,
        toastMsg: action.payload.message,
        btnTxt: '',
        withCloseBtn: false,
        isShowSnackbar: true,
        msgFunc: () => {},
      };
    },
    setBottomSheet: (state, action: PayloadAction<BottomSheetType>) => {
      state.bottomSheet = {
        screenName: action.payload.screenName,
        title: action.payload.title,
        isShowBottomSheet: true,
        bottomSheetContent: action.payload.bottomSheetContent,
        snapPoints: action.payload.snapPoints,
        hideTitle: action.payload.hideTitle,
        disableDrag: action.payload.disableDrag,
        disableBackgroundClick: action.payload.disableBackgroundClick,
        bottomSheetProps: action.payload?.bottomSheetProps,
        hideBackground: action.payload.hideBackground,
        noModal: action.payload.noModal,
      };
    },
    setSnackbar: (
      state,
      action: PayloadAction<{
        msgType: MsgType;
        toastMsg: string;
        btnTxt: string;
        withCloseBtn: boolean;
        isShowSnackbar: boolean;
        msgFunc?: () => void;
      }>,
    ) => {
      state.snackbar = {
        msgType: action.payload.msgType,
        toastMsg: action.payload.toastMsg,
        btnTxt: action.payload.btnTxt,
        withCloseBtn: action.payload.withCloseBtn,
        isShowSnackbar: action.payload.isShowSnackbar,
        msgFunc: action.payload.msgFunc,
      };
    },
  },
});

export const {
  setBottomSheet,
  closeBottomSheet,
  setLoading,
  setError,
  setSnackbar,
} = appsSlice.actions;

export const lang = (state: any) => state.app?.language ?? 'EN';

export const currency = (state: any) => state.app?.currency ?? 'HKD';

export const error = (state: any) => state.app?.error;

export const loading = (state: any) => state.app?.loading;

export default appsSlice.reducer;
