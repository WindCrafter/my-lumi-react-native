import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import langs from '../../../../common/language';

const InfoWeek = (props) => {
  const { addStaff, extendContract, resignStaff, genaralInfo, addOT } = props;
  return (
    <>
      <View style={styles.manager}>
        <Text style={styles.txtManager}>{langs.dayWeek}</Text>
      </View>
      <View style={styles.bot}>
        <View styles={styles.comp}>
          <Text style={styles.onTime}> 0</Text>
          <Text style={styles.txtOnTime}>{langs.checkOut}</Text>
        </View>
        <View styles={styles.comp}>
          <Text style={styles.late}> 1</Text>
          <Text style={styles.txtLate}>{langs.late}</Text>
        </View>
        <View styles={styles.comp}>
          <Text style={styles.break}> 2</Text>
          <Text style={styles.txtBreak}> {langs.break}</Text>
        </View>
      </View>
    </>
  );
};

export default InfoWeek;

const styles = StyleSheet.create({
  bot: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 16,
  },
  comp: {
    flexDirection: 'column',
  },
  onTime: {
    fontSize: 20,
    color: 'rgb(47, 172, 79)',
    alignSelf: 'center',
  },
  txtOnTime: {
    marginTop: 8,
    fontSize: 14,
    alignSelf: 'center',
    fontWeight: '500',
  },
  late: {
    fontSize: 20,
    color: 'tomato',
    alignSelf: 'center',
  },
  txtLate: {
    marginTop: 8,
    fontSize: 14,
    alignSelf: 'center',
    fontWeight: '500',
  },
  break: {
    fontSize: 20,
    color: 'rgba(0,0,25,0.22)',
    alignSelf: 'center',
  },
  txtBreak: {
    marginTop: 8,
    fontSize: 14,
    alignSelf: 'center',
    fontWeight: '500',
  },
  txtManager: {
    fontSize: 20,
    alignSelf: 'center',
    height: 30,
  },
  manager: {
    height: 20,
  },
});
