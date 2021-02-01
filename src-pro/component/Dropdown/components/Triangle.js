/**
 * Created by nghinv on Mon Jan 18 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React, { useCallback } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface TriangleProps {
  direction?: 'up' | 'right' | 'down' | 'left' | 'up-right' | 'up-left' | 'down-right' | 'down-left';
  width: Number;
  height: Number;
  color?: String;
  style?: ViewStyle;
}

Triangle.defaultProps = {
  direction: 'up',
  width: 0,
  height: 0,
  color: 'white',
};

export default function Triangle(props?: TriangleProps) {
  const { direction, width, height, color, style } = props;

  const getStyle = useCallback(() => {
    if (direction === 'up') {
      return {
        borderTopWidth: 0,
        borderRightWidth: width / 2.0,
        borderBottomWidth: height,
        borderLeftWidth: width / 2.0,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: color,
        borderLeftColor: 'transparent',
      };
    } if (direction === 'right') {
      return {
        borderTopWidth: height / 2.0,
        borderRightWidth: 0,
        borderBottomWidth: height / 2.0,
        borderLeftWidth: width,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: color,
      };
    } if (direction === 'down') {
      return {
        borderTopWidth: height,
        borderRightWidth: width / 2.0,
        borderBottomWidth: 0,
        borderLeftWidth: width / 2.0,
        borderTopColor: color,
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
      };
    } if (direction === 'left') {
      return {
        borderTopWidth: height / 2.0,
        borderRightWidth: width,
        borderBottomWidth: height / 2.0,
        borderLeftWidth: 0,
        borderTopColor: 'transparent',
        borderRightColor: color,
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
      };
    } if (direction === 'up-left') {
      return {
        borderTopWidth: height,
        borderRightWidth: width,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderTopColor: color,
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
      };
    } if (direction === 'up-right') {
      return {
        borderTopWidth: 0,
        borderRightWidth: width,
        borderBottomWidth: height,
        borderLeftWidth: 0,
        borderTopColor: 'transparent',
        borderRightColor: color,
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
      };
    } if (direction === 'down-left') {
      return {
        borderTopWidth: height,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderLeftWidth: width,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: color,
      };
    } if (direction === 'down-right') {
      return {
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: height,
        borderLeftWidth: width,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: color,
        borderLeftColor: 'transparent',
      };
    }

    return {};
  }, [direction, width, height, color, style]);

  const borderStyle = getStyle();

  return (
    <View style={[styles.container, borderStyle, style]} />
  );
}

const styles = StyleSheet.create({
  container: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
  },
});
