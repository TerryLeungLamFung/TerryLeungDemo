import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { personalInfo } from "../../reducer/demo/personalReducer";
import { useAppSelector } from "../../common-ui/hooks";
import { Colors } from "../../../theme/colors";
import { titleName } from "../../../theme/titleName";

type Param = {};

export const WorkExperience = (param: Param) => {
  const information = useAppSelector(personalInfo);
  const experiences = information.experience;

  const _renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View style={styles.jobView}>
        <Text style={styles.companyText}>{item.companyName}</Text>
        <View style={styles.positionView}>
          <Text style={styles.positionText}>{item.position}</Text>
          <Text
            style={styles.positionText}
          >{`${item.startDate}-${item.endDate}`}</Text>
        </View>
        <FlatList
          data={item.description}
          renderItem={(desc: any) => {
            return (
              <View style={styles.descView}>
                <Text style={styles.descText}>
                  <FastImage
                    source={require("../../../assets/images/demo/check_box_fill_orange.png")}
                    style={styles.descImg}
                  />
                  {` ${desc.item}`}
                </Text>
              </View>
            );
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        {titleName.demo_WorkExperience_title}
      </Text>
      <FlatList data={experiences} renderItem={_renderItem} />
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
  companyText: {
    fontSize: 20,
    backgroundColor: Colors.AppBar.End,
    fontWeight: "700",
  },
  jobView: {
    paddingTop: 10,
  },
  positionText: {
    fontSize: 16,
    lineHeight: 20,
    fontStyle: "italic",
  },
  positionView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  descText: {
    fontSize: 10,
  },
  descImg: {
    height: 8,
    width: 8,
  },
  descView: {
    flexDirection: "row",
    paddingTop: 5,
  },
});
