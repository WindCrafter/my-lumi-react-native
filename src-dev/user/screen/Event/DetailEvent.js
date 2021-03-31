import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  Linking,
  ScrollView,
  Switch,
  Alert,
  Platform,
} from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import moment from 'moment';
import { Colors, imgs } from '../../../../utlis';
import { BarStatus, Button, HeaderAccount } from '../../../component';
import { _global } from '../../../../utlis/global/global';
import langs from '../../../../common/language';
import { URL_STAGING } from '../../../../utlis/connection/url';
import { _POST } from '../../../../utlis/connection/api';

const URL_READ_EVENT = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.READ_EVENT}`;
const DetailEvent = (props) => {
  const { route, navigation, token, user_id } = props;
  const { item } = route.params;
  const [read, setRead] = useState(item.view_users && item.view_users.find(i => i == user_id));
  const goBack = () => {
    navigation.goBack();
  };
  const onPressConfirm = async () => {
    const data = {
      _id: item._id,
    };
    const response = await _POST(URL_READ_EVENT, data, token, true);
    if (response.success && response.statusCode === 200
    ) {
      _global.Loading.hide();
      setRead(true);
    } else {
      _global.Loading.hide();
      _global.Alert.alert({
        title: langs.alert.remind,
        message: response.message,
        leftButton: { text: langs.alert.ok },
      });
    }
  };

  return (
    <>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 36 : StatusBar.currentHeight}
      />
      <View style={styles.container}>
        <HeaderAccount shadow title={item.subject} goBack={goBack} titleStyle={{ marginTop: Platform.OS === 'android' ? 6 : 8 }} />
        <Image source={item.avatar ? { uri: item.avatar } : imgs.event} style={styles.imgDetai} />
        <ScrollView style={styles.scroll}>
          <Text style={styles.content}>
            <Text style={styles.titleContent}>Thời gian bắt đầu: </Text>
            {moment(item.start_datetime, 'HH:mm:ss DD/MM/YYYY').format('DD/MM/YYYY - HH:mm')}
          </Text>
          <Text style={styles.content}>
            <Text style={styles.titleContent}>Thời gian kết thúc: </Text>
            {moment(item.end_datetime, 'HH:mm:ss DD/MM/YYYY').format('DD/MM/YYYY - HH:mm')}
          </Text>
          <Text style={styles.content}>
            <Text style={styles.titleContent}>Nội dung: </Text>
            {item.content}
          </Text>
          {item.urgent == 1 && (
          <Button
            backgroundColor={read ? Colors.itemInActive : Colors.background}
            title={read ? 'Đã đọc ✓' : langs.confirmReadEvt}
            onPress={onPressConfirm}
            disable={read}
            containerStyle={styles.btn}
          />
          )}
        </ScrollView>
      </View>
    </>
  );
};

export default DetailEvent;
const wd = widthPercentageToDP(100) - 36;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgDetai: {
    alignSelf: 'center',
    marginTop: 16,
    width: wd,
    height: wd * 0.6,
    borderRadius: 16,
  },
  content: {
    marginTop: 8,
  },
  scroll: {
    paddingHorizontal: 16,
  },
  titleContent: {
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Quicksand-Bold',
  },
  btn: {
    marginTop: 16,
  }
});
