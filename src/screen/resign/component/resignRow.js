import React from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function ResignRow(props?: Props) {
  const { leftImage, name, dob, team, role, dayout } = props;

  return (
    <>
      <View style={styles.container}>
        <Image source={leftImage} style={styles.image} resizeMode="contain" />
        <View style={styles.detail}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.dob}>DOB: {dob}</Text>
          <Text style={styles.team}>
            Team: {team} -{' '}
            <Text
              style={[styles.role, { color: role === 'Leader' ? 'red' : 'black' }]}>
              {role}
            </Text>
          </Text>
        </View>
        <View style={styles.dayout}>
          <Text style={styles.txtDayOut}>Thời điểm nghỉ việc</Text>
          <Text style={styles.time}> {dayout}</Text>
        </View>
      </View>
      <View style={styles.line} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    width: wp(95),
    paddingVertical: 8,
    borderRadius: 8,
    marginVertical: 6,
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
    color: 'rgb(47,172,79)',
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
  line: {
    width: wp(90),
    height: 1,
    backgroundColor: 'rgb(47,172,79)',
    alignSelf: 'center',
  },
  dayout: {
    flex: 3,
    justifyContent: 'center',
  },
  txtDayOut: {
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 8,
  },
  time: {
    color: 'tomato',
    fontWeight: '300',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 8,
  },
});
