import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import {Alert} from '../../../component';
import ChangePass from './component/ChangePass';
import AddInfo from './component/AddInfo';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const FirstLogin = (props) => {
  const {changePass, token, updateProfile} = props;
  const step = useRef();
  const refAlert = useRef(null);
  const [pass, setPass] = useState('');
  const [rePass, setRePass] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('hey');

  const [birthday, setBirthday] = useState('');
  const [error, setError] = useState('');
  const onChangePhone = (value) => {
    setPhone(value);
  };
  const onChangeBirthday = (value) => {
    setBirthday(value);
  };
  const onChangePass = (value) => {
    setPass(value);
  };

  const onChangeRePass = (value) => {
    setRePass(value);
  };

  const onNext = () => {
    step.current.scrollTo({x: wp(100), y: 0, animated: true});
  };

  const onConfirms = () => {
    Keyboard.dismiss();
    if (pass.trim().length === 0) {
      setError('Pass is invalid');
      refAlert.current.open();
      return;
    }
    if (pass.trim().length < 6) {
      setError('Pass can not less than 6');
      refAlert.current.open();
      return;
    }
    if (rePass.length === 0) {
      setError('RePass is invalid');
      refAlert.current.open();
      return;
    }
    if (!(rePass === pass)) {
      setError('RePass not match with Pass');
      refAlert.current.open();
      return;
    } else {
      changePass({pass, confirmPassword: rePass, token});
    }
  };
  const onConfirmsProfile = () => {
    Keyboard.dismiss();
    const data = {
      name:'jijiiii',
      phoneNumber: phone,
      birthday,
      token,
    };
    updateProfile(data);
  };
  StatusBar.setBarStyle('default');

  return (
    <>
      <ScrollView
        style={styles.container}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={step}>
        <AddInfo
          birthday={birthday}
          onChangeBirthDay={onChangeBirthday}
          phone={phone}
          onChangePhone={onChangePhone}
          onNext={onConfirmsProfile,onNext}
        />
        <ChangePass
          pass={pass}
          onChangePass={onChangePass}
          rePass={rePass}
          onChangeRePass={onChangeRePass}
          onConfirms={onConfirms}
        />
      </ScrollView>
      <Alert
        title={'Warning'}
        message={error}
        leftButton={{text: 'OK'}}
        ref={refAlert}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
});

export default FirstLogin;
