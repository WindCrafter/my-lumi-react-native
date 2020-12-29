import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  FlatList,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Combine} from '../../../../component';
const DATA = [
  {
    shift: 'Ca hành chính',
    department: 'R&D',
    timeIn: '08:00',
    timeOut: '18:00',
    status: 'ontime',
    day: 'T2',
    date: '09',
  },
  {
    shift: 'Ca hành chính',
    department: 'R&D',
    timeIn: '08:00',
    timeOut: '18:00',
    status: 'ontime',
    day: 'T2',
    date: '09',
  },
  {
    shift: 'Ca hành chính',
    department: 'R&D',
    timeIn: '08:00',
    timeOut: '18:00',
    status: 'ontime',
    day: 'T2',
    date: '09',
  },
  {
    shift: 'Ca hành chính',
    department: 'R&D',
    timeIn: '08:00',
    timeOut: '18:00',
    status: 'ontime',
    day: 'T2',
    date: '09',
  },
  {
    shift: 'Ca hành chính',
    department: 'R&D',
    timeIn: '08:00',
    timeOut: '18:00',
    status: 'ontime',
    day: 'T2',
    date: '09',
  },
];
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function ContentWeek(props) {
  const [listData, setListData] = useState(DATA);

  const [search, setSearch] = useState('');
  const {navigation} = props;

  const renderItem = ({item, index}) => {
    Platform.OS === 'ios'
      ? LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
      : null;
    return (
      <Combine
        day={item.day}
        date={item.date}
        department={item.department}
        status={item.status}
        shift={item.shift}
        timeIn={item.timeIn}
        timeOut={item.timeOut}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item) => item.index}
      />
    </View>
  );
}

export default ContentWeek;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: '100%',
    width: widthPercentageToDP(100),
  },
});