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
import { BarStatus, HeaderCustom, Input, Alert, Button } from '../../component';
import OTRow from './component/OTRow';

import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

const DATA = [
  {
    name: 'Nguyễn Văn Nghị',
    avt: require('../../../naruto.jpeg'),
    day: '01/01/2020',
    team: 'App',
    role: 'Leader',
    kpi: '28',
    kpi_6m: '28',
    work: '28',
    key: 1,
    type: 'break',
    content:
      'Hôm nay trên đường đi làm gặp kẻ tiểu nhân giữa thanh thiên bạch nhật dám giở trò trộm cắp nên em đã hành hiệp trượng nghĩa, truy đuổi và bắt giữ đối tượng. Hiện em đang trên phường!',
  },
  {
    name: 'Lê Mạnh Cường',
    avt: require('../../../naruto.jpeg'),
    day: '02/03/2020',
    team: 'App',
    role: 'Staff',
    kpi: '27',
    kpi_6m: '29',
    work: '28',
    key: 2,
    type: 'late',
    content: 'Chỗ này tắc đường ',
  },
  {
    name: 'Nguyễn Xuân Kiên',
    avt: require('../../../naruto.jpeg'),
    day: '04/05/2020',
    team: 'App',
    role: 'Intern',
    kpi: '29',
    kpi_6m: '28',
    work: '27',
    key: 3,
    type: 'ot',
    content: 'Truy cầu bản ngã , cải thiện đồng lương',
  },
];
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function OT(props) {
  const [listData, setListData] = useState(DATA);
  const { navigation } = props;
  const [check, setCheck] = useState([]);

  const goBack = () => {
    navigation.goBack();
  };

  const onCheck = (item) => {
    const checked = check.find((e) => e.key === item.key);
    checked
      ? setCheck(check.filter((e) => e.key !== item.key))
      : setCheck([...check, item]);
  };

  const renderItem = ({ item, index }) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    return (
      <OTRow
        name={item.name}
        leftImage={item.avt}
        team={item.team}
        day={item.day}
        role={item.role}
        type={item.type}
        check={() => onCheck(item)}
        content={item.content}
      />
    );
  };

  const onAccept = () => {
    const newData = DATA.filter(e => !(check.find(item => e.key == item.key)));
    setListData(newData);
  };

  return (
    <View style={styles.container}>
      <BarStatus
        backgroundColor="rgb(47,172,79)"
        height={Platform.OS === 'ios' ? 46 : StatusBar.currentHeight}
      />
      <HeaderCustom title={'Đơn nghỉ/OT'} height={60} goBack={goBack} />
      <FlatList
        data={listData}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
      />
      <View style={styles.twoButton}>
        <Button
          title={'Accept'}
          backgroundColor={'rgb(47,172,79)'}
          containerStyle={styles.button}
          onPress={onAccept}
        />
        <Button
          title={'Delete'}
          backgroundColor={'tomato'}
          onPress={onAccept}
          containerStyle={styles.button}
        />
      </View>
    </View>
  );
}

export default OT;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: heightPercentageToDP(100),
  },
  twoButton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: widthPercentageToDP(45),
    marginHorizontal: 4,
  },
});
