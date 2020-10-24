import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../../../utlis';
import {TabbarIcon} from '..';
import {SCREEN_WIDTH} from '../../../utlis/config/utlis';

const ButtonTabbar = ({
  descriptors,
  navigation,
  state,
  route,
  index,
  tab,
  title,
}) => {
  const {options} = descriptors[route.key];

  const isFocused = state.index === index;

  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  const onLongPress = () => {
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    });
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityStates={isFocused ? ['selected'] : []}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <TabbarIcon tab={tab} focused={isFocused} />
      <Text
        style={[styles.text, {color: isFocused ? Colors.background : 'gray'}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonTabbar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  text: {
    marginVertical: 4,
    fontSize: SCREEN_WIDTH > 350 ? 12 : 10,
  },
});
