import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../../../../utlis/color/index';
import { imgs } from '../../../../../utlis';

const HeaderEvent = (props) => {
  const { title, sub, goBack, shadow, count } = props;
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', paddingTop: 4, paddingBottom: 8, }}>
        <TouchableOpacity onPress={goBack} style={styles.button}>
          <Icon
            name="chevron-left"
            size={32}
            color={Colors.black}
            style={styles.icon}
          />
        </TouchableOpacity>
        <View style={[styles.info]}>
          <Text style={styles.txtTitle}>Sự kiện</Text>
          <Text style={styles.txtDetail}>
            Hôm nay có
            {' '}
            {count}
            {' '}
            sự kiện
            {' '}
          </Text>
        </View>
      </View>
      {shadow ? (
        <LinearGradient
          style={[styles.gradient]}
          colors={['#D5D5D5', '#F2F2F2']}
        />
      ) : null}
    </View>
  );
};

export default HeaderEvent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  info: {
    flex: 1,
  },
  txtTitle: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Quicksand-Bold',
    marginLeft: 12,
    color: 'black',
  },
  txtDetail: {
    fontSize: 16,
    fontWeight: '300',
    color: 'black',
    marginLeft: 12,
    marginVertical: 4,
  },
  line: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: Colors.gray,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    width: wp(100),
    height: 4,
  },
  btnAdd: {
    justifyContent: 'center'
  },
  add: {
    width: 16,
    height: 16,
    marginRight: 16
  },
  icon: {
    alignSelf: 'center',
  }
});
