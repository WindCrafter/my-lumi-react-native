import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { imgs } from '../../../../../utlis';
import { Button, Input } from '../../../../component';

const SendCode = (props) => {
  const { email, onChangeEmail, onSend } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.forgotPass}>Quên mật khẩu</Text>
      <Text style={styles.please}>Nhập email của bạn :</Text>

      <Input
        placeholder={'Email'}
        testID="test_Email"
        containerStyle={styles.textInput}
        returnKeyType="next"
        keyboardType="email-address"
        autoCapitalize="none"
        maxLength={50}
        value={email}
        onChangeText={onChangeEmail}
        rightIcon
        leftImage={imgs.email}
      />
      <Button
        title={'Tiếp tục'}
        onPress={onSend}
        testID="test_Next"
        containerStyle={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
  textInput: {
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  please: {
    marginLeft: wp(12.5),
    fontSize: 18,
    marginVertical: 16,
    color:'#8A8A8A'
  },
  button: {

  },
  forgotPass: {
    alignSelf:'center',
    fontSize:24,fontWeight:"600"

  }
});

export default SendCode;
