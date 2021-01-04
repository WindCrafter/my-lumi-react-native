import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import moment from 'moment';
import {imgs, Colors} from '../../../../../utlis';
import langs from '../../../../../common/language';

const currrentDate = moment().format('DD/MM/YYYY');
const day = moment().format('dddd');

const HeaderAccount = (props) => {
  const {title, sub} = props;
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={styles.info}>
        <Text style={styles.txtTitle}>{title}</Text>
        <Text style={styles.txtDetail}>{sub}</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.bot} />
    </View>
  );
};

export default HeaderAccount;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  info: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 24,
  },
  txtTitle: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Quicksand-Bold',
    color: 'black',
  },
  txtDetail: {
    fontSize: 16,
    fontWeight: '300',
    color: 'black',
    marginVertical: 4,
  },
  line: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: 'black',
  },
  bot: {
    flex: 1,
    paddingBottom: 16,
  },
});
