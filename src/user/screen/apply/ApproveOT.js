import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  UIManager,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import langs from '../../../../common/language';
import {BarStatus} from '../../../component';
import {Colors} from '../../../../utlis';
import ItemOT from './component/ItemApproveOT';
import {FlatList} from 'react-native-gesture-handler';
import {URL} from '../../../../utlis/connection/url';
import HeaderCustom from './component/HeaderCustom';
import {_GET, _POST} from '../../../../utlis/connection/api';
import {_global} from '../../../../utlis/global/global';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// const item = {
//   id: Math.random().toString(36).substr(2, 9),
//   name: 'Đỗ Tuấn Phong',
//   date: '21/09/2020',
//   time: '0.5',
//   content: 'Sửa lỗi phát sinh trên UI',
//   status: 1,
// };

// const item1 = {
//   id: Math.random().toString(36).substr(2, 9),
//   name: 'Đỗ Tuấn Phong',
//   date: '21/09/2020',
//   time: '0.5',
//   content: 'Sửa lỗi phát sinh trên UI',
//   status: 2,
// };

// const item2 = {
//   id: Math.random().toString(36).substr(2, 9),
//   name: 'Đỗ Tuấn Phong',
//   date: '21/09/2020',
//   time: '0.5',
//   content: 'Sửa lỗi phát sinh trên UI',
//   status: 3,
// };

function ApproveOT(props) {
  const {navigation, token} = props;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({});
  const [type, setType] = useState('Đang chờ');

  useEffect(() => {
    getData(1, '', '', [], '');
  }, []);

  const goBack = () => {
    navigation.goBack();
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
  const renderItem = ({item}) => {
    return <ItemOT item={item} onConfirm={onConfirm} onDeny={onDeny} />;
  };

  const onConfirm = async (item) => {
    const apiURL = `${URL.LOCAL_HOST}${URL.APPROVE_OVERTIME}`;
    const body = {
      _id: item._id,
      status: 2,
    };
    const response = await _POST(apiURL, body, token);
    console.log('_APPROVE_OT =============>', response);
    if (response.success && response.statusCode === 200 && response.data) {
      setData(
        data.map((i) => (i._id === response.data._id ? response.data : i)),
      );
    } else {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.alert.approveFail,
        // messageColor: Colors.danger,
        leftButton: {text: langs.alert.ok},
      });
    }
  };

  const onDeny = async (item) => {
    const apiURL = `${URL.LOCAL_HOST}${URL.APPROVE_OVERTIME}`;
    const body = {
      _id: item._id,
      status: 3,
    };
    const response = await _POST(apiURL, body, token);
    console.log('_APPROVE_OT =============>', response);
    if (response.success && response.statusCode === 200 && response.data) {
      setData(
        data.map((i) => (i._id === response.data._id ? response.data : i)),
      );
    } else {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.alert.approveFail,
        // messageColor: Colors.danger,
        leftButton: {text: langs.alert.ok},
      });
    }
  };

  const getData = async (pageNumber, dateN, statusN, dataN, nameN) => {
    const _date = dateN || '';
    const _status = statusN || 0;
    const _data = dataN || [];
    const _name = nameN || '';
    const apiURL = `${URL.LOCAL_HOST}${URL.GET_LIST_OVERTIME_MANAGER}?page=${pageNumber}&page_size=20&status=${_status}`;
    console.log(apiURL);
    const response = await _GET(apiURL, token);
    console.log('_GET_LIST_OVERTIME_MANAGER ===========>', response);
    if (
      response.success &&
      response.statusCode === 200 &&
      response.data &&
      response.data.length > 0
    ) {
      setData(_data.concat(response.data));
      setPage(pageNumber);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setLoading(true);
    getData(page + 1, filter.date, filter.status, data, filter.name);
  };

  const renderFooterComponent = () => {
    return loading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : null;
  };

  const onChangeDate = (date) => {
    console.log(moment(date).format('DD/MM/YYYY'));
    setFilter({
      ...filter,
      date: !date ? '' : moment(date).format('DD/MM/YYYY'),
    });
    setData([]);
    setPage(1);
    getData(
      1,
      !date ? '' : moment(date).format('DD/MM/YYYY'),
      filter.status,
      [],
      filter.name,
    );
  };

  const onChangeStatus = (item) => {
    setFilter({...filter, status: item});
    setData([]);
    setPage(1);
    getData(1, filter.date, item, [], filter.name);
    onSetType(item);
  };

  const onChangeName = (item) => {
    setFilter({...filter, name: item});
    setData([]);
    setPage(1);
    getData(1, filter.date, filter.status, [], item);
  };

  return (
    <View style={styles.container}>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 46 : StatusBar.currentHeight}
      />
      <HeaderCustom
        title={langs.titleApproveOT}
        height={40}
        goBack={goBack}
        fontSize={24}
        onChangeStatus={onChangeStatus}
        onChangeDate={onChangeDate}
        onChangeName={onChangeName}
        search
        type={type}
      />
      <View style={styles.detail}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={!loading ? handleLoadMore : null}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooterComponent}
        />
      </View>
    </View>
  );
}

export default ApproveOT;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '300',
    color: Colors.background,
  },
  detail: {
    justifyContent: 'space-around',
    marginVertical: 32,
    flex: 1,
  },
  status: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 16,
    justifyContent: 'space-between',
  },
  img: {
    padding: 8,
    borderRadius: 16,
    alignSelf: 'center',
    marginRight: 8,
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  txtStatus: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
});
