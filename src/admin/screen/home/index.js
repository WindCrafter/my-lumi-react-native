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
import Admin from './component/admin';
import InfoDays from './component/infoDays';
import DeadLine from './component/deadLine';
import Schedule from './component/schedule';
import { BarStatus } from '../../../component';
import { Colors } from '../../../../utlis';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function Home(props) {
  const { navigation, nameUser } = props;
  const [admin, setAdmin] = useState(true);
  const onAddStaff = () => {
    navigation.navigate('Thêm nhân viên');
  };

  const onGoInformation = () => {
    navigation.navigate('Information');
  };

  const goAddOT = () => {
    navigation.navigate('OT');
  };

  const onResignStaff = () => {
    navigation.navigate('Resign');
  };

  const onContract = () => {
    navigation.navigate('Contract');
  };

  const onCheckin = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAdmin(!admin);
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
              <Admin
                addStaff={onAddStaff}
                generalInfo={onGoInformation}
                addOT={goAddOT}
                resignStaff={onResignStaff}
                extendContract={onContract}
              />
            </Card>
            <Card style={styles.card}>
              <InfoDays />
            </Card>
            <Card style={styles.card}>
              <DeadLine />
            </Card>
            <Card style={styles.card}>
              <Schedule />
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
