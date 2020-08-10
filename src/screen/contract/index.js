import React, { useState, useEffect } from 'react';
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
import { BarStatus, HeaderCustom } from '../../component';

import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import ContractRow from './component/contractRow';

const DATA = [
  {
    name: 'Nguyễn Văn Nghị',
    avt: require('../../../naruto.jpeg'),
    dob: '01/01/2020',
    team: 'App',
    role: 'Thực tập',
    outDate: '08/07/2020',
  },
  {
    name: 'Lê Mạnh Cường',
    avt: require('../../../naruto.jpeg'),
    dob: '02/03/2020',
    team: 'App',
    role: 'Thực tập',
    outDate: '08/07/2020',
  },
  {
    name: 'Nguyễn Xuân Kiên',
    avt: require('../../../naruto.jpeg'),
    dob: '04/05/2020',
    team: 'App',
    role: 'Thực tập',
    outDate: '08/07/2020',
  },
];
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function Contract(props) {
  const [listData, setListData] = useState(DATA);
  const { navigation } = props;

  const goBack = () => {
    navigation.goBack();
  };

  const setContract = (item) => {
    navigation.navigate('SetContract', { item });
  };

  const onAddContract = () => {
    navigation.navigate('AddContract');
  };

  const renderItem = ({ item, index }) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    return (
      <ContractRow
        name={item.name}
        leftImage={item.avt}
        team={item.team}
        dob={item.dob}
        role={item.role}
        outDate={item.outDate}
        onPress={() => setContract(item)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <BarStatus
        backgroundColor="rgb(47,172,79)"
        height={Platform.OS === 'ios' ? 46 : StatusBar.currentHeight}
      />
      <HeaderCustom
        title={'Gia hạn hợp đồng'}
        height={60}
        goBack={goBack}
        rightButton
        onRight={onAddContract}
      />
      <FlatList
        data={listData}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
      />
    </View>
  );
}

export default Contract;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: heightPercentageToDP(100),
  },
});
