import React, {useState} from 'react';
import {
  TextInputProps,
  TextInput,
  Image,
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {imgs} from '../../../utlis';

interface Props extends TextInputProps {
  leftImage?: String | Number;
  width?: String | Number;
  height?: Number;
  borderRadius?: Number;
  backgroundColor?: String;
  containerStyle?: ViewStyle;
  refInput?: React.Ref;
  rightIcon?: Boolean;
  value?: String;
  onChangeText?: Function;
}

Input.defaultProps = {
  width: wp(80),
  height: 50,
  borderRadius: 8,
  backgroundColor: 'rgb(227, 230, 229)',
  leftImage: imgs.personal,
  button: false,
  rightIcon: false,
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
    button,
    onPress,
    rightIcon,
    value,
    onChangeText,
    ...otherProps
  } = props;
  const Button = button ? TouchableOpacity : View;
  const [isFocus, setIsFocus] = useState(false);
  const [text, setText] = useState(value || '');
  const onRightButton = () => {
    onChangeText && onChangeText('');
    setIsFocus(true);
    setText('');
  };
  const onFocus = () => {
    setIsFocus(true);
  };
  const onChangeTextInput = (input) => {
    onChangeText && onChangeText(input);

    setIsFocus(true);
    setText(input);
  };
  const onBlur = () => {
    setIsFocus(false);
  };
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
      <Button onPress={onPress}>
        <Image source={leftImage} style={styles.image} resizeMode="contain" />
      </Button>
      <TextInput
        testID={testID}
        ref={refInput}
        style={[styles.textInput, rightIcon ? {paddingRight: 8} : undefined]}
        selectionColor="black"
        placeholderTextColor="gray"
        autoCorrect={false}
        clearButtonMode="never"
        keyboardType="email-address"
        value={text}
        onFocus={onFocus}
        onBlur={onBlur}
        numberOfLines={1}
        onChangeText={(txtValue) => onChangeTextInput(txtValue)}
        {...otherProps}
      />
      {rightIcon && isFocus && text !== '' && (
        <TouchableOpacity onPress={onRightButton} style={styles.rightButton}>
          <Image style={styles.icon} source={imgs.cancel} />
        </TouchableOpacity>
      )}
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
    width: 24,
    height: 24,
  },
  textInput: {
    flex: 1,
    paddingLeft: 12,
    fontSize: 16,
    color: 'black',
    fontFamily: 'Quicksand-Regular',
  },
  icon: {
    width: 14,
    height: 14,
  },
  rightButton: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
