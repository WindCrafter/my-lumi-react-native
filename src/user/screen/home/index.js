import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Platform,
  UIManager,
  LayoutAnimation,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from './component/header';
import {Card} from 'native-base';
import ActionButton from 'react-native-action-button';
import {BarStatus} from '../../../component';
import {Colors, imgs} from '../../../../utlis';
import RowCheck from './component/RowCheck';
import Event from './component/event';
import HistoryWeek from './component/Calendar';
import FloatButton from './component/ActionButton';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function Home(props) {
  const {navigation, nameUser, timeIn, timeOut, switchTo} = props;

  const onPressNotify = () => {
    navigation.navigate('TestNotify');
  };

  const onPressLate = () => {
    navigation.navigate('ApplyLate');
  };

  const onPressBreak = () => {
    navigation.navigate('ApplyBreak');
  };

  const onPressOT = () => {
    navigation.navigate('ApplyOT');
  };

  useEffect(() => {
    switchTo ? navigation.navigate('CheckIn') : null,
      console.log('------,check', switchTo);
  });
  return (
    <>
      <BarStatus backgroundColor={Colors.background} />
      <View style={styles.container}>
        <Header pressNotify={onPressNotify} name={nameUser} />
        <View style={{flex: 5}}>
          <ScrollView>
            <Card style={styles.card}>
              <Event />
            </Card>
            <Card style={styles.card}>
              <HistoryWeek
                navigation={navigation}
                timeIn={timeIn}
                timeOut={timeOut}
              />
            </Card>
          </ScrollView>
          <FloatButton
            onPressLate={onPressLate}
            onPressBreak={onPressBreak}
            onPressOT={onPressOT}
          />
        </View>
      </View>
    </>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
});
