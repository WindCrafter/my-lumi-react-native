import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Colors } from '../../../../utlis';

const Account = (props) => {
  const { logOut } = props;

  const onLogOut = () => {
    logOut();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logOut} onPress={onLogOut}>
        <Text style={styles.txtLogOut}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logOut: {
    width: '80%',
    height: 60,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  txtLogOut: {
    fontWeight: '600',
    fontSize: 20,
    color: Colors.background,
  },
});
