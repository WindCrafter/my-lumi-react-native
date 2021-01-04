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
import Icon from 'react-native-vector-icons/Feather';

const HeaderAccount = (props) => {
  const {title, sub, goBack} = props;
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={styles.row}>
        <TouchableOpacity onPress={goBack} style={styles.button}>
          {/* <Image source={leftImage} style={styles.image} resizeMode="contain" /> */}
          <Icon
            name="chevron-left"
            size={32}
            color={Colors.black}
            style={{top: 4}}
          />
        </TouchableOpacity>
        <View>
          <View style={styles.info}>
            <Text style={styles.txtTitle}>{title}</Text>
            <Text style={styles.txtDetail}>{sub}</Text>
          </View>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
