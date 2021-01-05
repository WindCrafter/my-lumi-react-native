import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
  Keyboard,
} from 'react-native';
import {
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import langs from '../../../../../common/language';
import {imgs, Colors} from '../../../../../utlis';
import InforRow from './InfoRow';

const UpdateInfo = (props) => {
  const refName = useRef('');
  const refAddress = useRef('');
  const refPhone = useRef('');
  const refId = useRef('');
  const refAccount = useRef('');

  const {
    phone,
    onChangePhone,
    onChangeBank,
    bankName,
    identity,
    onChangeIdentity,
    nativeLand,
    onChangeNative,
    bankAccount,
    onChangeBankAccount,
    name,
    onChangeName,
    team,
    onChangeTeam,
    birthday,
    onChangeBirthday,
    role,
  } = props;
  return (
    <View style={styles.container}>
      <View
        style={styles.info}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.detail}>
          <InforRow
            containerStyle={styles.txtInput}
            title={langs.name}
            size={16}
            value={name}
            onChangeText={onChangeName}
            refInput={refName}
            clearButtonMode="never"
            onSubmitEditing={() => refId.current.focus()}
          />
          <InforRow
            containerStyle={styles.txtInput}
            title={langs.team}
            size={16}
            value={team}
            clearButtonMode="never"
            editable={false}
            color={'rgb(200, 200, 200)'}
          />
          <InforRow
            containerStyle={styles.txtInput}
            title={langs.role}
            size={16}
            value={role}
            clearButtonMode="never"
            editable={false}
            color={'rgb(200, 200, 200)'}
          />

          <TouchableOpacity onPress={onChangeBirthday} style={styles.row}>
            <View style={styles.leftRow}>
              <Text style={styles.titleRow}>Ngày sinh</Text>
            </View>
            <View style={styles.rightRow}>
              <Text style={styles.contentRow}>{birthday}</Text>
            </View>
          </TouchableOpacity>
          <InforRow
            containerStyle={styles.txtInput}
            title={langs.identity}
            size={16}
            refInput={refId}
            value={identity ? identity : ''}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            onChangeText={onChangeIdentity}
            clearButtonMode="while-editing"
            keyboardType="number-pad"
            onSubmitEditing={() => refAddress.current.focus()}
          />

          <InforRow
            leftImage={imgs.location}
            containerStyle={styles.txtInput}
            title={langs.nativeLand}
            size={16}
            refInput={refAddress}
            value={nativeLand ? nativeLand : ''}
            onChangeText={onChangeNative}
            clearButtonMode="while-editing"
            onSubmitEditing={() => refPhone.current.focus()}
          />

          <InforRow
            leftImage={imgs.phone}
            containerStyle={styles.txtInput}
            title={langs.phone}
            size={16}
            value={phone ? phone : ''}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            keyboardType={'number-pad'}
            onChangeText={onChangePhone}
            refInput={refPhone}
            clearButtonMode="while-editing"
            onSubmitEditing={() => refAccount.current.focus()}
            // returnKeyType="next"
          />
          <TouchableOpacity onPress={onChangeBank} style={styles.row}>
            <View style={styles.leftRow}>
              <Text style={styles.titleRow}>{langs.bank}</Text>
            </View>
            <View style={styles.rightRow}>
              <Text style={styles.contentRow}>{bankName}</Text>
            </View>
          </TouchableOpacity>

          <InforRow
            leftImage={imgs.bank}
            containerStyle={styles.txtInput}
            title={langs.bankAccount}
            size={16}
            refInput={refAccount}
            value={bankAccount ? bankAccount : ''}
            onChangeText={onChangeBankAccount}
            clearButtonMode="while-editing"
            canedit={!!bankName}
            keyboardType="number-pad"
            returnKeyType={'done'}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </View>
      </View>
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
    backgroundColor: Platform.OS === 'ios' ? 'rgba(0,0,25,0.17)' : Colors.white,
    marginVertical: 16,
  },
  height: {
    height: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginVertical: 4,
    width: widthPercentageToDP(100) - 48,
  },
  leftRow: {
    flexDirection: 'row',
    flex: 1,
  },
  titleRow: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 8,
  },
  rightRow: {
    flex: 1,
    fontSize: 16,
    marginRight: -12,
    color: 'black',
    alignItems: 'flex-start',
    justifyContent: 'center',
    fontFamily: 'Quicksand-Regular',
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: wp(100),
    height: 50,
    
  },
  contentRow: {
    fontSize: 16,
  },
});
