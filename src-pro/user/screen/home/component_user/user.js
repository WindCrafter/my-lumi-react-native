import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { Card } from 'native-base';

const CardUser = props => {
  const {
    backgroundColor,
    source,
    tintColor,
    number,
    detail,
    numberColor,
    imgBackground,
  } = props;
  return (
    <Card style={[styles.container, { backgroundColor }]}>
      <View style={styles.flex}>
        <View style={[styles.viewImg, { backgroundColor: imgBackground }]}>
          <Image source={source} style={[styles.imgs, { tintColor }]} />
        </View>
      </View>
      <View style={styles.viewDetail}>
        <Text style={[styles.txtNumber, { color: numberColor }]}>{number}</Text>
        <Text style={styles.txtDetail}>{detail}</Text>
      </View>
    </Card>
  );
};

export default CardUser;

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: widthPercentageToDP(50) - 24,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
  imgs: {
    width: 24,
    height: 24,
  },
  viewImg: {
    width: 40,
    height: 40,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginLeft: 16,
  },
  viewDetail: {
    flexDirection: 'column',
    flex: 1.5,
  },
  txtDetail: {
    fontSize: 10,
    width: '100%',
  },
  txtNumber: {
    fontSize: 19,
  },
});
