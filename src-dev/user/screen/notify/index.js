import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import moment from 'moment';

import HeaderNotify from './component/HeaderNotify';
import {BarStatus} from '../../../component';
import {Card} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import {Colors} from '../../../../utlis';
import {URL_STAGING} from '../../../../utlis/connection/url';
import {_GET} from '../../../../utlis/connection/api';
import langs from '../../../../common/language';

const DATA = [
  {
    id: '5fe5c2f0ef493f0b962d5a80',
    title: 'Duyệt OT',
    content: 'Test đã duyệt OT cho bạn',
    type: 1,
    customData: {
      type: 1,
    },
    time_send: 1608951288,
    created_at: 1608951288,
    updated_at: 1608951288,
  },
  {
    id: '5fe5c2f0ef493f0b962d5a80',
    title: 'Duyệt OT',
    content: 'Test đã duyệt OT cho bạn',
    type: 1,
    customData: {
      type: 1,
    },
    time_send: 1608951288,
    created_at: 1608951288,
    updated_at: 1608951288,
  },
  {
    id: '5fe5c2f0ef493f0b962d5a80',
    title: 'Duyệt OT',
    content: 'Test đã duyệt OT cho bạn',
    type: 1,
    customData: {
      type: 1,
    },
    time_send: 1608951288,
    created_at: 1608951288,
    updated_at: 1608951288,
  },
  {
    id: '5fe5c2f0ef493f0b962d5a80',
    title: 'Duyệt OT',
    content: 'Test đã duyệt OT cho bạn',
    type: 1,
    customData: {
      type: 1,
    },
    time_send: 1608951288,
    created_at: 1608951288,
    updated_at: 1608951288,
  },
  {
    id: '5fe5c2f0ef493f0b962d5a80',
    title: 'Duyệt OT',
    content: 'Test đã duyệt OT cho bạn',
    type: 1,
    customData: {
      type: 1,
    },
    time_send: 1608951288,
    created_at: 1608951288,
    updated_at: 1608951288,
  },
  {
    id: '5fe5c2f0ef493f0b962d5a80',
    title: 'Duyệt OT',
    content: 'Test đã duyệt OT cho bạn',
    type: 1,
    customData: {
      type: 1,
    },
    time_send: 1608951288,
    created_at: 1608951288,
    updated_at: 1608951288,
  },
  {
    id: '5fe5c2f0ef493f0b962d5a80',
    title: 'Duyệt OT',
    content: 'Test đã duyệt OT cho bạn',
    type: 1,
    customData: {
      type: 1,
    },
    time_send: 1608951288,
    created_at: 1608951288,
    updated_at: 1608951288,
  },
  {
    id: '5fe5c2f0ef493f0b962d5a80',
    title: 'Duyệt OT',
    content: 'Test đã duyệt OT cho bạn',
    type: 1,
    customData: {
      type: 1,
    },
    time_send: 1608951288,
    created_at: 1608951288,
    updated_at: 1608951288,
  },
  {
    id: '5fe5c2f0ef493f0b962d5a80',
    title: 'Duyệt OT',
    content: 'Test đã duyệt OT cho bạn',
    type: 1,
    customData: {
      type: 1,
    },
    time_send: 1608951288,
    created_at: 1608951288,
    updated_at: 1608951288,
  },
];

const Notify = (props) => {
  const {navigation, token} = props;
  const [date, setDate] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [onScroll, setOnScroll] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData(1, date, search, []);
    });
    return () => {
      unsubscribe;
    };
  }, [navigation]);

  const onRefresh = () => {
    setRefresh(true);
    setOnScroll(false);
    getData(1, date, search, []);
  };

  const handleLoadMore = () => {
    getData(page + 1, date, search, data);
    setOnScroll(false);
    setLoading(true);
  };

  const renderFooterComponent = () => {
    return loading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.gray} />
      </View>
    ) : null;
  };

  const getData = async (pageNumber, dateN, searchN, dataN) => {
    console.log('date', dateN, 'search', searchN);
    const _date = dateN || '';
    const _search = searchN || '';
    const _dataN = dataN || [];
    const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.GET_NOTIFICATION}?page=${pageNumber}&page_size=20`;
    const response = await _GET(apiURL, token, false);
    setRefresh(false);
    setLoading(false);
    setOnScroll(false);
    console.log('_GET_LIST_NOTIFICATION ===========>', response);
    if (
      response.success &&
      response.statusCode === 200 &&
      response.data &&
      response.data.length > 0
    ) {
      setData(_dataN.concat(response.data));
      setPage(pageNumber);
    }
  };

  const renderItem = ({item}) => {
    const onShow = () => {
      if (item.type === 1 || item.type === '1') {
        switch (item.customData.type) {
          case 1:
          case '1':
            navigation.navigate(langs.navigator.listOT);
            break;
          case 2:
          case '2':
            navigation.navigate(langs.navigator.historyBreak);
            break;
          case 3:
          case '3':
            navigation.navigate(langs.navigator.historyLate);
            break;
          case 4:
          case '4':
            navigation.navigate(langs.navigator.approveOT);
            break;
          case 5:
          case '5':
            navigation.navigate(langs.navigator.approveBreak);
            break;
          case 6:
          case '6':
            navigation.navigate(langs.navigator.approveLate);
            break;
        }
      }
    };

    return (
      <TouchableOpacity onPress={onShow}>
        <Card style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.content}>{item.content}</Text>
          <Text style={styles.time}>
            {moment(item.time_send).format('HH:mm - DD/MM/YYYY')}
          </Text>
        </Card>
      </TouchableOpacity>
    );
  };

  const onSearch = (value) => {
    setPage(1);
    setData([]);
    setSearch(value);
    getData(1, date, value, []);
  };

  const onChangeDate = (value) => {
    const _date = value ? moment(value).format('DD/MM/YYYY') : '';
    setPage(1);
    setData([]);
    setDate(_date);
    getData(1, _date, search, []);
  };

  return (
    <View style={styles.container}>
      <BarStatus />
      <HeaderNotify onSearch={onSearch} onDate={onChangeDate} />

      {data.length === 0 && (
        <Text style={styles.noData}>Không có thông báo</Text>
      )}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onMomentumScrollBegin={() => setOnScroll(true)}
        onEndReached={!loading && onScroll ? handleLoadMore : null}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderFooterComponent}
        horizontal={false}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default Notify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderRadius: 16,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    shadowColor: 'black',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  time: {
    fontSize: 10,
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'left',
    color: 'rgba(4, 4, 15, 0.45)',
  },
  title: {
    fontWeight: '500',
    color: Colors.background,
    fontSize: 16,
  },
  content: {
    paddingVertical: 7,
  },
  noData: {
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 24,
  },
});
