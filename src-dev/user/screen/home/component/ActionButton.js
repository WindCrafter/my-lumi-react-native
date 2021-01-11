import React from 'react';
import { StyleSheet, Image } from 'react-native';
// import langs from '../../../../../common/language';
import ActionButton from 'react-native-action-button';
import { BlurView } from '@react-native-community/blur';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { imgs } from '../../../../../utlis';

const FloatButton = (props) => {
  const { onPressLate, onPressBreak, onPressOT, onPressApprove, permission } = props;
  const blurView = () => {
    return (
      <BlurView
        style={styles.absolute}
        blurType="dark"
        blurAmount={1}
        reducedTransparencyFallbackColor="white"
      />
    );
  };
  const buttonIcon = () => {
    return <Image source={imgs.manageIcon} style={styles.note} />;
  };
  return (
    <ActionButton
      buttonColor="white"
      backdrop={blurView()}
      renderIcon={buttonIcon}
      fixNativeFeedbackRadius
    >
      <ActionButton.Item
        inputX={[0, 0]}
        outputX={[0, 0]}
        inputY={[0, 1]}
        outputY={[320, 30]}
        buttonColor="#ff5353"
        title="Xin đi muộn/ về sớm"
        onPress={onPressLate}
      >
        <Image source={imgs.clockAlert} />
      </ActionButton.Item>
      <ActionButton.Item
        inputX={[0, 0]}
        outputX={[0, 0]}
        inputY={[0, 1]}
        outputY={[320, 20]}
        buttonColor="#2fac4f"
        title="Xin nghỉ"
        onPress={onPressBreak}
      >
        <Image source={imgs.dayOff} />
      </ActionButton.Item>
      <ActionButton.Item
        inputX={[0, 0]}
        outputX={[0, 0]}
        inputY={[0, 1]}
        outputY={[320, 10]}
        buttonColor="#008aee"
        title="Xin OT"
        onPress={onPressOT}
      >
        <Image source={imgs.overTime} />
      </ActionButton.Item>
      { permission === 'Leader'
        && (
        <ActionButton.Item
          inputX={[0, 0]}
          outputX={[0, 0]}
          inputY={[0, 1]}
          outputY={[320, 0]}
          buttonColor="#ffffff"
          title="Duyệt đơn"
          onPress={onPressApprove}
        >
          <Image source={imgs.stampCheck} />
        </ActionButton.Item>
        )
}
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
  note: { alignSelf: 'center', height: 24, width: 24 },
});
