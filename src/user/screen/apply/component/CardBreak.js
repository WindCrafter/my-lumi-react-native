import {Card} from 'native-base';
import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import langs from '../../../../../common/language';
import {Colors, imgs} from '../../../../../utlis';

const CardBreak = (props) => {
  const {
    leader,
    status,
    onAccept,
    onDeny,
    type,
    name,
    date,
    typeBreak,
    reason,
  } = props;
  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <Text style={styles.txttype}>
            {typeBreak}
          </Text>
        </View>
       
      </View>
      <View style={styles.detail}>
        <View style={styles.row}>
          {leader ? (
            <View style={styles.viewName}>
              <Text style={styles.name}> {name} </Text>
            </View>
          ) : (
            <View style={styles.viewName}>
              <Image source={imgs.selectCalendar} style={styles.calendarDay} />

              <Text style={styles.date}>{date}</Text>
            </View>
          )}
          {!leader ? (<View style={styles.viewDay}>
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
          ) : (
              <View style={styles.viewName}>
                <Image source={imgs.selectCalendar} style={styles.calendarDay} />

                <Text style={styles.date}>{date}</Text>
              </View>
            )}
        </View>
      </View>
      <View style={styles.reason}>
        <Image source={imgs.note} style={styles.clock} />
        <Text style={styles.time}>{reason}</Text>
      </View>
      {leader && (
        <>
          <View style={styles.line} />
          {status === 1 ? (
            <View style={styles.viewLeader}>
              <View style={styles.viewButton}>
                <TouchableOpacity style={styles.buttonDeny} onPress={onDeny}>
                  <Text style={styles.txtButton}>{langs.deny}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.viewButton}>
                <TouchableOpacity
                  style={styles.buttonAccept}
                  onPress={onAccept}>
                  <Text style={styles.txtButton}>{langs.accept}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.viewApproved}>
              <Image
                source={status === 2 ? imgs.tick : imgs.cancel}
                style={[
                  styles.clock,
                  {tintColor: status === 2 ? Colors.background : Colors.danger},
                ]}
              />
              <Text
                style={[
                  styles.time,
                  {color: status === 2 ? Colors.background : Colors.danger},
                ]}>
                {status === 2 ? langs.approve : langs.deny}
              </Text>
            </View>
          )}
        </>
      )}
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
    tintColor: Colors.background,
    width: 16,
    height: 16,
    marginRight: 4,
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
    justifyContent: 'center',
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
  },
  time: {
    color: Colors.background,
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
    paddingVertical: 8,
    flexDirection: 'row',
  },
  viewButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDeny: {
    borderRadius: 16,
    paddingVertical: 8,
    width: widthPercentageToDP(30),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.danger,
  },
  buttonAccept: {
    borderRadius: 16,
    paddingVertical: 8,
    width: widthPercentageToDP(30),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  txtButton: {
    color: Colors.white,
    fontWeight: '600',
  },
  viewApproved: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
    alignItems: 'center',
  },
  calendarDay: {
    height: 16,
    width: 16,
    marginRight: 4,
    tintColor: Colors.background,
  },
  date : {
    width:90,
    fontSize:16
  }
});
