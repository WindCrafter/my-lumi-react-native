import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import langs from '../../../../../common/language';
import {imgs} from '../../../../../utlis';
const RowCheck = (props) => {
  const {down} = props;
  return (
    <View style={styles.manager}>
      <View style={styles.row}>
        <Image source={imgs.checkingreen} style={styles.img} />
        <Text style={styles.txtDetail}> {langs.checkIn}</Text>
      </View>
      <View style={styles.row}>
        <Icon name={down ? 'chevron-down' : 'chevron-right'} size={28} />
      </View>
    </View>
  );
};

export default RowCheck;

const styles = StyleSheet.create({
  manager: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 18,
    height: 18,
  },
  txtManager: {
    fontSize: 20,
    alignSelf: 'center',
  },
  txtDetail: {
    fontSize: 20,
    alignSelf: 'center',
    marginLeft: 8,
    fontWeight: 'normal',
  },
});
