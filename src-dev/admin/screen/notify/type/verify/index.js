/* eslint-disable no-unused-vars */
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
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import HeaderNotify from '../../component/HeaderNotify';
import {BarStatus} from '../../../../../component';
import {Card} from 'native-base';
import {imgs} from '../../../../../../utlis';
import ModalInfor from '../../component/ModalInfor';

const Verify = () => {
  const [showModal, setShowModal] = useState(false);

  const onShowModal = () => {
    setShowModal(true);
  };
  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <BarStatus />
      <Card style={styles.card}>
        <View style={styles.viewMid}>
          <View style={styles.front}>
            <Image source={imgs.KPI} style={styles.img} />
            <Text style={styles.textDetail}>Xếp loại KPI :</Text>
          </View>

          <Text style={styles.textDetail}>Xin nghỉ</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.viewMid}>
          <View style={styles.front}>
            <Image source={imgs.fine} style={styles.img} />
            <Text style={styles.textDetail}>Tiền trừ đi muộn:</Text>
          </View>

          <Text style={styles.textDetail}>-2 ngày công</Text>
        </View>
        <View style={styles.line} />

        <TouchableOpacity style={styles.viewMid} onPress={onShowModal}>
          <View style={styles.front}>
            <Image source={imgs.lateIcon} style={styles.img} />
            <Text style={styles.textDetail}>Số ngày nghỉ:</Text>
          </View>

          <Text style={styles.textDetail}>4</Text>
        </TouchableOpacity>
        <View style={styles.line} />

        <View style={styles.viewMid}>
          <View style={styles.front}>
            <Image source={imgs.buttoncheckin} style={styles.img} />
            <Text style={styles.textDetail}>Công thực tế :</Text>
          </View>

          <Text style={styles.textDetail}>20</Text>
        </View>
        <View style={styles.line} />

        <View style={styles.viewMid}>
          <View style={styles.front}>
            <Image source={imgs.stampCheck} style={styles.img} />
            <Text style={styles.textDetail}>Công tính lương :</Text>
          </View>

          <Text style={styles.textDetail}>24</Text>
        </View>
        <View style={styles.line} />
      </Card>
      <ModalInfor showModal={showModal} hideModal={hideModal} />
    </View>
  );
};

export default Verify;

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
    flexDirection: 'column',
  },

  viewMid: {
    paddingVertical: 8,
    justifyContent: 'space-between',
    height: 40,
    flexDirection: 'row',
  },
  front: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 24,
    height: 24,
    tintColor: 'black',
  },
  textDetail: {
    marginLeft: 12,
  },
  line: {
    width: '80%',
    height: 1,
    backgroundColor: 'black',
    alignSelf: 'center',
    marginVertical: 8,
  },
});
