/**
 * Created by nghinv on Fri Jan 15 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React, { useCallback, useEffect } from 'react';
import { Dimensions, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface OverlayProps {
  visible?: Boolean;
  scaleEnable?: Boolean;
  onClose?: () => void;
}

Overlay.defaultProps = {
  scaleEnable: true,
};

const SCREEN = Dimensions.get('window');

const defaultTimingConfig = {
  duration: 250,
  easing: Easing.bezier(0.33, 0.01, 0, 1),
};

export default function Overlay(props?: OverlayProps) {
  const { visible, children, target, position, onClose, space, scaleEnable } = props;
  const progress = useSharedValue(0);
  const scale = useSharedValue(0.95);

  useEffect(() => {
    if (visible) {
      progress.value = withTiming(1, defaultTimingConfig);

      if (scaleEnable) {
        scale.value = withSpring(1);
      }
    }
  }, [visible, progress]);

  const onDismiss = () => {
    progress.value = withTiming(0, { duration: 50 }, () => {
      if (scaleEnable) {
        scale.value = 0.95;
      }

      runOnJS(cancelOverlay)();
    });
  };

  const cancelOverlay = useCallback(() => {
    onClose && onClose();
  }, []);

  const containerStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [
        { scale: scaleEnable ? scale.value : 1 },
      ],
    };
  });

  let stylesConent = {};
  const topLeft = {
    top: target.pageY + target.height + space,
    left: target.pageX,
  };
  const topRight = {
    top: target.pageY + target.height + space,
    right: SCREEN.width - (target.pageX + target.width),
  };
  const bottomLeft = {
    bottom: SCREEN.height - target.pageY + space,
    left: target.pageX,
  };
  const bottomRight = {
    bottom: SCREEN.height - target.pageY + space,
    right: SCREEN.width - (target.pageX + target.width),
  };

  if (position === 'topLeft') {
    stylesConent = topLeft;
  } else if (position === 'topRight') {
    stylesConent = topRight;
  } else if (position === 'bottomLeft') {
    stylesConent = bottomLeft;
  } else if (position === 'bottomRight') {
    stylesConent = bottomRight;
  } else {
    if (target.pageY < (SCREEN.height * 3) / 4 && target.pageX < SCREEN.width / 4) {
      stylesConent = topLeft;
    }

    if (target.pageY < (SCREEN.height * 3) / 4 && target.pageX > SCREEN.width / 4) {
      stylesConent = topRight;
    }

    if (target.pageY > (SCREEN.height * 3) / 4 && target.pageX < SCREEN.width / 4) {
      stylesConent = bottomLeft;
    }

    if (target.pageY > (SCREEN.height * 3) / 4 && target.pageX > SCREEN.width / 4) {
      stylesConent = bottomRight;
    }
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType='none'
    >
      <TouchableWithoutFeedback onPress={onDismiss}>
        <Animated.View style={StyleSheet.absoluteFillObject} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[styles.container, stylesConent, containerStyle]}
      >
        {children}
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});
