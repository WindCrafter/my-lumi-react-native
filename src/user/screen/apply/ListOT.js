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
import ItemOT from './component/ItemOT';
import {FlatList} from 'react-native-gesture-handler';
import ActionButton from './component/ActionButton';
// import {URL} from '../../../../utlis/connection/url';
import HeaderCustom from './component/HeaderCustom';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const item0 = {
  status: 1,
  date: '21/09/2020',
  time: '0.5',
  content: 'Sửa lỗi phát sinh trên UI',
};
const item1 = {
  status: 2,
  date: '21/09/2020',
  time: '0.5',
  content: 'Sửa lỗi phát sinh trên UI',
};
const item2 = {
  status: 3,
  date: '21/09/2020',
  time: '0.5',
  content: 'Sửa lỗi phát sinh trên UI',
};

function ListOT(props) {
  const {navigation} = props;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({});
  const [type, setType] = useState('Tất cả');
  useEffect(() => {
    getData();
  }, [page]);

  const goBack = () => {
    navigation.goBack();
  };

  const renderItem = ({item}) => {
    return <ItemOT item={item} />;
  };

  const onPressCreate = () => {
    navigation.navigate('ApplyOT');
  };

  const onPressConfirm = () => {
    navigation.navigate('ApproveOT');
  };

  const getData = async (callback) => {
    // const status = filter.status || '';
    // const date = filter.date || '';
    // const apiURL = `${URL.LOCAL_HOST}${URL.GET_LIST_OVERTIME}?page=${page}&?status=${status}&?date=${date}`;
    const apiURL = `https://jsonplaceholder.typicode.com/photos?_limit=10&page=${page}`;
    console.log(apiURL);
    fetch(apiURL).then((res) => {
      setData(data.concat([item0, item1, item2]));
      setLoading(false);
    });
  };

  const handleLoadMore = () => {
    setPage(page + 1);
    setLoading(true);
  };

  const renderFooterComponent = () => {
    return loading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  const onChangeDate = (date) => {
    const pickDate = moment(date, 'DD/MM/YYYY').toDate();
    console.log(moment(pickDate).format('DD/MM/YYYY'));
    setFilter({...filter, date: moment(pickDate).format('DD/MM/YYYY')});
    setData([]);
    setPage(1);
    getData();
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
    console.log(item);
    setFilter({...filter, status: item});
    setData([]);
    setPage(1);
    getData();
    onSetType(item);
  };

  return (
    <View style={styles.container}>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 46 : StatusBar.currentHeight}
      />
      <HeaderCustom
        title={langs.titleListOT}
        height={60}
        goBack={goBack}
        fontSize={24}
        onChangeStatus={onChangeStatus}
        onChangeDate={onChangeDate}
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
      <ActionButton onPressLate={onPressCreate} onPressOT={onPressConfirm} />
    </View>
  );
}

export default ListOT;

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
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 32,
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
