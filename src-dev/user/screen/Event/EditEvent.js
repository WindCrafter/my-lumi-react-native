import React, { useRef, useState } from 'react';
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
  ImageBackground,
  Dimensions,
} from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { Card, Item } from 'native-base';
import moment from 'moment';
import { Icon, IconType } from '@nghinv/react-native-icons';
import ImagePicker from 'react-native-image-crop-picker';
import {
  PERMISSIONS,
  request,
  openSettings,
  RESULTS,
} from 'react-native-permissions';
import { Colors, imgs } from '../../../../utlis';
import {
  InputRow,
  InputSelect,
  HeaderCustom,
  BarStatus,
  InputPick,
  InputDown,
  Checkbox,
} from '../../../component';
import PickerCustom from '../apply/component/PickerCustom';
import LocationModal from './component/LocationModal';
import TimeModal from './component/TimeModal';
import { _global } from '../../../../utlis/global/global';
import langs from '../../../../common/language';
import { URL_STAGING } from '../../../../utlis/connection/url';
import { _POST, _UPLOAD } from '../../../../utlis/connection/api';

const URL_EDIT_EVENT = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.UPDATE_EVENT}`;
const URL_UPLOAD_IMAGE = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.UPLOAD_IMAGE}`;

if (
  Platform.OS === 'android'
  && UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const EditEvent = (props) => {
  const {
    navigation,
    token,
    bookRoom,
    route,
  } = props;
  const { _item } = route.params;
  const refPhone = useRef('');
  const [title, setTitle] = useState(_item.subject);
  const [select, onSelect] = useState(false);
  const [avatar, setAvatar] = useState(_item.avatar);
  const [hourStart, setHourStart] = useState(moment(_item.start_datetime, 'HH:mm:ss DD/MM/YYYY')._d);
  const [hourEnd, setHourEnd] = useState(moment()._d);
  const [start, setStart] = useState(moment(_item.start_datetime, 'HH:mm:ss DD/MM/YYYY').format());
  const [end, setEnd] = useState(_item.end_datetime !== '' ? moment(_item.end_datetime, 'HH:mm:ss DD/MM/YYYY').format() : '');
  const [sourceImage, setSourceImage] = useState('');
  const [description, setDescription] = useState(_item.content);
  const [checked, setChecked] = useState(_item.urgent === 1);

  const onSetSelect = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    onSelect(!select);
  };
  const editEventImage = async () => {
    const data = {
      _id: _item._id,
      subject: title,
      content: description,
      urgent: checked ? 1 : 0,
      start_datetime: `${moment(start).format('HH:mm:00')} ${moment(date).format('DD/MM/YYYY')}`,
      end_datetime: datez && `${moment(end).format('HH:mm:00')} ${moment(datez).format('DD/MM/YYYY')}`,
      view_users: _item.view_users,
    };
    const data_image = {
      url: sourceImage.sourceURL,
      name: sourceImage.filename,
      type: 'event',
    };

    const response_ = await _UPLOAD(URL_UPLOAD_IMAGE, data_image, token, true);
    if (response_.success && response_.statusCode === 200
    ) {
      const response = await _POST(URL_EDIT_EVENT, { ...data, avatar: response_.data.files[0] }, token, true);
      if (response.success && response.statusCode === 200
      ) {
        _global.Loading.hide();
        _global.Alert.alert({
          title: langs.alert.remind,
          message: 'Sửa sự kiện thành công',
          leftButton: { text: langs.alert.ok, onPress: () => navigation.goBack() },
        });
      } else if (response.statusCode) {
        _global.Loading.hide();
        _global.Alert.alert({
          title: langs.alert.remind,
          message: response.message,
          leftButton: { text: langs.alert.ok },
        });
      } else {
        _global.Loading.hide();
        _global.Alert.alert({
          title: langs.alert.remind,
          message: 'Quá thời gian phản hồi, tuy vậy sự kiện vẫn có thể đã update thành công !!! ',
          leftButton: { text: langs.alert.ok },
        });
      }
    } else {
      _global.Loading.hide();
      _global.Alert.alert({
        title: langs.alert.remind,
        message: response_.message,
        leftButton: { text: langs.alert.ok },
      });
    }
  };

  const noEditImage = async () => {
    const data = {
      _id: _item._id,
      subject: title,
      content: description,
      urgent: checked ? 1 : 0,
      start_datetime: `${moment(start).format('HH:mm:00')} ${moment(date).format('DD/MM/YYYY')}`,
      end_datetime: datez && `${moment(end).format('HH:mm:00')} ${moment(datez).format('DD/MM/YYYY')}`,
      view_users: [],
    };
    const response = await _POST(URL_EDIT_EVENT, data, token, true);
    if (response.success && response.statusCode === 200
    ) {
      _global.Loading.hide();
      _global.Alert.alert({
        title: langs.alert.remind,
        message: 'Sửa sự kiện thành công',
        leftButton: { text: langs.alert.ok, onPress: () => navigation.goBack() },
      });
    } else if (response.statusCode) {
      _global.Loading.hide();
      _global.Alert.alert({
        title: langs.alert.remind,
        message: response.message,
        leftButton: { text: langs.alert.ok },
      });
    } else {
      _global.Loading.hide();
      _global.Alert.alert({
        title: langs.alert.remind,
        message: 'Quá thời gian phản hồi, tuy vậy sự kiện vẫn có thể update thành công !!! ',
        leftButton: { text: langs.alert.ok },
      });
    }
  };

  const onChangeTitle = (val) => {
    setTitle(val);
  };

  const onGoBack = () => {
    navigation.goBack();
  };

  function onChangeDescription(val) {
    setDescription(val);
  }

  const onShowPickerStart = (m) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setshowModalTimeStart(true);
  };

  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [date, setDate] = useState(moment(_item.start_datetime, 'HH:mm:ss DD/MM/YYYY').format());
  const [datez, setDatez] = useState(_item.end_datetime !== '' ? moment(_item.end_datetime, 'HH:mm:ss DD/MM/YYYY').format() : '');
  const [showModalTimeStart, setshowModalTimeStart] = useState(false);
  const [showModalTimeEnd, setshowModalTimeEnd] = useState(false);
  const [showModalDateStart, setshowModalDateStart] = useState(false);
  const [showModalDateEnd, setshowModalDateEnd] = useState(false);
  const onShowPickerDate = (m) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setshowModalDateStart(true);
  };
  const onShowPickerDateEnd = (m) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setshowModalDateEnd(true);
  };
  const onChangeDate = (event, selectedDay) => {
    const currentDay = selectedDay || dateStart;
    const oneDate = moment(currentDay).format('YYYYMMDD') === moment(datez).format('YYYYMMDD');
    const smallerDate = moment(currentDay).format('YYYYMMDD') > moment(datez).format('YYYYMMDD');
    if (Platform.OS === 'ios') {
      setDateStart(currentDay);
    } else if (event.type === 'set') {
      setshowModalDateStart(false);
      if (oneDate && start > end) {
        _global.Alert.alert({
          title: langs.alert.remind,
          message: 'Không thể chọn thời gian kết thúc nhỏ hơn thời gian bắt đầu',
          leftButton: { text: langs.alert.ok },
        });
      } else if (smallerDate && datez) {
        _global.Alert.alert({
          title: langs.alert.remind,
          message: 'Không thể chọn thời gian kết thúc nhỏ hơn thời gian bắt đầu',
          leftButton: { text: langs.alert.ok },
        });
      } else {
        setDate(currentDay);
      }
    } else {
      setshowModalDateStart(false);
    }
  };
  const onChangeDateEnd = (event, selectedDay) => {
    const currentDay = selectedDay || dateEnd;
    const oneDate = moment(date).format('YYYYMMDD') === moment(currentDay).format('YYYYMMDD');
    const smallerDate = moment(date).format('YYYYMMDD') > moment(currentDay).format('YYYYMMDD');
    if (Platform.OS === 'ios') {
      setDateEnd(currentDay);
    } else if (event.type === 'set') {
      setshowModalDateEnd(false);
      if (oneDate && end && start > end) {
        _global.Alert.alert({
          title: langs.alert.remind,
          message: 'Không thể chọn thời gian kết thúc nhỏ hơn thời gian bắt đầu',
          leftButton: { text: langs.alert.ok },
        });
      } else if (smallerDate) {
        _global.Alert.alert({
          title: langs.alert.remind,
          message: 'Không thể chọn thời gian kết thúc nhỏ hơn thời gian bắt đầu',
          leftButton: { text: langs.alert.ok },
        });
      } else {
        setDatez(currentDay);
      }
    } else {
      setshowModalDateEnd(false);
    }
  };
  const onConfirmDate = (set) => {
    const oneDate = moment(dateStart).format('YYYYMMDD') === moment(dateEnd).format('YYYYMMDD');
    const smallerDate = moment(dateStart).format('YYYYMMDD') > moment(dateEnd).format('YYYYMMDD');
    setshowModalDateStart(false);
    setshowModalDateEnd(false);
    if (oneDate && end && start > end) {
      _global.Alert.alert({
        title: langs.alert.remind,
        message: 'Không thể chọn thời gian kết thúc nhỏ hơn thời gian bắt đầu',
        leftButton: { text: langs.alert.ok },
      });
    } else if (datez && smallerDate) {
      _global.Alert.alert({
        title: langs.alert.remind,
        message: 'Không thể chọn thời gian kết thúc nhỏ hơn thời gian bắt đầu',
        leftButton: { text: langs.alert.ok },
      });
    } else {
      !set && setDate(dateStart);
      set && setDatez(dateEnd);
    }
  };
  const onUnshowDate = () => {
    setshowModalDateStart(false);
    setshowModalDateEnd(false);
  };
  const onShowPickerEnd = (m) => {
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
    const today = moment(new Date()).format('DD/MM/YYYY') === moment(date).format('DD/MM/YYYY');
    const past = moment(new Date()).format('HH:mm') > moment(currentShift).format('HH:mm');
    if (Platform.OS === 'ios') {
      setHourStart(moment(currentShift)._d);
    } else if (event.type === 'set') {
      setshowModalTimeStart(false);
      if (!today) {
        setStart(moment(currentShift)._d);
      } else {
        !past && setStart(moment(currentShift)._d);
        past && _global.Alert.alert({
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
    const checkDate = moment(date).format('YYYYMMDD') === moment(datez).format('YYYYMMDD');
    if (Platform.OS === 'ios') {
      setHourEnd(moment(currentShift)._d);
    } else if (event.type === 'set') {
      setshowModalTimeEnd(false);
      (!past || !checkDate) && setEnd(moment(currentShift)._d);
      (checkDate && past) && _global.Alert.alert({
        title: langs.alert.remind,
        message: 'Không thể chọn thời gian kết thúc nhỏ hơn thời gian bắt đầu',
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

  const onBlur = () => {
    Keyboard.dismiss();
  };
  const onEditEvent = () => {
    if (title.trim().length === 0) {
      _global.Alert.alert({
        title: langs.alert.remind,
        message: langs.alert.nullTitle,
        leftButton: { text: langs.alert.ok },
      });
    } else if (date === '') {
      _global.Alert.alert({
        title: langs.alert.remind,
        message: langs.alert.nullStartDateEvent,
        leftButton: { text: langs.alert.ok },
      });
    } else if (start === '') {
      _global.Alert.alert({
        title: langs.alert.remind,
        message: langs.alert.nullStartTimeEvent,
        leftButton: { text: langs.alert.ok },
      });
    } else {
      sourceImage ? editEventImage() : noEditImage();
      Keyboard.dismiss();
    }
  };

  const SCREEN = Dimensions.get('window');
  const onOpenSettingsPermissionApp = () => {
    openSettings().catch(() => console.warn('cannot open settings'));
  };

  const onUpdateAvatar = image => {
    setSourceImage(image);
  };
  const onSelectFromAlbum = () => {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      }),
    ).then(response => {
      if (response === RESULTS.BLOCKED) {
        _global.Alert.alert({
          title: 'Thông báo',
          message: 'Vui lòng cấp quyền thư mục.',
          leftButton: { text: 'Từ chối' },
          rightButton: {
            text: 'Mở cài đặt',
            onPress: onOpenSettingsPermissionApp,
          },
        });
      } else {
        setTimeout(() => {
          ImagePicker.openPicker({
            width: SCREEN.width * 2,
            height: SCREEN.width * 2,
            multiple: false,
            minFiles: 1,
            maxFiles: 1,
            mediaType: 'photo',
            compressImageQuality: 1,
            waitAnimationEnd: true,
            cropping: true,
          })
            .then(image => {
              image.sourceURL = image.path;
              image.filename = `${new Date().getTime()}.JPG`;
              if (!image.mime) {
                image.mime = 'image/jpeg';
              }

              console.log('select image', image);
              onUpdateAvatar && onUpdateAvatar(image);
            })
            .catch(e => {
              // error
              console.log('error::select image', e);
            });
        }, 200);
      }
    });
  };

  const onTakePhoto = () => {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.CAMERA,
        ios: PERMISSIONS.IOS.CAMERA,
      }),
    ).then(response => {
      if (response === RESULTS.BLOCKED) {
        _global.Alert.alert({
          title: 'Thông báo',
          message: 'Vui lòng cấp quyền camera.',
          leftButton: { text: 'Từ chối' },
          rightButton: {
            text: 'Mở cài đặt',
            onPress: onOpenSettingsPermissionApp,
          },
        });
      } else {
        ImagePicker.openCamera({
          width: SCREEN.width * 2,
          height: SCREEN.width * 2,
          cropping: true,
        })
          .then(image => {
            image.sourceURL = image.path;
            image.filename = `${new Date().getTime()}.JPG`;
            if (!image.mime) {
              image.mime = 'image/jpeg';
            }

            onUpdateAvatar && onUpdateAvatar(image);
          })
          .catch(error => {
            //
          });
      }
    });
  };

  return (
    <View style={{ ...StyleSheet.absoluteFill, backgroundColor: 'white' }}>
      <HeaderCustom
        title="Sửa sự kiện"
        goBack={onGoBack}
        rightButton
        textPress
        onRight={onEditEvent}
        shadow
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={{ backgroundColor: '#f0f0f0' }}>
          <ImageBackground
            source={sourceImage
              ? { uri: sourceImage.sourceURL }
              : _item.avatar ? { uri: _item.avatar } : imgs.event}
            style={styles.avtEvent}
            imageStyle={styles.avtBG}
          >
            <View style={styles.bottom}>
              <TouchableOpacity style={styles.btnTxt} onPress={onSelectFromAlbum}>
                <Icon name="photo" size={24} />
                <Text style={styles.txtCamera}>Chọn ảnh</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnTxt} onPress={onTakePhoto}>
                <Icon name="camera-alt" size={24} />
                <Text style={styles.txtCamera}>Chụp ảnh</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <InputRow
            containerStyle={styles.txtInput}
            title="Nội dung:"
            size={16}
            value={title}
            onChangeText={onChangeTitle}
            refInput={refPhone}
            detail="Nhập tiêu đề"
            leftImage={imgs.title}
          />
          <Card style={styles.Description}>
            <Icon name="menu" size={20} style={styles.iconMenu} />
            <TextInput
              multiline
              placeholder="Nhập nội dung"
              value={description}
              style={styles.txtDescription}
              onBlur={onBlur}
              onChangeText={onChangeDescription}
            />
          </Card>
          <View style={styles.viewTime}>
            <InputSelect
              width="60%"
              leftImage={false}
              borderRadius={32}
              height={54}
              shadowColor="white"
              title="Chọn ngày bắt đầu"
              padding={8}
              marginVertical={18}
              containerStyle={styles.viewInputSelect}
              onPressButton={onShowPickerDate}
              shadowOpacity={0.1}
              marginRight={-30}
              color="rgba(4, 4, 15, 0.45)"
              detail={
              date !== ''
                ? `Từ   : ${moment(date).format('DD')} tháng ${moment(date).format(
                  'MM',
                )}, ${moment(date).format('YYYY')}`
                : null
            }
              rightImage={imgs.roundedLeft}
            />
            <InputDown
              width="30%"
              borderRadius={32}
              height={54}
              shadowColor="white"
              title="Chọn giờ"
              padding={8}
              marginVertical={18}
              containerStyle={styles.viewInputSelect}
              onPressButton={onShowPickerStart}
              shadowOpacity={0.1}
              color="rgba(4, 4, 15, 0.45)"
              detail={
                start !== ''
                  ? `${moment(start).format('HH')} giờ ${moment(
                    start,
                  ).format('mm')}`
                  : null
              }
              rightImage={imgs.roundedLeft}
            />
          </View>
          <View style={styles.viewTime}>
            <InputSelect
              width="60%"
              borderRadius={32}
              height={54}
              leftImage={false}
              shadowColor="white"
              title="Chọn ngày kết thúc"
              padding={8}
              marginVertical={18}
              containerStyle={styles.viewInputSelect}
              onPressButton={onShowPickerDateEnd}
              shadowOpacity={0.1}
              marginRight={-30}
              color="rgba(4, 4, 15, 0.45)"
              detail={datez !== ''
                ? `Đến : ${moment(datez).format('DD')} tháng ${moment(datez).format(
                  'MM',
                )}, ${moment(datez).format('YYYY')}`
                : null}
              rightImage={imgs.roundedLeft}
            />
            <InputDown
              width="30%"
              borderRadius={32}
              height={54}
              shadowColor="white"
              title="Chọn giờ"
              padding={8}
              marginVertical={18}
              containerStyle={styles.viewInputSelect}
              onPressButton={onShowPickerEnd}
              shadowOpacity={0.1}
              color="rgba(4, 4, 15, 0.45)"
              detail={
                end !== ''
                  ? `${moment(end).format('HH')} giờ ${moment(end).format(
                    'mm',
                  )}`
                  : null
              }
              rightImage={imgs.roundedLeft}
            />
          </View>
          <Checkbox
            containerStyle={styles.checkBox}
            title={langs.urgent}
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
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
        minimumDate={moment(date).format('YYYYMMDD') === moment(datez).format('YYYYMMDD') && start}
      />

      <PickerCustom
        value={dateStart}
        onChange={onChangeDate}
        onPress={() => onConfirmDate(false)}
        mode="date"
        show={showModalDateStart}
        minimumDate={new Date()}
        onHideModal={onUnshowDate}
      />
      <PickerCustom
        value={dateEnd}
        onChange={onChangeDateEnd}
        onPress={() => onConfirmDate(true)}
        mode="date"
        show={showModalDateEnd}
        minimumDate={dateStart || new Date()}
        onHideModal={onUnshowDate}
      />
    </View>
  );
};

export default EditEvent;

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
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    flexDirection: 'row',
    paddingTop: 8,
  },
  txtDescription: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Quicksand-Regular',
    width: widthPercentageToDP(90) - 48,
    paddingTop: Platform.OS === 'ios' ? 0 : 4,
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
  avtEvent: {
    marginVertical: 4,
    width: widthPercentageToDP(100) - 48,
    height: (widthPercentageToDP(100) - 48) * 0.6,
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  avtBG: {
    borderRadius: 16,
  },
  bottom: {
    width: '100%',
    height: (widthPercentageToDP(100) - 48) * 0.14,
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    opacity: 0.7,
    flexDirection: 'row',
  },
  txtCamera: {
    fontWeight: '600',
    fontSize: 16
  },
  btnTxt: {
    flexDirection: 'row',
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center'
  },

  checkBox: {
    marginLeft: 16,
    marginVertical: 8,
    width: 200,
  },
  iconMenu: {
    paddingTop: Platform.OS === 'android' ? 6 : 0,
    marginLeft: 16,
  }
});
