import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import langs from '../../../../../common/language';
import { imgs } from '../../../../../utlis';
const Event = (props) => {
  return (
    <>
      <View style={styles.checkInOut}>
        <Image source={imgs.checkingreen} style={styles.checkInIcon} />
        <Text style={styles.txtManager}>{langs.checkIn}</Text>
        <Image source={imgs.return} style={styles.rowIcon} />
      </View>
    </>
  );
};

export default Event;

const styles = StyleSheet.create({
  txtManager: {
    fontSize: 20,
    alignSelf: 'center',
  },
  txtDetail: {
    fontSize: 14,
    alignSelf: 'center',
  },
  checkInOut: {
    flexDirection: 'row',
    height: 72,
    alignItems: 'center'
  },
  checkInIcon: {
    margin: 28
  },
  rowIcon: {

  }
});
