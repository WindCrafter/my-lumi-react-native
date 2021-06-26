import React, { useState } from 'react';
import { LayoutAnimation, View, Text, StyleSheet, Keyboard, TextInput, Image, Platform, ScrollView } from 'react-native';
import { Card } from 'native-base';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import moment from 'moment';
import { HeaderCustom, InputRow, InputSelect, Button, Input } from '../../../component';
import PickerCustom from './component/PickerCustom';
import { imgs, Colors } from '../../../../utlis';
import { _global } from '../../../../utlis/global/global';
import langs from '../../../../common/language';

function UpdateWFH(props) {
  const { updateWorkFromHome, navigation, token, route } = props;

  const { _id, start_dateRoute, end_dateRoute, reasonRoute, healthRoute } = route.params;
  console.log(start_dateRoute, end_dateRoute);
  const [title, setTitle] = useState(reasonRoute);
  const [date, setDate] = useState(new Date(start_dateRoute * 1000));
  const [date2, setDate2] = useState(new Date(end_dateRoute * 1000));

  const [showModalDateStart, setshowModalDateStart] = useState(false);
  const [showModalDateEnd, setshowModalDateEnd] = useState(false);

  const [dateStart, setDateStart] = useState(new Date(start_dateRoute * 1000));
  const [dateEnd, setDateEnd] = useState(new Date(end_dateRoute * 1000));

  const [healthCondition, setHealthCondition] = useState(healthRoute);
  const onBlur = () => {
    Keyboard.dismiss();
  };
  const unFocus = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    Keyboard.dismiss();
  };
  const onChangeTitle = val => {
    setTitle(val);
  };
  const onChangeHealthCondition = val => {
    setHealthCondition(val);
  };
  const goBack = () => {
    navigation.goBack();
  };

  const onShowPickerDateStart = m => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setshowModalDateStart(true);
  };
  const onShowPickerDateEnd = m => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setshowModalDateEnd(true);
  };
  const onChangeDateStart = (event, selectedDay) => {
    const currentDay = selectedDay || dateStart;
    const smallerDate = moment(currentDay).format('YYYYMMDD') > moment(date2).format('YYYYMMDD');

    if (Platform.OS === 'ios') {
      setDateStart(currentDay);
    } else if (event.type === 'set') {
      setshowModalDateStart(false);
      if (smallerDate && date2) {
        _global.Alert.alert({
          title: langs.alert.remind,
          message: 'Không thể chọn thời gian kết thúc nhỏ hơn thời gian bắt đầu',
          leftButton: { text: langs.alert.ok },
        });
      } else {
        setDate(currentDay);
      }
    } else {
      setshowModalDateStart(false);
    }
  };
  const onChangeDateEnd = (event, selectedDay) => {
    const currentDay = selectedDay || dateStart;
    const smallerDate = moment(date).format('YYYYMMDD') > moment(currentDay).format('YYYYMMDD');

    if (Platform.OS === 'ios') {
      setDateEnd(currentDay);
    } else if (event.type === 'set') {
      setshowModalDateEnd(false);
      if (smallerDate) {
        _global.Alert.alert({
          title: langs.alert.remind,
          message: 'Không thể chọn thời gian kết thúc nhỏ hơn thời gian bắt đầu',
          leftButton: { text: langs.alert.ok },
        });
      } else {
        setDate2(currentDay);
      }
    } else {
      setshowModalDateEnd(false);
    }
  };

  const onConfirmDate = (set) => {
    const smallerDate = moment(dateStart).format('YYYYMMDD') > moment(dateEnd).format('YYYYMMDD');
    setshowModalDateStart(false);
    setshowModalDateEnd(false);
    if (date2 && smallerDate) {
      _global.Alert.alert({
        title: langs.alert.remind,
        message: 'Không thể chọn thời gian kết thúc nhỏ hơn thời gian bắt đầu',
        leftButton: { text: langs.alert.ok },
      });
    } else {
      !set && setDate(dateStart);
      set && setDate2(dateEnd);
    }
  };
  const onUnshowDateStart = () => {
    setshowModalDateStart(false);
  };
  const onUnshowDateEnd = () => {
    setshowModalDateEnd(false);
  };
  const onSetWorkFromHome = () => {
    Keyboard.dismiss();
    if (!title) {
      _global.Alert.alert({
        title: langs.alert.remind,
        message: 'Vui lòng điền lí do làm việc tại nhà!',
        messageColor: Colors.danger,
        leftButton: { text: langs.alert.ok },
      });
      return;
    }
    if (!healthCondition) {
      _global.Alert.alert({
        title: langs.alert.remind,
        message: 'Vui lòng điền tình trạng sức khoẻ!',
        messageColor: Colors.danger,
        leftButton: { text: langs.alert.ok },
      });
      return;
    }
    if (date === '') {
      _global.Alert.alert({
        title: langs.alert.remind,
        message: 'Vui lòng chọn ngày bắt đầu',
        messageColor: Colors.danger,
        leftButton: { text: langs.alert.ok },
      });
      return;
    }
    if (date2 === '') {
      _global.Alert.alert({
        title: langs.alert.remind,
        message: 'Vui lòng chọn ngày kết thúc',
        messageColor: Colors.danger,
        leftButton: { text: langs.alert.ok },
      });
      return;
    }
    const data = {
      _id,
      health: healthCondition,
      start_date: moment(date).format('DD-MM-YYYY'),
      end_date: moment(date2).format('DD-MM-YYYY'),
      token,
      reason: title,
    };
    console.log('date date2 start end', date, date2);
    updateWorkFromHome(data);
  };
  return (
    <View style={styles.container}>
      <HeaderCustom title="Sửa xin làm việc tại nhà" height={64} goBack={goBack} shadow fontSize={widthPercentageToDP(100) < 375 ? 16 : 20} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{ backgroundColor: '#f2f2f2' }}
        keyboardDismissMode="interactive"
      >
        <Card style={styles.Description}>
          <Image source={imgs.title} style={styles.iconMenu} />
          <TextInput
            multiline
            placeholder="Lí do WFH"
            value={title}
            style={styles.txtDescription}
            onBlur={onBlur}
            onChangeText={onChangeTitle}
            placeholderTextColor={Colors.ink400}
          />
        </Card>
        <InputSelect
          width="90%"
          leftImage={imgs.DOB}
          borderRadius={32}
          height={54}
          shadowColor="white"
          title="Chọn ngày"
          padding={8}
          marginVertical={18}
          containerStyle={styles.viewInputSelect}
          onPressButton={onShowPickerDateStart}
          shadowOpacity={0.1}
          marginRight={-30}
          color="rgba(4, 4, 15, 0.45)"
          detail={
              date !== ''
                ? `${moment(date).format('DD')} tháng ${moment(date).format(
                  'MM',
                )}, ${moment(date).format('YYYY')}`
                : 'Ngày bắt đầu'
            }
          rightImage={imgs.roundedLeft}
        />
        <InputSelect
          width="90%"
          leftImage={imgs.DOB}
          borderRadius={32}
          height={54}
          shadowColor="white"
          title="Chọn ngày"
          padding={8}
          marginVertical={18}
          containerStyle={styles.viewInputSelect}
          onPressButton={onShowPickerDateEnd}
          shadowOpacity={0.1}
          marginRight={-30}
          color="rgba(4, 4, 15, 0.45)"
          detail={
              date2 !== ''
                ? `${moment(date2).format('DD')} tháng ${moment(date2).format(
                  'MM',
                )}, ${moment(date2).format('YYYY')}`
                : 'Ngày kết thúc'
            }
          rightImage={imgs.roundedLeft}
        />
        <Card style={styles.viewHealth}>
          <Image source={imgs.healthCondition} style={styles.iconMenu} />
          <TextInput
            placeholder="Tình trạng sức khoẻ"
            value={healthCondition}
            style={styles.textHealth}
            onBlur={unFocus}
            onChangeText={onChangeHealthCondition}
            placeholderTextColor={Colors.ink400}
            onSubmitEditing={unFocus}

          />
        </Card>
        <Button
          title="Hoàn thành"
          containerStyle={styles.complete}
          onPress={onSetWorkFromHome}
        />
        <PickerCustom
          value={dateStart}
          onChange={onChangeDateStart}
          onPress={() => onConfirmDate(false)}
          mode="date"
          show={showModalDateStart}
          minimumDate={new Date()}
          onHideModal={onUnshowDateStart}
        />
        <PickerCustom
          value={dateEnd}
          onChange={onChangeDateEnd}
          onPress={() => onConfirmDate(true)}
          mode="date"
          show={showModalDateEnd}
          minimumDate={new Date()}
          onHideModal={onUnshowDateEnd}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'white',
  },
  Description: {
    width: '90%',
    borderRadius: 16,
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,25,0.17)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    height: 124,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    flexDirection: 'row',
    paddingTop: 16,
  },
  txtDescription: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Quicksand-Regular',
    width: widthPercentageToDP(90) - 48,
    marginLeft: 8,
    paddingLeft: 8,
    paddingTop: Platform.OS === 'ios' ? 2 : 6,
    height: 124,
    paddingRight: 8,
    textAlignVertical: 'top'
  },
  iconMenu: {
    marginLeft: 16,
  },
  viewInputSelect: {
    marginVertical: 16,
    backgroundColor: 'white',
    borderRadius: 16,
  },
  textHealth: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Quicksand-Regular',
    width: widthPercentageToDP(90) - 48,
    marginLeft: 8,
    height: 54,
    textAlignVertical: 'center',
  },
  viewHealth: {
    width: '90%',
    borderRadius: 16,
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,25,0.17)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    height: 54,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  complete: {
    backgroundColor: Colors.background,
  },
});

export default React.memo(UpdateWFH);
