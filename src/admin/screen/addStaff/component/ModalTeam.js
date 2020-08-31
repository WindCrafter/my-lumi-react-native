import React from 'react';
import Modal from 'react-native-modal';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { TextSelect, Button } from '../../../../component';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { Colors } from '../../../../../utlis';

const ModalTeam = (props) => {
  const {
    pressApp,
    pressBackEnd,
    pressFirmware,
    pressHR,
    pressOS,
    pressOther,
    pressTester,
    detailPosition,
    setModalPosition,
    showModalPosition,
  } = props;
  return (
    <View>
      <Modal
        isVisible={showModalPosition}
        animationIn={'slideInUp'}
        animationOutTiming={500}
        animationOut={'slideOutDown'}
        onBackdropPress={setModalPosition}
        style={styles.modal}
        backdropTransitionOutTiming={0}>
        <View style={styles.modalview}>
          <Text style={styles.titlemodal}>Vị trí</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TextSelect
              title={'App'}
              onPressButton={pressApp}
              checkTick={detailPosition === 'Team App' ? true : false}
            />
            <TextSelect
              title={'HR'}
              onPressButton={pressHR}
              checkTick={detailPosition === 'Team HR' ? true : false}
            />
            <TextSelect
              title={'Tester'}
              onPressButton={pressTester}
              checkTick={detailPosition === 'Team Tester' ? true : false}
            />
            <TextSelect
              title={'OS'}
              onPressButton={pressOS}
              checkTick={detailPosition === 'Team OS' ? true : false}
            />
            <TextSelect
              title={'Firmware'}
              onPressButton={pressFirmware}
              checkTick={detailPosition === 'Team Firm-ware' ? true : false}
            />
            <TextSelect
              title={'Back-end'}
              onPressButton={pressBackEnd}
              checkTick={detailPosition === 'Team Back-end' ? true : false}
            />
            <TextSelect
              title={'Khác'}
              onPressButton={pressOther}
              checkTick={detailPosition === 'Team Khác' ? true : false}
            />
          </ScrollView>
          <Button
            title={'Xong'}
            containerStyle={styles.complete}
            onPress={setModalPosition}
          />
        </View>
      </Modal>
    </View>
  );
};

export default ModalTeam;

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
