import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Button, Input } from '../../../../component';

const SendCode = (props) => {
  const { email, onChangeEmail, onSend } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.please}>Please enter your email </Text>
      <Input
        placeholder={'Enter your email'}
        testID="test_Email"
        containerStyle={styles.textInput}
        returnKeyType="next"
        keyboardType="email-address"
        autoCapitalize="none"
        maxLength={50}
        value={email}
        onChangeText={onChangeEmail}
      />
      <Button
        title={'Next'}
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
    borderRadius: 25,
    paddingHorizontal: 16,
  },
  please: {
    marginLeft: wp(12.5),
    fontSize: 20,
    marginBottom: 32,
  },
  button: {

  },
});

export default SendCode;
