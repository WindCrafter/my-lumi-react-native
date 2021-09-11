import React, { useRef, useState, useEffect } from 'react';
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
  StatusBar,
  FlatList,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';
import { Card } from 'native-base';
import moment from 'moment';
import { Colors, imgs } from '../../../../utlis';
import {
  InputRow,
  InputSelect,
  HeaderCustom,
  BarStatus,
  InputPick,
  InputDown,
} from '../../../component';
import PickerCustom from '../apply/component/PickerCustom';
import LocationModal from '../Event/component/LocationModal';
import TimeModal from '../Event/component/TimeModal';
import { _global } from '../../../../utlis/global/global';
import langs from '../../../../common/language';
import { _GET } from '../../../../utlis/connection/api';
import { URL } from '../../../../utlis/connection/url';

if (
  Platform.OS === 'android'
  && UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const UpdateRoom = props => {
  const {
    navigation,
    memberPicked,
    kickMember,
    clearMember,
    token,
    updateRoom,
    route,
    addMember
  } = props;
  const {
    idRoute,
    startTimeRoute,
    endTimeRoute,
    dateRoute,
    subjectRoute,
    contentRoute,
    memberRoute,
    locationRoute,
    loopRoute,
    memberIdsRoute,
    rommIdRoute
  } = route.params;
  console.log('contentRoute', contentRoute);
  const refPhone = useRef('');
  const [title, setTitle] = useState(subjectRoute);
  const [showModal, setShowModal] = useState(false);
  const [showModalTime, setShowModalTime] = useState(false);
  const [location, setLocation] = useState(locationRoute || rommIdRoute == 1 ? 'Phòng họp' : rommIdRoute == 2 ? 'Phòng Chủ Tịch' : rommIdRoute == 3 ? 'Phòng ăn' : null);
  const [select, onSelect] = useState(false);
  const [loop, setLoop] = useState(loopRoute);
  const [hourStart, setHourStart] = useState(moment(startTimeRoute, 'HH:mm')._d);
  const [hourEnd, setHourEnd] = useState(moment(endTimeRoute, 'HH:mm')._d);
  const [start, setStart] = useState(moment(startTimeRoute, 'HH:mm')._d);
  const [end, setEnd] = useState(moment(endTimeRoute, 'HH:mm')._d);
  const [description, setDescription] = useState(contentRoute);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const apiURL = `${URL.MEETING_MEMBERS}`;
    const response = await _GET(apiURL, token, false);
    console.log('_GET_DATA ===========>', response);
    if (response.success && response.statusCode === 200) {
      if (response.data.members && response.data.members.length > 0) {
        // console.log('no', response.data.members);
        const member_infor = [];

        memberIdsRoute.split(',').forEach((i) => response.data.members.forEach((a) => a.member_id === i && member_infor.push(a)));
        // console.log('no no', member_infor);
        addMember(member_infor);
      }
    }
  };
  const onSetSelect = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    onSelect(!select);
  };
  const onSetWeek = () => {
    if (loop === 'week') {
      setLoop('');
    } else {
      setLoop('week');
    }
  };
  const onSetMonth = () => {
    if (loop === 'month') {
      setLoop('');
    } else {
      setLoop('month');
    }
  };
  const onSetYear = () => {
    if (loop === 'year') {
      setLoop('');
    } else {
      setLoop('year');
    }
  };
  const onChangeTitle = val => {
    setTitle(val);
  };

  const hideModal = () => {
    setShowModal(false);
  };
  const hideModalTime = () => {
    setShowModalTime(false);
  };
  const onChangeLocation = () => {
    setShowModal(true);
    Keyboard.dismiss();
  };

  const onGoPickTeam = () => {
    navigation.navigate(langs.navigator.pickTeam);
  };

  const onGoBack = () => {
    navigation.goBack();
    clearMember();
  };

  function onChangeDescription(val) {
    setDescription(val);
  }

  const removeMember = val => {
    kickMember(val);
  };

  const onShowPickerStart = m => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setshowModalTimeStart(true);
  };

  const [dateStart, setDateStart] = useState(new Date());
  const [date, setDate] = useState(moment(dateRoute, 'DD-MM-YYYY')._d);
  const [showModalTimeStart, setshowModalTimeStart] = useState(false);
  const [showModalTimeEnd, setshowModalTimeEnd] = useState(false);
  const [showModalDate, setshowModalDate] = useState(false);
  const onShowPickerDate = m => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setshowModalDate(true);
  };
  const onChangeDate = (event, selectedDay) => {
    const currentDay = selectedDay || dateStart;
    if (Platform.OS === 'ios') {
      setDateStart(currentDay);
    } else if (event.type === 'set') {
      setshowModalDate(false);
      setDate(currentDay);
    } else {
      setshowModalDate(false);
    }
  };
  const onConfirmDate = () => {
    setshowModalDate(false);
    setDate(dateStart);
  };
  const onUnshowDate = () => {
    setshowModalDate(false);
  };
  const onShowPickerEnd = m => {
    if (start) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setshowModalTimeEnd(true);
    } else {
      _global.Alert.alert({
        title: langs.alert.remind,
        message: 'Vui lòng chọn thời gian bắt đầu trước',
        leftButton: { text: langs.alert.ok },
      });
    }
  };
  const onChangeHourStart = (event, selectedShift) => {
    const currentShift = selectedShift || hourStart;
    const today = moment(new Date()).format('DD/MM/YYYY')
      === moment(date).format('DD/MM/YYYY');
    const past = moment(new Date()).format('HH:mm') > moment(currentShift).format('HH:mm');
    if (Platform.OS === 'ios') {
      setHourStart(moment(currentShift)._d);
    } else if (event.type === 'set') {
      setshowModalTimeStart(false);
      if (!today) {
        setStart(moment(currentShift)._d);
      } else {
        !past && setStart(moment(currentShift)._d);
        past
          && _global.Alert.alert({
            title: langs.alert.remind,
            message: 'Không thể chọn thời gian trong quá khứ',
            leftButton: { text: langs.alert.ok },
          });
      }
    } else {
      setshowModalTimeStart(false);
    }
  };
  const onChangeHourEnd = (event, selectedShift) => {
    const currentShift = selectedShift || hourEnd;
    const past = moment(start).format('HH:mm') > moment(currentShift).format('HH:mm');
    if (Platform.OS === 'ios') {
      setHourEnd(moment(currentShift)._d);
    } else if (event.type === 'set') {
      setshowModalTimeEnd(false);
      !past && setEnd(moment(currentShift)._d);
      past
        && _global.Alert.alert({
          title: langs.alert.remind,
          message:
            'Không thể chọn thời gian kết thúc nhỏ hơn thời gian bắt đầu',
          leftButton: { text: langs.alert.ok },
        });
    } else {
      setshowModalTimeEnd(false);
    }
  };
  const onUnshowStart = () => {
    setshowModalTimeStart(false);
  };

  const onUnshowEnd = () => {
    setshowModalTimeEnd(false);
  };
  const onConfirmStart = () => {
    setshowModalTimeStart(false);
    setStart(hourStart);
  };
  const onConfirmEnd = () => {
    setshowModalTimeEnd(false);
    setEnd(hourEnd);
  };
  const renderItem = ({ item, index }) => {
    return (
      <>
        <View style={styles.btUser}>
          <View style={styles.rowUser}>
            <View style={styles.viewImage}>
              <Image
                source={item.avatar ? { uri: item.avatar } : imgs.defaultAvatar}
                style={styles.avatar}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.textUser}>{item.member_name}</Text>
          </View>
          <TouchableOpacity onPress={() => removeMember(item)}>
            <Icon
              name="user-x"
              style={styles.icon}
              size={24}
              color={Colors.danger}
            />
          </TouchableOpacity>
        </View>
        {index === memberPicked.length - 1 ? null : (
          <View style={styles.lineUser} />
        )}
      </>
    );
  };

  const onBlur = () => {
    Keyboard.dismiss();
  };
  const onAddEvent = () => {
    if (title.trim().length === 0) {
      _global.Alert.alert({
        title: langs.alert.remind,
        message: langs.alert.nullTitle,
        leftButton: { text: langs.alert.ok },
      });
      return;
    }
    if (date === '') {
      _global.Alert.alert({
        title: langs.alert.remind,
        message: langs.alert.nullDate,
        leftButton: { text: langs.alert.ok },
      });
      return;
    }
    if (start === '') {
      _global.Alert.alert({
        title: langs.alert.remind,
        message: langs.alert.nullStartTime,
        leftButton: { text: langs.alert.ok },
      });
      return;
    }
    if (end === '') {
      _global.Alert.alert({
        title: langs.alert.remind,
        message: langs.alert.nullEndTime,
        leftButton: { text: langs.alert.ok },
      });
      return;
    }
    if (end < start) {
      _global.Alert.alert({
        title: langs.alert.remind,
        message: langs.alert.invalidStartTime,
        leftButton: { text: langs.alert.ok },
      });
      return;
    }
    if (location === '') {
      _global.Alert.alert({
        title: langs.alert.remind,
        message: langs.alert.nulLocation,
        leftButton: { text: langs.alert.ok },
      });
      return;
    }
    if (memberPicked.length === 0) {
      _global.Alert.alert({
        title: langs.alert.remind,
        message: langs.alert.nulMember,
        leftButton: { text: langs.alert.ok },
      });
      return;
    }
    const name = [];
    const member_ids = [];
    console.log(memberPicked);
    memberPicked.forEach(i => {
      i.member_name !== null ? name.push(i.member_name) : null;
    });
    memberPicked.forEach(i => {
      i.member_id !== null ? member_ids.push(i.member_id) : null;
    });
    console.log('location', location);
    const data = {
      id: idRoute,
      loop:
        loop === ''
          ? 0
          : loop === 'week'
            ? 1
            : loop === 'month'
              ? 2
              : loop === 'year'
                ? 3
                : null,
      end_time: moment(end).format('HH:mm'),
      start_time: moment(start).format('HH:mm'),
      subject: title,
      room_id: location == 'Phòng họp' ? 1 : location == 'Phòng Chủ Tịch' ? 2 : location == 'Phòng ăn' ? 3 : null,
      content: description,
      member: name.toString(),
      token,
      date: moment(date).format('DD-MM-YYYY'),
      member_ids: member_ids.toString(),
    };
    updateRoom(data);
  };

  return (
    <View style={{ ...StyleSheet.absoluteFill, backgroundColor: 'white' }}>
      <HeaderCustom
        title="Đặt lịch phòng họp"
        goBack={onGoBack}
        rightButton
        textPress
        onRight={onAddEvent}
        shadow
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={{ backgroundColor: '#f0f0f0' }}>
          <View style={styles.header} />
          <InputRow
            containerStyle={styles.txtInput}
            title="Nội dung họp :"
            size={16}
            value={title}
            onChangeText={onChangeTitle}
            refInput={refPhone}
            detail="Tiêu đề cuộc họp"
            leftImage={imgs.title}
          />
          <Card style={styles.Description}>
            <TextInput
              multiline
              value={description}
              placeholder="Tóm tắt nội dung họp (Tuỳ chọn)"
              style={styles.txtDescription}
              onBlur={onBlur}
              onChangeText={onChangeDescription}
              placeholderTextColor={Colors.ink400}
            />
          </Card>
          <InputSelect
            width="90%"
            leftImage={imgs.selectCalendar}
            borderRadius={32}
            height={54}
            shadowColor="white"
            title="Chọn ngày"
            padding={8}
            marginVertical={18}
            containerStyle={styles.viewInputSelect}
            onPressButton={onShowPickerDate}
            shadowOpacity={0.1}
            marginRight={-30}
            color="rgba(4, 4, 15, 0.45)"
            detail={
              date !== ''
                ? `${moment(date).format('DD')} tháng ${moment(date).format(
                  'MM',
                )}, ${moment(date).format('YYYY')}`
                : null
            }
            rightImage={imgs.roundedLeft}
          />
          <View style={styles.viewTime}>
            <InputDown
              width="45%"
              borderRadius={32}
              height={54}
              shadowColor="white"
              title="Giờ bắt đầu"
              padding={8}
              marginVertical={18}
              containerStyle={styles.viewInputSelect}
              onPressButton={onShowPickerStart}
              shadowOpacity={0.1}
              color="rgba(4, 4, 15, 0.45)"
              detail={
                start !== ''
                  ? `Từ : ${moment(start).format('HH')} giờ ${moment(
                    start,
                  ).format('mm')}`
                  : null
              }
              rightImage={imgs.roundedLeft}
            />
            <InputDown
              width="45%"
              borderRadius={32}
              height={54}
              shadowColor="white"
              title="Giờ kết thúc"
              padding={8}
              marginVertical={18}
              containerStyle={styles.viewInputSelect}
              onPressButton={onShowPickerEnd}
              shadowOpacity={0.1}
              color="rgba(4, 4, 15, 0.45)"
              detail={
                end !== ''
                  ? `Đến : ${moment(end).format('HH')} giờ ${moment(end).format(
                    'mm',
                  )}`
                  : null
              }
              rightImage={imgs.roundedLeft}
            />
          </View>
          <InputPick
            width="90%"
            leftImage={imgs.calendarWeek}
            rightImage={select ? imgs.roudedDown : imgs.roundedLeft}
            borderRadius={32}
            height={select ? 148 : 54}
            shadowColor="white"
            title="Lặp lại"
            padding={16}
            marginVertical={18}
            containerStyle={styles.viewInputPick}
            onPressButton={onSetSelect}
            shadowOpacity={0.1}
            marginRight={-30}
            color="rgba(4, 4, 15, 0.45)"
            detail=""
            select={select}
            loop={loop}
            onSetWeek={onSetWeek}
          />
          <InputSelect
            width="90%"
            leftImage={imgs.location}
            borderRadius={32}
            height={54}
            shadowColor="white"
            title="Địa điểm : Phòng họp"
            padding={8}
            marginVertical={18}
            containerStyle={styles.viewInputSelect}
            onPressButton={onChangeLocation}
            shadowOpacity={0.1}
            marginRight={-30}
            color="rgba(4, 4, 15, 0.45)"
            detail={location}
            rightImage={imgs.roundedLeft}
          />
          <InputSelect
            width="90%"
            leftImage={imgs.personal}
            borderRadius={32}
            rightImage={imgs.add}
            height={54}
            shadowColor="white"
            title={
              memberPicked.length > 0
                ? `Đã chọn ${memberPicked.length} người tham gia `
                : 'Chọn người tham gia'
            }
            padding={8}
            marginVertical={18}
            containerStyle={styles.viewInputSelect}
            onPressButton={onGoPickTeam}
            shadowOpacity={0.1}
            marginRight={-30}
            color="rgba(4, 4, 15, 0.45)"
            detail=""
          />

          {memberPicked.length > 0 ? (
            <Card style={[styles.card, { width: widthPercentageToDP(90) - 32 }]}>
              <FlatList
                data={memberPicked}
                keyExtractor={(item, index) => String(index)}
                renderItem={renderItem}
              />
            </Card>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>

      <PickerCustom
        value={hourStart}
        onChange={onChangeHourStart}
        onPress={onConfirmStart}
        mode="time"
        show={showModalTimeStart}
        locale="en-GB"
        onHideModal={onUnshowStart}
        minimumDate={
          moment(new Date()).format('DD/MM/YYYY')
            === moment(date).format('DD/MM/YYYY') && new Date()
        }
      />

      <PickerCustom
        value={hourEnd}
        onChange={onChangeHourEnd}
        onPress={onConfirmEnd}
        mode="time"
        show={showModalTimeEnd}
        locale="en-GB"
        onHideModal={onUnshowEnd}
        minimumDate={start || new Date()}
      />

      <PickerCustom
        value={dateStart}
        onChange={onChangeDate}
        onPress={onConfirmDate}
        mode="date"
        show={showModalDate}
        minimumDate={new Date()}
        onHideModal={onUnshowDate}
      />

      <LocationModal
        showModal={showModal}
        setModal={hideModal}
        onPress={e => setLocation(e)}
        detail={location}
      />
      <TimeModal
        showModal={showModalTime}
        setModal={hideModalTime}
        onPress={e => setLocation(e)}
      />
    </View>
  );
};

export default UpdateRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    width: 40,
    height: 40,
    borderRadius: 32,
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
    fontFamily: 'Quicksand-Regular',
  },
  viewInputSelect: {
    marginVertical: 16,
    backgroundColor: 'white',
    borderRadius: 16,
  },
  viewInputPick: {
    marginVertical: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    justifyContent: 'space-between',
  },
  Description: {
    width: '90%',
    borderRadius: 16,
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,25,0.17)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    height: 124,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  txtDescription: {
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: 'Quicksand-Regular',
    color: 'black',
    height: 124,
  },
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
    justifyContent: 'space-around',
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
  viewImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(4,4,15,0.45)',
  },
  btUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowUser: {
    flexDirection: 'row',
    marginVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  lineUser: {
    height: StyleSheet.hairlineWidth,
    width: widthPercentageToDP(70),
    alignSelf: 'center',
    backgroundColor: 'grey',
    marginVertical: 4,
  },
  textUser: {
    marginLeft: 24,
    fontSize: 16,
  },
  color: {
    color: '#00821c',
  },
  color2: { color: '#455997' },
  tintColor: {
    tintColor: '#00821c',
  },
  tintColor2: { tintColor: '#455997' },
  firstButton: {
    marginVertical: 4,
    backgroundColor: Colors.white,
    flexDirection: 'row',
  },
  secButton: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    marginVertical: 4,
  },
  viewTime: { flexDirection: 'row', justifyContent: 'center' },
});