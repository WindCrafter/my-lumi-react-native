import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  LayoutAnimation,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Colors, imgs} from '../../../../utlis';
import {Card} from 'native-base';
import ContentDay from './component/ContentDay';
import ContentWeek from './component/ContentWeek';
import ContentMonth from './component/ContentMonth';
import {BarStatus, HeaderCustom} from '../../../component';
import moment from 'moment';
const AllHistory = (props) => {
  const {navigation, getListCheck, token, history} = props;
  const [method, setMedthod] = useState('day');
  const [page, setPage] = useState(1);
  const scrollRef = useRef();
  const dataDay = history
    ? history.filter((e) => e.date === moment().format('DD/MM/yyyy'))
    : null;
  useEffect(() => {
    getListCheck({token, page});
    console.log(dataDay);
  }, [token]);

  const PageWeek = () => {
    scrollRef.current.scrollTo({x: 1 * wp(100), y: 0, animated: true});
    setMedthod('week');
  };
  const PageDay = () => {
    scrollRef.current.scrollTo({x: 0 * wp(100), y: 0, animated: true});
    setMedthod('day');
  };

  const PageMonth = () => {
    scrollRef.current.scrollTo({x: 2 * wp(100), y: 0, animated: true});
    setMedthod('month');
  };
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 46 : StatusBar.currentHeight}
      />
      <HeaderCustom
        title={'Lịch sử chấm công'}
        height={60}
        goBack={goBack}
        fontSize={24}
      />
      <View style={styles.top}>
        <TouchableOpacity
          style={[
            styles.day,
            {
              borderWidth: method === 'day' ? 2 : 0,
            },
          ]}
          onPress={PageDay}>
          <Image source={imgs.selectCalendar} style={styles.image} />
          <Text>09:09</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.day,
            {
              borderWidth: method === 'week' ? 2 : 0,
            },
          ]}
          onPress={PageWeek}>
          <Image source={imgs.calendarWeek} style={styles.image} />
          <Text>Tuần</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.day,
            {
              borderWidth: method === 'month' ? 2 : 0,
            },
          ]}
          onPress={PageMonth}>
          <Image source={imgs.startDate} style={styles.image} />
          <Text>Tháng</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        ref={scrollRef}
        horizontal={true}
        pagingEnabled={true}
        //   scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        onScrollAnimationEnd={false}
        // style={{flex:1}}
      >
        <ContentDay />
        <ContentWeek />
        <ContentMonth />
      </ScrollView>
    </View>
  );
};
export default AllHistory;
const styles = StyleSheet.create({
  container: {height: '100%', backgroundColor: 'white'},
  top: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 16,
    // backgroundColor:'white'
  },
  day: {
    width: '30%',
    borderColor: '#2fac4f',

    borderRadius: 12,

    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    elevation: 3,
  },

  week: {
    width: '30%',
  },
  month: {
    width: '30%',
  },
  image: {
    height: 24,
    width: 24,
    tintColor: '#2fac4f',
    marginRight: 8,
  },
});
