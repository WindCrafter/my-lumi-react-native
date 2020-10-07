import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  FlatList,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,Linking
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import ContactRow from '../../../component/Input/InputContact';
import {BarStatus, HeaderCustom, Input, Alert} from '../../../component';
import {Colors} from '../../../../utlis';
import {imgs} from '../../../../utlis';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function Contact(props) {
  // const [listData, setListData] = useState(DATA);
  const [search, setSearch] = useState('');
  const { navigation, currentUser, getListUsers, token }= props;
  useEffect(() => {
    getListUsers(token);
  }, [getListUsers, token]);
  const renderItem = (data) => {
    Platform.OS === 'ios'
      ? LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
      : null;
    const onGetContact = () => {
      let phone ;
      let phoneNumber = data.item.phoneNumber;
      if (Platform.OS !== 'android') {
        phone = `telprompt:${phoneNumber}`;
      }
      else {
        phone = `tel:${phoneNumber}`;
      }


      Linking.openURL(phone);
    };
    return (
      <ContactRow
        name={data.item.name}
        leftImage={data.item.avt}
        team={data.item.team}
        dob={data.item.dob}
        role={data.item.role}
        work={data.item.work}
        kpi={data.item.kpi}
        kpi_6m={data.item.kpi_6m}
        onCall={onGetContact}
      />
    );
  };

  const onSearch = () => {};

  const onChangeSearch = (txt) => {
    const newData = currentUser.filter((item) => {
      const itemData = `${item.name.toLowerCase()}`;

      const textData = txt.toLowerCase();

      return itemData.indexOf(textData) > -1;
    });
    // setListData(newData);
    setSearch(txt);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 46 : StatusBar.currentHeight}
      />
      <HeaderCustom title={'Thông tin liên hệ'} height={60} goBack={goBack} />
      <Input
        button
        leftImage={imgs.search}
        containerStyle={styles.search}
        onPress={onSearch}
        value={search}
        onChangeText={onChangeSearch}
        autoCapitalize={'none'}
        placeholder={'Tìm kiếm ...'}
      />

      <FlatList data={currentUser} renderItem={renderItem} />
    </View>
  );
}

export default Contact;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
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
    borderRadius: 32,
    height: 50,
    width: widthPercentageToDP(90),
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
});
