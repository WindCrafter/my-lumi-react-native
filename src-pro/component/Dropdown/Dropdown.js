/**
 * Created by nghinv on Fri Jan 15 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React, { useState } from 'react';
import { ViewStyle, ViewProps } from 'react-native';
import Animated, { measure, runOnJS, useAnimatedGestureHandler, useAnimatedRef } from 'react-native-reanimated';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Overlay, { ContentType } from './components/Overlay';
import Card, { CardProps } from './components/Card';
import Button, { ButtonProps } from './components/Button';
import Separator, { SeparatorProps } from './components/Separator';

type PositionType = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'auto';

type OptionsType = Array<ButtonProps>

interface DropdownProps {
  renderContent?: React.FC<ContentType>;
  containerStyle?: ViewStyle;
  position?: PositionType;
  space?: Number;
  scaleEnable?: Boolean;
  scaleDefault?: Number;
  options?: OptionsType;
  cardProps?: ViewProps;
  contentAlign?: 'auto' | 'left' | 'right';
  overlayOpacity?: Number;
  overlayColor?: String;
}

interface DropDownType extends React.FC<DropdownProps> {
  Card: React.FC<CardProps>;
  Button: React.FC<ButtonProps>;
  Separator: React.FC<SeparatorProps>;
}

function DropdownView(props?: DropdownProps) {
  const { children, renderContent, position, space, scaleEnable, scaleDefault, options, cardProps, contentAlign, overlayOpacity, overlayColor } = props;
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
      <TapGestureHandler
        onGestureEvent={onTapGesture}
      >
        <Animated.View>
          {
            React.Children.map(children, (element) => {
              return React.cloneElement(element, { ref: childrenRef, zIndex: 1 });
            })
          }
        </Animated.View>
      </TapGestureHandler>
      {
        (renderContent || Array.isArray(options)) && (
          <Overlay
            target={target}
            position={position}
            visible={visible}
            onClose={onClose}
            space={space}
            scaleEnable={scaleEnable}
            scaleDefault={scaleDefault}
            options={options}
            renderContent={renderContent}
            cardProps={cardProps}
            contentAlign={contentAlign}
            overlayOpacity={overlayOpacity}
            overlayColor={overlayColor}
          />
        )
      }
    </>
  );
}

const Dropdown: DropDownType = React.memo(DropdownView);

Dropdown.defaultProps = {
  position: 'topRight',
  space: 1,
  scaleEnable: true,
  contentAlign: 'auto',
};

Dropdown.Card = Card;

Dropdown.Button = Button;

Dropdown.Separator = Separator;

export default Dropdown;
