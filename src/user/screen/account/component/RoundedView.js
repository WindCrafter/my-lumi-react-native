import React from 'react';
import {
  TextInputProps,
  Image,
  View,
  StyleSheet,
  ViewStyle,
  Text,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {imgs} from '../../../../../utlis';
import {Card} from 'native-base';

interface Props extends RoundedView {
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
  fontSize?: String;
  tintColor?: String;
  line?: Boolean;
  tintColorLeft?: String;
}

RoundedView.defaultProps = {
  width: '100%',
  leftImage: imgs.personal,
  rightImage: imgs.down,
  shadowColor: '#000000',
  shadowOpacity: 0.16,
  paddingHorizontal: 16,
  justifyContent: 'center',
  alignSelf: 'center',
  alignItems: 'center',
  fontSize: 0,
  tintColor: 'black',
  line: false,
  styleImg: {
    width: 24,
    height: 24,
    alignSelf: 'center',
  },
  // tintColorLeft :''
};

export default function RoundedView(props?: Props) {
  const {
    leftImage,
    rightImage,
    width,
    height,
    detail,
    containerStyle,
    title,
    onPressButton,
    disabled,
    paddingHorizontal,
    justifyContent,
    alignSelf,
    alignItems,
    padding,
    styleImg,
    fontSize,
    tintColor,
    line,
    tintColorLeft,
  } = props;

  return (
    <>
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
          <View style={styles.middle}>
            <Image
              source={leftImage}
              style={[{tintColorLeft}, styleImg]}
              resizeMode="cover"
            />
            <View style={styles.viewTitle}>
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
            style={[{tintColor}, styles.image]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      {line ? <View style={styles.line} /> : null}
    </>
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
    width: 18,
    height: 18,
    alignSelf: 'center',
  },
  textTitle: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
  },

  textDetail: {
    color: 'black',
  },
  line: {
    width: '80%',
    height: 1,
    backgroundColor: 'rgba(0, 0, 25, 0.22)',
    alignSelf: 'center',
  },
  viewTitle: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  middle: {flexDirection: 'row', justifyContent: 'center'},
});
