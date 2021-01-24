/**
 * Created by nghinv on Fri Jan 15 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React, { useState } from 'react';
import { ViewStyle } from 'react-native';
import Animated, { measure, runOnJS, useAnimatedGestureHandler, useAnimatedRef } from 'react-native-reanimated';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Overlay from './Overlay';

type PositionType = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'auto';

interface DropdownProps {
  renderContent?: React.FC;
  containerStyle?: ViewStyle;
  position?: PositionType;
  space?: Number;
  scaleEnable?: Boolean;
}

Dropdown.defaultProps = {
  position: 'topRight',
  space: 4,
  scaleEnable: true,
};

export default function Dropdown(props?: DropdownProps) {
  const { children, renderContent, position, space, scaleEnable } = props;
  const [visible, setVisible] = useState(false);
  const [target, setTarget] = useState({
    width: 0,
    height: 0,
    pageX: 0,
    pageY: 0,
  });
  const childrenRef = useAnimatedRef();

  const showContent = (measurements) => {
    setTarget(measurements);
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onTapGesture = useAnimatedGestureHandler({
    onFinish: (_, ctx, isCanceledOrFailed) => {
      if (isCanceledOrFailed) {
        return;
      }

      const measurements = measure(childrenRef);
      runOnJS(showContent)(measurements);
    },
  });

  return (
    <>
      <TapGestureHandler onGestureEvent={onTapGesture}>
        <Animated.View>
          {React.Children.map(children, (element) => {
            return React.cloneElement(element, {ref: childrenRef});
          })}
        </Animated.View>
      </TapGestureHandler>
      {renderContent && (
        <Overlay
          target={target}
          position={position}
          visible={visible}
          onClose={onClose}
          space={space}
          scaleEnable={scaleEnable}>
          {renderContent() && renderContent(onClose)}
        </Overlay>
      )}
    </>
  );
}
