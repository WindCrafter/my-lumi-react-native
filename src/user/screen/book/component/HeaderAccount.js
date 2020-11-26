import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const HeaderAccount = () => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.txtTitle}>Lịch</Text>
        <Text style={styles.txtDetail}>Xem lịch làm việc.</Text>
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
    fontWeight: '700',
    color: 'black',
  },

  txtDetail: {
    fontSize: 16,
    fontWeight: '300',
    color: 'black',
    marginVertical: 4,
  },
  line: {height: 1, width: '100%', backgroundColor: 'black'},
  bot: {
    flex: 1,
    paddingBottom: 16,
  },
});
