import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Colors, imgs} from '../../../../../utlis';
import {InputRow, Button, InputSelect} from '../../../../component';
import langs from '../../../../../common/language';
import {ScrollView} from 'react-native-gesture-handler';
import { _global } from '../../../../../utlis/global/global';

const BACKGROUDNCOLOR = Platform.OS === 'ios' ? 'rgba(0,0,25,0.17)' : 'rgba(0,0,25,0.17)';

const AddInfo = (props) => {
  const refPhone = useRef('');
  const refBirth = useRef('');
  const refTeam = useRef('');
  const refNative = useRef('');
  const {
    phone,
    onChangePhone,
    birthday,
    onChangeBirthDay,
    team,
    onChangeTeam,
    nativeLand,
    onChangeNative,
    onNext,
    detailPosition
  } = props;
  return (
    <>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.header}>
          <Text style={styles.txtHeader}>Đăng nhập lần đầu thành công</Text>
          <Text style={styles.txtHeader}>Xin vui lòng điền đủ thông tin</Text>
        </View>
        <View style={styles.detail}>
          <ScrollView>
            <View style={styles.avatar}>
              <Image source={imgs.addImage} style={styles.iconAvt} />
            </View>
            <InputRow
              containerStyle={styles.txtInput}
              title={langs.phone}
              size={16}
              value={phone}
              onChangeText={onChangePhone}
              refInput={refPhone}
              keyboardType={'numeric'}
            />
            <InputSelect
              width={widthPercentageToDP(80)}
              leftImage={imgs.DOB}
              borderRadius={32}
              height={50}
              backgroundColor={'white'}
              title={'Ngày sinh:'}
              padding={8}
              detail={birthday}
              marginVertical={18}
              containerStyle={styles.viewInputSelect}
              onPressButton={onChangeBirthDay}
              shadowOpacity={0.1}
              marginRight={-30}
            />
            <InputSelect
              width={widthPercentageToDP(80)}
              leftImage={imgs.setPerson}
              borderRadius={32}
              height={50}
              backgroundColor={'white'}
              title={'Team:'}
              padding={8}
              marginVertical={16}
              containerStyle={styles.viewInputSelect}
              onPressButton={onChangeTeam}
              shadowOpacity={0.1}
              marginRight={-50}
              detail={detailPosition}
              
            />
            

            <InputRow
              leftImage={imgs.location}
              containerStyle={styles.txtInput}
              title={langs.nativeLand}
              size={16}
              value={nativeLand}
              onChangeText={onChangeNative}
              refInput={refNative}
              keyboardType={'default'}
            />
            <Button
              title={'Tiếp tục'}
              onPress={onNext}
              containerStyle={styles.button}
            />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default AddInfo;

const styles = StyleSheet.create({
  container: {
    width: widthPercentageToDP(100),
    backgroundColor: Colors.white,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 32,
  },
  txtHeader: {
    color: Colors.background,
    fontSize: 20,
    textAlign: 'center',
  },
  detail: {
    flex: 4,
    alignItems: 'center',
  },
  avatar: {
    height: 96,
    width: 96,
    borderRadius: 64,
    backgroundColor: 'rgba(4,4,15,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    alignSelf: 'center',
  },
  iconAvt: {
    width: 48,
    height: 48,
    marginRight: 6,
    marginBottom: 4,
  },
  txtInput: {
    width: widthPercentageToDP(80),
    borderRadius: 32,
    backgroundColor: BACKGROUDNCOLOR,
    marginVertical: 16,
  },
  viewInputSelect:{
    marginVertical:16,
    backgroundColor: 'rgba(4,4,15,0.2)'
  }
});
