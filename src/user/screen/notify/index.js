import React, {Component, useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBare,
  StatusBar,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';

import flatListData from './data';
import HeaderNotify from './component/HeaderNotify';
import ModalInfor from './component/ModalInfor';
import {BarStatus} from '../../../component';
import {Card} from 'native-base';
import {Combine} from '../../../component';
import Icon from 'react-native-vector-icons/Feather';
import {Colors, imgs} from '../../../../utlis';

const Notify = (props) => {
  // useEffect(() => {
  //   getListNotifys(token);
  // }, []);
  const {navigation, getListNotifys, token, listNotifys} = props;
  const [toTop, setToTop] = useState(false);
  const [position, setPosition] = useState(0);
  const refList = useRef('');
  const [listData, setListData] = useState(
    listNotifys ? listNotifys.notify : null,
  );

  const onToTop = (e) => {
    const pos = e.nativeEvent.contentOffset.y;
    setPosition(pos);
    position - pos > 0
      ? setToTop(true)
      : position === pos
      ? null
      : setToTop(false);
  };

  const onScrolltoTop = () => {
    refList.current.scrollToOffset({animated: true, offset: 0});
  };

  const renderItem = ({item}) => {
    const onShow = () => {
      switch (item.type) {
        case 'confirm_late_early':
          navigation.navigate('Xác nhận', {data: item});
          console.log('checkkkkkk');
          break;
        case 'confirm_take_leave':
          navigation.navigate('Xác nhận', {data: item});
          console.log('checkkkkkk');
          break;
        case 'confirm_overtime':
          navigation.navigate('Xác nhận', {data: item});
          console.log('checkkkkkk');
          break;
        case 'overtime':
          navigation.navigate('Xác nhận đơn', {data: item});
          break;
        case 'take_leave':
          navigation.navigate('Xác nhận đơn', {data: item});
          break;
        case 'late_early':
          navigation.navigate('Xác nhận đơn', {data: item});
          break;
        case 'verify':
          navigation.navigate('Xác nhận Kpi', {data: item});
          break;
      }
    };
    return (
      <TouchableOpacity onPress={onShow}>
        <Card style={styles.card}>
          <Image
            style={styles.img}
            source={require('../../../../naruto.jpeg')}
          />
          <View style={styles.viewText}>
            <Text numberOfLines={3}>{item ? item.contents.en : null}</Text>
            <Text style={styles.time}>
              {moment(item.createdAt).format('HH:mm - DD/MM/YYYY')}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <BarStatus />
      <HeaderNotify />

      <FlatList
        ref={refList}
        horizontal={false}
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        onScroll={onToTop}
      />
      {toTop ? (
        <View style={styles.toTop}>
          <TouchableOpacity style={styles.btToTop} onPress={onScrolltoTop}>
            <Icon
              name={'arrow-up'}
              color={Colors.white}
              size={24}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default Notify;

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
  img: {
    width: 48,
    height: 48,
    borderRadius: 1000,
  },
  viewText: {
    flex: 4,
    paddingLeft: 8,
    justifyContent: 'center',
  },
  time: {
    fontSize: 10,
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'left',
    color: 'rgba(4, 4, 15, 0.45)',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    width: 40,
    height: 40,
  },
  toTop: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
  },
  btToTop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {},
});
