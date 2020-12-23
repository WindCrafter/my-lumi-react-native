import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';

import HeaderNotify from './component/HeaderNotify';
import {BarStatus} from '../../../component';
import {Card} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import {Colors} from '../../../../utlis';

const fakeData = [
  {
    name: 'Nguyễn Văn Nghị',
    avt: require('../../../../naruto.jpeg'),
    day: '01/01/2020',
    team: 'App',
    role: 'Leader',
    kpi: '28',
    kpi_6m: '28',
    work: '28',
    key: 'ajas',
    type: 'break',
    content:
      'Hôm nay trên đường đi làm gặp kẻ tiểu nhân giữa thanh thiên bạch nhật dám giở trò trộm cắp nên em đã hành hiệp trượng nghĩa, truy đuổi và bắt giữ đối tượng. Hiện em đang trên phường!',
  },
  {
    name: 'Lê Mạnh Cường',
    avt: require('../../../../naruto.jpeg'),
    day: '02/03/2020',
    team: 'App',
    role: 'Staff',
    kpi: '27',
    kpi_6m: '29',
    work: '28',
    key: 'ajasas',
    type: 'late',
    content: 'Chỗ này tắc đường ',
  },
  {
    name: 'Nguyễn Xuân Kiên',
    avt: require('../../../../naruto.jpeg'),
    day: '04/05/2020',
    team: 'App',
    role: 'Intern',
    kpi: '29',
    kpi_6m: '28',
    work: '27',
    key: 'ajasjb',
    type: 'ot',
    content: 'Truy cầu bản ngã , cải thiện đồng lương',
  },
];

const Notify = (props) => {
  // useEffect(() => {
  //   getListNotifys(token);
  // }, []);
  const {navigation, listNotifys} = props;
  const [toTop, setToTop] = useState(false);
  const [position, setPosition] = useState(0);
  const refList = useRef('');
  const [listData, setListData] = useState(
    listNotifys ? listNotifys.notify : fakeData,
  );

  const onToTop = (e) => {
    const pos = e.nativeEvent.contentOffset.y;
    setPosition(pos);
    position - pos > 0
      ? setToTop(true)
      : position === pos
      ? null
      : setToTop(false);
  };

  const onScrolltoTop = () => {
    refList.current.scrollToOffset({animated: true, offset: 0});
  };

  const renderItem = ({item}) => {
    const onShow = () => {
      switch (item.type) {
        case 'confirm_late_early':
          navigation.navigate('Xác nhận', {data: item});
          break;
        case 'confirm_take_leave':
          navigation.navigate('Xác nhận', {data: item});
          break;
        case 'confirm_overtime':
          navigation.navigate('Xác nhận', {data: item});
          break;
        case 'overtime':
          navigation.navigate('Xác nhận đơn', {data: item});
          break;
        case 'take_leave':
          navigation.navigate('Xác nhận đơn', {data: item});
          break;
        case 'late_early':
          navigation.navigate('Xác nhận đơn', {data: item});
          break;
        case 'verify':
          navigation.navigate('Xác nhận Kpi', {data: item});
          break;
      }
    };
    return (
      <TouchableOpacity onPress={onShow}>
        <Card style={styles.card}>
          <Image
            style={styles.img}
            source={require('../../../../naruto.jpeg')}
          />
          <View style={styles.viewText}>
            <Text numberOfLines={3}>{item.name}</Text>
            <Text style={styles.time}>
              {moment(item.createdAt).format('HH:mm - DD/MM/YYYY')}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <BarStatus />
      <HeaderNotify />

      <FlatList
        ref={refList}
        horizontal={false}
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        onScroll={onToTop}
      />
      {toTop ? (
        <View style={styles.toTop}>
          <TouchableOpacity style={styles.btToTop} onPress={onScrolltoTop}>
            <Icon
              name={'arrow-up'}
              color={Colors.white}
              size={24}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      ) : null}
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
    flexDirection: 'row',
  },
  img: {
    width: 48,
    height: 48,
    borderRadius: 1000,
  },
  viewText: {
    flex: 4,
    paddingLeft: 8,
    justifyContent: 'center',
  },
  time: {
    fontSize: 10,
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'left',
    color: 'rgba(4, 4, 15, 0.45)',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    width: 40,
    height: 40,
  },
  toTop: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
  },
  btToTop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {},
});
