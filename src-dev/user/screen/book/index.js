import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useIsFocused } from '@react-navigation/native';

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
  UIManager,
  ActivityIndicator,
  RefreshControl, AppState
} from 'react-native';
import { Agenda, Calendar } from 'react-native-calendars';
import moment from 'moment';
import ActionButton from 'react-native-action-button';
import { Card } from 'native-base';
import Modal from 'react-native-modal';
import { Colors, Fonts, imgs } from '../../../../utlis';
import { BarStatus, HeaderAccount, EmptyState,
  Indicator, } from '../../../component';
import langs from '../../../../common/language/index';
import { _GET } from '../../../../utlis/connection/api';
import { URL_STAGING } from '../../../../utlis/connection/url';

if (
  Platform.OS === 'android'
  && UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Book = (props) => {
  const { navigation, token, listRoom, listRoomBook, user_id } = props;
  const [onScroll, setOnScroll] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [itemShow, setItemShow] = useState({});

  const onShowModal = (item) => {
    setShowModal(true);
    setItemShow(item);
    console.log(moment().format('DD-MM-YYYY'));
    console.log(item);
  };
  const onHideModal = () => {
    setShowModal(false);
  };
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
  const isFocused = useIsFocused();
  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    if (isFocused) {
      getData();
      // console.log('statusstatussta redux', status_user_break, date_user_break);
    }
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, [isFocused]);
  const getData = async (dataN) => {
    console.log('date');

    const _dataN = dataN || [];
    const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.LIST_ROOM}`;
    const response = await _GET(apiURL, token, false);
    setRefresh(false);
    setLoading(false);
    setOnScroll(false);
    console.log('_GET_LIST_OVERTIME ===========>', response);
    if (
      response.success
      && response.statusCode === 200
      && response.data
      && response.data.length > 0
    ) {
      setData(_dataN.concat(response.data));
    }
    // else {
    // }
  };
  const _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      getData();
      console.log('call api for approve book');
    }
  };
  const array = [];
  let count = 0;
  data.forEach((i) => {
    if (array.filter((it) => i.date === it.date).length === 0) {
      array.push({ date: i.date, data: [i] });
    } else {
      array.map((item) => (item.date === i.date ? { ...item, data: item.data.push(i) } : item),);
    }
  });
  array.forEach((i) => {
    console.log(i);
    if (i.date == moment().format('DD-MM-YYYY')) {
      i.data.forEach((k) => {
        // console.log(k);
        // console.log('member', k.member_ids);
        // console.log('owner', k.owner_id);
        if (k.member_ids.includes(user_id) || k.owner_id == user_id) {
          count++;
        }
      });
    }
  });
  console.log(count);
  const renderItem = (item) => {
    // console.log('memberid', item.item.member_ids);
    // console.log('user_id', user_id);
    const arrayUserId = item.item.member_ids.split(',');

    return (
      <View>
        <View style={[styles.container]}>
          {/* <Text>{item.section.date}</Text>  */}
          <View style={{ width: 80 }} />
          <TouchableOpacity
            onPress={() => onShowModal(item.item)}
            style={[
              styles.item,
              {
                marginTop: item.index === 0 ? -48 : 16,
                marginBottom:
                  item.index === item.section.data.length - 1 ? 16 : 0,
                borderWidth:
                  arrayUserId.find((e) => e === user_id.toString())
                  || item.item.owner_id == user_id
                    ? 2.5
                    : 0,
                borderColor: Colors.background,
              },
            ]}
          >
            <View style={{ marginHorizontal: 16 }}>
              <Text style={styles.itemDurationText}>
                {`${item.item.subject}`}
              </Text>
              <Text style={styles.txtTime}>
                {`${moment(item.item.start_time, 'hh:mm').format(
                  'LT',
                )} - ${moment(item.item.end_time, 'hh:mm').format('LT')}`}
              </Text>
              {/* <Text style={{fontSize: 16, marginBottom: 8}}>
                {item.item.location}
              </Text> */}
              {item.item.owner_name !== item.item.member ? (
                <Text>
                  <Text style={styles.txtOwner}>{item.item.owner_name}</Text>
                  ,
                  {' '}
                  {item.item.owner_name
                    !== item.item.member ? item.item.member
                      .split(',')
                      .filter((i) => i != item.item.owner_name)
                      .toString()
                      .replace(/,/g, ', ') : item.item.owner_name}
                </Text>
              ) : (
                <Text style={styles.txtOwner}>{item.item.owner_name}</Text>
              )}
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
  const handleLoadMore = () => {
    getData();
    setOnScroll(false);
    setLoading(true);
  };
  const onRefresh = () => {
    setRefresh(true);
    setOnScroll(false);
    getData();
  };
  const ListFooterComponent = () => {
    return (
      <View style={styles.headerFooterStyle}>
        <Text style={styles.textStyle}>This is Footer</Text>
      </View>
    );
  };
  const ListHeaderComponent = () => {
    return <View style={{ height: 24 }} />;
  };
  const renderFooterComponent = () => {
    return (
      <View style={{ paddingBottom: 64 }}>
        {loading ? (

          <Indicator />

        ) : null}
      </View>
    );
  };
  const renderHeader = (section) => {
    return (
      <View>
        {moment().format('DD-MM-YYYY')
        !== moment(section.section.date, 'DD-MM-YYYY').format('DD-MM-YYYY') ? (
          <View style={styles.viewHeader}>
            <Text style={styles.textHeader}>
              {moment(section.section.date, 'DD-MM-YYYY').format('D')}
            </Text>
            <Text>
              Tháng
              {' '}
              {moment(section.section.date, 'DD-MM-YYYY').format('M')}
            </Text>
          </View>
          ) : (
            <View style={styles.viewHeader}>
              <Text style={styles.textToday}>
                Hôm
                {' '}
                {'\n '}
                nay
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  position: 'absolute',
                  top: 64,
                  fontWeight: '500',

                }}
              >
                {moment(section.section.date, 'DD-MM-YYYY').format('DD')}
                {' '}
                Tháng
                {moment(section.section.date, 'DD-MM-YYYY').format(' MM')}
              </Text>
            </View>
          )}
      </View>
    );
  };

  return (
    <>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 36 : StatusBar.currentHeight}
      />
      <HeaderAccount
        shadow
        title="Lịch"
        sub={
          count === 0
            ? 'Hôm nay bạn chưa có lịch họp nào'
            : `Hôm nay bạn có ${count} lịch họp.`
        }
      />
      {data && data.length === 0 && !loading && (
        <EmptyState
          source={imgs.caughtUp}
          title="Chưa có lịch họp."
          description="Hẹn bạn sau nhé."
        />
      )}
      <SectionList
        style={{ paddingTop: 16 }}
        sections={array}
        renderSectionHeader={renderHeader}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        onMomentumScrollBegin={() => setOnScroll(true)}
        onEndReached={!loading && onScroll ? handleLoadMore : null}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderFooterComponent}
        stickySectionHeadersEnabled={false}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      />
      <ActionButton
        buttonColor={Colors.white}
        onPress={onMoveToEvent}
        degrees={45}
        fixNativeFeedbackRadius
        renderIcon={buttonIcon}
        style={[Platform.OS === 'ios' ? { zIndex: 100 } : { elevation: 100 }]}
      />
      <Modal isVisible={showModal} onBackdropPress={onHideModal}>
        <Card style={styles.viewCard}>
          <Text
            style={{
              fontSize: 24,
              marginBottom: 8,
              alignSelf: 'center',
              fontWeight: '600',
              fontFamily: 'Quicksand-Bold',
            }}
          >
            Chi tiết
          </Text>
          <Text style={styles.txtContainer}>
            <Text style={styles.detail}>Nội dung họp:</Text>
            {' '}
            {itemShow.subject}
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 8,
            }}
          >
            {`${moment(itemShow.date, 'DD-MM-YYYY').format(
              'DD',
            )} tháng ${moment(itemShow.date, 'DD-MM-YYYY').format(
              'MM',
            )} ⋅ ${moment(itemShow.start_time, 'hh:mm').format(
              'LT',
            )} - ${moment(itemShow.end_time, 'hh:mm').format('LT')}`}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 8 }}>
            <Text style={styles.detail}>Địa điểm :</Text>
            {' '}
            {itemShow.location}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 8 }}>
            <Text style={styles.detail}>Người tạo :</Text>
            {' '}
            {itemShow.owner_name}
          </Text>
          {itemShow.content ? (
            <Text style={{ fontSize: 16, marginBottom: 8 }}>
              <Text style={styles.detail}>Tóm tắt cuộc họp :</Text>
              {' '}
              {itemShow.content}
            </Text>
          ) : null}
          <Text style={{ fontSize: 16, marginBottom: 8 }}>
            <Text style={styles.detail}>Người tham gia :</Text>
            {' '}
            {itemShow.owner_name !== itemShow.member
              ? itemShow.member
                .split(',')
                .filter((item) => item != itemShow.owner_name)
                .toString()
                .replace(/,/g, ', ')
              : itemShow.owner_name}
          </Text>
        </Card>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 16,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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
    color: 'black',
    fontSize: 16,
    marginVertical: 8,
    fontWeight: '600',
    fontFamily: 'Quicksand-Bold',
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontWeight: '600',
    fontFamily: 'Quicksand-Bold',
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
  noData: {
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 24,
  },
  viewHeader: { justifyContent: 'center', width: 80, alignItems: 'center' },
  textHeader: { fontSize: 24, fontWeight: '500' },
  textToday: { fontSize: 20, fontWeight: '500', color: Colors.blue },
  txtTime: {
    fontSize: 16,
    color: Colors.ink500,
    marginBottom: 8,
    fontFamily: Fonts.font_family.bold,
    fontWeight: Fonts.font_weight.bold
  },
  txtOwner: { fontWeight: '600', fontFamily: 'Quicksand-Bold' },
  viewCard: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  txtContainer: { fontSize: 16, marginVertical: 8 },
  detail: { fontWeight: '600', fontFamily: 'Quicksand-Bold' },
});
export default Book;
