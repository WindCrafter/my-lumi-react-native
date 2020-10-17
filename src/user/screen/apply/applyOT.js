/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
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
  Keyboard,
} from 'react-native';
import {BarStatus, HeaderCustom, Button} from '../../../component';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {imgs, Colors} from '../../../../utlis';
import {ScrollView} from 'react-native-gesture-handler';
import InputApply from '../../../component/Input/inputApply';
import langs from '../../../../common/language';
import {Card} from 'native-base';
import Suggest from './component/Suggest';
import PickerCustom from './component/PickerCustom';
import moment from 'moment';
import Slider from '@react-native-community/slider';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function ApplyOT(props) {
  const [reason, setReason] = useState('');
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(30);
  const [showPicker, setShowPicker] = useState(false);
  const {navigation, route, userId, token, overTime} = props;
  const [mode, setMode] = useState('');
  const [day, setDay] = useState(new Date());
  const [hour, setHour] = useState(new Date());
  const onSetOverTime = () => {
    console.log(userId);
    console.log(moment(hour).format('hh:mm'));
    const data = {
      userId: userId,
      time: time,
      date: moment().format('DD/MM/YYYY'),
      token: token,
      start: moment(hour).format('hh:mm'),
    };
    overTime(data);
  };
  const goBack = () => {
    navigation.goBack();
  };

  const onComplete = () => {
    Alert.alert('end');
  };

  const onChangeReason = (val) => {
    setReason(val);
    setShow(false);

  };

  const onSetReason = (val) => {
    setReason(val);
    unFocus();
  };

  const onFocus = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setShow(true);
  };

  const unFocus = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setShow(false);
    Keyboard.dismiss();
  };
  const onChangeTime = (value) => {
    setTime(value);
    console.log('---time', value);

  };
  const onChangeTimeComplete = (value) => {
    setTime(value);
    console.log('---time', value);

  };

  const onUnshow = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setShowPicker(false);
    setMode('');
  };
  const onChangeHour = (event, selectedShift) => {
    const currentShift = selectedShift || hour;
    setShowPicker(Platform.OS === 'ios');
    setHour(currentShift);
  };
  const onChangeDay = (event, selectedDay) => {
    const currentDay = selectedDay || day;
    setShowPicker(Platform.OS === 'ios');
    setDay(currentDay);
  };

  const onShowPicker = (m) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setShowPicker(true);
    setMode(m);
  };

  return (
    <View style={styles.container}>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 46 : StatusBar.currentHeight}
      />
      <HeaderCustom
        title={'Đơn xin OT'}
        height={60}
        goBack={goBack}
        fontSize={24}
      />
      <ScrollView>
        <View style={styles.detail}>
          <View style={styles.row}>
            <View style={styles.img}>
              <Image source={imgs.reason} style={styles.imageStamp} />
            </View>
            <Text style={styles.txtStatus}>{langs.reasonSum}</Text>
          </View>
          <InputApply
            borderRadius={12}
            backgroundColor={'white'}
            containerStyle={{
              width: '90%',
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            value={reason}
            onChangeText={onChangeReason}
            onFocus={onFocus}
            onSubmitEditing={unFocus}
            blurOnSubmit={true}
          />

          {show ? (
            <Card style={styles.card}>
              <Suggest
                detail={'Sửa bug phát sinh.'}
                onPress={() => onSetReason('Sửa bug phát sinh.')}
              />
              <Suggest
                detail={'Bảo đảm tiến độ dự án.'}
                onPress={() => onSetReason('Bảo đảm tiến độ dự án.')}
              />
              <Suggest
                detail={'Bảo trì hệ thống.'}
                onPress={() => onSetReason('Bảo trì hệ thống.')}
              />
              <Suggest
                detail={'Phát triển tính năng mới.'}
                onPress={() => onSetReason('Phát triển tính năng mới.')}
              />
              {/* <Suggest
                detail={'lí do 5'}
                onPress={() => onSetReason('lí do 5')}
              /> */}
            </Card>
          ) : null}
          <Card style={styles.card}>
            <View style={[styles.row, {justifyContent: 'center'}]}>
              <Image source={imgs.time} style={styles.icon} />
              <Text style={styles.txtTime}>{time} phút</Text>
            </View>
            <Slider
              style={styles.Slider}
              minimumValue={0}
              maximumValue={60}
              minimumTrackTintColor="#4BBF70"
              maximumTrackTintColor="grey"
              step={5}
              onValueChange={onChangeTime}
              onSlidingComplete={onChangeTimeComplete}
            // thumbImage={imgs.miniLogo}
            />
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <View style={styles.img}>
                <Image
                  source={imgs.startTime}
                  style={[styles.imageStamp, {marginRight: 8}]}
                />
                <Text style={styles.txtStatus}>{langs.timeStart}</Text>
              </View>
              <TouchableOpacity
                style={styles.time}
                onPress={() => onShowPicker('time')}>
                <Text style={styles.txtTime}>
                  {moment(hour).format('hh:mm')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <View style={styles.img}>
                <Image
                  source={imgs.startDate}
                  style={[styles.imageStamp, {marginRight: 8}]}
                />
                <Text style={styles.txtStatus}>{langs.day}</Text>
              </View>
              <TouchableOpacity
                style={styles.time}
                onPress={() => onShowPicker('day')}>
                <Text style={styles.txtTime}>
                  {moment(day).format('DD/MM/yyyy')}
                </Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
        {showPicker ? (
          mode === 'time' ? (
            <PickerCustom
              value={hour}
              onChange={onChangeHour}
              onPress={onUnshow}
              mode={'time'}
            />
          ) : mode === 'day' ? (
            <PickerCustom
              value={day}
              onChange={onChangeDay}
              onPress={onUnshow}
              mode={'date'}
            />
          ) : null
        ) : null}
       
      </ScrollView>
      <Button
        title={'Hoàn thành'}
        containerStyle={styles.complete}
        onPress={onSetOverTime}
      />
    </View>
  );
}

export default ApplyOT;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: '100%',
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
    padding: 8,
    borderRadius: 16,
    alignSelf: 'center',
    marginRight: 8,
    flexDirection: 'row',
  },
  imageStamp: {
    width: 20,
    height: 20,
  },
  txtStatus: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '300',
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
    position: 'absolute',
    bottom:"10%"

  },
  row: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  txtTime: {
    fontSize: 16,
    color: Colors.black,
    alignSelf: 'center',
    marginHorizontal: 12,
  },
  card: {
    borderRadius: 16,
    marginTop: 16,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  icon: {
    alignSelf: 'center',
    tintColor: 'black',
  },
  add: {
    fontSize: 24,
    color: 'white',
  },
  btnSubtract: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    width: 32,
    height: 32,
    borderRadius: 24,
    alignSelf: 'center',
    marginRight: 8,
  },
  btnAdd: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    width: 32,
    height: 32,
    borderRadius: 24,
    alignSelf: 'center',
    marginLeft: 8,
  },
  time: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Slider: {
    width: wp(80),
    height: 40,
    alignSelf: 'center',
  },
});
