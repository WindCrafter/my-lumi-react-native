import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Platform,
  LayoutAnimation,
  Image,
  SafeAreaView,
} from 'react-native';
import {TextSelect, Button, PickerCustom} from '../../../../component';
import {Calendar} from 'react-native-calendars';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors, imgs} from '../../../../../utlis';
import moment from 'moment';
const _format = 'YYYY-MM-DD';
const _today = moment().format(_format);
const _maxDate = moment().add(90, 'days').format(_format);

const TimeModal = (props) => {
  const {setModal, showModal, onComplete} = props;
  const [showModalTimeStart, setshowModalTimeStart] = useState(false);
  const [showModalTimeEnd, setshowModalTimeEnd] = useState(false);

  const [hourStart, setHourStart] = useState(moment()._d);
  const [hourEnd, setHourEnd] = useState(moment()._d);

  const [loop, setLoop] = useState('');
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
  const initialState = {
    ...getDaysInMonth(moment().month(), moment().year(), DISABLED_DAYS),
    [_today]: {
      selected: true,
      day: _today,
    },
  };
  // console.log('initialState : ', initialState);
  const [_markedDates, setMarkedDates] = useState(initialState);

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
  const onChangeHourStart = (event, selectedShift) => {
    const currentShift = selectedShift || hourStart;
    setshowModalTimeStart(Platform.OS === 'ios');
    setHourStart(moment(currentShift)._d);
  };
  const onChangeHourEnd = (event, selectedShift) => {
    const currentShift = selectedShift || hourEnd;
    setshowModalTimeEnd(Platform.OS === 'ios');
    setHourEnd(moment(currentShift)._d);
  };
  const onUnshowStart = () => {
    setshowModalTimeStart(false);
  };
  const [start, setStart] = useState(moment()._d);
  const [end, setEnd] = useState(moment()._d);
  const onUnshowEnd = () => {
    setshowModalTimeEnd(false);
  };
  const onConfirmStart = () => {
    setshowModalTimeStart(false);
    setStart(hourStart);
  };
  const onConfirmEnd = () => {
    setshowModalTimeEnd(false);
    setEnd(hourEnd);
  };
  const onShowPickerStart = (m) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setshowModalTimeStart(true);
  };
  const onShowPickerEnd = (m) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setshowModalTimeEnd(true);
  };
  const onSetWeek = () => {
    if (loop === 'week') {
      setLoop('');
    } else {
      setLoop('week');
    }
  };
  const onSetMonth = () => {
    if (loop === 'month') {
      setLoop('');
    } else {
      setLoop('month');
    }
  };
  const onSetYear = () => {
    if (loop === 'year') {
      setLoop('');
    } else {
      setLoop('year');
    }
  };
  return (
    <View>
      <Modal
        isVisible={showModal}
        animationIn={'slideInUp'}
        animationOutTiming={500}
        animationOut={'slideOutDown'}
        onBackdropPress={setModal}
        style={styles.modal}
        backdropTransitionOutTiming={0}>
        <View style={styles.scrollViewTop}>
          <SafeAreaView>
            <ScrollView
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={true}
              scrollEnabled={true}>
              <View style={styles.container}>
                <View style={styles.modalCalendar}>
                  <View style={styles.viewTitle}>
                    <View style={styles.viewTop}>
                      <Text style={styles.titleCalendar}>Chọn ngày</Text>
                    </View>
                    <View style={styles.viewTop} />
                  </View>
                  <Calendar
                    style={styles.viewCalendar}
                    minDate={_today}
                    maxDate={_maxDate}
                    // hideArrows={true}

                    onDayPress={onDaySelect}
                    markedDates={_markedDates}
                    onMonthChange={(date) => {
                      setMarkedDates(
                        getDaysInMonth(
                          date.month - 1,
                          date.year,
                          DISABLED_DAYS,
                        ),
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
                </View>
                <View style={styles.viewTitle}>
                  <View style={styles.viewTop}>
                    <Text style={styles.titleCalendar}>Chọn giờ</Text>
                  </View>
                  <View style={styles.viewTop} />
                </View>
                <View style={styles.viewMiddle}>
                  <Text style={styles.direction}>Từ</Text>
                  <TouchableOpacity
                    style={styles.boxTime}
                    onPress={onShowPickerStart}>
                    <Text>{moment(start).format('HH:mm')}</Text>
                    <Image source={imgs.roudedDown} style={styles.down} />
                  </TouchableOpacity>

                  <Text style={styles.direction}>đến</Text>
                  <TouchableOpacity
                    style={styles.boxTime}
                    onPress={onShowPickerEnd}>
                    <Text>{moment(end).format('HH:mm')}</Text>
                    <Image source={imgs.roudedDown} style={styles.down} />
                  </TouchableOpacity>
                </View>
                <View style={styles.viewTitle}>
                  <View style={styles.viewTop}>
                    <Text style={styles.titleCalendar}>Lặp lại</Text>
                  </View>
                  <View style={styles.viewTop} />
                </View>

                <View style={styles.containerWeek}>
                  <TouchableOpacity onPress={onSetWeek} style={styles.viewWeek}>
                    <Image
                      style={styles.timeImage}
                      source={loop === 'week' ? imgs.correct : imgs.uncorrect}
                    />
                    <Text>Tuần</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={onSetMonth}
                    style={styles.viewWeek}>
                    <Image
                      style={styles.timeImage}
                      source={loop === 'month' ? imgs.correct : imgs.uncorrect}
                    />
                    <Text>Tháng</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onSetYear} style={styles.viewWeek}>
                    <Image
                      style={styles.timeImage}
                      source={loop === 'year' ? imgs.correct : imgs.uncorrect}
                    />
                    <Text>Năm</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.complete} onPress={onComplete}>
                  <Text style={styles.txtComplete}>Áp dụng</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
        {showModalTimeStart ? (
          <PickerCustom
            value={hourStart}
            onChange={onChangeHourStart}
            onPress={onConfirmStart}
            mode={'time'}
            show={showModalTimeStart}
            locale={'en-GB'}
            onHideModal={onUnshowStart}
          />
        ) : null}
        {showModalTimeEnd ? (
          <PickerCustom
            value={hourEnd}
            onChange={onChangeHourEnd}
            onPress={onConfirmEnd}
            mode={'time'}
            show={showModalTimeEnd}
            locale={'en-GB'}
            onHideModal={onUnshowEnd}
          />
        ) : null}
      </Modal>
    </View>
  );
};

export default TimeModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 0,
  },

  modalCalendar: {
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  titlemodal: {
    fontWeight: '500',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  titleCalendar: {
    fontWeight: '500',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 16,
  },
  titleNext: {
    marginTop: 20,
    marginBottom: 10,
    color: 'blue',
    fontSize: 16,
  },

  viewCalendar: {
    width: wp(90),
  },
  container: {width: '100%'},
  viewTop: {width: wp(40), alignItems: 'flex-start', paddingLeft: 16},
  viewTitle: {
    flexDirection: 'row',
    width: wp(100),
    alignSelf: 'center',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  scrollViewTop: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    height: hp(72),
    borderTopRightRadius: 16,
  },
  boxTime: {
    width: 112,
    height: 42,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  viewMiddle: {
    flexDirection: 'row',

    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  containerWeek: {
    flexDirection: 'row',
    justifyContent: 'space-around',

    paddingHorizontal: 32,
  },
  viewWeek: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeImage: {
    marginRight: 4,
    width: 24,
    height: 24,
    tintColor: '#abb0bb',
  },
  complete: {
    width: 128,
    height: 36,
    borderRadius: 16,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  down: {width: 16, height: 16, marginLeft: 8, tintColor: '#abb0bb'},
  txtComplete: {color: Colors.white},
  direction: {fontSize: 16, color: '#abb0bb', paddingHorizontal: 4},
});
