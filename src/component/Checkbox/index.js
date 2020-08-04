import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextStyle,
  ViewStyle,
  Image,
  TouchableOpacity,
} from 'react-native';
import { imgs } from '../../../utlis';

interface Props {
  checked?: Boolean;
  onChange?: () => void;
  title?: String;
  titleStyle?: TextStyle;
  titleColor?: String;
  containerStyle?: ViewStyle;
  disable?: Boolean;
}

Checkbox.defaultProps = {
  checked: false,
  disable: false,
  titleColor: 'black',
};

export default function Checkbox(props?: Props) {
  const {
    checked,
    onChange,
    title,
    titleStyle,
    titleColor,
    containerStyle,
    disable,
    onLongPress,
  } = props;
  const ComponentButton = disable ? View : TouchableOpacity;
  return (
    <ComponentButton
      onPress={onChange}
      style={[styles.container, containerStyle]}
      onLongPress={onLongPress}
      delayLongPress={5000}>
      <Image
        style={styles.checkImage}
        source={checked ? imgs.checked : imgs.unchecked}
        resizeMode="contain"
      />
      {title !== undefined && (
        <Text style={[styles.txtTitle, { color: titleColor }, titleStyle]}>
          {title}
        </Text>
      )}
    </ComponentButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkImage: {
    width: 20,
    height: 20,
  },
  txtTitle: {
    marginLeft: 8,
    fontSize: 14,
    color: 'black',
  },
});
