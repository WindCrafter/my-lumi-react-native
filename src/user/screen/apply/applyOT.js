/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Image,
  Alert,
  Keyboard,
  FlatList,
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import PickerCustom from './component/PickerCustom';
import {
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import InputApply from '../../../component/Input/inputApply';
import langs from '../../../../common/language';
import {
  BarStatus,
  HeaderCustom,
  Button,
  SelectButton,
} from '../../../component';
import {imgs, Colors} from '../../../../utlis';
import ApplyIcon from './component/ApplyIcon';
import {Card} from 'native-base';
import Suggest from './component/Suggest';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ruleOT = {
  normalDay: {
    1: {
      start: 0,
      end: 8,
      level: 210,
    },
    2: {
      start: 18,
      end: 22,
      level: 150,
    },
    3: {
      start: 22,
      end: 24,
      level: 210,
    },
    type: 0,
  },
  dayOff: {
    1: {
      start: 0,
      end: 8,
      level: 270,
    },
    2: {
      start: 8,
      end: 22,
      level: 200,
    },
    3: {
      start: 22,
      end: 24,
      level: 270,
    },
    type: 1,
  },
  holiday: {
    1: {
      start: 0,
      end: 8,
      level: 390,
    },
    2: {
      start: 8,
      end: 22,
      level: 300,
    },
    3: {
      start: 22,
      end: 24,
      level: 390,
    },
    type: 2,
  },
};

const convertHour = (date) => {
  const minute = moment(date).format('mm');
  if (minute >= 0 && minute < 15) {
    return moment(date).subtract(minute, 'minutes');
  }
  if (minute < 30) {
    return moment(date).add(30 - minute, 'minutes');
  }
  if (minute < 45) {
    return moment(date).subtract(minute - 30, 'minutes');
  }
  return moment(date).subtract(minute, 'minutes');
};

function ApplyOT(props) {
  const {navigation, route, userId, token, overTime, assign} = props;
  const [reason, setReason] = useState('');
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(0.5);
  const [hour, setHour] = useState(convertHour(new Date())._d);
  const [mode, setMode] = useState('');
  const [day, setDay] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const goBack = () => {
    navigation.goBack();
  };

  const onChangeHour = (event, selectedShift) => {
    const currentShift = selectedShift || hour;
    setShowModal(Platform.OS === 'ios');
    setHour(convertHour(currentShift)._d);
  };
  const onUnshow = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setShowModal(false);
    setMode('');
  };

  const onChangeDay = (event, selectedDay) => {
    const currentDay = selectedDay || day;
    setShowModal(Platform.OS === 'ios');
    console.log(currentDay);
    setDay(currentDay);
  };
  const onChangeReason = (val) => {
    setReason(val);
    setShow(!show);
  };
  const onShowPicker = (m) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setShowModal(true);
    setMode(m);
  };
  const onSetReason = (val) => {
    setReason(val);
    unFocus();
  };

  const ngayle = ['01/01/2020', '02/09/2020', '03/02/2020', '01/01/2021'];
  const checkDay = (date) => {
    if (_.includes(ngayle, date)) {
      return 2;
    }
    const currentMoment = moment(date, 'DD/MM/YYYY').format('dddd');
    switch (currentMoment) {
      case 'Sunday':
      case 'Saturday':
        return 1;
      default:
        return 0;
    }
  };

  const getRuleDate = (date) => {
    const typeDate = checkDay(date);
    switch (typeDate) {
      case 2:
        return ruleOT.holiday;
      case 1:
        return ruleOT.dayOff;
      default:
        return ruleOT.normalDay;
    }
  };

  const getStartTimeInRule = (start, rule) => {
    return _.find(rule, function (o) {
      return o.start <= start && o.end > start;
    });
  };

  const splitTime = (date, start, time) => {
    const result = [];
    const convert = convertTime(start);
    let _time = time;
    let _start = convert;
    let _day = date;
    let _hour;
    let _rule = getRuleDate(date);
    let ruleStart;
    while (_time > 0) {
      ruleStart = getStartTimeInRule(_start, _rule);
      if (!ruleStart) {
        return false;
      }
      _hour =
        _time - (ruleStart.end - _start) > 0 ? ruleStart.end - _start : _time;
      result.push({
        start: _start,
        level: ruleStart.level,
        time: _hour,
        date: _day,
      });
      _time =
        _time - (ruleStart.end - _start) > 0
          ? _time - (ruleStart.end - _start)
          : 0;
      _start = ruleStart.end;
      if (ruleStart.end === 24) {
        _day = moment(date, 'DD/MM/YYYY').add(1, 'days').format('DD/MM/YYYY');
        _rule = getRuleDate(_day);
        _start = 0;
      }
    }
    return result;
  };

  const convertTime = (time) => {
    if (moment(time, 'HH:mm').format('mm') > 0) {
      return parseInt(moment(time, 'HH:mm').format('H')) + 0.5;
    }
    return parseInt(moment(time, 'HH:mm').format('H'));
  };

  const onSetOverTime = () => {
    console.log(
      splitTime(
        moment(day).format('DD/MM/YYYY'),
        moment(hour).format('HH:mm'),
        time,
      ),
      reason,
    );
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

  const renderDropdown = (hideOverlay) => {
    return (
      <FlatList
        data={status}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => renderItem(item, hideOverlay)}
      />
    );
  };

  const renderItem = (item, hideOverlay) => {
    return (
      <TouchableOpacity onPress={() => onPressItem(item, hideOverlay)}>
        <Text>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  const status = [
    {label: '0.5 giờ', value: 0.5},
    {label: '1 giờ', value: 1},
    {label: '1.5 giờ', value: 1.5},
    {label: '2 giờ', value: 2},
    {label: '2.5 giờ', value: 2.5},
    {label: '3 giờ', value: 3},
    {label: '3.5 giờ', value: 3.5},
    {label: '4 giờ', value: 4},
    {label: '4.5 giờ', value: 4.5},
    {label: '5 giờ', value: 5},
    {label: '5.5 giờ', value: 5.5},
    {label: '6 giờ', value: 6},
    {label: '6.5 giờ', value: 6.5},
    {label: '7 giờ', value: 7},
    {label: '7.5 giờ', value: 7.5},
    {label: '8 giờ', value: 8},
  ];

  const onPressItem = (item, hideOverlay) => {
    hideOverlay && hideOverlay();
    setTime(item.value);
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
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag">
        <View style={styles.detail}>
          <View style={styles.row}>
            <View style={styles.img}>
              <Image source={imgs.reason} style={styles.imageStamp} />
            </View>
            <Text style={styles.txtStatus}>Nội dung</Text>
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
            onBlur={unFocus}
            blurOnSubmit={true}
            rightIcon
          />

          {!reason && show ? (
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
            </Card>
          ) : null}

          <Card style={styles.card}>
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
                  {moment(hour).format('HH:mm')}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.row,
                {justifyContent: 'space-between', alignItems: 'center'},
              ]}>
              <View style={styles.img}>
                <Image
                  source={imgs.startTime}
                  style={[styles.imageStamp, {marginRight: 8}]}
                />
                <Text style={styles.txtStatus}>{langs.timeOT}</Text>
              </View>
              <SelectButton
                dropdownHeight={40}
                dropdownWidth={260}
                renderDropdown={renderDropdown}>
                <View style={styles.filter}>
                  <Text>{`${time} giờ`}</Text>
                  <Text>▼</Text>
                </View>
              </SelectButton>
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
        {showModal ? (
          mode === 'time' ? (
            <PickerCustom
              value={hour}
              onChange={onChangeHour}
              onPress={onUnshow}
              mode={'time'}
              show={showModal}
              locale={'en-GB'}
            />
          ) : mode === 'day' ? (
            <PickerCustom
              value={day}
              onChange={onChangeDay}
              onPress={onUnshow}
              mode={'date'}
              show={showModal}
              minimumDate={new Date()}
            />
          ) : null
        ) : null}
        <Button
          title={'Hoàn thành'}
          containerStyle={styles.complete}
          onPress={onSetOverTime}
        />
      </ScrollView>
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
    marginTop: 8,
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
    width: wp(72),
    height: 40,
    alignSelf: 'center',
  },
  btUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowUser: {
    flexDirection: 'row',
    marginVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  lineUser: {
    height: StyleSheet.hairlineWidth,
    width: widthPercentageToDP(70),
    alignSelf: 'center',
    backgroundColor: 'grey',
  },
  textUser: {
    marginLeft: 24,
    fontSize: 16,
    fontWeight: '500',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 32,
  },
  column: {
    flexDirection: 'column',
  },
  textPos: {
    marginLeft: 24,
    fontSize: 12,
  },
  viewInputSelect: {
    backgroundColor: Colors.white,
  },
  filter: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
