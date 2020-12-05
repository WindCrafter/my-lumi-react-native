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
import {BarStatus, HeaderCustom} from '../../../component';
import langs from '../../../../common/language';
import CardLate from './component/CardLate';
import ActionButton from './component/ActionButton';
import {heightPercentageToDP} from 'react-native-responsive-screen';

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

  return (
    <>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 46 : StatusBar.currentHeight}
      />
      <HeaderCustom title={'Lịch sử xin đi muộn/về sớm'} goBack={goBack} />
      <View style={styles.container}>
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={styles.flatList}
        />
      </View>
      <ActionButton onPressLate={onApplyLate} onPressOT={onPressCreate} />
    </>
  );
};

export default HistoryLate;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  flatList: {
    marginBottom: heightPercentageToDP(12),
    flexGrow: 1,
  },
});
