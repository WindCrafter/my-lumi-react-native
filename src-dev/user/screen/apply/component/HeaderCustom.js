import React, { useState } from 'react';
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
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { imgs, Colors } from '../../../../../utlis';
import PickerCustom from './PickerCustom';
import { Input, Dropdown } from '../../../../component';
// import {FlatList} from 'react-native-gesture-handler';

const HeaderCustom = (props?: Props) => {
  const { width } = props || wp(100);
  const { height } = props || 60;
  const { fontSize } = props || 20;
  const { rightImage } = props || imgs.add;
  const { backgroundColor } = props || Colors.white;
  const { textPress } = props || false;
  const deviceWidth = Dimensions.get('window').width;

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
    header,
    onRightButton,
    flatStatus,
    dateN,
    ...otherProps
  } = props;
  const [isVisible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(dateN);

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
    } else if (event.type === 'set') {
      setShow(false);
      setDate(selectedDay);
      setDateChange(selectedDay);
      onChangeDate(selectedDay);
    } else {
      setShow(false);
    }
  };

  const renderDropdown = (hideOverlay) => {
    return (
      <FlatList
        style={{ backgroundColor: 'white', borderRadius: 8 }}
        data={flatStatus || status}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item, index }) => renderItem(item, hideOverlay)}
      />
    );
  };

  const onPressItem = (item) => {
    onChangeStatus(item.value);
  };

  const renderItem = (item) => {
    return (
      <View>
        {item.value === '0' ? null : <View style={styles.line} />}
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => onPressItem(item)}
        >
          <Text
            style={[
              styles.text,
              { color: type === item.label ? Colors.background : 'black' },
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const onPressConfirmIOS = () => {
    setDate(_date || new Date());
    onChangeDate(_date || new Date());
    setShow(false);
  };

  const status = [
    { label: 'Tất cả', value: '0' },
    { label: 'Đang chờ', value: '1' },
    { label: 'Đã duyệt', value: '2' },
    { label: 'Bị từ chối', value: '3' },
    { label: 'Auto Cancel', value: '4' },
  ];
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container]}>
      {header && (
        <View
          style={[
            styles.row,
            {
              width,
              height,
              backgroundColor,
              justifyContent: 'center',
              marginTop: insets.top + 8,
            },
            containerStyle,
          ]}
        >
          <TouchableOpacity
            onPress={goBack}
            style={[styles.button, { top: deviceWidth > 374 ? 4 : 0 }]}
          >
            <Icon name="chevron-back-outline" size={32} color={Colors.black} />
          </TouchableOpacity>
          <Text
            style={[styles.title, { fontSize: wp(100) < 400 ? 18 : 24 }]}
            {...otherProps}
          >
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
      )}
      {search && (
        <Input
          rightIcon
          button
          leftImage={imgs.search}
          containerStyle={styles.search}
          onPress={onSearch}
          value={txtSearch}
          onChangeText={onChangeName}
          autoCapitalize="none"
          placeholder="Bạn muốn tìm lumier nào?"
        />
      )}
      <View
        style={[
          styles.rowBot,
          { marginBottom: 16, justifyContent: 'space-around' },
        ]}
      >
        <Dropdown
          position="auto"
          options={(flatStatus || status).map((i) => ({
            titleStyle: {
              textAlign: 'center',
              color: i.label === type ? Colors.background : 'black',
            },
            title: i.label,
            onPress: () => onPressItem(i),
          }))}
        >
          <View
            style={[
              styles.filterStatus,
              {
                backgroundColor:
                  type !== 'Tất cả' ? 'white' : 'rgba(1,18,34,0.05)',
                borderWidth: type !== 'Tất cả' ? 1 : 0,
                borderColor: type !== 'Tất cả' ? Colors.background : 'white',
              },
            ]}
          >
            <Text>{type}</Text>
            <Icon
              size={18}
              name="caret-down-outline"
              style={{ color: Colors.black, top: 2 }}
            />
          </View>
        </Dropdown>
        <View
          style={[
            styles.filterDate,
            {
              justifyContent: 'center',
              backgroundColor: date ? 'white' : 'rgba(1,18,34,0.05)',
              borderWidth: date ? 1 : 0,
              borderColor: date ? Colors.background : 'white',
            },
          ]}
        >
          <TouchableOpacity style={styles.txtDay} onPress={onShow}>
            <Text
              style={[
                styles.txtRole,
                { color: date ? Colors.background : Colors.ink500 },
              ]}
            >
              {date ? moment(new Date(date)).format('DD/MM/YYYY') : 'Chọn ngày'}
            </Text>

            {date ? null : (
              <Icon
                size={18}
                name={!show ? 'caret-down-outline' : 'caret-up-outline'}
                style={{ color: Colors.black, top: 2 }}
              />
            )}
          </TouchableOpacity>
          {date ? (
            <TouchableOpacity onPress={onClear} style={styles.touchableClear}>
              <View style={styles.viewClear}>
                <Image source={imgs.cancel} style={styles.imgClear} />
              </View>
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
      <LinearGradient
        style={[styles.gradient]}
        colors={['#D5D5D5', '#F2F2F2']}
      />
    </View>
  );
};

HeaderCustom.defaultProps = {
  header: true,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  row: {
    paddingTop: 5,
    flexDirection: 'row',
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  rowBot: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    marginTop: 8,
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
    alignSelf: 'flex-end',
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
    borderRadius: 8,
    height: 42,
    width: Dimensions.get('window').width - 32,
    marginVertical: 8,
    backgroundColor: Colors.ink100,
    // shadowColor: 'black',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: 'grey'
  },
  txtDay: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: '100%',
    width: '75%',
    alignItems: 'center',
    marginRight: 0,
  },
  touchableClear: {
    overflow: 'hidden',
    width: 18,
    height: 32,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 4,
  },
  viewClear: {
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: Colors.ink300,
    borderRadius: 16,
    width: 18,
    height: 18,
  },
  imgClear: { alignSelf: 'center', width: 8, height: 8, tintColor: 'white' },
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
  column: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: Colors.gray,
    height: 39,
  },
  gradient: {
    width: wp(100),
    height: 4,
  },
});

export default HeaderCustom;
