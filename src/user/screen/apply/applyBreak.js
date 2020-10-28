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
  Keyboard,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import InputApply from '../../../component/Input/inputApply';
import langs from '../../../../common/language';
import {BarStatus, HeaderCustom, Button, InputSelect} from '../../../component';
import {imgs, Colors} from '../../../../utlis';
import {Card} from 'native-base';
import ApplyIcon from './component/ApplyIcon';
import PickerCustom from './component/PickerCustom';
import Suggest from './component/Suggest';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function ApplyBreak(props) {
  const {navigation, takeLeave, userId, token, assign} = props;
  const [shift, setShift] = useState(new Date());
  const [day, setDay] = useState(new Date());
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [mode, setMode] = useState('');
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [typeShift, setTypeShift] = useState('Ca sáng');
  const [shiftStart, setShiftStart] = useState('Ca sáng');
  const [shiftEnd, setShiftEnd] = useState('Ca sáng');
  const [typeBreak, setTypeBreak] = useState('Theo ca');
  const [reason, setReason] = useState('');
  const onComplete = () => {
    typeBreak === 'Theo ca'
      ? onTakeLeaveShift()
      : typeBreak === 'Một  ngày'
      ? onTakeLeaveDay()
      : onTakeLeaveDays();
  };

  const onTakeLeaveDays = () => {
    console.log(userId);
    const data = {
      userId: userId,
      token: token,
      startDate: {
        date: moment(dateStart).format('DD/MM/YYYY'),
        shift: shiftStart === 'Ca sáng' ? 'morning' : 'afternoon',
      },
      endDate: {
        date: moment(dateEnd).format('DD/MM/YYYY'),
        shift: shiftEnd === 'Ca sáng' ? 'morning' : 'afternoon',
      },
    };
    takeLeave(data);
  };
  const onTakeLeaveDay = () => {
    console.log(userId);
    const data = {
      userId: userId,
      token: token,
      startDate: {
        date: moment(day).format('DD/MM/YYYY'),
        shift: 'morning',
      },
      endDate: {
        date: moment(day).format('DD/MM/YYYY'),
        shift: 'afternoon',
      },
    };
    takeLeave(data);
  };
  const onTakeLeaveShift = () => {
    console.log(userId);
    const data = {
      userId: userId,
      token: token,
      startDate: {
        date: moment(shift).format('DD/MM/YYYY'),
        shift: typeShift === 'Ca sáng' ? 'morning' : 'afternoon',
      },
      endDate: {
        date: null,
        shift: null,
      },
    };
    takeLeave(data);
  };
  const goBack = () => {
    navigation.goBack();
  };
  const onUnshow = () => {
    Platform.OS === 'ios'
      ? LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
      : null;
    setShow(false);
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

  const onSetTypeBreak = (val) => {
    setTypeBreak(val);
    onUnshow();
    unFocus();
  };
  const onShow = (m) => {
    Platform.OS === 'ios'
      ? LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
      : null;
    setShow(true);
    setMode(m);
  };

  const onChangeReason = (val) => {
    setReason(val);
  };

  const onSetReason = (val) => {
    setReason(val);
    unFocus();
  };

  const onSetTypeShift = () => {
    typeShift === 'Ca sáng'
      ? setTypeShift('Ca chiều')
      : setTypeShift('Ca sáng');
  };

  const onSetShiftStart = () => {
    shiftStart === 'Ca sáng'
      ? setShiftStart('Ca chiều')
      : setShiftStart('Ca sáng');
  };

  const onSetShiftEnd = () => {
    shiftEnd === 'Ca sáng' ? setShiftEnd('Ca chiều') : setShiftEnd('Ca sáng');
  };

  const onFocus = () => {
    Platform.OS === 'ios'
      ? LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      : null;
    setShowModal(true);
  };

  const unFocus = () => {
    Platform.OS === 'ios'
      ? LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      : null;
    setShowModal(false);
    Keyboard.dismiss();
  };

  const onGoAssignment = () => {
    navigation.navigate('Assignment');
  };

  const renderItem = ({item, index}) => {
    return (
      <>
        <View style={styles.btUser}>
          <View style={styles.rowUser}>
            <View style={styles.viewImage}>
              <Image
                source={require('../../../../naruto.jpeg')}
                style={styles.avatar}
                resizeMode={'cover'}
              />
            </View>
            <View style={styles.column}>
              <Text style={styles.textUser}>{item.name}</Text>
              <Text style={styles.textPos}>{item.pos}</Text>
            </View>
          </View>
        </View>
        {index === assign.length - 1 ? null : <View style={styles.lineUser} />}
      </>
    );
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
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag">
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
            containerStyle={{
              width: '90%',
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            value={reason}
            onChangeText={onChangeReason}
            onFocus={onFocus}
            onSubmitEditing={unFocus}
            onBlur={unFocus}
            blurOnSubmit={true}
          />
          {!reason && showModal ? (
            <Card style={styles.card}>
              <Suggest
                detail={'Bị ốm.'}
                onPress={() => onSetReason('Bị ốm.')}
              />
              <Suggest
                detail={'Đi công tác.'}
                onPress={() => onSetReason('Đi công tác.')}
              />
              <Suggest
                detail={'Đi chơi.'}
                onPress={() => onSetReason('Đi chơi.')}
              />
              <Suggest
                detail={'Đi khảo sát công trình.'}
                onPress={() => onSetReason('Đi khảo sát công trình.')}
              />
              <Suggest
                detail={'Lí do cá nhân.'}
                onPress={() => onSetReason('Lí do cá nhân.')}
              />
            </Card>
          ) : null}

          <InputSelect
            width={'90%'}
            leftImage={imgs.personal}
            borderRadius={32}
            rightImage={imgs.add}
            height={54}
            shadowColor={'white'}
            title={
              assign && assign.length > 0
                ? `Đang chọn ${assign.length} người phê duyệt `
                : 'Chọn người phê duyệt'
            }
            padding={8}
            marginVertical={18}
            containerStyle={styles.viewInputSelect}
            onPressButton={onGoAssignment}
            shadowOpacity={0.1}
            marginRight={-30}
            color={
              assign && assign.length > 0
                ? Colors.background
                : 'rgba(4, 4, 15, 0.45)'
            }
            detail={''}
          />
          {assign && assign.length > 0 ? (
            <Card style={[styles.card, {width: widthPercentageToDP(90) - 32}]}>
              <FlatList
                data={assign}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
              />
            </Card>
          ) : null}
          <View style={styles.row}>
            <View style={styles.img}>
              <Image source={imgs.startDate} style={styles.imageStamp} />
            </View>
            <Text style={styles.txtStatus}>{langs.timeBreak}</Text>
          </View>
          <Card style={styles.card}>
            <View style={styles.row}>
              <ApplyIcon
                title={'Theo Ca'}
                onPress={() => onSetTypeBreak('Theo ca')}
                tintColor={typeBreak === 'Theo ca' ? Colors.background : 'grey'}
                source={imgs.breakShift}
              />
              <ApplyIcon
                title={'Một ngày'}
                onPress={() => onSetTypeBreak('Một ngày')}
                tintColor={
                  typeBreak === 'Một ngày' ? Colors.background : 'grey'
                }
                source={imgs.breakOneDay}
              />
              <ApplyIcon
                title={'Nhiều ngày'}
                onPress={() => onSetTypeBreak('Nhiều ngày')}
                tintColor={
                  typeBreak === 'Nhiều ngày' ? Colors.background : 'grey'
                }
                source={imgs.breakMoreDay}
              />
            </View>
            {typeBreak === 'Theo ca' ? (
              <View style={[styles.row, {alignSelf: 'center', marginTop: 32}]}>
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
            ) : typeBreak === 'Một ngày' ? (
              <View style={[styles.row, {alignSelf: 'center', marginTop: 32}]}>
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
            ) : typeBreak === 'Nhiều ngày' ? (
              <View style={styles.rowBot}>
                <View style={styles.columnShift}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        // marginVertical: 24,
                        backgroundColor: Colors.white,
                        flexDirection: 'row',
                      },
                    ]}
                    onPress={onSetShiftStart}>
                    <Image
                      source={imgs.startTime}
                      style={[styles.imageStamp, {tintColor: '#455997'}]}
                    />

                    <Text style={[styles.txtTime, {color: '#455997'}]}>
                      {shiftStart}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        backgroundColor: Colors.white,
                      },
                    ]}
                    onPress={() => onShow('datestart')}>
                    <Image
                      source={imgs.breakDay}
                      style={[styles.imageStamp, {tintColor: '#455997'}]}
                    />

                    <Text style={[styles.txtTime, {color: '#455997'}]}>
                      {moment(dateStart).format('DD/MM/YYYY')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Image source={imgs.arrow} style={styles.icon} />
                <View style={styles.columnShift}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        backgroundColor: Colors.white,
                        flexDirection: 'row',
                        // marginVertical: 24,
                      },
                    ]}
                    onPress={onSetShiftEnd}>
                    <Image
                      source={imgs.startTime}
                      style={[styles.imageStamp, {tintColor: '#00821c'}]}
                    />

                    <Text style={[styles.txtTime, {color: '#00821c'}]}>
                      {shiftEnd}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        backgroundColor: Colors.white,
                      },
                    ]}
                    onPress={() => onShow('dateend')}>
                    <Image
                      source={imgs.breakDay}
                      style={[styles.imageStamp, {tintColor: '#00821c'}]}
                    />

                    <Text style={[styles.txtTime, {color: '#00821c'}]}>
                      {moment(dateEnd).format('DD/MM/YYYY')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </Card>
        </View>
        {mode === 'shift' ? (
          <PickerCustom
            value={shift}
            onChange={onChangeShift}
            onPress={onUnshow}
            mode={'date'}
            show={show}
            minimumDate={new Date()}
          />
        ) : mode === 'oneday' ? (
          <PickerCustom
            value={day}
            onChange={onChangeDay}
            onPress={onUnshow}
            mode={'date'}
            show={show}
          />
        ) : mode === 'datestart' ? (
          <PickerCustom
            value={dateStart}
            onChange={onChangeDateStart}
            onPress={onUnshow}
            mode={'date'}
            show={show}
          />
        ) : mode === 'dateend' ? (
          <PickerCustom
            value={dateEnd}
            onChange={onChangeDateEnd}
            onPress={onUnshow}
            mode={'date'}
            show={show}
            minimumDate={new Date()}
          />
        ) : null}

        <Button
          title={'Hoàn thành '}
          containerStyle={styles.complete}
          onPress={onComplete}
        />
      </ScrollView>
    </View>
  );
}

export default ApplyBreak;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: '100%',
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 32,
  },
  detail: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginHorizontal: 12,
  },
  img: {
    padding: 8,
    borderRadius: 16,
    alignSelf: 'center',
    marginRight: 8,
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
  button: {
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    flexDirection: 'row',
  },
  card: {
    borderRadius: 16,
    marginTop: 8,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  row: {
    flexDirection: 'row',
  },
  txtTime: {
    fontSize: 14,
    color: Colors.black,
    marginLeft: 10,
  },
  rowBot: {
    flexDirection: 'row',
    marginHorizontal: 4,
    marginTop: 16,
    justifyContent: 'space-around',
    flex: 1,
  },
  columnShift: {
    alignItems: 'flex-start',
    // borderWidth: 1,
    justifyContent: 'space-around',
  },
  icon: {
    alignSelf: 'center',
  },
  test: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
  btUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowUser: {
    flexDirection: 'row',
    marginVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  lineUser: {
    height: StyleSheet.hairlineWidth,
    width: widthPercentageToDP(70),
    alignSelf: 'center',
    backgroundColor: 'grey',
  },
  textUser: {
    marginLeft: 24,
    fontSize: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 32,
  },
  column: {
    flexDirection: 'column',
  },
  textPos: {
    marginLeft: 24,
    fontSize: 12,
  },
  viewInputSelect: {
    backgroundColor: Colors.white,
  },
});
