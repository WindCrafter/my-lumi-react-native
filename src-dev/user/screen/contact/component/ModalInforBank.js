import React from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, Text, View, Image, Platform} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {imgs} from '../../../../../utlis';
const ModalInforBank = (props) => {
  const {hideModal, showModal, BankAccount, bankName} = props;

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
          {Platform.OS === 'ios' ? (
            <Text style={styles.titlemodal}>Đã copy vào bộ nhớ tạm.</Text>
          ) : (
            <Text style={styles.titlemodal}>Thông tin ngân hàng.</Text>
          )}
          <View style={styles.detailView}>
            <Image source={imgs.banking} />
            <Text style={styles.description}>STK :</Text>

            <Text style={styles.detailmodal}>{BankAccount}</Text>
          </View>
          <View style={styles.detailView}>
            <Image source={imgs.bank} />
            <Text style={styles.description}>Ngân Hàng :</Text>

            <Text style={styles.detailmodal}>{bankName}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalInforBank;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 0,
  },
  modalview: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: widthPercentageToDP(100),
    paddingTop: 16,
    paddingBottom: 64,
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
  detailmodal: {
    fontWeight: '500',
    fontSize: 15,
    marginTop: 20,
    marginBottom: 10,
    width: '40%',
  },
  description: {
    fontWeight: '500',
    fontSize: 15,
    marginTop: 20,
    marginBottom: 10,
    width: '24%',
    justifyContent: 'flex-start',
  },

  detailView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 32,
  },
});
