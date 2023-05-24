import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { School } from "../../reducer/demo/infoType";
import { personalInfo } from "../../reducer/demo/personalReducer";
import { useAppSelector } from "../../common-ui/hooks";
import { Large } from "../../../theme/typography";
import { titleName } from "../../../theme/titleName";

type Param = {};

export const Education = (param: Param) => {
  const information = useAppSelector(personalInfo);
  const education = information.education;
  const cityu = require("../../../assets/images/demo/cityu.png");
  const ncku = require("../../../assets/images/demo/ncku.png");

  const _renderItem = ({ item, index }: { item: School; index: number }) => {
    return (
      <View style={styles.cellView}>
        <FastImage source={index == 0 ? cityu : ncku} style={styles.photo} />
        <View style={styles.infoView}>
          <Text style={styles.schoolName}>{item.name}</Text>
          <Text>{`${item.startYear} - ${item.endYear}`}</Text>
          <Text numberOfLines={2}>{item.qualify}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{titleName.demo_Education_title}</Text>
      <FlatList data={education} renderItem={_renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  titleText: {
    fontSize: 24,
    textDecorationLine: "underline",
  },
  photo: {
    height: 100,
    width: 100,
  },
  cellView: {
    flexDirection: "row",
    paddingTop: 10,
    justifyContent: "center",
  },
  schoolName: {
    fontSize: 18,
    fontWeight: "500",
  },
  infoView: {
    paddingLeft: 20,
    flex: 1,
    paddingTop: 20,
  },
});
