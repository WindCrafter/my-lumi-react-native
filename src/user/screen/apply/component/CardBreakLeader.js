import {Card} from 'native-base';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  LayoutAnimation,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import langs from '../../../../../common/language';
import {Colors, imgs} from '../../../../../utlis';

const CardBreakLeader = (props) => {
  const {status, onAccept, onDeny, type, name, date, typeBreak, reason} = props;
  const renderItem = ({item, index}) => {
    return <Text>•{item}</Text>;
  };
  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <Text style={styles.txttype}>{typeBreak}</Text>
        </View>
      </View>
      <View>
        <View style={styles.viewMidle}>
          <View style={styles.viewName}>
            <Text style={styles.name}>{name}</Text>
          </View>
          <View style={styles.viewText}>
            <Image source={imgs.selectCalendar} style={styles.calendarDay} />
            <FlatList
              data={date}
              keyExtractor={(item) => item}
              renderItem={renderItem}
            />
          </View>
        </View>
        <View style={styles.reason}>
          <Image source={imgs.documentGreen} style={styles.document} />
          <Text style={styles.time}>{reason}</Text>
        </View>
      </View>

      <View>
        <View style={styles.line} />
        {status === 1 ? (
          <View style={styles.viewLeader}>
            <View style={styles.viewButton}>
              <TouchableOpacity style={styles.buttonDeny} onPress={onDeny}>
                <Text style={styles.txtButton}>{langs.deny}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.viewButton}>
              <TouchableOpacity style={styles.buttonAccept} onPress={onAccept}>
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
      </View>
    </Card>
  );
};

export default CardBreakLeader;

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

  leftHeader: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 16,
    paddingVertical: 8,
    borderTopRightRadius: 16,
  },
  txttype: {
    color: Colors.white,
  },
  row: {
    flexDirection: 'row',
  },

  clock: {
    tintColor: Colors.background,
    width: 16,
    height: 16,
    marginRight: 4,
  },

  viewName: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    paddingLeft: 24,
  },

  name: {
    fontWeight: '600',
    fontSize: 16,
    color: Colors.black,
  },
  time: {
    color: Colors.black,
    fontWeight: '400',
    paddingRight:8
  },
  imgs: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  reason: {
    flexDirection: 'row',
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 16,
    alignItems: 'center',
  },
  line: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'gray',
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
    tintColor: Colors.black,
  },
  date: {
    fontSize: 14,
    alignSelf: 'flex-start',
  },

  document: {
    tintColor: Colors.black,
    width: 16,
    height: 16,
    marginRight: 4,
  },
  viewMidle: {flexDirection: 'row', width: '100%', paddingVertical: 8},
  viewText: {flexDirection: 'row', flex: 1},
});
