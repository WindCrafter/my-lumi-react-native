import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import langs from '../../../../../common/language';
import {imgs} from '../../../../../utlis';

const Event = (props) => {
  const {data} = props;
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.viewItem}>
        <View
          style={[
            styles.column,
            {
              backgroundColor: index%2===0?'rgb(252, 163, 125)':'rgb(46, 114, 249)',
            },
          ]}
        />
        <View style={styles.viewDetail}>
          <Text style={styles.txtDetail}>{item.detail}</Text>
          <Text style={styles.txtTime}>{item.time}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <View style={styles.manager}>
        <Image source={imgs.calendarWeek} style={styles.imgs}/>
        <Text style={styles.txtManager}>{langs.event}</Text>
      </View>
      <View style={styles.line} />
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          scrollEnabled
        />
    </>
  );
};

export default Event;

const styles = StyleSheet.create({
  manager: {
    flexDirection: 'row',
  },
  txtManager: {
    fontSize: 16,
    height: 30,
    paddingHorizontal: 8,
  },
  txtDetail: {
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: '500',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgb(112, 112, 112)',
  },
  column: {
    width: 3,
    height: '100%',
    marginRight: 16,
  },
  viewItem: {
    paddingVertical: 2,
    width: '100%',
    marginTop: 8,
    flexDirection: 'row',
  },
  viewDetail: {
    justifyContent: 'center',
  },
  txtTime: {
    fontSize: 12,
    fontStyle: 'italic',
    color: 'gray',
    // fontFamily: 'Quicksand-Italic',
  },
  imgs:{
    width:24,
    height:24,
}
});
