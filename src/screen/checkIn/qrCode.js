import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { HeaderCheck } from '../../component';
import { Card } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../../../utlis';
import langs from '../../../common/language';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const QRCode = (props) => {
  const { navigation } = props;
  const onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err)
    );
  };

  return (
    <View style={styles.container}>
      <HeaderCheck title={langs.qrCode} />
      <View style={styles.detail}>
        <QRCodeScanner
          onRead={onSuccess}
          flashMode={RNCamera.Constants.FlashMode.torch}
          topContent={
            <Text style={styles.centerText}>
              Go to{' '}
              <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
              your computer and scan the QR code.
            </Text>
          }
          bottomContent={
            <TouchableOpacity style={styles.buttonTouchable}>
              <Text style={styles.buttonText}>OK. Got it!</Text>
            </TouchableOpacity>
          }
        />
      </View>
    </View>
  );
};

export default QRCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detail: {
    flex: 4,
  },
  viewTop: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  viewMid: {
    flex: 1,
    alignItems: 'center',
  },
  txtTop: {
    fontSize: 16,
  },
  card: {
    borderRadius: 24,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingHorizontal: 16,
    paddingVertical: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtCheck: {
    fontSize: 17,
    fontWeight: '400',
    alignSelf: 'center',
  },
  nothing: {
    flex: 2,
  },
});
