import React from 'react';
import {StyleSheet, Image} from 'react-native';
// import langs from '../../../../../common/language';
import {imgs} from '../../../../../utlis';
import ActionButton from 'react-native-action-button';
import {BlurView} from '@react-native-community/blur';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const FloatButton = (props) => {
  const {onPressLate, onPressBreak, onPressOT} = props;
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
  const buttonIcon = () => {
    return <Image source={imgs.note} style={styles.note} />;
  };
  return (
    <ActionButton
      buttonColor="white"
      backdrop={blurView()}
      renderIcon={buttonIcon}
      offsetY={120}
      fixNativeFeedbackRadius={true}>
      <ActionButton.Item
        inputX={[0, 0]}
        outputX={[0, 0]}
        inputY={[0, 1]}
        outputY={[160, 80]}
        buttonColor="#ff5353"
        title="Xin đi muộn/ về sớm"
        onPress={onPressLate}>
        <Image source={imgs.clockAlert} />
      </ActionButton.Item>
      <ActionButton.Item
        inputX={[0, 1]}
        outputX={[0, -85]}
        inputY={[0, 1]}
        outputY={[140, 70]}
        buttonColor="#2fac4f"
        title="Xin nghỉ"
        onPress={onPressBreak}>
        <Image source={imgs.dayOff} />
      </ActionButton.Item>
      <ActionButton.Item
        outputX={[0, -120]}
        outputY={[0, 80]}
        buttonColor="#008aee"
        title="Xin OT"
        onPress={onPressOT}>
        <Image source={imgs.overTime} />
      </ActionButton.Item>
    </ActionButton>
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
  },
  note: {alignSelf: 'center', height: 24, width: 24},
});
