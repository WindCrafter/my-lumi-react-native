import React from 'react';
import {
  TextInputProps,
  TextInput,
  Image,
  View,
  StyleSheet,
  ViewStyle,
  Text,
  Platform,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { imgs, Colors } from '../../../utlis';
import { Card } from 'native-base';

interface Props extends TextInputProps {
  leftImage?: String | Number;
  width?: String | Number;
  height?: Number;
  borderRadius?: Number;
  backgroundColor?: String;
  containerStyle?: ViewStyle;
  refInput?: React.Ref;
  title?: String;
  paddingLeft?: String;
}

InputApply.defaultProps = {
  borderRadius: 12,
  backgroundColor: Colors.background,
};

export default function InputApply(props?: Props) {
  const {
    shadowColor,
    shadowOpacity,
    shadowOffset,
    width,
    height,
    borderRadius,
    backgroundColor,
    containerStyle,
    refInput,
    testID,
    paddingLeft,
    ...otherProps
  } = props;
  const ViewCard = Platform.OS === 'ios' ? Card : View;

  return (
    <ViewCard
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius,
          backgroundColor,
        },
        containerStyle,
      ]}>
      <TextInput
        multiline
        textAlignVertical={'top'}
        numberOfLines={3}
        testID={testID}
        ref={refInput}
        style={[
          {
            paddingLeft,
          },
          styles.textInput,
        ]}
        placeholder={'Vui lòng nhập....'}
        autoCorrect={false}
        clearButtonMode="while-editing"
        maxLength={100}
        keyboardType="email-address"
        {...otherProps}
      />
    </ViewCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  textInput: {
    fontSize: 16,
    width: '90%',
  },
  left: {
    flexDirection: 'row',
  },
});
