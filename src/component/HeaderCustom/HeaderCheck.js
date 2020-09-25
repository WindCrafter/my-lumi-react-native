import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import moment from 'moment';
import langs from '../../../common/language';
import {imgs, Colors} from '../../../utlis';
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

HeaderCheck.defaultProps = {
  type: 'Check In',
};

function HeaderCheck(props?: Props) {
  const {onPress, title, type, pressHistory} = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.body} onPress={onPress}>
        <Text style={styles.txtName}>{type}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.notify} onPress={pressHistory}>
        <Image source={imgs.information} style={styles.img} />
      </TouchableOpacity>
    </View>
  );
}

export default HeaderCheck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:'100%',alignSelf:"center"
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
    fontSize:24,
    fontWeight: '700',
    color: '#ffffff',
  },
  time: {
    fontSize: 16,
    fontWeight: '300',
    color: '#ffffff',
    marginLeft: 2,
  },
  notify: {
    marginRight: 8,
    height: 28,
    width: 28,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  body: {
    alignContent: 'center',
    alignSelf: 'center',
  },
  image: {
    marginLeft: 8,
  },
  img: {
    width: 28,
    height: 28,
  },
});
