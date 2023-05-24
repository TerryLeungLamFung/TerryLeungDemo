import React, { useRef, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Text } from "elabasia-mobileapp-react-native-ui";

import FastImage from "react-native-fast-image";
import PagerView from "react-native-pager-view";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBarButton from "~/common-ui/AppBar/AppBarButton";
import Button, { ButtonType } from "~/common-ui/Button/Button";
import TopMenuBar, { StartShopping } from "~/common-ui/Welcome/TopMenuBar";
import { storage } from "~/storage/mmkv";
import { Colors } from "~/theme/colors";
import { Large } from "~/theme/typography";
import InsiderHelper from "~/thirdparties/insider/InsiderHelper";
import { translate } from "~/utils/i18nUtils";
import { checkNotification, requestLocation } from "~/utils/permissions";
import { RootView } from "elabasia-mobileapp-react-native-ui";

const WELCOME_TUTORIAL = [
  {
    image: "https://media.giphy.com/media/ggtpYV17RP9lTbc542/giphy.gif",
    text: `This is Terry Leung's demo app\n Please enjoy! `,
  },
];

function WelcomeDemoScreen({ navigation }) {
  const ref = useRef<PagerView>();
  const [page, setPage] = useState(0);
  const goToNextPage = async () => {
    const nextPage = page + 1;
    if (nextPage > WELCOME_TUTORIAL.length - 1) {
      storage.setBoolAsync("is_tutorial", true);
      navigation.replace("BottomTabNav");
      return;
    }
    setPage(page + 1);
    ref?.current?.setPage(page + 1);
  };
  const requestPermissions = async () => {
    switch (page) {
      case 0:
        await checkNotification({
          success: () => {
            InsiderHelper.initInsider();
            goToNextPage();
          },
          denied: goToNextPage,
        });
        break;
      case 1:
        await requestLocation();
        goToNextPage();
        break;
    }
  };
  const getPositiveBtnLabel = () => {
    switch (page) {
      case 0:
        return translate("tutorial_allow");
      case 1:
        return translate("tutorial_enable_location");
    }
  };
  const getNegativeBtnLabel = () => {
    switch (page) {
      case 0:
        return `Let's start!`;
      case 1:
        return `Let's start!`;
    }
  };
  return (
    <RootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.root}>
        {/* <TopMenuBar
          leftButtons={
            <AppBarButton
              label={'EN'}
              icon={require('~/assets/images/login/ic_language.png')}
            />
          }
          rightButtons={<StartShopping />}
        /> */}
        <PagerView
          ref={ref}
          initialPage={page}
          scrollEnabled={false}
          style={{ flex: 1 }}
        >
          {WELCOME_TUTORIAL.map((tutorial, index) => {
            return (
              <View key={`tutorial-${index}`} style={styles.center}>
                <FastImage
                  source={{
                    uri: tutorial.image,
                  }}
                  style={styles.tutorialImage}
                />
                <Text style={styles.tutorialText}>{tutorial.text}</Text>
              </View>
            );
          })}
        </PagerView>
        {/* <Button label={getPositiveBtnLabel()} onPress={requestPermissions} /> */}
        <Button
          label={getNegativeBtnLabel()}
          type={ButtonType.secondary}
          onPress={goToNextPage}
        />
      </SafeAreaView>
    </RootView>
  );
}

export default WelcomeDemoScreen;

const styles = StyleSheet.create({
  tutorialText: {
    ...Large,
    color: Colors.Blue_900,
    marginTop: 20,
  },
  tutorialImage: {
    width: 280,
    height: 280,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    // ...Platform.select({
    //   android: {
    //     paddingTop: 8,
    //   },
    // }),
  },
});
