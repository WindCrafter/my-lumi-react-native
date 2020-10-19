import React from 'react';
import Modal from 'react-native-modal';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {TextSelect, Button, Combine} from '../../../../component';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {Colors} from '../../../../../utlis';

const ModalInfor = (props) => {
  const {hideModal, showModal, picker} = props;
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
          <ScrollView horizontal={false}
 >
            <Combine status={'late'} />
            <Combine />
            <Combine />
            <Combine />
            <Combine />
            <Combine />
            <Combine />
            <Combine />

          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default ModalInfor;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  modalview: {
    borderRadius: 24,
    backgroundColor: 'white',
    alignItems: 'center',
    width: '96%',
    height:"72%",
    paddingVertical:18
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
});
