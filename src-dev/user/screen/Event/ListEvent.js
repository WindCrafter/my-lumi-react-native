import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  Linking,
  ScrollView,
  Switch,
  Alert,
  Platform,
} from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { Colors, imgs } from '../../../../utlis';
import { BarStatus } from '../../../component';
import { _global } from '../../../../utlis/global/global';
import langs from '../../../../common/language';
import HeaderEvent from './component/HeaderEvent';
import { goBack } from '../../../navigator/CustomNavigation';

const ListEvent = (props) => {
  const { route } = props;
  const { data } = route.params;

  return (
    <>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 36 : StatusBar.currentHeight}
      />
      <View style={styles.container}>
        <HeaderEvent shadow goBack={goBack} />
      </View>
    </>
  );
};

export default ListEvent;
const wd = widthPercentageToDP(100) - 36;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgDetai: {
    alignSelf: 'center',
    marginTop: 16,
    width: wd,
    height: wd * 0.6,
    borderRadius: 16,
  },
});
