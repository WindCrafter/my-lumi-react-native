import React, { useState } from 'react';
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
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Card } from 'native-base';
import { Colors, imgs } from '../../../utlis';
import { Button, Touchable } from '..';

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
  select?: Boolean;
  loop?: String;
  onSetWeek?: Function;
  onSetMonth?: Function;
  onSetYear?: Function;
}

InputPick.defaultProps = {
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
  select: false,
};

export default function InputPick(props?: Props) {
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
    select,
    color,
    onSetWeek,
    onSetMonth,
    onSetYear,
    loop,
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
      ]}
    >
      <TouchableOpacity
        style={styles.container}
        onPress={onPressButton}
        disabled={disabled}
      >
        <Image source={leftImage} style={styles.image} resizeMode="contain" />
        <Text
          style={[
            {
              color,
            },
            styles.textTitle,
          ]}
        >
          {title}
        </Text>
        <View style={styles.detail}>
          <Text
            style={[
              {
                marginRight,
              },
              styles.textDetail,
            ]}
          >
            {detail}
          </Text>
        </View>
        <Image source={rightImage} style={styles.img} resizeMode="contain" />
      </TouchableOpacity>
      {select ? (
        <View style={styles.viewSelect}>
          <View style={styles.line} />
          <View style={styles.containerWeek}>
            <TouchableOpacity onPress={onSetWeek} style={styles.viewWeek}>
              <Image
                style={styles.timeImage}
                source={loop === 'week' ? imgs.correct : imgs.uncorrect}
              />
              <Text>Tuần</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </ViewCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    textAlignVertical: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop:  8,
    height:36
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
    paddingLeft:8
  },
  detail: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  textDetail: {
    padding: 6,
    fontSize: 16,
    color: 'rgba(4, 4, 15, 0.45)',
    paddingRight: 16,
  },
  viewWeek: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 25, 0.22)',
    alignSelf: 'center',
    marginBottom: 24,
  },
  containerWeek: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
  },
  timeImage: {
    marginRight: 4,
    width: 24,
    height: 24,
    tintColor: '#abb0bb',
  },
  viewSelect: { height: 80 },
});
