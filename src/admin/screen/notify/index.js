import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import flatListData from './data';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';


class FlatlistItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={this.props.item.image} />

        <View style={styles.bot}>
          <Text style={styles.textDetail}>{this.props.item.detail}</Text>
          <View style={styles.top}>
            <Text style={styles.textTime}>{this.props.item.time}</Text>
            <Text style={styles.textTime}>{this.props.item.date}</Text>
          </View>
          <View style={styles.line} />
        </View>
      </View>
    );
  }
}
const Notify = () => {
  return (
    <View>
      <FlatList
        style={styles.Container8}
        horizontal={false}
        data={flatListData}
        renderItem={({ item, index }) => {
          return <FlatlistItem item={item} index={index} />;
        }}
      />
    </View>
  );
};

export default Notify;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    height: wp(20),
    width: wp(100),
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  bot: {
    flexDirection: 'column',
  },
  top: { flexDirection: 'row' },
  line: {
    height: 1,
    width: wp(80),
    backgroundColor: 'rgb( 0, 138, 238)',
    marginTop: 5,
  },
  textDetail: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
  },
  textTime: {
    marginLeft: 10,
    fontSize: 16,
  },
});
