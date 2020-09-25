import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import {Colors} from '../../../../utlis';
import {BarStatus} from '../../../component';
import {Agenda} from 'react-native-calendars';
import moment from 'moment';

const Book = (props) => {
  const [items, setItems] = useState({});
  // const [date, setdate] = useState('2020:09:10');

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };
  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };
  const renderEmptyDate = () => {
    <View style={styles.emptyDate}>
      <Text>This is empty date!</Text>
    </View>;
  };
  // const renderItem = (item) => {
  //   <View style={{height: 250}} />;
  // };
  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };
  const getMonthData = () => {
    let loadingData = true;
    let dataToReturn = {
      '2020-06-07': [
        {
          name: 'Whats up Food Stuff',
          start: '2020-06-09T13:45:00',
          end: '2020-06-09 19:45',
        },
        {
          name: 'Whats up second Stuff',
          start: '2020-06-09T18:45:00',
          end: '2020-06-09 21:45',
        },
      ],

      '2020-06-08': [
        {
          name: 'Whats up Food Stuff',
          start: '2020-06-09T13:45:00',
          end: '2020-06-09 19:45',
        },
        {
          name: 'Whats up second Stuff',
          start: '2020-06-09T18:45:00',
          end: '2020-06-09 21:45',
        },
      ],
    };
    return [dataToReturn, false];
  };
  const [monthData, loadingData] = getMonthData()
  const renderItem = (item, firstItemInDay) => {
    console.log('rendering', item)
    return (
      <TouchableOpacity>
        <>
          <Text style={{ color: 'red' }}>{moment(item.start).format("hh:mm a")}</Text>
          <Text style={{ color: '#555' }}>{item.name}</Text>
        </>
      </TouchableOpacity>
    );
  }


  if (loadingData || !monthData) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    )
  }
  return (
    <>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={moment().format('YYYY-MM-DD')}
        // renderItem={renderItem}
        renderItem={(item, firstItemInDay) => { return (renderItem(item, firstItemInDay)) }}

        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        // markingType={'period'}
        // markedDates={{
        //    '2020-05-08': {textColor: '#43515c'},
        //    '2020-05-09': {textColor: '#43515c'},
        //    '2020-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2020-05-21': {startingDay: true, color: 'blue'},
        //    '2020-05-22': {endingDay: true, color: 'gray'},
        //    '2020-05-24': {startingDay: true, color: 'gray'},
        //    '2020-05-25': {color: 'gray'},
        //    '2020-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        // renderDay={(day, item) => (<Text>hehe</Text>)}
        // hideExtraDays={true}
        // hideKnob={true}
        // onRefresh={() => console.log('refreshing...')}
        style={{marginTop: 40}}
      />
    </>
  );
};
const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 100,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 320,
  },
});
export default Book;
