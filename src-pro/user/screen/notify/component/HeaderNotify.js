import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Input from './Input';
import { imgs, Colors } from '../../../../../utlis';
import PickerCustom from './PickerCustom';

interface Props extends HeaderNotify {
  title?: String;
  detail?: String;
  header?: Boolean;
  filter?: Boolean;
  txtSearch?: String;
}
HeaderNotify.defaultProps = {
  title: 'Thông báo',
  detail: 'Nhắc việc và bản tin',
  header: true,
  filter: true,
  txtSearch: '',
};

export default function HeaderNotify(props) {
  const {
    title,
    detail,
    onSearch,
    onDate,
    goBack,
    header,
    filter,
    txtSearch,
  } = props;
  const [date, setDate] = useState('');
  const [dateChange, setDateChange] = useState(new Date());
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState(txtSearch);
  const isFocused = useIsFocused();
  useEffect(() => {
    // getData(1, '', '', []);

    if (isFocused) {
      setDate(new Date());
      setSearch('');
    }
  }, [isFocused]);
  const submitSearch = () => {
    onSearch(search);
  };

  const onChangeTextSearch = (value) => {
    onSearch(value);
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
    } else if (event.type === 'set') {
      setShow(false);
      setDate(selected);
      onDate(selected);
    } else {
      setShow(false);
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
  console.log('name', search);
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <View style={[styles.info]}>
        {header ? (
          <View style={{ flexDirection: 'row', marginTop: insets.top + 16 }}>
            {goBack ? (
              <TouchableOpacity onPress={goBack} style={styles.button}>
                {/* <Image source={leftImage} style={styles.image} resizeMode="contain" /> */}
                <Icon
                  name="chevron-back-outline"
                  size={32}
                  color={Colors.black}
                  style={{ top: 0 }}
                />
              </TouchableOpacity>
            ) : null}
            <Text style={[styles.txtTitle, { marginLeft: goBack ? 12 : 0 }]}>
              {title}
            </Text>
          </View>
        ) : null}
        {filter ? (
          <View style={styles.filter}>
            <Input
              button
              leftImage={imgs.search}
              containerStyle={styles.search}
              height={40}
              value={search}
              onChangeText={onChangeTextSearch}
              autoCapitalize="none"
              placeholder="Tìm kiếm"
              rightIcon
            />
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
                  {date
                    ? moment(new Date(date)).format('DD/MM/YYYY')
                    : 'Chọn ngày '}
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
                <TouchableOpacity
                  style={styles.touchableClear}
                  onPress={onClear}
                >
                  <View style={styles.viewClear}>
                    <Image source={imgs.cancel} style={styles.imgClear} />
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        ) : null}
      </View>
      <PickerCustom
        title="Chọn ngày"
        show={show}
        value={dateChange}
        onChange={onChangeDate}
        onHideModal={onHideModal}
        onPress={onPressConfirmIOS}
        mode="date"
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
    marginHorizontal: 16,
    marginBottom: 16,
  },
  txtTitle: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Quicksand-Bold',
    color: 'black',
  },

  filterDate: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 8,
    width: 120,
    height: 40,
  },
  txtDay: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgClear: { alignSelf: 'center', width: 8, height: 8, tintColor: 'white' },
  search: {
    flex: 1,
    marginRight: 8,
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
  gradient: {
    width: wp(100),
    height: 4,
  },
  button: {
    width: 32,
    height: 32,
  },
});
