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
  ImageBackground,
} from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import moment from 'moment';
import { Colors, imgs } from '../../../../utlis';
import { BarStatus, Button, HeaderAccount, HeaderCustom } from '../../../component';
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
      <View style={[styles.container, { ...StyleSheet.absoluteFill, backgroundColor: 'white' }]}>
        <HeaderCustom title="Chi tiết sự kiện" goBack={goBack} />
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <ImageBackground source={item.avatar ? { uri: item.avatar } : imgs.event} style={styles.imgDetai}>
            {item.urgent == 1
           && (
           <>
             <View style={styles.urgent}>
               <Text style={styles.txtUrgent}>
                 Nổi bật
               </Text>
             </View>
             <View style={styles.triangleUp} />
             <View style={styles.triangleDown} />
           </>
           )}
          </ImageBackground>
          <Text style={[styles.titleContent, { marginTop: 4, fontSize: 24 }]}>
            {item.subject}
          </Text>
          <Text style={styles.content}>
            <Text style={styles.titleContent}>Thời gian bắt đầu: </Text>
            {moment(item.start_datetime, 'HH:mm:ss DD/MM/YYYY').format('DD/MM/YYYY - HH:mm')}
          </Text>
          <Text style={styles.content}>
            <Text style={styles.titleContent}>Thời gian kết thúc: </Text>
            {moment(item.end_datetime, 'HH:mm:ss DD/MM/YYYY').format('DD/MM/YYYY - HH:mm')}
          </Text>
          <Text style={styles.content}>
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
const wd = widthPercentageToDP(100);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgDetai: {
    alignSelf: 'center',
    width: wd,
    height: wd * 0.6,
  },
  content: {
    marginTop: 8,
    marginHorizontal: 16,
  },
  scroll: {
  },
  titleContent: {
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Quicksand-Bold',
    marginHorizontal: 16,
  },
  btn: {
    marginVertical: 16,
  },
  urgent: {
    position: 'absolute',
    top: 8,
    left: 0,
    backgroundColor: 'rgb(251, 28, 28)',
    width: 80,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    // transform: [{ rotate: '45deg' }],
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
  },
  txtUrgent: {
    // color: 'rgb(252, 252, 3)',
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  triangleUp: {
    position: 'absolute',
    left: 80,
    top: 8,
    width: 0,
    height: 0,
    borderLeftWidth: 16,
    borderBottomWidth: 0,
    borderTopWidth: 16,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'rgb(251, 28, 28)',
  },
  triangleDown: {
    position: 'absolute',
    left: 80,
    top: 24,
    width: 0,
    height: 0,
    borderLeftWidth: 16,
    borderBottomWidth: 16,
    borderTopWidth: 0,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'rgb(251, 28, 28)',
  },
  detailStyle: {
    width: widthPercentageToDP(100) - 88,
    alignItems: 'center',
  }
});
