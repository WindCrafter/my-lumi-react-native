import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Agenda } from 'react-native-calendars';
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
} from 'react-native-calendars';
import { Colors, imgs } from '../../../../../utlis';
import moment from 'moment';
import { Card } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

const HistoryWeek = (props) => {
  const today = moment().format('YYYY-MM-DD');
  const { item, timeIn, timeOut, type } = props;
  const getTheme = () => {
    return {
      // selected date
      selectedDayBackgroundColor: Colors.background,
      selectedDayTextColor: 'white',
    };
  };

  const onDayPress = (val) => {
    console.log(val);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={imgs.contract} style={styles.img} />
        <Text style={styles.txtManager}>Lịch sử trong tuần:</Text>
      </View>
      <CalendarProvider date={new Date()} disabledOpacity={0.6}>
        <ExpandableCalendar
          hideArrows
          disablePan={true}
          theme={getTheme()}
          style={styles.calendar}
          disableWeekScroll={true}
          disableAllTouchEventsForDisabledDay
          firstDay={1}
          dayPress={(value) => onDayPress(value)}
          callMonth={'Tháng'}
          headerTitleStyle={styles.txtHeader}
        />
      </CalendarProvider>
      <View style={[styles.row, { justifyContent: 'space-between' }]}>
        <Card style={styles.card}>
          <Icon color={Colors.background} name={'arrow-right'} size={20} />
          <Text style={styles.txtTime}>{timeIn ? timeIn : '--:--'}</Text>
        </Card>
        <Card style={styles.card}>
          <Icon color={'#008aee'} name={'arrow-left'} size={20} />
          <Text style={styles.txtTime}>{timeOut ? timeOut : '--:--'}</Text>
        </Card>
        <View style={styles.type}>
          <Text style={styles.txtType}>{type ? type : '????'}</Text>
        </View>
      </View>
    </View>
  );
};
export default HistoryWeek;

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  calendar: {
    shadowColor: 'white',
    marginBottom: -16,
  },
  txtHeader: {
    color: Colors.background,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  img: {
    width: 18,
    height: 18,
  },
  txtManager: {
    fontSize: 20,
    marginLeft: 8,
    fontWeight: 'normal',
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 24,
    flexDirection: 'row',
    marginRight: 16,
  },
  txtTime: {
    marginLeft: 4,
    fontSize: 16,
  },
  type: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    width: 90,
    borderRadius: 24,
    flexDirection: 'row',
    backgroundColor: Colors.background,
  },
  txtType: {
    color: Colors.white,
    fontSize: 16,
  },
});
