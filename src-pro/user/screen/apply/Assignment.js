import React, { useState, useEffect } from 'react';
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
import Icon from 'react-native-vector-icons/Feather';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { Card } from 'native-base';
import { BarStatus, HeaderCustom } from '../../../component';
import { Colors, imgs } from '../../../../utlis';

const Assignment = (props) => {
  const {
    navigation,
    addAssign,
    assign,
    listAssign,
    getListAssign,
    token,
  } = props;
  // const newData = listAssign.filter((e) =>
  //   assign.find((i) => i.userId === e.userId),
  // );
  const [userPicked, setUserPicked] = useState(assign);
  const goBack = () => {
    navigation.goBack({ userPicked });
  };

  useEffect(() => {
    getListAssign(token);
  }, []);

  // const pickedItem = (val) => {
  //   setUserPicked([...userPicked, val]);
  //   console.log([...userPicked, val]);
  // };

  // const removeItem = (val) => {
  //   const newList = userPicked.filter((e) => !(e.userId === val.userId));
  //   setUserPicked(newList);
  // };

  const onDone = () => {
    addAssign(userPicked);
    navigation.goBack();
  };

  const renderItem = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity
          style={styles.btUser}
          onPress={() => setUserPicked(item)}
        >
          <View style={styles.rowUser}>
            <View style={styles.viewImage}>
              <Image
                source={imgs.defaultAvatar}
                style={styles.avatar}
                resizeMode="cover"
              />
            </View>
            <View style={styles.column}>
              <Text style={styles.textUser}>{item.name}</Text>
              <Text style={styles.textPos}>{item.pos}</Text>
            </View>
          </View>
          {userPicked && userPicked.userId === item.userId ? (
            <Icon
              name="check"
              style={styles.icon}
              size={36}
              color={Colors.background}
            />
          ) : null}
        </TouchableOpacity>
        {index === listAssign.length - 1 ? null : (
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
        title="Chọn người phê duyệt"
        goBack={goBack}
        rightButton
        textPress
        onRight={onDone}
      />
      {listAssign ? (
        <Card style={styles.card}>
          <FlatList
            data={listAssign}
            keyExtractor={(item) => item.userId}
            renderItem={renderItem}
          />
        </Card>
      ) : (
        <Text style={styles.textUser}>Bạn chưa thuộc team nào!!</Text>
      )}
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
    fontWeight: '500',
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
    width: widthPercentageToDP(80),
  },
  card: {
    width: widthPercentageToDP(90),
    borderRadius: 16,
    alignItems: 'center',
    alignSelf: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  textPos: {
    marginLeft: 24,
    fontSize: 12,
  },
});
