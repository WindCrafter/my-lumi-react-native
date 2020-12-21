import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  LayoutAnimation,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import {InputPassword, HeaderCustom, BarStatus} from '../../../component';
import {Button} from '../../../component/Button';
import {Colors, imgs} from '../../../../utlis/index';
import langs from '../../../../common/language/index';
import {_global} from '../../../../utlis/global/global';
const ChangePass = (props) => {
  const {token, changePass, navigation} = props;
  const onGoBack = () => {
    navigation.goBack();
  };
  const [recentPass, setRecentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [errRecent, setErrRecent] = useState('');
  const [errNew, setErrNew] = useState('');
  const [errConfirm, setErrConfirm] = useState('');
  const onChangeRecent = (val) => {
    setRecentPass(val);
    if (val === '' && errRecent !== '') {
      setErrRecent(langs.alert.invalidPassword2);
    } else if (
      val.trim().length > 0 &&
      val.trim().length < 8 &&
      (errRecent !== '' || errNew !== '' || errConfirm !== '')
    ) {
      setErrRecent(langs.alert.lessPassword2);
    } else {
      setErrRecent('');
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  };
  const onChangeNew = (val) => {
    setNewPass(val);
    if (val === '' && errNew !== '') {
      setErrNew(langs.alert.invalidReNewPassword2);
    } else if (
      val.trim().length > 0 &&
      val.trim().length < 8 &&
      (errRecent !== '' || errNew !== '' || errConfirm !== '')
    ) {
      setErrNew(langs.alert.lessReNewPassword2);
    } else {
      setErrNew('');
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  };
  const onChangeConfirm = (val) => {
    setConfirmPass(val);
    if (val === '' && errConfirm !== '') {
      setErrConfirm(langs.alert.invalidRePassword2);
    } else if (
      val.trim().length > 0 &&
      val.trim().length < 8 &&
      (errRecent !== '' || errNew !== '' || errConfirm !== '')
    ) {
      setErrConfirm(langs.alert.lessRePassword2);
    } else {
      setErrConfirm('');
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  };

  const refNew = useRef(null);
  const refConfirm = useRef(null);
  const onCheck = () => {
    if (
      recentPass === '' ||
      (recentPass.trim().length > 0 && recentPass.trim().length < 8) ||
      newPass === '' ||
      (newPass.trim().length > 0 && newPass.trim().length < 8) ||
      confirmPass === '' ||
      (confirmPass.trim().length > 0 && confirmPass.trim().length < 8)
    ) {
      if (recentPass === '') {
        setErrRecent(langs.alert.invalidPassword2);
      }
      if (recentPass.trim().length > 0 && recentPass.trim().length < 8) {
        setErrRecent(langs.alert.lessPassword2);
      }
      if (newPass === '') {
        setErrNew(langs.alert.invalidReNewPassword2);
      }
      if (newPass.trim().length > 0 && newPass.trim().length < 8) {
        setErrNew(langs.alert.lessReNewPassword2);
      }
      if (confirmPass === '') {
        setErrConfirm(langs.alert.invalidRePassword2);
      }
      if (confirmPass.trim().length > 0 && confirmPass.trim().length < 8) {
        setErrConfirm(langs.alert.lessRePassword2);
      }
    } else {
      onChangePass();
    }
  };
  const onChangePass = () => {
    const data = {
      old_password: recentPass,
      password: newPass,
      confirm_password: confirmPass,
      token,
    };

    console.log(data);

    errRecent === '' && errNew === '' && errConfirm === ''
      ? changePass(data)
      : null;
  };
  return (
    <View style={styles.container}>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 26 : StatusBar.currentHeight}
      />
      <SafeAreaView />
      <HeaderCustom
        title={langs.navigator.changePass}
        height={60}
        goBack={onGoBack}
        rightImage={imgs.settingICon}
      />
      <View>
        {recentPass !== '' && errRecent === '' ? (
          <Text style={styles.textPass}>{langs.recentPassWord}</Text>
        ) : recentPass !== '' && errRecent !== '' ? (
          <Text style={styles.textPass}>{errRecent}</Text>
        ) : null}
        <InputPassword
          placeholder={
            errRecent !== '' && recentPass === ''
              ? errRecent
              : langs.recentPassWord
          }
          returnKeyType="go"
          value={recentPass}
          onChangeText={onChangeRecent}
          containerStyle={[
            styles.textInput,
            {
              marginTop:
                recentPass !== '' || (errRecent !== '' && recentPass !== '')
                  ? 8
                  : 40,
              borderColor: 'red',
              borderWidth: errRecent !== '' ? 1 : 0,
            },
          ]}
          onSubmitEditing={() => refNew.current.focus()}
          leftImage={imgs.lock}
        />
      </View>
      <View>
        {newPass !== '' && errNew === '' ? (
          <Text style={styles.textPass}>{langs.newPassWord}</Text>
        ) : newPass !== '' && errNew !== '' ? (
          <Text style={styles.textPass}>{errNew}</Text>
        ) : null}
        <InputPassword
          placeholder={
            errNew !== '' && newPass === '' ? errNew : langs.newPassWord
          }
          returnKeyType="go"
          value={newPass}
          onChangeText={onChangeNew}
          containerStyle={[
            styles.textInput,
            {
              marginTop:
                newPass !== '' || (errNew !== '' && newPass !== '') ? 8 : 40,
              borderColor: 'red',
              borderWidth: errNew !== '' ? 1 : 0,
            },
          ]}
          refInput={refNew}
          onSubmitEditing={() => refConfirm.current.focus()}
          leftImage={imgs.changePassIcon}
        />
      </View>
      <View>
        {confirmPass !== '' && errConfirm === '' ? (
          <Text style={styles.textPass}>{langs.confirmPassWord}</Text>
        ) : confirmPass !== '' && errConfirm !== '' ? (
          <Text style={styles.textPass}>{errConfirm}</Text>
        ) : null}
        <InputPassword
          placeholder={
            errConfirm !== '' && confirmPass === ''
              ? errConfirm
              : langs.confirmPassWord
          }
          returnKeyType="go"
          value={confirmPass}
          onChangeText={onChangeConfirm}
          containerStyle={[
            styles.textInput,
            {
              marginTop:
                confirmPass !== '' || (errConfirm !== '' && confirmPass !== '')
                  ? 8
                  : 40,
              borderColor: 'red',
              borderWidth: errConfirm !== '' ? 1 : 0,
            },
          ]}
          refInput={refConfirm}
          leftImage={imgs.changePassIcon}
        />
      </View>
      <Button
        title="Hoàn thành"
        onPress={
          errRecent === '' && errNew === '' && errConfirm === ''
            ? onCheck
            : null
        }
        testID="test_Complete"
        containerStyle={styles.button}
        backgroundColor={
          errRecent === '' && errNew === '' && errConfirm === ''
            ? Colors.background
            : 'grey'
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {borderRadius: 32},
  container: {justifyContent: 'center', alignItems: 'center'},
  button: {
    marginTop: 36,
  },
  textPass: {fontSize: 16, height: 24, marginTop: 8, marginLeft: 32},
});
export default ChangePass;
