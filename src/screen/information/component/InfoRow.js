import React from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../../../utlis';
import langs from '../../../../common/language';

export default function InfoRow(props?: Props) {
  const { leftImage, name, dob, team, role, work, kpi, kpi_6m } = props;

  return (
    <View style={styles.container}>
      <Image source={leftImage} style={styles.image} resizeMode="contain" />
      <View style={styles.detail}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.dob}>
          {langs.dob} {dob}
        </Text>
        <Text style={styles.team}>
          {langs.team} {team} -{' '}
          <Text
            style={[styles.role, { color: role === 'Leader' ? 'red' : 'black' }]}>
            {role}
          </Text>
        </Text>
      </View>
      {/* <View style={styles.work}>
        <View style={styles.flex}>
          <Text style={styles.txtWork}>{langs.workMonth}</Text>
        </View>
        <View style={styles.flex}>
          <Text style={styles.numb}> {work}</Text>
        </View>
      </View>
      <View style={styles.work}>
        <View style={styles.flex}>
          <Text style={styles.txtWork}>{langs.kpiMonth}</Text>
        </View>
        <View style={styles.flex}>
          <Text style={styles.numb}> {kpi}</Text>
        </View>
      </View>
      <View style={styles.work}>
        <View style={styles.flex}>
          <Text style={styles.txtWork}>{langs.kpi_6Month}</Text>
        </View>
        <View style={styles.flex}>
          <Text style={styles.numb}> {kpi_6m}</Text>
        </View>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'rgb(241,251,245)',
    width: wp(95),
    paddingVertical: 8,
    borderRadius: 8,
    marginVertical: 6,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 32,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '300',
    color: Colors.background,
  },
  detail: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginHorizontal: 12,
  },
  name: {
    fontWeight: '500',
    marginVertical: 4,
  },
  dob: {
    fontWeight: '300',
    marginVertical: 4,
  },
  team: {
    fontWeight: '300',
    marginVertical: 4,
  },
  role: {
    fontWeight: '600',
  },
  work: {
    flex: 1,
    flexDirection: 'column',
  },
  txtWork: {
    fontWeight: '300',
    alignSelf: 'center',
    textAlign: 'center',
  },
  numb: {
    fontWeight: '600',
    alignSelf: 'center',
    textAlign: 'center',
  },
  flex: {
    flex: 1,
  },
});
