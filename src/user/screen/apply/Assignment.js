import React, {useState} from 'react';
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Colors, imgs} from '../../../../utlis';
import {BarStatus, HeaderCustom} from '../../../component';
import Icon from 'react-native-vector-icons/Feather';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Card} from 'native-base';

const listUser = [
  {name: 'Batman', pos: ['Admin'], id: '1'},
  {name: 'Joker', pos: ['Leader'], id: '2'},
  {name: 'Supa Man', pos: ['Leader'], id: '3'},
  {name: 'Flash', pos: ['Leader'], id: '4'},
  {name: 'Wonder Boy', pos: ['Leader'], id: '5'},
  {name: 'Chạn Vương', pos: ['Leader'], id: '6'},
];

const Assignment = (props) => {
  const {navigation, addAssign, assign} = props;
  const newData = listUser.filter((e) => assign.find((i) => i.id === e.id));
  const [userPicked, setUserPicked] = useState(newData);
  const goBack = () => {
    navigation.goBack({userPicked});
  };

  const pickedItem = (val) => {
    setUserPicked([...userPicked, val]);
    console.log([...userPicked, val]);
  };

  const removeItem = (val) => {
    const newList = userPicked.filter((e) => !(e.id === val.id));
    setUserPicked(newList);
  };

  const onDone = () => {
    addAssign(userPicked);
    navigation.goBack();
  };

  const renderItem = ({item, index}) => {
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
            <View style={styles.column}>
              <Text style={styles.textUser}>{item.name}</Text>
            </View>
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
        {index === listUser.length - 1 ? null : (
          <View style={styles.lineUser} />
        )}
      </>
    );
  };

  return (
    <>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 46 : StatusBar.currentHeight}
      />
      <HeaderCustom
        title={'Chọn người phê duyệt'}
        goBack={goBack}
        rightButton
        textPress={true}
        onRight={onDone}
      />
      <Card style={styles.card}>
        <FlatList
          data={listUser}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </Card>
    </>
  );
};

export default Assignment;

const styles = StyleSheet.create({
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
    width: widthPercentageToDP(75),
    alignSelf: 'center',
    backgroundColor: 'grey',
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
  card: {
    width: widthPercentageToDP(90),
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    alignSelf: 'center',
  },
  column: {
    flexDirection: 'column',
  },
});
