import React, { useState, useEffect } from 'react';
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import moment from 'moment';
import { Colors, imgs } from '../../../../utlis';
import { BarStatus } from '../../../component';
import langs from '../../../../common/language';
import CardLate from './component/CardLate';
import HeaderCustom from './component/HeaderCustom';
import { _global } from '../../../../utlis/global/global';
import { getText } from '../../../../utlis/config/utlis';

const ApproveCheck = (props) => {
  return (
    <>
      <HeaderCustom
        header={false}
        search
      />
    </>
  );
};

export default ApproveCheck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    // marginBottom: heightPercentageToDP(12),
    // flexGrow: 1,
  },
  noData: { fontSize: 16, alignSelf: 'center', marginTop: 24 },
});
