import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  FlatList,
  UIManager,
  Text,
  Dimensions,
  Image,
  Modal,
  Alert,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import MonthPicker from 'react-native-month-picker';
import {BarStatus, HeaderCustom} from '../../../component';
import {Colors, imgs} from '../../../../utlis';
import moment from 'moment';
import {Card} from 'native-base';
import {URL} from '../../../../utlis/connection/url';
import {_GET} from '../../../../utlis/connection/api';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const width = Dimensions.get('window').width;

function History(props) {
  const {navigation, token} = props;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [onScroll, setOnScroll] = useState(false);
  const [date, setDate] = useState('');
  const [dateChange, setDateChange] = useState(new Date());
  const [visible, setVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getData(1, '', []);
  }, []);

  const onGoBack = () => {
    navigation.goBack();
  };

  const getData = async (pageN, dateN, dataN) => {
    const _pageN = pageN || 1;
    const _dateN = dateN || '';
    const _dataN = dataN || [];
    const apiURL = `${URL.LOCAL_HOST}${URL.GET_LIST_CHECK}?page=${_pageN}&page_size=10$date=${_dateN}`;
    const response = await _GET(apiURL, token, false);
    setRefresh(false);
    setLoading(false);
    setOnScroll(false);
    console.log('_GET_LIST_CHECKIN ===========>', response);
    if (
      response.success &&
      response.statusCode === 200 &&
      response.data &&
      response.data.length > 0
    ) {
      setData(_dataN.concat(response.data));
      setPage(_pageN);
    } else {
    }
  };

  const getStatusCheckIn = (check_in, check_out) => {
    if (check_in === null) {
      return 'Chưa check in';
    }
    if (check_out === null) {
      return 'Chưa check out';
    }
    if (check_in === 0 && check_out === 0) {
      return 'Đúng giờ';
    }
    if (check_in === 0 && check_out === 1) {
      return 'Về sớm';
    }
    if (check_in === 1 && check_out === 0) {
      return 'Đi muộn';
    }
    if (
      (check_in === 2 && check_out === 0) ||
      (check_in === 0 && check_out === 2)
    ) {
      return 'Trừ 1 nửa ngày lương';
    }
    if (check_in === 1 && check_out === 1) {
      return 'Đi muộn - Về sớm';
    }
    if (check_in === 2 && check_out === 1) {
      return 'Trừ nửa ngày - Về sớm';
    }
    if (check_in === 1 && check_out === 2) {
      return 'Đi muộn - Trừ nửa ngày';
    }
    if (check_in === 2 && check_out === 2) {
      return 'Không tính lương';
    }
  };

  const getTimeBySeason = () => {
    const currentDate = moment(new Date());
    const fromDate = moment('01/04', 'DD/MM');
    const toDate = moment('31/10', 'DD/MM');
    if (currentDate.diff(fromDate) > 0 && currentDate.diff(toDate) < 0) {
      return '8:00 - 17:30';
    }
    return '8:15 - 17:30';
  };

  const handleLoadMore = () => {
    getData(page + 1, date, data);
    setOnScroll(false);
    setLoading(true);
  };

  const convertTime = (date, format) => {
    if (typeof date === 'string') {
      return moment(date, 'DD/MM/YYYY').format(format);
    }
    return moment(date * 1000).format(format);
  };

  const renderItem = ({item}) => {
    const color =
      item.status_check_in === 0 && item.status_check_out === 0
        ? '#328c4f'
        : '#f43c30';
    return (
      <Card style={styles.card}>
        <View style={[styles.indicator, {backgroundColor: color}]} />
        <View style={styles.row}>
          <View style={{paddingHorizontal: 8}}>
            <Text style={{textAlign: 'center'}}>
              {`Tháng ${convertTime(item.date, 'MM')}`}
            </Text>
            <Text
              style={[styles.status, {textAlign: 'center', paddingTop: 10}]}>
              {convertTime(item.date, 'D')}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 16,
            }}>
            <View
              style={[{flexDirection: 'row', justifyContent: 'space-between'}]}>
              {item.check_in && (
                <Text>{`Vào: ${convertTime(item.check_in, 'HH')}h${convertTime(
                  item.check_in,
                  'mm',
                )}`}</Text>
              )}
              {item.check_out && (
                <Text>{`Ra: ${convertTime(item.check_out, 'HH')}h${convertTime(
                  item.check_out,
                  'mm',
                )}`}</Text>
              )}
            </View>

            <Text style={[styles.status, {paddingTop: 10, color}]}>
              {getStatusCheckIn(item.status_check_in, item.status_check_out)}
            </Text>
          </View>
        </View>
      </Card>
    );
  };

  const onRight = () => {
    setVisible(true);
  };

  const onRefresh = () => {
    setRefresh(true);
    setOnScroll(false);
    getData(1, date, []);
  };

  const onChange = (item) => {
    setDateChange(item);
  };

  const renderFooterComponent = () => {
    return loading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.gray} />
      </View>
    ) : null;
  };

  const onConfirmDate = () => {
    setDate(moment(dateChange).format('DD/MM/YYYY'));
    setVisible(false);
    getData(1, moment(dateChange).format('DD/MM/YYYY'), []);
  };

  return (
    <View style={styles.container}>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 26 : StatusBar.currentHeight}
      />
      <HeaderCustom
        title={'Lịch sử chấm công'}
        height={60}
        goBack={onGoBack}
        rightButton
        rightImage={imgs.settingICon}
        onRight={onRight}
      />
      <View style={styles.timeCheck}>
        <Image source={imgs.clockKeeping} style={styles.avt} />
        <Text style={styles.time}>{getTimeBySeason()}</Text>
      </View>
      <View style={styles.contentHistory}>
        {data.length === 0 && (
          <Text style={styles.noData}>Không có lịch sử</Text>
        )}
        <FlatList
          data={data}
          keyExtractor={(item, index) => String(index)}
          renderItem={renderItem}
          onMomentumScrollBegin={() => setOnScroll(true)}
          onEndReached={!loading && onScroll ? handleLoadMore : null}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooterComponent}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        />
      </View>
      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onTouchCancel={() => {
          setVisible(false);
        }}
        onRequestClose={() => {
          setVisible(false);
        }}>
        <View style={styles.contentContainer}>
          <View style={styles.content}>
            <MonthPicker selectedDate={dateChange} onMonthChange={onChange} />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => setVisible(false)}>
                <Text>Thoát</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={onConfirmDate}>
                <Text>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentHistory: {
    flex: 1,
    marginTop: 16,
  },
  card: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 16,
    width: width - 32,
    backgroundColor: '#ffffff',
    height: 80,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  indicator: {
    width: 8,
  },
  status: {
    fontSize: 14,
    fontWeight: '700',
  },
  timeCheck: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(239, 239, 239)',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  time: {
    fontWeight: 'bold',
    marginHorizontal: 10,
  },

  //
  contentContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 70,
  },
  confirmButton: {
    width: 100,
    borderWidth: 0.5,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 0.5,
    borderRadius: 5,
    width: '100%',
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noData: {
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 24,
  },
});
