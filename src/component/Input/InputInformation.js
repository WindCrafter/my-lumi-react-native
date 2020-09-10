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
import { imgs } from '../../../utlis';
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
}

InputInfor.defaultProps = {
  width: wp(90),
  height: 50,
  borderRadius: 3,
  backgroundColor: 'rgb(227, 230, 229)',
  leftImage: imgs.personal,
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowColor: '#000000',
  shadowOpacity: 0.16,
};

export default function InputInfor(props?: Props) {
  const {
    shadowColor,
    shadowOpacity,
    shadowOffset,
    leftImage,
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
      <Image source={leftImage} style={styles.image} resizeMode="contain" />
      <Text style={styles.textTitle}>{title}</Text>
      <TextInput
        testID={testID}
        ref={refInput}
        style={styles.textInput}
        selectionColor={'black'}
        placeholderTextColor={'gray'}
        autoCorrect={false}
        clearButtonMode="always"
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
    textAlign: 'right',
  },
  textTitle: {
    // flex: 1,
    padding: 6,
    fontSize: 16,
    color: 'black',
  },
});
