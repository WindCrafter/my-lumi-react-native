import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  // TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { InputInfor, InputSelect, Button, TextSelect } from '../../../component';
import { imgs } from '../../../../utlis';
const AddStaff = (props) => {
  const refEmail = useRef(null);
  const refPhone = useRef(null);
  const refPosition = useRef(null);
  const { navigation } = props;
  const [detailPosition, setDetailPosition] = useState('Vui lòng chọn');
  const [detailRank, setDetailRank] = useState('Vui lòng chọn');
  const [showModalPosition, hideModalPosition] = useState(false);
  const [showModalRank, hideModalRank] = useState(false);
  const onDone = () => {
    Keyboard.dismiss();
    navigation.navigate('TabbarAdmin');
  };
  const setModalPosition = () => hideModalPosition(!showModalPosition);
  const setModalRank = () => hideModalRank(!showModalRank);
  return (
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
        // value={email}
        // onChangeText={onChangeEmail}
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
        <InputSelect
          testID="test_Position"
          backgroundColor={'white'}
          leftImage={imgs.setPerson}
          title={'Vị trí :'}
          containerStyle={styles.textInput}
          detail={detailPosition}
          onPressButton={setModalPosition}
        />
        <InputSelect
          testID="test_Rank"
          leftImage={imgs.setPerson}
          backgroundColor={'white'}
          title={'Chức vụ :'}
          detail={detailRank}
          containerStyle={styles.textInput}
          onPressButton={setModalRank}
        />
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
        <Modal
          isVisible={showModalPosition}
          animationIn={'slideInUp'}
          animationOutTiming={1600}
          animationOut={'slideOutDown'}
          onBackdropPress={setModalPosition}
          style={styles.modal}>
          <View style={styles.modalview}>
            <Text style={styles.titlemodal}>Vị trí</Text>
            <ScrollView>
              <TextSelect
                title={'App'}
                onPressButton={() => {
                  setDetailPosition('Team App');
                }}
                checkTick={detailPosition === 'Team App' ? true : false}
              />
              <TextSelect
                title={'HR'}
                onPressButton={() => {
                  setDetailPosition('Team HR');
                }}
                checkTick={detailPosition === 'Team HR' ? true : false}
              />
              <TextSelect
                title={'Tester'}
                onPressButton={() => {
                  setDetailPosition('Team Tester');
                }}
                checkTick={detailPosition === 'Team Tester' ? true : false}
              />
              <TextSelect
                title={'OS'}
                onPressButton={() => {
                  setDetailPosition('Team OS');
                }}
                checkTick={detailPosition === 'Team OS' ? true : false}
              />
              <TextSelect
                title={'Firmware'}
                onPressButton={() => {
                  setDetailPosition('Team Firm-ware');
                }}
                checkTick={detailPosition === 'Team Firm-ware' ? true : false}
              />
              <TextSelect
                title={'Back-end'}
                onPressButton={() => {
                  setDetailPosition('Team Back-end'), setModalPosition();
                }}
                checkTick={detailPosition === 'Team Back-end' ? true : false}
              />
              <TextSelect
                title={'Khác'}
                onPressButton={() => {
                  setDetailPosition('Team Khác'), setModalPosition();
                }}
                checkTick={detailPosition === 'Team Khác' ? true : false}
              />
            </ScrollView>
          </View>
        </Modal>
      </View>
      <View>
        <Modal
          isVisible={showModalRank}
          animationIn={'slideInUp'}
          animationOutTiming={1600}
          animationOut={'slideOutDown'}
          style={styles.modal}>
          <View style={styles.modalview}>
            <Text style={styles.titlemodal}>Vị trí</Text>
            <ScrollView>
              <TextSelect
                title={'Leader'}
                onPressButton={() => {
                  setDetailRank('Leader'), setModalRank(!Modal);
                }}
                checkTick={detailRank === 'Leader' ? true : false}
              />
              <TextSelect
                title={'Trưởng phòng'}
                onPressButton={() => {
                  setDetailRank('Trưởng phòng'), setModalRank(!Modal);
                }}
                checkTick={detailRank === 'Trưởng phòng' ? true : false}
              />
              <TextSelect
                title={'Giám đốc'}
                onPressButton={() => {
                  setDetailRank('Giám đốc'), setModalRank(!Modal);
                }}
                checkTick={detailRank === 'Giám đốc' ? true : false}
              />
              <TextSelect
                title={'Khác'}
                onPressButton={() => {
                  setDetailRank('Khác'), setModalRank(!Modal);
                }}
                checkTick={detailRank === 'Team Khác' ? true : false}
              />
            </ScrollView>
          </View>
        </Modal>
      </View>
    </ScrollView>
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
