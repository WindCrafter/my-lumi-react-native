import React from 'react';
import {
  TextInputProps,
  TextInput,
  Image,
  View,
  StyleSheet,
  ViewStyle,
  Text,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { imgs, Colors } from '../../../utlis';

interface Props extends TextInputProps {
  leftImage?: String | Number;
  width?: String | Number;
  height?: Number;
  borderRadius?: Number;
  backgroundColor?: String;
  containerStyle?: ViewStyle;
  refInput?: React.Ref;
  title?: String;
}

InputApply.defaultProps = {
  width: wp(90),
  height: 60,
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
    title,
    ...otherProps
  } = props;

  return (
    <View
      style={[
        styles.container,
        {
          shadowOffset,
          shadowOpacity,
          shadowColor,
          width,
          height,
          borderRadius,
          backgroundColor,
        },
        containerStyle,
      ]}>
      <TextInput
        multiline
        testID={testID}
        ref={refInput}
        style={styles.textInput}
        selectionColor={'black'}
        placeholder={'Vui lòng nhập....'}
        placeholderTextColor={Colors.white}
        autoCorrect={false}
        clearButtonMode="always"
        maxLength={100}

        {...otherProps}
      />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginVertical: 8,
  },
  image: {
    width: 24,
    height: 24,
  },
  textInput: {
    flex: 1,
    paddingLeft: 12,
    fontSize: 16,
    color: 'black',
  },
  textTitle: {
    // flex: 1,
    padding: 6,
    fontSize: 16,
    color: Colors.white,
    alignSelf: 'center',
  },
  left: {
    flexDirection: 'row',
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '400',
    marginLeft: 8,
  },
});
