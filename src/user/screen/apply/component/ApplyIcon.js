import React from 'react';
import {StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {imgs} from '../../../../../utlis';
interface Props {
  tintColor?: String;
  color?: String;
  height?: String;
  width?: String;
}
ApplyIcon.defaultProps = {
  tintColor: 'grey',
  color: 'black',
  height: 32,
  width: 32,
};
export default function ApplyIcon(props?: Props) {
  const {source, title, onPress, tintColor, color, width, height} = props;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        style={[{tintColor, width, height}, styles.img]}
        resizeMode="cover"
        source={source ? source : imgs.clockAlert}
      />
      <Text style={[{color}, styles.title]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {},
  title: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 8,
  },
});
