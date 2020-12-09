import React from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from '../../../../component';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Colors} from '../../../../../utlis';

const ModalTime = (props) => {
  const {hideModal, showModal, picker, title, onConfirm} = props;
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
          <Text style={styles.titlemodal}>{title || 'Chọn ngày sinh'}</Text>
          {picker}
          <Button
            title={'Xong'}
            containerStyle={styles.complete}
            onPress={onConfirm}
          />
        </View>
      </Modal>
    </View>
  );
};

export default ModalTime;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalview: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: widthPercentageToDP(100),
    paddingVertical: 32,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titlemodal: {
    fontWeight: '500',
    fontSize: 20,
  },
  complete: {
    backgroundColor: Colors.background,
  },
});
