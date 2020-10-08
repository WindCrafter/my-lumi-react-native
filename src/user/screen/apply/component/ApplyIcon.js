import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {imgs} from '../../../../../utlis';
interface Props {
  tintColor?: String;
  
}
ApplyIcon.defaultProps = {
  tintColor: 'grey',

};
export default function ApplyIcon(props?: Props) {
  const { source, title, onPress, tintColor} = props;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        style={[{tintColor},styles.img]}
        resizeMode="cover"
        source={source ? source : imgs.clockAlert}
      />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 32,
    height: 32,
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 8,
  },
});
