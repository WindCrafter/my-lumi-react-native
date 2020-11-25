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
} from 'react-native';
import {
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import _ from 'lodash';
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
import {Agenda, Calendar} from 'react-native-calendars';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function ApplyBreak(props) {
  const _format = 'YYYY-MM-DD';
  const _today = moment().format(_format);
  const _maxDate = moment().add(90, 'days').format(_format);

  const {navigation, takeLeave, userId, token, assign} = props;
  const [shift, setShift] = useState(new Date());
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [mode, setMode] = useState('');
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [typeShift, setTypeShift] = useState('Ca sáng');
  const [shiftStart, setShiftStart] = useState('Ca sáng');
  const [shiftEnd, setShiftEnd] = useState('Ca sáng');
  const [typeBreak, setTypeBreak] = useState('Theo ca');
  const [reason, setReason] = useState('');

  const DISABLED_DAYS = ['Saturday', 'Sunday'];
  const getDaysInMonth = (month, year, days) => {
    let pivot = moment().month(month).year(year).startOf('month');
    const end = moment().month(month).year(year).endOf('month');

    let dates = {};
    const disabled = {disabled: true};
    while (pivot.isBefore(end)) {
      days.forEach((day) => {
        dates[pivot.day(day).format('YYYY-MM-DD')] = disabled;
      });
      pivot.add(7, 'days');
    }

    return dates;
  };

  const [markedDates, setDates] = useState(
    getDaysInMonth(moment().month(), moment().year(), DISABLED_DAYS),
  );
  const initialState = {
    ...markedDates,
    [_today]: {
      selected: true,
      day: _today,
    },
  };
  console.log('initialState : ', initialState);
  const [_markedDates, setMarkedDates] = useState(initialState);

  // const assignTo = assign.map((e) => {
  //   return e.userId;
  // });
  const onComplete = () => {
    typeBreak === 'Theo ca'
      ? onTakeLeaveShift()
      : typeBreak === 'Theo ngày'
      ? onTakeLeaveDay()
      : null;
  };

  const onTakeLeaveDays = () => {
    console.log(userId);
    const DateStart = moment(dateStart).format('DD/MM/YYYY');
    const DateEnd = moment(dateEnd).format('DD/MM/YYYY');

    const data = {
      token: token,
      startDate: {
        date: DateStart,
        shift: shiftStart === 'Ca sáng' ? 'morning' : 'afternoon',
      },
      endDate: {
        date: DateEnd,
        shift: shiftEnd === 'Ca sáng' ? 'morning' : 'afternoon',
      },
      assignTo: assign ? assign.userId : null,
      description: reason,
      advance: {},
    };
    console.log('dataaaaaa', data);
    if (DateEnd >= DateStart) {
      takeLeave(data);
    } else {
      _global.Alert.alert({
        title: 'Vui lòng kiểm tra lại',
        message: 'Ngày kết thúc phải lớn hơn ngày bắt đầu.',
        messageColor: Colors.danger,
        leftButton: {text: 'OK'},
      });
    }
  };
  const onTakeLeaveDay = () => {
    const data = {
      token: token,
      startDate: {
        date: moment().format('DD/MM/YYYY'),
        shift: 'morning',
      },
      endDate: {
        date: moment().format('DD/MM/YYYY'),
        shift: 'afternoon',
      },
      assignTo: assign ? assign.userId : null,
      description: reason,
      advance: {},
    };
    console.log('dataaaaaa', data);

    takeLeave(data);
  };
  const onTakeLeaveShift = () => {
    console.log(userId);
    const data = {
      token: token,
      startDate: {
        date: moment(shift).format('DD/MM/YYYY'),
        shift: typeShift === 'Ca sáng' ? 'morning' : 'afternoon',
      },
      endDate: {
        date: null,
        shift: null,
      },
      assignTo: assign ? assign.userId : null,
      description: reason,
      advance: {},
    };
    console.log('dataaaaaa', data);
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
    console.log('markedDates :', markedDates);
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
    typeShift === 'Ca sáng'
      ? setTypeShift('Ca chiều')
      : setTypeShift('Ca sáng');
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

  const onGoAssignment = () => {
    navigation.navigate('Assignment');
  };

  const onDaySelect = (day) => {
    const selectedDay = moment(day.dateString).format(_format);
    console.log('dayselect', selectedDay);

    if (_.find(_markedDates, ['disabled', true])===undefined) {
      console.log('find',_markedDates[selectedDay])
      console.log('finding', _.find(_markedDates, ['disabled', true]));
      let selected = true;
      if (_markedDates[selectedDay]) {
        selected = !_markedDates[selectedDay].selected;
      }
      const updatedMarkedDates = {
        ..._markedDates,
        ...{[selectedDay]: {selected, day: selectedDay}},
      };
      console.log('updatedMarkedDates', updatedMarkedDates);
      //
      const newarray = [];
      let array = Object.keys(updatedMarkedDates);
      array.forEach((element) => {
        if (updatedMarkedDates[element].selected) {
          newarray.push(updatedMarkedDates[element].day);
        }
      });

      console.log('newarray', newarray);
      setMarkedDates(updatedMarkedDates);
      console.log('_markedDates :', _markedDates);
    } else {
      setMarkedDates(_markedDates);
      console.log('setMarkedDates(_markedDates)', _markedDates);
    }
  };

  const renderItem = ({item, index}) => {
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
                detail={'Đi chơi.'}
                onPress={() => onSetReason('Đi chơi.')}
              />
              <Suggest
                detail={'Đi khảo sát công trình.'}
                onPress={() => onSetReason('Đi khảo sát công trình.')}
              />
              <Suggest
                detail={'Lí do cá nhân.'}
                onPress={() => onSetReason('Lí do cá nhân.')}
              />
            </Card>
          ) : null}

          <InputSelect
            width={'90%'}
            leftImage={imgs.personal}
            borderRadius={32}
            rightImage={imgs.add}
            height={54}
            shadowColor={'white'}
            title={assign ? 'Đổi người phê duyệt ' : 'Chọn người phê duyệt'}
            padding={8}
            marginVertical={18}
            containerStyle={styles.viewInputSelect}
            onPressButton={onGoAssignment}
            shadowOpacity={0.1}
            marginRight={-30}
            color={'rgba(4, 4, 15, 0.45)'}
            detail={''}
          />
          {assign && (
            <Card style={[styles.card, {width: widthPercentageToDP(90) - 32}]}>
              <FlatList
                data={[assign]}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
              />
            </Card>
          )}
          <View style={styles.row}>
            <View style={styles.img}>
              <Image source={imgs.startDate} style={styles.imageStamp} />
            </View>
            <Text style={styles.txtStatus}>{langs.timeBreak}</Text>
          </View>
          <Card style={styles.card}>
            <View style={styles.row}>
              <ApplyIcon
                title={'Theo Ca'}
                onPress={() => onSetTypeBreak('Theo ca')}
                tintColor={typeBreak === 'Theo ca' ? Colors.background : 'grey'}
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
            {typeBreak === 'Theo ca' ? (
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
                  setDates(
                    getDaysInMonth(date.month - 1, date.year, DISABLED_DAYS),
                  );
                }}
                theme={{
                  textDayFontFamily: 'quicksand',
                  textMonthFontFamily: 'quicksand',
                  textDayHeaderFontFamily: 'quicksand',
                  textDayFontWeight: '600',
                  textMonthFontWeight: '400',
                  textDayHeaderFontWeight: '500',
                  textDayFontSize: 18,
                  textMonthFontSize: 22,
                  textDayHeaderFontSize: 18,
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
    backgroundColor: '#ffffff',
    height: '100%',
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 32,
  },
  detail: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginHorizontal: 12,
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
