import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { imgs, Colors } from '../../../../../utlis';
import langs from '../../../../../common/language';

const currrentDate = moment().format('DD/MM/YYYY');
const day = moment().format('dddd');
const currentDayInWeek =
  day === 'Monday'
    ? 'Thứ 2'
    : day === 'Tuesday'
      ? 'Thứ 3'
      : day === 'Wednesday'
        ? 'Thứ 4'
        : day === 'ThursDay'
          ? 'Thứ 5'
          : day === 'Friday'
            ? 'Thứ 6'
            : day === 'Saturday'
              ? 'Thứ 7'
              : 'Chủ Nhật';

const HeaderAccount = (props) => {
  const { pressNotify, onPress } = props;
  return (
    <View style={styles.container}>
      <View style={styles.detail}>
        <TouchableOpacity style={styles.moreInfo} onPress={onPress}>
          <View style={styles.avatar}>
            <Image
              source={require('../../../../../naruto.jpeg')}
              style={styles.avt}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.txtName}>Đỗ Tuấn Phong</Text>
            <Text style={styles.team}>Team: App - Thực Tập</Text>
            <Text style={styles.email}>Email: phongdt@lumi.biz</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notify} onPress={pressNotify}>
          <Image source={imgs.notification} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    borderBottomRightRadius: 48,
    borderBottomLeftRadius: 48,
  },
  detail: {
    flexDirection: 'row',
    flex: 5,
  },
  checkIn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 16,
  },
  avatar: {
    flex: 1,
    justifyContent: 'center',
  },
  info: {
    flexDirection: 'column',
    flex: 2.25,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  avt: {
    height: 64,
    width: 64,
    borderRadius: 32,
    marginLeft: 24,
  },
  txtName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  time: {
    fontSize: 16,
    fontWeight: '300',
    color: '#ffffff',
  },
  notify: {
    marginTop: 24,
    marginRight: 32,
    height: 28,
    width: 28,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,25,0.22)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  email: {
    fontSize: 16,
    fontWeight: '300',
    color: '#ffffff',
  },
  team: {
    fontSize: 16,
    fontWeight: '300',
    color: '#ffffff',
    marginVertical: 4,
  },
  moreInfo: {
    flexDirection: 'row',
    flex: 3.25,
  },
});
