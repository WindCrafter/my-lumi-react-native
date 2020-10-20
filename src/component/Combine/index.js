import React from 'react';
import {Text, Image, View, StyleSheet, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {imgs, Colors} from '../../../utlis';
import Icon from 'react-native-vector-icons/Feather';
interface Props extends Combine {
  width?: String | Number;
  height?: String | Number;
  timeIn?: String;
  timeOut?: String;
  status?: String;
  day?: String;
  date?: String;
  department?: String;
  defaultTimeIn?: String;
  defaultTimeOut?: String;
}

Combine.defaultProps = {
  width: '96%',
  height: 104,
  backgroundColor: Colors.white,
  timeIn: '08:00',
  timeOut: '18:00',
  status: 'ontime',
  day: 'T2',
  date: '09',
  department: 'R&D',
  shift: 'Ca hành chính',
  defaultTimeIn: '08:00',
  defaultTimeOut: '18:00',
};

export default function Combine(props?: Props) {
  const {
    width,
    height,
    backgroundColor,
    containerStyle,
    timeIn,
    timeOut,
    status,
    day,
    date,
    defaultTimeIn,
    defaultTimeOut,
    department,
    shift,
    ...otherProps
  } = props;

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          backgroundColor,
        },
        containerStyle,
      ]}>
      <View style={styles.time}>
        <Text style={styles.day}>{day}</Text>
        <Text style={styles.day}>{date}</Text>
      </View>
      <View style={styles.viewDetail}>
        <View style={styles.top}>
          <View style={styles.topDetail}>
            <Text style={styles.shift}>{shift}</Text>
            <Text style={styles.department}>{department}</Text>
          </View>
          <View style={styles.viewTime}>
            <Image source={imgs.startTime} style={styles.clock} />
            <Text style={styles.timeDetail}>
              {defaultTimeIn}-{defaultTimeOut}
            </Text>
          </View>
        </View>
        <View style={styles.line} />

        <View style={styles.bot}>
          <View style={styles.detail}>
            <View style={styles.Time}>
              <Text style={styles.title}>Giờ vào:</Text>
              <Text style={styles.description}>{timeIn}</Text>
            </View>
            <View style={styles.Time}>
              <Text style={styles.title}>Giờ ra:</Text>
              <Text style={styles.description}>{timeOut}</Text>
            </View>
          </View>
          <View style={styles.viewTime}>
            {status === 'ontime' ? (
              <Text style={styles.statusTrue}>Đúng giờ</Text>
            ) : (
              <Text style={styles.statusFalse}>Muộn giờ</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-around',
    // borderBottomWidth: 0.25,
    // borderColor: Colors.black,
    marginBottom:16
  },
  time: {
    width: 48,
    height: 48,
    backgroundColor: '#2fac4f',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  viewDetail: {
    width: '80%',
    height: 104,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  day: {color: 'white'},
  top: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  bot: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  viewTime: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  line: {
    width: '80%',
    height: 1,
    backgroundColor: 'grey',
  },
  description: {color: '#008aee', marginLeft: 4},
  statusTrue: {
    color: '#2fac4f',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusFalse: {
    color: '#ff5353',
    fontSize: 16,
    fontWeight: 'bold',
  },
  department: {
    fontWeight: 'bold',
  },
  title: {
    textAlign: 'left',
    width: 60,
  },
  topDetail: {},
  Time: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
    paddingVertical: 2,
  },
  clock: {margin: 4},
});
