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
import HeaderNotifi from './component/HeaderNotifi';
import ModalInfor from './component/ModalInfor';
import {BarStatus} from '../../../component';
import {Card} from 'native-base';
import {Combine} from '../../../component';

const Notify = () => {
  const [showModal, setShowModal] = useState(false);
  const onShowModal = () => {
    setShowModal(true);
  };
  const hideModal = () => {
    setShowModal(false);
  };
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={onShowModal}>

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
      <HeaderNotifi />

      <FlatList
        horizontal={false}
        data={flatListData}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
      <ModalInfor showModal={showModal} hideModal={hideModal} />
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
});
