import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Skills, WorkExperience } from "../../reducer/demo/infoType";
import { personalInfo } from "../../reducer/demo/personalReducer";
import { useAppSelector } from "../../common-ui/hooks";
import { titleName } from "../../../theme/titleName";

type Param = {};

export const HighlightedSkills = (param: Param) => {
  const information = useAppSelector(personalInfo);
  const skills = information.skills;

  const _renderItem = ({ item, index }: { item: Skills; index: number }) => {
    return (
      <View style={styles.cellView}>
        <Text style={styles.catText}>{item.category}</Text>
        <Text style={styles.desText}>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        {titleName.demo_HightlightedSkills_title}
      </Text>
      <FlatList data={skills} renderItem={_renderItem} />
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
  cellView: {
    borderColor: "#000000",
    borderWidth: 3,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    paddingVertical: 5,
  },
  catText: {
    fontSize: 18,
    fontWeight: "500",
  },
  desText: {
    fontSize: 14,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
});
