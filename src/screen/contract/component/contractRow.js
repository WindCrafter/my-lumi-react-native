import React from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function ContractRow(props?: Props) {
  const { leftImage, name, dob, team, role, outDate, onPress } = props;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={leftImage} style={styles.image} resizeMode="contain" />
      <View style={styles.detail}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.dob}>DOB: {dob}</Text>
        <Text style={styles.team}>Team: {team}</Text>
      </View>
      <View style={styles.role}>
        <Text style={styles.txtRole}>{role}</Text>
      </View>
      <View style={styles.outDate}>
        <Text style={styles.txtOutDate}>Đáo hạn</Text>
        <Text style={styles.time}> {outDate}</Text>
        <View style={styles.blank} />
      </View>
    </TouchableOpacity>
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
    color: 'rgb(47,172,79)',
  },
  detail: {
    flex: 2.5,
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
    height: 16,
  },
  txtRole: {
    fontWeight: '600',
    color: 'rgb(47,172,79)',
  },
  role: {
    flex: 1.25,
  },
  outDate: {
    flex: 2,
  },
  txtOutDate: {
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 4,
  },
  time: {
    color: 'tomato',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 4,
  },
  blank: {
    height: 16,
    marginVertical: 4,
  },
});
