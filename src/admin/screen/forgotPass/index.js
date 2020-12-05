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
  Alert,
  StatusBar,
} from 'react-native';
import SendCode from './component/sendCode';
import ConfirmCode from './component/confirmCode';
import RePass from './component/rePass';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Logo, KeyBoardScroll} from '../../../component';
let deviceWidth = Dimensions.get('window').width;

const ForgotPass = (props) => {
  const {navigation} = props;
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
    step.current.scrollTo({x: wp(200), y: 0, animated: true});
  };

  const onSend = () => {
    this.alert.open();
  };

  const onBack = () => {
    navigation.goBack();
  };

  const onGetCode = () => {
    step.current.scrollTo({x: wp(100), y: 0, animated: true});
  };

  return (
    <KeyBoardScroll>
      <View style={styles.container}>
        <Logo containerStyle={styles.logo} />
      
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps='handled'
            keyboardDismissMode='on-drag'
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
        <View testID="test_Back" style={styles.back}>
          <TouchableOpacity onPress={onBack}>
            <Text style={styles.textBack}>Quay lại trang đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyBoardScroll>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: hp(100),
    justifyContent: 'center',
  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
  },
  detail: {
    flex: 1,
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
    width: 250,
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  textBack: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 16,
  },
  checkBox: {
    marginLeft: (deviceWidth * 12.5) / 100,
    marginVertical: 8,
  },
});

export default ForgotPass;
