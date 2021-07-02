/**
 * Created by nghinv on Thu May 31 2018
 * Copyright (c) 2018 nghinv
 */

'use strick';

import React, { PureComponent } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { Services } from './services';

let RootComponent;
export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      typeServer: '',
    };
  }

  async componentDidMount() {
    await Services.getServerType();

    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;

    if (loading) return null;

    console.log('URL_SEVER_API--->:serverType', Services.server_type, Services.server.base_url);

    RootComponent = Services.server_type === 'develop' ? require('./src-dev/setup').default : require('./src-pro/setup').default;

    return (
      <View style={styles.container}>
        <RootComponent />
        {Services.server_type === 'develop' && (
          <Animated.View pointerEvents="none" style={styles.devType}>
            <Text style={styles.title}>{Services.server_type.toUpperCase()}</Text>
          </Animated.View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  devType: {
    position: 'absolute',
    top: 10,
    right: -50,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: 160,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '45deg' }],
  },
  title: {
    color: 'white',
    fontWeight: '600',
    fontFamily: 'Quicksand-Bold',
  },
});
