import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  Image,
  UIManager,
  Text,
} from 'react-native';
import {BarStatus, HeaderCustom} from '../../../component';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Colors, imgs} from '../../../../utlis';
import moment from 'moment';
import {Card} from 'native-base';
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
  const [date] = useState(new Date());
  const onGoBack = () => {
    navigation.goBack();
  };
  const newDate = moment(date).format('DD/MM/YYYY');

  const detailIn =
    newDate === dateCheckIn ? (
      <View style={styles.viewCheck}>
        <Text style={styles.textCheck}>{timeCheckIn}</Text>

        <Text style={styles.textConfirm}>Bạn đã check-in.</Text>
      </View>
    ) : (
      <Text style={styles.textNotDoneYet}>Chưa thực hiện.</Text>
    );

  const detailOut =
    newDate === dateCheckOut ? (
      <View style={styles.viewCheck}>
        <Text style={styles.textCheck}>{timeCheckOut}</Text>

        <Text style={styles.textConfirm}>Bạn đã check-out.</Text>
      </View>
    ) : (
      <Text style={styles.textNotDoneYet}>Chưa thực hiện.</Text>
    );
  return (
    <View style={styles.container}>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 46 : StatusBar.currentHeight}
      />
      <HeaderCustom title={'Lịch sử chấm công'} height={60} goBack={onGoBack} />
      <Card style={styles.card}>
        <View style={styles.viewTop}>
          <Image source={imgs.startDate} />
          <Text style={styles.textHeader}>{newDate}</Text>
        </View>

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
            <Text style={styles.txtCheck}>Check Out:</Text>
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
    fontSize: 19,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 16,
    alignItems: 'center',
    marginLeft: 25,
  },
  txtCheck: {
    marginLeft: 6,
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
    flex: 1.5,
  },
  viewCheck: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  textCheck: {color: 'black', fontWeight: '600', fontSize: 18},
  textConfirm: {color: 'green', fontSize: 15},
  textNotDoneYet: {color: 'black', fontWeight: '600', fontSize: 18},
  viewTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  textHeader: {fontSize: 19, marginLeft: 10, fontWeight: '400'},
});
