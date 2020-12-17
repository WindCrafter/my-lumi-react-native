import React, {useState, useRef} from 'react';
import {Text, View, StyleSheet, LayoutAnimation} from 'react-native';
import {InputPassword, HeaderCustom} from '../../../component';
import {Button} from '../../../component/Button';
import {Colors, imgs} from '../../../../utlis/index';
import langs from '../../../../common/language/index';

const ChangePass = (props) => {
  const {token, changePass, navigation} = props;
  const onGoBack = () => {
    navigation.goBack();
  };
  const [recentPass, setRecentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const onChangeRecent = (val) => {
    setRecentPass(val);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  };
  const onChangeNew = (val) => {
    setNewPass(val);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  };
  const onChangeConfirm = (val) => {
    setConfirmPass(val);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  };

  const refNew = useRef(null);
  const refConfirm = useRef(null);
  const onChangePass = () => {
    const data = {
      old_password: recentPass,
      password: newPass,
      confirm_password: confirmPass,
      token,
    };
    console.log(data);
    changePass(data);
  };
  return (
    <View style={styles.container}>
      <HeaderCustom
        title={langs.navigator.changePass}
        height={60}
        goBack={onGoBack}
        rightImage={imgs.settingICon}
        
      />
      <View>
        {recentPass !== '' ? (
          <Text style={styles.textPass}>{langs.recentPassWord}</Text>
        ) : null}
        <InputPassword
          placeholder={langs.recentPassWord}
          returnKeyType="go"
          value={recentPass}
          onChangeText={onChangeRecent}
          containerStyle={[
            styles.textInput,
            {marginTop: recentPass !== '' ? 8 : 36},
          ]}
          onSubmitEditing={() => refNew.current.focus()}
          leftImage={imgs.lock}
        />
      </View>
      <View>
        {newPass !== '' ? (
          <Text style={styles.textPass}>{langs.newPassWord}</Text>
        ) : null}
        <InputPassword
          placeholder={langs.newPassWord}
          returnKeyType="go"
          value={newPass}
          onChangeText={onChangeNew}
          containerStyle={[
            styles.textInput,
            {marginTop: newPass !== '' ? 8 : 36},
          ]}
          onSubmitEditing={() => refConfirm.current.focus()}
          refInput={refNew}
          leftImage={imgs.changePassIcon}
        />
      </View>
      <View>
        {confirmPass !== '' ? (
          <Text style={styles.textPass}>{langs.confirmPassWord}</Text>
        ) : null}
        <InputPassword
          placeholder={langs.confirmPassWord}
          returnKeyType="done"
          value={confirmPass}
          onChangeText={onChangeConfirm}
          containerStyle={[
            styles.textInput,
            {marginTop: confirmPass !== '' ? 8 : 36},
          ]}
          refInput={refConfirm}
          leftImage={imgs.changePassIcon}
        />
      </View>
      <Button
        title="Hoàn thành"
        onPress={onChangePass}
        testID="test_Complete"
        containerStyle={styles.button}
        backgroundColor={Colors.background}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {borderRadius: 32},
  container: {justifyContent: 'center', alignItems: 'center'},
  button: {
    color: Colors.background,
    marginTop: 36,
  },
  textPass: {fontSize: 16, height: 20, marginTop: 8, marginLeft: 32},
});
export default ChangePass;
