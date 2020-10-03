import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const ApplyIcon = (props) => {
  const { source, title, onPress } = props;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        style={styles.img}
        resizeMode="cover"
        source={source ? source : require('../../../../../naruto.jpeg')}
      />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ApplyIcon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 8,
  },
});
