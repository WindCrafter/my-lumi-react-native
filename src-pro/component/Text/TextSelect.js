import React from 'react';
import {
  TextInputProps,
  Image,
  View,
  StyleSheet,
  ViewStyle,
  Text,
  TouchableOpacity,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {imgs} from '../../../utlis';

interface Props extends TextInputProps {
  leftImage?: String | Number;
  rightImage?: String | Number;
  width?: String | Number;
  height?: Number;
  borderRadius?: Number;
  backgroundColor?: String;
  containerStyle?: ViewStyle;
  refInput?: React.Ref;
  title?: String;
  onPressButton?: () => void;
  checkTick?: Boolean;
  fontSize?: String | Number;
  marginTop? : String|Number;
  marginLeft?: String | Number;

}

TextSelect.defaultProps = {
  width: wp(90),
  height: 60,
  borderRadius: 15,
  backgroundColor: 'rgb(227, 230, 229)',
  leftImage: imgs.uncorrect,
  rightImage: imgs.correct,
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowColor: '#000000',
  shadowOpacity: 0.16,
  checkTick: false,
  fontSize: 20,
  marginTop:20,
  marginLeft:0
};

export default function TextSelect(props?: Props) {
  const {
    shadowColor,
    shadowOpacity,
    shadowOffset,
    leftImage,
    rightImage,
    width,
    height,
    borderRadius,
    backgroundColor,
    containerStyle,
    title,
    checkTick,
    onPressButton,
    fontSize,
    marginTop,
    marginLeft
  } = props;

  return (
    <TouchableOpacity onPress={onPressButton}>
      <View
        style={[
          styles.container,
          { marginLeft,
            marginTop,
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
        <Text style={[styles.textTitle,{fontSize}]}>{title}</Text>
        <Image
          source={checkTick ? rightImage : leftImage}
          style={styles.imageLeft}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  imageLeft: {
    width: 30,
    height: 30,
    marginTop: 4,
  },

  textTitle: {
    // flex: 1,
    padding: 8,
    color: 'black',
  },
});