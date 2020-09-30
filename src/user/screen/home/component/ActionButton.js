import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import langs from '../../../../../common/language';
import { imgs } from '../../../../../utlis';
import ActionButton from 'react-native-action-button';
import { BlurView } from '@react-native-community/blur';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const FloatButton = (props) => {
  const blurView = () => {
    return (

      <BlurView
        style={styles.absolute}
        blurType="dark"
        blurAmount={1}
        reducedTransparencyFallbackColor={'white'}
      />
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
      <ActionButton buttonColor="rgba(231,76,60,1)" backdrop={blurView()}>
        <ActionButton.Item
          inputX={[0, 0]}
          outputX={[0, 0]}
          inputY={[0, 1]}
          outputY={[160, 80]}
          buttonColor="#9b59b6"
          title="Xin đi muộn/ về sớm"
          onPress={() => console.log('notes tapped!')}>
          <Text>1</Text>
        </ActionButton.Item>
        <ActionButton.Item
          inputX={[0, 1]}
          outputX={[0, -85]}
          inputY={[0, 1]}
          outputY={[140, 70]}
          buttonColor="#3498db"
          title="Xin nghỉ"
          onPress={() => { }}>
          <Text>1</Text>
        </ActionButton.Item>
        <ActionButton.Item
          outputX={[0, -120]}
          outputY={[0, 80]}
          buttonColor="#1abc9c"
          title="Xin OT"
          onPress={() => { }}>
          <Text>1</Text>
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

export default FloatButton;

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  absolute: {
    position: 'absolute',
    height: heightPercentageToDP(100),
    width: widthPercentageToDP(100),
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
  },
});
