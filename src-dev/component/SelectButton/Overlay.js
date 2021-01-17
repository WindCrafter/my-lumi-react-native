import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';

const SCREEN = Dimensions.get('window');

class Overlay extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isAnimating: false,
      isOpen: false,
      target: {
        x: 0,
        y: 0,
        opacity: 1,
      },
      openVal: new Animated.Value(0),
      scale: new Animated.Value(0),
    };

    this.dropdownProps = {
      origin: {
        x: 16,
        y: 16,
        width: 108,
        height: 108,
      },
      springConfig: { tension: 30, friction: 7 },
      isOpen: false,
    };

    this.originDropdown = {
      x: 16,
      y: 16,
      width: 108,
      height: 108,
    };
  }

  show = (dropdownProps) => {
    if (this.state.isOpen) {
      return;
    }
    this.dropdownProps = {
      ...this.dropdownProps,
      ...dropdownProps,
    };

    this.open();
  };

  hide = (dropdownProps) => {
    this.dropdownProps = {
      ...this.dropdownProps,
      ...dropdownProps,
    };

    this.close();
  };

  getTarget = () => {
    const { origin } = this.dropdownProps;
    const target = {
      x: origin.x,
      y: origin.y,
      opacity: 1,
    };

    return target;
  };

  open = () => {
    this.setState(
      {
        isAnimating: true,
        isOpen: true,
        target: this.getTarget(),
      },
      () => {
        Animated.parallel([
          Animated.spring(this.state.scale, {
            toValue: 1,
            ...this.dropdownProps.springConfig,
            useNativeDriver: false,
          }),
          Animated.spring(this.state.openVal, {
            toValue: 1,
            ...this.dropdownProps.springConfig,
            useNativeDriver: false,
          }),
        ]).start(() => {
          this.setState({ isAnimating: false });
          this.dropdownProps.onOpen && this.dropdownProps.onOpen();
        });
      },
    );
  };

  close = () => {
    this.setState({
      isAnimating: true,
    });
    Animated.parallel([
      Animated.timing(this.state.scale, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.openVal, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start(() => {
      this.setState({
        isAnimating: false,
        isOpen: false,
      });

      this.dropdownProps.onClose && this.dropdownProps.onClose();
    });
  };

  getTargetButton = () => {
    const { origin } = this.dropdownProps;
    const { dropdownWidth, dropdownHeight } = this.props;

    const targetStart = {
      x: 0,
      y: 0,
    };

    const targetEnd = {
      x: 0,
      y: 0,
    };

    if (origin.x < (SCREEN.width * 2) / 3 && origin.y < SCREEN.height / 2) {
      // goc phan tu top left
      targetStart.x = origin.x + origin.width - dropdownWidth / 2;
      targetStart.y = Platform.OS === 'ios'
        ? origin.y + origin.height - dropdownHeight / 2
        : origin.y + origin.height - dropdownHeight / 2 - 35;
      targetEnd.x = origin.x + origin.width - dropdownWidth;
      targetEnd.y = Platform.OS === 'ios'
        ? origin.y + origin.height
        : origin.y + origin.height - 35;
    }

    if (origin.x < (SCREEN.width * 2) / 3 && origin.y > SCREEN.height / 2) {
      // goc phan tu bottom left
      targetStart.x = origin.x - 15;
      targetStart.y = Platform.OS === 'ios'
        ? origin.y + dropdownHeight / 2 - 35
        : origin.y + dropdownHeight / 2 - 70;
      targetEnd.x = origin.x - 15;
      targetEnd.y = Platform.OS === 'ios'
        ? origin.y + dropdownHeight / 2 - 35
        : origin.y + dropdownHeight / 2 - 70;
    }

    if (origin.x > (SCREEN.width * 2) / 3 && origin.y < SCREEN.height / 2) {
      // goc phan tu top right
      targetStart.x = origin.x + origin.width - dropdownWidth / 2;
      targetStart.y = origin.y + origin.height - dropdownHeight / 2;
      targetEnd.x = origin.x + origin.width - dropdownWidth;
      targetEnd.y = Platform.OS === 'ios'
        ? origin.y + origin.height
        : origin.y + origin.height - 35;
    }

    if (origin.x > (SCREEN.width * 2) / 3 && origin.y > SCREEN.height / 2) {
      // goc phan tu bottom right
      targetStart.x = origin.x + origin.width - dropdownWidth / 2;
      targetStart.y = origin.y - dropdownHeight / 2;
      targetEnd.x = origin.x + origin.width - dropdownWidth;
      targetEnd.y = origin.y - dropdownHeight;
    }

    return { start: targetStart, end: targetEnd };
  };

  render() {
    const { isOpen, openVal, scale, target } = this.state;
    const { dropdownWidth, dropdownHeight } = this.props;
    const { origin } = this.dropdownProps;

    const modalOpacityStyle = {
      opacity: openVal.interpolate({
        inputRange: [0, 1],
        outputRange: [0, target.opacity],
      }),
    };

    const targetContent = this.getTargetButton();

    const openStyle = [
      styles.open,
      {
        left: openVal.interpolate({
          inputRange: [0, 1],
          outputRange: [targetContent.start.x, targetContent.end.x],
        }),
        top: openVal.interpolate({
          inputRange: [0, 1],
          outputRange: [targetContent.start.y, targetContent.end.y],
        }),
        transform: [
          {
            scale,
          },
        ],
      },
    ];

    const background = (
      <TouchableWithoutFeedback onPress={() => this.close()}>
        <Animated.View style={[styles.background, modalOpacityStyle]}>
          <View
            style={[styles.absolute, { backgroundColor: 'rgba(0, 0, 0, 0.4)' }]}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    );

    return (
      <Modal
        visible={isOpen}
        animationType="none"
        transparent
        onRequestClose={() => this.close()}
      >
        {background}
        <Animated.View style={[openStyle, modalOpacityStyle]}>
          {this.props.children}
        </Animated.View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN.width,
    height: SCREEN.height,
  },
  open: {
    position: 'absolute',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default Overlay;
