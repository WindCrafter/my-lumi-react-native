import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { InputRow } from '../../../../component';
import { imgs } from '../../../../../utlis';
import langs from '../../../../../common/language';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const UpdateInfo = (props) => {
  const refPhone = useRef('');
  const refBirth = useRef('');
  const refTeam = useRef('');
  const refNative = useRef('');
  const {
    phone,
    onChangePhone,
    name,
    onChangeName,
    team,
    onChangeTeam,
    nativeLand,
    onChangeNative,
  } = props;
  return (
    <>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.detail}>
          <ScrollView>
            <InputRow
              containerStyle={styles.txtInput}
              title={langs.name}
              size={16}
              value={name}
              onChangeText={onChangeName}
              refInput={refPhone}
              clearButtonMode="while-editing"
              onSubmitEditing={() => refBirth.current.focus()}
            />
            <InputRow
              leftImage={imgs.phone}
              containerStyle={styles.txtInput}
              title={langs.phone}
              size={16}
              value={phone}
              onChangeText={onChangePhone}
              refInput={refBirth}
              clearButtonMode="while-editing"
              onSubmitEditing={() => refTeam.current.focus()}
            />
            <InputRow
              leftImage={imgs.setPerson}
              containerStyle={styles.txtInput}
              title={langs.team}
              size={16}
              value={team}
              onChangeText={onChangeTeam}
              refInput={refTeam}
              clearButtonMode="while-editing"
              onSubmitEditing={() => refNative.current.focus()}
            />
            <InputRow
              leftImage={imgs.location}
              containerStyle={styles.txtInput}
              title={langs.nativeLand}
              size={16}
              value={nativeLand}
              onChangeText={onChangeNative}
              clearButtonMode="while-editing"
              refInput={refNative}
            />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default UpdateInfo;

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
    backgroundColor: 'rgba(0,0,25,0.17)',
    marginVertical: 16,
  },
});
