import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HeaderAccount = ({ numberOfEvent }) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.txtTitle}>Lịch</Text>
        {(numberOfEvent
          && numberOfEvent > 0) ? (
            <Text style={styles.txtDetail}>
              Hôm nay bạn có
              {' '}
              {numberOfEvent}
              {' '}
              lịch họp.
            </Text>
          ) : (
            <Text style={styles.txtDetail}>
              `Hiện tại chưa có lịch họp`
            </Text>
          ) }
      </View>
      <View style={styles.line} />
      <View style={styles.bot} />
    </View>
  );
};

export default HeaderAccount;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
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
    backgroundColor: 'black',
  },
  bot: {
    flex: 1,
  },
});
