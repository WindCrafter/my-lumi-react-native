import React, { useState } from 'react';
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
} from 'react-native';
import Header from './component/header';
import { Card } from 'native-base';
import DeadLine from './component/event';
import InfoWeek from './component/Usage';
import { BarStatus } from '../../../component';
import { Colors, imgs } from '../../../../utlis';
import RowCheck from './component/RowCheck';
import Event from './component/event';
import CheckIn from '../checkIn';
import Usage from './component/Usage';
import HistoryWeek from './component/Calendar';
import FloatButton from './component/ActionButton';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function Home(props) {
  const { navigation, nameUser } = props;
  const [show, setShow] = useState(false);
  const onGetContact = () => {
    navigation.navigate('Contact');
  };
  const onCheckin = () => {
    navigation.navigate('Chấm công');
  };

  const onApplyBreak = () => {
    navigation.navigate('ApplyBreak');
  };

  const onApplyLate = () => {
    navigation.navigate('ApplyLate');
  };

  const onApplyOT = () => {
    navigation.navigate('ApplyOT');
  };

  const onPressNotify = () => {
    navigation.navigate('Thông báo');
  };

  const onHideShow = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setShow(!show);
  };

  return (
    <>
      <BarStatus backgroundColor={Colors.background} />
      <View style={styles.container}>
        <Header
          pressNotify={onPressNotify}
          onPress={onCheckin}
          name={nameUser}
        />
        <View style={{ flex: 5 }}>
          <ScrollView>
            <Card style={styles.card}>
              <Event />
            </Card>
            <Card style={styles.card}>
              <HistoryWeek />
            </Card>
          </ScrollView>
          <FloatButton />
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
