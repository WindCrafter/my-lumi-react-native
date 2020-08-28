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
} from 'react-native';
import Header from './component/header';
import { Card } from 'native-base';
import DeadLine from './component/deadLine';
import User from './component_user/user';
import Event from './component_user/event';
import InfoWeek from './component_user/infoWeek';
import { BarStatus } from '../../../component';
import { Colors } from '../../../../utlis';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function Home(props) {
  const { navigation, nameUser } = props;
  const onGoInformation = () => {
    navigation.navigate('Information');
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
  return (
    <>
      <BarStatus backgroundColor={Colors.background} />
      <View style={styles.container}>
        <Header
          pressNotify={onPressNotify}
          onPress={onCheckin}
          name={nameUser}
        />
        <View style={{ flex: 4 }}>
          <ScrollView>
            <Card style={styles.card}>
              <User
                applyBreak={onApplyBreak}
                applyLate={onApplyLate}
                applyOT={onApplyOT}
                generalInfo={onGoInformation}
              />
            </Card>
            <Card style={styles.card}>
              <InfoWeek />
            </Card>
            <Card style={styles.card}>
              <DeadLine />
            </Card>
            <Card style={styles.card}>
              <Event />
            </Card>
          </ScrollView>
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
    paddingVertical: 28,
  },
});
