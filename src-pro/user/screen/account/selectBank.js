import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  StatusBar,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  BarStatus,
  HeaderCustom,
  Input,
  KeyBoardScroll,
} from '../../../component';
import {Colors, imgs} from '../../../../utlis';
import {BANK_LIST} from '../../../../utlis/config/bank';

const SelectBank = (props) => {
  const {navigation, route} = props;
  const [search, setSearch] = useState('');
  const {bank_name, onChangeBank} = route.params;

  const goBack = () => {
    navigation.goBack();
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => onChangeBank(item.TenNH)}
        style={styles.renderItem}>
        <Text style={styles.bankName}>{item.TenNH}</Text>
        {bank_name && bank_name === item.TenNH && (
          <Image source={imgs.tick} style={styles.image} />
        )}
      </TouchableOpacity>
    );
  };

  const onSearchBank = (value) => {
    setSearch(value);
  };

  let _data = BANK_LIST.filter((i) =>
    i.TenNH.toLowerCase().includes(search.toLowerCase().trim()),
  );

  return (
    <View style={styles.container}>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 26 : StatusBar.currentHeight}
      />
      <HeaderCustom title={'Chọn ngân hàng'} goBack={goBack} />
      <Input
        button
        leftImage={imgs.search}
        containerStyle={styles.search}
        value={search}
        onChangeText={onSearchBank}
        autoCapitalize={'none'}
        placeholder={'Tìm kiếm'}
      />
      <KeyBoardScroll style={styles.content}>
        <FlatList
          data={_data}
          renderItem={renderItem}
          style={styles.list}
          keyExtractor={(item, index) => item.MaNganHang}
        />
      </KeyBoardScroll>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  content: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  renderItem: {
    marginTop: 10,
    flexDirection: 'row',
    marginHorizontal: 16,
    paddingVertical: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'space-between',
  },
  image: {
    tintColor: 'green',
    width: 16,
    height: 16,
  },
  bankName: {
    fontSize: 13,
  },
});

export default SelectBank;
