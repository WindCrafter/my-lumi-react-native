import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

const ForgotPass = (props) => {
  const [code, setCode] = useState('');

  const onChangeUser = (value) => {
    setCode(value);
  };

  const onConfirms = () => {
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        code == '123456'
          ? {
            text: 'success',
            onPress: () => console.log('Ask me later pressed'),
          }
          : {
            text: 'failed',
            onPress: () => console.log('Ask me later pressed'),
          },
      ],
      { cancelable: false },
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        testID="test_Code"
        className="code"
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        autoCorrect={false}
        numberOfLines={1}
        multiline={false}
        style={styles.textInput}
        value={code}
        maxLength={25}
        onChangeText={onChangeUser}
        placeholder="Code Verify"
      />

      <TouchableOpacity
        testID="test_GetCode"
        style={[styles.buttonStyle, { backgroundColor: 'tomato' }]}>
        <Text style={styles.textStyle}>Get Code </Text>
      </TouchableOpacity>

      <TouchableOpacity
        testID="test_Confirm"
        onPress={onConfirms}
        style={styles.buttonStyle}>
        <Text style={styles.textStyle}>Confirm </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgb(212, 204, 201)',
  },
  textInput: {
    backgroundColor: 'white',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 25,
    marginVertical: 16,
    paddingHorizontal: 16,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonStyle: {
    height: 45,
    width: '90%',
    justifyContent: 'center',
    backgroundColor: '#38ba7d',
    borderBottomColor: '#1e6343',
    borderRadius: 16,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignSelf: 'center',
    marginVertical: 32,
  },
  hide: {
    height: 50,
    width: '40%',
    paddingHorizontal: 16,
    borderRadius: 25,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  forgotPass: {
    padding: 32,
  },
  textForgot: {
    alignSelf: 'center',
    color: 'tomato',
    fontSize: 20,
  },
});

export default ForgotPass;
