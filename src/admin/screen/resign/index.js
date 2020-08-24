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

import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import ResignRow from './component/resignRow';
import { BarStatus, HeaderCustom } from '../../../component';

const DATA = [
  {
    name: 'Nguyễn Văn Nghị',
    avt: require('../../../../naruto.jpeg'),
    dob: '01/01/2020',
    team: 'App',
    role: 'Leader',
    dayout: '08/07/2020',
  },
  {
    name: 'Lê Mạnh Cường',
    avt: require('../../../../naruto.jpeg'),
    dob: '02/03/2020',
    team: 'App',
    role: 'Staff',
    dayout: '08/07/2020',
  },
  {
    name: 'Nguyễn Xuân Kiên',
    avt: require('../../../../naruto.jpeg'),
    dob: '04/05/2020',
    team: 'App',
    role: 'Intern',
    dayout: '08/07/2020',
  },
];
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function Resign(props) {
  const [listData, setListData] = useState(DATA);
  const { navigation } = props;
  const [check, setCheck] = useState([]);

  const goBack = () => {
    navigation.goBack();
  };

  const renderItem = ({ item, index }) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    return (
      <ResignRow
        name={item.name}
        leftImage={item.avt}
        team={item.team}
        dob={item.dob}
        role={item.role}
        dayout={item.dayout}
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
        title={'Nhân sự nghỉ việc'}
        height={60}
        goBack={goBack}
      />
      <FlatList
        data={listData}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
      />
    </View>
  );
}

export default Resign;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: heightPercentageToDP(100),
  },
});
