import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  FlatList,
  LayoutAnimation,
  UIManager,
  Linking,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Clipboard from '@react-native-community/clipboard';
import LinearGradient from 'react-native-linear-gradient';
import ContactRow from '../../../component/Input/InputContact';
import {
  BarStatus,
  HeaderCustom,
  Input,
  HeaderAccount,
} from '../../../component';
import { Colors, imgs } from '../../../../utlis';

import { _global } from '../../../../utlis/global/global';
import ModalInforBank from './component/ModalInforBank';
import langs from '../../../../common/language';
import { getText } from '../../../../utlis/config/utlis';
import { URL_STAGING } from '../../../../utlis/connection/url';
import { _GET } from '../../../../utlis/connection/api';

if (
  Platform.OS === 'android'
  && UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function Contact(props) {
  const { navigation, token, currentUser } = props;
  const [search, setSearch] = useState('');
  const [BankAccount, setBankAccount] = useState('');
  const [bankName, setBankName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [listData, setListData] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({});
  useEffect(() => {
    getData(1, [], '');
  }, []);
  const hideModal = () => {
    setShowModal(false);
  };
  const getData = async (pageNumber, dataN, nameN) => {
    const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.LIST_USERS}?page=${pageNumber}&page_size=20`;
    const response = await _GET(apiURL, token, false);
    const _data = dataN || [];

    console.log('_GET_LIST_USER ===========>', response);
    setRefresh(false);
    if (
      response.success
      && response.statusCode === 200
      && response.data
      && response.data.length > 0
    ) {
      setData(_data.concat(response.data));
      setPage(pageNumber);
      setLoading(false);
      _global.Loading.hide();
    } else {
      setLoading(false);
      _global.Loading.hide();
    }
  };
  const renderFooterComponent = () => {
    return loading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#ABB0BB" />
      </View>
    ) : null;
  };
  const handleLoadMore = () => {
    setLoading(true);
    getData(page + 1, data, filter.name);
  };
  const renderItem = (key) => {
    Platform.OS === 'ios'
      ? LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
      : null;
    const onGetContact = () => {
      let phone;
      const phoneNumber = key.item.phone_number;
      if (Platform.OS !== 'android') {
        phone = `telprompt:${phoneNumber}`;
      } else {
        phone = `tel:${phoneNumber}`;
      }
      if (phoneNumber === '') {
        _global.Alert.alert({
          title: langs.alert.notify,
          message: langs.alert.dontImportPhone,
          leftButton: { text: langs.alert.ok },
        });
      } else {
        Linking.openURL(phone);
      }
    };

    const copyToClipboard = () => {
      if (key.item.bank_account === null) {
        _global.Alert.alert({
          title: langs.alert.notify,
          message: langs.alert.dontImportUser,
          leftButton: { text: langs.alert.ok },
        });
      } else {
        setBankAccount(key.item.bank_account);
        setBankName(key.item.bank_name);
        Clipboard.setString(`${key.item.bank_account}`);
        setShowModal(true);
      }
    };
    return (
      <ContactRow
        name={key.item.fullname}
        // leftImage={require('../../../../naruto.jpeg')}
        team={key.item.team}
        // dob={key.item.birthday}
        role={key.item.role}
        work={key.item.work}
        // kpi={key.item.kpi}
        // kpi_6m={key.item.kpi_6m}
        onCall={onGetContact}
        onCopyBankAccount={copyToClipboard}
      />
    );
  };

  const onSearch = () => {};
  const onRefresh = () => {
    setRefresh(true);
    getData(1, [], filter.name);
  };
  const onChangeSearch = (txt) => {
    const newData = listData.filter((item) => {
      // console.log('----->>>>.',item.fullname)
      const itemData = getText(item.fullname);

      const textData = getText(txt);

      return itemData.indexOf(textData) > -1;
    });
    setListData(newData);
    setSearch(txt);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  };

  const onGoBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 36 : StatusBar.currentHeight}
      />
      <HeaderAccount
        goBack={onGoBack}
        title={langs.lumier}
        sub={langs.comunicate}
      />
      <View style={{ backgroundColor: 'white' }}>
        <Input
          button
          leftImage={imgs.search}
          containerStyle={styles.search}
          onPress={onSearch}
          value={search}
          // onChangeText={onChangeSearch}
          autoCapitalize="none"
          placeholder="Tìm kiếm ..."
        />
      </View>
      <LinearGradient
        style={[styles.gradient]}
        colors={['#D5D5D5', '#F2F2F2']}
      />
      <FlatList
        style={{ paddingTop: 16 }}
        onEndReached={!loading ? handleLoadMore : null}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooterComponent}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      />
      <ModalInforBank
        bankName={bankName}
        BankAccount={BankAccount}
        hideModal={hideModal}
        showModal={showModal}
      />
    </>
  );
}

export default Contact;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 15,
    marginRight: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: '80%',
    borderRadius: 16,
  },
  backRightBtnLeft: {
    backgroundColor: 'rgb(125, 22, 204)',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  search: {
    alignSelf: 'center',
    borderRadius: 12,
    height: 50,
    width: widthPercentageToDP(90),
    marginVertical: 8,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: Platform.OS === 'ios' ? 0 : 0.3,
  },
  gradient: {
    width: widthPercentageToDP(100),
    height: 4,
  },
});
