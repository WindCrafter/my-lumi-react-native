import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import langs from '../../../../../common/language';
import {imgs, Colors} from '../../../../../utlis';

const Schedule = (props) => {
  const { } = props;
  return (
    <>
      <View style={styles.manager}>
        <Text style={styles.txtManager}>{langs.work}</Text>
      </View>
      <View style={styles.detail}>
        <TouchableOpacity style={styles.button}>
          <View style={styles.add}>
            <Image source={imgs.addWhite} style={styles.img} />
          </View>
          <Text style={styles.txtAdd} numberOfLines={2}>
            {langs.addWork}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <View style={styles.create}>
            <Image source={imgs.meeting} style={styles.img} />
          </View>
          <Text style={styles.txtAdd} numberOfLines={2}>
            {langs.creMeeting}
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
    backgroundColor: Colors.background,
    padding: 4,
    alignSelf: 'center',
    borderRadius: 13,
  },
  create: {
    backgroundColor: Colors.background,
    padding: 4,
    alignSelf: 'center',
    borderRadius: 13,
  },
  button: {
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  txtAdd: {
    width: 80,
    alignSelf: 'center',
    marginLeft: 4,
    fontSize: 16,
  },
});
