import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const KeyBoardScroll = ({children, containerStyle, ...otherProps}) => {
  return (
    <KeyboardAwareScrollView
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[containerStyle, {flexGrow: 0}]}
      enableResetScrollToCoords
      enableOnAndroid
      scrollEnabled
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
      behavior="height"
      {...otherProps}>
      {children}
    </KeyboardAwareScrollView>
  );
};

export default KeyBoardScroll;
