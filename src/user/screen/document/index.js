import React, {useState, useEffect} from 'react';
import {PermissionsAndroid, Button} from 'react-native';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Text,
  Platform,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {PERMISSIONS, check, request, RESULTS} from 'react-native-permissions';
const Document = (props) => {
  // const {  checkInWifi, deviceId, ssid,bssid,type } = props;

  const [ssidUser, setSsidUser] = useState('');
  const [bssidUser, setBssidUser] = useState('');

  const password = 'lumivn274';
  const onCheckInWifi = () => {
    const data = {
      ssid: ssidUser,
      bssid: bssidUser,
      type: type ? 'in' : 'out',
      deviceId: deviceId,
    };
    checkInWifi(data);
    setShowCode(false);
  };
  const initWifi = async () => {
    try {
      let state = await NetInfo.fetch('wifi');

      setSsidUser(state.details.ssid);
      setBssidUser(state.details.bssid);

      console.log('Your current connected wifi ssidUser is ' + ssidUser);
      console.log('Your current BssidUser is ' + bssidUser);
    } catch (error) {
      setSsidUser('Cannot get current ssidUser!' + error.message);
      setBssidUser('Cannot get current BssidUser!' + error.message);

      console.log('Cannot get current ssidUser!', {error});
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await request(
        Platform.select({
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        }),
        {
          title: 'YÊU CẦU VỊ TRÍ',
          message: 'Yêu cầu quyền truy cập vị trí ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === RESULTS.GRANTED) {
        console.log('Thanh cong');
        initWifi();
        // onCheckInWifi
      } else {
        console.log('Yêu cầu vị trí bị từ chối');
        console.log(RESULTS.GRANTED);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>ssidUser</Text>
            <Text style={styles.sectionDescription}>{ssidUser}</Text>
            <Text style={styles.sectionTitle}>bssidUser</Text>

            <Text style={styles.sectionDescription}>{bssidUser}</Text>
          </View>
          <Button
            onPress={requestLocationPermission}
            title="Nhấn để kết nối/chấm công"
          />

          <View style={styles.body} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'green',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'white',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: 'grey',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
export default Document;
