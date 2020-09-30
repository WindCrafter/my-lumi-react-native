import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Card } from 'native-base';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { InputRow } from '../../../../component';
import langs from '../../../../../common/language';
import { imgs, Colors } from '../../../../../utlis';
import moment from 'moment';

const UpdateInfo = (props) => {
  const refPhone = useRef('');
  const refBirth = useRef('');
  const refTeam = useRef('');
  const { gene, onChangeGene, birthday, onChangeBirthday } = props;
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.info}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.detail}>
          <TouchableOpacity onPress={onChangeBirthday}>
            <InputRow
              containerStyle={styles.txtInput}
              leftImage={imgs.DOB}
              title={langs.birthday}
              size={16}
              value={birthday}
              refInput={refPhone}
              editable={false}
              clearButtonMode="never"
              onSubmitEditing={() => refBirth.current.focus()}
            />
          </TouchableOpacity>
          <InputRow
            leftImage={imgs.person}
            containerStyle={styles.txtInput}
            title={langs.gene}
            size={16}
            value={gene}
            onChangeText={onChangeGene}
            refInput={refBirth}
            clearButtonMode="while-editing"
            placeholder={'Nam/Nữ/Khác'}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default UpdateInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: widthPercentageToDP(100),
    alignItems: 'center',
  },
  card: {
    flex: 1,
    width: widthPercentageToDP(90),
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  info: {
    flex: 5,
    width: widthPercentageToDP(100),
    alignItems: 'center',
  },
  viewAvt: {
    flex: 1,
  },
  avt: {
    height: 64,
    width: 64,
    borderRadius: 32,
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
    backgroundColor: 'rgba(0,0,25,0.17)',
    marginVertical: 16,
  },
});
