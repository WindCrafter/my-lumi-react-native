import React from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';
import { Card } from 'native-base';
import { imgs, Colors } from '../../../utlis';

interface Props extends EmptyState {
  width?: String | Number;
  height?: String | Number;

  title?: String;
  description?: String;
}
EmptyState.defaultProps = {
  width: 300,
  height: 120,
  source: imgs.notFound,
  title: 'Không tìm thấy kết quả.',
  description: 'Bạn hãy thử thay đổi từ khoá hoặc thay đổi bộ lọc tìm kiếm.',
};
export default function EmptyState(props?:Props) {
  const {
    width,
    height,
    source,
    title,
    description,
    ...otherProps
  } = props;
  return (
    <View
      style={{ justifyContent: 'center', alignItems: 'center', height: hp(70) }}
    >
      <ImageBackground
        resizeMode="contain"
        source={source}
        style={{ width: wp(72), height: wp(36), alignSelf: 'center' }}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    alignSelf: 'center',
    color: Colors.ink500,
    fontWeight: '600',
    fontFamily: 'Quicksand-Bold',
    paddingTop: 24
  },
  description: {
    fontSize: 16,
    alignSelf: 'center',
    color: Colors.ink400,
    textAlign: 'center',
    paddingHorizontal: 36,
    paddingTop: 8
  },
});
