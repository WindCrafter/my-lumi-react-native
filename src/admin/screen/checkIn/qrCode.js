import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import langs from '../../../../common/language';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { HeaderCheck } from '../../../component';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

const QRCode = (props) => {
  const { navigation } = props;
  const [txt, setTxt] = useState('');
  const onSuccess = (e) => {
    setTxt(e.data);
  };

  return (
    <View style={styles.container}>
      <HeaderCheck title={langs.qrCode} />
      <TouchableOpacity
        style={styles.butttton}
        onPress={() => navigation.goBack()}>
        <Text>{txt}</Text>
      </TouchableOpacity>
      <View style={styles.detail}>
        <QRCodeScanner
          onRead={onSuccess}
          reactivate={true}
          reactivateTimeout={300}
          flashMode={RNCamera.Constants.FlashMode.off}
          cameraStyle={styles.camera}
          topContent={
            <Text style={styles.centerText}>
              Go to <Text style={styles.textBold}>{txt}</Text> on your computer
              and scan the QR code.
            </Text>
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
  butttton: {
    width: 200,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBold: {
    marginBottom: 60,
  },
  camera: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(50),
  },
});
