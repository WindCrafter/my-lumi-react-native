/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  FlatList,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Image,
  Alert,
} from 'react-native';
import { BarStatus, HeaderCustom, Button } from '../../component';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { imgs, Colors } from '../../../utlis';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import InputApply from '../../component/Input/inputApply';
import langs from '../../../common/language';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function ApplyBreak(props) {
  const [date, setDate] = useState(new Date(1598051730000));
  const [time, setTime] = useState(new Date(1598051730000));
  const [dateEnd, setDateEnd] = useState(new Date(1598051730000));
  const [timeEnd, setTimeEnd] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('');
  const [start, setStart] = useState('');
  const [show, setShow] = useState(false);
  const { navigation, route } = props;

  const goBack = () => {
    navigation.goBack();
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onChangeTime = (event, selectedDate) => {
    const currentTime = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setTime(currentTime);
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDateEnd = selectedDate || dateEnd;
    setShow(Platform.OS === 'ios');
    setDateEnd(currentDateEnd);
  };

  const onChangeTimeEnd = (event, selectedDate) => {
    const currentTimeEnd = selectedDate || dateEnd;
    setShow(Platform.OS === 'ios');
    setTimeEnd(currentTimeEnd);
  };
  //m-time , v-start mode
  const onShowStart = (m, v) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setShow(true);
    setStart(v);
    setMode(m);
  };

  const onShowEnd = (m, v) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setShow(true);
    setStart(v);
    setMode(m);
  };

  const onComplete = () => {
    Alert.alert('end');
  };

  const onUnshow = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setShow(false);
    setStart('');
    setMode('');
  };

  return (
    <View style={styles.container}>
      <BarStatus
        backgroundColor="rgb(47,172,79)"
        height={Platform.OS === 'ios' ? 46 : StatusBar.currentHeight}
      />
      <HeaderCustom
        title={'Đơn xin nghỉ'}
        height={60}
        goBack={goBack}
        fontSize={24}
      />
      <ScrollView>
        <Text style={styles.extend}>{langs.enterInfo} </Text>
        <View style={styles.detail}>
          <View style={styles.row}>
            <View style={styles.img}>
              <Image source={imgs.reason} style={styles.imageStamp} />
            </View>
            <Text style={styles.txtStatus}>{langs.reasonSum}</Text>
          </View>
          <InputApply />
          <View style={styles.row}>
            <View style={styles.img}>
              <Image source={imgs.startDate} style={styles.imageStamp} />
            </View>
            <Text style={styles.txtStatus}>{langs.timeStart}</Text>
          </View>
          <View style={[styles.row, { alignSelf: 'center' }]}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  width: wp(25),
                  marginRight: wp(5),
                  backgroundColor:
                    mode === 'time' && start === 'start'
                      ? 'rgb(125, 22, 204)'
                      : Colors.background,
                },
              ]}
              onPress={() => onShowStart('time', 'start')}>
              <Text style={styles.txtTime}>{moment(time).format('HH:mm')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor:
                    mode === 'date' && start === 'start'
                      ? 'rgb(125, 22, 204)'
                      : Colors.background,
                },
              ]}
              onPress={() => onShowStart('date', 'start')}>
              <Text style={styles.txtTime}>
                {moment(date).format('DD/MM/YYYY')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <View style={styles.img}>
              <Image source={imgs.startDate} style={styles.imageStamp} />
            </View>
            <Text style={styles.txtStatus}>{langs.timeEnd}</Text>
          </View>
          <View style={[styles.row, { alignSelf: 'center' }]}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  width: wp(25),
                  marginRight: wp(5),
                  backgroundColor:
                    mode === 'time' && start === 'end'
                      ? 'rgb(125, 22, 204)'
                      : Colors.background,
                },
              ]}
              onPress={() => onShowEnd('time', 'end')}>
              <Text style={styles.txtTime}>
                {moment(timeEnd).format('HH:mm')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor:
                    mode === 'date' && start === 'end'
                      ? 'rgb(125, 22, 204)'
                      : Colors.background,
                },
              ]}
              onPress={() => onShowEnd('date', 'end')}>
              <Text style={styles.txtTime}>
                {moment(dateEnd).format('DD/MM/YYYY')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {show ? (
          mode === 'time' ? (
            <>
              <TouchableOpacity style={styles.unshow} onPress={onUnshow}>
                <Text style={styles.txtX}>X</Text>
              </TouchableOpacity>
              <DateTimePicker
                value={start === 'start' ? time : timeEnd}
                mode={'time'}
                display="default"
                onChange={start === 'start' ? onChangeTime : onChangeTimeEnd}
                is24hour={true} />
            </>
          ) : mode === 'date' ? (
            <>
              <TouchableOpacity style={styles.unshow} onPress={onUnshow}>
                <Text style={styles.txtX}>X</Text>
              </TouchableOpacity>
              <DateTimePicker
                value={start === 'start' ? date : dateEnd}
                mode={'date'}
                display="default"
                onChange={start === 'start' ? onChange : onChangeEnd}
                is24hour={true}
              />
            </>
          ) : null
        ) : null}
      </ScrollView>
      <View style={styles.bottom}>
        <Button
          title={'Hoàn thành'}
          containerStyle={styles.complete}
          onPress={onComplete}
        />
      </View>
    </View>
  );
}

export default ApplyBreak;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: heightPercentageToDP(100),
  },
  containerUser: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: wp(95),
    paddingVertical: 8,
    borderRadius: 8,
    marginVertical: 6,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '300',
    color: Colors.background,
  },
  detail: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginHorizontal: 12,
  },
  status: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 16,
    justifyContent: 'space-between',
  },
  img: {
    backgroundColor: Colors.background,
    padding: 8,
    borderRadius: 16,
    alignSelf: 'center',
    marginRight: 12,
  },
  imageStamp: {
    width: 12,
    height: 12,
  },
  txtStatus: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '300',
    marginLeft: 12,
  },
  extend: {
    fontSize: 18,
    fontWeight: '500',
    marginHorizontal: 27,
    marginTop: 16,
    marginBottom: 4,
  },
  end: {
    backgroundColor: 'red',
  },
  complete: {
    backgroundColor: Colors.background,
  },
  bottom: {
    position: 'absolute',
    bottom: 32,
    left: wp(12.5),
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  button: {
    height: 60,
    width: wp(60),
    backgroundColor: Colors.background,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  txtTime: {
    fontSize: 20,
    color: Colors.white,
  },
  unshow: {
    height: 28,
    width: 28,
    borderRadius: 14,
    right: 0,
    backgroundColor: 'tomato',
    alignSelf: 'flex-end',
    marginRight: 24,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtX: {
    color: Colors.white,
    fontWeight: '900',
  },
});
