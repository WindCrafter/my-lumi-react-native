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
        <View style={styles.modalviewCode}>
          <View style={styles.viewTopCode}>
            <Text style={styles.txtTopCode}>Điền mã được cấp để chấm công :</Text>
          </View>
          <Card style={styles.cardCode}>
            <KeyboardAvoidingView style={styles.bodyCode}>
              <Image source={imgs.key} style={styles.imageInputCode} />
              <TextInput
                style={styles.txtInputCode}
                textAlign={'left'}
                placeholder={'Nhập mã chấm công'}
                placeholderTextColor={'gray'}
                onChangeText={onChangeCode}
                clearButtonMode={'while-editing'}
                value={code}
              />
            </KeyboardAvoidingView>
          </Card>
          <TouchableOpacity style={styles.touchableCode} onPress={onCheckIn}>
            <Text style={styles.doneCode}>Hoàn thành</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ModalCode;

const styles = StyleSheet.create({
  
  modalviewCode: {
    borderRadius: 24,
    width: widthPercentageToDP(85),
    height: heightPercentageToDP(35),
    paddingVertical: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  

  viewTopCode: {
    justifyContent: 'center',
  },
  
  txtTopCode: {
    fontSize: 18,
  },
  
  cardCode: {
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
  touchableCode: {
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
    backgroundColor: Colors.background,
    borderRadius: 50,
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  doneCode: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
  bodyCode: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 4,
    width: widthPercentageToDP(40),
  },
  imageInputCode: {
    alignSelf: 'center',
    marginRight: 8,
  },
  txtInputCode: {
    width: widthPercentageToDP(50),
  },
});
