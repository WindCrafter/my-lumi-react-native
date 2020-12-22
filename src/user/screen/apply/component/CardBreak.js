import {Card} from 'native-base';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import langs from '../../../../../common/language';
import {Colors, imgs} from '../../../../../utlis';

const CardBreak = (props) => {
  const {status, date, typeBreak, reason} = props;
  const renderItem = ({item, index}) => {
    return <Text>{item}</Text>;
  };
  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <Text style={styles.txttype}>{typeBreak}</Text>
        </View>
      </View>
      <View style={styles.detail}>
        <View style={styles.viewMidle}>
          <View style={styles.viewDetail}>
            <Image source={imgs.selectCalendar} style={styles.calendarDay} />

            <FlatList
              data={date}
              keyExtractor={(item) => item}
              renderItem={renderItem}
            />
          </View>

          <View style={styles.viewStatus}>
            <Image
              source={
                status === 1
                  ? imgs.roundedInfor
                  : status === 2
                  ? imgs.tick
                  : imgs.cancel
              }
              style={[
                styles.imgs,
                {
                  tintColor:
                    status === 1
                      ? Colors.waiting
                      : status === 2
                      ? Colors.background
                      : Colors.danger,
                },
              ]}
            />
            <Text
              style={[
                styles.time,
                {
                  color:
                    status === 1
                      ? Colors.waiting
                      : status === 2
                      ? Colors.background
                      : Colors.danger,
                },
              ]}>
              {status === 1
                ? langs.waiting
                : status === 2
                ? langs.approve
                : langs.denied}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.reason}>
        <Image source={imgs.documentGreen} style={styles.clock} />
        <Text style={styles.time}>{reason}</Text>
      </View>
    </Card>
  );
};

export default CardBreak;

const styles = StyleSheet.create({
  container: {
    width: widthPercentageToDP(100) - 32,
    alignSelf: 'center',
    borderRadius: 16,
    justifyContent: 'flex-start',
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
  },
  txtDay: {
    color: Colors.background,
  },
  leftHeader: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 16,
    paddingVertical: 8,
    borderTopRightRadius: 16,
  },
  rightHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    flexDirection: 'row',
  },
  txttype: {
    color: Colors.white,
  },
  row: {
    flexDirection: 'row',
  },
  detail: {
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  clock: {
    tintColor: Colors.black,
    width: 16,
    height: 16,
    marginRight: 4,
    alignSelf: 'flex-start',
  },
  viewText: {
    justifyContent: 'space-between',
  },
  viewName: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    paddingLeft: 24,
  },
  viewDay: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
  },
  name: {
    fontWeight: '700',
    fontSize: 16,
  },
  time: {
    color: Colors.black,
    fontWeight: '400',
    paddingRight: 12,
    marginTop: -2,
  },
  imgs: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  reason: {
    flexDirection: 'row',
    paddingLeft: 32,
    paddingRight: 16,
    paddingBottom: 16,
    alignItems: 'center',
  },
  line: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'gray',
    marginTop: -8,
  },

  calendarDay: {
    height: 16,
    width: 16,
    
    tintColor: Colors.black,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  date: {
    fontSize: 14,
    alignSelf: 'center',
  },
  viewMidle: {flexDirection: 'row', width: '100%', paddingVertical: 8},
  viewDetail: {flexDirection: 'row', flex: 1, paddingLeft: 24},
  viewStatus: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
});
