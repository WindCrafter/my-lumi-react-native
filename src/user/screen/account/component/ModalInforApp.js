import React from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, Text, View, Image, Platform} from 'react-native';
import {TextSelect, Button} from '../../../../component';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Colors} from '../../../../../utlis';
import {imgs} from '../../../../../utlis';
const ModalInforApp = (props) => {
  const {hideModal, showModal,} = props;

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
                  <Image source={imgs.logo}></Image>
          <Text style={styles.detailmodal}>
            Giải pháp chấm công cho doanh nghiệp.
          </Text>
        </View>
      </Modal>
    </View>
  );
};

export default ModalInforApp;

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
