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
import DropDownPicker from 'react-native-dropdown-picker';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import InputApply from '../../../component/Input/inputApply';
import langs from '../../../../common/language';
import {BarStatus, HeaderCustom, Button, InputSelect} from '../../../component';
import {imgs, Colors} from '../../../../utlis';
import ApplyIcon from './component/ApplyIcon';
import {Card} from 'native-base';
import Suggest from './component/Suggest';
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
  const [time, setTime] = useState(15);
  const [isVisible, setVisible] = useState(false);
  const [type, setType] = useState('late');
  const onSetVisible = () => {
    setVisible(!isVisible);
  };
  const onClose = () => {
    setVisible(false);
  };
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
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{paddingBottom: 40}}
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
            <View
              style={[
                styles.row,
                {justifyContent: 'center', alignItems: 'center'},
              ]}>
              <TouchableOpacity
                style={[
                  styles.buttonTime,
                  {
                    borderBottomRightRadius: isVisible ? 0 : 16,
                    borderBottomLeftRadius: isVisible ? 0 : 16,
                  },
                ]}
                onPress={onSetVisible}>
                <Image source={imgs.startTime} style={styles.icon} />

                <DropDownPicker
                  items={[
                    {label: '15 phút', value: '15'},
                    {label: '30 phút', value: '30'},
                    {label: '45 phút', value: '45'},
                    {label: '60 phút', value: '60'},
                  ]}
                  onClose={onClose}
                  isVisible={isVisible}
                  containerStyle={{
                    height: 40,
                    width: 100,
                    borderColor: 'white',
                  }}
                  onChangeItem={(item) => setTime(item.value)}
                  placeholder={'15 phút'}
                  defaultValue={null}
                  customTickIcon={() => <Image source={imgs.arrow} />}
                  style={{
                    borderWidth: 0,
                    paddingRight: 0,
                    paddingLeft: 10,
                    paddingHorizontal: 0,
                  }}
                  itemStyle={{alignItems: 'flex-end'}}
                  dropDownStyle={styles.dropDownStyle}
                  labelStyle={{fontSize: 18}}
                  arrowSize={19}
                  activeLabelStyle={{color: Colors.background}}
                  dropDownMaxHeight={200}
                  onOpen={onSetVisible}
                  zIndex={100}
                />
              </TouchableOpacity>
            </View>
          </Card>
        </View>
        <Button
          title={'Hoàn thành'}
          containerStyle={styles.complete}
          onPress={onComplete}
        />
      </ScrollView>
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
    </View>
  );
}

export default ApplyLate;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    zIndex: 0
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
    flex: 1,
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
    marginTop: 150,
  },
  bottom: {
    position: 'absolute',
    bottom: 32,
    left: wp(12.5),

  },
  row: {
    flexDirection: 'row',
    marginVertical: 8,
    flex: 1,
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
    width: wp(70),
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
  dropDownStyle: {
    width: 148,
    left: -36,
    height: hp(18),
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderColor: 'grey',
    borderWidth: StyleSheet.hairlineWidth,
  },
  buttonTime: {
    flexDirection: 'row',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderColor: 'grey',
    borderWidth: StyleSheet.hairlineWidth,
    width: 148,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
