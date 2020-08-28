import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { Colors, imgs } from '../../../../../utlis';

LocaleConfig.locales.vn = {
  // monthNames: [
  //   'Tháng 1',
  //   'Tháng 2',
  //   'Tháng 3',
  //   'Tháng 4',
  //   'Tháng 5',
  //   'Tháng 6',
  //   'Tháng 7',
  //   'Tháng 8',
  //   'Tháng 9',
  //   'Tháng 10',
  //   'Tháng 11',
  //   'Tháng 12',
  // ],
  monthNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
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
  dayNames: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'],
  dayNamesShort: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
  today: 'Hôm nay',
};
LocaleConfig.defaultLocale = 'vn';

const DATA = [
  { type: 'break', day: '2020-08-02' },
  { type: 'noCheckout', day: '2020-08-03' },
  { type: 'late', day: '2020-08-04' },
  { type: 'ontime', day: '2020-08-05' },
  { type: 'late', day: '2020-08-06' },
];

const CalendarCustom = (props) => {
  const today = moment().format('YYYY-MM-DD');
  const [selected, setSelected] = useState('');
  const [type, setType] = useState({});
  const onDayPress = (day) => {
    setSelected(day.dateString);
    console.log('Day=>>');
  };

  useEffect(() => {
    var obj = {};
    for (var i = 0; i < DATA.length; i++) {
      if (DATA[i].type === 'late') {
        obj = {
          [DATA[i].day]: { selectedColor: 'orange', selected: true },
          ...obj,
        };
      }
      if (DATA[i].type === 'ontime') {
        obj = {
          [DATA[i].day]: { selectedColor: Colors.background, selected: true },
          ...obj,
        };
      }
      if (DATA[i].type === 'noCheckout') {
        obj = {
          [DATA[i].day]: { selectedColor: 'purple', selected: true },
          ...obj,
        };
      }
      if (DATA[i].type === 'break') {
        obj = {
          [DATA[i].day]: { selectedColor: 'red', selected: true },
          ...obj,
        };
      }
    }
    setType(obj);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}>Lịch sử chấm công</Text>
      </View>
      <Calendar
        style={styles.calendar}
        hideExtraDays
        onDayPress={onDayPress}
        firstDay={0}
        renderHeader={(date) => {
          const header = date.toString('MMMM yyyy');
          const [month, year] = header.split(' ');
          return (
            <View style={styles.monthFormat}>
              <Text style={styles.textStyle}>{`Tháng ${month} -`}</Text>
              <Text style={styles.textStyle}>{` ${year}`}</Text>
            </View>
          );
        }}
        markedDates={{
          ...type,
          [today]: {
            selected: true,
            selectedColor: Colors.white,
            selectedTextColor: Colors.background,
            dotColor: Colors.background,
            marked: true,
          },
        }}
      />
    </View>
  );
};

export default CalendarCustom;

const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: 'row',
  },
  calendar: {
    marginBottom: 10,
    width: widthPercentageToDP(100),
    // borderWidth: 0.25,
    // borderColor: 'gray',
  },
  text: {
    padding: 10,
    fontSize: 25,
    fontWeight: '500',
    marginLeft: 20, marginBottom: 10
  },
  monthFormat: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.background,
    textAlign: 'center',
    alignSelf: 'center',
  },
  img: {
    alignSelf: 'center',
    marginLeft: 16,
    width: 32,
    height: 32,
  },
});
