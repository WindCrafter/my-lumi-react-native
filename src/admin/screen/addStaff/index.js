import React, { useRef, useState } from 'react';
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
} from 'react-native';
import Modal from 'react-native-modal';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { InputInfor, InputSelect, Button, TextSelect, BarStatus, HeaderCustom } from '../../../component';
import { imgs } from '../../../../utlis';
import ModalRank from './component/ModalRank';
import ModalTeam from './component/ModalTeam';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AddStaff = (props) => {
  const { navigation } = props;
  const refEmail = useRef(null);
  const refPhone = useRef(null);
  const refPosition = useRef(null);
  const [detailPosition, setDetailPosition] = useState('Vui lòng chọn');
  const [detailRank, setDetailRank] = useState('Vui lòng chọn');
  const [showModalPosition, setModalPosition] = useState(false);
  const [showModalRank, setModalRank] = useState(false);

  const onDone = () => {
    Keyboard.dismiss();
    navigation.navigate('TabbarAdmin');
  };

  const goBack = () => {
    navigation.goBack();
  };

  const setPosition = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setModalPosition(true);
  };

  const setRank = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setModalRank(true);
  };

  const hidePosition = () => {
    setModalPosition(false);
  };

  const hideRank = () => {
    setModalRank(false);
  };

  const onSetRank = (value) => {
    setDetailRank(value);
  };

  const onSetPosition = (value) => {
    setDetailPosition(value);
  };

  return (
    <>
      <BarStatus
        backgroundColor="rgb(47,172,79)"
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
          <Text style={styles.title}>Nhập thông tin nhân viên mới :</Text>
          <InputInfor
            backgroundColor={'white'}
            placeholder={'Họ và tên :'}
            testID="test_Name"
            containerStyle={styles.textInput}
            returnKeyType="next"
            keyboardType="email-address"
            autoCapitalize="none"
            maxLength={50}
            title={'Họ và tên :'}
            onSubmitEditing={() => refEmail.current.focus()}
          />
          <InputInfor
            testID="test_Email"
            leftImage={imgs.email}
            backgroundColor={'white'}
            placeholder={'Email'}
            containerStyle={styles.textInput}
            refInput={refEmail}
            maxLength={20}
            returnKeyType="next"
            title={'Email :'}
            onSubmitEditing={() => refPhone.current.focus()}
          />
          <InputInfor
            testID="test_Phone"
            leftImage={imgs.phone}
            title={'Số điện thoại :'}
            backgroundColor={'white'}
            placeholder={'Số điện thoại'}
            containerStyle={styles.textInput}
            refInput={refPhone}
            maxLength={20}
            returnKeyType="next"
            onSubmitEditing={() => refPosition.current.focus()}
          />
          <TouchableOpacity onPress={setPosition} style={{ marginBottom: 24 }}>
            <InputSelect
              testID="test_Position"
              backgroundColor={'white'}
              leftImage={imgs.setPerson}
              title={'Vị trí :'}
              containerStyle={styles.textSelect}
              detail={detailPosition}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={setRank} style={{ marginBottom: 24 }}>
            <InputSelect
              testID="test_Rank"
              leftImage={imgs.setPerson}
              backgroundColor={'white'}
              title={'Chức vụ :'}
              detail={detailRank}
              containerStyle={styles.textSelect}
            />
          </TouchableOpacity>
          <View style={styles.advance}>
            <Text numberOfLines={2} style={styles.description}>
              Cung cấp thông tin đăng nhập bao gồm gmail/mật khẩu mặc định (12345)
            cho nhân viên mới.{' '}
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
          <ModalRank
            showModalRank={showModalRank}
            onHideModal={hideRank}
            pressLeader={() => onSetRank('Leader')}
            pressManager={() => onSetRank('Trưởng phòng')}
            pressManagerHigher={() => onSetRank('Giám đốc')}
            pressOther={() => onSetRank('Khác')}
            rank={detailRank}
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
});
