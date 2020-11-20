import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Input, Button } from '../../../../component';

const ConfirmCode = (props) => {
  const { code, onChangeCode, onConfirms } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.please}>Điền mã đã được gửi tới email của bạn :</Text>
      <Input
        placeholder={'Mã xác minh'}
        testID="test_Code"
        containerStyle={styles.textInput}
        returnKeyType="next"
        keyboardType="email-address"
        autoCapitalize="none"
        maxLength={50}
        value={code}
        onChangeText={onChangeCode}
        rightIcon
      />
      <Button
        title={'Tiếp tục'}
        onPress={onConfirms}
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
    fontSize: 18,
    marginBottom: 32,
    alignSelf:'center'
  },
  button: {},
});

export default ConfirmCode;
