import React from 'react';
import Modal from 'react-native-modal';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Button } from '../../../../component';
import { RNCamera } from 'react-native-camera';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { Colors, imgs } from '../../../../../utlis';
import QRCodeScanner from 'react-native-qrcode-scanner';
import CusMarker from '../CustomMarker';

const ModalQR = (props) => {
  const { hideModal, showModal, onCheckIn } = props;
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
          <Text style={styles.titlemodal}>Quét mã QR để chấm công</Text>
          <QRCodeScanner
            onRead={onCheckIn}
            reactivate={true}
            reactivateTimeout={3000}
            flashMode={RNCamera.Constants.FlashMode.off}
            cameraStyle={styles.camera}
            showMarker={true}
            cameraProps={{ ratio: '1:1' }}
            customMarker={<CusMarker />}
            topContent={
              <View style={styles.contentTop}>
                <Image source={imgs.Qrcode} style={styles.contentImage} />
              </View>
            }
          />
        </View>
      </Modal>
    </View>
  );
};

export default ModalQR;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  modalview: {
    borderRadius: 28,
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(60),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titlemodal: {
    fontWeight: '500',
    fontSize: 16,
    marginTop: 16,
    marginBottom: 4,
  },
  complete: {
    backgroundColor: Colors.background,
  },
  camera: {
    height: '60%',
    width: '60%',
    marginTop: heightPercentageToDP(10),
    alignSelf: 'center',
  },
  contentTop: {
    flex: 1,
    paddingTop: 8,
  },
  contentImage: {
    alignSelf: 'center',
    height: 72,
    width: 72,
  },
});
