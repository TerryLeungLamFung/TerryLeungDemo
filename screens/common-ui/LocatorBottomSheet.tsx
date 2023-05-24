import { Dimensions } from "react-native";
import React, { forwardRef, Ref, useEffect, useImperativeHandle } from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  subject: JSX.Element;
  enableGesture: boolean;
  state1Height?: number;
  state2Height?: number;
  currentState?: number;
  closeBottomSheetCallBack?: () => void;
  backbroundColor?: string;
};
export type refType = {
  dialogAnimControl: (open: boolean) => void;
};

const screenHeight = Dimensions.get("window").height;

export const LocatorBottomSheet = (
  {
    subject,
    enableGesture,
    state1Height,
    state2Height,
    closeBottomSheetCallBack,
    backbroundColor,
  }: Props,
  ref: Ref<refType>
) => {
  const offset = useSharedValue(-screenHeight);
  const dialogAnimControl = (open: boolean) => {
    offset.value = withTiming(open ? 0 : -screenHeight, { duration: 350 });
  };
  const state = useSharedValue(2);
  const startState = useSharedValue(2);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      bottom: offset.value,
    };
  });
  function delaySetState(value: number) {
    setTimeout(() => {
      state.value = value;
    }, 500);
  }
  const gesture = Gesture.Pan()
    .onBegin(() => {
      "worklet";
      startState.value = state.value;
    })
    .onChange((e) => {
      "worklet";

      if (state.value === 2 && e.changeY > 15 && state1Height !== undefined) {
        if (startState.value === 2) {
          state.value = 1;
        }
      } else if (state.value === 1 && e.changeY > 15) {
        if (startState.value === 1) {
          state.value = 0;
        }
      } else if (state.value === 1 && e.changeY < -15) {
        if (startState.value === 1) {
          state.value = 2;
        }
      }
    })
    .onFinalize(() => {
      "worklet";
      startState.value = state.value;
      if (state.value === 2) {
        offset.value = withTiming(0, { duration: 250 });
      } else if (state.value === 1) {
        offset.value = withTiming(-state2Height - 10, { duration: 250 });
      } else if (state.value === 0) {
        offset.value = withTiming(-screenHeight, { duration: 250 }, () => {
          if (closeBottomSheetCallBack !== undefined) {
            runOnJS(closeBottomSheetCallBack)();
          }
        });
      }
    });

  useEffect(() => {
    dialogAnimControl(true);
  }, []);
  useImperativeHandle(ref, () => ({
    dialogAnimControl: dialogAnimControl,
  }));
  function subjectView() {
    return (
      <Animated.View style={[styles.cardDialogContainer, animatedStyles]}>
        {subject}
      </Animated.View>
    );
  }
  const safeArea = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            backbroundColor !== undefined ? backbroundColor : undefined,
          marginBottom: safeArea.bottom,
        },
      ]}
      pointerEvents={"box-none"}
    >
      {enableGesture ? (
        <GestureDetector gesture={gesture}>{subjectView()}</GestureDetector>
      ) : (
        subjectView()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 999,
  },
  cardDialogContainer: {
    position: "absolute",
    width: "100%",
    bottom: -screenHeight,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: "white",
    flexDirection: "column",
  },
});
export default forwardRef(LocatorBottomSheet);
