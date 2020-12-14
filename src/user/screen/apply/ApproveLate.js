import React, {useState, useEffect} from 'react';
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
import {Colors, imgs} from '../../../../utlis';
import {BarStatus} from '../../../component';
import langs from '../../../../common/language';
import CardLate from './component/CardLate';
import moment from 'moment';
import HeaderCustom from './component/HeaderCustom';
import {_global} from '../../../../utlis/global/global';

const ApproveLate = (props) => {
  const {
    navigation,
    listManagerLateEarly,
    token,
    dataManager,
    approveLateEarly,
    removeList,
  } = props;
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
    listManagerLateEarly(data);
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <CardLate
        leader={true}
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
    approveLateEarly(data);
    console.log(_id);
  };

  const onAccept = (_id) => {
    const data = {
      _id,
      status: 2,
      token,
    };
    approveLateEarly(data);
  };

  const onChangeDate = (pickDay) => {
    const pickDate = moment(date, 'DD/MM/YYYY').toDate();
    const data = {
      token: token,
      status: status,
      date: moment(pickDay).format('DD/MM/YYYY'),
      page: 1,
      page_size: 10,
      reload: true,
    };
    listManagerLateEarly(data);
    setPage(1);
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
      reload: true,
    };
    setPage(1);
    listManagerLateEarly(data);
    onSetType(item);
    setStatus(item);
  };

  const handleLoadMore = () => {
    const data = {
      token: token,
      status: status,
      page: page + 1,
      page_size: 10,
      reload: false,
    };
    setPage(page + 1);
    listManagerLateEarly(data);
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
        title={langs.titleApproveLate}
        height={60}
        goBack={goBack}
        fontSize={24}
        onChangeStatus={onChangeStatus}
        onChangeDate={onChangeDate}
        type={type}
      />
      <View style={styles.container}>
        {dataManager.length === 0 ? (
          <Text style={styles.noData}>Không có lịch sử.</Text>
        ) : (
          <FlatList
            data={dataManager}
            keyExtractor={(item, index) => `${item.id}`}
            renderItem={renderItem}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            style={styles.flatList}
            ListFooterComponent={renderFooterComponent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </>
  );
};

export default ApproveLate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    // marginBottom: heightPercentageToDP(12),
    // flexGrow: 1,
  },
  noData: {fontSize: 16, alignSelf: 'center', marginTop: 24},
});
