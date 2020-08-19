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
import SendCode from './component/sendCode';
import ConfirmCode from './component/confirmCode';
import RePass from './component/rePass';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Logo } from '../../../component';
let deviceWidth = Dimensions.get('window').width;

const ForgotPass = (props) => {
  const { navigation } = props;
  const step = useRef();
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');

  const onChangeEmail = (value) => {
    setEmail(value);
  };

  const onChangeCode = (value) => {
    setCode(value);
  };

  const onConfirms = () => {
    step.current.scrollTo({ x: wp(200), y: 0, animated: true });
  };

  const onSend = () => {
    this.alert.open();
  };

  const onBack = () => {
    navigation.goBack();
  };

  const onGetCode = () => {
    step.current.scrollTo({ x: wp(100), y: 0, animated: true });
  };

  return (
    <View style={styles.container}>
      <Logo containerStyle={styles.logo} />
      <KeyboardAvoidingView
        style={styles.detail}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={step}>
          <SendCode
            email={email}
            onChangeEmail={onChangeEmail}
            onSend={onSend}
          />
          <ConfirmCode
            code={code}
            onChangeCode={onChangeCode}
            onConfirms={onConfirms}
          />
          <RePass />
        </ScrollView>
      </KeyboardAvoidingView>
      <TouchableOpacity testID="test_Back" onPress={onBack} style={styles.back}>
        <Text style={styles.textBack}>← Back</Text>
      </TouchableOpacity>
      <Alert
        title={'Notification'}
        message={'This message'}
        leftButton={{ text: 'OK', onPress: onGetCode }}
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
    flex: 1.5,
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
  },
  back: {
    flex: 0.5,
    width: deviceWidth / 2,
    alignSelf: 'center',
  },
  textBack: {
    alignSelf: 'center',
    color: 'rgb(12, 235, 41)',
    fontSize: 20,
  },
  checkBox: {
    marginLeft: (deviceWidth * 12.5) / 100,
    marginVertical: 8,
  },
});

export default ForgotPass;
