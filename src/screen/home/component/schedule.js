import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { imgs } from '../../../../utlis';

const Schedule = (props) => {
  const { addStaff, extendContract, resignStaff, genaralInfo, addOT } = props;
  return (
    <>
      <View style={styles.manager}>
        <Text style={styles.txtManager}>Công việc</Text>
      </View>
      <View style={styles.detail}>
        <TouchableOpacity style={styles.button}>
          <View style={styles.add}>
            <Image source={imgs.add} style={styles.img} />
          </View>
          <Text style={styles.txtAdd} numberOfLines={2}>
            Thêm công việc
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <View style={styles.add}>
            <Image source={imgs.meeting} style={styles.img} />
          </View>
          <Text style={styles.txtAdd} numberOfLines={2}>
            Tạo lịch họp
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  txtManager: {
    fontSize: 20,
    alignSelf: 'center',
    height: 30,
    marginBottom: 8,
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  txtDetail: {
    fontSize: 14,
    alignSelf: 'center',
    height: 30,
  },
  img: {
    width: 18,
    height: 18,
  },
  add: {
    backgroundColor: 'rgb(47,172,79)',
    padding: 4,
    alignSelf: 'center',
    borderRadius: 11,
  },
  button: {
    flexDirection: 'row',
  },
  txtAdd: {
    width: 80,
    alignSelf: 'center',
    marginLeft: 4,
    fontSize: 16,
  },
});
