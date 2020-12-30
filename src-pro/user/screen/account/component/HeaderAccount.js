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
import Icon from 'react-native-vector-icons/Feather';
import { imgs, Colors } from '../../../../../utlis';
import langs from '../../../../../common/language';

const currrentDate = moment().format('DD/MM/YYYY');
const day = moment().format('dddd');

const HeaderAccount = (props) => {
  const { title, sub, goBack } = props;
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{flexDirection: 'row'}}>
        {goBack ? (
          <TouchableOpacity onPress={goBack} style={styles.button}>
            {/* <Image source={leftImage} style={styles.image} resizeMode="contain" /> */}
            <Icon
              name="chevron-left"
              size={32}
              color={Colors.black}
              style={{top: 0}}
            />
          </TouchableOpacity>
        ) : null}
        <View style={[styles.info, {marginLeft:goBack? 48:24}]}>
          <Text style={styles.txtTitle}>{title}</Text>
          <Text style={styles.txtDetail}>{sub}</Text>
        </View>
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
    
  },
  txtTitle: {
    fontSize: 24,
    fontWeight: '700',
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
  button: {
    position: 'absolute',
    left: 8,
    width: 36,
    height: 48,
    top: 8
  },
});
