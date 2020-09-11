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
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {imgs, Colors} from '../../../utlis';
import {Card} from 'native-base';

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
  width: wp(90),
  height: 60,
  borderRadius: 12,
  backgroundColor: Colors.background,
  paddingLeft: 12,
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
    paddingLeft,
    ...otherProps
  } = props;
  const ViewCard = Platform.OS === 'ios' ? View : Card;

  return (
    <ViewCard
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
        style={[
          {
            paddingLeft,
          },
          styles.textInput,
        ]}
        selectionColor={'black'}
        placeholder={'Vui lòng nhập....'}
        placeholderTextColor={Colors.black}
        autoCorrect={false}
        clearButtonMode="always"
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
    fontSize: 16,
    color: 'black',
 

    paddingLeft: 12,
   
  },
  textTitle: {
    // flex: 1,
    padding: 6,
    fontSize: 16,
    color: Colors.black,
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
}
);
