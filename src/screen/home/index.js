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
<<<<<<< HEAD
    navigation.navigate('Thêm nhân viên');
  };

=======
    navigation.navigate('AddStaff');
  };
>>>>>>> 28c4ef8ac358f9825e0ae95e973ec0f8d894f770
  return (
    <>
      <BarStatus backgroundColor="rgb(47,172,79)" />
      <View style={styles.container}>
        <Header />
<<<<<<< HEAD
        <View style={{flex: 4}}>
          <Card style={styles.card}>
            <Admin addStaff={onAddStaff} />
          </Card>
=======
        <View style={{ flex: 4 }}>
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
>>>>>>> 28c4ef8ac358f9825e0ae95e973ec0f8d894f770
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
