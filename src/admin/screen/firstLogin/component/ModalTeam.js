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

const ModalTeam = (props) => {
  const {
    data,
    detailPosition,
    setModalPosition,
    showModalPosition,
    pressItem,
  } = props;

  const renderItem = ({item}) => {
    return (
      <View>
        <TextSelect
          title={item.name}
          onPressButton={() => pressItem(item.name)}
          checkTick={detailPosition === item.name ? true : false}
        />
      </View>
    );
  };

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
          <FlatList
            data={data}
            keyExtractor={(item) => item.teamId}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
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
