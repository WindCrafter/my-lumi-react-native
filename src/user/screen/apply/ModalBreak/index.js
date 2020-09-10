import React from 'react';
import Modal from 'react-native-modal';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { TextSelect, Button } from '../../../../component';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { Colors } from '../../../../../utlis';

const ModalBreak = (props) => {
  const {
    pressShift,
    pressDay,
    pressMoreDay,
    typeBreak,
    setModal,
    showModal,
    setCheck,
    setClose
  } = props;
  return (
    <View>
      <Modal
        isVisible={showModal}
        animationIn={'slideInUp'}
        animationOutTiming={500}
        animationOut={'slideOutDown'}
        onBackdropPress={setClose}
        style={styles.modal}
        backdropTransitionOutTiming={0}>
        <View style={styles.modalview}>
          <Text style={styles.titlemodal}>Thời gian nghỉ</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TextSelect
              title={'Nghỉ theo ca'}
              onPressButton={pressShift}
              checkTick={typeBreak === 'Nghỉ theo ca' ? true : false}
            />
            <TextSelect
              title={'Nghỉ một ngày'}
              onPressButton={pressDay}
              checkTick={typeBreak === 'Nghỉ một ngày' ? true : false}
            />
            <TextSelect
              title={'Nghỉ nhiều ngày'}
              onPressButton={pressMoreDay}
              checkTick={typeBreak === 'Nghỉ nhiều ngày' ? true : false}
            />
          </ScrollView>
          <Button
            title={'Xong'}
            containerStyle={styles.complete}
            onPress={setModal}
          />
        </View>
      </Modal>
    </View>
  );
};

export default ModalBreak;

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
    height: heightPercentageToDP(50),
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
  complete: {
    backgroundColor: Colors.background,
  },
});
