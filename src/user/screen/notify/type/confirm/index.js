import React, {Component, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBare,
  StatusBar,
  Modal,
  TouchableOpacity,
} from 'react-native';
import flatListData from './data';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import HeaderNotify from '../../component/HeaderNotify';
import ModalInfor from './component/ModalInfor';
import {BarStatus} from '../../../component';
import {Card} from 'native-base';
import {Combine} from '../../../component';

const Confirm = () => {
  return (
    <View style={styles.container}>
      <BarStatus />
      <HeaderNotify />
      <Card style={styles.card}>
        <View style={styles.viewMid}>
          <Text style={styles.textDetail}>Loại yêu cầu</Text>
          <Text style={styles.textDetail}>Xin nghỉ</Text>
        </View>
        <View style={styles.viewMid}>
          <Text style={styles.textDetail}>Ngày làm việc :</Text>
          <Text style={styles.textDetail}>20/08/2020</Text>
        </View>
        <View style={styles.viewMid}>
          <Text style={styles.textDetail}>Tình trạng :</Text>
          <Text style={styles.textDetail}>Đã duyệt</Text>
        </View>
        <View style={styles.viewMid}>
          <Text style={styles.textDetail}>Người duyệt :</Text>
          <Text style={styles.textDetail}>Pham Thanh Mai</Text>
        </View>
      </Card>
    </View>
  );
};

export default Confirm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderRadius: 16,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    shadowColor: 'black',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
  },

  viewMid: {
    flex: 4,
    paddingLeft: 8,
    justifyContent: 'center',
    height: 40,
  },
});
