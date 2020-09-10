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
const Document = () => {
  const [ssid, setSsid] = useState('');
  const [bssid, setBssid] = useState('');

  const password = 'lumivn274';

  const initWifi = async () => {
    try {
      const ssid = await (await NetInfo.fetch('wifi')).details.ssid;
      const bssid = await (await NetInfo.fetch('wifi')).details.bssid;

      setSsid(ssid);
      setBssid(bssid);

      console.log('Your current connected wifi SSID is ' + ssid);
      console.log('Your current BSSID is ' + bssid);
    } catch (error) {
      setSsid('Cannot get current SSID!' + error.message);
      setBssid('Cannot get current BSSID!' + error.message);

      console.log('Cannot get current SSID!', {error});
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
        console.log(granted);

        initWifi();
      } else {
        console.log('Yêu cầu vị trí bị từ chối');
        console.log(RESULTS.GRANTED);

      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>ssid</Text>
            <Text style={styles.sectionDescription}>{ssid}</Text>
            <Text style={styles.sectionTitle}>bssid</Text>

            <Text style={styles.sectionDescription}>{bssid}</Text>
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
