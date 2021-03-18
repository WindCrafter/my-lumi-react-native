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
import { BarStatus, HeaderAccount } from '../../../component';
import { _global } from '../../../../utlis/global/global';
import langs from '../../../../common/language';

const DetailEvent = (props) => {
  const { route } = props;
  const { item } = route.params;
  return (
    <>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 36 : StatusBar.currentHeight}
      />
      <View style={styles.container}>
        <HeaderAccount shadow title={item.detail} sub={item.time} />
        <Image source={item.source} style={styles.imgDetai} />
      </View>
    </>
  );
};

export default DetailEvent;
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
