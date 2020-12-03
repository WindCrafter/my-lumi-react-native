import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {Card} from 'native-base';
// import langs from '../../../../../common/language';
import {imgs, Colors} from '../../../../../utlis';

const item = {
  status: 3,
  date: '21/09/2020',
  time: '0.5',
  content: 'Sửa lỗi phát sinh trên UI',
};

const {width} = Dimensions.get('window');

const ItemOT = (props) => {
  const renderStatus = () => {
    if (item.status === 1) {
      return (
        <View style={styles.img}>
          <Image
            source={imgs.startTime}
            style={[styles.imageStamp, styles.imageExtend]}
          />
          <Text style={[styles.txtStatus, styles.waiting]}>Đang chờ</Text>
        </View>
      );
    }
    if (item.status === 2) {
      return (
        <View style={styles.img}>
          <Image
            source={imgs.startTime}
            style={[styles.imageStamp, styles.marginRight]}
          />
          <Text style={styles.txtStatus}>Đã duyệt</Text>
        </View>
      );
    }
    if (item.status === 3) {
      return (
        <View style={styles.img}>
          <Image
            source={imgs.startTime}
            style={[styles.imageStamp, styles.imageCancel]}
          />
          <Text style={[styles.txtStatus, styles.colorCancel]}>Bị từ chối</Text>
        </View>
      );
    }
  };

  return (
    <Card style={styles.card}>
      <View style={[styles.row]}>{renderStatus()}</View>
      <View style={[styles.row]}>
        <View style={[styles.img, {width: (width - 32) / 2}]}>
          <Image
            source={imgs.startDate}
            style={[styles.imageStamp, styles.marginRight]}
          />
          <Text style={styles.txtStatus}>{item.date}</Text>
        </View>
        <View style={[styles.img, {width: (width - 32) / 2}]}>
          <Image
            source={imgs.startTime}
            style={[styles.imageStamp, styles.marginRight]}
          />
          <Text style={styles.txtStatus}>{`${item.time} giờ`}</Text>
        </View>
      </View>
      <View style={[styles.row]}>
        <View style={styles.img}>
          <Image
            source={imgs.startDate}
            style={[styles.imageStamp, styles.marginRight]}
          />
          <Text style={styles.txtStatus}>{item.content}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  img: {
    padding: 8,
    borderRadius: 16,
    alignSelf: 'center',
    marginRight: 8,
    flexDirection: 'row',
  },
  imageStamp: {
    width: 20,
    height: 20,
  },
  txtStatus: {
    alignSelf: 'center',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
  },
  txtTime: {
    fontSize: 16,
    color: Colors.black,
    alignSelf: 'center',
    marginHorizontal: 12,
  },
  card: {
    borderRadius: 16,
    width: width - 32,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  time: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageExtend: {
    marginRight: 8,
    tintColor: '#455997',
  },
  waiting: {
    color: '#455997',
  },
  imageCancel: {
    marginRight: 8,
    tintColor: '#ff3b30',
  },
  colorCancel: {
    color: '#ff3b30',
  },
  marginRight: {
    marginRight: 8,
  },
});

export default ItemOT;
