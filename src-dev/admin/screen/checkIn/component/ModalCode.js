import React from 'react';
import Modal from 'react-native-modal';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { Colors, imgs } from '../../../../../utlis';
import { Card } from 'native-base';

const ModalCode = (props) => {
  const { hideModal, showModal, code, onChangeCode, onCheckIn } = props;
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
            <KeyboardAvoidingView style={styles.body}>
              <Image source={imgs.key} style={styles.imageInput} />
              <TextInput
                style={styles.txtInput}
                textAlign={'left'}
                placeholder={'Nhập mã chấm công'}
                placeholderTextColor={'gray'}
                onChangeText={onChangeCode}
                clearButtonMode={'while-editing'}
                value={code}
              />
            </KeyboardAvoidingView>
          </Card>
          <TouchableOpacity style={styles.touchable} onPress={onCheckIn}>
            <Text style={styles.done}>Hoàn thành</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ModalCode;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  modalview: {
    borderRadius: 24,
    width: widthPercentageToDP(85),
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
