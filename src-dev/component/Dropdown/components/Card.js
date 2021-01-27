/**
 * Created by nghinv on Mon Jan 18 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { View, ViewStyle, StyleSheet, ViewProps } from 'react-native';
import Triangle from './Triangle';

export type PointStyleType = {
  direction: 'up' | 'down';
  alignItems: 'flex-end' | 'flex-start' | 'center' | undefined;
}

export interface CardProps {
  style?: ViewStyle;
  backgroundColor?: String;
  renderBackground?: React.FC;
  triangleColor?: String;
  width?: Number;
  maxHeight?: Number;
  borderRadius?: Number;
  pointStyle?: PointStyleType;
  cardProps?: ViewProps;
}

Card.defaultProps = {
  backgroundColor: 'white',
  triangleColor: 'white',
  width: 160,
  maxHeight: 250,
  borderRadius: 8,
  pointStyle: {
    direction: 'down',
    alignItems: 'flex-start',
  },
};

export default function Card(props?: CardProps) {
  const {
    children,
    style,
    pointStyle,
    backgroundColor,
    renderBackground,
    triangleColor,
    width,
    maxHeight,
    borderRadius,
    cardProps,
  } = props;
  return (
    <View pointerEvents='box-none' {...cardProps} style={[styles.container, style]}>
      {
        pointStyle.direction === 'down' && (
          <View pointerEvents='none' style={{ paddingHorizontal: 8, alignItems: pointStyle.alignItems }}>
            <Triangle
              width={16}
              height={5}
              color={triangleColor}
              direction='up'
            />
          </View>
        )
      }
      <View style={[styles.content, { backgroundColor, width, maxHeight, borderRadius }]}>
        {
          renderBackground && (
            <View style={StyleSheet.absoluteFillObject}>
              {renderBackground()}
            </View>
          )
        }
        {children}
      </View>
      {
        pointStyle.direction === 'up' && (
          <View pointerEvents='none' style={{ paddingHorizontal: 8, alignItems: pointStyle.alignItems }}>
            <Triangle
              width={16}
              height={5}
              color='white'
              direction='down'
            />
          </View>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'nowrap',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 2,
  },
  content: {
    overflow: 'hidden',
  },
});
