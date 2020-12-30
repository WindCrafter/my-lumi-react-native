import React from 'react';
import {
  Text,
  StyleSheet,
  TextStyle,
  ViewStyle,
  Image,
  TouchableOpacity,
} from 'react-native';
import {imgs} from '../../../../../utlis';

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
  return (
    <TouchableOpacity
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
        <Text style={[styles.txtTitle, {color: titleColor}, titleStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 160,
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
