import React from 'react';
import Modal from 'react-native-modal';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {TextSelect, Button} from '../../../../component';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {Colors} from '../../../../../utlis';

const DATA = [
  {
    room: 'Phòng họp',
    id: '1',
  },
  {
    room: 'Phòng ăn',
    id: '2',
  },
  {
    room: 'Phòng Chủ Tịch',
    id: '3',
  },
];

const LocationModal = (props) => {
  const {detail, setModal, showModal, onPress} = props;
  const renderItem = ({item, index}) => {
    return (
      <TextSelect
        title={item.room}
        onPressButton={() => onPress(item.room)}
        checkTick={detail === item.room ? true : false}
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
        onBackdropPress={setModal}
        style={styles.modal}
        backdropTransitionOutTiming={0}>
        <View style={styles.modalview}>
          <Text style={styles.titlemodal}>Vị trí</Text>
          <FlatList
            data={DATA}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
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

export default LocationModal;

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
    borderWidth:1
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
