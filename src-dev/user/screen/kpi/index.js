import React, {useEffect, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Header from './component/Header';
import {Colors, imgs} from '../../../../utlis/index';
import {BarStatus} from '../../../component';
import HeaderAccount from '../account/component/HeaderAccount';

const Kpi = (props) => {
  const {token, navigation, getKPI, confirmKpi, kpi} = props;

  useEffect(() => {
    getKPI({token});
  }, []);

  const onGoBack = () => {
    navigation.goBack();
  };

  const onPressConfirm = () => {
    if (kpi.id) {
      confirmKpi({id: kpi.id, token, is_confirmed: 1});
    }
  };

  const onPressFeedback = () => {
    if (kpi.id) {
      confirmKpi({id: kpi.id, token, is_confirmed: 0});
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{flex: 1}}>
      <BarStatus backgroundColor={Colors.white} />

      <HeaderAccount
        title={'Xác nhận'}
        sub={'Kiểm tra thống kê chấm công'}
        goBack={goBack}
        shadow
      />
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.card}>
          <View style={[styles.row, {marginTop: 30}]}>
            <Image source={imgs.KPI} style={styles.img} />
            <View style={[styles.row, styles.more]}>
              <Text style={styles.text}>Xếp loại KPI</Text>
              <View style={styles.circle}>
                <Text style={[styles.text, {color: 'green'}]}>
                  {kpi.level || 'A'}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <Image source={imgs.fine} style={styles.img} />
            <View style={[styles.row, styles.more]}>
              <Text style={styles.text}>Đi muộn</Text>
              <View style={{height: 50, justifyContent: 'center'}}>
                <Text style={[styles.text, {color: 'red'}]}>
                  {`${kpi.fined || 0} ngày`}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <Image source={imgs.lateIcon} style={styles.img} />
            <View style={[styles.row, styles.more]}>
              <Text style={styles.text}>Số ngày nghỉ</Text>
              <View style={styles.circle}>
                <Text style={[styles.text, {color: 'blue'}]}>
                  {kpi.day_off || 0}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <Image source={imgs.buttoncheckin} style={styles.img} />
            <View style={[styles.row, styles.more]}>
              <Text style={styles.text}>Công thực tế</Text>
              <View style={styles.circle}>
                <Text style={[styles.text, {color: 'darkblue'}]}>
                  {kpi.workdays || 24}
                </Text>
              </View>
            </View>
          </View>
          {/* <View style={styles.row}>
            <Image source={imgs.stampCheck} style={styles.img} />
            <View style={[styles.row, styles.more]}>
              <Text style={styles.text}>Công tính lương</Text>
              <View style={styles.circle}>
                <Text style={[styles.text, {color: 'black'}]}>
                  {kpi.workdays_total || 24}
                </Text>
              </View>
            </View>
          </View> */}

          <View
            style={[
              styles.row,
              {justifyContent: 'space-around', marginTop: 50},
            ]}>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: 'black'}]}
              onPress={onPressConfirm}>
              <Text style={styles.textButton}>Kiến nghị</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: 'green'}]}
              onPress={onPressFeedback}>
              <Text style={styles.textButton}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    borderRadius: 32,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  textPass: {
    fontSize: 16,
    height: 20,
    marginTop: 8,
    marginLeft: 32,
  },
  content: {
    paddingHorizontal: 16,
    marginVertical: 10,
    flex: 1,
  },
  card: {
    borderRadius: 16,
    backgroundColor: Colors.white,
    overflow: 'hidden',
    paddingHorizontal: 26,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  headerCard: {
    paddingVertical: 50,
    paddingHorizontal: 16,
  },
  txtTitleCard: {
    fontSize: 24,
    color: '#0db14b',
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    tintColor: 'black',
    marginRight: 12,
    width: 24,
    height: 24,
  },
  more: {
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
  circle: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.4,
    // shadowRadius: 2,
    // elevation: 2,
  },
  textButton: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});
export default Kpi;
