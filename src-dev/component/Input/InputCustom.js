import React from 'react';
import {
  TextInputProps,
  TextInput,
  Image,
  View,
  StyleSheet,
  ViewStyle,
  Text,
  Platform
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Card } from 'native-base';
import { imgs } from '../../../utlis';

interface Props extends TextInputProps {
  leftImage?: String | Number;
  width?: String | Number;
  height?: Number;
  borderRadius?: Number;
  backgroundColor?: String;
  containerStyle?: ViewStyle;
  refInput?: React.Ref;
}

InputCustom.defaultProps = {
  width: wp(90),
  height: 50,
  borderRadius: 12,
  backgroundColor: 'rgb(241,251,245)',
  leftImage: imgs.personal,
};

export default function InputCustom(props?: Props) {
  const {
    shadowColor,
    shadowOpacity,
    shadowOffset,
    leftImage,
    width,
    height,
    borderRadius,
    backgroundColor,
    containerStyle,
    refInput,
    testID,
    title,
    ...otherProps
  } = props;
  const ViewCard = Platform.OS === 'ios' ? View : Card;

  return (
    <ViewCard
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
      ]}
    >
      <View style={styles.left}>
        <Image source={leftImage} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>{title}</Text>
      </View>
      <TextInput
        testID={testID}
        ref={refInput}
        style={styles.textInput}
        selectionColor="black"
        placeholderTextColor="gray"
        autoCorrect={false}
        clearButtonMode="always"
        keyboardType="email-address"
        {...otherProps}
      />
    </ViewCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginVertical: 8,
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
    alignSelf: 'center',
    textAlign: 'right',
    fontFamily: 'Quicksand-Regular',

  },
  left: {
    flexDirection: 'row',
  },
  title: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 8,
  },
});
