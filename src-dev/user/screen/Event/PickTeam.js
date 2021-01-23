import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
  Keyboard,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import langs from '../../../../common/language';
import {Colors, imgs} from '../../../../utlis';
import {BarStatus, HeaderCustom, Input} from '../../../component';
import Icon from 'react-native-vector-icons/Feather';
import {URL_STAGING} from '../../../../utlis/connection/url';
import {_GET} from '../../../../utlis/connection/api';

const widthTeam = Dimensions.get('window').width / 2 - 16;

// const DataTeam = [
//   {team_name: 'Team App', team_id: '1'},
//   {team_name: 'Team System', team_id: '2'},
//   {team_name: 'Team Back-End', team_id: '3'},
//   {team_name: 'Team OS', team_id: '4'},
//   {team_name: 'Team Test', team_id: '5'},
// ];

// const DataUser = [
//   {member_name: 'Phong', member_id: '1'},
//   {member_name: 'Duc', member_id: '2'},
//   {member_name: 'Nghi', member_id: '3'},
//   {member_name: 'Vinh', member_id: '4'},
//   {member_name: 'Duong', member_id: '5'},
//   {member_name: 'Dai', member_id: '6'},
// ];

const PickTeam = (props) => {
  const {navigation, addMember, memberPicked, clearMember, token} = props;
  const [dataUser, setDataUser] = useState([]);
  const [dataTeam, setDataTeam] = useState([]);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [userPicked, setUserPicked] = useState(memberPicked);
  const [teamPicked, setTeamPicked] = useState([]);

  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [onScroll, setScroll] = useState(false);

  useEffect(() => {
    getData(1, teamPicked, name, []);
  }, []);

  const onGoBack = () => {
    navigation.goBack();
  };

  // const onChangeSearch = (txt) => {
  //   const newData = DataUser.filter((item) => {
  //     const itemData = getText(item.name);
  //     const textData = getText(txt);
  //     return itemData.indexOf(textData) > -1;
  //   });
  //   setListUser(newData);
  //   LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  //   setSearch(txt);
  // };

  const getData = async (pageNumber, teamN, nameN, dataN) => {
    const _team = teamN.length > 0 ? teamN.toString() : '';
    const _name = nameN || '';
    const _data = dataN || [];

    const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.MEETING_MEMBERS}?page=${pageNumber}&page_size=20&team_id_list=${_team}&member_name=${_name}`;
    const response = await _GET(apiURL, token, false);
    setRefresh(false);
    setLoading(false);
    setScroll(false);
    console.log('_GET_DATA ===========>', response);
    if (response.success && response.statusCode === 200) {
      if (response.data.teams && response.data.teams.length > 0) {
        setDataTeam(response.data.teams);
      }
      if (response.data.members && response.data.members.length > 0) {
        setDataUser(_data.concat(response.data.members));
        setPage(pageNumber);
      }
    }
  };

  const onRefresh = () => {
    setRefresh(true);
    setScroll(false);
    getData(1, teamPicked, name, []);
  };

  const handleLoadMore = () => {
    getData(page + 1, teamPicked, name, dataUser);
    setScroll(false);
    setLoading(true);
  };

  const renderFooterComponent = () => {
    return loading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.gray} />
      </View>
    ) : null;
  };

  const onSelectTeam = (team_id) => {
    if (teamPicked.includes(team_id)) {
      const _newTeam = teamPicked.filter((i) => i !== team_id);
      setTeamPicked(_newTeam);
      setDataUser([]);
      setPage(1);
      getData(1, _newTeam, name, []);
    } else {
      setTeamPicked([...teamPicked, team_id]);
      setDataUser([]);
      setPage(1);
      getData(1, [...teamPicked, team_id], name, []);
    }
  };

  const checkSelectedTeam = (id) => {
    return teamPicked.includes(id);
  };

  const onSearch = () => {
    Keyboard.dismiss();
    if (name && name.trim()) {
      setName(name.trim());
      setPage(1);
      setDataUser([]);
      getData(1, teamPicked, name.trim(), []);
    }
  };

  const checkSelectedUser = (user) => {
    if (!userPicked.find((i) => i.member_id === user.member_id)) {
      return false;
    }
    return true;
  };

  const onSelectUser = (user) => {
    if (checkSelectedUser(user)) {
      const _newUser = userPicked.filter((i) => i.member_id !== user.member_id);
      setUserPicked(_newUser);
    } else {
      setUserPicked([...userPicked, user]);
    }
  };

  const onPickAll = () => {
    setUserPicked(dataUser);
  };

  const onRemoveAll = () => {
    setUserPicked([]);
  };

  // const removeTag = (val) => {
  //   let newTag = tag.filter((e) => !(e === val));
  //   const newData = DataUser.filter((e) => {
  //     return !newTag.find((t) => !e.tag.find((ta) => ta === t));
  //   });
  //   setTag(newTag);
  //   setListUser(newData);
  //   setUserPicked([]);
  // };

  const onPickTeam = () => {
    addMember(userPicked);
    navigation.goBack();
  };

  // const onPickAll = () => {
  //   userPicked.length < listUser.length
  //     ? setUserPicked(listUser)
  //     : setUserPicked([]);
  //   setAll(!all);
  // };

  // const onClearAll = () => {
  //   clearMember();
  //   setListUser(DataUser);
  //   setUserPicked([]);
  // };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.btn}>
        <TouchableOpacity
          style={
            !checkSelectedTeam(item.team_id) ? styles.button : styles.btnPicked
          }
          onPress={() => onSelectTeam(item.team_id)}>
          <View style={styles.viewImage}>
            <Image source={imgs.meeting} style={styles.image} />
          </View>
          <Text
            style={[
              styles.txtTeam,
              {
                color: checkSelectedTeam(item.team_id)
                  ? Colors.white
                  : Colors.black,
              },
            ]}>
            {item.team_name}
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
          onPress={() => onSelectUser(item)}>
          <View style={styles.rowUser}>
            <View style={styles.viewImage}>
              <Image
                source={require('../../../../naruto.jpeg')}
                style={styles.avatar}
                resizeMode={'cover'}
              />
            </View>
            <Text style={styles.textUser}>{item.member_name}</Text>
          </View>
          {checkSelectedUser(item) ? (
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

  return (
    <View style={styles.container}>
    
      <HeaderCustom
        backgroundColor={'rgba(0,0,0,0)'}
        title={langs.pickTeam}
        goBack={onGoBack}
        rightButton
        textPress
        onRight={onPickTeam}
        shadow
      />
      <Input
        button
        leftImage={imgs.search}
        containerStyle={styles.search}
        onPress={onSearch}
        value={name}
        onChangeText={(value) => setName(value)}
        autoCapitalize={'none'}
        placeholder={'Tìm kiếm ...'}
      />
      <View style={styles.viewSuggest}>
        <Text style={styles.txtSuggest}>Gợi ý:</Text>
        <View style={styles.viewTeam}>
          <FlatList
            data={dataTeam}
            numColumns={2}
            keyExtractor={(item) => item.team_id}
            renderItem={renderItem}
            scrollEnabled={false}
          />
        </View>
        <View style={styles.line} />
        {dataUser.length > 0 && (
          <View style={styles.row}>
            {userPicked.length === dataUser.length ? (
              <TouchableOpacity
                onPress={onRemoveAll}
                style={[styles.resetBtn, {backgroundColor: Colors.danger}]}>
                <Image
                  source={imgs.cancel}
                  style={styles.imageIcon}
                  resizeMode="cover"
                />
                <Text style={styles.txtBtn}>Xoá tất cả</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={onPickAll}
                style={[styles.resetBtn, {backgroundColor: Colors.background}]}>
                <Image
                  source={imgs.add}
                  style={styles.imageIcon}
                  resizeMode="cover"
                />
                <Text style={styles.txtBtn}>Chọn tất cả</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <View style={styles.viewUser}>
          <FlatList
            data={dataUser}
            keyExtractor={(item) => item.member_id}
            onMomentumScrollBegin={() => setScroll(true)}
            onEndReached={!loading && onScroll ? handleLoadMore : null}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooterComponent}
            renderItem={renderUser}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
            }
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
    marginVertical: 8,
    width: widthPercentageToDP(100) - 32,
  },
  viewSuggest: {
    paddingHorizontal: 16,
    flex: 1,
  },
  txtSuggest: {
    fontSize: 16,
    marginBottom: 8,
  },
  btn: {
    // flex: 1,
    width: widthTeam - 10,
    marginHorizontal: 5,
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
    marginLeft: 5,
    fontSize: 13,
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
    // flex: 1,
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
    alignItems: 'center',
    textAlign: 'center',
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
