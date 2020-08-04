import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Input } from '../../../component';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const ConfirmCode = (props) => {
  const { code, onChangeCode, onConfirms } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.please}>Please enter your code </Text>
      <Input
        placeholder={'Enter your code'}
        testID="test_Code"
        containerStyle={styles.textInput}
        returnKeyType="next"
        keyboardType="email-address"
        autoCapitalize="none"
        maxLength={50}
        value={code}
        onChangeText={onChangeCode}
      />
      <Button
        title={'Next'}
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
    borderRadius: 25,
    paddingHorizontal: 16,
  },
  please: {
    marginLeft: wp(12.5),
    fontSize: 20,
    marginBottom: 32,
  },
  button: {},
});

export default ConfirmCode;
