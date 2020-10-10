import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Colors, imgs} from '../../../../utlis';
import {InputRow, Button, InputSelect} from '../../../component';
import Icon from 'react-native-vector-icons/Feather';
import {_global} from '../../../../utlis/global/global';
import {Card} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
import PickerCustom from '../apply/component/PickerCustom';
import LocationModal from './component/LocationModal';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const Event = (props) => {
  const refPhone = useRef('');
  const [timeStart, setTimeStart] = useState(new Date());
  const [timeEnd, setTimeEnd] = useState(new Date());
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [phone, setPhone] = useState('');
  const [mode, setMode] = useState('');
  const [show, setShow] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState('');
  const onChangeTitle = () => {};
  const onChangeBirthDay = () => {};
  const onShow = (m) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setShow(true);
    setMode(m);
  };
  const onUnshow = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setShow(false);
    setMode('');
  };
  const onChangeTimeStart = (event, selectedTimeStart) => {
    const currentTimeStart = selectedTimeStart || timeStart;
    setShow(Platform.OS === 'ios');
    setTimeStart(currentTimeStart);
  };
  const onChangeTimeEnd = (event, selectedTimeEnd) => {
    const currentTimeEnd = selectedTimeEnd || timeEnd;
    setShow(Platform.OS === 'ios');
    setTimeEnd(currentTimeEnd);
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
  const hideModal = () => {
    setShowModal(false);
  };
  const onChangeLocation = () => {
    setShowModal(true);
  };

  return (
    <>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.header}>
          <Text style={styles.txtHeader}>
            Vui lòng kiểm tra lịch tại đây trước khi tạo mới.{' '}
          </Text>
        </View>
        <InputRow
          containerStyle={styles.txtInput}
          title={'Tiêu đề : '}
          size={16}
          value={phone}
          onChangeText={onChangeTitle}
          refInput={refPhone}
          leftImage={imgs.title}
        />
        <Card style={styles.Description}>
          <TextInput
            multiline
            placeholder={'Tóm tắt sự kiện, lịch họp hoặc hoạt động'}
            maxLength={40}
            style={styles.txtDescription}
          />
        </Card>
        <Card style={styles.card}>
          <View style={styles.rowBot}>
            <View style={styles.column}>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    marginVertical: 20,
                    backgroundColor: Colors.white,
                    flexDirection: 'row',
                  },
                ]}
                onPress={() => onShow('timeStart')}>
                <Image
                  source={imgs.startTime}
                  style={[styles.imageStamp, {tintColor: '#455997'}]}
                />
                <Text style={[styles.txtTime, {color: '#455997'}]}>
                  {moment(timeStart).format('HH:mm')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: Colors.white,
                  },
                ]}
                onPress={() => onShow('dateStart')}>
                <Image
                  source={imgs.breakDay}
                  style={[styles.imageStamp, {tintColor: '#455997'}]}
                />

                <Text style={[styles.txtTime, {color: '#455997'}]}>
                  {moment(dateStart).format('DD/MM/yyyy')}
                </Text>
              </TouchableOpacity>
            </View>
            <Icon
              name="chevron-right"
              size={96}
              color={'gray'}
              style={styles.icon}
            />
            <View style={styles.column}>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: Colors.white,
                    flexDirection: 'row',
                    marginVertical: 20,
                  },
                ]}
                onPress={() => onShow('timeEnd')}>
                <Image
                  source={imgs.startTime}
                  style={[styles.imageStamp, {tintColor: '#00821c'}]}
                />

                <Text style={[styles.txtTime, {color: '#00821c'}]}>
                  {moment(timeEnd).format('HH:mm')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: Colors.white,
                  },
                ]}
                onPress={() => onShow('dateEnd')}>
                <Image
                  source={imgs.breakDay}
                  style={[styles.imageStamp, {tintColor: '#00821c'}]}
                />
                <Text style={[styles.txtTime, {color: '#00821c'}]}>
                  {moment(dateEnd).format('DD/MM/yyyy')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
        {show ? (
          mode === 'timeStart' ? (
            <PickerCustom
              value={timeStart}
              onChange={onChangeTimeStart}
              onPress={onUnshow}
              mode={'time'}
            />
          ) : mode === 'timeEnd' ? (
            <PickerCustom
              value={timeEnd}
              onChange={onChangeTimeEnd}
              onPress={onUnshow}
              mode={'time'}
            />
          ) : mode === 'dateStart' ? (
            <PickerCustom
              value={dateStart}
              onChange={onChangeDateStart}
              onPress={onUnshow}
              mode={'date'}
            />
          ) : mode === 'dateEnd' ? (
            <PickerCustom
              value={dateEnd}
              onChange={onChangeDateEnd}
              onPress={onUnshow}
              mode={'date'}
            />
          ) : null
        ) : null}
        <InputSelect
          width={'90%'}
          leftImage={imgs.location}
          borderRadius={32}
          height={54}
          shadowColor={'white'}
          title={'Địa điểm'}
          padding={8}
          marginVertical={18}
          containerStyle={styles.viewInputSelect}
          onPressButton={onChangeLocation}
          shadowOpacity={0.1}
          marginRight={-30}
          color={'rgba(4, 4, 15, 0.45)'}
          detail={location}
        />
        <InputSelect
          width={'90%'}
          leftImage={imgs.personal}
          borderRadius={32}
          height={54}
          shadowColor={'white'}
          title={'Người tham gia'}
          padding={8}
          marginVertical={18}
          containerStyle={styles.viewInputSelect}
          onPressButton={onChangeBirthDay}
          shadowOpacity={0.1}
          marginRight={-30}
          color={'rgba(4, 4, 15, 0.45)'}
          detail={''}
        />
      </KeyboardAvoidingView>
      <LocationModal
        showModal={showModal}
        setModal={hideModal}
        onPress={(e) => setLocation(e)}
        detail={location}
      />
    </>
  );
};

export default Event;

const styles = StyleSheet.create({
  container: {},
  header: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 32,
  },
  txtHeader: {
    color: Colors.black,
    fontSize: 14,
    textAlign: 'left',
    paddingHorizontal: 14,
    marginBottom: 20,
  },

  avatar: {
    height: 96,
    width: 96,
    borderRadius: 64,
    backgroundColor: 'rgba(4,4,15,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    alignSelf: 'center',
  },
  iconAvt: {
    width: 48,
    height: 48,
    marginRight: 6,
    marginBottom: 4,
  },
  txtInput: {
    width: '90%',
    borderRadius: 16,
    backgroundColor: 'white',
    marginVertical: 16,
    shadowColor: 'rgba(0,0,25,0.17)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    height: 54,
  },
  viewInputSelect: {
    marginVertical: 16,
    backgroundColor: 'white',
    borderRadius: 16,
  },
  Description: {
    width: '90%',
    borderRadius: 16,
    backgroundColor: 'white',
    marginVertical: 16,
    shadowColor: 'rgba(0,0,25,0.17)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    height: 124,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  txtDescription: {paddingHorizontal: 24, fontSize: 16},
  card: {
    borderRadius: 16,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
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
    justifyContent: 'space-around',
  },
  column: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  icon: {
    alignSelf: 'center',
  },
  imageStamp: {
    width: 20,
    height: 20,
  },
  button: {
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    flexDirection: 'row',
  },
});
