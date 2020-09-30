import React, {useState} from 'react';
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
} from 'react-native';
import {Colors} from '../../../../utlis';
import {BarStatus} from '../../../component';
import {Agenda} from 'react-native-calendars';
import moment from 'moment';
import HeaderAccount from './component/HeaderAccount';
import ActionButton from 'react-native-action-button';
import {imgs} from '../../../../utlis';
const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(9);
const dates = [fastDate, today].concat(futureDates);
import {Card} from 'native-base';

function getFutureDates(days) {
  const array = [];
  for (let index = 1; index <= days; index++) {
    const date = new Date(Date.now() + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split('T')[0];
    array.push(dateString);
  }
  return array;
}

function getPastDate(days) {
  return new Date(Date.now() - 864e5 * days).toISOString().split('T')[0];
}

const Book = (props) => {
  const {navigation} =props;
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
  const renderItem = () => {
    // if (_.isEmpty(item)) {
    //   return renderEmptyItem();
    // }

    return (
      <TouchableOpacity style={styles.item}>
        <View>
          <Text style={styles.itemHourText}>{item.length}</Text>
          <Text style={styles.itemDurationText}>{item.name}</Text>
        </View>
        {/* <Text style={styles.itemTitleText}>{item.title}</Text> */}
        {/* <View style={styles.itemButtonContainer}>
          <Button color={'grey'} title={'Info'} onPress={buttonPressed} />
        </View> */}
      </TouchableOpacity>
    );
  };
  const item = {
    '2020-09-22': [{name: 'item 1 - any js object'}],
    '2020-09-23': [{name: 'item 2 - any js object', height: 80}],
    '2020-09-24': [],
    '2020-09-25': [{name: 'item 3 - any js object'}, {name: 'any js object'}],
  };
  const onMoveToProfile = () => {
    console.log('----- < > ______')
    navigation.navigate('Sự kiện mới');
  };
  return (
    <>
      <BarStatus backgroundColor={Colors.white} />

      <HeaderAccount />
      <View style={{flexDirection: 'row', alignSelf: 'center',marginBottom:27}}>
        <View
          style={{
            width: '25%',
            height: 48,
            borderBottomLeftRadius: 23,
            borderTopLeftRadius: 23,
            backgroundColor: "#ffffff",
            shadowColor: "rgba(0, 0, 0, 0.16)",
            shadowOffset: {
              width: 0,
              height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1, justifyContent: 'center'
          }}
        ><Text>{'Lịch tuần'}</Text></View>
        <View
          style={{
            width: '25%',
            height: 48,
            backgroundColor: '#008aee',
            shadowColor: "rgba(0, 0, 0, 0.16)",
            shadowOffset: {
              width: 0,
              height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1,justifyContent:'center'
          }}
        ><Text>{'Lịch ngày'}</Text></View>
        <View
          style={{
            width: '25%',
            height: 48,
            borderBottomRightRadius: 23,
            borderTopRightRadius: 23,
            backgroundColor: "#ffffff",
            shadowColor: "rgba(0, 0, 0, 0.16)",
            shadowOffset: {
              width: 0,
              height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1, justifyContent: 'center'
          }}
        ><Text>{'Phòng họp'}</Text></View>
      </View>
      <Agenda
        items={item}
        selected={moment().format('YYYY-MM-DD')}
        renderItem={renderItem}
        rowHasChanged={rowHasChanged}
        style={{marginTop: 10}}
      />
      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item
          buttonColor="white"
          title="Tạo phòng họp"
          onPress={onMoveToProfile}>
          <Image source={imgs.meeting} style={{tintColor: '#008aee'}} />
        </ActionButton.Item>
      </ActionButton>
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
});
export default Book;
