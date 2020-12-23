/**
 * Created by nghinv on Thu May 31 2018
 * Copyright (c) 2018 nghinv
 */

'use strick';

import React, {PureComponent} from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Setup from './src-pro/setup';
import SetupDev from './src-dev/setup';

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      typeServer: '',
    };
  }

  async componentDidMount() {
    const mode = await AsyncStorage.getItem('APP_MODE');
    this.setState({typeServer: mode});
    // window.isAllowChangeSever = true;
    // if (!!mode) {
    //   await AsyncStorage.setItem('APP_MODE', 'product');
    // }
    window.typeServer = mode || 'product';

    // if (window.typeServer === 'product') {
    //   Setup = require('./src/setup').default;
    // } else {
    //   Setup = require('./src-dev/setup').default;
    // }

    // this.setState(
    //   {
    //     loading: false,
    //   },
    //   () => {
    //     try {
    //       SharedGroupPreferences.setItem(
    //         commonKeyGroupShare.typeServer,
    //         window.typeServer,
    //         configWidget.appGroupIdentifier,
    //       )
    //         .then((res) => {})
    //         .catch((e) => {});
    //     } catch (errorCode) {
    //       console.log(errorCode);
    //     }
    //   },
    // );
  }

  render() {
    const {typeServer} = this.state;

    // if (loading) {
    //   return <View />;
    // }
    console.log('typeServer', typeServer);
    return (
      <View style={styles.container}>
        {typeServer === 'product' ? <Setup /> : <SetupDev />}
        {typeServer !== 'product' && (
          <Animated.View pointerEvents="none" style={styles.devType}>
            <Text style={styles.title}>DEVELOP</Text>
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
    backgroundColor: 'black',
    width: 160,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotate: '45deg'}],
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
  },
});
