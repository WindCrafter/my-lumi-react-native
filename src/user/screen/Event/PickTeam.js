import React, {useState} from 'react';
import {
  FlatList,
  Image,
  LayoutAnimation,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import langs from '../../../../common/language';
import {Colors, imgs} from '../../../../utlis';
import {getText} from '../../../../utlis/config/utlis';
import {BarStatus, HeaderCustom, Input} from '../../../component';
import Icon from 'react-native-vector-icons/Feather';
import {_global} from '../../../../utlis/global/global';

const DataTeam = [
  {name: 'Team App', id: '1'},
  {name: 'Team System', id: '2'},
  {name: 'Team Back-End', id: '3'},
  {name: 'Team OS', id: '4'},
  {name: 'Team Test', id: '5'},
];

const DataUser = [
  {name: 'Batman', tag: ['Team App'], id: '1'},
  {name: 'Joker', tag: ['Team OS', 'Team App'], id: '2'},
  {name: 'Supa Man', tag: ['Team Test'], id: '3'},
  {name: 'Flash', tag: ['Team Back-End'], id: '4'},
  {name: 'Wonder Boy', tag: ['Team System'], id: '5'},
  {name: 'Chạn Vương', tag: ['Team System', 'Team OS'], id: '6'},
];

const PickTeam = (props) => {
  const {navigation, addMember, memberPicked, clearMember} = props;
  const newList = DataUser.filter(
    (e) => !memberPicked.find((i) => i.id === e.id),
  );
  const [search, setSearch] = useState('');
  const [listUser, setListUser] = useState(newList);
  const [tag, setTag] = useState([]);
  const [all, setAll] = useState(false);
  const [userPicked, setUserPicked] = useState([]);
  const onGoBack = () => {
    navigation.goBack();
  };

  const onSearch = () => {};

  const allUser = listUser.filter(
    (e) => !userPicked.find((i) => i.id === e.id),
  );

  const onChangeSearch = (txt) => {
    const newData = DataUser.filter((item) => {
      const itemData = getText(item.name);
      const textData = getText(txt);
      return itemData.indexOf(textData) > -1;
    });
    setListUser(newData);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setSearch(txt);
  };

  const pushTag = (val) => {
    const newTag = [...tag, val];
    const newData = DataUser.filter((e) => {
      return !newTag.find((t) => !e.tag.find((ta) => ta === t));
    });
    console.log(newData);
    setTag(newTag);
    setListUser(newData);
    setUserPicked([]);
  };

  const removeTag = (val) => {
    let newTag = tag.filter((e) => !(e === val));
    const newData = DataUser.filter((e) => {
      return !newTag.find((t) => !e.tag.find((ta) => ta === t));
    });
    setTag(newTag);
    setListUser(newData);
    setUserPicked([]);
  };

  const pickedItem = (val) => {
    setUserPicked([...userPicked, val]);
    console.log([...userPicked, val]);
  };

  const removeItem = (val) => {
    const newList = userPicked.filter((e) => !(e.id === val.id));
    setUserPicked(newList);
  };

  const onPickTeam = () => {
    addMember(userPicked);
    navigation.goBack();
  };

  const onAlertPick = () => {
    _global.Alert.alert({
      title: 'Thông báo',
      message: `Bạn muốn chọn ${userPicked.length} người dưới đây tham gia sự kiện chứ ?`,
      messageColor: Colors.black,
      leftButton: {
        text: 'OK',
        textStyle: {color: Colors.background},
        onPress: onPickTeam,
      },
      rightButton: {text: 'Cancel', textStyle: {color: Colors.danger}},
    });
  };

  const onPickAll = () => {
    userPicked.length < listUser.length
      ? setUserPicked(listUser)
      : setUserPicked([]);
    setAll(!all);
    console.log('Here', allUser);
  };

  const onClearAll = () => {
    clearMember();
    setListUser(DataUser);
    setUserPicked([]);
  };

  const renderItem = ({item, index}) => {
    const picked = tag.find((e) => e === item.name);
    return (
      <View style={styles.btn}>
        <TouchableOpacity
          style={!picked ? styles.button : styles.btnPicked}
          onPress={() => (!picked ? pushTag(item.name) : removeTag(item.name))}>
          <View style={styles.viewImage}>
            <Image source={imgs.meeting} style={styles.image} />
          </View>
          <Text
            style={[
              styles.txtTeam,
              {color: picked ? Colors.white : Colors.black},
            ]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderUser = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          style={styles.btUser}
          onPress={() =>
            userPicked.find((e) => e.id === item.id)
              ? removeItem(item)
              : pickedItem(item)
          }>
          <View style={styles.rowUser}>
            <View style={styles.viewImage}>
              <Image
                source={require('../../../../naruto.jpeg')}
                style={styles.avatar}
                resizeMode={'cover'}
              />
            </View>
            <Text style={styles.textUser}>{item.name}</Text>
          </View>
          {userPicked.find((e) => e.id === item.id) ? (
            <Icon
              name="check"
              style={styles.icon}
              size={36}
              color={Colors.background}
            />
          ) : null}
        </TouchableOpacity>
        <View style={styles.lineUser} />
      </>
    );
  };

  const txt =
    userPicked.length < listUser.length
      ? 'Chọn tất cả'
      : userPicked.length === 0
      ? 'Chọn tất cả'
      : 'Huỷ tất cả';

  return (
    <View style={styles.container}>
      <BarStatus
        height={Platform.OS === 'ios' ? 28 : StatusBar.currentHeight}
      />
      <HeaderCustom
        backgroundColor={'rgba(0,0,0,0)'}
        title={langs.pickTeam}
        goBack={onGoBack}
        rightButton
        textPress
        onRight={onAlertPick}
      />
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
      <View style={styles.viewSuggest}>
        <Text style={styles.txtSuggest}>Gợi ý:</Text>
        <View style={styles.viewTeam}>
          <FlatList
            data={DataTeam}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            // scrollEnabled={false}
          />
        </View>
        <View style={styles.line} />
        <View style={styles.row}>
          <TouchableOpacity
            onPress={onPickAll}
            style={[
              styles.resetBtn,
              {
                backgroundColor:
                  txt === 'Chọn tất cả' ? Colors.background : Colors.danger,
              },
            ]}>
            <Image
              source={txt === 'Chọn tất cả' ? imgs.add : imgs.cancel}
              style={styles.imageIcon}
              resizeMode="cover"
            />
            <Text style={styles.txtBtn}>{txt}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClearAll} style={styles.resetBtn}>
            <Image
              source={imgs.undo}
              style={styles.imageIcon}
              resizeMode="cover"
            />
            <Text style={styles.txtBtn}> Làm mới</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewUser}>
          <FlatList
            data={listUser}
            keyExtractor={(item) => item.id}
            renderItem={renderUser}
          />
        </View>
      </View>
    </View>
  );
};

export default PickTeam;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    alignSelf: 'center',
    marginVertical: 16,
    width: widthPercentageToDP(100) - 32,
  },
  viewSuggest: {
    paddingHorizontal: 32,
    flex: 1,
  },
  txtSuggest: {
    fontSize: 16,
    marginBottom: 8,
  },
  btn: {
    // flex: 1,
    width: '50%',
    paddingHorizontal: 8,
  },
  btnPicked: {
    flexDirection: 'row',
    marginVertical: 2,
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  button: {
    flexDirection: 'row',
    marginVertical: 2,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  viewImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(4,4,15,0.45)',
  },
  image: {
    width: 16,
    height: 16,
    tintColor: Colors.white,
  },
  txtTeam: {
    marginLeft: 8,
    fontSize: 14,
  },
  line: {
    height: StyleSheet.hairlineWidth,
    width: widthPercentageToDP(90),
    alignSelf: 'center',
    backgroundColor: 'gray',
    marginVertical: 8,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 32,
  },
  rowUser: {
    flexDirection: 'row',
    marginVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  textUser: {
    marginLeft: 24,
    fontSize: 16,
  },
  lineUser: {
    height: StyleSheet.hairlineWidth,
    width: widthPercentageToDP(80),
    alignSelf: 'center',
    backgroundColor: 'grey',
    marginVertical: 4,
  },
  viewTeam: {
    flex: 1,
  },
  viewUser: {
    flex: 5,
  },
  icon: {
    alignSelf: 'center',
  },
  btUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resetBtn: {
    backgroundColor: Colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
  },
  imageIcon: {
    width: 12,
    height: 12,
    tintColor: Colors.white,
    alignSelf: 'center',
  },
  txtBtn: {
    color: Colors.white,
    alignSelf: 'center',
    marginLeft: 4,
  },
});
