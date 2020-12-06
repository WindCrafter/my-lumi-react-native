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
  Alert
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
// import {_global} from '../../../../utlis/global/global';
import {Calendar} from 'react-native-calendars';

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
  const [exception, setException] = useState(true);
  const {navigation, takeLeave, userId, token, assign} = props;
  const [shift, setShift] = useState(new Date());

  const [mode, setMode] = useState('');
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [typeShift, setTypeShift] = useState('Ca sáng');
  const [typeBreak, setTypeBreak] = useState('Theo ca');
  const [reason, setReason] = useState('');

  const DISABLED_DAYS = ['Sunday'];
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
  const initialState = {
    ...getDaysInMonth(moment().month(), moment().year(), DISABLED_DAYS),
    [_today]: {
      selected: true,
      day: _today,
    },
  };
  // console.log('initialState : ', initialState);
  const [_markedDates, setMarkedDates] = useState(initialState);
  // const assignTo = assign.map((e) => {
  //   return e.userId;
  // });
  const onComplete = () => {
    if (!reason) {
      Alert.alert('Chưa điền lí do!');
      return;
    } 
    typeBreak === 'Theo ca'
      ? onTakeLeaveShift()
      : typeBreak === 'Theo ngày'
      ? onTakeLeaveDay()
      : null;
  };

  const onTakeLeaveDay = () => {
    const newarray = [];
    let array = Object.keys(_markedDates);
    array.forEach((element) => {
      if (_markedDates[element].selected) {
        newarray.push(_markedDates[element].day);
      }
    });
    console.log(newarray);
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
    const data = {
      token: token,
      date: moment(shift).format('DD/MM/YYYY'),
      type: 1,
      content: reason,
      status: 1,
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

    if (!_markedDates[selectedDay]) {
      let selected = true;
      const updatedMarkedDates = {
        ..._markedDates,
        ...{[selectedDay]: {selected, day: selectedDay}},
      };
      console.log('updatedMarkedDates', updatedMarkedDates);
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
