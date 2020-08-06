import React from 'react';
import {
  TextInputProps,
  TextInput,
  Image,
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';
<<<<<<< HEAD
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
=======
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { imgs } from '../../../utlis';
>>>>>>> 28c4ef8ac358f9825e0ae95e973ec0f8d894f770

interface Props extends TextInputProps {
  leftImage?: String | Number;
  width?: String | Number;
  height?: Number;
  borderRadius?: Number;
  backgroundColor?: String;
  containerStyle?: ViewStyle;
  refInput?: React.Ref;
}

Input.defaultProps = {
  width: wp(75),
  height: 50,
  borderRadius: 8,
  backgroundColor: 'rgb(227, 230, 229)',
  leftImage: imgs.personal,
};

export default function Input(props?: Props) {
  const {
    leftImage,
    width,
    height,
    borderRadius,
    backgroundColor,
    containerStyle,
    refInput,
    testID,
    ...otherProps
  } = props;

  return (
    <View
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
      <Image source={leftImage} style={styles.image} resizeMode="contain" />
      <TextInput
        testID={testID}
        ref={refInput}
        style={styles.textInput}
        selectionColor={'black'}
        placeholderTextColor={'gray'}
        autoCorrect={false}
        clearButtonMode="always"
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  image: {
    width: 32,
    height: 32,
  },
  textInput: {
    flex: 1,
    paddingLeft: 12,
    fontSize: 16,
    color: 'black',
  },
});
