import React, {useState} from 'react';
import {
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import langs from '../../../../common/language';
import {imgs} from '../../../../utlis';
import {BarStatus, HeaderCustom, Input} from '../../../component';

const DataTeam = [
  {name: 'Team App', id: '1'},
  {name: 'Team System', id: '2'},
  {name: 'Team Back-End', id: '3'},
  {name: 'Team OS', id: '4'},
  {name: 'Team Test', id: '5'},
];

const PickTeam = (props) => {
  const {navigation} = props;
  const [search, setSearch] = useState('');
  const onGoBack = () => {
    navigation.goBack();
  };

  const onSearch = () => {};

  const onChangeSearch = (txt) => {
    // const newData = currentUser.filter((item) => {
    //   const itemData = `${item.name.toLowerCase()}`;
    //   const textData = txt.toLowerCase();
    //   return itemData.indexOf(textData) > -1;
    // });
    // setListData(newData);
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setSearch(txt);
  };
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.btn}>
        <TouchableOpacity>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      </View>
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
        <FlatList
          data={DataTeam}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
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
  },
  btn: {
    flex: 1,
  },
});
