import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import langs from '../../../../../common/language';
import { imgs } from '../../../../../utlis';

const User = (props) => {
  const { applyLate, applyOT, applyBreak, contactInfor } = props;
  return (
    <>
      <View style={styles.manager}>
        <Text style={styles.txtManager}>Tính năng</Text>
      </View>
      <View style={styles.top}>
        <TouchableOpacity onPress={applyBreak} style={styles.row}>
          <View style={styles.icon}>
            <Image source={imgs.leave} style={styles.img} />
          </View>
          <Text numberOfLines={2} style={styles.add}>
            {langs.applyBreak}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={contactInfor} style={styles.row}>
          <View style={styles.icon}>
            <Image source={imgs.contact} style={styles.img} />
          </View>
          <Text numberOfLines={2} style={styles.add}>
            {langs.contact}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.top}>
        <TouchableOpacity onPress={applyOT} style={styles.row}>
          <View style={styles.icon}>
            <Image source={imgs.OT} style={styles.img} />
          </View>
          <Text numberOfLines={2} style={styles.add}>
            {langs.applyOT}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={applyLate} style={styles.row}>
          <View style={styles.icon}>
            <Image source={imgs.late} style={styles.img} />
          </View>
          <Text numberOfLines={2} style={styles.add}>
            {langs.applyLate}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default User;

const styles = StyleSheet.create({
  top: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  add: {
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
    alignSelf: 'center',
    borderRadius: 11,
    marginRight: 4,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 8,
  },
  img: {
    // color:'red'
    height: 20,
    width: 20,
    marginRight: 8,
  },
});
