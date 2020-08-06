import React from 'react';
<<<<<<< HEAD
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
=======
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { imgs } from '../../../../utlis';
>>>>>>> 28c4ef8ac358f9825e0ae95e973ec0f8d894f770

const Admin = (props) => {
  const {addStaff, extendContract, resignStaff, genaralInfo, addOT} = props;
  return (
    <>
      <View style={styles.manager}>
        <Text style={styles.txtManager}>Quản lí nhân sự</Text>
      </View>
      <View style={styles.top}>
        <TouchableOpacity onPress={addStaff} style={styles.row}>
          <View style={styles.icon}>
            <Image source={imgs.addstaff} style={styles.img} />
          </View>
          <Text numberOfLines={2} style={styles.add}>
            Thêm nhân viên mới
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={extendContract} style={styles.row}>
          <View style={styles.icon}>
            <Image source={imgs.contract} style={styles.img} />
          </View>
          <Text numberOfLines={2} style={styles.add}>
            Gia hạn hợp đồng
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mid}>
        <TouchableOpacity onPress={resignStaff} style={styles.row}>
          <View style={styles.icon}>
            <Image source={imgs.delstaff} style={styles.img} />
          </View>
          <Text numberOfLines={2} style={styles.add}>
            Nhân sự nghỉ việc
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={genaralInfo} style={styles.row}>
          <View style={styles.icon}>
            <Image source={imgs.information} style={styles.img} />
          </View>
          <Text numberOfLines={2} style={styles.add}>
            Tổng hợp thông tin
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bot}>
        <TouchableOpacity onPress={addOT} style={styles.row}>
          <View style={styles.iconOT}>
            <Image source={imgs.OT} style={styles.img} />
          </View>
          <Text numberOfLines={1} style={styles.ot}>
            Đơn Nghỉ, OT
          </Text>
        </TouchableOpacity>
        <View style={styles.nothing} />
      </View>
    </>
  );
};

export default Admin;

const styles = StyleSheet.create({
  top: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  mid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  bot: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 16,
  },
  add: {
    width: 80,
    fontSize: 12,
    alignSelf: 'center',
  },
  txtManager: {
    fontSize: 20,
    alignSelf: 'center',
    height: 30,
  },
  manager: {
    height: 20,
  },
  ot: {
    width: 80,
    fontSize: 12,
    alignSelf: 'center',
  },
  nothing: {
    width: 116,
  },
  icon: {
    backgroundColor: 'rgb(47,172,79)',
    padding: 4,
    alignSelf: 'center',
    borderRadius: 11,
    marginRight: 4,
  },
  row: {
    flexDirection: 'row',
  },
  img: {
    height: 14,
    width: 14,
  },
  iconOT: {
    padding: 4,
    alignSelf: 'center',
    borderRadius: 11,
    marginRight: 4,
    // shadowColor: 'black',
    // shadowOffset: {
    //   width: 0,
    //   height: 10,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // borderWidth: 0.25,
  },
});
