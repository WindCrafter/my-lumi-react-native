import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {widthPercentageToDP as hp} from 'react-native-responsive-screen';
const SIZEOFBORDER = 5;

export default class CusMarker extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.column}>
            <View style={styles.leftTop} />
          </View>
          <View style={styles.column}>
            <View style={styles.rightTop} />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <View style={styles.leftBot} />
          </View>
          <View style={styles.column}>
            <View style={styles.rightBot} />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {flexDirection: 'column'},
  leftTop: {
    borderColor: 'green',
    borderTopWidth: SIZEOFBORDER,
    width: hp(20),
    borderLeftWidth: SIZEOFBORDER,
    height: hp(20),
  },
  leftTopCol: {
    height: hp(20),
    borderColor: 'green',
  },
  rightTop: {
    borderColor: 'green',
    borderTopWidth: SIZEOFBORDER,
    width: hp(20),
    borderRightWidth: SIZEOFBORDER,
    height: hp(20),
  },

  leftBot: {
    height: hp(20),
    borderColor: 'green',
    borderLeftWidth: SIZEOFBORDER,
    borderBottomWidth: SIZEOFBORDER,
    width: hp(20),
  },
  rightBot: {
    height: hp(20),
    borderColor: 'green',
    borderRightWidth: SIZEOFBORDER,
    borderBottomWidth: SIZEOFBORDER,
    width: hp(20),
  },
});
