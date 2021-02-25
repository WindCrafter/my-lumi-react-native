import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import { StyleSheet, Text, View, Image, Platform, Touchable } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Clipboard from '@react-native-community/clipboard';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { imgs, Colors } from '../../../../../utlis';

const ModalInforBank = (props) => {
  const { hideModal, showModal, BankAccount, bankName } = props;
  console.log('showModal', showModal);
  useEffect(() => {
    if (showModal) {
      setIsCopy(false);
    }
  }, [showModal]);
  const [isCopy, setIsCopy] = useState(false);
  const onCopy = () => {
    console.log('check copy');
    Clipboard.setString(`${BankAccount}`);
    setIsCopy(true);
  }; return (
    <View>
      <Modal
        isVisible={showModal}
        animationIn="slideInUp"
        animationOutTiming={500}
        animationOut="slideOutDown"
        onBackdropPress={hideModal}
        style={styles.modal}
        backdropTransitionOutTiming={0}
      >
        <View style={styles.modalview}>
          <Text style={[styles.titlemodal, { fontSize: 16 }]}>
            Thông tin ngân hàng :
          </Text>
          <View style={[styles.detailView, { marginTop: 16 }]}>
            <View style={styles.startView}>
              <Image source={imgs.banking} style={styles.image} />
              <Text style={styles.description}>Số tài khoản:</Text>
            </View>
            <Text style={[styles.detailmodal, { flex: 0.6 }]}>{BankAccount}</Text>
            <TouchableOpacity onPress={onCopy} style={{ width: 48, justifyContent: 'center', alignItems: 'center' }}>
              <Icon name={isCopy ? 'checkmark-outline' : 'copy-outline'} size={20} color={isCopy ? Colors.background : 'black'} />
            </TouchableOpacity>
          </View>
          <View style={styles.detailView}>
            <View style={styles.startView}>
              <Image source={imgs.bank} style={styles.image} />
              <Text style={styles.description}>Ngân Hàng:</Text>
            </View>

            <Text style={[styles.detailmodal, { flex: 0.6 }]}>{bankName}</Text>
            <View style={{ width: 48 }}>
              <Icon name="copy-outline" size={20} style={{ color: 'white' }} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalInforBank;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 0,
    flex: 1,
  },
  modalview: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: widthPercentageToDP(100),
    paddingTop: 16,
    paddingBottom: 32,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titlemodal: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 10,
  },
  detailmodal: {
    fontWeight: '500',
    fontSize: 15,
    justifyContent: 'center',
    textAlign: 'right'
  },
  description: {
    fontWeight: '500',
    fontSize: 15,
    marginLeft: 8,
  },

  detailView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginLeft: 16,
    marginBottom: 16
  },
  startView: {
    flexDirection: 'row',
    flex: 0.5,
    alignItems: 'center',
  },
  image: { width: 20, height: 20 }
});
