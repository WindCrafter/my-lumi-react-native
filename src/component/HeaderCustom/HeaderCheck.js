import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';
import langs from '../../../common/language';
import { imgs, Colors } from '../../../utlis';

const currrentDate = moment().format('DD/MM/YYYY');
console.log('=>>>>>', currrentDate);
const day = moment().format('dddd');
const currentDayInWeek =
  day === 'Monday'
    ? 'Thứ 2'
    : day === 'Tuesday'
      ? 'Thứ 3'
      : day === 'Wednesday'
        ? 'Thứ 4'
        : day === 'Thursday'
          ? 'Thứ 5'
          : day === 'Friday'
            ? 'Thứ 6'
            : day === 'Saturday'
              ? 'Thứ 7'
              : 'Chủ Nhật';

HeaderCheck.defaultProps = {};

function HeaderCheck(props?: Props) {
  const { pressNotify, title } = props;
  return (
    <View style={styles.container}>
      <View style={styles.detail}>
        <View style={styles.info}>
          <Text style={styles.txtName}>{title}</Text>
          <Text style={styles.time}>
            {currentDayInWeek}, {currrentDate}
          </Text>
        </View>
        <TouchableOpacity style={styles.notify} onPress={pressNotify}>
          <Image source={imgs.notification} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HeaderCheck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    borderBottomRightRadius: 48,
    borderBottomLeftRadius: 48,
    paddingHorizontal: 24,
    paddingVertical: 10,
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
    fontSize: 36,
    fontWeight: '700',
    color: '#ffffff',
  },
  time: {
    fontSize: 16,
    fontWeight: '300',
    color: '#ffffff',
  },
  notify: {
    marginTop: 36,
    marginRight: 8,
    height: 28,
    width: 28,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,25,0.22)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
