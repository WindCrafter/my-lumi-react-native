import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  FlatList,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import ContactRow from '../../../component/Input/InputContact';
import { BarStatus, HeaderCustom, Input, Alert } from '../../../component';
import { Colors } from '../../../../utlis';
import { imgs } from '../../../../utlis';
const DATA = [
  {
    name: 'Nguyễn Văn Nghị',
    avt: require('../../../../naruto.jpeg'),
    dob: '01/01/2020',
    team: 'App',
    role: 'Leader',
    kpi: '28',
    kpi_6m: '28',
    work: '28',
    key: 'sasas',
  },
  {
    name: 'Lê Mạnh Cường',
    avt: require('../../../../naruto.jpeg'),
    dob: '02/03/2020',
    team: 'App',
    role: 'Staff',
    kpi: '27',
    kpi_6m: '29',
    work: '28',
    key: 'asjba',
  },
  {
    name: 'Nguyễn Xuân Kiên',
    avt: require('../../../../naruto.jpeg'),
    dob: '04/05/2020',
    team: 'App',
    role: 'Intern',
    kpi: '29',
    kpi_6m: '28',
    work: '27',
    key: 'asasa',
  },
];
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


function Contact(props) {
  const [listData, setListData] = useState(DATA);

  const [search, setSearch] = useState('');
  const { navigation } = props;

  const renderItem = (data) => {
    Platform.OS === 'ios'
      ? LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
      : null;
    return (
      <ContactRow
        name={data.item.name}
        leftImage={data.item.avt}
        team={data.item.team}
        dob={data.item.dob}
        role={data.item.role}
        work={data.item.work}
        kpi={data.item.kpi}
        kpi_6m={data.item.kpi_6m}
      />
    );
  };

  const onSearch = () => { };

  const onChangeSearch = (txt) => {
    const newData = DATA.filter((item) => {
      const itemData = `${item.name.toLowerCase()}`;

      const textData = txt.toLowerCase();

      return itemData.indexOf(textData) > -1;
    });
    setListData(newData);
    setSearch(txt);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 46 : StatusBar.currentHeight}
      />
      <HeaderCustom title={'Thông tin liên hệ'} height={60} goBack={goBack} />
      <Input
        button
        leftImage={imgs.search}
        containerStyle={styles.search}
        onPress={onSearch}
        value={search}
        onChangeText={onChangeSearch}
        autoCapitalize={'none'}
        placeholder={'Tìm kiếm ...'}
      />

      <FlatList data={listData} renderItem={renderItem} />
    </View>
  );
}

export default Contact;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: '100%',
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 15,
    marginRight: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: '80%',
    borderRadius: 16,
  },
  backRightBtnLeft: {
    backgroundColor: 'rgb(125, 22, 204)',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  search: {
    alignSelf: 'center',
    borderRadius: 32,
    height: 50,
    width: widthPercentageToDP(90),
    marginVertical: 8,
    backgroundColor: '#ffffff',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: Platform.OS === 'ios' ? 0 : 0.3,
  },
});
