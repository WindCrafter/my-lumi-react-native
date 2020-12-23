import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import langs from '../../../../../common/language';
import { imgs } from '../../../../../utlis';

const Admin = (props) => {
  const {
    addStaff,
    extendContract,
    resignStaff,
    generalInfo,
    addOT,
    inforContact,
  } = props;
  return (
    <>
      <View style={styles.manager}>
        <Text style={styles.txtManager}>{langs.manager}</Text>
      </View>
      <View style={styles.top}>
        <TouchableOpacity onPress={addStaff} style={styles.row}>

          <Image source={imgs.addstaff} style={styles.img} />

          <Text numberOfLines={2} style={styles.add}>
            {langs.addStaff}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={extendContract} style={styles.row}>

          <Image source={imgs.selectCalendar} style={styles.img} />

          <Text numberOfLines={2} style={styles.add}>
            {langs.extendContract}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.top}>
        <TouchableOpacity onPress={resignStaff} style={styles.row}>

          <Image source={imgs.delstaff} style={styles.img} />

          <Text numberOfLines={2} style={styles.add}>
            {langs.listStaffOut}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={generalInfo} style={styles.row}>

          <Image source={imgs.information} style={styles.img} />

          <Text numberOfLines={2} style={styles.add}>
            {langs.genaralInfo}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.top}>
        <TouchableOpacity onPress={addOT} style={styles.row}>

          <Image source={imgs.OT} style={styles.img} />

          <Text numberOfLines={1} style={styles.add}>
            {langs.resignOT}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={inforContact} style={styles.row}>

          <Image source={imgs.contact} style={styles.img} />

          <Text numberOfLines={2} style={styles.add}>
            {langs.contact}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Admin;

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    marginTop: 16,
  },
  add: {
    fontSize: 12,
    alignSelf: 'center',
  },
  txtManager: {
    fontSize: 20,
    alignSelf: 'center',
  },
  manager: {
    // height: 20,
  },
  nothing: {
    width: 116,
  },
  icon: {
    alignSelf: 'center',
    borderRadius: 11,
    marginRight: 4,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 4,
  },
  img: {
    // color:'red'
    height: 20,
    width: 20,
    marginRight: 8,
  },
});
