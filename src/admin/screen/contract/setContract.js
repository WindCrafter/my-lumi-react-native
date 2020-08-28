import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Image,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import moment from 'moment';
import { BarStatus, HeaderCustom, Button } from '../../../component';
import { imgs, Colors } from '../../../../utlis';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function SetContract(props) {
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const { navigation, route } = props;
  const { item } = route.params;

  const goBack = () => {
    navigation.goBack();
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onShow = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setShow(!show);
  };

  const onEndContract = () => {
    Alert.alert('end');
  };

  const onComplete = () => {
    Alert.alert('end');
  };

  return (
    <View style={styles.container}>
      <BarStatus
        backgroundColor="rgb(47,172,79)"
        height={Platform.OS === 'ios' ? 46 : StatusBar.currentHeight}
      />
      <HeaderCustom
        title={'Điều chỉnh hợp đồng'}
        height={60}
        goBack={goBack}
        fontSize={24}
      />
      <View style={styles.containerUser}>
        <Image source={item.avt} style={styles.image} resizeMode="contain" />
        <View style={styles.detail}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.dob}>DOB: {item.dob}</Text>
          <Text style={styles.team}>Team: {item.team}</Text>
        </View>
      </View>
      <View style={styles.line} />
      <ScrollView>
        <Text style={styles.extend}> Hợp Đồng : </Text>
        <View style={styles.detail}>
          <View style={styles.status}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.img}>
                <Image source={imgs.stampCheck} style={styles.imageStamp} />
              </View>
              <Text style={styles.txtStatus}>Trạng thái:</Text>
            </View>
            <Text style={styles.txtRole}> {item.role}</Text>
          </View>
          <View style={styles.status}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.img}>
                <Image source={imgs.checkCalendar} style={styles.imageStamp} />
              </View>
              <Text style={styles.txtStatus}>Thời hạn:</Text>
            </View>
            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={onShow}>
              <Text style={styles.txtRole}>
                {moment(date).format('DD/MM/YYYY')} {show ? '▲' : '▼'}
              </Text>
            </TouchableOpacity>
          </View>
          {show && (
            <DateTimePicker
              value={date}
              mode={'date'}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
        <View style={styles.line} />
      </ScrollView>
      <View style={styles.bottom}>
        <Button
          title={'Kết thúc hợp đồng'}
          containerStyle={styles.end}
          onPress={onEndContract}
        />
        <Button
          title={'Hoàn thành điều chỉnh'}
          containerStyle={styles.complete}
          onPress={onComplete}
        />
      </View>
    </View>
  );
}

export default SetContract;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: '100%',
  },
  containerUser: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
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
  },
  title: {
    fontSize: 20,
    fontWeight: '300',
    color: Colors.background,
  },
  detail: {
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
  line: {
    height: 1,
    width: '90%',
    backgroundColor: Colors.background,
    alignSelf: 'center',
  },
  status: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 16,
    justifyContent: 'space-between',
  },
  img: {
    padding: 8,
    borderRadius: 16,
    alignSelf: 'center',
    marginRight: 12,
  },
  imageStamp: {
    width: 24,
    height: 24,
  },
  txtStatus: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '300',
  },
  txtRole: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: Colors.background,
  },
  extend: {
    fontSize: 18,
    fontWeight: '500',
    marginHorizontal: 27,
    marginTop: 16,
    marginBottom: 4,
  },
  end: {
    backgroundColor: 'red',
  },
  complete: {
    backgroundColor: Colors.background,
  },
  bottom: {
    position: 'absolute',
    bottom: 32,
    left: wp(12.5),
  },
});
