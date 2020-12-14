/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  Image,
  Platform,
  SafeAreaView,
} from 'react-native';
import langs from '../../common/language';
import moment from 'moment';
import {Colors} from '../../utlis';
import {_global} from '../../utlis/global/global';
import DateTimePicker from '@react-native-community/datetimepicker';
import ModalTime from '../user/screen/account/component/ModalTime';
import {connect} from 'react-redux';
import {checkInWifi} from '../redux/actions/check';
import Svg, {Path} from 'react-native-svg';
import * as shape from 'd3-shape';
import {imgs} from '../../utlis/images/imgs';

const {width} = Dimensions.get('window');

//chieu cao tabbar
const height = width > 375 ? 80 : 60;

const tabWidth = width / 5;
const backgroundColor = 'white';

const getPath = () => {
  const left = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)([
    {x: 0, y: 0},
    {x: width / 2 - tabWidth / 2, y: 0},
  ]);
  const tab = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(shape.curveBasis)([
    {x: width / 2 - tabWidth / 2, y: 0},
    {x: width / 2 - tabWidth / 2 + 2, y: 1},
    {x: width / 2 - tabWidth / 2 + 5, y: 2},
    {x: width / 2 - tabWidth / 2 + 10, y: 10},
    {x: width / 2 - tabWidth / 2 + 15, y: height / 4},
    {x: width / 2 - tabWidth / 2 + 20, y: height / 4 + 5},
    {x: width / 2 - tabWidth / 2 + 30, y: height / 4 + 10},
    {x: width / 2 - tabWidth / 2 + 32, y: height / 4 + 12},
    {x: width / 2 - tabWidth / 2 - 32, y: height / 4 + 12},
    {x: width / 2 + tabWidth / 2 - 30, y: height / 4 + 10},
    {x: width / 2 + tabWidth / 2 - 20, y: height / 4 + 5},
    {x: width / 2 + tabWidth / 2 - 15, y: height / 4},
    {x: width / 2 + tabWidth / 2 - 10, y: 10},
    {x: width / 2 + tabWidth / 2 - 5, y: 2},
    {x: width / 2 + tabWidth / 2 - 2, y: 1},
    {x: width / 2 + tabWidth / 2, y: 0},
  ]);
  const right = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)([
    {x: width / 2 + tabWidth / 2, y: 0},
    {x: width, y: 0},
    {x: width, y: height},
    {x: 0, y: height},
    {x: 0, y: 0},
  ]);
  return `${left} ${tab} ${right}`;
};
const d = getPath();

const path = `M 0 0, L ${width * 2 / 5 + 5} 0, A ${width/10 - 5} ${width/10 - 5} 0 1 0 ${width * 3 / 5 - 5} 0, L ${width} 0, L ${width} ${height}, L 0, ${height}Z`;

function FloatTabbar({
  state,
  descriptors,
  navigation,
  deviceId,
  token,
  checkIn,
  type,
  demoMode,
  checked,
}) {
  const [show, setShow] = useState(false);
  const [dateIOS, setDateIOS] = useState(new Date());
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const onConfirm = () => {
    const data = {
      type,
      time: moment(dateIOS).format('HH:mm:ss'),
      date: moment(dateIOS).format('DD/MM/YYYY'),
      token,
    };
    setShow(false);
    checkIn(data);
    console.log(d);
  };

  const onHideModal = () => {
    setShow(false);
  };

  const onChangeIOS = (item, selected) => {
    setDateIOS(selected);
  };

  let _date;

  const onChangeTime = (item, selected) => {
    if (item.type === 'set') {
      setShow(false);
      const data = {
        type,
        time: moment(selected).format('HH:mm:ss'),
        date: _date,
        token,
      };
      console.log(data);
      checkIn(data);
    }
  };

  const onChangeDate = (item, selected) => {
    if (item.type === 'set') {
      _date = moment(selected).format('DD/MM/YYYY');
    }
  };
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View
      style={{
        paddingBottom: 64,
      }}>
      {show &&
        (Platform.OS === 'ios' ? (
          <ModalTime
            title="Chọn thời gian"
            showModal={show}
            hideModal={onHideModal}
            onConfirm={onConfirm}
            picker={
              <View style={styles.picker}>
                <DateTimePicker
                  value={dateIOS}
                  mode={'datetime'}
                  display="default"
                  onChange={onChangeIOS}
                />
              </View>
            }
          />
        ) : (
          <>
            <DateTimePicker
              value={new Date()}
              mode="time"
              is24Hour={true}
              display="clock"
              onChange={onChangeTime}
            />
            <DateTimePicker
              value={new Date()}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeDate}
            />
          </>
        ))}

      <View
        style={{
          backgroundColor: 'rgba(52, 52, 52, 0)',
          position: 'absolute',
          bottom: 0,
        }}>
        <View
          {...{height, width}}
          style={{
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.5,
            shadowRadius: 5,
          }}>
          <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            <Path fill={backgroundColor} d={path} />
          </Svg>
          <View style={[StyleSheet.absoluteFill, {flexDirection: 'row'}]}>
            {state.routes.map((route, index) => {
              const {options} = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;

              const isFocused = state.index === index;

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };
              const onPressCheck = () => {
                type === 'in'
                  ? onCheck()
                  : _global.Alert.alert({
                      title: langs.alert.notify,
                      message: langs.alert.endShift,
                      leftButton: {
                        text: langs.alert.yes,
                        onPress: () => onCheck(),
                      },
                      rightButton: {
                        text: langs.alert.no,
                      },
                    });
              };
              const onCheck = () => {
                if (!demoMode) {
                  checkIn({type, token});
                } else {
                  setShow(true);
                }
              };
              const onLongPress = () => {
                navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                });
              };
              const onLongPressCheck = () => {
                navigation.navigate('CheckIn');
              };

              if (route.name === 'Button') {
                return (
                  <TouchableOpacity
                    style={{
                      width: tabWidth,
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}
                    key={index}
                    accessibilityRole="button"
                    accessibilityState={isFocused ? {selected: true} : {}}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    testID={options.tabBarTestID}
                    onPress={onPressCheck}
                    onLongPress={onLongPressCheck}>
                    <View
                      style={{
                        position: 'absolute',
                        top: -30,
                        width: 48,
                        height: 48,
                        backgroundColor: '#36A952',
                        borderRadius: 30,
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={imgs.gif}
                        style={{width: 36, height: 36}}
                      />
                    </View>
                  </TouchableOpacity>
                );
              }

              return (
                <TouchableOpacity
                  style={{
                    width: tabWidth,
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}
                  key={index}
                  accessibilityRole="button"
                  accessibilityState={isFocused ? {selected: true} : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}>
                  <View
                    style={{
                      position: 'absolute',
                      top: -16,
                      width: 60,
                      height: 60,
                      // backgroundColor: 'white',
                      // borderRadius: 30,
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}>
                    {route.name === 'Home' && isFocused ? (
                      <Image source={imgs.homegreen} />
                    ) : route.name === 'Home' && !isFocused ? (
                      <Image source={imgs.homegrey} />
                    ) : route.name === 'Book Lịch' && isFocused ? (
                      <Image source={imgs.documentGreen} />
                    ) : route.name === 'Book Lịch' && !isFocused ? (
                      <Image source={imgs.document} />
                    ) : route.name === 'TestNotify' && isFocused ? (
                      <Image source={imgs.notificationGreen} />
                    ) : route.name === 'TestNotify' && !isFocused ? (
                      <Image source={imgs.notificationGrey} />
                    ) : route.name === 'Cá nhân' && isFocused ? (
                      <Image source={imgs.personalgreen} />
                    ) : route.name === 'Cá nhân' && !isFocused ? (
                      <Image source={imgs.personalgrey} />
                    ) : null}
                  </View>

                  <Text
                    style={{
                      color: isFocused ? '#36A952' : 'grey',

                      marginTop: width > 375 ? 16 : 10,
                      alignSelf: 'center',
                      fontSize: width > 375 ? 16 : 12,
                      fontWeight:"500"
                    }}>
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        
      </View>
    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderTopWidth: 0.5,
    borderTopColor: 'gray',
    backgroundColor: Colors.white,
    paddingBottom: 16,
  },
  // modal: {
  //   width: 200,
  //   height: 200,
  // },
  picker: {
    width: Dimensions.get('window').width,
  },
});
const mapStateToProps = (state) => {
  return {
    deviceId: state.authen.deviceId,
    token: state.authen.token,
    currentUser: state.user.currentUser,
    type: state.check.type,
    demoMode: state.user.demoMode,
    checked: state.check.checked,
  };
};

const mapDispatchToProps = {
  checkIn: checkInWifi,
};

export default connect(mapStateToProps, mapDispatchToProps)(FloatTabbar);
