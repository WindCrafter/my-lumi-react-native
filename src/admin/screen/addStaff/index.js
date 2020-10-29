import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Platform,
  UIManager,
  LayoutAnimation,
  StatusBar,
  Alert,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
  InputInfor,
  InputSelect,
  Button,
  TextSelect,
  BarStatus,
  HeaderCustom,
} from '../../../component';
import {imgs, Colors} from '../../../../utlis';
import ModalRank from './component/ModalRank';
import ModalTeam from './component/ModalTeam';
import {Item} from 'native-base';
import {_global} from '../../../../utlis/global/global'
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DATA =[
  {name:'1', teamId:'1'}
]

const AddStaff = (props) => {
  const {navigation, getListRoles, token, addStaff, roleInfo, teams} = props;

  const refEmail = useRef(null);
  const refPhone = useRef(null);
  const refPosition = useRef(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roleId, setRoleId] = useState('');
  const [password, setPassword] = useState('123456');
  const [detailPosition, setDetailPosition] = useState('Vui lòng chọn :');
  const [detailRank, setDetailRank] = useState('Vui lòng chọn : ');
  const [showModalPosition, setModalPosition] = useState(false);
  const [showModalRank, setModalRank] = useState(false);

  const onDone = () => {
    Keyboard.dismiss();
    const data = {name, email, password, roleId, token};
    if (email.trim().length === 0) {
      _global.Alert.alert({
        title: 'Nhắc bạn',
        message: 'Vui lòng điền tên đăng nhập.',
        messageColor: Colors.danger,
        leftButton: { text: 'OK' },
      });
      return;
    }
    if (password.length === 0) {
      _global.Alert.alert({
        title: 'Lưu ý!',
        message: 'Mật khẩu không được để trống.',
        messageColor: Colors.danger,
        leftButton: { text: 'OK' },
      });
      return;
    }
    if (
      !(email.indexOf('@lumi.biz') > -1) 
    ) {
      _global.Alert.alert({
        title: 'Lưu ý!',
        message: 'Định dạng email không đúng.',
        messageColor: Colors.danger,
        leftButton: { text: 'OK' },
      });
      return;
    }
    if (password.length < 6) {
      _global.Alert.alert({
        title: 'Lưu ý!',
        message: 'Mật khẩu không được dưới 6 kí tự.',
        messageColor: Colors.danger,
        leftButton: { text: 'OK' },
      });
      return;
    } else {
      addStaff(data);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const setPosition = () => {
    setModalPosition(true);
  };

  const setRank = () => {
    setModalRank(true);
  };

  const hidePosition = () => {
    setModalPosition(false);
  };

  const hideRank = () => {
    setModalRank(false);
  };

  const onSetRank = (role, id) => {
    setDetailRank(role);
    setRoleId(id);
  };

  const onSetPosition = (value) => {
    setDetailPosition(value);
  };

  const onChangeName = (value) => {
    setName(value);
  };

  const onChangeEmail = (value) => {
    setEmail(value);
  };

  const onChangePass = (value) => {
    setPassword(value);
  };

  return (
    <>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 46 : StatusBar.currentHeight}
      />
      <HeaderCustom
        title={'Thêm nhân viên'}
        height={60}
        goBack={goBack}
        backgroundColor={'#ffffff'}
      />
      <ScrollView style={styles.container}>
        <View style={styles.detail}>
          <InputInfor
            backgroundColor={'white'}
            placeholder={''}
            testID="test_Name"
            containerStyle={styles.textInput}
            returnKeyType="next"
            keyboardType="email-address"
            autoCapitalize="none"
            maxLength={50}
            title={'Họ và tên :'}
            value={name}
            onChangeText={onChangeName}
            onSubmitEditing={() => refEmail.current.focus()}
          />
          <InputInfor
            testID="test_Email"
            leftImage={imgs.email}
            backgroundColor={'white'}
            placeholder={''}
            autoCapitalize={'none'}
            containerStyle={styles.textInput}
            refInput={refEmail}
            maxLength={20}
            returnKeyType="next"
            title={'Email :'}
            value={email}
            onChangeText={onChangeEmail}
            onSubmitEditing={() => refPhone.current.focus()}
          />
          <InputInfor
            testID="test_Phone"
            leftImage={imgs.lock}
            title={'Mật khẩu :'}
            backgroundColor={'white'}
            placeholder={'Nhập mật khẩu'}
            containerStyle={styles.textInput}
            refInput={refPhone}
            maxLength={20}
            returnKeyType="next"
            value={password}
            onChangeText={onChangePass}
          />
          <TouchableOpacity style={{marginBottom: 24}} onPress={setPosition}>
            <InputSelect
              testID="test_Position"
              backgroundColor={'white'}
              leftImage={imgs.setPerson}
              title={'Vị trí :'}
              width={wp(90)}
              containerStyle={styles.textSelect}
              detail={detailPosition}
              onPressButton={setPosition}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{marginBottom: 24}} onPress={setRank}>
            <InputSelect
              width={wp(90)}
              testID="test_Rank"
              leftImage={imgs.setPerson}
              backgroundColor={'white'}
              title={'Chức vụ :'}
              detail={detailRank}
              containerStyle={styles.textSelect}
              onPressButton={setRank}
            />
          </TouchableOpacity>
          <View style={styles.advance}>
            <Text numberOfLines={2} style={styles.description}>
              Cung cấp thông tin đăng nhập bao gồm gmail/mật khẩu mặc định
              (12345) cho nhân viên mới.{' '}
            </Text>
          </View>

          <Button
            onPress={onDone}
            title={'Hoàn thành'}
            backgroundColor={'rgb( 0 ,138, 238)'}
          />
        </View>
        <View>
          <ModalTeam
            showModalPosition={showModalPosition}
            data={teams}
            pressItem={(e)=> onSetPosition(e)}
            detailPosition={detailPosition}
            setModalPosition={hidePosition}
          />
          <ModalRank
            showModalRank={showModalRank}
            onHideModal={hideRank}
            rank={detailRank}
            data={roleInfo}
            onPress={(role, id) => onSetRank(role, id)}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default AddStaff;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    marginLeft: 24,
    fontSize: 20,
    marginBottom: 32,
  },
  detail: {
    flex: 1.75,
    justifyContent: 'flex-start',
    paddingVertical: 32,
  },
  textInput: {
    height: 70,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 16,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  textSelect: {
    height: 70,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  description: {
    fontSize: 15,
  },
  advance: {
    alignItems: 'center',
    marginLeft: 25,
    marginBottom: 25,
    width: wp(80),
  },
  modal: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalview: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: wp(100),
    height: hp(50),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titlemodal: {
    fontWeight: '500',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  bot: {
    marginBottom: 24,
  },
});
