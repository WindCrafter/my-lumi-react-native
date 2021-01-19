import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { imgs, Colors } from '../../../utlis';

interface Props extends Indicator {
  width?: String | Number;
  height?: String | Number;

  title?: String;
  description?: String;
}
Indicator.defaultProps = {
  width: 300,
  height: 120,
};

export default function Indicator() {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color={Colors.ink400} />
    </View>
  );
}
const styles = StyleSheet.create({
  loader: { marginTop: 8 }
});
