import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  FlatList,
  LayoutAnimation,
  Image,
  UIManager,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { BarStatus, HeaderCustom } from '../../../component';
import {
  widthPercentageToDP as wp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { Colors, imgs } from '../../../../utlis';
import moment from 'moment';
import { Card } from 'native-base';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function History(props) {
  const {
    navigation,
    dateCheckIn,
    dateCheckOut,
    timeCheckIn,
    timeCheckOut,
  } = props;
  const [date, setDate] = useState(new Date());
  const onGoBack = () => {
    navigation.goBack();
  };
  const newDate = moment(date).format('DD/MM/YYYY');

  const detailIn =
    newDate === dateCheckIn
      ? 'Check in thành công lúc ' +
      `${timeCheckIn}` +
      ' ngày hôm nay - ' +
      `${dateCheckIn}`
      : 'Hôm nay bạn chưa check in !!!!!';

  const detailOut =
    newDate === dateCheckOut
      ? 'Check out thành công lúc ' +
      `${timeCheckOut}` +
      ' ngày hôm nay - ' +
      `${dateCheckOut}`
      : 'Hôm nay bạn chưa check out !!!!!';
  return (
    <View style={styles.container}>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 46 : StatusBar.currentHeight}
      />
      <HeaderCustom
        title={'Lịch sử chấm công hôm nay'}
        height={60}
        goBack={onGoBack}
      />
      <Card style={styles.card}>
        <Text style={styles.status}>Trạng thái :</Text>
        <View style={styles.row}>
          <Image source={imgs.late} />
          <View style={styles.flex1}>
            <Text style={styles.txtCheck}>Check In :</Text>
          </View>
          <View style={styles.flex2}>
            <Text style={styles.txtDetail} numberOfLines={3}>
              {detailIn}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <Image source={imgs.late} />
          <View style={styles.flex1}>
            <Text style={styles.txtCheck}>Check Out :</Text>
          </View>
          <View style={styles.flex2}>
            <Text style={styles.txtDetail} numberOfLines={3}>
              {detailOut}
            </Text>
          </View>
        </View>
      </Card>
    </View>
  );
}

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  card: {
    width: widthPercentageToDP(90),
    alignSelf: 'center',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#ffffff',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  status: {
    fontWeight: '500',
    fontSize: 17,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 16,
    alignItems: 'center',
  },
  txtCheck: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: '400',
  },
  txtDetail: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: '400',
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
});
