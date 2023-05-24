import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {personalInfo} from '../../reducer/demo/personalReducer';
import {useAppSelector} from '../../common-ui/hooks';
import {Large, Middle} from '../../../theme/typography';

type Param = {};

export const PersonInfo = (param: Param) => {
  const information = useAppSelector(personalInfo);
  const info = information.info;
  return (
    <View style={styles.container}>
      <View style={styles.iconView}>
        <FastImage
          source={require('../../../assets/images/demo/lamfung_icon.jpg')}
          style={styles.icon}
        />
        <View style={styles.infoView}>
          <Text
            style={
              styles.nameText
            }>{`${info.firstName} ${info.lastName}`}</Text>
          <Text style={styles.headlineText}>{info.headline}</Text>
        </View>
      </View>
      <View style={styles.basicView}>
        <View style={styles.infoTextView}>
          <Text style={styles.basicText}>Mobile Phone:</Text>
          <Text style={styles.basicInfoText}>{info.tel}</Text>
        </View>
        <View style={styles.infoTextView}>
          <Text style={styles.basicText}>Email Address:</Text>
          <Text style={styles.basicInfoText}>{info.email}</Text>
        </View>
        <View style={styles.infoTextView}>
          <Text style={styles.basicText}>Address:</Text>
          <Text style={styles.basicInfoText}>{info.address}</Text>
        </View>
        <View style={styles.infoTextView}>
          <Text style={styles.basicText}>Availability:</Text>
          <Text style={styles.basicInfoText}>{info.availability}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  titleText: {
    ...Large,
  },
  icon: {
    height: 140,
    width: 140,
  },
  iconView: {
    flexDirection: 'row',
  },
  infoView: {
    paddingLeft: 10,
    flex: 1,
  },
  nameText: {
    fontSize: 30,
    fontFamily: 'Arial',
    alignSelf: 'center',
    fontWeight: '700',
  },
  basicText: {
    ...Middle,
    lineHeight: 20,
    width: 120,
  },
  basicView: {
    paddingTop: 10,
  },
  infoTextView: {
    flexDirection: 'row',
  },
  basicInfoText: {
    ...Middle,
    lineHeight: 20,
  },
  headlineText: {
    flex: 1,
    paddingTop: 10,
  },
});
