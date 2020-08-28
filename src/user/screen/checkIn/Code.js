import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
} from 'react-native';
import langs from '../../../../common/language';
import { Card } from 'native-base';
import { Colors } from '../../../../utlis';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { HeaderCheck } from '../../../component';
import { imgs } from '../../../../utlis';
import moment from 'moment';


const Code = (props) => {
  const { navigation, token, deviceId, checkIn } = props;
  const [code, setCode] = useState('');

  const onCheckIn = () => {
    const data = {
      time: moment().format('HH:MM'),
      deviceId: deviceId,
      codeString: code,
      type: 'in',
      token: token,
    };
    checkIn(data);
  };

  const onChangeCode = (value) => {
    setCode(value);
  };

  return (
    <View style={styles.container}>
      <HeaderCheck title={langs.checkIn} />
      <View style={styles.detail}>
        <View style={styles.viewTop}>
          <Text style={styles.txtTop}>Điền mã được cấp để chấm công :</Text>
        </View>
        <Card style={styles.card}>
          <View style={styles.body}>
            <Image source={imgs.key} style={styles.imageInput} />
            <TextInput
              textAlign={'right'}
              placeholder={'Mã chấm công ...'}
              placeholderTextColor={'black'}
              onChangeText={onChangeCode}
              value={code}
            />
          </View>
          <View style={styles.middle} />
        </Card>
        <View style={styles.blankspace} />

        <TouchableOpacity style={styles.touchable} onPress={onCheckIn}>
          <View style={styles.bot}>
            <Text style={styles.done}>Hoàn thành</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.blankspace} />

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.return}>
            <Image source={imgs.return} style={styles.imageReturn} />
            <Text style={styles.textReturn}>Quay lại </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.nothing} />
      </View>
    </View>
  );
};

export default Code;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detail: {
    flex: 4,
  },
  viewTop: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  viewMid: {
    flex: 1,
    alignItems: 'center',
  },
  txtTop: {
    fontSize: 18,
  },

  txtCheck: {
    fontSize: 17,
    fontWeight: '400',
    alignSelf: 'center',
  },
  nothing: {
    flex: 3,
  },
  blankspace: {
    flex: 2,
  },
  card: {
    flexDirection: 'column',
    width: wp(80),
    alignItems: 'center',
    height: 100,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 24,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingHorizontal: 16,
    paddingVertical: 18,
  },

  body: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',

    width: wp(40),
  },
  middle: {
    width: wp(50),
    height: 1,
    backgroundColor: 'black',
    marginVertical: 3.5,
  },
  touchable: {
    alignSelf: 'center',
    alignContent: 'center',
    resizeMode: 'contain',
  },
  bot: {
    backgroundColor: Colors.background,
    borderRadius: 60,
    width: 100,
    height: 100,
    justifyContent: 'center',
  },
  done: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white',
  },
  modal: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  modalview: {
    width: wp(90),
    height: 160,
    borderRadius: 12,
    backgroundColor: '#f1fbf5',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  return: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageReturn: {
    width: 16,
    height: 16,
  },
  textModal: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  textModalMid: {
    textAlign: 'center',
  },
  textReturn: {
    fontSize: 20,
    marginLeft: 3,
  },
  bottomModal: {
    height: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  textModalBot: {
    textAlign: 'center',
    fontSize: 14,
  },
  imageInput: {
    alignSelf: 'center',
  },
  textModalTop: {
    alignSelf: 'center',
    fontSize: 18,
    marginTop: 10,
  },
});
