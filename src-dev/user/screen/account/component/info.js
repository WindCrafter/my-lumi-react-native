import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Platform,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { KeyBoardScroll } from '../../../../component';
import langs from '../../../../../common/language';
import { imgs, Colors } from '../../../../../utlis';
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
    role,
  } = props;
  return (
    <View style={styles.container}>
      <View style={styles.viewAvt}>
        <Image
          source={imgs.defaultAvatar}
          style={styles.avt}
        />
      </View>
      <KeyBoardScroll>
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
          <InforRow
            containerStyle={styles.txtInput}
            title={langs.team}
            size={16}
            value={team}
            refInput={refTeam}
            clearButtonMode="while-editing"
            editable={false}
            color="rgb(200, 200, 200)"
          />
          <InforRow
            containerStyle={styles.txtInput}
            title={langs.role}
            size={16}
            value={role}
            refInput={refTeam}
            clearButtonMode="while-editing"
            editable={false}
            color="rgb(200, 200, 200)"
          />

          <TouchableOpacity onPress={onChangeBirthday} style={styles.row}>
            <View style={styles.leftRow}>
              <Text style={styles.titleRow}>Ngày sinh</Text>
            </View>
            <View style={styles.rightRow}>
              <Text style={styles.contentRow}>{birthday}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyBoardScroll>
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
  // txtInput: {
  //   width: widthPercentageToDP(80),
  //   borderRadius: 32,
  //   backgroundColor: Platform.OS === 'ios' ? 'rgba(0,0,25,0.17)' : Colors.white,
  //   marginVertical: 16,
  // },
  txt: {
    marginVertical: 16,
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
    marginLeft: -12,
    color: 'black',
    alignItems: 'flex-end',
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
