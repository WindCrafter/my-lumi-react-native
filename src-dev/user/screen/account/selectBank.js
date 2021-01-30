import React, { useState } from 'react';
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
import _ from 'lodash';
import {
  BarStatus,
  Input,
  KeyBoardScroll,
} from '../../../component';

import HeaderCustom from '../apply/component/HeaderCustom';
import { Colors, imgs } from '../../../../utlis';
import { BANK_LIST } from '../../../../utlis/config/bank';

const SelectBank = (props) => {
  const { navigation, route } = props;
  const [search, setSearch] = useState('');
  const { bank_name, onChangeBank } = route.params;

  const goBack = () => {
    navigation.goBack();
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => onChangeBank(item.TenNH)}
        style={styles.renderItem}
      >
        <Text style={styles.bankName}>{item.TenNH}</Text>
        {bank_name && bank_name === item.TenNH && (
          <Image source={imgs.tick} style={styles.image} />
        )}
      </TouchableOpacity>
    );
  };
  const debouceSearch = _.debounce((value) => {
    onSearchBank(value);
  }, 1000);
  const onSearchBank = (value) => {
    setSearch(value);
  };

  const _data = BANK_LIST.filter((i) => i.TenNH.toLowerCase().includes(search.toLowerCase().trim()),);

  return (
    <View style={styles.container}>
      <HeaderCustom
        title="Chọn ngân hàng"
        goBack={goBack}
        shadow
        search
        filter={false}
        onChangeName={debouceSearch}
        txtSearch={search}
        placeHolder="Tìm kiếm ngân hàng"
      />
      {/* <Input
        button
        leftImage={imgs.search}
        containerStyle={styles.search}
        value={search}
        onChangeText={onSearchBank}
        autoCapitalize="none"
        placeholder="Tìm kiếm"
      /> */}
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
    ...StyleSheet.absoluteFill,
    backgroundColor: 'white'
  },
  search: {
    alignSelf: 'center',
    borderRadius: 16,
    height: 48,
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
    backgroundColor: '#f0f0f0'
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
