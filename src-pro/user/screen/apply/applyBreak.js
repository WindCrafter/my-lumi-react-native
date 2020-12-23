/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
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
  Keyboard,
  FlatList,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import InputApply from '../../../component/Input/inputApply';
import langs from '../../../../common/language';
import {BarStatus, HeaderCustom, Button, InputSelect} from '../../../component';
import {imgs, Colors} from '../../../../utlis';
import {Card} from 'native-base';
import ApplyIcon from './component/ApplyIcon';
import PickerCustom from './component/PickerCustom';
import Suggest from './component/Suggest';
import {_global} from '../../../../utlis/global/global';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
LocaleConfig.locales.vn = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    'TH1',
    'TH2',
    'TH3',
    'TH4',
    'TH5',
    'TH6',
    'TH7',
    'TH8',
    'TH9',
    'TH10',
    'TH11',
    'TH12',
  ],
  dayNames: ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  today: 'Hôm nay',
};
LocaleConfig.defaultLocale = 'vn';

function ApplyBreak(props) {
  const _format = 'YYYY-MM-DD';
  const _today = moment().format(_format);
  const _maxDate = moment().add(90, 'days').format(_format);
  const [exception, setException] = useState(true);
  const {navigation, takeLeave, userId, token, assign} = props;
  const [shift, setShift] = useState(new Date());

  const [mode, setMode] = useState('');
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [typeShift, setTypeShift] = useState('Buổi sáng');
  const [typeBreak, setTypeBreak] = useState('Theo buổi');
  const [reason, setReason] = useState('');

  const DISABLED_DAYS = ['Saturday', 'Sunday'];

  const getDaysInMonth = (month, year, days) => {
    let pivot = moment().month(month).year(year).startOf('month');
    const end = moment().month(month).year(year).endOf('month');

    let dates = {..._markedDates};
    const disabled = {disabled: true};
    while (pivot.isBefore(end)) {
      days.forEach((day) => {
        dates[pivot.day(day).format('YYYY-MM-DD')] = disabled;
      });
      pivot.add(7, 'days');
    }

    return dates;
  };
  // const checkToday = () => {
  //   var myDate = new Date();
  //   if ( myDate.getDay() == 0) setException(false);
  // console.log('checkexception')
  // }

  const initialState = !DISABLED_DAYS.includes(
    moment(_today, _format).format('dddd'),
  )
    ? {
        ...getDaysInMonth(moment().month(), moment().year(), DISABLED_DAYS),
        [_today]: {
          selected: true,
          day: _today,
        },
      }
    : getDaysInMonth(moment().month(), moment().year(), DISABLED_DAYS);
  // console.log('initialState : ', initialState);
  const [_markedDates, setMarkedDates] = useState(initialState);
  // const assignTo = assign.map((e) => {
  //   return e.userId;
  // });
  const onComplete = () => {
    Keyboard.dismiss();
    if (!reason) {
      _global.Alert.alert({
        title: langs.alert.remind,
        message: 'Vui lòng điền lí do xin nghỉ',
        messageColor: Colors.danger,
        leftButton: {text: langs.alert.ok},
      });
      return;
    }
    typeBreak === 'Theo buổi' && moment(shift).format('dddd') !== 'Sunday'
      ? onTakeLeaveShift()
      : typeBreak === 'Theo ngày'
      ? onTakeLeaveDay()
      : _global.Alert.alert({
          title: langs.alert.remind,
          message: 'Chủ nhật không cần xin nghỉ ^^',
          messageColor: Colors.black,
          leftButton: {text: langs.alert.ok},
        });
  };

  const onTakeLeaveDay = () => {
    const newarray = [];
    let object = [];
    let array = Object.keys(_markedDates);
    array.forEach((element) => {
      if (_markedDates[element].selected) {
        newarray.push(moment(_markedDates[element].day).format('DD/MM/YYYY'));
      }
    });
    newarray.forEach((i) => {
      let [date1, month1, year1] = i.split('/');
      if (!object.includes(`${month1}/${year1}`)) {
        object.push(`${month1}/${year1}`);
      }
    });

    const data = {
      token: token,
      content: reason,
      date: newarray,
      type: 2,
      morning: 0,
      month: object,
    };

    takeLeave(data);
  };
  const onTakeLeaveShift = () => {
    const data = {
      token: token,
      date: moment(shift).format('DD/MM/YYYY').split(' '),
      type: 1,
      content: reason,
      morning: typeShift === 'Buổi sáng' ? 1 : 2,
      month: moment(shift).format('MM/YYYY').split(' '),
    };
    takeLeave(data);
  };
  const goBack = () => {
    navigation.goBack();
  };
  const onUnshow = () => {
    Platform.OS === 'ios'
      ? LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
      : null;
    setShow(false);
    setMode('');
  };
  const onChangeShift = (event, selectedShift) => {
    const currentShift = selectedShift || shift;
    setShow(Platform.OS === 'ios');
    setShift(currentShift);
  };

  const onSetTypeBreak = (val) => {
    setTypeBreak(val);
    onUnshow();
    unFocus();
  };
  const onShow = (m) => {
    Platform.OS === 'ios'
      ? LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
      : null;
    setShow(true);
    setMode(m);
  };

  const onChangeReason = (val) => {
    setReason(val);
  };

  const onSetReason = (val) => {
    setReason(val);
    unFocus();
  };

  const onSetTypeShift = () => {
    if (moment().format('dddd') !== 'Saturday') {
      typeShift === 'Buổi sáng'
        ? setTypeShift('Buổi chiều')
        : setTypeShift('Buổi sáng');
    } else {
      setTypeShift('Buổi sáng');
    }
  };

  const onFocus = () => {
    Platform.OS === 'ios'
      ? LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      : null;
    setShowModal(true);
  };

  const unFocus = () => {
    Platform.OS === 'ios'
      ? LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      : null;
    setShowModal(false);
    Keyboard.dismiss();
  };

  const onDaySelect = (day) => {
    const selectedDay = moment(day.dateString).format(_format);

    if (!_markedDates[selectedDay]) {
      let selected = true;
      const updatedMarkedDates = {
        ..._markedDates,
        ...{[selectedDay]: {selected, day: selectedDay}},
      };
      setMarkedDates(updatedMarkedDates);
    } else {
      if (!_markedDates[selectedDay].disabled) {
        let selected = !_markedDates[selectedDay].selected;
        const updatedMarkedDates = {
          ..._markedDates,
          ...{[selectedDay]: {selected, day: selectedDay}},
        };
        setMarkedDates(updatedMarkedDates);
      }
    }
  };

  const renderItem = ({item}) => {
    return (
      <>
        <View style={styles.btUser}>
          <View style={styles.rowUser}>
            <View style={styles.viewImage}>
              <Image
                source={require('../../../../naruto.jpeg')}
                style={styles.avatar}
                resizeMode={'cover'}
              />
            </View>
            <View style={styles.column}>
              <Text style={styles.textUser}>{item.name}</Text>
              {/* <Text style={styles.textPos}>{item.pos}</Text> */}
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 46 : StatusBar.currentHeight}
      />
      <HeaderCustom
        title={'Đơn xin nghỉ phép'}
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
            <Text style={styles.txtStatus}>{langs.reasonWhyBreak}</Text>
          </View>
          <InputApply
            borderRadius={12}
            backgroundColor={'white'}
            containerStyle={{
              width: '90%',
              height: 72,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            value={reason}
            onChangeText={onChangeReason}
            onFocus={onFocus}
            onSubmitEditing={unFocus}
            onBlur={unFocus}
            blurOnSubmit={true}
            rightIcon
          />
          {!reason && showModal ? (
            <Card style={styles.card}>
              <Suggest
                detail={'Bị ốm.'}
                onPress={() => onSetReason('Bị ốm.')}
              />
              <Suggest
                detail={'Đi công tác.'}
                onPress={() => onSetReason('Đi công tác.')}
              />
              <Suggest
                detail={'Lí do cá nhân.'}
                onPress={() => onSetReason('Lí do cá nhân.')}
              />
            </Card>
          ) : null}

          <View style={styles.row}>
            <View style={styles.img}>
              <Image source={imgs.startDate} style={styles.imageStamp} />
            </View>
            <Text style={styles.txtStatus}>{langs.howLongBreak}</Text>
          </View>
          <Card style={styles.card}>
            <View style={styles.row}>
              <ApplyIcon
                title={'Nửa ngày'}
                onPress={() => onSetTypeBreak('Theo buổi')}
                tintColor={
                  typeBreak === 'Theo buổi' ? Colors.background : 'grey'
                }
                source={imgs.breakShift}
              />
              <ApplyIcon
                title={'Theo ngày'}
                onPress={() => onSetTypeBreak('Theo ngày')}
                tintColor={
                  typeBreak === 'Theo ngày' ? Colors.background : 'grey'
                }
                source={imgs.breakOneDay}
              />
            </View>
            {typeBreak === 'Theo buổi' ? (
              <View style={[styles.row, {alignSelf: 'center', marginTop: 32}]}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      width: wp(35),
                      marginRight: 10,
                      backgroundColor: Colors.white,
                      flexDirection: 'row',
                    },
                  ]}
                  onPress={onSetTypeShift}>
                  <Image source={imgs.startTime} style={styles.imageStamp} />

                  <Text style={styles.txtTime}>{typeShift}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: Colors.white,
                    },
                  ]}
                  onPress={() => onShow('shift')}>
                  <Image source={imgs.breakDay} style={styles.imageStamp} />

                  <Text style={styles.txtTime}>
                    {moment(shift).format('DD/MM/YYYY')}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : typeBreak === 'Theo ngày' ? (
              <Calendar
                minDate={_today}
                maxDate={_maxDate}
                // hideArrows={true}

                onDayPress={onDaySelect}
                markedDates={_markedDates}
                style={{
                  marginTop: 8,
                }}
                onMonthChange={(date) => {
                  setMarkedDates(
                    getDaysInMonth(date.month - 1, date.year, DISABLED_DAYS),
                    _markedDates,
                  );
                }}
                enableSwipeMonths={true}
                theme={{
                  textDayFontFamily: 'quicksand',
                  textMonthFontFamily: 'quicksand',
                  textDayHeaderFontFamily: 'quicksand',
                  textDayFontWeight: '400',
                  textDayHeaderFontWeight: '500',
                  textDayFontSize: 16,
                  textMonthFontSize: 20,
                  textDayHeaderFontSize: 16,
                  selectedDayTextColor: 'white',
                }}
              />
            ) : null}
          </Card>
        </View>
        {mode === 'shift' ? (
          <PickerCustom
            value={shift}
            onChange={onChangeShift}
            onPress={onUnshow}
            mode={'date'}
            show={show}
            minimumDate={new Date()}
          />
        ) : null}

        <Button
          title={'Hoàn thành '}
          containerStyle={styles.complete}
          onPress={onComplete}
        />
      </ScrollView>
    </View>
  );
}

export default ApplyBreak;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 32,
  },
  detail: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginVertical: 32,
  },
  img: {
    padding: 8,
    borderRadius: 16,
    alignSelf: 'center',
    marginRight: 8,
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
  button: {
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    flexDirection: 'row',
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
  row: {
    flexDirection: 'row',
  },
  txtTime: {
    fontSize: 14,
    color: Colors.black,
    marginLeft: 10,
  },
  rowBot: {
    flexDirection: 'row',
    marginHorizontal: 4,
    marginTop: 16,
    justifyContent: 'space-around',
    flex: 1,
  },
  columnShift: {
    alignItems: 'flex-start',
    // borderWidth: 1,
    justifyContent: 'space-around',
  },
  icon: {
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
});
