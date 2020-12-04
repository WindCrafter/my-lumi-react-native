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
// import {URL} from '../../../../utlis/connection/url';
import HeaderCustom from './component/HeaderCustom';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function ApproveOT(props) {
  const {navigation} = props;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    getData();
  }, [page]);

  const goBack = () => {
    navigation.goBack();
  };

  const renderItem = ({item}) => {
    return <ItemOT item={item} />;
  };

  const getData = async (callback) => {
    // const status = filter.status || '';
    // const date = filter.date || '';
    // const name = filter.name || '';
    // const apiURL = `${URL.LOCAL_HOST}${URL.GET_LIST_OVERTIME}?page=${page}&?status=${status}&?date=${date}`;
    const apiURL = `https://jsonplaceholder.typicode.com/photos?_limit=10&page=${page}`;
    console.log(apiURL);
    fetch(apiURL).then((res) => {
      setData(data.concat([1, 2, 3, 4, 1, 1, 1, 1, 1, 1]));
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

  const onChangeStatus = (item) => {
    console.log(item);
    setFilter({...filter, status: item});
    setData([]);
    setPage(1);
    getData();
  };

  const onChangeName = (item) => {
    console.log(item);
    setFilter({...filter, name: item});
    setData([]);
    setPage(1);
    getData();
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
      />
      <View style={styles.detail}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0}
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
