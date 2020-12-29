import React, {useState} from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  FlatList,
} from 'react-native';
import moment from 'moment';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {imgs, Colors} from '../../../../../utlis';
import Icon from 'react-native-vector-icons/Feather';

import PickerCustom from './PickerCustom';
import {Input, SelectButton} from '../../../../component';
// import {FlatList} from 'react-native-gesture-handler';

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
    onChangeName,
    search,
    onSearch,
    txtSearch,
    type,
    ...otherProps
  } = props;
  const [isVisible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState();

  const [_date, setDateChange] = useState(new Date());
  const onClear = () => {
    setDate('');
    onChangeDate('');
  };
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
      setDateChange(selectedDay);
    } else {
      if (event.type === 'set') {
        setShow(false);
        setDate(selectedDay);
        setDateChange(selectedDay);
        onChangeDate(selectedDay);
      } else {
        setShow(false);
      }
    }
  };

  const renderDropdown = (hideOverlay) => {
    return (
      <FlatList
        style={{backgroundColor: 'white', borderRadius: 8}}
        data={status}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => renderItem(item, hideOverlay)}
      />
    );
  };

  const onPressItem = (item, hideOverlay) => {
    hideOverlay && hideOverlay();
    onChangeStatus(item.value);
  };

  const renderItem = (item, hideOverlay) => {
    return (
      <View>
        {item.value === '0' ? null : <View style={styles.line} />}
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => onPressItem(item, hideOverlay)}>
          <Text
            style={[
              styles.text,
              {color: type === item.label ? Colors.background : 'black'},
            ]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const onPressConfirmIOS = () => {
    setDate(_date ? _date : new Date());
    onChangeDate(_date ? _date : new Date());
    setShow(false);
  };

  const status = [
    {label: 'Tất cả', value: '0'},
    {label: 'Đang chờ', value: '1'},
    {label: 'Đã duyệt', value: '2'},
    {label: 'Bị từ chối', value: '3'},
  ];

  return (
    <View style={[styles.container]}>
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
      {search && (
        <Input
          button
          leftImage={imgs.search}
          containerStyle={styles.search}
          onPress={onSearch}
          value={txtSearch}
          onChangeText={onChangeName}
          autoCapitalize={'none'}
          placeholder={'Bạn muốn tìm lumier nào?'}
        />
      )}
      <View
        style={[
          styles.row,
          {marginBottom: 16, justifyContent: 'space-around'},
        ]}>
        <SelectButton
          dropdownHeight={20}
          dropdownWidth={100}
          renderDropdown={renderDropdown}>
          <View style={styles.filterStatus}>
            <Text>{type}</Text>
            <Text> ▼</Text>
          </View>
        </SelectButton>
        <View
          style={[
            styles.filterDate,
            {justifyContent: !date ? 'center' : 'space-between'},
          ]}>
          <TouchableOpacity style={styles.txtDay} onPress={onShow}>
            <Text style={styles.txtRole}>
              {date ? moment(new Date(date)).format('DD/MM/YYYY') : 'Ngày'}{' '}
            </Text>
            <Text>{show ? '▲' : '▼'}</Text>
          </TouchableOpacity>
          {date ? (
            <TouchableOpacity onPress={onClear} style={styles.touchableClear}>
              <View style={styles.column} />
              <Image source={imgs.cancel} style={styles.imgClear} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <PickerCustom
        title="Chọn ngày"
        show={show}
        value={_date || new Date()}
        onChange={onChangeDatetime}
        onHideModal={onHideModal}
        onPress={onPressConfirmIOS}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.25,
    borderColor: Colors.gray,
    backgroundColor: Colors.white,
    paddingVertical: 10,
  },
  row: {
    paddingTop: 5,
    flexDirection: 'row',
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  button: {
    position: 'absolute',
    left: 16,
    width: 32,
    height: 32,
    top: 10,
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
  filterStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: Colors.gray,
    borderWidth: 0.25,
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 6,
    padding: 8,
  },
  filterDate: {
    flexDirection: 'row',
    borderWidth: 0.25,
    borderColor: Colors.gray,
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 16,
    width: 150,
    height: 40,
  },
  picker: {
    width: wp(100),
  },
  search: {
    alignSelf: 'center',
    borderRadius: 32,
    height: 40,
    width: Dimensions.get('window').width - 64,
    marginVertical: 8,
    backgroundColor: '#ffffff',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: Platform.OS === 'ios' ? 0 : 0.3,
  },
  txtDay: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: '100%',
    width: '75%',
    alignItems: 'center',
  },
  touchableClear: {
    width: '35%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imgClear: {alignSelf: 'center', width: 16, height: 16},
  coulumn: {
    width: 1,
    height: '100%',
    backgroundColor: 'black',
  },
  touchable: {
    width: 100,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    width: 100,
    height: 1,
    backgroundColor: '#EBEBEB',
    alignSelf: 'center',
  },
});

export default HeaderCustom;
