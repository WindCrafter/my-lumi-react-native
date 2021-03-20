import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  UIManager,
  ScrollView,
  Keyboard,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import Clipboard from '@react-native-community/clipboard';
import { Card } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import {
  PERMISSIONS,
  request,
  openSettings,
  RESULTS,
} from 'react-native-permissions';
import Modal from 'react-native-modal';
import ModalAvatar from './component/ModalAvatar';
import {
  BarStatus,
  Button,
  HeaderCustom,
  KeyBoardScroll,
} from '../../../component';
import { Colors } from '../../../../utlis';
import Info from './component/info';
import UpdateInfo from './component/updateInfo';
import { _global } from '../../../../utlis/global/global';
import ModalTime from './component/ModalTime';
import langs from '../../../../common/language';
import { URL_STAGING } from '../../../../utlis/connection/url';
import { _GET } from '../../../../utlis/connection/api';

if (
  Platform.OS === 'android'
  && UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function UpdateProfile(props) {
  const { navigation, updateProfile, token, auth } = props;
  const [user, setUser] = useState(auth);
  const [dateChange, setDateChange] = useState(new Date());

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.GET_PROFILE}`;
    const response = await _GET(apiURL, token, false);
    console.log('_GET_PROFILE ===========>', response);
    if (response.success && response.statusCode === 200) {
      setUser(response.data);
      _global.Loading.hide();
    } else {
      _global.Loading.hide();
    }
  };

  const isVNPhoneMobile = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
  const regId = /(\d{12})|(\d{9})/;
  const [show, setShow] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [sourceImage, setSourceImage] = useState('');
  const goBack = () => {
    navigation.goBack();
  };

  const onChangeName = val => {
    setUser({ ...user, fullname: val });
  };

  const onChangePhone = val => {
    setUser({ ...user, phone_number: val });
  };

  const onChangeBirthday = (event, val) => {
    const pickDate = val || moment(user.birthday, 'DD/MM/YYYY').toDate();
    if (Platform.OS === 'ios') {
      setShowPicker(Platform.OS === 'ios');
      setDateChange(val);
    } else if (event.type === 'set') {
      setShowPicker(false);
      setUser({ ...user, birthday: moment(pickDate).format('DD/MM/YYYY') });
      setDateChange(pickDate);
    } else {
      setShowPicker(false);
    }
  };

  const onConfirmBirthday = () => {
    setShow(false);
    setUser({ ...user, birthday: moment(dateChange).format('DD/MM/YYYY') });
  };

  // const onHideGene = () => {
  //   setShowGene(false);
  // };

  const onChangeIdentity = val => {
    setUser({ ...user, identity_number: val });
  };

  const onChangeAddress = val => {
    setUser({ ...user, address: val });
  };

  const onShowModal = () => {
    setShow(true);
    Keyboard.dismiss();
    setShowPicker(true);
  };
  const onShowModalAvatar = () => {
    setShowAvatar(true);
    Keyboard.dismiss();
  };

  const onPick = () => {
    Keyboard.dismiss();
    navigation.navigate(langs.navigator.selectBank, {
      onChangeBank,
      bank_name: user.bank_name,
    });
  };

  const onChangeBank = value => {
    navigation.goBack();
    setUser({ ...user, bank_name: value });
  };

  const onChangeBankAccount = value => {
    setUser({ ...user, bank_account: value });
  };

  const onHideModal = () => {
    setShow(false);
  };
  const onHideAvatar = () => {
    setShowAvatar(false);
  };
  const onAlertCopy = () => {
    _global.Alert.alert({
      title: langs.alert.deviceID,
      message: auth.deviceId,
      messageColor: Colors.black,
      leftButton: {
        text: langs.alert.copy,
        onPress: onCopyDeviceID,
        textStyle: { color: Colors.background },
      },
    });
  };

  const onCopyDeviceID = () => {
    Clipboard.setString(`${auth.deviceId}`);
  };

  const onUpdateInfo = () => {
    const data = {
      role: user.role,
      team: user.team,
      fullname: user.fullname,
      phone_number: user.phone_number,
      birthday: user.birthday,
      address: user.address,
      token,
      identity_number: user.identity_number,
      bank_name: user.bank_name,
      bank_account: user.bank_account,
    };

    if (!isVNPhoneMobile.test(user.phone_number)) {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.alert.wrongVinaphone,
        leftButton: { text: langs.alert.ok },
      });
    } else {
      updateProfile(data);
    }
  };
  const SCREEN = Dimensions.get('window');
  const onOpenSettingsPermissionApp = () => {
    openSettings().catch(() => console.warn('cannot open settings'));
  };
  const onUpdateAvatar = image => {
    setSourceImage(image.sourceURL);
  };
  const onSelectFromAlbum = () => {
    setShowAvatar(false);
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
              if (Platform.OS === 'android') {
                image.sourceURL = image.path;
                if (!image.filename) {
                  image.filename = `${new Date().getTime()}.JPG`;
                }
                if (!image.mime) {
                  image.mime = 'image/jpeg';
                }
              } else {
                image.sourceURL = image.path;
                if (!image.filename) {
                  image.filename = `${new Date().getTime()}.JPG`;
                }
                if (!image.mime) {
                  image.mime = 'image/jpeg';
                }
              }

              console.log('select image', image);
              onUpdateAvatar && onUpdateAvatar(image);
            })
            .catch(e => {
              // error
              setShowAvatar(false);
              console.log('error::select image', e);
            });
        }, 700);
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
            if (Platform.OS === 'android') {
              image.sourceURL = image.path;
              if (!image.filename) {
                image.filename = `${new Date().getTime()}.JPG`;
              }
              if (!image.mime) {
                image.mime = 'image/jpeg';
              }
            } else {
              image.sourceURL = image.path;
              if (!image.filename) {
                image.filename = `${new Date().getTime()}.JPG`;
              }
              if (!image.mime) {
                image.mime = 'image/jpeg';
              }
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
    <View style={{ backgroundColor: 'white' }}>
      <HeaderCustom title="Cập nhật thông tin" goBack={goBack} shadow />
      <KeyBoardScroll contentContainerStyle={styles.container}>
        <Card style={styles.card}>
          <TouchableOpacity onPress={onShowModalAvatar}>
            <Image
              source={
                sourceImage
                  ? { uri: sourceImage }
                  : require('../../../../naruto.jpeg')
              }
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <UpdateInfo
            name={user.fullname}
            team={user.team}
            role={user.role}
            birthday={user.birthday}
            onChangeBirthday={onShowModal}
            onChangeName={onChangeName}
            nativeLand={user.address}
            identity={user.identity_number}
            phone={user.phone_number}
            bankAccount={user.bank_account}
            onChangeNative={onChangeAddress}
            onChangePhone={onChangePhone}
            onChangeBank={onPick}
            onChangeIdentity={onChangeIdentity}
            onChangeBankAccount={onChangeBankAccount}
            bankName={user.bank_name}
            deviceId={user.deviceId}
            onCopyDeviceID={onAlertCopy}
          />
        </Card>
        <Button
          title={langs.update}
          containerStyle={styles.complete}
          onPress={onUpdateInfo}
        />
        <ModalAvatar
          showModal={showAvatar}
          hideModal={onHideAvatar}
          onOpenCamera={onTakePhoto}
          onOpenLibrary={onSelectFromAlbum}
        />
        {Platform.OS === 'ios' ? (
          <ModalTime
            showModal={show}
            hideModal={onHideModal}
            onConfirm={onConfirmBirthday}
            picker={(
              <View style={styles.picker}>
                <DateTimePicker
                  value={dateChange}
                  mode="date"
                  display="default"
                  onChange={onChangeBirthday}
                  locale="vi-VI"
                />
              </View>
            )}
          />
        ) : (
          showPicker && (
            <DateTimePicker
              value={dateChange}
              mode="date"
              display="default"
              onChange={onChangeBirthday}
              locale="vi-VI"
              maximumDate={new Date()}
            />
          )
        )}
      </KeyBoardScroll>
    </View>
  );
}

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    // padding: 24,
    backgroundColor: '#f0f0f0',
  },
  viewButton: {
    flex: 0.5,
  },
  button: {
    width: wp(85),
    alignSelf: 'center',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    backgroundColor: Colors.background,
  },
  txtButton: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.white,
  },
  scrollView: {
    paddingTop: 8,
  },
  picker: {
    width: wp(100),
  },
  scroll: {
    flex: 1,
    paddingTop: 16,
  },
  view: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  card: {
    width: widthPercentageToDP(100) - 32,
    alignSelf: 'center',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    marginTop: 16,
    paddingVertical: 16,
  },
  complete: {
    backgroundColor: Colors.background,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 8,
  },
});
