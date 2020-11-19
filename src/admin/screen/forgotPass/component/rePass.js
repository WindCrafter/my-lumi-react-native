import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { InputPassword, Button } from '../../../../component';

const RePass = (props) => {
  const {
    pass,
    repass,
    onChangePass,
    onChangeRePass,
    onConfirms,
    refPassword,
  } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.please}>Vui lòng nhập mật khẩu mới :</Text>
      <InputPassword
        testID="test_Password"
        placeholder={'Mật khẩu mới'}
        containerStyle={styles.textInput}
        maxLength={20}
        returnKeyType="done"
        value={pass}
        
        onChangeText={onChangePass}
      />
      <Text style={styles.please}>Vui lòng nhập lại mật khẩu :</Text>
      <InputPassword
        testID="test_Password"
        placeholder={'Nhập lại mật khẩu'}
        containerStyle={styles.textInput}
        refInput={refPassword}
        maxLength={20}
        returnKeyType="done"
        value={repass}
        onChangeText={onChangeRePass}
      />
      <Button
        title={'Hoàn thành'}
        onPress={onConfirms}
        testID="test_Complete"
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
    marginVertical: 8,
  },
  please: {
    marginLeft: wp(12.5),
    fontSize: 18,
    marginVertical: 12,
  },
  button: {},
});

export default RePass;
