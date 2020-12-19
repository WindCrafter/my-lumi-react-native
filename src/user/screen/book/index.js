import React, {useState, useEffect} from 'react';
import _ from 'lodash';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  Button,
  Platform,
  SafeAreaView,
} from 'react-native';
import {Agenda, Calendar} from 'react-native-calendars';
import moment from 'moment';
import ActionButton from 'react-native-action-button';
import {Card} from 'native-base';
import {Colors, imgs} from '../../../../utlis';
import {BarStatus} from '../../../component';
import HeaderAccount from './component/HeaderAccount';

const Book = (props) => {
  const {navigation, token, listRoom, listRoomBook} = props;
  const listArrayRoom = {};
  let newArray = [];
  listRoomBook.forEach((i) => {
    if (i.loop === 1) {
      let a = moment(i.date, 'DD-MM-YYYY').format();
      let end = moment(a).endOf('year').format();

      for (
        let index = a;
        index < end;
        index = moment(index).add(1, 'week').format()
      ) {
        newArray.push({...i, date: moment(index).format('DD-MM-YYYY')});
      }
    }
  });
  newArray = newArray.concat(listRoomBook);
  console.log('----', newArray);
  newArray.forEach((i) => {
    const [date, month, year] = i.date.split('-');
    if (listArrayRoom[`${year}-${month}-${date}`]) {
      listArrayRoom[`${year}-${month}-${date}`].push(i);
    } else {
      listArrayRoom[`${year}-${month}-${date}`] = [i];
    }
  });
  console.log('final', listArrayRoom);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      listRoom({token});
    });
    return () => {
      unsubscribe;
    };
  }, [navigation]);
  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  const renderEmptyItem = () => {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>
          Hiện chưa có lịch cho ngày này.
        </Text>
      </View>
    );
  };
  const renderItem = (item) => {
    return (
      <TouchableOpacity style={styles.item}>
        <View style={{marginHorizontal: 16}}>
          <Text
            style={{
              fontSize: 16,
            }}>
            {`${item.start_time} - ${item.end_time}`}
          </Text>
          <Text style={styles.itemDurationText}>
            {`Nội dung họp: ${item.subject}`}
          </Text>
          <Text style={{marginTop: 8, fontWeight: '500', fontSize: 16}}>
            {item.owner_name}
          </Text>
          <Text>{item.location}</Text>
          <Text>{item.member}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onMoveToEvent = () => {
    navigation.navigate('Sự kiện mới');
  };
  const buttonIcon = () => {
    return <Image source={imgs.add} style={styles.add} />;
  };
  return (
    <>
      <SafeAreaView />
      <BarStatus />
      <HeaderAccount />

      <Agenda
        items={listArrayRoom}
        firstDay={1}
        selected={moment().format('YYYY-MM-DD')}
        renderItem={renderItem}
        rowHasChanged={rowHasChanged}
        renderEmptyData={renderEmptyItem}
        style={{justifyContent: 'center'}}
      />

      <ActionButton
        buttonColor={Colors.white}
        onPress={onMoveToEvent}
        degrees={45}
        fixNativeFeedbackRadius
        renderIcon={buttonIcon}
        style={[Platform.OS === 'ios' ? {zIndex: 100} : {elevation: 100}]}
      />
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
    marginRight: 8,
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
    fontSize: 16,
    marginTop: 4,
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
  meeting: {tintColor: '#008aee'},
  add: {
    alignSelf: 'center',
    height: 16,
    width: 16,
  },
});
export default Book;
