/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */
import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Keyboard,
  Dimensions,
  StatusBar,
} from 'react-native';
import {Logo, Input, InputPassword, Checkbox, Button} from '../../../component';
import langs from '../../../../common/language';

let deviceWidth = Dimensions.get('window').width;

const Login = (props) => {
  const {loginAction, token, changeAutoLogin, autoLoginStatus} = props;
  const refPassword = useRef(null);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [checked, setChecked] = useState(autoLoginStatus);
  const {navigation} = props;

  useEffect(() => {}, []);

  const onLogin = () => {
    Keyboard.dismiss();
    if (email.trim().length === 0) {
      Alert.alert('email invalid');
      return;
    }
    if (pass.length === 0) {
      Alert.alert('password invalid');
      return;
    } else {
      loginAction({email, password: pass});
    }
  };

  const onChangeEmail = (value) => {
    setEmail(value);
  };

  const onChangePass = (value) => {
    setPass(value);
  };

  const onPressForgot = () => {
    navigation.navigate('Forgot Password');
  };

  const onChangeRememberLogin = () => {
    changeAutoLogin(!autoLoginStatus);
    setChecked(!autoLoginStatus);
  };

  return (
    <View style={styles.container}>
      <Logo containerStyle={styles.logo} />
      <View style={styles.detail}>
        <Input
          // leftImage={}
          // backgroundColor={'rgba(0,0,25,0.22)'}
          placeholder={langs.user}
          testID="test_Username"
          containerStyle={styles.textInput}
          returnKeyType="next"
          keyboardType="email-address"
          autoCapitalize="none"
          maxLength={50}
          onSubmitEditing={() => refPassword.current.focus()}
          value={email}
          onChangeText={onChangeEmail}
        />
        <InputPassword
          testID="test_Password"
          // backgroundColor={'rgba(0,0,25,0.22)'}
          placeholder={langs.passWord}
          containerStyle={styles.textInput}
          refInput={refPassword}
          maxLength={20}
          returnKeyType="done"
          value={pass}
          onChangeText={onChangePass}
        />
        <Checkbox
          containerStyle={styles.checkBox}
          title={langs.rememberMe}
          checked={checked}
          onChange={onChangeRememberLogin}
        />
        <Button
          backgroundColor={'rgb(0,138,238)'}
          title={langs.login}
          onPress={onLogin}
          testID="test_Login"
        />

        <TouchableOpacity testID="test_ForgotPass" style={styles.forgotPass}>
          <Text style={styles.textForgot}>{langs.forgotPassword}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
  },
  detail: {
    flex: 1.75,
    justifyContent: 'flex-start',
    paddingVertical: 32,
  },
  logo: {
    flex: 1,
  },
  textInput: {
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 25,
    marginVertical: 16,
    paddingHorizontal: 16,
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
    marginVertical: 8,
    padding: 4,
    width: deviceWidth / 2,
    alignSelf: 'center',
  },
  textForgot: {
    alignSelf: 'center',
    color: 'tomato',
    fontSize: 14,
  },
  checkBox: {
    marginLeft: (deviceWidth * 12.5) / 100,
    marginVertical: 8,
  },
});

export default Login;
