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
        <View style={styles.modalviewWifi}>
          <View style={styles.viewTopWifi}>
            <Text style={styles.txtTopWifi}>Điền mã được cấp để chấm công :</Text>
          </View>
          <Card style={styles.cardWifi}>
            <Text style={styles.txtTopWifi}>{ssidUser}</Text>
            <Text style={styles.txtTopWifi}>{bssidUser}</Text>
          </Card>
          <TouchableOpacity style={styles.touchableWifi} onPress={onCheckInWifi}>
            <Text style={styles.doneWifi}>Hoàn thành</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ModalWifi;

const styles = StyleSheet.create({
 
  modalviewWifi: {
    borderRadius: 24,
    width: (85),
    height: heightPercentageToDP(35),
    paddingVertical: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  
  viewTopWifi: {
    justifyContent: 'center',
  },
 
  txtTopWifi: {
    fontSize: 18,
  },
  
 
  cardWifi: {
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
  touchableWifi: {
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
    backgroundColor: Colors.background,
    borderRadius: 50,
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  doneWifi: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
 
});
