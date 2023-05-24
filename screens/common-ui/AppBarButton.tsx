import React from "react";
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
  Text,
} from "react-native";
import FastImage from "react-native-fast-image";
import { Colors } from "../../theme/colors";
import { Regular, Title1 } from "../../theme/typography";

type AppBarButtonProps = {
  testId: any;
  style?: StyleProp<ViewStyle>;
  /**
   * function fire when onClick the button
   */
  onPress?: () => void;
  /**
   * image source
   */
  icon?: ImageSourcePropType;
  /**
   * label
   */
  label?: string;
  /**
   * label style
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * icon style
   */
  iconStyle?: StyleProp<ImageStyle>;
  isCart?: Boolean;
};
/**
 * AppBar Action Button
 *
 * @param AppBarButtonProps
 * @returns
 */
export default function AppBarButton({
  style,
  icon,
  onPress,
  label,
  labelStyle,
  iconStyle,
  testId,
  isCart,
}: AppBarButtonProps) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={{ marginRight: 8 }}>
        <FastImage source={icon} style={[styles.icon, iconStyle]} />
      </View>
      {label && <Text style={[Regular, labelStyle]}>{label}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 24,
    width: 24,
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
  cartBadge: {
    position: "absolute",
    height: 12,
    borderRadius: 12,
    right: -8,
    top: -8,
    backgroundColor: Colors.Blue_600,
    alignItems: "center",
    justifyContent: "center",
  },
  cartAmountText: {
    ...Title1,
    fontSize: 8,
    color: "#FFF",
    paddingHorizontal: 4,
  },
});
