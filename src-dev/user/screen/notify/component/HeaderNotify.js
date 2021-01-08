import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {Input} from '../../../../component';
import {imgs} from '../../../../../utlis';
import PickerCustom from './PickerCustom';
import moment from 'moment';
import {Colors} from '../../../../../utlis/';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
interface Props extends HeaderNotify {
  title?: String;
  detail?: String;
}
HeaderNotify.defaultProps = {
  title: 'Thông báo',
  detail: 'Nhắc việc và bản tin',
};

export default function HeaderNotify(props?: Props) {
  const {title, detail, onSearch, onDate} = props;
  const [date, setDate] = useState('');
  const [dateChange, setDateChange] = useState(new Date());
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');

  const submitSearch = () => {
    onSearch(search);
  };

  const onChangeTextSearch = (value) => {
    setSearch(value);
  };

  const onShow = () => {
    setShow(true);
  };

  const onHideModal = () => {
    setShow(false);
  };

  const onChangeDate = (event, selected) => {
    if (Platform.OS === 'ios') {
      setDateChange(selected);
    } else {
      if (event.type === 'set') {
        setShow(false);
        setDate(selected);
        onDate(selected);
      } else {
        setShow(false);
      }
    }
  };

  const onPressConfirmIOS = () => {
    setShow(false);
    setDate(dateChange);
    onDate(dateChange);
  };

  const onClear = () => {
    setDate('');
    setDateChange(new Date());
    onDate('');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={styles.info}>
        <Text style={styles.txtTitle}>{title}</Text>
        <View style={styles.filter}>
          <Input
            button
            leftImage={imgs.search}
            containerStyle={styles.search}
            height={40}
            onPress={submitSearch}
            value={search}
            onChangeText={onChangeTextSearch}
            autoCapitalize={'none'}
            placeholder={'Tìm kiếm'}
          />
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
              <TouchableOpacity style={styles.touchableClear} onPress={onClear}>
                <View style={styles.column} />
                <Image source={imgs.cancel} style={styles.imgClear} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
      <PickerCustom
        title="Chọn ngày"
        show={show}
        value={dateChange}
        onChange={onChangeDate}
        onHideModal={onHideModal}
        onPress={onPressConfirmIOS}
        mode={'date'}
      />
      <LinearGradient
        style={[styles.gradient]}
        colors={['#D5D5D5', '#F2F2F2']}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  info: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 24,
    marginVertical: 10,
  },
  txtTitle: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Quicksand-Bold',
    color: 'black',
  },
  txtDetail: {
    fontSize: 16,
    fontWeight: '300',
    color: 'black',
    marginVertical: 4,
  },
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.gray,
  },
  bot: {
    flex: 1,
  },
  filterDate: {
    flexDirection: 'row',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.gray,
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 16,
    width: 150,
    height: 40,
  },
  txtDay: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: '100%',
    width: '75%',
    alignItems: 'center',
    marginRight: 0,
  },
  imgClear: {alignSelf: 'center', width: 12, height: 12},
  search: {
    flex: 1,
    marginRight: 20,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderColor: Colors.gray,
    borderWidth: StyleSheet.hairlineWidth,
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  touchableClear: {
    width: '35%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    borderLeftColor: Colors.gray,
    borderLeftWidth: StyleSheet.hairlineWidth,
    marginLeft: 4,
  },
  gradient: {
    width: wp(100),
    height: 4,
  },
});
