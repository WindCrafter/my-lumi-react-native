import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Admin = (props) => {
  const { addStaff, extendContract, resignStaff, genaralInfo, addOT } = props;
  return (
    <>
      <View style={styles.manager}>
        <Text style={styles.txtManager}>Quản lí nhân sự</Text>
      </View>
      <View style={styles.top}>
        <TouchableOpacity onPress={addStaff}>
          <Text numberOfLines={2} style={styles.add}>
            Thêm nhân viên mới
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={extendContract}>
          <Text numberOfLines={2} style={styles.add}>
            Gia hạn hợp đồng
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mid}>
        <TouchableOpacity onPress={resignStaff}>
          <Text numberOfLines={2} style={styles.add}>
            Nhân sự nghỉ việc
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={genaralInfo}>
          <Text numberOfLines={2} style={styles.add}>
            Tổng hợp thông tin
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bot}>
        <TouchableOpacity onPress={addOT}>
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
  },
  txtManager: {
    fontSize: 16,
    alignSelf: 'center',
  },
  manager: {
    height: 20,
  },
  ot: {
    width: 80,
    fontSize: 12,
  },
  nothing: {
    width: 80,
  },
});
