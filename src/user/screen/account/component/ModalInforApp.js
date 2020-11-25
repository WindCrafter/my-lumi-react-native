import React from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Logo} from '../../../../component';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Colors} from '../../../../../utlis';
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
        <Logo />
        <Text style={styles.title}>My Lumi</Text>
        <Text style={styles.detailmodal}>
          Giải pháp phần mềm cho doanh nghiệp.
        </Text>
        {/* <Text style={styles.titleDescription}>
          Hỗ trợ chấm công, quản lí nhân sự và nhiều hơn thế.
        </Text> */}
        <Text style={styles.version}>V1.0 - 1/10/2020</Text>
        <Text style={styles.website}>Công ty cổ phần Lumi</Text>
        <Text style={styles.website}>
          6th Floor, New Skyline Building, 19/5 Str,Ha Dong Dist, HN
        </Text>
        <TouchableOpacity onPress={openUrl} style={styles.URL}>
          <Text style={styles.website}>Website: </Text>
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
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    width: '80%',
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
  website: {},
  link: {textDecorationLine: 'underline'},
  titleDescription: {
    fontWeight: '400',
    fontSize: 14,
    marginTop: 20,
    marginBottom: 10,
    color: 'black',
    width: '80%',
  },
});
