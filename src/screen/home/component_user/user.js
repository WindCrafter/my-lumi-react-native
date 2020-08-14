import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { imgs } from '../../../../utlis';
import langs from '../../../../common/language';

const User = (props) => {
  const { applyLate, applyOT, applyBreak, generalInfo } = props;
  return (
    <>
      <View style={styles.manager}>
        <Text style={styles.txtManager}>{langs.event}</Text>
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
        <TouchableOpacity onPress={generalInfo} style={styles.row}>
          <View style={styles.icon}>
            <Image source={imgs.information} style={styles.img} />
          </View>
          <Text numberOfLines={2} style={styles.add}>
            {langs.genaralInfo}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mid}>
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
    // backgroundColor: 'red',
    padding: 4,
    alignSelf: 'center',
    borderRadius: 11,
    marginRight: 4,
  },
  row: {
    flexDirection: 'row',
  },
  img: {
    // color:'red'
    height: 24,
    width: 24,
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
