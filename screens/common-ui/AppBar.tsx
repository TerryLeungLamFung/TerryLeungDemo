import { CommonActions, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  Platform,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
  Text,
} from "react-native";
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Colors } from "../../theme/colors";
import { RegularTightRegular, Tiny } from "../../theme/typography";
import AppBarButton from "./AppBarButton";
import getDefaultHeaderHeight from "./getDefaultHeaderHeight";

type AppBarProps = {
  /**
   * AppBar title
   */
  title?: string;
  /**
   * Visiblilty of back arrow button
   */
  showBack?: boolean;
  showClose?: boolean;
  /**
   * Group of Left Action Buttons
   */
  leftButton?: JSX.Element;
  /**
   * Group of Right Action Buttons
   */
  rightButton?: JSX.Element;
  /**
   * hidden bottom line
   */
  hiddenBottomLine?: boolean;
  /**
   * title style
   */
  titleStyle?: StyleProp<TextStyle>;
};

type AppBarHomeProps = {
  bgStyle?: StyleProp<ViewStyle>;
  children?: JSX.Element;
};

/**
 * Fortress AppBar Component
 */
export default function AppBar({
  showBack = false,
  showClose = false,
  leftButton,
  rightButton,
  hiddenBottomLine = false,
  title = "",
  titleStyle,
}: AppBarProps) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();
  const height = getDefaultHeaderHeight(frame, insets.top);
  let leftButtons = null;
  if (showBack) {
    leftButtons = (
      <AppBarButton
        testId={{ id: "back" }}
        onPress={() => navigation.goBack()}
        icon={require("../../assets/images/demo/ic_back.png")}
      />
    );
  } else if (showClose) {
    leftButtons = (
      <AppBarButton
        testId={{ id: "close" }}
        onPress={() => navigation.goBack()}
        icon={require("../../assets/images/demo/ic_close.png")}
      />
    );
  } else {
    leftButtons = leftButton;
  }

  let shadow = {};

  if (!hiddenBottomLine) {
    shadow = styles.shadow;
  }

  return (
    <View pointerEvents="box-none" style={[styles.appBar, shadow, { height }]}>
      {/** Status Bar Margin */}
      <View pointerEvents="none" style={{ height: insets.top }} />
      {/** App Bar Content */}
      <View pointerEvents="box-none" style={styles.content}>
        {/** App Bar Left Buttons */}
        <View pointerEvents="box-none" style={[styles.left, styles.expand]}>
          {leftButtons}
        </View>
        {/** App Bar Title */}
        <View
          pointerEvents="box-none"
          style={[
            styles.title,
            {
              maxWidth:
                frame.width -
                ((leftButton ? (showBack !== false ? 80 : 32) : 16) +
                  Math.max(insets.left, insets.right)) *
                  2,
            },
          ]}
        >
          <Text style={[styles.titleText, titleStyle]}>{title}</Text>
        </View>
        {/** App Bar Right Buttons */}
        <View pointerEvents="box-none" style={[styles.right, styles.expand]}>
          {rightButton}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appBarHomeWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  center: {
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
  },
  nameText: {
    ...RegularTightRegular,
    fontWeight: "700",
    color: Colors.White,
  },
  searchInput: {
    flex: 1,
    height: 42,
  },
  searchIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  searchBarWrapper: {
    flex: 1,
    height: 32,
    borderRadius: 16,
    marginLeft: 10,
    paddingLeft: 8,
    backgroundColor: Colors.White,
    flexDirection: "row",
    alignItems: "center",
  },
  appBar: {
    backgroundColor: "#fff",
  },
  shadow: {
    // ...Platform.select({
    //   ios: {
    //     shadowColor: "rgba(0,0,0,0.5)",
    //     shadowOffset: {
    //       width: 0.5,
    //       height: 0.5,
    //     },
    //     shadowRadius: 1,
    //     shadowOpacity: 0.5,
    //   },
    //   android: {
    //     elevation: 1,
    //   },
    // }),
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
  },
  left: {
    marginStart: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  right: {
    marginEnd: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    marginHorizontal: 16,
    justifyContent: "center",
  },
  titleText: {
    textAlign: "center",
    fontSize: 16,
    color: "#042B60",
    fontWeight: "700",
  },
  expand: {
    flexGrow: 1,
    flexBasis: 0,
  },
  appBarHome: {
    width: "100%",
    height: 48,
    paddingHorizontal: 8,
  },
  mbIcon: {
    width: 40,
    height: 40,
  },
  searchTextPlcaeHolder: {
    color: Colors.Gray_600,
  },
});
