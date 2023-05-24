import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../theme/colors";
import { RegularTightRegular } from "../../theme/typography";

type Params = {
  tabIndex: any[];
  activeIndex: number;
  onTabPress: any;
};

export const StickyHeaderComponent = (props: Params) => {
  const scrollTap = () => {
    return (
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={props.tabIndex}
        renderItem={({ item, index }) => (
          <View>
            <View
              style={[
                styles.container,
                index === props.activeIndex && styles.selectedTabItem,
              ]}
            >
              <TouchableOpacity
                key={item}
                style={styles.tabItem}
                onPress={() => {
                  props.onTabPress(item);
                }}
              >
                <Text
                  style={[
                    styles.label,
                    index === props.activeIndex && styles.selectedTabText,
                  ]}
                >
                  {item && item.length > 35
                    ? item.substring(0, 35 - 3) + "..."
                    : item.name}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    );
  };

  return <View style={styles.tabBar}>{scrollTap()}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    height: 48,
  },
  tabBar: {
    backgroundColor: Colors.White,
    flexDirection: "row",
    shadowColor: Colors.Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,

    elevation: 5,
  },
  tabItem: {
    padding: 15,
  },
  selectedTabItem: {
    borderBottomColor: Colors.Primary,
    borderBottomWidth: 3,
  },
  label: {
    ...RegularTightRegular,
    color: Colors.Gray_600,
    textAlign: "center",
  },
  selectedTabText: {
    color: Colors.Primary,
    fontWeight: "700",
  },
});
