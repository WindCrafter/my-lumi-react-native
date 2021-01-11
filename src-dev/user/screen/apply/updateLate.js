/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
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
import { Card } from 'native-base';
import InputApply from '../../../component/Input/inputApply';
import langs from '../../../../common/language';
import {
  BarStatus,
  HeaderCustom,
  Button,
  InputSelect,
  SelectButton,
} from '../../../component';
import { _global } from '../../../../utlis/global/global';

import { imgs, Colors } from '../../../../utlis';
import ApplyIcon from './component/ApplyIcon';
import Suggest from './component/Suggest';
import PickerCustom from './component/PickerCustom';

if (
  Platform.OS === 'android'
  && UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function UpdateLate(props) {
  const { navigation, setLateEarly, token, assign, route, updateLateEarly } = props;
  const { id, date, typeRoute, timeRoute, content, statusRoute } = route.params;

  const [reason, setReason] = useState(content);
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(timeRoute);

  const goBack = () => {
    navigation.goBack();
  };
  const [showModal, setShowModal] = useState(false);

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
  const [day, setDay] = useState(moment(date, 'DD/MM/YYYY')._d);
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
    const field = typeRoute === '1' ? 'đi muộn' : 'về sớm';
    if (!reason) {
      _global.Alert.alert({
        title: langs.alert.remind,
        message: `Vui lòng điền lí do ${field}`,
        messageColor: Colors.danger,
        leftButton: { text: langs.alert.ok },
      });
      return;
    }
    const data = {
      id,
      date: moment(day).format('DD/MM/YYYY'),
      type: typeRoute,
      time,
      token,
      content: reason,
      status: statusRoute,
    };

    updateLateEarly(data);
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
  const renderDropdown = (hideOverlay) => {
    return (
      <FlatList
        data={choose}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => renderItem(item, hideOverlay)}
        contentContainerStyle={{
          backgroundColor: 'white',
          width: 120,
          borderRadius: 8,
        }}
        style={{ height: 300 }}
      />
    );
  };

  const renderItem = (item, hideOverlay) => {
    return (
      <View>
        {item.value === '0' ? null : <View style={styles.line} />}
        <TouchableOpacity
          style={{
            paddingVertical: 5,
            alignSelf: 'center',
            paddingHorizontal: 8,
          }}
          onPress={() => onPressItem(item, hideOverlay)}
        >
          <Text
            style={[
              styles.txtTime,
              { color: time === item.value ? Colors.background : 'black' },
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const onPressItem = (item, hideOverlay) => {
    hideOverlay && hideOverlay();
    setTime(item.value);
  };

  const choose = [
    { label: '15 phút', value: 15 },
    { label: '30 phút', value: 30 },
    { label: '45 phút', value: 45 },
    { label: '60 phút', value: 60 },
  ];

  return (
    <View style={styles.container}>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 46 : StatusBar.currentHeight}
      />
      <HeaderCustom
        title="Sửa đơn đi muộn"
        height={60}
        goBack={goBack}
        fontSize={24}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardDismissMode="interactive"
      >
        <View style={styles.detail}>
          <View style={styles.row}>
            <View style={styles.img}>
              <Image source={imgs.reason} style={styles.imageStamp} />
            </View>
            <Text style={styles.txtStatus}>{langs.reasonSum}</Text>
          </View>
          <InputApply
            borderRadius={12}
            backgroundColor="white"
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
            blurOnSubmit
            rightIcon
          />

          {!reason && show ? (
            <Card style={styles.card}>
              <Suggest
                detail="Tắc đường."
                onPress={() => onSetReason('Tắc đường.')}
              />
              <Suggest
                detail="Có việc đột xuất."
                onPress={() => onSetReason('Có việc đột xuất.')}
              />
              <Suggest
                detail="Bị hỏng xe."
                onPress={() => onSetReason('Bị hỏng xe.')}
              />
              <Suggest
                detail="Công việc ngoài phạm vi phòng."
                onPress={() => onSetReason('Công việc ngoài phạm vi phòng.')}
              />
              <Suggest
                detail="Lí do cá nhân."
                onPress={() => onSetReason('Lí do cá nhân.')}
              />
            </Card>
          ) : null}
          <View style={styles.row}>
            <View style={styles.img}>
              <Image source={imgs.startTime} style={styles.imageStamp} />
            </View>
            <Text style={styles.txtStatus}>Thông tin đơn nghỉ :</Text>
          </View>
          <Card style={styles.card}>
            <View style={styles.row}>
              {typeRoute === 1 ? (
                <ApplyIcon
                  title="Đến muộn"
                  tintColor="green"
                  color="green"
                />
              ) : (
                <ApplyIcon
                  title="Về Sớm"
                  tintColor="green"
                  source={imgs.clockEarly}
                  height={28}
                  width={28}
                  color="green"
                />
              )}

            </View>

            <View style={[styles.row, { justifyContent: 'space-between' }]}>
              <View style={styles.imgContainer}>
                <Image
                  source={imgs.startDate}
                  style={[styles.imageStamp, { marginRight: 8 }]}
                />
                <Text style={styles.txtStatus}>{langs.day}</Text>
              </View>
              <TouchableOpacity
                style={styles.time}
                onPress={() => onShowPicker('day')}
              >
                <Text style={styles.txtTime}>
                  {moment(day).format('DD/MM/yyyy')}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.row,
                { justifyContent: 'center', alignItems: 'center' },
              ]}
            >
              <TouchableOpacity style={[styles.buttonTime]} disabled>
                <Image source={imgs.startTime} style={styles.icon} />
                <SelectButton
                  dropdownHeight={120}
                  dropdownWidth={128}
                  customY={10}
                  renderDropdown={renderDropdown}
                >
                  <View style={[styles.filter]}>
                    <Text style={styles.txtTime}>{`${time} phút`}</Text>
                    <Text style={styles.icon}>▼</Text>
                  </View>
                </SelectButton>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
        <Button
          title="Hoàn thành"
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
            mode="date"
            show={showModal}
            minimumDate={new Date()}
          />
        ) : null
      ) : null}
    </View>
  );
}

export default UpdateLate;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    zIndex: 0,
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
    marginHorizontal: 8,
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
    borderRadius: 16,
    borderColor: 'grey',
    borderWidth: StyleSheet.hairlineWidth,
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    paddingVertical: 8,
  },
  filter: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
