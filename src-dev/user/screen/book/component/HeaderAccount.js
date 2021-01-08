import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Colors} from '../../../../../utlis/';
 import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const HeaderAccount = ({ numberOfEvent }) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.txtTitle}>Lịch</Text>
        {numberOfEvent && numberOfEvent > 0 ? (
          <Text style={styles.txtDetail}>
            Hôm nay bạn có {numberOfEvent} lịch họp.
          </Text>
        ) : (
          <Text style={styles.txtDetail}>Bạn chưa có lịch họp nào.</Text>
        )}
      </View>
      <LinearGradient
        style={[styles.gradient]}
        colors={['#D5D5D5', '#F2F2F2']}
      />
    </View>
  );
};

export default HeaderAccount;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },

  info: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 24,
  },

  txtTitle: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Quicksand-Bold',
    color: 'black',
  },

  txtDetail: {
    fontSize: 16,
    fontWeight: '300',
    color: 'black',
    marginVertical: 4,
  },
  line: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: Colors.gray,
  },
  bot: {
    flex: 1,
  },
  gradient: {
    width: wp(100),
    height: 4,
  },
});
