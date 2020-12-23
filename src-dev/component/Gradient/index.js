/**
 * Created by nghinv on Tue Jun 30 2020
 * Copyright (c) 2020 nghinv@lumi.biz
 */

import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface GradientOverlayProps {
  containerStyle?: ViewStyle;
}

export default function GradientOverlay(props: GradientOverlayProps) {
  const {containerStyle} = props;
  return (
    <LinearGradient
      style={[styles.container, containerStyle]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#18319F', '#00B8F2', '#6DEC40']}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
