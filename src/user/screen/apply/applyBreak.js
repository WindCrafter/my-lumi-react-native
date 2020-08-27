/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Image,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {TextSelect, InputSelect} from '../../../component';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import moment from 'moment';
import InputApply from '../../../component/Input/inputApply';
import langs from '../../../../common/language';
import {BarStatus, HeaderCustom, Button} from '../../../component';
import {imgs, Colors} from '../../../../utlis';
import ModalBreak from './ModalBreak/index';
const BORDERWIDTH = 1;
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function ApplyBreak(props) {
  const {navigation, route} = props;
  const [date, setDate] = useState(new Date(1598051730000));
  const [time, setTime] = useState(new Date(1598051730000));
  const [dateEnd, setDateEnd] = useState(new Date(1598051730000));
  const [timeEnd, setTimeEnd] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('');
  const [start, setStart] = useState('');
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [typeShift, setTypeShift] = useState('Ca sáng');
  const [check, setCheck] = useState(true);
  const [typeBreak, setTypeBreak] = useState('Vui lòng chọn');
  const goBack = () => {
    navigation.goBack();
  };
  const onSetClose = () => {
    setShowModal(false);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  const onSetTypeShift = () => {
    typeShift === 'Ca sáng'
      ? setTypeShift('Ca chiều')
      : typeShift === 'Ca chiều'
      ? setTypeShift('Ca sáng')
      : null;
  };
  const onChangeTime = (event, selectedDate) => {
    const currentTime = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setTime(currentTime);
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDateEnd = selectedDate || dateEnd;
    setShow(Platform.OS === 'ios');
    setDateEnd(currentDateEnd);
  };
  const onSetBreakShift = () => {
    setTypeBreak('Nghỉ theo ca');
  };
  const onSetBreakDay = () => {
    setTypeBreak('Nghỉ một ngày');
  };
  const onSetBreakMoreDay = () => {
    setTypeBreak('Nghỉ nhiều ngày');
  };
  const onChangeTimeEnd = (event, selectedDate) => {
    const currentTimeEnd = selectedDate || dateEnd;
    setShow(Platform.OS === 'ios');
    setTimeEnd(currentTimeEnd);
  };
  const onSetModal = () => {
    setShowModal(!showModal);
  };
  const onSetCheck = () => {
    setCheck(!check);
  }; //m-time , v-start mode
  const onShowStart = (m, v) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setShow(true);
    setStart(v);
    setMode(m);
  };

  const onShowEnd = (m, v) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setShow(true);
    setStart(v);
    setMode(m);
  };

  const onComplete = () => {
    Alert.alert('end');
  };

  const onUnshow = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setShow(false);
    setStart('');
    setMode('');
  };

  return (
    <View style={styles.container}>
      <BarStatus
        backgroundColor="rgb(47,172,79)"
        height={Platform.OS === 'ios' ? 46 : StatusBar.currentHeight}
      />
      <HeaderCustom
        title={'Đơn xin nghỉ phép'}
        height={60}
        goBack={goBack}
        fontSize={24}
      />
      <ScrollView>
        <Text style={styles.extend}>{langs.enterInfo} </Text>
        <View style={styles.detail}>
          <View style={styles.row}>
            <View style={styles.img}>
              <Image source={imgs.reason} style={styles.imageStamp} />
            </View>
            <Text style={styles.txtStatus}>{langs.reasonSum}</Text>
          </View>
          <InputApply backgroundColor={'white'} />
          <View style={styles.row}>
            <View style={styles.img}>
              <Image source={imgs.startDate} style={styles.imageStamp} />
            </View>
            <Text style={styles.txtStatus}>{langs.timeBreak}</Text>
          </View>
          <InputSelect
            testID="test_Rank"
            leftImage={''}
            backgroundColor={'white'}
            title={typeBreak}
            detail={''}
            containerStyle={{
              height: 70,
              justifyContent: 'center',
              alignSelf: 'center',
              borderRadius: 16,
              paddingHorizontal: 16,
              width: wp(90),
              borderWidth: 2,
              shadowColor: 'white',
            }}
            onPressButton={onSetModal}
          />

          {!showModal ? (
            typeBreak === 'Nghỉ theo ca' ? (
              <>
                <View style={styles.row}>
                  <View style={styles.img}>
                    <Image source={imgs.DOB} style={styles.imageStamp} />
                  </View>
                  <Text style={styles.txtStatus}>{langs.timeStart}</Text>
                </View>
                <View style={[styles.row, {alignSelf: 'center'}]}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        width: wp(30),
                        marginRight: wp(5),
                        backgroundColor: Colors.white,
                        flexDirection: 'row',
                      },
                    ]}
                    onPress={onSetTypeShift}>
                    <Image source={imgs.startTime} style={styles.imageStamp} />

                    <Text style={styles.txtTime}>{typeShift}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        backgroundColor: Colors.white,
                      },
                    ]}
                    onPress={() => onShowStart('date', 'start')}>
                    <Image source={imgs.breakDay} style={styles.imageStamp} />

                    <Text style={styles.txtTime}>
                      {moment(date).format('DD/MM/YYYY')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : typeBreak === 'Nghỉ một ngày' ? (
              <>
                <View style={styles.row}>
                  <View style={styles.img}>
                    <Image source={imgs.startTime} style={styles.imageStamp} />
                  </View>
                  <Text style={styles.txtStatus}>{langs.timeEnd}</Text>
                </View>
                <View style={[styles.row, {alignSelf: 'center'}]}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        backgroundColor: Colors.white,
                      },
                    ]}
                    onPress={() => onShowEnd('date', 'end')}>
                    <Image source={imgs.breakDay} style={styles.imageStamp} />
                    <Text style={styles.txtTime}>
                      {moment(dateEnd).format('DD/MM/YYYY')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : typeBreak === 'Nghỉ nhiều ngày' ? (
              <>
                <View style={styles.row}>
                  <View style={styles.img}>
                    <Image source={imgs.startTime} style={styles.imageStamp} />
                  </View>
                  <Text style={styles.txtStatus}>{langs.timeEnd}</Text>
                </View>

                <View style={[styles.rowBot, {alignSelf: 'center'}]}>
                      <Text style={styles.txtStatus}>Từ</Text>

                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        width: wp(40),
                        backgroundColor: Colors.white,
                      },
                    ]}
                    onPress={() => onShowEnd('date', 'end')}>
                        <Image source={imgs.breakDay} style={styles.imageStamp} />

                    <Text style={styles.txtTime}>
                      {moment(dateEnd).format('DD/MM/YYYY')}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.txtStatus}>đến</Text>

                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        width: wp(40),
                        // marginRight: wp(5),
                        backgroundColor: Colors.white,
                      },
                    ]}
                    onPress={() => onShowEnd('date', 'end')}>
                        <Image source={imgs.breakDay} style={styles.imageStamp} />

                    <Text style={styles.txtTime}>
                      {moment(dateEnd).format('DD/MM/YYYY')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : null
          ) : null}
        </View>
        {show ? (
          mode === 'time' ? (
            <>
              <TouchableOpacity style={styles.unshow} onPress={onUnshow}>
                {Platform.OS === 'ios' ? (
                  <Text style={styles.txtX}>X</Text>
                ) : null}
              </TouchableOpacity>
              <DateTimePicker
                value={start === 'start' ? time : timeEnd}
                mode={'time'}
                display="default"
                onChange={start === 'start' ? onChangeTime : onChangeTimeEnd}
                is24hour={true}
              />
            </>
          ) : mode === 'date' ? (
            <>
              <TouchableOpacity style={styles.unshow} onPress={onUnshow}>
                {Platform.OS === 'ios' ? (
                  <Text style={styles.txtX}>X</Text>
                ) : null}
              </TouchableOpacity>
              <DateTimePicker
                value={start === 'start' ? date : dateEnd}
                mode={'date'}
                display="default"
                onChange={start === 'start' ? onChange : onChangeEnd}
                is24hour={true}
              />
            </>
          ) : null
        ) : null}
        <ModalBreak
          showModal={showModal}
          pressShift={onSetBreakShift}
          pressDay={onSetBreakDay}
          pressMoreDay={onSetBreakMoreDay}
          setModal={onSetModal}
          typeBreak={typeBreak}
          setCheck={onSetCheck}
          setClose={onSetClose}
        />
      </ScrollView>
      <View style={styles.bottom}>
        <Button
          title={'Hoàn thành '}
          containerStyle={styles.complete}
          onPress={onComplete}
        />
      </View>
    </View>
  );
}

export default ApplyBreak;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: heightPercentageToDP(100),
  },
  containerUser: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: wp(95),
    paddingVertical: 8,
    borderRadius: 8,
    marginVertical: 6,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '300',
    color: Colors.background,
  },
  detail: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginHorizontal: 12,
  },
  status: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 16,
  },
  img: {
    padding: 8,
    borderRadius: 16,
    alignSelf: 'center',
    marginRight: 12,
  },
  imageStamp: {
    width: 20,
    height: 20,
  },
  txtStatus: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '300',
  },
  extend: {
    fontSize: 18,
    fontWeight: '500',
    marginHorizontal: 27,
    marginTop: 16,
    marginBottom: 4,
  },
  end: {
    backgroundColor: 'red',
  },
  complete: {
    backgroundColor: Colors.background,
  },
  bottom: {
    position: 'absolute',
    bottom: 32,
    left: wp(12.5),
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 4,

  },rowBot:{
    flexDirection: 'row',
    marginHorizontal:4,
    marginVertical: 4,
    justifyContent:'space-between',
    width:wp(98)
  },
  button: {
    height: 60,
    width: wp(60),
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: BORDERWIDTH,
    borderColor: Colors.border,
    flexDirection: 'row',
  },
  txtTime: {
    fontSize: 20,
    color: Colors.black,
    marginLeft: 10,
  },
  unshow: {
    height: 28,
    width: 28,
    borderRadius: 14,
    right: 0,
    backgroundColor: 'tomato',
    alignSelf: 'flex-end',
    marginRight: 24,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtX: {
    color: Colors.white,
    fontWeight: '900',
  },
  columnTick: {
    flexDirection: 'column',
  },
});
