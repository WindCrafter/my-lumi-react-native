import React from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';
import {imgs} from './images';
import {Colors} from './color';

export {imgs, Colors};

/** *
 * Function set font default
 * @param font like: 'Quicksand'
 * @requires font link to ios and android
 */
export const setFont = (font) => {
  const styles = StyleSheet.create({
    defaultFontFamily: {
      fontFamily: font,
    },
  });

  const oldRender = Text.render;
  // eslint-disable-next-line func-names
  Text.render = function (...args) {
    const origin = oldRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: [styles.defaultFontFamily, origin.props.style],
    });
  };
  // eslint-disable-next-line func-names
//   TextInput.render = function (...args) {
//     const origin = oldRender.call(this, ...args);
//     return React.cloneElement(origin, {
//       style: [styles.defaultFontFamily, origin.props.style],
//     });
//   };
};
