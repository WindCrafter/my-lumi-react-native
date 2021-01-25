/**
 * Created by nghinv on Fri Jan 15 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React, { useCallback, useEffect } from 'react';
import { Dimensions, StyleSheet, Modal, TouchableWithoutFeedback, ScrollView, ViewProps } from 'react-native';
import Animated, {
  Easing,
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
}

Overlay.defaultProps = {
  scaleEnable: true,
  scaleDefault: 0.95,
  space: 0,
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

  let stylesConent = {};
  let pointStyle = {};
  let direction = 'left';

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
    pointStyle = {
      direction: 'up',
      alignItems: undefined,
    };
    direction = 'left';
  } else if (position === 'topRight') {
    stylesConent = topRight;
    pointStyle = {
      direction: 'up',
      alignItems: 'flex-end',
    };
    direction = 'right';
  } else if (position === 'bottomLeft') {
    stylesConent = bottomLeft;
    pointStyle = {
      direction: 'down',
      alignItems: undefined,
    };
    direction = 'left';
  } else if (position === 'bottomRight') {
    stylesConent = bottomRight;
    pointStyle = {
      direction: 'down',
      alignItems: 'flex-end',
    };
    direction = 'right';
  } else {
    if (target.pageY < (SCREEN.height * 3) / 4 && target.pageX < SCREEN.width / 4) {
      stylesConent = topLeft;
      pointStyle = {
        direction: 'up',
        alignItems: undefined,
      };
      direction = 'left';
    }

    if (target.pageY < (SCREEN.height * 3) / 4 && target.pageX > SCREEN.width / 4) {
      stylesConent = topRight;
      pointStyle = {
        direction: 'up',
        alignItems: 'flex-end',
      };
      direction = 'right';
    }

    if (target.pageY > (SCREEN.height * 3) / 4 && target.pageX < SCREEN.width / 4) {
      stylesConent = bottomLeft;
      pointStyle = {
        direction: 'down',
        alignItems: undefined,
      };
      direction = 'left';
    }

    if (target.pageY > (SCREEN.height * 3) / 4 && target.pageX > SCREEN.width / 4) {
      stylesConent = bottomRight;
      pointStyle = {
        direction: 'down',
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

  const caculatorMaxHeightContent = pointStyle.direction === 'down' ? target.pageY : (SCREEN.height - target.pageY - target.height);

  return (
    <Modal visible={visible} transparent animationType="none">
      <TouchableWithoutFeedback onPress={onDismiss}>
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            {backgroundColor: 'rgba(0, 0, 0, 0.4)'},
          ]}
        />
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.container, stylesConent, containerStyle]}>
        {renderContent ? (
          renderContent({
            direction,
            pointStyle,
            maxHeight: caculatorMaxHeightContent - 55,
            dismiss: onDismiss,
          })
        ) : (
          <Card
            pointStyle={pointStyle}
            maxHeight={caculatorMaxHeightContent - 55}
            cardProps={cardProps}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {options.map((option, idx) => (
                <React.Fragment key={String(idx)}>
                  {idx > 0 && idx < options.length && <Separator />}
                  <Button
                    {...option}
                    direction={direction}
                    onPress={() => {
                      onDismiss();
                      option.onPress && option.onPress();
                    }}
                  />
                </React.Fragment>
              ))}
            </ScrollView>
          </Card>
        )}
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});
