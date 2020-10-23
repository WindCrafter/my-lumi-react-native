import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import {Alert} from '../../../component';
import ChangePass from './component/ChangePass';
import AddInfo from './component/AddInfo';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {_global} from '../../../../utlis/global/global';
import ModalTime from '../../../user/screen/account/component/ModalTime';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import ModalTeam from './component/ModalTeam';
const FirstLogin = (props) => {
  const {changePass, token, updateProfile, name, deviceId} = props;
  const step = useRef();
  const refAlert = useRef(null);
  const [pass, setPass] = useState('');
  const [rePass, setRePass] = useState('');
  const [phone, setPhone] = useState('');
  const [] = useState('hey');
  const [nativeLand, setNativeLand] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [birthday, setBirthDay] = useState(
    moment(new Date()).format('DD/MM/YYYY'),
  );
  const isVNPhoneMobile = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
  const [show, setShow] = useState(false);
  const onHideModal = () => {
    setShow(false);
  };

  const [error, setError] = useState('');

  const onChangePhone = (value) => {
    setPhone(value);
  };
  const onChangeNative = (value) => {
    setNativeLand(value);
  };
  const onChangeBirthday = (event, val) => {
    const pickDate = val || birthday;
    setShowPicker(Platform.OS === 'ios');

    setBirthDay(moment(pickDate).format('DD/MM/YYYY'));
  };
  const onChangePass = (value) => {
    setPass(value);
  };

  const onChangeRePass = (value) => {
    setRePass(value);
  };
  const onShowModal = () => {
    setShow(true);
    setShowPicker(!showPicker);
  };

  const onConfirms = () => {
    Keyboard.dismiss();
    if (pass.trim().length === 0) {
      setError('Mật khẩu không được để trống.');
      refAlert.current.open();
      return;
    }
    if (pass.trim().length < 6) {
      setError('Mật khẩu không được dưới 6 kí tự.');
      refAlert.current.open();
      return;
    }
    if (rePass.length === 0) {
      setError('Mật khẩu không được để trống.');
      refAlert.current.open();
      return;
    }
    if (!(rePass === pass)) {
      setError('Mật khẩu nhập lại không đúng.');
      refAlert.current.open();
      return;
    } else {
      changePass({pass, confirmPassword: rePass, token});
    }
  };
  const [showModalPosition, setModalPosition] = useState(false);
  const [detailPosition, setDetailPosition] = useState('Vui lòng chọn');

  const setPosition = () => {
    setModalPosition(true);
  };
  const hidePosition = () => {
    setModalPosition(false);
  };
  const onSetPosition = (value) => {
    setDetailPosition(value);
  };
  const onConfirmsProfile = () => {
    Keyboard.dismiss();
    const data = {
      name: name,
      phoneNumber: phone,
      birthday,
      token,
      deviceTimeKeepingId: deviceId,
      advance: {
        nativeLand,
      },
    };
    if (!isVNPhoneMobile.test(phone)) {
      _global.Alert.alert({
        title: 'TestNotify',
        message: 'Sai số điện thoại.\nVui lòng kiểm tra lại.',
        messageColor: 'red',
        leftButton: {text: 'OK'},
      });
    } else {
      updateProfile(data);

      step.current.scrollTo({x: wp(100), y: 0, animated: true});
    }
  };
  StatusBar.setBarStyle('default');

  return (
    <>
      <ScrollView
        style={styles.container}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={step}
        scrollEnabled={false}>
        <AddInfo
          birthday={birthday}
          onChangeBirthDay={onShowModal}
          phone={phone}
          onChangePhone={onChangePhone}
          onNext={onConfirmsProfile}
          onChangeNative={onChangeNative}
          onChangeTeam={setPosition}
          detailPosition={detailPosition}
        />
        <ChangePass
          pass={pass}
          onChangePass={onChangePass}
          rePass={rePass}
          onChangeRePass={onChangeRePass}
          onConfirms={onConfirms}
        />
      </ScrollView>
      <Alert
        title={'Warning'}
        message={error}
        leftButton={{text: 'OK'}}
        ref={refAlert}
      />
      <ModalTeam
        showModalPosition={showModalPosition}
        pressApp={() => onSetPosition('Team App')}
        pressBackEnd={() => onSetPosition('Team Back-end')}
        pressFirmware={() => onSetPosition('Team Firm-ware')}
        pressHR={() => onSetPosition('Team HR')}
        pressOS={() => onSetPosition('Team OS')}
        pressOther={() => onSetPosition('Team Khác')}
        pressTester={() => onSetPosition('Team Tester')}
        detailPosition={detailPosition}
        setModalPosition={hidePosition}
      />
      {Platform.OS === 'ios' ? (
        <ModalTime
          showModal={show}
          hideModal={onHideModal}
          picker={
            <View style={styles.picker}>
              <DateTimePicker
                value={moment(birthday, 'DD/MM/YYYY').toDate()}
                mode={'date'}
                display="default"
                onChange={onChangeBirthday}
                locale="vi-VI"
              />
            </View>
          }
        />
      ) : (
        showPicker && (
          <View style={styles.picker}>
            <DateTimePicker
              value={moment(birthday, 'DD/MM/YYYY').toDate()}
              mode={'date'}
              display="spinner"
              onChange={onChangeBirthday}
              locale="vi-VI"
            />
          </View>
        )
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  picker: {
    width: wp(100),
  },
});

export default FirstLogin;
