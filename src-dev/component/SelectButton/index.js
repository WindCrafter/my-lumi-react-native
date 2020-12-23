/**
 * Created by nghinv on Sun Sep 06 2020
 * Copyright (c) 2020 nguyennghidt6@gmail.com
 */

import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Overlay from './Overlay';

interface SelectButtonProps {
  renderDropdown?: () => void;
  dropdownWidth: Number;
  dropdownHeight: Number;
  onPress: () => void;
}

SelectButton.defaultProps = {
  dropdownWidth: 100,
  dropdownHeight: 100,
};

export default function SelectButton(props?: SelectButtonProps) {
  const {
    renderDropdown,
    dropdownWidth,
    dropdownHeight,
    onPress,
    customX,
    customY,
  } = props;
  const buttonRef = React.createRef();
  const overlayRef = React.createRef();

  const onPressButton = () => {
    onPress && onPress();
    if (buttonRef) {
      buttonRef.current.measure((ox, oy, width, height, px, py) => {
        console.log('onPressButton', width, height, px, py);
        if (overlayRef) {
          overlayRef.current.show({
            origin: {
              x: customX ? customX + px : px,
              y: customY ? customY + py : py,
              width,
              height,
            },
          });
        }
      });
    }
  };

  const hideOverlay = () => {
    overlayRef.current && overlayRef.current.hide();
  };

  return (
    <>
      <View ref={buttonRef} onLayout={() => {}}>
        <TouchableOpacity onPress={onPressButton}>
          {props.children}
        </TouchableOpacity>
      </View>
      <Overlay
        ref={overlayRef}
        dropdownWidth={dropdownWidth}
        dropdownHeight={dropdownHeight}>
        {renderDropdown && renderDropdown(hideOverlay)}
      </Overlay>
    </>
  );
}
