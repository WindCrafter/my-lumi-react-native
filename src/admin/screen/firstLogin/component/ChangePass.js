import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Logo, InputPassword, Button } from '../../../../component';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const ChangePass = (props) => {
  const { pass, onChangePass, rePass, onChangeRePass, onConfirms } = props;
  return (
    <View style={styles.container}>
      <Logo containerStyle={styles.logo} />
      <Text style={styles.please}>Vui lòng nhập mật khẩu mới :</Text>
      <View style={styles.detail}>
        <InputPassword
          testID="test_Password"
          placeholder={'Mật khẩu'}
          containerStyle={styles.textInput}
          maxLength={20}
          returnKeyType="done"
          value={pass}
          onChangeText={onChangePass}
        />
        <Text style={styles.please}>Nhập lại mật khẩu mới :</Text>
        <InputPassword
          testID="test_Password"
          placeholder={'Mật khẩu'}
          containerStyle={styles.textInput}
          maxLength={20}
          returnKeyType="done"
          value={rePass}
          onChangeText={onChangeRePass}
        />
        <Button
          title={'Hoàn thành'}
          onPress={onConfirms}
          containerStyle={styles.button}
        />
      </View>
    </View>
  );
};

export default ChangePass;

const styles = StyleSheet.create({
  container: {
    width: widthPercentageToDP(100),
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
    width: widthPercentageToDP(50),
    alignSelf: 'center',
  },
  please: {
    marginLeft: widthPercentageToDP(12.5),
    fontSize: 18,
    marginTop: 8,
    fontWeight:'500'
  },
});
