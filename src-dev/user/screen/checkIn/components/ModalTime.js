import React, {useState} from 'react';
import {View, StyleSheet, Platform, Text, Dimensions} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import {Button} from '../../../../component';
import {Colors} from '../../../../../utlis';
import {widthPercentageToDP} from 'react-native-responsive-screen';

export const ModalTime = (props) => {
  const {show, onHideModal, onConfirm, value, title, typeModal} = props;
  const [date, setDate] = useState(value || new Date());

  const onChangeIOS = (event, selected) => {
    if (Platform.OS === 'ios') {
      setDate(selected);
    } else {
      if (event.type === 'set') {
        setDate(selected);
      }
    }
  };

  const onConfirmDate = () => {
    onConfirm(date);
  };

  return (
    <View>
      {show &&
        (Platform.OS === 'ios' ? (
          <View>
            <Modal
              isVisible={show}
              animationIn={'slideInUp'}
              animationOutTiming={500}
              animationOut={'slideOutDown'}
              onBackdropPress={onHideModal}
              style={styles.modal}
              backdropTransitionOutTiming={0}>
              <View style={styles.modalview}>
                <Text style={styles.titlemodal}>
                  {title || 'Chọn ngày sinh'}
                </Text>
                <View style={styles.picker}>
                  <DateTimePicker
                    value={date}
                    mode={typeModal}
                    display="default"
                    onChange={onChangeIOS}
                  />
                </View>
                <Button
                  title={'Xong'}
                  containerStyle={styles.complete}
                  onPress={onConfirmDate}
                />
              </View>
            </Modal>
          </View>
        ) : (
          <DateTimePicker
            value={date}
            mode={typeModal}
            is24Hour={true}
            display="clock"
            onChange={onConfirmDate}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  picker: {
    width: Dimensions.get('window').width,
  },
  modal: {
    justifyContent: 'flex-end',
    alignItems: 'center',
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
  },
  complete: {
    backgroundColor: Colors.background,
  },
});

export default ModalTime;
