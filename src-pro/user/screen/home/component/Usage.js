import React from 'react';
import {StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {Card} from 'native-base';

const Usage = (props) => {
  const {source, text, tintColor, onPressButton} = props;
  return (
    <TouchableOpacity style={styles.container} onPress={onPressButton}>
      <Card style={styles.manager}>
        <Image source={source} style={[styles.img, {tintColor: tintColor}]} />
        <Text style={styles.txt}>{text}</Text>
      </Card>
    </TouchableOpacity>
  );
};

export default Usage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  manager: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 24,
  },
  img: {
    height: 18,
    width: 18,
  },
  txt: {
    fontSize: 12,
  },
});