import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import langs from '../../../common/language';
import { imgs, Colors } from '../../../utlis';

const currrentDate = moment().format('DD/MM/YYYY');
const day = moment().format('dddd');

interface Props extends TextInputProps {
  top?: Number;
}

function Bottom(props?: Props) {
  const {
    onPressTwo,
    title,
    type,
    onPressThree,
    onPressOne,
    method,
    top,
  } = props;
  return (
    <View style={[{ top }, styles.container]}>
      <TouchableOpacity
        style={[styles.body, { borderWidth: method === 'qr' ? 1 : 0 }]}
        onPress={onPressOne}
      >
        <Image style={styles.cancel} source={imgs.qrwhite} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.body, { borderWidth: method === 'wifi' ? 1 : 0 }]}
        onPress={onPressTwo}
      >
        <Image style={styles.cancel} source={imgs.wifiwhite} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.body, { borderWidth: method === 'code' ? 1 : 0 }]}
        onPress={onPressThree}
      >
        <Image style={styles.cancel} source={imgs.codewhite} />
      </TouchableOpacity>
    </View>
  );
}

export default Bottom;

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    bottom: 20,
  },

  cancel: {
    width: 20,
    height: 20,
  },

  body: {
    width: wp(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    height: 48,
    borderRadius: 16,
  },
});
