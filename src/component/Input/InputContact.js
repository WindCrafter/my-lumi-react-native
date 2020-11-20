import React from 'react';
import {Text, Image, View, StyleSheet, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import langs from '../../../common/language';
import {Colors, imgs} from '../../../utlis';

export default function ContactRow(props?: Props) {
  const {
    leftImage,
    name,
    dob,
    team,
    role,
    work,
    kpi,
    kpi_6m,
    onCall,
    onCopyBankAccount,
  } = props;

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
            style={[styles.role, {color: role === 'Leader' ? 'red' : 'black'}]}>
            {role}
          </Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.work} onPress={onCall}>
        <Image source={imgs.phone} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.work} onPress={onCopyBankAccount}>
        <Image source={imgs.banking} />
      </TouchableOpacity>
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
    width: 72,
    height: 72,
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
    justifyContent: 'center',
    alignContent: 'center',
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
