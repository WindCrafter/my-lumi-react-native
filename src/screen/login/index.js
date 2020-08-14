/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */
import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Keyboard,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import { Input, InputPassword, Button, Checkbox, Logo } from '../../component';
import config from '../../../utlis/ggConfig/config';
import { imgs } from '../../../utlis';
import langs from '../../../common/language';

let deviceWidth = Dimensions.get('window').width;

const Login = (props) => {
  const { loginAction } = props;
  const refPassword = useRef(null);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [checked, setChecked] = useState(false);
  const [userInfo, setUserInfo] = useState('');
  const [error, setError] = useState('');
  const { navigation } = props;

  useEffect(() => {
    async function fetchData() {
      _configureGoogleSignIn();
      await _getCurrentUser();
    }
    fetchData();
  }, []);

  const _configureGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId: config.webClientId,
      offlineAccess: false,
    });
  };

  const _getCurrentUser = async () => {
    try {
      const info = await GoogleSignin.signInSilently();
      setUserInfo(info);
      setError(null);
    } catch (error) {
      const errorMessage =
        error.code === statusCodes.SIGN_IN_REQUIRED
          ? 'Please sign in :)'
          : error.message;
      setError(new Error(errorMessage));
    }
  };

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const info = await GoogleSignin.signIn();
      setUserInfo(info);
      setError(null);
    } catch (error) {
      console.log('===>', error);
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          // sign in was cancelled
          Alert.alert('cancelled');
          break;
        case statusCodes.IN_PROGRESS:
          // operation (eg. sign in) already in progress
          Alert.alert('in progress');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // android only
          Alert.alert('play services not available or outdated');
          break;
        default:
          Alert.alert('Something went wrong', error.toString());
          this.setState({
            error,
          });
      }
    }
  };

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
      loginAction({ email, password: pass });
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
    setChecked(!checked);
  };

  const _signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

      setUserInfo(null);
      setError(null);
    } catch (error) {
      setError(null);
    }
  };

  return (
    <View style={styles.container}>
      <Logo containerStyle={styles.logo} />
      <View style={styles.detail}>
        <Input
          // leftImage={}
          // backgroundColor={'rgba(0,0,25,0.22)'}
          opa
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

        <TouchableOpacity
          testID="test_ForgotPass"
          onPress={_signOut}
          style={styles.forgotPass}>
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
