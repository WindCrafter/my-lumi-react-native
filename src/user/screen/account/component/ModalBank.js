import React from 'react';
import Modal from 'react-native-modal';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {TextSelect, Button} from '../../../../component';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {Colors, imgs} from '../../../../../utlis';

const ModalBank = (props) => {
  const {
    hideModal,
    showModal,
    onSetTech,
    onSetBIDV,
    onSetAgri,
    onSetVCB,
    onSetVPB,
    onSetVTB,
    onBankAccount,
    backgroundColor,
    bankName,
  } = props;
  return (
    <View>
      <Modal
        isVisible={showModal}
        animationIn={'slideInUp'}
        animationOutTiming={500}
        animationOut={'slideOutDown'}
        onBackdropPress={hideModal}
        style={styles.modal}
        backdropTransitionOutTiming={0}>
        <View style={styles.modalview}>
          <View style={styles.viewHeader}>
            <TouchableOpacity style={styles.touchDone} disable />
            <Text style={styles.title}>Chọn ngân hàng</Text>
            <TouchableOpacity style={styles.touchDone} onPress={hideModal}>
              <Text style={styles.done}>Xong</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <Text style={styles.detail}>Chọn ngân hàng :</Text>

            <View style={styles.lineBank}>
              <TouchableOpacity style={styles.inforBank} onPress={onSetTech}>
                <Image
                  source={imgs.tech}
                  style={[
                    styles.img,
                    {
                      backgroundColor:
                        bankName === 'Techcombank' ? '#E5E5E7' : null,
                    },
                  ]}
                />
                <Text style={styles.bankname}>Techcombank</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.inforBank, {backgroundColor: backgroundColor}]}
                onPress={onSetVCB}>
                <Image
                  source={imgs.vietcomBank}
                  style={[
                    styles.img,
                    {
                      backgroundColor:
                        bankName === 'Vietcombank' ? '#E5E5E7' : null,
                    },
                  ]}
                />
                <Text style={styles.bankname}>Vietcombank</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.inforBank, {backgroundColor: backgroundColor}]}
                onPress={onSetAgri}>
                <Image
                  source={imgs.agri}
                  style={[
                    styles.img,
                    {
                      backgroundColor:
                        bankName === 'Agribank' ? '#E5E5E7' : null,
                    },
                  ]}
                />
                <Text style={styles.bankname}>Agribank</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.lineBank}>
              <TouchableOpacity
                style={[styles.inforBank, {backgroundColor: backgroundColor}]}
                onPress={onSetVPB}>
                <Image
                  source={imgs.vpbank}
                  style={[
                    styles.img,
                    {
                      backgroundColor: bankName === 'VPBank' ? '#E5E5E7' : null,
                    },
                  ]}
                />
                <Text style={styles.bankname}>VPBank</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.inforBank, {backgroundColor: backgroundColor}]}
                onPress={onSetVTB}>
                <Image
                  source={imgs.viettin}
                  style={[
                    styles.img,
                    {
                      backgroundColor:
                        bankName === 'VietinBank' ? '#E5E5E7' : null,
                    },
                  ]}
                />
                <Text style={styles.bankname}>VietinBank</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.inforBank, {backgroundColor: backgroundColor}]}
                onPress={onSetBIDV}>
                <Image
                  source={imgs.bidv}
                  style={[
                    styles.img,
                    {backgroundColor: bankName === 'BIDV' ? '#E5E5E7' : null},
                  ]}
                />
                <Text style={styles.bankname}>BIDV</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.detail}>Số tài khoản :</Text>
          <TextInput
            placeholder={'Vui lòng nhập số tài khoản :'}
            onChangeText={onBankAccount}
            style={styles.detailHolder}
          />
        </View>
      </Modal>
    </View>
  );
};

export default ModalBank;

const styles = StyleSheet.create({
  viewHeader: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalview: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(70),
    backgroundColor: 'white',
  },
  titlemodal: {
    fontWeight: '500',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  complete: {
    backgroundColor: Colors.background,
  },
  title: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  detail: {
    alignItems: 'flex-start',
    fontWeight: '500',
    fontSize: 18,
    marginLeft: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  detailHolder: {
    alignItems: 'flex-start',
    fontWeight: '500',
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  img: {
    height: 48,
    width: 48,
    borderRadius: 32,
  },
  done: {
    
    fontSize: 18,
    color: 'green',
  },
  container: {flexDirection: 'column', justifyContent: 'space-around'},
  bankname: {fontWeight: '600'},
  inforBank: {alignItems: 'center', width: '25%', borderRadius: 32},
  lineBank: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
  touchDone: {justifyContent: 'center', alignSelf: 'center',width:'20%'},
});
