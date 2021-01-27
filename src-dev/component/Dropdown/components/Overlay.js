/**
 * Created by nghinv on Fri Jan 15 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React, { useCallback, useEffect } from 'react';
import { Dimensions, StyleSheet, Modal, TouchableWithoutFeedback, ScrollView, ViewProps, StatusBar } from 'react-native';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Card, { PointStyleType } from './Card';
import Button, { ButtonProps } from './Button';
import Separator from './Separator';

export type ContentType = {
  direction: 'left' | 'right';
  pointStyle: PointStyleType;

  // Max height of dropdown content
  maxHeight: Number;

  // Use to dismiss dropdown overlay
  dismiss: () => void;
}

interface OverlayProps {
  visible?: Boolean;
  scaleEnable?: Boolean;
  scaleDefault?: Number;
  onClose?: () => void;
  options?: ButtonProps;
  renderContent?: React.FC<ContentType>;
  cardProps?: ViewProps;
  contentAlign?: 'auto' | 'left' | 'right';
  overlayOpacity?: Number;
  overlayColor?: String;
}

Overlay.defaultProps = {
  scaleEnable: true,
  scaleDefault: 0.95,
  space: 0,
  overlayOpacity: 0.2,
  overlayColor: 'black',
};

const SCREEN = Dimensions.get('window');

const defaultTimingConfig = {
  duration: 250,
  easing: Easing.bezier(0.33, 0.01, 0, 1),
};

export default function Overlay(props?: OverlayProps) {
  const {
    visible,
    target,
    contentAlign,
    position,
    onClose,
    space,
    scaleEnable,
    scaleDefault,
    options,
    renderContent,
    cardProps,
    overlayOpacity,
    overlayColor,
  } = props;
  const progress = useSharedValue(0);
  const scale = useSharedValue(scaleDefault);

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
        scale.value = scaleDefault;
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

  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.value, [0, 1], [0, overlayOpacity], Extrapolate.CLAMP),
    };
  });

  let stylesConent = {};
  let pointStyle = {};
  let direction = 'left';

  const maxHeight = SCREEN.height - target.pageY - target.height;
  const maxHeightUp = target.pageY - 55;
  const maxHeightDown = maxHeight - 55;
  console.log('target.pageX,', target.pageX, 'target.pageY', SCREEN.height - target.pageY);
  const topLeft = {
    top: target.pageY + target.height + space,
    left: target.pageX,
  };
  const topRight = {
    top: target.pageY + target.height + space,
    right: SCREEN.width - (target.pageX + target.width),
  };
  const bottomLeft = {
    top: target.pageY - maxHeightUp - space,
    left: target.pageX,
  };
  const bottomRight = {
    top: target.pageY - maxHeightUp - space,
    right: SCREEN.width - (target.pageX + target.width),
  };

  if (position === 'topLeft') {
    stylesConent = topLeft;
    pointStyle = {
      direction: 'down',
      alignItems: undefined,
    };
    direction = 'left';
  } else if (position === 'topRight') {
    stylesConent = topRight;
    pointStyle = {
      direction: 'down',
      alignItems: 'flex-end',
    };
    direction = 'right';
  } else if (position === 'bottomLeft') {
    stylesConent = bottomLeft;
    pointStyle = {
      direction: 'up',
      alignItems: undefined,
    };
    direction = 'left';
  } else if (position === 'bottomRight') {
    stylesConent = bottomRight;
    pointStyle = {
      direction: 'up',
      alignItems: 'flex-end',
    };
    direction = 'right';
  } else {
    if ((SCREEN.height - target.pageY) >= 200 && target.pageX < SCREEN.width / 4) {
      stylesConent = topLeft;
      pointStyle = {
        direction: 'down',
        alignItems: undefined,
      };
      direction = 'left';
    }

    if (SCREEN.height - target.pageY >= 200 && target.pageX > SCREEN.width / 4) {
      stylesConent = topRight;
      pointStyle = {
        direction: 'down',
        alignItems: 'flex-end',
      };
      direction = 'right';
    }

    if ((SCREEN.height - target.pageY) < 200 && target.pageX < SCREEN.width / 4) {
      stylesConent = bottomLeft;
      pointStyle = {
        direction: 'up',
        alignItems: undefined,
      };
      direction = 'left';
    }

    if ((SCREEN.height - target.pageY) < 200 && target.pageX > SCREEN.width / 4) {
      stylesConent = bottomRight;
      pointStyle = {
        direction: 'up',
        alignItems: 'flex-end',
      };
      direction = 'right';
    }
  }

  if (contentAlign === 'left') {
    direction = 'left';
  } else if (contentAlign === 'right') {
    direction = 'right';
  }

  const caculatorMaxHeightContent = pointStyle.direction === 'up' ? target.pageY : maxHeight;

  return (
    <Modal
      visible={visible}
      transparent
      animationType='none'
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={onDismiss}>
        <Animated.View style={[StyleSheet.absoluteFillObject, { backgroundColor: overlayColor }, overlayStyle]} />
      </TouchableWithoutFeedback>
      <Animated.View
        pointerEvents='box-none'
        style={[styles.container, stylesConent, containerStyle, pointStyle.direction === 'up' && { height: caculatorMaxHeightContent - 55, justifyContent: 'flex-end' }]}
      >
        {
          renderContent ? renderContent({
            direction,
            pointStyle,
            maxHeight: caculatorMaxHeightContent - 55,
            dismiss: onDismiss,
          })
            : (
              <Card
                pointStyle={pointStyle}
                maxHeight={caculatorMaxHeightContent - 55}
                cardProps={cardProps}
              >
                <ScrollView showsVerticalScrollIndicator={false}>
                  {
                    options.map((option, idx) => (
                      <React.Fragment key={String(idx)}>
                        {
                          idx > 0 && idx < options.length && <Separator />
                        }
                        <Button
                          {...option}
                          direction={direction}
                          onPress={() => {
                            onDismiss();
                            option.onPress && option.onPress();
                          }}
                        />
                      </React.Fragment>
                    ))
                  }
                </ScrollView>
              </Card>
            )
        }
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});
