import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, InputPassword } from '../../../component';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

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
      <Text style={styles.please}>Please enter your new password </Text>
      <InputPassword
        testID="test_Password"
        placeholder={'Enter your password'}
        containerStyle={styles.textInput}
        maxLength={20}
        returnKeyType="done"
        value={pass}
        onChangeText={onChangePass}
      />
      <Text style={styles.please}>Please enter your new email again </Text>
      <InputPassword
        testID="test_Password"
        placeholder={'Enter your password'}
        containerStyle={styles.textInput}
        refInput={refPassword}
        maxLength={20}
        returnKeyType="done"
        value={repass}
        onChangeText={onChangeRePass}
      />
      <Button
        title={'Complete'}
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
    borderRadius: 25,
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  please: {
    marginLeft: wp(12.5),
    fontSize: 20,
    marginBottom: 8,
  },
  button: {},
});

export default RePass;
