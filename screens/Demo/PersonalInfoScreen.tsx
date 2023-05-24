import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import AppBar from '../common-ui/AppBar';
import {StickyHeaderComponent} from '../../screens/common-ui/StickyHeaderComponent';
import {Education} from './PersonalComponent/Education';
import {HighlightedSkills} from './PersonalComponent/HighlightedSkills';
import {PersonInfo} from './PersonalComponent/PeronalInfo';
import {WorkExperience} from './PersonalComponent/WorkExperience';
import {titleName} from '../../theme/titleName';

type Props = {};

function PersonalInfoScreen(props: Props) {
  const scrollViewRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [tabIndex, setTabIndex] = useState([]);
  const [personalInfoY, setPersonalInfoY] = useState<number>(0);
  const [highlightSkillsY, setHighlightSkillsY] = useState<number>(0);
  const [workExperienceY, setWorkExperienceY] = useState<number>(0);
  const [educationY, setEducationY] = useState<number>(0);

  useEffect(() => {
    let tabInfo = [];
    if (personalInfoY > 0) {
      tabInfo.push({
        name: titleName.demo_PersonalInfo_title,
        index: 0,
        height: personalInfoY,
      });
    }
    if (highlightSkillsY > 0) {
      tabInfo.push({
        name: titleName.demo_HightlightedSkills_title,
        index: 1,
        height: highlightSkillsY,
      });
    }
    if (workExperienceY > 0) {
      tabInfo.push({
        name: titleName.demo_WorkExperience_title,
        index: 2,
        height: workExperienceY,
      });
    }
    if (educationY > 0) {
      tabInfo.push({
        name: titleName.demo_Education_title,
        index: 3,
        height: educationY,
      });
    }
    setTabIndex(tabInfo);
  }, [personalInfoY, highlightSkillsY, workExperienceY, educationY]);

  const onScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y ?? 0;
    if (offsetY > educationY) {
      setActiveIndex(3);
    } else if (offsetY > workExperienceY) {
      setActiveIndex(2);
    } else if (offsetY > highlightSkillsY) {
      setActiveIndex(1);
    } else {
      setActiveIndex(0);
    }
  };

  return (
    <View style={styles.container}>
      <AppBar title={titleName.demo_personalInfoScreenTitle} showBack />
      <ScrollView
        stickyHeaderIndices={[1]}
        onScroll={onScroll}
        ref={scrollViewRef}>
        <View
          onLayout={event => {
            const layout = event.nativeEvent.layout;
            setPersonalInfoY(layout.y);
          }}>
          <PersonInfo />
        </View>

        <StickyHeaderComponent
          tabIndex={tabIndex}
          activeIndex={activeIndex}
          onTabPress={item => {
            scrollViewRef.current.scrollTo({
              y: item.height - 45,
            });
          }}
        />

        <View
          onLayout={event => {
            const layout = event.nativeEvent.layout;
            setHighlightSkillsY(layout.y);
          }}>
          <HighlightedSkills />
        </View>

        <View
          onLayout={event => {
            const layout = event.nativeEvent.layout;
            setWorkExperienceY(layout.y);
          }}>
          <WorkExperience />
        </View>

        <View
          onLayout={event => {
            const layout = event.nativeEvent.layout;
            setEducationY(layout.y);
          }}>
          <Education />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
});

export default PersonalInfoScreen;
