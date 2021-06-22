import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import moment from 'moment';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Feather';
import _ from 'lodash';
import { Colors, imgs } from '../../../../utlis';
import langs from '../../../../common/language';
import CardWfhAll from './components/CardWfhAll';
import { _global } from '../../../../utlis/global/global';
import { _GET, _POST } from '../../../../utlis/connection/api';
import { URL } from '../../../../utlis/connection/url';
import HeaderNotify from '../notify/component/HeaderNotify';
import { BarStatus, EmptyState, Indicator } from '../../../component';

const AllWFH = (props) => {
  const { token } = props;
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [date, setDate] = useState(moment().format('DD/MM/YYYY'));
  const [type, setType] = useState('Tất cả');
  const [refresh, setRefresh] = useState(false);
  const [onScroll, setOnScroll] = useState(false);
  const [status, setStatus] = useState(2);
  const [name, setName] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    getData(1, moment().format('DD/MM/YYYY'), 0, [], '');
    if (isFocused) {
      setLoading(true);
      setDate(moment().format('DD/MM/YYYY'));
      setName('');
    }
  }, [isFocused]);

  const getData = async (pageNumber, dateN, statusN, dataN, nameN) => {
    const _date = dateN || '';
    const _status = statusN || 0;
    const _data = dataN || [];
    const _name = nameN || '';
    const apiURL = `${URL.ALL_LIST_WORK_FROM_HOME}?page=${pageNumber}&page_size=20&start_date=${_date}&fullname=${_name}&status=0`;
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
      <CardWfhAll
        item={item}
      />
    );
  };
  const debouceSearch = _.debounce((value) => {
    onChangeName(value);
  }, 1000);
  const onChangeName = (item) => {
    setLoading(true);
    setData([]);
    setPage(1);
    getData(1, date, status, [], item);
    setName(item);
    console.log('name', name);
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

  const handleLoadMore = () => {
    getData(page + 1, date, status, data, name);
    setOnScroll(false);
    setLoading(true);
  };

  const onRefresh = () => {
    setRefresh(true);
    setOnScroll(false);
    getData(1, date, status, [], name);
  };

  const renderFooterComponent = () => {
    return loading ? <Indicator /> : null;
  };
  console.log(date);
  console.log('name2', name);
  // console.log('datadatadatadata', data);
  // console.log('initialDatainitialData', initialData);
  // console.log('date_user_late', date_user_late);
  // console.log('localDate',localDate);
  const renderEmpty = () => {
    return <EmptyState source={imgs.noHistory} title="Không có lịch sử." />;
  };
  const empty = data && data.length === 0 && !loading;
  return (
    <>
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
      <View style={styles.backGround}>
        <FlatList
          data={empty ? [1] : data}
          keyExtractor={(item, index) => String(index)}
          showsVerticalScrollIndicator={false}
          renderItem={empty ? renderEmpty : renderItem}
          onMomentumScrollBegin={() => setOnScroll(true)}
          onEndReached={!loading && onScroll ? handleLoadMore : null}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooterComponent}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        />
      </View>
    </>
  );
};

export default AllWFH;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    // marginBottom: heightPercentageToDP(12),
    // flexGrow: 1,
  },
  noData: {
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 24,
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
  backGround: { flex: 1, backgroundColor: '#f0f0f0' },
});
