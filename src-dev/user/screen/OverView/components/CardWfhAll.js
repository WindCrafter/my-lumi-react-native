import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Card } from 'native-base';
// import langs from '../../../../../common/language';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { imgs, Colors } from '../../../../../utlis';

const { width } = Dimensions.get('window');

const CardWfhAll = (props) => {
  const { item } = props;
  const renderStatus = () => {
    if (item.status === 1) {
      return (
        <View style={styles.img}>
          <Image
            source={imgs.roundedInfor}
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
            source={imgs.tick}
            style={[styles.imageStamp, styles.marginRight]}
          />
          <Text style={[styles.txtStatus, styles.approve]}>Đã duyệt</Text>
        </View>
      );
    }
    if (item.status === 3) {
      return (
        <View style={styles.img}>
          <Image
            source={imgs.cancel}
            style={[styles.imageStamp, styles.imageCancel]}
          />
          <Text style={[styles.txtStatus, styles.colorCancel]}>Bị từ chối</Text>
        </View>
      );
    }
  };

  return (
    <Card style={styles.card}>
      <View style={[styles.row, { justifyContent: 'space-between' }]}>
        <Text style={{ fontSize: 17, fontFamily: 'Quicksand-Bold' }}>{item.user_name}</Text>
      </View>
      <View style={[styles.row, { marginTop: 8 }]} />
      <View style={[styles.row]}>
        <View style={[styles.img, { width: (width - 32) / 2 }]}>
          <Image
            source={imgs.DOB}
            style={[styles.imageStamp, styles.marginRight]}
          />
          <Text style={styles.txtStatus}>{moment.unix(item.start_date).format('DD/MM/YYYY')}</Text>
        </View>
        <View style={[styles.img, { width: (width - 32) / 2 }]}>
          <Image
            source={imgs.DOB}
            style={[styles.imageStamp, styles.marginRight]}
          />
          <Text style={styles.txtStatus}>{moment.unix(item.end_date).format('DD/MM/YYYY')}</Text>
        </View>
      </View>
      <View style={[styles.row, { paddingRight: 32 }]}>
        <View style={styles.img}>
          <Image
            source={imgs.note}
            style={[styles.imageStamp, styles.marginRight]}
          />
          <Text style={styles.txtStatus}>{item.reason}</Text>
        </View>
      </View>
      <View style={[styles.row, { paddingRight: 32 }]}>
        <View style={styles.img}>
          <Image
            source={imgs.healthCondition}
            style={[styles.imageHealth, styles.marginRight]}
          />
          <Text style={styles.txtStatus}>{item.health}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  img: {
    padding: 5,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center'

  },
  imageStamp: {
    width: 16,
    height: 16,
  },
  imageHealth: {
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
    marginTop: 16,
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
  approve: {
    color: Colors.background,
  },
});

export default CardWfhAll;
