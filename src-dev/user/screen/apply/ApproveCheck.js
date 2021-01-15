import React, { useState, useEffect } from 'react';
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import moment from 'moment';
import { Colors, imgs } from '../../../../utlis';
import { BarStatus } from '../../../component';
import langs from '../../../../common/language';
import CardCheck from './component/CardCheck';
import HeaderCustom from './component/HeaderCustom';
import { _global } from '../../../../utlis/global/global';
import { getText } from '../../../../utlis/config/utlis';

const ApproveCheck = (props) => {
  const {
    navigation,
    listManagerCheck,
    token,
    dataManagerCheck,
    approveCheck,
    removeList,
    refreshing,
  } = props;
  const [type, setType] = useState('Đang chờ');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(1);
  const [search, setSearch] = useState(false);
  const [txtSearch, setTxtSearch] = useState('');
  const [filter, setFilter] = useState(dataManagerCheck);
  const [date, setDate] = useState('');
  const [cancel, setCancel] = useState(true);
  const goBack = () => {
    navigation.goBack();
    removeList();
  };
  useEffect(() => {
    const data = {
      token,
      status,
      page,
      page_size: 10,
      loading: true,
      reload: true,
    };
    cancel ? listManagerCheck(data) : null;
    txtSearch ? onChangeName(txtSearch) : null;
    console.log('HEEEEEARRRRRR');
    return () => setCancel(false);
  }, [dataManagerCheck]);

  const renderItem = ({ item, index }) => {
    return (
      <CardCheck
        leader
        status={item.status}
        type={item.type}
        reason={item.content}
        day={item.date}
        time={item.time}
        name={item.fullname}
        onDeny={() => onDeny(item.id)}
        onAccept={() => onAccept(item.id)}
      />
    );
  };

  const onDeny = (_id) => {
    const data = {
      _id,
      status: 3,
      token,
    };
    approveCheck(data);
  };

  const onAccept = (_id) => {
    const data = {
      _id,
      status: 2,
      token,
    };
    approveCheck(data);
  };

  const onChangeDate = (pickDay) => {
    const data = {
      token,
      status,
      date: pickDay ? moment(pickDay).format('DD/MM/YYYY') : '',
      page: 1,
      page_size: 10,
      reload: true,
      loading: true,
    };
    listManagerCheck(data);
    setPage(1);
    setDate(pickDay ? moment(pickDay).format('DD/MM/YYYY') : '');
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
    }
  };
  const onChangeStatus = (item) => {
    const data = {
      token,
      date,
      status: item,
      page: 1,
      page_size: 10,
      reload: true,
      loading: true,
    };
    setPage(1);
    listManagerCheck(data);
    onSetType(item);
    setStatus(item);
  };

  const handleLoadMore = () => {
    const data = {
      token,
      status,
      page: page + 1,
      date,
      page_size: 10,
      reload: false,
      loading: true,
    };
    setPage(page + 1);
    listManagerCheck(data);
  };

  const renderFooterComponent = () => {
    return loading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="grey" />
      </View>
    ) : null;
  };

  const onRefresh = () => {
    const data = {
      token,
      status,
      page_size: 10,
      page: 1,
      date,
      reload: true,
      refreshing: true,
    };
    listManagerCheck(data);
    setPage(1);
    setSearch(false);
  };

  const onChangeName = (txt) => {
    const newData = dataManagerCheck.length > 0
      ? dataManagerCheck.filter((item) => {
        const itemData = getText(item.fullname);
        const textData = getText(txt);
        return itemData.indexOf(textData) > -1;
      })
      : dataManagerCheck;
    setFilter(newData);
    setSearch(true);
    setTxtSearch(txt);
  };

  return (
    <>
      <HeaderCustom
        header={false}
        onChangeStatus={onChangeStatus}
        onChangeDate={onChangeDate}
        onChangeName={onChangeName}
        search
        txtSearch={txtSearch}
        type={type}
      />
      <View style={styles.container}>
        {dataManagerCheck.length === 0 && Array.isArray(dataManagerCheck) ? (
          <Text style={styles.noData}>Không có lịch sử.</Text>
        ) : (
          <FlatList
            data={search ? filter : dataManagerCheck}
            keyExtractor={(item, index) => `${item.id}`}
            renderItem={renderItem}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            style={styles.flatList}
            ListFooterComponent={renderFooterComponent}
            showsVerticalScrollIndicator={false}
            onRefresh={onRefresh}
            refreshing={refreshing}
          />
        )}
      </View>
    </>
  );
};

export default ApproveCheck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    // marginBottom: heightPercentageToDP(12),
    // flexGrow: 1,
  },
  noData: { fontSize: 16, alignSelf: 'center', marginTop: 24 },
});
