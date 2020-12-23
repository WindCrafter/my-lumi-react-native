/* eslint-disable no-unused-vars */
import React, {Component, useState, useEffect} from 'react';
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
import moment from 'moment';
import {Colors} from '../../../../../../utlis';

const Verify = (props) => {
  const {
    navigation,
    route,
    setStatusBreak,
    setStatusLateEarly,
    setStatusOT,
    token,
  } = props;
  const data = route.params;
  const onSetStatusBreak = (e) => {
    const datapost = {
      token: token,
      takeLeaveId: data.data.data.takeLeaveId,
      status: e,
    };
    setStatusBreak(datapost);
  };
  const onSetStatusOT = (e) => {
    const datapost = {
      token: token,
      overtimeId: data.data.data.overtimeId,
      status: e,
    };
    setStatusOT(datapost);
  };
  const onSetStatusLateEarly = (e) => {
    const datapost = {
      token: token,
      lateEarlyId: data.data.data.lateEarlyId,
      status: e,
    };
    setStatusLateEarly(datapost);
  };
  const onAccept = () => {
    switch (data.data.type) {
      case 'late_early':
        onSetStatusLateEarly(1);
        break;
      case 'overtime':
        onSetStatusOT(1);
        break;
      case 'take_leave':
        onSetStatusBreak(1);
        break;
    }
  };
  const onRefuse = () => {
    switch (data.data.type) {
      case 'late_early':
        onSetStatusLateEarly(2);
        break;
      case 'overtime':
        onSetStatusOT(2);
        break;
      case 'take_leave':
        onSetStatusBreak(2);
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.viewMid}>
          <Text style={styles.textDetail}>Loại yêu cầu</Text>
          <Text style={styles.textDetail}>{data.data.headings.en}</Text>
        </View>
        <View style={styles.viewMid}>
          <Text style={styles.textDetail}>Ngày làm việc :</Text>
          <Text style={styles.textDetail}>
            {moment(data.data.createdAt).format('DD/MM/YYYY')}
          </Text>
        </View>
        <View style={styles.viewMid}>
          <Text style={styles.textDetail}>Mô tả :</Text>
          <View style={styles.reason}>
            <Text style={styles.status} numberOfLines={3}>
              {data.data.contents.en}
            </Text>
          </View>
        </View>
      </Card>
      <View style={styles.touchable}>
        <TouchableOpacity onPress={onRefuse}>
          <View style={styles.refuse}>
            <Text style={styles.statusText}>Từ chối</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onAccept}>
          <View style={styles.accept}>
            <Text style={styles.statusText}>Xác nhận</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Verify;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
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
  },

  viewMid: {
    // justifyContent: 'center',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  status: {},
  reason: {
    width: '60%',
    textAlign: 'right',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
  },
  refuse: {
    width: 96,
    height: 48,
    backgroundColor: Colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  accept: {
    width: 96,
    height: 48,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  touchable: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    marginTop:16
  },
  statusText: {color: 'white'},
});
