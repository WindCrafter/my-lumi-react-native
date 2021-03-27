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
import moment from 'moment';
import { Card } from 'native-base';
import Modal from 'react-native-modal';
import { Colors, Fonts, imgs } from '../../../../utlis';
import { BarStatus, EmptyState, Indicator, } from '../../../component';
import HeaderEvent from './component/HeaderEvent';
import langs from '../../../../common/language/index';
import { _GET } from '../../../../utlis/connection/api';
import { URL_STAGING } from '../../../../utlis/connection/url';
import { goBack } from '../../../navigator/CustomNavigation';

if (
  Platform.OS === 'android'
  && UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ListEvent = (props) => {
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
  const isFocused = useIsFocused();
  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    if (isFocused) {
      getData();
    }
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, [isFocused]);

  const getData = async (dataN) => {
    const _dataN = dataN || [];
    const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.LIST_EVENT}`;
    const response = await _GET(apiURL, token, false);
    setRefresh(false);
    setLoading(false);
    setOnScroll(false);
    console.log('List Event =>>>>>', response);
    if (
      response.success
      && response.statusCode === 200
      && response.data
      && response.data.length > 0
    ) {
      setData(_dataN.concat(response.data));
    }
  };
  const gotoDetaiEvent = (item) => {
    navigation.navigate(langs.navigator.detailEvent, { item });
  };
  const _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      // getData();
    }
  };
  const array = [];
  const data_ = [];
  data.forEach((i) => {
    data_.push({ ...i, date: moment(i.start_datetime, 'HH:mm:ss DD/MM/YYYY').format('DD/MM/YYYY'), time: moment(i.start_datetime, 'HH:mm:ss DD/MM/YYYY').format('HH:mm') });
  });
  let count = 0;
  data_.forEach((i) => {
    if (array.filter((it) => i.date === it.date).length === 0) {
      array.push({ date: i.date, data: [i] });
    } else {
      array.map((item) => (item.date === i.date ? { ...item, data: item.data.push(i) } : item),);
    }
  });
  array.forEach((i) => {
    if (i.date == moment().format('DD/MM/YYYY')) {
      count = i.data.length;
    }
  });

  const renderItem = (item) => {
    const urgent = item.item.urgent;
    return (
      <View style={{ flexDirection: 'row', marginBottom: 8 }}>
        <View style={styles.scroll}>
          <View style={[styles.circle, { marginTop: item.index === 0 ? -24 : 3 }]} />
          <View style={[styles.line, { marginBottom: -12 }]} />
        </View>
        <TouchableOpacity
          style={[
            styles.item,
            { marginTop: item.index === 0 ? -24 : 3, borderWidth: urgent === 1 ? 2.5 : 0, borderColor: Colors.background }
          ]}
          onPress={() => gotoDetaiEvent(item.item)}
        >
          <Text style={styles.detail}>{item.item.subject}</Text>
          <Text style={styles.time}>{item.item.time}</Text>
        </TouchableOpacity>
      </View>
    );
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
    const today = moment().format('DD/MM/YYYY') === section.section.date;
    return (
      <View style={styles.header}>
        <Text style={styles.txtHeader}>{today ? 'Hôm nay' : section.section.date}</Text>
      </View>
    );
  };

  return (
    <>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 36 : StatusBar.currentHeight}
      />
      <HeaderEvent
        shadow
        goBack={goBack}
        count={count}
      />
      {data && data.length === 0 && !loading && (
        <EmptyState
          source={imgs.caughtUp}
          title="Chưa có sự kiện nào cả"
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
    color: 'white',
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
  header: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingVertical: 4,
    width: 92,
    marginHorizontal: 4,
    justifyContent: 'center',
    backgroundColor: Colors.background,
    borderRadius: 8,
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
  detail: { fontWeight: '600', fontFamily: 'Quicksand-Bold', color: 'black' },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 3,
    borderColor: Colors.background,
  },
  scroll: {
    width: 120,
    alignItems: 'flex-end',
    paddingRight: 4
  },
  line: {
    width: 5,
    flex: 1,
    backgroundColor: Colors.background,
    marginRight: 3.5,
    marginTop: -2,
  },
  time: {
    fontSize: 14,
  }
});

export default ListEvent;
