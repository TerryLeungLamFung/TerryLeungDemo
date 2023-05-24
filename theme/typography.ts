import {TextStyle} from 'react-native';

export const Font = {
  Title1: 32,
  Title2: 24,
  subTitle: 20,
  Large: 18,
  Middle: 16,
  Regular: 14,
  Tiny: 10,
};

export const LineHeight = {
  Title1: 36,
  Title2: 32,
  SubTitle: 27,
  Large: 24,
  LargeTight: 20,
  Body: 22,
  Middle: 16,
  Regular: 20,
  Tiny: 16,
};

export const FontWeight = {
  Normal: '700',
  Tight: '400',
};

export enum FontFamily {
  NunitoSans = 'Nunito Sans',
}

export const Title1 = {
  fontSize: Font.Title1,
  lineHeight: LineHeight.Title1,
  fontWeight: FontWeight.Normal,
  //fontFamily: FontFamily.NunitoSans,
} as TextStyle;

export const Bold = {
  fontSize: Font.Large,
  lineHeight: LineHeight.LargeTight,
  fontWeight: FontWeight.Normal,
  //fontFamily: FontFamily.NunitoSans,
} as TextStyle;

export const Title2 = {
  fontSize: Font.Title2,
  lineHeight: LineHeight.Title2,
  fontWeight: FontWeight.Normal,
  //fontFamily: FontFamily.NunitoSans,
} as TextStyle;

export const Large = {
  fontSize: Font.Large,
  lineHeight: LineHeight.Large,
  fontWeight: FontWeight.Normal,
  //fontFamily: FontFamily.NunitoSans,
} as TextStyle;

export const LargeTight = {
  fontSize: Font.Large,
  lineHeight: LineHeight.LargeTight,
  fontWeight: FontWeight.Tight,
  //fontFamily: FontFamily.NunitoSans,
} as TextStyle;

export const Middle = {
  fontSize: Font.Middle,
  lineHeight: LineHeight.Middle,
  fontWeight: FontWeight.Normal,
  //fontFamily: FontFamily.NunitoSans,
} as TextStyle;

export const Regular = {
  fontSize: Font.Regular,
  lineHeight: LineHeight.Regular,
  fontWeight: FontWeight.Normal,
  //fontFamily: FontFamily.NunitoSans,
} as TextStyle;

//regulat tight regular
export const RegularTightRegular = {
  fontSize: Font.Regular,
  lineHeight: LineHeight.Tiny,
  fontWeight: FontWeight.Tight,
  //fontFamily: FontFamily.NunitoSans,
} as TextStyle;

export const RegularTightBold = {
  fontSize: Font.Regular,
  lineHeight: LineHeight.Tiny,
  fontWeight: FontWeight.Normal,
} as TextStyle;

export const Tiny = {
  fontSize: Font.Tiny,
  lineHeight: LineHeight.Tiny,
  fontWeight: FontWeight.Tight,
  //fontFamily: FontFamily.NunitoSans,
} as TextStyle;
export const TitlePageSubtitle = {
  fontSize: Font.subTitle,
  lineHeight: LineHeight.SubTitle,
  //fontFamily: FontFamily.NunitoSans,
  fontWeight: FontWeight.Normal,
} as TextStyle;
export const TextBodyText = {
  fontSize: Font.Middle,
  lineHeight: LineHeight.Body,
  //fontFamily: FontFamily.NunitoSans,
  fontWeight: FontWeight.Tight,
} as TextStyle;
