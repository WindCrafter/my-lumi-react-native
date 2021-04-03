import { Card } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import moment from 'moment';
import Modal from 'react-native-modal';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import MonthPicker from 'react-native-month-picker';
import Header from './component/Header';
import { Colors, imgs } from '../../../../utlis/index';
import { BarStatus, HeaderAccount } from '../../../component';
import PickerCustom from '../apply/component/PickerCustom';

const Kpi = props => {
  const { token, navigation, getKPI, confirmKpi, kpi } = props;
  const [month, setMonth] = useState(new Date());
  const [month_, setMonth_] = useState(new Date());
  const [show, setShow] = useState(false);
  const [expand, setExpand] = useState(false);
  useEffect(() => {
    getKPI({ token, month: moment(month).format('MM/YYYY') });
  }, []);

  const onGoBack = () => {
    navigation.goBack();
  };

  const onPressConfirm = () => {
    if (kpi.id) {
      confirmKpi({ id: kpi.id, token, is_confirmed: 1 });
    }
  };

  const onPressFeedback = () => {
    if (kpi.id) {
      confirmKpi({ id: kpi.id, token, is_confirmed: 0 });
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const onSetShow = () => {
    setShow(true);
  };

  const onHideModal = () => {
    setShow(false);
    setMonth_(month);
  };

  const onChangeDatetime = (event, selectedDay) => {
    if (Platform.OS === 'ios') {
      setMonth_(selectedDay);
    } else if (event.type === 'set') {
      setShow(false);
      setMonth(selectedDay);
      setMonth_(selectedDay);
      getKPI({ token, month: moment(selectedDay).format('MM/YYYY') });
    } else {
      setShow(false);
    }
  };

  const onChange = item => {
    setMonth_(item);
  };

  const onExpand = () => {
    setExpand(!expand);
  };

  const onPressConfirmIOS = () => {
    setMonth(month_);
    setShow(false);
    getKPI({ token, month: moment(month_).format('MM/YYYY') });
  };

  return (
    <View style={{ flex: 1 }}>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 36 : StatusBar.currentHeight}
      />
      <HeaderAccount
        title="Xác nhận"
        sub="Kiểm tra thống kê chấm công"
        goBack={goBack}
        shadow
      />
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Card style={styles.card}>
          <TouchableOpacity style={styles.months} onPress={onSetShow}>
            <Text style={styles.txtMonth}>
              Tháng
              {moment(month).format(' MM/YYYY ')}
            </Text>
            <Icon
              size={18}
              name="caret-down-outline"
              style={{ color: Colors.black }}
            />
          </TouchableOpacity>
          <View style={[styles.row]}>
            <Image source={imgs.KPI} style={styles.img} />
            <View style={[styles.row, styles.more]}>
              <Text style={styles.text}>Xếp loại KPI</Text>
              <View style={styles.circle}>
                <Text style={[styles.text, { color: 'green' }]}>
                  {kpi.level || 'A'}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <Image source={imgs.fine} style={styles.img} />
            <View style={[styles.row, styles.more]}>
              <Text style={styles.text}>Đi muộn</Text>
              <View style={{ height: 50, justifyContent: 'center' }}>
                <Text style={[styles.text, { color: 'red' }]}>
                  {`${kpi.fined || 0} ngày`}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <Image source={imgs.lateIcon} style={styles.img} />
            <View style={[styles.row, styles.more]}>
              <Text style={styles.text}>Số ngày nghỉ</Text>
              <View style={styles.circle}>
                <Text style={[styles.text, { color: 'blue' }]}>
                  {kpi.day_off || 0}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <Image source={imgs.buttoncheckin} style={styles.img} />
            <View style={[styles.row, styles.more]}>
              <Text style={styles.text}>Công thực tế</Text>
              <View style={styles.circle}>
                <Text style={[styles.text, { color: 'darkblue' }]}>
                  {kpi.workdays || 0}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={onExpand}>
            <View style={styles.row}>
              <Image source={imgs.overTime} style={styles.img} />
              <View style={[styles.row, styles.more]}>
                <Text style={styles.text}>Tổng thời gian OT</Text>
                <View style={styles.circle}>
                  <Text style={[styles.text, { color: 'darkblue' }]}>
                    {kpi.ot150 + kpi.ot200 + kpi.ot210 + kpi.ot270 || 0}
                  </Text>
                </View>
              </View>
              <Icon
                size={18}
                name={expand ? 'caret-up-outline' : 'caret-down-outline'}
                style={{ color: Colors.black, marginRight: -20, marginLeft: 4 }}
              />
            </View>
          </TouchableOpacity>
          {expand && (
            <View style={styles.row}>
              <View
                style={[styles.more, { marginLeft: 36, borderBottomWidth: 0 }]}
              >
                <View style={styles.hourOT}>
                  <Text style={[styles.text, { color: 'grey' }]}>Hệ số 150%</Text>
                  <Text
                    style={[
                      styles.text,
                      { color: 'rgb(19, 191, 65)', marginRight: 16 },
                    ]}
                  >
                    {kpi.ot150 || 0}
                    <Text style={[styles.text, { color: 'grey' }]}> h</Text>
                  </Text>
                </View>
                <View style={styles.hourOT}>
                  <Text style={[styles.text, { color: 'grey' }]}>Hệ số 200%</Text>
                  <Text
                    style={[
                      styles.text,
                      { color: 'rgb(19, 191, 65)', marginRight: 16 },
                    ]}
                  >
                    {kpi.ot200 || 0}
                    <Text style={[styles.text, { color: 'grey' }]}> h</Text>
                  </Text>
                </View>
                <View style={styles.hourOT}>
                  <Text style={[styles.text, { color: 'grey' }]}>Hệ số 210%</Text>
                  <Text
                    style={[
                      styles.text,
                      { color: 'rgb(19, 191, 65)', marginRight: 16 },
                    ]}
                  >
                    {kpi.ot210 || 0}
                    <Text style={[styles.text, { color: 'grey' }]}> h</Text>
                  </Text>
                </View>
                <View style={styles.hourOT}>
                  <Text style={[styles.text, { color: 'grey' }]}>Hệ số 270%</Text>
                  <Text
                    style={[
                      styles.text,
                      { color: 'rgb(19, 191, 65)', marginRight: 16 },
                    ]}
                  >
                    {kpi.ot270 || 0}
                    <Text style={[styles.text, { color: 'grey' }]}> h</Text>
                  </Text>
                </View>
              </View>
            </View>
          )}
          {/* <View style={styles.row}>
            <Image source={imgs.stampCheck} style={styles.img} />
            <View style={[styles.row, styles.more]}>
              <Text style={styles.text}>Công tính lương</Text>
              <View style={styles.circle}>
                <Text style={[styles.text, {color: 'black'}]}>
                  {kpi.workdays_total || 24}
                </Text>
              </View>
            </View>
          </View> */}

          <View
            style={[
              styles.row,
              { justifyContent: 'space-around', marginTop: 50 },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor:
                    kpi.length === 0 || kpi.is_confirmed === 1
                      ? Colors.itemInActive
                      : 'black',
                },
              ]}
              onPress={onPressFeedback}
              disabled={kpi.length === 0 || kpi.is_confirmed === 1}
            >
              <Text style={styles.textButton}>Kiến nghị</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor:
                    kpi.length === 0 || kpi.is_confirmed === 1
                      ? Colors.itemInActive
                      : 'green',
                },
              ]}
              onPress={onPressConfirm}
              disabled={kpi.length === 0 || kpi.is_confirmed === 1}
            >
              <Text style={styles.textButton}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
      {/* <PickerCustom
        title="Chọn ngày"
        show={show}
        value={month_ || new Date()}
        onChange={onChangeDatetime}
        onHideModal={onHideModal}
        onPress={onPressConfirmIOS}
      /> */}
      <Modal
        isVisible={show}
        animationIn="slideInUp"
        animationOutTiming={500}
        animationOut="slideOutDown"
        onBackdropPress={onHideModal}
        // style={styles.modal}
        backdropTransitionOutTiming={0}
      >
        <View style={styles.contentContainer}>
          <View style={styles.contentModal}>
            <MonthPicker selectedDate={month_} onMonthChange={onChange} />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-around' }}
            >
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={onPressConfirmIOS}
              >
                <Text>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    borderRadius: 32,
  },
  container: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  textPass: {
    fontSize: 16,
    height: 20,
    marginTop: 8,
    marginLeft: 32,
  },
  content: {
    paddingHorizontal: 16,
    marginVertical: 10,
    flex: 1,
  },
  card: {
    borderRadius: 16,
    backgroundColor: Colors.white,
    overflow: 'hidden',
    paddingHorizontal: 26,
    paddingVertical: 20,
  },
  headerCard: {
    paddingVertical: 50,
    paddingHorizontal: 16,
  },
  txtTitleCard: {
    fontSize: 24,
    color: '#0db14b',
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    tintColor: 'black',
    marginRight: 12,
    width: 24,
    height: 24,
  },
  more: {
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
  circle: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.4,
    // shadowRadius: 2,
    // elevation: 2,
  },
  textButton: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  months: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    // backgroundColor: Colors.itemInActive,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
  },
  txtMonth: {
    fontSize: 16,
  },
  contentModal: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 70,
    borderRadius: 16,
    overflow: 'hidden',
  },
  confirmButton: {
    width: 100,
    borderWidth: 0.5,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewOT: {
    flex: 1,
    // flexDirection: 'row',
  },
  hourOT: {
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 16,
    flexDirection: 'row',
  },
});
export default Kpi;
