import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import moment from 'moment';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Feather';
import _ from 'lodash';
import FilterDate from './components/FilterDate';
import { Colors, imgs } from '../../../../utlis';
import langs from '../../../../common/language';
import CardLateAll from './components/CardLateAll';
import { _global } from '../../../../utlis/global/global';
import { _GET, _POST } from '../../../../utlis/connection/api';
import { URL_STAGING } from '../../../../utlis/connection/url';
import HeaderNotify from '../notify/component/HeaderNotify';
import { BarStatus, EmptyState, Indicator } from '../../../component';

const allLate = (props) => {
  const {
    token,
  } = props;
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [date, setDate] = useState('');
  const [type, setType] = useState('Tất cả');
  const [refresh, setRefresh] = useState(false);
  const [onScroll, setOnScroll] = useState(false);
  const [status, setStatus] = useState(0);
  const step = useRef();
  const [name, setName] = useState('');

  useEffect(() => {
    getData(1, '', 0, [], '');
  }, []);

  const getData = async (pageNumber, dateN, statusN, dataN, nameN) => {
    const _date = dateN || '';
    const _status = statusN || 0;
    const _data = dataN || [];
    const _name = nameN || '';
    const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.ALL_LIST_LATE_EARLY}?page=${pageNumber}&page_size=20&date=${_date}&fullname=${_name}`;
    const response = await _GET(apiURL, token, false);
    console.log('_GET_ALL_LIST_LATE_EARLY ===========>', response);
    setRefresh(false);
    setOnScroll(false);
    setLoading(false);
    if (
      response.success
      && response.statusCode === 200
      && response.data
      && response.data.length > 0
    ) {
      setData(dataN.concat(response.data));
      setPage(pageNumber);
    }
  };
  const renderItem = ({ item }) => {
    return (
      <CardLateAll
        leader
        status={item.status}
        type={item.type}
        reason={item.content}
        day={item.date}
        time={item.time}
        name={item.fullname}
      />
    );
  };
  const debouceSearch = _.debounce((value) => {
    onChangeName(value);
  }, 500);
  const onChangeName = (item) => {
    setLoading(true);
    setName(item);
    setData([]);
    setPage(1);
    getData(1, date, status, [], item);
  };
  const onChangeDate = (datePick) => {
    setLoading(true);
    setData([]);
    setPage(1);
    getData(
      1,
      !datePick ? '' : moment(datePick).format('DD/MM/YYYY'),
      status,
      [],
      name,
    );
    setDate(!datePick ? '' : moment(datePick).format('DD/MM/YYYY'));
  };
  const onSetType = (item) => {
    switch (item) {
      case '0':
        setType('Tất cả');
        break;
      case '1':
        setType('Đang chờ');
        break;
      case '2':
        setType('Đã duyệt');
        break;
      case '3':
        setType('Bị từ chối');
        break;
      case '4':
        setType('Auto Cancel');
        break;
      default:
        0;
    }
  };

  // const onChangeStatus = (item) => {
  //   setData([]);
  //   setPage(1);
  //   getData(1, date, item, []);
  //   onSetType(item);
  // };

  const handleLoadMore = () => {
    getData(page + 1, date, status, data);
    setOnScroll(false);
    setLoading(true);
  };

  const onRefresh = () => {
    setRefresh(true);
    setOnScroll(false);
    getData(1, date, status, []);
  };

  const renderFooterComponent = () => {
    return loading ? (
      <Indicator />
    ) : null;
  };

  // console.log('datadatadatadata', data);
  // console.log('initialDatainitialData', initialData);
  // console.log('date_user_late', date_user_late);
  // console.log('localDate',localDate);
  return (
    <>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <View style={{ width: wp(100), backgroundColor: '#F0F0F0' }}>
          <HeaderNotify
            header={false}
            // onChangeStatus={onChangeStatus}
            onDate={onChangeDate}
            onSearch={debouceSearch}
            type={type}
            CONFIRM_DENY_TAKE_LEAVE
            search
            txtSearch={name}
          />
          {data && data.length === 0 && !loading && (
          <EmptyState source={imgs.noHistory} title="Không có lịch sử." />
          )}

          <FlatList
            data={data}
           keyExtractor={(item, index) => String(index)}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            onMomentumScrollBegin={() => setOnScroll(true)}
            onEndReached={!loading && onScroll ? handleLoadMore : null}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooterComponent}
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
            }
          />
        </View>
      </ScrollView>
    </>
  );
};

export default allLate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    // marginBottom: heightPercentageToDP(12),
    // flexGrow: 1,
  },
  noData: { fontSize: 16, alignSelf: 'center', marginTop: 24,
  // fontFamily: Fonts.font_family.italic
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 32,
  },
  backRightBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 80,
    marginLeft: 8,
  },
  backBtn: {
    height: 48,
    width: 48,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,

    shadowRadius: 3.84,

    elevation: 1,
    borderRadius: 24,
  },
  textDescrip: {
    fontSize: 10,
    textAlign: 'center',
    paddingRight: 32,
    color: Colors.itemInActive,
  },
});
