import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';const SIZEOFBORDER = 5;

export default class CusMarker extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.leftTop} />
          <View style={styles.rightTop} />
        </View>
        <View style={styles.row}>
          <View style={styles.leftBot} />

          <View style={styles.rightBot} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: wp(50),
    justifyContent: 'space-between',
    alignContent: 'center',
    height: wp(50),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {flexDirection: 'column'},
  leftTop: {
    borderColor: 'green',
    borderTopWidth: SIZEOFBORDER,
    width: wp(20),
    borderLeftWidth: SIZEOFBORDER,
    height: wp(20),
  },
  leftTopCol: {
    height: wp(20),
    borderColor: 'green',
  },
  rightTop: {
    borderColor: 'green',
    borderTopWidth: SIZEOFBORDER,
    width: wp(20),
    borderRightWidth: SIZEOFBORDER,
    height: wp(20),
  },

  leftBot: {
    height: wp(20),
    borderColor: 'green',
    borderLeftWidth: SIZEOFBORDER,
    borderBottomWidth: SIZEOFBORDER,
    width: wp(20),
  },
  rightBot: {
    height: wp(20),
    borderColor: 'green',
    borderRightWidth: SIZEOFBORDER,
    borderBottomWidth: SIZEOFBORDER,
    width: wp(20),
  },
});
