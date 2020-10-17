import React from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {TextSelect, Button} from '../../../../component';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {Colors} from '../../../../../utlis';

const DATA = [{team: 'App'}, {team: 'System'}, {team: 'OS'}, {team: 'Test'}];

const ModalTeam = (props) => {
  const {hideModal, showModal, detailTeam, pressItem} = props;

  const renderItem = ({item}) => {
    return (
      <TextSelect
        title={item.team}
        onPressButton={() => pressItem(item.team)}
        checkTick={detailTeam === item.team ? true : false}
      />
    );
  };
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
          <Text style={styles.titlemodal}>Chọn team</Text>
          <FlatList
            data={DATA}
            keyExtractor={(item) => item.team}
            renderItem={renderItem}
          />
          <Button
            title={'Xong'}
            containerStyle={styles.complete}
            onPress={hideModal}
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
    paddingVertical: 32,
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
