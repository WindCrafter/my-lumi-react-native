import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Card } from 'native-base';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { InputRow } from '../../../../component';
import langs from '../../../../../common/language';
import { imgs, Colors } from '../../../../../utlis';

const Info = (props) => {
  const refPhone = useRef('');
  const refBirth = useRef('');
  const refTeam = useRef('');
  const refNative = useRef('');
  const refIdentity = useRef('');
  const {
    phone,
    onChangePhone,
    name,
    onChangeName,
    team,
    onChangeTeam,
    nativeLand,
    onChangeNative,
    identity,
    onChangeIdentity,
  } = props;
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <KeyboardAvoidingView
          style={styles.info}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.detail}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.viewAvt}>
                <Image
                  source={require('../../../../../naruto.jpeg')}
                  style={styles.avt}
                />
              </View>
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
                keyboardType={'numbers-and-punctuation'}
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
                onSubmitEditing={() => refIdentity.current.focus()}
              />
              <InputRow
                leftImage={imgs.identityCard}
                containerStyle={styles.txtInput}
                title={langs.identity}
                size={16}
                value={identity}
                onChangeText={onChangeIdentity}
                clearButtonMode="while-editing"
                refInput={refIdentity}
              />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Card>
    </View>
  );
};

export default Info;

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
    flex: 1,
    width: widthPercentageToDP(100),
    alignItems: 'center',
  },
  viewAvt: {
    flex: 1,
    alignSelf: 'center',
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
    flex: 1,
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
