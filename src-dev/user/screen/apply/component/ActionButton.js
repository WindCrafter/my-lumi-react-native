import React from 'react';
import { StyleSheet, Image, Platform } from 'react-native';
import { connect } from 'react-redux';
// import langs from '../../../../../common/language';
import ActionButton from 'react-native-action-button';
import { BlurView } from '@react-native-community/blur';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { imgs } from '../../../../../utlis';
import langs from '../../../../../common/language';

const FloatButton = (props) => {
  const { onApply, onApprove, role, leader} = props;
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
    return <Image source={imgs.add} style={styles.note} />;
  };
  return leader ? (
    <ActionButton
      buttonColor="white"
      backdrop={blurView()}
      renderIcon={buttonIcon}
      style={[
        styles.actonButton,
        Platform.OS === 'ios' ? { zIndex: 100 } : { elevation: 100 },
      ]}
      degrees={90}
      fixNativeFeedbackRadius
    >
      <ActionButton.Item
        inputX={[0, 0]}
        outputX={[0, 0]}
        inputY={[0, 1]}
        outputY={[160, 80]}
        title={langs.writeOT}
        onPress={onApply}
      >
        <Image source={imgs.note} />
      </ActionButton.Item>
      <ActionButton.Item
        inputX={[0, 0]}
        outputX={[0, 0]}
        inputY={[0, 1]}
        outputY={[0, -70]}
        title={langs.approveOT}
        onPress={onApprove}
      >
        <Image source={imgs.stampCheck} />
      </ActionButton.Item>
    </ActionButton>
  ) : (
    <ActionButton
      buttonColor="white"
      renderIcon={buttonIcon}
      onPress={onApply}

      style={[
        styles.actonButton,
        Platform.OS === 'ios' ? { zIndex: 100 } : { elevation: 100 },
      ]}
      degrees={90}
      fixNativeFeedbackRadius
    />
  );
};

const mapStateToProps = (state) => ({
  role: state.authen.role,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FloatButton);

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
    height: 16,
    width: 16,
  },
  actionButton: {
    elevation: 101,
  },
});
