/**
 * Created by nghinv on Wed Jul 18 2018
 * Copyright (c) 2018 nghinv
 */

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Platform,
  Dimensions,
  BackHandler,
  StatusBar,
} from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';

const SCREEN = Dimensions.get('window');
const STATUS_BAR_OFFSET = Platform.OS === 'android' ? -25 : 0;
const { Value } = Animated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  viewButton: {
    height: 42,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eaeff4',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtButton: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
  },
  viewContent: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 8,
  },
  txtTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
  },
  txtMessage: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
  },
});

class Alert extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isOpen || false,
      target: {
        x: 0,
        y: 0,
        opacity: 0.6,
      },
    };

    this.dataAlert = null;
    this._anim = new Value(0);
  }

  alert = (props) => {
    this.dataAlert = {
      ...props,
      title: props.title ? props.title : null,
      message: props.message ? props.message : null,
      leftButton: props.leftButton ? props.leftButton : null,
      messageColor: props.messageColor ? props.messageColor : '#000000',
      rightButton: props.rightButton ? props.rightButton : null,
      onClose: props.onClose ? props.onClose : null,
      renderContent: props.renderContent ? props.renderContent : null,
      width: props.width ? props.width : null,
      borderRadius: props.borderRadius ? props.borderRadius : null,
      hasTextInput: props.hasTextInput ? props.hasTextInput : null,
    };
    this.open();
  };

  update = () => {
    this.forceUpdate();
  };

  isOpen = () => {
    const { isOpen } = this.state;
    return isOpen;
  };

  open = () => {
    this.setState(
      {
        isOpen: true,
      },
      () => {
        this.setStatusbar();
        BackHandler.addEventListener(
          'hardwareBackPress',
          this.handleBackButton,
        );
        Animated.spring(this._anim, {
          stiffness: new Value(100),
          mass: new Value(0.4),
          duration: 50,
          damping: new Value(10),
          overshootClamping: true,
          restSpeedThreshold: 0.001,
          restDisplacementThreshold: 0.001,
          toValue: 1,
        }).start(() => {
          this.props.onOpen && this.props.onOpen();
        });
      },
    );
  };

  close = (onClose) => {
    Animated.timing(this._anim, {
      toValue: 0,
      duration: 100,
      easing: Easing.linear,
    }).start(() => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        this.handleBackButton,
      );
      this.setState({
        isOpen: false,
      });
      this.dataAlert && this.dataAlert.onClose && this.dataAlert.onClose();
      this.dataAlert = null;
      this.props.onClose && this.props.onClose();
      onClose && onClose();
      this.removeStatusbar();
    });
  };

  handleBackButton = () => {
    return true;
  };

  UNSAFE_componentWillReceiveProps(props) {
    if (this.props.isOpen !== props.isOpen && props.isOpen) {
      this.open();
    }
  }

  componentWillUnmount() {
    if (this.timeoutAlertLeftButton) {
      clearTimeout(this.timeoutAlertLeftButton);
    }

    if (this.timeoutAlertRightButton) {
      clearTimeout(this.timeoutAlertRightButton);
    }
  }

  setStatusbar = () => {
    StatusBar.setBarStyle('dark-content', true);
    Platform.OS === 'android' &&
      StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.6)');
  };

  removeStatusbar = () => { };

  renderButton = () => {
    let leftButton = null;
    let rightButton = null;
    let middleButton = null;
    if (this.dataAlert) {
      leftButton = this.dataAlert.leftButton;
      rightButton = this.dataAlert.rightButton;
      middleButton = this.dataAlert.middleButton;
    } else {
      leftButton = this.props.leftButton;
      rightButton = this.props.rightButton;
      middleButton = this.props.middleButton;
    }

    if (!leftButton && !rightButton && !middleButton) {
      return null;
    }

    return (
      <View style={[styles.viewButton, { width: '100%' }]}>
        {leftButton && leftButton.text && (
          <TouchableOpacity
            onPress={() => {
              this.close();
              if (this.timeoutAlertLeftButton) {
                clearTimeout(this.timeoutAlertLeftButton);
              }

              this.timeoutAlertLeftButton = setTimeout(() => {
                leftButton.onPress && leftButton.onPress();
              }, 220);
            }}
            style={styles.button}>
            <Text style={[styles.txtButton, leftButton.textStyle]}>
              {leftButton.text}
            </Text>
          </TouchableOpacity>
        )}
        {middleButton && middleButton.text && (
          <TouchableOpacity
            onPress={() => {
              this.close();
              if (this.timeoutAlertmiddleButton) {
                clearTimeout(this.timeoutAlertmiddleButton);
              }

              this.timeoutAlertmiddleButton = setTimeout(() => {
                middleButton.onPress && middleButton.onPress();
              }, 220);
            }}
            style={[
              styles.button,
              leftButton
                ? { borderLeftWidth: 1, borderLeftColor: '#eaeff4' }
                : undefined,
            ]}>
            <Text style={[styles.txtButton, middleButton.textStyle]}>
              {middleButton.text}
            </Text>
          </TouchableOpacity>
        )}
        {rightButton && rightButton.text && (
          <TouchableOpacity
            onPress={() => {
              if (!rightButton.dontClose) {
                this.close();
                if (this.timeoutAlertRightButton) {
                  clearTimeout(this.timeoutAlertRightButton);
                }

                this.timeoutAlertRightButton = setTimeout(() => {
                  rightButton.onPress && rightButton.onPress();
                }, 220);
              } else {
                rightButton.onPress && rightButton.onPress();
              }
            }}
            style={[
              styles.button,
              leftButton || middleButton
                ? { borderLeftWidth: 1, borderLeftColor: '#eaeff4' }
                : undefined,
            ]}>
            <Text style={[styles.txtButton, rightButton.textStyle]}>
              {rightButton.text}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  renderContent = () => {
    let { renderContent } = this.props;
    let message = null;
    let title = null;
    let messageColor = '#000000';

    if (this.dataAlert) {
      renderContent = this.dataAlert.renderContent;
      message = this.dataAlert.message;
      messageColor = this.dataAlert.messageColor;
      title = this.dataAlert.title;
    } else {
      message = this.props.message;
      title = this.props.title;
      messageColor = this.props.messageColor;
    }

    if (renderContent) {
      return renderContent({ ...(this.dataAlert || {}) });
    }

    return (
      <View style={styles.viewContent}>
        {title && <Text style={styles.txtTitle}>{title}</Text>}
        {message && (
          <Text
            style={[styles.txtMessage, title ? { marginTop: 24 } : undefined, { color: messageColor }]}>
            {message}
          </Text>
        )}
      </View>
    );
  };

  render() {
    const { origin, backgroundOverlay, style, useModal } = this.props;
    const { isOpen, target } = this.state;

    let { width, borderRadius, hasTextInput } = this.props;
    if (this.dataAlert && this.dataAlert.width) {
      width = this.dataAlert.width;
    }

    if (this.dataAlert && this.dataAlert.borderRadius) {
      borderRadius = this.dataAlert.borderRadius;
    }

    if (this.dataAlert && this.dataAlert.hasTextInput) {
      hasTextInput = this.dataAlert.hasTextInput;
    }

    const lightboxOpacityStyle = {
      opacity: this._anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.6],
        extrapolate: 'clamp',
      }),
    };

    const contentOpacityStyle = {
      opacity: this._anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
    };

    const openStyle = [
      styles.open,
      {
        left: this._anim.interpolate({
          inputRange: [0, 1],
          outputRange: [origin.x, target.x],
          extrapolate: 'clamp',
        }),
        top: this._anim.interpolate({
          inputRange: [0, 1],
          outputRange: [origin.y + STATUS_BAR_OFFSET, target.y],
          extrapolate: 'clamp',
        }),
        width: this._anim.interpolate({
          inputRange: [0, 1],
          outputRange: [origin.width, SCREEN.width],
          extrapolate: 'clamp',
        }),
        height: this._anim.interpolate({
          inputRange: [0, 1],
          outputRange: [origin.height, SCREEN.height],
          extrapolate: 'clamp',
        }),
        transform: [
          {
            scale:
              this.dataAlert && this.dataAlert.notScale
                ? 1
                : this._anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                  extrapolate: 'clamp',
                }),
          },
        ],
      },
    ];

    const background = (
      <Animated.View
        style={[
          styles.background,
          { backgroundColor: backgroundOverlay },
          lightboxOpacityStyle,
        ]}
      />
    );

    const content = (
      <Animated.View
        pointerEvents="box-none"
        style={[openStyle, contentOpacityStyle, styles.center]}>
        <View
          style={[
            styles.content,
            {
              width,
              borderRadius,
              overflow: 'hidden',
              backgroundColor: '#ffffff',
            },
            style,
          ]}>
          {this.renderContent()}
          {this.renderButton()}
        </View>
      </Animated.View>
    );

    if (useModal) {
      return (
        <Modal visible={isOpen} transparent onRequestClose={() => this.close()}>
          {hasTextInput && (
            <>
              {background}
              <ScrollView>{content}</ScrollView>
            </>
          )}
          {!hasTextInput && background}
          {!hasTextInput && content}
        </Modal>
      );
    }

    if (isOpen) {
      return (
        <View style={styles.absolute}>
          {hasTextInput && (
            <>
              {background}
              <ScrollView>{content}</ScrollView>
            </>
          )}
          {!hasTextInput && background}
          {!hasTextInput && content}
        </View>
      );
    }

    return null;
  }
}

Alert.defaultProps = {
  origin: {
    x: SCREEN.width / 2,
    y: SCREEN.height / 2,
    width: 0,
    height: 0,
  },
  springConfig: { tension: 30, friction: 7 },
  isOpen: false,
  backgroundOverlay: 'rgba(0, 0, 0, 1)',
  width: Math.min(SCREEN.width - 80),
  hasTextInput: false,
  borderRadius: 12,
  useModal: false,
  messageColor: 'black',
};

export default Alert;
