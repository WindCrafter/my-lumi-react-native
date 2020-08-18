import React, { Component } from 'react';
import { Text, View } from 'react-native';

export class Test extends Component {
  render() {
    return (
      <View style={{ backgroundColor: 'red', flex: 1 }}>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

export default Test;
