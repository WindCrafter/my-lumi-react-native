import React, {useState, useEffect} from 'react';
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Colors, imgs} from '../../../../utlis';
import {BarStatus, HeaderCustom} from '../../../component';
import Icon from 'react-native-vector-icons/Feather';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Card} from 'native-base';
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

const ApproveBreak = (props) => {
  const {navigation} = props;
  const goBack = () => {
    navigation.goBack();
  };
  const onApplyLate = () => {
    navigation.navigate(langs.navigator.applyLate);
  };

  const renderItem = ({item, index}) => {
    return (
      <CardBreak
        leader={true}
        status={item.status}
        type={item.type}
        name={item.name}
      />
    );
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
        onRight={onApplyLate}
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

export default ApproveBreak;

const styles = StyleSheet.create({});
