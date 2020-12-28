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
  FlatList,
  SectionList,
} from 'react-native';
import {Agenda, Calendar} from 'react-native-calendars';
import moment from 'moment';
import ActionButton from 'react-native-action-button';
import {Card} from 'native-base';
import {Colors, imgs} from '../../../../utlis';
import {BarStatus} from '../../../component';
import HeaderAccount from './component/HeaderAccount';
import langs from '../../../../common/language/index'
const Book = (props) => {
  const {navigation, token, listRoom, listRoomBook} = props;
  const listArrayRoom = {};
  // let newArray = [];
  // listRoomBook.forEach((i) => {
  //   if (i.loop === 1) {
  //     let a = moment(i.date, 'DD-MM-YYYY').format();
  //     let end = moment(a).endOf('year').format();

  //     for (
  //       let index = a;
  //       index < end;
  //       index = moment(index).add(1, 'week').format()
  //     ) {
  //       newArray.push({...i, date: moment(index).format('DD-MM-YYYY')});
  //     }
  //   }
  // });
  // newArray = newArray.concat(listRoomBook);
  // console.log('----', newArray);
  // newArray.forEach((i) => {
  //   const [date, month, year] = i.date.split('-');
  //   if (listArrayRoom[`${year}-${month}-${date}`]) {
  //     listArrayRoom[`${year}-${month}-${date}`].push(i);
  //   } else {
  //     listArrayRoom[`${year}-${month}-${date}`] = [i];
  //   }
  // });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      listRoom({token});
    });
    return () => {
      unsubscribe;
    };
  }, [navigation]);
  let array = [];
  listRoomBook.forEach((i) => {
    if (array.filter((it) => i.date === it.date).length === 0) {
      array.push({date: i.date, data: [i]});
    } else {
      array.map((item) =>
        item.date === i.date ? {...item, data: item.data.push(i)} : item,
      );
    }
  });

  const renderItem = (item) => {
    return (
      <View>
        <View style={[styles.container]}>
          {/* <Text>{item.section.date}</Text>  */}
          <View style={{width: 80}} />
          <TouchableOpacity
            style={[
              styles.item,
              ,
              {
                marginTop: item.index === 0 ? -48 : 16,
                marginBottom:
                  item.index === item.section.data.length - 1 ? 16 : 0,
              },
            ]}>
            <View style={{marginHorizontal: 16}}>
              <Text
                style={{
                  fontSize: 16,
                }}>
                {`${moment(item.item.start_time, 'hh:mm').format(
                  'LT',
                )} - ${moment(item.item.end_time, 'hh:mm').format('LT')}`}
              </Text>
              <Text style={styles.itemDurationText}>
                {`Nội dung họp: ${item.item.subject}`}
              </Text>
              <Text style={{marginTop: 8, fontWeight: '500', fontSize: 16}}>
                {item.item.owner_name}
              </Text>
              <Text>{item.item.location}</Text>
              <Text>{item.item.member}</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* {item.index === item.section.data.length - 1 ? (
            <View
              style={{height: StyleSheet.hairlineWidth, width: '100%',backgroundColor:"black"}}></View>
          ) : null} */}
      </View>
    );
  };

  const onMoveToEvent = () => {
    navigation.navigate(langs.navigator.event);
  };
  const buttonIcon = () => {
    return <Image source={imgs.add} style={styles.add} />;
  };

  const ListFooterComponent = () => {
    return (
      <View style={styles.headerFooterStyle}>
        <Text style={styles.textStyle}>This is Footer</Text>
      </View>
    );
  };
  const ListHeaderComponent = () => {
    return <View style={{height: 24}} />;
  };
  const renderHeader = (section) => {
    return (
      <View style={{justifyContent: 'center', width: 80, alignItems: 'center'}}>
        <Text style={{fontSize: 24, fontWeight: '500'}}>
          {moment(section.section.date, 'DD-MM-YYYY').format('D')}
        </Text>
        <Text>
          Tháng {moment(section.section.date, 'DD-MM-YYYY').format('M')}
        </Text>
      </View>
    );
  };
  return (
    <>
      <SafeAreaView />
      <BarStatus />
      <HeaderAccount />
      <SectionList
        sections={array}
        // SectionSeparatorComponent={FlatListItemSeparator}
        // style={{marginTop: 32}}
        renderSectionHeader={renderHeader}
        renderItem={renderItem}
        // ListFooterComponent={ListFooterComponent}
        keyExtractor={(item, index) => index}
        // ListHeaderComponent={ListHeaderComponent}
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
  container: {flexDirection: 'row', width: '100%'},
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 16,
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
  headerFooterStyle: {
    width: '100%',
    height: 45,
    backgroundColor: '#606070',
  },
});
export default Book;
