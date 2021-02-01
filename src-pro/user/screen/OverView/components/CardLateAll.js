import { Card } from 'native-base';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import langs from '../../../../../common/language';
import { Colors, imgs } from '../../../../../utlis';

const CardLate = (props) => {
  const {
    leader,
    status,
    onAccept,
    onDeny,
    type,
    name,
    day,
    time,
    reason,
    is_updated
  } = props;
  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <Text style={styles.txttype}>
            {type === 1 ? langs.goLate : langs.backSoon}
          </Text>
        </View>
        <View style={styles.rightHeader}>
          <Text style={styles.txtDay}>{day}</Text>
        </View>
      </View>
      <View style={styles.detail}>
        <View style={styles.row}>
          {leader ? (
            <View style={styles.viewName}>
              <Text style={styles.name}>
                {' '}
                {name}
                {' '}
              </Text>
            </View>
          ) : (
            <View style={styles.viewName}>
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
                ]}
              >
                {status === 1
                  ? langs.waiting
                  : status === 2
                    ? langs.approve
                    : langs.denied}
              </Text>
            </View>
          )}
          <View style={styles.viewDay}>
            <Image source={imgs.startTime} style={styles.clock} />
            <Text style={styles.time}>
              {time}
              {' '}
              phút
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.reason}>
        <Image source={imgs.note} style={styles.clock} />
        <Text style={styles.time}>{reason}</Text>
      </View>
     
    </Card>
  );
};

export default CardLate;

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
  },
  rightHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
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
    // tintColor: Colors.background,
    width: 16,
    height: 16,
    marginRight: 4,
  },
  viewText: {
    justifyContent: 'space-between',
  },
  viewDay: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  viewName: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    paddingLeft: 24,
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
  },
  time: {
    fontWeight: '500',
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
  viewLeader: {

    flexDirection: 'row',

  },
  viewButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  buttonDeny: {
    borderRadius: 8,
    paddingVertical: 8,
    width: widthPercentageToDP(30),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonAccept: {
    borderRadius: 8,
    paddingVertical: 8,
    width: widthPercentageToDP(30),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  txtButton: {
    color: Colors.white,

    fontSize: 16,

  },
  viewApproved: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
    alignItems: 'center',
  },
});
