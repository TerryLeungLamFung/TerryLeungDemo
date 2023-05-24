import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Params = {};

export const StickyHeader = (params: Params) => {
  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.button}>
        <Text>gogoog</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={[1, 1, 1, 1]} renderItem={_renderItem} horizontal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: '#ff0000',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
});
