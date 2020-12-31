import React from 'react';
import Modal from 'react-native-modal';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Colors, imgs} from '../../../../../utlis';
const ModalInforApp = (props) => {
  const {hideModal, showModal, openUrl} = props;

  return (
    <Modal
      isVisible={showModal}
      animationIn={'slideInUp'}
      animationOutTiming={500}
      animationOut={'slideOutDown'}
      onBackdropPress={hideModal}
      style={styles.modal}
      backdropTransitionOutTiming={0}>
      <View style={styles.modalview}>
        {/* <Image source={imgs.logoMyLumi} style={{}}/> */}
        <ImageBackground
          source={imgs.logo}
          resizeMode="contain"
          {...props}
          style={[styles.imageLogo]}
        />
        <Text style={styles.title}>My Lumi</Text>
        <Text style={styles.detailmodal}>
          Giải pháp phần mềm cho doanh nghiệp.
        </Text>
        {/* <Text style={styles.titleDescription}>
          Hỗ trợ chấm công, quản lí nhân sự và nhiều hơn thế.
        </Text> */}
        <Text style={styles.version}>V1.1.0 - 30/12/2020 17:00</Text>
        <Text style={styles.website}>Công ty cổ phần Lumi Việt Nam</Text>
        <Text style={styles.website}>
          Số 38, Đỗ Đức Dục, quận Nam Từ Liêm, Hà Nội
        </Text>
        <TouchableOpacity onPress={openUrl} style={styles.URL}>
          <Text>Website: </Text>
          <Text style={styles.link}>https://lumi.vn</Text>
        </TouchableOpacity>
      </View>
    </Modal>
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
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    width: '100%',
    alignSelf: 'center',
    textAlign: 'center',
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
  title: {
    color: Colors.background,
    fontSize: 28,
    marginTop: 8,
  },
  version: {color: 'grey', fontSize: 12, marginBottom: 48},
  URL: {flexDirection: 'row', marginTop: 8},
  website: {
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  link: {textDecorationLine: 'underline'},
  titleDescription: {
    fontWeight: '400',
    fontSize: 14,
    marginTop: 20,
    marginBottom: 10,
    color: 'black',
    width: '80%',
  },
  imageLogo: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
});
