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
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { imgs } from '../../../utlis';
import { Button, Touchable } from '../../component';
import { Card } from 'native-base';

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
}

InputSelect.defaultProps = {
  width: wp(80),
  height: 50,
  borderRadius: 3,
  backgroundColor: 'rgb(227, 230, 229)',
  leftImage: imgs.personal,
  rightImage: imgs.down,
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowColor: '#000000',
  shadowOpacity: 0.16,
  detail: 'Vui lòng chọn',
};

export default function InputSelect(props?: Props) {
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
  } = props;
  const ViewCard = Platform.OS === 'ios' ? View : Card;

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
        },
        containerStyle,
      ]}>
      <TouchableOpacity style={styles.container} onPress={onPressButton}>
        <Image source={leftImage} style={styles.image} resizeMode="contain" />
        <Text style={styles.textTitle}>{title}</Text>
        <View style={styles.detail}>
          <Text style={styles.txtDetail}>{detail}</Text>
        </View>
        <Image source={rightImage} style={styles.img} resizeMode="contain" />
      </TouchableOpacity>
    </ViewCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 24,
    height: 24,
  },
  img: {
    width: 20,
    height: 20,
    marginLeft: 8,
  },
  textTitle: {
    padding: 6,
    alignItems: 'center',
    fontSize: 16,
    color: 'black',
  },
  detail: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
