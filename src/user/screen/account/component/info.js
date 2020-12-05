import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {InputRow} from '../../../../component';
import langs from '../../../../../common/language';
import {imgs, Colors} from '../../../../../utlis';
import InforRow from './InfoRow';

const Info = (props) => {
  const refPhone = useRef('');
  const refBirth = useRef('');
  const refTeam = useRef('');
  const refNative = useRef('');
  const refIdentity = useRef('');
  const {
    name,
    onChangeName,
    team,
    onChangeTeam,
    identity,
    onChangeIdentity,
    birthday,
    onChangeBirthday,
  } = props;
  return (
    <View style={styles.container}>
      <View style={styles.viewAvt}>
        <Image
          source={require('../../../../../naruto.jpeg')}
          style={styles.avt}
        />
      </View>
      <KeyboardAvoidingView
        style={styles.info}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.detail}>
          <InforRow
            containerStyle={styles.txtInput}
            title={langs.name}
            size={16}
            value={name}
            onChangeText={onChangeName}
            refInput={refPhone}
            clearButtonMode="while-editing"
            onSubmitEditing={() => refBirth.current.focus()}
          />
          <TouchableOpacity onPress={onChangeTeam}>
            <InforRow
              leftImage={imgs.setPerson}
              containerStyle={styles.txtInput}
              title={langs.team}
              size={16}
              value={team}
              refInput={refTeam}
              clearButtonMode="while-editing"
              placeholder="Chọn team"
              editable={false}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={onChangeBirthday}>
            <InforRow
              containerStyle={styles.txtInput}
              leftImage={imgs.DOB}
              title={langs.birthday}
              size={16}
              value={birthday}
              refInput={refPhone}
              editable={false}
              clearButtonMode="never"
            />
          </TouchableOpacity>
          <InforRow
            leftImage={imgs.identityCard}
            containerStyle={styles.txtInput}
            title={langs.identity}
            size={16}
            value={identity}
            onChangeText={onChangeIdentity}
            clearButtonMode="while-editing"
            refInput={refIdentity}
            keyboardType="number-pad"
          />
        </View>
      </KeyboardAvoidingView>
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
    backgroundColor: Platform.OS === 'ios' ? 'rgba(0,0,25,0.17)' : Colors.white,
    marginVertical: 16,
  },
});
