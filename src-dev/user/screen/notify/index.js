import React, { useState, useRef, useEffect } from 'react';
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
import _ from 'lodash';

import { Card } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import HeaderNotify from './component/HeaderNotify';
import { BarStatus, Indicator, EmptyState } from '../../../component';
import { Colors, imgs } from '../../../../utlis';
import { URL_STAGING } from '../../../../utlis/connection/url';
import { _GET, _POST } from '../../../../utlis/connection/api';
import langs from '../../../../common/language';

const Notify = (props) => {
  const { navigation, token, read } = props;
  const [date, setDate] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
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
    return loading ? <Indicator /> : null;
  };

  const getData = async (pageNumber, dateN, searchN, dataN) => {
    console.log('date', dateN, 'search', searchN);
    const _date = dateN || '';
    const _search = searchN || '';
    const _dataN = dataN || [];
    const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.GET_NOTIFICATION}?page=${pageNumber}&page_size=20&date=${_date}&name=${_search}`;
    const response = await _GET(apiURL, token, false);
    setRefresh(false);
    setLoading(false);
    setOnScroll(false);
    console.log('_GET_LIST_NOTIFICATION ===========>', response);
    if (
      response.success
      && response.statusCode === 200
      && response.data
      && response.data.length > 0
    ) {
      setData(_dataN.concat(response.data));
      setPage(pageNumber);
    }
  };

  const renderItem = ({ item }) => {
    const leader = item.customData.approved === 1 || item.customData.approved === '1';
    // console.log(leader);
    const onShow = () => {
      if (item.type === 1 || item.type === '1') {
        switch (item.customData.type) {
          case 1:
          case '1':
            navigation.navigate(leader ? langs.navigator.approve : langs.navigator.listOT, { page: 2 });
            break;
          case 2:
          case '2':
            navigation.navigate(leader ? langs.navigator.approve : langs.navigator.historyBreak, { page: 0 });
            break;
          case 3:
          case '3':
            navigation.navigate(leader ? langs.navigator.approve : langs.navigator.historyLate, { page: 1 });
            break;
          default: console.log('Wrong type', item.customData.type);
        }
      }
      _POST(url, { id: item.id }, token, false);
    };
    const url = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.NOTIFICATION_READ}`;

    return (
      <TouchableOpacity onPress={onShow}>
        <Card
          style={[
            styles.card,
            {
              backgroundColor:
                item.status === 0 || item.status === '0'
                  ? Colors.white
                  : Colors.backgroundInActive,
            },
          ]}
        >
          <View style={styles.row}>
            {item.status === 0 || item.status === '0' ? (
              <View style={styles.read} />
            ) : null}
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <Text style={styles.content}>{item.content}</Text>
          <Text style={styles.time}>
            {moment(item.time_send * 1000).format('HH:mm - DD/MM/YYYY')}
          </Text>
        </Card>
      </TouchableOpacity>
    );
  };

  const debouceSearch = _.debounce((value) => {
    onSearch(value);
  }, 500);
  const onSearch = (value) => {
    setLoading(true);
    setPage(1);
    setData([]);
    setSearch(value);
    getData(1, date, value, []);
  };

  const onChangeDate = (value) => {
    setLoading(true);
    const _date = value ? moment(value).format('DD/MM/YYYY') : '';
    setPage(1);
    setData([]);
    setDate(_date);
    getData(1, _date, search, []);
  };
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <HeaderNotify
        onSearch={debouceSearch}
        onDate={onChangeDate}
        goBack={goBack}
      />

      {data && data.length === 0 && !loading && (
        <EmptyState
          source={imgs.emptyState}
          title="Không có thông báo nào"
          description=""
        />
      )}
      <FlatList
        style={{paddingTop: 16}}
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
    overflow: 'hidden',
    shadowColor: 'black',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginVertical: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  read: {
    backgroundColor: Colors.danger,
    height: 8,
    width: 8,
    borderRadius: 4,
    marginRight: 4
  }
});
