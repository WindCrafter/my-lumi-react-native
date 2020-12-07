/**
 * Created by phongdt on Sun Nov 15 2020
 * Copyright (c) 2020 phongdt
 */

import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  KeyBoardScroll,
  Checkbox,
  InputPassword,
  Input,
  Button,
  Logo,
} from '../../../component';
import {
  widthPercentageToDP as SCREEN,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {imgs, Colors} from '../../../../utlis';
import {_global} from '../../../../utlis/global/global';
import langs from '../../../../common/language';

const Register = (props) => {
  const {navigation, register} = props;

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [termOfService, setTermOfService] = useState(true);
  const [privacyPolicy, setPrivacyPolicy] = useState(true);
  const [confirmCode, setConfirmCode] = useState(false);
  const [confirmData, setConfirmData] = useState(null);
  const [email, setEmail] = useState('');
  const onGoBack = () => {
    navigation.navigate('Login');
  };
  const onChangeEmail = (value) => {
    setEmail(value);
  };
  const onChangePass = (value) => {
    setNewPassword(value);
  };
  const onChangeVerifyCode = (value) => {
    setVerifyCode(value);
  };
  const onChangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };
  const onAcceptTermOfService = () => {
    setTermOfService(!termOfService);
  };
  const onAcceptPrivacyPolicy = () => {
    setPrivacyPolicy(!privacyPolicy);
  };
  const refPassword = useRef(null);
  const refRePassword = useRef(null);
  const refVerifyCode = useRef(null);

  const isValidEmail = (value) => value && value.indexOf('@') > 0;
  const onRegister = () => {
    if (email.trim().length === 0) {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.alert.invalidEmail,
        messageColor: 'red',
        leftButton: {text: langs.alert.ok},
      });

      return;
    }
    if (!isValidEmail(email)) {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.alert.wrongEmail,
        messageColor: 'red',
        leftButton: {text: langs.alert.ok},
      });

      return;
    }
    if (newPassword.trim().length === 0) {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.alert.invalidPassword,
        messageColor: 'red',
        leftButton: {text: langs.alert.ok},
      });

      return;
    }
    if (newPassword.trim().length < 6) {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.alert.lessPassword,
        messageColor: 'red',
        leftButton: {text: langs.alert.ok},
      });

      return;
    }
    if (confirmPassword.trim().length === 0) {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.alert.invalidRePassword,
        messageColor: 'red',
        leftButton: {text: langs.alert.ok},
      });

      return;
    }
    if (newPassword !== confirmPassword) {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.alert.wrongRepass,
        messageColor: 'red',
        leftButton: {text: langs.alert.ok},
      });

      return;
    }
    if (verifyCode.trim().length === 0) {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.alert.wrongVerifyCode,
        messageColor: 'red',
        leftButton: {text: langs.alert.ok},
      });

      return;
    }
    if (!termOfService) {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.alert.termOfService,
        messageColor: 'red',
        leftButton: {text: langs.alert.ok},
      });

      return;
    }
    if (!privacyPolicy) {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.alert.privacyPolicy,
        messageColor: 'red',
        leftButton: {text: langs.alert.ok},
      });

      return;
    }

    const data = {
      email: email,
      password: newPassword,
      confirm_password: confirmPassword,
      code_staff: verifyCode,
    };
    register(data);
  };

  return (
    <KeyBoardScroll>
      <SafeAreaView style={styles.container}>
        

        <View style={styles.viewMiddle}>
          <Logo containerStyle={styles.logo} />
<View>
          <View style={styles.viewInput}>
            <Input
              // leftImage={}
              // backgroundColor={'rgba(0,0,25,0.22)'}
              placeholder={'Email công ty'}
              testID="test_Username"
              returnKeyType="next"
              keyboardType="email-address"
              autoCapitalize="none"
              maxLength={50}
              containerStyle={styles.textInput}
              onSubmitEditing={() => refPassword.current.focus()}
              value={email}
              onChangeText={onChangeEmail}
              rightIcon
            />
            <InputPassword
              testID="test_Password"
              containerStyle={styles.textInput}
              // backgroundColor={'rgba(0,0,25,0.22)'}
              placeholder={'Mật khẩu mới'}
              // refInput={refPassword}
              maxLength={20}
              returnKeyType="next"
              value={newPassword}
              onChangeText={onChangePass}
              refInput={refPassword}
              onSubmitEditing={() => refRePassword.current.focus()}
            />
            <InputPassword
              testID="test_Password"
              containerStyle={styles.textInput}
              // backgroundColor={'rgba(0,0,25,0.22)'}
              placeholder={'Nhập lại mật khẩu'}
              refInput={refRePassword}
              maxLength={20}
              returnKeyType="next"
              value={confirmPassword}
              onChangeText={onChangeConfirmPassword}
              onSubmitEditing={() => refVerifyCode.current.focus()}
            />
            <InputPassword
              testID="test_Password"
              containerStyle={styles.textInput}
              // backgroundColor={'rgba(0,0,25,0.22)'}
              placeholder={'Mã nhân viên'}
              // refInput={refPassword}
              maxLength={20}
              returnKeyType="done"
              value={verifyCode}
              onChangeText={onChangeVerifyCode}
              leftImage={imgs.key}
              refInput={refVerifyCode}
            />
          </View>
          <View style={[styles.viewCheckbox, {marginBottom: 8}]}>
            <Checkbox
              title={'Điều khoản dịch vụ'}
              // title2={`(${langs.link})`}
              checked={termOfService}
              onChange={onAcceptTermOfService}
              containerStyle={styles.checkBox}

              // onPressTitle={onOpenTermOfService}
            />
            <Checkbox
              containerStyle={styles.checkBox}
              title={'Chính sách quyền riêng tư'}
              // title2={`(${langs.link})`}
              checked={privacyPolicy}
              onChange={onAcceptPrivacyPolicy}
              // onPressTitle={onOpenPrivacyPolicy}
            />
          </View>
          </View>
          <Button
            title={'Tạo tài khoản'}
            style={styles.button}
            backgroundColor={'rgba(255, 255, 255, 0.1)'}
            onPress={onRegister}
            rounded
            containerStyle={styles.viewInButton}
            titleColor={'rgb(0,138,238)'}
          />
          
        </View>
        <TouchableOpacity style={styles.goBack} onPress={onGoBack}>
          <Text>Bạn đã có tài khoản?</Text>
          <Text style={styles.logIn}>Đăng nhập</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyBoardScroll>
  );
};
const styles = StyleSheet.create({
  container: {
    height: hp(100),

  },
  viewLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
  },
  viewMiddle: {
    alignItems: 'center',
    flex: 6,
    justifyContent:'space-around'

  },
  viewFooter: {
    flex: 1,
    alignItems: 'center',
  },
  viewInput: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewButton: {},
  viewAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: Colors.background,
    position: 'absolute',
  },
  input: {
    marginBottom: 22,
  },
  btnBack: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  txtTitle: {
    fontSize: 16,
    color: 'white',
    marginLeft: 4,
    marginBottom: 2,
  },
  txtLabel: {
    fontSize: 16,
  },
  viewCheckbox: {
    width: '80%',
    paddingLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewContry: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 32,
  },
  btnCountry: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageFlag: {
    width: 25,
    height: 19,
    opacity: 0.8,
    marginRight: 8,
  },
  callingCodeText: {
    color: 'white',
  },
  txtLabelCountry: {
    color: 'white',
    marginRight: 16,
  },
  checkBox: {
    marginVertical: 8,
    width: 200,
    alignSelf: 'center',
  },
  textInput: {
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 25,
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  viewInButton: {
    borderColor: 'rgb(0,138,238)',
    borderWidth: 1,
  },
  bottom: {height: 1, width: '100%', backgroundColor: '#E4E4E4'},
  goBack: {alignSelf: 'center', flexDirection: 'row'},
  containerBottom: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: hp(90),
  },
  logIn: {color: Colors.blue,marginLeft:4},
  
});
export default Register;
