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
import {imgs} from '../../../../../utlis';

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
  detail?: String;
  paddingHorizontal?: String;
  justifyContent?: String;
  alignSelf?: String;
  alignItems?: String;
  padding?: String;
  paddingVertical?: String;
  marginRight?: String;
  tintColor?: String;
  line?: Boolean;
}

RoundedView.defaultProps = {
  width: '100%',
  height: 70,
  leftImage: imgs.personal,
  rightImage: imgs.down,
  paddingHorizontal: 16,
  justifyContent: 'center',
  alignSelf: 'center',
  alignItems: 'center',
  tintColor: 'black',
  line: false,
};

export default function RoundedView(props?: Props) {
  const {
    leftImage,
    rightImage,
    width,
    containerStyle,
    title,
    onPressButton,
    disabled,
    alignSelf,
    padding,
    tintColor,
    line,
  } = props;

  return (
    <View
      style={[
        {
          width,

          alignSelf,
        },
        containerStyle,
      ]}>
      <TouchableOpacity
        style={styles.container}
        onPress={onPressButton}
        disabled={disabled}>
        <View style={styles.top}>
          <Image source={leftImage} style={styles.image} resizeMode="contain" />
          <View style={styles.wrap}>
            <Text
              style={[
                {
                  padding,
                },
                styles.textTitle,
              ]}>
              {title}
            </Text>
          </View>
        </View>

        <Image
          source={rightImage}
          style={[{tintColor}, styles.img]}
          resizeMode="contain"
        />
      </TouchableOpacity>
      {line ? <View style={styles.line} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    textAlignVertical: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '90%',
  },
  image: {
    width: 24,
    height: 24,
    alignSelf: 'center',
  },
  img: {
    width: 16,
    height: 16,
    alignSelf: 'center',
  },
  textTitle: {
    fontSize: 18,
    color: 'black',
  },

  textDetail: {
    color: 'black',
  },
  line: {
    width: '80%',
    height: 1,
    backgroundColor: 'rgba(0, 0, 25, 0.22)',
    alignSelf: 'center',
    marginTop: 11,
  },
  top: {flexDirection: 'row', justifyContent: 'center'},
  wrap: {marginLeft: 12},
});
