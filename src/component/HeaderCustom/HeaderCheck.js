import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import moment from 'moment';
import langs from '../../../common/language';
import {imgs, Colors} from '../../../utlis';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

HeaderCheck.defaultProps = {
  type: 'Check In',
};

function HeaderCheck(props?: Props) {
  const {onPress, title, type, pressHistory, onPressBack} = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.body} onPress={onPressBack}>
        <Image style={styles.cancel} source={imgs.cancel} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.body} onPress={onPress}>
        <Text style={styles.txtName}>{type}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.notify} onPress={pressHistory}>
        <Image source={imgs.information} style={styles.img} />
      </TouchableOpacity>
    </View>
  );
}

export default HeaderCheck;

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    top: 30,
  },

  checkIn: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 16,
  },
  avatar: {
    flex: 1,
    justifyContent: 'center',
  },
  info: {
    flexDirection: 'column',
    flex: 2.25,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  avt: {
    height: 64,
    width: 64,
    borderRadius: 32,
    marginLeft: 24,
  },
  txtName: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    alignSelf: 'center',
  },
  time: {
    fontSize: 16,
    fontWeight: '300',
    color: '#ffffff',
    marginLeft: 2,
  },
  notify: {
    marginRight: 8,
    height: 28,
    width: 28,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  body: {
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    // height:48,width:48
  },
  image: {
    marginLeft: 8,
  },
  img: {
    width: 28,
    height: 28,
  },
  cancel: {
    width: 18,
    height: 18,
    tintColor: 'white',
  },
});
