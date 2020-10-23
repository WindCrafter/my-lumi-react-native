import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBare,
  StatusBar,
} from 'react-native';
import flatListData from './data';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import HeaderNotify from './component/HeaderNotify';
import { BarStatus } from '../../../component';
import { Card } from 'native-base';

const Notify = () => {
  const renderItem = ({ item, index }) => {
    return (
      <Card style={styles.card}>
        <Image style={styles.img} source={item.image} resizeMode="cover" />
        <View style={styles.viewText}>
          <Text numberOfLines={3}>{item.detail}</Text>
          <Text style={styles.time}>
            {item.time} - {item.date}
          </Text>
        </View>
      </Card>
    );
  };
  return (
    <View>
      <BarStatus />
      <HeaderNotify />
      <FlatList
        style={styles.Container8}
        horizontal={false}
        data={flatListData}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

export default Notify;

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginTop: 16,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    shadowColor: 'black',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
  },
  img: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  viewText: {
    flex: 4,
    paddingLeft: 8,
    justifyContent: 'center',
  },
  time: {
    fontSize: 10,
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'left',
    color: 'rgba(4, 4, 15, 0.45)',
  },
});
