import React from 'react';
import {StyleSheet, Image, Platform} from 'react-native';
// import langs from '../../../../../common/language';
import {imgs} from '../../../../../utlis';
import ActionButton from 'react-native-action-button';
import {BlurView} from '@react-native-community/blur';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import langs from '../../../../../common/language';

const FloatButton = (props) => {
  const {onPressLate, onPressOT} = props;
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
    return <Image source={imgs.add} style={styles.note} />;
  };
  return (
    <ActionButton
      buttonColor="white"
      backdrop={blurView()}
      renderIcon={buttonIcon}
      offsetY={60}
      style={[
        styles.actonButton,
        Platform.OS === 'ios' ? {zIndex: 100} : {elevation: 100},
      ]}
      degrees={90}
      fixNativeFeedbackRadius={true}>
      <ActionButton.Item
        inputX={[0, 0]}
        outputX={[0, 0]}
        inputY={[0, 1]}
        outputY={[160, 80]}
        title={langs.writeOT}
        onPress={onPressLate}>
        <Image source={imgs.note} />
      </ActionButton.Item>
      <ActionButton.Item
        inputX={[0, 0]}
        outputX={[0, 0]}
        inputY={[0, 1]}
        outputY={[0, -70]}
        title={langs.approveOT}
        onPress={onPressOT}>
        <Image source={imgs.stampCheck} />
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
  note: {
    alignSelf: 'center',
    height: 24,
    width: 24,
  },
  actionButton: {
    elevation: 101,
  },
});
