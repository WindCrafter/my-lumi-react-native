import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {BarStatus} from '../../../component';
import {Agenda} from 'react-native-calendars';
import moment from 'moment';
import HeaderAccount from './component/HeaderAccount';
import ActionButton from 'react-native-action-button';
import {imgs} from '../../../../utlis';

//test calendar

// const _format = 'YYYY-MM-DD';
// const today = moment().format(format);
// const maxDate = moment().add(15, 'days').format(format);

///

const Book = (props) => {
  ///calendar
  // const initialState = {
  //   [today]: {selected: true, day: today},
  // };
  // const [_markedDates, setMarkedDates] = useState(initialState);
  // const [choosenDate, setChoosenDate] = useState({});

  ///calendar
  // const onDaySelect = (day) => {
  // const exsits = _markedDates[day.dateString];
  // let newMark = _markedDates;
  // if (!exsits) {
  //   newMark[day.dateString] = {day: day.dateString, selected: true};
  //   setMarkedDates(newMark);

  // } else {
  //   delete newMark[day.dateString];
  //   setMarkedDates(newMark);
  //   console.log(newMark)
  // }
  // setMarkedDates({
  //   ..._markedDates,
  //   [day.dateString]: {
  //     day: day.dateString,
  //     selected: !_markedDates[day.dateString].selected,
  //   },
  // });

  // const selectedDay = moment(day.dateString).format(format);
  // let daySelect = {};
  // let selected = true;
  // if (markedDates[selectedDay]) {
  //   selected = !markedDates[selectedDay].selected;
  // }
  // console.log(markedDates[selectedDay]);

  // const updatedMarkedDates = {
  //   ..._markedDates,
  //   ...{[day]: day, [_selectedDay]: {selected}},
  // };
  // // if (!markedDates[selectedDay].selected) {
  // //   daySelect = [ Object.keys(_markedDates)];
  // // }

  // const array = Object.keys(_markedDates);
  // // console.log('111111',.find(markedDates, ['selected', false]),_markedDates)
  // console.log('aaa', array);
  // // daySelect= {
  // //   ...daySelect,
  // //   test: .find(markedDates, ['active', false])
  // // }
  // // Triggers component to render again, picking up the new state
  // setMarkedDates(newMark);
  // setChoosenDate(newMark);

  ///test calendar

  // const selectedDay = moment(day.dateString).format(format);

  // let selected = true;
  // if (markedDates[selectedDay]) {
  //   selected = !markedDates[selectedDay].selected;
  // }
  // const updatedMarkedDates = {
  //   ..._markedDates,
  //   ...{[selectedDay]: {selected, day: selectedDay}},
  // };
  // //
  // const newarray = [];
  // let array = Object.keys(updatedMarkedDates);
  // array.forEach((element) => {
  //   if (updatedMarkedDates[element].selected) {
  //     newarray.push(updatedMarkedDates[element].day);
  //   }
  // });

  // console.log('hey', newarray);
  // setMarkedDates(updatedMarkedDates);

  // };
  ////
  const {navigation} = props;
  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  const renderEmptyItem = () => {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned</Text>
      </View>
    );
  };
  const renderItem = (item) => {
    // if (_.isEmpty(item)) {
    //   return renderEmptyItem();
    // }

    return (
      <TouchableOpacity style={styles.item}>
        <View>
          <Text style={styles.itemDurationText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const item = {
    '2020-11-28': {day: '2020-11-28', selected: true},
    '2020-12-23': [{name: 'item 2 - any js object', height: 80}],
    '2020-11-24': [],
    '2020-11-25': [{name: 'item 3 - any js object'}],
    '2020-11-01': [{name: 'item 1 - any js object'}],
    '2020-11-02': [{name: 'item 2 - any js object', height: 80}],
    '2020-11-03': [],
    '2020-12-04': [{name: 'item 3 - any js object'}],
  };
  const onMoveToEvent = () => {
    console.log('----- < > __');
    navigation.navigate('Sự kiện mới');
  };

  return (
    <>
      <BarStatus />
      <HeaderAccount />
      <View style={styles.header}>
        <View style={styles.week}>
          <Text style={styles.txtHeader}>{'Lịch tuần'}</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.txtHeader}>{'Lịch ngày'}</Text>
        </View>
        <View style={styles.meeting}>
          <Text style={styles.txtHeader}>{'Phòng họp'}</Text>
        </View>
      </View>
      <Agenda
        items={item}
        firstDay={1}
        selected={moment().format('YYYY-MM-DD')}
        renderItem={renderItem}
        rowHasChanged={rowHasChanged}
        renderEmptyData={renderEmptyItem}
      />

      {/* <Calendar
        minDate={_today}
        maxDate={_maxDate}
        // hideArrows={true}

        onDayPress={onDaySelect}
        markedDates={_markedDates}
      /> */}
      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item
          buttonColor="white"
          title="Tạo phòng họp"
          onPress={onMoveToEvent}>
          <Image source={imgs.meeting} style={styles.img} />
        </ActionButton.Item>
      </ActionButton>
    </>
  );
};
const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 16,
    marginTop: 32,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 320,
  },
  itemHourText: {
    color: 'black',
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e8ecf0',
  },
  emptyItemText: {
    color: '#79838a',
    fontSize: 14,
  },
  txtHeader: {
    textAlign: 'center',
  },
  meeting: {
    width: '25%',
    height: 48,
    borderBottomRightRadius: 23,
    borderTopRightRadius: 23,
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    justifyContent: 'center',
  },
  day: {
    width: '25%',
    height: 48,
    backgroundColor: '#008aee',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    justifyContent: 'center',
  },
  week: {
    width: '25%',
    height: 48,
    borderBottomLeftRadius: 23,
    borderTopLeftRadius: 23,
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 27,
  },
  img: {
    tintColor: '#008aee',
  },
});
export default Book;
