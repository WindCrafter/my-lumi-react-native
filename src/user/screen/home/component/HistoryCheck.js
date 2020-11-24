import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import langs from '../../../../../common/language';
import {Colors, imgs} from '../../../../../utlis';

const HistoryCheck = (props) => {
  const {data} = props;
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.viewItem}>
        <View
          style={[
            styles.column,
            {
              backgroundColor:
                index % 2 === 0 ? 'rgb(252, 163, 125)' : 'rgb(46, 114, 249)',
            },
          ]}
        />
        <View style={styles.viewDetail}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.txtTime}>{item.time}</Text>
          </View>
          <View style={styles.timeCheck}>
            <View style={styles.row}>
              <View style={[styles.viewTxtCheck, {alignItems: 'flex-end'}]}>
                <Text>Giờ vào:</Text>
              </View>
              <View style={styles.viewTxtCheck}>
                <Text style={styles.txtCheck}>{item.in}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={[styles.viewTxtCheck, {alignItems: 'flex-end'}]}>
                <Text>Giờ ra:</Text>
              </View>
              <View style={styles.viewTxtCheck}>
                <Text style={styles.txtCheck}>{item.out}</Text>
              </View>
            </View>
          </View>
          <View style={styles.viewType}>
            <Text
              style={{
                color:
                  item.type === 'Đúng giờ' ? Colors.background : Colors.danger,
              }}>
              {item.type}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <View style={styles.manager}>
        <Image source={imgs.selectCalendar} style={styles.imgs} />
        <Text style={styles.txtManager}>{langs.dayWeek}</Text>
      </View>
      <View style={styles.line} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        scrollEnabled
      />
    </>
  );
};

export default HistoryCheck;

const styles = StyleSheet.create({
  manager: {
    flexDirection: 'row',
  },
  txtManager: {
    fontSize: 16,
    height: 30,
    paddingHorizontal: 8,
    textAlign: 'center',
  },
  txtTime: {
    fontSize: 16,
    fontWeight: '500',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgb(112, 112, 112)',
  },
  column: {
    width: 3,
    height: '100%',
    marginRight: 16,
  },
  viewItem: {
    paddingVertical: 2,
    width: '100%',
    marginTop: 8,
    flexDirection: 'row',
  },
  viewDetail: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imgs: {
    width: 24,
    height: 24,
  },
  timeCheck: {
    flex: 3,
  },
  row: {
    flexDirection: 'row',
  },
  viewTxtCheck: {
    flex: 1,
    paddingHorizontal: 4,
  },
  txtCheck: {
    color: 'rgb( 0, 138, 238)',
  },
  viewType: {
    flex: 1,
    justifyContent: 'center',
  },
});
