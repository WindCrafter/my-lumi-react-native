import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

interface Props {
  containerStyle?: ViewStyle;
  disable?: Boolean;
  title?: String;
  titleStyle?: TextStyle;
  titleColor?: String;
  onPress?: () => void;
}

Touchable.defaultProps = {
  titleColor: 'black',
};

export default function Touchable(props?: Props) {
  const {
    title,
    containerStyle,
    titleStyle,
    disable,
    titleColor,
    loading,
    onPress,
    testID,
  } = props;
  const TouchableTouch = loading || disable ? View : TouchableOpacity;

  return (
    <TouchableTouch
      testID={testID}
      onPress={onPress}
      style={[styles.container, containerStyle]}>
      {!loading ? (
        <Text style={[styles.txtTitle, {color: titleColor}, titleStyle]}>
          {title}
        </Text>
      ) : (
        <ActivityIndicator size="small" color={'white'} />
      )}
    </TouchableTouch>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',

  },
});
