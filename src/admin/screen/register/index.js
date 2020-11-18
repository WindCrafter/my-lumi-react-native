/**
 * Created by phongdt on Sun Nov 15 2020
 * Copyright (c) 2020 phongdt
 */

import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  KeyBoardScroll,
  Checkbox,
  InputPassword,
  Input, Button
} from '../../../component';
import {widthPercentageToDP as SCREEN} from 'react-native-responsive-screen';
import {imgs,Colors} from '../../../../utlis';
import langs from '../../../../common/language';

const Register = () => {
  const [phonenumber, setPhoneNumber] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [termOfService, setTermOfService] = useState(false);
  const [confirmCode, setConfirmCode] = useState(false);
  const [confirmData, setConfirmData] = useState(null);
  const [email, setEmail] = useState('');
  const onChangeEmail = (value) => {
    setEmail(value);
  };
  const onChangePass = (value) => {
    setNewPassword(value);
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

  return (
    <KeyBoardScroll>
      <View style={styles.container}>
        <View style={[styles.viewLogo, confirmCode ? {flex: 7} : undefined]}>
          <Image style={styles.logo} source={imgs.logo} resizeMode="contain" />
        </View>
        <View style={styles.viewMiddle}>
          <View style={styles.viewInput}>
            <Input
              // leftImage={}
              // backgroundColor={'rgba(0,0,25,0.22)'}
              placeholder={'Tên đăng nhập'}
              testID="test_Username"
              returnKeyType="next"
              keyboardType="email-address"
              autoCapitalize="none"
              maxLength={50}
              containerStyle={styles.textInput}
              // onSubmitEditing={() => refPassword.current.focus()}
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
              returnKeyType="done"
              value={newPassword}
              onChangeText={onChangePass}
            />
            <InputPassword
              testID="test_Password"
              containerStyle={styles.textInput}
              // backgroundColor={'rgba(0,0,25,0.22)'}
              placeholder={'Nhập lại mật khẩu'}
              // refInput={refPassword}
              maxLength={20}
              returnKeyType="done"
              value={confirmPassword}
              onChangeText={onChangeConfirmPassword}
            />
          </View>
          <View style={[styles.viewCheckbox, {marginBottom: 24}]}>
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
          <Button
            title={'Tạo tài khoản'}
            style={styles.button}
            backgroundColor={'rgb(0,138,238)'}
            // onPress={this.handleRegister}
            rounded
          />
        </View>
      </View>
    </KeyBoardScroll>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewLogo: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewMiddle: {
    flex: 8,
    alignItems: 'center',
  },
  viewFooter: {
    flex: 1,
    alignItems: 'center',
  },
  viewInput: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent:'center'
  },
  viewButton: {
    flex: 1,
  },
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
    marginBottom: 8,
    backgroundColor: Colors.background,


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
    alignSelf:'center'
  },
  textInput: {
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 25,
    marginVertical: 16,
    paddingHorizontal: 16,
  },
});
export default Register;
