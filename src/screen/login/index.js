import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  Dimensions,
} from 'react-native';
let deviceWidth = Dimensions.get('window').width
const Login = (props) => {
  const txtPass = useRef(null);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [hide, setHide] = useState(true);
  const { navigation } = props;

  const onPressHandler = () => {
    const reg = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
    console.log('=========>', reg.test(user) && pass == '123456789');
    txtPass.current.clear();
    Keyboard.dismiss();
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        reg.test(user) && pass == '123456789'
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

  const onChangeUser = (value) => {
    setUser(value);
    console.log(user);
  };

  const onChangePass = (value) => {
    setPass(value);
  };

  const onHide = () => {
    setHide(!hide);
  };

  const onPressForgot = () => {
    navigation.navigate('Forgot Password');
  };

  return (
    <View style={styles.container}>
      <TextInput
        testID="test_Username"
        className="username"
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        autoCorrect={false}
        numberOfLines={1}
        multiline={false}
        style={styles.textInput}
        value={user}
        maxLength={25}
        onChangeText={onChangeUser}
        placeholder="Enter your email or phone number"
      />
      <TextInput
        ref={txtPass}
        testID="test_Password"
        className="pass"
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        autoCorrect={false}
        numberOfLines={1}
        multiline={false}
        secureTextEntry={hide}
        style={styles.textInput}
        value={pass}
        maxLength={25}
        onChangeText={onChangePass}
        placeholder="Enter your pass"
      />
      <TouchableOpacity
        style={[
          styles.hide,
          { backgroundColor: hide ? 'rgb(4, 219, 36)' : 'tomato' },
        ]}
        onPress={onHide}>
        <Text style={styles.textStyle}>Hide/Show</Text>
      </TouchableOpacity>

      <TouchableOpacity
        testID="test_Login"
        onPress={onPressHandler}
        style={styles.buttonStyle}>
        <Text style={styles.textStyle}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        testID="test_ForgotPass"
        onPress={onPressForgot}
        style={styles.forgotPass}>
        <Text style={styles.textForgot}>Forgot Password ?</Text>
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
    padding: 4,
    width: deviceWidth / 2,
    alignSelf: 'center',
  },
  textForgot: {
    alignSelf: 'center',
    color: 'tomato',
    fontSize: 20,
  },
});

export default Login;
