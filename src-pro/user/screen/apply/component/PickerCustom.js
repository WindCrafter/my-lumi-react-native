import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Colors} from '../../../../../utlis';
import Modal from 'react-native-modal';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Button} from '../../../../component';

const PickerCustom = (props) => {
  const {
    value,
    onPress,
    onChange,
    mode,
    show,
    locale,
    minimumDate,
    onHideModal,
    title,
    maximumDate,
  } = props;

  return Platform.OS === 'ios' ? (
    <Modal
      isVisible={show}
      animationIn={'slideInUp'}
      animationOutTiming={500}
      animationOut={'slideOutDown'}
      onBackdropPress={onHideModal}
      style={styles.modal}
      backdropTransitionOutTiming={0}>
      <View style={styles.modalview}>
        <View style={styles.picker}>
          <Text style={styles.txtHeader}>
            {title || mode === 'date' ? 'Chọn ngày' : 'Chọn giờ và phút'}
          </Text>
          <DateTimePicker
            value={value}
            mode={mode}
            display="default"
            onChange={onChange}
            is24Hour={true}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            {...props}
            locale={locale}
          />
          <Button
            title={'Xong'}
            containerStyle={styles.complete}
            onPress={onPress}
          />
        </View>
      </View>
    </Modal>
  ) : (
    show && (
      <DateTimePicker
        value={value}
        mode={mode}
        display="default"
        onChange={onChange}
        is24Hour={true}
        minimumDate={minimumDate}
        {...props}
        locale={locale}
      />
    )
  );
};

export default PickerCustom;

PickerCustom.defaultProps = {
  locale: 'vi-VI',
};

const styles = StyleSheet.create({
  unshow: {
    height: 28,
    width: 28,
    borderRadius: 14,
    right: 0,
    backgroundColor: 'tomato',
    alignSelf: 'flex-end',
    marginRight: 24,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtX: {
    color: Colors.white,
    fontWeight: '900',
  },
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
  picker: {
    width: widthPercentageToDP(100),
  },
  complete: {
    backgroundColor: Colors.background,
  },
  txtHeader: {
    alignSelf: 'center',
    fontSize: 24,
  },
});
