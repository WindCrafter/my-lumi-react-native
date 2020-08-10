import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import Header from './component/header';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { BarStatus } from '../../component';
import { Card } from 'native-base';
import Admin from './component/admin';
import InfoDays from './component/infoDays';
import DeadLine from './component/deadLine';
import Schedule from './component/schedule';
import User from './component_user/user';
import Event from './component_user/event';

function Home(props) {
  const [admin, setAdmin] = useState(true);
  const { navigation } = props;
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
    setAdmin(!admin);
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

  return (
    <>
      <BarStatus backgroundColor="rgb(47,172,79)" />
      <View style={styles.container}>
        <Header onPress={onCheckin} />
        <View style={{ flex: 4 }}>
          <ScrollView>
            <Card style={styles.card}>
              {admin ? (
                <Admin
                  addStaff={onAddStaff}
                  generalInfo={onGoInformation}
                  addOT={goAddOT}
                  resignStaff={onResignStaff}
                  extendContract={onContract}
                />
              ) : (
                  <User
                    applyBreak={onApplyBreak}
                    applyLate={onApplyLate}
                    applyOT={onApplyOT}
                  />
                )}
            </Card>
            <Card style={styles.card}>
              <InfoDays />
            </Card>
            <Card style={styles.card}>
              <DeadLine />
            </Card>
            <Card style={styles.card}>{admin ? <Schedule /> : <Event />}</Card>
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
