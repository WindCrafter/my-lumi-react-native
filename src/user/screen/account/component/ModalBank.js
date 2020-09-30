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
            <Text style={styles.title}>Chọn ngân hàng</Text>
            <TouchableOpacity style={styles.touchDone} onPress={hideModal}>
              <Text style={styles.done}>Xong</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <Text style={styles.detail}>Chọn ngân hàng :</Text>

            <View style={styles.lineBank}>
              <TouchableOpacity style={styles.inforBank} onPress={onSetTech}>
                <Image source={imgs.tech} style={styles.img} />
                <Text style={styles.bankname}>Techcombank</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.inforBank} onPress={onSetVCB}>
                <Image source={imgs.vietcomBank} style={styles.img} />
                <Text style={styles.bankname}>Vietcombank</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.inforBank} onPress={onSetAgri}>
                <Image source={imgs.agri} style={styles.img} />
                <Text style={styles.bankname}>Agribank</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.lineBank}>
              <TouchableOpacity style={styles.inforBank} onPress={onSetVPB}>
                <Image source={imgs.vpbank} style={styles.img} />
                <Text style={styles.bankname}>VP Bank</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.inforBank} onPress={onSetVTB}>
                <Image source={imgs.viettin} style={styles.img} />
                <Text style={styles.bankname}>VietinBank</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.inforBank} onPress={onSetBIDV}>
                <Image source={imgs.bidv} style={styles.img} />
                <Text style={styles.bankname}>BIDV</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text>Số tài khoản</Text>
          <TextInput placeholder={'nhap'} onChangeText={onBankAccount} />
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
    borderWidth: 1,
    justifyContent: 'center',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalview: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(50),
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
  },
  detail: {
    alignItems: 'flex-start',
    fontWeight: 'bold',
    fontSize: 15,
  },
  img: {
    height: 48,
    width: 48,
  },
  done: {alignSelf: 'flex-end'},
  container: {flexDirection: 'column', justifyContent: 'space-around'},
  bankname: {fontWeight: '900'},
  inforBank: {alignItems: 'center', width: '25%'},
  lineBank: {flexDirection: 'row', justifyContent: 'space-around'},
  touchDone: {justifyContent: 'flex-end'},
});
