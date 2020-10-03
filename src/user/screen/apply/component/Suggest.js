import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const Suggest = (props) => {
  const { detail, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.txt}>{detail}</Text>
      <View style={styles.line} />
    </TouchableOpacity>
  );
};

export default Suggest;

const styles = StyleSheet.create({
  txt: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8,
  },
  line: {
    height: 0.5,
    width: '85%',
    backgroundColor: 'gray',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
