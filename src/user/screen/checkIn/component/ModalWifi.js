import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import {PermissionsAndroid} from 'react-native';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Text,
  Platform,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {PERMISSIONS, check, request, RESULTS} from 'react-native-permissions';
import {Button} from '../../../../component';
import {RNCamera} from 'react-native-camera';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {Colors, imgs} from '../../../../../utlis';
import QRCodeScanner from 'react-native-qrcode-scanner';
import CusMarker from '../CustomMarker';
import {Card} from 'native-base';

const ModalWifi = (props) => {
  const {
    checkInWifi,
    deviceId,
    ssidUser,
    bssidUser,
    type,
    hideModal,
    showModal,
    onCheckInWifi,
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
          <View style={styles.viewTop}>
            <Text style={styles.txtTop}>Điền mã được cấp để chấm công :</Text>
          </View>
          <Card style={styles.card}>
            <Text style={styles.txtTop}>{ssidUser}</Text>
            <Text style={styles.txtTop}>{bssidUser}</Text>
          </Card>
          <TouchableOpacity style={styles.touchable} onPress={onCheckInWifi}>
            <Text style={styles.done}>Hoàn thành</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ModalWifi;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  modalview: {
    borderRadius: 24,
    width: (85),
    height: heightPercentageToDP(35),
    paddingVertical: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
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
  viewTop: {
    justifyContent: 'center',
  },
  viewMid: {
    flex: 1,
    alignItems: 'center',
  },
  txtTop: {
    fontSize: 18,
  },
  txtCheck: {
    fontSize: 17,
    fontWeight: '400',
    alignSelf: 'center',
  },
  nothing: {
    flex: 3,
  },
  blankspace: {
    flex: 2,
  },
  card: {
    width: widthPercentageToDP(70),
    alignSelf: 'center',
    borderRadius: 24,
    paddingVertical: 2,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  touchable: {
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
    backgroundColor: Colors.background,
    borderRadius: 50,
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  done: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
  body: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 4,
    width: widthPercentageToDP(40),
  },
  imageInput: {
    alignSelf: 'center',
    marginRight: 8,
  },
  txtInput: {
    width: widthPercentageToDP(50),
  },
});
