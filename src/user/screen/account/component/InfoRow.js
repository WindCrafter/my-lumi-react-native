import React from 'react';
import {
  TextInputProps,
  TextInput,
  Image,
  View,
  StyleSheet,
  ViewStyle,
  Text,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Card, Col} from 'native-base';
import {Colors, imgs} from '../../../../../utlis';

interface Props extends TextInputProps {
  leftImage?: String | Number;
  width?: String | Number;
  height?: Number;
  borderRadius?: Number;
  backgroundColor?: String;
  containerStyle?: ViewStyle;
  refInput?: React.Ref;
  canedit?: Boolean;
}

InforRow.defaultProps = {
  width: wp(90),
  height: 50,
  borderRadius: 24,
  backgroundColor: 'rgb(241,251,245)',
  leftImage: imgs.personal,
  canedit: true,
};

export default function InforRow(props?: Props) {
  const {
    shadowColor,
    shadowOpacity,
    shadowOffset,
    leftImage,
    width,
    borderRadius,
    backgroundColor,
    containerStyle,
    refInput,
    testID,
    title,
    canedit,
    ...otherProps
  } = props;
  // const View = Platform.OS === 'ios' ? View : Card;

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {/* <Image source={leftImage} style={styles.image} resizeMode="contain" /> */}
        <Text style={styles.title}>{title}</Text>
      </View>
      <TextInput
        testID={testID}
        ref={refInput}
        style={[styles.textInput, {width: width}]}
        selectionColor={'black'}
        placeholderTextColor={'gray'}
        autoCorrect={false}
        clearButtonMode="always"
        keyboardType="email-address"
        editable={canedit}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginVertical: 4,
    width: widthPercentageToDP(100) - 48,
  },
  image: {
    width: 24,
    height: 24,
    tintColor: Colors.black,
  },
  textInput: {
    flex: 1,
    paddingLeft: 12,
    fontSize: 16,
    color: 'black',
    alignSelf: 'center',
    textAlign: 'right',
    fontFamily: 'Quicksand-Regular',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
  },
  left: {
    flexDirection: 'row',
    flex:1,
  },
  title: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 8,
  },
});