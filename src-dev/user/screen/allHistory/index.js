import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  LayoutAnimation,
  StatusBar,
  ScrollView,
  UIManager,
} from 'react-native';
import {
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import { Colors, imgs } from '../../../../utlis';
import ContentDay from './component/ContentDay';
import {
  BarStatus,
  Combine,
  HeaderCustom,
  InputSelect,
} from '../../../component';
import PickerCustom from '../apply/component/PickerCustom';

if (
  Platform.OS === 'android'
  && UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const AllHistory = (props) => {
  const { navigation, getListCheck, token, history, route } = props;
  const item = route.params;
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState(`${item.day}/${item.month}/${item.year}`);
  const [day, setDay] = useState(new Date());
  const [show, setShow] = useState(false);
  const flatRef = useRef();
  const scrollRef = useRef();
  const dataDay = history ? history.filter((e) => e.date === title) : null;

  useEffect(() => {
    getListCheck({ token, page });
  }, [getListCheck, page, token]);

  const onUnshow = () => {
    Platform.OS === 'ios'
      ? LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
      : null;
    setShow(false);
    setTitle(moment(day).format('DD/MM/YYYY'));
  };
  // const PageWeek = () => {
  //   scrollRef.current.scrollTo({x: 1 * wp(100), y: 0, animated: true});
  //   setMedthod('week');
  // };
  // const PageDay = () => {
  //   scrollRef.current.scrollTo({x: 0 * wp(100), y: 0, animated: true});
  //   setMedthod('day');
  // };

  // const PageMonth = () => {
  //   scrollRef.current.scrollTo({x: 2 * wp(100), y: 0, animated: true});
  //   setMedthod('month');
  // };
  const goBack = () => {
    navigation.goBack();
  };

  const onChangeDay = (event, selectedDay) => {
    const currentDay = selectedDay || title;
    setShow(Platform.OS === 'ios');
    setDay(currentDay);
  };

  const onShow = () => {
    Platform.OS === 'ios'
      ? LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
      : null;
    setShow(true);
  };

  return (
    <View style={styles.container}>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 46 : StatusBar.currentHeight}
      />
      <HeaderCustom
        title="Lịch sử chấm công"
        height={60}
        goBack={goBack}
        fontSize={24}
      />
      <InputSelect
        width="90%"
        leftImage={imgs.calendarWeek}
        borderRadius={32}
        height={54}
        shadowColor="white"
        title={title}
        padding={8}
        marginVertical={18}
        containerStyle={styles.viewInputSelect}
        onPressButton={onShow}
        shadowOpacity={0.1}
        marginRight={-30}
        color="rgba(4, 4, 15, 0.45)"
        detail=""
      />
      {dataDay && dataDay[0] ? (
        <Combine
          date={moment(dataDay[0].date, 'DD/MM/YYYY').format('DD/MM')}
          department={dataDay[0].department}
          status={!(dataDay[0].checkIn > '08:15')}
          shift={dataDay ? dataDay[0].shift : null}
          timeIn={moment(dataDay[0].checkIn, 'HH:mm:ss').format('HH:mm')}
          timeOut={moment(dataDay[0].checkOut, 'HH:mm:ss').format('HH:mm')}
          punish={dataDay.advance ? dataDay[0].advance.punishment : null}
        />
      ) : (
        <Text style={styles.txt}>
          Bạn chưa chấm công ngày
          {title}
        </Text>
      )}
      {/* <View style={styles.top}>
        <TouchableOpacity
          style={[
            styles.day,
            {
              borderWidth: method === 'day' ? 2 : 0,
            },
          ]}
          onPress={PageDay}>
          <Image source={imgs.selectCalendar} style={styles.image} />
          <Text>{`${item.day}/${item.month}`}</Text>
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
      </View> */}
      <View style={styles.line} />
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScrollAnimationEnd={false}
        style={{ marginTop: 4 }}
      >
        <ContentDay data={history} ref={flatRef} />
        {/* <ContentWeek />
        <ContentMonth /> */}
      </ScrollView>
      {show && (
        <PickerCustom
          value={day}
          onChange={onChangeDay}
          onPress={onUnshow}
          mode="date"
          show={show}
        />
      )}
    </View>
  );
};
export default AllHistory;
const styles = StyleSheet.create({
  container: { height: '100%', backgroundColor: 'white' },
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
  viewInputSelect: {
    backgroundColor: Colors.white,
  },
  line: {
    height: StyleSheet.hairlineWidth,
    width: widthPercentageToDP(75),
    alignSelf: 'center',
    backgroundColor: 'grey',
    marginTop: 8,
  },
  txt: {
    alignSelf: 'center',
  },
});
