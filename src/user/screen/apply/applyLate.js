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
import moment from 'moment';
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
import PickerCustom from './component/PickerCustom';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function ApplyLate(props) {
  const {navigation, setLateEarly, token, assign} = props;
  const [reason, setReason] = useState('');
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(30);

  const [type, setType] = useState('late');
  const goBack = () => {
    navigation.goBack();
  };
  const [showModal, setShowModal] = useState(false);

  const onChangeTime = (value) => {
    setTime(value);
    console.log('---time', value);
  };
  const onComplete = () => {
    onsetLateEarly();
  };
  const onChangeDay = (event, selectedDay) => {
    const currentDay = selectedDay || day;
    setShowModal(Platform.OS === 'ios');
    setDay(currentDay);
  };
  const onChangeReason = (val) => {
    setReason(val);
    setShow(!show);
  };

  const onSetReason = (val) => {
    setReason(val);
    unFocus();
  };
  const [day, setDay] = useState(new Date());
  const [mode, setMode] = useState('');
  const onUnshow = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setShowModal(false);
    setMode('');
  };
  const onShowPicker = (m) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setShowModal(true);
    setMode(m);
  };
  const onsetLateEarly = () => {
    const data = {
      type: type,
      time: time,
      date: moment(day).format('DD/MM/YYYY'),
      token: token,
      description: reason,
      advance: {},
      assignTo: assign ? assign.userId : null,
    };
    setLateEarly(data);
    console.log('checkkk----', data);
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
  const onSetLate = () => {
    setType('late');
  };
  const onSetEarly = () => {
    setType('early');
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
              {/* <Text style={styles.textPos}>{item.pos}</Text> */}
            </View>
          </View>
        </View>
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
        title={'Đơn xin đi muộn'}
        height={60}
        goBack={goBack}
        fontSize={24}
        containerStyle={{backgroundColor: 'grey'}}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive">
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
            rightIcon
          />

          {!reason && show ? (
            <Card style={styles.card}>
              <Suggest
                detail={'Tắc đường.'}
                onPress={() => onSetReason('Tắc đường.')}
              />
              <Suggest
                detail={'Có việc đột xuất.'}
                onPress={() => onSetReason('Có việc đột xuất.')}
              />
              <Suggest
                detail={'Bị hỏng xe.'}
                onPress={() => onSetReason('Bị hỏng xe.')}
              />
              <Suggest
                detail={'Công việc ngoài phạm vi phòng.'}
                onPress={() => onSetReason('Công việc ngoài phạm vi phòng.')}
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
            title={assign ? 'Đổi người phê duyệt ' : 'Chọn người phê duyệt'}
            padding={8}
            marginVertical={18}
            containerStyle={styles.viewInputSelect}
            onPressButton={onGoAssignment}
            shadowOpacity={0.1}
            marginRight={-30}
            color={'rgba(4, 4, 15, 0.45)'}
            detail={''}
          />
          {assign && (
            <Card style={[styles.card, {width: widthPercentageToDP(90) - 32}]}>
              <FlatList
                data={[assign]}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
              />
            </Card>
          )}
          <View style={styles.row}>
            <View style={styles.img}>
              <Image source={imgs.startTime} style={styles.imageStamp} />
            </View>
            <Text style={styles.txtStatus}>{'Thông tin đơn nghỉ :'}</Text>
          </View>
          <Card style={styles.card}>
            <View style={styles.row}>
              <ApplyIcon
                title={'Đến muộn'}
                onPress={onSetLate}
                tintColor={type === 'late' ? 'green' : 'grey'}
                color={type === 'late' ? 'green' : 'grey'}
              />
              <ApplyIcon
                title={'Về Sớm'}
                onPress={onSetEarly}
                tintColor={type === 'early' ? 'green' : 'grey'}
                source={imgs.clockEarly}
                height={28}
                width={28}
                color={type === 'early' ? 'green' : 'grey'}
              />
            </View>
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
              maximumValue={60}
              minimumTrackTintColor="#4BBF70"
              maximumTrackTintColor="grey"
              step={15}
              onValueChange={onChangeTime}
              onSlidingComplete={onChangeTime}
              // thumbImage={imgs.miniLogo}
              value={time}
            />
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <View style={styles.imgContainer}>
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
        {showModal ? (
          mode === 'day' ? (
            <PickerCustom
              value={day}
              onChange={onChangeDay}
              onPress={onUnshow}
              mode={'date'}
              show={showModal}
              minimumDate={new Date()}
            />
          ) : null
        ) : null}
        <Button
          title={'Hoàn thành'}
          containerStyle={styles.complete}
          onPress={onComplete}
        />
      </ScrollView>
      <View style={styles.bottom} />
    </View>
  );
}

export default ApplyLate;

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
    marginVertical: 16,
    justifyContent: 'space-between',
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
  bottom: {
    position: 'absolute',
    bottom: 32,
    left: wp(12.5),
  },
  row: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  txtTime: {
    fontSize: 16,
    color: Colors.black,
    alignSelf: 'center',
    marginHorizontal: 8,
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
  },
  slider: {
    width: '90%',
    alignSelf: 'center',
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
  Slider: {width: wp(72), height: 40, alignSelf: 'center'},
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
    fontWeight: '500',
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
  imgContainer: {
    padding: 8,
    borderRadius: 16,
    alignSelf: 'center',
    marginRight: 8,
    flexDirection: 'row',
  },
  time: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
