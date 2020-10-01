import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../utlis';
import { TabbarIcon } from '../component';
import ButtonCheckIn from '../component/Tabbar/ButtonCheckIn';
import ButtonTabbar from '../component/Tabbar/ButtonTabbar';

function TabbarCustom({ state, descriptors, navigation, token }) {
  useEffect(() => {
    console.log('=>>>>', token);
  }, [token]);
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ButtonTabbar
        state={state}
        descriptors={descriptors}
        navigation={navigation}
        index={0}
        route={state.routes[0]}
        tab={0}
      />
      <ButtonTabbar
        state={state}
        descriptors={descriptors}
        navigation={navigation}
        index={1}
        route={state.routes[1]}
        tab={1}
      />
      <ButtonCheckIn />
      <ButtonTabbar
        state={state}
        descriptors={descriptors}
        navigation={navigation}
        index={2}
        route={state.routes[2]}
        tab={2}
      />
      <ButtonTabbar
        state={state}
        descriptors={descriptors}
        navigation={navigation}
        index={3}
        route={state.routes[3]}
        tab={3}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 0.5,
    borderTopColor: 'gray',
    backgroundColor: Colors.white,
  },
});

const mapStateToProps = (state) => ({
  token: state.authen.token,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TabbarCustom);
