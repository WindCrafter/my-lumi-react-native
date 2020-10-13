import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Colors} from '../../../../../utlis';

const PickerCustom = (props) => {
  const {value, onPress, onChange, mode} = props;
  return (
    <>
      {Platform.OS === 'ios' ? (
        <TouchableOpacity style={styles.unshow} onPress={onPress}>
          <Text style={styles.txtX}>X</Text>
        </TouchableOpacity>
      ) : null}

      <DateTimePicker
        value={value}
        mode={mode}
        display="default"
        onChange={onChange}
        is24hour={true}
        minimumDate={new Date()}
      />
    </>
  );
};

export default PickerCustom;

const styles = StyleSheet.create({
  unshow: {
    height: 28,
    width: 28,
    borderRadius: 14,
    right: 0,
    backgroundColor: 'tomato',
    alignSelf: 'flex-end',
    marginRight: 24,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtX: {
    color: Colors.white,
    fontWeight: '900',
  },
});
