import React, {useState, useEffect} from 'react';
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import {Colors, imgs} from '../../../../utlis';
import {BarStatus} from '../../../component';
import langs from '../../../../common/language';
import CardLate from './component/CardLate';
import ActionButton from './component/ActionButton';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import moment from 'moment';
import HeaderCustom from './component/HeaderCustom';

const DATA = [
  {name: 'Do Tuan Phong', id: '1', status: 1, type: 1},
  {name: 'Do Tuan Phong', id: '2', status: 2, type: 2},
  {name: 'Do Tuan Phong', id: '3', status: 3, type: 1},
  {name: 'Do Tuan Phong', id: '4', status: 1, type: 2},
  {name: 'Do Tuan Phong', id: '5', status: 2, type: 1},
  {name: 'Do Tuan Phong', id: '6', status: 3, type: 1},
  {name: 'Do Tuan Phong', id: '7', status: 2, type: 1},
  {name: 'Do Tuan Phong', id: '8', status: 1, type: 1},
  {name: 'Do Tuan Phong', id: '9', status: 1, type: 1},
];

const HistoryLate = (props) => {
  const {navigation} = props;
  const [type, setType] = useState('Tất cả');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({});
  const goBack = () => {
    navigation.goBack();
  };
  const onApplyLate = () => {
    navigation.navigate(langs.navigator.applyLate);
  };

  const renderItem = ({item, index}) => {
    return <CardLate leader={false} status={item.status} type={item.type} />;
  };

  const onPressCreate = () => {
    navigation.navigate(langs.navigator.approveLate);
  };

  const onChangeDate = (date) => {
    const pickDate = moment(date, 'DD/MM/YYYY').toDate();
    console.log(moment(pickDate).format('DD/MM/YYYY'));
    setFilter({...filter, date: moment(pickDate).format('DD/MM/YYYY')});
    setData([]);
    setPage(1);
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
    onSetType(item);
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
          data={DATA}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={styles.flatList}
        />
      </View>
      <ActionButton onApprove={onApplyLate} onApply={onPressCreate} />
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
