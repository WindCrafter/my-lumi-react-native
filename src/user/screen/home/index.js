import React, {useEffect} from 'react';
import {StyleSheet, View, ScrollView, Platform, UIManager} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Header from './component/header';
import {Card} from 'native-base';
import {Colors, imgs} from '../../../../utlis';
import Event from './component/event';
import FloatButton from './component/ActionButton';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import CardUser from './component_user/user';
import HistoryCheck from './component/HistoryCheck';

const DATA_EVENT = [
  {id: '1', detail: 'Nay là 1 ngày trọng đại', time: '10:00   20/11/2020'},
  {id: '2', detail: 'Mai là 1 ngày trọng đại', time: '13:45   21/11/2020'},
  {id: '3', detail: 'Kia là 1 ngày trọng đại', time: '15:45   22/11/2020'},
  {id: '4', detail: 'Kìa là 1 ngày trọng đại', time: '17:45   23/11/2020'},
];

const DATA_CHECK = [
  {id: '1', in: '08:00', out: '17:35', time: '29/10', type: 'Đúng giờ'},
  {id: '2', in: '07:58', out: '17:35', time: '30/10', type: 'Đúng giờ'},
  {id: '3', in: '08:20', out: '17:35', time: '01/11', type: 'Muộn giờ'},
  {id: '4', in: '08:13', out: '17:35', time: '02/11', type: 'Đúng giờ'},
];

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Home(props) {
  const {navigation, nameUser, token, getListNotifys} = props;

  const onPressNotify = () => {
    navigation.navigate('TestNotify');
  };

  const onPressLate = () => {
    navigation.navigate('ApplyLate');
  };
  const onPressBreak = () => {
    navigation.navigate('ApplyBreak');
  };

  const onPressOT = () => {
    navigation.navigate('ApplyOT');
  };

  useEffect(() => {
    const data = {
      token: token,
    };
    getListNotifys(data);
  });
  return (
    <>
      <View style={styles.container}>
        <Header pressNotify={onPressNotify} name={nameUser} />

        <View style={styles.flex}>
          <LinearGradient
            style={styles.top}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#216632', '#2FAC4F']}
          />
          <ScrollView>
            <View style={styles.groupCard}>
              <CardUser
                backgroundColor={'rgb( 229, 246, 255)'}
                number={20}
                detail={'Công thực tế'}
                source={imgs.clockEarly}
                imgBackground={'rgb( 183, 231, 254)'}
                numberColor={'rgb(46, 114, 249)'}
                tintColor={'rgb(46, 114, 249)'}
              />
              <CardUser
                backgroundColor={'rgb( 255, 240, 234)'}
                number={2}
                detail={'Ngày nghỉ'}
                source={imgs.breakOneDay}
                imgBackground={'rgb(255,218,201)'}
                numberColor={'rgb(255, 86, 46)'}
                tintColor={'rgb(255, 86, 46)'}
              />
            </View>
            <View style={styles.botCard}>
              <CardUser
                backgroundColor={'rgb(226, 246, 234)'}
                number={5}
                detail={'Phép tồn'}
                source={imgs.selectCalendar}
                imgBackground={'rgb(195, 233, 209)'}
                numberColor={'rgb(52, 141, 80)'}
                tintColor={'rgb(52, 141, 80)'}
              />
              <CardUser
                backgroundColor={'rgb(246, 243, 255)'}
                number={5}
                detail={'Giờ đi muộn'}
                source={imgs.clockAlert}
                imgBackground={'rgb(217, 211, 253)'}
                numberColor={'rgb(108, 74, 248)'}
                tintColor={'rgb(108, 74, 248)'}
              />
            </View>
            <Card style={styles.card}>
              <Event data={DATA_EVENT} />
            </Card>
            <Card style={styles.card}>
              <HistoryCheck data={DATA_CHECK} />
            </Card>
          </ScrollView>
          <FloatButton
            onPressLate={onPressLate}
            onPressBreak={onPressBreak}
            onPressOT={onPressOT}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {flex: 6},
  card: {
    borderRadius: 16,
    marginTop: 11,
    width: widthPercentageToDP(100) - 32,
    height: 200,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    shadowColor: 'black',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  top: {
    height: 30,
    width: '100%',
    backgroundColor: Colors.background,
    position: 'absolute',
  },
  groupCard: {
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botCard: {
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 5,
  },
});
