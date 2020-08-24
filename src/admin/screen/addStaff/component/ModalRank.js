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

const ModalRank = (props) => {
  const {
    showModalRank,
    onHideModal,
    pressLeader,
    pressManager,
    pressManagerHigher,
    pressOther,
    rank,
  } = props;
  return (
    <View>
      <Modal
        isVisible={showModalRank}
        animationIn={'slideInUp'}
        animationOutTiming={1600}
        animationOut={'slideOutDown'}
        onBackdropPress={onHideModal}
        style={styles.modal}
        backdropTransitionOutTiming={0}>
        <View style={styles.modalview}>
          <Text style={styles.titlemodal}>Chức vụ </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* <TextSelect
              title={'Leader'}
              onPressButton={pressLeader}
              checkTick={rank === 'Leader' ? true : false}
            />
            <TextSelect
              title={'Trưởng phòng'}
              onPressButton={pressManager}
              checkTick={rank === 'Trưởng phòng' ? true : false}
            />
            <TextSelect
              title={'Giám đốc'}
              checkTick={rank === 'Giám đốc' ? true : false}
              onPressButton={pressManagerHigher}
            />
            <TextSelect
              title={'Khác'}
              checkTick={rank === 'Khác' ? true : false}
              onPressButton={pressOther}
            /> */}
            <TextSelect
              title={'Admin'}
              onPressButton={pressLeader}
              checkTick={rank === 'ADMIN' ? true : false}
            />
            <TextSelect
              title={'User'}
              onPressButton={pressManager}
              checkTick={rank === 'USER' ? true : false}
            />
          </ScrollView>
          <Button
            title={'Xong'}
            containerStyle={styles.complete}
            onPress={onHideModal}
          />
        </View>
      </Modal>
    </View>
  );
};

export default ModalRank;

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
