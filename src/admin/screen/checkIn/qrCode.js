import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import langs from '../../../../common/language';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {HeaderCheck} from '../../../component';
import {widthPercentageToDP as hp} from 'react-native-responsive-screen';
import {imgs} from '../../../../utlis';
import CusMarker from './CustomMarker/index';
const QRCode = (props) => {
  const {navigation} = props;
  const [txt, setTxt] = useState();
  const onSuccess = (e) => {
    console.log(e.data);
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
          showMarker={true}
          cameraProps={{ratio: '1:1'}}
          customMarker={<CusMarker/>}
          topContent={
            <View style={styles.contentTop}>
              <Text style={styles.centerText}>
                Go to <Text style={styles.textBold}>{txt}</Text> on your
                computer and scan the QR code.
              </Text>
              <Image source={imgs.Qrcode} style={styles.contentImage} />
            </View>
          }
          bottomContent={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.bottomContent}>
                <Image source={imgs.return} style={styles.bottomImage} />
                <Text style={styles.textBottom}>Quay lại </Text>
              </View>
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
    justifyContent:"space-around"
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
    height: '60%',
    width: '60%',
    alignSelf: 'center',
  },
  marker: {
    height: hp(10),
    borderColor: 'green',
    borderRightWidth: 1,
  },
  contentTop: {flex: 1, justifyContent: 'space-around'},

  contentImage: {alignSelf: 'center', height: 72, width: 72},
  bottomContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomImage: {width: 16, height: 16},
  textBottom: {fontSize: 20, marginLeft: 3},
});
