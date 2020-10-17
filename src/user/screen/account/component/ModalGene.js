import React from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {TextSelect, Button} from '../../../../component';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {Colors} from '../../../../../utlis';

const DATA = [{gene: 'Nam'}, {gene: 'Nữ'}, {gene: 'Khác'}];

const ModalGene = (props) => {
  const {hideModal, showModal, detailGene, pressItem} = props;

  const renderItem = ({item}) => {
    return (
      <TextSelect
        title={item.gene}
        onPressButton={() => pressItem(item.gene)}
        checkTick={detailGene === item.gene ? true : false}
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
          <Text style={styles.titlemodal}>Chọn giới tính</Text>
          <FlatList
            data={DATA}
            keyExtractor={(item) => item.gene}
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

export default ModalGene;

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
