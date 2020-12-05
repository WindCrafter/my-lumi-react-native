import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Card} from 'native-base';
import langs from '../../../../../common/language';
import {imgs, Colors} from '../../../../../utlis';

const {width} = Dimensions.get('window');

const ItemApproveOT = (props) => {
  const {item, onConfirm, onDeny} = props;
  const renderStatus = () => {
    if (item.status === 1) {
      return (
        <View
          style={[styles.row, {marginTop: 8, justifyContent: 'space-around'}]}>
          <TouchableOpacity onPress={() => onDeny(item)}>
            <View style={styles.refuse}>
              <Text style={[styles.statusText, {color: Colors.white}]}>
                {langs.deny}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onConfirm(item)}>
            <View style={styles.accept}>
              <Text style={[styles.statusText, {color: Colors.white}]}>
                {langs.confirm}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    if (item.status === 2) {
      return (
        <View style={[styles.row, {marginTop: 8, justifyContent: 'center'}]}>
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
        <View style={[styles.row, {marginTop: 8, justifyContent: 'center'}]}>
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
      <View style={[styles.row, {marginHorizontal: 8}]}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <View style={[styles.row, {marginTop: 16}]}>
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
      <View
        style={[
          styles.row,
          {
            paddingVertical: 8,
            borderBottomColor: Colors.gray,
            borderBottomWidth: 0.25,
          },
        ]}>
        <View style={styles.img}>
          <Image
            source={imgs.note}
            style={[styles.imageStamp, styles.marginRight]}
          />
          <Text style={styles.txtStatus}>{item.content}</Text>
        </View>
      </View>
      {renderStatus()}
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
    paddingHorizontal: 16,
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
    paddingTop: 16,
    paddingBottom: 8,
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
    fontSize: 18,
    fontWeight: '800',
  },
  marginRight: {
    marginRight: 8,
  },
  approve: {
    color: Colors.background,
    fontWeight: '800',
    fontSize: 18,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  refuse: {
    width: 73,
    height: 27,
    backgroundColor: Colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  accept: {
    width: 73,
    height: 27,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});

export default ItemApproveOT;
