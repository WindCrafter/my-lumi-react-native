import React, {useState} from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {imgs, Colors} from '../../../../../utlis';
import Icon from 'react-native-vector-icons/Feather';
// import langs from '../../../../../common/language';
import ModalTime from '../../account/component/ModalTime';
import PickerCustom from './PickerCustom';

const HeaderCustom = (props?: Props) => {
  const {width} = props || wp(100);
  const {height} = props || 60;
  const {fontSize} = props || 20;
  const {rightImage} = props || imgs.add;
  const {backgroundColor} = props || Colors.white;
  const {textPress} = props || false;

  const {
    leftImage,
    containerStyle,
    title,
    goBack,
    rightButton,
    onRight,
    onChangeStatus,
    onChangeDate,
    ...otherProps
  } = props;
  const [isVisible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState('');
  const onClose = () => {
    setVisible(false);
  };

  const onShow = () => {
    setShow(true);
  };

  const onHideModal = () => {
    setShow(false);
  };

  const onChangeDatetime = (event, selectedDay) => {
    if (Platform.OS === 'ios') {
      setDate(selectedDay);
      onChangeDate(selectedDay);
    } else {
      if (event.type === 'set') {
        setDate(selectedDay);
        onChangeDate(selectedDay);
      }
      setShow(false);
    }
  };

  return (
    <View style={[styles.container, {zIndex: 50}]}>
      <View
        style={[
          styles.row,
          {
            width,
            height,
            backgroundColor,
            justifyContent: 'center',
          },
          containerStyle,
        ]}>
        <TouchableOpacity onPress={goBack} style={styles.button}>
          <Icon name="chevron-left" size={32} color={Colors.black} />
        </TouchableOpacity>
        <Text style={[styles.title, {fontSize}]} {...otherProps}>
          {title}
        </Text>
        {rightButton ? (
          <TouchableOpacity style={styles.right} onPress={onRight}>
            {textPress ? (
              <Text style={styles.txtBt}>Xong</Text>
            ) : (
              <Image source={rightImage} style={styles.img} />
            )}
          </TouchableOpacity>
        ) : null}
      </View>
      <View
        style={[
          styles.row,
          {marginBottom: 16, justifyContent: 'space-around'},
        ]}>
        <DropDownPicker
          items={[
            {label: 'Tất cả', value: '0'},
            {label: 'Đang chờ', value: '1'},
            {label: 'Đã duyệt', value: '2'},
            {label: 'Bị từ chối', value: '3'},
          ]}
          onClose={onClose}
          isVisible={isVisible}
          containerStyle={styles.contentStatus}
          onChangeItem={(item) => onChangeStatus(item.value)}
          placeholder={'Tất cả'}
          defaultValue={null}
          customTickIcon={() => <Image source={imgs.arrow} />}
          style={styles.filterStatus}
          itemStyle={{justifyContent: 'flex-start'}}
          dropDownStyle={styles.dropDownStyle}
          labelStyle={{fontSize: 18}}
          arrowSize={19}
          activeLabelStyle={{color: Colors.background}}
          dropDownMaxHeight={200}
        />
        <TouchableOpacity style={styles.filterDate} onPress={onShow}>
          <Text style={styles.txtRole}>
            {date ? moment(new Date(date)).format('DD/MM/YYYY') : 'Ngày'}{' '}
          </Text>
          <Text>{show ? '▲' : '▼'}</Text>
        </TouchableOpacity>
      </View>
      <PickerCustom
        show={show}
        value={date || new Date()}
        onChange={onChangeDatetime}
        onPress={onHideModal}
      />
      {/* {Platform.OS === 'ios'
        ? show && (
            <ModalTime
              showModal={show}
              hideModal={onHideModal}
              picker={
                <View style={styles.picker}>
                  <DateTimePicker
                    isV
                    value={date || new Date()}
                    mode={'date'}
                    display="default"
                    onChange={onChangeDatetime}
                  />
                </View>
              }
            />
          )
        : show && (
            <DateTimePicker
              value={date || new Date()}
              mode={'date'}
              display="default"
              onChange={onChangeDatetime}
            />
          )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.25,
    borderColor: Colors.gray,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  button: {
    position: 'absolute',
    left: 16,
    width: 32,
    height: 32,
  },
  image: {
    width: 32,
    height: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.black,
  },
  right: {
    backgroundColor: 'rgba(0,0,0,0)',
    padding: 4,
    position: 'absolute',
    right: 16,
    borderRadius: 16,
  },
  img: {
    width: 20,
    height: 20,
  },
  txtBt: {
    fontSize: 18,
    fontWeight: '300',
    color: Colors.background,
  },
  contentStatus: {
    height: 40,
    width: 150,
    borderColor: 'white',
    fontSize: 16,
  },
  filterStatus: {},
  filterDate: {
    flexDirection: 'row',
    borderWidth: 0.25,
    borderColor: Colors.gray,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 6,
    paddingHorizontal: 16,
    width: 150,
    height: 40,
  },
  picker: {
    width: wp(100),
  },
});

export default HeaderCustom;
