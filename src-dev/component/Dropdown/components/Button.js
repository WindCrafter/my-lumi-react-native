/**
 * Created by nghinv on Mon Jan 18 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle, Platform } from 'react-native';
import Icon, { IconType } from '../../Icon/Icon';

export interface ButtonProps extends IconType {
  checked?: Boolean;
  title?: String;
  iconName?: String;
  renderIcon?: React.FC;
  onPress?: () => void;
  minHeight?: Number | String;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  disable?: Boolean;
  iconCheckColor?: String;
  direction: 'left' | 'right';
  testIDButton?: String;
  accessibilityLabelButton?: String;
  testIDTitle?: String;
  accessibilityLabelTitle?: String;
}

Button.defaultProps = {
  minHeight: 50,
  disable: false,
  iconCheckColor: '#0066FF',
  direction: 'left',
};

export default function Button(props?: ButtonProps) {
  const {
    checked,
    title,
    iconName,
    iconType,
    iconColor,
    renderIcon,
    onPress,
    minHeight,
    disable,
    containerStyle,
    titleStyle,
    iconCheckColor,
    direction,
    testIDButton,
    accessibilityLabelButton,
    testIDTitle,
    accessibilityLabelTitle,
  } = props;
  const ButtonComponent = (onPress && !disable) ? TouchableOpacity : View;

  return (
    <ButtonComponent
      style={[styles.container, { minHeight, opacity: disable ? 0.4 : 1 }, containerStyle]}
      onPress={onPress}
      testID={testIDButton}
      accessibilityLabel={accessibilityLabelButton}
    >
      {
        direction === 'right' && checked && (
          <Icon
            style={styles.checkIconLeft}
            name='check'
            color={iconCheckColor}
            size={20}
          />
        )
      }
      <View style={styles.viewContent}>
        {
          direction !== 'right' ? renderIcon ? renderIcon() : iconName && (
            <Icon
              style={styles.iconLeft}
              type={iconType}
              name={iconName}
              color={iconColor}
              size={32}
            />
          ) : null
        }
        {
          title !== undefined && title !== null && (
            <Text
              numberOfLines={3}
              testID={testIDTitle}
              accessibilityLabel={accessibilityLabelTitle}
              ellipsizeMode={(Platform.OS === 'ios' && direction === 'right') ? 'head' : 'tail'}
              style={[
                styles.txtTitle,
                {
                  textAlign: direction === 'right' ? 'right' : 'left',
                },
                renderIcon && { [`margin${direction === 'right' ? 'Right' : 'Left'}`]: 4 },
                titleStyle,
              ]}
            >
              {title}
            </Text>
          )
        }
        {
          direction === 'right' ? renderIcon ? renderIcon() : iconName && (
            <Icon
              style={styles.iconRight}
              type={iconType}
              name={iconName}
              color={iconColor}
              size={32}
            />
          ) : null
        }
      </View>
      {
        direction !== 'right' && checked && (
          <Icon
            style={styles.checkIconRight}
            name='check'
            color={iconCheckColor}
            size={20}
          />
        )
      }
    </ButtonComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    justifyContent: 'flex-end',
  },
  viewContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtTitle: {
    fontSize: 16,
    flex: 1,
  },
  checkIconLeft: {
    marginLeft: -4,
    marginRight: 2,
  },
  checkIconRight: {
    marginLeft: 2,
    marginRight: -4,
  },
  iconLeft: {
    marginLeft: -4,
    marginRight: 2,
  },
  iconRight: {
    marginLeft: 2,
    marginRight: -4,
  },
});
