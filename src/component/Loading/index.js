import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Animated,
  Easing,
  BackHandler,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { Value } = Animated;

class Loading extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    this._anim = new Value(0);
  }

  show = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        BackHandler.addEventListener(
          'hardwareBackPress',
          this.handleBackButton,
        );
        Animated.spring(this._anim, {
          toValue: 1,
          useNativeDriver: true,
        }).start(() => { });
      },
    );
  };

  hide = () => {
    Animated.timing(this._anim, {
      toValue: 0,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        this.handleBackButton,
      );
      this.setState({
        isLoading: false,
      });
    });
  };

  handleBackButton = () => {
    return true;
  };

  render() {
    const { backgroundColor, colorIndicator, loadingRef } = this.props;
    const { isLoading } = this.state || {};

    if (loadingRef) {
      if (!isLoading) {
        return null;
      }

      return (
        <Animated.View
          style={[
            styles.container,
            {
              backgroundColor,
              opacity: this._anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              }),
            },
          ]}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            locations={[0, 1]}
            colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.6)']}
            style={styles.viewContent}>
            <ActivityIndicator color={colorIndicator} size="large" />
          </LinearGradient>
        </Animated.View>
      );
    }
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor,
          },
        ]}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          locations={[0, 1]}
          colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.6)']}
          style={styles.viewContent}>
          <ActivityIndicator color={colorIndicator} size="large" />
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  viewContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

Loading.defaultProps = {
  backgroundColor: 'transparent',
  colorIndicator: 'white',
  springConfig: { tension: 30, friction: 7 },
  loadingRef: false,
};

Loading.propTypes = {
  backgroundColor: PropTypes.string,
  colorIndicator: PropTypes.string,
  springConfig: PropTypes.shape({
    tension: PropTypes.number,
    friction: PropTypes.number,
  }),
  loadingRef: PropTypes.bool,
};

export default Loading;
