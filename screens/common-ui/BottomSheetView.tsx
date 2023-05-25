import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {BlurView} from '@react-native-community/blur';
import React, {useEffect, useRef} from 'react';
import {Modal, SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {closeBottomSheet} from '../../screens/reducer/appReducer';
import {useAppSelector, useAppDispatch} from '../../screens/common-ui/hooks';
import {Colors} from '../../theme/colors';
import {Regular} from '../../theme/typography';
import {BottomSheetType} from '../../screens/type/app';

export default function BottomSheetView() {
  const bottomSheet = useAppSelector(
    state => state.app.bottomSheet,
  ) as BottomSheetType;
  const dispatch = useAppDispatch();
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (bottomSheet.isShowBottomSheet) {
      bottomSheetRef.current?.snapToIndex(0);
    }
  }, [bottomSheet]);
  let background = (
    <TouchableOpacity
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
      }}
      onPress={() => {
        if (!bottomSheet.disableBackgroundClick) {
          bottomSheetRef.current?.close();
          setTimeout(() => {
            dispatch(closeBottomSheet());
          }, 300);
        }
      }}>
      <BlurView
        style={{width: '100%', height: '100%'}}
        blurType="dark"
        blurAmount={5}
      />
    </TouchableOpacity>
  );

  let title = (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{...Regular, color: Colors.Blue_900}}>
        {bottomSheet.title}
      </Text>
    </View>
  );

  if (bottomSheet?.hideBackground) {
    background = <></>;
  }
  if (bottomSheet?.hideTitle) {
    title = <></>;
  }
  let bottomSheetProps = {};
  if (bottomSheet?.bottomSheetProps) {
    bottomSheetProps = bottomSheet?.bottomSheetProps;
  }
  let mainView = (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={
        bottomSheet?.snapPoints ? bottomSheet.snapPoints : ['35%', '50%', '90%']
      }
      {...bottomSheetProps}>
      <BottomSheetScrollView>
        {title}
        {bottomSheet.bottomSheetContent}
      </BottomSheetScrollView>
    </BottomSheet>
  );

  if (bottomSheet?.disableDrag) {
    mainView = (
      <SafeAreaView
        style={{
          backgroundColor: '#ffffff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}>
        <View style={{paddingTop: 18}}>
          {title}
          {bottomSheet.bottomSheetContent}
        </View>
      </SafeAreaView>
    );
  }

  if (bottomSheet.noModal) {
    return (
      <>
        {background}
        {mainView}
      </>
    );
  }

  const Main = gestureHandlerRootHOC(() => {
    return (
      <>
        {background}
        {mainView}
      </>
    );
  });

  return (
    <Modal
      transparent={true}
      visible={bottomSheet.isShowBottomSheet}
      animationType={'fade'}>
      <Main />
    </Modal>
  );
}
