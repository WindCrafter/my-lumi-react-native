import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  FlatList,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Combine} from '../../../../component';
import moment from 'moment';
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function ContentDay(props) {
  const {data, ref} = props;
  const renderItem = ({item, index}) => {
    Platform.OS === 'ios'
      ? LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
      : null;
    return (
      <Combine
        date={moment(item.date, 'DD/MM/YYYY').format('DD/MM')}
        department={item.department}
        status={item.checkIn > '08:15' ? false : true}
        shift={item.shift}
        timeIn={moment(item.checkIn, 'HH:mm:ss').format('HH:mm')}
        timeOut={moment(item.checkOut, 'HH:mm:ss').format('HH:mm')}
        punish={item.advance.punishment}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.index}`}
      />
    </View>
  );
}

export default ContentDay;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: '100%',
    width: widthPercentageToDP(100),
  },
  txt: {
    alignSelf: 'center',
  },
});
