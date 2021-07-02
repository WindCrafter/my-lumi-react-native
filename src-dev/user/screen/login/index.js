import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import codePush from 'react-native-code-push';
import { Logo, Input, InputPassword, Button, KeyBoardScroll } from '../../../component';
import Checkbox from './components/Checkbox';
import langs from '../../../../common/language';
import { globalApp } from '../../../../logs/logs';
import { _global } from '../../../../utlis/global/global';
import { Services } from '../../../../services';

const deviceWidth = Dimensions.get('window').width;

const Login = (props) => {
  const { loginAction, changeAutoLogin, autoLoginStatus, oneSignalID } = props;
  const refPassword = useRef(null);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [errMail, setErrMail] = useState('');
  const [errNew, setErrNew] = useState('');
  const [checked, setChecked] = useState(autoLoginStatus);
  const { navigation } = props;
  useEffect(() => {
    Platform.OS === 'android'
      && refPassword.current.setNativeProps({
        style: { fontFamily: 'Quicksand-Regular' },
      });
  }, []);
  const isValidEmail = (value) => value && value.indexOf('@') > 0;

  const onRegister = () => {
    navigation.navigate(langs.navigator.register);
  };

  const onLogin = () => {
    Keyboard.dismiss();
    if (
      email.trim().length === 0
      || !isValidEmail(email)
      || pass.trim().length === 0
      || (pass.trim().length > 0 && pass.trim().length < 8)
    ) {
      if (email.trim().length === 0) {
        setErrMail(langs.emailInvalid);
      }
      if (email.trim().length > 0 && !isValidEmail(email)) {
        setErrMail(langs.emailInvalid);
        setErrMail(langs.alert.wrongEmail2);
      }

      if (pass.trim().length === 0) {
        setErrNew(langs.alert.invalidReNewPassword2);
      }
      if (pass.trim().length > 0 && pass.trim().length < 8) {
        setErrNew(langs.alert.lessReNewPassword2);
      }
    } else {
      // loginAction({email, password: pass, oneSignalID: oneSignalID});
      if (!oneSignalID) {
        _global.Loading.show();
      }
      loginAction({ email, password: pass, device_token: oneSignalID });

      changeAutoLogin(checked);
      // addUserIdDevice({ deviceId: oneSignalID, token: token });
    }
  };

  const onChangeEmail = (val) => {
    setEmail(val);
    if (val.trim().length === 0 && (errMail !== '' || errNew !== '')) {
      setErrMail(langs.emailInvalid);
    } else if (!isValidEmail(val) && (errMail !== '' || errNew !== '')) {
      setErrMail(langs.alert.wrongEmail2);
    } else {
      setErrMail('');
    }
  };

  const onChangeServer = async () => {
    console.log('change server to product');
    await Services.setServerType(Services.server_type === 'product' ? 'develop' : 'product');

    codePush.restartApp();
  };

  const onChangePass = (val) => {
    setPass(val);
    if (val === '' && (errMail !== '' || errNew !== '')) {
      setErrNew(langs.alert.invalidReNewPassword2);
    } else if (
      val.trim().length > 0
      && val.trim().length < 8
      && (errMail !== '' || errNew !== '')
    ) {
      setErrNew(langs.alert.lessReNewPassword2);
    } else {
      setErrNew('');
    }
  };

  const onChangeRememberLogin = () => {
    setChecked(!checked);
  };
  const onConnect = () => {
    try {
      if (globalApp.customLog && globalApp.customLog.enableLog) {
        globalApp.customLog.disconnect();
      } else {
        globalApp.customLog
          && globalApp.customLog.connect({
            localhost: false,
          });
      }
    } catch (e) {
      // error customlog
    }
  };
  return (
    <KeyBoardScroll>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.detail}>
            <TouchableWithoutFeedback onLongPress={onConnect}>
              <Logo containerStyle={styles.logo} />
            </TouchableWithoutFeedback>

            <View>
              <Input
                // leftImage={}
                // backgroundColor={'rgba(0,0,25,0.22)'}
                placeholder="Email công ty"
                testID="test_Username"
                containerStyle={[
                  styles.textInput,
                  {
                    marginTop: 16,
                    marginBottom: errMail !== '' ? 0 : 32,
                    borderColor: '#F32013',
                    borderWidth: errMail !== '' ? 1 : 0,
                  },
                ]}
                returnKeyType="next"
                keyboardType="email-address"
                autoCapitalize="none"
                maxLength={50}
                onSubmitEditing={() => refPassword.current.focus()}
                value={email}
                onChangeText={onChangeEmail}
                rightIcon
              />
              {errMail !== '' ? (
                <Text style={styles.textErr}>{errMail}</Text>
              ) : null}
            </View>
            <View>
              <InputPassword
                testID="test_Password"
                // backgroundColor={'rgba(0,0,25,0.22)'}
                placeholder={langs.passWord}
                containerStyle={[
                  styles.textInput,
                  {
                    marginTop: 16,
                    marginBottom: errNew !== '' ? 0 : 32,
                    borderColor: '#F32013',
                    borderWidth: errNew !== '' ? 1 : 0,
                  },
                ]}
                refInput={refPassword}
                maxLength={20}
                returnKeyType="done"
                value={pass}
                onChangeText={onChangePass}
              />
              {errNew !== '' ? (
                <Text style={styles.textErr}>{errNew}</Text>
              ) : null}
            </View>
            <Checkbox
              containerStyle={[styles.checkBox, { marginTop: 16 }]}
              title={langs.rememberMe}
              checked={checked}
              onChange={onChangeRememberLogin}
              onLongPress={onChangeServer}
            />
            <Button
              backgroundColor={
                errMail === '' && errNew === '' ? 'rgb(47,172,79)' : '#E9E9E9'
              }
              title={!oneSignalID ? 'Chờ cài đặt trong vài giây' : langs.login}
              titleColor={errMail === '' && errNew === '' ? 'white' : '#827D82'}
              onPress={errMail === '' && errNew === '' ? onLogin : null}
              testID="test_Login"
              disable={!oneSignalID}
              loading={!oneSignalID}
            />
            <TouchableOpacity onPress={onRegister} style={styles.bottom}>
              <Text style={styles.register}>Đăng ký tài khoản</Text>
              {/* <Text>Vui lòng tạo</Text> */}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyBoardScroll>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'white',
    justifyContent: 'center'

  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
  },
  detail: { justifyContent: 'center' },
  logo: {},
  textInput: {
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 25,

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
  textForgot: {
    alignSelf: 'center',
    color: 'tomato',
    fontSize: 16,
  },
  checkBox: {
    marginLeft: (deviceWidth * 12.5) / 100,
  },
  register: { color: '#178CEB', fontSize: 16 },
  bottom: { justifyContent: 'center', alignItems: 'center', marginVertical: 16 },
  keyBoardScroll: {
    justifyContent: 'center',
    // flex: 1,
    // borderWidth: 1,
    height: hp(80),
  },
  textErr: {
    fontSize: 12,
    height: 24,
    marginTop: 8,
    color: '#F32013',
    marginLeft: 54,
  },
});

export default Login;
