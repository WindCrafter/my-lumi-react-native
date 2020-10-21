import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,Touch
} from 'react-native';
import {TextSelect, Button, Combine} from '../../../../component';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {Colors} from '../../../../../utlis';
const DATA = [
  {
    shift: 'Ca hành chính',
    department: 'R&D',
    timeIn: '08:00',
    timeOut: '18:00',
    status: 'ontime',
    day: 'T2',
    date: '09',
  },
  {
    shift: 'Ca hành chính',
    department: 'R&D',
    timeIn: '08:00',
    timeOut: '18:00',
    status: 'ontime',
    day: 'T2',
    date: '09',
  },
  {
    shift: 'Ca hành chính',
    department: 'R&D',
    timeIn: '08:00',
    timeOut: '18:00',
    status: 'ontime',
    day: 'T2',
    date: '09',
  },
  {
    shift: 'Ca hành chính',
    department: 'R&D',
    timeIn: '08:00',
    timeOut: '18:00',
    status: 'ontime',
    day: 'T2',
    date: '09',
  },
  {
    shift: 'Ca hành chính',
    department: 'R&D',
    timeIn: '08:00',
    timeOut: '18:00',
    status: 'ontime',
    day: 'T2',
    date: '09',
  },
  {
    shift: 'Ca hành chính',
    department: 'R&D',
    timeIn: '08:00',
    timeOut: '18:00',
    status: 'ontime',
    day: 'T2',
    date: '09',
  },
];
const ModalInfor = (props) => {
  const [listData, setListData] = useState(DATA);
  const {hideModal, showModal, picker} = props;
  const renderItem = (data) => {
    Platform.OS === 'ios'
      ? LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
      : null;
    return (
      <Combine
        day={data.item.day}
        date={data.item.date}
        department={data.item.department}
        status={data.item.status}
        shift={data.item.shift}
        timeIn={data.item.timeIn}
        timeOut={data.item.timeOut}
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
        <View
          style={
            DATA.length > 5 ? styles.modalviewLong : styles.modalviewShort
          }>
          <ScrollView horizontal={false}>
            <FlatList data={listData} renderItem={renderItem} />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default ModalInfor;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  modalviewShort: {
    borderRadius: 24,
    backgroundColor: 'white',
    alignItems: 'center',
    width: '96%',
    paddingVertical: 16,
  },
  modalviewLong: {
    borderRadius: 24,
    backgroundColor: 'white',
    alignItems: 'center',
    width: '96%',
    paddingVertical: 16,
    height: '72%',
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
