import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Event = (props) => {
  return (
    <>
      <View style={styles.manager}>
        <Text style={styles.txtManager}>Sự kiện</Text>
        <Text style={styles.txtDetail}> Hiện chưa có sự kiện nào</Text>
      </View>
    </>
  );
};

export default Event;

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