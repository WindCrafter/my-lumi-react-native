import React from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';
import {imgs, Colors} from '../../../utlis';

HeaderCustom.defaultProps = {
  width: wp(100),
  height: 60,
  button: false,
  fontSize: 20,
  rightImage: imgs.add,
  backgroundColor: Colors.white,
  textPress: false,
};

export default function HeaderCustom(props?: Props) {
  const {
    leftImage,
    width,
    height,
    backgroundColor,
    containerStyle,
    title,
    goBack,
    rightButton,
    onRight,
    fontSize,
    rightImage,
    textPress,
    ...otherProps
  } = props;

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          // backgroundColor,
        },
        containerStyle,
      ]}>
      <TouchableOpacity onPress={goBack} style={styles.button}>
        {/* <Image source={leftImage} style={styles.image} resizeMode="contain" /> */}
        <Icon
          name="chevron-left"
          size={32}
          color={Colors.black}
          style={{top: 4}}
        />
      </TouchableOpacity>
      <Text style={[styles.title, {fontSize}]} {...otherProps}>
        {title}
      </Text>
      {rightButton ? (
        <TouchableOpacity style={styles.right} onPress={onRight}>
          {textPress ? (
            <Text style={styles.txtBt}>Xong</Text>
          ) : (
            <Image source={rightImage} style={styles.img} />
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderBottomWidth: 0.25,
    borderColor: Colors.gray,
  },
  button: {
    position: 'absolute',
    left: 16,
    width: 32,
    height: 32,
  },
  image: {
    width: 32,
    height: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.black,
    marginTop: 8,
  },
  right: {
    backgroundColor: 'rgba(0,0,0,0)',
    padding: 4,
    position: 'absolute',
    right: 16,
    borderRadius: 16,
  },
  img: {
    width: 20,
    height: 20,
    tintColor: 'black',
  },
  txtBt: {
    fontSize: 18,
    fontWeight: '300',
    color: Colors.background,
    textAlign: 'center',
  },
});
