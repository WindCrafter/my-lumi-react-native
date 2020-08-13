import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import Header from './component/header';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {BarStatus} from '../../component';
import {Card} from 'native-base';
import Admin from './component/admin';
import InfoDays from './component/infoDays';
import DeadLine from './component/deadLine';
import Schedule from './component/schedule';

const Home = (props) => {
  const {navigation} = props;
  const onAddStaff = () => {
    navigation.navigate('Thêm nhân viên');
  };

  return (
    <>
      <BarStatus backgroundColor="rgb(47,172,79)" />
      <View style={styles.container}>
        <Header />
        <View style={{flex: 4}}>
          <ScrollView>
            <Card style={styles.card}>
              <Admin addStaff={onAddStaff} />
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
};

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
