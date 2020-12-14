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
import {Colors, imgs} from '../../../utlis';
import {Button, Touchable} from '../../component';
import {Card} from 'native-base';

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
  color?: String;
}

InputDown.defaultProps = {
  width: wp(90),
  height: 70,
  borderRadius: 16,
  leftImage: imgs.personal,
  rightImage: imgs.down,
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowColor: '#000000',
  shadowOpacity: 0.16,
  detail: 'Vui lòng chọn',
  paddingHorizontal: 16,
  justifyContent: 'center',
  alignSelf: 'center',
  alignItems: 'center',
  padding: 6,
  color: 'black',
};

export default function InputDown(props?: Props) {
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
    detail,
    onPressButton,
    disabled,
    paddingHorizontal,
    justifyContent,
    alignSelf,
    alignItems,
    padding,
    paddingVertical,
    marginRight,
    color,
  } = props;
  const ViewCard = Platform.OS === 'ios' ? Card : Card;

  return (
    <ViewCard
      style={[
        {
          shadowOffset,
          shadowOpacity,
          shadowColor,
          width,
          height,
          borderRadius,
          backgroundColor,
          paddingHorizontal,
          justifyContent,
          alignSelf,
          paddingVertical,
        },
        containerStyle,
      ]}>
      <TouchableOpacity
        style={[
          styles.container,
          {
            justifyContent:
             'center'
          },
        ]}
        onPress={onPressButton}
        disabled={disabled}>
        <View style={{flexDirection: 'row'}}>
          {detail ? (
            <Text
              style={[
                {
                  padding,
                  color,
                },
                styles.textTitle,
              ]}>
              {detail}
            </Text>
          ) : (
            <Text
              style={[
                {
                  padding,
                  color,
                },
                styles.textTitle,
              ]}>
              {title}
            </Text>
          )}
        </View>
        <Image source={rightImage} style={styles.img} resizeMode="contain" />
      </TouchableOpacity>
    </ViewCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    textAlignVertical: 'center',

    alignSelf: 'center',
    width: '100%',
  },
  image: {
    width: 24,
    height: 24,
    alignSelf: 'center',
    tintColor: 'black',
  },
  img: {
    width: 16,
    height: 16,
    alignSelf: 'center',
    tintColor: Colors.background,
  },
  textTitle: {
    alignSelf: 'center',
    fontSize: 16,
  },
  detail: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDetail: {
    padding: 6,
    fontSize: 16,
    color: 'black',
  },
});
