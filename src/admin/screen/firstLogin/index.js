import React, { useState, useRef } from 'react';
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
  Alert,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Logo, InputPassword, Button } from '../../../component';
let deviceWidth = Dimensions.get('window').width;

const FirstLogin = (props) => {
  const { changePass, token } = props;
  const step = useRef();
  const [pass, setPass] = useState('');
  const [rePass, setRePass] = useState('');
  const [error, setError] = useState('');

  const onChangePass = (value) => {
    setPass(value);
  };

  const onChangeRePass = (value) => {
    setRePass(value);
  };

  const onConfirms = () => {
    Keyboard.dismiss();
    if (pass.trim().length === 0) {
      setError('Pass is invalid');
      this.alert.open();
      return;
    }
    if (pass.trim().length < 6) {
      setError('Pass can not less than 6');
      this.alert.open();
      return;
    }
    if (rePass.length === 0) {
      setError('RePass is invalid');
      this.alert.open();
      return;
    }
    if (!(rePass === pass)) {
      setError('RePass not match with Pass');
      this.alert.open();
      return;
    } else {
      changePass({ pass, confirmPassword: rePass, token });
    }
  };

  return (
    <View style={styles.container}>
      <Logo containerStyle={styles.logo} />
      <Text style={styles.please}>Please enter your new password </Text>
      <View style={styles.detail}>
        <InputPassword
          testID="test_Password"
          placeholder={'Enter your password'}
          containerStyle={styles.textInput}
          maxLength={20}
          returnKeyType="done"
          value={pass}
          onChangeText={onChangePass}
        />
        <Text style={styles.please}>Please enter your new password again </Text>
        <InputPassword
          testID="test_Password"
          placeholder={'Enter your password'}
          containerStyle={styles.textInput}
          maxLength={20}
          returnKeyType="done"
          value={rePass}
          onChangeText={onChangeRePass}
        />
        <Button
          title={'Complete'}
          onPress={onConfirms}
          testID="test_Complete"
          containerStyle={styles.button}
        />
      </View>
      <Alert
        title={'Warning'}
        message={error}
        leftButton={{ text: 'OK' }}
        ref={(ref) => (this.alert = ref)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
  },
  detail: {
    flex: 1.75,
  },
  logo: {
    flex: 1,
  },
  textInput: {
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  back: {
    flex: 0.5,
    width: deviceWidth / 2,
    alignSelf: 'center',
  },
  please: {
    marginLeft: wp(12.5),
    fontSize: 20,
    marginTop: 8,
  },
});

export default FirstLogin;
