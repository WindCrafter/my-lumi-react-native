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
  Keyboard,
  FlatList,
} from 'react-native';
import moment from 'moment';
import PickerCustom from './component/PickerCustom';
import {
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import InputApply from '../../../component/Input/inputApply';
import langs from '../../../../common/language';
import {BarStatus, HeaderCustom, Button, InputSelect} from '../../../component';
import {imgs, Colors} from '../../../../utlis';
import ApplyIcon from './component/ApplyIcon';
import {Card} from 'native-base';
import Suggest from './component/Suggest';
import Slider from '@react-native-community/slider';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function ApplyOT(props) {
  const {navigation, route, userId, token, overTime, assign} = props;
  const [reason, setReason] = useState('');
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(30);
  const [hour, setHour] = useState(new Date());
  const [mode, setMode] = useState('');
  const [day, setDay] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const goBack = () => {
    navigation.goBack();
  };
  const onChangeHour = (event, selectedShift) => {
    const currentShift = selectedShift || hour;
    console.log(currentShift);
    setHour(currentShift);
    setShowModal(true);
  };
  const onUnshow = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setShowModal(false);
    setMode('');
  };
  const onChangeTime = (value) => {
    setTime(value);
    console.log('---time', value);
  };

  const onChangeDay = (event, selectedDay) => {
    const currentDay = selectedDay || day;
    setShowModal(true);
    setDay(currentDay);
  };
  const onChangeReason = (val) => {
    setReason(val);
    setShow(!show);
  };
  const onShowPicker = (m) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setShowModal(true);
    setMode(m);
  };
  const onSetReason = (val) => {
    setReason(val);
    unFocus();
  };
  const onSetOverTime = () => {
    console.log(userId);
    const data = {
      userId: userId,
      time: time,
      date: moment().format('DD/MM/YYYY'),
      token: token,
      start: moment(hour).format('hh:mm'),
    };
    overTime(data);
  };
  const onFocus = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setShow(true);
  };

  const unFocus = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setShow(false);
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
            <Text style={styles.textUser}>{item.name}</Text>
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
        title={'Đơn xin OT'}
        height={60}
        goBack={goBack}
        fontSize={24}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag">
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

          {!reason && show ? (
            <Card style={styles.card}>
              <Suggest
                detail={'Sửa bug phát sinh.'}
                onPress={() => onSetReason('Sửa bug phát sinh.')}
              />
              <Suggest
                detail={'Bảo đảm tiến độ dự án.'}
                onPress={() => onSetReason('Bảo đảm tiến độ dự án.')}
              />
              <Suggest
                detail={'Bảo trì hệ thống.'}
                onPress={() => onSetReason('Bảo trì hệ thống.')}
              />
              <Suggest
                detail={'Phát triển tính năng mới.'}
                onPress={() => onSetReason('Phát triển tính năng mới.')}
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
              <Image source={imgs.startTime} style={styles.imageStamp} />
            </View>
            <Text style={styles.txtStatus}>{langs.timeStart}</Text>
          </View>
          <Card style={styles.card}>
            <View
              style={[
                styles.row,
                {justifyContent: 'center', alignItems: 'center'},
              ]}>
              <Image source={imgs.startTime} style={styles.icon} />
              <Text style={styles.txtTime}>{time} phút</Text>
            </View>
            <Slider
              style={styles.Slider}
              minimumValue={0}
              maximumValue={240}
              minimumTrackTintColor="#4BBF70"
              maximumTrackTintColor="grey"
              step={5}
              onValueChange={onChangeTime}
              onSlidingComplete={onChangeTime}
              // thumbImage={imgs.miniLogo}
              value={time}
            />
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <View style={styles.img}>
                <Image
                  source={imgs.startTime}
                  style={[styles.imageStamp, {marginRight: 8}]}
                />
                <Text style={styles.txtStatus}>{langs.timeStart}</Text>
              </View>
              <TouchableOpacity
                style={styles.time}
                onPress={() => onShowPicker('time')}>
                <Text style={styles.txtTime}>
                  {moment(hour).format('HH:mm')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <View style={styles.img}>
                <Image
                  source={imgs.startDate}
                  style={[styles.imageStamp, {marginRight: 8}]}
                />
                <Text style={styles.txtStatus}>{langs.day}</Text>
              </View>
              <TouchableOpacity
                style={styles.time}
                onPress={() => onShowPicker('day')}>
                <Text style={styles.txtTime}>
                  {moment(day).format('DD/MM/yyyy')}
                </Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
        {mode === 'time' ? (
          <PickerCustom
            value={hour}
            onChange={onChangeHour}
            onPress={onUnshow}
            mode={'time'}
            show={showModal}
            locale={'en-GB'}
          />
        ) : mode === 'day' ? (
          <PickerCustom
            value={day}
            onChange={onChangeDay}
            onPress={onUnshow}
            mode={'date'}
            show={showModal}
            minimumDate={new Date()}
          />
        ) : null}
        <Button
          title={'Hoàn thành'}
          containerStyle={styles.complete}
          onPress={onSetOverTime}
        />
      </ScrollView>
    </View>
  );
}

export default ApplyOT;

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
    justifyContent: 'space-between',
  },
  img: {
    padding: 8,
    borderRadius: 16,
    alignSelf: 'center',
    marginRight: 8,
    flexDirection: 'row',
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
  row: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  txtTime: {
    fontSize: 16,
    color: Colors.black,
    alignSelf: 'center',
    marginHorizontal: 12,
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
  icon: {
    alignSelf: 'center',
    tintColor: 'black',
  },
  add: {
    fontSize: 24,
    color: 'white',
  },
  btnSubtract: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    width: 32,
    height: 32,
    borderRadius: 24,
    alignSelf: 'center',
    marginRight: 8,
  },
  btnAdd: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    width: 32,
    height: 32,
    borderRadius: 24,
    alignSelf: 'center',
    marginLeft: 8,
  },
  time: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Slider: {
    width: wp(72),
    height: 40,
    alignSelf: 'center',
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
});
