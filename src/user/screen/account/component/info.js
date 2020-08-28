import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Card } from 'native-base'
import { widthPercentageToDP } from 'react-native-responsive-screen';

const Info = (props) => {
  const { name, phoneNumber, identity, nativeLand } = props;
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.viewAvt}>
          <Image
            source={require('../../../../../naruto.jpeg')}
            style={styles.avt}
          />
        </View>
        <View style={styles.viewInfo}>
          <Text style={styles.txtInfo}>Họ và tên:</Text>
          <Text style={styles.txtInfo}>{name}</Text>
        </View>
        <View style={styles.viewInfo}>
          <Text style={styles.txtInfo}>Team:</Text>
          <Text style={styles.txtInfo}>Undefined</Text>
        </View>
        <View style={styles.viewInfo}>
          <Text style={styles.txtInfo}>CCCD/CMND:</Text>
          <Text style={styles.txtInfo}>{identity}</Text>
        </View>
        <View style={styles.viewInfo}>
          <Text style={styles.txtInfo}>Quê quán:</Text>
          <Text style={styles.txtInfo}>{nativeLand}</Text>
        </View>
        <View style={styles.viewInfo}>
          <Text style={styles.txtInfo}>Số điện thoại:</Text>
          <Text style={styles.txtInfo}>{phoneNumber}</Text>
        </View>
        <View style={styles.viewInfo}>
          <Text style={styles.txtInfo}>Số TKNH:</Text>
          <Text style={styles.txtInfo}>Undefined</Text>
        </View>
      </Card>
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: widthPercentageToDP(100),
    alignItems: 'center',
  },
  card: {
    flex: 1,
    width: widthPercentageToDP(90),
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  viewAvt: {
    flex: 2,
  },
  avt: {
    height: 64,
    width: 64,
    borderRadius: 32,
  },
  viewInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 16,
  },
  txtInfo: {
    fontSize: 18,
    fontWeight: '400',
  },
});
