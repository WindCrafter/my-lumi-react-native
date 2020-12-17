import React, {useState} from 'react';
import {
  TextInputProps,
  TextInput,
  Image,
  View,
  StyleSheet,
  ViewStyle,
  Text,
  Platform,
  TouchableOpacity,
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
  onChangeText?: Function;
  value?: String;

  rightIcon?: Boolean;
}

InputApply.defaultProps = {
  borderRadius: 12,
  backgroundColor: Colors.background,
  rightIcon: false,
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
    rightIcon,
    value,
    onChangeText,
    ...otherProps
  } = props;
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
    console.log('blur');
  };
  return (
    <Card
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
        numberOfLines={3}
        testID={testID}
        ref={refInput}
        style={[
          {
            paddingLeft,
          },
          styles.textInput,
          rightIcon ? {paddingRight: 8} : undefined,
        ]}
        placeholder={'Vui lòng nhập....'}
        autoCorrect={false}
        clearButtonMode="while-editing"
        maxLength={100}
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={(txtValue) => onChangeTextInput(txtValue)}
        value={value}
        keyboardType={
          Platform.OS === 'ios' ? 'email-address' : 'visible-password'
        }
        {...otherProps}
      />
      {rightIcon &&  value !==''  && (
        <TouchableOpacity onPress={onRightButton} style={styles.rightButton}>
          <Image style={styles.icon} source={imgs.cancel} />
        </TouchableOpacity>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingBottom: Platform.OS==='ios'? 16 : 8,
    paddingTop: Platform.OS==='ios'? 12 : 4,
  },
  textInput: {
    fontSize: 16,
    width: '90%',
    fontFamily: 'Quicksand-Regular',
    height:'100%',
    justifyContent:'center',alignItems:'center'
   
    
  },
  left: {
    flexDirection: 'row',
  },
  icon: {
    width: 14,
    height: 14,
  },
});
