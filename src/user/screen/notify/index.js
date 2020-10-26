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
import flatListData from './data';
import HeaderNotify from './component/HeaderNotify';
import ModalInfor from './component/ModalInfor';
import {BarStatus} from '../../../component';
import {Card} from 'native-base';
import {Combine} from '../../../component';
import Icon from 'react-native-vector-icons/Feather';
import {Colors} from '../../../../utlis';

const Notify = (props) => {
  const {navigation} = props;
  const [showModal, setShowModal] = useState(false);
  const [toTop, setToTop] = useState(false);
  const [position, setPosition] = useState(0);
  const refList = useRef('');

  const hideModal = () => {
    setShowModal(false);
  };

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

  const renderItem = ({item, index}) => {
    const onShowModal = () => {
      setShowModal(true);
      console.log('=======', flatListData.length);
    };
    const onShow = () => {
      switch (item.type) {
        case 'confirm':
          onShowModal();
          break;
        case 'warning':
          onShowModal();
          break;
        case 'verify':
          onShowModal;
          break;
      }
    };
    return (
      <TouchableOpacity onPress={() => navigation.navigate('NotifyDetail')}>
        <Card style={styles.card}>
          <Image style={styles.img} source={item.image} resizeMode="cover" />
          <View style={styles.viewText}>
            <Text numberOfLines={3}>{item.detail}</Text>
            <Text style={styles.time}>
              {item.time} - {item.date}
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
        data={flatListData}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        onScroll={onToTop}
      />
      <ModalInfor showModal={showModal} hideModal={hideModal} />
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
    borderRadius: 24,
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
