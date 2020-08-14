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
}

TextSelect.defaultProps = {
  width: wp(90),
  height: 60,
  borderRadius: 15,
  backgroundColor: 'rgb(227, 230, 229)',
  leftImage: imgs.uncorrect,
  rightImage: imgs.tick,
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowColor: '#000000',
  shadowOpacity: 0.16,
  checkTick: false,
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
  } = props;

  return (
    <TouchableOpacity onPress={onPressButton}>
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
        <Text style={styles.textTitle}>{title}</Text>
        <Image source={leftImage} style={styles.imageLeft} resizeMode="contain" />
        {checkTick ? (
          <Image
            source={rightImage}
            style={styles.imageRight}
            resizeMode="contain"
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  imageLeft: {
    width: 30,
    height: 30,
    position: 'absolute',
    marginLeft: wp(75),
    marginTop: 4,
  },
  imageRight: {
    width: 24,
    height: 24,
    position: 'absolute',
    marginLeft: wp(75.6),
    marginTop: 4,
  },

  textTitle: {
    // flex: 1,
    padding: 8,
    fontSize: 20,
    color: 'black',
  },
});
