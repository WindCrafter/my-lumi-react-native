import React from 'react';
import Modal from 'react-native-modal';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { Card } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors, imgs } from '../../../../../utlis';

const ModalAvatar = props => {
  const { hideModal, showModal, onOpenLibrary, onOpenCamera } = props;
  return (
    <View>
      <Modal
        isVisible={showModal}
        animationIn="slideInUp"
        animationOutTiming={500}
        animationOut="slideOutDown"
        onBackdropPress={hideModal}
        style={styles.modal}
        backdropTransitionOutTiming={0.5}
      >
        <View style={{ marginBottom: 16, alignItems: 'center' }}>
          <Card style={styles.modalview}>
            <TouchableOpacity style={styles.selectView} onPress={onOpenLibrary}>
              <Icon name="image-outline" size={28} />
              <Text style={styles.content}>Chọn ảnh</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.selectView} onPress={onOpenCamera}>
              <Icon name="camera-outline" size={28} />
              <Text style={styles.content}>Chụp ảnh</Text>
            </TouchableOpacity>
          </Card>
          <Card style={styles.modalview}>
            <TouchableOpacity onPress={hideModal}>
              <Text style={styles.cancel}>Huỷ</Text>
            </TouchableOpacity>
          </Card>
        </View>
      </Modal>
    </View>
  );
};

export default ModalAvatar;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalview: {
    borderRadius: 16,
    width: widthPercentageToDP(90),
    backgroundColor: 'white',
    paddingHorizontal: 16,
    marginTop: 12,
  },
  selectView: { flexDirection: 'row', alignItems: 'center', paddingVertical: 18 },
  cancel: {
    paddingVertical: 16,
    alignSelf: 'center',
    fontWeight: '600',
    fontFamily: 'Quicksand-Bold',
    fontSize: 18,
  },
  content: { marginLeft: 24, fontSize: 16, fontWeight: '500' },
});
