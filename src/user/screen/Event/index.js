import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Colors, imgs} from '../../../../utlis';
import {InputRow, Button, InputSelect} from '../../../component';
import langs from '../../../../common/language';
import {ScrollView} from 'react-native-gesture-handler';
import {_global} from '../../../../utlis/global/global';

const BACKGROUDNCOLOR =
  Platform.OS === 'ios' ? 'rgba(0,0,25,0.17)' : 'rgba(0,0,25,0.17)';

const Event = (props) => {
  const refPhone = useRef('');
  const refBirth = useRef('');
  const refTeam = useRef('');
  const refNative = useRef('');
  const {
    phone,
    onChangeTitle,
    birthday,
    onChangeBirthDay,
    team,
    onChangeTeam,
    nativeLand,
    onChangeNative,
    onNext,
  } = props;
  return (
    <>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.header}>
          <Text style={styles.txtHeader}>
            Vui lòng kiểm tra lịch tại đây trước khi tạo mới.{' '}
          </Text>
        </View>
        <InputRow
          containerStyle={styles.txtInput}
          title={'Tiêu đề : '}
          size={16}
          value={phone}
          onChangeText={onChangeTitle}
          refInput={refPhone}
          leftImage={imgs.title}
        />
        <View style={styles.Description}>
          <TextInput
            multiline
            placeholder={'Tóm tắt sự kiện, lịch họp hoặc hoạt động'}
                      maxLength={40}
                      style={styles.txtDescription}
                      

          />
        </View>
        <InputSelect
          width={'90%'}
          leftImage={imgs.location}
          borderRadius={32}
          height={54}
          shadowColor={'white'}
          title={'Địa điểm'}
          padding={8}
          detail={birthday}
          marginVertical={18}
          containerStyle={styles.viewInputSelect}
          onPressButton={onChangeBirthDay}
          shadowOpacity={0.1}
          marginRight={-30}
          color={'rgba(4, 4, 15, 0.45)'}
          detail={''}
        />
        <InputSelect
          width={'90%'}
          leftImage={imgs.personal}
          borderRadius={32}
          height={54}
          shadowColor={'white'}
          title={'Người tham gia'}
          padding={8}
          detail={birthday}
          marginVertical={18}
          containerStyle={styles.viewInputSelect}
          onPressButton={onChangeBirthDay}
          shadowOpacity={0.1}
          marginRight={-30}
          color={'rgba(4, 4, 15, 0.45)'}
          detail={''}
        />
       
      </KeyboardAvoidingView>
    </>
  );
};

export default Event;

const styles = StyleSheet.create({
  container: {},
  header: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 32,
  },
  txtHeader: {
    color: Colors.black,
    fontSize: 14,
    textAlign: 'left',
    paddingHorizontal: 14,
    marginBottom: 20,
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
    width: '90%',
    borderRadius: 16,
    backgroundColor: 'white',
    marginVertical: 16,
    shadowColor: 'rgba(0,0,25,0.17)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    height: 54,
  },
  viewInputSelect: {
    marginVertical: 16,
    backgroundColor: 'white',
    borderRadius: 16,
  },
  Description: {
    width: '90%',
    borderRadius: 16,
    backgroundColor: 'white',
    marginVertical: 16,
    shadowColor: 'rgba(0,0,25,0.17)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    height: 124,
    alignSelf: 'center',
    justifyContent: 'center',
    
    
  },
  txtDescription: { paddingHorizontal:24,fontSize:16}
});
