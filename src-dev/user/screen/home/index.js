import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  UIManager,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { Card } from 'native-base';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { ActionSheet } from '@nghinv/react-native-action-sheet';
import { sum } from 'lodash';
import { useIsFocused } from '@react-navigation/native';
import { BarStatus } from '../../../component';
import Header from './component/header';
import { Colors, imgs } from '../../../../utlis';
import Event from './component/event';
import FloatButton from './component/ActionButton';
import CardUser from './component_user/user';
import langs from '../../../../common/language';
import { _global } from '../../../../utlis/global/global';
import { URL } from '../../../../utlis/connection/url';
import { _GET, _POST } from '../../../../utlis/connection/api';

const DATA_EVENT = [
  {
    id: '1',
    detail: 'Nay là 1 ngày trọng đại  ',
    time: '10:00   20/11/2020',
    source: imgs.event,
  },
  {
    id: '2',
    detail: 'Mai là 1 ngày trọng đại',
    time: '13:45   21/11/2020',
    source: imgs.event,
  },
  {
    id: '3',
    detail: 'Kia là 1 ngày trọng đại',
    time: '15:45   22/11/2020',
    source: imgs.event,
  },
];

if (
  Platform.OS === 'android'
  && UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Home(props) {
  const {
    navigation,
    nameUser,
    token,
    summary,
    getSummary,
    getWorkdayToday,
    role,
    unreadNotify,
    getUnreadNotify,
    avatar,
  } = props;
  const [refresh, setRefresh] = useState(false);
  const [dataEvent, setDataEvent] = useState([]);

  const onPressNotify = () => {
    navigation.navigate(langs.navigator.notify);
  };

  const onPressLate = () => {
    navigation.navigate(langs.navigator.historyLate);
  };
  const onPressBreak = () => {
    navigation.navigate(langs.navigator.historyBreak);
  };

  const onPressOT = () => {
    navigation.navigate(langs.navigator.listOT);
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getSummary(token);
      getUnreadNotify(token);
      getWorkdayToday({ token, date: moment().format('DD/MM/YYYY') });
      getDataEvent();
    }
  }, [isFocused]);
  const getDataEvent = async () => {
    const apiURL = `${URL.LIST_EVENT}?page=1&page_size=3&status&date=`;
    const response = await _GET(apiURL, token, false);
    console.log('_GET_LIST_Event ===========>', response);
    if (
      response.success
      && response.statusCode === 200
      && response.data
      && response.data.length > 0
    ) {
      setDataEvent(response.data);
    }
  };
  const onDeleteEvent = async (_id) => {
    const apiURL = `${URL.DELETE_EVENT}`;
    const response = await _POST(apiURL, { _id }, token, false);
    console.log('_GET_LIST_Event ===========>', _id);
    if (
      response.success
      && response.statusCode === 200
    ) {
      getDataEvent();
      _global.Loading.hide();
    } else {
      _global.Loading.hide();
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        rightButton: {
          text: langs.alert.ok,
        },
      });
    }
  };
  const onDone = () => {
    setRefresh(false);
  };
  const onRefresh = () => {
    getSummary(token);
    getWorkdayToday({ token, date: moment().format('DD/MM/YYYY'), onDone });
    getDataEvent();
  };
  const onPressApprove = () => {
    navigation.navigate(langs.navigator.approve, { page: role === 'HR' ? 3 : 0 });
  };

  const moveToHistory = () => {
    navigation.navigate(langs.navigator.history);
  };

  const moveToHistoryBreak = () => {
    navigation.navigate(langs.navigator.historyBreak);
  };

  const moveToHistoryLate = () => {
    navigation.navigate(langs.navigator.historyLate);
  };
  const moveToUpdate = () => {
    navigation.navigate(langs.navigator.updateProfile);
  };
  const time_late = () => {
    const hour = Math.floor(summary.check_in_out_late_early / 60);
    const minute = summary.check_in_out_late_early % 60;
    return `${hour}h ${minute}m`;
  };

  const gotoDetailEvent = (item) => {
    navigation.navigate(langs.navigator.detailEvent, { item });
  };

  const onPressHR = () => {
    navigation.navigate(langs.navigator.listEvent, { DATA_EVENT });
  };

  const onAddEvent = () => {
    navigation.navigate(langs.navigator.addEvent);
  };

  const onAlertDelete = (_id) => {
    _global.Alert.alert({
      title: langs.alert.notify,
      message: 'Bạn có chắc chắn muốn xoá sự kiện đã chọn không !!!',
      leftButton: {
        text: 'Xác nhận',
        textStyle: {
          color: Colors.danger,
        },
        onPress: () => onDeleteEvent(_id),
      },
      rightButton: {
        text: 'Huỷ',
        onPress: () => {
        },
      },
    });
  };

  const onEditItem = (item) => {
    ActionSheet.show({
      bottomTitle: 'Huỷ',
      bottomButtonProps: {
        titleStyle: styles.btn
      },
      zIndex: 10,
      options: [
        {
          title: 'Chỉnh sửa',
          leftIconName: 'edit',
          titleColor: Colors.black,
          leftIconColor: Colors.black,
          onPress: () => onMoveToEdit(item),
        },
        {
          title: 'Xoá',
          leftIconName: 'delete',
          titleColor: Colors.danger,
          leftIconColor: Colors.danger,
          onPress: () => onAlertDelete(item._id),
        },
      ],
    });
  };

  const onNothing = () => {
    console.log('Not role to edit');
  };

  const onMoveToEdit = (item) => {
    navigation.navigate(langs.navigator.editEvent, { _item: item });
  };

  return (
    <>
      <View style={styles.container}>
        <BarStatus height={0} hidden />

        <Header
          pressNotify={onPressNotify}
          name={nameUser}
          numberNotifys={unreadNotify}
          pressAvatar={moveToUpdate}
          avatar={avatar}
        />

        <View style={styles.flex}>
          <LinearGradient
            style={styles.top}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['#216632', '#2FAC4F']}
          />
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
            }
          >
            <View style={styles.groupCard}>
              <TouchableOpacity onPress={moveToHistory}>
                <CardUser
                  backgroundColor="rgb( 229, 246, 255)"
                  number={
                    summary.actual_date_month ? summary.actual_date_month : 0
                  }
                  detail="Công thực tế"
                  source={imgs.clockEarly}
                  imgBackground="rgb( 183, 231, 254)"
                  numberColor="rgb(46, 114, 249)"
                  tintColor="rgb(46, 114, 249)"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={moveToHistoryBreak}>
                <CardUser
                  backgroundColor="rgb( 255, 240, 234)"
                  number={summary.day_off_month ? summary.day_off_month : 0}
                  detail="Ngày nghỉ"
                  source={imgs.breakOneDay}
                  imgBackground="rgb(255,218,201)"
                  numberColor="rgb(255, 86, 46)"
                  tintColor="rgb(255, 86, 46)"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.botCard}>
              <CardUser
                backgroundColor="rgb(226, 246, 234)"
                number={summary.day_of_leave ? summary.day_of_leave : 0}
                detail="Phép tồn"
                source={imgs.selectCalendar}
                imgBackground="rgb(195, 233, 209)"
                numberColor="rgb(52, 141, 80)"
                tintColor="rgb(52, 141, 80)"
              />
              <TouchableOpacity onPress={moveToHistoryLate}>
                <CardUser
                  backgroundColor="rgb(246, 243, 255)"
                  number={
                    summary.check_in_out_late_early ? time_late() : '0h 0m'
                  }
                  detail="Giờ làm bù"
                  source={imgs.clockAlert}
                  imgBackground="rgb(217, 211, 253)"
                  numberColor="rgb(108, 74, 248)"
                  tintColor="rgb(108, 74, 248)"
                />
              </TouchableOpacity>
            </View>
            <Card style={styles.card}>
              <View>
                <Event
                  data={dataEvent}
                  onPress={gotoDetailEvent}
                  role={role}
                  onPressHR={onPressHR}
                  onLongPress={role === 'HR' ? onEditItem : onNothing}
                  AddEvent={onAddEvent}
                />
              </View>
            </Card>
          </ScrollView>
          <FloatButton
            onPressLate={onPressLate}
            onPressBreak={onPressBreak}
            onPressOT={onPressOT}
            onPressApprove={onPressApprove}
            permission={role}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: { flex: 6 },
  card: {
    borderRadius: 16,
    marginTop: 11,
    width: widthPercentageToDP(100) - 24,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    shadowColor: 'black',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  top: {
    height: 30,
    width: '100%',
    backgroundColor: Colors.background,
    position: 'absolute',
  },
  groupCard: {
    width: '100%',
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botCard: {
    width: '100%',
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 5,
  },
  btn: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  }
});
