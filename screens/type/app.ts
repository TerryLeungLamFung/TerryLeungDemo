export type AppState = {
  loading: boolean;
  error: any;
  bottomSheet: BottomSheetType;
  snackbar: SnackbarType;
};

export type BottomSheetType = {
  title?: string;
  isShowBottomSheet?: boolean;
  disableDrag?: boolean;
  screenName: string;
  disableBackgroundClick?: boolean;
  bottomSheetContent?: JSX.Element;
  snapPoints?: string[] | number[];
  hideTitle?: boolean;
  hideBackground?: boolean;
  bottomSheetProps?: object;
  noModal?: boolean;
};

export type SnackbarType = {
  msgType: MsgType;
  toastMsg: string;
  btnTxt: string;
  withCloseBtn: boolean;
  isShowSnackbar: boolean;
  msgFunc?: () => void;
};

export enum MsgType {
  error = "e",
  success = "s",
}
