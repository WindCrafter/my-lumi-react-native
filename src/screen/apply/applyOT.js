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
import { imgs } from '../../../utlis';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import InputApply from '../../component/Input/inputApply';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function ApplyOT(props) {
  const [date, setDate] = useState(new Date(1598051730000));
  const [time, setTime] = useState(new Date(1598051730000));
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

  const onShow = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setShow(!show);
  };

  const onComplete = () => {
    Alert.alert('end');
  };

  return (
    <View style={styles.container}>
      <BarStatus
        backgroundColor="rgb(47,172,79)"
        height={Platform.OS === 'ios' ? 46 : StatusBar.currentHeight}
      />
      <HeaderCustom
        title={'Đơn xin làm thêm giờ'}
        height={60}
        goBack={goBack}
        fontSize={24}
      />
      <ScrollView>
        <Text style={styles.extend}>Nhập thông tin : </Text>
        <View style={styles.detail}>
          <View style={styles.row}>
            <View style={styles.img}>
              <Image source={imgs.reason} style={styles.imageStamp} />
            </View>
            <Text style={styles.txtStatus}>Tóm tắt lí do :</Text>
          </View>
          <InputApply />
          <View style={styles.row}>
            <View style={styles.img}>
              <Image source={imgs.startDate} style={styles.imageStamp} />
            </View>
            <Text style={styles.txtStatus}>Thời gian bắt đầu :</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={onShow}>
            {Platform.OS === 'ios' ? (
              <Text style={styles.txtTime}>
                {' '}
                {moment(date).format('HH:mm     DD/MM/YYYY')} {show ? '▲' : '▼'}
              </Text>
            ) : (
                <Text style={styles.txtTime}>
                  {moment(time).format('HH:mm')}
                  {'       '}
                  {moment(date).format('DD/MM/YYYY')} {show ? '▲' : '▼'}
                </Text>
              )}
          </TouchableOpacity>
          {show ? (
            Platform.OS === 'ios' ? (
              <DateTimePicker
                value={date}
                mode={'datetime'}
                display="default"
                onChange={onChange}
                is24hour={true}
              />
            ) : (
                <>
                  <DateTimePicker
                    value={time}
                    mode={'time'}
                    display="default"
                    onChange={onChangeTime}
                    is24hour={true}
                  />
                  <DateTimePicker
                    value={date}
                    mode={'date'}
                    display="default"
                    onChange={onChange}
                    is24hour={true}
                  />
                </>
              )
          ) : null}
        </View>
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

export default ApplyOT;

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
    color: 'rgb(47,172,79)',
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
    backgroundColor: 'rgb(47,172,79)',
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
    backgroundColor: 'rgb(47,172,79)',
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
    width: wp(90),
    backgroundColor: 'rgb(47,172,79)',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  txtTime: {
    fontSize: 20,
  },
});
