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

const DataTeam = [
  {name: 'Team App', id: '1'},
  {name: 'Team System', id: '2'},
  {name: 'Team Back-End', id: '3'},
  {name: 'Team OS', id: '4'},
  {name: 'Team Test', id: '5'},
];

const DataUser = [
  {name: 'Batman', team: ['Team App'], id: '1'},
  {name: 'Joker', team: ['Team OS', 'Team App'], id: '2'},
  {name: 'Supa Man', team: ['Team Test'], id: '3'},
  {name: 'Flash', team: ['Team Back-End'], id: '4'},
  {name: 'Wonder Boy', team: ['Team System'], id: '5'},
  {name: 'Chạn Vương', team: ['Team System', 'Team OS'], id: '6'},
];

const PickTeam = (props) => {
  const {navigation} = props;
  const [search, setSearch] = useState('');
  const [listUser, setListUser] = useState(DataUser);
  const [tag, setTag] = useState([]);
  const onGoBack = () => {
    navigation.goBack();
  };

  const onSearch = () => {};

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
      return !newTag.find((t) => !e.team.find((ta) => ta === t));
    });
    console.log(newData);
    setTag(newTag);
    setListUser(newData);
  };

  const removeTag = (val) => {
    let newTag = tag.filter((e) => !(e === val));
    const newData = DataUser.filter((e) => {
      return !newTag.find((t) => !e.team.find((ta) => ta === t));
    });
    setTag(newTag);
    setListUser(newData);
  };

  const renderItem = ({item, index}) => {
    const picked = tag.find((e) => e === item.name);
    console.log(item.name, picked);
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
        <TouchableOpacity style={styles.rowUser}>
          <View style={styles.viewImage}>
            <Image
              source={require('../../../../naruto.jpeg')}
              style={styles.avatar}
              resizeMode={'cover'}
            />
          </View>
          <Text style={styles.textUser}>{item.name}</Text>
        </TouchableOpacity>
        <View style={styles.lineUser} />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <BarStatus
        height={Platform.OS === 'ios' ? 28 : StatusBar.currentHeight}
      />
      <HeaderCustom
        backgroundColor={'rgba(0,0,0,0)'}
        title={langs.pickTeam}
        goBack={onGoBack}
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
          />
        </View>
        <View style={styles.line} />
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
    marginVertical: 16,
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
    width: widthPercentageToDP(66),
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
});
