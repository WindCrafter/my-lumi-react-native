import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import langs from '../../../../../common/language';
import {imgs} from '../../../../../utlis';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const InfoWeek = (props) => {
  const {addStaff, extendContract, resignStaff, genaralInfo, addOT} = props;
  return (
    <>
      <View style={styles.manager}>
        <Text style={styles.txtManager}>{langs.dayWeek}</Text>
      </View>
      <View style={styles.bot}>
        <View styles={styles.comp}>
          <View style={styles.detail}>
            <Text style={styles.late}> 0</Text>
            <Image source={imgs.lateIcon} />
          </View>
          <View>
          <Text style={styles.txtOnTime}>{langs.late}</Text>
          </View>       
        </View>
        <View styles={styles.comp}>
          <View style={styles.detail}>
            <Text style={styles.break}> 1</Text>
            <Image source={imgs.stampUnCheck} />
          </View>
          <Text style={styles.txtLate}>{langs.break}</Text>
        </View>
        <View styles={styles.comp}>
          <View style={styles.detail}>
            <Text style={styles.valid}> 2</Text>
            <Image source={imgs.tickblue} />
          </View>
          <Text style={styles.txtBreak}> {langs.validBreak}</Text>
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
   left:10,height:1,width:20,borderWidth:1
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
    marginRight: 5,
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
    marginRight: 4,
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
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  valid: {
    fontSize: 20,
    color: '#008aee',
    alignSelf: 'center',
    marginRight: 5,
  },
});
