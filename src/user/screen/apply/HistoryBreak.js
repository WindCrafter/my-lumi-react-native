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
import CardBreak from './component/CardBreak';

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

const HistoryBreak = (props) => {
  const {navigation} = props;
  const goBack = () => {
    navigation.goBack();
  };
  const onApplyBreak = () => {
    navigation.navigate(langs.navigator.applyBreak);
  };

  const renderItem = ({item, index}) => {
    return <CardBreak leader={false} status={item.status} type={item.type} />;
  };
  return (
    <>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 46 : StatusBar.currentHeight}
      />
      <HeaderCustom
        title={'Lịch sử xin nghỉ phép'}
        rightButton
        goBack={goBack}
        rightImage={imgs.document}
        onRight={onApplyBreak}
      />
      <View>
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    </>
  );
};

export default HistoryBreak;

const styles = StyleSheet.create({});
