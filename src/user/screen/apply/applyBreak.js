/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
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
import {InputSelect} from '../../../component';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
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
  const {navigation} = props;
  const [shift, setShift] = useState(new Date(1598051730000));
  const [day, setDay] = useState(new Date(1598051730000));
  const [dateStart, setDateStart] = useState(new Date(1598051730000));
  const [dateEnd, setDateEnd] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('');
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [typeShift, setTypeShift] = useState('Ca sáng');
  const [check, setCheck] = useState(true);
  const [typeBreak, setTypeBreak] = useState('Vui lòng chọn');
  const [start, setStart] = useState('');

  const goBack = () => {
    navigation.goBack();
  };
  const onSetClose = () => {
    setShowModal(false);
  };

  const onSetTypeShift = () => {
    typeShift === 'Ca sáng'
      ? setTypeShift('Ca chiều')
      : typeShift === 'Ca chiều'
      ? setTypeShift('Ca sáng')
      : null;
  };
  const onUnshow = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setShow(false);
    setStart('');
    setMode('');
  };
  const onChangeShift = (event, selectedShift) => {
    const currentShift = selectedShift || shift;
    setShow(Platform.OS === 'ios');
    setShift(currentShift);
  };
  const onChangeDay = (event, selectedDay) => {
    const currentDay = selectedDay || day;
    setShow(Platform.OS === 'ios');
    setDay(currentDay);
  };
  const onChangeDateStart = (event, selectedDateStart) => {
    const currentDateStart = selectedDateStart || dateStart;
    setShow(Platform.OS === 'ios');
    setDateStart(currentDateStart);
  };
  const onChangeDateEnd = (event, selectedDateEnd) => {
    const currentDateEnd = selectedDateEnd || dateEnd;
    setShow(Platform.OS === 'ios');
    setDateEnd(currentDateEnd);
  };
  const onSetBreakShift = () => {
    setTypeBreak('Nghỉ theo ca');
    setShow(false);
    setMode('');
  };
  const onSetBreakDay = () => {
    setTypeBreak('Nghỉ một ngày');
    setShow(false);
    setMode('');
  };
  const onSetBreakMoreDay = () => {
    setTypeBreak('Nghỉ nhiều ngày');
    setShow(false);
    setMode('');
  };
  const onSetModal = () => {
    setShowModal(!showModal);
  };
  const onSetCheck = () => {
    setCheck(!check);
  }; //m-time , v-start mode
  const onShow = (m) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setShow(true);
    setMode(m);
  };

  const onComplete = () => {
    Alert.alert('end');
  };

  return (
    <View style={styles.container}>
      <BarStatus
        backgroundColor={Colors.white}
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
          <InputApply
            borderRadius={12}
            backgroundColor={'white'}
            paddingLeft={30}
            containerStyle={{
              height: 70,
              justifyContent: 'center',
              alignSelf: 'center',
              borderRadius: 16,
              width: wp(90),
              borderWidth: 2,
              shadowColor: 'white',
            }}
          />
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
              borderRadius: 16,
              borderWidth: 2,
              shadowColor: 'white',
            }}
            paddingVertical={16}
            onPressButton={onSetModal}
          />

          {!showModal ? (
            typeBreak === 'Nghỉ theo ca' ? (
              <>
                <View style={styles.row}>
                  <View style={styles.img}>
                    <Image source={imgs.DOB} style={styles.imageStamp} />
                  </View>
                  <Text style={styles.txtStatus}>{langs.timeBreak}</Text>
                </View>
                <View style={[styles.row, {alignSelf: 'center',}]}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        width: wp(35),
                        marginRight: 10,
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
                    onPress={() => onShow('shift')}>
                    <Image source={imgs.breakDay} style={styles.imageStamp} />

                    <Text style={styles.txtTime}>
                      {moment(shift).format('DD/MM/YYYY')}
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
                  <Text style={styles.txtStatus}>{langs.timeBreak}</Text>
                </View>
                <View style={[styles.row, {alignSelf: 'center'}]}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        backgroundColor: Colors.white,
                      },
                    ]}
                    onPress={() => onShow('oneday')}>
                    <Image source={imgs.breakDay} style={styles.imageStamp} />
                    <Text style={styles.txtTime}>
                      {moment(day).format('DD/MM/YYYY')}
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
                  <Text style={styles.txtStatus}>{langs.timeBreak}</Text>
                </View>

                <View style={[styles.rowBot, {alignSelf: 'center'}]}>
                  <Text style={styles.txtStatus}>Từ :</Text>

                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        width: wp(40),
                        backgroundColor: Colors.white,
                      },
                    ]}
                    onPress={() => onShow('datestart')}>
                    <Image source={imgs.breakDay} style={styles.imageStamp} />

                    <Text style={styles.txtTime}>
                      {moment(dateStart).format('DD/MM/YYYY')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.rowBot, {alignSelf: 'center'}]}>
                  <Text style={styles.txtStatus}>Đến :</Text>

                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        width: wp(40),
                        // marginRight: wp(5),
                        backgroundColor: Colors.white,
                      },
                    ]}
                    onPress={() => onShow('dateend')}>
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
          mode === 'shift' ? (
            <>
              {Platform.OS === 'ios' ? (
                <TouchableOpacity style={styles.unshow} onPress={onUnshow}>
                  <Text style={styles.txtX}>X</Text>
                </TouchableOpacity>
              ) : null}

              <DateTimePicker
                value={shift}
                mode={'date'}
                display="default"
                onChange={onChangeShift}
                is24hour={true}
              />
            </>
          ) : mode === 'oneday' ? (
            <>
              {Platform.OS === 'ios' ? (
                <TouchableOpacity style={styles.unshow} onPress={onUnshow}>
                  <Text style={styles.txtX}>X</Text>
                </TouchableOpacity>
              ) : null}

              <DateTimePicker
                value={day}
                mode={'date'}
                display="default"
                onChange={onChangeDay}
              />
            </>
          ) : mode === 'datestart' ? (
            <>
              {Platform.OS === 'ios' ? (
                <TouchableOpacity style={styles.unshow} onPress={onUnshow}>
                  <Text style={styles.txtX}>X</Text>
                </TouchableOpacity>
              ) : null}

              <DateTimePicker
                value={dateStart}
                mode={'date'}
                display="default"
                onChange={onChangeDateStart}
                is24hour={true}
              />
            </>
          ) : mode === 'dateend' ? (
            <>
              {Platform.OS === 'ios' ? (
                <TouchableOpacity style={styles.unshow} onPress={onUnshow}>
                  <Text style={styles.txtX}>X</Text>
                </TouchableOpacity>
              ) : null}

              <DateTimePicker
                value={dateEnd}
                mode={'date'}
                display="default"
                onChange={onChangeDateEnd}
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
    height: '100%',
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
    fontSize: 20,
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
    marginTop: 4,
  },
  rowBot: {
    flexDirection: 'row',
    marginHorizontal: 4,
    marginVertical: 8,
    justifyContent: 'space-around',
    width: wp(98),
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
