import React, {useState, useEffect} from 'react';
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Colors, imgs} from '../../../../utlis';
import {BarStatus} from '../../../component';
import langs from '../../../../common/language';
import CardLate from './component/CardLate';
import ActionButton from './component/ActionButton';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import moment from 'moment';
import HeaderCustom from './component/HeaderCustom';
import {_global} from '../../../../utlis/global/global';

const HistoryLate = (props) => {
  const {navigation, listLateEarly, token, dataLateEarly, removeList} = props;
  const [type, setType] = useState('Tất cả');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(0);
  const [date, setDate] = useState('');
  const goBack = () => {
    navigation.goBack();
    removeList();
  };
  useEffect(() => {
    const data = {
      token: token,
      status: status,
      page: page,
      page_size: 10,
    };
    listLateEarly(data);
  }, []);

  const onApplyLate = () => {
    navigation.navigate(langs.navigator.applyLate);
  };

  const renderItem = ({item, index}) => {
    return (
      <CardLate
        leader={false}
        status={item.status}
        type={item.type}
        reason={item.content}
        day={item.date}
        time={item.time}
      />
    );
  };

  const onPressCreate = () => {
    navigation.navigate(langs.navigator.approveLate);
  };

  const onChangeDate = (pickDay) => {
    const pickDate = moment(date, 'DD/MM/YYYY').toDate();
    const data = {
      token: token,
      status: status,
      date: moment(pickDay).format('DD/MM/YYYY'),
      page: 1,
      page_size: 10,
    };
    setPage(1);
    listLateEarly(data);
    setDate(pickDate);
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
      token: token,
      status: item,
      page: 1,
      page_size: 10,
    };
    setPage(1);
    listLateEarly(data);
    onSetType(item);
    setStatus(item);
  };

  const handleLoadMore = () => {
    const data = {
      token: token,
      status: status,
      page: page + 1,
      page_size: 10,
      date: date,
    };
    setPage(page + 1);
    listLateEarly(data);
    _global.Loading.show();
  };

  const renderFooterComponent = () => {
    return loading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="grey" />
      </View>
    ) : null;
  };

  return (
    <>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 46 : StatusBar.currentHeight}
      />
      <HeaderCustom
        title={langs.titleHistoryLate}
        height={60}
        goBack={goBack}
        fontSize={24}
        onChangeStatus={onChangeStatus}
        onChangeDate={onChangeDate}
        type={type}
      />
      <View style={styles.container}>
        <FlatList
          data={dataLateEarly}
          keyExtractor={(item, index) => `${item.id}`}
          renderItem={renderItem}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          style={styles.flatList}
          ListFooterComponent={renderFooterComponent}
        />
      </View>
      <ActionButton onApprove={onPressCreate} onApply={onApplyLate} />
    </>
  );
};

export default HistoryLate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    // marginBottom: heightPercentageToDP(12),
    // flexGrow: 1,
  },
});
