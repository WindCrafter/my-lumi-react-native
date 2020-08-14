import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import langs from '../../../../common/language';

const DeadLine = (props) => {
  return (
    <>
      <View style={styles.manager}>
        <Text style={styles.txtManager}>{langs.dealLine}</Text>
        <Text style={styles.txtDetail}>
          {' '}
          Hiện chưa có dự án hoặc deadline nào
        </Text>
      </View>
    </>
  );
};

export default DeadLine;

const styles = StyleSheet.create({
  txtManager: {
    fontSize: 20,
    alignSelf: 'center',
    height: 30,
    marginBottom: 8,
  },
  txtDetail: {
    fontSize: 14,
    alignSelf: 'center',
    height: 30,
  },
});
