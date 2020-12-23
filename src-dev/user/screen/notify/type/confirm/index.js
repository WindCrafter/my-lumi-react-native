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

const Confirm = (props) => {
  const {navigation, route} = props;
  const data = route.params;

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
          <Text style={styles.textDetail}>Tình trạng :</Text>
          <View style={styles.reason}>
            <Text style={styles.status} numberOfLines={3}>
              {data.data.contents.en}
            </Text>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default Confirm;

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
    justifyContent: 'center',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  status: {},
  reason: {
    width: '60%',
    textAlign: 'right',
    
  },
});
